const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const Cache = require('gulp-file-cache');
const mocha = require('gulp-mocha');
const pump = require('pump');
const path = require('path');
const cache = new Cache();

const DIST_DIR = path.join(__dirname, 'dist'),
      DEV_DIR = path.join(__dirname, 'src'),
      TEST_DIR = path.join(__dirname, 'test');


/*
* To run unit tests with Mocha
*/
gulp.task('unitTests', () => {
  return gulp.src(TEST_DIR)
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-register'
    }))
});

/*
* To watch files for changes, compiles, and restarts the nodemon server on change
*/
gulp.task('compile', () => {
  const stream = gulp.src('./src/**/*.js')      // watch for changes
                 .pipe(cache.filter())          // filter out files that didn't change in cache
                 .pipe(babel({
                   presets: ['env'],             // pipe through babel-preset-env
                   plugins: ['transform-runtime']
                 }))
                 .pipe(cache.cache())           // store changed files in cache
                 .pipe(gulp.dest( DIST_DIR ));    // spit out built files in /dist

  return stream;
});


/*
*  MAIN SCRIPT
*  -----------
*  runs unit tests and node server while watching src/
*/

gulp.task('e2e', () => {
  return gulp.watch(['src/**/*.js','test/**/*.js'], ['unitTests']);
});

/*
*  Run nodemon watchers
*/
gulp.task('watch', ['compile'], () => {
  const stream = nodemon({
                   script: 'dist/server.js',    // run ES5 code 
                   watch: 'src',                // watch ES2015 code 
                   tasks: ['compile'],          // compile synchronously onChange 
                 });
 
  return stream;
});