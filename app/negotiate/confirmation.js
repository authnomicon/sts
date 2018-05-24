exports = module.exports = function() {
  
  var SUPPORTED_METHODS = [ 'none' ];
  
  
  return function negotiateConfirmation(recipients, presenter, cb) {
    if (!Array.isArray(recipients)) {
      recipients = [ recipients ];
    }
    
    // TODO: Initialize types to those supported by AS
    
    var supportedMethods = recipients[0].confirmationMethodsSupported || SUPPORTED_METHODS
      , recipient, i, len;
      
    // Filter the array of supported methods to those supported by the resource
    // servers this token will be used to authorize access to.
    for (i = 1, len = recipients.length; i < len; ++i) {
      recipient = recipients[i];
      if (recipient.confirmationMethodsSupported) {
        supportedMethods = supportedMethods.filter(function(e) {
          return recipient.confirmationMethodsSupported.indexOf(e) !== -1;
        });
      }
    }
    
    // Filter the array of supported types to those supported by the client that
    // is requesting access to the resource servers.
    if (presenter.confirmationMethodsSupported) {
      supportedMethods = supportedMethods.filter(function(e) {
        return presenter.confirmationMethodsSupported.indexOf(e) !== -1;
      });
    }
    
    return cb(null, supportedMethods[0]);
  };
};
