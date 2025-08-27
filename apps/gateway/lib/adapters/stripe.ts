/**
 * Minimal Stripe adapter placeholder.
 *
 * Example:
 *   await stripeAdapter.upsertSubscriptionFromWebhook({}, 'sig');
 */
export const stripeAdapter = {
  async upsertSubscriptionFromWebhook(_body: any, _sig: string) {
    return { userId: '', appId: '', plan: 'free', currentPeriodEnd: Date.now() / 1000 };
  },
};
