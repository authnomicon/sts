exports = module.exports = function(negotiateFormat, negotiateConfirmation, tokens) {
  
  return function issue(message, recipients, presenter, options, cb) {
    console.log('ISSUE TOKEN!');
    console.log(message);
    
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    // FIXME:
    message.audience = recipients;
    
    negotiateConfirmation(recipients, presenter, function(err, confirm) {
      if (err) { return cb(err); }
      
      
      negotiateFormat(recipients, function(err, format) {
        if (err) { return cb(err); }
        
        //copts.dialect = options.dialect || copts.dialect;
        //copts.confidential = false;
        //copts.audience = message.audience;
    
        //copts.type = 'http://schemas.modulate.io/tokens/jwt/twilio';
        //copts.dialect = 'http://schemas.modulate.io/tokens/jwt/twilio';
        
        // TODO: negotiate dialect
        
        var opts = {};
        opts.schema = 'urn:ietf:params:oauth:token-type:jwt';
        opts.token = format;
        // FIXME: confidential should be true by default (possibly negotiated)
        opts.confidential = false;
    
        tokens.encode(message, recipients, opts, function(err, token) {
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
