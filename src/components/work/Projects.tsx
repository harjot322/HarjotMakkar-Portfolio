import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  suggestedFor?: string;
  limit?: number;
}

export function Projects({ range, exclude = [], suggestedFor, limit }: ProjectsProps) {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  let displayedProjects: typeof sortedProjects = [];

  if (suggestedFor) {
    const currentIndex = sortedProjects.findIndex((p) => p.slug === suggestedFor);
    const countToPick = limit ?? (range && range[1] ? range[1] : 2);
    const total = sortedProjects.length;

    if (currentIndex !== -1 && total > 1) {
      for (let offset = 1; offset < total && displayedProjects.length < countToPick; offset++) {
        const candidate = sortedProjects[(currentIndex + offset) % total];
        if (candidate.slug !== suggestedFor && !exclude.includes(candidate.slug)) {
          displayedProjects.push(candidate);
        }
      }
    } else {
      displayedProjects = sortedProjects
        .filter((p) => p.slug !== suggestedFor && !exclude.includes(p.slug))
        .slice(0, countToPick);
    }
  } else {
    let filtered = sortedProjects;
    if (exclude && exclude.length > 0) {
      filtered = filtered.filter((post) => !exclude.includes(post.slug));
    }

    displayedProjects = range
      ? filtered.slice(range[0] - 1, range[1] ?? filtered.length)
      : filtered;

    if (limit && limit > 0) {
      displayedProjects = displayedProjects.slice(0, limit);
    }
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          hasContent={post.content.trim() !== ""}
          avatars={
            post.metadata.team?.map((member) => ({
              src: member.avatar,
              "aria-label": member.name,
            })) || []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
