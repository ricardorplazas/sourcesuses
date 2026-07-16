# Deliverable 1 — Repository assessment

Assessment date: 16 July 2026. Checkout: `v4` at `5384beb`.

> **Phase 0 update — 16 July 2026:** The findings below describe the assessed baseline. Repository-controlled Phase 0 remediation has since disabled optional analytics, removed the defective consent banner and external base fonts, repaired CI/checks/navigation/metadata, patched the audited dependencies, and added governance controls. `npm run verify` now passes with 48 tests and zero production audit findings. DNS/HTTPS were explicitly deferred by the founder, and professional employment/legal/tax/brand review remains open. See [Phase 0 status](../governance/phase-0-status.md).

## Executive finding

The repository is a fork of Quartz v4 configured as a public “Sources & Uses” digital garden. Its original thesis appears to have been a networked set of private-equity and accounting study notes with search, backlinks and a graph view. It is not an embryonic commerce application. Starting the commercial product in a clean private repository will be faster and safer than extending this tree.

Keep the domain/brand only after trademark and employment review. Preserve this repository as an archive and possible public SEO/reference microsite. Reuse ideas from a small subset of notes only after rewriting, sourcing and technical review. Do not carry the Quartz codebase into the paid application.

## What currently exists

| Area            | Observed state                                                                         | Commercial relevance                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Framework       | Quartz 4.5.1, TypeScript/Preact static-site generator                                  | Suitable for a public digital garden, not accounts or commerce                                                         |
| Content         | 43 short notes plus home and privacy pages; 45 Markdown inputs in the successful build | Topic seed list only                                                                                                   |
| Navigation      | Search, backlinks, graph, recent-note panels, hard-coded Articles/Models/Notes links   | Articles and Models have no content; navigation overpromises                                                           |
| Analytics       | Microsoft Clarity project ID in configuration                                          | Potentially useful, but consent implementation is defective                                                            |
| Hosting         | GitHub Pages workflow on pushes to `v4`; last successful deploy 11 Aug 2025            | Static hosting only                                                                                                    |
| Domain          | `sourcesuses.com` configured in GitHub Pages                                           | Currently nonresponsive; Pages API reports certificate `bad_authz`                                                     |
| Tests           | 48 inherited Quartz tests pass                                                         | They test framework utilities, not Sources & Uses behaviour                                                            |
| Product systems | None                                                                                   | No auth, accounts, payments, entitlements, database, cases, models, viewer, email funnel, affiliate tracking or add-in |

## Verification performed

- `npm ci`: completed; npm reported 11 production-tree vulnerabilities, 3 moderate and 8 high.
- `npm run check`: **failed** at `quartz/components/Footer.tsx:2` because `QuartzComponent` is imported but unused.
- `npm test`: **passed**, 48/48.
- `npx quartz build`: **passed**, 45 input files and 60 emitted files.
- Current-tree secret-pattern scan: no credential material found. Workflow references are normal GitHub secret placeholders.
- Git history and all branches were inspected for `.xlsx`, `.xlsm`, `.pdf`, `.pptx`, `.docx`, databases and archives. No founder-created case/model/slide assets were found; non-code images belong to Quartz documentation/static assets.
- GitHub has no issues. Open pull requests are Dependabot updates. Most upstream CI workflows are disabled by repository-name guards; only deployment is project-specific.

## Architecture

```text
Markdown notes
    -> Quartz transformers
    -> Preact components/layout
    -> static HTML/CSS/JS in public/
    -> GitHub Pages
```

There is no server-side trust boundary. Any future authenticated viewer, payment webhook or licensing service would require a separate application/backend. Grafting those concerns into Quartz would create a split architecture while retaining a large upstream codebase and history that the project does not need.

## Content assessment

The notes are generally 60–300 words, mostly definitional, uncited and heavily cross-linked to pages that do not exist. They contain unresolved tasks and some material drafting errors. Examples:

- `Sources and Uses.md` says “Therefore the uses will typically contain” under the Sources section and includes “Existing Cash” without clearly specifying whether it reduces purchase funding need or is delivered/retained.
- The same note ends with an uncompleted `Insert graphic` task.
- `Capital Structure.md` contains `Fix Links`.
- `Pro Forma Balance Sheet.md` contains an unresolved accounting-treatment task.
- Many wikilinks point to absent concepts, creating the impression of breadth without usable explanations.

These are reasonable personal revision notes but cannot be sold or used as answer-key authority. There is no source/provenance register showing whether text was independently authored, AI-drafted or derived from third parties. Treat every note as unverified until reviewed.

