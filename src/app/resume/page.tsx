import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, ExternalLink, Mail, MapPin } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ProfilePhoto } from "@/components/profile-photo";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildPersonJsonLd, buildResumePageJsonLd, buildSocialMetadata, serializeJsonLd } from "@/lib/metadata";
import { education, experience, profile, resumeHighlights, techGroups } from "@/lib/profile";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Web resume for Meet Gandhi.",
  ...buildSocialMetadata({
    title: "Resume",
    description: "Web resume for Meet Gandhi, covering software engineering, AI, backend, data, and research work.",
    path: "/resume",
    imageAlt: "Meet Gandhi resume preview",
    openGraphType: "profile",
  }),
};

export default function ResumePage() {
  const structuredData = serializeJsonLd([buildResumePageJsonLd(profile), buildPersonJsonLd(profile)]);

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <script dangerouslySetInnerHTML={{ __html: structuredData }} type="application/ld+json" />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
            <AnimatedSection className="relative z-10 space-y-7">
              <div>
                <p className="text-sm font-semibold uppercase text-[#d65a31]">Web resume</p>
                <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{profile.name}</h1>
                <p className="mt-5 max-w-3xl text-xl leading-9 text-black/68">{profile.headline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-black text-white hover:bg-black/85" size="lg">
                  <a href={profile.resume} rel="noopener noreferrer" target="_blank">
                    <ExternalLink className="size-4" />
                    Open PDF
                  </a>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <a download="Meet_Gandhi_Resume.pdf" href={profile.resume}>
                    <Download className="size-4" />
                    Download PDF
                  </a>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4" />
                    Email
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-black/60">
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  {profile.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  {profile.location}
                </span>
                <a className="inline-flex items-center gap-1 hover:text-black" href={profile.github} rel="noopener noreferrer" target="_blank">
                  GitHub
                  <ArrowUpRight className="size-3" />
                </a>
                <a className="inline-flex items-center gap-1 hover:text-black" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                  LinkedIn
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection className="relative z-10 grid gap-4 sm:grid-cols-[15rem_1fr] lg:items-end">
              <ProfilePhoto className="h-80" priority />
              <div className="rounded-[1.8rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold uppercase text-black/45">Snapshot</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-3xl font-semibold">3.93</p>
                    <p className="text-sm text-black/55">Graduate GPA</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">4</p>
                    <p className="text-sm text-black/55">Experience tracks</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">4</p>
                    <p className="text-sm text-black/55">Portfolio projects</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold">2026</p>
                    <p className="text-sm text-black/55">MS completion</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {resumeHighlights.map((highlight) => (
            <AnimatedSection className="rounded-[1.6rem] border border-black/10 bg-white/70 p-5 shadow-sm" key={highlight.title}>
              <highlight.icon className="size-6 text-[#d65a31]" />
              <h2 className="mt-4 text-xl font-semibold">{highlight.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/62">{highlight.text}</p>
            </AnimatedSection>
          ))}
        </section>

        <section className="border-y border-black/10 bg-white/55 py-14">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <AnimatedSection>
              <p className="text-sm font-semibold uppercase text-[#d65a31]">Experience</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Applied work across research, ML, analytics, and backend systems.</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {experience.map((item) => (
                <AnimatedSection className="rounded-[1.6rem] border border-black/10 bg-[#f7f3ea] p-5 shadow-sm" key={`${item.role}-${item.organization}`}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold">{item.role}</h3>
                      <p className="mt-1 text-sm text-black/58">
                        {item.organization} {"\u00B7"} {item.location}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-black/55">{item.period}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-black/65">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge className="rounded-full border-black/10" key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="space-y-6">
            <AnimatedSection className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Education</h2>
              <div className="mt-5 space-y-5">
                {education.map((item) => (
                  <div key={item.school}>
                    <h3 className="font-semibold">{item.school}</h3>
                    <p className="mt-1 text-sm text-black/62">{item.detail}</p>
                    <p className="mt-1 text-xs font-medium uppercase text-black/45">{item.period}</p>
                    <p className="mt-2 text-sm leading-6 text-black/58">{item.extra}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="mt-5 space-y-5">
                {techGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-sm font-semibold text-black/50">{group.label}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge className="rounded-full border-black/10" key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold">Selected projects</h2>
                <p className="mt-2 text-sm leading-7 text-black/60">Project work selected for broad SWE, AI, data, backend, and research signal.</p>
              </div>
              <Button asChild className="w-fit rounded-full" variant="outline">
                <Link href="/projects">
                  All projects
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
            <Separator className="my-6" />
            <div className="space-y-5">
              {projects.map((project) => (
                <Link className="group block rounded-[1.4rem] border border-black/10 bg-[#f7f3ea] p-5 transition hover:-translate-y-1 hover:shadow-sm" href={`/projects/${project.slug}`} key={project.slug}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="font-semibold group-hover:underline">{project.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-black/65">{project.resumeBullets[0]}</p>
                    </div>
                    <Badge className="h-fit rounded-full bg-black text-white">{project.statusLabel}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </section>
      </main>
    </div>
  );
}
