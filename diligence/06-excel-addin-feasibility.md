# Deliverable 6 — Excel add-in feasibility study

Microsoft compatibility, API, authentication, sideloading and AppSource references are linked in the [evidence register](13-evidence-register.md). Statements about feasible features remain subject to the recommended client/version spike.

## Recommendation

Office.js makes a useful cross-platform finance-formatting add-in technically feasible. It does not make it a sensible MVP. Postpone production development until paid case demand is validated and an add-in prototype changes observed purchase choices.

If built, the right commercial model is **one named user, up to two registered devices, self-service deactivation and limited resets**. One irreversible activation is poor product design and will create support tickets when users replace laptops, reinstall Office or move between Mac and Windows.

## Platform approach

Use an Office Add-in built with TypeScript, Office.js, an add-in-only or unified manifest selected after a compatibility spike, a shared runtime, ribbon commands and a small task pane. Office Add-ins are web applications: the manifest/app package integrates with Excel, while HTML/JavaScript is hosted over HTTPS.

Microsoft documents Excel Office Add-in support across Windows, Mac, web and iPad. Real support is API-requirement-set specific, not a blanket promise. The product should initially support current Microsoft 365 Excel on Windows and Mac; web is best-effort for core formatting; iPad is out of scope.

Do not build a Windows-only COM/VSTO add-in. It would offer deeper native hooks but contradict cross-platform positioning and materially increase installation/security friction.

## Feature prioritisation

| Priority         | Feature                                                                                              | Feasibility                  | Notes                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| P0               | Input/formula/cross-sheet colour commands                                                            | High                         | Deterministic formatting; cross-sheet classification requires formula inspection         |
| P0               | Number-format cycles: currency, %, multiples, dates, integers, decimals, parentheses, dash zero, k/m | High                         | Core Office.js range formatting                                                          |
| P0               | Headers, subheaders, totals, assumptions, outputs, separators                                        | High                         | Use configurable named style presets                                                     |
| P0               | Standard font/alignment/row/column/decimal cleanup                                                   | High                         | Must provide preview/undo guidance and limit destructive scope                           |
| P0               | Submission checklist                                                                                 | High                         | Mostly deterministic workbook inspection; strong interview relevance                     |
| P1               | Highlight formulas/constants/external links                                                          | High                         | Formula/value inspection; performance-test large used ranges                             |
| P1               | Direct precedents/dependents and return stack                                                        | Medium–high                  | Office.js has direct precedent/dependent APIs; guard missing API sets/errors             |
| P1               | Standard sources & uses / debt / returns / sensitivity layouts                                       | Medium                       | Insert formatting skeletons, never opaque model logic                                    |
| P1               | Model cover page and print settings                                                                  | Medium–high                  | Reliable if narrowly specified                                                           |
| P2               | Inconsistent-formula detection                                                                       | Medium                       | Needs row/column pattern heuristics and careful false-positive UX                        |
| P2               | Clear unused formatting                                                                              | Medium–low                   | Risky and potentially slow/destructive; limit to explicit used-range boundary            |
| Reject initially | “Formula overwritten with value” detection                                                           | Low without baseline/history | A value cannot reveal whether it replaced a formula; require snapshot/version comparison |
| Reject           | Full formula audit / error explanation                                                               | High scope                   | Competes directly with mature tools and creates correctness liability                    |
| Reject           | Automatic LBO model builder                                                                          | Misaligned                   | Removes learning and expands support/liability                                           |

## Colour coding nuance

A command that colors selected cells is easy. Automatically classifying every cell is not trivial:

- hardcode vs formula is straightforward;
- same-sheet vs cross-sheet formulas require parsing references;
- external links can be recognised from formula patterns but need edge-case testing;
- named ranges, structured references, dynamic arrays and formulas returning text complicate classification;
- formulas containing numeric constants are not necessarily errors.

Make automatic classification an explicit scan with a report/preview. Keep one-click manual styles as the reliable core.

## Keyboard shortcuts

Microsoft supports custom Excel add-in keyboard shortcuts on modern Microsoft 365 Windows, Mac and web through a shared runtime. This is viable but not equivalent to unrestricted native shortcuts:

- users can encounter conflicts and must choose mappings;
- manifest/shortcut JSON limits apply;
- host/version support must be runtime-checked;
- Mac key conventions and reserved OS shortcuts differ;
- work-managed Office can disable add-ins or Marketplace access;
- every advertised shortcut needs a visible ribbon/task-pane fallback.

Custom KeyTips are a newer alternative for ribbon navigation, but Mac users may have them disabled. Treat shortcuts as an enhancement, not the product’s only interface.

## Authentication and licensing

### Definitions

- **Purchase:** commercial transaction creating an entitlement.
- **User/account:** named human who owns the entitlement.
- **Device registration:** a revocable installation record, not ownership.
- **Activation:** creation/refresh of a device registration.
- **Concurrent use:** active licence checks from more than the allowed device count.

### Recommended policy

