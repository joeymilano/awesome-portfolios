/**
 * Loading portfolio entries from disk.
 *
 * Separated from the validator so scripts can import it without triggering a
 * validation run. The alternative — guarding `main()` with an
 * `import.meta.url === process.argv[1]` check — is fragile across platforms
 * and fails silently when it gets the comparison wrong, which is the worst
 * possible failure mode for a build script.
 */

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Portfolio } from './types.js'

export const DATA_DIR = 'data/portfolios'

/** JSON filenames in the data directory, sorted. */
export async function listEntryFiles(dir = DATA_DIR): Promise<string[]> {
  const files = await readdir(dir)
  return files.filter((f) => f.endsWith('.json')).sort()
}

/** Every valid entry. Throws on malformed JSON — run validate first. */
export async function loadPortfolios(dir = DATA_DIR): Promise<Portfolio[]> {
  const files = await listEntryFiles(dir)

  const entries: Portfolio[] = []
  for (const file of files) {
    const text = await readFile(join(dir, file), 'utf-8')
    entries.push(JSON.parse(text) as Portfolio)
  }

  return entries
}
