type FunnelEvent = {
  event: string
  path: string
  variant: string
  contentId?: string
  occurredAt: string
}

const experimentKey = "sourcesuses.message-variant.v1"
const eventKey = "sourcesuses.validation-events.v1"

function getVariant(): "A" | "B" {
  const query = new URLSearchParams(window.location.search).get("message")?.toUpperCase()
  if (query === "A" || query === "B") return query
  const existing = localStorage.getItem(experimentKey)
  if (existing === "A" || existing === "B") return existing
  const assigned = crypto.getRandomValues(new Uint8Array(1))[0] % 2 === 0 ? "A" : "B"
  localStorage.setItem(experimentKey, assigned)
  return assigned
}

function recordEvent(event: FunnelEvent) {
  const existing = JSON.parse(localStorage.getItem(eventKey) ?? "[]") as FunnelEvent[]
  localStorage.setItem(eventKey, JSON.stringify([...existing.slice(-99), event]))
}

function setupValidation() {
  const variant = getVariant()
  document.querySelectorAll<HTMLElement>("[data-message-variant]").forEach((element) => {
    element.hidden = element.dataset.messageVariant !== variant
  })
  document.querySelectorAll<HTMLInputElement>("input[name='message_variant']").forEach((input) => {
    input.value = variant
  })

  const clickHandlers: Array<[Element, EventListener]> = []
  document.querySelectorAll("[data-funnel-event]").forEach((element) => {
    const handler = () =>
      recordEvent({
        event: (element as HTMLElement).dataset.funnelEvent ?? "unknown",
        path: window.location.pathname,
        variant,
        contentId: (element as HTMLElement).dataset.contentId,
        occurredAt: new Date().toISOString(),
      })
    element.addEventListener("click", handler)
    clickHandlers.push([element, handler])
  })
  window.addCleanup(() =>
    clickHandlers.forEach(([element, handler]) => element.removeEventListener("click", handler)),
  )
}

document.addEventListener("nav", setupValidation)
