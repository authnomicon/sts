exports = module.exports = function(parse, authenticate, errorLogging, ceremony) {
  
  function process(req, res, next) {
    console.log('CONSENT DECISION!');
    console.log(req.user)
    console.log(req.body);
    
    // TODO: Add support for multiple audiences/scope, needs nested objects in form processing
    
    // TODO: clean this up so that there's a proper object structure.
    var consent = {
      resource: 'http://www.example.com/',
      client: req.body.client_id,
      scope: [ 'read', 'write' ]
    }
    
    // FIXME: Get session working
    req.user = { id: '5001' }
    
    res.locals.consent = consent;
    
    
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
