import Image from "next/image";

import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";

type ProjectVisualProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectVisual({ project, priority = false }: ProjectVisualProps) {
  return (
    <figure className="group relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-black">
      <Image
        alt={project.visual.alt}
        className="aspect-[16/10] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        height={720}
        priority={priority}
        src={project.visual.src}
        width={1152}
      />
      <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-xs text-white backdrop-blur-xl">
        <span>{project.visual.caption}</span>
        <Badge variant="secondary" className="rounded-full bg-white text-black hover:bg-white">
          {project.visual.type === "screenshot" ? "Demo screenshot" : "Concept visual"}
        </Badge>
      </figcaption>
    </figure>
  );
}
