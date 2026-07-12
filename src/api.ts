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

async function parseJson(res: Response) {
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

export async function startSignup(
  firstName: string,
  lastName: string,
  email: string
): Promise<{ token: string }> {
  const res = await fetch(`${BASE}/verify/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email }),
  });

  const data = await parseJson(res);
  if (!res.ok) {
    // StartWebSignup returns errors under "message" (matches the rest of
    // userAuthentication/*.go), not "error" (the kyc package's convention).
    throw new ApiError(data.message || `Request failed (${res.status})`);
  }
  return data as { token: string };
}

export async function startNINUpgrade(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/verify/upgrade/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await parseJson(res);
  if (!res.ok) {
    throw new ApiError(data.message || `Request failed (${res.status})`);
  }
  return data as { message: string };
}

export async function confirmNINUpgrade(email: string, otp: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE}/verify/upgrade/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  const data = await parseJson(res);
  if (!res.ok) {
    throw new ApiError(data.message || `Request failed (${res.status})`);
  }
  return data as { token: string };
}

export async function verifyNIN(token: string, nin: string): Promise<VerifyNINResponse> {
  const res = await fetch(`${BASE}/verify/nin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, nin }),
  });

  const data = await parseJson(res);
  if (!res.ok) {
    throw new ApiError(data.error || `Request failed (${res.status})`, data.result_code);
  }
  return data as VerifyNINResponse;
}

// Mirrors the friendlier-message mapping already used in Linq-v2-Frontend's
// Verification.tsx, so the two verification surfaces read consistently.
export function friendlyErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
  const lower = raw.toLowerCase();
  if (lower.includes('id authority') || lower.includes('authority is currently unavailable')) {
    return 'Verification is temporarily unavailable. Please try again later.';
  }
  return raw;
}
