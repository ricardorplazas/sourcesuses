import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/prototypes.scss"
// @ts-ignore
import script from "./scripts/prototypes.inline"

const AddinPrototype: QuartzComponent = () => (
  <section
    id="addin-prototype"
    class="prototype-shell"
    aria-label="Clickable Excel add-in prototype"
  >
    <div class="prototype-notice">
      <strong>Concept test only</strong> — this is not a functioning Excel add-in and is not
      included for sale.
    </div>
    <div class="addin-layout">
      <div class="mock-workbook" aria-label="Illustrative workbook selection">
        <div class="mock-formula">=EBITDA-Capex-Change_in_NWC-Cash_Tax</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>2025A</th>
              <th>2026E</th>
              <th>2027E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Revenue</th>
              <td>40.0</td>
              <td>43.2</td>
              <td>46.7</td>
            </tr>
            <tr>
              <th>EBITDA</th>
              <td>7.0</td>
              <td class="mock-selected">7.8</td>
              <td>8.6</td>
            </tr>
            <tr>
              <th>Margin</th>
              <td>17.5%</td>
              <td>18.1%</td>
              <td>18.4%</td>
            </tr>
            <tr>
              <th>Debt paydown</th>
              <td>—</td>
              <td>2.4</td>
              <td>3.1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <aside class="addin-pane">
        <p class="eyebrow">Sources & Uses for Excel</p>
        <h2>Interview model cleanup</h2>
        <button type="button" data-addin-command="Colour hardcodes blue">
          Colour hardcodes
        </button>
        <button type="button" data-addin-command="Apply finance number format">
          Finance number format
        </button>
        <button type="button" data-addin-command="Apply total row style">
          Total / subtotal style
        </button>
        <button type="button" data-addin-command="Standardise font and alignment">
          Standardise model
        </button>
        <button type="button" data-addin-command="Run submission checklist">
          Submission checklist
        </button>
        <output id="addin-result" aria-live="polite">
          Select a command to test the workflow.
        </output>
      </aside>
    </div>
  </section>
)

AddinPrototype.css = style
AddinPrototype.afterDOMLoaded = script

export default (() => AddinPrototype) satisfies QuartzComponentConstructor
