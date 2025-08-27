/**
 * Canonical plan definitions used by gateway and subsidiary apps.
 *
 * Usage:
 *   import { PLANS, getPlan } from '@cdaprod/revenue-config';
 */
import type { Entitlements } from './types';

export const PLANS: Record<string, Entitlements> = {
  free: {
    plan: 'free',
    limits: { projects: 1, requests_per_day: 1000 },
    features: { watermark: true },
  },
  pro: {
    plan: 'pro',
    limits: { projects: 10, requests_per_day: 50000 },
    features: { watermark: false, priority: true },
  },
  team: {
    plan: 'team',
    limits: { projects: 50, requests_per_day: 250000 },
    features: { sso: true, roles: true },
  },
  enterprise: {
    plan: 'enterprise',
    limits: { projects: 999, requests_per_day: 9999999 },
    features: { sso: true, roles: true, sla: true },
  },
} as const;

export function getPlan(plan: string): Entitlements {
  return PLANS[plan] ?? PLANS.free;
}

export type { PlanId, Entitlements } from './types';
