exports = module.exports = function() {
  
  var SUPPORTED_METHODS = [ 'none' ];
  
  
  return function negotiateConfirmation(resources, client, cb) {
    if (!Array.isArray(resources)) {
      resources = [ resources ];
    }
    
    // TODO: Initialize types to those supported by AS
    
    var supportedMethods = resources[0].confirmationMethodsSupported || SUPPORTED_METHODS
      , resource, i, len;
      
    // Filter the array of supported methods to those supported by the resource
    // servers this token will be used to authorize access to.
    for (i = 1, len = resources.length; i < len; ++i) {
      resource = resources[i];
      if (resource.confirmationMethodsSupported) {
        supportedMethods = supportedMethods.filter(function(e) {
          return resource.confirmationMethodsSupported.indexOf(e) !== -1;
        });
      }
    }
    
    // Filter the array of supported types to those supported by the client that
    // is requesting access to the resource servers.
    if (client.confirmationMethodsSupported) {
      supportedMethods = supportedMethods.filter(function(e) {
        return client.confirmationMethodsSupported.indexOf(e) !== -1;
      });
    }
    
    return cb(null, supportedMethods[0]);
  };
};
