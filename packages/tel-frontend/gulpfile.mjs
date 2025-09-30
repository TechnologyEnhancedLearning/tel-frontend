import gulp from 'gulp';
import sass from 'gulp-sass';
import dartSass from 'sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import fse from 'fs-extra';
import { join } from 'node:path';

const gulpSass = sass(dartSass);

const dist = 'dist';
const src = 'src/tel';

// --- Clean dist ---
export const clean = async () => {
  await fse.emptyDir(dist);
};

// --- Compile SCSS ---
export function css() {
  return gulp
    .src(`${src}/styles.scss`)
    .pipe(gulpSass().on('error', gulpSass.logError))
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
