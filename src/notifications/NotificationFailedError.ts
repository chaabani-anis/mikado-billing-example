export class NotificationFailedError extends Error {
  constructor(
    public readonly invoiceId: number,
    public readonly cause: unknown,
  ) {
    super(`Notification failed for invoice #${invoiceId}`);
    this.name = 'NotificationFailedError';
  }
}
