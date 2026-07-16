# Minimal Phase 1 event taxonomy

The static preview stores message assignment and click events locally in the browser. It does not transmit them. Server-side events may be enabled only after the endpoint, privacy notice, retention and consent/legal basis are approved.

| Event                 | Purpose                       | Minimum properties                                                  |
| --------------------- | ----------------------------- | ------------------------------------------------------------------- |
| `landing_view`        | Qualified-visitor denominator | path, message variant, source code, date bucket                     |
| `diagnostic_start`    | Test attraction               | diagnostic version, source code, message variant                    |
| `diagnostic_complete` | Test completion               | version, elapsed-time bucket, score band; no answer text by default |
| `case_preview_view`   | Paid-outcome interest         | preview version, source code, message variant                       |
| `offer_choice`        | Price/product choice          | CHF 59/79/neither, add-in/second-case variant                       |
| `checkout_start`      | Stronger intent               | offer, price, source code                                           |
| `order_completed`     | Willingness to pay            | order ID, offer, net/gross amount, source code                      |
| `case_started`        | Product use                   | case/version, days since purchase bucket                            |
| `solution_unlocked`   | Completion proxy              | case/version, elapsed-time bucket                                   |
| `refund_requested`    | Quality/economics             | reason code, days since order                                       |

Never collect workbook content, diagnostic free text, session replay, keystrokes, precise employer, medical information or unnecessary IP/device fingerprints.
