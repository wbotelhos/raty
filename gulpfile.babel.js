const gulp = require('gulp'),
    uglifyJS = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');
const source = gulp.src("./lib/js/Raty.js");
const modules = ["amd", "umd", "commonjs", "systemjs", "module", "without-module"];
gulp.task(modules[0], async () => {
    source
        .pipe(babel({ plugins: ["@babel/plugin-transform-modules-amd"] }))
        .pipe(uglifyJS())
        .pipe(rename("raty.amd.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});
//for umd modules
gulp.task(modules[1], async () => {
    source
        .pipe(babel({ plugins: ["@babel/plugin-transform-modules-umd"] }))
        .pipe(uglifyJS())
        .pipe(rename("raty.umd.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});
//for commonjs modules
gulp.task(modules[2], async () => {
    source
        .pipe(babel({ plugins: ["@babel/plugin-transform-modules-commonjs"] }))
        .pipe(uglifyJS())
        .pipe(rename("raty.commonjs.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});
//for systemjs modules
gulp.task(modules[3],async()=>{
    source
        .pipe(babel({ plugins: ["@babel/plugin-transform-modules-systemjs"]}))
        .pipe(uglifyJS())
        .pipe(rename("raty.systemjs.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});
//for es6 modules
gulp.task(modules[4],async()=>{
    source
        .pipe(babel())
        .pipe(uglifyJS())
        .pipe(rename("raty.module.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});

//es5 script
gulp.task(modules[5],async()=>{
    source
        .pipe(babel({ plugins: ["babel-plugin-remove-import-export"]}))
        .pipe(uglifyJS())
        .pipe(rename("raty.min.js"))
        .pipe(gulp.dest('./lib/js/build/', { overwrite: true }))
});

gulp.task('build', gulp.parallel(modules));

gulp.task("watch", async ()=>{
    gulp.watch(['lib/js/*.js', '!lib/js/build/*.js'],(cb)=>{
        const done=gulp.parallel(modules);
        done();
        cb();
});
});