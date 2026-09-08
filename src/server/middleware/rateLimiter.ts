import crypto from "node:crypto";

interface RateLimitRecord {
  timestamps: number[];
}

interface DeduplicationRecord {
  hash: string;
  timestamp: number;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const DEDUPLICATION_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

// In-memory stores
const ipRateLimits = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, DeduplicationRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  
  // Clean rate limit records
  for (const [ip, record] of ipRateLimits.entries()) {
    record.timestamps = record.timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (record.timestamps.length === 0) {
      ipRateLimits.delete(ip);
    }
  }

  // Clean deduplication records
  for (const [hash, record] of recentSubmissions.entries()) {
    if (now - record.timestamp > DEDUPLICATION_WINDOW_MS) {
      recentSubmissions.delete(hash);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitCheckResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Enforces in-memory sliding window rate limiting per IP.
 */
export function checkRateLimit(clientIp: string): RateLimitCheckResult {
  const now = Date.now();
  const safeIp = clientIp || "anonymous";

  let record = ipRateLimits.get(safeIp);
  if (!record) {
    record = { timestamps: [] };
    ipRateLimits.set(safeIp, record);
  }

  // Filter out timestamps outside window
  record.timestamps = record.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    console.warn(`[RateLimiter] Rate limit exceeded for IP: ${safeIp}`);
    return {
      allowed: false,
      reason: "Too many submission attempts. Please wait a few minutes before trying again.",
    };
  }

  record.timestamps.push(now);
  return { allowed: true };
}

/**
 * Checks for duplicate replay submissions within a 2-minute window.
 */
export function isDuplicateSubmission(
  clientIp: string,
  payload: { name: string; phone: string; birthDate: string; birthTime: string }
): boolean {
  const now = Date.now();
  const rawKey = `${clientIp}:${payload.name}:${payload.phone}:${payload.birthDate}:${payload.birthTime}`;
  const hash = crypto.createHash("sha256").update(rawKey).digest("hex");

  const existing = recentSubmissions.get(hash);
  if (existing && now - existing.timestamp < DEDUPLICATION_WINDOW_MS) {
    console.warn(`[Deduplicator] Replay submission detected from IP: ${clientIp}`);
    return true;
  }

  recentSubmissions.set(hash, { hash, timestamp: now });
  return false;
}
