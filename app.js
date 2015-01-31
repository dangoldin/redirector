var application_root = __dirname;

var express = require('express'),
    fs = require('fs');

var app = express();

setInterval(function () {
  var tempMappings = fs.readFileSync('./mappings.json');
  try {
    tempMappings = JSON.parse(tempMappings);
  } catch (err) {
    console.log('Failed to read mappings');
    console.log(err);
    tempMappings = {};
  }
  mappings = tempMappings;

  console.log('Loading mappings');
  console.dir(mappings);
}, 3000);

app.get('*', function(req, res) {
  var urlInfo = { protocol: (req.connection.encrypted ? 'https': 'http'),
                  host: req.headers.host,
                  url: req.url
                },
      url = urlInfo.protocol + '://' + urlInfo.host + urlInfo.url,
      newHost = mappings[urlInfo.host]
      newUrl = urlInfo.protocol + '://' + newHost + urlInfo.url;
  console.log(url + '=>' + newUrl);
  res.redirect(newUrl || url);
});

app.listen(80);

console.log('Server started on port 80');