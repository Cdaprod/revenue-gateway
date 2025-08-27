/**
 * Tests for plan configuration.
 */
import { describe, it, expect } from 'vitest';
import { getPlan } from './plans';

describe('getPlan', () => {
  it('returns requested plan when known', () => {
    expect(getPlan('pro').plan).toBe('pro');
  });

  it('falls back to free for unknown plans', () => {
    expect(getPlan('unknown').plan).toBe('free');
  });
});
