/**
 * The portfolio entry shape.
 *
 * Each submission is one file in `data/portfolios/`, named after its slug.
 *
 * That structure is the whole reason this repository can take hundreds of
 * contributions without friction. The usual awesome-list pattern — everyone
 * appending to one README — means every open pull request conflicts with
 * every other one. Fifty submissions produce fifty conflicts, the maintainer
 * spends their time resolving them instead of reviewing, and the queue stalls.
 *
 * One file per entry cannot conflict. The README is generated from these
 * files, never edited by hand.
 */

export interface Portfolio {
  /** Lowercase, hyphenated. Must match the filename. */
  slug: string

  /** Display name of the person. */
  name: string

  /** Live site. Must be https and reachable. */
  url: string

  /** Source repository, if it is public. This is what people come here for. */
  source?: string

  /** One sentence. What makes this portfolio worth looking at. */
  description: string

  /** Main technologies. Keep it to what is actually notable. */
  stack: string[]

  /** Visual character. Used by the site filters. */
  tags: PortfolioTag[]

  /** Where the person is based. Optional. */
  location?: string

  /** Social handles, without the @ or URL prefix. */
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
    dribbble?: string
  }

  /** Screenshot path under `assets/screenshots/`, or an external URL. */
  screenshot?: string

  /** ISO date the entry was added. Set by the submitter. */
  added: string
}

/**
 * Tags describe how a portfolio *feels*, not what it is built with — the
 * stack field already covers that.
 *
 * Kept to a closed list on purpose. Free-form tags drift into fifty synonyms
 * for "clean" within a month and the filters stop being useful.
 */
export const TAGS = [
  'minimal',
  'brutalist',
  'animated',
  '3d',
  'interactive',
  'typography',
  'dark',
  'colorful',
  'illustrated',
  'experimental',
  'blog',
  'designer',
  'developer',
] as const

export type PortfolioTag = (typeof TAGS)[number]

/** Fields every entry must have. */
export const REQUIRED_FIELDS = [
  'slug',
  'name',
  'url',
  'description',
  'stack',
  'tags',
  'added',
] as const satisfies readonly (keyof Portfolio)[]

export const LIMITS = {
  descriptionMin: 20,
  descriptionMax: 160,
  stackMin: 1,
  stackMax: 8,
  tagsMin: 1,
  tagsMax: 5,
} as const
