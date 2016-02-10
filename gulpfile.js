var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');
var cssmin = require('gulp-cssmin');

gulp.task('clean', function () {
  return gulp.src( [
       'tmp'
      ,'dist'
    ]
    , {read: false})
    .pipe(clean());
});

gulp.task('templateCache', ['clean'], function () {
  return gulp.src('app/partials/*.html')
    .pipe(templateCache({
      module: 'sumModule',
      root: 'partials'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-app', ['templateCache'], function() {
  return gulp.src([
    'app/**/*.js'
  ])
    .pipe(ngAnnotate())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-vendor', function() {
  return gulp.src([
    'bower_components/angular/angular.js'
    , 'bower_components/underscore/underscore.js'
    , 'bower_components/angular-route/angular-route.js'
  ])
    .pipe(concat('angular-vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-css', function () {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ])
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('inject', ['compile-app', 'compile-vendor', 'compile-css'], function () {
  var target = gulp.src('app/index.html');

  var sources = gulp.src([
    , 'dist/**/*.js'
    , 'dist/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources, { read: false, ignorePath: '/dist/', addRootSlash: false }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['inject'], function() {

});

gulp.task('watch', function () {
  gulp.watch('app/**', ['build']);
});
