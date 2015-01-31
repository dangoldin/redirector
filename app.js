var application_root = __dirname;

var express = require('express');

var app = express();

var redir_map = {
  'ib.3lift.net': 'google.com',
  'ib.3lift.com': 'dan.triplelift.net:8007',
  'www.google.com' : 'www.yahoo.com'
};

app.get('*', function(req, res) {
  var urlInfo = { protocol: (req.connection.encrypted ? 'https': 'http'),
                  host: req.headers.host,
                  url: req.url
                },
      url = urlInfo.protocol + '://' + urlInfo.host + urlInfo.url,
      newHost = redir_map[urlInfo.host]
      newUrl = urlInfo.protocol + '://' + newHost + urlInfo.url;
  console.log(url + '=>' + newUrl);
  res.redirect(newUrl || url);
});

app.listen(80);

console.log('Server started on port 80');