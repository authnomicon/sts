exports = module.exports = function() {
  
  // format and structure
  // TODO: Rename this to confirmation? 
  
  return function negotiateTokenContent(peers, cb) {
    //return cb(null, 'application/jwt');
    
    return cb(null, { type: 'application/jwt' });
    //return cb(null, { type: 'application/fe26.2' });
    //return cb(null, { type: 'application/x-fernet-json' });
    
    
    return cb(null, {
      type: 'application/jwt',
      dialect: 'urn:ietf:params:oauth:token-type:jwt',
      signingAlgorithms: [
        'rsa-sha256', 'hmac-sha256'
      ]
    })
  };
};
