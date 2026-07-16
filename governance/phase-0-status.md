# Phase 0 status

Updated: 16 July 2026.

## Repository-controlled work

| Item                                           | Status                                   | Evidence                                                                            |
| ---------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| Baseline preserved                             | Complete locally                         | Annotated tag `phase0-baseline-2026-07-16` at `5384beb`                             |
| Optional analytics disabled                    | Complete                                 | Quartz analytics configuration is `null`; cookie/session-replay banner removed      |
| External font requests removed from base pages | Complete                                 | Local/system typography configuration and head cleanup                              |
| Current TypeScript failure                     | Complete                                 | Unused footer import and debug script removed                                       |
| Project-specific CI                            | Complete                                 | `npm run verify` on PR/push to `v4`, including rendered-output checks               |
| Upstream workflow/metadata cleanup             | Complete                                 | Quartz funding/community/release templates removed or replaced                      |
| Dependency audit                               | Complete                                 | Patched direct/transitive packages; `npm audit --omit=dev` required by verification |
| Primary navigation                             | Complete and extended in Phase 1         | Learn, Free Diagnostic, Cases and About routes                                      |
| Privacy notice                                 | Complete for current prelaunch behaviour | Browser-local diagnostic/experiment storage disclosed; no transmitted analytics     |
| Public/private repository boundary             | Complete                                 | README, content notice, contribution and governance rules                           |
| Governance templates                           | Complete                                 | Founder boundary, provenance, brand and professional-review records                 |

## Deliberately deferred by founder

| Item                           | Reason                                           | Re-entry condition                        |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------- |
| Domain repurchase              | Founder will repurchase after other Phase 0 work | Founder confirms registrar/domain control |
| DNS configuration              | Explicitly excluded from this implementation     | Domain repurchased                        |
| HTTPS/custom-domain validation | Explicitly excluded from this implementation     | DNS points to intended host               |

The temporary GitHub Pages project URL may use GitHub-managed HTTPS. That does not constitute custom-domain DNS or certificate implementation.

## External blockers — Phase 0 is not commercially closed

- Employment, side-activity, IP assignment and conflict review remains pending.
- Swiss structure, AHV, tax, VAT and consumer-law review remains pending.
- A working private contact email/controller identity is required before public commercial relaunch.
- Sources & Uses and fictional company names are not legally cleared.
- No commercial case has yet passed item-level provenance and independent review.

The repository is technically remediated when `npm run verify` passes. Commercial Phase 0 closes only when the launch-critical professional-review items are signed off. DNS/HTTPS remain a separately authorised future task.
