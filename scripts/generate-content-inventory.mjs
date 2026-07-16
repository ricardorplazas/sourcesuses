import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { extname, relative, resolve } from "node:path"

const root = resolve("content")
const output = resolve("validation/content-inventory.csv")

function files(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = resolve(directory, entry)
    return statSync(path).isDirectory() ? files(path) : extname(path) === ".md" ? [path] : []
  })
}

function escape(value) {
  const text = String(value ?? "")
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function frontmatter(source) {
  const block = source.match(/^---\n([\s\S]*?)\n---/u)?.[1] ?? ""
  return Object.fromEntries(
    block
      .split("\n")
      .map((line) => line.match(/^([a-zA-Z0-9_-]+):\s*["']?(.*?)["']?$/u))
      .filter(Boolean)
      .map((match) => [match[1], match[2]]),
  )
}

const rows = files(root)
  .sort()
  .map((file) => {
    const path = relative(root, file)
    const metadata = frontmatter(readFileSync(file, "utf8"))
    const legacy = path.startsWith("Notes/")
    return [
      `/${path.replace(/\.md$/u, "").replace(/\/index$/u, "/")}`,
      metadata.title ?? path.replace(/\.md$/u, ""),
      legacy ? "glossary-awareness" : "declared-in-page",
      legacy ? "awareness" : "validation-funnel",
      legacy ? "review-required" : "keep",
      metadata.cta ?? "none",
      legacy ? "Accuracy/source review required before promotion" : "Phase 1 authored or reviewed",
      "2026-07-16",
    ]
  })

const header = [
  "url",
  "title",
  "search_intent",
  "customer_stage",
  "decision",
  "primary_cta",
  "review_status",
  "review_date",
]
writeFileSync(output, `${[header, ...rows].map((row) => row.map(escape).join(",")).join("\n")}\n`)
console.log(`Wrote ${rows.length} content inventory rows to ${output}`)
