exports = module.exports = function(parse, authenticate, errorLogging, ceremony) {
  
  function process(req, res, next) {
    
    // FIXME: this won't resume, because of lack of `prev`.  Need to check this condition
    //  in flowstate
    //req.state = req.state || { name: 'fastfed-enable-application' }
    // TODO: marshal consent in some sensible way.
    //req.state.consent = true;
    next();
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('consent',
      authenticate([ 'session' ]),
      process,
      errorLogging()
    )
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
