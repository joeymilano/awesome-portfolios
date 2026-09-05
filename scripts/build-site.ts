/**
 * Showcase site generator.
 *
 * Produces one self-contained HTML file with client-side filtering. No build
 * step, no framework, no assets — it can be served straight from GitHub Pages
 * and opened from disk.
 *
 *   npm run build:site
 */

import { writeFile } from 'node:fs/promises'
import { loadPortfolios } from './load.js'
import { TAGS, type Portfolio } from './types.js'

const REPO = 'MhmmdFaizal04/awesome-portfolios'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildSite(entries: Portfolio[]): string {
  const sorted = [...entries].sort((a, b) => {
    const byDate = b.added.localeCompare(a.added)
    return byDate !== 0 ? byDate : a.name.localeCompare(b.name)
  })

  const stacks = [...new Set(entries.flatMap((e) => e.stack))].sort()
  const usedTags = TAGS.filter((t) => entries.some((e) => e.tags.includes(t)))

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Awesome Portfolios — ${entries.length} developer &amp; designer portfolios</title>
<meta name="description" content="A curated showcase of ${entries.length} developer and designer portfolios, with source code where it exists."/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d0d12;--s1:#141419;--s2:#1c1c23;--bd:#26262f;--bd2:#35353f;
  --tx:#e8e8ef;--tx2:#9c9cb0;--tx3:#5a5a6e;--ac:#8b5cf6;--cy:#22d3ee;
}
html{scroll-behavior:smooth}
body{font-family:Inter,sans-serif;background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px}
a{color:inherit;text-decoration:none}
.mono{font-family:'JetBrains Mono',monospace}

header{position:sticky;top:0;z-index:50;background:rgba(13,13,18,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--bd)}
.hin{max-width:1180px;margin:0 auto;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:600}
.mark{width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,var(--ac),var(--cy))}
.ghb{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--tx2);padding:6px 13px;border:1px solid var(--bd2);border-radius:7px;background:var(--s2);transition:border-color .15s,color .15s}
.ghb:hover{border-color:var(--ac);color:var(--tx)}
.ghb svg{width:13px;height:13px;fill:var(--tx3)}

