var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    , './bower_components/angular/angular.js'
    , './bower_components/underscore/underscore.js'
    , './bower_components/angular-route/angular-route.js'
    , './app/**/*.js'
    , './bower_components/bootstrap/dist/css/bootstrap.css'
    , './app/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});
