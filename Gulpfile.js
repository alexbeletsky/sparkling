var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
// var babel = require('gulp-babel');
// var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function (cb) {
	del(['dist'], cb);
});

// gulp.task('babel', ['clean'], function () {
// 	return gulp.src('source/**/*.js')
// 	    .pipe(sourcemaps.init())
// 	    .pipe(babel({optional: ['runtime']}))
// 	    .pipe(sourcemaps.write('./maps'))
// 	    .pipe(gulp.dest('dist'));
// });


gulp.task('watch', function () {
	watch(['source/**/*.js'], function () {
		gulp.start('build');
	});
});

gulp.task('build', ['clean', 'babel']);
gulp.task('start', ['build', 'watch']);

gulp.task('default', ['build']);
