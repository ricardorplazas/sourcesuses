type DiagnosticResult = {
  version: string
  startedAt: string
  completedAt: string
  elapsedSeconds: number
  score: number
  answers: Record<string, string>
}

const storageKey = "sourcesuses.diagnostic.v0.1.0"
const correct: Record<string, string> = { q1: "a", q2: "b", q3: "c", q4: "a", q5: "b", q6: "c" }
let timerId: number | undefined

function setupDiagnostic() {
  const root = document.querySelector<HTMLElement>("#decision-diagnostic")
  if (!root) return
  const intro = root.querySelector<HTMLElement>("#diagnostic-intro")!
  const form = root.querySelector<HTMLFormElement>("#diagnostic-form")!
  const result = root.querySelector<HTMLElement>("#diagnostic-result")!
  const timer = root.querySelector<HTMLOutputElement>("#diagnostic-timer")!
  let startedAt = ""

  const stopTimer = () => {
    if (timerId !== undefined) window.clearInterval(timerId)
    timerId = undefined
  }

  const renderTimer = () => {
    const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
    const remaining = Math.max(0, 900 - elapsed)
    timer.value = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`
    if (remaining === 0) stopTimer()
  }

  const showResult = (stored: DiagnosticResult) => {
    intro.hidden = true
    form.hidden = true
    result.hidden = false
    root.querySelector<HTMLElement>("#diagnostic-score")!.textContent =
      `${stored.score}/6 decision signals identified`
    const band =
      stored.score >= 5
        ? "Strong integrated reasoning"
        : stored.score >= 3
          ? "Promising, with gaps to address"
          : "Core workflow needs another pass"
    root.querySelector<HTMLElement>("#diagnostic-summary")!.textContent =
      `${band}. Review where the evidence, calculation and recommendation should connect.`
    root.querySelector<HTMLElement>("#diagnostic-breakdown")!.innerHTML = Object.keys(correct)
      .map(
        (question, index) =>
          `<p><strong>Question ${index + 1}:</strong> ${stored.answers[question] === correct[question] ? "Decision-useful" : "Review the reasoning below"}</p>`,
      )
      .join("")
    stopTimer()
  }

  const start = () => {
    startedAt = new Date().toISOString()
    intro.hidden = true
    result.hidden = true
    form.hidden = false
    renderTimer()
    timerId = window.setInterval(renderTimer, 1000)
    form.querySelector<HTMLInputElement>("input")?.focus()
  }

  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    const values = new FormData(form)
    const answers = Object.fromEntries(
      [...values.entries()].map(([key, value]) => [key, String(value)]),
    )
    const score = Object.entries(correct).filter(
      ([question, answer]) => answers[question] === answer,
    ).length
    const completedAt = new Date().toISOString()
    const stored: DiagnosticResult = {
      version: root.dataset.version ?? "unknown",
      startedAt,
      completedAt,
      elapsedSeconds: Math.max(
        0,
        Math.round((new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000),
      ),
      score,
      answers,
    }
    localStorage.setItem(storageKey, JSON.stringify(stored))
    showResult(stored)
  }

  const exportResult = () => {
    const payload = localStorage.getItem(storageKey)
    if (!payload) return
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "sources-uses-diagnostic-result.json"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    stopTimer()
    localStorage.removeItem(storageKey)
    form.reset()
    result.hidden = true
    form.hidden = true
    intro.hidden = false
    timer.value = "15:00"
  }

  const startButton = root.querySelector<HTMLButtonElement>("#diagnostic-start")!
  const exportButton = root.querySelector<HTMLButtonElement>("#diagnostic-export")!
  const resetButton = root.querySelector<HTMLButtonElement>("#diagnostic-reset")!
  startButton.addEventListener("click", start)
  form.addEventListener("submit", submit)
  exportButton.addEventListener("click", exportResult)
  resetButton.addEventListener("click", reset)

  const stored = localStorage.getItem(storageKey)
  if (stored) showResult(JSON.parse(stored) as DiagnosticResult)

  window.addCleanup(() => {
    stopTimer()
    startButton.removeEventListener("click", start)
    form.removeEventListener("submit", submit)
    exportButton.removeEventListener("click", exportResult)
    resetButton.removeEventListener("click", reset)
  })
}

document.addEventListener("nav", setupDiagnostic)
