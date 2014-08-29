/*
Convert hex to base64
http://cryptopals.com/sets/1/challenges/1/
*/

var HEX_CHARS = '0123456789abcdef'.split('');
var BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

function stoa(str) {
  var buffer = new ArrayBuffer(str.length / 2);
  var view = new Uint8Array(buffer);
  var bit = 0;
  // var fourBitMask = 0xf; // binary 1111
  var viewIndex = 0;

  for (var i = 0, len = str.length; i < len; i++) {
    var value = HEX_CHARS.indexOf(str[i]) << bit;

    console.log('---');
    console.log('viewIndex, view[viewIndex]', viewIndex, createBinaryString(view[viewIndex]));
    console.log('value', createBinaryString(value));
    // console.log('data & mask', createBinaryString(data & mask));
    // console.log('(data & mask) >>> bit', createBinaryString((data & mask) >>> bit));

    view[viewIndex] |= value;

    bit += 4;

    if (bit >= 8) {
      bit -= 8;
      viewIndex++;
    }
  }

  return buffer;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
function createBinaryString (nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}

function hexToBase64(hex) {
  var buffer = stoa(hex);
  var bit = 1;
  var sixBitMask = 0x3f; // binary 111111
  var b64 = [];

  for (var i = 0, len = buffer.byteLength; i < len;) {
    var mask = sixBitMask << bit;
    var data = buffer[i] + buffer[i + 1];

    // console.log('---');
    // console.log('mask', createBinaryString(mask));
    // console.log('data', createBinaryString(data));
    // console.log('data & mask', createBinaryString(data & mask));
    // console.log('(data & mask) >>> bit', createBinaryString((data & mask) >>> bit));

    b64.push(BASE64_CHARS[(data & mask) >> bit]);

    bit += 6;

    if (bit >= 8) {
      bit -= 8;
      i++;
    }
  }

  return b64.join('');

  // console.log(buffer);
  // var buffer = new ArrayBuffer(8);
  // var hexBuffer = new Uint8Array(buffer);

  // for (var i = 0, len = )
}

function test(hex, b64) {
  console.log(hexToBase64(hex));
  // if (hexToBase64(hex) === b64) {
  //   console.log('pass');
  // } else {
  //   console.log('fail');
  // }
}

test(
  '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d',
  'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
)