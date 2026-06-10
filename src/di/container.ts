import { InvoiceRepository } from '../domain/InvoiceRepository.js';
import { SmtpClient } from '../infrastructure/SmtpClient.js';
import { BillingService } from '../services/BillingService.js';

export interface Container {
  billingService: BillingService;
}

export function buildContainer(): Container {
  const repository = new InvoiceRepository();
  const smtp = new SmtpClient('smtp.internal.example', 25);

  return {
    billingService: new BillingService(repository, smtp),
  };
}
