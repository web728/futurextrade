"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const ctaVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-cherry text-white hover:bg-cherry-dark focus-visible:ring-cherry",
        navy: "bg-navy text-white hover:bg-navy-dark focus-visible:ring-navy",
        outline:
          "border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white focus-visible:ring-navy",
        ghost: "text-navy bg-transparent hover:bg-navy/5 focus-visible:ring-navy",
        light: "bg-white text-navy hover:bg-white/90 focus-visible:ring-white",
      },
      size: {
        default: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type BaseProps = VariantProps<typeof ctaVariants> & {
  children: ReactNode;
  className?: string;
  icon?: boolean;
  loading?: boolean;
  success?: boolean;
};

type LinkCTAProps = BaseProps & {
  href: string;
  external?: boolean;
  download?: boolean | string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonCTAProps = BaseProps & {
  href?: never;
  external?: never;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};

export function MotionCTAButton(props: LinkCTAProps | ButtonCTAProps) {
  const { children, className, variant, size, icon = true, loading, success } =
    props;

  const content = (
    <>
      <span className="absolute inset-0 -z-0">
        <span className="absolute inset-y-0 -left-1/3 w-1/3 animate-shine-sweep bg-white/25 blur-md" />
      </span>
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : success ? (
          <Check className="size-4" aria-hidden />
        ) : null}
        {children}
        {icon && !loading && !success && (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  const classes = cn(ctaVariants({ variant, size }), "group", className);

  if ("href" in props && props.href) {
    if (props.download) {
      return (
        <motion.a
          href={props.href}
          download={props.download}
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {content}
        </motion.a>
      );
    }
    if (props.external) {
      return (
        <motion.a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link href={props.href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled || loading}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
