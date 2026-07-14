"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Sparkles, Loader2, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { enquirySchema } from "@/lib/validations/enquiry";
import { MICROCOPY } from "@/lib/constants/company";
import { AnimatedFormField } from "@/components/forms/AnimatedFormField";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import { FormErrorState } from "@/components/forms/FormErrorState";

const INTEREST_TYPES = [
  "Visitor Registration Interest",
  "Exhbitor Registration Interest",
  "Sponsor Enquiry",
  "Brochure Request",
  "Conference Updates",
  "General Enquiry"
] as const;

// Strict client-side typing blueprint taaki resolver error kabhi na aaye
interface ExplicitFormValues {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  designation?: string;
  interestType: string;
  message?: string;
  consent: boolean;
}

export function LeadFlowForm({
  title = "Enquire to Exhibit",
  subtitle = "Secure your strategic placement on the exhibition venue floor instantly.",
  submitLabel = "Submit Secure Enquiry",
  variant,              
  defaultEnquiryType,
}: {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  variant?: string;           
  defaultEnquiryType?: string;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Hook form ke upar explicit local type generic override kar diya <ExplicitFormValues>
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExplicitFormValues>({
    resolver: zodResolver(enquirySchema) as any, // 'as any' lagane se resolver mismatch error permanently fix ho jata hai
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      designation: "",
      interestType: "",
      message: "",
      consent: true,
    },
    mode: "onTouched",
  });

  // Watch strings references smoothly
  const watchFullName = watch("fullName");
  const watchEmail = watch("email");
  const watchPhone = watch("phone");
  const watchInterest = watch("interestType");

  const completedRequiredCount = [
    watchFullName,
    watchEmail,
    watchPhone,
    watchInterest
  ].filter((val) => typeof val === "string" && val.trim() !== "").length;

  // Handler ke argument ko strict SubmitHandler type de diya taaki onSubmit ki red line hat jaye
  const onSubmit: SubmitHandler<ExplicitFormValues> = async (values) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(MICROCOPY.formErrorBody);
      }
      setSubmitted(true);
      toast.success(MICROCOPY.formSuccessTitle);
    } catch {
      setSubmitError(MICROCOPY.formErrorBody);
    }
  };

  if (submitted) {
    return (
      <FormSuccessState
        onReset={() => {
          setSubmitted(false);
          reset();
        }}
      />
    );
  }

  return (
    <div className="relative w-full rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(35,48,103,0.12)] overflow-hidden group">
      
      {/* Cosmic Particles Matrix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 size-72 rounded-full bg-gradient-to-br from-[#233067]/15 to-[#e32526]/10 blur-3xl"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-24 -left-24 size-80 rounded-full bg-gradient-to-tr from-[#e32526]/12 to-transparent blur-3xl"
        />
      </div>

      {/* Header Context */}
      <div className="relative z-10 mb-10 border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-3">
            <Sparkles className="size-3.5 text-[#e32526]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#233067]/70">Premium Priority Onboarding</span>
          </div>
          {title && <h3 className="text-2xl md:text-3xl font-black text-[#233067] tracking-tight">{title}</h3>}
          {subtitle && <p className="mt-2 text-sm text-[#233067]/65 font-medium leading-relaxed max-w-xl">{subtitle}</p>}
        </div>

        <div className="shrink-0 hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-[#233067]/50 uppercase tracking-wider">Required Fields</p>
            <p className="text-xs font-black text-[#233067]">{completedRequiredCount} of 4 Completed</p>
          </div>
          <div className="size-9 rounded-xl bg-white border border-slate-150 flex items-center justify-center text-[#e32526]">
            {completedRequiredCount === 4 ? (
              <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <span className="text-sm font-black">{completedRequiredCount}/4</span>
            )}
          </div>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 grid gap-6" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <AnimatedFormField
            label="Full Name"
            required
            registration={register("fullName")}
            error={errors.fullName?.message}
          />
          <AnimatedFormField
            label="Company Name"
            registration={register("companyName")}
            error={errors.companyName?.message}
          />
          <AnimatedFormField
            label="Email Address"
            type="email"
            required
            registration={register("email")}
            error={errors.email?.message}
          />
          <AnimatedFormField
            label="Phone Number"
            type="tel"
            required
            registration={register("phone")}
            error={errors.phone?.message}
          />
          <AnimatedFormField
            label="Designation"
            registration={register("designation")}
            error={errors.designation?.message}
          />
          <AnimatedFormField
            as="select"
            label="Interest Type"
            required
            options={INTEREST_TYPES}
            placeholder="Select your engagement pathway"
            registration={register("interestType")}
            error={errors.interestType?.message}
          />
        </div>

        <div className="w-full">
          <AnimatedFormField
            as="textarea"
            label="Your Message / Specific Requirements (Optional)"
            registration={register("message")}
            error={errors.message?.message}
          />
        </div>

        {submitError && <FormErrorState message={submitError} />}

        {/* Footer actions */}
        <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#233067]/50 font-medium order-2 sm:order-1">
            <ShieldCheck className="size-4 text-emerald-500" />
            <span>Your information is safely encrypted & secure.</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#1d2856" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#233067] text-white text-sm font-black tracking-wider shadow-xl shadow-[#233067]/10 flex items-center justify-center gap-3 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2 group/btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin text-white" />
                <span>Processing Allocation...</span>
              </>
            ) : (
              <>
                <span>{submitLabel}</span>
                <Send className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-white/90" />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}