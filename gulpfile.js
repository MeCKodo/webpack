var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rev = require('gulp-rev-append'),
    htmlreplace = require('gulp-html-replace'),
    browserSync = require('browser-sync').create(),
    bsReload = browserSync.reload;

var path = './src/',
    csspath = './src/css/**/*.css',
    sasspath = './src/sass/**/*.scss',
    jspath = './src/js/**/*.js',
    htmlpath = './src/views/**/*.html',
    ifonpath = './src/webfont/**';

var disPath = './Public/',
    disCssPath = './public/css',
    disJsPath = './Public/js',
    disHtmlPath = './Application/Home/View',
    disifonpath = './Public/webfont';

var urlTag = '';
var NODE_ENV = '';

gulp.task('view', function () {
    return gulp.src(htmlpath)
        .pipe(rev())
        .pipe(replace('__target__', urlTag))
        .pipe(replace('..\/..\/', '__PUBLIC__/'))
        .pipe(replace('<a href="..\/', '<a href="__APP__/'))
        .pipe(htmlreplace({
            js: {
                src: '',
                tpl: ''
            }
        }))
        .pipe(gulp.dest(disHtmlPath));
});

gulp.task('build', function () {
    NODE_ENV = 'public';
    gulp.start('view', 'ugjs', 'sass', 'css', 'component', 'iconfont', 'images');
});
gulp.task('auto', function () {

});

gulp.task('reload', function () {

    var htmlFiles = htmlpath;

    browserSync.init(htmlFiles, {
        startPath: "views/Index",
        server: path,
        notify: false
    });
    gulp.watch([sasspath, csspath, jspath]).on('change', bsReload);
});

