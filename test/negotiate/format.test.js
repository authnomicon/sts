/* global describe, it */

var expect = require('chai').expect;
var factory = require('../../app/negotiate/format');


describe('negotiate/format', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('negotiate', function() {
    
    describe('default behavior', function() {
      var type;
      
      before(function(done) {
        var resource = {
          id: '112210f47de98100'
        }
        
        var negotiate = factory();
        negotiate(resource, function(err, t) {
          if (err) { return done(err); }
          type = t;
          done();
        });
      });
      
      it('should yield type', function() {
        expect(type).to.deep.equal({
      type: 'application/jwt',
      dialect: 'urn:ietf:params:oauth:token-type:jwt',
      signingAlgorithms: [
        'rsa-sha256', 'hmac-sha256'
      ]
    });
      });
    });
    
  });
  
});
