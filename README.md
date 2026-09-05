<div align="center">

# Awesome Portfolios

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=15&pause=1200&color=8B5CF6&center=true&vCenter=true&width=520&lines=Developer+%26+designer+portfolios;With+source+code+where+it+exists;One+JSON+file+per+entry;Your+pull+request+will+never+conflict" alt="" />

<br/>

[![Stars](https://img.shields.io/github/stars/MhmmdFaizal04/awesome-portfolios?style=for-the-badge&color=8b5cf6&labelColor=0d0d12&logo=github)](https://github.com/MhmmdFaizal04/awesome-portfolios/stargazers)
[![Portfolios](https://img.shields.io/badge/portfolios-8-8b5cf6?style=for-the-badge&labelColor=0d0d12)](#the-list)
[![Contributors](https://img.shields.io/github/contributors/MhmmdFaizal04/awesome-portfolios?style=for-the-badge&color=22d3ee&labelColor=0d0d12)](https://github.com/MhmmdFaizal04/awesome-portfolios/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-4ade80?style=for-the-badge&labelColor=0d0d12)](CONTRIBUTING.md)

<br/>

> A curated showcase of developer and designer portfolios â€” 4 of the
> 8 entries link to their source code.
>
> **Submitting yours takes about two minutes** and your pull request cannot
> conflict with anyone else's.

<br/>

[**Browse with filters**](https://mhmmdfaizal04.github.io/awesome-portfolios/site/) Â· [Submit yours](#submit-your-portfolio) Â· [Contributing](CONTRIBUTING.md)

</div>

---

<div align="center">
<img src="assets/previews/structure.svg" width="740" alt="One file per entry means pull requests never conflict" />
</div>

---

## Submit your portfolio

Two ways, both fine.

**Without touching git** â€” [open a submission issue](https://github.com/MhmmdFaizal04/awesome-portfolios/issues/new?template=submit-portfolio.yml).
Fill the form and a maintainer opens the pull request for you.

**With a pull request** â€” add one file:

```jsonc
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
```

That is the entire change. Do not edit this README â€” it is generated from
those files by `npm run build`.

Run `npm run validate` first if you have Node installed. It catches the
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

**8 portfolios** â€” `minimal` 4 Â· `animated` 3 Â· `3d` 1 Â· `interactive` 3 Â· `dark` 2 Â· `colorful` 2 Â· `illustrated` 1 Â· `experimental` 2 Â· `blog` 2 Â· `designer` 1 Â· `developer` 4

| Portfolio | What makes it notable | Stack | Style |
|-----------|----------------------|-------|-------|
| **[Brittany Chiang](https://brittanychiang.com)** Â· [source](https://github.com/bchiang7/v4) Â· [GitHub](https://github.com/bchiang7) | Restrained developer portfolio with a fixed sidebar, sharp typography, and one of the most forked layouts on GitHub. | `Gatsby` `React` `Styled Components` | minimal, dark, developer |
| **[Bruno Simon](https://bruno-simon.com)** Â· [source](https://github.com/brunosimon/folio-2019) Â· [GitHub](https://github.com/brunosimon) Â· [X](https://x.com/bruno_simon) | Portfolio as a drivable 3D world. You steer a car around the projects instead of scrolling past them. | `Three.js` `WebGL` `Cannon.js` | 3d, experimental, interactive |
| **[Cassie Evans](https://www.cassie.codes)** Â· [source](https://github.com/cassiecodes/cassie-codes-v2) Â· [GitHub](https://github.com/cassiecodes) Â· [X](https://x.com/cassiecodes) | SVG and motion work from a GSAP engineer, with animation used to explain rather than decorate. | `Gatsby` `GSAP` `SVG` | animated, illustrated, developer |
| **[Jhey Tompkins](https://jhey.dev)** Â· [GitHub](https://github.com/jh3y) Â· [X](https://x.com/jh3yy) | CSS demos pushed well past what most people think the language can do, all documented in the open. | `CSS` `GSAP` `JavaScript` | animated, experimental, colorful |
| **[Josh W. Comeau](https://www.joshwcomeau.com)** Â· [GitHub](https://github.com/joshwcomeau) Â· [X](https://x.com/JoshWComeau) | Playful, heavily interactive blog where nearly every article ships a custom widget that teaches the concept. | `Next.js` `React` `Framer Motion` | interactive, animated, blog, colorful |
| **[Lee Robinson](https://leerob.com)** Â· [source](https://github.com/leerob/site) Â· [GitHub](https://github.com/leerob) Â· [X](https://x.com/leeerob) | Content-first personal site that doubles as a reference implementation for the Next.js App Router. | `Next.js` `MDX` `Tailwind CSS` | minimal, blog, developer |
| **[Paco Coursey](https://paco.me)** Â· [GitHub](https://github.com/pacocoursey) Â· [X](https://x.com/pacocoursey) | Extremely spare personal site from the author of cmdk, where restraint is the entire design decision. | `Next.js` `MDX` | minimal, dark, developer |
| **[Rauno Freiberg](https://rauno.me)** Â· [GitHub](https://github.com/raunofreiberg) Â· [X](https://x.com/raunofreiberg) | Interface design studies with unusually precise attention to micro-interaction timing and easing. | `Next.js` `React` `CSS` | minimal, interactive, designer |

---

## Style tags

Tags describe how a portfolio *feels*. The stack field already covers what it
is built with.

`minimal` Â· `brutalist` Â· `animated` Â· `3d` Â· `interactive` Â· `typography` Â· `dark` Â· `colorful` Â· `illustrated` Â· `experimental` Â· `blog` Â· `designer` Â· `developer`

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

<a href="https://github.com/MhmmdFaizal04/awesome-portfolios/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MhmmdFaizal04/awesome-portfolios" alt="Contributors" />
</a>

<br/><br/>

Maintained by [MhmmdFaizal04](https://github.com/MhmmdFaizal04)

<sub>This file is generated. Edit `data/portfolios/`, not this.</sub>

</div>
