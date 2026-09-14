import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

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
