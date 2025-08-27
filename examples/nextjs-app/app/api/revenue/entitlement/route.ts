/**
 * Example endpoint to receive entitlement updates.
 *
 * Example:
 *   curl -X POST http://localhost/api/revenue/entitlement
 */
export async function POST(req: any) {
  const body = await req.json();
  return { status: 200, body };
}
