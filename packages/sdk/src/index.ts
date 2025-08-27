/**
 * Client helpers for interacting with the Revenue Gateway.
 *
 * Usage:
 *   import { gatewayUrl, buildHandoffURL } from '@cdaprod/revenue-gateway-sdk';
 */
export function gatewayUrl(): string {
  return process.env.NEXT_PUBLIC_REVENUE_GATEWAY_URL || '';
}

export function buildHandoffURL(args: { returnUrl: string; token: string }): string {
  const u = new URL('/pricing', gatewayUrl());
  u.searchParams.set('h', args.token);
  u.searchParams.set('return', args.returnUrl);
  return u.toString();
}

export { withEntitlementGuard } from './middleware';
export * from './types';
