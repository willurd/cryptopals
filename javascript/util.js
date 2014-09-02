var HEX_CHAR_MAP = {};

'0123456789abcdef'.split('').forEach(function(chr, index) {
  HEX_CHAR_MAP[chr] = index;
});

/**
 * String to binary string.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 */
function itob(mask) {
  // mask must be between -2147483648 and 2147483647
  for (var flag = 0, shifted = mask, sMask = ""; flag < 32; flag++) {
    sMask += String(shifted >>> 31);
    shifted <<= 1;
  }

  return sMask;
}

/**
 * Hex string to binary string.
 */
function htob(hex) {
  return abtob(htoab(hex));
}

function abtob(buffer) {
  var binaryStrings = [];

  for (var i = 0, len = buffer.byteLength; i < len; i++) {
    binaryStrings.push(itob(buffer[i]));
  }

  return binaryStrings.join('');
}

/**
 * Hex string to array buffer.
 */
function htoab(string) {
  var buffer = new ArrayBuffer(string.length / 2);
  var view = new Uint8Array(buffer);
  var bit = 0;
  var viewIndex = 0;

  for (var i = 0, len = string.length; i < len; i++) {
    var value = HEX_CHAR_MAP[string[i]] << bit;

    view[viewIndex] |= value;
    bit += 4;

    if (bit >= 8) {
      bit -= 8;
      viewIndex++;
    }
  }

  return buffer;
}

/**
 * http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 */
function abtos(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

/**
 * http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 */
function stoab(string) {
  var buffer = new ArrayBuffer(string.length);
  var view = new Uint8Array(buffer);

  for (var i = 0, len = string.length; i < len; i++) {
    view[i] = string.charCodeAt(i);
  }

  return buffer;
}

module.exports = {
  htob: htob,
  htoab: htoab,
  abtos: abtos,
  stoab: stoab
};
