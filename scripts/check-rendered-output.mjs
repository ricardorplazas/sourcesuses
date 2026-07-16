import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { extname, join, resolve } from "node:path"

const publicRoot = resolve("public")
const homepagePath = join(publicRoot, "index.html")
const privacyPath = join(publicRoot, "privacy-policy.html")
const diagnosticPath = join(publicRoot, "diagnostic", "index.html")
const errors = []

for (const requiredFile of [homepagePath, privacyPath, diagnosticPath]) {
  if (!existsSync(requiredFile)) {
    errors.push(`Missing rendered page: ${requiredFile}`)
  }
}

function renderedFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    if (statSync(path).isDirectory()) return renderedFiles(path)
    return [".html", ".js", ".css"].includes(extname(path)) ? [path] : []
  })
}

const forbiddenOutput = [
  "https://www.clarity.ms/tag",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://cdn.jsdelivr.net/npm/katex",
  "cookie-consent-banner",
  "mindmap-nav-link",
  "LinksHeader Simplified",
  "Footer Script",
  'href="/Articles/"',
  'href="/Models/"',
  ">Recent Articles<",
  ">Recent Models<",
]

if (existsSync(publicRoot)) {
  for (const file of renderedFiles(publicRoot)) {
    const output = readFileSync(file, "utf8")
    for (const forbidden of forbiddenOutput) {
      if (output.includes(forbidden)) {
        errors.push(`${file}: forbidden rendered output ${forbidden}`)
      }
    }
  }
}

if (existsSync(homepagePath)) {
  const homepage = readFileSync(homepagePath, "utf8")
  for (const required of [
    'aria-label="Primary navigation"',
    'href="./learn/"',
    'href="./diagnostic/"',
    'href="./cases/"',
  ]) {
    if (!homepage.includes(required)) {
      errors.push(`${homepagePath}: missing required navigation ${required}`)
    }
  }
}

if (existsSync(diagnosticPath)) {
  const diagnostic = readFileSync(diagnosticPath, "utf8")
  for (const required of ['id="decision-diagnostic"', 'data-version="0.1.0"']) {
    if (!diagnostic.includes(required)) {
      errors.push(`${diagnosticPath}: missing diagnostic element ${required}`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log("Rendered output checks passed")
