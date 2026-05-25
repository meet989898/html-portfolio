import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, ExternalLink, Server } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildProjectPageJsonLd, buildSocialMetadata, serializeJsonLd } from "@/lib/metadata";
import { getProject } from "@/lib/projects";

const simba = getProject("simba");

export const metadata: Metadata = {
  title: "SIMBA Chess Demo",
  description: "SIMBA chess similarity search landing page, demo links, and reliability migration notes.",
  ...buildSocialMetadata({
    title: "SIMBA Chess Demo",
    description: "SIMBA chess similarity search landing page, demo links, and reliability migration notes.",
    path: "/chess",
    imagePath: simba?.visual.src,
    imageAlt: "SIMBA chess similarity search visual",
    openGraphType: "article",
  }),
};

export default function ChessPage() {
  if (!simba) {
    return null;
  }

  const structuredData = serializeJsonLd(buildProjectPageJsonLd(simba));

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <script dangerouslySetInnerHTML={{ __html: structuredData }} type="application/ld+json" />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
            <AnimatedSection className="space-y-7">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-black text-white">Always-on landing page</Badge>
                <Badge className="rounded-full border-black/10" variant="outline">
                  Streamlit demo linked
                </Badge>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-[#d65a31]">chess.meetgandhi.com</p>
                <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">SIMBA Chess Similarity Search</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">
                  A permanent entry point for the SIMBA capstone: project story, code, and the hosted Streamlit demo while the more reliable production demo architecture is built.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-black text-white hover:bg-black/85" size="lg">
                  <a href="https://chess-meet.streamlit.app/" rel="noopener noreferrer" target="_blank">
                    Launch Streamlit demo
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <a href={simba.repoUrl} rel="noopener noreferrer" target="_blank">
                    <Code2 className="size-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <Link href="/projects/simba">
                    Case study
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <ProjectVisual priority project={simba} />
            </AnimatedSection>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ["Current demo", "Streamlit Community Cloud is linked for the interactive chess search experience."],
            ["Reliability layer", "This Vercel page stays available even when the free Streamlit app is sleeping."],
            ["Migration path", "The long-term version should split a Next.js frontend from a Python search API."],
          ].map(([title, text]) => (
            <AnimatedSection className="rounded-[1.6rem] border border-black/10 bg-white/70 p-6 shadow-sm" key={title}>
              <Server className="size-6 text-[#d65a31]" />
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/62">{text}</p>
            </AnimatedSection>
          ))}
        </section>

        <section className="bg-[#101112] py-14 text-white">
          <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase text-[#9df27f]">Why this page exists</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">A stable recruiter link while the demo stack matures.</h2>
            <Separator className="my-8 bg-white/15" />
            <div className="grid gap-5 md:grid-cols-2">
              <p className="text-sm leading-7 text-white/68">
                Streamlit Community Cloud can sleep on the free tier, so this subdomain gives recruiters a dependable page with the context, repo, and launch link.
              </p>
              <p className="text-sm leading-7 text-white/68">
                The migration target is reusable for future demos: a Vercel-hosted Next.js interface backed by lightweight Python APIs or an always-on backend when the model workload needs it.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild className="rounded-full bg-white text-black hover:bg-white/90">
                <a href="https://github.com/meet989898/SIMBA" rel="noopener noreferrer" target="_blank">
                  Review SIMBA source
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </section>
      </main>
    </div>
  );
}
