import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { NotificationGateway } from '../src/notifications/NotificationGateway.js';
import { Invoice } from '../src/domain/Invoice.js';

test('a plain in-memory stub satisfies the NotificationGateway port', async () => {
  const notified: Invoice[] = [];
  const stub: NotificationGateway = {
    async notifyInvoiceIssued(invoice) {
      notified.push(invoice);
    },
  };

  await stub.notifyInvoiceIssued(new Invoice(1, 'alice@example.com', 4990, new Date()));

  assert.equal(notified.length, 1);
});
