exports = module.exports = function(negotiateFormat, negotiateConfirmation, tokens) {
  
  return function issue(message, audience, presenter, options, cb) {
    console.log('ISSUE TOKEN!');
    console.log(message);
    
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    // FIXME:
    message.audience = audience;
    
    negotiateConfirmation(audience, presenter, function(err, topts) {
      if (err) { return cb(err); }
      
      
      negotiateFormat(message.audience, function(err, copts) {
        if (err) { return cb(err); }
        
        copts.dialect = options.dialect || copts.dialect;
        copts.confidential = false;
        copts.audience = message.audience;
    
        //copts.type = 'http://schemas.modulate.io/tokens/jwt/twilio';
        //copts.dialect = 'http://schemas.modulate.io/tokens/jwt/twilio';
        
        // TODO: negotiate dialect
        
        var opts = {};
        opts.schema = 'urn:ietf:params:oauth:token-type:jwt';
        
    
        tokens.encode(message, copts, opts, function(err, token) {
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
