import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const requiredContent = [
  "content/learn/index.md",
  "content/learn/pe-case-study.md",
  "content/learn/investment-recommendation.md",
  "content/learn/investment-committee.md",
  "content/learn/excel-model-quality.md",
  "content/diagnostic/index.md",
  "content/cases/ic-simulation-01.md",
  "content/prototypes/case-room.md",
  "content/prototypes/excel-addin.md",
  "content/about.md",
  "content/terms.md",
  "content/interest.md",
]
const errors = []

for (const path of requiredContent) {
  if (!existsSync(resolve(path))) errors.push(`Missing Phase 1 content: ${path}`)
}

const commercialGuides = [
  "content/learn/pe-case-study.md",
  "content/learn/investment-recommendation.md",
  "content/learn/investment-committee.md",
  "content/learn/excel-model-quality.md",
  "content/learn/lbo-model-test.md",
]
for (const path of commercialGuides) {
  const source = readFileSync(resolve(path), "utf8")
  const ctas = source.match(/^cta:\s*(diagnostic|case)\s*$/gmu) ?? []
  if (ctas.length !== 1) {
    errors.push(`${path}: expected exactly one primary CTA, found ${ctas.length}`)
  }
}

const renderedChecks = [
  ["public/index.html", 'data-message-variant="A"'],
  ["public/index.html", 'data-message-variant="B"'],
  ["public/diagnostic/index.html", 'id="decision-diagnostic"'],
  ["public/prototypes/case-room.html", 'id="case-room-prototype"'],
  ["public/prototypes/excel-addin.html", 'id="addin-prototype"'],
]
for (const [path, expected] of renderedChecks) {
  if (!existsSync(resolve(path))) errors.push(`Missing rendered Phase 1 page: ${path}`)
  else if (!readFileSync(resolve(path), "utf8").includes(expected)) {
    errors.push(`${path}: missing ${expected}`)
  }
}

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log("Phase 1 checks passed")
