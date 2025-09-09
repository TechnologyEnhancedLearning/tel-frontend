import { promises as fs } from 'node:fs';
import { join, relative, parse } from 'node:path';
import nunjucks from 'nunjucks';
import fse from 'fs-extra';
import sass from 'sass';

// Paths
const reviewSrc = join(process.cwd(), 'packages/tel-frontend-review/src');
const reviewDist = join(process.cwd(), 'packages/tel-frontend-review/dist');
const npmPkgAssets = join(process.cwd(), 'packages/tel-frontend/src/assets');

// Ensure dist folder exists
await fse.ensureDir(reviewDist);

// -------------------
// 1. Compile SCSS
// -------------------
const scssEntry = join(reviewSrc, 'assets/styles.scss');
const scssOutput = join(reviewDist, 'assets/styles.css');

await fse.ensureDir(join(reviewDist, 'assets'));

const result = sass.compile(scssEntry, { style: 'expanded' });
await fs.writeFile(scssOutput, result.css);

console.log('✅ SCSS compiled');

// -------------------
// 2. Copy assets from npm package (e.g., images)
// -------------------
const assetsDest = join(reviewDist, 'assets');
await fse.copy(npmPkgAssets, assetsDest, { overwrite: true });
console.log('✅ Assets copied');

// -------------------
// 3. Render Nunjucks templates
// -------------------
nunjucks.configure([reviewSrc], { autoescape: true });

async function renderTemplates() {
  // Recursively get all .njk files in src (excluding layouts)
  async function walk(dir) {
    let files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(await walk(fullPath));
      } else if (item.isFile() && item.name.endsWith('.njk')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const njkFiles = await walk(reviewSrc);

  for (const file of njkFiles) {
    // Skip layouts folder
    if (file.includes('layouts')) continue;

    const relPath = relative(reviewSrc, file);       // relative path
    const outPath = join(reviewDist, relPath);      // Windows-safe
    const { dir } = parse(outPath);
    await fse.ensureDir(dir);

    const html = nunjucks.render(relPath);
    const htmlFile = outPath.replace(/\.njk$/, '.html');
    await fs.writeFile(htmlFile, html);
  }
}

await renderTemplates();
console.log('✅ Nunjucks templates rendered');

console.log('🎉 Build complete!');
