import * as gulp from 'gulp';
import * as gulp_ts from 'gulp-typescript';
import * as gulp_install from 'gulp-install';
import * as gulp_execute from 'child_process';

const exec = gulp_execute.exec;

gulp.task('build', () => {
	execute('npm run tsc');
});

gulp.task('install', () => {
	gulp.src(['package.json', 'tsd.json'])
		.pipe(gulp_install());
})

gulp.task('serve', () => {
	execute('npm start');
});

gulp.task('start-server', () => {
	execute('mongod');
	execute('node ./../beekeeper-server/src/server.js');
});

gulp.task('default', ['build', 'start-server', 'serve']);

function execute(command: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
			exec(command, (err, stdout, stderr) => {
				console.log(stdout);
				if (err == undefined) {
					console.log("executed err is undefined.");
					resolve(`Executing ${command} successful.`);
				}
				else {
					console.log(err);
					console.log(stderr);
					reject(`Error executing ${command}`);
				}
			});
	})
}