[ ] Goal: Invoices can be issued without the billing logic knowing how customers are notified, so billing tests run without an SMTP server
│ [ ] {N1} Replace direct SmtpClient calls in BillingService with NotificationGateway calls (src/services/BillingService.ts:22)
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:20:16: TS2339 Property 'gateway' does not exist on type 'BillingService']
│ [ ] {N2} Remove now-unused SmtpClient from BillingService constructor and DI container (cleanup)
│   requires: {N1}
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:8: SmtpClient field will be orphaned once {N1} is done]
