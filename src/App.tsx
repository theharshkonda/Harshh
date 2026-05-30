import { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Download,
  Mail,
  Sparkles,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { PipelinePlayground } from "@/components/PipelinePlayground";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const HeroScene = lazy(() => import("@/components/HeroScene"));

function DoodleArrow() {
  return (
    <svg
      viewBox="0 0 160 48"
      className="h-12 w-40 text-salmon"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 28C39 7 84 8 116 23C126 27 138 31 154 12M154 12L145 12M154 12L151 21"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="7 7"
      />
    </svg>
  );
}

export default function App() {
  const { content, error } = usePortfolioContent();

  const skillEntries = useMemo(
    () => (content ? Object.entries(content.skills) : []),
    [content],
  );
  if (error) {
    return <div className="p-10 text-white">{error}</div>;
  }

  if (!content) {
    return <div className="p-10 text-white">Loading portfolio...</div>;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[540px] max-w-6xl rounded-full bg-neon/10 blur-3xl" />

      <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <div className="glass-panel rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
          {content.name}
        </div>
        <nav className="hidden items-center gap-6 rounded-full border border-white/10 bg-black/20 px-6 py-3 text-sm text-mist/80 backdrop-blur-xl md:flex">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <section className="grid min-h-[calc(100vh-100px)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge className="mb-6">Data Engineering + AI Portfolio</Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl font-semibold leading-tight text-white md:text-7xl"
            >
              <span className="block">{content.headline}</span>
              <span className="text-gradient">{content.subheadline}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-mist/72"
            >
              {content.about.intro}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects">
                <Button>
                  Explore Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="./Harshvardhan_Konda_AI.pdf" download>
                <Button variant="ghost">
                  Download Resume
                  <Download className="h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {content.heroMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                >
                  <Card className="glass-panel p-5">
                    <p className="text-3xl font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-mist/60">{metric.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 hidden animate-float-fast lg:block">
              <DoodleArrow />
            </div>
            <Card className="glass-panel overflow-hidden p-3">
              <Suspense fallback={<div className="h-[420px] rounded-[28px] bg-white/5 md:h-[520px]" />}>
                <HeroScene />
              </Suspense>
            </Card>
            <div className="absolute -bottom-5 right-4 rounded-[24px] border border-white/10 bg-black/35 p-4 shadow-panel backdrop-blur-xl">
              <p className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-mist/55">
                <Sparkles className="h-4 w-4 text-lime" />
                Live Architecture View
              </p>
              <p className="mt-2 text-sm text-white">
                Streaming packets. AWS-inspired topology. Mouse-reactive camera drift.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="About" title="Professional summary." description={content.about.intro} />
          <div className="grid gap-6">
            <Card className="glass-panel p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-salmon/75">Journey Notes</p>
              <div className="mt-5 space-y-5">
                {content.about.timeline.map((item) => (
                  <div key={item.year} className="grid gap-2 border-l border-white/10 pl-5">
                    <p className="text-sm font-semibold text-neon">{item.year}</p>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="text-mist/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              {content.about.highlights.map((highlight) => (
                <Card key={highlight} className="glass-panel p-5">
                  <p className="text-base leading-7 text-mist/75">{highlight}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20">
          <SectionHeading
            eyebrow="Skills"
            title="Technical skills from the resume."
            description="Grouped directly from the resume so recruiters see the exact stack, platforms, and tooling called out in your experience."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {skillEntries.map(([group, values], groupIndex) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: groupIndex * 0.06 }}
              >
                <Card className="glass-panel h-full p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">{group}</h3>
                    <BrainCircuit className="h-5 w-5 text-neon" />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {values.map((skill, index) => (
                      <motion.div
                        key={skill}
                        whileHover={{ y: -4, rotate: index % 2 === 0 ? -2 : 2, scale: 1.02 }}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-20">
          <SectionHeading
            eyebrow="Experience"
            title="Work experience from the resume."
            description="Roles, dates, and responsibilities are aligned to the resume content without added claims."
          />
          <div className="mt-12 grid gap-6">
            {content.experience.map((item, index) => (
              <Card key={`${item.company}-${item.period}`} className="glass-panel p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-neon/70">{item.period}</p>
                    <h3 className="mt-3 font-display text-2xl text-white">{item.role}</h3>
                    <p className="mt-2 text-lg text-mist/75">{item.company}</p>
                    <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-neon to-violet" />
                  </div>
                  <div className="space-y-4">
                    {item.achievements.map((achievement) => (
                      <div key={achievement} className="rounded-3xl border border-white/10 bg-black/15 p-4 text-mist/72">
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
                {index < content.experience.length - 1 ? (
                  <div className="mt-6 h-px bg-white/8" />
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20">
          <SectionHeading
            eyebrow="Projects"
            title="Projects from the resume."
            description="Project summaries and tech stacks are mapped to the resume content only."
          />
          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            {content.projects.map((project) => (
              <motion.article
                key={project.name}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Card className="glass-panel h-full overflow-hidden p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-white">{project.name}</h3>
                      <p className="mt-3 text-mist/72">{project.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[26px] border border-white/10 bg-[#08101d] p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-mist/50">Architecture Diagram</p>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {project.architecture.map((node, index) => (
                        <div key={node} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-white">
                          {node}
                          {index < project.architecture.length - 1 ? (
                            <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-salmon md:block">
                              →
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-mist/50">Metrics</p>
                      <div className="mt-3 space-y-2 text-mist/75">
                        {project.metrics.map((metric) => (
                          <p key={metric}>{metric}</p>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-mist/50">Tech Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="py-20">
          <SectionHeading
            eyebrow="Education"
            title="Academic background."
            description="Included directly from the resume so the profile stays consistent end to end."
          />
          <div className="mt-12 grid gap-6">
            {content.education.map((item) => (
              <Card key={`${item.institution}-${item.period}`} className="glass-panel p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-neon/70">{item.period}</p>
                <h3 className="mt-3 font-display text-2xl text-white">{item.degree}</h3>
                <p className="mt-2 text-lg text-mist/75">{item.institution}</p>
                <p className="mt-5 text-mist/72">{item.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="certifications" className="py-20">
          <SectionHeading
            eyebrow="Certifications"
            title="Certifications and achievements."
            description="These items are listed from the resume without adding extra credentials."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.certifications.map((certification) => (
              <Card key={certification.title} className="glass-panel p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-lime/30 bg-lime/10 text-lime">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{certification.title}</h3>
                <p className="mt-2 text-mist/68">{certification.issuer}</p>
                <p className="mt-4 text-sm uppercase tracking-[0.22em] text-neon/70">
                  {certification.year}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeading
            eyebrow="Playground"
            title="A miniature ETL simulator with animated movement."
            description="The section is intentionally interactive so the site feels like a product experience rather than a static resume."
          />
          <div className="mt-12">
            <PipelinePlayground />
          </div>
        </section>

        <section id="contact" className="py-20">
          <Card className="glass-panel relative overflow-hidden p-8 md:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
            <SectionHeading
              eyebrow="Contact"
              title="Let’s talk about data platforms, AI products, or platform modernization."
              description="Everything here is static, GitHub Pages-ready, and easy to customize. The contact panel keeps the recruiter path short."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.contact.map((item) => (
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") || item.href.startsWith("tel:") || item.href.startsWith("./") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") || item.href.startsWith("tel:") || item.href.startsWith("./") ? undefined : "noreferrer"}
                    className="rounded-[26px] border border-white/10 bg-black/15 p-5 transition hover:-translate-y-1 hover:border-neon/35"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-mist/50">{item.label}</p>
                    <p className="mt-3 text-white">{item.value}</p>
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="rounded-[26px] border border-white/10 bg-black/15 p-5"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-mist/50">{item.label}</p>
                    <p className="mt-3 text-white">{item.value}</p>
                  </div>
                )
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:harshkonda2002@gmail.com" aria-label="Email">
                <Button variant="outline">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </a>
              <a href="tel:+919527728149" aria-label="Phone">
                <Button variant="outline">
                  <Phone className="h-4 w-4" />
                  Phone
                </Button>
              </a>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
