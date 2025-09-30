import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import fse from 'fs-extra';

const sassCompiler = gulpSass(sass);
const dist = 'dist';
const src = 'src/tel';

// --- Clean dist folder ---
export const clean = async () => {
  await fse.emptyDir(dist);
};

// --- Compile SCSS ---
export function css() {
  return gulp
    .src(`${src}/styles.scss`)          // main entry inside tel/
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(rename('tel-frontend.css'))
    .pipe(gulp.dest(dist));
}

// --- Bundle JS ---
export function js() {
  return gulp
    .src(`${src}/components/**/*.js`)
    .pipe(concat('tel-frontend.js'))
    .pipe(gulp.dest(dist))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist));
}

// --- Full build ---
export const build = gulp.series(clean, gulp.parallel(css, js));
