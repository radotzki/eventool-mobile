'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] });
var glob = require('glob');
var plato = require('plato');
var merge = require('merge-stream');

var paths = {
	js: [
	"www/app/**/*module*.js",
	"www/app/**/*.js"
	]
}

gulp.task('analyze', function() {
	console.log('Analyzing source with JSHint, JSCS, and Plato');

	var jshint = analyzejshint([].concat(paths.js));
	var jscs = analyzejscs([].concat(paths.js));

	// startPlatoVisualizer();

	return merge(jshint, jscs);
});

function analyzejshint(sources) {
	var jshintrcFile = 'gulp/.jshintrc';
	console.log('Running JSHint');
	return gulp
	.src(sources)
	.pipe($.jshint(jshintrcFile))
	.pipe($.jshint.reporter('jshint-stylish'));
}

function analyzejscs(sources) {
	console.log('Running JSCS');
	return gulp
	.src(sources)
	.pipe($.jscs('gulp/.jscsrc'));
}


function startPlatoVisualizer() {
	console.log('Running Plato');

	var files = glob.sync('../www/app/**/*.js');
	var excludeFiles = /\/src\/client\/app\/.*\.spec\.js/;

	var options = {
		title: 'Plato Inspections Report',
		exclude: excludeFiles
	};
	var outputDir = '../report/plato';

	plato.inspect(files, outputDir, options, platoCompleted);

	function platoCompleted(report) {
		var overview = plato.getOverviewReport(report);
		console.log(overview.summary);
	}
}