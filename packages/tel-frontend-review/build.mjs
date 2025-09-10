import { promises as fs } from "node:fs";
import { join, dirname, parse } from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";
import fse from "fs-extra";

// Replace __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const repoRoot = join(__dirname, "../../"); // back to repo root
const reviewSrc = join(__dirname, "src");
const reviewDist = join(__dirname, "dist");
const nhsukDist = join(repoRoot, "node_modules/nhsuk-frontend/dist");
const telFrontendDist = join(repoRoot, "packages/tel-frontend/dist");


// -------- Helpers --------
async function buildReviewAssets() {
  console.log("⚙️  Copying review app assets...");

  await fse.emptyDir(reviewDist);

  // Copy NHS.UK frontend dist (CSS + JS)
  await fse.copy(join(nhsukDist, "nhsuk.min.css"), join(reviewDist, "stylesheets/nhsuk.min.css"));
  await fse.copy(join(nhsukDist, "nhsuk.min.js"), join(reviewDist, "javascripts/nhsuk.min.js"));

  // Copy TEL frontend compiled CSS
  await fse.copy(join(telFrontendDist, "tel-frontend.css"), join(reviewDist, "stylesheets/tel-frontend.css"));

  // Copy static assets (images, etc.)
  if (await fse.pathExists(join(reviewSrc, "assets"))) {
    await fse.copy(join(reviewSrc, "assets"), join(reviewDist, "assets"));
  }

  console.log("✅ Review assets copied");
}

async function buildReviewHtml() {
  console.log("⚙️  Rendering review site HTML...");

  const env = nunjucks.configure([reviewSrc], { autoescape: true });
  const files = await fse.readdir(reviewSrc);

  for (const file of files) {
    if (file.endsWith(".njk")) {
      const name = parse(file).name;
      const html = env.render(file, { title: "TEL Frontend Review" });

      const outDir = join(reviewDist, name === "index" ? "" : name);
      await fse.ensureDir(outDir);
      await fs.writeFile(join(outDir, "index.html"), html);
      console.log(`📄 Rendered ${file} -> ${outDir}/index.html`);
    }
  }

  // Render example pages
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
        console.log(`📄 Rendered ${file} -> ${join(examplesDist, name)}`);
      }
    }
  }

  console.log("✅ Review HTML rendered");
}

// -------- Main --------
async function build() {
  try {
    await buildReviewAssets();
    await buildReviewHtml();
    console.log("🎉 Build finished successfully");
  } catch (err) {
    console.error("❌ Build failed:", err);
    process.exit(1);
  }
}

build();
