import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/validation.scss"

const endpoint = process.env.SOURCESUSES_FORM_ENDPOINT?.trim()

const InterestForm: QuartzComponent = () => (
  <section class="interest-form" aria-labelledby="interest-form-title">
    <h2 id="interest-form-title">Validation interest</h2>
    {endpoint ? (
      <form method="post" action={endpoint}>
        <label>
          Email
          <input name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          Current situation
          <select name="segment" required>
            <option value="">Select one</option>
            <option value="banker">Investment banking / transaction professional</option>
            <option value="consultant">Consulting / adjacent professional</option>
            <option value="student">Student</option>
            <option value="other">Other candidate</option>
          </select>
        </label>
        <label>
          Expected case timing
          <select name="timing" required>
            <option value="">Select one</option>
            <option value="0-4-weeks">0–4 weeks</option>
            <option value="5-12-weeks">5–12 weeks</option>
            <option value="later">Later / exploring</option>
          </select>
        </label>
        <fieldset>
          <legend>Which offer would you choose at the stated price?</legend>
          <label>
            <input type="radio" name="offer_choice" value="case-59" required /> One audited
            simulation — CHF 59 beta
          </label>
          <label>
            <input type="radio" name="offer_choice" value="case-79" /> One audited simulation — CHF
            79 after quality proof
          </label>
          <label>
            <input type="radio" name="offer_choice" value="not-buy" /> Neither at these prices
          </label>
        </fieldset>
        <label class="checkbox-label">
          <input type="checkbox" name="product_updates_consent" value="yes" /> Email me about this
          validation and product availability. Optional and withdrawable.
        </label>
        <input type="hidden" name="message_variant" value="" />
        <input type="hidden" name="source_page" value="interest" />
        <button class="button primary" type="submit">
          Record my choice
        </button>
        <p class="small-print">
          Submitting interest is not a purchase or preorder. Marketing consent is optional.
        </p>
      </form>
    ) : (
      <div class="form-not-configured" role="status">
        <p>
          <strong>The validation intake is not open yet.</strong>
        </p>
        <p>
          The form is implemented but deliberately disabled until a data-processing endpoint,
          retention rule and working privacy contact are approved.
        </p>
      </div>
    )}
  </section>
)

InterestForm.css = style

export default (() => InterestForm) satisfies QuartzComponentConstructor
