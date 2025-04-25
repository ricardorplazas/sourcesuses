// quartz/components/CookieConsent.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/cookieConsent.scss"
import { pathToRoot } from "../util/path" 

// Key is now only used by the external JS file/script
// const CONSENT_KEY = "quartz-cookie-consent-dismissed" 

export default (() => {
  const CookieConsent: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    // No JS logic (useState, useEffect, handleDismiss) needed here

    // Get the correct path to the privacy policy
    const root = pathToRoot(fileData.slug!)
    const privacyPolicyLink = root + "/privacy-policy" // Adjust if your path is different

    // Render the banner HTML structure directly.
    // Start hidden with inline style to prevent flash before JS runs.
    // The script attached to Footer will change display to 'flex' if needed.
    return (
      <div class="cookie-consent-banner informational" style="display: none;"> 
        <p>
          We use cookies, including those from Microsoft Clarity, to improve your experience and analyze site usage. By continuing to use this site, you agree to this use. See our{" "}
          <a href={privacyPolicyLink}>Privacy Policy</a> for more details.
        </p>
        <div class="consent-buttons">
          {/* Keep the ID for the script */}
          <button id="cookie-dismiss-button">OK</button> 
        </div>
      </div>
    )
  }

  CookieConsent.css = style // Attach styles
  // REMOVE script assignment: CookieConsent.afterDOMLoaded = script; 
  return CookieConsent
}) satisfies QuartzComponentConstructor
