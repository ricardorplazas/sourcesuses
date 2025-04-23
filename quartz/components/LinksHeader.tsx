// quartz/components/LinksHeader.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types" // Ensure QuartzComponentProps is imported
import style from "./styles/linksHeader.scss"
import { useState } from "preact/hooks" // Import useState
import { JSX } from "preact/jsx-runtime" // Import JSX for SVG type safety

// Options interface remains unused but kept for consistency if needed later
// interface Options {
//   links: Record<string, string>
// }

// Basic SVG Icon Components (can be more elaborate)
const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hamburger-icon">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-icon">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)


export default (() => {
  function LinksHeader(_props: QuartzComponentProps) { // Add _props back
    const [isMenuOpen, setIsMenuOpen] = useState(false) // State for menu toggle

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen) // Function to toggle state
    }

    return (
      // Add conditional class based on state for CSS targeting
      <div className={`links-header-component-wrapper ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        {/* Hamburger Button - visible only on mobile via CSS */}
        <button
          className="hamburger-button mobile-only"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Link Container - acts as menu content on mobile */}
        <div id="links-header">
          <span><a href="https://camargomau.com/">Articles</a></span>
          <span><a href="/Sciujo/MAC/MAC">Notes</a></span>
          <span><a href="/Sciujo/Sciujo">Models</a></span>
          <span><a href="/graph">Mindmap</a></span>
          {/* Add back other links if needed */}
        </div>

        {/* HR might be hidden on mobile via CSS */}
        <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 0rem"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor