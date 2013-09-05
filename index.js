var path = require("path");
var express = require('express');
var builder = require('./builder.js');

module.exports = function(opts) {
  var router = express();

  opts.dev = 'dev' in opts ? opts.dev : true;
  opts.out = opts.out || "build";

  var rebuild = builder(opts);

  router.use(express.static(path.join(opts.root, opts.out)));

  router.get('/build.js', rebuild, function(req, res) {
    res.type('js');
    res.send(res.js);
  });

  router.get('/build.css', rebuild, function(req, res) {
    res.type('css');
    res.send(res.css);
  });

  return router;
};
