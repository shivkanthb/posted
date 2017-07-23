var fs = require('fs')

var gulp = require('gulp')
var swig = require('gulp-swig');
var yaml = require('js-yaml');
var del = require('del')
var gutil = require('gulp-util');
var open = require('gulp-open');
var data = require('gulp-data');
var sass = require('gulp-sass');
var marked = require('marked');
var gls = require('gulp-live-server');
var renderer = new marked.Renderer();

var readIndexYml = function() {
  return yaml.safeLoad(fs.readFileSync('./source/index.yml', 'utf8'))
}

var getPageData = function() {
  var config = readIndexYml()
  var posts = config.posts
	.map(function(post) { return './source/posts/' + post + '.md'; })
	.map(function(post) { return fs.readFileSync(post, 'utf8'); })
	.map(function(post) { return marked(post, { renderer: renderer }); });
  return {
  	config: config,
  	posts: posts
  }
}

gulp.task('clean', function() {
	return del(['build/*'])	
})

gulp.task('fonts', function () {
  return gulp.src('./source/fonts/**/*').pipe(gulp.dest('build/fonts'));
})

gulp.task('images', function () {
  return gulp.src('./source/images/**/*').pipe(gulp.dest('build/images'));
})

gulp.task('css', function () {
  return gulp.src('./source/css/*.css')
    .pipe(gulp.dest('./build/css'))
})

gulp.task('scss', function () {
  return gulp.src('./source/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('html', function () {
  var yaml_data = getPageData();
  // console.log(yaml_data);
  return gulp.src('./source/*.html')
  	.pipe(data(yaml_data))
    .pipe(swig())
  	.pipe(gulp.dest('./build/'))
})

gulp.task('default', ['clean', 'fonts', 'images', 'scss', 'html'])

gulp.task('serve', ['default'], function() {

  gulp.watch(['./source/*.html', './source/includes/**/*'], ['html']);
  gulp.watch('./source/stylesheets/**/*', ['sass']);
  gulp.watch('./source/index.yml', ['html']);

  var server = gls.static('build', 8080);
  server.start();

  gulp.watch(['build/**/*'], function (file) {
    server.notify.apply(server, [file]);
  });

  gulp.src(__filename).pipe(open({uri: 'http://localhost:8080'}));
});