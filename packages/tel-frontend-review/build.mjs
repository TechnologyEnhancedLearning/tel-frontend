import { promises as fs } from 'node:fs';
import { join, relative, parse } from 'node:path';
import nunjucks from 'nunjucks';
import fse from 'fs-extra';
import * as sass from 'sass'; // updated import style

// ----------------------
// Paths
// ----------------------
const repoRoot = process.cwd();
const reviewSrc = join(repoRoot, 'packages/tel-frontend-review/src');
const reviewDist = join(repoRoot, 'packages/tel-frontend-review/dist');
const npmPkgAssets = join(repoRoot, 'packages/tel-frontend/src/assets');

// Ensure dist folder exists
await fse.ensureDir(reviewDist);

// ----------------------
// 1️⃣ Compile SCSS
// ----------------------
const scssEntry = join(reviewSrc, 'assets/styles.scss');
const scssOutput = join(reviewDist, 'assets/styles.css');
await fse.ensureDir(join(reviewDist, 'assets'));

const scssResult = sass.compile(scssEntry, {
  style: 'expanded',
  loadPaths: ['node_modules'], // resolves @use "nhsuk-frontend/all"
});

await fs.writeFile(scssOutput, scssResult.css);
console.log('✅ SCSS compiled');

// ----------------------
// 2️⃣ Copy assets from npm package
// ----------------------
const assetsDest = join(reviewDist, 'assets');
await fse.copy(npmPkgAssets, assetsDest, { overwrite: true });
console.log('✅ Assets copied');

// ----------------------
// 3️⃣ Render Nunjucks templates
// ----------------------
nunjucks.configure([reviewSrc], { autoescape: true });

async function renderTemplates() {
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
    if (file.includes('layouts')) continue; // skip layouts

    const relPath = relative(reviewSrc, file); // relative path to src
    const outPath = join(reviewDist, relPath);
    const { dir } = parse(outPath);
    await fse.ensureDir(dir);

    const html = nunjucks.render(relPath); // render template
    const htmlFile = outPath.replace(/\.njk$/, '.html');
    await fs.wr
