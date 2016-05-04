var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace-task');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var pkg = require('./package.json');


gulp.task('clean', function() {
  return del(['./dist/']);
});


gulp.task('lint', function() {
  return gulp.src('./jquery.zoom.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('umd', ['clean'], function() {
  return gulp.src('./jquery.zoom.js')
    .pipe(umd({
      dependencies: function() {
        return [{
          name: '$',
          amd: 'jquery',
          cjs: 'jquery',
          global: 'jQuery'
        }];
      },
      exports: function() {
        return '$.zoom';
      },
      namespace: function() {
        return '$.zoom';
      }
    }))
    .pipe(replace({
      patterns: [
        {match: 'version', replacement: pkg.version},
        {match: 'homepage', replacement: pkg.homepage},
        {match: 'license', replacement: pkg.license}
      ]
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('build', ['umd', 'lint'], function() {
  return gulp.src('./dist/jquery.zoom.js')
    .pipe(sourcemaps.init())
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', ['build'], function() {
  gulp.watch(['./jquery.zoom.js', './umd.template.js'], ['build']);
});


gulp.task('default', ['build']);
