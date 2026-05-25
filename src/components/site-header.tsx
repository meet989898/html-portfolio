import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Code2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/scroll-progress";
import { profile } from "@/lib/profile";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f3ea]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link className="group flex items-center gap-3" href="/">
            <span className="grid size-10 place-items-center rounded-2xl bg-black text-sm font-semibold text-white transition-transform group-hover:-rotate-6">
              MG
            </span>
            <span className="hidden text-sm font-semibold text-black sm:block">{profile.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-black/65 md:flex">
            {navItems.map((item) => (
              <Link className="transition hover:text-black" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="icon" variant="ghost" aria-label="GitHub profile">
              <a href={profile.github} rel="noopener noreferrer" target="_blank">
                <Code2 className="size-4" />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" aria-label="LinkedIn profile">
              <a href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                <BriefcaseBusiness className="size-4" />
              </a>
            </Button>
            <Button asChild className="hidden rounded-full bg-black text-white hover:bg-black/85 sm:inline-flex">
              <Link href="/resume">
                Resume
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
