import gulp from "gulp";
import concat from "gulp-concat";
import terser from "gulp-terser";
import sass from "gulp-sass";
import dartSass from "sass";
import rename from "gulp-rename";

const compileSass = sass(dartSass);

// Paths
const jsFiles = "packages/tel-frontend/src/tel/components/**/*.js";
const scssFile = "packages/tel-frontend/src/styles.scss";
const distDir = "packages/tel-frontend/dist";

// -------- Tasks --------

// JS bundle
gulp.task("bundle-js", () => {
  return gulp.src(jsFiles)
    .pipe(concat("tel.min.js"))
    .pipe(terser())
    .pipe(gulp.dest(distDir));
});

// CSS compile
gulp.task("bundle-css", () => {
  return gulp.src(scssFile)
    .pipe(compileSass({ outputStyle: "compressed" }).on("error", compileSass.logError))
    .pipe(rename("tel-frontend.css"))
    .pipe(gulp.dest(distDir));
});

// Combined
gulp.task("build", gulp.parallel("bundle-js", "bundle-css"));
