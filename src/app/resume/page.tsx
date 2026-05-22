import Link from "next/link";
import { Download, Mail, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { education, experience, profile, resumeHighlights, techGroups } from "@/lib/profile";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Resume | Meet Gandhi",
  description: "Web resume for Meet Gandhi.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f7f3ea] text-black">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-sm sm:p-9">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-[#d65a31]">Resume</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{profile.name}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-black/64">{profile.headline}</p>
            </div>
            <Button asChild className="w-fit rounded-full bg-black text-white hover:bg-black/85">
              <a href={profile.resume}>
                <Download className="size-4" />
                Download PDF
              </a>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-black/60">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" />
              {profile.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {profile.location}
            </span>
            <Link className="hover:text-black" href={profile.github}>
              GitHub
            </Link>
            <Link className="hover:text-black" href={profile.linkedin}>
              LinkedIn
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {resumeHighlights.map((highlight) => (
            <article className="rounded-[1.6rem] border border-black/10 bg-white/70 p-5 shadow-sm" key={highlight.title}>
              <highlight.icon className="size-6 text-[#d65a31]" />
              <h2 className="mt-4 text-xl font-semibold">{highlight.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/62">{highlight.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Education</h2>
              <div className="mt-5 space-y-5">
                {education.map((item) => (
                  <div key={item.school}>
                    <h3 className="font-semibold">{item.school}</h3>
                    <p className="mt-1 text-sm text-black/62">{item.detail}</p>
                    <p className="mt-1 text-xs font-medium uppercase text-black/45">{item.period}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
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
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Experience</h2>
              <div className="mt-5 space-y-6">
                {experience.map((item) => (
                  <div key={`${item.role}-${item.organization}`}>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <h3 className="font-semibold">{item.role}</h3>
                        <p className="text-sm text-black/58">{item.organization}</p>
                      </div>
                      <p className="text-xs font-medium uppercase text-black/45">{item.period}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-black/65">{item.summary}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-black/10 bg-white/70 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <div className="mt-5 space-y-5">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.slug}>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-black/65">{project.resumeBullets[0]}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
