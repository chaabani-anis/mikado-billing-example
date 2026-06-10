import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { NotificationFailedError } from '../src/notifications/NotificationFailedError.js';

test('NotificationFailedError carries the invoice id and the underlying cause', () => {
  const cause = new Error('ECONNREFUSED');
  const error = new NotificationFailedError(42, cause);

  assert.equal(error.invoiceId, 42);
  assert.equal(error.cause, cause);
  assert.match(error.message, /invoice #42/);
});
