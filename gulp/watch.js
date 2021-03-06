'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'injector:css', 'injector:js'], function() {
  // gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('www/content/**/*.css', ['injector:css']);
  gulp.watch('www/app/**/*.js', ['injector:js']);
  gulp.watch('bower.json', ['wiredep']);
});