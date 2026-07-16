# Evidence register

Snapshot date: 16 July 2026. This register distinguishes official/current facts from provider claims and third-party sentiment. Prices and product scope may change.

## Repository evidence

| Evidence                        | Result                                                                         | Classification                                     |
| ------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| Local checkout and `git status` | Branch `v4`, clean before diligence files, commit `5384beb`                    | Verified observation                               |
| `npm ci`                        | Installed 481 packages; npm reported 11 vulnerabilities                        | Verified observation                               |
| `npm run check`                 | Failed on unused `QuartzComponent` import in `Footer.tsx`                      | Verified observation                               |
| `npm test`                      | 48 passed, 0 failed                                                            | Verified observation                               |
| `npx quartz build`              | 45 Markdown inputs, 60 outputs, success                                        | Verified observation                               |
| `npm audit --omit=dev`          | 3 moderate, 8 high known vulnerabilities                                       | Verified observation; severity from npm advisories |
| Content/history inventory       | No founder case/model/slide/database files found in any branch/history         | Verified observation within Git repository         |
| GitHub repository API           | Public repo, default `v4`, no issues, Dependabot PRs                           | Verified observation                               |
| GitHub Pages API / HTTP test    | CNAME `sourcesuses.com`, cert `bad_authz`, live domain failed to return a page | Verified observation on assessment date            |

### Phase 0 remediation evidence — 16 July 2026

| Evidence               | Current result                                                                                               | Classification                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `npm ci`               | Reproducible install completed                                                                               | Verified observation                                        |
| `npm run verify`       | Type/format, 48 tests, public-content check, build, rendered-output check and production audit passed        | Verified observation                                        |
| `npm audit --omit=dev` | Zero findings after targeted patched versions and safe audit fix                                             | Verified observation                                        |
| Rendered-output guard  | No Clarity loader, external Google Font request, cookie banner, debug header or empty Articles/Models routes | Verified observation                                        |
| Governance records     | Founder boundary, provenance policy/register, professional checklist and brand log created                   | Verified file evidence; external conclusions remain pending |
| DNS/HTTPS              | Unchanged by explicit founder instruction                                                                    | Deferred, not remediated                                    |

## Competitor/product sources

### Peak Frameworks

