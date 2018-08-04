exports = module.exports = function(promptHandler, decisionHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', decisionHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/sts/consent/HTTPService'
];
exports['@path'] = '/consent';
exports['@require'] = [
  './handlers/prompt',
  './handlers/decision'
];
