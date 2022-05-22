const gulp = require('gulp');
const less = require('gulp-less');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css')
const del = require('del');

const paths = {
	styles: {
		src: 'src/styles/**/*.scss',
		dest: 'dist/css'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/js'
	}
};

function clean() {
	return del(['dist']);
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(less())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.styles.dest))
}

exports.clean = clean
exports.styles = styles;