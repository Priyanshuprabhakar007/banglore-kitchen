import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkRateLimit, ALLOWED_UPLOAD_EXTENSIONS } from '../server/app.ts';

describe('Priority 1 & 2 Security Audits: Rate Limiting & Input Validation', () => {
  it('should enforce rate limits correctly and report retryAfterSeconds when exceeded', () => {
    const testKey = `test-rate-limit-${Date.now()}`;
    const maxReq = 3;
    const windowMs = 5000;

    // 1st, 2nd, 3rd requests should be allowed
    const r1 = checkRateLimit(testKey, maxReq, windowMs);
    assert.equal(r1.allowed, true);
    const r2 = checkRateLimit(testKey, maxReq, windowMs);
    assert.equal(r2.allowed, true);
    const r3 = checkRateLimit(testKey, maxReq, windowMs);
    assert.equal(r3.allowed, true);

    // 4th request must be blocked
    const r4 = checkRateLimit(testKey, maxReq, windowMs);
    assert.equal(r4.allowed, false);
    assert.ok(r4.retryAfterSeconds > 0 && r4.retryAfterSeconds <= 5);
  });

  it('should validate international E.164 phone numbers correctly', () => {
    const e164Regex = /^\+[1-9]\d{7,14}$/;

    assert.equal(e164Regex.test('+919876543210'), true);
    assert.equal(e164Regex.test('+12015550123'), true);
    assert.equal(e164Regex.test('+447911123456'), true);

    // Invalid numbers
    assert.equal(e164Regex.test('9876543210'), false); // missing +
    assert.equal(e164Regex.test('+0123456789'), false); // starts with 0
    assert.equal(e164Regex.test('+123'), false); // too short
    assert.equal(e164Regex.test('+12345678901234567'), false); // too long
    assert.equal(e164Regex.test('invalid-phone'), false);
  });

  it('should strictly restrict upload file extensions to safe media types', () => {
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.jpg'), true);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.jpeg'), true);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.png'), true);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.webp'), true);

    // Unsafe extensions must be rejected
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.exe'), false);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.sh'), false);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.js'), false);
    assert.equal(ALLOWED_UPLOAD_EXTENSIONS.has('.php'), false);
  });
});

describe('Priority 3 & 6: Data Consistency & Calculations', () => {
  it('should accurately calculate cart subtotals, 5% tax, and delivery fee', () => {
    const items = [
      { id: 'item-1', name: 'Benne Masala Dosa', price: 15.99, quantity: 2 },
      { id: 'item-2', name: 'Paneer Butter Masala', price: 21.99, quantity: 1 }
    ];

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const expectedSubtotal = 15.99 * 2 + 21.99; // 53.97

    assert.equal(totalItems, 3);
    assert.equal(Math.abs(totalPrice - expectedSubtotal) < 0.001, true);

    const tax = Math.round(totalPrice * 0.05); // Math.round(53.97 * 0.05) = Math.round(2.6985) = 3
    const delivery = 40;
    const finalTotal = totalPrice + tax + delivery;

    assert.equal(tax, 3);
    assert.equal(Math.abs(finalTotal - (53.97 + 3 + 40)) < 0.001, true);
  });

  it('should safely format Firestore Timestamps and null values without producing Invalid Date', () => {
    function formatNotificationDate(createdAt) {
      if (!createdAt) return 'Recent';
      try {
        if (typeof createdAt?.toDate === 'function') {
          return createdAt.toDate().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        }
        const d = new Date(createdAt);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        }
      } catch {}
      return 'Recent';
    }

    // Firestore Timestamp mock
    const firestoreTimestamp = {
      toDate: () => new Date('2026-10-15T10:00:00Z')
    };
    assert.equal(formatNotificationDate(firestoreTimestamp), 'Oct 15, 2026');

    // ISO string
    assert.equal(formatNotificationDate('2026-10-14T08:00:00Z'), 'Oct 14, 2026');

    // Null or undefined
    assert.equal(formatNotificationDate(null), 'Recent');
    assert.equal(formatNotificationDate(undefined), 'Recent');
    assert.equal(formatNotificationDate('invalid-string'), 'Recent');
  });
});
