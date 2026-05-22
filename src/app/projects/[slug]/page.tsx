import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found | Meet Gandhi" };
  }

  return {
    title: `${project.title} | Meet Gandhi`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Button asChild className="rounded-full border-black/15 bg-white/70" variant="outline">
            <Link href="/#work">
              <ArrowLeft className="size-4" />
              Back to work
            </Link>
          </Button>
          <AnimatedSection className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-black text-white">{project.statusLabel}</Badge>
                {project.roleSignals.map((signal) => (
                  <Badge className="rounded-full border-black/10" key={signal} variant="outline">
                    {signal}
                  </Badge>
                ))}
              </div>
              <div>
                <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{project.title}</h1>
                <p className="mt-4 text-xl leading-8 text-black/62">{project.longSummary}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.repoUrl ? (
                  <Button asChild className="rounded-full bg-black text-white hover:bg-black/85">
                    <a href={project.repoUrl} rel="noreferrer" target="_blank">
                      <Code2 className="size-4" />
                      Repository
                    </a>
                  </Button>
                ) : null}
                {project.demoUrl ? (
                  <Button asChild className="rounded-full" variant="outline">
                    <a href={project.demoUrl} rel="noreferrer" target="_blank">
                      Demo
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            <ProjectVisual priority project={project} />
          </AnimatedSection>
        </section>

        <section className="border-y border-black/10 bg-white/55 py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {project.metrics.map((metric) => (
              <AnimatedSection className="rounded-[1.6rem] border border-black/10 bg-[#f7f3ea] p-6 shadow-sm" key={metric}>
                <p className="text-sm font-semibold uppercase text-black/45">Signal</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">{metric}</p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase text-[#d65a31]">Case study</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">What this project demonstrates</h2>
          </AnimatedSection>
          <AnimatedSection className="space-y-8">
            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Problem</h3>
              <p className="mt-4 text-sm leading-7 text-black/65">{project.caseStudy.problem}</p>
            </article>
            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Approach</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-black/65">
                {project.caseStudy.approach.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d65a31]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Outcome</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-black/65">
                {project.caseStudy.outcome.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#50c8ff]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedSection>
        </section>

        <section className="bg-[#101112] py-14 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase text-[#9df27f]">Stack</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">Technology used or planned</h2>
                </div>
                <p className="max-w-lg text-sm leading-7 text-white/62">
                  Tooling belongs here, where it supports the project story instead of crowding the homepage hero.
                </p>
              </div>
              <Separator className="my-8 bg-white/15" />
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
