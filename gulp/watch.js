'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'injector:css', 'injector:js', 'analyze'], function() {
  // gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('www/content/**/*.css', ['injector:css']);
  gulp.watch('www/app/**/*.js', ['injector:js', 'analyze']);
  gulp.watch('bower.json', ['wiredep']);
});