import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/validation.scss"
import { joinSegments, pathToRoot } from "../util/path"

const ConversionCTA: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const action = fileData.frontmatter?.cta
  if (action !== "diagnostic" && action !== "case") return null

  const diagnostic = action === "diagnostic"
  const root = pathToRoot(fileData.slug!)
  return (
    <aside class="conversion-cta" aria-label="Next step">
      <p class="eyebrow">Your next useful step</p>
      <h2>{diagnostic ? "Test the whole decision workflow" : "See the full simulation"}</h2>
      <p>
        {diagnostic
          ? "Use a fictional company snapshot to test prioritisation, one calculation and an explicit investment recommendation."
          : "Inspect the case format, exact deliverables, prerequisites and beta validation terms before expressing interest."}
      </p>
      <a
        class="button primary"
        href={joinSegments(root, diagnostic ? "diagnostic/" : "cases/ic-simulation-01")}
        data-funnel-event={diagnostic ? "article_diagnostic_click" : "article_case_click"}
        data-content-id={fileData.slug}
      >
        {diagnostic ? "Start the free diagnostic" : "Preview IC Simulation 01"}
      </a>
    </aside>
  )
}

ConversionCTA.css = style

export default (() => ConversionCTA) satisfies QuartzComponentConstructor
