// quartz/components/LinksHeader.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/linksHeader.scss"
import { useState, useEffect } from "preact/hooks" 

export default (() => {
  function LinksHeader(_props: QuartzComponentProps) { 
    // Add a state variable (even if we don't display it)
    const [listenerAttached, setListenerAttached] = useState(false);

    useEffect(() => {
      console.log("LinksHeader useEffect: Running effect..."); // Log start
      const mindmapLink = document.getElementById("mindmap-nav-link");
      console.log("LinksHeader useEffect: Found link:", mindmapLink);

      if (!mindmapLink) {
         console.error("LinksHeader useEffect: Mindmap link ID not found.");
         return;
      }

      const handleClick = (event: MouseEvent) => {
        console.log("LinksHeader handleClick: 'Mindmap' link clicked!"); 
        event.preventDefault(); 
        console.log("LinksHeader handleClick: Default navigation prevented.");
        
        const globalGraphButton = document.querySelector(".graph .global-graph-icon") as HTMLButtonElement | null;
        console.log("LinksHeader handleClick: Found button:", globalGraphButton);
        
        if (globalGraphButton) {
          try {
            console.log("LinksHeader handleClick: Simulating click on graph button..."); 
            globalGraphButton.click(); 
            console.log("LinksHeader handleClick: Graph button click simulated.");
          } catch (e) {
            console.error("LinksHeader handleClick: Error during button click simulation:", e); 
          }
        } else {
          console.warn("LinksHeader handleClick: Global graph button not found.");
        }
      };

      // Check if already attached (using state could also work, but data attribute is simpler for cleanup)
      if (!mindmapLink.dataset.listenerAttached) {
          mindmapLink.addEventListener("click", handleClick);
          mindmapLink.dataset.listenerAttached = 'true'; // Mark as attached
          setListenerAttached(true); // *** Set state when attaching ***
          console.log("LinksHeader useEffect: Listener attached."); 
      } else {
           console.log("LinksHeader useEffect: Listener already attached.");
      }


      // Cleanup function
      return () => {
        if (mindmapLink.dataset.listenerAttached) {
            mindmapLink.removeEventListener("click", handleClick);
            delete mindmapLink.dataset.listenerAttached; 
            setListenerAttached(false); // *** Set state on cleanup ***
            console.log("LinksHeader useEffect: Listener removed."); 
        }
      };
    }, []); // Empty dependency array

    return (
      // Render normally
      <div id="links-header"> 
        {/* Optionally display state for debug: <p>{listenerAttached.toString()}</p> */}
        <span><a href="/Articles/">Articles</a></span>
        <span><a href="/Models/">Models</a></span>
        <span><a href="/Notes/">Notes</a></span>
        <span><a href="#" id="mindmap-nav-link">Mindmap</a></span> 
      </div>
    )
  }
  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor