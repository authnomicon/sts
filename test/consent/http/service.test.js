/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/consent/http/service');


describe('consent/http/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.authnomicon.org/js/sts/consent/HTTPService'
    ]);
    expect(factory['@path']).to.equal('/consent');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function promptHandler() {};
    function decisionHandler() {};
    
    var service = factory(promptHandler, decisionHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
