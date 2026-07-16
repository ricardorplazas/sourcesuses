# Detailed implementation plan — current garden to full Sources & Uses product

Status: execution plan, not implementation authorisation. The plan describes the full destination while preserving the commercial gates established in the diligence package.

> **Implementation update — 16 July 2026:** The repository-controlled parts of Phase 0 have been implemented and verified. DNS/HTTPS are deferred until domain repurchase. Employment/IP, Swiss legal/tax/privacy, controller contact, and brand clearance remain external blockers and are not represented as complete. See [Phase 0 status](../governance/phase-0-status.md).

## 1. Objective and planning principle

The objective is to transform Sources & Uses from a public Quartz collection of short finance notes into a low-intervention product system with three connected layers:

```text
Public digital garden
    -> Free Decision Diagnostic
        -> Paid IC simulations
            -> Case series / cohort licences
                -> Premium Excel productivity add-in, only if validated
```

The implementation must not be treated as one uninterrupted build. “Fully fledged” is the destination; passing a phase gate authorises only the next phase. This prevents a technically complete platform from preceding evidence that candidates will pay for the assessment experience.

## 2. Definition of the fully fledged product

The end state includes:

- a functioning `sourcesuses.com` public garden and product-marketing site;
- 12–20 high-quality, sourced, purchase-adjacent articles and supporting glossary pages;
- a free, browser-based 15-minute Decision Diagnostic;
- consent-aware email capture and automated diagnostic-to-product sequence;
- an authenticated customer application, preferably at `app.sourcesuses.com`;
- merchant-of-record checkout, accounts, orders and entitlements;
- three to five original, independently audited IC simulations;
- timed and untimed case modes;
- a browser case viewer, private notes, progress and solution unlock;
- downloadable candidate inputs, model and communication templates;
- downloadable solution models after completion;
- structured decision snapshots and self-scoring rubrics;
- version-specific cohort benchmarks only after credible sample sizes;
- club/creator attribution, discount codes and cohort-seat management;
- an internal admin, issue, release and audit workflow;
- privacy, security, recovery and support runbooks;
- a premium Office.js Excel add-in only if the separate commercial and compatibility gates pass.

The end state does **not** include AI evaluation, human coaching, a community, copied firm tests, invasive proctoring, a generic finance course or a custom payment/tax stack.

## 3. Starting state and migration implications

The current repository is useful only for the public acquisition layer:

- Quartz 4.5.1 static site on branch `v4`;
- 43 short notes plus home/privacy content;
- no commercial cases, models, accounts, payments or database;
- current TypeScript check failure in `quartz/components/Footer.tsx`;
- known dependency vulnerabilities;
- Clarity loaded without effective prior consent;
- upstream workflows mostly disabled by repository guards;
- root documentation/package metadata still inherited from Quartz;
- empty Articles and Models navigation;
- nonworking domain/HTTPS at the assessment date.

Implications:

1. Retain this repository only as the public garden after a deliberate cleanup.
2. Never place commercial cases, answer keys, customer data, secrets or licence logic here.
3. Create a private case-authoring repository before creating case assets.
4. Create a separate private application repository only after the validation gate.
5. Maintain explicit interfaces between the three repositories rather than sharing files manually.

## 4. Target repository and domain model

### Repository A — `sourcesuses` public

Purpose: discovery, education, product marketing and public diagnostic entry.

Contains:

- public articles and glossary pages;
- product/diagnostic landing pages or links;
- intentionally free downloads;
- public brand assets;
- public privacy/cookie information;
- no paid source material.

Visibility: public.

### Repository B — `sourcesuses-content`

Purpose: private authoring, audit, provenance and release production for every case.

Contains:

- canonical case data;
- narrative sources;
- spreadsheet and presentation sources;
- rubrics and debrief scripts;
- provenance ledger;
- independent-review records;
- numerical regression tests;
- release manifests and checksums.

Visibility: private. Do not inherit the public repository's MIT licence. Add an explicit proprietary notice and contributor/IP terms.

Suggested structure:

```text
cases/
  aurelis/
    case.yaml
    versions/
      1.0.0/
        manifest.yaml
        data/
          canonical.json
          historicals.csv
          customers.csv
          operations.csv
          assumptions.json
        narrative/
          candidate-instructions.md
          case-pages/
          debrief/
          rubric.yaml
        workbooks/
          candidate-inputs.xlsx
          blank-model.xlsx
          solution-model.xlsx
        presentations/
          case-source.pptx
          candidate-template.pptx
          solution-ic.pptx
        provenance/
          sources.csv
          licences/
          originality-review.md
        reviews/
          primary-solve.md
          independent-solve.md
          red-team.md
          beta-findings.csv
        tests/
          expected-outputs.json
          cross-file-values.json
        release/
          manifest.json
          checksums.sha256
scripts/
schemas/
templates/
docs/
```

Large binary sources can use Git LFS or a restricted authoring store. Release artifacts should be published to private application storage by CI, not committed to the public garden.

### Repository C — `sourcesuses-app`

Purpose: authenticated product, commerce, entitlements, viewer, analytics and later add-in.

Suggested monorepo structure:

```text
apps/
  web/                 # Next.js public diagnostic + authenticated app
  excel-addin/         # absent until Phase 5 gate
packages/
  domain/              # entitlement, progress and scoring rules
  database/            # schema, migrations, generated types
  content-contract/    # case manifest schemas and validation
  ui/                  # shared design system
  analytics/           # typed event definitions
  email/               # transactional templates
  test-fixtures/       # synthetic cases only
docs/
  adr/
  runbooks/
  threat-model/
```

Visibility: private.

### Domains

- `sourcesuses.com`: public garden, product pages and SEO.
- `app.sourcesuses.com`: authentication, dashboard, case viewer and account.
- no public asset subdomain; protected files should be returned through authorised app routes or short-lived scoped URLs.
- configure a dedicated transactional-email subdomain with SPF, DKIM and DMARC.

Keep public and app cookies scoped to the minimum required domains. Transfer campaign attribution through signed/validated parameters rather than a broad cross-domain tracking cookie where practical.

## 5. Target architecture

### Technology choices

