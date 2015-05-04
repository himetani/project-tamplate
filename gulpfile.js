var gulp            = require('gulp'),
    exec            = require('child_process').exec,
    uglify          = require('gulp-uglify'),
    inject          = require('gulp-inject'),
    jshint          = require('gulp-jshint'),
    angularFilesort = require('gulp-angular-filesort')
    bs              = require('browser-sync').create(),
    gls             = require('gulp-live-server');

var paths = {
    index      : ['./client/index.html'],
    angular    : ['./client/assets/vendor/angular/*.js'],
    vendor     : ['./client/assets/vendor/*.js', './client/assets/vendor/*.css'],
    app        : ['./client/app/*.js'],
    shared     : ['./client/app/shared/**/*.js'],
    components : ['./client/app/components/**/*.js']
};

gulp.task('inject', ['serve'], function() {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(paths.angular).pipe(angularFilesort()), {name: 'angular'}))
        .pipe(inject(gulp.src(paths.vendor, {read: false}), {name: 'vendor'}))
        .pipe(inject(gulp.src(paths.app, {read:false}), {name: 'app'}))
        .pipe(inject(gulp.src(paths.shared, {read: false}), {name: 'shared'}))
        .pipe(inject(gulp.src(paths.components, {read:false}), {name: 'components'}))
        .pipe(gulp.dest('./client'));
});

gulp.task('browser-sync', ['inject'], function() {
       bs.init(null, {
        proxy: "http://localhost:3000",
        browser: "google chrome",
        port: 7000
    });
});

gulp.task('serve', function(cb) {
    var server = gls.new('./server/app.js');
    server.start();
    cb();
});

gulp.task('watch', function() {
    var pathsArray = new Array();
    Object.keys(paths).forEach(function(key) {
        pathsArray = pathsArray.concat(paths[key]);
    });

    gulp.watch(pathsArray, ['bs-reload']);
});

gulp.task('bs-reload', function() {
    bs.reload();
});

gulp.task('default', ['browser-sync', 'watch']); 
