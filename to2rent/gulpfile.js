const {src, dest, series, watch} = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    serve = require('browser-sync').create(),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

function clear() {
  return del('dist')
}

function libsCss() {
  return src(['node_modules/slick-carousel/slick/slick.css'])
    .pipe(concat('libs.css'))
    .pipe(dest('src/css'))
}

function css() {
  return src('src/css/*.css')
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/css'))
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function libsJs() {
  return src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(dest('src/js'))
}

function js() {
  return src([
    'src/js/*.js'
  ])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/js'))
}

function copy() {
  return src('src/img/*.*', {base: "src"})
    .pipe(dest('dist'));   
};

function dev() {
  serve.init({
    server: './dist'
  })

  watch('src/img/*.*', series(copy)).on('change', serve.reload)
  watch('src/*.html', series(html)).on('change', serve.reload)
  watch('src/js/*.js', series(js)).on('change', serve.reload)
  watch('src/css/*.css', series(css)).on('change', serve.reload)
}

exports.build = series(clear, libsJs, js, copy, libsCss, css, html)
exports.dev = series(clear, libsJs, js, copy, libsCss, css, html, dev)
exports.clear = clear
