'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

gulp.task('jshint', function () {
  return gulp.src('www/app/**/*.js')
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'));
});