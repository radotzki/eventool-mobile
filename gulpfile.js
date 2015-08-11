'use strict';

var gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('default', ['sass', 'watch']);

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
  .pipe(sass())
  .pipe(gulp.dest('./www/content/css/'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./www/content/css/'))
  .on('end', done);
});