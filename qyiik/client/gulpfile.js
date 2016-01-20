// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var addsrc = require('gulp-add-src');
var minifyHTML = require('gulp-minify-html');
var htmlmin = require('gulp-htmlmin');


gulp.task('build-template', function() {
	return gulp.src('src/app/template/**/*.html').pipe(htmlmin({
		collapseWhitespace: true
    })).pipe(templateCache('templates.js', {
		module : 'qk.templates',
		root : 'app/',
		standalone : true
	})).pipe(gulp.dest('dist/js/app'));
});

// Lint Task
gulp.task('lint', function() {
	return gulp.src('src/app/**/*.js').pipe(jshint()).pipe(
			jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
	return gulp.src('src/assets/css/*.css').pipe(sass()).pipe(
			gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('build-app.js', function() {
	return gulp.src('src/app/**/*.js').pipe(concat('app.js')).pipe(
			gulp.dest('dist')).pipe(rename('app.min.js')).pipe(uglify()).pipe(
			gulp.dest('dist/js/app'));
});

// Concatenate & Minify JS
gulp.task('assets', function() {
	return gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS
gulp.task('vendor', function() {
	return gulp.src('vendor/*.js').pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('root', function() {
	return gulp.src('index.html').pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('src/app/**/*.js', [ 'lint', 'build-app.js' ]);
	gulp.watch('scss/*.scss', [ 'sass' ]);
});

// Default Task
gulp.task('default', [ 'lint', 'sass', 'build-app.js', 'vendor', 'assets', 'root', 'build-template',
		'watch' ]);