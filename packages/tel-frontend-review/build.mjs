import { promises as fs } from "node:fs";
import { join, dirname, parse } from "node:path";
import { fileURLToPath } from "node:url";
import fse from "fs-extra";
import * as sass from "sass";

// Replace __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const repoRoot = join(__dirname, "../../"); // back to repo root
const reviewSrc = join(__dirname, "src");
const reviewDist = join(__dirname, "dist");

// TEL frontend package paths
const telFrontendDir = join(repoRoot, "packages/tel-frontend");
const telFrontendDist = join(telFrontendDir, "dist");
const telFrontendSrcScss = join(telFrontendDir, "src/styles.scss");

// -------- Helpers --------

// Copy built TEL frontend files + NHS frontend assets + review-specific assets
async function buildReviewAssets() {
  console.log("Copying review site assets...");

  await fse.ensureDir(join(reviewDist, "stylesheets"));
  await fse.ensureDir(join(reviewDist, "javascripts"));

  // Copy precompiled NHS.UK frontend CSS + JS
  await fse.copy(
    join(repoRoot, "node_modules/nhsuk-frontend/dist/nhsuk.min.css"),
    join(reviewDist, "stylesheets/nhsuk.min.css")
  );
  await fse.copy(
    join(repoRoot, "node_modules/nhsuk-frontend/dist/nhsuk.min.js"),
    join(reviewDist, "javascripts/nhsuk.min.js")
  );

  // Copy TEL frontend built CSS + JS
  await fse.copy(
    join(telFrontendDist, "tel-frontend.css"),
    join(reviewDist, "stylesheets/tel-frontend.css")
  );
  await fse.copy(
    join(telFrontendDist, "tel-frontend.min.js"),
    join(reviewDist, "javascripts/tel-frontend.min.js")
  );

  // Copy static assets for review site (images, etc.)
  const reviewAssetsSrc = join(reviewSrc, "assets");
  if (await fse.pathExists(reviewAssetsSrc)) {
    await fse.copy(reviewAssetsSrc, join(reviewDist, "assets"));
  }

  console.log("Review site assets copied");
}

// Compile review site SCSS (only your custom styles)
async function buildReviewCSS() {
  console.log("Building review site CSS...");

  const css = sass.compile(join(reviewSrc, "scss/main.scss"), {
    style: "expanded",
    loadPaths: ["node_modules"], // allows @use of TEL frontend SCSS
  });

  const outDir = join(reviewDist, "stylesheets");
  await fse.ensureDir(outDir);
  await fs.writeFile(join(outDir, "review.css"), css.css);

  console.log("Review site CSS built at:", join(outDir, "review.css"));
}

// -------- Main build --------
async function build() {
  try {
    await fse.emptyDir(reviewDist);

    // Step 1: Build TEL frontend (CSS + JS) via Gulp
    console.log("Building TEL Frontend CSS + JS via Gulp...");
    const { execSync } = await import("node:child_process");
    execSync("npx gulp build", {
      cwd: telFrontendDir,
      stdio: "inherit",
    });
    console.log("TEL Frontend CSS/JS built successfully");

    // Step 2: Copy assets (TEL + NHS + review site)
    await buildReviewAssets();

    // Step 3: Compile review site SCSS
    await buildReviewCSS();

    console.log("Review site build finished successfully");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
