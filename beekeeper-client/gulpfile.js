var gulp = require('gulp');
var source = require('vinyl-source-stream');
var request = require('request');

gulp.task('getMapsFile', function () {
	var maps = request('https://maps.googleapis.com/maps/api/js?key=AIzaSyD52xcKSvVXXDFZt43dW0oUR3mR3K_v-vk')
	.pipe(source('maps.js'))
	.pipe(gulp.dest(''));
});

gulp.task('default', ['getMapsFile']);