- public garden: rehabilitated Quartz during validation; reconsider migration only if maintenance becomes material;
- application: Next.js with TypeScript as a modular monolith;
- database/auth/private storage: managed PostgreSQL/Auth/Storage such as Supabase;
- application hosting: Vercel or Cloudflare based on founder familiarity and storage choice;
- checkout/tax: Lemon Squeezy or comparable merchant of record;
- email: managed transactional and consent-aware marketing provider;
- analytics: first-party typed events plus a privacy-conscious aggregate tool if needed;
- content release: private CI validating manifests and publishing immutable assets;
- viewer: server-rendered PDF pages to images, private object storage and authorised page delivery;
- add-in: Office.js/TypeScript, shared entitlement API and separate package only after validation.

### Logical flow

```text
Search / LinkedIn / partner link
    -> public article
    -> diagnostic CTA
    -> free diagnostic in app
    -> optional marketing consent
    -> product preview
    -> hosted MoR checkout
    -> verified webhook
    -> order + entitlement
    -> passwordless account
    -> case start
    -> viewer + downloads
    -> decision snapshot
    -> solution unlock
    -> self-score + debrief
    -> version-qualified benchmark
```

Every protected operation must be authorised on the server. UI visibility, obscured object paths and client-held product metadata are not authorisation.

## 6. Programme governance

### Decision owners

| Area                                       | Accountable owner        | Required reviewer                              |
| ------------------------------------------ | ------------------------ | ---------------------------------------------- |
| Commercial gates and scope                 | Founder                  | Independent adviser where useful               |
| Case content and final answers             | Founder                  | Independent PE/model reviewer                  |
| Employment, IP, consumer terms and privacy | Founder                  | Qualified Swiss/EU counsel/accountant          |
| Application architecture/security          | Technical owner          | External security reviewer before broad launch |
| Brand and user experience                  | Founder/product designer | Target-user beta panel                         |
| Release approval                           | Founder                  | Content reviewer + technical owner             |

One person may hold multiple roles, but independent case review must not be performed by the original author.

### Working rules

- maintain one issue tracker with phase, workstream, owner, dependency and acceptance criteria;
- use short-lived branches and reviewed pull requests;
- record nontrivial choices in Architecture Decision Records;
- separate estimates, assumptions and verified facts in content and planning;
- maintain an explicit risk register reviewed at every gate;
- time-track founder work by content, distribution, support and engineering;
- do not move tasks into a later phase merely to make an earlier phase appear complete;
- no production secret or customer data in local fixtures, screenshots or logs.

### Definition of done for any task

A task is complete only when:

1. acceptance criteria pass;
2. tests or manual evidence are attached;
3. documentation and operational implications are updated;
4. accessibility/privacy/security impact is considered;
5. error and rollback behaviour is defined where state changes;
6. analytics events are added only when needed;
7. no unrelated scope is hidden in the change.

## 7. Phase 0 — safety, legal and current-site recovery

Indicative elapsed time: 1–3 weeks. Founder/technical effort: 20–40 hours, excluding professional advice.

### Gate 0A — permission to operate

Before collecting money or authoring commercially sensitive content:

- review employment contract, side-activity policy, IP assignment, confidentiality and duty-of-loyalty requirements;
- determine whether notification or written approval is required;
- document use of personal time, equipment, accounts and funds;
- establish prohibited-source categories: employer documents, real datarooms, candidate submissions, copied interview tests and commercial course materials;
- obtain preliminary Swiss sole-proprietor/self-employment, AHV, VAT and accounting advice;
- decide controller identity, business contact address and record-retention approach;
- conduct preliminary brand/domain/trademark search for Sources & Uses and the provisional case-company name.

Acceptance criteria:

- written founder boundary memo exists;
- professional questions are resolved enough to run interviews and take payment;
- original-content and provenance policy is signed off;
- no unresolved restriction makes public marketing unsafe.

If this gate fails, stop commercial work.

### Current public repository remediation backlog

| ID    | Task                                                                 | Dependency    | Acceptance criterion                                                        |
| ----- | -------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------- |
| G-001 | Tag/archive the assessed `v4` state                                  | None          | Reproducible snapshot and rollback reference exist                          |
| G-002 | Remove/disable Clarity immediately                                   | None          | No optional tracker request before consent                                  |
| G-003 | Fix the unused `QuartzComponent` import                              | None          | `npm run check` passes that error                                           |
| G-004 | Review/update vulnerable dependencies in small PRs                   | G-003         | Production audit reviewed; unresolved risks documented                      |
| G-005 | Replace upstream-guarded CI with project CI                          | G-003         | Pull requests run type, format, test, build and link checks                 |
| G-006 | Remove upstream FUNDING/templates/branding metadata                  | G-001         | Repository describes Sources & Uses ownership and operation                 |
| G-007 | Repair DNS, Pages custom-domain and HTTPS                            | Domain access | Root and `www` have intentional redirects and valid TLS                     |
| G-008 | Replace cosmetic consent with valid consent or no optional analytics | Legal input   | Reject is as easy as accept; consent controls script loading and withdrawal |
| G-009 | Repair privacy page and third-party data-flow inventory              | G-008         | Actual providers, purposes, retention and rights are described              |
| G-010 | Remove empty navigation and debug remnants                           | None          | No empty Articles/Models links or console/debug artefacts                   |

Do not redesign the entire garden in Phase 0. Restore a safe, truthful, functioning baseline.

### Gate 0B — safe public baseline

- `npm ci`, type/format checks, tests and build pass;
- dependency risks are resolved or explicitly accepted;
- domain and HTTPS work;
- no optional analytics loads before valid consent;
- privacy page reflects actual behaviour;
- no broken primary navigation;
- no commercial/private assets exist in the repository.

## 8. Phase 1 — garden-to-funnel transformation and demand validation

> **Implementation update — 16 July 2026:** The buildable validation infrastructure has been implemented across the public repository and a separate local private authoring repository. The remaining work in this phase consists principally of external evidence collection, independent case/workbook review, provider configuration after professional clearance, and gate decisions. DNS/custom-domain work remains deferred. See [Phase 1 status](../validation/phase-1-status.md).

Indicative elapsed time: 6–8 weeks. Hard cap: CHF 3,000 cash and 120 founder hours for validation assets and evidence.

