const prototypePages = [
  ["01", "Transaction", "A founder-owned compliance-services group is exploring a sponsor sale."],
  [
    "02",
    "Revenue quality",
    "Contracted inspection revenue is durable; recurrence definitions differ.",
  ],
  [
    "03",
    "Customers",
    "The top ten customers contribute 42% of revenue; one contract is retendering.",
  ],
  ["04", "Operations", "Growth depends on recruiting and increasing technician utilisation."],
  ["05", "Financials", "Management expects margin expansion beyond the historical range."],
  [
    "06",
    "Debt & returns",
    "Entry leverage is supportable only if cash conversion remains resilient.",
  ],
]

function setupPrototypes() {
  const room = document.querySelector<HTMLElement>("#case-room-prototype")
  const cleanup: Array<() => void> = []
  if (room) {
    room.querySelectorAll<HTMLButtonElement>("[data-page-index]").forEach((button) => {
      const handler = () => {
        const index = Number(button.dataset.pageIndex)
        const [number, title, copy] = prototypePages[index]
        room.querySelector<HTMLElement>("#prototype-page-number")!.textContent = `Page ${number}`
        room.querySelector<HTMLElement>("#prototype-page-title")!.textContent = title
        room.querySelector<HTMLElement>("#prototype-page-copy")!.textContent = copy
        room
          .querySelectorAll("[data-page-index]")
          .forEach((entry) => entry.removeAttribute("aria-current"))
        button.setAttribute("aria-current", "page")
      }
      button.addEventListener("click", handler)
      cleanup.push(() => button.removeEventListener("click", handler))
    })

    const toggle = room.querySelector<HTMLButtonElement>("#prototype-timer-toggle")!
    const output = room.querySelector<HTMLOutputElement>("#prototype-timer")!
    let running = false
    let remaining = 7200
    let interval: number | undefined
    const render = () => {
      const hours = Math.floor(remaining / 3600)
      const minutes = Math.floor((remaining % 3600) / 60)
      const seconds = remaining % 60
      output.value = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }
    const toggleTimer = () => {
      running = !running
      toggle.textContent = running ? "Pause timer" : "Resume timer"
      if (running)
        interval = window.setInterval(() => {
          remaining = Math.max(0, remaining - 1)
          render()
        }, 1000)
      else if (interval !== undefined) window.clearInterval(interval)
    }
    toggle.addEventListener("click", toggleTimer)
    cleanup.push(() => {
      toggle.removeEventListener("click", toggleTimer)
      if (interval !== undefined) window.clearInterval(interval)
    })
  }

  const addin = document.querySelector<HTMLElement>("#addin-prototype")
  if (addin) {
    addin.querySelectorAll<HTMLButtonElement>("[data-addin-command]").forEach((button) => {
      const handler = () => {
        addin.querySelector<HTMLOutputElement>("#addin-result")!.value =
          `${button.dataset.addinCommand}: preview applied. Would this change your bundle choice?`
        addin.querySelector(".mock-selected")?.classList.toggle("mock-formatted")
      }
      button.addEventListener("click", handler)
      cleanup.push(() => button.removeEventListener("click", handler))
    })
  }

  window.addCleanup(() => cleanup.forEach((fn) => fn()))
}

document.addEventListener("nav", setupPrototypes)
