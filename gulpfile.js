var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    minify_css = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync');

//DIST - SRC -------------------------------------------------------
var dist_js = 'dist/js';
var dist_css = 'dist/';
var dist_img = 'dist/img';

var src_sass = 'scss/**/*.scss';
var src_js = 'js/**/*.js';
var src_img = 'img/*';

//SASS TO CSS ------------------------------------------------------
gulp.task('sass', function () {
  return sass(src_sass)
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(autoprefixer('last 50 versions'))
    .pipe(concat('app.min.css'))
    .pipe(minify_css())
    .pipe(gulp.dest(dist_css))
    .pipe(notify({message: 'Sass saved! Reloading...'}))
    .pipe(browserSync.reload({stream: true}));
});

//JS --------------------------------------------------------------
gulp.task('js', function(){
  return gulp.src(src_js)
  .pipe(plumber())
  .pipe(babel({presets: ['env']}))
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest(dist_js))
  .pipe(notify({message: 'JS saved! Reloading...'}))
  .pipe(browserSync.reload({stream: true}));
});

//Watch --------------------------------------------------------------

gulp.task('watch', function(){
  browserSync.init({
    server: './'
    // proxy: 'localhost/gulp/'
  });
  gulp.watch(src_js, ['js']);
  gulp.watch(src_sass, ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});


//--------------------------------------------------------------

gulp.task('default', ['watch', 'sass', 'js']);
