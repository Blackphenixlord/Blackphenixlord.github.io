/* Generate the responsive derivatives every <picture> on the site expects.
 *
 *   1. Drop a full-size image in src/imgs/_src/
 *   2. npm run images
 *   3. Reference it by base name (no extension, no size suffix)
 *
 * Existing derivatives are skipped unless --force, so re-running is cheap.
 * Uses sharp if it is installed; otherwise it prints the one command needed
 * rather than silently doing nothing.
 */
import { readdir, mkdir, access, writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const SRC = 'src/imgs/_src';
const OUT = 'src/imgs';
const WIDTHS = [400, 800];
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);
const force = process.argv.includes('--force');

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.error(
    'This needs sharp, which is not installed.\n\n' +
    '  npm install --save-dev sharp\n\n' +
    'Then run `npm run images` again.'
  );
  process.exit(1);
}

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => EXTS.has(extname(f).toLowerCase()));

if (!files.length) {
  console.log(`No source images in ${SRC}/ — nothing to do.`);
  process.exit(0);
}

const manifest = {};
let made = 0, skipped = 0;

for (const file of files) {
  const name = basename(file, extname(file));
  const input = join(SRC, file);
  const image = sharp(input).rotate();            // honour EXIF orientation
  const meta = await image.metadata();
  const steps = [];

  for (const w of WIDTHS) {
    if (w > meta.width && steps.length) continue;  // never upscale past source
    const target = Math.min(w, meta.width);
    const height = Math.round((meta.height * target) / meta.width);
    steps.push([w, target, height]);

    for (const [ext, opts] of [['avif', { quality: 58 }], ['webp', { quality: 80 }]]) {
      const out = join(OUT, `${name}-${w}.${ext}`);
      if (!force && await exists(out)) { skipped++; continue; }
      await image.clone().resize(target)[ext](opts).toFile(out);
      made++;
    }
  }

  // One fallback at the largest step, for browsers without AVIF or WebP.
  const [fw, ftw] = steps[steps.length - 1];
  const fallback = join(OUT, `${name}-${fw}.jpg`);
  if (force || !(await exists(fallback))) {
    await image.clone().resize(ftw).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(fallback);
    made++;
  } else skipped++;

  manifest[name] = { orig: [meta.width, meta.height], steps, fallback: [fw, 'jpg'] };
}

await writeFile(join(SRC, 'manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`${files.length} sources · ${made} derivatives written, ${skipped} already current`);
