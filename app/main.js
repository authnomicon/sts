exports = module.exports = function(service) {
  var api = {};
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/authorize';
exports['@singleton'] = true;
exports['@require'] = [
  './aaa/service'
];
