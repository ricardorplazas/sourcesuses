// quartz/components/LinksHeader.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/linksHeader.scss"
import { joinSegments, pathToRoot } from "../util/path"

export default (() => {
  function LinksHeader({ fileData }: QuartzComponentProps) {
    const root = pathToRoot(fileData.slug!)
    return (
      <nav class="links-header" aria-label="Primary navigation">
        <a href={joinSegments(root, "learn/")}>Learn</a>
        <a href={joinSegments(root, "diagnostic/")}>Free diagnostic</a>
        <a href={joinSegments(root, "cases/")}>Cases</a>
        <a href={joinSegments(root, "about")}>About</a>
      </nav>
    )
  }

  LinksHeader.css = style

  return LinksHeader
}) satisfies QuartzComponentConstructor
