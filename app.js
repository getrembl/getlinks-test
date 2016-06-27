var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index', { title: 'Who\'s following you?' });
});

app.post('/', function (req, res) {
  var username = req.body['username'];
  res.render('index', { title: 'Who\'s following you?', user: username });
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
