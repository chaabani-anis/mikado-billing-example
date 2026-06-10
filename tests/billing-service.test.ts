import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import * as net from 'node:net';
import { BillingService } from '../src/services/BillingService.js';
import { InvoiceRepository } from '../src/domain/InvoiceRepository.js';
import { SmtpClient } from '../src/infrastructure/SmtpClient.js';

/** Boots a minimal fake SMTP server — just to test invoice logic. */
function startFakeSmtpServer(): Promise<{ port: number; received: string[]; close: () => void }> {
  return new Promise((resolve) => {
    const received: string[] = [];
    const server = net.createServer((socket) => {
      socket.write('220 fake-smtp ready\r\n');
      socket.on('data', (chunk) => {
        received.push(chunk.toString());
        socket.write('250 ok\r\n');
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const address = server.address() as net.AddressInfo;
      resolve({ port: address.port, received, close: () => server.close() });
    });
  });
}

test('issuing an invoice persists it and notifies the customer', async () => {
  const smtpServer = await startFakeSmtpServer();
  const repository = new InvoiceRepository();
  const smtp = new SmtpClient('127.0.0.1', smtpServer.port);
  const service = new BillingService(repository, smtp);

  const invoice = await service.issueInvoice('alice@example.com', 4990);

  assert.equal(invoice.id, 1);
  assert.equal(repository.findAll().length, 1);
  assert.match(smtpServer.received.join(''), /Invoice #1/);
  smtpServer.close();
});

test('invoice amounts are formatted in euros in the notification', async () => {
  const smtpServer = await startFakeSmtpServer();
  const repository = new InvoiceRepository();
  const smtp = new SmtpClient('127.0.0.1', smtpServer.port);
  const service = new BillingService(repository, smtp);

  await service.issueInvoice('bob@example.com', 12550);

  assert.match(smtpServer.received.join(''), /125\.50 EUR/);
  smtpServer.close();
});
