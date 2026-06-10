import { Invoice } from '../domain/Invoice.js';
import { SmtpClient } from '../infrastructure/SmtpClient.js';
import { NotificationGateway } from './NotificationGateway.js';
import { NotificationFailedError } from './NotificationFailedError.js';

/** SMTP adapter for the NotificationGateway port. */
export class SmtpNotificationGateway implements NotificationGateway {
  constructor(private readonly smtp: SmtpClient) {}

  async notifyInvoiceIssued(invoice: Invoice): Promise<void> {
    try {
      await this.smtp.send(
        invoice.customerEmail,
        `Invoice #${invoice.id}`,
        `Amount due: ${(invoice.amountInCents / 100).toFixed(2)} EUR`,
      );
    } catch (cause) {
      throw new NotificationFailedError(invoice.id, cause);
    }
  }
}
