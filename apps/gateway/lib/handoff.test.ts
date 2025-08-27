/**
 * Tests for handoff JWT utilities.
 */
import { describe, it, expect } from 'vitest';
import { signHandoffJWT, verifyHandoffJWT } from './handoff';

describe('handoff JWT', () => {
  it('signs and verifies', async () => {
    const token = await signHandoffJWT({ userId: 'u1', appId: 'app', returnUrl: 'https://app' });
    const payload: any = await verifyHandoffJWT(token);
    expect(payload.userId).toBe('u1');
  });
});
