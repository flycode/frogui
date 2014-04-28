/**
 * Module dependencies
 */

var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header = require('gulp-header');

/**
 * Path files
 */
var paths = {
	less: './less/frogui.less',
  scripts: './js/*',
  dist: './dist'
};

/**
 * Docs file
 */
var pkg = require('./package.json'),
    banner = [
      '/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @author <%= pkg.author %>',
      ' * @license <%= pkg.license %>',
      ' */',
      '']
    .join('\n');

/**
 * Compile LESS
 */
gulp.task('build-less', function() {
	return gulp.src(paths.less)
		.pipe(less())
		.pipe(concat('frogui.css'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist'));
});

/**
 * Minify styles
 */
gulp.task('styles', ['build-less'], function() {
  return gulp.src('./dist/frogui.css')
    .pipe(concat('frogui.min.css'))
    .pipe(minifycss())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(paths.dist))
});

/**
 * Compile JS
 */
gulp.task('build-scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('frogui.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'));
});

/**
 * Minify JS
 */
gulp.task('scripts', ['build-scripts'], function() {
  return gulp.src('./dist/frogui.js')
    .pipe(concat('frogui.min.js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./dist'));
});

/**
 * Watcher
 */
gulp.task('watch', function() {
	gulp.watch('./less/*.less', ['styles']);
  gulp.watch('./js/*.js', ['scripts']);
})

/**
 * Init
 */
gulp.task('default', ['watch']);
