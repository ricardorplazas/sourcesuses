# Sources & Uses validation site

This repository contains the public Sources & Uses demand-validation site: a learning garden, decision diagnostic and clearly labelled product prototypes.

Sources & Uses is intended to publish independent educational material about private-equity analysis, financial modelling, and investment decisions. It is not affiliated with or endorsed by any employer, investment firm, recruiter, university, or training provider.

## Repository boundary

This public repository may contain:

- public articles and glossary notes;
- intentionally free educational assets;
- public product and diagnostic landing pages;
- the Quartz site implementation.

It must not contain:

- commercial cases or answer keys;
- customer or candidate information;
- employer materials or confidential information;
- real dataroom information or copied interview tests;
- credentials, payment logic, licence secrets, or private application code.

Paid case authoring and the eventual customer application belong in separate private repositories. The private Case 01 authoring system is local at `../sourcesuses-private` and must not be pushed into this public repository.

## Local development

Requirements:

- Node.js version in [.node-version](.node-version);
- npm 10.9.2 or later.

Commands:

```sh
npm ci
npm run verify
npm run inventory:content
npx quartz build --serve
```

`npm run verify` performs formatting/type checks, tests, public-content and Phase 1 checks, the production build, and a production dependency audit.

## Project structure

- `content/` — published garden content;
- `quartz/` — Quartz framework and local components;
- `governance/` — Phase 0 operating boundaries and review records;
- `diligence/` — product, commercial, and technical diligence;
- `validation/` — Phase 1 experiments, interview/outreach records and decision gates;
- `scripts/` — project-specific validation scripts;
- `docs/` — upstream Quartz technical documentation retained for framework maintenance.

## Tracking and privacy

Optional analytics and session replay are disabled. They must not be enabled until the service, purpose, data flow, consent mechanism, retention, and privacy notice have been approved and implemented together.

## Licensing and attribution

The Quartz software is used under its MIT licence; see [LICENSE.txt](LICENSE.txt). Content and project-specific brand assets are governed by [CONTENT_NOTICE.md](CONTENT_NOTICE.md).

## Current status

See [validation/phase-1-status.md](validation/phase-1-status.md). The free preview is configured for `https://ricardorplazas.github.io/sourcesuses/`. Custom-domain DNS and HTTPS work remain deferred.
