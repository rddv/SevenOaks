var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir:'public/'
        }
    });
});

//html
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());;
});

//js
gulp.task('js', function () {
    gulp.src('src/js/**')
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());;
});

//img
gulp.task('img', function () {
    gulp.src('src/img/**/')
        .pipe(gulp.dest('public/img'))
        .pipe(browserSync.stream());;
});

//fonts
gulp.task('fonts', function () {
    gulp.src('src/fonts/**')
        .pipe(gulp.dest('public/fonts'))
        .pipe(browserSync.stream());
});

// css+min css
gulp.task('css', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 5 version', 'ie 9'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function (done) {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/*.scss', ['css']);
    gulp.watch('src/js/**', ['js']);
    gulp.watch('src/img/**', ['img']);
    gulp.watch('src/fonts/**', ['fonts']);
    browserSync.reload();
    done();
});

// watch files for changes and reload
gulp.task('reload', function() {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });
    gulp.watch(['src/*.html', 'src/*.scss', 'public/*.js'],
        {cwd: ''},
        reload);
});
//default
gulp.task('default', ['html', 'css', 'js', 'img', 'fonts', 'watch', 'browser-sync']);