[x] Goal: Invoices can be issued without the billing logic knowing how customers are notified, so billing tests run without an SMTP server
│ [x] {N1} Replace direct SmtpClient calls in BillingService with NotificationGateway calls (src/services/BillingService.ts:22)
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:20:16: TS2339 Property 'gateway' does not exist on type 'BillingService']
│ │ [x] {N3} Add NotificationGateway parameter to BillingService constructor (src/services/BillingService.ts:8)
│ │   requires: {N5}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: src/services/BillingService.ts:4:37: TS2307 Cannot find module '../notifications/NotificationGateway.js']
│ │ │ [x] {N5} Create NotificationGateway interface with notifyInvoiceIssued (src/notifications/NotificationGateway.ts)
│ │ │   [discovered-by: af5c92e]
│ │ │   [parent-error: src/services/BillingService.ts:4:37: TS2307 Cannot find module '../notifications/NotificationGateway.js']
│ │ [x] {N4} Wire SmtpNotificationGateway into the DI container (src/di/container.ts:12)
│ │   requires: {N3}, {N5}, {N7}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: src/di/container.ts:14:21: TS2554 Expected 3 arguments, but got 2]
│ │ │ [x] {N7} Implement SmtpNotificationGateway adapter (SmtpClient via constructor + notifyInvoiceIssued body)
│ │ │   requires: {N5}, {N8}
│ │ │   [discovered-by: 0479a99]
│ │ │   [parent-error: src/di/container.ts:12:23: TS2304 Cannot find name 'SmtpNotificationGateway']
│ │ │ │ [x] {N8} Create NotificationFailedError class (src/notifications/NotificationFailedError.ts)
│ │ │ │   [discovered-by: 0479a99]
│ │ │ │   [parent-error: src/notifications/SmtpNotificationGateway.ts:15:17: TS2304 Cannot find name 'NotificationFailedError']
│ │ [x] {N6} Pass a NotificationGateway stub in billing test fixtures (tests/billing-service.test.ts:30,44)
│ │   requires: {N3}, {N5}
│ │   [discovered-by: af5c92e]
│ │   [parent-error: tests/billing-service.test.ts:30:19: TS2554 Expected 3 arguments, but got 2]
│ [x] {N2} Remove now-unused SmtpClient from BillingService constructor and DI container (cleanup)
│   requires: {N1}
│   [discovered-by: d886144]
│   [parent-error: src/services/BillingService.ts:8: SmtpClient field will be orphaned once {N1} is done]
