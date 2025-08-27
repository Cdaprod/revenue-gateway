/**
 * Utilities for signing and verifying handoff and entitlement JWTs.
 *
 * Example:
 *   const token = await signHandoffJWT({ userId: 'u1', appId: 'app', returnUrl: 'https://app' });
 */
import { SignJWT, jwtVerify } from 'jose';
import type { Entitlements } from '@cdaprod/revenue-config';

const HANDOFF_SECRET = new TextEncoder().encode(process.env.HANDOFF_SECRET || 'dev-secret');
const ENTITLEMENT_SECRET = new TextEncoder().encode(process.env.ENTITLEMENT_SECRET || 'dev-secret');

export async function signHandoffJWT(payload: { userId?: string; appId: string; returnUrl: string; planHint?: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m')
    .sign(HANDOFF_SECRET);
}

export async function verifyHandoffJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, HANDOFF_SECRET);
    return payload;
  } catch (err: any) {
    throw new Error('invalid handoff token');
  }
}

export async function issueEntitlementJWT(args: { userId: string; appId: string; plan: string; ent: Entitlements }) {
  return await new SignJWT(args)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m')
    .sign(ENTITLEMENT_SECRET);
}
