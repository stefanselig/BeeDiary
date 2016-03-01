var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
	gulp.src(['./model/**/*.ts', './utilities/**/*.ts'])
		.pipe(ts({
			"target": "es5",
			"module": "commonjs",
			"moduleResolution": "node"
		}))
		.pipe(gulp.dest('build-server'));
	gulp.src(['./model/**/*.ts', './utilities/**/*.ts'])
		.pipe(ts({
			"target": "es5",
			"module": "system",
			"moduleResolution": "node",
			"sourceMap": true,
			"emitDecoratorMetadata": true,
			"experimentalDecorators": true,
			"removeComments": false,
			"noImplicitAny": false
		}))
		.pipe(gulp.dest('build-client'));
	gulp.src(['./model/**/*.ts', './utilities/**/*.ts']).pipe(gulp.dest('build-server'));
	gulp.src(['./model/**/*.ts', './utilities/**/*.ts']).pipe(gulp.dest('../beekeeper-client/app/model/'));
});