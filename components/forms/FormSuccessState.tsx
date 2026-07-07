"use client";

import { motion } from "motion/react";
import { LottieLoader } from "@/components/interactive/LottieLoader";
import { MICROCOPY } from "@/lib/constants/company";

export function FormSuccessState({ onReset }: { onReset?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-2xl bg-navy/[0.03] px-6 py-12 text-center"
    >
      <LottieLoader kind="success" loop={false} size={72} />
      <h3 className="text-xl font-bold text-navy">{MICROCOPY.formSuccessTitle}</h3>
      <p className="max-w-sm text-sm text-navy/60">{MICROCOPY.formSuccessBody}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-2 text-sm font-semibold text-cherry underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      )}
    </motion.div>
  );
}
