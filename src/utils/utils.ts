import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  aspectRatio?: string;
};

export function getImageAspectRatio(imgPath: string): string | undefined {
  if (!imgPath) return undefined;
  try {
    const cleanPath = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    const fullPath = path.join(process.cwd(), "public", cleanPath);
    if (!fs.existsSync(fullPath)) return undefined;
    const buf = fs.readFileSync(fullPath);
    if (buf.length < 24) return undefined;
    // SVG
    if (cleanPath.endsWith(".svg")) {
      const content = buf.toString("utf-8", 0, Math.min(buf.length, 4096));
      const vbMatch = content.match(/viewBox=["']([\d\.\s,-]+)["']/);
      if (vbMatch) {
        const parts = vbMatch[1].trim().split(/[\s,]+/);
        if (parts.length === 4) {
          const w = parseFloat(parts[2]);
          const h = parseFloat(parts[3]);
          if (w > 0 && h > 0) return `${w} / ${h}`;
        }
      }
    }
    // PNG
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (width > 0 && height > 0) return `${width} / ${height}`;
    }
    // JPEG
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) break;
        const marker = buf[offset + 1];
        if (marker === 0xc0 || marker === 0xc2) {
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          if (width > 0 && height > 0) return `${width} / ${height}`;
        }
        const len = buf.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    }
  } catch {
    // fallback
  }
  return undefined;
}

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const primaryImage = (data.images && data.images[0]) || data.image || "";
  const autoAspectRatio = primaryImage ? getImageAspectRatio(primaryImage) : undefined;

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    aspectRatio: data.aspectRatio || autoAspectRatio || "16 / 9",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  // Posts are read at build time. The ignore comment keeps Next from tracing
  // the whole project (images and video included) into every server function.
  const postsDir = path.join(/* turbopackIgnore: true */ process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
