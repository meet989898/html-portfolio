import type { Metadata } from "next";

import type { Project } from "@/lib/projects";

export const siteMetadata = {
  name: "Meet Gandhi",
  title: "Meet Gandhi | Software Engineer",
  description:
    "Meet Gandhi is a software engineer building reliable products across AI, data, backend, and full-stack systems.",
  url: "https://www.meetgandhi.com",
  defaultSocialImage: "/visuals/portfolio-share.svg",
} as const;

type Profile = typeof import("@/lib/profile").profile;

type SocialMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  imageAlt?: string;
  openGraphType?: "website" | "article" | "profile";
};

export function buildAbsoluteUrl(path = "/") {
  return new URL(path, siteMetadata.url).toString();
}

export function buildSocialMetadata({
  title,
  description,
  path = "/",
  imagePath = siteMetadata.defaultSocialImage,
  imageAlt = title,
  openGraphType = "website",
}: SocialMetadataOptions): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = buildAbsoluteUrl(path);
  const imageUrl = buildAbsoluteUrl(imagePath);

  return {
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMetadata.name,
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function serializeJsonLd(value: object | object[]) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(person: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    email: person.email,
    telephone: person.phone,
    url: siteMetadata.url,
    jobTitle: "Software Engineer",
    homeLocation: {
      "@type": "Place",
      name: person.location,
    },
    sameAs: [person.github, person.linkedin],
    knowsAbout: ["Software Engineering", "Artificial Intelligence", "Machine Learning", "Backend Engineering", "Data Systems"],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
  };
}

export function buildResumePageJsonLd(person: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${person.name} Resume`,
    url: buildAbsoluteUrl("/resume"),
    description: "Web resume for Meet Gandhi.",
    mainEntity: {
      "@type": "Person",
      name: person.name,
      url: siteMetadata.url,
    },
  };
}

export function buildProjectPageJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: project.summary,
    url: buildAbsoluteUrl(`/projects/${project.slug}`),
    image: buildAbsoluteUrl(project.visual.src),
    about: project.portfolioTags,
    keywords: [...project.roleSignals, ...project.techStack],
    creator: {
      "@type": "Person",
      name: siteMetadata.name,
      url: siteMetadata.url,
    },
  };
}
