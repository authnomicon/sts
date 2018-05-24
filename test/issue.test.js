/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/issue');


describe('issue', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('issue', function() {
    var tokens = {
      encode: function(){}
    };
    
  
    describe('default behavior', function() {
      var token;
    
      var negotiateFormatStub = sinon.stub().yields(null, { type: 'application/jwt' })
        , negotiateConfirmationStub = sinon.stub().yields(null, 'none');
    
      before(function() {
        sinon.stub(tokens, 'encode').yields(null, '2YotnFZFEjr1zCsicMWpAA');
      });
    
      after(function() {
        tokens.encode.restore();
      });
    
      before(function(done) {
        var claims = {
          user: {
            id: '1',
            displayName: 'John Doe'
          },
          scope: [ 'beep', 'boop' ]
        };
        var recipient = [
          { id: '112210f47de98100',
            identifier: 'https://api.example.com/',
            name: 'Example API' }
        ];
        var presenter = {
          id: 's6BhdRkqt3',
          name: 'Example Client'
        };
      
        var negotiate = factory(negotiateFormatStub, negotiateConfirmationStub, tokens);
        negotiate(claims, recipient, presenter, {}, function(err, t) {
          if (err) { return done(err); }
          token = t;
          done();
        });
      });
      
      it('should negotiate token confirmation', function() {
        expect(negotiateConfirmationStub.callCount).to.equal(1);
        expect(negotiateConfirmationStub.args[0][0]).to.deep.equal([
          { id: '112210f47de98100',
            identifier: 'https://api.example.com/',
            name: 'Example API' }
        ]);
        expect(negotiateConfirmationStub.args[0][1]).to.deep.equal({
          id: 's6BhdRkqt3',
          name: 'Example Client'
        });
      });
      
      it('should negotiate token format', function() {
        expect(negotiateFormatStub.callCount).to.equal(1);
        expect(negotiateFormatStub.args[0][0]).to.deep.equal([
          { id: '112210f47de98100',
            identifier: 'https://api.example.com/',
            name: 'Example API' }
        ]);
      });
      
      it('should encode token', function() {
        expect(tokens.encode.callCount).to.equal(1);
        expect(tokens.encode.args[0][0]).to.deep.equal({
          user: { id: '1', displayName: 'John Doe' },
          scope: [ 'beep', 'boop' ],
          audience: 
             [ { id: '112210f47de98100',
                 identifier: 'https://api.example.com/',
                 name: 'Example API' } ]
        });
        expect(tokens.encode.args[0][1]).to.deep.equal([ { id: '112210f47de98100',
                 identifier: 'https://api.example.com/',
                 name: 'Example API' } ]
        );
        expect(tokens.encode.args[0][2]).to.deep.equal({
          schema: 'urn:ietf:params:oauth:token-type:jwt'
        });
      });
    
      it('should yield token', function() {
        expect(token).to.equal('2YotnFZFEjr1zCsicMWpAA');
      });
    });
  
  }); // issue
  
});
