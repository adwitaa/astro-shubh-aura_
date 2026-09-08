import type { KundaliEnquiryInput } from "../validators/kundaliValidator";
import { checkRateLimit, isDuplicateSubmission } from "../middleware/rateLimiter";
import { verifyTurnstileToken } from "./botProtectionService";
import { sendKundaliEnquiryEmail } from "./emailService";

export interface ProcessingResult {
  success: boolean;
  message?: string;
}

/**
 * Hardened Kundali Enquiry Processing Service
 * Includes: Honeypot spambot trap, rate limiting, replay deduplication, turnstile check, and Resend delivery.
 */
export async function processKundaliEnquiry(
  data: KundaliEnquiryInput,
  clientIp: string = "anonymous"
): Promise<ProcessingResult> {
  // 1. Honeypot check: If the hidden bot field contains a value, silently drop
  if (data.website_hp && data.website_hp.trim().length > 0) {
    console.warn(`[KundaliEnquiryService] Spambot trapped via honeypot field from IP: ${clientIp}`);
    // Return fake success to prevent bot retry loops
    return { success: true, message: "Enquiry processed successfully" };
  }

  // 2. Sliding window rate limiting check
  const rateLimitResult = checkRateLimit(clientIp);
  if (!rateLimitResult.allowed) {
    return {
      success: false,
      message: rateLimitResult.reason || "Too many submission attempts. Please try again later.",
    };
  }

  // 3. Replay / Duplicate submission check
  if (isDuplicateSubmission(clientIp, data)) {
    return {
      success: true,
      message: "Enquiry already submitted. Thank you!",
    };
  }

  // 4. Cloudflare Turnstile Verification (if TURNSTILE_SECRET_KEY is set)
  const turnstileCheck = await verifyTurnstileToken(data.turnstileToken, clientIp);
  if (!turnstileCheck.success) {
    return {
      success: false,
      message: turnstileCheck.message || "Security verification failed.",
    };
  }

  try {
    // 5. Send Email Notification
    await sendKundaliEnquiryEmail(data);

    return {
      success: true,
      message: "Enquiry processed successfully",
    };
  } catch (error) {
    console.error("[KundaliEnquiryService] Processing error:", error);
    return {
      success: false,
      message: "Unable to process enquiry at this time. Please try again later.",
    };
  }
}
