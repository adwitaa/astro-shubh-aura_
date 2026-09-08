import type { KundaliEnquiryInput } from "../validators/kundaliValidator";

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
}

export async function sendKundaliEnquiryEmail(
  data: KundaliEnquiryInput
): Promise<EmailSendResult> {
  const recipientEmail = process.env.ADMIN_EMAIL || "adwitaasingh20@gmail.com";
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Strictly controlled server-side subject (cannot be overridden by client)
  const subject = "NEW KUNDALI ENQUIRY";

  // Sanitize all values against newline/header injection
  const safeName = sanitizeLine(data.name);
  const safePhone = sanitizeLine(data.phone);
  const safeEmail = data.email ? sanitizeLine(data.email) : "";
  const safeBirthDate = sanitizeLine(data.birthDate);
  const safeBirthTime = sanitizeLine(data.birthTime);
  const safeBirthPlace = sanitizeLine(data.birthPlace);
  const safeFocus = sanitizeLine(data.focus);

  // Build clean plain text body
  let textBody = `NEW KUNDALI ENQUIRY\n\n`;
  textBody += `Name: ${safeName}\n`;
  textBody += `Phone: ${safePhone}\n`;
  if (safeEmail) {
    textBody += `Email: ${safeEmail}\n`;
  }
  textBody += `Date of Birth: ${safeBirthDate}\n`;
  textBody += `Time of Birth: ${safeBirthTime}\n`;
  textBody += `Place of Birth: ${safeBirthPlace}\n`;
  textBody += `Area of Focus: ${safeFocus}\n`;
  textBody += `\nSubmitted: ${timestamp} (IST)\n`;

  // Build HTML body with strict entity escaping
  let htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e8ad00; border-radius: 8px; background-color: #120203; color: #e8ad00;">
      <h2 style="margin-top: 0; color: #e8ad00; border-bottom: 1px solid rgba(232, 173, 0, 0.3); padding-bottom: 10px;">
        NEW KUNDALI ENQUIRY
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: #fff;">
        <tr><td style="padding: 6px 0; font-weight: bold; width: 140px; color: #e8ad00;">Name:</td><td>${escapeHtml(safeName)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Phone:</td><td>${escapeHtml(safePhone)}</td></tr>
        ${safeEmail ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Email:</td><td>${escapeHtml(safeEmail)}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Date of Birth:</td><td>${escapeHtml(safeBirthDate)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Time of Birth:</td><td>${escapeHtml(safeBirthTime)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Place of Birth:</td><td>${escapeHtml(safeBirthPlace)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold; color: #e8ad00;">Area of Focus:</td><td>${escapeHtml(safeFocus)}</td></tr>
      </table>
      <div style="margin-top: 20px; pt-10; border-top: 1px solid rgba(232, 173, 0, 0.2); font-size: 12px; color: rgba(232, 173, 0, 0.7);">
        Submitted: ${timestamp} (IST)
      </div>
    </div>
  `;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("[EmailService ERROR] RESEND_API_KEY is not configured in server environment variables. Outbound email delivery failed.");
    throw new Error("Email service is not configured. Please set RESEND_API_KEY in environment variables.");
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "Astro Shubh Aura <onboarding@resend.dev>",
        to: [recipientEmail],
        reply_to: safeEmail || undefined,
        subject: subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[EmailService ERROR] Resend API response status:", response.status);
      throw new Error(`Email provider error (${response.status})`);
    }

    const resData = (await response.json()) as { id?: string };
    console.log("[EmailService SUCCESS] Email dispatched via Resend to:", recipientEmail, "Message ID:", resData.id);
    return { success: true, messageId: resData.id };
  } catch (err) {
    console.error("[EmailService ERROR] Exception during email delivery:", err);
    throw err;
  }
}

function sanitizeLine(val: string): string {
  return val.replace(/[\r\n\0\b]/g, " ").trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
