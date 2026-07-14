import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  designation: z.string().optional(), 
  interestType: z.string().min(1, "Please select an interest type"), // Ekdum perfect line
  message: z.string().optional(),
  consent: z.boolean().default(true),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const enquiryStepFields = {
  1: ["fullName", "companyName", "email", "phone", "designation", "interestType", "message"] as const,
  2: [] as const,
  3: [] as const,
};