This phase runs three parallel workstreams: public acquisition, case/diagnostic production and commercial validation. It does not build the authenticated platform.

### Workstream 1A — content strategy and garden information architecture

#### Content inventory

For every current page, record:

- current URL and search intent;
- accuracy and source status;
- target customer stage;
- overlap with another page;
- internal links;
- keep/rewrite/merge/noindex/delete decision;
- destination CTA;
- owner and review date.

Do not bulk-delete URLs with potential history before checking redirects. Incomplete or unreliable pages should be unpublished/noindexed until rewritten.

#### Target public structure

```text
/
/learn/
  /pe-case-study/
  /lbo-model-test/
  /investment-committee/
  /commercial-judgment/
  /excel-model-quality/
/glossary/
/tools/model-submission-checklist/
/diagnostic/
/cases/ic-simulation-01/
/about/
/privacy/
/terms/
```

Initial pillar articles:

1. How to approach a two-hour PE case study
2. How to structure a one-page investment recommendation
3. What belongs in a five-slide IC presentation
4. How much model detail is appropriate in an interview LBO
5. How to challenge management assumptions under time pressure
6. Model checks to run before submitting an Excel test
7. Recurring revenue versus high-quality revenue
8. Building a useful downside case
9. Common technically correct but decision-weak submissions
10. European mid-market case-study context
11. Banker versus consultant case-study failure modes
12. A 30/60/120-minute case work plan

Each article requires:

- explicit search/customer intent;
- original, sourced content;
- one useful framework/checklist;
- contextual diagnostic CTA;
- product CTA only where relevant;
- author/review date and correction route;
- canonical URL, description and structured metadata;
- internal links to the next useful page, not indiscriminate backlinks.

#### Garden UX changes

- simplify navigation to Learn, Free Diagnostic, Cases and About;
- demote or remove graph/backlink features from primary mobile/desktop UX;
- create a product-quality homepage rather than a notes index;
- add article CTA components with typed campaign/content identifiers;
- add a comparison page explaining cases versus courses, AI and coaching without disparagement;
- provide RSS/sitemap and intentional canonical URLs;
- create 301 mappings for changed slugs;
- add broken-link and metadata checks to CI;
- test keyboard navigation, contrast, zoom and reduced motion.

Acceptance criteria:

- at least four pillar pages and the homepage are production-ready before traffic outreach;
- no published page contains unresolved drafting tasks or unsupported claims;
- every commercial article has exactly one primary next action;
- primary pages score at least 90 in automated performance/accessibility checks under the agreed test profile, with manual keyboard review;
- sitemap, canonical URLs, redirects and robots rules are verified.

### Workstream 1B — free Decision Diagnostic

Validation implementation should be disposable and minimal:

- static or lightweight form at `/diagnostic/` or a no-auth app route;
- two-page fictional snapshot;
- six questions and 15-minute timer;
- deterministic answer/debrief logic;
- separate consent checkboxes for debrief delivery and marketing;
- no sensitive uploads;
- event tracking for start, completion, result and paid-preview click;
- abuse/bot controls that do not add excessive friction;
- exportable responses for analysis.

Diagnostic content tasks:

1. define learning objectives and qualifying signals;
2. draft fictional data and questions;
3. independently solve every calculation;
4. create scoring anchors without fake precision;
5. run five target-user timed tests;
6. revise language and time limit;
7. create concise debrief and paid-case transition;
8. document version and provenance.

Acceptance criteria:

- median beta completion time is 10–18 minutes;
- no calculation or interpretation defect remains open;
- completion works without account creation;
- marketing consent is optional and not preselected;
- responses can be deleted/exported under the data policy;
- at least 50% of qualified starters complete during validation.

### Workstream 1C — first paid case authoring system

Create the private content repository before drafting commercial assets.

#### Authoring foundation

- case manifest JSON/YAML schema;
- asset types and access policies;
- versioning convention (`major.minor.patch`);
- canonical data schema and unit/currency conventions;
- provenance ledger schema;
- review-status workflow;
- release checklist;
- hash/checksum generation;
- redacted synthetic fixture for CI.

#### Case 01 production sequence

1. **Design brief:** customer level, learning objectives, time budget, decision tensions and acceptable alternative answers.
2. **Provenance plan:** identify public/licensed inspiration and explicitly invented ranges; reject prohibited sources.
3. **Canonical data:** create histories, KPIs, transaction terms, debt terms and management case in structured files.
4. **Independent economic model:** establish expected base/downside results outside presentation materials.
5. **Primary solution workbook:** build and document the author's coherent approach.
6. **Candidate workbook:** strip answers, hidden metadata, comments and leakage; preserve only intended scaffolding.
7. **Case narrative:** produce 24–30 pages from canonical values with explicit source/assumption labels.
8. **Communication outputs:** one-page recommendation, five-slide strong example, plausible weak example and alternative valid conclusion.
9. **Rubric:** 100-point weighted self-assessment with observable anchors.
10. **Independent solve:** reviewer reaches a recommendation before seeing the solution.
11. **Red-team:** test ambiguity, alternative conclusions, source similarity and accidental hints.
12. **Regression:** validate sources/uses, cash, debt, returns, sensitivity and cross-file values.
13. **Timed beta:** five to ten target users complete the case under observed conditions.
14. **Release candidate:** fix defects, freeze version and generate checksums/manifest.

Automated checks must cover:

- sources equals uses;
- pro forma balance and cash-flow reconciliation where applicable;
- debt balance, repayment, interest and minimum cash;
- enterprise-to-equity bridges;
- MOIC and XIRR against independent calculations;
- sensible sensitivity directions;
- shared values across case pages, inputs, solution and debrief;
- no hidden solution content in candidate assets;
- no author/employer metadata in released documents.

Do not claim CI fully audits Excel formulas. Formula integrity still requires independent manual review and, where possible, workbook calculation in supported desktop Excel.

### Workstream 1D — landing, pricing and manual commerce

- create two message variants: “European case library” and “rehearse the full investment decision”;
- show 8–12 finished case pages, rubric excerpt, model screenshot and exact deliverables;
- publish prerequisites and explicit “not for” criteria;
- offer CHF 59 beta and test CHF 79 after quality proof;
- use hosted merchant-of-record checkout or refundable preorder;
- fulfil beta manually through protected links if necessary;
- record each order, refund, source and support interaction;
- do not promise the add-in or unbuilt future cases.

