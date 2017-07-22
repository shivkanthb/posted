var fs = require('fs')

var gulp = require('gulp')
var swig = require('gulp-swig');
var yaml = require('js-yaml');
var del = require('del')
var gutil = require('gulp-util');
var data = require('gulp-data');
var marked = require('marked');
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
	return del(['build/*']);	
})

gulp.task('html', function () {
  var yaml_data = getPageData();
  console.log(yaml_data);
  return gulp.src('./source/*.html')
  	.pipe(data(yaml_data))
    .pipe(swig())
  	.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['clean','html'])