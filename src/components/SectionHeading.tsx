import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <Badge className="mb-5">{eyebrow}</Badge>
      <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-mist/72 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}