### Workstream 1E — automated email funnel

Minimum sequence:

1. immediate diagnostic result/debrief;
2. day 2: strong versus weak decision example;
3. day 5: full-case preview and prerequisites;
4. day 8: common case prioritisation mistake;
5. day 12: paid simulation offer or reminder.

Requirements:

- marketing emails only with valid consent;
- one-click unsubscribe;
- attribution and diagnostic version retained without excessive profiling;
- suppress purchasers from introductory sales sequence;
- no false urgency or fabricated scarcity.

### Workstream 1F — customer and channel validation

- 15–20 recent European PE case participants;
- 20–30 university club contacts;
- 10–15 small creator/newsletter contacts;
- 8–10 recruiter interviews;
- unique source codes for every partner;
- weekly funnel and founder-time review;
- documented reasons for purchase and nonpurchase.

### Phase 1 gate

Proceed to the authenticated app only if:

- at least 8 paid orders from 150 qualified visitors or 15 orders overall without paid acquisition;
- at least 10 buyers start the case;
- at least 40% of starters reach the debrief;
- median realism and usefulness are each at least 8/10;
- no critical numerical defect is unresolved;
- serious-defect/refund requests are no more than 8%;
- at least two partners send tracked qualified traffic;
- at least 60% of completers name a distinctive paid outcome unaided;
- founder can produce/audit the case inside the cap or show a credible repeatable path.

If the gate fails, run one focused product/message correction only. Then stop or retain the garden as a public knowledge asset.

## 9. Phase 2 — authenticated minimum commercial product

Entry: Phase 1 gate plus 25 cumulative paid buyers or one credible cohort contract.

Indicative elapsed time: 8–14 weeks part-time. Engineering effort: 250–450 hours depending on experience and bought services. This phase launches with one or two cases; it does not yet include the add-in.

### Epic 2A — application foundation

Tasks:

- create private `sourcesuses-app` repository;
- select package manager/runtime and pin supported versions;
- initialise Next.js/TypeScript with strict mode;
- create shared UI, domain and database packages only where immediately used;
- configure lint, formatting, type checks, unit tests and build;
- create preview, staging and production environments;
- provision separate staging/production database and storage projects;
- establish secret manager and rotation inventory;
- add ADRs for hosting, auth, MoR, storage and analytics;
- add synthetic case fixture for previews—never copy paid assets into PR deployments;
- define release and rollback process.

Acceptance criteria:

- a clean checkout builds and tests using documented commands;
- every PR creates an isolated preview using synthetic content;
- staging and production secrets/data are isolated;
- no production secret reaches browser bundles or logs;
- dependency and licence checks run in CI.

### Epic 2B — database and authorisation

Implement migrations in this order:

1. users/profile bridge to managed auth;
2. products and cases;
3. orders, items and webhook receipts;
4. entitlements;
5. case versions, pages and assets;
6. progress and solution unlock;
7. decision snapshots and self-scores;
8. issues and audit log;
9. partners, campaigns and attribution;
10. minimal first-party events.

Requirements:

- database migrations are source-controlled;
- every user-owned table has row-level policy plus server-side authorisation;
- public diagnostic data is separated from authenticated customer data;
- immutable commercial/audit records are never hard-deleted casually;
- application deletion/anonymisation rules match legal policy;
- use database constraints for valid states, not application convention alone.

Authorisation test matrix:

- anonymous user cannot access paid metadata or assets;
- customer A cannot access customer B notes/progress/download grants;
- entitled user can access only purchased cases and permitted versions;
- refunded/suspended entitlement is denied according to policy;
- staff role cannot be self-assigned;
- retired case versions remain available only under defined entitlement policy.

### Epic 2C — authentication and account lifecycle

Initial features:

- passwordless email magic link;
- secure HTTP-only same-site session cookie;
- account creation after purchase or before purchase if desired;
- rate-limited login and resend;
- email change requiring reauthentication;
- account export/deletion request;
- session revocation;
- admin MFA and separate staff role.

Do not add social login or passkeys until login telemetry shows a need.

Acceptance criteria:

- new purchaser reaches the dashboard from a confirmation email;
- magic links cannot be reused after expiry;
- enumeration-resistant responses are used;
- deleted/anonymised accounts follow documented retention exceptions;
- support can recover access without changing entitlement history.

### Epic 2D — commerce, webhooks and entitlements

Checkout flow:

1. server creates hosted checkout with server-selected SKU, price and attribution;
2. browser redirects to merchant of record;
3. signed webhook is stored by provider event ID;
4. signature, timestamp and replay are verified;
5. order, item and entitlement are written atomically;
6. confirmation creates/links the customer account;
7. refund/chargeback updates entitlement and audit log;
8. failed webhooks retry safely;
9. daily reconciliation compares provider transactions with local orders.

Required tests:

- successful purchase;
- duplicate webhook;
- webhook delivered before browser return;
- unknown SKU;
- partial/full refund;
- chargeback and later reversal;
- email already owned by another account;
- manual grant/revoke with reason;
- provider outage and replay.

Acceptance criteria:

- duplicate webhooks never create duplicate orders/entitlements;
- 95% of valid purchases create access within 60 seconds under normal provider delivery;
- refund state appears within five minutes of processed webhook;
- finance reconciliation has no unexplained transactions;
- browser-supplied price or entitlement data is never trusted.

### Epic 2E — catalogue, dashboard and readiness

Dashboard v1:

- purchased cases;
- case version and last update;
- progress and continue action;
- readiness/prerequisite checklist;
- download/debrief availability;
- support and issue route;
- account and invoice links.

Do not create recommendation engines, badges, streaks or social profiles.

### Epic 2F — case release ingestion

Private content CI must:

1. validate case manifest against a versioned schema;
2. validate declared assets and checksums;
3. execute numerical/cross-file regression checks;
4. strip document metadata/notes where appropriate;
5. export/freeze candidate and solution assets;
6. render case PDF pages to two image sizes;
7. generate accessible text/transcript assets;
8. upload to versioned private storage paths;
9. create a draft release record in staging;
10. require manual release approval;
11. publish an immutable production version and release note.

