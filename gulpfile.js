'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');
const rigger = require('gulp-rigger');
const tinypng = require('gulp-tinypng-compress');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');


const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths =  {
  src: './src/',              // paths.src
  build: './build/'           // paths.build
};

var config = {
    mode: {
        symbol: {
            sprite: "sprite.svg",
            render: {
                scss: {
                    dest: '../../../scss/_sprite.scss'
                }
            }
        }
    }
};

function svgSpriteBuild() {
    return gulp.src( paths.src +'img/*.svg')
    // минифицируем svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(gulp-replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite(config))
        .pipe(gulp.dest( paths.build +'img/'));
};

function styles() {
  return gulp.src(paths.src + 'sass/main.scss')
    .pipe(sassGlob())
    .pipe(sass()) // { outputStyle: 'compressed' }
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rigger())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.build + 'css/'))
}


function scripts() {
  return gulp.src(paths.src + 'js/*.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(gulp.dest(paths.build));
}


function img() {
    return gulp.src(paths.src + 'img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'tNK8DHr7L24S5Ygz3BsfqDqn0w0yJzpn',
            log: true
        }))
        .pipe(gulp.dest(paths.build + "img"));
}

function fonts() {
    return gulp.src(paths.src + 'fonts/**/*')
        .pipe(gulp.dest(paths.build + "fonts"));
}

function clean() {
  return del('build/')
}

function watch() {
  gulp.watch(paths.src + 'sass/**/*.scss', styles);
  gulp.watch(paths.src + 'js/*.js', scripts);
  gulp.watch(paths.src + '*.html', htmls);
  gulp.watch(paths.src + 'src/img/*', img);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.clean = clean;
exports.watch = watch;
exports.img = img;
exports.fonts = fonts;
exports.svgSpriteBuild = svgSpriteBuild;

gulp.task('build', gulp.series(
  clean,
  styles,
  scripts,
  htmls,
  img,
  fonts,
  svgSpriteBuild
  // gulp.parallel(styles, scripts, htmls)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, htmls, img, fonts, svgSpriteBuild),
  gulp.parallel(watch, serve)
));