- one named account;
- maximum two active device registrations;
- self-service deactivate;
- up to two additional reset cycles per rolling 12 months before manual review;
- 14-day signed offline grace token after successful validation;
- licence checks at sign-in, every 24 hours when online and on high-value update/download actions;
- no device fingerprint stronger than a random installation ID plus coarse platform metadata;
- support override with audit log;
- clear policy that work and personal devices are allowed for the same user.

This discourages casual sharing without punishing legitimate replacement. “One purchase, one irreversible device” should be rejected.

### Technical flow

1. User signs in through the task pane using a hosted browser/dialog flow.
2. Backend validates account entitlement and current active-device count.
3. Add-in creates a random installation ID in local storage and registers it server-side.
4. Backend returns a short-lived access token and a signed offline grace claim.
5. Feature commands verify entitlement locally and refresh opportunistically.
6. Device page enables revoke/rename; suspicious rapid/geographically implausible activations are flagged, not auto-banned.

Microsoft’s nested app authentication is designed for Microsoft identities, but the commerce account may use email magic link/passkey. A compatibility spike should compare NAA/Entra SSO with a normal OAuth/OIDC provider through the Office dialog API. Do not force a work Microsoft account if candidates buy personally.

## Sharing, cracking and reverse engineering

Office.js client code is delivered to the user and can be inspected. Obfuscation is friction, not protection. Risks:

- shared login or copied offline token;
- patched client-side entitlement checks;
- intercepted APIs or replayed device requests;
- repackaged manifest pointing to copied code;
- screenshots/reimplementation of simple commands.

Controls:

- enforce entitlements server-side for updates/config sync and premium assets;
- sign short-lived claims; rotate keys and revoke sessions;
- rate-limit activation and monitor anomalies;
- keep no secrets in client code;
- sign release artifacts and publish hashes;
- accept that deterministic formatting logic can be recreated.

The real moat must be bundle, trust, updates and case integration—not secret JavaScript.

## Offline behaviour

Office Add-ins normally load hosted web content. Full offline reliability is therefore not a safe initial promise. A service worker/cache and local grace token may keep recently loaded deterministic commands usable, but host/webview cache behaviour varies. Document “internet required for first activation and periodic validation”; test airplane mode on every supported client. If offline operation becomes a hard requirement, the architecture decision may need revisiting.

## Updates and distribution

- Host versioned static assets; manifest points to stable URLs.
- Small UI/logic updates deploy server-side; manifest permission/command changes require package update/revalidation.
- Beta: sideload for a very small technical cohort only. Sideloading is development-oriented and is too much friction for the paid mass product.
- Production: Microsoft Marketplace/AppSource is the preferable individual-distribution path, subject to validation policies and cross-platform behaviour.
- Universities/firms: central deployment through Microsoft 365 admin can be supported later.

AppSource adds privacy/security documentation, support URLs, test accounts, validation time and platform testing. It is not a launch-week checkbox.

## Security and privacy

- request only minimum workbook permissions;
- do not upload workbook contents by default;
- process formatting/formula metadata locally;
- telemetry should contain command type, client version, duration and error code—not cell values/formulas/workbook names;
- make diagnostic upload explicit and redactable;
- use CSP, HTTPS, secure cookies/token storage, dependency scanning and backend rate limits;
- explain that an add-in can read/modify selected workbook content within granted permissions;
- maintain data retention/deletion workflows.

## Test matrix

Minimum production matrix:

- Windows 11 + current Microsoft 365 Excel, WebView2;
- macOS current and previous major + current Microsoft 365 Excel/WKWebView;
- Excel web in Edge, Chrome and Safari;
- personal Microsoft account and managed work/school account;
- English plus decimal/comma locale;
- `.xlsx`, `.xlsm`, protected sheets, tables, named ranges, dynamic arrays and external links;
- 5k, 50k and 250k used-cell workbooks;
- shortcut conflicts, offline/expired token, device reset and revoked licence;
- undo expectations and partial-failure recovery;
- accessibility: keyboard-only, screen reader labels, zoom/high contrast.

## Effort and support burden

**Estimate, one experienced engineer:**

- technical spike and clickable prototype: 30–60 hours;
- reliable P0 beta, auth/licensing and deployment path: 180–300 hours;
- AppSource hardening, full compatibility/QA and support tooling: another 120–220 hours;
- ongoing: 4–12 hours/month at low volume, with spikes after Office updates.

This excludes content skeleton design and professional security/legal review. The estimate is too large relative to unvalidated case demand.

## Decision gate

Build only if all are true:

- at least 30 paid case customers completed the core product;
- at least 40% choose a premium offer containing the add-in in a price-controlled test, or the add-in increases premium selection by 15 percentage points;
- at least 70% of interested buyers can install add-ins on the machine they use for practice;
- Windows and Mac P0 technical spike passes with no critical workflow gap;
- projected incremental contribution recovers build/support cost within 18 months under conservative sales;
- founder accepts ongoing software support as part of the business.
