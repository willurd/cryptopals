/*
Convert hex to base64
http://cryptopals.com/sets/1/challenges/1/

Tools:
  - Convert hex to binary string: http://www.binaryhexconverter.com/hex-to-binary-converter
  - Convert hex to base64 (for tests): http://tomeko.net/online_tools/hex_to_base64.php?lang=en
*/

var util = require('../util');

var stob = util.stob;
var htoab = util.htoab;

var BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

function htob64(hex) {
  var buffer = htoab(hex);
  var bit = 1;
  var sixBitMask = (1 << 6) - 1;
  var b64 = [];

  for (var i = 0, len = buffer.byteLength; i < len;) {
    var mask = sixBitMask << bit;
    var data = buffer[i] | (buffer[i + 1] << 0xFF);

    console.log('---');
    console.log('mask', stob(mask));
    console.log('data', stob(data));
    console.log('data & mask', stob(data & mask));
    console.log('(data & mask) >>> bit', stob((data & mask) >>> bit));
    console.log('BASE64_CHARS[(data & mask) >> bit]', BASE64_CHARS[(data & mask) >> bit]);

    b64.push(BASE64_CHARS[(data & mask) >> bit]);

    bit += 6;

    if (bit >= 8) {
      bit -= 8;
      i++;
    }
  }

  return b64.join('');
}

module.exports = {
  htob64: htob64
};
