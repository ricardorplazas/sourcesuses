# Deliverable 5 — Product recommendation

## Best initial product

Launch no “library.” Validate a single **European Mid-Market Investment Case #1**.

Positioning:

> A timed, end-to-end private-equity case simulation: imperfect company information, an LBO and debt view, a one-page recommendation, and an IC-style presentation—followed by an audited solution and scoring rubric.

This is deliberately narrower than a PE recruiting course and more complete than a modeling exercise.

## Offer structure

### Free diagnostic

- 15-minute company snapshot;
- three decision questions;
- one small returns/debt calculation;
- one rubric excerpt and two-page debrief;
- email required only for debrief, with separate optional marketing consent;
- no account required during the earliest test.

### Paid full case

- CHF 59 beta for first 25–40 buyers;
- CHF 79 standard after defects and usability issues are fixed;
- one purchase, one user, 12 months of updates to that case;
- complete instructions, browser-viewed case pack, downloadable inputs and blank model;
- audited solution model after completion;
- strong answer, weak-but-plausible answer and scoring rubric;
- no coaching and no promise of personal review.

### Later, only after two cases

- single case: CHF 79;
- two-case bundle: CHF 129;
- three-to-four-case library: CHF 179–229 with 12 months of updates;
- club licence: quote based on cohort, initially CHF 500–1,500/year;
- add-in bundle price to be tested, not assumed.

Do not create CHF 29 drill packs at launch. They split demand, anchor the brand to commodity content and increase support/catalogue work.

## Case design

Use a fictional DACH-headquartered, pan-European B2B services or vertical-software company with €20m–€60m revenue. Avoid a pure SaaS case for the first product because the market is saturated with SaaS examples and AI can generate superficially plausible ones. A hybrid tech-enabled services case enables recurring-revenue analysis, customer concentration, labour economics, pricing and operational improvement without requiring obscure regulation.

The data must be rich enough for multiple defensible conclusions. Do not make the intended answer obvious. Pre-register the learning objectives and expected judgment disagreements before writing the solution.

## Repeatable content architecture

| Component                                               | Access                                       | Timing                                    |
| ------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| Landing-page preview, company teaser, learning outcomes | Public                                       | Before signup                             |
| 15-minute diagnostic                                    | Free browser                                 | Immediate                                 |
| Diagnostic debrief                                      | Free email/browser                           | After answers                             |
| Candidate instructions and exact deliverables           | Paid browser + printable                     | At start                                  |
| Time limit and timer                                    | Paid browser                                 | At start; pausable once for accessibility |
| Company/market/product/customer/operational pages       | Paid browser-only                            | During case                               |
| Historical financials and transaction/debt assumptions  | Paid browser + downloadable structured input | During case                               |
| Blank model/workbook and output templates               | Paid download                                | At start                                  |
| Recommendation and five-slide template                  | Paid download                                | At start                                  |
| Scoring rubric headings                                 | Paid browser                                 | Before start                              |
| Detailed rubric anchors                                 | Paid browser                                 | After completion                          |
| Solution model                                          | Paid download                                | After completion/self-attestation         |
| Strong/weak memo and IC examples                        | Paid browser; printable later if requested   | After completion                          |
| Debrief/common mistakes                                 | Paid browser/video                           | After completion                          |
| Advanced extensions                                     | Paid browser                                 | After debrief                             |

Do not withhold required information to manufacture difficulty. Ambiguity should resemble prioritisation under imperfect but coherent information, not a puzzle.

## Required and excluded components

### Required

- original case and provenance register;
- independent model review;
- automated numerical regression checks;
- actual timed completion by at least five beta testers;
- scoring anchors with multiple acceptable answers;
- clear download/view rules;
- version and errata log;
- accessibility and desktop/tablet check;
- product analytics limited to funnel/completion events with valid consent.

### Excluded

- broad accounting or LBO curriculum;
- AI evaluator/interviewer;
- user community;
- coaching marketplace;
- certificate;
- recruiter database;
- firm-specific questions;
- copied real tests;
- production Excel add-in;
- subscription/lifetime updates;
- mobile case completion promise;
- invasive proctoring or screenshot blocking.

## Premium differentiation

Premium must be a better outcome, not more files. Candidate premium features, to be tested later:

- a second advanced case with less structured data;
- a model-quality checklist and submission-cleanup workflow;
- cohort benchmark distributions from consenting users;
- a deterministic Excel-tool licence;
- twelve months of case revisions/new extension modules.

The add-in earns MVP status only if an offer test shows a material increase in paid selection and users can install/use it on their actual preparation machines.

## Alternative/pivot ranking

| Option                             | Recommendation                                | Why                                                     |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| Single integrated case simulation  | **Test first**                                | Smallest asset that tests differentiation and WTP       |
| University-licensed case platform  | Test as channel after individual proof        | Attractive distribution but slow procurement/turnover   |
| Browser-based timed assessment     | Feature of the case, not a standalone product | Experience improves realism but weak standalone demand  |
| Excel add-in first                 | Reject                                        | Crowded low-price market, support burden, weak urgency  |
| Add-in + case bundle               | Future test                                   | Bundle may improve premium conversion after core proof  |
| DACH recruiting course             | Reject                                        | “Europe/DACH” alone is not deep differentiation         |
| Broader finance interview platform | Reject                                        | Dilutes credibility and multiplies competitors          |
| Marketplace                        | Reject                                        | Two-sided cold start, QA and IP risk                    |
| IC training for professionals      | Park as later adjacent opportunity            | Higher WTP but employment/conflict and sales-cycle risk |

## Quality-control process

1. **Design brief:** learning objectives, difficulty, time budget, intended evidence conflicts and prohibited source categories.
2. **Provenance:** every external fact/data range has a public/licensed source or is explicitly invented; record licence and transformation.
3. **Single source of truth:** case assumptions live in structured data; slide, workbook and solution outputs are generated/checked against it where practical.
4. **Primary solve:** author completes the model and narrative without shortcuts.
5. **Independent solve:** reviewer rebuilds key schedules and writes an independent recommendation before seeing the answer key.
6. **Automated checks:** sources=uses, balance checks, cash roll-forward, debt minimum/repayment, interest, returns, sensitivity monotonicity and cross-file values.
7. **Red-team:** identify data leaks, contradictions, unrealistic assumptions, alternative valid theses and ambiguous rubric language.
8. **Timed beta:** at least five target candidates; capture actual completion time and failure points.
9. **Release:** immutable version ID in every asset; release notes and known limitations.
10. **Operations:** one-click issue report tied to case version/page/cell; severity and correction SLA.

### Minimum automated regression suite

- total sources equals total uses within €1;
- opening pro forma balance sheet balances within €1;
- projected cash-flow reconciliation balances every year;
- debt never repays more than available balance and respects cash sweep/minimum cash;
- cash interest references average/beginning debt consistently as documented;
- exit enterprise-to-equity bridge reconciles;
- MOIC and XIRR match independent calculations;
- sensitivities move in economically expected directions or exceptions are explained;
- every displayed number shared across materials matches the canonical dataset;
- blank candidate file contains no hidden solution formulas/comments/metadata.