Never overwrite released assets in place. Corrections create a patch version. Material instruction/data changes create a minor or major version and define whether in-progress users remain on the old version.

### Epic 2G — browser viewer

Features:

- thumbnail navigation;
- previous/next and keyboard controls;
- fit page, fit width and zoom;
- resume last page;
- private page notes;
- timer with one permitted pause and accessible untimed mode;
- user/order watermark;
- responsive desktop/tablet layout;
- accessible page transcript or equivalent;
- clear download centre for permitted files;
- case-version and issue-report link.

Delivery:

- authenticate session;
- verify active entitlement and permitted case version;
- authorise page number/asset policy;
- stream page or issue a roughly 60-second scoped URL;
- keep buckets private;
- ensure watermarked responses are not shared through public caches;
- rate-limit abnormal scraping without harming normal navigation.

Acceptance criteria:

- no direct public storage URL is exposed;
- cross-user/cross-case object requests fail;
- current Chrome, Edge, Firefox and Safari pass the primary flow;
- iPad supports reading/navigation, not full model completion;
- keyboard-only user can operate the viewer;
- 80%+ of beta users complete key viewer tasks without assistance;
- screenshot limitations are disclosed rather than misrepresented.

### Epic 2H — progress, decision snapshot and solution unlock

State machine:

```text
not_started -> in_progress -> snapshot_submitted -> solution_unlocked -> debrief_complete
                    \-> abandoned/resumable
```

Requirements:

- progress state is server-authoritative;
- timer is advisory, with client/server timestamps and no punitive proctoring;
- mode is recorded as timed or practice;
- snapshot captures recommendation, valuation/returns ranges, thesis, risks and diligence question;
- solution unlock requires snapshot plus explicit completion/self-attestation;
- no automatic workbook upload or analysis;
- unlock cannot be reversed accidentally;
- user can revisit purchased solutions under access policy.

### Epic 2I — self-score and cohort benchmark

Initial release:

- versioned rubric and observable anchors;
- local/server form for the user's self-score;
- dimension summary and next-practice guidance;
- no objective interview-readiness claim;
- no percentile until sample threshold.

Benchmark release condition:

- at least 30 consenting, comparable completions on the exact case version/mode;
- minimum subgroup sizes to prevent reidentification;
- published cohort definition and sample size;
- robust handling of obvious test/internal records;
- version freeze or explicit recalibration policy;
- ability to withdraw a user's benchmark contribution.

### Epic 2J — email and lifecycle automation

Transactional emails:

- magic link;
- purchase confirmation/access;
- invoice/provider receipt link;
- case update/errata where material;
- account/security change;
- issue resolution;
- refund/access change.

Optional marketing/lifecycle emails:

- incomplete diagnostic;
- purchased but not started;
- started but not completed;
- debrief follow-up;
- second case when available.

Marketing consent and transactional necessity must remain separate. Limit reminders and provide preference controls.

### Epic 2K — analytics and experiment system

Typed events:

- `article_cta_clicked`;
- `diagnostic_started`;
- `diagnostic_completed`;
- `case_preview_viewed`;
- `checkout_started`;
- `purchase_completed`;
- `case_started`;
- `candidate_asset_downloaded`;
- `decision_snapshot_submitted`;
- `solution_unlocked`;
- `debrief_completed`;
- `self_score_completed`;
- `issue_submitted`;
- `refund_recorded`.

Every event definition specifies:

- business question;
- required/optional status;
- allowed properties;
- prohibited personal/content fields;
- retention period;
- owner;
- validation query.

Do not use session replay in the paid case. Do not record private notes, model content, formulas or free-text recommendations in analytics.

### Epic 2L — admin and support

Minimum admin actions:

- search customer by email/order ID;
- inspect orders and entitlements;
- grant/revoke with required reason;
- resend access email;
- view case version/progress state;
- manage issue status/severity;
- publish/retire case versions through controlled action;
- export affiliate reconciliation;
- process deletion/export request;
- review audit log.

Admin requirements:

- MFA;
- least-privilege roles;
- every mutation logged;
- no impersonation by default;
- sensitive exports time-limited and audited;
- support knowledge base and macros kept current.

### Epic 2M — legal, privacy and product terms

Before public paid launch:

- terms of sale/access;
- refund and defect policy;
- privacy notice and processor list;
- cookie/analytics controls;
- marketing consent records;
- disclaimer/non-affiliation language;
- originality and prohibited-use statement;
- watermark disclosure;
- supported-device/Excel requirements;
- consumer withdrawal/digital-content consent treatment confirmed professionally;
- data retention/deletion schedule;
- accessibility statement and support route.

### Phase 2 release test programme

#### Automated

- unit tests for domain state transitions and pricing/entitlement rules;
- integration tests for auth, database policies, webhooks and assets;
- end-to-end buyer journey in provider test mode;
- content-manifest/regression tests;
- dependency and secret scanning;
- accessibility scanning;
- visual regression for case pages and primary breakpoints.

#### Manual

- Chrome/Edge/Firefox/Safari desktop;
- Windows and Mac download/open workflows;
- iPad viewer;
- keyboard and screen-reader critical path;
- refund and entitlement-recovery exercise;
- corrupted/missing asset recovery;
- email delivery and unsubscribe;
- backup restoration into isolated environment;
- cross-account access attempts;
- privacy export/deletion drill.

### Phase 2 launch gate

- no open critical/high security or numerical defects;
- purchase, access, refund and recovery paths pass;
- content release is immutable/reproducible;
- legal/privacy documents reflect production behaviour;
- domain, TLS, email authentication and monitoring work;
- backup restoration has been demonstrated;
- first 10 production customers can be supported manually if automation fails;
- rollback and incident contacts are documented.

## 10. Phase 3 — stabilisation and low-intervention operations

Indicative period: first 8–12 weeks after application launch.

### Operational objectives

- contribution margin at least 80% before founder time;
- refunds no more than 6%;
- support no more than 20 minutes per order, trending below 15;
- starter-to-debrief completion at least 40%;
- service availability and asset delivery sufficient for advertised use;
- no unresolved case contradiction or financial defect;
- weekly founder operations under four hours at low volume.

