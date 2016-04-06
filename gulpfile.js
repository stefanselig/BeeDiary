'use strict';

// Configuration:

var gulp = require('gulp');
var gulp_install = require('gulp-install');
var ts = require('gulp-typescript');
var source_maps = require('gulp-sourcemaps');
var child_process = require('child_process');
var exec = require('child_process').exec;

var PATH_CLIENT = './beekeeper-client/';
var PATH_SERVER = './beekeeper-server/';
var PATH_SHARED = './beekeeper-shared/';

var tsClient = ts.createProject(PATH_CLIENT + 'tsconfig.json');
var tsServer = ts.createProject(PATH_SERVER + 'src/tsconfig.json');

// Setting up:

gulp.task('build-client', function () {
	tsClient.src(PATH_CLIENT + 'app/**/*.ts')
		.pipe(source_maps.init())
		.pipe(ts(tsClient))
		.pipe(source_maps.write('./'))
		.pipe(gulp.dest(PATH_CLIENT + 'dist/'));
	gulp.src(PATH_CLIENT + 'app/boot/config.js')
		.pipe(gulp.dest(PATH_CLIENT + 'dist/app/boot/'));
	gulp.src(PATH_CLIENT + 'app/beediary_logo.svg')
		.pipe(gulp.dest(PATH_CLIENT + 'dist/'));
});

gulp.task('watch-build-client', function () {
	gulp.watch(PATH_CLIENT + 'app/**/*.ts', ['build-client']);
})

gulp.task('build-server', function () {
	tsServer.src()
		.pipe(ts(tsServer))
		.js.pipe(gulp.dest(PATH_SERVER + 'src/'));
});

// Don't use this one
gulp.task('build-shared', function () {
	tsShared.src()
		.pipe(ts(tsShared))
		.js.pipe(gulp.dest(PATH_SHARED));
});

gulp.task('move-model-to-client', function () {
	gulp.src([PATH_SHARED + '**/*'])
		.pipe(gulp.dest(PATH_CLIENT + 'app/model'));
});

gulp.task('move-model-to-server', function () {
	gulp.src([PATH_SHARED + '**/*'])
		.pipe(gulp.dest(PATH_SERVER + 'src/model'));
});

gulp.task('install-client', function () {
    gulp.src([PATH_CLIENT + 'package.json', PATH_CLIENT + 'tsd.json'])
		.pipe(gulp_install());
});

gulp.task('install-server', function () {
	gulp.src([PATH_SERVER + 'package.json', PATH_SERVER + 'tsd.json'])
		.pipe(gulp_install());
});

// Running:

gulp.task('spawn-server', function() {
	child_process.spawn('node', [PATH_SERVER + 'src/server.js']);
});

gulp.task('cd-client', function() {
	process.chdir(PATH_CLIENT);
});

// Uses bs-config.json (BrowserSync config file)
// Alternative use:
// ['cd-client'], as task dependency
// child_process.spawn('npm', ['start']); for executing

gulp.task('spawn-client', function () {
	child_process.spawn('lite-server', ["--verbose"]);
});

// Combination tasks:

gulp.task('all', [
	'install-client', 
	'install-server',
	'move-model-to-client',
	'move-model-to-server',
	'build-client', 
	'build-server',
	'spawn-server', 
	'spawn-client'
]);

gulp.task('setup', [
	'install-client', 
	'install-server', 
	'move-model-to-client',
	'move-model-to-server',
	'build-client', 
	'build-server',
]);

gulp.task('start', ['spawn-server', 'spawn-client']);

// Helper functions:

// In fact this function is not needed any longer.
function execute(command) {
	exec(command, {maxBuffer: 1024 * 100000}, function (err, stdout, stderr) {
		console.log(stdout);
		if (err != undefined) {
			console.log(err);
			console.log(stderr);
		}
	});
}