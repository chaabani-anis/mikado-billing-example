export class Invoice {
  constructor(
    public readonly id: number,
    public readonly customerEmail: string,
    public readonly amountInCents: number,
    public readonly issuedAt: Date,
  ) {}
}