### Runbooks required

1. failed purchase webhook;
2. customer cannot access case;
3. incorrect entitlement/refund;
4. broken or leaked asset link;
5. case numerical defect/erratum;
6. case version migration;
7. email-provider outage;
8. storage/database outage;
9. suspicious account sharing;
10. data-access/deletion request;
11. security/privacy incident;
12. backup restore and disaster recovery;
13. domain/certificate failure;
14. partner attribution dispute.

### Monitoring

- uptime and synthetic purchase-to-dashboard check in test mode;
- webhook queue/failure count;
- entitlement creation latency;
- asset 4xx/5xx rate;
- email bounce/delivery issues;
- refund/chargeback rate;
- support minutes per order;
- diagnostic and case funnel;
- dependency/security alerts;
- domain/TLS expiry;
- backup status and quarterly restoration evidence.

### Automation boundaries

Automate:

- fulfilment and entitlements;
- standard emails;
- reminders within consent/preferences;
- release validation/checksums;
- routine affiliate attribution;
- dashboard access and self-service account actions;
- basic issue acknowledgement.

Keep human approval for:

- case release;
- answer/rubric changes;
- provenance/originality sign-off;
- high-value refunds/abuse decisions;
- legal/privacy changes;
- security incidents;
- device-reset exceptions once the add-in exists.

## 11. Phase 4 — case series and partner distribution

Entry conditions:

- 75+ cumulative buyers;
- rolling three-month gross revenue at least CHF 2,000/month or contracted cohort;
- completion/refund/support gates met;
- second case can be produced in no more than 80% of first-case authoring time;
- observed demand for another distinct decision pattern.

### Case sequence

Do not reskin the same model in different sectors. Suggested sequence:

1. tech-enabled services with growth-quality and labour-capacity tension;
2. industrial carve-out with stranded costs, working capital and capex;
3. consumer/services case with price-volume, cohort and downside ambiguity;
4. advanced buy-and-build or private-credit extension only from observed demand.

Each case receives:

- design brief and learning-difference statement;
- separate provenance ledger;
- independent solve;
- regression suite;
- timed beta;
- versioned rubric;
- strong, weak and alternative answers;
- explicit prerequisite/difficulty relationship to earlier cases.

### Packaging implementation

- single-case entitlement;
- two-/three-case bundle SKU;
- no retroactive ambiguity about updates/access;
- upgrade pricing based on owned products;
- 12 months of corrections/updates to purchased version family;
- do not promise all future cases or lifetime platform maintenance.

### University/club cohort features

- organisation and cohort records;
- allocation of named or redemption-code seats;
- expiry and unused-seat rules;
- aggregate completion only where privacy terms permit;
- no access to individual decisions/scores without explicit lawful design;
- invoice/procurement workflow through MoR/manual arrangement;
- committee/admin handover guide;
- standard onboarding instead of bespoke workshops.

### Affiliate features

- partner approval and signed terms;
- first-click and last-click fields with one declared commission rule;
- coupon override behaviour;
- refund-window hold before payout;
- no self-referral or brand-keyword bidding;
- monthly/quarterly export and reconciliation;
- disclosure requirement;
- inactivity termination.

Do not build a partner portal until manual reporting consumes meaningful time.

### Garden/content engine

Operating cadence:

- one substantial article or video-derived article every 2–4 weeks;
- quarterly refresh of highest-converting content;
- every new case produces two or three public learning derivatives without leaking the case;
- link diagnostic and purchase performance back to article IDs;
- prune or merge pages that attract irrelevant traffic and never assist users.

Measure qualified traffic and assisted purchases, not total pageviews.

## 12. Phase 5 — premium Excel add-in

The add-in is part of the fully fledged destination only if it earns authorisation.

### Entry gate

- at least 30 paid case customers;
- prototype raises premium selection by at least 15 percentage points or at least 40% choose it at a controlled price;
- at least 70% of target users can install add-ins on their preparation machine;
- Windows and Mac technical spike passes P0 features;
- interview policies do not make the utility broadly unusable;
- projected 18-month incremental contribution covers development, support and opportunity cost.

### Phase 5A — compatibility spike

Build no commercial licence system yet. Prove:

- hardcode/formula/cross-sheet styling;
- number-format cycles;
- header/total/assumption/output styles;
- font/alignment/row/column cleanup;
- submission checklist;
- ribbon commands and visible task-pane fallback;
- selected custom shortcuts on current Windows/Mac Microsoft 365;
- direct precedent/dependent API behaviour;
- performance on representative interview workbooks;
- no destructive behaviour or unrecoverable formatting changes.

Test matrix:

- current Microsoft 365 Excel Windows;
- current Microsoft 365 Excel Mac;
- Excel web for core commands only;
- managed-device restrictions with volunteer users;
- shortcut conflicts and non-US keyboard layouts;
- large used range, dynamic arrays, tables, named ranges and external links.

Kill or narrow unsupported features rather than advertising inconsistent behaviour.

### Phase 5B — add-in application

Packages/features:

- Office.js manifest and runtime;
- ribbon command groups;
- task pane for settings, licence and checklist;
- deterministic formatting engine;
- workbook scan/report separated from mutation;
- preview/confirm for destructive cleanup;
- feature flags by client/API support;
- local preference storage without sensitive workbook data;
- explicit undo/recovery guidance;
- privacy-minimal error telemetry.

P0 commercial scope:

1. finance colour styles;
2. number formats;
3. headers/totals/assumption/output formatting;
4. selected-range cleanup;
5. formula/constant highlighting;
6. direct precedent/dependent navigation where supported;
7. submission-readiness checklist;
8. optional sources-and-uses/debt/returns layout insertion without formulas.

Exclude automatic model building, AI audit and unsupported overwrite detection.

### Phase 5C — licence and device management

Policy:

- one named user;
- maximum two active device registrations;
- self-service deactivation;
- two additional reset cycles per rolling 12 months before review;
- 14-day signed offline grace token;
- no irreversible device activation;
- installation ID rather than invasive hardware fingerprint;
- support override with reason and audit record.

Flow:

