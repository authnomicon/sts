exports = module.exports = function() {
  var path = require('path')
    , ejs = require('ejs')
  
  
  function prompt(req, res, next) {
    // TODO: Load this based on query param
    
    res.render('consent', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    prompt
  ];
};

exports['@require'] = [];
