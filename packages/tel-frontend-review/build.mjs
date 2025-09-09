// packages/tel-frontend-review/build.mjs
import { promises as fs } from 'node:fs';
import { join, dirname, parse } from 'node:path';
import nunjucks from 'nunjucks';
import fse from 'fs-extra';

// Paths
const root = process.cwd();
const srcPath = join(root, 'packages/tel-frontend-review/src');
const distPath = join(root, 'packages/tel-frontend-review/dist');

// Clean dist
await fse.remove(distPath);
await fse.ensureDir(distPath);

// Setup Nunjucks
const env = nunjucks.configure(srcPath, { autoescape: true });

// Default context (you can extend later)
const context = {
  assetPath: '/assets',
  title: 'TEL Frontend Review'
};

// Recursively copy static assets (css/js/images)
await fse.copy(join(srcPath, 'assets'), join(distPath, 'assets'));

// Render .njk files (excluding layouts)
async function renderNunjucks(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await renderNunjucks(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.njk')) {
      // Skip layouts folder
      if (fullPath.includes('/layouts/')) continue;

      const templatePath = fullPath.replace(srcPath + '/', '');
      const { name, dir: fileDir } = parse(templatePath);

      const outDir = join(distPath, fileDir);
      await fse.ensureDir(outDir);

      const html = env.render(templatePath, context);
      await fs.writeFile(join(outDir, `${name}.html`), html, 'utf-8');
    }
  }
}

await renderNunjucks(srcPath);

console.log('✅ TEL Frontend review site built!');
