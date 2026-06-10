# mikado-billing-example

Companion repository for the article series on the
[mikado-method skill](https://github.com/chaabani-anis/mikado-method):
applying the Mikado Method with an AI coding agent.

**The refactoring:** decouple a `BillingService` from its hardwired `SmtpClient`,
so that billing tests run without an SMTP server and a notification failure
never blocks invoice issuance.

## The history IS the documentation

This repo was built by replaying the Mikado workflow for real. Read it commit by commit:

```bash
git log --oneline --reverse
```

- `chore:` — the legacy starting point (note the fake SMTP server booted in the billing tests)
- `mikado-graph:` — one commit per exploration cycle; every naive attempt was made in the real files, its compiler errors captured in the graph, then reverted
- `feat:` — one atomic commit per graph node, leaves first, full test suite green at every commit

The dependency graph lives in [`docs/mikado/decouple-billing-from-smtp.mikado.md`](docs/mikado/decouple-billing-from-smtp.mikado.md).
Every node carries the real SHA of the cycle that discovered it (`discovered-by`)
and the real compiler error that made it necessary (`parent-error`).

## Run it

```bash
npm install
npm test
```

Check out any commit: the build and the tests are green at every step.

## Validate the graph

With the [mikado-method skill](https://github.com/chaabani-anis/mikado-method) installed:

```bash
bash <skill-dir>/validate-mikado.sh docs/mikado/decouple-billing-from-smtp.mikado.md
```

## License

MIT
