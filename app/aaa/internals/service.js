exports = module.exports = function(IoC, logger) {
  var klamm = require('klamm');
  
  
  var service = klamm();
  
  // TODO: Introspect the container and load up proper authorization models.
  //       For example, token-based models, etc.   This should actually go into
  //       bixby-security.  Authnomicon is for the authorization server (aka PDP)
  
  return Promise.resolve(service)
    .then(function(service) {
      return service;
    });
};

exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
