# Contributing

Adding a portfolio takes about two minutes and touches exactly one file.

---

## The short version

Create `data/portfolios/your-slug.json`:

```json
{
  "slug": "your-slug",
  "name": "Your Name",
  "url": "https://your-site.com",
  "source": "https://github.com/you/your-site",
  "description": "One sentence on what makes it distinct.",
  "stack": ["Next.js", "Tailwind CSS"],
  "tags": ["minimal", "developer"],
  "location": "Jakarta, Indonesia",
  "social": { "github": "yourhandle" },
  "added": "2026-01-20"
}
```

Open a pull request. That is the whole thing.

**Do not edit `README.md` or `site/index.html`.** Both are generated from the
JSON files. Editing them by hand is what creates the merge conflicts this
structure exists to avoid.

---

## No git? Use the form

[Open a submission issue](../../issues/new?template=submit-portfolio.yml),
fill it in, and a maintainer opens the pull request for you.

---

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | yes | Lowercase, hyphenated. **Must match the filename.** |
| `name` | yes | How you want to be credited |
| `url` | yes | Live site, `https://` |
| `source` | no | Public repository. The main reason people browse this list |
| `description` | yes | 20–160 characters. See below |
| `stack` | yes | 1–8 entries |
| `tags` | yes | 1–5, from the closed list below |
| `location` | no | Free text |
| `social` | no | Bare handles, not URLs |
| `added` | yes | `YYYY-MM-DD` |

### On the description

This is the field that gets submissions rejected, so it is worth reading twice.

The validator refuses anything matching "my portfolio", "personal website", and
similar. Not to be difficult — a list of two hundred entries all described as
"my portfolio" is a list nobody can use.

Say what someone would come to look at:

```
✗  My personal portfolio website
✗  A developer portfolio built with Next.js
✗  Portfolio site

✓  Case studies laid out as annotated timelines, with design decisions
   shown alongside outcomes.
✓  Portfolio as a drivable 3D world — you steer a car around the projects
   instead of scrolling past them.
✓  Extremely spare, where restraint is the entire design decision.
```

### Style tags

Tags describe how the site *feels*. `stack` already covers what it is built
with.

```
minimal  ·  brutalist  ·  animated  ·  3d  ·  interactive  ·  typography
dark  ·  colorful  ·  illustrated  ·  experimental  ·  blog
designer  ·  developer
```

The list is closed on purpose. Free-form tags become fifty synonyms for
"clean" within a month and the filters stop working. If something genuinely
does not fit, open an issue.

---

## Check your work first

If you have Node installed:

```bash
npm install
npm run validate
```

One second, and it catches the common mistakes — slug not matching the
filename, description too short, unknown tag, duplicate URL. Faster than
waiting for a review.

To see the generated output:

```bash
npm run check    # validate, then rebuild README and site
```

Both regenerated files will show as modified. **Do not commit them** — a
maintainer regenerates on merge. Committing them is what reintroduces
conflicts.

---

## What gets accepted

Anything real. There is no quality bar on the design itself — a plain HTML
portfolio that loads in 200ms belongs here as much as a WebGL showpiece.

What gets rejected:

- Sites that do not load, or are behind a login
- Agency or company sites — this is for individuals
- Link farms and SEO pages dressed as portfolios
- Generic descriptions, as above

---

## Removal

Listed and would rather not be? Open an issue. It comes down the same day, no
questions asked, no explanation needed.

---

## Why one file per entry

Most awesome lists have everyone append to one README. With fifty open pull
requests that means fifty merge conflicts, and the maintainer spends their time
resolving them instead of reviewing.

One file per entry cannot conflict. It is the only structural decision in this
repository and it is the reason your pull request will still apply cleanly a
month from now.
