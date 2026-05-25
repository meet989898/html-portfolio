import {
  Brain,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  LineChart,
  Server,
  Sparkles,
} from "lucide-react";

export const profile = {
  name: "Meet Gandhi",
  location: "Rochester, NY",
  email: "gandhi.meet.mg@gmail.com",
  phone: "+1-585-957-6935",
  github: "https://github.com/meet989898",
  linkedin: "https://www.linkedin.com/in/meetjg/",
  resume: "/assets/Meet_Gandhi_Resume.pdf",
  headshot: "/assets/meet-gandhi-headshot.jpg",
  headline:
    "Software engineer building reliable products across AI, data, backend, and full-stack systems.",
  intro:
    "I like work that connects clean engineering with useful intelligence: dependable services, thoughtful interfaces, data-heavy workflows, and systems that are easy to reason about.",
};

export const focusAreas = [
  {
    title: "Software Engineering",
    description:
      "Practical product engineering with readable architecture, testing discipline, and deployed user-facing workflows.",
    icon: Code2,
  },
  {
    title: "AI & Machine Learning",
    description:
      "Applied modeling, retrieval, prediction, evaluation, and responsible public demos that make technical work legible.",
    icon: Brain,
  },
  {
    title: "Backend & Cloud",
    description:
      "APIs, service boundaries, deployment, automation, and cloud-aware systems that hold up beyond a notebook.",
    icon: Server,
  },
  {
    title: "Data Systems",
    description:
      "Pipelines, databases, analytics, search, and feature workflows for turning messy information into decisions.",
    icon: Database,
  },
];

export const experience = [
  {
    role: "Research Assistant",
    organization: "Rochester Institute of Technology",
    location: "Rochester, NY",
    period: "Jan 2025 - Oct 2025",
    summary:
      "Researched link prediction and information-retrieval evaluation pipelines, improving model experimentation and data-processing speed.",
    tags: ["Research", "Evaluation", "Python"],
  },
  {
    role: "Machine Learning Intern",
    organization: "Rachana Plastics",
    location: "Mumbai, India",
    period: "May 2024 - Aug 2024",
    summary:
      "Built computer-vision and anomaly-detection workflows for quality-control and operations use cases.",
    tags: ["ML", "Computer Vision", "Cloud"],
  },
  {
    role: "Research Analyst Intern",
    organization: "ABI Analytics",
    location: "Mumbai, India",
    period: "May 2022 - Sep 2022",
    summary:
      "Developed analysis pipelines and business dashboards for financial datasets and decision-support workflows.",
    tags: ["Analytics", "SQL", "Dashboards"],
  },
  {
    role: "Web and App Development Intern",
    organization: "Accruepole Pvt. Ltd.",
    location: "Mumbai, India",
    period: "Jul 2021 - Oct 2021",
    summary:
      "Built backend inventory workflows, APIs, and debugging pipelines for operational software.",
    tags: ["Backend", "REST", "Databases"],
  },
];

export const education = [
  {
    school: "Rochester Institute of Technology",
    detail: "MS in Computer Science, GPA 3.93",
    period: "Aug 2023 - May 2026",
    extra: "Advanced Graduate Certificate in AI and Big Data",
  },
  {
    school: "NMIMS University",
    detail: "B.Tech in IT + MBA in Finance & Business Intelligence",
    period: "Aug 2017 - May 2023",
    extra: "Technology, business intelligence, and finance foundation",
  },
];

export const techGroups = [
  {
    label: "Languages",
    icon: Layers3,
    items: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "SQL", "Ruby"],
  },
  {
    label: "AI & Data",
    icon: Sparkles,
    items: ["PyTorch", "TensorFlow", "Transformers", "NLP", "Ranking", "NumPy", "Pandas"],
  },
  {
    label: "Backend & Cloud",
    icon: Cloud,
    items: ["FastAPI", "Node.js", "REST APIs", "AWS", "Docker", "CI/CD", "PostgreSQL"],
  },
  {
    label: "Systems & Tools",
    icon: LineChart,
    items: ["Vector Search", "MongoDB", "Neo4j", "Git", "PowerBI", "Testing", "Dashboards"],
  },
];

export const stats = [
  { label: "Graduate GPA", value: "3.93" },
  { label: "Experience Tracks", value: "4" },
  { label: "Public Projects", value: "4" },
];

export const quickSignals = [
  { label: "Open to", value: "SWE, ML/AI, Backend, Data" },
  { label: "Current", value: "MS Computer Science at RIT" },
  { label: "Style", value: "Product-minded, systems-aware, demo-driven" },
];

export const resumeHighlights = [
  {
    icon: BriefcaseBusiness,
    title: "Applied Experience",
    text: "Research, ML engineering, analytics, and backend internships across academic and industry settings.",
  },
  {
    icon: GraduationCap,
    title: "Graduate Foundation",
    text: "Computer science graduate work with AI, big data, retrieval, ranking, and software systems depth.",
  },
  {
    icon: Sparkles,
    title: "Portfolio Direction",
    text: "Every public project is being shaped into a deployable, visual, and understandable product demo.",
  },
];
