import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectsIndex } from "@/components/projects-index";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { buildSocialMetadata } from "@/lib/metadata";
import { getProjectTags, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project index for Meet Gandhi's software engineering, AI, data, backend, and research work.",
  ...buildSocialMetadata({
    title: "Projects",
    description: "Project index for Meet Gandhi's software engineering, AI, data, backend, and research work.",
    path: "/projects",
    imageAlt: "Meet Gandhi projects preview",
  }),
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
          <AnimatedSection className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-sm font-semibold uppercase text-[#d65a31]">Project index</p>
            <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Projects built as public proof.</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">
                  A filterable index for live, building, upcoming, and research projects across software engineering, AI, data systems, backend work, and visualization.
                </p>
              </div>
              <Button asChild className="w-fit rounded-full bg-black text-white hover:bg-black/85">
                <a href="https://github.com/meet989898" rel="noopener noreferrer" target="_blank">
                  GitHub profile
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <ProjectsIndex projects={projects} tags={getProjectTags()} />
        </section>
      </main>
    </div>
  );
}
