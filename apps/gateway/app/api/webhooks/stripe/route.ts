/**
 * Handle Stripe webhook events.
 *
 * Example:
 *   curl -X POST http://localhost/api/webhooks/stripe
 */
import { stripeAdapter } from '../../../../lib/adapters/stripe';

export async function POST(req: any) {
  const raw = await req.text();
  const sig = req.headers['stripe-signature'] || '';
  await stripeAdapter.upsertSubscriptionFromWebhook({ raw }, sig);
  return { status: 200, body: { ok: true } };
}
