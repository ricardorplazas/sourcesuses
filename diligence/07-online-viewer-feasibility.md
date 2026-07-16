# Deliverable 7 — Online slide-viewer feasibility study

Primary documentation for PDF.js, private/signed storage and application authorisation is linked in the [evidence register](13-evidence-register.md).

## Recommendation

A browser viewer is feasible and moderately useful. Treat it as a case-experience and entitlement feature, not anti-piracy technology. Build it only in Phase 2 after paid validation. For the first preorder test, screenshots or a clickable prototype are sufficient.

## User experience goal

The viewer should feel like a simple deal room:

- desktop-first two-column workspace;
- page thumbnails and next/previous controls;
- fit width / fit page / zoom;
- case timer and progress;
- private notes saved to the user account;
- visible user/order watermark;
- resume across sessions;
- tablet reading support;
- no artificial right-click tricks or invasive monitoring.

Mobile should support preview/debrief reading, not the timed case/model workflow.

## Recommended content pipeline

```text
author source (PowerPoint/Keynote)
  -> export PDF
  -> CI validation (page count, dimensions, no notes/metadata)
  -> render each page server-side to WebP/PNG at 2 resolutions
  -> visual/checksum manifest and version ID
  -> private object storage
  -> authenticated page endpoint
  -> short cache + visible per-user watermark layer
```

Rendering to page images makes casual “download PDF” actions less convenient and produces a predictable viewer. It does not stop a user from saving image responses or screenshots. Keep the source PDF and slide deck out of the client path.

PDF.js is a valid alternative and Mozilla provides a full viewer/display layer. It is faster to integrate and gives better text/search/zoom, but the browser necessarily receives the PDF bytes. Use PDF.js if learning UX matters more than casual download friction. For the case CIM, server-rendered pages are the preferred compromise; for answer-key long-form documents, accessible HTML is better than images.

## Access-control flow

1. Browser requests the case manifest.
2. Server authenticates the session and performs a database entitlement check.
3. Server returns only permitted page metadata and short-lived page tokens.
4. Page endpoint rechecks case/version/page entitlement and streams the image; storage is private.
5. The frontend overlays customer email/order fragment and timestamp; high-value pages may also receive a server-baked watermark cached per user/version.
6. Solution routes remain unavailable until a completion/unlock event.
7. Every grant/unlock is recorded in an audit log.

Do not expose a public bucket. Signed URLs are bearer tokens and reusable until expiry. If used, keep expiry to roughly 60 seconds and scope each URL to one object. A server/edge proxy with an R2/Supabase private storage binding gives better revocation and hides raw bucket URLs, at the cost of bandwidth/compute.

## Watermarking and screenshot limitations

Use visible, low-opacity diagonal text containing partially masked email and order ID. Rotate its position per page/session so simple cropping is inconvenient. Do not put full personal data in analytics or public caches. Explain the watermark at purchase.

Do not:

- block Print Screen or inspect installed software;
- require webcam/screen recording;
- disable all text selection/accessibility;
- use browser extensions;
- claim screenshots are prevented;
- punish legitimate multi-device use.

Any browser user can capture pixels. The objective is attribution and friction.

## Download/view policy

| Asset                              | Policy                                 | Reason                                    |
| ---------------------------------- | -------------------------------------- | ----------------------------------------- |
| Teaser/free diagnostic             | Browser + printable                    | Distribution asset                        |
| Candidate instructions             | Browser + printable/downloadable       | Legitimate offline planning/accessibility |
| CIM/case slides                    | Browser-only by default                | Dataroom feel and tier control            |
| Raw financial input `.xlsx`/`.csv` | Downloadable                           | Needed for actual modeling                |
| Blank model/template               | Downloadable                           | Core work product                         |
| Memo/deck templates                | Downloadable                           | Candidate must create outputs             |
| Detailed answer key                | Browser HTML after completion          | Enables updates and guided explanation    |
| Completed solution model           | Downloadable after completion          | Formula inspection is part of learning    |
| Debrief video                      | Authenticated streaming                | Reasonable convenience/control balance    |
| Rubric                             | Browser; downloadable after completion | Useful in future practice                 |

View-only answer keys should have a print-friendly accessible option after completion if user testing shows frustration. Piracy friction should not degrade the learning outcome.

## Sequential unlocks

- Unlock the solution after the user clicks “finish” and confirms they understand it will reveal answers; do not require file upload in MVP.
- Offer an optional timer; do not hard-lock users who need accessibility breaks.
- Do not force cases to unlock sequentially for paying owners until data shows sequencing improves completion.
- For future cohorts, a recommended sequence can be displayed without entitlement coercion.

## Analytics

Collect only decision-useful events:

- case started/finished;
- page first-viewed and aggregate dwell bucket;
- timer started/paused/finished;
- workbook/template downloaded;
- solution unlocked;
- debrief completed;
- issue report created;
- browser/device class and error code.

Do not record note content, screenshots, workbook contents or fine-grained mouse/session replay. The current Clarity-style session replay is unnecessary for a sensitive paid case environment.

## Accessibility and compatibility

- Provide semantic page titles and alt/text transcript for image slides.
- All controls keyboard reachable with visible focus.
- Support 200% zoom, high contrast and reduced motion.
- Test current Edge, Chrome, Firefox and Safari on desktop; current Safari/Chrome on iPad.
- Preserve reading order and provide accessible HTML for charts/tables where feasible.
- Allow user-controlled timer accommodations without collecting medical details.

## UX risks and mitigations

| Risk                                     | Mitigation                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| User wants second monitor/offline PDF    | Responsive viewer, persistent session, print instructions, test before sale |
| Image text is inaccessible/blurry        | 2x assets, HTML transcript, responsive high-resolution load                 |
| Signed URL copied                        | Short expiry, per-request auth, visible watermark                           |
| Solution unlock accidentally clicked     | Confirmation and irreversible-state warning                                 |
| Browser refresh loses progress           | Server-side progress/notes, local recovery cache                            |
| Storage/CDN outage during interview prep | Status page, graceful retry, downloadable essential input files             |
| Watermark exposes email in public space  | Mask email and permit display-name option                                   |

## Effort

**Estimate:**

- clickable demo: 8–16 hours;
- reliable MVP viewer with auth, private pages, watermark, timer, notes, analytics and admin upload: 80–140 hours;
- accessible content pipeline, cross-browser hardening and support tooling: additional 40–80 hours;
- ongoing: 2–6 hours/month plus content-rendering QA.

For a single validation case, manually exported page images in a protected lightweight portal are acceptable. Do not build a general document platform.

## Decision gate

Viewer build is justified when:

- at least 10 paid preorders exist;
- prototype testers prefer the dataroom experience to a PDF without lowering purchase intent by more than 5 percentage points;
- at least 80% can complete core navigation without support;
- browser-only CIM does not generate more than 10% strong negative feedback;
- the source/content pipeline is stable and versioned.
