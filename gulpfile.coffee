babel = require 'gulp-babel'
browserify = require 'browserify'
buffer = require 'vinyl-buffer'
coffeeify = require 'coffeeify'
del = require 'del'
fs = require 'fs-extra'
gulp = require 'gulp'
log = require 'gulplog'
pug = require 'gulp-pug'
sass = require 'gulp-sass'
source = require 'vinyl-source-stream'
tabify = require 'gulp-tabify'
watchify = require 'watchify'

opts =
	entries: './src/zefir.coffee'
	extension: ['.coffee']
	debug: true

b = watchify browserify(watchify.args, opts).transform coffeeify, bare: true

b.on 'time', (time) => console.log"#{time}ms"
b.on 'log', log.info

gulp.task 'clean', (done) =>
	del ['dist/**/*']
	do done

gulp.task 'other', (done) =>
	gulp
		.src 'src/*.+(json|md)'
		.pipe gulp.dest 'dist'
	do done

gulp.task 'images', (done) =>
	fs.copy './src/images', './dist/images/', (err) =>
		return console.error err if err
		return console.log 'images copied!'
	do done

gulp.task 'pug', (done) =>
	gulp
		.src 'src/*.+(pug|jade)'
		.pipe pug pretty: true 
		.pipe tabify 2, false
		.pipe gulp.dest 'dist'
	do done

gulp.task 'sass', (done) =>
	gulp
		.src 'src/styles.scss'
		.pipe sass(outputStyle: 'compressed').on 'error', sass.logError
		.pipe gulp.dest 'dist'
	do done

gulp.task 'build', (done) =>
	b.bundle()
		.on 'error', log.error.bind log, 'Browserify Error'
		.pipe source 'zefir.js'
		.pipe do buffer
		.pipe do babel
		.pipe gulp.dest 'dist'
	do done

gulp.task 'watch', (done) =>
	gulp.watch 'src/**/*.(coffee)', gulp.series 'build'
	gulp.watch 'src/**/*.(pug|jade)', gulp.series 'pug'
	gulp.watch 'src/**/*.scss', gulp.series 'sass'
	gulp.watch 'src/**/*.(json|md)', gulp.series 'other'
	do done

gulp.task 'default', gulp.series('clean', gulp.parallel('build', 'sass', 'pug', 'images', 'other'), 'watch')
