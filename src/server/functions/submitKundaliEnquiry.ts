import { createServerFn } from "@tanstack/react-start";
import { kundaliEnquirySchema, type KundaliEnquiryInput } from "../validators/kundaliValidator";
import { processKundaliEnquiry, type ProcessingResult } from "../services/kundaliEnquiryService";

export const submitKundaliEnquiryFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = kundaliEnquirySchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map((issue) => issue.message).join(", ");
      throw new Error(`Validation failed: ${errorMessage}`);
    }
    return result.data as KundaliEnquiryInput;
  })
  .handler(async ({ data }): Promise<ProcessingResult> => {
    const clientIp = "127.0.0.1";
    return await processKundaliEnquiry(data, clientIp);
  });