1. add-in opens unauthenticated shell;
2. user signs in through supported Office authentication/dialog flow;
3. server validates premium entitlement;
4. installation is registered if device allowance remains;
5. server issues short-lived access plus signed offline grace token;
6. add-in refreshes periodically and on high-value operations;
7. account page lists and deactivates devices;
8. suspicious sharing triggers rate limits/review, not automatic permanent punishment.

Never store merchant secrets or permanent signing keys in the add-in bundle. Assume client JavaScript can be inspected.

### Phase 5D — distribution and release

- closed beta with 15–25 paid users;
- decide AppSource versus documented sideload route based on validation/friction;
- create privacy/security documentation and support matrix;
- version manifest and hosted assets;
- staged rollout with feature flags;
- signed release notes and rollback version;
- monitor client/version crash/error rates;
- publish install/uninstall/device-change instructions;
- test update behaviour on Windows and Mac.

### Add-in production gate

- no data-loss or destructive-formatting defect;
- P0 commands pass supported-client matrix;
- 80%+ beta task success;
- installation success at least 70% of eligible beta users;
- support estimate below 20 minutes per active user per quarter after onboarding;
- observed bundle revenue supports 18-month payback;
- external security/privacy review completed.

## 13. Security and privacy implementation plan

### Threat model before coding protected assets

Document assets, actors and abuse cases:

- entitlement bypass and IDOR;
- signed URL leakage;
- account sharing and automated scraping;
- webhook forgery/replay;
- admin account takeover;
- cross-user notes/progress exposure;
- release pipeline compromise;
- malicious file upload if ever introduced;
- add-in token theft/reverse engineering;
- analytics collecting recommendation/model content;
- exposed secrets in previews/logs.

### Baseline controls

- managed secret store and rotation schedule;
- admin MFA and least privilege;
- server-side entitlement on every protected asset;
- private storage and short-lived scoped grants;
- webhook signatures, timestamp tolerance and idempotency;
- CSP and secure headers;
- CSRF protection for cookie-authenticated mutations;
- rate limits on auth, asset grants, diagnostic abuse and device activation;
- dependency lockfile and automated update review;
- static/secret scanning in CI;
- structured logs with redaction;
- encrypted transport and managed encryption at rest;
- separate production/staging data;
- backup and restore test;
- incident and breach response;
- deletion/export workflow.

### Data minimisation

Store:

- account identity and order references;
- entitlements;
- case progress;
- structured decision snapshot only with transparent purpose;
- self-score and benchmark consent;
- minimal attribution/events;
- support issues.

Do not store initially:

- candidate workbooks or presentations;
- workbook formulas;
- private notes in analytics;
- invasive device fingerprint;
- precise location history;
- session replay;
- interview/employer identities unless strictly needed.

Define retention per dataset with qualified advice. Product event data should not be retained indefinitely merely because storage is cheap.

## 14. Quality-control and release management

### Release states

```text
draft -> author_solved -> independently_solved -> red_teamed
      -> beta -> release_candidate -> released -> superseded/retired
```

No single user can move a case from draft directly to released.

### Case severity model

- **Critical:** wrong core returns/debt logic, impossible completion, answer leakage, rights/confidentiality breach. Immediately unpublish or block new starts.
- **High:** material cross-file contradiction or misleading instruction affecting recommendation. Publish alert and patch promptly.
- **Medium:** noncore ambiguity, formatting defect or weak explanation. Log and batch into patch.
- **Low:** typo or cosmetic issue with no decision impact. Include in routine release.

### Correction workflow

1. issue submitted with version/page/cell reference;
2. triage severity and affected users;
3. reproduce against immutable release;
4. content and technical owners approve correction;
5. rerun complete regression suite;
6. publish new version and changelog;
7. notify affected users where material;
8. preserve old version for audit and in-progress users under migration policy.

## 15. Deployment and release pipelines

### Public garden CI

On pull request:

- install from lockfile;
- type/format check;
- unit tests;
- Quartz build;
- internal link/canonical/frontmatter validation;
- dependency/secret scan;
- preview artifact.

On approved merge:

- production build;
- deploy;
- smoke test root, article, diagnostic CTA, privacy and sitemap;
- check TLS/redirects;
- record deployment revision.

### Application CI

On pull request:

- type/lint/format;
- unit/integration tests with ephemeral database or isolated schema;
- migration validation;
- RLS/authorisation suite;
- build and dependency/secret scan;
- accessibility/visual checks;
- synthetic-content preview.

On production release:

- apply reviewed forward migration;
- deploy application;
- run smoke/auth/asset tests;
- verify webhook endpoint health without synthetic production order;
- canary internal account;
- rollback if error thresholds breach.

### Content CI

On pull request:

- validate schemas/provenance fields;
- run numerical and cross-file tests;
- check candidate-asset leakage/metadata;
- generate preview pages and visual diffs;
- require independent reviewer approval.

On approved case release:

- generate immutable artifacts/checksums;
- upload staging;
- manual staging acceptance;
- promote by manifest hash;
- verify entitlement and unlock policies;
- publish release note.

## 16. Detailed dependency map

```text
Employment/IP clearance
    -> commercial interviews and paid content

Safe public baseline
    -> garden content and diagnostic traffic

Private content repo + provenance policy
    -> diagnostic and Case 01

Case 01 release candidate + landing page
    -> paid validation

Paid validation gate
    -> application repository and MVP build

Stable content manifest
    -> viewer and release ingestion

MoR webhook + auth + entitlements
    -> protected dashboard/viewer/downloads

Protected delivery + progress state
    -> solution unlock and self-score

30 comparable completions
    -> cohort benchmark

Phase 2 commercial/operational gate
    -> second/third cases and cohort licences

Observed add-in purchase lift + compatibility spike
    -> production add-in and device licensing
```

The public garden and first-case authoring can run in parallel after Phase 0. Authenticated application work must not begin merely because content production is slow.

## 17. Indicative schedule and effort

This is a dependency-based estimate, not a promised calendar.

