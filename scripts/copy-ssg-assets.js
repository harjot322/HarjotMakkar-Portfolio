const fs = require("fs");
const path = require("path");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith("_") && !entry.name.startsWith("[")) {
        copyDirRecursive(srcPath, destPath);
      }
    } else if (entry.name.endsWith(".html")) {
      // 1. Copy foo.html
      fs.copyFileSync(srcPath, destPath);

      // 2. Also copy to foo/index.html so Cloudflare Assets can serve clean URLs directly
      const baseName = path.basename(entry.name, ".html");
      if (baseName !== "index") {
        const folderPath = path.join(dest, baseName);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.copyFileSync(srcPath, path.join(folderPath, "index.html"));
      }
    } else if (entry.name.endsWith(".rsc")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const serverAppDir = path.join(process.cwd(), ".next/server/app");
const assetsDir = path.join(process.cwd(), ".open-next/assets");

if (fs.existsSync(serverAppDir) && fs.existsSync(assetsDir)) {
  copyDirRecursive(serverAppDir, assetsDir);
  console.log("Successfully copied all prerendered SSG pages to .open-next/assets (with index.html directories)!");
}

// Now patch .open-next/worker.js to add SSG asset interceptor
const workerPath = path.join(process.cwd(), ".open-next/worker.js");
if (fs.existsSync(workerPath)) {
  let workerCode = fs.readFileSync(workerPath, "utf8");
  const interceptorMarker = "/* SSG_ASSET_INTERCEPTOR */";
  if (!workerCode.includes(interceptorMarker)) {
    const target = 'const { handler } = await import("./server-functions/default/handler.mjs");';
    const interceptorCode = `${interceptorMarker}
            if (env.ASSETS && request.method === "GET") {
                const isRsc = request.headers.get("RSC") === "1" || url.searchParams.has("_rsc");
                const cleanPath = url.pathname === "/" ? "/index" : url.pathname.replace(/\\/$/, "");
                const candidateUrl = new URL(request.url);
                candidateUrl.search = "";
                candidateUrl.pathname = isRsc ? \`\${cleanPath}.rsc\` : \`\${cleanPath}.html\`;
                try {
                    const assetRes = await env.ASSETS.fetch(new Request(candidateUrl.toString(), request));
                    if (assetRes.ok) {
                        const headers = new Headers(assetRes.headers);
                        headers.set("content-type", isRsc ? "text/x-component" : "text/html; charset=utf-8");
                        headers.set("cache-control", "public, max-age=0, must-revalidate");
                        return new Response(assetRes.body, { status: 200, headers });
                    }
                } catch (e) {
                    // Fall through to Next.js handler
                }
            }
            ${target}`;
    if (workerCode.includes(target)) {
      workerCode = workerCode.replace(target, interceptorCode);
      fs.writeFileSync(workerPath, workerCode, "utf8");
      console.log("Successfully patched .open-next/worker.js with SSG asset interceptor!");
    }
  }
}
