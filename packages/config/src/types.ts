/**
 * Shared types for plan configuration.
 *
 * Usage:
 *   import type { PlanId, Entitlements } from '@cdaprod/revenue-config';
 */
export type PlanId = 'free' | 'pro' | 'team' | 'enterprise';

export interface Entitlements {
  plan: PlanId;
  limits: Record<string, number>;
  features: Record<string, boolean>;
  periodEnd?: number;
}
