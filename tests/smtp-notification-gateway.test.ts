import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import * as net from 'node:net';
import { SmtpNotificationGateway } from '../src/notifications/SmtpNotificationGateway.js';
import { SmtpClient } from '../src/infrastructure/SmtpClient.js';
import { NotificationFailedError } from '../src/notifications/NotificationFailedError.js';
import { Invoice } from '../src/domain/Invoice.js';

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

test('sends the invoice notification over SMTP', async () => {
  const smtpServer = await startFakeSmtpServer();
  const gateway = new SmtpNotificationGateway(new SmtpClient('127.0.0.1', smtpServer.port));

  await gateway.notifyInvoiceIssued(new Invoice(7, 'alice@example.com', 4990, new Date()));

  assert.match(smtpServer.received.join(''), /Invoice #7/);
  assert.match(smtpServer.received.join(''), /49\.90 EUR/);
  smtpServer.close();
});

test('wraps SMTP failures in NotificationFailedError', async () => {
  const gateway = new SmtpNotificationGateway(new SmtpClient('127.0.0.1', 1)); // nothing listens there

  await assert.rejects(
    () => gateway.notifyInvoiceIssued(new Invoice(8, 'bob@example.com', 100, new Date())),
    NotificationFailedError,
  );
});
