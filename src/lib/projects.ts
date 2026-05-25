import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import rawProjects from "../../data/projects.json";

export const projectStatusSchema = z.enum(["live", "building", "planned", "research"]);
export const projectTagSchema = z.enum(["ai", "ml", "data", "backend", "frontend", "research"]);
export const visualTypeSchema = z.enum(["concept", "screenshot"]);
const optionalHttpsUrlSchema = z.union([z.literal(""), z.url().startsWith("https://")]);
const publicDir = path.resolve(process.cwd(), "public");

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
  demoUrl: optionalHttpsUrlSchema,
  repoUrl: optionalHttpsUrlSchema,
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

const projectManifestSchema = z.array(projectSchema).superRefine((projects, ctx) => {
  const seenSlugs = new Set<string>();
  const seenFeaturedOrders = new Set<number>();
  const normalizedPublicDir = publicDir.toLowerCase();

  projects.forEach((project, index) => {
    if (seenSlugs.has(project.slug)) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate project slug '${project.slug}'.`,
        path: [index, "slug"],
      });
    } else {
      seenSlugs.add(project.slug);
    }

    if (seenFeaturedOrders.has(project.featuredOrder)) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate featuredOrder '${project.featuredOrder}'.`,
        path: [index, "featuredOrder"],
      });
    } else {
      seenFeaturedOrders.add(project.featuredOrder);
    }

    if (!project.visual.src.startsWith("/")) {
      ctx.addIssue({
        code: "custom",
        message: "visual.src must start with '/' so it resolves from the public directory.",
        path: [index, "visual", "src"],
      });
      return;
    }

    const relativeVisualPath = project.visual.src.replace(/^\/+/, "");
    const resolvedVisualPath = path.resolve(publicDir, relativeVisualPath);
    const normalizedVisualPath = resolvedVisualPath.toLowerCase();

    if (normalizedVisualPath !== normalizedPublicDir && !normalizedVisualPath.startsWith(`${normalizedPublicDir}${path.sep}`)) {
      ctx.addIssue({
        code: "custom",
        message: "visual.src must stay within the public directory.",
        path: [index, "visual", "src"],
      });
      return;
    }

    if (!fs.existsSync(resolvedVisualPath)) {
      ctx.addIssue({
        code: "custom",
        message: `visual.src points to a missing asset: ${project.visual.src}`,
        path: [index, "visual", "src"],
      });
    }
  });
});

const parsedProjects = projectManifestSchema.parse(rawProjects);

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
