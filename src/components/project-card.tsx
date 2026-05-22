import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

import { ProjectVisual } from "@/components/project-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/projects";

const statusTone: Record<Project["status"], string> = {
  live: "bg-emerald-100 text-emerald-950",
  building: "bg-sky-100 text-sky-950",
  planned: "bg-amber-100 text-amber-950",
  research: "bg-violet-100 text-violet-950",
};

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Card className="overflow-hidden rounded-[1.8rem] border-black/10 bg-white/75 shadow-sm backdrop-blur" data-testid="project-card">
      <ProjectVisual priority={priority} project={project} />
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`rounded-full ${statusTone[project.status]}`}>
            {project.statusLabel}
          </Badge>
          {project.roleSignals.slice(0, 2).map((signal) => (
            <Badge className="rounded-full border-black/10" variant="outline" key={signal}>
              {signal}
            </Badge>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-black">{project.title}</h3>
          <p className="mt-1 text-sm font-medium text-black/55">{project.subtitle}</p>
        </div>

        <p className="text-sm leading-7 text-black/68">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-black/70" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild className="rounded-full bg-black text-white hover:bg-black/85">
            <Link href={`/projects/${project.slug}`}>
              Case study
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          {project.repoUrl ? (
            <Button asChild className="rounded-full" variant="outline">
              <a href={project.repoUrl} rel="noreferrer" target="_blank">
                <Code2 className="size-4" />
                Code
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
