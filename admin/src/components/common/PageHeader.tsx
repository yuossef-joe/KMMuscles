import { motion } from "motion/react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.24 }}
    >
      <div>
        {eyebrow ? <p className="text-xs font-black uppercase tracking-wide text-gym-red">{eyebrow}</p> : null}
        <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-zinc-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </motion.div>
  );
}
