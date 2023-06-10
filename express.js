var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// 정적 파일 제공 설정
app.use(express.static(__dirname + '/public'));
app.use('/src', express.static(__dirname + '/public/src'));

//main
app.get('/', function(req, res) {
  res.render('main');
});

//help
app.get('/help', function(req, res) {
  res.render('help');
});

//bread
app.get('/bread', function(req, res) {
  res.render('bread');
});


app.get('/package', function(req, res) {
  res.render('package');
});

app.get('/sticker', function(req, res) {
  res.render('sticker');
});


app.get('/pokedex', function(req, res) {
  res.render('pokedex');
});
app.listen(3000);
console.log('Server is listening on port 3000');
