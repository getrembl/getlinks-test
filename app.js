var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var github = require('octonode');

var app = express();
var client = github.client();

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
  var ghuser = client.user(username);

  ghuser.followers({}, function(err, data, headers) {
    if (!data)
      res.render('index', { title: 'Who\'s following you?', user: username });
    else {
      var users = [];
      data.forEach(function(user) {
        users.push({
          login: user['login'],
          avatar_url: user['avatar_url'],
          url: user['url']
        });
      });
      console.log(users);
      res.render('index', { title: 'Who\'s following ' + username + '?', user: username, followers: users });
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
