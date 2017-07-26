var express = require('express')
var app = express()
const path = require('path')

const posts_path = path.join(__dirname, 'build')

app.use(express.static(posts_path))

app.get('/', (req,res) => {
	res.render('index')
})

app.get('/p/:post', (req,res) => {
	var post = req.params.post
	res.sendFile(posts_path + '/posts/' + post + '.html')
})

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("ERR");
});

app.listen(3000, (err) => {
	if(err) throw err
	console.log('> Ready on http://localhost:3000/')
})