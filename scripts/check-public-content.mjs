import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, extname, join, resolve } from "node:path"

const root = resolve("content")
const requiredFiles = [
  join(root, "index.md"),
  join(root, "privacy-policy.md"),
  join(root, "terms.md"),
  join(root, "about.md"),
  join(root, "diagnostic", "index.md"),
  join(root, "cases", "ic-simulation-01.md"),
]
const errors = []

for (const requiredFile of requiredFiles) {
  if (!existsSync(requiredFile)) {
    errors.push(`Missing required public page: ${requiredFile}`)
  }
}

function markdownFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory()
      ? markdownFiles(path)
      : extname(path) === ".md"
        ? [path]
        : []
  })
}

function removeAnchorAndQuery(value) {
  return value.split("#", 1)[0].split("?", 1)[0]
}

for (const file of markdownFiles(root)) {
  const source = readFileSync(file, "utf8")
  const links = source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)

  for (const match of links) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "")
    if (
      rawTarget === "" ||
      rawTarget.startsWith("#") ||
      /^(?:https?:|mailto:|tel:)/i.test(rawTarget)
    ) {
      continue
    }

    const target = decodeURIComponent(removeAnchorAndQuery(rawTarget))
    const absolute = resolve(dirname(file), target)
    const candidates = extname(absolute)
      ? [absolute]
      : [absolute, `${absolute}.md`, join(absolute, "index.md")]

    if (!candidates.some((candidate) => existsSync(candidate))) {
      errors.push(`${file}: unresolved Markdown link ${rawTarget}`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log("Public content checks passed")
