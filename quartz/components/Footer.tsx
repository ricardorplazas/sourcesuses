// quartz/components/Footer.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { joinSegments, pathToRoot } from "../util/path"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer({ displayClass, cfg, fileData }: QuartzComponentProps) {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const root = pathToRoot(fileData.slug!)
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <p>
          {cfg.pageTitle} © {year}. Educational content only. Published with{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz</a>.
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link.startsWith("/") ? joinSegments(root, link.slice(1)) : link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style

  return Footer
}) satisfies QuartzComponentConstructor
