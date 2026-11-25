const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function getMDXData(dir) {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) return [];
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
    const { data, content } = matter(raw);
    const primaryImage = (data.images && data.images[0]) || data.image || "";
    const rawTags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? data.tags.split(",").map((s) => s.trim())
      : [];
    const metadata = {
      title: data.title || "",
      subtitle: data.subtitle || "",
      publishedAt: data.publishedAt || "",
      summary: data.summary || "",
      image: data.image || "",
      images: data.images || [],
      tag: rawTags[0] || "",
      tags: rawTags,
      team: data.team || [],
      link: data.link || "",
      aspectRatio: data.aspectRatio || "16 / 9",
    };
    return {
      slug: path.basename(file, ".mdx"),
      metadata,
      content,
    };
  });
}

const projects = getMDXData("src/app/work/projects");
const posts = getMDXData("src/app/blog/posts");

const dest = path.join(process.cwd(), "src/resources/posts-data.json");
fs.writeFileSync(dest, JSON.stringify({ projects, posts }, null, 2));
console.log(`Prebuilt posts cache: ${projects.length} projects, ${posts.length} posts.`);
