/**
 * README generator.
 *
 * The README is a build artefact. Nobody edits it by hand, which is precisely
 * why hundreds of open pull requests can coexist without conflicting.
 *
 *   npm run build
 */

import { writeFile } from 'node:fs/promises'
import { loadPortfolios } from './load.js'
import { TAGS, type Portfolio } from './types.js'

const REPO = 'MhmmdFaizal04/awesome-portfolios'
const SITE = 'https://mhmmdfaizal04.github.io/awesome-portfolios/site/'

function socialLinks(entry: Portfolio): string {
  if (!entry.social) return ''

  const links: string[] = []
  const { github, twitter, linkedin, dribbble } = entry.social

  if (github)   links.push(`[GitHub](https://github.com/${github})`)
  if (twitter)  links.push(`[X](https://x.com/${twitter})`)
  if (linkedin) links.push(`[LinkedIn](https://linkedin.com/in/${linkedin})`)
  if (dribbble) links.push(`[Dribbble](https://dribbble.com/${dribbble})`)

  return links.join(' Â· ')
}

function renderRow(entry: Portfolio): string {
  const name = `**[${entry.name}](${entry.url})**`
  const source = entry.source ? ` Â· [source](${entry.source})` : ''
  const social = socialLinks(entry)
  const socialCell = social ? ` Â· ${social}` : ''

  const stack = entry.stack.map((s) => `\`${s}\``).join(' ')
  const tags = entry.tags.join(', ')

  return `| ${name}${source}${socialCell} | ${entry.description} | ${stack} | ${tags} |`
}

function renderTable(entries: Portfolio[]): string {
  return [
    '| Portfolio | What makes it notable | Stack | Style |',
    '|-----------|----------------------|-------|-------|',
    ...entries.map(renderRow),
  ].join('\n')
}

function renderTagIndex(entries: Portfolio[]): string {
  const counts = new Map<string, number>()

  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return TAGS
    .filter((tag) => counts.has(tag))
    .map((tag) => `\`${tag}\` ${counts.get(tag)}`)
    .join(' Â· ')
}

function buildReadme(entries: Portfolio[]): string {
  // Newest first, so a fresh contributor sees their entry at the top of the
  // table rather than buried alphabetically on page three.
  const sorted = [...entries].sort((a, b) => {
    const byDate = b.added.localeCompare(a.added)
    return byDate !== 0 ? byDate : a.name.localeCompare(b.name)
  })

  const withSource = entries.filter((e) => e.source).length

  return `<div align="center">

# Awesome Portfolios

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=15&pause=1200&color=8B5CF6&center=true&vCenter=true&width=520&lines=Developer+%26+designer+portfolios;With+source+code+where+it+exists;One+JSON+file+per+entry;Your+pull+request+will+never+conflict" alt="" />

<br/>

[![Stars](https://img.shields.io/github/stars/${REPO}?style=for-the-badge&color=8b5cf6&labelColor=0d0d12&logo=github)](https://github.com/${REPO}/stargazers)
[![Portfolios](https://img.shields.io/badge/portfolios-${entries.length}-8b5cf6?style=for-the-badge&labelColor=0d0d12)](#the-list)
[![Contributors](https://img.shields.io/github/contributors/${REPO}?style=for-the-badge&color=22d3ee&labelColor=0d0d12)](https://github.com/${REPO}/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-4ade80?style=for-the-badge&labelColor=0d0d12)](CONTRIBUTING.md)

<br/>

> A curated showcase of developer and designer portfolios â€” ${withSource} of the
> ${entries.length} entries link to their source code.
>
> **Submitting yours takes about two minutes** and your pull request cannot
> conflict with anyone else's.

<br/>

[**Browse with filters**](${SITE}) Â· [Submit yours](#submit-your-portfolio) Â· [Contributing](CONTRIBUTING.md)

</div>

---

<div align="center">
<img src="assets/previews/structure.svg" width="740" alt="One file per entry means pull requests never conflict" />
</div>

---

## Submit your portfolio

Two ways, both fine.

**Without touching git** â€” [open a submission issue](https://github.com/${REPO}/issues/new?template=submit-portfolio.yml).
Fill the form and a maintainer opens the pull request for you.

**With a pull request** â€” add one file:

\`\`\`jsonc
// data/portfolios/your-name.json
{
  "slug": "your-name",
  "name": "Your Name",
  "url": "https://your-site.com",
  "source": "https://github.com/you/your-site",
  "description": "One sentence on what makes it distinct. Not 'my portfolio'.",
  "stack": ["Next.js", "Tailwind CSS"],
  "tags": ["minimal", "developer"],
  "location": "Jakarta, Indonesia",
  "social": { "github": "yourhandle" },
  "added": "2026-01-20"
}
\`\`\`

That is the entire change. Do not edit this README â€” it is generated from
those files by \`npm run build\`.

Run \`npm run validate\` first if you have Node installed. It catches the
common mistakes in a second, which is faster than waiting for a review.

---

## Why one file per entry

Most awesome lists have everyone append to a single README. With fifty open
pull requests that means fifty merge conflicts, and the maintainer spends
their time resolving them instead of reviewing.

One file per entry cannot conflict. That is the only structural decision here
and it is the reason this list can absorb contributions faster than it can
review them.

---

## The list

**${entries.length} portfolios** â€” ${renderTagIndex(entries)}

${renderTable(sorted)}

---

## Style tags

Tags describe how a portfolio *feels*. The stack field already covers what it
is built with.

${TAGS.map((t) => `\`${t}\``).join(' Â· ')}

The list is closed on purpose. Free-form tags drift into fifty synonyms for
"clean" within a month and the filters stop being useful. If something genuinely
does not fit, open an issue and we will discuss adding it.

---

## Removal

If your portfolio is listed and you would rather it were not, open an issue or
email the maintainer. It comes down the same day, no questions asked.

---

## Licence

[CC0 1.0](LICENSE) â€” public domain. The listed portfolios belong to their
respective authors.

---

<div align="center">

<a href="https://github.com/${REPO}/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=${REPO}" alt="Contributors" />
</a>

<br/><br/>

Maintained by [MhmmdFaizal04](https://github.com/MhmmdFaizal04)

<sub>This file is generated. Edit \`data/portfolios/\`, not this.</sub>

</div>
`
}

async function main(): Promise<void> {
  const entries = await loadPortfolios()
  await writeFile('README.md', buildReadme(entries), 'utf-8')

  console.log('')
  console.log(`  âœ“ README.md generated from ${entries.length} entries`)
  console.log('')
}

void main()

