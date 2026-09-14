import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * API client helper for frontend components to communicate with the Render backend.
 */
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function handleZodError(e: unknown) {
  if (e instanceof ZodError) return apiError('Validation failed', 422, e.flatten());
  console.error(e);
  return apiError('Internal server error', 500);
}
