/*
eslint
"no-invalid-this": 1,
"angular/timeout-service": 0,
"angular/definedundefined": 0,
"angular/json-functions": 0,
"no-unused-vars": 1
*/

// ES6 gulpfile
// ref: https://markgoodyear.com/2015/06/using-es6-with-gulp/
import innerGulp from 'gulp';
import gulpHelp from 'gulp-help';
import yargs from 'yargs';
import shell from 'gulp-shell';

const gulp = gulpHelp( innerGulp );

/**
 * Realiza o parse dos argumentos da linha de comando
 */
let argv = yargs.alias( 'p', 'password' )
    .default( 'password', '' )
    .argv;

gulp.task( 'tree-shaking', false, shell.task( [ 'find ./www -regex ".*\\.ttf$" -delete -or -regex ".*\\.svg$" -delete -or -regex ".*\\.eot$" -delete -or -regex ".*\\.map$" -delete' ] ) );

gulp.task( 'create-apk', true, shell.task( [
    'cordova build android --release -- --keystore=espm.keystore --storePassword=' + argv.password + ' --alias=espm --password=' + argv.password
] ) );


