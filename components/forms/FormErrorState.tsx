"use client";

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { MICROCOPY } from "@/lib/constants/company";

export function FormErrorState({ message }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: [0, -6, 6, -4, 4, 0] }}
      animate={{ opacity: 1, x: 0 }}
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-cherry/30 bg-cherry/5 px-4 py-3 text-sm text-cherry"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <span>{message ?? MICROCOPY.formErrorBody}</span>
    </motion.div>
  );
}
