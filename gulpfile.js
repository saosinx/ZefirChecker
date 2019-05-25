const connect = require('gulp-connect')
const del = require('del')
const fs = require('fs-extra')
const gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const tabify = require('gulp-tabify')

gulp.task('connect', (done) => {
	connect.server({
		port: 1337,
		livereload: true,
		root: 'dist',
	})
	done()
})

gulp.task('clean', (done) => {
	del(['dist/**/*'])
	done()
})

gulp.task('images', (done) => {
	fs.copy('./src/images', './dist/images/', (err) => {
		if (err) return console.error(err)
		return console.log('images copied!')
	})
	done()
})

gulp.task('pug', (done) => {
	gulp
		.src('src/*.+(pug|jade)')
		.pipe(pug({ pretty: true }))
		.pipe(tabify(2, false))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
	done()
})

gulp.task('sass', (done) => {
	gulp
		.src('src/styles.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
	done()
})

gulp.task('js', (done) => {
	gulp
		.src('src/*.+(js|json|md)')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
	done()
})

gulp.task('watch', (done) => {
	gulp.watch('src/**/*.(js|json|md)', gulp.series('js'))
	gulp.watch('src/**/*+(pug|jade)', gulp.series('pug'))
	gulp.watch('src/**/*.scss', gulp.series('sass'))
	done()
})

gulp.task(
	'default',
	gulp.series(
		'clean',
		gulp.parallel('js', 'sass', 'pug', 'images'),
		'connect',
		'watch',
	),
)
