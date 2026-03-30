/**
 * BugZero Favicon Generator
 * Converts /public/favicon.svg into all required PNG and ICO sizes.
 *
 * Usage:
 *   npm run generate-favicons
 *   (or: node scripts/generate-favicons.js)
 *
 * Requires:
 *   sharp   →  npm install sharp --save-dev
 *   to-ico  →  npm install to-ico --save-dev
 *
 * Output files (all in /public):
 *   favicon-16x16.png
 *   favicon-32x32.png
 *   favicon-48x48.png
 *   apple-touch-icon.png       (180x180)
 *   android-chrome-192x192.png
 *   android-chrome-512x512.png
 *   favicon.ico                (proper multi-size ICO: 16 + 32 + 48 embedded)
 *   logo.png                   (512x512 — used in JSON-LD Organization schema)
 *   og-logo.png                (300x300 — supplemental OG branding)
 */

const path = require('path');
const fs   = require('fs');

let sharp, toIco;
try {
  sharp = require('sharp');
} catch {
  console.error('\n❌  sharp not found. Run: npm install sharp --save-dev\n');
  process.exit(1);
}
try {
  toIco = require('to-ico');
} catch {
  console.error('\n❌  to-ico not found. Run: npm install to-ico --save-dev\n');
  process.exit(1);
}

const SVG_SOURCE = path.join(__dirname, '../public/favicon.svg');
const OUT_DIR    = path.join(__dirname, '../public');

if (!fs.existsSync(SVG_SOURCE)) {
  console.error(`❌  SVG source not found at ${SVG_SOURCE}`);
  process.exit(1);
}

const BG = { r: 0, g: 13, b: 26, alpha: 1 };

const SIZES = [
  { name: 'favicon-16x16.png',          size: 16  },
  { name: 'favicon-32x32.png',          size: 32  },
  { name: 'favicon-48x48.png',          size: 48  },
  { name: 'apple-touch-icon.png',       size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'logo.png',                   size: 512 },
  { name: 'og-logo.png',                size: 300 },
];

async function resizePng(svgBuffer, size) {
  return sharp(svgBuffer)
    .resize(size, size, { fit: 'contain', background: BG })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function generateFavicons() {
  console.log('\n🔧  BugZero Favicon Generator\n');

  const svgBuffer = fs.readFileSync(SVG_SOURCE);

  // ── Individual PNG files ─────────────────────────────────────────────────
  for (const { name, size } of SIZES) {
    const buf = await resizePng(svgBuffer, size);
    fs.writeFileSync(path.join(OUT_DIR, name), buf);
    console.log(`  ✅  ${name.padEnd(34)} (${size}×${size})`);
  }

  // ── favicon.ico — proper multi-size ICO (16 + 32 + 48 embedded) ─────────
  const [png16, png32, png48] = await Promise.all([
    resizePng(svgBuffer, 16),
    resizePng(svgBuffer, 32),
    resizePng(svgBuffer, 48),
  ]);
  const icoBuffer = await toIco([png16, png32, png48]);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), icoBuffer);
  console.log(`  ✅  ${'favicon.ico'.padEnd(34)} (multi-size: 16 + 32 + 48)`);

  console.log('\n🎉  All favicons generated in /public');
  console.log('\nNext steps:');
  console.log('  1. Deploy your site');
  console.log('  2. Verify: https://bugzero.solutions/favicon.ico');
  console.log('  3. Submit sitemap in Google Search Console\n');
}

generateFavicons().catch((err) => {
  console.error('❌  Generation failed:', err.message);
  process.exit(1);
});
