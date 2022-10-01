const babel = require('gulp-babel');
const gulp = require('gulp');
const rename = require('gulp-rename');
const source = gulp.src('./src/raty.js');
const uglifyJS = require('gulp-uglify');

gulp.task('amd', async () => {
  source
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
    .pipe(uglifyJS())
    .pipe(rename('raty.amd.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('umd', async () => {
  source
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-umd'] }))
    .pipe(uglifyJS())
    .pipe(rename('raty.umd.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('commonjs', async () => {
  source
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-commonjs'] }))
    .pipe(uglifyJS())
    .pipe(rename('raty.commonjs.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('systemjs', async () => {
  source
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-systemjs'] }))
    .pipe(uglifyJS())
    .pipe(rename('raty.systemjs.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('es6', async () => {
  source
    .pipe(babel())
    .pipe(uglifyJS())
    .pipe(rename('raty.module.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('es5', async () => {
  source
    .pipe(babel({ plugins: ['babel-plugin-remove-import-export'] }))
    .pipe(uglifyJS())
    .pipe(rename('raty.min.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

gulp.task('es5-test', async () => {
  source
    .pipe(babel({ plugins: ['babel-plugin-remove-import-export'] }))
    .pipe(rename('raty.js'))
    .pipe(gulp.dest('./build/', { overwrite: true }));
});

const tasks = gulp.parallel(['amd', 'umd', 'commonjs', 'systemjs', 'es6', 'es5', 'es5-test']);

gulp.task('build', tasks);

gulp.task('watch', async () => {
  gulp.watch(['src/*.js', '!build/*.js'], { awaitWriteFinish: true, ignoreInitial: false }, tasks);
});
