const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const mode = require('gulp-mode')();
const livereload = require('gulp-livereload');
const browserSync = require('browser-sync').create();

gulp.task('process-sass', () => {
    return gulp.src('css/sass/style.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
        // .pipe(livereload());
});


gulp.task('process-js', () => {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            mode: mode.development() ? 'development' : 'production',
            watch: true,
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(mode.development(sourcemaps.init()))
        .pipe(uglify().on('error', (uglify) => {
            console.error(uglify.message);
            this.emit('end');
        }))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('default', () => {
    // livereload.listen();

    browserSync.init({
        server: "./"
    });

    gulp.watch(
        ['css/sass/*.scss','css/sass/*/*.scss'],
        { ignoreInitial: false },
        gulp.series('process-sass')
    );
    gulp.watch("./*.html").on('change', browserSync.reload);

    // gulp.watch(
    //     ['src/js/*.js','src/js/*/*.js'],
    //     { ignoreInitial: false },
    //     gulp.series('process-js')
    // );

})