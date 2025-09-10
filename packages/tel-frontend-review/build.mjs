import { promises as fs } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";
import fse from "fs-extra";

// Proper Windows-friendly root path
const reviewRoot = fileURLToPath(new URL(".", import.meta.url));
const srcDir = join(reviewRoot, "src");
const distDir = join(reviewRoot, "dist");


// Nunjucks setup
const env = nunjucks.configure(srcDir, { autoescape: true });

// Copy CSS (nhsuk + tel-frontend)
async function copyCss() {
  const nhsukCss = "node_modules/nhsuk-frontend/dist/nhsuk-frontend.css";
  const telCss = join(reviewRoot, "../tel-frontend/dist/tel-frontend.css");

  await fse.ensureDir(join(distDir, "assets"));

  await fse.copy(nhsukCss, join(distDir, "assets/nhsuk-frontend.css"));
  await fse.copy(telCss, join(distDir, "assets/tel-frontend.css"));
  console.log("✅ Copied CSS files");
}

// Copy static assets (optional, e.g., images)
async function copyAssets() {
  const srcAssets = join(srcDir, "assets");
  const distAssets = join(distDir, "assets");
  if (await fse.pathExists(srcAssets)) {
    await fse.copy(srcAssets, distAssets, { overwrite: true });
    console.log("✅ Copied static assets");
  }
}

// Render HTML pages from Nunjucks templates
async function renderNunjucks() {
  const examplesDir = join(srcDir, "examples");
  const files = await fs.readdir(examplesDir);

  for (const file of files) {
    if (!file.endsWith(".njk")) continue;

    const html = env.render(join("examples", file));
    const outFile = join(distDir, file.replace(".njk", ".html"));
    await fse.ensureDir(distDir);
    await fs.writeFile(outFile, html, "utf8");
    console.log(`✅ Rendered ${file}`);
  }
}

// Main build
async function build() {
  await fse.emptyDir(distDir);
  await copyCss();
  await copyAssets();
  await renderNunjucks();
  console.log("🎉 Review site built!");
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
