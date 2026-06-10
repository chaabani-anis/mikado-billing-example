[ ] Goal: Invoices can be issued without the billing logic knowing how customers are notified, so billing tests run without an SMTP server
│ [ ] {N1} Replace direct SmtpClient calls in BillingService with NotificationGateway calls (src/services/BillingService.ts:22)
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:20:16: TS2339 Property 'gateway' does not exist on type 'BillingService']
│ │ [ ] {N3} Add NotificationGateway parameter to BillingService constructor (src/services/BillingService.ts:8)
│ │   requires: {N5}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: src/services/BillingService.ts:4:37: TS2307 Cannot find module '../notifications/NotificationGateway.js']
│ │ │ [ ] {N5} Create NotificationGateway interface with notifyInvoiceIssued (src/notifications/NotificationGateway.ts)
│ │ │   [discovered-by: af5c92e]
│ │ │   [parent-error: src/services/BillingService.ts:4:37: TS2307 Cannot find module '../notifications/NotificationGateway.js']
│ │ [ ] {N4} Wire SmtpNotificationGateway into the DI container (src/di/container.ts:12)
│ │   requires: {N3}, {N5}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: src/di/container.ts:14:21: TS2554 Expected 3 arguments, but got 2]
│ │ [ ] {N6} Pass a NotificationGateway stub in billing test fixtures (tests/billing-service.test.ts:30,44)
│ │   requires: {N3}, {N5}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: tests/billing-service.test.ts:30:19: TS2554 Expected 3 arguments, but got 2]
│ [ ] {N2} Remove now-unused SmtpClient from BillingService constructor and DI container (cleanup)
│   requires: {N1}
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:8: SmtpClient field will be orphaned once {N1} is done]
