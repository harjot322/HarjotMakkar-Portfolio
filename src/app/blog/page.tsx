import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Newsletter } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default function Blog() {
  const allBlogs = getPosts(["src", "app", "blog", "posts"]);
  const hasMultiplePosts = allBlogs.length > 1;

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40" s={{ gap: "24" }}>
        <Posts range={[1, 1]} thumbnail />
        {hasMultiplePosts && (
          <Posts range={[2]} columns="2" thumbnail direction="column" />
        )}
        <Newsletter marginBottom="l" />
      </Column>
    </Column>
  );
}
