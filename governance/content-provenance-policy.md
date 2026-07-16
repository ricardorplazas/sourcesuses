# Content provenance and originality policy

Status: effective for public content immediately; mandatory for all future commercial content.

## Allowed source classes

- independently invented fictional data with documented plausibility rationale;
- public government/regulator/industry-association information;
- public company reports and filings used within their legal/licence boundaries;
- appropriately licensed datasets, images, fonts, and icons;
- original explanations and models created from general finance principles;
- AI-assisted drafts only when the final asset is human reviewed, independently checked, and recorded as assisted.

## Prohibited source classes

- employer or former-employer materials and remembered reproductions;
- real dataroom information or nonpublic deal information;
- real candidate submissions or interview tests;
- copied course cases, models, answer keys, screenshots, or presentation designs;
- recruiter or university material without explicit rights;
- third-party logos or marks implying endorsement;
- personal data not strictly required and lawfully obtained.

## Required provenance record

Every commercial asset must record:

- stable asset ID and case/version;
- author and review date;
- source class and source URL/reference;
- copyright/licence/permission status;
- factual transformation or fictionalisation method;
- AI assistance and human verification, if any;
- employer/confidentiality screening result;
- independent reviewer and release status.

Use `content-provenance-register.csv` as the minimum schema.

## Review workflow

```text
draft -> source recorded -> author verified -> independent originality review
      -> numerical/content QA -> release approval -> immutable version
```

The original author cannot be the only reviewer of a commercial case. Financial cases require a manually solved primary model, an independent solve of key outputs, and automated regression checks.

## Corrections and challenges

- Record suspected rights, originality, confidentiality, or numerical issues immediately.
- Block release while a high-risk provenance question remains unresolved.
- Preserve the challenged version and review evidence privately.
- Remove or replace material when rights cannot be established.
- Notify affected customers when a released error materially changes the exercise or answer.

## Public garden rule

Existing notes are unverified study material until reviewed. They may inform a topic inventory but must not be presented as commercial-grade answer authority without sourcing and editorial review.
