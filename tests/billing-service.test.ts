import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { BillingService } from '../src/services/BillingService.js';
import { InvoiceRepository } from '../src/domain/InvoiceRepository.js';
import { SmtpClient } from '../src/infrastructure/SmtpClient.js';
import { NotificationGateway } from '../src/notifications/NotificationGateway.js';
import { Invoice } from '../src/domain/Invoice.js';

function notificationStub(): { gateway: NotificationGateway; notified: Invoice[] } {
  const notified: Invoice[] = [];
  return {
    notified,
    gateway: {
      async notifyInvoiceIssued(invoice) {
        notified.push(invoice);
      },
    },
  };
}

// No fake SMTP server anymore. The unused SmtpClient parameter goes away with {N2}.
const unusedSmtp = () => new SmtpClient('127.0.0.1', 1);

test('issuing an invoice persists it and notifies the customer', async () => {
  const repository = new InvoiceRepository();
  const { gateway, notified } = notificationStub();
  const service = new BillingService(repository, unusedSmtp(), gateway);

  const invoice = await service.issueInvoice('alice@example.com', 4990);

  assert.equal(invoice.id, 1);
  assert.equal(repository.findAll().length, 1);
  assert.equal(notified[0]?.id, 1);
});

test('the notified invoice carries the amount due', async () => {
  const repository = new InvoiceRepository();
  const { gateway, notified } = notificationStub();
  const service = new BillingService(repository, unusedSmtp(), gateway);

  await service.issueInvoice('bob@example.com', 12550);

  assert.equal(notified[0]?.amountInCents, 12550);
});
