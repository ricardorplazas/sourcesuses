// quartz/components/Footer.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {

  // --- ADD THE COOKIE BANNER SCRIPT LOGIC HERE ---
  const cookieBannerScript = `
  function initializeCookieBanner() {
    const CONSENT_KEY = "quartz-cookie-consent-dismissed"; 
    const banner = document.querySelector('.cookie-consent-banner.informational');
    const dismissButton = document.getElementById('cookie-dismiss-button'); 

    console.log('[Footer Script] Initializing Cookie Banner. Banner found:', banner);
    console.log('[Footer Script] Dismiss button found:', dismissButton);

    if (!banner) {
      // Banner might not be on every page if added conditionally, this is okay.
      console.log('[Footer Script] Cookie Banner element not found in DOM.');
      return; 
    }

    const storedDismissal = localStorage.getItem(CONSENT_KEY);
    console.log('[Footer Script] Stored dismissal:', storedDismissal);

    if (storedDismissal === "true") {
      console.log('[Footer Script] Already dismissed, banner remains hidden.');
      banner.style.display = 'none'; // Ensure it's hidden
      return; 
    } else {
      banner.style.display = 'flex'; // Show banner if not dismissed
      console.log('[Footer Script] Not dismissed, showing banner.');
    }

    if (dismissButton) {
       if (!dismissButton.dataset.listenerAttached) { // Use unique attribute name
          dismissButton.addEventListener('click', () => {
              console.log('[Footer Script] Dismiss button clicked!');
              try {
                  localStorage.setItem(CONSENT_KEY, "true");
                  banner.style.display = 'none'; 
                  console.log('[Footer Script] Dismissal stored and banner hidden.');
              } catch (e) {
                  console.error('[Footer Script] Error setting localStorage:', e);
              }
          });
          dismissButton.dataset.listenerAttached = 'true'; // Mark as attached
          console.log('[Footer Script] Dismiss listener attached.');
       }
    } else {
      console.warn('[Footer Script] Dismiss button (#cookie-dismiss-button) not found.');
    }
  }

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCookieBanner);
  } else {
    initializeCookieBanner();
  }

  // Re-run on SPA navigation
  document.addEventListener('nav', initializeCookieBanner); 
  `;
  // --- END SCRIPT LOGIC ---


  function Footer({ displayClass, cfg }: QuartzComponentProps) {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  // Attach the script to the Footer component
  Footer.afterDOMLoaded = cookieBannerScript; 

  return Footer
}) satisfies QuartzComponentConstructor