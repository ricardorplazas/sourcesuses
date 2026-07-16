# Deliverable 9 — MVP architecture

Framework, storage and authentication references supporting this design are linked in the [evidence register](13-evidence-register.md).

This architecture is a proposal after strategic analysis. It is not approval to implement.

## Architecture decision

Use a modular monolith in a new private repository. Recommended stack:

- Next.js/TypeScript application;
- managed PostgreSQL, authentication and initial private storage through Supabase;
- Lemon Squeezy or equivalent merchant of record for checkout/tax;
- Vercel or Cloudflare deployment, selected on operational familiarity;
- object/page rendering job in the same codebase or a managed background job;
- consent-aware product analytics with a small first-party event table;
- managed transactional email;
- Office.js add-in as a separate workspace/package only in Phase 3, sharing the same auth/entitlement API.

Do not use microservices, Kubernetes, a graph database, a custom payment stack or a separate CMS at MVP.

## Trust boundaries

```text
Public browser
  -> application/server routes
      -> auth/session provider
      -> Postgres (authoritative entitlements)
      -> private object storage (never public)
      -> merchant-of-record webhook
      -> email provider
      -> first-party event log

Excel add-in (later)
  -> same auth/licence API
      -> entitlements + device registrations
```

Every protected asset request must perform a server-side entitlement check. Hiding buttons in the UI is not authorisation.

## Module decisions

| Module                 | Validation             | MVP                      | Build/buy                             | Complexity  | Risk / maintenance                 |
| ---------------------- | ---------------------- | ------------------------ | ------------------------------------- | ----------- | ---------------------------------- |
| Public landing         | Required               | Required                 | Buy/minimal build                     | Low         | Low                                |
| Content authoring      | Files/templates        | Required                 | Git + structured case manifest        | Medium      | Version consistency is key         |
| Authentication         | No                     | Required                 | Buy managed auth                      | Medium      | Account recovery/privacy           |
| User dashboard         | No                     | Required, minimal        | Build                                 | Low         | Avoid feature creep                |
| Payment                | Hosted link            | Required                 | Merchant of record                    | Medium      | Webhook idempotency/refunds        |
| Entitlements           | Manual                 | Required                 | Build small domain module             | Medium      | Security-critical                  |
| Case library           | One landing/fulfilment | Required for 1–2 cases   | Build                                 | Low–medium  | Avoid catalogue abstraction        |
| Viewer                 | Clickable demo         | Required after gate      | Build on private page assets          | Medium      | Browser/accessibility/support      |
| Download centre        | Manual links           | Required                 | Build signed/proxied downloads        | Low–medium  | Leakage acceptable, auth mandatory |
| Excel add-in           | Prototype only         | Postpone                 | Office.js later                       | High        | Cross-platform/support/security    |
| Licence/device service | No                     | Postpone with add-in     | Build later                           | Medium–high | Abuse/support                      |
| Email automation       | Required simple        | Required                 | Buy                                   | Low         | Consent/unsubscribe                |
| Analytics              | Required funnel        | Required minimal         | Build events / privacy tool           | Low–medium  | Consent/data minimisation          |
| Affiliate tracking     | Coupon/UTM             | Minimal                  | MoR coupons + own attribution         | Low         | Disputes/last-click definitions    |
| Admin                  | Spreadsheet/manual     | Minimal internal screens | Build only necessary actions          | Low–medium  | Sensitive access                   |
| Support                | Shared inbox           | Required                 | Buy                                   | Low         | Founder time                       |
| Versioning/audit logs  | Spreadsheet/Git        | Required                 | Build append-only tables + Git assets | Medium      | Essential for corrections          |
| CMS                    | No                     | Postpone                 | Git/MDX first                         | N/A         | CMS adds roles/security            |

## Core data model

### Identity and commerce

- `users(id, email, display_name, created_at, deleted_at)`
- `customers(id, user_id, merchant_provider, provider_customer_id)`
- `orders(id, provider_order_id, user_id, currency, gross_amount, status, ordered_at, refunded_at)`
- `products(id, sku, name, active)`
- `order_items(id, order_id, product_id, case_version_scope)`
- `entitlements(id, user_id, product_id, starts_at, ends_at, status, source_order_id)`
- `webhook_events(provider, event_id, received_at, processed_at, payload_hash, status)`

### Content and progress

