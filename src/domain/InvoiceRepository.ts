import { Invoice } from './Invoice.js';

export class InvoiceRepository {
  private readonly invoices: Invoice[] = [];

  nextId(): number {
    return this.invoices.length + 1;
  }

  save(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  findAll(): readonly Invoice[] {
    return this.invoices;
  }
}
