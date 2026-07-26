import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8
      }}
      className="
        rounded-xl
        bg-white
        p-6
        shadow
      "
    >
      <Icon className="h-8 w-8" />

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </motion.div>
  );
}