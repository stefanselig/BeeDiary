var gulp = require('gulp');
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var changed = require("gulp-changed");
var newer = require('gulp-newer');

var typescriptFiles = ["*.ts", "routes/*.ts"];

gulp.task('default', function() {
  	return gulp.src(typescriptFiles)
		.pipe(sourcemaps.init())
		.pipe(ts({
			module: "commonjs"
		}))
		.pipe(gulp.dest(""));
});