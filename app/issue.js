exports = module.exports = function(negotiateFormat, negotiateConfirmation, tokens) {
  
  return function issue(claims, audience, presenter, options, cb) {
    console.log('ISSUE TOKEN!');
    console.log(claims);
    
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    // FIXME:
    claims.audience = audience;
    
    negotiateType(audience, presenter, function(err, topts) {
      if (err) { return cb(err); }
      
      
      negotiateFormat(claims.audience, function(err, copts) {
        if (err) { return cb(err); }
        
        copts.dialect = options.dialect || copts.dialect;
        copts.confidential = false;
        copts.audience = claims.audience;
    
        //copts.type = 'http://schemas.modulate.io/tokens/jwt/twilio';
        //copts.dialect = 'http://schemas.modulate.io/tokens/jwt/twilio';
    
        tokens.encode('access', claims, copts, function(err, token) {
          if (err) { return cb(err); }
          return cb(null, token);
        });
      }); // negotiateFormat
    }); // negotiateType
  };
};

exports['@require'] = [
  './negotiate/format',
  './negotiate/confirmation',
  'http://i.bixbyjs.org/security/tokens'
];
