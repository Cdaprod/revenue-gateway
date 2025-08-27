/**
 * Return a billing portal URL for the current user.
 *
 * Example:
 *   curl http://localhost/api/billing/portal
 */
export async function GET() {
  const url = 'https://billing.example/portal';
  return { status: 200, body: { url } };
}