- [PE course, contents and current $497 promotional price](https://www.peakframeworks.com/private-equity-recruiting-course) — official provider claim.
- [Media kit: audience and visitor claims](https://www.peakframeworks.com/media) — official provider claim.
- [Reviews and placement claims](https://www.peakframeworks.com/reviews) — provider-selected evidence.
- [July 2026 YouTube estimate](https://vidiq.com/youtube-stats/channel/%40peakframeworks/) — third-party estimate.

### Wall Street Oasis

- [Interview courses: $297 PE course, nine tests and 2,500+ questions](https://www.wallstreetoasis.com/courses/interview-prep) — official provider claim.
- [PE bootcamp content/current offer](https://www.wallstreetoasis.com/courses/live-training/private-equity-interview-bootcamp) — official provider claim.
- [Community scale claims](https://www.wallstreetoasis.com/about-wallstreetoasis) — official provider claim.
- [WSO media/social scale claims](https://www.wallstreetoasis.com/media) — official provider claim.
- [Crowdsourced real-test offer](https://www.wallstreetoasis.com/forum/private-equity/get-free-access-to-our-private-equity-interview-course-297-value) — official forum post; provenance warning.
- [Darden description of WSO training](https://www.darden.virginia.edu/private-equity/careers/professional-training) — university source.

### 10X EBITDA

- [PEERLESS launch, price and refund/access statements](https://courses.10xebitda.com/products/courses/private-equity-interview-peerless) — official provider claim.
- [Private Equity Comprehensive Package and $10,000+ budget](https://www.10xebitda.com/private-equity-comprehensive-package/) — official provider claim.

### Break Into PE

- [Europe positioning, products and placement claims](https://www.breakintope.com/) — official provider claim, unaudited.
- [European recruiting/case format](https://word.breakintope.com/recruiting-process/) — provider content.
- [LinkedIn footprint and content](https://uk.linkedin.com/company/breakintope) — platform snapshot.

### Modeling/training alternatives

- [Multiple Expansion free PE modeling course](https://multipleexpansion.com/2020/03/15/private-equity-modeling-guide/) — official provider content.
- [Wall Street Prep PE Masterclass, $399 and institutional claim](https://www.wallstreetprep.com/self-study-programs/private-equity-masterclass/) — official provider claim.
- [Wall Street Prep programs and prices](https://www.wallstreetprep.com/programs/) — official provider claim.
- [Training the Street PE Transition details/pricing](https://trainingthestreet.com/public-courses__trashed/private-equity/) — official provider claim.
- [Breaking Into Wall Street audience/institution claims](https://breakingintowallstreet.com/) — official provider claim.
- [BIWS annual bundle pricing](https://breakingintowallstreet.com/1-year-plans/) — official provider price.
- [CFA Institute PE certificate factsheet ($890/$712 member)](https://www.cfainstitute.org/sites/default/files/docs/programs/advanced-private-equity-certificate/pec-factsheet-v3-may-2025.pdf) — official provider source.

### Excel tools

- [Macabacus pricing: $200/$360 per year](https://macabacus.com/pricing) — official provider source.
- [Macabacus feature/help centre](https://help.macabacus.com/) — official provider source.
- [Macabacus review themes](https://www.g2.com/products/macabacus-macabacus/reviews?qs=pros-and-cons) — third-party aggregated user reviews.
- [Arixcel features, Windows compatibility and £2.75/user/month](https://www.arixcel.com/explorer/download) — official provider source.
- [QuickCel $3/$6 pricing and features](https://www.quickcel.software/) — official provider source.
- [Candidate report of add-in prohibition in a model test](https://www.reddit.com/r/financialmodelling/comments/1ca9ebd) — anecdotal user report, not generalisable.

## AI sources

- [ChatGPT consumer pricing](https://openai.com/chatgpt/pricing) — official; free and $20/month Plus displayed in retrieved source.
- [Claude plan pricing](https://support.anthropic.com/en/articles/11049762-choosing-a-claude-ai-plan) — official; free and $20/month Pro.
- [Microsoft Copilot individual pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/individuals) — official; Microsoft 365 Personal includes Copilot.

The claim that these tools can draft questions, formulas, memos and critiques is an inference from their general document/analysis capabilities, not a claim that their outputs are audited or reliable for PE preparation.

## Microsoft Office add-in sources

- [Excel add-ins overview and cross-platform support](https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-overview) — Microsoft official.
- [Office Add-ins architecture and hosted web-app model](https://learn.microsoft.com/en-us/office/dev/add-ins/overview/office-add-ins) — Microsoft official.
- [Shared runtime capabilities](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/configure-your-add-in-to-use-a-shared-runtime) — Microsoft official.
- [Keyboard shortcut sample and supported versions](https://learn.microsoft.com/en-us/samples/officedev/office-add-in-samples/office-add-in-keyboard-shortcuts/) — Microsoft official.
- [Range precedent/dependent APIs](https://learn.microsoft.com/en-us/javascript/api/excel/excel.range?view=excel-js-preview) — Microsoft official; production requirement-set validation remains necessary.
- [Excel JavaScript API requirement sets](https://learn.microsoft.com/en-us/javascript/api/requirement-sets/excel/excel-api-requirement-sets) — Microsoft official.
- [Office add-in testing across clients](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/test-debug-office-add-ins) — Microsoft official.
- [Publishing to Microsoft Marketplace/AppSource](https://learn.microsoft.com/en-us/office/dev/add-ins/publish/publish-office-add-ins-to-appsource) — Microsoft official.
- [Sideloading on Mac](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac) — Microsoft official.
- [Authentication with Office dialog API](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/auth-with-office-dialog-api) — Microsoft official.
- [Nested app authentication sample](https://learn.microsoft.com/en-us/samples/officedev/office-add-in-samples/office-add-in-sso-naa/) — Microsoft official.
- [Persistence limitations](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/persisting-add-in-state-and-settings) — Microsoft official.

## Viewer/storage sources

- [Mozilla PDF.js getting started](https://mozilla.github.io/pdf.js/getting_started/) — primary project documentation.
- [Cloudflare R2 presigned URLs and bearer-token warning](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) — official provider documentation.
- [Supabase private/signed storage delivery](https://supabase.com/docs/guides/storage/serving/downloads) — official provider documentation.
- [Next.js authentication/authorisation guidance](https://nextjs.org/docs/app/guides/authentication) — primary framework documentation.

## Payments and tax sources

- [Lemon Squeezy pricing and MoR statement](https://www.lemonsqueezy.com/pricing) — official provider source.
- [Gumroad pricing](https://gumroad.com/pricing) — official provider source.
- [Stripe Switzerland pricing](https://stripe.com/en-ch/pricing) — official provider source; payment processor, not general MoR conclusion.
- [Swiss VAT liability](https://www.estv.admin.ch/en/vat-tax-liability) — Swiss federal official.
- [EU VAT OSS](https://europa.eu/youreurope/business/taxation/vat/one-stop-shop/index_en.htm) — EU official.
- [EU place of taxation](https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/place-taxation_en) — European Commission official.

## Legal/privacy sources

- [Swiss self-employment guidance](https://www.kmu.admin.ch/en/self-employment-guidelines) — Swiss federal SME portal.
- [Swiss sole proprietorship guidance](https://www.kmu.admin.ch/en/sole-proprietorship-for-freelancers) — Swiss federal SME portal.
- [Swiss AHV/IV official contribution leaflets](https://www.ahv-iv.ch/en/Leaflets/Contributions-OASI-DI-IC) — official information centre.
- [Swiss FDPIC duty to provide information](https://www.edoeb.admin.ch/en/duty-to-provide-information) — federal regulator.
- [Swiss FDPIC data-protection FAQ/GDPR scope](https://www.edoeb.admin.ch/en/faq-data-protection) — federal regulator.
- [EU cookie consent guidance](https://europa.eu/youreurope/business/dealing-with-customers/data-protection/online-privacy/index_en.htm) — EU official.
- [EU consumer protection overview](https://www.consilium.europa.eu/en/policies/consumer-protection-shopping-rights/) — EU Council official.

## Market boundary sources

- [Invest Europe Private Equity at Work 2026](https://www.investeurope.eu/publications/private-equity-at-work-2026-report/about-this-report-24517.html) — industry association methodology.
- [Invest Europe 2024 activity](https://www.investeurope.eu/news/newsroom/european-private-equity-and-venture-capital-investments-and-exits-rise-double-digits-in-2024-as-activity-recovers/) — industry association.
- [ODM London Analyst & Associate report](https://odmpartners.com/analyst-associate-report/) — recruiter dataset description.
- [London Business School intake](https://www.london.edu/news/a-fresh-intake-of-students-join-lbs-in-london-and-dubai) — university official.
