/**
 * Verify incoming handoff JWT from a subsidiary app.
 *
 * Example:
 *   curl -X POST -d '{"token":"<jwt>"}' http://localhost/api/handoff/verify
 */
import { verifyHandoffJWT } from '../../../../lib/handoff';

export async function POST(req: any) {
  try {
    const { token } = await req.json();
    const payload = await verifyHandoffJWT(token);
    return { status: 200, body: { ok: true, payload } };
  } catch (err: any) {
    return { status: 400, body: { error: err.message } };
  }
}
