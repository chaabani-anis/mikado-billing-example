import { Invoice } from '../domain/Invoice.js';
import { InvoiceRepository } from '../domain/InvoiceRepository.js';
import { SmtpClient } from '../infrastructure/SmtpClient.js';
import { NotificationGateway } from '../notifications/NotificationGateway.js';

export class BillingService {
  constructor(
    private readonly repository: InvoiceRepository,
    private readonly smtp: SmtpClient,
    private readonly gateway: NotificationGateway,
  ) {}

  async issueInvoice(customerEmail: string, amountInCents: number): Promise<Invoice> {
    const invoice = new Invoice(
      this.repository.nextId(),
      customerEmail,
      amountInCents,
      new Date(),
    );
    this.repository.save(invoice);

    await this.gateway.notifyInvoiceIssued(invoice);

    return invoice;
  }
}
