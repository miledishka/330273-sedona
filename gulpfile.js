"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minifyjs = require("gulp-js-minify");
var concat = require("gulp-concat");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var del = require("del");

// Обновляем сборку препроцессора
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//Сжимаем изображения
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

 //Создаём WebP-изображения
gulp.task("webp", function () {
 return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

// Сборка и минификация JS
gulp.task("js", function () {
  return gulp.src("sass/**/*.js")
    .pipe(plumber())
    .pipe(concat("script.js"))
    .pipe(gulp.dest("js"))
    .pipe(minifyjs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("js"));
});


gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

// Создаём posthtml-include
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("source"));
});

 // Сборка и минификация JS для build
gulp.task("js-mini", function () {
  return gulp.src("sass/**/*.js")
    .pipe(plumber())
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(minifyjs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

// Копирование html-файлов для живого сервера build
gulp.task("html:copy", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

// Копирование файлов для build
gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

// Очистка папки build (всегда висит)
gulp.task("clean", function () {
  return del("build");
});

// Обновляем работу с шаблонами
gulp.task("html", function () {
 return gulp.src("source/*.html")
   .pipe(posthtml([
     include()
   ]))
   .pipe(gulp.dest("build"));
});

// Обновляем запуск билда
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));

// Обновляем локальный сервер
gulp.task("server", function () {
  server.init({
    server: "build/"
  });
  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
