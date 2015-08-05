var gulp = require('gulp');
var del = require('del');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

gulp.task('clean', function (cb) {
	del(['public/build', 'public/dist'], cb);
});

gulp.task('browserify:dev', function () {
	return gulp.src('public/js/app.js')
		.pipe(plumber())
		.pipe(browserify({
			debug: true,
			transform: ['babelify']
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public/build'))
		.pipe(livereload());
});

gulp.task('browserify', function () {
	return gulp.src('public/js/app.js')
		.pipe(plumber())
		.pipe(browserify({
			transform: ['babelify']
		}))
		.pipe(rename('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/build'));
});


gulp.task('watch', function () {
	livereload.listen();

	watch(['public/js/**/*.js'], function () {
		gulp.start('browserify:dev');
	});
	watch(['public/sass/**/*.scss'], function () {
		gulp.start('compass:dev');
	});
	gulp.watch('public/**/*.html').on('change', function(file) {
		livereload.changed(file.path);
	});
});

gulp.task('build', ['browserify:dev']);
gulp.task('start', ['build', 'watch']);
gulp.task('dist', ['clean', 'browserify']);

gulp.task('default', ['build']);
