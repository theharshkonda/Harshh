export interface HeroMetric {
  label: string;
  value: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  summary: string;
  demoLabel: string;
  metrics: string[];
  tech: string[];
  architecture: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  detail: string;
}

export interface PortfolioContent {
  name: string;
  title: string;
  location: string;
  headline: string;
  subheadline: string;
  heroMetrics: HeroMetric[];
  about: {
    intro: string;
    highlights: string[];
    timeline: TimelineItem[];
  };
  skills: Record<string, string[]>;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  contact: ContactItem[];
}
