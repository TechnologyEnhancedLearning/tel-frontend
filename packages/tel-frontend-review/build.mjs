import { promises as fs } from "node:fs";
import { join, dirname, parse } from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";
import fse from "fs-extra";
import * as sass from "sass";
import { execSync } from "node:child_process";

// Replace __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const repoRoot = join(__dirname, "../../"); // repo root
const reviewSrc = join(__dirname, "src");
const reviewDist = join(__dirname, "dist");
const nhsukDist = join(repoRoot, "node_modules/nhsuk-frontend/dist");

// TEL frontend paths
const telFrontendDir = join(repoRoot, "packages/tel-frontend");
const telFrontendDist = join(telFrontendDir, "dist");
const telFrontendSrcScss = join(telFrontendDir, "src/styles.scss");

// -------- Helpers --------

// Build the TEL Frontend package (CSS + JS) using Gulp
async function buildTelFrontend() {
  console.log("Building TEL Frontend CSS + JS via Gulp...");

  await fse.emptyDir(telFrontendDist);
  await fse.ensureDir(telFrontendDist);

  try {
    execSync("npx gulp build", {
      cwd: telFrontendDir,
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Gulp build failed:", err);
    process.exit(1);
  }

  console.log("TEL Frontend CSS/JS built successfully");
}

// Copy built TEL frontend files + NHS frontend assets + review site assets
async function buildReviewAssets() {
  console.log("Copying review site assets...");

  const stylesDir = join(reviewDist, "stylesheets");
  const scriptsDir = join(reviewDist, "javascripts");

  await fse.ensureDir(stylesDir);
  await fse.ensureDir(scriptsDir);

  // --- NHS.UK Frontend v10 ---
  const nhsCssSrc = join(repoRoot, "node_modules/nhsuk-frontend/dist/nhsuk/nhsuk-frontend.min.css");
  const nhsJsSrc = join(repoRoot, "node_modules/nhsuk-frontend/dist/nhsuk/nhsuk-frontend.min.js");

  await fse.copy(nhsCssSrc, join(stylesDir, "nhsuk.min.css"));
  await fse.copy(nhsJsSrc, join(scriptsDir, "nhsuk.min.js"));

  // --- TEL Frontend ---
  await fse.copy(join(telFrontendDist, "tel-frontend.css"), join(stylesDir, "tel-frontend.css"));
  await fse.copy(join(telFrontendDist, "tel-frontend.js"), join(scriptsDir, "tel-frontend.js"));
  await fse.copy(join(telFrontendDist, "tel-frontend.min.js"), join(scriptsDir, "tel-frontend.min.js"));

  // --- Review site static assets ---
  const reviewAssetsSrc = join(reviewSrc, "assets");
  if (await fse.pathExists(reviewAssetsSrc)) {
    await fse.copy(reviewAssetsSrc, join(reviewDist, "assets"));
  }

  console.log("Review site assets copied");
}

// Compile review site SCSS (review site-specific styles)
async function buildReviewCSS() {
  console.log("Building review site CSS...");

  const css = sass.compile(join(reviewSrc, "scss/main.scss"), {
    style: "expanded",
    loadPaths: ["node_modules"],
  });

  const outDir = join(reviewDist, "stylesheets");
  await fse.ensureDir(outDir);
  await fs.writeFile(join(outDir, "review.css"), css.css);

  console.log("Review site CSS built at:", join(outDir, "review.css"));
}

// Render review site HTML using Nunjucks
async function buildReviewHtml() {
  console.log("Rendering review site HTML...");

  const telComponents = join(repoRoot, "packages/tel-frontend/src/tel/components");

  const env = nunjucks.configure(
    [
      reviewSrc, // review site source
      join(repoRoot, "node_modules/nhsuk-frontend"), // NHS macros
      telComponents // TEL frontend macros
    ],
    { autoescape: true }
  );

  // Root-level pages
  const files = await fse.readdir(reviewSrc);
  for (const file of files) {
    if (file.endsWith(".njk")) {
      const name = parse(file).name;
      const html = env.render(file, { title: "TEL Frontend Review" });

      const outDir = join(reviewDist, name === "index" ? "" : name);
      await fse.ensureDir(outDir);
      await fs.writeFile(join(outDir, "index.html"), html);
      console.log(`Rendered ${file} -> ${outDir}/index.html`);
    }
  }

  // Example pages
  const examplesSrc = join(reviewSrc, "examples");
  const examplesDist = join(reviewDist, "examples");
  await fse.ensureDir(examplesDist);

  if (await fse.pathExists(examplesSrc)) {
    const exampleFiles = await fse.readdir(examplesSrc);
    for (const file of exampleFiles) {
      if (file.endsWith(".njk")) {
        const name = file.replace(/\.njk$/, ".html");
        const rendered = env.render(join("examples", file));
        await fs.writeFile(join(examplesDist, name), rendered, "utf8");
        console.log(`Rendered ${file} -> ${join(examplesDist, name)}`);
      }
    }
  }

  console.log("Review HTML rendered");
}

// -------- Main build --------
async function build() {
  try {
    await fse.emptyDir(reviewDist);

    // 1. Build TEL frontend
    await buildTelFrontend();

    // 2. Copy assets
    await buildReviewAssets();

    // 3. Compile review SCSS
    await buildReviewCSS();

    // 4. Render review HTML
    await buildReviewHtml();

    console.log("Review site build finished successfully");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
