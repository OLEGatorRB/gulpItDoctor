const gulp = require('gulp');
const less = require('gulp-less');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const { src } = require('gulp');


//пути от исходящих файлов к файлам назначения
const paths = {
	html: {
		src: 'src/*.html',
		dest: 'dist'
	},
	styles: {
		src: 'src/styles/**/*.scss',
		dest: 'dist/css'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/js'
	},
	images: {
		src: 'src/img/*',
		dest: 'dist/img'
	}
};

//задача для очистки каталога
function clean() {
	return del(['dist']);
}

//задача для минификации HTML
function html() {
	return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

//задача длдя обработки стилей
function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
}

//задача длдя обработки скриптов
function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
}

function img() {
	return	gulp.src(paths.images.src)
					.pipe(imagemin(
					))
					.pipe(gulp.dest(paths.images.dest))
}

//задача для отслеживания изменений в стилях
function watch() {
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch);

exports.clean = clean;
exports.img = img;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