## Security, privacy and operational findings

### High priority

1. **Analytics consent is cosmetic.** Quartz injects Microsoft Clarity from `componentResources.ts` when analytics is configured. The custom banner merely stores a dismissal flag and has only an “OK” button; it does not prevent Clarity loading, offer reject/customise controls or support withdrawal. EU guidance says analytics/market-research cookies require consent before setting them. The current design is not an adequate consent mechanism.
2. **Public production-domain failure.** GitHub Pages reports the HTTPS certificate in `bad_authz`, while DNS resolution does not match a working Pages origin. Live HTTP(S) requests returned empty responses/timeouts on the assessment date. This eliminates current funnel value.
3. **Known dependency vulnerabilities.** `npm audit --omit=dev` reports issues in Preact, `ws`, `minimatch`, `picomatch`, `js-yaml`, XML tooling and others. A static deployment reduces server runtime exposure, but the build/supply-chain surface remains and should not be carried forward untreated.
4. **Public-repository/IP boundary.** The repository is public and carries an MIT licence inherited from Quartz. Adding paid cases, solution files, licence logic or private assets here would create avoidable exposure and ambiguity over content licensing.

### Medium priority

- Privacy-policy Microsoft link has malformed Markdown.
- The policy says “by using the site, you agree,” which is not a valid substitute for consent where prior consent is required.
- The policy describes server collection without identifying the actual host/data flows, retention periods, controller details, processors, transfer destinations or a consent withdrawal route.
- Google Fonts and external CDNs are loaded from page head and should be included in the data-flow/consent review.
- The footer and navigation contain extensive debug logging and commented development remnants.
- Hard-coded root links and empty Articles/Models routes create broken/empty journeys.
- Root README, package metadata, funding link, templates and most documentation still describe upstream Quartz, not Sources & Uses.
- No project-specific acceptance tests, broken-link test, accessibility audit, privacy test, dependency policy or deployment runbook exists.

## Technical debt and overengineering

For the current 43-note site, the full Quartz graph, popovers, backlinks, recent-content components, custom header JavaScript, two consent components and extensive upstream history are more machinery than the business needs. Conversely, every commercial capability is absent. This is the wrong kind of complexity: substantial presentation infrastructure around low-depth content, with no transactional system.

## Keep / delete / rewrite

| Item                              | Decision                               | Rationale                                                          |
| --------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| Git history and current repo      | Archive                                | Useful provenance; poor foundation                                 |
| `sourcesuses.com` and brand       | Conditional keep                       | Memorable finance term; run trademark/search and employment review |
| Quartz public-note site           | Optional keep as separate microsite    | Can host sourced free articles if domain is repaired               |
| Topic taxonomy in `content/Notes` | Reuse as brainstorm only               | Helps identify prerequisite concepts                               |
| Existing prose                    | Rewrite and source                     | Not commercial-grade; provenance absent                            |
| Privacy/cookie implementation     | Remove/rebuild before public analytics | Current consent does not control tracking                          |
| Custom header/mindmap             | Remove from product                    | No relevance to paid workflow                                      |
| Empty Articles/Models navigation  | Remove now                             | Broken promise                                                     |
| Upstream docs/templates/FUNDING   | Remove in any clean project            | Confusing ownership/product metadata                               |
| Quartz framework in paid product  | Do not reuse                           | No auth/backend/product advantage                                  |
| Deployment workflow               | Do not reuse directly                  | Static-only and domain unhealthy                                   |

## Recommended repository strategy

1. Freeze this repository except for an optional safety repair that disables Clarity and fixes the domain/holding page.
2. Create a private, clean validation repository containing only landing-page assets, case source files, model-audit tests and the evidence/provenance register.
3. Keep commercial cases and solutions private. Publish only intentionally free derivatives.
4. If Phase 2 is authorised, create a separate application repository with project-specific ownership, licence, CI, secrets, architecture decision records and deployment instructions.

## Missing information

The repository cannot answer these commercial questions:

- historic site traffic, Clarity sessions, geography, queries or email signups;
- domain registrar/DNS intent and why DNS changed;
- provenance and rights for each note;
- whether any case/model work exists outside Git;
- founder employment-contract, side-activity, IP-assignment and communications restrictions;
- current audience size, university/recruiter relationships or creator access;
- customer interviews, willingness-to-pay data, refunds or prior sales;
- expected language strategy;
- hours the founder can sustainably commit during recruiting season;
- independent case reviewer availability and cost.

These are inputs to validation, not reasons to build around the uncertainty.
