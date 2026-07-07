import { z } from "zod";
import { ENQUIRY_TYPES } from "@/lib/constants/company";

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  companyName: z.string().trim().min(2, "Please enter your company name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number."),
  enquiryType: z.enum(ENQUIRY_TYPES, {
    message: "Please select an enquiry type.",
  }),
  eventInterest: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (minimum 10 characters).")
    .max(1000, "Message is too long."),
  consent: z.literal(true, {
    message: "You must agree before submitting.",
  }),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const enquiryStepFields = {
  1: ["fullName", "companyName", "phone", "email"],
  2: ["enquiryType", "eventInterest"],
  3: ["message", "consent"],
} as const satisfies Record<number, (keyof EnquiryFormValues)[]>;
