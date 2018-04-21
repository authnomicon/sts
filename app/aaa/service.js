exports = module.exports = function(IoC, logger) {
  
  return IoC.create('aaa/servicex')
    .catch(function(err) {
      //console.log('ERRO CREATE AAA SERVICE');
      //console.log(err);
      //process.exit(-1)
      
      // TODO: Check that the error is failure to create app/service
      
      return IoC.create('./internals/service');
      //throw err;
    })
    .then(function(service) {
      return service;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
