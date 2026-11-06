/* Ticks CONTENT.md against the build: every `- [ ] "text"` line is looked up
   in the visible text of _site/ (HTML with tags stripped and entities decoded,
   plus attribute values, plus the JS that prints terminal output). Found ->
   [x], missing -> [ ]. Lines marked [~] are left alone. Exit 1 if any miss. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? (f === 'imgs' || f === 'fonts' ? [] : walk(p)) : [p];
});

const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&mdash;/g, '—')
  .replace(/&middot;/g, '·').replace(/&amp;/g, '&');
const norm = (s) => decode(s).replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\'/g, "'").replace(/\s+/g, ' ');

let corpus = '';
for (const f of walk('_site')) {
  const raw = readFileSync(f, 'utf8');
  if (f.endsWith('.html')) {
    const attrs = [...raw.matchAll(/(?:alt|aria-label|placeholder|content|title)="([^"]*)"/g)].map((m) => m[1]);
    const title = (raw.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1];
    corpus += '\n' + norm(raw.replace(/<script[\s\S]*?<\/script>/g, (m) => m.includes('ld+json') ? '' : m)
      .replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '')) + '\n' + attrs.map(norm).join('\n') + '\n' + norm(title);
  } else if (f.endsWith('.js')) corpus += '\n' + norm(raw);
}

let missing = 0, found = 0;
const out = readFileSync('CONTENT.md', 'utf8').split('\n').map((line) => {
  const m = line.match(/^- \[( |x)\] "(.+?)"(?= —| \/|$)/);
  if (!m) return line;
  const ok = corpus.includes(norm(m[2]));
  ok ? found++ : (missing++, console.log('MISSING:', m[2]));
  return line.replace(/^- \[( |x)\]/, ok ? '- [x]' : '- [ ]');
}).join('\n');
writeFileSync('CONTENT.md', out);
console.log(`[content] ${found} found, ${missing} missing`);
process.exit(missing ? 1 : 0);
