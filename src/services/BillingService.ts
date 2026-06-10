import { Invoice } from '../domain/Invoice.js';
import { InvoiceRepository } from '../domain/InvoiceRepository.js';
import { SmtpClient } from '../infrastructure/SmtpClient.js';

export class BillingService {
  constructor(
    private readonly repository: InvoiceRepository,
    private readonly smtp: SmtpClient,
  ) {}

  async issueInvoice(customerEmail: string, amountInCents: number): Promise<Invoice> {
    const invoice = new Invoice(
      this.repository.nextId(),
      customerEmail,
      amountInCents,
      new Date(),
    );
    this.repository.save(invoice);

    // Billing knows the notification channel — and a failure here
    // blocks invoice issuance entirely.
    await this.smtp.send(
      customerEmail,
      `Invoice #${invoice.id}`,
      `Amount due: ${(amountInCents / 100).toFixed(2)} EUR`,
    );

    return invoice;
  }
}
