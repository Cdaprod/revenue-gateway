/**
 * Helper to retrieve entitlements for a plan.
 *
 * Example:
 *   const ent = getEntitlements('pro');
 */
import { getPlan } from '@cdaprod/revenue-config';

export function getEntitlements(plan: string) {
  return getPlan(plan);
}
