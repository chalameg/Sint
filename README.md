# Sint? (ስንት?)

An Ethiopian calculator app for quick everyday “how much?” questions.

Sint? is local-first: all calculations and history stay on the device. There is no backend and no login.

## Calculators

- **Salary** — Ethiopian employment income tax, employee pension, and estimated net take-home. Tax can be applied to gross pay or to gross minus pension.
- **Loan** — monthly payment, total repayment, and total interest
- **VAT** — add or remove VAT (default 15%, overridable)
- **Savings** — final amount, total contributed, and estimated gain

## Rates

Ethiopian tax, VAT, and pension constants live in [`src/config/ethiopia.ts`](src/config/ethiopia.ts). Update that file when the law changes. Calculation logic is in [`src/calculators/`](src/calculators/).

## Scripts

```bash
npm install
npm test
npm run typecheck
npm run lint
npx expo start
```

## Stack

Expo, React Native, TypeScript, and Expo Router.
