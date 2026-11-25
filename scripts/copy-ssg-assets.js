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
    } else if (entry.name.endsWith(".html") || entry.name.endsWith(".rsc")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const serverAppDir = path.join(process.cwd(), ".next/server/app");
const assetsDir = path.join(process.cwd(), ".open-next/assets");

if (fs.existsSync(serverAppDir) && fs.existsSync(assetsDir)) {
  copyDirRecursive(serverAppDir, assetsDir);
  console.log("Successfully copied all prerendered SSG pages to .open-next/assets!");
}
