'use strict';

var gulp = require('gulp');

var exclude = [
'lib/ionic/js/ionic-angular.js',
'lib/ionic/js/ionic.js',
'lib/collide/collide.js',
'lib/angular-ui-router/release/angular-ui-router.js',
'lib/angular-sanitize/angular-sanitize.js',
'lib/angular-animate/angular-animate.js',
'lib/angular/angular.js'
]

// inject bower components
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;

	return gulp.src('www/index.html')
	.pipe(wiredep({
		directory: 'www/lib',
		exclude: exclude
	}))
	.pipe(gulp.dest('www'));
});
