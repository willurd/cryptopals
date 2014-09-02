var expect = require('chai').expect;
var util = require('../util');

describe('util', function() {
  describe('htob', function() {
    var htob = util.htob;

    it('converts hex strings to binary strings', function() {
      expect(htob('abc123')).to.equal('101010111100000100100011');
    });
  });

  describe('htoab', function() {
    var htoab = util.htoab;
  });

  describe('abtos', function() {
    var abtos = util.abtos;
  });

  describe('stoab', function() {
    var stoab = util.stoab;
  });
});
