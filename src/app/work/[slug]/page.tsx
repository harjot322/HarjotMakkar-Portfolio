import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import { canViewPath } from "@/utils/pageAccessServer";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Badge,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const isSvg = (img?: string) => !img || img.endsWith(".svg");
  const ogImage = !isSvg(post.metadata.image)
    ? post.metadata.image
    : `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`;

  const metadata = Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: ogImage,
    path: `${work.path}/${post.slug}`,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  // Password-protected: render nothing without access (RouteGuard shows the form).
  if (!(await canViewPath(`${work.path}/${post.slug}`))) {
    return null;
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
      "aria-label": person.name,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingX="16" fillWidth>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image && !post.metadata.image.endsWith(".svg")
            ? post.metadata.image
            : `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center" paddingX="16">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m" wrap="balance" align="center">
          {post.metadata.title}
        </Heading>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <Row gap="8" wrap horizontal="center" marginTop="8">
            {post.metadata.tags.map((tag) => (
              <Badge key={tag} effect={false}>
                {tag}
              </Badge>
            ))}
          </Row>
        )}
      </Column>
      <Row marginBottom="32" horizontal="center" gap="16" vertical="center" wrap>
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
        {post.metadata.link && (
          <Row gap="8" vertical="center">
            <Text onBackground="neutral-weak">·</Text>
            <SmartLink href={post.metadata.link} suffixIcon="arrowUpRightFromSquare">
              <Text variant="label-default-m">LinkedIn Post</Text>
            </SmartLink>
          </Row>
        )}
      </Row>
      {post.metadata.images.length > 0 && (
        <Media
          fillWidth
          enlarge
          priority
          aspectRatio={post.metadata.aspectRatio || "16 / 9"}
          objectFit="contain"
          radius="m"
          alt={post.metadata.title}
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs" fillWidth paddingX="16">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects suggestedFor={post.slug} limit={2} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
