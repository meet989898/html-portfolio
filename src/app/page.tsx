import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { HeroVisual } from "@/components/hero-visual";
import { ProfilePhoto } from "@/components/profile-photo";
import { ProjectCard } from "@/components/project-card";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildPersonJsonLd, buildWebsiteJsonLd, serializeJsonLd } from "@/lib/metadata";
import { education, experience, focusAreas, profile, quickSignals, stats, techGroups } from "@/lib/profile";
import { featuredProjects, projects } from "@/lib/projects";

export default function Home() {
  const structuredData = serializeJsonLd([buildWebsiteJsonLd(), buildPersonJsonLd(profile)]);

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <script dangerouslySetInnerHTML={{ __html: structuredData }} type="application/ld+json" />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
          <div className="mx-auto grid min-h-[calc(92svh-73px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
            <AnimatedSection className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2 text-sm font-medium text-black/70 shadow-sm backdrop-blur">
                <Sparkles className="size-4 text-[#d65a31]" />
                Open to software engineering, AI, backend, data, and full-stack roles
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-black sm:text-7xl lg:text-8xl">
                  Meet Gandhi
                </h1>
                <p className="max-w-2xl text-xl leading-9 text-black/70 sm:text-2xl">{profile.headline}</p>
                <p className="hidden max-w-2xl text-base leading-8 text-black/62 sm:block">{profile.intro}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-black text-white hover:bg-black/85" size="lg">
                  <Link href="#work">
                    View work
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <Link href="/resume">
                    <Download className="size-4" />
                    Resume
                  </Link>
                </Button>
                <Button asChild className="rounded-full border-black/15 bg-white/70" size="lg" variant="outline">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4" />
                    Email
                  </a>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection className="relative z-10" style={{ transitionDelay: "120ms" }}>
              <HeroVisual />
            </AnimatedSection>
          </div>
        </section>

        <AnimatedSection className="relative z-20 mx-auto mt-6 grid max-w-7xl gap-4 px-4 pb-8 pt-0 sm:-mt-16 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:px-8">
          {stats.map((stat) => (
            <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur" key={stat.label}>
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-black/55">{stat.label}</p>
            </div>
          ))}
          {quickSignals.map((signal) => (
            <div className="rounded-3xl border border-black/10 bg-white/65 p-5 shadow-sm" key={signal.label}>
              <p className="text-xs font-semibold uppercase text-black/45">{signal.label}</p>
              <p className="mt-2 text-base font-medium text-black/78">{signal.value}</p>
            </div>
          ))}
        </AnimatedSection>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="about">
          <AnimatedSection className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase text-[#d65a31]">Focus</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Broad CS depth, presented without buzzword overload.
              </h2>
              <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
                <ProfilePhoto className="h-60 sm:h-full" />
                <div className="rounded-[1.6rem] border border-black/10 bg-white/70 p-5 shadow-sm">
                  <p className="text-sm leading-7 text-black/62">{profile.intro}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["AI", "Backend", "Data", "Full-stack"].map((item) => (
                      <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <article className="rounded-[1.6rem] border border-black/10 bg-white/70 p-6 shadow-sm" key={area.title}>
                  <area.icon className="size-6 text-[#d65a31]" />
                  <h3 className="mt-5 text-xl font-semibold">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/62">{area.description}</p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <section className="bg-[#101112] py-16 text-white" id="work">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-[#9df27f]">Featured work</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Live and upcoming projects shaped as real product demos.
                </h2>
              </div>
              <Button asChild className="w-fit rounded-full bg-white text-black hover:bg-white/90">
                <a href={profile.github} rel="noopener noreferrer" target="_blank">
                  <Code2 className="size-4" />
                  GitHub
                </a>
              </Button>
            </AnimatedSection>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <AnimatedSection key={project.slug}>
                  <ProjectCard priority={index < 2} project={project} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="gallery">
          <AnimatedSection>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-[#d65a31]">Visual gallery</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Project media that will evolve from concept visuals into live demo screenshots.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-black/62">
                Generated visuals are labeled clearly. When demos go live, screenshots will replace the concept frames.
              </p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectVisual key={project.slug} priority={index < 2} project={project} />
              ))}
            </div>
          </AnimatedSection>
        </section>

        <section className="border-y border-black/10 bg-white/55 py-16" id="experience">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-[#d65a31]">Experience</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Built across research, product, data, and backend work.</h2>
                <div className="mt-7 flex items-center gap-2 text-sm text-black/60">
                  <MapPin className="size-4" />
                  {profile.location}
                </div>
              </div>
              <div className="space-y-4">
                {experience.map((item) => (
                  <article className="rounded-[1.6rem] border border-black/10 bg-[#f7f3ea] p-5" key={`${item.role}-${item.organization}`}>
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
                  </article>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="stack">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase text-[#d65a31]">Tech stack</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Tools are organized by capability, not squeezed into the hero.
            </h2>
            <Tabs className="mt-9" defaultValue={techGroups[0].label}>
              <TabsList className="h-auto flex-wrap rounded-full bg-black p-1 text-white">
                {techGroups.map((group) => (
                  <TabsTrigger className="rounded-full px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-black" key={group.label} value={group.label}>
                    {group.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {techGroups.map((group) => (
                <TabsContent className="mt-6" key={group.label} value={group.label}>
                  <div className="rounded-[1.8rem] border border-black/10 bg-white/70 p-6 shadow-sm">
                    <group.icon className="size-7 text-[#d65a31]" />
                    <div className="mt-6 flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <span className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedSection className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-[#d65a31]">Education</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Academic foundation with applied direction.</h2>
            </div>
            <div className="grid gap-4">
              {education.map((item) => (
                <article className="rounded-[1.6rem] border border-black/10 bg-white/70 p-6 shadow-sm" key={item.school}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold">{item.school}</h3>
                      <p className="mt-1 text-sm text-black/62">{item.detail}</p>
                    </div>
                    <p className="text-sm font-medium text-black/55">{item.period}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-black/62">{item.extra}</p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <section className="bg-[#101112] py-16 text-white" id="contact">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <AnimatedSection className="space-y-6">
              <p className="text-sm font-semibold uppercase text-[#9df27f]">Contact</p>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Have a role, project, or conversation in mind?</h2>
              <p className="max-w-xl text-base leading-8 text-white/68">
                Use the form for quick notes, or reach me directly through email and social links.
              </p>
              <div className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:items-stretch">
                <ProfilePhoto className="h-44 border-white/15 bg-white/10" />
                <div className="rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-semibold uppercase text-white/45">Quick links</p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    Prefer direct links? The branded shortcuts below stay memorable across resumes, applications, and project demos.
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-white/78 sm:grid-cols-2">
                    <span>resume.meetgandhi.com</span>
                    <span>projects.meetgandhi.com</span>
                    <span>github.meetgandhi.com</span>
                    <span>linkedin.meetgandhi.com</span>
                  </div>
                </div>
              </div>
              <Separator className="bg-white/15" />
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-white text-black hover:bg-white/90">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4" />
                    Email
                  </a>
                </Button>
                <Button asChild className="rounded-full border-white/20 text-white hover:bg-white/10" variant="outline">
                  <a href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                    <BriefcaseBusiness className="size-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild className="rounded-full border-white/20 text-white hover:bg-white/10" variant="outline">
                  <a href={profile.github} rel="noopener noreferrer" target="_blank">
                    <Code2 className="size-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[#f7f3ea] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-black/58 sm:flex-row">
          <p>{"\u00A9"} 2026 {profile.name}</p>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-black" href="/resume">
              Web resume
            </Link>
            <a className="hover:text-black" download="Meet_Gandhi_Resume.pdf" href={profile.resume}>
              PDF resume
            </a>
            <a className="inline-flex items-center gap-1 hover:text-black" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
