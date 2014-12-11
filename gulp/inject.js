'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('injector:js', ['injector:jsModule'], function () {
  return gulp.src('www/index.html')
  .pipe($.inject(gulp.src([
    'www/app/**/*.js',
    '!www/app/**/*.module.js',
    '!www/app/**/*.spec.js',
    '!www/app/**/*.mock.js'
    ], {read: false}), {
    ignorePath: 'www',
    addRootSlash: false
  }))
  .pipe(gulp.dest('www/'));
});

gulp.task('injector:css', function () {
  return gulp.src('www/index.html')
  .pipe($.inject(gulp.src([
    'www/content/**/*.css'
    ], {read: false}), {
    ignorePath: 'www',
    addRootSlash: false
  }))
  .pipe(gulp.dest('www/'));
});

gulp.task('injector:jsModule', function () {
  return gulp.src('www/index.html')
  .pipe($.inject(gulp.src([
    'www/app/**/*.module.js',
    '!www/app/**/*.spec.js',
    '!www/app/**/*.mock.js'
    ], {read: false}), {
    ignorePath: 'www',
    addRootSlash: false,
    name: 'module'
  }))
  .pipe(gulp.dest('www/'));
});