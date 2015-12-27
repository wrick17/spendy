var gulp       = require('gulp');
var less       = require('gulp-less');
var watch      = require('gulp-watch');
var webpack    = require('gulp-webpack');
var notify     = require("gulp-notify");


/* Task to compile less */
gulp.task('compile-less', function() {
  gulp.src('./less/app.less')
    .pipe(less())
    .pipe(gulp.dest('./'))
    .pipe(notify("Less Complete"));
});

gulp.task('webpack', function() {
  return gulp.src('app/index.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'))
    .pipe(notify("Webpack Complete"));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
  gulp.watch('./less/**/*.less' , ['compile-less']);
});

gulp.task('watch-jsx', function() {
  gulp.watch('./app/**/*.js*' , ['webpack']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['webpack', 'compile-less', 'watch-jsx', 'watch-less']);
