var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var templateCache = require('gulp-angular-templatecache');

gulp.task('clean', function () {
  return gulp.src( [
       './tmp'
      ,'./dist'
    ]
    , {read: false})
    .pipe(clean());
});

gulp.task('templateCache', ['clean'], function () {
  return gulp.src('./app/partials/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('./tmp'));
});


gulp.task('concat', ['templateCache'], function() {
  return gulp.src([
    './bower_components/angular/angular.js'
    , './bower_components/underscore/underscore.js'
    , './bower_components/angular-route/angular-route.js'
    , './tmp/**/*.js'
    , './app/**/*.js'
  ])
    .pipe(ngAnnotate())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('inject', ['concat'], function () {
  var target = gulp.src('./app/index.html');

  var sources = gulp.src([
    , './dist/**/*.js'
    , './bower_components/bootstrap/dist/css/bootstrap.css'
    , './app/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['inject'], function() {

});


