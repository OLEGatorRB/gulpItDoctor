const gulp = require('gulp');
const less = require('less');
const scss = require('scss');
const del = require('del');

function clean() {
	return del(['dist']);
}

exports.clean = clean;