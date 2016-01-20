'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');


gulp.task('watch', function() {
    return gulp.watch(['**/*.js', '!node_modules/**'], ['lint']);
});

gulp.task('test', ['lint'], () => {
    return gulp.src('test/*.js')
        .pipe(mocha());
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['test']);