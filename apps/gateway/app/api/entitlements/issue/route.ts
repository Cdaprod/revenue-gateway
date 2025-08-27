/**
 * Issue an entitlement JWT for a given user and plan.
 *
 * Example:
 *   curl -X POST -d '{"userId":"u1","appId":"a","plan":"pro"}' http://localhost/api/entitlements/issue
 */
import { issueEntitlementJWT } from '../../../../lib/handoff';
import { getEntitlements } from '../../../../lib/entitlements';
import { dbUpsertSubscription } from '../../../../lib/db';

export async function POST(req: any) {
  try {
    const { userId, appId, plan } = await req.json();
    const ent = getEntitlements(plan);
    await dbUpsertSubscription({ userId, appId, plan, ent });
    const token = await issueEntitlementJWT({ userId, appId, plan, ent });
    return { status: 200, body: { token } };
  } catch (err: any) {
    return { status: 400, body: { error: err.message } };
  }
}