- `cases(id, slug, title, status, current_version_id)`
- `case_versions(id, case_id, semantic_version, manifest_hash, released_at, retired_at)`
- `assets(id, case_version_id, kind, storage_key, checksum, access_policy)`
- `case_pages(id, case_version_id, page_no, asset_id, title, transcript_asset_id)`
- `progress(user_id, case_version_id, state, started_at, completed_at, solution_unlocked_at)`
- `notes(id, user_id, case_version_id, page_no, encrypted_body, updated_at)`
- `downloads(id, user_id, asset_id, downloaded_at, ip_hash)`
- `issues(id, user_id, case_version_id, location, severity, description, status)`

### Distribution and audit

- `partners(id, name, type, status)`
- `campaigns(id, partner_id, code, discount, commission_rule)`
- `attributions(id, session_id, campaign_id, first_seen_at, order_id)`
- `events(id, user_id_nullable, session_id, event_name, case_version_id_nullable, occurred_at, props_json_minimal)`
- `audit_log(id, actor_id, action, object_type, object_id, occurred_at, metadata_hash)`

### Add-in later

- `licences(id, entitlement_id, max_devices, status)`
- `devices(id, licence_id, installation_id_hash, platform, nickname, activated_at, last_seen_at, deactivated_at)`
- `licence_resets(id, licence_id, actor_id, reason, created_at)`

Do not store raw workbook contents or formulas in telemetry.

## Payment and entitlement workflow

1. User buys through hosted MoR checkout with product SKU and attribution metadata.
2. Signed webhook is received and stored idempotently by provider event ID.
3. Server matches/creates account, order and item; creates entitlement in one transaction.
4. Confirmation email provides magic-link account access.
5. Refund/chargeback webhook suspends relevant entitlement according to policy and preserves audit record.
6. Admin can grant/revoke with a reason; every override is logged.

Never trust price/SKU values sent only from the browser.

## File handling and viewer

- Authoring sources stay in private Git/LFS or a restricted authoring store.
- Release pipeline strips notes/metadata, renders pages, creates checksums and generates a manifest.
- Storage bucket remains private.
- Downloadable files use short-lived signed/proxied responses after entitlement check.
- Viewer pages are served individually; avoid exposing source PDF.
- Watermark contains masked identity/order fragment and is never part of a public cache key.
- Every case version is immutable. Fixes create a new version and migration/release note.

## Authentication

Use passwordless email magic link initially, with optional passkeys/social login later. Require reauthentication for email change, device reset and account deletion. Use secure, HTTP-only, same-site cookies for web sessions. Apply rate limits to login, asset grants and activation endpoints.

## Analytics

Prefer explicit first-party events over session replay. Separate necessary product events from optional marketing analytics. Do not load optional analytics before consent. Use coarse IP hashing/short retention if fraud signals are needed. Maintain deletion/export capability.

## Deployment and environments

- `preview`: generated per pull request with synthetic case assets only;
- `staging`: restricted, production-like integrations in test mode;
- `production`: separate secrets/database/storage;
- infrastructure documented in code or a short runbook;
- database migrations reviewed and reversible where practical;
- daily managed backups and quarterly restore test once paid data exists;
- domain/DNS and certificate monitoring.

## Security baseline

- dependency lockfile, automated audit and update policy;
- secret manager; no secrets in Git or browser bundle;
- webhook signature verification and replay protection;
- row-level policies/authorisation tests for every protected entity;
- CSP, secure headers, CSRF protection where applicable;
- signed asset URLs treated as bearer tokens with short expiry;
- admin MFA and least privilege;
- file type/size validation and malware scan for any future uploads;
- structured logs without personal content;
- incident, breach and entitlement-recovery runbooks;
- external lightweight security review before add-in/device licensing.

## Testing

- unit: pricing/entitlement rules, progress state, watermark labels;
- integration: webhook purchase/refund/replay; protected asset access; expired entitlement;
- end-to-end: new buyer to case start/download/unlock;
- security: cross-user IDOR attempts, signed URL expiry, admin role isolation;
- content: canonical data regression suite from Deliverable 5;
- visual: page render snapshots across breakpoints;
- accessibility: automated plus keyboard/manual screen-reader pass;
- resilience: storage/email/webhook delay and retry behaviour;
- browser: current Edge/Chrome/Firefox/Safari and iPad viewer.

## Expected maintenance

At low volume, web MVP infrastructure can remain under roughly CHF 100–300/month depending on providers, email and video. Founder operations/support and content revision will cost more than compute. Add-in support is expected to be the largest recurring technical burden.
