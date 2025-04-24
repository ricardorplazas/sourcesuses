// quartz/components/LinksHeader.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/linksHeader.scss"
// NOTE: No useEffect/useState needed for this approach

// Define the client-side script as a string
const script = `
function setupMindmapLinkForComponent() {
  const mindmapLink = document.getElementById('mindmap-nav-link');
  const globalGraphButton = document.querySelector('.graph .global-graph-icon'); 

  console.log('[LinksHeader Simplified] setupMindmapLinkForComponent called.'); // Added marker
  console.log('[LinksHeader Simplified] Link:', mindmapLink);
  console.log('[LinksHeader Simplified] Button:', globalGraphButton);

  if (mindmapLink && globalGraphButton) {
    // Check if listener is already attached (using a unique attribute)
    // This prevents adding it multiple times if this function somehow runs again
    if (!mindmapLink.dataset.simplifiedListenerAttached) { 
      
      const handleClick = (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 

        console.log('[LinksHeader Simplified] Mindmap link clicked! Simulating click shortly...');
        
        if (globalGraphButton) { 
          setTimeout(() => {
              try {
                const clickEvent = new MouseEvent('click', {
                  view: window,
                  bubbles: true,    
                  cancelable: true  
                });
                console.log('[LinksHeader Simplified] Dispatching click event on graph button...');
                globalGraphButton.dispatchEvent(clickEvent); 
                console.log('[LinksHeader Simplified] Graph button click event dispatched.'); 
              } catch (e) {
                console.error('[LinksHeader Simplified] Error during button click dispatch:', e); 
              }
          }, 50); // Keep small delay
        } else {
           console.warn('[LinksHeader Simplified] Graph button not found when dispatching!');
        }
      };

      mindmapLink.addEventListener('click', handleClick);
      // Use a unique attribute name here
      mindmapLink.dataset.simplifiedListenerAttached = 'true'; 
      console.log('[LinksHeader Simplified] Listener attached.');
    } else {
        console.log('[LinksHeader Simplified] Listener was already attached.'); 
    }
  } else {
     if (!mindmapLink) console.warn('[LinksHeader Simplified] #mindmap-nav-link not found.');
     if (!globalGraphButton) console.warn('[LinksHeader Simplified] .graph .global-graph-icon not found.');
  }
}

// --- Script Execution ---
// Set up the link ONLY when the initial DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMindmapLinkForComponent);
} else {
  // DOM is already loaded, run setup now
  setupMindmapLinkForComponent(); 
}

// --- REMOVED 'nav' event listener ---
// document.addEventListener('nav', setupMindmapLinkForComponent); 
`;

// Define the Quartz component
export default (() => {
  function LinksHeader(_props: QuartzComponentProps) {
    // Render the HTML structure for the links
    return (
      <div id="links-header">
        <span><a href="/Articles/">Articles</a></span>
        <span><a href="/Models/">Models</a></span>
        <span><a href="/Notes/">Notes</a></span>
        <span>
          {/* Mindmap link with specific ID and href="#" */}
          <a href="#" id="mindmap-nav-link">Mindmap</a>
        </span>
      </div>
    )
  }

  // Attach the CSS and the JavaScript string to the component
  LinksHeader.css = style;
  LinksHeader.afterDOMLoaded = script; // This script runs after the DOM is loaded

  return LinksHeader;
}) satisfies QuartzComponentConstructor
