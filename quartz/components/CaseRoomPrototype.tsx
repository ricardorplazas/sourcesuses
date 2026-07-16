import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/prototypes.scss"
// @ts-ignore
import script from "./scripts/prototypes.inline"

const pages = [
  ["01", "Transaction", "A founder-owned compliance-services group is exploring a sponsor sale."],
  [
    "02",
    "Revenue quality",
    "Contracted inspection revenue is durable; recurrence definitions differ.",
  ],
  [
    "03",
    "Customers",
    "The top ten customers contribute 42% of revenue; one contract is retendering.",
  ],
  ["04", "Operations", "Growth depends on recruiting and increasing technician utilisation."],
  ["05", "Financials", "Management expects margin expansion beyond the historical range."],
  [
    "06",
    "Debt & returns",
    "Entry leverage is supportable only if cash conversion remains resilient.",
  ],
]

const CaseRoomPrototype: QuartzComponent = () => (
  <section
    id="case-room-prototype"
    class="prototype-shell"
    aria-label="Clickable case-room prototype"
  >
    <div class="prototype-notice">
      <strong>Validation prototype</strong> — no account, files or paid access are included.
    </div>
    <div class="case-toolbar">
      <div>
        <strong>Aurelis Compliance Services</strong>
        <span>IC Simulation 01</span>
      </div>
      <output id="prototype-timer">02:00:00</output>
      <button id="prototype-timer-toggle" type="button">
        Start timer
      </button>
    </div>
    <div class="case-workspace">
      <nav class="case-thumbnails" aria-label="Case pages">
        {pages.map(([number, title], index) => (
          <button
            type="button"
            data-page-index={index}
            aria-current={index === 0 ? "page" : undefined}
          >
            <span>{number}</span>
            {title}
          </button>
        ))}
      </nav>
      <article class="case-page" aria-live="polite">
        <p class="eyebrow" id="prototype-page-number">
          Page 01
        </p>
        <h2 id="prototype-page-title">Transaction</h2>
        <p id="prototype-page-copy">{pages[0][2]}</p>
        <div class="prototype-chart" aria-label="Illustrative revenue and EBITDA chart">
          <div style="--height: 48%">
            <span>2023</span>
          </div>
          <div style="--height: 61%">
            <span>2024</span>
          </div>
          <div style="--height: 72%">
            <span>2025</span>
          </div>
          <div style="--height: 86%">
            <span>Plan</span>
          </div>
        </div>
        <p class="watermark">PREVIEW · FICTIONAL DATA</p>
      </article>
    </div>
    <div class="prototype-downloads" aria-label="Example candidate downloads">
      <button type="button" disabled>
        Inputs.xlsx
      </button>
      <button type="button" disabled>
        Blank model.xlsx
      </button>
      <button type="button" disabled>
        IC template.pptx
      </button>
      <span>Shown for workflow testing only</span>
    </div>
  </section>
)

CaseRoomPrototype.css = style
CaseRoomPrototype.afterDOMLoaded = script

export default (() => CaseRoomPrototype) satisfies QuartzComponentConstructor