.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.hero{padding:56px 0 36px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--ac);margin-bottom:14px}
.eyebrow::before,.eyebrow::after{content:'';width:16px;height:1px;background:var(--ac);opacity:.4}
h1{font-size:clamp(30px,5vw,46px);font-weight:700;letter-spacing:-1.4px;line-height:1.08;margin-bottom:14px}
h1 em{font-style:normal;background:linear-gradient(120deg,var(--ac),var(--cy));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.lede{font-size:15.5px;color:var(--tx2);line-height:1.7;max-width:540px;margin-bottom:22px}
.cta{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500;color:#fff;padding:10px 20px;background:var(--ac);border-radius:8px;transition:opacity .15s,transform .15s}
.cta:hover{opacity:.88;transform:translateY(-1px)}

.filters{border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:18px 0;margin-bottom:28px}
.frow{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.frow:last-child{margin-bottom:0}
.flabel{font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--tx3);min-width:44px}
.search{flex:1;min-width:200px;font-family:Inter,sans-serif;font-size:13px;background:var(--s1);border:1px solid var(--bd);border-radius:8px;padding:8px 13px;color:var(--tx);outline:none;transition:border-color .15s}
.search:focus{border-color:var(--ac)}
.search::placeholder{color:var(--tx3)}
.chip{font-size:11.5px;font-weight:500;font-family:Inter,sans-serif;padding:4px 11px;border-radius:99px;border:1px solid var(--bd);background:transparent;color:var(--tx2);cursor:pointer;transition:all .15s}
.chip:hover{border-color:var(--bd2);color:var(--tx)}
.chip.on{background:var(--ac);border-color:var(--ac);color:#fff}
.count{font-size:12px;color:var(--tx3);margin-left:auto}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;padding-bottom:56px}
.card{background:var(--s1);border:1px solid var(--bd);border-radius:12px;padding:18px;display:flex;flex-direction:column;transition:border-color .2s,transform .2s}
.card:hover{border-color:var(--bd2);transform:translateY(-2px)}
.ctop{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:7px}
.cname{font-size:15px;font-weight:600;letter-spacing:-.2px}
.cname:hover{color:var(--ac)}
.cloc{font-size:11px;color:var(--tx3);white-space:nowrap}
.cdesc{font-size:13px;color:var(--tx2);line-height:1.6;margin-bottom:14px;flex:1}
.cstack{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}
.st{font-family:'JetBrains Mono',monospace;font-size:10px;padding:2px 7px;border-radius:4px;background:var(--s2);color:var(--tx2)}
.ctags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px}
.tg{font-size:10px;padding:2px 8px;border-radius:99px;background:rgba(139,92,246,.12);color:#a78bfa}
.cfoot{display:flex;gap:12px;padding-top:12px;border-top:1px solid var(--bd)}
.cfoot a{font-size:11.5px;color:var(--tx3);transition:color .15s}
.cfoot a:hover{color:var(--ac)}

.empty{grid-column:1/-1;padding:56px 0;text-align:center;color:var(--tx3);font-size:14px}

footer{border-top:1px solid var(--bd);padding:32px 24px;text-align:center}
footer p{font-size:12.5px;color:var(--tx3)}
footer a{color:var(--ac)}
</style>
</head>
<body>

<header>
  <div class="hin">
    <a href="#" class="brand"><span class="mark"></span>Awesome Portfolios</a>
    <a href="https://github.com/${REPO}" class="ghb" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      Star
    </a>
  </div>
</header>

<div class="wrap">
  <div class="hero">
    <div class="eyebrow">${entries.length} portfolios · ${entries.filter((e) => e.source).length} with source</div>
    <h1>Portfolios worth<br><em>stealing from.</em></h1>
    <p class="lede">Developer and designer portfolios, with links to the source code where it is public. Filter by stack or by how the thing actually feels.</p>
    <a href="https://github.com/${REPO}/issues/new?template=submit-portfolio.yml" class="cta" target="_blank" rel="noopener">Submit yours</a>
  </div>

  <div class="filters">
    <div class="frow">
      <span class="flabel">Search</span>
      <input type="text" class="search" id="q" placeholder="Name, stack, or description..."/>
      <span class="count" id="count"></span>
    </div>
    <div class="frow">
      <span class="flabel">Style</span>
      <div id="tags" style="display:flex;gap:6px;flex-wrap:wrap"></div>
    </div>
    <div class="frow">
      <span class="flabel">Stack</span>
      <div id="stacks" style="display:flex;gap:6px;flex-wrap:wrap"></div>
    </div>
  </div>

  <div class="grid" id="grid"></div>
</div>

<footer>
  <p>CC0 · Listed portfolios belong to their authors · <a href="https://github.com/${REPO}" target="_blank" rel="noopener">Source</a></p>
</footer>

<script>
const DATA = ${JSON.stringify(sorted)};
const TAGS = ${JSON.stringify(usedTags)};
const STACKS = ${JSON.stringify(stacks)};

let activeTags = new Set();
let activeStacks = new Set();
let query = '';

function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function social(e){
  if(!e.social) return '';
  const out=[];
  if(e.social.github)   out.push(\`<a href="https://github.com/\${e.social.github}" target="_blank" rel="noopener">GitHub</a>\`);
  if(e.social.twitter)  out.push(\`<a href="https://x.com/\${e.social.twitter}" target="_blank" rel="noopener">X</a>\`);
  if(e.social.dribbble) out.push(\`<a href="https://dribbble.com/\${e.social.dribbble}" target="_blank" rel="noopener">Dribbble</a>\`);
  return out.join('');
}

function card(e){
  return \`<article class="card">
    <div class="ctop">
      <a class="cname" href="\${e.url}" target="_blank" rel="noopener">\${esc(e.name)}</a>
      \${e.location ? \`<span class="cloc">\${esc(e.location)}</span>\` : ''}
    </div>
    <p class="cdesc">\${esc(e.description)}</p>
    <div class="cstack">\${e.stack.map(s=>\`<span class="st">\${esc(s)}</span>\`).join('')}</div>
    <div class="ctags">\${e.tags.map(t=>\`<span class="tg">\${esc(t)}</span>\`).join('')}</div>
    <div class="cfoot">
      <a href="\${e.url}" target="_blank" rel="noopener">Visit site</a>
      \${e.source ? \`<a href="\${e.source}" target="_blank" rel="noopener">Source</a>\` : ''}
      \${social(e)}
    </div>
  </article>\`;
}

function render(){
  const q = query.toLowerCase();

  const shown = DATA.filter(e=>{
    // Tags are OR within the group: picking "minimal" and "3d" shows either,
    // which is what people expect from a browse filter.
    if(activeTags.size && !e.tags.some(t=>activeTags.has(t))) return false;
    if(activeStacks.size && !e.stack.some(s=>activeStacks.has(s))) return false;
    if(!q) return true;

    return (e.name+' '+e.description+' '+e.stack.join(' ')+' '+e.tags.join(' ')+' '+(e.location||''))
      .toLowerCase().includes(q);
  });

  document.getElementById('grid').innerHTML =
    shown.length ? shown.map(card).join('') : '<div class="empty">Nothing matches those filters.</div>';

  document.getElementById('count').textContent =
    shown.length === DATA.length ? \`\${DATA.length} portfolios\` : \`\${shown.length} of \${DATA.length}\`;
}

function chips(el, items, active){
  document.getElementById(el).innerHTML =
    items.map(i=>\`<button class="chip" data-v="\${esc(i)}">\${esc(i)}</button>\`).join('');

  document.getElementById(el).addEventListener('click', ev=>{
    const btn = ev.target.closest('.chip');
    if(!btn) return;
    const v = btn.dataset.v;
    if(active.has(v)) active.delete(v); else active.add(v);
    btn.classList.toggle('on');
    render();
  });
}

chips('tags', TAGS, activeTags);
chips('stacks', STACKS, activeStacks);

document.getElementById('q').addEventListener('input', ev=>{
  query = ev.target.value;
  render();
});

render();
</script>
</body>
</html>
`
}

async function main(): Promise<void> {
  const entries = await loadPortfolios()
  await writeFile('site/index.html', buildSite(entries), 'utf-8')

  console.log('')
  console.log(`  ✓ site/index.html generated from ${entries.length} entries`)
  console.log('')
}

void main()

