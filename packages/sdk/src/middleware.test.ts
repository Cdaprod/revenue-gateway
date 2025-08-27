/**
 * Tests for the entitlement guard middleware.
 */
import { describe, it, expect } from 'vitest';
import { withEntitlementGuard } from './middleware';

process.env.NEXT_PUBLIC_REVENUE_GATEWAY_URL = 'https://gateway';

describe('withEntitlementGuard', () => {
  it('redirects when plan is insufficient', async () => {
    const guard = withEntitlementGuard(
      [{ matcher: /^\/pro/, minPlan: 'pro' }],
      async () => ({ plan: 'free', userId: 'u1' }),
      async () => 't1'
    );
    const res = await guard({ url: 'https://app/pro' });
    expect(res.redirect).toContain('/pricing');
  });

  it('allows when plan matches', async () => {
    const guard = withEntitlementGuard(
      [{ matcher: /^\/pro/, minPlan: 'pro' }],
      async () => ({ plan: 'pro' }),
      async () => 't1'
    );
    const res = await guard({ url: 'https://app/pro' });
    expect(res.next).toBe(true);
  });
});
