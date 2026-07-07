"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  enquirySchema,
  enquiryStepFields,
  type EnquiryFormValues,
} from "@/lib/validations/enquiry";
import { ENQUIRY_TYPES, MICROCOPY } from "@/lib/constants/company";
import { AnimatedFormField } from "@/components/forms/AnimatedFormField";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import { FormErrorState } from "@/components/forms/FormErrorState";
import { MotionCTAButton } from "@/components/interactive/MotionCTAButton";
import { Checkbox } from "@/components/ui/checkbox";

export function LeadFlowForm({
  variant = "full",
  defaultEnquiryType,
  title = "Tell Us How We Can Help",
  subtitle,
  submitLabel = "Submit Enquiry",
}: {
  variant?: "full" | "compact";
  defaultEnquiryType?: (typeof ENQUIRY_TYPES)[number];
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}) {
  const totalSteps = variant === "full" ? 3 : 1;
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiryType: defaultEnquiryType,
      consent: undefined,
    },
    mode: "onTouched",
  });

  async function handleNext() {
    const fields = enquiryStepFields[step as 1 | 2 | 3];
    const valid = await trigger(fields);
    if (!valid) {
      const firstInvalid = fields.find((f) => errors[f]);
      if (firstInvalid) setFocus(firstInvalid);
      return;
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  }

  async function onSubmit(values: EnquiryFormValues) {
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
  }

  if (submitted) {
    return (
      <FormSuccessState
        onReset={() => {
          setSubmitted(false);
          setStep(1);
          reset();
        }}
      />
    );
  }

  const showStep = (n: number) => variant === "compact" || step === n;

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-premium sm:p-8">
      {title && <h3 className="text-xl font-bold text-navy">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-navy/60">{subtitle}</p>}

      {variant === "full" && (
        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
              <motion.div
                className="h-full bg-cherry"
                initial={false}
                animate={{ width: step > i ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5" noValidate>
        <AnimatePresence mode="wait">
          {showStep(1) && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <AnimatedFormField
                label="Full Name"
                required
                registration={register("fullName")}
                error={errors.fullName?.message}
              />
              <AnimatedFormField
                label="Company Name"
                required
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
            </motion.div>
          )}

          {showStep(2) && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <AnimatedFormField
                as="select"
                label="Enquiry Type"
                required
                placeholder="Which enquiry type?"
                options={ENQUIRY_TYPES}
                registration={register("enquiryType")}
                error={errors.enquiryType?.message}
              />
              <AnimatedFormField
                label="Event Interested In"
                registration={register("eventInterest")}
                error={errors.eventInterest?.message}
              />
            </motion.div>
          )}

          {showStep(3) && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="grid gap-5"
            >
              <AnimatedFormField
                as="textarea"
                label="Share your booth, sponsorship or partnership requirement."
                required
                registration={register("message")}
                error={errors.message?.message}
              />

              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <label className="group flex items-start gap-3 text-xs text-navy/60">
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                    />
                    {MICROCOPY.formConsent}
                  </label>
                )}
              />
              {errors.consent && (
                <p id="consent-error" role="alert" className="-mt-3 text-xs text-cherry">
                  {errors.consent.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && <FormErrorState message={submitError} />}

        <div className="mt-2 flex items-center justify-between gap-3">
          {variant === "full" && step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="text-sm font-semibold text-navy/60 hover:text-navy"
            >
              Back
            </button>
          )}
          <div className="ml-auto">
            {variant === "full" && step < totalSteps ? (
              <MotionCTAButton type="button" onClick={handleNext}>
                Continue
              </MotionCTAButton>
            ) : (
              <MotionCTAButton type="submit" loading={isSubmitting} icon={false}>
                {submitLabel}
              </MotionCTAButton>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
