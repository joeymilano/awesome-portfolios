# Workflow files

Copy `validate.yml` into `.github/workflows/` in your fork.

It lives here rather than in `.github/workflows/` because publishing workflow
files needs a token with the `workflow` scope, which this repository was
created without. The content is exactly what you need.

## What it does

On every pull request touching `data/portfolios/`:

1. `npm run validate` — checks required fields, slug matching the filename,
   description length, known tags, duplicate URLs
2. `npm run build` — confirms the README still generates
3. `npm run build:site` — confirms the showcase site still generates

Steps 2 and 3 catch the case where a submission passes validation but breaks
generation, which is rare but very annoying to debug after merge.