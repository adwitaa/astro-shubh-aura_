export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string
): Promise<{ success: boolean; message?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile secret key is not configured, pass verification (optional edge protection)
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      message: "Bot verification token missing. Please refresh and try again.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", remoteIp);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const outcome = (await response.json()) as { success?: boolean; "error-codes"?: string[] };

    if (!outcome.success) {
      console.warn("[Turnstile] Verification failed:", outcome["error-codes"]);
      return {
        success: false,
        message: "Security verification failed. Please try submitting again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[Turnstile] Verification error:", err);
    return { success: false, message: "Security check service unavailable." };
  }
}
