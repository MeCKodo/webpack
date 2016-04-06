var gulp = require('gulp'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev-append'),
    htmlreplace = require('gulp-html-replace'),
    browserSync = require('browser-sync').create(),
    bsReload = browserSync.reload;

var map = require('map-stream');
var vfs = require('vinyl-fs');

var fs = require('fs');
var path = require('path');

var htmlpath = './source/**/*.html';

var disHtmlPath = './Application/Home/View/';

var urlTag = '';
var NODE_ENV = '';

gulp.task('view', function () {

    var log = function(file, cb) {
        var view = __dirname + '/Application/Home/View';
        var target = file.path.split('/').splice(-3);
        var qqqq = target.splice(1, 1);
        file.path = view + '/' + target.join('/');
        cb(null, file);
    };
    vfs.src('./source/**/*.html')
        .pipe(rev())
        .pipe(replace('__target__', urlTag))
        .pipe(replace('../../../', ''))
        .pipe(htmlreplace({
            js: {
                src: '',
                tpl: ''
            }
        }))
        .pipe(map(log))
        .pipe(vfs.dest('./output'));

    gulp.start(['clean']);
});

gulp.task('build', function () {
    NODE_ENV = 'public';

});

gulp.task('clean', function () {
    return gulp.src('./output', {read: false})
        .pipe(clean());
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

