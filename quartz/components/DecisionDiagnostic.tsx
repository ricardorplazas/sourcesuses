import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/diagnostic.scss"
// @ts-ignore
import script from "./scripts/diagnostic.inline"

const DecisionDiagnostic: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <section id="decision-diagnostic" class="diagnostic" data-version="0.1.0">
      <div class="diagnostic-toolbar">
        <div>
          <span class="status-dot" aria-hidden="true"></span>
          <strong>15-minute decision diagnostic</strong>
        </div>
        <output id="diagnostic-timer" aria-live="polite">
          15:00
        </output>
      </div>

      <div id="diagnostic-intro" class="diagnostic-panel">
        <p class="eyebrow">Fictional company snapshot</p>
        <h2>NordWerk Compliance Services</h2>
        <p>
          NordWerk provides inspection and maintenance services for commercial facilities across
          Germany and Austria. A sponsor is considering an acquisition at 10.0× adjusted EBITDA.
        </p>
        <div class="snapshot-grid" aria-label="Company snapshot">
          <div>
            <span>Revenue</span>
            <strong>€40.0m</strong>
          </div>
          <div>
            <span>Adjusted EBITDA</span>
            <strong>€7.0m</strong>
          </div>
          <div>
            <span>Entry debt</span>
            <strong>€35.0m</strong>
          </div>
          <div>
            <span>Cash interest</span>
            <strong>€3.0m</strong>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Revenue stream</th>
              <th>Share</th>
              <th>Retention</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mandatory inspections</td>
              <td>55%</td>
              <td>94%</td>
              <td>Multi-year regulation-driven schedule</td>
            </tr>
            <tr>
              <td>Preventive maintenance</td>
              <td>25%</td>
              <td>86%</td>
              <td>Renewable annual contracts</td>
            </tr>
            <tr>
              <td>Reactive repairs</td>
              <td>15%</td>
              <td>n/a</td>
              <td>Demand follows inspection findings</td>
            </tr>
            <tr>
              <td>Software reports</td>
              <td>5%</td>
              <td>97%</td>
              <td>Often bundled with inspections</td>
            </tr>
          </tbody>
        </table>
        <p>
          Management forecasts 10% annual revenue growth, assuming 6% price, 3% technician
          productivity and 1% cross-sell. Historic annual price growth was 2–3%; technician vacancy
          is 12%. The top customer represents 14% of revenue and is retendering next year.
        </p>
        <p>
          For the coming year, use EBITDA of €7.0m, cash taxes of €0.8m, capex of €0.9m,
          working-capital outflow of €0.4m and cash interest of €3.0m. Assume all remaining cash
          flow repays debt.
        </p>
        <button id="diagnostic-start" class="button primary" type="button">
          Start the timer
        </button>
        <p class="small-print">
          No account is required. Your answers remain in this browser unless you explicitly export
          or share them.
        </p>
      </div>

      <form id="diagnostic-form" class="diagnostic-panel" hidden>
        <fieldset data-question="q1">
          <legend>
            1. Which revenue stream has the strongest standalone evidence of defensibility?
          </legend>
          <label>
            <input type="radio" name="q1" value="a" required /> Mandatory inspections
          </label>
          <label>
            <input type="radio" name="q1" value="b" /> Preventive maintenance
          </label>
          <label>
            <input type="radio" name="q1" value="c" /> Reactive repairs
          </label>
          <label>
            <input type="radio" name="q1" value="d" /> Software reports
          </label>
        </fieldset>
        <fieldset data-question="q2">
          <legend>2. Which management claim most needs evidence before underwriting?</legend>
          <label>
            <input type="radio" name="q2" value="a" required /> Regulation supports recurring
            inspections
          </label>
          <label>
            <input type="radio" name="q2" value="b" /> Price can rise 6% despite a 2–3% history
          </label>
          <label>
            <input type="radio" name="q2" value="c" /> Reactive demand follows inspection findings
          </label>
          <label>
            <input type="radio" name="q2" value="d" /> Software is bundled with inspections
          </label>
        </fieldset>
        <fieldset data-question="q3">
          <legend>3. Which KPI is most decision-useful for testing the growth plan?</legend>
          <label>
            <input type="radio" name="q3" value="a" required /> Website visits
          </label>
          <label>
            <input type="radio" name="q3" value="b" /> Office rent per employee
          </label>
          <label>
            <input type="radio" name="q3" value="c" /> Technician capacity, utilisation and hiring
            cohorts
          </label>
          <label>
            <input type="radio" name="q3" value="d" /> Number of management presentations
          </label>
        </fieldset>
        <fieldset data-question="q4">
          <legend>4. How much debt can be repaid next year using the supplied figures?</legend>
          <label>
            <input type="radio" name="q4" value="a" required /> €1.9m
          </label>
          <label>
            <input type="radio" name="q4" value="b" /> €2.3m
          </label>
          <label>
            <input type="radio" name="q4" value="c" /> €3.0m
          </label>
          <label>
            <input type="radio" name="q4" value="d" /> €4.9m
          </label>
        </fieldset>
        <fieldset data-question="q5">
          <legend>5. Which downside interaction is most material?</legend>
          <label>
            <input type="radio" name="q5" value="a" required /> A smaller office reduces
            depreciation
          </label>
          <label>
            <input type="radio" name="q5" value="b" /> Lower price and delayed hiring reduce growth
            while leverage remains high
          </label>
          <label>
            <input type="radio" name="q5" value="c" /> More reporting software increases the logo
            count
          </label>
          <label>
            <input type="radio" name="q5" value="d" /> A new website changes working capital
          </label>
        </fieldset>
        <fieldset data-question="q6">
          <legend>6. What is the best preliminary recommendation?</legend>
          <label>
            <input type="radio" name="q6" value="a" required /> Proceed unconditionally because
            revenue is recurring
          </label>
          <label>
            <input type="radio" name="q6" value="b" /> Decline because any customer concentration is
            unacceptable
          </label>
          <label>
            <input type="radio" name="q6" value="c" /> Proceed conditionally, testing pricing,
            technician capacity and top-customer retention
          </label>
          <label>
            <input type="radio" name="q6" value="d" /> Proceed because 10.0× is always attractive
          </label>
        </fieldset>
        <button class="button primary" type="submit">
          Finish and view debrief
        </button>
      </form>

      <div id="diagnostic-result" class="diagnostic-panel" hidden aria-live="polite">
        <p class="eyebrow">Your deterministic debrief</p>
        <h2 id="diagnostic-score"></h2>
        <p id="diagnostic-summary"></p>
        <div id="diagnostic-breakdown"></div>
        <h3>Decision path</h3>
        <ol>
          <li>Mandatory inspection revenue has the clearest independent recurrence evidence.</li>
          <li>
            The 6% pricing assumption is materially above history and should not be accepted without
            evidence.
          </li>
          <li>Capacity links the commercial plan to the operating model.</li>
          <li>
            Debt paydown is €1.9m: €7.0m EBITDA less €0.8m tax, €0.9m capex, €0.4m working capital
            and €3.0m interest.
          </li>
          <li>
            Price/capacity underperformance can weaken EBITDA and debt paydown simultaneously.
          </li>
          <li>A conditional recommendation is more decision-useful than a generic yes or no.</li>
        </ol>
        <div class="diagnostic-actions">
          <button id="diagnostic-export" class="button secondary" type="button">
            Export my result
          </button>
          <button id="diagnostic-reset" class="button secondary" type="button">
            Reset diagnostic
          </button>
          <a
            class="button primary"
            href={joinSegments(root, "cases/ic-simulation-01")}
            data-funnel-event="diagnostic_case_click"
          >
            Preview the full case
          </a>
        </div>
        <p class="small-print">
          This is a learning diagnostic, not a hiring prediction or recruiter-validated benchmark.
        </p>
      </div>
    </section>
  )
}

DecisionDiagnostic.css = style
DecisionDiagnostic.afterDOMLoaded = script

export default (() => DecisionDiagnostic) satisfies QuartzComponentConstructor
