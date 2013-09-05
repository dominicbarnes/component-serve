var fs = require("fs");
var path = require("path");
var Builder = require('component-builder');

module.exports = function(opts) {
  return function(req, res, next) {
    var builder = new Builder(opts.root);

    if (opts.dev) builder.development();
    if (opts.plugins) opts.plugins.forEach(builder.use, builder);

    builder.addSourceURLs();
    builder.prefixUrls('./');
    builder.copyAssetsTo(opts.out);

    builder.build(function(err, obj) {
      if (err) return next(err);

      res.js = obj.require + obj.js;
      res.css = obj.css;

      fs.writeFile(builder.path(path.join(opts.out, "build.js")), res.js);
      fs.writeFile(builder.path(path.join(opts.out, "build.css")), res.css);

      next();
    });
  }
};
