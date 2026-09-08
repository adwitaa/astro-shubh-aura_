import { z } from "zod";

// Helper: Strip control characters (\r, \n, \0, \b) to prevent header/log injection
export function sanitizeHeaderString(val: string): string {
  return val.replace(/[\r\n\0\b]/g, " ").trim();
}

export function sanitizeTextString(val: string, maxLength: number): string {
  const cleaned = val.replace(/[\0\b]/g, "").trim();
  return cleaned.slice(0, maxLength);
}

// Regex patterns
const phoneRegex = /^[+0-9\s()\-]{7,25}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;

export const kundaliEnquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name exceeds maximum length")
    .transform((val) => sanitizeHeaderString(val)),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .max(25, "Phone number exceeds maximum length")
    .refine((val) => phoneRegex.test(val.trim()), "Invalid phone number format")
    .transform((val) => sanitizeHeaderString(val)),
  email: z
    .string()
    .max(100, "Email exceeds maximum length")
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || z.string().email().safeParse(val).success, "Invalid email format")
    .transform((val) => (val ? sanitizeHeaderString(val) : "")),
  birthDate: z
    .string()
    .min(1, "Date of birth is required")
    .max(20, "Date format invalid")
    .refine((val) => dateRegex.test(val.trim()), "Invalid date format (YYYY-MM-DD required)")
    .transform((val) => sanitizeHeaderString(val)),
  birthTime: z
    .string()
    .min(1, "Time of birth is required")
    .max(10, "Time format invalid")
    .refine((val) => timeRegex.test(val.trim()), "Invalid time format (HH:MM required)")
    .transform((val) => sanitizeHeaderString(val)),
  birthPlace: z
    .string()
    .min(1, "Place of birth is required")
    .max(100, "Place of birth exceeds maximum length")
    .transform((val) => sanitizeHeaderString(val)),
  focus: z
    .string()
    .min(1, "Area of focus is required")
    .max(100, "Area of focus exceeds maximum length")
    .transform((val) => sanitizeHeaderString(val)),
  // Honeypot field for bot detection (must remain empty for human submissions)
  website_hp: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),
  // Optional Cloudflare Turnstile token for server-side verification
  turnstileToken: z
    .string()
    .max(2048)
    .optional()
    .or(z.literal("")),
});

export type KundaliEnquiryInput = z.infer<typeof kundaliEnquirySchema>;
