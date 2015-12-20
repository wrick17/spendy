var gulp       = require('gulp');
var less       = require('gulp-less');
var watch      = require('gulp-watch');
var webpack    = require('gulp-webpack');

/* Task to compile less */
gulp.task('compile-less', function() {
  gulp.src('./style.less')
    .pipe(less())
    .pipe(gulp.dest('./'));
});

gulp.task('webpack', function() {
  return gulp.src('app/index.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

/* Task to watch less changes */
gulp.task('watch-jsx', function() {
  gulp.watch('./app/**/*.jsx' , ['webpack']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['webpack', 'watch-jsx']);
