"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Common = {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  className?: string;
  required?: boolean;
};

type InputField = Common & {
  as?: "input";
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
};

type TextareaField = Common & {
  as: "textarea";
  rows?: number;
};

type SelectField = Common & {
  as: "select";
  options: readonly string[];
  placeholder?: string;
};

export function AnimatedFormField(
  props: InputField | TextareaField | SelectField,
) {
  const { label, error, registration, className, required } = props;
  const [focused, setFocused] = useState(false);
  const errorId = `${registration.name}-error`;

  const baseFieldClasses = cn(
    "peer w-full rounded-xl border bg-white px-4 pb-2.5 pt-6 text-sm text-navy outline-none transition-all duration-200 placeholder-transparent",
    error
      ? "border-cherry focus:ring-2 focus:ring-cherry/30"
      : "border-navy/15 focus:border-navy focus:ring-2 focus:ring-navy/15",
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-navy/45 transition-all duration-200",
    "peer-focus:top-3.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-navy",
    "peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-xs",
  );

  let field: ReactNode;
  if (props.as === "textarea") {
    field = (
      <textarea
        {...registration}
        id={registration.name}
        rows={props.rows ?? 4}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          registration.onBlur(e);
        }}
        className={cn(baseFieldClasses, "resize-none pt-7")}
      />
    );
  } else if (props.as === "select") {
    field = (
      <select
        {...registration}
        id={registration.name}
        defaultValue=""
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          registration.onBlur(e);
        }}
        className={cn(baseFieldClasses, "appearance-none")}
      >
        <option value="" disabled hidden>
          {props.placeholder ?? label}
        </option>
        {props.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  } else {
    field = (
      <input
        {...registration}
        id={registration.name}
        type={props.type ?? "text"}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          registration.onBlur(e);
        }}
        className={baseFieldClasses}
      />
    );
  }

  return (
    <motion.div
      className={cn("relative", className)}
      animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        {field}
        <label htmlFor={registration.name} className={labelClasses}>
          {label}
          {required && <span className="text-cherry"> *</span>}
        </label>
        {focused && !error && (
          <motion.span
            layoutId={`field-glow-${registration.name}`}
            className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-navy/10"
          />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-cherry"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
