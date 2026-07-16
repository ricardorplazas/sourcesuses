---
title: Model checks before submitting an Excel test
description: A deterministic final-review sequence for transaction, debt, returns, formula, formatting and submission checks in an interview model.
tags: [excel, modelling, quality-control]
cta: case
---

# Model checks before submitting an Excel test

**Intent:** catch decision-relevant defects before cosmetic cleanup. **Reviewed:** 16 July 2026.

Run checks in risk order. A perfect font cannot compensate for a broken sources-and-uses bridge.

## 1. Transaction integrity

- Sources equal uses.
- Enterprise value bridges to equity purchase price using the stated debt, cash and adjustments.
- Fees and financing costs are neither omitted nor double-counted.
- Management rollover and minimum cash are treated consistently.

## 2. Operating and cash-flow integrity

- Historical and projected periods are labelled consistently.
- EBITDA adjustments do not silently recur when they should not.
- Capex, working capital, cash taxes and exceptional cash costs reach free cash flow.
- The downside changes operational drivers rather than only the exit assumption.

## 3. Debt integrity

- Opening debt plus draws less repayments equals closing debt.
- Interest is based on the intended average or opening/closing convention.
- Mandatory amortisation, cash sweep and minimum cash interact correctly.
- Repayment does not exceed available cash or outstanding debt.

## 4. Return integrity

- Exit enterprise value uses the correct metric and period.
- Exit equity value deducts net debt once.
- Sponsor proceeds include only intended cash flows.
- MOIC and IRR/XIRR use consistent dates and signs.
- Sensitivities move in intuitive directions.

## 5. Formula and presentation hygiene

- Inputs, same-sheet formulas and cross-sheet formulas follow the chosen colour standard.
- Formula patterns are consistent across forecast periods.
- No required formula has been overwritten with a value.
- Units, signs, decimal places and zero presentation are consistent.
- Checks are visible and resolve to zero or a clear status.

## 6. Submission integrity

- The filename is professional and contains no accidental version history.
- Author, comments, hidden sheets and external links have been inspected.
- Required tabs and outputs are easy to find.
- The model opens without repair warnings.
- Numbers in the memo or presentation agree with the final workbook.

Use the [[../tools/model-submission-checklist|printable checklist]] for a final pass.

The checklist cannot prove that every formula is correct. Independent solving and manual review remain necessary.
