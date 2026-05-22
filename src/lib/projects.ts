import { z } from "zod";

import rawProjects from "../../data/projects.json";

export const projectStatusSchema = z.enum(["live", "building", "planned", "research"]);
export const projectTagSchema = z.enum(["ai", "ml", "data", "backend", "frontend", "research"]);
export const visualTypeSchema = z.enum(["concept", "screenshot"]);

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  subtitle: z.string().min(1),
  cardStatus: z.string().min(1),
  status: projectStatusSchema,
  statusLabel: z.string().min(1),
  featuredOrder: z.number().int().nonnegative(),
  summary: z.string().min(1),
  longSummary: z.string().min(1),
  roleSignals: z.array(z.string().min(1)).min(1),
  techStack: z.array(z.string().min(1)).min(1),
  portfolioTags: z.array(projectTagSchema).min(1),
  demoUrl: z.string(),
  repoUrl: z.string(),
  metrics: z.array(z.string().min(1)).min(1),
  resumeBullets: z.array(z.string().min(1)).min(1),
  visual: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    type: visualTypeSchema,
    caption: z.string().min(1),
  }),
  caseStudy: z.object({
    problem: z.string().min(1),
    approach: z.array(z.string().min(1)).min(1),
    outcome: z.array(z.string().min(1)).min(1),
  }),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectTag = z.infer<typeof projectTagSchema>;

const parsedProjects = z.array(projectSchema).parse(rawProjects);

export const projects = [...parsedProjects].sort((a, b) => a.featuredOrder - b.featuredOrder);

export const featuredProjects = projects.filter((project) => project.featuredOrder < 4);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectTags() {
  const tags = new Set<ProjectTag>();
  projects.forEach((project) => project.portfolioTags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
