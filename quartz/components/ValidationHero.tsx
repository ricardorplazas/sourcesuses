import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/validation.scss"
// @ts-ignore
import script from "./scripts/validation.inline"

const ValidationHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <section class="validation-hero" aria-label="Sources and Uses validation offer">
      <p class="eyebrow">European mid-market PE interview practice</p>
      <div class="message-variant" data-message-variant="A" hidden>
        <h1>A European private-equity case library built for real decisions.</h1>
        <p>
          Practise realistic mid-market cases that connect commercial analysis, modelling, downside
          judgment and investment-committee communication.
        </p>
      </div>
      <div class="message-variant" data-message-variant="B">
        <h1>Rehearse the full investment decision—not just the LBO.</h1>
        <p>
          Turn imperfect company information into a model, a recommendation and a concise IC case
          under realistic time pressure.
        </p>
      </div>
      <div class="hero-actions">
        <a
          class="button primary"
          href={joinSegments(root, "diagnostic/")}
          data-funnel-event="diagnostic_click"
        >
          Try the free 15-minute diagnostic
        </a>
        <a
          class="button secondary"
          href={joinSegments(root, "cases/ic-simulation-01")}
          data-funnel-event="case_preview_click"
        >
          Preview IC Simulation 01
        </a>
      </div>
      <p class="trust-line">
        Original fictional company · deterministic scoring · no leaked interview materials · no
        coaching upsell
      </p>
    </section>
  )
}

ValidationHero.css = style
ValidationHero.afterDOMLoaded = script

export default (() => ValidationHero) satisfies QuartzComponentConstructor
