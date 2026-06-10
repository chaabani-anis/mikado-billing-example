import { Invoice } from '../domain/Invoice.js';

/**
 * Port owned by the billing domain. Billing knows that customers
 * get notified — never how.
 */
export interface NotificationGateway {
  notifyInvoiceIssued(invoice: Invoice): Promise<void>;
}
