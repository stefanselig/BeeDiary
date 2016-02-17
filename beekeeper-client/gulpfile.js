'use strict';

var gulp = require('gulp');
var gulp_install = require('gulp-install');
var gulp_execute = require('child_process');
var exec = gulp_execute.exec;
gulp.task('build', function () {
    execute('npm run tsc');
});
gulp.task('install', function () {
    gulp.src(['package.json', 'tsd.json']).pipe(gulp_install());
});
gulp.task('serve', function () {
    execute('npm start');
});
gulp.task('start-server', function () {
    execute('mongod');
    execute('node ./../beekeeper-server/src/server.js');
});
gulp.task('default', ['build', 'start-server', 'serve']);
function execute(command) {
    return new Promise(function (resolve, reject) {
        exec(command, {maxBuffer: 1024 * 100000}, function (err, stdout, stderr) {
            console.log(stdout);
            if (err == undefined) {
                console.log("executed err is undefined.");
                resolve('Executing ' + command + ' successful.');
            } else {
                console.log(err);
                console.log(stderr);
                reject('Error executing ' + command);
            }
        });
    });
}
