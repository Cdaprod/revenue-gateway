/**
 * Create a checkout session for a plan.
 *
 * Example:
 *   curl -X POST -d '{"plan":"pro"}' http://localhost/api/billing/checkout
 */
export async function POST(req: any) {
  const { plan } = await req.json();
  const url = `https://checkout.example/${plan}`;
  return { status: 200, body: { url } };
}
