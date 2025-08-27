/**
 * Edge middleware helper to protect routes based on plan entitlements.
 *
 * Example:
 *   const guard = withEntitlementGuard(rules, verify, createHandoff);
 */
export type GuardRule = { matcher: RegExp; minPlan: 'pro' | 'team' | 'enterprise' };
export type VerifyFn = (req: any) => Promise<{ plan: string; userId?: string }>;

export function withEntitlementGuard(
  rules: GuardRule[],
  verify: VerifyFn,
  createHandoff: (ctx: { userId?: string; appId: string; returnUrl: string; planHint: string }) => Promise<string>
) {
  return async function middleware(req: any): Promise<any> {
    try {
      const { pathname } = new URL(req.url);
      const rule = rules.find(r => r.matcher.test(pathname));
      if (!rule) return { next: true };
      const { plan, userId } = await verify(req);
      const ok = allow(plan, rule.minPlan);
      if (ok) return { next: true };
      const token = await createHandoff({
        userId,
        appId: process.env.NEXT_PUBLIC_APP_ID || '',
        returnUrl: req.url,
        planHint: rule.minPlan,
      });
      const u = new URL('/pricing', process.env.NEXT_PUBLIC_REVENUE_GATEWAY_URL || '');
      u.searchParams.set('h', token);
      u.searchParams.set('return', req.url);
      return { redirect: u.toString() };
    } catch (err: any) {
      return { error: err.message };
    }
  };
}

function allow(plan: string, needed: string) {
  const rank = (p: string) => ['free', 'pro', 'team', 'enterprise'].indexOf(p);
  return rank(plan) >= rank(needed);
}
