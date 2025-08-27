/**
 * Example middleware using the SDK guard.
 */
import { withEntitlementGuard } from '@cdaprod/revenue-gateway-sdk';

const guard = withEntitlementGuard(
  [{ matcher: /^\/pro/, minPlan: 'pro' }],
  async () => ({ plan: 'free' }),
  async () => 'token'
);

export default guard;
