var expect = require('chai').expect;
var util = require('../util');
var htob64 = require('./htob64').htob64;

var stob = util.stob;
var htob = util.htob;
var htoab = util.htoab;
var abtos = util.abtos;
var stoab = util.stoab;

function test(hex, binary, b64) {
  var actual = htob64(hex);

  if (actual === b64) {
    console.log('pass');
  } else {
    console.log('fail: expected "' + b64 + '" got "' + actual + '"');
  }
}

describe('htob64', function() {

});

// test('abc123', '101010111100000100100011', 'q8Ej');

// test(
//   '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d',
//   'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
// );