| Phase                                              |           Elapsed time |  Founder/content effort |       Engineering effort | External input                      |
| -------------------------------------------------- | ---------------------: | ----------------------: | -----------------------: | ----------------------------------- |
| 0. Safety/legal/site recovery                      |              1–3 weeks |                 15–30 h |                  10–25 h | Legal/accounting review             |
| 1. Garden funnel + diagnostic + Case 01 validation |              6–8 weeks |         Capped at 120 h | 20–60 h within cap/scope | Independent reviewer, design help   |
| 2. Authenticated commercial product                |   8–14 weeks part-time | 40–80 h content/product |                250–450 h | Legal finalisation, security review |
| 3. Stabilisation                                   |   8–12 operating weeks |    2–6 h/week initially | 30–80 h fixes/automation | Beta users                          |
| 4. Three-case series + partner features            | 4–9 months incremental |       150–300 h content |                100–250 h | Independent reviewers               |
| 5. Add-in spike and product                        |  4–8 months after gate | 40–80 h product/testing |                350–700 h | Cross-platform testers/security     |

Fully fledged end state: approximately 12–24 months part-time if gates pass. Excluding the add-in, an efficient implementation may require roughly 500–900 engineering hours plus 300–500 content/product hours. The add-in can add another 350–700 engineering hours and a material support tail.

If outsourced, obtain fixed deliverables per phase rather than commissioning the entire end state. A technically complete outsourced platform before demand validation is specifically rejected.

## 18. Indicative cash budget

Ranges exclude founder compensation and depend heavily on whether engineering/design is founder-delivered.

| Stage                                    |          Founder-built cash range | Outsourced/service-heavy range |
| ---------------------------------------- | --------------------------------: | -----------------------------: |
| Phase 0                                  |                         CHF 1k–4k |                      CHF 3k–8k |
| Phase 1 validation                       |               **Hard cap CHF 3k** |    Do not outsource beyond cap |
| Phase 2 application                      |                        CHF 3k–12k |                    CHF 30k–80k |
| Phase 3 first-year infrastructure/review |                         CHF 2k–8k |                     CHF 5k–15k |
| Phase 4 cases/partners                   |               CHF 3k–12k per year |                    CHF 15k–40k |
| Phase 5 add-in                           | CHF 5k–20k cash plus founder time |                  CHF 40k–100k+ |

Professional legal, accounting and independent model-review costs should not be cut to preserve software budget. Content credibility and safe operation are more important than platform polish.

## 19. Phase dashboards and decision gates

### Validation dashboard

- qualified visitors by source;
- diagnostic start/completion;
- paid preview and checkout starts;
- orders/refunds;
- case start/debrief completion;
- realism/usefulness;
- unaided differentiating outcome;
- founder hours by workstream;
- partner replies versus actual traffic.

### Commercial product dashboard

- gross revenue, MoR fees and refunds;
- blended order value;
- contribution before founder time;
- qualified visitor-to-order conversion;
- purchase-to-access latency;
- start and completion by case/version;
- support minutes/order;
- defects by severity/version;
- partner-attributed contribution;
- repeat/bundle purchase;
- infrastructure and content-maintenance cost.

### Stop conditions throughout

- employment/IP boundaries cannot be made safe;
- no paid differentiation after one iteration;
- critical content quality cannot be maintained;
- distribution requires coaching-like founder involvement;
- support burden destroys the low-intervention model;
- second case does not become materially more efficient;
- add-in payback/compatibility gate fails;
- founder opportunity cost exceeds evidence-supported upside.

## 20. First 30 execution tasks in order

1. Obtain employment/IP/side-activity review.
2. Create and sign the prohibited-source/provenance policy.
3. Confirm domain registrar/DNS control and brand search scope.
4. Tag/archive the current repository state.
5. Disable Clarity until valid consent exists.
6. Fix the current TypeScript check failure.
7. Replace upstream CI guards with Sources & Uses checks.
8. Repair DNS/HTTPS or intentionally publish a holding page.
9. Inventory every current note and URL.
10. Define public information architecture and redirect map.
11. Rewrite the homepage around garden -> diagnostic -> simulation.
12. Remove empty navigation, debug remnants and upstream metadata.
13. Publish or stage the first four sourced pillar articles.
14. Create private `sourcesuses-content` repository and proprietary notice.
15. Define manifest, canonical-data and provenance schemas.
16. Write the Decision Diagnostic design brief.
17. Draft, solve, review and beta-test the diagnostic.
18. Add minimal consent-aware diagnostic events.
19. Build the diagnostic debrief and email sequence.
20. Conduct the first 10 customer interviews before final Case 01 scope.
21. Freeze Case 01 learning objectives, time budget and decision tensions.
22. Create canonical fictional data and independent expected outputs.
23. Build primary and candidate workbooks.
24. Draft the case pack, rubric and decision outputs.
25. Run independent solve, originality review and red-team.
26. Run timed beta and fix critical/high defects.
27. Produce 8–12 polished preview pages and viewer prototype.
28. Launch CHF 59/79 message/price test through hosted checkout.
29. Execute club, creator and recruiter outreach with tracked links.
30. Hold the Phase 1 investment-committee gate before creating `sourcesuses-app`.

## 21. What must not be done early

- do not add auth or payment code to Quartz;
- do not publish paid content in the public repository;
- do not build the production viewer for the preorder test;
- do not build user uploads or automated workbook scoring;
- do not create a general CMS;
- do not create microservices;
- do not build affiliate dashboards before affiliate sales exist;
- do not build an add-in licence service before the add-in gate;
- do not author five cases before one sells and is completed;
- do not optimise pageviews that do not produce qualified diagnostic starts;
- do not use employer credibility, materials or implied endorsements;
- do not call email signups commercial validation.

## 22. Final implementation recommendation

The correct transformation is not:

```text
Quartz notes -> large platform build -> hope for buyers
```

It is:

```text
Repair public trust
    -> convert the garden into qualified discovery
    -> prove one diagnostic and one paid simulation
    -> build protected delivery only after payment evidence
    -> make operations repeatable
    -> expand cases only after production efficiency
    -> build the add-in only after measured premium lift
```

The public garden is retained because it can become an acquisition asset. The private case system is built because content integrity is the product. The authenticated application is built only when manual validation proves it removes real operational friction. The Excel add-in is the last major commitment because it has the highest technical and support risk.

This sequence reaches the fully fledged offering while preserving the right to stop before hundreds of additional hours are committed to an unvalidated business.
