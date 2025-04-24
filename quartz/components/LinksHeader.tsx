// quartz/components/LinksHeader.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types" 
import style from "./styles/linksHeader.scss"
// Remove useState, JSX imports

export default (() => {
  function LinksHeader(_props: QuartzComponentProps) { 
    // Remove state and toggle function
    return (
      // Basic wrapper
      <div className="links-header-component-wrapper">
        {/* Links Container */}
        <div id="links-header">
          <span><a href="https://camargomau.com/">Articles</a></span>
          <span><a href="/Sciujo/MAC/MAC">Notes</a></span>
          <span><a href="/Sciujo/Sciujo">Models</a></span>
          <span><a href="/graph">Mindmap</a></span> 
        </div>
        {/* HR */}
        <hr /> 
      </div>
    )
  }
  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor