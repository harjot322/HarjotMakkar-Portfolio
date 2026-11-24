import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  suggestedFor?: string;
  limit?: number;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  suggestedFor,
  limit,
}: PostsProps) {
  const allBlogs = getPosts(["src", "app", "blog", "posts"]);

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  let displayedBlogs: typeof sortedBlogs = [];

  if (suggestedFor) {
    // Rotational recommendation: locate the current blog post in the sorted archive.
    // Circularly select the subsequent posts to ensure every blog page recommends a distinct pair.
    const currentIndex = sortedBlogs.findIndex((p) => p.slug === suggestedFor);
    const countToPick = limit ?? (range && range.length === 2 ? range[1] : 2);
    const total = sortedBlogs.length;

    if (currentIndex !== -1 && total > 1) {
      for (let offset = 1; offset < total && displayedBlogs.length < countToPick; offset++) {
        const candidate = sortedBlogs[(currentIndex + offset) % total];
        if (candidate.slug !== suggestedFor && !exclude.includes(candidate.slug)) {
          displayedBlogs.push(candidate);
        }
      }
    } else {
      displayedBlogs = sortedBlogs
        .filter((p) => p.slug !== suggestedFor && !exclude.includes(p.slug))
        .slice(0, countToPick);
    }
  } else {
    let filtered = sortedBlogs;
    if (exclude.length) {
      filtered = filtered.filter((post) => !exclude.includes(post.slug));
    }

    displayedBlogs = range
      ? filtered.slice(range[0] - 1, range.length === 2 ? range[1] : filtered.length)
      : filtered;

    if (limit && limit > 0) {
      displayedBlogs = displayedBlogs.slice(0, limit);
    }
  }

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid
          columns={columns}
          s={{ columns: 1, marginBottom: "8" }}
          fillWidth
          marginBottom="40"
          gap="16"
        >
          {displayedBlogs.map((post) => (
            <Post
              key={post.slug}
              post={{ slug: post.slug, metadata: post.metadata }}
              thumbnail={thumbnail}
              direction={direction}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
