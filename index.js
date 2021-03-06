var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
var hostName = '127.0.0.1';
var port = 8080;
let {exec} = require('child_process');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/', function(req, res) {
  res.send('ok');
});

app.post('/post', function(req, res) {
  console.log('请求参数：', req.body);
  exec(
    'cd /home/www/tgf21 && git pull origin master',
    function(err, stdout, stderr) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      console.log(stdout);
      res.send(stdout);
    }
  );
});

app.listen(port, hostName, function() {
  console.log(`服务器运行在http://${hostName}:${port}`);
});
