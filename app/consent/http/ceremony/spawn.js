exports = module.exports = function() {
  var qs = require('querystring');


  // TODO: If no state, and there's a returnTo option, store that
  //       as initial state.

  function redirect(req, res, next) {
    var options = req.locals;
    
    
    var params = {
      client_id: options.clientID
    };
    if (options.scope) {
      params.scope = options.scope.join(' ');
    }
    
    var q = qs.stringify(params);
    return res.redirect('/consent' + (q ? '?' + q : ''));
  }


  return [
    redirect
  ];
};

exports['@require'] = [];
