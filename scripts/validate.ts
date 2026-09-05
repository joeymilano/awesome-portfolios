/**
 * Submission validator.
 *
 * Runs in CI on every pull request. The point is not gatekeeping — it is
 * giving the contributor a precise, immediate answer instead of a review
 * comment three days later saying "please fix the description length".
 *
 *   npm run validate
 */

import { readFile } from 'node:fs/promises'
import { join, basename } from 'node:path'
import { DATA_DIR, listEntryFiles } from './load.js'
import { TAGS, LIMITS, REQUIRED_FIELDS, type Portfolio, type PortfolioTag } from './types.js'


interface Problem {
  file: string
  message: string
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Sequences that only appear when UTF-8 has been decoded as Windows-1252 and
 * re-encoded — the classic double-encoding corruption.
 *
 * `—` becomes `â€"`, `·` becomes `Â·`, and so on. It renders as visible
 * garbage on GitHub but is easy to miss locally, because most editors display
 * the file without complaint.
 *
 * Worth checking in CI: it is one line to detect and genuinely unpleasant to
 * find by eye across two hundred entries.
 */
const MOJIBAKE = /Â[\s\u00A0]|â€|Ã[©¢«»]/

function findMojibake(text: string): boolean {
  return MOJIBAKE.test(text)
}


function isHttps(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function validateEntry(
  file: string,
  raw: unknown,
  seenSlugs: Map<string, string>,
  seenUrls: Map<string, string>,
): Problem[] {
  const problems: Problem[] = []
  const add = (message: string) => problems.push({ file, message })

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return [{ file, message: 'must be a JSON object' }]
  }

  const entry = raw as Partial<Portfolio>

  // ── required fields ──
  for (const field of REQUIRED_FIELDS) {
    if (entry[field] === undefined || entry[field] === null) {
      add(`missing required field "${field}"`)
    }
  }

  // ── slug ──
  const expectedSlug = basename(file, '.json')
  if (typeof entry.slug === 'string') {
    if (!SLUG_PATTERN.test(entry.slug)) {
      add(`slug "${entry.slug}" must be lowercase words joined by hyphens`)
    }
    // The filename is the identity. Letting them drift means the generated
    // README links to one thing and the file says another.
    if (entry.slug !== expectedSlug) {
      add(`slug "${entry.slug}" does not match filename "${expectedSlug}.json"`)
    }

    const duplicate = seenSlugs.get(entry.slug)
    if (duplicate) add(`slug "${entry.slug}" already used by ${duplicate}`)
    else seenSlugs.set(entry.slug, file)
  }

  // ── name ──
  if (typeof entry.name === 'string' && entry.name.trim().length < 2) {
    add('name is too short')
  }

  // ── url ──
  if (typeof entry.url === 'string') {
    if (!isHttps(entry.url)) {
      add(`url "${entry.url}" must be a valid https:// address`)
    }

    // Same site submitted twice under different names.
    const normalised = entry.url.replace(/\/+$/, '').toLowerCase()
    const duplicate = seenUrls.get(normalised)
    if (duplicate) add(`url already listed in ${duplicate}`)
    else seenUrls.set(normalised, file)
  }

  // ── source ──
  if (entry.source !== undefined && !isHttps(entry.source)) {
    add(`source "${entry.source}" must be a valid https:// address`)
  }

  // ── description ──
  if (typeof entry.description === 'string') {
    const length = entry.description.trim().length

    if (length < LIMITS.descriptionMin) {
      add(`description is ${length} characters, minimum ${LIMITS.descriptionMin}`)
    }
    if (length > LIMITS.descriptionMax) {
      add(`description is ${length} characters, maximum ${LIMITS.descriptionMax}`)
    }

    // "A portfolio website" tells a reader nothing. The description is the
    // only thing distinguishing one entry from the next in a long list.
    if (/^(a |an |my |the )?(personal |developer |designer )?(portfolio|website|site)\.?$/i.test(entry.description.trim())) {
      add('description is too generic — say what makes this portfolio distinct')
    }
  }

  // ── stack ──
  if (Array.isArray(entry.stack)) {
    if (entry.stack.length < LIMITS.stackMin) add('stack needs at least one entry')
    if (entry.stack.length > LIMITS.stackMax) {
      add(`stack has ${entry.stack.length} entries, maximum ${LIMITS.stackMax}`)
    }
    if (entry.stack.some((s) => typeof s !== 'string' || !s.trim())) {
      add('stack entries must be non-empty strings')
    }
  }

  // ── tags ──
  if (Array.isArray(entry.tags)) {
    if (entry.tags.length < LIMITS.tagsMin) add('tags needs at least one entry')
    if (entry.tags.length > LIMITS.tagsMax) {
      add(`tags has ${entry.tags.length} entries, maximum ${LIMITS.tagsMax}`)
    }

    const allowed = new Set<string>(TAGS)
    for (const tag of entry.tags) {
      if (!allowed.has(tag as string)) {
        add(`unknown tag "${String(tag)}" — allowed: ${TAGS.join(', ')}`)
      }
    }
  }

  // ── added ──
  if (typeof entry.added === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(entry.added)) {
    add(`added "${entry.added}" must be a date in YYYY-MM-DD form`)
  }

  // ── social ──
  if (entry.social !== undefined) {
    if (typeof entry.social !== 'object' || entry.social === null) {
      add('social must be an object')
    } else {
      for (const [platform, handle] of Object.entries(entry.social)) {
        if (typeof handle !== 'string') continue
        // Handles, not URLs — the generator builds the links.
        if (handle.includes('/') || handle.startsWith('@')) {
          add(`social.${platform} should be a bare handle, not a URL or @mention`)
        }
      }
    }
  }

  return problems
}

async function main(): Promise<void> {
  let files: string[]
  try {
    files = await listEntryFiles()
  } catch {
    console.error(`\n  Cannot read ${DATA_DIR}\n`)
    process.exit(1)
  }

  const problems: Problem[] = []
  const seenSlugs = new Map<string, string>()
  const seenUrls = new Map<string, string>()

  for (const file of files) {
    let parsed: unknown
    try {
      parsed = JSON.parse(await readFile(join(DATA_DIR, file), 'utf-8'))
    } catch (error) {
      problems.push({
        file,
        message: `invalid JSON — ${error instanceof Error ? error.message : 'parse failed'}`,
      })
      continue
    }

    problems.push(...validateEntry(file, parsed, seenSlugs, seenUrls))
  }

  // Encoding check across every data file, separate from field validation.
  for (const file of files) {
    const text = await readFile(join(DATA_DIR, file), 'utf-8')
    if (findMojibake(text)) {
      problems.push({
        file,
        message:
          'text looks double-encoded (UTF-8 read as Windows-1252). ' +
          'Save the file as UTF-8 without a BOM.',
      })
    }
  }

  console.log('')

  if (problems.length === 0) {
    console.log(`  ✓ ${files.length} entries, all valid`)
    console.log('')
    return
  }

  // Grouped by file, because a contributor cares about their own file.
  const byFile = new Map<string, string[]>()
  for (const p of problems) {
    ;(byFile.get(p.file) ?? byFile.set(p.file, []).get(p.file)!).push(p.message)
  }

  console.log(`  ✗ ${problems.length} problem(s) in ${byFile.size} file(s)`)
  console.log('')

  for (const [file, messages] of byFile) {
    console.log(`  ${file}`)
    for (const message of messages) console.log(`    · ${message}`)
    console.log('')
  }

  console.log('  See CONTRIBUTING.md for the expected shape.')
  console.log('')
  process.exit(1)
}

void main()

