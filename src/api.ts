const BASE = import.meta.env.VITE_API_URL;

export interface VerifyNINResponse {
  job_id: string;
  masked_phone: string;
  message: string;
  status: string; // "verified" once done
}

export class ApiError extends Error {
  resultCode?: string;
  constructor(message: string, resultCode?: string) {
    super(message);
    this.resultCode = resultCode;
  }
}

export async function verifyNIN(initData: string, nin: string): Promise<VerifyNINResponse> {
  const res = await fetch(`${BASE}/kyc/bot/verify-nin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData, nin }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new ApiError(data.error || `Request failed (${res.status})`, data.result_code);
  }
  return data as VerifyNINResponse;
}

// Mirrors the friendlier-message mapping already used in Linq-v2-Frontend's
// Verification.tsx, so the two verification surfaces read consistently.
export function friendlyErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : 'Failed to verify NIN. Please try again.';
  const lower = raw.toLowerCase();
  if (lower.includes('id authority') || lower.includes('authority is currently unavailable')) {
    return 'Verification is temporarily unavailable. Please try again later.';
  }
  return raw;
}
