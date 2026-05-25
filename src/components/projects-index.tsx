"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import type { Project, ProjectTag } from "@/lib/projects";

type ProjectsIndexProps = {
  projects: Project[];
  tags: ProjectTag[];
};

const tagLabels: Record<ProjectTag, string> = {
  ai: "AI",
  ml: "ML",
  data: "Data",
  backend: "Backend",
  frontend: "Frontend",
  research: "Research",
};

export function ProjectsIndex({ projects, tags }: ProjectsIndexProps) {
  const [activeTag, setActiveTag] = useState<ProjectTag | "all">("all");

  const visibleProjects = useMemo(() => {
    if (activeTag === "all") return projects;
    return projects.filter((project) => project.portfolioTags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 rounded-[1.6rem] border border-black/10 bg-white/65 p-3 shadow-sm backdrop-blur">
        <div className="mr-1 hidden items-center gap-2 px-2 text-sm font-medium text-black/55 sm:flex">
          <Filter className="size-4" />
          Filter
        </div>
        <Button
          className="rounded-full"
          onClick={() => setActiveTag("all")}
          size="sm"
          type="button"
          variant={activeTag === "all" ? "default" : "outline"}
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            className="rounded-full"
            key={tag}
            onClick={() => setActiveTag(tag)}
            size="sm"
            type="button"
            variant={activeTag === tag ? "default" : "outline"}
          >
            {tagLabels[tag]}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <AnimatedSection key={project.slug}>
            <ProjectCard priority={index < 2} project={project} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
