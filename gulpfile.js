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
var rename = require("gulp-rename");
var nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');

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

gulp.task('js', function () {
  return gulp.src('./source/js/*.js')
    .pipe(gulp.dest('./build/js'))
})

gulp.task('scss', function () {
  return gulp.src('./source/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('html', function () {
  var yaml_data = getPageData();
  return gulp.src('./source/*.html')
  	.pipe(data(yaml_data))
    .pipe(swig())
  	.pipe(gulp.dest('./build/'))
})

gulp.task('posts_html', function (done) {
  var yaml_data = getPageData()
  var post_data = yaml_data;
  yaml_data['posts'].forEach(create);
  done();
})

function create(post, index) {
  var yaml_data = getPageData()
  var post_data = yaml_data;
  var temp = [post]
  post_data['posts'] = temp;
  post_data['config']['single_post'] = true;
  post_data['config']['title'] = post_data['config']['posts'][index];
  return gulp.src('./source/index.html')
    .pipe(data(post_data))
    .pipe(swig())
    .pipe(rename(post_data['config']['posts'][index]+'.html'))
    .pipe(gulp.dest('./build/posts/'))
}

gulp.task('default', ['clean'], function() {
  gulp.start(['fonts', 'images', 'scss', 'js', 'posts_html', 'html'])
})

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

gulp.task('dev', function () {
  livereload.listen();
  nodemon({
    script: 'server.js',
    ext: 'js scss md',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

