var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('clean', function (cb) {
	del(['dist'], cb);
});

gulp.task('babel', function () {
	return gulp.src('source/**/*.js')
	    .pipe(sourcemaps.init())
	    .pipe(babel())
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('dist'));
});


gulp.task('watch', function () {
	watch(['source/**/*.js'], function () {
		gulp.start('build');
	});
});

gulp.task('build', ['babel']);
gulp.task('start', ['build', 'watch']);

gulp.task('default', ['build']);
