/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* jshint globalstrict: false */
/* umdutils ignore */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
define('pdfjs-dist/build/pdf.worker', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
factory((root.pdfjsDistBuildPdfWorker = {}));
  }
}(this, function (exports) {
  // Use strict in our context only - users might not want it
  'use strict';

var pdfjsVersion = '1.5.296';
var pdfjsBuild = 'a0a6e6d';

  var pdfjsFilePath =
    typeof document !== 'undefined' && document.currentScript ?
      document.currentScript.src : null;

  var pdfjsLibs = {};

  (function pdfjsWrapper() {



(function (root, factory) {
  {
    factory((root.pdfjsCoreArithmeticDecoder = {}));
  }
}(this, function (exports) {

/* This class implements the QM Coder decoding as defined in
 *   JPEG 2000 Part I Final Committee Draft Version 1.0
 *   Annex C.3 Arithmetic decoding procedure
 * available at http://www.jpeg.org/public/fcd15444-1.pdf
 *
 * The arithmetic decoder is used in conjunction with context models to decode
 * JPEG2000 and JBIG2 streams.
 */
var ArithmeticDecoder = (function ArithmeticDecoderClosure() {
  // Table C-2
  var QeTable = [
    {qe: 0x5601, nmps: 1, nlps: 1, switchFlag: 1},
    {qe: 0x3401, nmps: 2, nlps: 6, switchFlag: 0},
    {qe: 0x1801, nmps: 3, nlps: 9, switchFlag: 0},
    {qe: 0x0AC1, nmps: 4, nlps: 12, switchFlag: 0},
    {qe: 0x0521, nmps: 5, nlps: 29, switchFlag: 0},
    {qe: 0x0221, nmps: 38, nlps: 33, switchFlag: 0},
    {qe: 0x5601, nmps: 7, nlps: 6, switchFlag: 1},
    {qe: 0x5401, nmps: 8, nlps: 14, switchFlag: 0},
    {qe: 0x4801, nmps: 9, nlps: 14, switchFlag: 0},
    {qe: 0x3801, nmps: 10, nlps: 14, switchFlag: 0},
    {qe: 0x3001, nmps: 11, nlps: 17, switchFlag: 0},
    {qe: 0x2401, nmps: 12, nlps: 18, switchFlag: 0},
    {qe: 0x1C01, nmps: 13, nlps: 20, switchFlag: 0},
    {qe: 0x1601, nmps: 29, nlps: 21, switchFlag: 0},
    {qe: 0x5601, nmps: 15, nlps: 14, switchFlag: 1},
    {qe: 0x5401, nmps: 16, nlps: 14, switchFlag: 0},
    {qe: 0x5101, nmps: 17, nlps: 15, switchFlag: 0},
    {qe: 0x4801, nmps: 18, nlps: 16, switchFlag: 0},
    {qe: 0x3801, nmps: 19, nlps: 17, switchFlag: 0},
    {qe: 0x3401, nmps: 20, nlps: 18, switchFlag: 0},
    {qe: 0x3001, nmps: 21, nlps: 19, switchFlag: 0},
    {qe: 0x2801, nmps: 22, nlps: 19, switchFlag: 0},
    {qe: 0x2401, nmps: 23, nlps: 20, switchFlag: 0},
    {qe: 0x2201, nmps: 24, nlps: 21, switchFlag: 0},
    {qe: 0x1C01, nmps: 25, nlps: 22, switchFlag: 0},
    {qe: 0x1801, nmps: 26, nlps: 23, switchFlag: 0},
    {qe: 0x1601, nmps: 27, nlps: 24, switchFlag: 0},
    {qe: 0x1401, nmps: 28, nlps: 25, switchFlag: 0},
    {qe: 0x1201, nmps: 29, nlps: 26, switchFlag: 0},
    {qe: 0x1101, nmps: 30, nlps: 27, switchFlag: 0},
    {qe: 0x0AC1, nmps: 31, nlps: 28, switchFlag: 0},
    {qe: 0x09C1, nmps: 32, nlps: 29, switchFlag: 0},
    {qe: 0x08A1, nmps: 33, nlps: 30, switchFlag: 0},
    {qe: 0x0521, nmps: 34, nlps: 31, switchFlag: 0},
    {qe: 0x0441, nmps: 35, nlps: 32, switchFlag: 0},
    {qe: 0x02A1, nmps: 36, nlps: 33, switchFlag: 0},
    {qe: 0x0221, nmps: 37, nlps: 34, switchFlag: 0},
    {qe: 0x0141, nmps: 38, nlps: 35, switchFlag: 0},
    {qe: 0x0111, nmps: 39, nlps: 36, switchFlag: 0},
    {qe: 0x0085, nmps: 40, nlps: 37, switchFlag: 0},
    {qe: 0x0049, nmps: 41, nlps: 38, switchFlag: 0},
    {qe: 0x0025, nmps: 42, nlps: 39, switchFlag: 0},
    {qe: 0x0015, nmps: 43, nlps: 40, switchFlag: 0},
    {qe: 0x0009, nmps: 44, nlps: 41, switchFlag: 0},
    {qe: 0x0005, nmps: 45, nlps: 42, switchFlag: 0},
    {qe: 0x0001, nmps: 45, nlps: 43, switchFlag: 0},
    {qe: 0x5601, nmps: 46, nlps: 46, switchFlag: 0}
  ];

  // C.3.5 Initialisation of the decoder (INITDEC)
  function ArithmeticDecoder(data, start, end) {
    this.data = data;
    this.bp = start;
    this.dataEnd = end;

    this.chigh = data[start];
    this.clow = 0;

    this.byteIn();

    this.chigh = ((this.chigh << 7) & 0xFFFF) | ((this.clow >> 9) & 0x7F);
    this.clow = (this.clow << 7) & 0xFFFF;
    this.ct -= 7;
    this.a = 0x8000;
  }

  ArithmeticDecoder.prototype = {
    // C.3.4 Compressed data input (BYTEIN)
    byteIn: function ArithmeticDecoder_byteIn() {
      var data = this.data;
      var bp = this.bp;
      if (data[bp] === 0xFF) {
        var b1 = data[bp + 1];
        if (b1 > 0x8F) {
          this.clow += 0xFF00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += (data[bp] << 9);
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? (data[bp] << 8) : 0xFF00;
        this.ct = 8;
        this.bp = bp;
      }
      if (this.clow > 0xFFFF) {
        this.chigh += (this.clow >> 16);
        this.clow &= 0xFFFF;
      }
    },
    // C.3.2 Decoding a decision (DECODE)
    readBit: function ArithmeticDecoder_readBit(contexts, pos) {
      // contexts are packed into 1 byte:
      // highest 7 bits carry cx.index, lowest bit carries cx.mps
      var cx_index = contexts[pos] >> 1, cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;

      if (this.chigh < qeIcx) {
        // exchangeLps
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;
        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }
        // exchangeMps
        if (a < qeIcx) {
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }
      // C.3.3 renormD;
      do {
        if (this.ct === 0) {
          this.byteIn();
        }

        a <<= 1;
        this.chigh = ((this.chigh << 1) & 0xFFFF) | ((this.clow >> 15) & 1);
        this.clow = (this.clow << 1) & 0xFFFF;
        this.ct--;
      } while ((a & 0x8000) === 0);
      this.a = a;

      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  };

  return ArithmeticDecoder;
})();

exports.ArithmeticDecoder = ArithmeticDecoder;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreBidi = {}));
  }
}(this, function (exports) {

  // Character types for symbols from 0000 to 00FF.
  var baseTypes = [
    'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'S', 'B', 'S', 'WS',
    'B', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN',
    'BN', 'BN', 'B', 'B', 'B', 'S', 'WS', 'ON', 'ON', 'ET', 'ET', 'ET', 'ON',
    'ON', 'ON', 'ON', 'ON', 'ON', 'CS', 'ON', 'CS', 'ON', 'EN', 'EN', 'EN',
    'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'ON', 'ON', 'ON', 'ON', 'ON',
    'ON', 'ON', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'ON', 'ON',
    'ON', 'ON', 'ON', 'ON', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'ON', 'ON', 'ON', 'ON', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'B', 'BN',
    'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN',
    'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN', 'BN',
    'BN', 'CS', 'ON', 'ET', 'ET', 'ET', 'ET', 'ON', 'ON', 'ON', 'ON', 'L', 'ON',
    'ON', 'ON', 'ON', 'ON', 'ET', 'ET', 'EN', 'EN', 'ON', 'L', 'ON', 'ON', 'ON',
    'EN', 'L', 'ON', 'ON', 'ON', 'ON', 'ON', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'ON', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L',
    'L', 'L', 'L', 'ON', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'
  ];

  // Character types for symbols from 0600 to 06FF
  var arabicTypes = [
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'CS', 'AL', 'ON', 'ON', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM',
    'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN',
    'AN', 'ET', 'AN', 'AN', 'AL', 'AL', 'AL', 'NSM', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM',
    'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'NSM', 'ON', 'NSM',
    'NSM', 'NSM', 'NSM', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL',
    'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL'
  ];

  function isOdd(i) {
    return (i & 1) !== 0;
  }

  function isEven(i) {
    return (i & 1) === 0;
  }

  function findUnequal(arr, start, value) {
    for (var j = start, jj = arr.length; j < jj; ++j) {
      if (arr[j] !== value) {
        return j;
      }
    }
    return j;
  }

  function setValues(arr, start, end, value) {
    for (var j = start; j < end; ++j) {
      arr[j] = value;
    }
  }

  function reverseValues(arr, start, end) {
    for (var i = start, j = end - 1; i < j; ++i, --j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  function createBidiText(str, isLTR, vertical) {
    return {
      str: str,
      dir: (vertical ? 'ttb' : (isLTR ? 'ltr' : 'rtl'))
    };
  }

  // These are used in bidi(), which is called frequently. We re-use them on
  // each call to avoid unnecessary allocations.
  var chars = [];
  var types = [];

  function bidi(str, startLevel, vertical) {
    var isLTR = true;
    var strLength = str.length;
    if (strLength === 0 || vertical) {
      return createBidiText(str, isLTR, vertical);
    }

    // Get types and fill arrays
    chars.length = strLength;
    types.length = strLength;
    var numBidi = 0;

    var i, ii;
    for (i = 0; i < strLength; ++i) {
      chars[i] = str.charAt(i);

      var charCode = str.charCodeAt(i);
      var charType = 'L';
      if (charCode <= 0x00ff) {
        charType = baseTypes[charCode];
      } else if (0x0590 <= charCode && charCode <= 0x05f4) {
        charType = 'R';
      } else if (0x0600 <= charCode && charCode <= 0x06ff) {
        charType = arabicTypes[charCode & 0xff];
      } else if (0x0700 <= charCode && charCode <= 0x08AC) {
        charType = 'AL';
      }
      if (charType === 'R' || charType === 'AL' || charType === 'AN') {
        numBidi++;
      }
      types[i] = charType;
    }

    // Detect the bidi method
    // - If there are no rtl characters then no bidi needed
    // - If less than 30% chars are rtl then string is primarily ltr
    // - If more than 30% chars are rtl then string is primarily rtl
    if (numBidi === 0) {
      isLTR = true;
      return createBidiText(str, isLTR);
    }

    if (startLevel === -1) {
      if ((strLength / numBidi) < 0.3) {
        isLTR = true;
        startLevel = 0;
      } else {
        isLTR = false;
        startLevel = 1;
      }
    }

    var levels = [];
    for (i = 0; i < strLength; ++i) {
      levels[i] = startLevel;
    }

    /*
     X1-X10: skip most of this, since we are NOT doing the embeddings.
     */
    var e = (isOdd(startLevel) ? 'R' : 'L');
    var sor = e;
    var eor = sor;

    /*
     W1. Examine each non-spacing mark (NSM) in the level run, and change the
     type of the NSM to the type of the previous character. If the NSM is at the
     start of the level run, it will get the type of sor.
     */
    var lastType = sor;
    for (i = 0; i < strLength; ++i) {
      if (types[i] === 'NSM') {
        types[i] = lastType;
      } else {
        lastType = types[i];
      }
    }

    /*
     W2. Search backwards from each instance of a European number until the
     first strong type (R, L, AL, or sor) is found.  If an AL is found, change
     the type of the European number to Arabic number.
     */
    lastType = sor;
    var t;
    for (i = 0; i < strLength; ++i) {
      t = types[i];
      if (t === 'EN') {
        types[i] = (lastType === 'AL') ? 'AN' : 'EN';
      } else if (t === 'R' || t === 'L' || t === 'AL') {
        lastType = t;
      }
    }

    /*
     W3. Change all ALs to R.
     */
    for (i = 0; i < strLength; ++i) {
      t = types[i];
      if (t === 'AL') {
        types[i] = 'R';
      }
    }

    /*
     W4. A single European separator between two European numbers changes to a
     European number. A single common separator between two numbers of the same
     type changes to that type:
     */
    for (i = 1; i < strLength - 1; ++i) {
      if (types[i] === 'ES' && types[i - 1] === 'EN' && types[i + 1] === 'EN') {
        types[i] = 'EN';
      }
      if (types[i] === 'CS' &&
          (types[i - 1] === 'EN' || types[i - 1] === 'AN') &&
          types[i + 1] === types[i - 1]) {
        types[i] = types[i - 1];
      }
    }

    /*
     W5. A sequence of European terminators adjacent to European numbers changes
     to all European numbers:
     */
    for (i = 0; i < strLength; ++i) {
      if (types[i] === 'EN') {
        // do before
        var j;
        for (j = i - 1; j >= 0; --j) {
          if (types[j] !== 'ET') {
            break;
          }
          types[j] = 'EN';
        }
        // do after
        for (j = i + 1; j < strLength; ++j) {
          if (types[j] !== 'ET') {
            break;
          }
          types[j] = 'EN';
        }
      }
    }

    /*
     W6. Otherwise, separators and terminators change to Other Neutral:
     */
    for (i = 0; i < strLength; ++i) {
      t = types[i];
      if (t === 'WS' || t === 'ES' || t === 'ET' || t === 'CS') {
        types[i] = 'ON';
      }
    }

    /*
     W7. Search backwards from each instance of a European number until the
     first strong type (R, L, or sor) is found. If an L is found,  then change
     the type of the European number to L.
     */
    lastType = sor;
    for (i = 0; i < strLength; ++i) {
      t = types[i];
      if (t === 'EN') {
        types[i] = ((lastType === 'L') ? 'L' : 'EN');
      } else if (t === 'R' || t === 'L') {
        lastType = t;
      }
    }

    /*
     N1. A sequence of neutrals takes the direction of the surrounding strong
     text if the text on both sides has the same direction. European and Arabic
     numbers are treated as though they were R. Start-of-level-run (sor) and
     end-of-level-run (eor) are used at level run boundaries.
     */
    for (i = 0; i < strLength; ++i) {
      if (types[i] === 'ON') {
        var end = findUnequal(types, i + 1, 'ON');
        var before = sor;
        if (i > 0) {
          before = types[i - 1];
        }

        var after = eor;
        if (end + 1 < strLength) {
          after = types[end + 1];
        }
        if (before !== 'L') {
          before = 'R';
        }
        if (after !== 'L') {
          after = 'R';
        }
        if (before === after) {
          setValues(types, i, end, before);
        }
        i = end - 1; // reset to end (-1 so next iteration is ok)
      }
    }

    /*
     N2. Any remaining neutrals take the embedding direction.
     */
    for (i = 0; i < strLength; ++i) {
      if (types[i] === 'ON') {
        types[i] = e;
      }
    }

    /*
     I1. For all characters with an even (left-to-right) embedding direction,
     those of type R go up one level and those of type AN or EN go up two
     levels.
     I2. For all characters with an odd (right-to-left) embedding direction,
     those of type L, EN or AN go up one level.
     */
    for (i = 0; i < strLength; ++i) {
      t = types[i];
      if (isEven(levels[i])) {
        if (t === 'R') {
          levels[i] += 1;
        } else if (t === 'AN' || t === 'EN') {
          levels[i] += 2;
        }
      } else { // isOdd
        if (t === 'L' || t === 'AN' || t === 'EN') {
          levels[i] += 1;
        }
      }
    }

    /*
     L1. On each line, reset the embedding level of the following characters to
     the paragraph embedding level:

     segment separators,
     paragraph separators,
     any sequence of whitespace characters preceding a segment separator or
     paragraph separator, and any sequence of white space characters at the end
     of the line.
     */

    // don't bother as text is only single line

    /*
     L2. From the highest level found in the text to the lowest odd level on
     each line, reverse any contiguous sequence of characters that are at that
     level or higher.
     */

    // find highest level & lowest odd level
    var highestLevel = -1;
    var lowestOddLevel = 99;
    var level;
    for (i = 0, ii = levels.length; i < ii; ++i) {
      level = levels[i];
      if (highestLevel < level) {
        highestLevel = level;
      }
      if (lowestOddLevel > level && isOdd(level)) {
        lowestOddLevel = level;
      }
    }

    // now reverse between those limits
    for (level = highestLevel; level >= lowestOddLevel; --level) {
      // find segments to reverse
      var start = -1;
      for (i = 0, ii = levels.length; i < ii; ++i) {
        if (levels[i] < level) {
          if (start >= 0) {
            reverseValues(chars, start, i);
            start = -1;
          }
        } else if (start < 0) {
          start = i;
        }
      }
      if (start >= 0) {
        reverseValues(chars, start, levels.length);
      }
    }

    /*
     L3. Combining marks applied to a right-to-left base character will at this
     point precede their base character. If the rendering engine expects them to
     follow the base characters in the final display process, then the ordering
     of the marks and the base character must be reversed.
     */

    // don't bother for now

    /*
     L4. A character that possesses the mirrored property as specified by
     Section 4.7, Mirrored, must be depicted by a mirrored glyph if the resolved
     directionality of that character is R.
     */

    // don't mirror as characters are already mirrored in the pdf

    // Finally, return string
    for (i = 0, ii = chars.length; i < ii; ++i) {
      var ch = chars[i];
      if (ch === '<' || ch === '>') {
        chars[i] = '';
      }
    }
    return createBidiText(chars.join(''), isLTR);
  }

exports.bidi = bidi;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreCharsets = {}));
  }
}(this, function (exports) {

var ISOAdobeCharset = [
  '.notdef', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar',
  'percent', 'ampersand', 'quoteright', 'parenleft', 'parenright',
  'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'colon', 'semicolon', 'less', 'equal', 'greater', 'question',
  'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
  'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'braceleft', 'bar', 'braceright', 'asciitilde', 'exclamdown', 'cent',
  'sterling', 'fraction', 'yen', 'florin', 'section', 'currency',
  'quotesingle', 'quotedblleft', 'guillemotleft', 'guilsinglleft',
  'guilsinglright', 'fi', 'fl', 'endash', 'dagger', 'daggerdbl',
  'periodcentered', 'paragraph', 'bullet', 'quotesinglbase',
  'quotedblbase', 'quotedblright', 'guillemotright', 'ellipsis',
  'perthousand', 'questiondown', 'grave', 'acute', 'circumflex', 'tilde',
  'macron', 'breve', 'dotaccent', 'dieresis', 'ring', 'cedilla',
  'hungarumlaut', 'ogonek', 'caron', 'emdash', 'AE', 'ordfeminine',
  'Lslash', 'Oslash', 'OE', 'ordmasculine', 'ae', 'dotlessi', 'lslash',
  'oslash', 'oe', 'germandbls', 'onesuperior', 'logicalnot', 'mu',
  'trademark', 'Eth', 'onehalf', 'plusminus', 'Thorn', 'onequarter',
  'divide', 'brokenbar', 'degree', 'thorn', 'threequarters', 'twosuperior',
  'registered', 'minus', 'eth', 'multiply', 'threesuperior', 'copyright',
  'Aacute', 'Acircumflex', 'Adieresis', 'Agrave', 'Aring', 'Atilde',
  'Ccedilla', 'Eacute', 'Ecircumflex', 'Edieresis', 'Egrave', 'Iacute',
  'Icircumflex', 'Idieresis', 'Igrave', 'Ntilde', 'Oacute', 'Ocircumflex',
  'Odieresis', 'Ograve', 'Otilde', 'Scaron', 'Uacute', 'Ucircumflex',
  'Udieresis', 'Ugrave', 'Yacute', 'Ydieresis', 'Zcaron', 'aacute',
  'acircumflex', 'adieresis', 'agrave', 'aring', 'atilde', 'ccedilla',
  'eacute', 'ecircumflex', 'edieresis', 'egrave', 'iacute', 'icircumflex',
  'idieresis', 'igrave', 'ntilde', 'oacute', 'ocircumflex', 'odieresis',
  'ograve', 'otilde', 'scaron', 'uacute', 'ucircumflex', 'udieresis',
  'ugrave', 'yacute', 'ydieresis', 'zcaron'
];

var ExpertCharset = [
  '.notdef', 'space', 'exclamsmall', 'Hungarumlautsmall', 'dollaroldstyle',
  'dollarsuperior', 'ampersandsmall', 'Acutesmall', 'parenleftsuperior',
  'parenrightsuperior', 'twodotenleader', 'onedotenleader', 'comma',
  'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle',
  'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle',
  'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle',
  'colon', 'semicolon', 'commasuperior', 'threequartersemdash',
  'periodsuperior', 'questionsmall', 'asuperior', 'bsuperior',
  'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
  'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior',
  'tsuperior', 'ff', 'fi', 'fl', 'ffi', 'ffl', 'parenleftinferior',
  'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall',
  'Asmall', 'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall',
  'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall', 'Msmall', 'Nsmall',
  'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall',
  'Vsmall', 'Wsmall', 'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary',
  'onefitted', 'rupiah', 'Tildesmall', 'exclamdownsmall', 'centoldstyle',
  'Lslashsmall', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall',
  'Brevesmall', 'Caronsmall', 'Dotaccentsmall', 'Macronsmall',
  'figuredash', 'hypheninferior', 'Ogoneksmall', 'Ringsmall',
  'Cedillasmall', 'onequarter', 'onehalf', 'threequarters',
  'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths',
  'seveneighths', 'onethird', 'twothirds', 'zerosuperior', 'onesuperior',
  'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
  'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
  'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior',
  'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior',
  'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior',
  'periodinferior', 'commainferior', 'Agravesmall', 'Aacutesmall',
  'Acircumflexsmall', 'Atildesmall', 'Adieresissmall', 'Aringsmall',
  'AEsmall', 'Ccedillasmall', 'Egravesmall', 'Eacutesmall',
  'Ecircumflexsmall', 'Edieresissmall', 'Igravesmall', 'Iacutesmall',
  'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall',
  'Ogravesmall', 'Oacutesmall', 'Ocircumflexsmall', 'Otildesmall',
  'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall', 'Uacutesmall',
  'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall',
  'Ydieresissmall'
];

var ExpertSubsetCharset = [
  '.notdef', 'space', 'dollaroldstyle', 'dollarsuperior',
  'parenleftsuperior', 'parenrightsuperior', 'twodotenleader',
  'onedotenleader', 'comma', 'hyphen', 'period', 'fraction',
  'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle',
  'fouroldstyle', 'fiveoldstyle', 'sixoldstyle', 'sevenoldstyle',
  'eightoldstyle', 'nineoldstyle', 'colon', 'semicolon', 'commasuperior',
  'threequartersemdash', 'periodsuperior', 'asuperior', 'bsuperior',
  'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
  'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior',
  'tsuperior', 'ff', 'fi', 'fl', 'ffi', 'ffl', 'parenleftinferior',
  'parenrightinferior', 'hyphensuperior', 'colonmonetary', 'onefitted',
  'rupiah', 'centoldstyle', 'figuredash', 'hypheninferior', 'onequarter',
  'onehalf', 'threequarters', 'oneeighth', 'threeeighths', 'fiveeighths',
  'seveneighths', 'onethird', 'twothirds', 'zerosuperior', 'onesuperior',
  'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
  'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
  'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior',
  'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior',
  'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior',
  'periodinferior', 'commainferior'
];

exports.ISOAdobeCharset = ISOAdobeCharset;
exports.ExpertCharset = ExpertCharset;
exports.ExpertSubsetCharset = ExpertSubsetCharset;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreEncodings = {}));
  }
}(this, function (exports) {

  var ExpertEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'space', 'exclamsmall', 'Hungarumlautsmall', '', 'dollaroldstyle',
    'dollarsuperior', 'ampersandsmall', 'Acutesmall', 'parenleftsuperior',
    'parenrightsuperior', 'twodotenleader', 'onedotenleader', 'comma',
    'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle',
    'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle',
    'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'colon',
    'semicolon', 'commasuperior', 'threequartersemdash', 'periodsuperior',
    'questionsmall', '', 'asuperior', 'bsuperior', 'centsuperior', 'dsuperior',
    'esuperior', '', '', 'isuperior', '', '', 'lsuperior', 'msuperior',
    'nsuperior', 'osuperior', '', '', 'rsuperior', 'ssuperior', 'tsuperior',
    '', 'ff', 'fi', 'fl', 'ffi', 'ffl', 'parenleftinferior', '',
    'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall',
    'Asmall', 'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall',
    'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall', 'Msmall', 'Nsmall',
    'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall',
    'Vsmall', 'Wsmall', 'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary',
    'onefitted', 'rupiah', 'Tildesmall', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', 'exclamdownsmall', 'centoldstyle', 'Lslashsmall',
    '', '', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall', 'Brevesmall',
    'Caronsmall', '', 'Dotaccentsmall', '', '', 'Macronsmall', '', '',
    'figuredash', 'hypheninferior', '', '', 'Ogoneksmall', 'Ringsmall',
    'Cedillasmall', '', '', '', 'onequarter', 'onehalf', 'threequarters',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths',
    's�
�+�m��J e�kN����J���e9$�B{�e�v1;5���Y�A�dN�>|�#�$5Ih�,d�p�k����֒�Ӑ���
����s���8�pg��ͥ�6�G��q�5�eF��4�A�M�3|���A��Q{��WhI��Y~5=��k�	�圓��Q�ZY�1R?gp��]C�Q�4��ծ��C�C¤QOzIZr*��,����L�.,n}R&S�)rm��`9h���S�\n�]f����#�B���L"��%���&�T`�"yÞ�N��L%B�K# וC�#:S�V����)�ɿ�#�1F�����	�N�BO�T$��;:������>��t�	ٓ��U����Z���?X���,�"}.�;�EA��;)��^��'7o<'
*�	H�ec�#���J��]ַr��OQ%y7tE-�;e
u'���S�%�w ����u���%�1\A:e4�c���G륜Wu%��DO��~ƛ�gK��������6�8�U!m���Ϳ���#t%Dn�w ����3��蚛9�*z@�{Gg��Di7�,u��V���5Wh�W�pD��\o¹[q��
�iUy���?uO�f�[�.?��$ռ=��g_Y�0�L��"ص�B�U���3�1-|�Z;5[��s��|w�",6��2 ��(V�����0�L��P���̧�w0d��Oaӆ��-|7��y�G���f�i���]���9�"��lvv]['��� ��p��������a�q.���e���yCc��,/h�	ȩ�,��\�O����}�ΐd��dEx(ӏX �b�W�|pk����O%@�YT(&P��f[�T�;�������}�q��(����]��q�Pן�@a,�
��/3 ��1D�5c	��EW��/��
6�!6>s��Y�b A�;z�ׇ+��C��(�~�hv�#G�c�=�2�U��A�w����k�h����́6����b�+�*.�S��RzŞ�-(��S���h�b0�
�y����w�;T�
9�4g�9��tc1���CbȒPD�v�!/�˨�o�z��g��9{�;A.
�O�(O۰ݵ�q���\ �M��}����R
��K1j�#�R��]�7Jtv��G��������ѣg��4i�!e�(����Nۋ�a���%Z��g���"
AV2���s:�tI�T!Te�%B��`B��F�M�P8��0��-�
��D�x/�;���x���Mn`��4R��U@HB�lή�
)�]V�b�lԿ�ò�A���nUb���t�8���O�S1�!v�±T���N�J�i�*L3�"M�H�#5&�T˓D� ���bZ�|B$H�B����l�t�OY��r��&C���� C��Hc����L�6mm�@ ����\mH�R�7�T���c��
QS���c
T���v�q�p�
5_�j�..��}�����H��^4��LU>
���W�Q����'㱔 ڄ�m��GF���ؚ���/�-�
�B��R���J��M"���L|�"�68\7ut��%O��ݡD,��%D߉-�M�� �޺6G;��B��Xkkk#��N�
��%��ewS�9$��sBS��o�vC%�Zwp��0��:k1*1�,-��qо
���i�1i�hf�F����E��>��h�_�߯k;�����.,��V賿����\���Ο�+����	iJ�6E�<g��i��X��brG6�&/�k�_�
FP<1��>}��Z�>s�֚MX�qnzfiH���,�7��7d9ۡ{�Z��t,ܩ����
��� _�f��b�tA��@�"��
+���-:���n:D5�ԡc�]�*G7�=�@�C8�Q%R��趮�-���2N6�>6cԋE6�Ә�5�o���C�Т8zb͠t���V1V�V�F�� C��1�S3�7�m���{h���]{���Ϗ�� !�}����0���oχ��6Mh�p/լ�d9E�(�!~���mN;���ae)�CE7�� � ��^?�.v�5oDo��|�t�������=7h��V)��&�\3}[d��{A�$E���L�`@p>��>g3�+���#٨kx\uI����]ud�Ѵ�3 a� ^^�$W�Ow� T�F��l|��#G�x+��0?4���ަ꽰 c�{�(��b�ݬU�(��oG�����\ic��~d"t��^z��t��/~d��xh��3~3�>����:��t�$>�k�'��
�v�������5��PA�0����+���F��Q4����vg�WDo#���)�G�����iߖ_��o���\jʢ��
�9��d2��k����HP�\R�������I,SHܒ��{�M��s�dH�ݴA��1�����K��amA"`�P4���X�]��(��I�Cj���#+�"�#���VR�nX5e����l��Z���V��OQ��GP,Ԋc�s�նEI��)�eӪ��TSG�OI"�K�0�*�Ωȷ�C׮kN+�Z#�U�葨j�ʤ ��ĦWm��oBa�A,����^0�|��8�dG`}$�/!.����&%ޯVVgo>� ÖY�6����pd/����-��d:Y�
b�e�da�/�Gi$��;,��Ao��e���l�ɒ� M�� sz�Q�7����b�2�mےq����+���P����B�9Y���|ѐK�:���&D�<!Q2��clYU5��
lt�x�c�Hu���"��}��@S!ǟS���3p#�D�ѯ�����~�p3j���������AtH�:&v!8R��|�(˒BV7f�B��}�:W��~�/�NR�xO�s	g�|�(������~g �Vq���*��PT>o�9Ox��?�b�3w�D)"ՠ^ʚ܂��Y��~�D��$h�m���m�g���ZnQ@l$��
`ς��@�d#�d�ɳ�,�ذ�r�����9p
�
:+��)!�
�����U����#�bugI�0`
�o����A:D>��*
M�Ae�P9�YbD�Qk���3��a�m�;��zZ5B�FT�°a�fQ�G�&"��10\�N�EUA��	$� �L�Ѧ�%A�
�q`��{��&IV+�A���v�*b���v�fؿI��Au@]P.AXj�@X��E�=��^��o�w5�44b�G^KKt�V�z�������?���6y ��r��0J��#�"�4ىD ���7JZ$����I��?J�,I|*QqsԄ�G"��烾0AI���z_�e	[�-�W%����(��A�}jʤd,�B2�
1�[sL�xlK�U�l����L7_��x�j�2+=4�#yڧg���!uo����5��y�NWkMg]ESK����ש���+lb���]��џ�p��8m���A�� ٢6�Q��0��>m`f�������S�92������>:9�fF*�0dg�GKigT���}�] �_��i��x���:� �c�M��~݂X����ɂ�
UU�[d1_��jF�K<漷)���=�=����;)��+���.��t��,�Ew���~��x$���.b�|�
Рr=��Sjh�aj�wX��dk��!jY��I���;Tbi[Y8�A�0$a�8Mv�Ġ�
�T1�mo){{2�����>�A�u���Y��%Ll���g�\G�3���^��M��P|cCk �_�㟙~(�s؟m��áD=��J԰����Jv��/�I�d�>��	0�c�gF">?�t\� \������,k�m@8�3*+�g�Zv�k(^s\H4�-|�>ו�ռ;ب�Z�K��8ӽ&:�;���[��n�J�޾(�n�.
i��9���ʽ�;�Ω�zӑ�m���_]å�{��k�ͷ
�-�'��Љ��3/hX6~�) �ĩ)�͍���^(�߭_��q����r�U�����B��P� 4�@��u����r��*i9b�h��IS��Ǝx�3��3r��B� �f�;F��5w?F8�6{;��Dz�Nn����ӛ�3��4o̎Y�͆q��g�Cآe�0�/��c8����A��"~%����/Ea�V�g<|a#������`��[D�]P/�^���8K��/N��'[J��G�?����nq��6�%ou����W�u�1�ڻ0^'`���2��{�D�7����	�G��Q����@��w�)��������
d���[\T3�7&��Xh�rh��3�^��
����R�T_��A\f��W}��`�~�5Y
�q�k��Ցs�s��<»"Bj�V_��[T�l�)$���s
�J?{��z"����u%Hș[�w?݊�gH�b^����
�8sE,�kA{���N8�I�88�Y�csWcǧ���T���J�v@�	A�5&���3�?�	#2=���:e�Y�{��M�� ZyL`,W�Ѻj��؛��M��O�/��w�M���<1g�b�]9��3�O��i<M���}b0C��N.�>�L�|��J/�-� ��{�:P\!!��C�1�;�@���쀣{�w(�]X2Zq�+�VM�u�s����s-=V^2U�]>�ÀYl��#���#����-��A
������T��=u	ȋ�.�W ����dڬ��{ջ?C�Uù9|��~���b-�-�3��K��U�BZy1l���T(
��kkW�~'g�l�(=^��?6�����o�F�?	���:�v�
�_����0D<�Y���P�jmg�x%���5��,��L��iq�_�����)��x�r�*>F�1L����/��ˋ�t���hU�����!!���Q�g	2'�7$�U�y
�7$�V-b�D�Z?���u]��x�|I%��
�K%�W!6����������mC��WE<>t%��{����N�iy�G"�#�\���p1=�,�l�r�����{�Wn�k6j9`�R���<x��B��;yo5B�8%nUpP�=�����,���
���'b�L��Lw��	
N��Y�*�����M�/�D��vr���+�?�����>��d�~���Y�sf�,a��xT�y��eP0�&��]�1HE�����W�����~�SQ�m>��I�����B�~�8Au&g8�j_\�)l�#�&Cp.�u)6�����"�$��"o箩Kl�������Q D��A�~�@�9x�����q�`���?�ڴW	A���M�t���T�	̈ZHҁ����`�	q�m����Q�;���Ć\6>�:�d_�i`�D�@W���cZ��$㠡W��.��s�
��9QAC��4ڰ@�hN{��<P�|�Ou��2��Éj�5�����gn��q��	ǲ4�Y�I���h,}'���/I�l �]N$�'�>�ߝ>ADD��(�~O��	����#c�~��.uP_�2�'2�*�#��A<�H�B�����.g�&�CC��(�B����s�c�{著D> C�Յe��2w4>Y������ٺ��==j��Њ���'������ci�@�]�j��
��:�?�)�!P%��c�#wjN/ғ���OU�;�����LFЙ[j���9�d�\^N�鄊���x$1��Fv��0�۠p�`� v�����/Ŀ%za��Kb�ZQ���z�/B�D
L�ޭ�iC�:�]���4N	&%��O�Nn�kVǀo�	΄;\@�	j�G��c����^E�+��7�1e�)�D��,L�
L�v�'55&�i��Pz�
+ H�:�d�RR�F�׊�{��K��_[.}׿��۫��ʏ6V6IQ`ɗ#~�%=�Ԓ�T������I��k��tc]Q��y��~��@��=���D����N�U���c��c�>��e$��i��X�&\���^�02�Q �����|��)P��gV�f�wѵo�'h���E�~�Ҡ�'!JW��:H~�b�s/����z�	$0�*�@J�{3�Ӧ̣�=�8�R2y� 8	 �U�d0܌Wg��h��yihk�H��Bp��Ɓ{�x'�%:�)<�`^�!1�
|Z������q:����>Ļ�>�	ty��|S�<�[u�J�����X!��	�=K���M�⹷��G 5؅r��=�	��騴+9œ�l��H��.L�������,G�n�+���*Z��m�>�U�� $I�ڢ+�A �o��uk\M����ѷJ6t1�h�� �zݼF��
�Qψ��Rq��m8�JpX�`<Q��
J���cʑ��mV�9���p}�q5E,6�;��j{���L�`	��k3$����*�C
?)4:�{�P�a�����Rߟ����M�s3����{]���ϭj���q�^��m��K���m#
����������v�N�������uBK01L�$���	��l�s�nj�NB�� �_y�6�_4�1��
�V���.������E���LX�H�R^���*~~��cAH~mi�����걻7S�)5��T/ͤ��>������64�P �0��; ^t䅜�e�u�I���w��f�V��P�+��4�`*��E��>�(��~-���##J�����-������q(�v�N���1ơ�����R��!߶\����;Q��-�?��J�@����J�g_�cmd�7�~�V\���lQ���Q-c�5�L5��J��Ch���Ν8�:q��*�CZ�CI��C�l�N�
����֣�'���x�~�o��<n�y2��̤
��V~�*��;�^�V�
Յ/NX���9�ZB���E�%����7��멧[��7B�9�P�YyL^�@-z?�_P�Qt�*�x%��7P�Wu��2�Q(=2��~�	dm	�;��D?�S���|^7t;=�� i���m҇�ʆ2E�c�������_]�Ř��-ҽ!�<�噉�Vԣ��Uy��^�3j�����:�B82�oI�xxo۷�N�3�ly;��}$��U��BSy
�R���\a�O�IO�+9>����c�a�*�g�e!�.P�J��2�G$�lN�|_�^)��O�����ʴ�b�<�{uZ�)5ɜ^J�a����hӻAG����
@I�C�U�����6z����́�Jt�����{[�	��@��X1C��G������l��dwK�e&�Ż��(b�8x|8g�q�
�i<���Y�S',�͟Q�
�Z�NC�J����� �����2�i#�m�A�,���Z�|����ilŵNV�r���|���ͽ��Ю���(���Ձ��i3��������)G��Ppή�V����/�K���7�0���8�)�1��퐘Tu5�,#mz��n��14�̪�ʄpo4E�mˏwW���p�+���E��k&j�>^���b�����2�5ui
�z�{��2Q�c�;�����A,,��#��6n�%VV�]�!�G`X�����ۯy�C��b��XDM^�AA���1A#�G��`�'nY����tG��Bi�}�����얞���d�Uy�q�෷��I�DV��W�$�Ë�m
������"�߫r����+�fDGJ/\��ϋg�H�9M�#V8�FE�ͽ��қĲH���~`�­N���j�e-�Dp������G�`U�n�|�16��w�Y���8�x*���*'��gWMZ�0)�/����Nc��2�Ȉ!�˿�Ў��
Wǚ�;1�~J�m���{����fe�>�'B�}�z��\&�Qכ���uPN�wE������ʯW�%-�I��c��CL�Nq�ҧ�u���A��^5���)���(���4��9�y��:_3V�2B��[EA��c��LpE���t�=�y�Gx�������՛U��_�?ܕ�|�!E�KٍB.�A��rgC�Z���z-v��\�`Qa�&YP�-R5̻�w��(�W��w��
@Z]z���<&H�q��"��w#��~���.�zUH=�
�G�����L�0�B�~�x���I�(����C+�m� ��J���E�|R:M��ab(�i"i�fl�M����[hۭ�����ni������:2R�	���=C²у��~�1�ÿwkܧ�5����sڀl� -ᝈg27��t�V���B����i��cq���ЭE�7��ABg��539l�Ld�+�����"��w�\G���B��i�A������Z13'���ʷ�˱���ց��8:a
���<i���ZN�IF|��[^^�©LLm��$y�NWj-q�m�1E��6�m�=ʞ��	{����{F?�N�?��Hj�k�s~�<�J6|��ԕ���~T�kR�*35�?6�h|6e����17��f�w��`�M��=��S��h�2�ˬ9t���PU1:�?����X�n$i1��c��+�C*G����ZHB�D�\����<�F7s!�]��D��;�25_
Q[m<��
�4�S2���v��j�%v�3D�}��M�c�CT؜=v\�M]�&��,�.k�ٳ����Mta�}���Zr���6��i����J�B�/���)���3r3�凜�HVb��bj�0>`|ׄ�c߸��L�FtT�S,.P����u�/�p���Z��^
SO_0
r��@݊�Qlw�%,\���9�8� ��l��ci�/~u��� ��<t�� ���d�l��ҋ��w�_�_�ԗɡ�0^�����B�Cܼ���C�1k���F ��LY~�s��+�V����m6�B�l-����� ���h��[��nY�a̸D���vv�^���E�	,���m0�`�{��ȷ��c��P!�ce�����&UЧ�*��} V�B���}��/�<��ٳ��7�C��4��c�N�@g���΁r��G=um���A�25�ڮ�l�x�������{��$p���C��*���?�<bx�̱Y @��z{�M�*�ʵX���99&����B�i�R��Mcj�������mC�t�� �D��X!�G�k�Y��ѥ��,ʦ�����R�Y]��tS��6?���7uܧ�S�i��:��-��Rn}FcM�b����� $oE�͞�;"��'M�v[h���(��ȵ3U9q4%���Uڷ[�A��9V�dɍ�+�mj��}
j�����j��F��ʉlF*x-U6��*��
���X�ȫ��)���<�Y���t�4}
ӫ`+����>tK���'�hO۩�i�"�)���i��ׯ�a�� 
oU�V0-M����y�ϸM�4 -����=5V�wG�݈65�����<jaU�/��9�X���O�V0�>v�k��Q��)>pY{H��I�[���2g[U]R�'��
qc�Tݾ�
��L �ض��TB&Rq�C��)�L�l�lW����Zϛ�_������w/�M����ŧ�]ߧ~���
#n
!�;�.~iIS�*7MS�Kg�";�1�R�v��<���L6�h�i�BP�`D�}��v4*��$s%7iB�O�߲�L��;f��Э�۽����Z�U�?�׉�.��ˆ�������y�����
w��."l��h�P+ޏ��^&ZX�`�¯k��g����<,�@af?�-�r\[�mg%G�nRv�6j�v����I�6Qw�*Wꤺ�f���u�
�1�T��\R����UvS���J�Z���Ac���4�	����6�a�f-Q����6��g��P9��IP��k"�F[�[�$Z��Q�J��B�e� [W�}�GW}��oD���:�I��pj('���L�|����dG)M�!�}C?b���Ь:ñ������2�XѠt�V|��,+K���)�1z�
��fo?_oY��x���U�X]�j9G�ҴPOe!��m_�@�t,.�٥�m��uP�&�t����#A���i��}߉��y���+��~���p�s?����@r���Z�[΅��:���B#�����h���xϑ'��B�����H�f�
�atQ�^��g���r$uC�u�-���aʶ�G���d w�8�)u5yy��FJP/E �l���^O����u��wwyU&"^��jB���D�H���b��
]z�^���Be@��v4�(�;E����"B�6!rȘB�Q�G�4q�y
���NF��K[X��V�XIֵ���1��!?+4,=K��^������Pх++:�6��#������ʼ��)@�N�u�������b?���ˆ���n�����ƉO��mO��.A4z��!5C/㈟r��zЧfE"�><~���2{%|a�1�F����[d�5d�\�r�-���W5�<$١�f\
�
}\v�0����5���>�(a�*.񉽔��!Xt���Hu�C4�Z)'�x#���{��h�\��ng�_�[�W�'A��y�j�5����8Uƾ������8���	O�Ζ�y�q��h���K`m8���N��$��	����r1U��R�R���D>=K������K�X[��Tv��
�y�q@/�����1�q8�C��E
�)���H�� ��O���_ܠ�A��̟�E����i���<�_}��
özW~p�\j�;2�7<Z��_���g�|�
 ��x�.�<<�&r<rd�!@�@�@�@���4 � ������[����h�� ���������/�3B��:J��w`���2f4�bDk˫+�
W��L
6���&�[��
�܇��L�������N��"�=���ONY�S�%8R��-���0�����<���-9�+v�U)��E��H��0�L�wQ�тAV?��s~�@'ޙƘ��&]?	A٫EC��uUMҭ��D2�XO��ѩ�H�/�_���gz����>���^NZ.�0y�	`aDxv��`��p�IE�<��uL��&�*q���D�<��8~oX��v�V�i	V��R���܁�kil]�(�o�~	�[h��H��זek
c�@�@G�ț�r�Q�'���������C��V ��ϫ-!�A�0�+�a/ ����4��Q�(�7K��V�[� ���-;��N�xRO@hS��DQ������(� ����G�Ѡ+DH�P�E/~�mj/(6.�.uI9s����f�H�oG;i[p).��ܘ�VQ�zWKeh�S����G�B���Z��='W��җg�z%������+��i�C5��px���$a�.ڥ�/�Hm*���'�A��$�
9$S�'ڂ
s�8�N�8�f6��61�� �]��ܴ� _����Ž��
�.�-�P?����W(_J&����4�Ӌ�B��::�8��J�)�}�(%��+ɷUs���:�)
�HXW8�Kg�s��d�ɋ�g�Jш��R�Xr�����=�j���Y6-*hϓ�YQ?���*���S���){���U����+��6��'`MVlEI�����؏T;,��7�⮢��kd��׍�'�z^���V:q��<ɟ��G��aM����"���S�('*�S��ԯU�PX�h��~�RM`Xr7?N>�A��(�I^U�Z��^���Kl"L��9y/�ɝ9��4��7��U��pq3��ɿ��n=g�AB���-��Q`O����Ҵ��9<���-���hT݇��~�T/���C�?ؙ�r�M�(^��ш��晉v����<���r��>~Qa�JH�w���eb�����H��Қ������>>��`ѲtK\X�Ln�Zv�x�b+�ˣ�[�z"�v���G��I*_UP׃�$��u����L��8e��t,�Rٯ���E:̅��%;+�#I���[&|���|�6r"�`�ұB������bО�����w2_��{;�^�nȤ_y���c'7i��&[��#�k߷�}�'&��i�yV������~ߤm�������<��<O�>qFH���p�h�����R�0��Gў�����;h��T'jԉjǢM�u�I�8	��(#�����[����:�Dj�'<!�f����hf
�@N
?������(v�l��w�YQ��9�ۻ�'�"j�i��M���Tc�{>�@�E�x�5����IK�,���pר����/�__��\9r=�p�S��!8�@�b��
���_I��|�e(+��5:S>�Z����1��
�Xk0�zj"ܘ���*6\��2\��{�����?AO�W9Q��a���)c�!��M�[�%�*�:Nx!Rwb@edS�eb2�Q���q{9��?x\�:�e��yM�<��$��`\�ٟp�<D��jM�@�CjM�^�@u�{�4Eto;T�|>��T���_*v,c��FZŘ��qdle0��)��
�V*����1�)JU���|�_E?�]t<'c���ZZYky�e���]-[ײ�m~q}��'��
s@��
�J~�;j�>��yƄ���C�_B�
�,cTbFT���@����Y���+0"I��cT�$�,��
h�Z	E�g�@M$��a8O`
���۶	]LM C"��pB6�I�0�i��#��*jfHiA�z��-2BZR��cb��ME�ز۔�cQ �F�}�
^W�<�(����h�E�D���\����%r��:ΐCE���\����T���d�/���k��p8�C(�5�&
VU�� �R�F��<���;)������_=a)�}�s��8}&g��4�SCZ�ZØD��տ��t��.�vl��fi��Wi���z
���A_F@e�+|_�<D�֠��h�M�4 c��\/��p�bj�Y��y�
X��Ѐ�%>�pۏ/��bL�Z���)@�BS o�����o+a��xdF1��E�
(�zp�j1{^���߭>
V�
&U���_L���+o���?0� �(�m�{CEY|D���+E}F
�z��.2�1���9�>���K�Q/"_P�(��,4�� �F�������&�Z��T����{H��^s?�	�~������-s�>�ѩ�bh�
~C��ǮZ�+}�w�W>ogK�o%�Ҭ��m����Y���~;ޟ�)�����	��k�],V@z&C��ֵi�x:�d;͵��4�l��F��N�7M�����n�<���Z�yo^�����6�R�B�_����ɵ�0����"Ι��Ip�&�)����/�G�w��Rc�-�G%��(��s�4;�U�Sk��k����*�8V�ٶn[Ov��<��(��?/�[��6^�f>��U�~T��˲���ޞŒ[�N�ٲZ,i�9�|�
�k>K�L&���S��W�	��0P�\P6�����*�ф���]\ р��.I����F���7����Ho0����,(�Q7��P`L�r�����?X h	|G�%��zyLt�g�1-Rh�0و`���'lm���B!����b835ʞ����g3�+�� �AH \��L�ӣ��k�c��klp1I�X��57&�:��O$9��wNi��7B�I�{ߧ����8ٓ�O�h';%ݧ+�g��^�u���x�<aݞH&=�5�%��@�gR�#�J|`iurX��ۻ��:�T7��o=������9�X��ثJ][qP�6Y�Oh5�GoY���ʭ,#+^�3yvlNs�`�l�t$~����~V[
n埘�+�ɘ�]����H�Qbcb�����_����nL@
����Ų�o��߳��}ݱM�w49O��3N�>�)߁k��Ln,����N2�HE���#O�I�s�C�%�=��Կq��$�Άp�����u}M��	֋4l�S�"6;Xw�g�w�w��lg��V�b��\��C+g�^$3��Q����T�YRq�l�9N%���a$K>I״Y��-0]{��܈�<	�f*�K���PROqv샸Kf���ܮ�����[�t�Q����3��FI�}���pz��1�7\T_1{�o�K���ܨ��x	F���nR�U�4�~�h��q��D��id��|�Mʷm�\�OW����j�,��f6ݩʪЌ;��+'��$4��i	��+�.n���J�9
N�p���v�R���]O�no:Ŀ�F��5ss?�>�������n�y�p��k�r
3�Fb�ҕ�\�x���Ia#�~�B�����r{=�UW���*� l�0~}�!u��F@���ܮ��V��g�K�Z�}~�~�T��˗��'[�h�b%&dl��g\�R�0��@N��$�7w�x5� �q��I���M�uN���:���@Ұ�#b��R��_�Wn�]�K�xX��8��r1�E���h��C��AwW�z:J���%\p�����i%��á8�\���p!r� �r�.;z�l����ū	���+��4UD~B7ށU\�j3ez�-�M	\�dU�D/+�J����Ip��3��\D<Iq�?:r���6�L��M�('�����h_B�E�WwF� ���0�D�½�D�y���	�IQ�H:d���
Ҡ�y��O���M|_'��@ia��+�7^"̃߇��
D߿o-�j�/��%�R����W`q�'5��÷2M\��XN��S%xݕb'(����FA�-^t���Os	N��)d/�؟O�� M�q�/��k��ޝYD0�҆0&&������i�*~���YR�E��})0��������.��.�7
 �H�
�n���i�/�߽������p�l��2���қ9�1AO�ߘqg�5�����ב��[یꃞ!٦���cL�	�p�p(���5�)D���,R^�a�8B��:��,p�j�P\�s�"h��"���u�Qۋ���PH�j��LK*�Ӹnv�2nĖ�I�/*h:(Z��ՐZ�V���-|;���!���']o��edg���8�b��n�=��XIG�+�Pg�ђ��ܻ���8]ɶ�J����M_уRÚg�6K����F�9?I�:�N!��O��55�Re.<As��T�(ӑ�O/�u��ٸ�B�8�f�c�7��MF�b�oR漀n�h�X�\'Ԛ�V��jfUu���5���׀��GhGR�- �5��:s�p?�b�2)�J~�%G�e����r`�����~	zdZ(T%$�"�+��cV�U��^���?�Φ����k�%'2�઎�C
m�?��B Z���ɯj��>Q!�A�T�@�u�����z��&��G�
�M@1��h��8�S�c�Iϑ��,�?|}[y���e����H+����Z�.��V9b_P���l6ʱ���(W��]8�$�;"���}���zt��ڷ%�L�+_�j_ac�:�J	�?�
T�Dv/	\&�3v��`؎|�l� ;�2�5�Ҩz�����\PbE& U� � �����.s��;ys̙��8�̽2�f�+g�w��{ߛ�ۻ4�(��2 �K�.�J���� 9�iR;�T��!{:�*Q�e2U� {���   �� ��)tw{��f��3�%���������Up8�"
����4~�/�9�ruF<�e��`�
t�VNM�o��4}׻����"Lv/�I��o��n��ߋ�i�~p"��LF�+�E������]�}bb���9(�}�D�F`+���{ש��৹���u��C�e7o��[�)�_G��_!n��6�9���V��A2�v8�>+�de|�����_�_Z��"�w��'�uVG��(�h_��?�?�X��T���ķk���|s3%ͪ�����Qc�x����_���7��
Gp�x���~?��	�_��S�i��'�g��N���WZ3�,���+`�W� �B�?	y�2y~�2'���]�?;�H;MYS�{w��C�o�
g4�؝>�z������ΊI$���V;��Xr@hV��:V_� A?SkU�v��Y9�L±��0&��ȴ@�/�:;��4�"�162�b�7������a�>Q���\jZĽ�'�hL�J����Q�Ԙ�����N�Y�/�e�pÁ��⠾�5}�1
D��m�ߍ
:̕�Ŋr��V�S���6���i�������9$Nb4�Q@��57G=!t"�U7�p�	1�GJ���|;5$Y('��	gMj"b�~L�Y�%-#�L,�c�pQfe������e���k�/��J���at;Z�͞tVR�iO)����M���o I��6��w�v��UM��ʍq\F_��5/�f�!�nnҐҮ]�\y�m��m
I��A�{��n�fv��rX����0��_}���;��E����t@� ک�h�͐v��h��Kڵ����H��@����kW��n1��x��[Y���fjN%�<RI� P�f�wu�2��Y)����� ��-!������	"��9盢�li��34�p�O���u��%��3�\Ů{�x��]�;���V{4I�s��)@�V���
�B����ⴼ�<��h��M�A6���ߒ�`EI�b����%�b(P���/�&��&K[m�@�|ﰳ\|�A�S�d������= Y�
��Z�o�Hڲ�o�U��}?�0A�`'�e+���+��Y`w�AO����s��*\uz6���*spf?x@TԒA�X�;:Zҕp��ص��9Á��(7���ʾ	F�C����pƧ^���mbV&hA|t��8�>9�}�Z�<lM���"-��[���28'���{��!���vcH�e�BV�5��ʧs
�m �*�8�����bxەB0��E�^sw/�\ٖ��6���F��vj�����5�e���dĬ����.�%�*����)Mnu�[}�;`g���x5Ӑ�@�ŝ�2����Q:Y�n���K�%cgQ���S��"�v����"���=U�-��Y(�fwy�_�rX��ͧY��[�ܖ�|�$��!Dl�7��
�+Vh�I. ojt�禒@�����w~*Fҹ�4�me���$,�9WW��}V�cW�v��m�R$SYsxs���^]�&}�����KP`��g��1�K�����xG���L��j�� �8��l��N�����fTtJ�\i�����e{�i�J�³�<w��s�~vK�ju���G,��尴��PW�\���
�q�
}�W�A�~�'�|V-^�|Fs�	��@hV�����ؽʱ8�+�_B��[ڈ��<�HU�l��؆��P""GT���=N��/Byq-!e��U��?"-�}���#�o*b�6~p
��p�%=�]
H�U>�~��(�p �ˉ�{�c 5h�P�ݻ��B�Al�7�
i�	�웝��|��l�b�B�ۺB���>I\:`D
N����X�-��1R�4�T����<�Ɉvlh�nSF���Ł:�x��ybQ%���{��L����`��I"�_��I � �÷;iR�NK�仄2eh�1�ފ���)a�j=➁{3;�;G菡�����'`yQ�箼���#��7۾�+W�57��h�k��u��W�[�|�
��	f��{p�ĸ�

�p�Ej
�[� ��
�f�"2;�P���Y�b�P����5�5!��*e_�%'i1HdK� SI=XEFshI��1�D����X��
�G�� m^@s�3�q�9��[�,[��;f����YU�^k�$!�Ml�D6��7Z[º�� �\���:$�@�w2r�\�ƍdx�]�Gx^�\�G�j�t��-%'<��M�UrΩ]�yB�
:�ь�����o�����l���"���4��}b#ejp46�%�q �J�E�"���O4��A2/JM�wĸؿ- �@��:��!@���:X�����C���N`�fB�97�ל3�؟����b{a��!���tkS��T�������߈���T�?$��������e�xU��i w���x�E�羱������꾇G\��@F��
��{���� Ŧ��O��T3
�5t�(����b���p[ӷurx�R�K��%�8�Qx�]�}4Ex{���
���e�E&�E,f@iѢ�Hc8� �A��@�����-
��&ɼ[�#V�h����[c�*a�ч��ɟ;��ؐ���^[VB����.�&�R)󇸫�4�8�u��񞾱�ƒ�d.^�ܣ<�|��Ip�xٹ��5����F�
�fVzcX�E��|��E�`ȓ�"��h�Hi�=��჈�z�W\Hj��[k�!y1�JAPB�� ��켢eH�69o��d8Yo)j�?�A.�N1�^ѯ[HbypA�!��������De�YTy���AŘ!�nľ��'��m��Y�[ � �����2$7�D��_5�~����_䯐�1R���`G��Jy�o��J��E���(�V� �ysj�hs�-��#΋Jg���n0�������iט*��Xi�Ux��?S�q�ӧ3Dm�l���R�V������Rp	�3'�y��@,�=K��	1�2�~'�rM{�w�[���k�e~����5m3D�]��o9��!񡈸_�?ኺ%���A4XXe��"��Ќ�/ܵ��¾EN{D��i�[~,�31��>=B��+�TL/w)[
�!���w���8�/{���4|�U���)����}6��4��/���9�V҆d�	�W6�6�)M��R�7���.�z��6��6�C�D�#�`��yn�����&��&=��1/�6�:�ά��d˯��g����,�+�����jh��a���m�Ҫ�"]�O��(�wI���G)塇�}G��X���
�WB!�JJ���Ҏ��3(���p���n���,T�=�ެ����(�.=�h��,�%���w ���2}b�6R/ w��[�%�k���g�l������)�����+_�}�]������n=�`A�PP����}rx[�K�������wblI�(o�~rGd�9�Q�,H
�ű���Ez��'r
�(QKE��Dج��K�ʑ� (�M+�8���p�9���^H�2���
�f�ڋT��rK<����͸��'�5n���\��Sz�7S���NO5�J ����#D�COߙn�`)��x�K��#U oAqb�)+(rMp<�*5�l�W�ȣ�-į� U�6�f
���/H�*�-�M1���U\0�Tn,��ӭڥ�6���y�ߢ�{���Z�Mc����DX䀛�YB�1_}�|#�sd��A�K|�S���׆����&z��kA��ZCEf�����VO�U�i����1�,r�h��SM��,������)J�������D�O�+ʇ��z;��2n����ß+�e����?�,�_N�α�7e���+���nx���wt�RZ�+��>�������ȥ.Pu��%�=ڄEk[�$��״D����(Ɠ)95c�f����%(���T;n�T�M�4kxQ��n�FӼd~ӳ�F�����ɿ��7Q�I�ʒ�PT�
����� �X���t���"����c�Zڨ8�r(�;�V|�k��!N�	�N(��-N�1��Z1p�F�J�G<p��SH�P�Й7�K.�$�S~®�����*�"c������u]@�'������g��Sefз}Y_��(�h�1C���m�Fj�&���܄�{e&

�Qs��2��QP�����@~r�O����PB�*9�M�_x�G��r{�H��PL.3ٿ�,�;ц��hC��chu�����(�B
�N��������V穩���_x_�8�XʕrCC�C��]��'��r���:���f�(��ƨ���g&��X9𛋹������ �K{�ްT���gv�`�<p#�զ.�d%f�~q�o02j�L%�P Q�'*�l����@J��
�(#ΛA]y�r2�o ��l��{�e����ءhs�~�j�Y���5�§�Ӕ��&�!1DTصK
�;P��y�q��`m���Y�P��U��>�*j�?��]��C�ة%=�+km�_6Q�DM�RY�V�f�G�#�̇�!	�~M�����u,��쎯�vv�X�~A��9���a��Yl��`h[~դlӜw�k��2+p��������vK�{�S' �Xj�"ˬ4����e/֯0����Q>J�S��ML�9����eșn��R����S��F�C�,��ʈ�T}�#G����G	�߭p�=҇���s��l�NL3��.��OU�e�'$GK������Z��� ����Y^���h��x�g��Weۺ��qJ/�L�/\	����PuW� ����yR�[Q\�E�����b�;sm��ޟp
�����>����%
,�T�!D���\T�� ��3�>6�+�6^������Q���i� 
�H�Ž��6��z�1&C���;~��Dh�i�{��,����$��;v�Q��!F�d�^[���O��B����}gq��z�A��=�i�sF���S�}W�/uI}=�3(b��ҍ.1[��������m֜c�C��D3�&�C�h�d�C{�?��/w�72\?M@�`A�N*6i���g8پ�c�`{n����h��� ��i�J�O�pI$�=��F-
O��N���53;�U�E�W�L��"��x�%uu��eZ��1)�)�������h����/B�6H'�?åy�~ztJ�~��щ�g��}ޝ����w��J��?J	��ȀXRW��͐�<!���̧K� ���(#apJ��K��ꙤJ*�C��A��(̥.�w�y
_rUóX�b�T�
~����U5jB?	�))`�N�5��#��Ѕٹ�A�/���`1FK���;r �H�I����hc��9
;���r�F�?���Z�mYڵ�]~ �6�p�+qfRF{
'���#��wO�\�3��}q�.�W�i��oV_��fr����K� �j���m���=q�P;O��87-����\�гk�Q(���s��()�����u����3�]G2*���Sin�2���n�Ia��O5��Q��Y�����i}V$Q<(IlP�Ǵ��������I�=�;�c8����%у����r�Z�����#�6��z�,�w7���?׎������RVi|��379@BS\�6�	6�xs*By2sV�t�S�Vw*%KJ��%ƺ�4�C����g<|��/9*�7���jG�����Ozc�ch�Vd[�=�d�J��m�"�	Z�Wz�
�h�4�H=fV��v�W']���i��x���_���a�2Pa�/-,�e�]�A�o3��WT_�a6��ѧ�ei���DP]cAC�B��_��n��0��p|Z�2*i>w����j���~@5x��x��}e����}����bv8�ۛ���O�GϚ�qJv�ZШ�^�����</��o�ƍ��4�{�_B��p�����r�$Z��ρ��v|_����d��E�'d��!�_X'�@إ�igN�����k*�K�B^�I�ФW&��QI���������������Ov��&4[��y��@R߹˼�.�'BR!�|�'�����K�����dD�A���)2�HIk�DF#u��b:q<�֑��U_����&D�RG��C����s�
w��a�����*���C��v�5�Fz����yBW�5�������LA��ȧ,��K\oAcH�&�����㳰3�F('Kta�^� �dE�T��]J$GK��1e�1�=]+�e-;n���{�|�3VԹџXlKf�fݫY�/y�t�ekC���X��1.>��e�הs�}d�����sQZ��6
�Ώ�P���˧�c��i�M����{�{�����p���
Y<�o ��2d����s�����R��YZu����q�q���n���
.vp���3$�9$�C�W[�^��Fl�/\Y�ꘟ��
ޖ�bA�c@�mbgi���dM b��� �q!%�ź=��JF�6��F
�jB��W�7�� ��(('>޴q�vD���%3�V�4��:�c�Ħ�i��7�ˌ���������e;����tx�'�����`��j��c�R�[U�Lu����
Կl6^�v�����3W���g1}�ܵ�c\ԓ���u�<&R&�L�w���Eu�l�Gы]��Y���s�`�P;O�A�_�R���ۧƀ�ws�����\�Nka6X�
G�~���`�=����W��l�!��"���ԝ/"=�W���+)���RWg�8U��x;����n�b`׆��
ߣ���dM�N�T�{S�6�X
P��t=��X�e������~�8������Q�~
p:U�`<���q�R�np�S;�v��lw
m�!��L���۞��_�t;�&�Ei*H]���U�|)o��|K%ex�V�lڴ-@D)~P�0.ct8��8�ݦ�%�%�g�9���Z��v����=1q�̆j.���S�yy��sEi/��[�*���gw_n��:�m�y�#�M���[l~�3W�[F�m���s���w%��vu��/Lt��pUy%3�r��Z��/(�V�pJ��=�#�iyW���ߞ��Et��W�5b�>y�������Wׁ�C����zڮ���"�A|e����A���R��"/n��	���G��5���bB4�}�_h&��~�H;�-�Y'�:^��W邅�W}�a�6/�g&u�A)�6�D���_�B�\�.��v����]�����6�e�N��0�T-]�ᾶ�,��~,����� �).�/9��J�{�}k~�*'���^�8�t�C�r]����V�t�.Y�G�u������T>вf��v"3����5Q�W�a�5Jp�8`�!'��o��3��R'��-ȷ�}Ф[o!h0奃�1W�T~�(X���CpyD5�����%�t`�e��Ԝ]@��G`�pk
��:ݽ� ��$�Ў�+��i�ӧG�y�K�ݯ�6<~(�&�:?���"��9�ƶ~s���9��a�U�(x��J�ƫ�Kk��5p�K�#�T�-� r�YH��
�E:���.��kf�6`�*Ϡc����� ���a�{J�8Y��uf $jN����i%��%Cy�F�\�ϭ5��f��Qy�-p��~�L�we͡�C��*}��6	��{��$a���py�����1��3r�gu����A����ԅ�	���v���l���-F�wWZ9�o<4r�Ʒ�"�z!,2��ۗ1�Sfp])�9^;i�>����U!ɓ�0�Zk2��Z��xK3,�gº�;���u+E�A*+Y5&�	tW���V�!������/h���S�e��3g��(kUT)���>KDF���1�QN� ��
P���5Am��1�_O���	��!r,r@4��p��Q��ϩ�1�['5%�,��ӗ�`���"�$,傯>�~�59·��gD���K7����'3:.�:{f'�uS@�|\���ZY���s�^�'y�
\����H������}��X�c���΀oV��<����:�Ǧ�v��\�If����8�VkX�rO�>���Z�2�Iމ �X�W��BZΈ�'�@r&:�-
��ޢ꼛G�G��9�(�V����WLO��J�
��[b�9��$Y�&ʿ���������(-��N0��3kc�o)i%t��ر8��_�2����/z���X�xh
������P�ߌW��#L���[��sZ�F��8�K;I6���=r���IFbF�#����5R�@z��"ZV�/i��5�b ��bp�g暱���`*&��47��1���~������$�DO�yP�"�ϝ$.�aI��<�������k�x��b'��;*��T5�%�����x��/I����C|���,����F�ێ���v�9*�S�Xv+>��ft��O�+�\[����W��A6�o�h����   0t 5 p  {o{omo{m�}�Rbk���Rޫ�^�e*V�3o�+���5U����;�ܹ 8N����h��
�%�� ��k�@T22 V � y�ַ6�;s�̻w��p'���9i̙9	�Ż�$��d���cIl�Z�V
��!�Z�-�	��Pq+��B��Vm�����m�r:���� � �� �)twt�M
t����u��}V����rp�~��G��E�x] ���fu-���	2�t*-'�|�A�4N�x�I�JR�HrL7���Dq����H�����$J�<�Ok���u����.`�.��c
��b�rƫ��� �$?n�9L*Q����v"<��r�7��3|��W&&o-.�l��5�C��������uk��B�k~���h���`�N����@+|ɳ}�E��B�oT�B�;4��r�(�$b�Fr����)�q���3�!�OE��FB��
���"5]p���k��[�ag���f�v�|l�q��"+t���� t�����ᥡ������M���C(;��|�쩖N��(�B���|�quk��`�8�z>T9-3tC#׭F�ҦB6�Wt�}�>�����V�=��V^F8�Sb�[�
A�m7$FM~;L�l+������Y�8U�N8'�@�V���;�����w��w���e��P�Ҟ�8f�P���!A�$�؆�!E�tH�@
��	c� �Q�]m^R��/mzU#WKEI�(~����kw��,��t�vR�$5�d�e�)L�MO�A+�E�~��:'�ʁ�%x�Bz�jŴ$X{����WPrr�>����Q��X�ɍ�AahQ;=v
���o�X���a��k$kq�8,���w-���9*�����Vz|A����6|a�^�$��"��zk����x�w%��{l��nU�9���m�A#�������C^n5;8�-_�{e�?䆳�0�
J+��F��0FM�R )��J8���0�>o��.d�J�<�[\e�U!`���-^���W��~d�/m��F��J
d�s4ԍu���*�M��F=�ziSz��q��s�v8\�,0d����3k/�jG�b
��V�:M�����n%���9��s��^갨�j��d=����~�*9&���O&G[�)��~�&�6����6�w�b]�	��J�J��}Κ�)��n��:ʨ�2s~��a���ʳFL_�+���*J)���
W8��ƎБ�/=� �dUכ*s�}/�0�eR+��R�p��X*4`V!J�N@�����D��F��=�E��x�H�j?^^:f�/����|��\
q|����N}�� ���bH�k|d�	o���3uW3�콢��Yޱc��F\���2�c�G�����*���QM�v4_*������:�I�*Z�$ռGS��j�
����KX���K痙,��^Í.M۠�1Òt2jE
䎮w#�F;�����|��q�M�=�c��z��L�n7��-v�U$�5Aj�N��d?�/��fK�#3��O���	������+�
65p�h�57��ˢiO=,������������+Pa�|h�y����Lc����2Z��+N.�2�5M$�:�N���IQ3;��}��8��K1E����໛X�����Y�>���'L<[Tˀ���]�+u�K�O��Ԃ����TC��n$e��J��l�t�R���SuU�a�D�����
{�c��9� k*`G���l���b!�a�/N	������(���8�Տ��Za�&]&����?��*~�1�Z7JX��Iڅg�*��_n���q���E�_�wn���$���t��m,Nq3�U�ZCKԬ;�CU�	�£�ԑ�̀Abb@���j��D�2�,�j�]��
���1j�l�Ͼ;���斅�#Q��
z(��-E����c��Qa,�2W+;)���r��^�kG§��/�<gD�D���Z�t�s~6r��*^f��y�Yd�J�$<��d,��?���T���qY�:��vbT?���:�d�~��[�f��U���9N��������ӌBM��Wմ���<���N����.i~Zr��x�P6{p���?[(
��А�o�nE^��5]�[Rq����+m��;?@��&8���WA���S<��1��Qgd
��oP(F�0CU�Ay�4Ρ�z�]��2�!�_C�η?�|QE���k�1����m�����t�-�
j�Z 4_��{��y.��
�U H�>Ze^ �$&B$?�%�.�`HgO�X��ʇNt1�3�����I�p#F]�X\n�wT\\��c�dTg�8�Γd�k�Q���(���E(���߈��#B4�,����VloG*F���m�r�����ͅc�=��ݽ�h�q�à�]��K9 ��`����^,��USNa�a��	ܦ���"Zܰ��~�Df�Xaѓ�\�3Ƥhh��J�xr��;;�|VU�C�Sy9Uf�2˴%����ى��=m�nG+���nb�6�������'��5��\s��⠎bV�d>&
�����%	|����P1�=D'�	�
ے'l�{f!�����es�":p�]�DJ:�M�I�"�RaK+>���]jL	H#i�����A.�(�m�T�c���«��>�O����jo��L�B|�ٍE[%��Tr;-BX~�/Z�D���o�3.�0��ݟ����3�����׍�3z[o~�x�z78�Dga��&_l
��n6��%��{�j����=�O�I�ӻ	J�ݫ�[���Ծ�\�{�4�-�'vg�G���%�B)�Q9�d�@_#���s�3ߙ9����M������.%7M�Vchum䜯�x�#�s�T���1hZ�>��̡��)��+�^ �۾+��U�LQܑ�cF�ͥ<ل�0�s6v����!�C�R�q��l�������R{]����7d�������(�)Z)�;T]�����Ѷ��9�6|cwԩ����-R�����3vpf��p~���5T=�#��T{�p1�J�)
9��M�F(���!&��3"��p�4������5��b���t������V_�QՕ��c�*�ݗŌ���Mg����^\J{�(����ͼ����f�t1L)�����kU��D���	#�����U|PTݩ��׸
�MFp5����a����b�V�0�B���S�}�.G���k�3h;[[�o#S|�p�	i��#y7D�B�x��l��ޥ��$Ǵf��ݑgf�����R�%C���7��
ɸ�Q?*���$5��(�qiFTnj�(��tuu�o�,���A�X����H�5a	��?"Sr��p��-��C� e�7uϼ��@���L��'�m�WVyf�R���a�S�e��EڲFjTD�J�//�mW:���Ÿ��V�u��^� ����Co����kPYz���}\�s�b����=N2=�8� �]��ao��m��	c�<|/i���bʷ�{�����b�z,�S;�P�2@���@��b^f#���q*� ���N�^�=<n�#��g�,_�LE��:��Y[��F�W�
{�R�ɲ�R��Шd�֟,+AD'�$�4 �OF�� YϜ���Z����q]�*V�'�0]��p9��x���`�f������R� �L�F�0�/�.���1��I�%��)�,�����Yi��C�nk��.ص��A��C�":f�,��㬤!��l�
e3�S���׿�ل���V���>o�ǆ��y��×F��b�KD��̨$q
m��= .���?��.%���e\��V�(!��i�KJ�ӜaM!�Yϰ��������Yj�z���E���9�"=$*���p�e���K>g�܋�M�N�j#Mִ�ɳ�:���\�4��� C3��=ؔ�֜�����k��H���m��H�k�Q����l<@O��8Qn[��܊��K|Ǝj�L����Xs�.!���xs�_��9�����Sy����Q[����y&<U<��l��V���Ж��� ����-�D��z�
�NG�6��^��`�ȍ��v����m�����\�{��=�#	�M�+Z������}�˜C�bUI���$�Nt<���'xe� ~����`k���������c#���}J�ݦLY��
}��㄁����r�n/�M�D�s��j�*5-�����i��Ô�;iU��4�e�pPv��Ӏ��^6E9�B�����*��ŏ�=�l��7���=��)2�5=T�
���چse�DI
�T'-r�Yڲ�P#{�CԜ��LQ���Pb�/=X�g�ѥ��/���:��]������Y���N\`�s���������F��:��n\�:���I�0���@���n��V������qS�^T�
��L�k*�-Ψ� 1�F7#N}��T磏Z�6��/�2�ZT.��X�^8G��[��峟��!+�+���[���:��z�Њ�I�R��H
�s@Lw�0�
��g=UI��.��P)~_�m(��"��:�����)�C��<'-{a���S{O�8�Xb_ ��g��V�;����lӴ#��΃"�9���6�\/�P�4�5�$����@h���7�}w~���8�:���NKq����+�����a���_�_��2FC�=��f��"�	I��#�7|���oKE�`�`��,Zyo�L�!"5vg�p�M�i��ʃNhL�`Z�_v�����ή���vT�Sw'�J��|޸����̂<����}��VNN�+����f�F�p�KC��D��5M�(B���`�7�4���ǣ�
d�p��8h�;~��YnZ�bZ�=��5Cg�����3��s3P�O�Gf��e�h��]Z]ԋ�������ؒr�Ӧ[MǼ��06\DSUK��n/��o"	��̈́��E1�II�w�7P�d�/�sL��>G�ĕ�x��Ӫc"b�i.��e_�?ŵ�Yq�s1�\(�J��=aEp�1�G�-K���6���'��b��O_��ԏ��I�M�^���mm
�c[���6*R����GI��.TSD�e�Skl^F�>壻�q�u�T~8@���^#���g}Rŋ�&&��B��X�"e�V��)�Wϲ�O��u]:�0���P����7|w�R�Q���J�I���/�`�e�3W�F�.YAoV]1z�N�ӠJ�g�{{��eo5O҆���<�2n����CFE1�}���+�h�x�.�R�!	(���,uS��ô�+�#m�=V����udN�=ƯZ����'�
��'���䴾�!��c{wʎ���^�->$�- Ϩ��ɘ+f��s���Zx��=[�3���YHy���m��dp��6s��L�ؘj(jpfO:m�(	vv�q��x
�11@�$(�!� �w�Δ�.�<��{:��S��h�,��e|B�P����9�n�%�o��OQ/�{���w�D!gH���q[x}�Um
�dT	_��9���(2���b_�snf��u�������ky�����XXi�D�F�Z.0.Su��;]ǉ�h� ����Lt����GV䅜��^�?�XW˵�MW WU-�p o �Qu��ˠ(�r-L��67�ab�V�.c�#��0���ҍ��w�G�/�Κ����9P���͈.�g <=�"g��?���[�͵LA�w���H��}/;w�97�o=�>�G�_4����H�{���f@�3۩�v�Ew�=l��pI��Z��o�_�Sn���j�%g�[�m�[6��3��-�0:C�إ}�3E����X�fKu��8�f�u�`!N"ȅ�4�4����9�X�'U��p��d�|�_�r� �*.Q'iz�$��H�~%�έ�:Kl�9��`���g�Neo���xe!2�ٍ�d4֝Za~T��tJȍ�cvox칅Ĩ)-��iDkB`��Oĩ�����>��l�C"U��P`��1��6?��v�����b�}z���o&p"�*s�J"� vz��P���Y����7�O}ߙ�V*�}� �\��\Ins{���k���7��| o]�/H��|�z�XNڪ�W�[ݯ����|�[+�e�J�(��ԫH�|@��? |���PYm|�EK6`Vd�o�I��������H�	E��o6%�e�:}�����{����jh�R���k��=sxf��rZe���w-��:��m�/�����(MQc'�p�t(���Vԓ���l����:�)%���Z�%ǉ4b����I� +��(>�1�ɼ��y6m�[��^�c�(�B䭙a���Īt��B�g�T �e�v�hR����ԁ2��!ǿ�!�Xs�d��9�c���0�
y�g�'��-ݿg\�d�CN�%^�kIRџ�	:�-�|kV{��?R��zc�LO����1}� ¿�[H�/����ou���P4���P`�[?|0���P���F�d^������gӛo��
f��o� V�vG�s"k� �f��m0#uv��rD�F�J=s�ck�Y��܈�0HZ/�k%���|b-�[FAq�������6���S��+s��B	��ٝ��E2�q�kF�ߟ�*����sqWo��pJw�qR�H`�"��A�䜜O��Z�C��M�>�o���J�;|��F�~_Ew7�|I��Qz�ޫ���������|�9�����_p�f���6] �K6�S�)(�Ij訸�ڤW�Di<��Z�R3��|/C��P���zQ%+/*��i�>�q���w�R����'���8A��7"	'yO��ױ�Xs�e�"�:�5=MG�kʫ����(�)V��7Z����-���.�D\�N
x�+Y۹��/J��죆�68��}�ZHsJ�ђ����a�:�������v���OZ ;Q*+�3������f���?U�����B�sr�k�x��Tr�G���*���^�*�>�`��Rʔ�[Xf���/p�I�-�����c�T�w�߰�*a;J�.DA)Y���{�5{� v��G���
=�W-M���.e#c��g�׫�B��y�V�4��IM��S�+Z[+	���;�N��is��Q��1�F1��������XLQ�'��a�{R�]�����&�	ᩴ"+���`�d}�C�����M�ٯ�`+�2�Ȥ�{��IF�����yK(%�ޛ�����HM����>��=wb�\�;\�\m<Ɗ�v�0����a
&ӣ�A?��.��"ub��7鳉��.A��p�l0�x.�I{�ꜥ �Ó*0Xu�>MR�8�2���Jǆ�/����V~���K���-��"��+�]��	Aֱ2�;�Ѓf �Gt�%
�#�k\7%�yak��)!���QQ��������OX01S$�-�VNO01�j,S�X��Cdm��>�����>��� ��g[ヌK�MDZ�prL ���W�:��z��y(�j�r�A>xzc�]<6�����b,hBѯ�0�<�.#�
�����l]�<b6������k��Fr�|���z��c��	+��ad�J&P�c���9�줆ؔ�m�g�
O�:F��M9E��+6���q�/v!���e�S�L3f�q�D�w�����qL��|�ݴWu0"�)Z�X���p����Nn���;��9��2�	T��:�R��}�L�����*䄑%໲W�@C:���ܠ���X�b��?Lo݁o���wWG�y)�������N�l�Wy�^[W
'w���4�G��t�r���鐷,��?�����p}W����oN|�l��&�R�a�/�� �^���w���`��=X���>6��A�t	�(�Y���9Ԃ�!��+������Ju�����iFdKj�c",I@m!�G�pF�шr�m��o�&�S���?��8��2��:�^��2#��Q�>��=P�a��=��E��;���Ú1��B�|�~����$a���N�k�VɎ�j5~�r�E"��	�uFo���s��3:a�_�os��];��-29���Ŀ��v��?t�RJ�ȁ7c1�i�%#F�*-��iz0k�f��7��5nwR
��Ay������)�������#�[� ����%�i�2���+vh�am9>Y!`�/���"�ȑ��zr�ER���N���ꁛ�C:2<j�͑w?֍�n��Az�� �~sf�(^�<oڒ�ٛ��6`A0q�c`�H��L��r�77�ӝ�[�1�����d���	!�O�L��`��w����U������;ia
�E+����(�0������5��
�<b��ԡ����|�:��h�S�t�����BG�駰!�� q�z��bg$C��������F'C�ޖ;�:�͍aAw=��9���6!c�(Bkm��z��wAC��
=p2^JE$(k<�QtU>�Ǘ65D��z�NBI����f����UrM�)vNw=��>P��h�aMWuOD:�ʺZ��X
Ք�q�����)7PG��<ÁMb'J��M�.�#o����!��%N���V%����n�R���L�����3�yCXC���{`��)��[�m ��.ߥ$e�
6}��Y�~���ט�4i�.����|�V1 �љSh+�'�,k�~(_��5�Gu������Z5���2�|Y�kD�!������.h*�8$[�����F�ݲ%R����v�)��E�� ��u]C�����f�]q�UQ'q�L���9��6�a��{o����(��gù~����~��b�:�ق�{��5:�8�d�)}�R�	`Û�ʄx�V�����e|��Ck?�q�#�l�~
JN�lS�@[���{Q�41N�&U�5���}ڌ'����l6�cs:ͭ(��-g6s-9�敋��?��}�'J�V������j���
��!���*�t`$G)8�	h*�%�����dB�,����$I�,ޛ��O��W��Ƿ�QGB��Q�T�Eš����w��]���ҧ=2�>^��@��H����d<���B�� t��
+� �td�%SG�
�h6��&��p�|�d�Z�;Ϝ��d��������g?��y����O.s���IZ}�/��7�y�W�
V�B�#�
�E����w�1���i�A�_���{�-K&�$�Bƣ��f��(�������fTD���T�n=�D��2�J�1ɘGdl؀_6���n����p����G�� ��s�jK�|c|��@eg`>wB����ɞ�S�=�����E?wDfg���f� �hMf����yiHUNm�<�X�?��]�<*dҀ������!�PI�c��n�4�ڹ��\�rk����v�~�\^!@�3��y�(�r���e�0���Z����Z�e��642}jԴ���(�B�2GO%��$,>&|����HR���;EI�����0'ן���N˒��h
7���	$�^/���D:���ķ�ѮE|�91���k	QV�p.�e�L}�T�N����4�zߴF�A�t����<���PV�my�\9�-3�e�*�F�l� ��_�(Y
*�tVp��&rB'����a^Д�GOBK����Fx
6��8r���ZJet!�zP��?�������<{
�(�y� �]� ����h�C�C�sww��~޵*3��i�K�MFU�����Z�/���Z�i�T'��L�i�-�8ːGj�*�0�ng	�3fn�w �  � hf� �Ƕ�#R'�7S� l�������.��NNAE謊1�/֞n���Vt3!�v��$',K�q�<��OP�����w�6C)���<a�b�Fd���ƽ.�����٩
^�b��\�� ������r��Ŋ�DqRqV&ʿ��xUr뒴���ԩT�H�m�L���ap���9�JC ����`(׃y�R�A򀕵������r�]�8��oì2+�X3���\9A˚�i<�\k{
����oU���2���{	4���"��kķ�9�������G��W��Ǝ���V�U�zJ�Fa?��2�19�������w�K��A��umS���J긶�Vƭ���ػ�T����� �����
 �;��;�\�^
���i�iˑ�
,�O;ɫ>�Ҏ1�śwF�X2a�.�`��t
F����#NKa����)ݥ,-|0�6+ɩb�ٜ�[�F�m��md�,<�aАi��j�x��ԯ.DC1	+nE�0�z�4hHʈ�O$������"Ӻ6a#4�9�}���OF��Ճ[�k	�_�y,�%�������1�����t�b(	]r�2��2�b2�.͠T�0���v��o��b����u���n\������H�Ed�0(�`�ȗ��R~Fz��ų���<Z�Rm�A���I��];~]�^��-ʉ����IR�?&$:��5�Β]��1���λ�M�i�r��X�L��Np`����e� ��Ś���*�ĉc�`C�;)�B�ڊSLfޢ"��~�0o�� �k�,��6�~`j>R9Nx������F��9��d9<��P��$Y��Q�`m&�!�H�:�Cɡ�<�a�(B�h'[� ���
[�Z,y=���Ĕ$?['I�m"�{Q����X_������U8e��L��"����
��>4�
�W ���Hj޴�L�:�݌Ɯ�$?*�Y����W�̭��	g5���Q�
{?�I���av�
,r]Q� 
xd�n,�#C��J���V����^^B�7�k��/�H�r��J�.O�e�[=ĻI�We����i���R�p6�QH
_b�~��K�����r0�rh3����oK7�	m�Y�&^\�ɯ����Iŵ�O#xH��k���҃�
��3&�Ǫ���}j̰�Ɓ��70^�� V�6��0A�˒[;���l.JfJ6vԉg����j�`�ţ$��l��{�bĄh-4�kXV}�V�g
1,�-�q��CH��>�͒iI��%)Ej7�e��Bv�nVK���紒O:?�dpm<>�M�ګ$�v���֧�IQP��AQ�'zp5����-����(6U�w��c{J�IK�-kZ�@F��R��xJ6�z�-8��ɉ�B<
������a{��H�/} �/h�?�ZW�ˀW
/  ��xV�J^�JtM������M��`��I��h�)� 6^��fQ�L6����/Jvr�ʺ�~RB����0�
�H���4@C��]��s�l�n�{fG|�>�qf!"_�lU�WT	��q%�ň�A1����-�Xd	v��~\:�����ҨT�m��	H�ۇ��)12OiT�oό��a����75�f��[� f�]�����k��������zop�LmD�l�Q�MX|�C{uN�0]�1�P�H9�/�[^���u�F�)�ߗӰ*��-�5/z�_B��"F��Q!��R�4�O����3��7Ch��"���)+ �Zb��f�~����?w��n��tE���.}�UBD)l�"�d�.p���cTfRc�3��K�|g�����-�w���͈h:�<Ʒ�<�u6���{|Ō9��wL<.[(�<xQ�z���~�Et��/̱Q��coq��C�OQ�[ۊ�jv�@���-G���'e�L4?�GVt��싌v�����K��	��}����[�����waѬ��zI�Z��,�']��⣫�I0�����u
"�?[�RY*����<���5�1]4�so׾�h9��4��\ϑ!�
�#UZ�~ ��Di<�f���5	�@7�|pO-Sؗj���[��s�p2����|���!ĥ�؜r�<�2L�^*��%><	:�����=}�\:2�c޷[�xglj�u8C�# �љp^�ͼ8�7��D����n�}z�;B.���6"�K��QZ��eoF�3e����ʐ����9;��^��\v�f}ss� ��������Y&QC6��y5<���;�X�7�W���i�q�{�g
�̬\ �ʌȐT@��Y���h�G4B�C%�����w#~����tI6s��ҝ�����O�����Y��؂۱�ʋ�,娙�F~�.'9)��_�x�z4�R�zMSHRZc��7�{�EҦ�2�`�.%uF�7x��1{)-e�(B,-ԑp),�J]~�E|-bŦ����!����d�Ժ�$���{M��;E⵴��	V��)�]���d�b���b�=����p����.7�t����0�u:�����[}�9�I
��]�
Z��PU%u�8���b�) ����;l!�����9�\3���������
h�&3�\�`L���ۃIw,��OU��d�P���{4�w!J.��b!���qU�3��BmG�[G4#��P�>�|U�D�;?����m���j#���� ͠Z[D��jE���q�R���?	�ϝ���9����4ՙJע5�ܥ��+���>_�8at��4��H9���*��3�{���;�GKM_�\7*���:KN�s�������3���y_O����'� Hr���F@�Z���^�m9YL2�HPo�Ǖum�lF�P��S8�Y�N ��Z��ҦU���v_�A�"�`TI��ܾ�y^�)�#I����N�{���fZI����<����A�g.J�H����²F��r����f����U�Qx�v�ɣ�Dt�!�O/��(����U�T��s��I�$�Q���q�Hv�.u5��o����+_=���W�I����P�٣i��齟���O���0c��IP#��`�
&ff\L����́�;�D�
}�3�A����Sy���p:�?�;��v�E��k�$���_2E�/;����Wm���1���xV�vц��K��|�PɎck#�4�}�7�X��x�T���T���w�"s���ڍԊ[T�E|�|B���r1_�����#�r'�3�:��T�M���?mU�Q�~�=Ѕ��m.�c��,Ύ��I�CB��� ۅt^�Ӻ��h��_��L�G�x�8ߚ��-#�*"E�����F<c:�}^lv����O�!�ӓ��@��z��zN%��"�w��O�8�iן���.X8=�d.O�iC�:�^3"��h`�^�����������R��$�������ޕ\���/���
�����ߎ��@�0����0���� ����=>��P�2
��L�$���L���� �V��N ���L�:$ϝNXs:����o�dm?l{:X���
�h5�o J*�����v��]�_:�4v/\L{��^��N��p@AW��	<�@�: uA��
�7hÛ����)�Ӏ��SD1PsW@��3�T-���t��U'��M�AY��\}|��+8ځl�����b����2Y��kO��2<tn�`'��޵K���G�)ٮ�~�RB�L����^���Y��`� ��%��5���N�oHJ�����E�5&�w��ܢ�=]/>���t9���`�>�����tݰtW|�kШ�߀�A���.@ҕ���g6�O� �K &�@ v;�c���i^^n�ϵ���@)L��+�����N��˄�?/�)P�G��  p[,��`bA�h4Q�	��k���\���@o�T�� %�Ӡ8�;�B�qhQ��1�o�%K�q���>bb�eh����~Yw��[u��E�RTy� S�M�㬸���|�5�r���ԡ�T�I�f56�O���Š���f�a�Z.Kp�j\9p%ƜӁ�9���thM���7
�W�B�s�+�OU���^�h(P��Snp�h�u� �<ٻ��"Dv97���J��ҟ�^q��-Yn'�҅��@<^sId��m�ő�Z� }7���؛}%3��/��9���8n �;!	��{D3O|C"\������d��6�@e�4%��U��N�P���5B`yU����3�{������� X��U���
�
?YF����M�8�����
��6*��ܶ��3P��M__�2&٥��6"wҽ�9�*b���U����ʹ8�8 �F������!�Z0N	�s�,T#�((�'��1\3w�Nbu-���I|#ŲOœ`i�%�il�4Ҩ���?�^�������Ϗ���/�:ߏ��x�:��D�_'���?r�����b��}�ڴ�<C���hQ�Atw��}��3`�e 
�v4F���ք���O������[�w}�י@����E���o9��c����U��z�O��$�=��ڤ��O(�G�	�ф�ތwx�r �N��}B���}�S��z�Q$~:���J1��*$=���!��Fp�E>�*M#V'Y͘�8R��
�N�g�:)��\�D��D��e�+�򃾋����j�T!D��ǒ������	#�D��k��T�݀F2�T��Nܨ�#�G����!_fʀ|�F�Z��LO�\��U� �B�ǥޏ{�	$QR�joRlyG��ڢ�;��"�g��+�Ią�]hp!��!���{�cϬ�D=�$�V��J˔*��+�B���óG�z�\̏x<��B�(����m��U%i�2:��tHG�����Z���|L����i��9z�� �y�8��Y;�.�
�����s�����K�� W��\�_���AB�]�!J�'��+dc5UjiML�7a�gBՊ�"�� �@���>�D��U@2���C8����lNz
S���=ct��ϯ*t�m�fgi 7���z��i�����2%{�پ@E���1�j�
��;����x�ޘ�Ruv�3&U�<D:�e�F�/�~��uK?}�?���tp��%N����5�Fu�zi{v}��WN_�y�P&�k�e�R>O�	��_���{f,��c��?p�~e�'��fzP��x����*�%t���·?��{1��~݄7d5�c{ �����7���7������<o��]�b�[
�#`��M�}%��r�>9�c�C�z]z
E��= ��9Y��c<d����u���{@��|�����MݭB��!f�@Ad�7`�W�A��1	��`:�2��ă�7
,D��N��޺{�r�ߎ��ِ�:��6��f�"T9��w���;�OIH�(k������ ��'�&F��'Sag�l!��w��[��w��tÅ����|;<�%�¾�|�����ɲ���X��v}����w��!��M�u!��!�	�!d�o�G$ uAWg�9ü���d��M0	6nem*�vR�8d��)Zη�!F{��;���l:������A��v�lB:+�/-p�B���l����apn�D��۔fic��@��O�1�{59t����=;+�軠!c�0�F��8�q+k~^/\cH(kL\�����c�`J�t!�=%��0�Op��Ȍ
AV�$y*Hో�!{!������2(3y�f�0�TY�P�DF�G�os
n�v��5�i~#���kqo���vd'�(���DԈ	���9�g��~��\ li�,�P,r<��y�:��)s��	{�y�kuυ��[7R��Q��I�pqx��A7�x:�Չ���+�W&ؠ*�99+e��K��@'��QɥW��bY��$V��
��?&�	 n�2��G��oj;P�̟U"�r��o<�.X�{�l��#����?Y�F7"�ڄ�����qa�&��^��kZ0E��Yl�!����L8n��W-�N^�-��ɬV'1����	=��Gr�b�V�t�f8�7@(
�\��
�x�݊���'ׅ����Tdi�{<{�I�z��p�r�I����[oOȓ�}S$�nķ7&<Dj�@O���6ͷ�4�9G�~;BY
T�\���}>�����'ޕ��ņx�D�v~&���;V:F�^��Qk��Z{a&�������b&��?Ȑq3��e�f�Gs(4��=�Ͷ#�K8��^~����f�A<&۸��u�φ�XlS��-�`���icQ�G�BqG��(R��H�3�
vp�g��Ot��d�v֪��'^�`��b���{����'���gC=0R��Tvѹ�F�{�}��6����C��%o���L]
��З�����ҵ-ɻ2m���)'��Lx	2]�N�|S!���9> �_O
t��X��6Ԥ�C����H�����l�cw����ђ�f���_3��w�gw;\�}&xej��`P�h���pBR��>��-G��a.3����փu`���h��p�\���% U\ZHc�%-���CI�G[�e�����ލ�=F���PǗ_q�<TT����S���M��@>�Q�IL�7Z/����_3�&	�A���u|?�{������3_`У��Ɖ���5Bt�<#޶�᳎���!�Y��
��?�R��`|�B)Ή���abi��bRB֣f߱n}p<�����N�~�r����-^z��t���0&�?�������h���O�32�`�z>��T�� 31
�6���+�PԳ���1���Nl��Eos��iR�d� �����f����G�u�K'eu��f����(ZM�3GH�@6=/�-_0���x�����~������$�S}�Q߭��/�	t��)X�'���l��$�� d�F�75�nN��bl���}��).0�>_+۟�*�a��ɖ�������*؎�esq�9��N�Jj4ndq��np1w����[w��2�ŋ��7�N�!�H^��;
jD �� ~����}���ʲ�/ś��s�M8/����Q��ʾU.����dj�d�L+�o*�EwX���{E/B�m2m#y�Br��oIy�  IQ3�2n���"�BD(�@�w�� �ݣ��s��Ȃ�d6 �C7�:��� �\��f�:J�@	�k�!No�H]��tb����^����Ae�6	�,�k���8lWFi����i"n�6���݊#-���g�&l9/#��B�6`c�&����TDT���T�ݛ4|�|G��]��D��t[�g)�W
(�R����/�z�c�om�Q��Z�pS\Ů��=�7y5��F<�a�"��}�Y��Uܳ��>�l����e��+�����z����u����g�*�a�w����:�e�Q�P���>լkcq�\��W�U����$�è|?3h9>f��b���6�!��~��l�{fB�>
mzș���<�Vj�^a�[������y�����3�*���'ȉA���3��d�dg�O^�+7xT6+K��%��sC録�@Id~�㸐_n3?���O�����j��C�z]���y�Kwz�#��ŵP����96
�\�l�扣�4�#�f�	��A�_'�����$����g�c8��LL~��s��;EU���lǟR�ť��,ω�?���>V��4\^�h���w4� �zײL>�ǩ��<��A�o��z6�M�*��唼��=1��)��y��Dz���e�d��D�Y�<����1l��SBO��4�y�s�	�#�xH�Bk�v���=�&��i��^�v�贛���
�˿�
��eO6=�/�X�V�{�5\���Vuz�
�����1*���w?2��o��Z?��Q�{���%6�C.S�.�5���[ۑ��W��!1XgJoF���~�� �]1������|Tύ[��|�Y
r�6�"����ϭ�B#%�o�Oz��ݹ-	r�
U{��'I���+��ן����v ���jӕ�K	�l�v���G$��,�N��B�<�M�����u�Jƞ����:�����1����������gIK���/���!�Z{�᧥U�<�����)��K�\tH��_���]�r��ũN�խ<Tc� 7X|���ԙ�0�,�컨�"�(wh��� 0ht�s�)Q���v�l��\q���ƿF:���°���AБh`���Ųr ���#��^@��ι-�Ό��r�j�fR ��k8wwa��>68e$�`,Я'T=ZzzB͓o�:Iw"����b`����=>s=0a�����L�А�ޔ���d�q1`�y�˶��5KP�����}
�#��	I���hC<�Bc�%��P�	��HB
���.��3����`�4PZD|�x�d�0O@C/�z֝�'�P�x���${��n��]x8N2�� ���o����`����e�YP�����ISK5iz��;PI�>��1����^���)T�n�vR;*�
�'���<2Q<:�~�)���ޥE#Ϗ�13��XS46�kC)�`��_E9S6S�+N.����g���=8�(Yq����!:hq�L���I(>�EJ*@1A�#�	�W
��
m��W�	 hu���d��5sI�J�r)� vc��1x����\:��2ɐ+..��@}{*�>z(�Rb�!�R���9��1�z�$\1_�ҟ�f�*E�<Y����)0�I s����i��m�9��C�C�M��F���a���'2��@���eR��
�&��D�d�̝`G	u~���tٻ�t c_'��h�K�}�0����[F�DR<y���qx�	5F�/q��3^j#"�=K|O¥7��`a�"b�;H}�� �p�/cg ��%[̉�ig'�
=�D9�>�Jr\\����2I>��ˆ�4�
����)�'>����o�Gc
�t�4��`�Y�/P4,֪#���tz��.��d�bL��6	&��1y���6P��RćXb a8���HJ]~/�յ��$-��^A�찷|	(^�O���"�h�1��^c4�f�˙�@���U�a���8�H���9Ķ����A�,xi�����,����"�.���/�6�N���%/}U0��>V9qn��b�
�*ɬ��&<Z�4~B��_ �V#p�[2|E��~{��W����5q��n��hZ��c��.\N| �����+��@4ˠ-pZ����{q�����ߙ^h8kFp�Gf��|>wH�Q�����M�Z@�kꮣÓѰ����x��m]9A�q��s!8>t���O��ԑ��S�yԞ�u�P���>�Y�g�φS������|���N���^�.����u0č�B
��[$���b^$E�C\��l69�G$X�G�*-���HY1	�tEE�'R%n2\�c��e��i���=Ϟ$]���2�����Hǘ�q8jC���pe`J��ck2��)��v ���q����Ff:�٠G��ㅘ�ᐺ�ZF���׹���w���z��= {��ȸGȍQu
�K5�!����4��ϒt���U����W��tjT�\���T�T�<1k`�Ru��6=�xb,���|�]���)ǟײ�>��:NC�R���yd�UZ�vZ��+'*�ܓ
0����9t�#R���V1�c���a�0h��+6]�ʖ��3Y��8S�`�r��� �וN��s�N_��T0�*�$ �{����-t���=
>Ӑ��X���\�~���IP׶[E��[|���	ĪXĕ��������ь5��筚y�K��Ob�
߾w6ӣ�G����ӱj�����M{\G��V�7^�,����!�zfb(�k?䪳�: ��p�����E��6w�G����vA�l��*��'��[�Z��p吭��Uh�T_��f�K,�R��7�\���d^��.s��s�* �}R&C�S�y����z�!+���@S�ú��?w�ty�������E�Д��y�7�"���GL����˺d3`N� ��a�)�wOg�_���M�U��{AS�B�#٬�~�?��i��K����o���nv6t�8V6�#Þ)&ɓ+���i8Cmc�٭�E�N�~Q�8��������M�,� �ɷ��?)3n$
���x�Q��y���Mc�7z�7����fj�R��B�GՔ�Z���ʗ��ͤ~=�
O����� �S�d;�A���-w�͇m�o[6t׀ ������Z���W}u�~�e��,޸�����Ў	Z�N��fǕQi���������r�.Ui�p�iY�:"�u�jn����X��&N<��;{�Zj��O�9��:��҅���a��٫aa �/�oF�<P
`۫��\�v��wx��%������U��?�<d<KF>��X]El-�+�Q�V��goЍ�z��m���>��H�鹲qi�����uIuƚ,��G
5����u5K1�:�ꪹ'��g����."��4���!����t�)�_ ����'`����?��3p�Ҭ����,��ù�����-l�Ҋ;Łj`3z��[�5I��M׀��D��6�,H���z�4�U�>���y��:�Tm8�=��zϫm(j_�uu5�6�#Z�m�O]Ś��M5�@ﲞ��i�+,��-�c�t����#�_�V���_�A��\w+�
�٣�@��-<�?�,��T����1���yht8'�s�Z�sOqLs���/(Ҟ�L/��˔�����kǷ�CN��v��~(?��^��~#<�{p�y�T-4>C����m�*pO�������j��ȭ\�EH��$��B-��ڈ��",G<!�P���E�4Dq��M2O�oф'��{�Wdnn���#C���0�"�q9�P��E�5ˈ�QC�+��G��i%��}2-��苅�E��i�)A��S�W2@��驁wp%o���[��x�H�Ԗ�?B���:$-}DS�Z:q���'�@ʢkj�͖����h	-ժ)]�>���$����l��Z�5H�Y8E��5�'��rO�$&��9r'Vu�}�AO!do��p峞Ǔ%<I�H���[��@��/q-���8$�@�C��D�����rғ,��?��pe����~�.�M_�J�'�6�R��H\?��%	�
���aa�H�Mhq�.�2�#��c��{	Z@��Kl9"���ƅ,UM)�O�`󏳥�>K�- ��d+I�"s�Ւ��/�|�p�I]m�Y����woO4��L� p����t3����=EN�����{I���V���I�!����$y9��a��&|L���+���x���C4�,"'s�ek��	jbR\��	�$�X�d�xS���b��C�'�q��A��J��C`1֔�����rcZ2
�v���dӝ%��=�&��S��I�Qˎo��,;E��5��>�W�𤂼�R�;�R�����`�3M���RD�����%b���M'�����'�r�Qih!K�m>RYA�|�ʹ*�YR\�䖞�fOu����pP�r.M�A<I�p���H�DN�\r�}��yj��~8R3��D-$�G�j�tɄV����s.��
a��)5g*1�y7�JВd{�l��Ѷ =���7ҥO�0�Y�&߻4��\�� ����$g�1��z�G� D�<�!
�Y��[u�J�n/�,2�U8`�<�-9�S�Ƒ���0��,&�&Ɖ�[Ys�k��	~��<XM�����D�к�Ǌ�@�k�k�[�����i����9�ѡQ%Q����xJ�Q��U����Fi���<�\D�ڗm,��{Ć�I;"���	G�4j6OP\M���G�!���ҳDkEH2�q��OH&��O�w)����ѱ��@�5�]�+-�"N���[-�eQWDg��%t��-���j@�I8�1������1�+raoM��*��!�#%��)�dQ*?/�T�S�����f��#Ñ���Y����B��x�<����T	��~H��bB��iX�x�x�b$����gLS��D�w���O��_}��FxD"{�%dn��x��Z�F�[R��O	���R�S���B�w�O�/��U��R���8��"��1*��
y��I��%�=�.N���B8���(��߆�]i)�4e��U��'-�����Ӱ����!�K-�u�K�"����~/����g�R�V� =�T�َ�m�1�Z��˚y]�����sF>��m:s�+�z�ln�83N�* �8���#��y�?����-�$v拳�L:��M�H:u���|�AYZ�N�_����������vұ|:æ�R�R����k��G��>sm~��r_*s�Fp��k/M1_'{ǈ�md���Xn���/�0g*�`�|m|�駶1��C~S�Ύ2���M�g��_����;�g���⢁���$
��Cic7����t�r�AAiM�OM9�elk������﴾��٠����<��fy�G^LÚ��F��uSt�t��@�%�h !i�{\�q 3����P�Ӟ�#߅���,�W�u@�K-�E���)�i�ki0�9�'��v�n����8��q��
#�S��,��-����^vm�T��[�]��@rO���.v��v�f�bS��u"�m�03�I1e��p�[
�x���\��[*�@��Muf���j;T�w�?|��}�}�u��dj�?nDř�Ul����S-],) =���b�	_sX&O��gR,K��������/p�����ݷ�I����8��"/f���op�����N�,V���d��0bɉ��'�Oџ�fj�j"ꙨKE�D��J�*�.EEfEgDh��Q�\"A�F��
� �q���#��5�Ǡ�A�;�c�
�i@��������i�pV�w1B�
C�w�md���������n��MI�z
�xm��6�OU]��<\boSi�_A!�������U
�Bg��}/��C*��?�mݙ`�,��L���S���J�?GߝG��`�\�;ar��e�]�X��h�
��'='��8By��mP�f�ɽ���}]I�XЅ�P��؆����u��:���i��p��PnnD���>Qw/�)����o/�n�U/G����w�d���e��>�n�{5Sw��g�9�[!&��xM8�3���p&`U1h�$6�A�Aݢ�{�V�11�? �U<#K��h('b����J�5@���(ۢh3�Up��Y9�d.ז�.������;i�-7�0�T�`������A��Ѩ?����qS��2s�s��f��ܯ���&�:"��C��M*q��F^�%Q�1ߒ���_-��1qс�6������A����H7(3l[ʲ��=�YS�|���lH����\_�`ּ�.uR�����{ϩ��L6��|p��P\�}� �J;���n-�`|���+*"#E5�����D�5k��Wp���h7���v�YU�ֲqX�Ö�������Pa!�������#�v|���W��/�
\e����Q�_g�1�/hI?��L-�>=�Fm$e���@�c�A_5mM���]I�x�ʟ{	t����s�<�O�C=9h_#q��s	�x�dg�Drsp�A<s���
�6X|�wk�1J�~:���.w��^�*ٱ]�G֯������U}��=�Y��j������&�o)���k4m|�Γ�G���q���uqv�Y�I�$B����X>��U�Xzj1�k��>��S`v����x�1���/}QYۿ��A�O�*F��ފ��;�QS!�py:��~-)-��N�tj���|�CsT�ê��@�� x+�ِx�ߜ�L�7��4�ʝ��;�˶k���<���:C�V���-y�a��ib}����o)K�Ǭ⡫���^�Mfn�萴2�J���2>r�	c�Hٚ���{Eh��5���3OY|	��7�|ǠG��(ƚ���
_���Gx]�σ�-w�"�����%�h� 
�
0�����&Y&!�Xa܀>�k�N��x��l�Ao���y~���ܤ�����uD�F�@0�|��x]z��>����y\IM l�f./�M �n�[�.��ە0 ��K��Wn���u/��Ԧ�r�ͷ��d5�\t@�È����s�%#�H�Ѡ����Qy�?*N�%y�͓��_��cJ�"���F�nz�,;^
��)(ˌ���n���<P�/�a��+�431�'�W˹h�x��c��:�1Н/��C�
 ��MJ�/�h�ث��6y�;�wۻ+�K�hĭì�i���RB)�����z�� +�T�b�sc�s���|���,i�/R�ߴ��e
��,�x:��� �"Z�x	Ǌ���w��
���mw���0�K�'�5^L�C�Vy�̺&η:�b[���vyMk���SxJ�1�X�gb��k�����5~JA�ئ�U��L�w����e:�����w��Μm$e͎
��)7���t-��mD�J@�P±��sM�,�������C�xC��Y����g��&�� p����`�	���� s�zՊ�Cw�7�mP��cLѤ�R#!7q�
��Σ�������s�؛V��:��"��B��x|����kSG�	�Q׮�1Ik�Nl*����3
/�X�<�Kr�����R��-+6�)~S��<���7�a 6_�p�]Yux$���d�����
˲�	����K�)���m���93|3��\4���W�Ką6�=!�{�G��J�'](lTˉ�4WG3����'N���0O��k�h�Yi�.����\[���t��I��Y�B�V���U,C�\љΚ8�u1>e`oL�����q�hJ���NA,#�z%Sn*EEV�����@m.s۪K���s[�Y�!���r��F����s�� �+>��5�����(]h闢�4�J�mG��ߡ�\޳5��?�
O^e�??9;����7��븩�h0[��5-���,��=���a� �O�ݢn�f��&a�Bܹ!q;
nD+���`|�E��.���G����A�^�z���i
Y�m���f��Qn���풼>�0����N|9ym*}	��m�Y��rr�Ǽ��
x��N���u�Iq�>�Zd..Nmu�A
��2d�S��0���	������9���e��Y֥С�7�
ӿHh�u����g�Tfż�#�q'ċ�/\%�^�H�� ���0���}��6�+T�_��s�]
��9�Ǿ�S�
-�̫�G��̼��$��@�?ħ�<ԫ0��Y�1�������>n+=m}��2k�M���х��96�Q��?@�|�\bw������/9����{@����ވ���H���?:10�N!����M��8��i�q^R���#!��b�u:���G�����^�bp$#
KQ}B��'	�#b-�`��O>ڂt]||/�k3�זob�?~�";7#��Wu�\��"�
&�B-����Qb�a��o�h�V~	�k��S��Oġ�$±#�BQ1m������N�U�o
x����� 	,S��IH?gS ������~ Uǿ%� ��ｾ�����c�V-��?�#�[�����݉�P2�CX���n��́���g.q��)��� ��GK���f�0B�&nH.�DC�t�ܧ4�ۣ��u"^����Q����X�fjl1�6�dXj�3й/'�Sm0�s�ٸ<G:��D������l�w��\����ʁɜ������N�z-�̬�S#�S4H���"���!��=T���7�/��͹%MY�.b�;T��CaQ��g ���l�L��WC
�6���
���Zʬp�4I` �x�B�Ev�"����堓{�n4����Aybb�-�k�iu��N����2���f%5��بp�Kn��yhtZ��{8�v�s��:��R�S��n��0g���!�6=h0��mC�G�S���!G�~�Ѹ�s:f*IZT��9�м�N�I��P��G��Y���O��hAr���(Լ[T!��Y~>=jIM!������}�_7����-Q):���e���qpPz�P���	��ú�.�Q��4�<W=�B3����>^[>Ѐ�5]�]Uv�z��&���"n�R?��yY�ٯ���tyO���c�%���PXfw'Ka���)�4�?�:��H���Oo�E����_��k����4���+ɜ薽��tto�CEeV$�.����?�<R�[�*�Ok�v�a>hβ^c����Z]���t�=
��:����q�8�0���@� p�]�P���^�|Up��lf�Ί��K�f�(�Pi�:AW��'�L��(Ӥ��^����斕ç_J3
P\�ǲW��'���Q�Dɗ����@U;/���&��]k��~ �y-�}��呞�����2���!��p������{d�Q���������8P�^P%������K��E�V��m��M� 5z��
�P�\pJsw�I��bs��!� TY^*�E�ާ����j����SQ����#���j�K9J�>'�e��ig|6���VU�y�2�
�sͱR O#���%����g�:~Z�uާ��]Ж�9H�����龆�ٞu	~�Iߧd�?��Z�޺�O~y'u�xF���4�)|�r�c�2���{���w'e�%�C�v���ƒI�{E��k��lF�y�L~��[W�Q�y�-�xj������w(��|��Ҭ׸(��k�LZ�,��#�T9���djWI�2Ě"}09�Fbڦ��'Ȫl/��G����s3�~�/`������jFM��k��J
���؃�j2���(��ʎU��x����v�B�d�>E&⇹eU��3V���1n�d��z�oX��f���|��C�B~��*�|�Kpo�r�w�^�&�Ws��c��`|^�cs�����0K϶��d�S�}�1�\�iL�ؔKz1���ɸ���σ���B*O�2�gM=E�
�� j���5�i!�c�(���T���x�^-=�u���9����<��,���U/�K��0�I�E�?��<LA�W�#�[��
�T�3 ��@�ͫE�����o	r�b/������vE&�&�嵵�cV �Q����r�ܵ�
3� j�>�j�p�_��s���f�	�#��R�"��n{H˓���-nK����GϨu�8�OU�����KJŻ��N�6=Vj�Gu�c��M�i������Ũ~�I7�Z����ғ�{��̑U�~n�k��.'n����8u����-7ρ�V��
�|� )w�-��1��	���!�K��}�A�C�KbN�yF�m��z}va�ր �:��y�-Z����E�� ���P��>e(��u����ȔP�؋�Jn��ж�PJe&	�6��^��Xɏ��eμ��tX�g7���3E���[#6��*;_Kа���mDEF�"¿�a��)!!@
rCT��f��hQϚ��uq-,u�V�jֹ�X�}��j��uЗ�>)��ȟ��ٚ??���>�� v'_����?- K�E]=����m�����~�fE��g�f�=�{�-·)I�ӛ���!E!���j&�E&E�K��<%3	�V��#��������q�P͜���	�q�)�z����tJ�_����v�Qu#���Y����lK�r&�AZ+�	p�6�8�T/<m��[L�<�� Q|^w|�s��w
�I��|�E;��>g
�ݦ���\���M'�$LS.�����|S�W�Fh����i�p�<򾃝�^I��)��=@+����c���嵞ĬV,��>��;w��	-�?+l���g	}�
�I5Zx�'�HN�e�5� &�y�N#� ��ګm�I�>�#�����>�#����T?i�>
�A��y���c�r$�~e�@+IZ��c���ʷl�p���ä�Sx`dc�QS#u���!4�|�O�ȏ�( 0c$" p  ;_�L�'+� A*Q�wz�^�0Ea���&{�y
�������`�ξ�����o	
�k`e�@P@;@�
PU��� ���>���gg�,3��9U����" ���Xhp��X,�X��I
́�nl,x��wcl��s{�^�o�

�A�qk+�����+��l��i��<@�  � �f
��aI:w�iR��!��20x�� BY�='&L� 	w5���M6�$:R��S�՗	��r۶�H�J��Z��~���(�%;e (,�S�X���´�Z)�Z p�.��Z�	�ӅOS�D
�<*=�I�puU��*�lU��{��Vv˫w�$UH�99%^d��M�����K��S�V�[�Q��� c��1D��Y�ҝR~
�����2
p
��k@S�&��%���b2P
S�B

�.J�E��Z�z�#�aÛq�j��/e]�s7`�rm
� H���a�瀰���f������3�=��<�+��Kz곆��tq��h�6�w�����L���{R��0 ��l�T6��P���-<�?�U
�l�v3�Zq>����MAu�U@���`��	�1w�R?� ��"ݏ_&���o
szn/����x'r�k	b	?&~Z�6ؠ����y��0��?��4\��J*�%��[]u���Y�z��X*�	���V�^$�G��q�l���l�Ic��r>�q�eԂ��w�0(��l(>��k	N{�SZ�K����r�*{=��7o.������<�"��qoe[�\��,N'� .��O^�C�S&�f�/~ia�yM1���	/�� /w�R�k8��nL*�/GM+�g��-�/���%��>���7����uE���5w_������-��'@�5شtŅ|�S7�{̭Y*v���"ŋ�b]j܀6��7����^�ϼ��c#���$K��ոdZ�]�Hk���N���Y��h{$'��&��x��y���/�D*�Q�(׶� W��^��.=X��8ba���W��Z��J~R��D����.��:6$�)sq���/zV���� آ8��K�Z�"u��aJ���jA`�V�-��?EE�Z)���-�ט)N���-݁����v��캽�y�ÛF:���GMK�(��\a���,4_F�+

�Z��NMo�[�t���c��~�uS���!�b.��y#Q��x^���=��Ɲ��`�f��8���8[F #X��V$i���h$LlVq5�P�W�0^-/�F��!,�>!e�]���c[
���mvTM�Ji�1Ш�4Պn5iq	i\(��^�K�{�Hѭ�	z>����@8�e�1a\&.Q�-�!��ܸ�r>�{^q��l�L�t�=E���}�a��@"��ǨT픀#�{[%T���/���k���֩hu�]��E�>��I�}rW	@	��y��Qdsѣ�
������Ը�@���ZW�u^�}�v��/�"R���S�[5-iZ>JBb����<�[�T��R�al��޷����6D��|��2pL�N�K��V{"̱ܥ������Xj'�T. }�7�,�7ݱ��&��
9+qmQv��8�0a��=2:��\��ȥ9��!�?�@�!���L%�(�Y���%����t���W4ag{�����1�k�����5y�VoKVH���X2�F@4l����k�q��{Mh�}��1�cR1O�&籵��P(F�
t�kpBZ�$���+8:������<dZ�]U��^�
<t�N�V�q
5��u����g���F���oe[ea��iPt-�p��f\Í=���eO_ ����Lv����х�	�H��&�_V�}>~M#��El�FE�IR�J�:xL��z�ֻ°G|۪?�\~ێ���Z�;]��bAo>�\��,���Ġ����=ҡ�r5��8�Eߘ��{*���7�3��P��o�na�a�s�礊�}�D���!�LIc��n�"�UA- 5��4d�]c���c�`��rK�hl�D���@����O���k�I��,E�~q�0<Hy��;�j`�a�b�㨟��
u�����^�1�,��|Uh�#=Z5���1f���\���J8��BJ���A���k,��2/l�^��^���)2���b]���I�D�����C� u�
�;C{�.�U��Ln���L�x6�31~9���p�jZy�g�!a%��{]�Q�H����>����7y�J���f��;����B��G�$�"�`�a��!�x8�8?�I�,7J
�oO[��+t(�TTY��r>}�V�@�<���rp�JR
��՝��V��O���c�_ς2CؙE��+X;,iY^�d4<U�*e�~h��]vs�ٮyjhQ3Sw�ӏD��X���0_�x���ߦĀ��7��zς�^5v/���Y#�p84'��f�4~t�?k�t�({��R	al�d��������X�\(������l�����Y5�G���(�=�I��6��Z�6ls�����
�s�-��Uz�����ua�B�'�[�;z��(v��� Ŷ0�0�M��b�BG��]
����y?��x ~��&�|̙�D��m�i:�B
�@�����e�5��+��'�CI@Ρ5
��L�$;��i�ę�њ����&��dA󴑥��g�-�|���Ȇq�t�$�����4��S���^D�=2Np1����wɾ�-�ɱ\
�ۙ!��
Ñ�����1|��GwVv�4��VAoo��0h����3bp��"�mZ4�\kz]p\Q��%�A���IG��
_oа�V
�(�i�^�� �DQB��M�N������c-��E�f`�hOOo�?��3�_��%NLoUDi�]4�K͒]l�����ٴ�n�dE
�K�a�vT�e�i��[�����	[:A�s�Pr�(o�
d�2�$�l���u��Q����8�4���֍��I�1��,� ����nXW�n��O���9#snOa{�(�=��ex�����oJ�q��F�ؽ��C"�|�K��%��f���s����!яA�N�bU&Vx���c��<w�������.�#���&FJ�쁾 �<N�9%.-C��jcʳĕeʋ#��"����t��\9�ܩhd)�V�Ri�S
��'ݿ�0`�%�;Jҋ
���,�Z�}�������X��p\���j����ƨ}"�8\�}d��9�Iܬ�9-�P���	qLvJ\9�riF��������B+�1K�(�) 
h�lU2M7��(y�mE�eZa)T�l�P{~�pｆ̪]���U'r�������Pik����x
;��wY�+p7���0�8�m;c�Μ�%�O��8�\��fqI+�p�ȅ.�D�#���]a/�0��<����H����lL[S�Zo�t�5w��ܹ"�s���1a*l�� �<4]���h�s�c��P�����%̑Y����{D��J���zV���4�D3����M{cC������#tR�ʿBe���+�
�j���l�\��Z��,�>6�}�|)�XJX3l@׀3yj^uo�"����W&R��{�qd]ƞ�Ж��R]�84�N��Ƌy�x*�i�9�m��P��wK�k�h���{d��&>>r�ݨ������U�^��	{��FM0���#�E>�2ױ}F�{�Vc8�O�]k#́f1C��8�?L����6���W�!4��.��+�|�ߠa��?���V*��/�� ��R�%b����c�YU�n��y%�j����4{���kC,aa�8*���h T���e�[uq����å�
��R�Gt2B�����]@(��=��Ds�����hS�scY7&�.�ni�/W���G�7`�c���SX�N]da�����E���4n��'B��U�M&�?尦k�@����� ��3�3q��2�J���?�)�L���=������6��Pc��
��ʧ?�: iz���җD��F�!�m�N@��Q
-%Qu������DZ��K�����`i)^>���φ\f��V,�H��p2fS���Z� y��O`�a��U�
,�1�B�Uf�	��Z85�1�m�u��5 %at�cq�QQݭ-]�Z��&�T��i��j�ΔY���}�!u��.s��!�P�Qg��}�lakY{��a�K-O(�iX����䕚Ȳ�!Xk~t�0hɟ�^gǡ/�}� ��/�!�;o�}��*9��ͧ�W�=jy,X���垳 �P��ӓ~��g����/�,�w~�˙33#z+f��6�x�]�e�-|^Z�Kk�r���J��vO4���<�.�f��NԲ���p0��_�b	�R
/O	����9Sd�ɾ^�o5������������Z��y��ql5Ɠ����ٙQ��hp������Y�6�J�]F��=�]����(��S�_���;�P
�V~#F���~�<Ĺ��Y��ź�fmC�dn�Iw0��ռ�zB�NU��/Q5�署A��=��q���EfRj�c�$�U����@F`*I��Bm��%U�o��D����UjV�&j���@�S]Rk�������}���K�B��4aV�� �ܽ��K��x?Ò4�ϸ�l���?O5lB����`Vk��o�-k|ʚ���Xf�HXB!�Y�D���a,���WbPOM_�����F�@}��ri�Jf����g�f0���k�_��К��.T];�	��+3�@�V��e��|$8�P���8��5D!�"�l��"�/�D��F��Z�,�D
x߷��B�Q���M�g	���.v�g����(|�f�^�l�H��ssmG���>V�{�U����i�%S�� ��}��l;����eϓjQ,��o�a�j(�
i�A��&�������j�W��Ǐ��+����� ��r�0��`���šbJ����y�s����8��oz-6X�{[�Vyh{��x;zF�,��Y����
�w��
��<'���^������%����(:R�_z�c�)���
�nΚk�-���z���pQÐ�{ SqQ��Iz���v���ũ�D������_�a]Ȟ�61�"2��U����F�L���`�����#j�ݟt�����gz(�K��p�
���,9&��Y����
e��-h��j��������|`H*V���)6����\�M<�`���),wk���̊��U/���nm{N�(C��&PV���6?���5bڱ��U��Y�t�i�"�`�V�ڴfB�8_bmb��Ҳ����)O��<Z��6��uK��e��T`N�=���ƪ���t"[Y<���ӬE<
��'���x�
�"��}y%�j�^=I��Kн:f���|�$��sZ�ɾ���Bd���=0fU�ii36o�����#�4L�1i�`�RzW�Z��^bzc�@d\	�3C��AEl�4�{(�kF��c@����]S"�o��:��;$��z���H$.'��]-�|S�"���Fy8�Jf��v�I��w���qM�z�%����N��M��e����r�%�&
i�N�����*����]ݦ�cq�Fjs����Ҫ~��y��
��;���/�/�S�@ZS�ٺI3+8����#%oS�S�%�x��D��&*'/-;��r��J�)�F<Q�b}�lSE�5��ӥV�����O���j(2�>'0�u#�.:̑+u��{����|.�T�9^z����k�	1r����'�?����F�:z��~�h������h�_�28�\~`{����ދ<����Iy�]�¨�k�ű3B�;�S>��">�V�Wx��7�qQK��TՋ�
�ɋ�m.v�<��S�Қq��	|Q߄��<╇*e�-�P _�-M�#�[�^��:�<�U�?�|�V&j�گ�ɊEn�-���j4��lRN���C3������T�S+JR��P�o��31M{if7�3�y}J��D5I
��}���9 $���m��{<����RGն�`���6�B����T����-Jn�&��M��jNg�w�2wg����Q1jmg������\S����g�O�1��<*���l�Ť��G�	6A��;}���7�]��Knt�6�P\Y�T	��1�e�my��gPO
w���tަ�nK0J����{�Y�^�՛Q#jZ���P��x���:��=�3�B]R�'�peۇk��<Q�*�y܃�+���&KE�ꔟ�9r���I!�\���Wr�2��c���
���!X�pG`Q"Y�^�u��[��r�]�<��$���u�ˎ䭷z��߾ʆ�Qڞg6�����s1�nCJθ�d��?����r�O�^�*��ϟ��pw�B��?�cW������na+�?�@~(϶��
�j�Ǭ�?���U�p����v�~���|a�{��˸o#���ba��/,�W��Ç���g����ba�m�z�����,~
ѽ����_X�ŷ?a3{��s|l���mć��rV� ��E,��s�����i�����3[xd�E T�,B]��FI4���􏞳�ŷ�q�������8>����Y9I�����|�����O��,2nN��E��\;j�2' �N,j�7�<��f��O��3˕�-�4��a�%���	��XO�]O/�o�}�%zp�}�rYՆ�<���.�5���c�+�ư%bx�Vy�x��޴�9�����:������P0�O�/9������ H��p����D�Ug
���t���تU�."ƐT�����.>\�uu�ɷ�}��W\B|YϹ���	ǻב��>t��f�b���]$} �
3˿�b/m>��8M:��*�&.\�_�n>�l���?e������^L���'��	m��9��}~�˷r��L����Mr~��%��^������˹R|�`pb��S�+ֽ�g@��#�;�<9D�>�4�y5�����$�eh���S�-�p��J@7����O/�?Ԁ5
��e@�V?���O??��6���D YL����<��P�T����f�5�?� yy^�ܻ���͕}����K�=��$f��e��ؽ�枙�kφ����HzO��P�f��R?��� J�����6�&5��MTmq���^6���W��������� C�C}U�>��� g��Si`���%�燽y������o�2k�-/G���M}�����J.�c,[�����Hj/��M�8�
D׿Lꗀ�sU�/lfyЃ������@qa�����_S������9)�,��󬦩`�����+����������J��:t��ɞ?��9ʃ�߸9�l�!of8��U?>��9�
��^}����c�k�e娀�{^.|��'�kw���]�W^Τ����7��6��Jo/K滧�K1!>�ۏħ�zD������=a�rs�Y�Ԩ��Hcx3\��I��h�<e-�%���]�����������\W�/�(�_�Y�S�4���3�olyf��U��ޑ^Vd�*���	s%	�o4��տOr��=������z�^�2cN��g���\����lP�U�w
|�
ß)�<��f�pp�8�f����N�b��δ���n�Ŷ������au[�A�3���H�5_ls��� �A7D:��}?
�>F��u�6��� �k�`��{.�ϠɼeUC��
L�����ۥ�e�!<euO\����l����50Ql�C ��V�)ϕܦ��}�w�ap�WxІ����\��Y=�=�������T��4=��kQ�E��q�ʿ�^A/aC]����Su�z	f���$~��N�*Щ#�65�zb��e�0�5����+���´� ����o։�Z����2业�^����o%�|sܸ�����g?}8w(ᡄ���9�1[����
��h �
�@�Ȫ�k1��X �P�ʒPp(�{b��¨��؋��p�H*Y�F�}�����S/�%�.��7*�z¾���S
|��G�$f�O�/Zp^ōp�&����Yы��������49�m����$��À�g[\�7K���1eg!5Q����Ij�#�(��/�LC����iS�b�_�4���a���8[�
\�b��r*�v�l�"l�tc�K�G�[�v�� $4�1�ӧ=���K�Á?��CV�2���
���<��j5�Zu��0)���_��V
m��t��9����f���Qn0�����
Pȧ�|G�1���n,�	o�i9�=���f*Hj��_A��,z�>vU=b����,Q��D���w'D<((�����:�_ZxZ�=6����w<2"�)ʍN�����
zK�m������|�H^x��*q?�%�Nˉ��F��x{��4����m�+�P����8�M�B6!�B�z��4�f]�5̷� 
�!������V����=je�� �����s�����VW�+Έ7
����k6�Þ����}ڇ�4cq��?|r�l&m�~�� u*��S61�:p��Ā�6���
�e�;Y�+c����\���a�]������yU���E݋��I�*R��^�v
G6��p��P�1PqP����
\���v�tr�Jwd,B��f�3a(�vI����t��IS8���V�����B��WV�@�$���v@z�׮�օ���C�W����M�P�O฽J>��E�bǫJ��`_�,]� ��2��d
��FB�ᷫ!I9�d�i�.��˜����@g�d���H���v�mI���<=S��O=�T{�*�UE3�"�������sL�p���)5�#�C���
t?�f��?�x7�� ���3�!�՞8�3d� .��Ī5%z�/|2.Y��6��l���׏�2�%N�9X��U���Dy����~	B��t���I9g�_oɡ�×�!��א���XK�{��=	�h�R���.X��O���.̀Ǡ��-,�װ9�S�^:F�l�A��v�*8Emgb
����'��Φ@K���I�m`��ІѰRJ��m�UX_H��_H�9Ҁ&���v�6zS��͂g;v����CD ��N�i�X�(��Q�&��.w�5B��W�p�L�lя�;�m����	%}[};:0�c��
g�K3]}��d��ח��n�KJ�Y���ӡ%>8c��^�����(9��/%�_�/usaͷ��!0V���b�!0�$����^w ��lC�8[<m�F�!זMIhl׮H���¨~E�m}!��I���G=��?��!�Q+Ͽ��VbC�O���+8_�m)����^g	�/L��#n(f��0����t�U�%7>Z�܍�ϱ(-Ry���,0RʵP}��A�rRȴ�1���h��bᇤ�yB��d�yT*�p��x��1��z���]HGOE�P����lf`|�M�Ln���${H�J�T)DD�T٥m��Q�716�N�����y�����'5t��E����A�>��;��9`O�2W-��{������>���]�S�pW�`�
=� M41��	��G�} ��
��C%��;�EHf����IVA��D�9����o�Y��H�����&ѤJ<q"��נ
HF���|07�X"7ja�EG��p��� ����I@h�=�`�.�z�6�]��:����i_ֺjds������s�w]��&�n�qMqK���U�}�=�Vi1�8UH�8"[�e�Y��md&�v��y�fғ{�1��Z�ɹ��^(A�>r�)D,���o�4~���S��(�����8zp�d;/�$s�@���RP���Q���=��?{��C��k:S��N�#by�ǝ��W+x4I��@���ҥ���bIʀy�����B&Y�2~|PK�#��i;΂(�Ӆ=	�&�P��rնN�"�&ܚ�DAOf�\��`'"ڷ�)����Ɋ��W l�S۠�r�ԷйX���n�6��'��6{ȴc��6�X�*�G�9��{�,Is��`p���������6F�N��ݻ��"�U�g1<��P4�˞�we�� �Vϔ��*��u����@��8/��d���0H&p
��@���x�yI��v&8
̼ؓ�e��v�s֋�ķ������f�������K�t�}��3\Ghm0ʞ��[|�ԖR�C�,[�&�g�G����'���j�J�y��������Q����h��L�.�Jq	�������&��e�i��b�4��|�o��$��j�?�D�*��	҆�̫'�+-��Y�K���ӳ�yv���>a�J�(ջ��̰NԴt=������q/�x��\��wj�΍ܓ6#�پ��z��(�G2S x95�*�e��_[1y�N�!|�RЅ�wt��f�Y���6X�έ�6O:@����:�JE��
�v�L����������O#�f��+>�0'�a�g8hb���c����ُd�9���J簦a��jy}O�5�Mx5ϫGe-���/|솎�ɾ�p+J���
�27�=kX� 1G�� G��ÜI��� Q/�V�mQn9���o�9\#^̖:�����dXnq�
9����]���z�;ǚ�*%.P8���IА}ğ�	[t�޵d��m�UL�|-I���J�� 5�cN�f:�������f�x~y��j��|
�L��P�!Ml�uc��I�� c埋e����ة�!yz�>O8�Y�=z `�^�C#
��O���^�'E\��^�Xa�����h��%������`h�y�9����Y|��gE����f?
��෈-�*�k��*������	��]bN�Q �4��xr��Z���O�?�*�~J�V��}�8;����*&��;��	}5���C97����6g�ϟ����/B��m�
���~��Q�ME�F�Y��%#ph��Q���ac�
'1�N����t<������oŲ��0w�Pd��*hRO���)bK�7b��66��pE�~in"��]S�#�"X9����&�oP��)�1�H�f�5�qm_T+�����Vb5��Z�M6ɉ�G�t�x��- �"�gr����c!gr�m�مg�4�@�����m����$ ���?����������I��Ε��)���3I���+b�}u�����h�d\�4T3wdM1�"r�
�*C������b�-#�����u�h|=V���鋇]d� ��@�_O8)<`�K�e�c4���q�2�ih�P�s���8�Ǽ��'�/���[x�і���T� �mN
���o��Y�o4�iJq2�&SaG~l�
�R�w~�Oa��-�t���.��ek��d t�(�i"6!Y����h� 4��eD\�i��M���.�l��2�O�F$W�[YM�l���Φ�rF*v�D�D��! 熦~N`@S�顲�d�r潀uR�ޒ���ﳣ�|5�+�
�?�c�jϝ)z�D�qLF0;T��Y�A�v�y�#f�1'�h�����++�G.A+Jg����|�Δͺ�"�FtXl.��
|�B�p������3��J�N}�fU��Љ��@�¼��jO�����6v�����z)�x�y�0\�Q�\����]L�0�ݫ&xǶ�N�ӄ���=X\s32~���sR{�=]��fqD����NOzs'���wi�P Nz׻��Nr�L���Y����0��_t0`j�W�b<F f���9Ɠ.(Ip��!	�pi7��{��հ����4 E����叓������}����@X붋�
��6�.�����2b#*��_���t��_�eZ��F�r}�J.F��P+��I��7�߂�
���'�JB�s�{�J%��#�Y}�ۂ�m���(�{e�exߓ0���u� �۟@z&1�Ǳ��)em��ٜ߄�y����1��$�t6.�j��G�-Y%z`kst0�ƚ�p8��S7;���8;�� ���{&�O-�>�V���5��]L�r�T=��D#^��`�-�Ԯ������Az:q�R��#a{Ahq�����^IZ��i�b���͉AOҤ�xR��4���J��[
�DQv�#-���z
����2=�6(�tQ�ͩ5�y��ggi.�ݹ^@�bZ�}q#�����[�@n͊|����]V��M���&���˴�� �����ą��s\�k��B�U�%g��w	��9�ҹ�ʳ
=�R���+!�z��e?���9uI�W�4��>�$�3�/0 �ģ���u<@G������\_k�o�/�,�.�OV��@�y�)�PD�%{U?������e]cRy$G�&�쮿�H�:A�v����$�s�k�A}�cL�qv0	��)�`��"V�UR)u�Y� ���T��#�qv'���#��Cu@^�N�1���}�
Z��J�C�2g8|�YH� ��ԧ��~A9W�{�?ŷ�I��F�v�;
�NT��1ڢf,p�� Ř��N��j�P��z�ŕ�,�s��3��2�ʟ̹��؛�lI�k�}u�Os�\���i���������G=�A��wݳ��u�
˰Gc�>���C5ߴ�_�����=�}�S���O��0Ԭz,����I"��S�d-#
Xċ���k<6ocÚB���ؽ'W�4�y��;Y�o3���Jmr�5�؟�ޔ�,fǺµ�7��-7����>�wQ�KvZ9��*ns��p��f�ż�p�f%�3��������y��������DssU����W�|$� ��u�n�0�G�hB�����JS��
ĥ5�U*����c^-�U���3�`�yR'fǬ�ͪ =�f���~�_lOU���Ƿjf,���I�q�t��󌨼�V����EԆBA�s@����M)�<L̒~`����>��<���59K
t��a0��iɊ.
���&,�x1U��K)�m�*����I5�r��9^�t�S�Wr�8ON�Si�>4�&��ߵ����#b#�z������*�\�#�������	���a��G8|z�4��I4�����nJ�<W�\�?��H��*�A+�5B�~�4j$�L]��?6��־{�f����]���]�}W?��_�A�:��9��(� s��`�������+�����i��`��3�O�5�LT.���T��|�e�����~��5���ͪdi��:/M�RY>���އtz���� r�.��C�N��0{?ѷ4Z��d��܄9׍_�p�؂0�6��m�:$1)vnM*f�=��R�ti0R|gH�ب�?�>PΊdS z�<���?Zxt*����B���bl0V������=Vj��.� �䆍�;~�ȕau��
f#�i���}��=�M����0�{�S��gX��S5����}����#]؉2�6=GB���.a>�O`J,�Ȏn>5ۆ �F��aYa�c��e�*^9���Ȇ1���j
~�(uC.�$�%wςU�z���-��kIVu��4�?Co�m�o-�MF�@����g�DТ�&u[;+}�#1�V��G�}3�
厛3�Td|oݦOT[?Y��b[�N\���eơ�S��T�w��~IP���x�]����P����9G�l���!��ᗏ,�����R���o|?��V�'���l�����������f��w���Iϝ����R��&���|
�#��a��>2��T	h�J��5Ry*�Y�5V��I�X�uuEnJ�2|���fd��Ke���ګk8С����@�sH��`��k2��.�L�H]�Z�֮��	k���%3�X�]���-�+�6�G�"L��w�R@y?��n�q��ȉ���p|�.��9�s�M�,1Ea���t?G2�4=��X��Cb�s����Yo��X�}�I��a{�������]$y~ſt
]������}�0�af�F����򰹖���\y��� 9�9Iry��Ѧ��XŲd�h�����4��N�ȴ�v�M_\�E�I���Nf$K
�mPb_�Ԕ�+��?�s^�ѭh�R�
"RG�6�lI�� ��v�@�'�{>棳N-�m��;c�c釕Qh1��q��[�>�!�����mI&�=��ҏ �N/�.I��@h�3Z Y�Lx�#���!�P��r4t�A�!�"�>X/B�qd�ڇ��Sr �\gJK�>��v���{ܼ�����%&W�'S1��[�Ӡ�7���: L�3�!�V3�u����dʎ>p�����RN�o9��
 {�}�n�9k^�w��c<�ѝ�i�q熺|���b�v�1+Ғ����Z(�k9����_m��wh��P4�O@�P�� s���ٻf�M�Ou��X_N
W�%ʓ������L|�V��k�Jy���q�*#0_yU~Ǉ����h
O#>�uXg�s����/n�|���>���m��tq �/J�G$����?Ů�K��k���l�õ�Ղ-k5�����M3��}� ; t8 �y츫Vw���@2����'6,<����u�.v�D֔��Ug���;�zT��v���m߄ث�����L�=f���������$��-_��@�S�����!Z��a���3&��k���,q�7k�[w���&#G䡑����M�B'D9�������=L_���e-�m,�n�����I*��j�k�%	�XM�9�]�K��8i#�t`����XS�6(����j��9yeuM�aB1�Jb�;��L�fd�
�`z\�e��b����NZHY�s"�H����d��P��"b��s�X�����R�T���q=�06�m,G��j@0t�#$��G����u��bPpqC>�wUĶr����y�Ϳ�$���ihJ#�W��lѷY
u�+�\���Z-y$-�o���
`u���eE����]>4]�#�X�E�59��b�#C!����=gL����8 h��%��N�T\2��kQ`2ǧ`���CQY>�@>
m�B�"���ǁ%Dj���w�鹴�ժ�����F&u�~�d6W9��NR[�zWU��s�H�d����[K��򁗬���9���f \V/d���ܐ/��$���GϺ�I-�� �S��?dr�x��d6��C��TAR��^��r�lC>.N��
����7��R\u���"�m��}��4��%u6z̀_���l��4~�Oi7����\��hkHB|�U8q.3"c��Gn�.���REK��T�/�����٢T����rg']���� ��	E�@���b���_r;azk���9w��w����?5���D����#֟;������%W �N{����^�Rᮔ����5���7G9��6XO7������Pg#����l|���]�1�OX��wD��qV	��Խ�<��Eƣ<ލ�6�
cv.%�d���à���ş\��E�#�r��!���@��+�_d=vۖt˫8K)�@���5�k�Z�T�uc�)�!��BG?n�Ct����y�` D$KU垲yv�D��O`�^'��������p���Ya�"�e5��u՜��9a�w�(��K� S�L����K��O��EGfR4W���t�},�t-#I��%��(Erp�@H��~�ښ� � 0S $"    �[���U	�IPX$
$��zs�`+��`�p�P�L#qC؝l�l��a'<a�E[�T�Tl8��BE&�(��� �  �#������v���֝$��k(��-�@x��}���y߻vP���k�M�@���L�T*�S*bE"P��*0L;��� i  "�"" f.]^�����LĲ�*�*(� ���:��#�=`�Mݍ
���z�$�����T ����D8,��m�!�n��`�e���^���VSxk�t�y����aI�qC��H+1S��E�Aj{�k�j
%4���j��8U)�(��_�T+�ݮ�h`�8떪�
��'[9��������+���I�wR3N��m�� ��1����P�����w��d?��a���<7��l 0����B���G>Y�-Q%N���&h�ͬu^�|<�kb$�5D�c��[W7@R�U8��U7E�m~+%�Q�,�v��*k&��tPP�&�(��{�
�`��Rt��u}�(4�EXR�� ���$l�אO���żS]
����S\�jB\3�Ɖ�V�H'�A��S}�E(�}�0�X��GT��;z�6TȮ` 
:�{�D��'�md�T΍�g�}x��^�t�l@�6�pi�'�+H��N�뺈zɻ��OO�{�&�L�'~?�d���w�N�7���aU��B-٧��fz@<~�`6<Թy��xZ8]/	��Y/�|�����-<#c1��:$�"���3�2\���(�[�ǈ-S)@Q�kF�4e[+���r��� �=��cU��K���.��V:v#�Q=՞z�
�ǐ�`�g�b�5�N��c�G�������j�)�@���a��H���~bVѐG��
1�^���0��Ql4�J�M*M�'D��^a~ƢU�*�
N]��]x,����K��f~�<��Y��)y��������Y�'�S��z9�"�h�@�Q�R�܊�	Nx�#�ߔДB��H�	��δm+o��I���Rޮ�%-�;.�Eb\e�o���n-2�� �3��;�sv����E��ݥR[o^
��;�\��a�a(4A@�
XL�
G
�Ý�����|���E�ݠo�I�R��3�F:��F�^>̔�c3o�H
1���1�W�,t�������Q��BQ�֞�}�B��V��[.y��)��������S?����_�"Z����!��j='j<:�>�<�R�C�;U��@�*<.�)�4�a����+_�o߭�$�+gnsD�	I��I��q,"0�M��
x������I08L��S�Aq�듪>��@gD<5U�38���#5�D�^H���o�A�pn��=&��p����ד��R=~��/JA�-:Y�^U�=K��kt�ͅ��wg��5�݄�K�R���}�E:�ҝm鿸�����-W�]wJ�/Yi&®P jz8�Y��� u﷍�����W�}��:#�K��օ��*�ʺO=6h�L��{Y�><��ʐ�¡P���.�-���m���#C��D�~�{�=��x�n���;J����
�����8G��5��uA �Qꙏ�c��pm�A�GM����/OI�O:�F<��&z[�rHqDY{ް���C���8-'il��sI�K�Y0Jg/��6�(@�$��e�p�*>B�9 Ң�{�h���9�U��?e�S�1$�-z��������>~�q�����`"���r�|�5.��*�Ka8:,�G]m>q�rSH
W����Z������,�8��]��8Jg|l��U���Q���m����/W}��x_��]�T��eH�^������W�e�
s� ߫IY�C畴��f�~����`=o���i�O�+ �|�U0���N�:W�{Te�n��Z#iܰ��28�:O���h��/oh�N���b�����"�a���V����)Њ�o�!'�y�"����S���>�?��#���M�{�ۼ��ԯ�����M���gH�$���wQ�.�1��I/��JqΧ��8��2�ܮv��夤���w������4�C��GѸ{Ȉ�����'��)��[�F�_�(2���aȧu��m�7ؗ�nǙ���}�xmz�GԔ��\:!�}���i)_�D��HA�1���Z��	����[����|?�q|��5��>�ײ&:j�2���`���]�k4�9
�"q)� �m�D�sT��NC��K���[��!y/�����p�c�0�r=�qs,�W��K�f���|XP�)����N�4!�S�O��
�y��\#��p ��6y�{{��O9;�I>&>=!�_>I��EbjHw�� ��@;�3�b�'�q���n���d�/� ���	CA�c�9Ovj
nf>��ZI��Op4Q�.�q�ȼ����!����8�(4? �� �	2l�t��]��W"�8�Wn��Ԍ���W�4�`N�
��b���<(p�p
��]�~fCy���"ۊcMX���?��a�ù�waS��66q/=��+�Qm��wƙAL\*��$�:>d홊i�����Q`H��:7!*D��4J�f�.'��K1X�Y�,6�S\��':�PJ?q�;�;�-K�t�B��B����|f��-xk�@��&� ��p�ip?�4�%@��=���� �ƈW\����$b���wYT�#I���'��J�^)vJ$Ҕ�t�)_���
�t�X�LZ���ܥ� �uUs{�|k�ܵlޮ�Z�<�R~b���$�En!����~@zu1J��i�q���tGp'�T%��VϮ�Ü���f��S�ԧO�F#�� �r|��M~�/dD�O���0�\�����/��'��aL�c�>���t���S$v'0p�)d��_�cS�S�1`����OΌor���t���ќ��OD�9�|H�>K��qYF��sD�6H0���'��jQ���HK���^
�|�|��A	{0\�xRM�u���S�y�������a��_�l�7��A��Iwt5���^�=z�$?�WM��;�ƽk�t�6�"���p��;:��E�?�3J��g˞�r �-���ib�btoW,���N�Ɨ�D�����ۢB�c�}'����4��a��Жz%F�����##aē�#  �!�Rt�����❖X`�[�!G|�7?��=#��!}���2{@���+�#�֘��9�nY��I����o+tڒ�����$[<���?���C}X�K
{����� �^ӵ
������O���ǲ[���<]M�M�+������<�����`%�ȥ�HK��NŔ|�uqDRG{8�����{�A�t�._����0�"*�twY|Վ
��@���������Q��s1�S<p�z�_�A±;#������/��/u�Ku�&L�������gCmv�%�Y%��j��'��ֿy�r��7��[3x�F��;6��
��go�	���`n����Q�cp�O�
TP�(�&����5=�=�H�����/��)�I7߃� �2��2��3�C��K�WAH��U�O`9���%`������u'�n�~OТ������G�0��_��QϠ'��r�vt-�(J2���kc��=��L�%���ˠ�KO3Ur�8����۝�d:������avB��iw�.rlg�����x�a�k��w �K����$~(Q�:�-!��[YHa�j��Y��*�[��'B�����,#���Sn�I�&��=[k`�J�ģ5��󾺀���~��ؾ)���<��a�>¯�MI�W�eL��D��Ϙ�0S
| ���՘�U��H�p1e�w�!�l�Nh�E�����/
�����0�@����R�ˋ�(O�]T��Q��16�L&����ܞ=��<��1畭%����~���1!�� ����dԇ��p �O=�Rg���[����eb��9�^��N�bx_HYW��8#Ʈ����T׾���N�>4�}�A�����z��R]���l��F6�S��f�>촩(�7��6��M��_�l�րSO���VG�B��ϝ�����5q�����.� �	�N��s]�$Q�G��L�Q�"8N���#Z�gz�M���Ȅ���3 �d��T�V)�`�,�*�!��o΢{�~�ͩoIJ����
��ߚT�qў�k�ZT��?^�#*���^��l,/���$z>���T��?�$,��a~�m�Ϙ66p6@��H"W�B\�P[W���������j�7k}쁥�V���P�W�m�W��/�G>@[���B4�[ɥN�N�+2��E 52=�$��N��T_�i[<�H��3�Xtv�"]�t��1m)��a�����|�'���,�
��x���(x\xw�ƨ���lW�#;QJ�V+V��=���bN3�a�?�!��\X��Ա�l����r���_�dl*��ڍP��M8���E�.�7�1�o N��P��k1�Ǯ-d-}�a�]����C�������c�{�:i$gyrW�9r�~︗I���e�F
��[��X����"�/ �Á� Q�&NU��"V%>Wo��ץO�Pn?��`u�F�HNܛ��$Z��65l�Ѵ l�Ս����C�p�m\יi7���2o����m�ȖMn�+��8�q�I�8L1�0��qk�}187���e����e|%䫁�Ǧm^*ˮ�k(S���H�S��$K՘N��;�Nؗ`U���� �m�H�JVUk��u��k6oަ���������y��]�����4y����38pb����!6̉W�GQ���Kڶ������m7��,V�C6�'/�G4G?7�ǋ��5�m� ���0�Ϯ��̽J���ɍ�K�]�_�0�ԗ�~h��Ae�i6�HLp�N//8I�*.�fħh��D">R���xo�x��8)K�(�z�'��J/JvY��*�.&u��Ch��;�6-&��~�Dy�Y�����ۙ�"�ۃ�0| �Z����E ]�|P��.��ZS��xb�J��Z��o��e��O��΂�,���|>M�yI����e�n��bm� �YLt�?�z"�("�z���[5no�ɯ�H��1�R�n;ɦ�Oa�'�B�Ȳ$J�{���=PMs�>��������{�G�o�.D7��	d�$��������|�9^���7_���_�7���;��$�	��*�� �)%�/'8N�-ҽ������������A � �����l�c�Y��uvY��]��`�u!�m���q�O���{�X�{�e�k�v�(�C�9?dY��]Ly��LG�Ȓ�n���V&T�
9w���F	�M+�kt��f=):���tK�Ar�\�j�%J2��π��0���;��N���c�0c�.��4��k�<�j�w���t�UT#��4]O�܉���*'d�K�KR
m���)F�:�2�u���ETӋ�
M�0���9B����ۥ�����W֕�'��Tr
��g�ׄ�Ξ�|�[g_.���{�SR�gK���^����R�E��@R]�Wo/�l� ��}�t���ġ%*ާ7�]�Ȧ�X�O"�N�oQ�د~��*�.Կ_}J������"�gٞ�x��l�[��xv�M��%B.9b�����U*��i)����O�M�m�&��
��%�-\p���d���<�)i��ԉH��"+�!��Q�0v�D��ݚ$�e���g똸��/��S�"+��`[m�4��
�Â9k��v>f�6���n`��'xH�.�|4)�,G�ǭ��!��x�L��|ykX��A�M���*}:�v�
�2�/��_��7	���I"���7C�JaUM{�uH�:�"zy3Qs[q��
h�����7��p�@��%��p�-ػ	x}�=x�����\��#��F.���w3.WȂM�ty�������y�����;X4�(������s�0ҳ�6�x
Y�ŘI�I0!^���uv�7�_ۊA�����@�m�� ��ғ�(��^���f=��z}��N�|E
�(���������\92��T͟9����z&:��
5C���tL�~?�x{<��h�~��T����sgy@ǫ��g u�����"r����aY����-Y�KE�Y���m���K�x~�A��Ss�cHHVE�5�(
'��s�:ϮՓ�)N�R���6J� ��a
g��q���>1&��t��~	� j��E������ȡ줈�i~�|�I��W��
4ŷv�e$�\� |�﵏�f��7�*
�x$T�|��3�ޒ��WW+�&Y��J�ma��M_�N��qY�!<K������EUFc�-��k�9R�x5f���LI�-"�
�z� �AV��L��y��#TVh{W�G�sQT���Z�Q�kvP��)��MN%zћ��[ߧr�=�;���c��}�H�z)��ZC>z�Sl�i^�P��4�5���]�6',��^�y��Uqvlʰw�y����P��u��"cVQ?��<6�8��p�����7x����ߡYrL�ڹ��9"�b���9RE/��5n[
�Q%�!�� "�=ի�T�j�A0D�+�޼�(�b�%�B+5��ו���C���OL����n�6����/�v�2խ�C'D��4(�W�i�
�J��@&x�E�01�~�w���R��7:GJ��7�b�ናM�>�C�?��pХ�5}G"`��(�^����8��qI��.�?��8�(��>��WobѪr2:07���>�
���&�v���p��MM���I��	 �ܽ?h1��/�o���E��y~�4�:#`k�4�4�.����GPU�Y���:8�:6�ӹ�� ޚ���J�@4d a����5|��Ͷ䪯Sr�|�Mk�ŝy]��e��J%s�r~�mWw�E��H=��<y�
Iߍ���X3T��ّ��i�Fy'��#��&�ԽL�W�����K˵�{��v�@�pۈ~0(ܟ������Z���U�I������{l@�~)�ۑw��P��<�Y�ނ�e���D�����;�\��m^ț*Ɲ̻���o�.�^T��V����sRU��. :�\��O��p=J/6���%[WQU���a^�-�!�s�_aڋ�
l���?L[�\|���E��Ώ���|�O���7�g&[�{l�f��9�a,~z�c��P���4s�|6F�f�%���@!������sJ'��I+��i��}r兜JNٿ��R�[`w�9�ۖ�o�Y0gw�'�k��C�n���aH���	(���벥Gn�������;�V�B�B5?�|D8?���p�e�^�&p�>��v����Ar���=R�������'K�,�c��%��a�	*7{�
YSŗg��ؐ�i�l�N;�O��YV�kkP��0ѿ3�W ��i���?�
XUX�X�������c���fk5�ߛ7AQ��nYy@�q��>�x��(�c�3C�p������|Z�B��@����\�Q!)�>�|�;�x��)�,BD���B�ZF��?�<Î`P>��5��iA��Gc�Q�g�� ��w�m$��c�r��N��:@�.a*M�( �4Mڜl;�^��ě�3Ԯ�=#� �����9|bU�v��V�Mü���"��p���F�Zl���>�!�*E�#���%�������h��u|���rtu�S��#��w���ٮټ�M�U���=�l�j��Hݘ��	����R��P'���Lْ�غm�ו���NC�Yurm�Q��Y�eAWSr]�,۴��юgo�X���x�Z�@Yў��=���5����5�d�x`����g�1��/2L;�p�N���Y1�TX*��s��K
�ߥ��&yں/��%H@-�p4Y�j���"x�����B���@UAs�J*�שKX=�(nw2��h��gl'���:A�4�o��cc^ټ��!4���B ��L	��>�d�,4dή����� �.�r�8��dIx�Q�a������+��U��bCM�c�5QoןH��8��Xp�&V���bCE�W����v��m<�ʤ����ń�:�Tt�.���L�^�p6zn�BWdy܁M�k�}��z�OD��O�b؞�nr]A�4��(��:i������J���gş�rF@;e���
3U��+�Q��[Sc,{'�+3�v����Y��ʩ%n�1F���3�2Rtn�c}c��%�˰�$�i����E6�ʓmG��y�}/��oov^'8}8>�0DBƱI��[�0������8J>�8Il�� ;��M�pR���`�¹���3�n�qI��֏�,�����;r �Lx�~��/�D%��A����=��bz�Ha#��理�\۵�)�[�k	a FY�����N�d��@�[.2Nz��v�<2�����
���x�q����)�,�ǯ��<�7�ǰ3>���6^�B�SU�*걲t�&�^�m��]�R0p7�R�+���Wp��zu=aOwQ����c�ea�P��鍷��>��+�J6��#��%�����'�����M��\�ΑYc6a���?z���R��{�c����6��BU0g�R�qjm@:[�[4��w	�UP9����W9�6mwm���JT3�匌���3!��>�$#e�B�H�#�<��ip�1�@���p�"r�!�qʙ���Ydc�¬��э��mrn�C��!;Q�q_�����e�h�F��}x
.Q�[`dAm�D�g0e��� &�%�	�Ĭ=��ܮ��nCT���>�5�4��}�?u}I��
�Z��L�e�5\�,=��YVƻdB�*�u�Z�owA�|�y�k)h9����O�T�UeFX�K'9q�L������lh^�����)oP�q�� �UL@���(�Y�sx]P���L?X"��d��W�\�Ƴ��)@�*b��s:���j^�Q�����6\�y㟐�����/�q����Xa��4r
�з���s�|�#.7W�XB7Ui���J\}%�+ �>W�Z\g�2���ZzB
����s�ʌ����G�L���R4�r�op�3�N��M��;�z&�)K�P)�#++�)�!���;Iۃ49�Ⴭ;�����K\x&d��3��?� �S5����un����_j��M�	ս��&�gP����F�ؤ	������1c�)��]l*���$�����=���s�0�G�BU��bMUJxX�/���n�ҝ@P�k)�v7d�ms�ʖ��[�ܲ+l��/|�S�Il�r,s�i�L�x\s��e���;�B#�ˁ��D�Gs9�:�����af.$^�����[�� }���x�
����0����h��6�R7"�z���Ӧ뛈-��.i�p�ކj��nX��:'�� �7��6�������H<""2O��l�ı��s�)�誥�p�=��@_Z�����I��d]ؿ�o8uXn-�f6��r2�R-��&?�1H%�Ö`��[aKB��O}���IBy/���w>0��c��VH�Ɉx���5tRUH�>�g`"�� <Qh?�O]�kܵBg�V:pL��L�|{|Å���<���`�fD���4�
����ˎ���ִ����F�����*��t��S��zC
������2�Zg��ye��CF��������S>Y	Zأ$�QM#!zm�U��l�m���|'d���zX-�vjxM�@F]�&��W����g�=�~�)�bK��������x������ �|�e�b�=�p��/ء.P��66�9vD�����v4�آ�í�p���U 	����/�=�r�^HS��<
��nw�r ���6{,�=�`M��ü��?��8ŕ�
@lhf�}ļr�h�
H��m�`p����է!;ç�{��������K��cخ�~Z �c:���]V�E���OG�޹Y_P�٦tU�����
���~��Z���
��O'�Լa�ruލ�﷢'���"�J������"f�_H~/�C�j_Yj,��u҂>����c`>||�����~�B'�h�Ad�KV�x�V�X"u	��\�Q��T��&]$�RG��6Do9m�0��)�jw_��Mk�HӺ/O@W�6<�*	!��3���b�7�G�v���ύ����>ME�Ñ�h�R��u��\�[�]B���T'�/���%F�Zѽ�;a'?�+R,N/�w�;e���lɖhA�#�V]��hVp#4f�}W}�v4��]07ˁ���~x~r�`����Dh7�?�wʖ�`w���( fa}���)�l�*8 e@�
��f[�U�D�c��e��iLp���s62��AՄ�jV�v�ݙ���	�����f���̔�沠�wUh�'5e]�5����X�4��&�S����箸�L��"Y>>�>�Or͊�ۧ�'�%.�:KƠ���OU�`�>�7�_=7�@ѣ�qE`��������2���V?�߄��l�I�A�TD�Yk� f����N�c�Y�i�Z1�ɥ�K��z�����Mf�'�&�֯���{G�略&�ŏ�{��~CF��Y���[I�_�1�ԣs���t
ϦoH���CprE$j��k1�xe^�b�a5�������T*�3�m?�K���2'��쌩jޏZ����Lؽ�G����D.�-գ�U*@*�
K�CA��ȭ��i�,8��e�h��)���#�������H!H���u�  ���gZ�;-Y�3����̅O��!<��|s(�\�X$TA��3�1	�9�z(A{���\a5~i5��:�B)E����捏��h�T���NM*LKs4Ѹ��u�e`E=܅�G�Sx�Tu�輴���Fڪ�?�������L��@�i�S��\���V쑺Ά]�y!u�����$WM'���>��k⢴N���t���t�Y��h���X��!�䱢��Br�#���o�������=�%�������a�n���
��8av1����#ށ�oЀ�hN�*�����0��ٴl�W.iw�W#�6��K�
^��X��M� �6A\-[.�_6;iZ��~d��2���/3x%KI�PJ)�3�Z
�$���@ς��n�H4Z���*;
J�9`��5ݶ���ڞ���h|�KB��꾮��'J������ځϞz�NH��t��F,��������Z�1nU��xi'�T&9ˎ��![�#�3�H��hU���2�V�S��ޮ�Cj�����c�g!$���U�5�9���=���ciR[X55�3�m����G�+��ď�ª-�H�����N��N�+L�!��C�&uT�}�`�qh�<��x}�^�?+0*,�i�
�>�D^B� )y��}��.%X�ۢ�a[� +3
T��F�� a玘A�#�F����Ҋ?�����%<'R����u<���[����j��%�^x�~�,��;�QmBc�&�HfO�i�X�H��>7�q2�˥���� ޱV�\�j�;6�&t��c�v򸙚�{��{�87�9�83� -��>�jyQ<O���ɽ�O��2����-��5��,ό���n^���Ar�:\f��Y�Ac`�g�L��x���Dq`���"1��?�z�I^e�O7��-�d�IY.�5�>�Dh�Z����"�&�p�� u ��,1� W��Ky�)Q��7%���;dq`�F룱�o� ��q8�[g`��1$l�'���`�>��
�)BN�[����i�`�v�¿��[Y�Fj�&Y`���z���p%<(m*��v�*T($8/@�}Qa�$����,�VlmD�_��S:l�n�N���U,Y�Щ��?W/;�i8��`L�P���ԍsLY��ΰ�+�x��>�;-xF�:҉��3:KWI�����5	�z���Q̚�:+jN��2���&��(���ֆC�+N��u��#��:�$#�O��|��A��(��d�
�r�ߋu��̤Ƌޱ�F���˻���^��(潖п?b��M��"�����Ixpk��ҷt1�Q�fd?
�a��������
^�r�/
0|���^U��3\�����p����#�^��$;\"�ɚ��S�Z�"ʾ,�A<�9���R2_8�ʿ���K�0)��B$7iPS���I�Ɯ��y�
c���2R��Jڙ������	�j����Ԑ��;������B���Y����s�K�?E2h.A�	��Q28l�Լ��u��5���ֵ��M#|R{����G���s/�Fc�õ��
"�{ �"����lL�PZ�8��w!c6<�O��ĔSt�Ud�}�tЙ��*$�~ŊL����8W�����$�#��U�d�u�M�d|�[\�H~�Lm��;ޏ��-�.n��|J(��+Ba-�N�?��5ط�KE�Mg�!�LY}��)�C�mv,Xr�����q&��q?�)|�Z��b�"�9QCd��ɤP�n��qq�q�
��G$���r^��b�i��
eWN�7��+@��yAE�c!R�TI=IO��ǳGR����m��C��*e&��.$�+�-.˷R�(,1���!Ѓ�Lg�V�e(I�N|���+� jS�^
W�י�
�c�f�mj�@/�):�L�Q@�i������km���obՃ�$�ݟ��ÇPp(!b��Tt��La�F^^֣�����)֩ɖ���y����!wU>���'/���Q'f%�Z�<��Z�C�rOf�a� �>^��W��<���
9��ފ?��N�	F*j� C���#I� �ذ��|�7bw�O���.� �����,�W�#)&�080ݷ��.d����sKK��bW0/�|Jk/�q�ڡi���i<�ͣ�}9�9_)[8�R�O�ws%�Z�u���.�q�:1��F�m.��3���Ä��.�Ҳ&�=J��?�V��Tׅtۀ�mZ���Ph= ��� >?�Ͽ*��!ȶ9�"�!��� ?5@~$��K�?���'�9�'�9�(�:!�;�5���j,Nֺ�B��h�ԵҚ��+[��Ȳ�Ya� 5:����*!���t�l3������%��b=7�=��YW��%� C��w p�s)����.K����J�0��� W�=������M�?T��2mT*��|�:zs������:hC�	H����wY�%F'<����~b�'����۸H]�7�r�
>�E�2m�!�H;;�r��7��sS�������P���!�G3�h��A��V��U�P�
�*ɳ&����R��U2,
�{�@��P��"������:��
�9 5��%ت_�L�~��T)A�8j
�Z�p��7��������4Yp�o9�NX���y�8ҩΩX8Ytv����<��̥���
�j����D�<k��7�S�@��]���C8Md���"�R�N�ļ�?T�g��qd+���iLz;�?��
����ZRV5G��X1�ו�J�?(�t��~ߩ����
,����n���?�D!=����#�	�h���qA��Ւ'x<���%
���
�p;O��xQ�W�3M�c��@j��s���.�|W�d�R�HHfNX���7���4|sbA���i�K���T�ѵB�I�Z<R���2q���պuAjW]v�D(o1.�g��0a~YY���~��5��;��g���B���(GR�J��C��@�#����b�{α�����n	ō�,
iZ@�����
���s$�1�ռ^:, ��X��$�4�Ւ���@�w�w�����x;N��x�hYɭM�[u�T��%#��ꦼ��gA|�C���d�7Ѯd�v-;�:9v��gE��� ����Dk�t�u�%HXR��,ˮ*(�
�
�ūd�҂�����%�_��̲��*!@��+�g���#�	�Ao8J��p�Hx3��:i��XˏWL�!m�LxP�@m�H�&a�R2`�� �z~�
-�����1��~����u��I�Ԏ��B|=��B��GpB>��v��L��;�E�F��`�I�Xס����9lArͯ��`�����.j+���������eH�ҁpv ��!$�(��N��T�	��
�O������z�H����G.���Yf���.�k����EY@VO�[>]�6����S�9�q�K�DÇ����b���;fa�t��M�H:�K�D�uL�>���ZǷ៫��X_W@�e 0� �?^��� � 0d 5    �moo�{{��O���ě��$�嗽`�?�pV���r����NZ���8��8�8�PU�ĉ�Bջ��*���� D� � ����W�ݻ��y���fn�bf�oP$sy7��!饻@�
V���c��`j�R*���=�R�R��GXK��CKQ���;
e����G�qH*[y��zt�(<Y+
:3��2�\�it�tss���9��f!���`�j7/��B�@H�
��|�����q� ���S�]�w�{�+��t�G��m*��lb:Elr����0�ŴU-���|�wd�ґ�N����+�z�Y-V1~v��y�	�:f�M%VR��sd�:��'��%�pw��"�N{�*�V�`P�L��)���>@����F싂2g�Z��+G�)ݞː��M@Hg&Qy��aԄO�Wձ�ʻ��@����Y��L����f�҃��,a]�4CKٵ���I�,H>H\d�Y!(쌤�d�CjӜ���F��
�
��	9���iO{��fJR�1�Aqh)��h��zۑ�'hhN�;Ȼ������؛-�A���fu�H�ye����V[� q�I�O,��˱��~��^��i��Dq��>�G��`sr����OM�������F쭦���#ʅ�,�,�z'k���cY�;���w��a��)V	�r��d�gW��ش�fp�M�IX]��(Rct��=�����J�l��
=,e�LgF`ˏ���>m; 6E��W�^M�k��v�Zs����ؐ�M� �:���0�~Y׭w�J4�۸��4J��˞;�#��)4���!�{ G�� U��Yh�P���Y��]1����?��$hś�ͻ�戯���U��=�\��U!������8B���&�!�?�3�;�s�۴�>Y�8����\����vN�|�3�;TB������b���}I9
�nK�
���D�̧�#�\A���L�o�Y�Y�&����ڤ����5԰�V2<d�Fc'7��zm^�����G���W��7%��>���J?��=�������y�w�� [�N�����[��6�a]�lGx��P��� nH��r�t怺2�h��; ?���X}��#�N!�r?�t�w$V��h0���~J�(��B��!�9F7�����jlt�k��S��GD\�J�� �y����^o��CT�{�
����_`�&	�\�<����5��w�S�_
1�G	?�ׁ<:ù�hy�m|A�C��	�[�\:=^�5(
a+�M����
�rn���W
M�(�Z�R�6w�l�]��Ԯ]��U�Oׯ��$�0�owP��K��ȤKzU/���W�q�Pw[<����呺{3��Q����-r�wMR*�#��ø�����C0W�/D�|@�X�w~�U�_@ K�������f�ś��pPQ{ ݚ$���r�Q�꛽���^�@��Cͦ��kY�Ǫ3ˀ���[��y�Bec69AJ(/]��#�[t�V�+TRuU4���� ���ġY/�w�V��"F��x� j��`BPK`c���	��V;6��U >�^ZUv�L�Ibgs_��#>{:JsC��Ќ�c� ���S1%H~����rS�29[�.�?6
����#Y*�<B>�ԌF7q��-�y#[��ܺ:1&/�ưu��<^jr찒b|�њ�΋�U�~8�p�Ә�A�.-�<���<��M��A5�7 �)Bs��R������n!��jY�bŤ
�#��ͽ&)��u^�d���ɦ_�Sآ��g��E8�v<��붑�����������RB�S�a�puW��
W���<��.�#��S�A�� ��%��9���o��	��R��%��������r�0Lڂb�p�@��9����;#)��*1�n�|��9L��Xi�O�Wxę/'������H/�r�`0�*H����t}���f���y�_v �y��������C�1������թ(	����M���j�� �f��5yucK�h�w�J.}� 1n�`1�����(��|Ҫ�r+e[a-�
�2ЌM����8	m1b�K�HB�a6.��@|Q��t������c
e�j8Z�&մ*��� ���6	�v�Ȋű�6�Tjl����5������G�\dN�8�
19����Ϥ.��ο��{�K�Ȫ�)��̅|�6����&[2P�Y�#���`��E����"&��I�=���N��%�8M~e��#�� :Y8+�?���O)ȥ��1�"K5���6󌮨%�A�$�<�r0�]���׸���k��1<�R��
U�+N��;���Te��LX�q�pk �;eM�f��z���CY>��w�>��i�+sԳ���~&���\�sy���o� ���?�=�#v���-���P��s��ə;�ʈ(�����T��>'�ۢs�NqH�v��A��,F;*K��> �����Puh�QJ�������Е-(�;L�IIP"��U8@��r���!�O�K�T���լ &������)����Vџ	<��1A�$pu?�Y$5�5p���j���eF/�����h�\��s�K��w_�[Z����rr-m�/5�����X�~��� ���Ƙ\�.ʧ0�*H_`N���_N��9wB�y+Xp����|!cH�Z�AΜ��N��-u,��e�a�;l�g��&�'���l8���d:�˻�x�`�f�f��ޕ��
A�訵��B@xe&��GǏ�q�a2�79C�M�M=�G/[@W�d��d���0�����$�Z=������Y��L��c� �be��inݴ�����ގ��Y���< "�F[����h* 5uŇ�!���c�q|�7�1��O��� c�{׊y�@���a�B��D:���WX�.�s�x�Z����� �8�}��sV*1
�U8 �K�n4f��R,L�J�S]�D<�?���w�!B<TB��qr2&Y��z�1`�JiL��(���n�CCmu�|U
��I���+r�*b� ɆQ�eA֟��	�ϡ��]�
՜���*#}JL�-�ߏ��t%��]������{�R8Y�*�&������0Ge��-y)$*��v[����գlyLR��2촫9���N.�����	�*$8�{��-��D���[�w�G䭠u��մ���\��yP�r!2r�y�Jf�_v͑���Y4�y% �D�cK�rx>ۼ�Y�"�MtV�L�r�F��U���
��מ�W�tH
�ߖ��R{���.N2�`�y�a~:�k�|MR�
���ٿ�"c^���_Ϊ�	_��$R<�Gw��}��z�$ųJw
����r�.7���9)��#���qv����y�X�xi6��*��ͻ$1�
��/�-.tu��n����]4/[��
���Fts�f�=��Hpo��]b(lE��<�[!qwl(�{�ݳ8�_C	�������PC��A���RqI�Bf��Ȳ�����5�3v�hef�u@�2���ÿ��<Ai, ��ʄWX��%w�cz��{;R��(�P�i���Ѵ@2����ᦅ�b
Pc��J��U�}�6{���t�:���;6e�9Ñ���l]�}l%v��eج��j7
t�d`vO2�]�rVVT����B���f�yd`B�۔��Hj���!A��<TT�X��^�ь��ı@ja����R�=�����ę�:�
�e�C��mC?R���2gU|aM�gC�Ri3c=8�����V�ۃ ����mT��/qC�P`���G�@�H��5��!q�A�d�.t�*����awm����Q�b��O*��z���)@L^�j��pM�$�#P������iNXOo�N�H`��|��R�Az��Cл��~�o%�����%�]���
�6���i��`��IX�:h{�g&@zX���0qUw�������{����^���`�B�S�x�U�p���<�՜Ȭ>Đf��ŭ#�儨��T"��H�<} �\�m]�3Q�/~���x�r�۝z�|�6�0k�e6tqd�W�Σ6�!
��sx�o�S�|"7T�cW�/��q���Gx�Z��幵�I��M�p�[�ԕ�< O.-��9\�9�T{�$5�
��ؤ���;�۴��/Jn�@;��v�[���rx�:��i�f,�G#c��_g�|�ypEV�t�1�Z[rߟ-�:o�#��j���ڋ��t�L� f@61="JY��A<�q�o><���5d1!�o
�=|�u���)s���!+�����(��i�����������kO���^8�V�6���e���y���
$����&���Au8���H
�n��@���6�$υ��i��m�.j*�ãC���ɳc��!�`ӵ��)8�5$�t����pRt�T9���������>֧#>H�)�V�l$����ܓs�ʟ@�|1��3��[��kJ"��{�
%��Ղg��{}��q�R0I�D�8�"l*��}QG���<�p$�8���F�Ղ��.H:߼}T�K���5a��z*�����y{��é�K�F���!�b�����}���@��7Q���hfZ�?�s[jX��χΊl�x�z�4�\�x1E=���)��;�>��:� a��4�:��:��)Z'�''���'��N�@��,Q��wš�����҅΂�E��h�!��B
ݴ�Fu{�'X���WQ7�eG�}�F����43|����5�__���rn��z央U��K��V.��k� b%Zr�Ԑ{�H,ŝ%CStV9����Ջ@j�||-槐nB̫�X�ꉵȳW�s����b������WB:S`wD�0��EW�o�e7飂��E�"�3w���d��)�#�`���ix��z�h�`��z�mhQ��ħ�o�k�3���H$>A���1^������x������Z��U|%�.L�1�F�����/<N#��fC�a��V𨸎hl��T߿3����k5�*�<\��ԉ�\dӋ�
|iBx�%�h����U^1��[�f����z2_�Y��.����ɕ�"S��1�{l�wEXt~��G�����z��+2�m�_��π.#�L��ɧ	Q;MŃ�/R;��?����?��
�3ּ�����ّt�P����?�iK2{[���_�8zWޛs�G��IFW�is�F|m��$�� �
	�W���TsEt,$�N�4S��g������6\S��`�qᇗ�KX|ȵ��2S
F�s���t\\��D_�ɰ"��D^��u<����И�I�-MI�ԪjJ�b/p�w���<c��k˚��E��4gR�^��j:�3��w���F�0��ӌ_a�w��
-\�A����sggl�5���|�'A�e��z����p^�)}y�]f�	�z����ԛ)�W�#���b��

���t{]��;���T��Z!DeC�-Π����H҂�I�y'
c4��?���*�#�����ё��֚r��-�h�N/���U��*k:�P�g%��1�B����_f���u�9|h��!�nOe��*��#�F׈v�a2�A4�F\�����(�-�]i�]_�P���^h��ؔ��ɚ�5�vQ�!��NC��2��M���'O�G�E��OA��A�c����/]a�?���H�u��w7��onoZ����"v���&�2�_�ǝ�GР�	�t��D��qf��'$�k�À�)�ps⶧�~s�ysq�*�N���g7���M��F���ϬC!��s&zq>���L'zCz@�_H��!��|B{�K��8����@M�Ͱ?FW��lc����c��a3Ǵ�Y���¤����,o@%��g�.�P�s;��1�Iٖ=S�H1��M6:���QߕE����\�\��S$U����]�dռ�9`K�&7��X{碊�o��������>r��[>���O���=�Q��Ԣ��k�t]/ �wg�(�1��c�	�
��A�Cu�h3��FT�j`]jBb���+E9/3�E1{��p�x�n���9>Z+�x<����b��
k;��&���#�ݟQ36�r�Wۗ;���-�)��7+$�ܼ`z�8�?�����y:��LK7&Z�&\XfKa�9� ��ן�����vոpF]�Q�g�i�;8}*��N)J1?�S�+��2���I�#6o�*1��2�ANF."��*��Y�'�=����t.�HN�l��=M8_�,��|5f��Ҙ0��l��L��7$U��9��K�'
�'�{˩�U�@��\���/�n�s����s��/���Ȏ�O�T��Iu<Jܙ��Jڍ�`Z5��/qN�g�����sh�#��]�>T���֗U82x>�N�7�[� b�7~+�Z.���<lNT�חn�2j����=i���9׌ C��<�s�fyiae���]?���Fx�
��1p&��y}���la��+G](?�m��k$eQ%&	#K��2U���#Y��|4�6��I�|ǟpWs���L]U�^34|��Q��]�>A�3��M�(yX���K�__E�x8�P��AX Xrz���hA�è�u:	~K�Z�$"�al��c�����L�ЪC�D,M:�2_��4���+rEB������s
�:Z Ł�+n����v�M�5<�4v��'��˘�-������v)�Q�[�X&t/:����.�� �R�Tq��M�W�u�����P��v��HT�w�臙���B
���?+Z��t�W����%F�o
:�8>�4�񽭭 ��KX�Xl��&��q���k��k��d���K1�=g	��D�����+������%_��KI5�hb�U�OPĦ{�"� ݘ�s��o6\!(�"��	����9�nۛ�8&��l�R��������}�$'W��_�-�)��E���������cL%t]T���צ�Yym^���?n~���k�g�~����������2s�UX����ޡ��E$4`�F�7E����F]�%�/�>��V�Jֹ'TgZ �@����K�Q�"�#�h~��L�T97�����Kͪ�,R����J���D�\ ��
R�ﾖ��)��8=]�l�M6zО�[��+�y^>�
vKu���#
Aak}��
��n��;�n���LԫE�mda_�.�O��!�B"l�������0�����
 *&��sx'�Աp\Л0&]�c�z)��B�462�8l(+.-y��aƃr3�Q��
/�+�sK�k� |*�ȋMm�h%Eh����8 ��Q�o�W�8���7��5&�W>6TR��]�V���=���|�V�d�+�v"�Eˁ�S�u�sF��B�Z����<��B�m|)����x׿|C�(<��|�}:�6:s�L��֣�
?<_P;�?O!�*���swuW�>f�z���ǯ�����=
���t��U$��D&y������,S��� �|Ba���Ox0$�#�㣧D�*Vӵ��=g�QB�J����dtJ׫/��&X�t��>���YI9v'V� ��V"�k2�F��c��8�3�h��?t)06_�r�>�=8N���i����|	&�,����T���ۛx��-�����<y�/j��/@�(,�(����3�+%H6�U�ka��?|a0"xW�L�1/��*T��^���]��;K�ï��@�[��u	����f�ͻ��(��ig?+�/�]��I�wW<=��i�t��%�ʍ�ȇ-y
�<���c�w�����1��=��y��oTd���2�W�z�T�m
VaF0��b �'T5LเO��M�>��iE�QgQc�;��9�1z`��Df � ������6�bg�Y��$��n(I�uD���St�u]SCy�k]5���]@�6mS-���.�P�(֞4P�CE]��L��6 u'Խ �  Q� sw�2�.��Ou��� ) D����"�)�Y�@��_&�]=h�����\|�� H�B�b^i�2�r��i��\A���FWWɟ!� vFZ�e�#6[� \Ԕx�u�e�mu�%n ��	�(r9���7���RIf�<�#�&>-Ud��XǬ����8��UQQH�tҐ�w��{���k�;S�rf���a�uŨ����?5%�X)��@Ia	u��J�a�=��Y3W+'&dGΤ7H�-([�f#
�
>G���8�%*ŪM��8߸9&�B[b���T��B�1; ��j���I�T=۞�N��=�[m%����!��j��V��
�ǌ�ອ��l��g� ��GP[��I���Nh��³��/����oQ�^�Zu
��BJ��^ѝi<���s�q��qj�ф���jq��3�����.�p涡G���r"N�h�k��v5��T�� =)�֘ψ��[��W�}�g����<�<X
�߿POʇ��ů:P�)�rK�HȖ�_!����4ԍw� �^��|��zh1��Јv�;:�'��
(��L)����Ei�ܾ����wZn͈����=�M�{K,�]dq�����g�أ��L�s�KLl�ecȂ� v(oV�7�q�Df>o�=
�I�XN�+/��7.��V�g /���T�'L�M 8$����{�6E��ye��0o��q��y�B�b�ԁu�7��8�L���>��4^��M&bG�iЙW���	R���%!
Zq[+�yw�&#��沄^&���^Z��q�=+��{�E9�>�d�W"�<�Fy�E���|��2���S���#�^&B�J��\����|��h�������ķ���U5r��%[L#�v)��e�7�k��!�xS���!s��/�>I���|R��_���Y�`�s]���qzE�(n�Z�?�v��tԀ)�i!�C�n�@�O`h�PV~�Ӹ���;9U�8.k�����By���ꙕ�)��;��V��%
�I���`~�:��J��a�Dky[V��bnNv�kS˧���P�3�9�0�ן0�ƾp��c����z{J6CJ�!Wzd`L��J����w�4u$��}��������o�7��?�~���d����P;l�(;��M�C�����
����%�?�\�h�@������p!�ͷ�x�=�`&P��|�4E�c��86��8 �@���Q�~n$c`<�t��4��G�����_P�|��7�
4:�Ն��,�U�/#|/ƽ���׶]�r��a:0��Ak�|8'�ɸ
%�<W� ׾lQ0��=��|pڞ�x�6�#����[@�a>:k_�C��T��~;�l��0��	��a����,|"'Q�-;1	���K��܋��/
J�������/.�B�V�Bf�\h������P<�nO�v��(K�'�z����'�@,q����vٻ;��;2��|[���<Ha`4�����Bn?�|p�~+�X�ӢZL
E�͖oa��D��i�*� ��,x�����ф>���T(�����6;z���py�odc���`~���D<��$V��eO�iU,���G���N.��@\aH��^����[�E��NJ�!?%��oè�+Z�H�#�����,��	�m��8kdנ�dEv���>�F����
���a�-E�^1 �Y`�v��b�~�Q����gC�,�N�@,�֪^��s�.nV�ư!Fh;z���j�eͲ�G��|���"�qF�F8/��<�q�U!ԯ_�?̽�0�'k~ƪ`�-��Vsfɤ=~�����R�c���v"l Px���ĕ�E��������@,&�B@0 ۽ӕIp����	k�����4$x��NSX�de8�n�I]�
UE7���������@��%�-n��u��why�>��da�z��=���Y�S��~����������jZ��8���<�^*�>��X�7R)��s��R>��(�%�y��_��ՠ{���8��S���м3rVf�C���:�y��J��L@�0�ŗ��RG���*�����+N����d	�\��?ι���E��tA��-��&.�5 j�X%���J6V\��k���L�IS��$�@�Jٷo-N�.E�G@������ٺ	��Fn�ky�@�=��O#J��w`d`�}f��p�٘�vE�.��-�����ۅ1����.!B��j>��hn#�L�m�qn�����y�\���z���X�K�J }�#��/F@!�;��8@���06"�7W�S]�-�q���X��p5S&rX¼�{�"	�$c�g�V���˵8qm�g���V4�ϊ��lߵX3Q#S�0ى�{��g_d�-����I>.	��Y����_r���8� �o eB������ى��؅���b��� �����|�*i^|T���%�.��%����]Z��p'(o:I�v�7ї�?�a/��ఔ-S.0:<�6���Q�
L��Vb+���ve/I��/����5���M�π��ˤ�/Z�'��rBp��RR�����>b�7Hq�cX7-#@�yJ��[4c�fݥ��{�aۍ��:���g-%3�jm$�	�ԏ'�����E�QҖ���� #�鎢؛�����k-Q��ɗ/n��t���	�<��)�O7ϡڿL*����>�@%<_��gʔ#S��	 L�� /L�1���h�������u:w_p�{���[N'"�e�\ŷ�.��R�x�*�o���&�!�6�=�A�H��C�/����),��(�JsoA�8�O��Ъњn�M+�c	D'�(�]~a��>��0���\`
�@�b����faE
Q��4G�&
j[�G����a�*���xʌ�輕z����2�T*��0o71���`��
'�]ڿ�]b
4}J%��C]e5��L�����?�I���H��ȋ�ֽ��t�:c�\�XX��.��
;�@e�VP���ai��{B�^p����~N~b 8�׏��]7����əO8�p`�R���jo� ���9��3ӂQ+q�9�T-u m(�p��B� w)t�$e�)�~}]<^f���\1�u��^߫V��~������}L�w�$$-6����9Dζs<sh㻃X���8/���gB������"׼�vs]�����c!t�:�ӣN�r��=�bG�.�B���v�m��/NF�8��jѠ���UD��͊��1�j� ?q�.�d�����;�=��\дg\�5��aiW#��Ÿ�(<Sp�=G�	�$o=#�3.LMO�N-��&׎q��B�s��Z���V<&`�7O<����L<cJ�K
��	qy�O�;����MU���	I���*��RB�p���jIv�"�M�?�pм ���b.U�5�bJ6����T�&�����U�0�ݞ�J��y�ʾH7+A�}4-t+���C�еO!�4Z�����1�r�,F)q�|^ԬC~iO���da*�F]�>&<��X��/��W���㒲m�Z��<ey�b�U���*g�g�5�y1��Y=E�P�4ԘWML0��)bL��������Vpi{Y�u�ѩ�\���]�AY>�E��t�U���14A�Dz[�G��>�d3ܹј��.�ା��m�� ��;�eￋ`�ko���=�~5�|0O�����%���%U9�:y����xe|Y��;�����Ԟj{2BϏNɰ�mo[/:Nn��k��<`�$;�R���r��k��T�/�H�d2���L�q�PI�BA��r�u�����R�@1��k;DZ��e�P�ZYy��ƞ��񫕻�XN0�0�T���.�A�Җ�ƥo}�]+�{Q�Ye�]�^��s�3��U��@� =���ճ���ٌwo���h��L�����zj@>�ו�_�m=Qv��B�J�v)�UB;�V�JhDCUx�\ŭ��7�ux������tm���/��6~w'O���H����iK`8�W�F���Б�d��iE��<v\X�x.�m���}zg�П��="���_<��jd�V�9����&n!t|~[]O^���������f��^��5�蝪�U�/p�F�T�
�x[=h~{@O�pD�9���%�p�R�}��b�D��&_y�Ǜ�ZJiY�/l9U��Dw�X�V�	!�$��<���
������l��	9c�����\��������x������f�d�_�89gS�#8�����Z~��[���/��8lpUr*������n�b/>'�.xVWi
�/���u�
91�G껰G���bt�	Ο���|�1�\��S"��4@I�އ��e岓�u�<��UE-w�!1w�Ԧ�^$�jy�����*�����@#%p��*�uc ���/�K���9�0��5�0�
�t�;�F�}k����Bv�#��;��L�F_�g
@VE��^���+@�Xv��-A��u�tHcy���ђz�c��=�0Db�k��(�������:��	�����s�|V�fTO�^}����� ���9z�N'#�h����I� %D��W��H6W�<�d�O ���/PCҕ�7�#���/��cӝ$-n�}7Ǣ�gt�O�3�����^/������+��[B�Ͷ5A��^}�)� 6Q'�?�{b_�^O�ނ��}�mn�<f�A���f���0	\ӥ�v��l?Э��;��vN ��������~���Z �]{�̖^�ߖ$/�e*x��|r��|իK��#5��T�4Ty�]�m���s�4]������F���A6tewy�����S��N����2��tV��ϗ@u���?d�����|�]Z,r�b?�VI$kȠ�(�"�h����9��7�P]׶)O'(�
�^}u�m�I��4)vϗn(Ё#Q��"�_�Օ��e��* ��«䒅R~#�]H��cـ��>��~��Y�Yl*F��f]h�$/VDi(0�����2N�EQ�/��� �f�õ��r�ӥ5![+�
ӝ�b����7��O��4�F�M2\��ɅrWz�^U�n���oE1�"���蜤�Ջc�-�k� #;�	��c-v�}YiV�`�uku���`�ٚ�4� ��Ԅ���}�:d~�J՗ 6ȿE�Q'Q�`n!{�<އ��b`�
v$.�:�1:l��
��;Q
p/7t�G�u������������0�f�%���fpd���I8�/2�����'D�7�Ќ�;����Ofb����N�Q<�
�]O�
.�6)b+������I�B�x�.`�/��o�@�<�=[��Ep����]m��ٗ�²r
a����ږ�������=��-��}\3�LCA��|۱O�>�l��_�7z�G�4V��H��ru�\-r���q]Q>�Qi���j��������.JW¿��w w�`�i˪� S��� �|BG��nmv�8���^��DF�w,��.�iq�Bj�k���#އ��a�L>yփ:��<u��!�=H3��
�Uk@\�W\��0� x]�L�-!y}贁�l��]������
�y#�5�<'������G`��q�����������!>M=�����?r�N�]����z�y���������8I'1�f����1_(9TI1ޭLMT9���#A������@[ߺȝ}�&��u��l���� �����H�O����vκq���3�X�}����52x}�p�Op`,��~�� 4B��)�
�	h���^�g�z9��^|p۷c����o�:ч /��2�|M#.M;��K�v �T�m�'��"ki�/�e��=FRu�4J����L���t_�j���.���� �8���o=O����I> r�T���h����c�F;unl��\�S���C?��M�-	,	%���,��a\7�T ?�VY�3�I(���@:�B��8�jH�Y7�r^�=���5�ovrx��<d-��-e
@ea�q�P��*�e6N�8'ũ�_��c�G�ѐ��!D�7���!��;P�,��q�#b���CB�����?�H,S��L1�cQ5�xZr�U`�X洨D5�_���"��)w�No̜*m!�<睨Gql]�)�t�KA��w�Tuf3֜s�H����!H}���}J?Fx<AAƠ��O�u䐩�E_�^��eU�"{��?���%����ojR��=Z�;�Gxq�T
>0`���٦@���l^,�;&��j#�(�řzv��Ѣ1aOnJ�co
�1Dw%L�z�5�1?�qw)��`
6���b~v�;�V
e#�GBT��eQR�hy�>�'q��M0�4w�c�**x/ʣ���Pj����BΩG�
�|ù`q�mA���7a�sl�w}��Q�X�м�t�S�F�����~��E����.���A'���+��nh��
qk���O��
���m3�؉
�D�\jO����{�j)��c��W����_[TP�A����lX5̭Нb7����Q�F|\���43���n�e�J�4
��m��Ug��㋚D��Ge�3��|BM�ab�շ>�mTQ�� J����m(lCRn'��ʇ�*�`9i�����HC f+��e)�bp=����6)��?q1)f#O='O��JJ&��ٗ�˲K�+���Ws��C��lP��CI>���zǩ5P����w7=g�г���Q{��ų:H���2"�v�W��sq�q��\nV�--�1�ѥ�@�AȆ6T�����$}I
�a.�"O\�6jE�H�j�ĵ��t��
���BΜ`�_8�R��%UFС�|��I`�<��x��o�Q����.��*��r��R���j`���)&Y-D���	w)6qi1�a`6GK���!�,�Ӈ�֒z�\ѻ����2[؝�����,��/���6�H��.$]A�qt��4�ig!~[P/��������s�x�ͱ$����������?�2������x5Z+���pK���
f��7��yi	���޿�qz�RY#��~e�H��=����x�Z��q1�uP\V���T��]�Ek��Y!mkcD��^)/�1��.�z�SL�O�KNוȬ�>�l?�S�J�}K��W�o�WDv�� �5K],'���=q�0|H����:�E�٬�=��E<h2���+����B�BC�hX�7�����ӌ�D=[��S�N���xF��8nP���s>혪{'�lhI���nSa�r7�'��J��P��1�bn~�v�0f�ؓ5�hy6��D*O;$�H�� ���ޤ��;���"��5��e�}��Τ}X2��.g���
�JǨ��O�棢'�Y�d�h��E����$ƓToxl���_��Pd��N�˩����9c�����}*�L>��1q�;k����������-c�Gy�NR �;>n0f_�U)�b�s�L��eoѾ�]?�}��"�ѕ��?��ކ���B���{�~�Yr1�{jg HЁǮ#�����"�63Ĺ�Y�I�:d���9K�X��G��Q����y3��t33�̾�����L�]���LS0�4�q�^[���٘S�.BB�;�|��#�� ��Y)������r?�'$����ɦ��1�<t�7���Ħb�=��KN�*��NM����B
������΢���F`ߜ��������P�>���&���PEVu���(���D��'|��E�ǰ�B�ǎ'��]`-�?��l�����l�(���8�_^#�
�-nQnԐ��[���=/dF���Zp0I��섐ޛ)���J�i;���S2���5*�g�<�E�Ks��^�1��lF;�rݟ�8��7;0��#U��E�_�χ�*t�X�=�2 ���`/@E�v+�@ߵ�p!!?#��t�+����NA}�m��+��w���y�$ѾMa��A(&�`�����]�l�9q�j\^��R
��h�7tT�k_��~=��\�����#T�ᒄ
IU�����*��Ё@��.痩=����w��b��2t��(�xO3����������ɇp9|�Lx��e���Qt��]����b�]�]��L�H�G����`h��p��
�ν�4)   0d5    {��j{���R�Ug��Aֆ�����کX�N�o.�;�{u��5���w�_�|_�8���T�EQH�C9��H����+� ���~+�.�����nv9I��(���] ��_ɼ�v���.TW�o[_ݻ-kʥ�y��R`��S�G\v��P�(>R`P���0!h'�d; �  hh�� ��$]&T啦0&b|@]��"��B���*R�4͏G�*!=?c���5��:-��$l�d�ifV�����!���r��)U�w��DFR�[V�g��WD���.S4�g@P�%gh��k�1���I�k����t�prZ�8#Ѣ��]�R�)�	
�زL�lv袅L���$�N��}��%�,'�[�7
n�wFew�S�����K	��n]$�@��)jo���i��^��V2MSQ��&ľL+
�Uء�!�4Z#�&n�,ִ8����)� ����,9��VY�4��g��k�4�A�-�A�f��t� bQ��"��W�.��O.(՞�1k�d�ǒ�9��@Ҳ���%e�Q�^�zGUs]b�����)�L������*�А���rzt0��%����5�M�5J=��)�� ���7�w��э/ߒ�ٷ]kd*�a&u�,�C�t�E*��X��5m]�n�T����&玾
˛�Ku�<]i�T{i׃�"tY&�����C��l��=6K�3in&���e��	�_<�U~��E�
�S�Vn/-���;aֻ���y��]̻��=ʂ'R�=��w
&X\Q��#���"v�E�49F��aA�A�/��`~�y'�d�]r��i��3��=%\z�aU� h�@/xsM�@�"A �>xu>BF��[=/�Jc]�. D�>��������^� �����G��$Q\f��uN{Sc������o�u�� ��>�n�뢬���l� rbn��ﺊ��Ꜫ���ڜ(�ju%��Z�lʩ�g-.lV��=1iw6)���~�B�I�m�(R7J�0�@F���9����C�������ŗ�4�Pg�L���+-���tkK8qņɮ��m���>d�7
Jt/k�	��`kb!v@M]�$��A�>bSL���fZ��-��Rd����Y�|����5��⩘Vң^}��(L3�k���[6.ԅ��(�SG�3c�YAk�/N�&�i�<ȅ��fC��D�"_� S�������8����@Lمb�U<��ՕJ��O����L}��Tzńl �6V怋�&�	Y^a�/���u���U��=�VD?�(-��1oK�]Y{>p�YR��`��FQ<i��Y���BPi�֐_㾎�6��7��e�'p۠Z&x�S�x�������4v>�;�?�� ���NT7#�K��rCq��r�
,����*��Jc+����9�f��v!�J���le��!���s��@��,m�de��'��*�e+��A-L��a
Ɇ�aW�4���ĲT�>�Zà�f�G��I���iY[��>eR��P�.*e,��N&�^ Ƕ�ɋw"�g�%��k�;�=�:i�����Q�6�ND�U�6��ʹ��8���Z-<u���AH���)�D�Q�-�N*PU�\��f�nB��Ν�ל�)&H(�,�ʷĵ���&�O��0A��Z����?W���m�(���/
	�&�3��L����^�����"�J�}	��W��wItfnKxƧM5=m.�l����z�� ��1S �f�8O��*t��sx�:�
w`�~�zv#�d���W��,>i��6����N&`���We�	x>M��<q)����.���n
�}�{R/�K)�\y��J��n���m���)�%!�6n�&� 2Nr�| \����'�:��H�v��x{06K�"ae��n��iC���͂^��=d�Nt�PZ%����?���_�Bh�EA�-۾���袈U��0���$$�ͺ�9J%C��h����o�S���Ib؆�,��(-ᩔb���+��^u<����ř{��I}3�?�;ʂ�,�Y�����ѯ,J:^3H��#oBњf�������z���ȕ��|zC���fʿ�%�0����R�O�_� UT:�B��2�^�Rp!�����t�3	81����a}	\��N�)y���Ή�C��W��ِ�K��3�Fҿ��QJp��jOA<Y39�����V�{=�;�uC+f�Q0��IH��(RtsNT3e��:Ӳ�����}�t	�^e�C7�h(��=[W���2n�JT�!�F�4�Q�c��.�(��<�h
��r����a���͡
�yqa�[��2�������!qP��xK���Jc�m��w� sY6$%��83�h����O�	�}"�k
�H~ɣ`85>Y�Q`�1sr�t�2��RDDjZ�k`��tj2���$A*�pN��S�e�����ՍL��Ⱥ�*s�	���.�`T�͔�;m��}��H��aN����O>�\T
K"w%�c��c��,=�D�;�^��{�40gTR���\d�F y�C���;�6+XÉ�0��q�"�/)Ť�,��36؉Q�(NwN���+���yApy.��@���^ٮ���v�tŪ�$�L�^�ۗv9�w_�j��K#f�A�,w�Ne�Z~U��\���T_!yK��`6SW���W�Q���ylxe�2{�����2�U�c>�<A��W���5�`� Gժ���
��2)�dۍ~X��O���μx'�H_h��@��ov\�M�uU��Jw�qd�������i��C�g����I����|C����VGzJ�lm?�3��4E��%?�y�����D&�}^�4�j���
�J7m��{E��W�eTJ�Z��_�����'��x��[F�Vڶ�)L���N��'(���:�]2>��4ԑԽ�*+6c�KQ��'��Z���r�Q7Z�&'�
"e�}$�0D����K��{=`r�Ha��E�3fqu[�����#5�y0/bむ���V����]������� D����~�%;L��e�ku_'��f��	8�����⃷�"
M5s��/&��.	M�h���o���KO$��0>�w�D�fW�p\���7J��޷��N)��@vƩč������?pX��߃�&o���!�
�~����63�-n�����El��X��I�#���m�8��l��Vd���a�`$o�w���y��ֽW�y�$�����g>�Iwlտ=����K��d�o"����H胕vk������+ݺ~�1�Jy�ܠ�a������؋h����Eo�z`���DVI�e�=f�IRXf�`���R����{�w����B�AX�Fg��mq�L$\	ȧ|uЀ@�
��+��hv�D���ւo��j*ņ��U�@� l��8���Eս/E^������T�E���נ/�@
��q���	�m���L�f8�ZYW��a��������(����9!~|%2�bϚ���h ^->���ĻM�ҵ�fXG��}G�*�-��
3¨�W���M�?*]~:I6��Ę�{Aj'���/�ɵH�c�v�<��ŝ�
.UW���
 ��c����R){P�R�a=V��i+=�l����@Bm�N%~6[���n&�3���8���qJ�wi�{!�i�^�h�/�9�OW�.}V�a�$�[m�a*��u; �����ء���+,0��҇������\�7Ī"XX9�?`$�g&��P،�U�`]�M�j�����CE����4��d߭Z����G�]�f�0�"��<�R�������Z[�IQ�^CSre��h��
,��AQ���T��Õ��9���)�ֺ/��Z�ЯP�~u%V	m�Z/>_���¤|F���w4���~l�M�ɍ�j��h�f,57�s��n\&��h�����ݤ{i�����F���:S8�}5�&v�ڂ�WI���I�l-Ʌ�݆m���P�g�;<��- f�x�p\|G���.����E6����-��彛��/w��}i0W�M�s��^D__e�ӗ;�A
�H�5
}�B�L�����I+]�H����r妰�H*��{��=-��<�d�l�4�#�M�rj�A��+�5U�/{�h?v����;U6H�
Q��x�D.����Q�/N��8b�V�,w�%'T>V0�팕  %+�	��v +=�=��,����͑:!�:l*��AX!j��!�*D�'2��E��n(I>て5��1��42R��Ĭ�����j�����%���q,��כ�S�9��y�
0v�X�	���"ٲ��m�������#4�u�1��,V0 ����N�6*R���/����@�&�\~�Ӂ:!��3A��S�S$)��W��k`>�#�>�"{��O�u�${UBj ��Co��&�`?�I�Cm�ل�]�`��q�}�3��Ȝp���Ҿ�)u���g$�c]c�H�L��w&k��F�
ꖸs� O�dB�7d���LRp6���[�,Y�6�/4ת�z >�b��~��>�[�H`�{��r!C�C>�.��o��m����Taf�hS�/������Q�b�3B��єva�w����j�� -S�#�1�[��������I��n���4�+���L��}aF9:KB�3��t?Ol�3�zv�2�I�_Q �� �^�S�enB��N�Q�/6r��2~�4v��s͆�,\�&��sS��Ǘ��J_曰��5�G�/����YaJ�*V|f��~��U�\��YE3���"���Z/�����/�������K�\�R��;M\��q�0g���X�����ٓ}h��lۊ Rp�3rS���P���t]Ld��K|��Y+S��`����AÂ� �Cs<گ֐}��豍�+�}�	�̹Ig�����AO4d`Chxe
D�:	��O���:o�� �U�I� �?Ü�k[���?#O�M6��jﭼ�R�))���%��	6��-��� �_�D˱;�N�5;!�U�̴����+�hF{K��ٺ��!^�=I��p��c`�3牢�6Ny����&2JMxTf,����h���aU������|#���~�m�����Qz<Ox���q�s2����'2@��`�K?��1��Y%�;IT 9�Iw�Y�zp'�ˆ�C6�P�eD1����~��������Ь�]�Mg'yU�&�GU��K�� �5꿞?��Q$�1����>��Fv�r���!�> `K�qET
���4��zִ��3{I�5t�A�k��[a(��..������j��G�ݼ~_hx�|��˿^�Y�E���Хl�X�3��n�ݭ{~�*
��/�Pc�Ho.n�w�hm�����x��՘{`_�ѽ%]a�D$���S�i�����W���XOU��B�|L�wb�:w�A<<'���i%Fk����R%؟@у�Mx�5.���{�������mTM���׵ZZ^@����"~UN�Q��t���ö���~�d��\tTڇ��/ ��p���H��2�����"�tҥ�d�hDK�.b-�RrS���Z��L�k�w9��[�"qRFH���5*O�QY'u�U���,yI�����_Q���4"1<1���W���V���XùLy��=�C���M)�?�~��'�[D&V��e�D6��.y���-�uu߻Ņ�M����o���8l"쭽P�M�(^��ᳩ7���#30��ʋ�Y���J=&�����}�*ߩi5%����^�7t93�^�|���aO�V#�S� ЀN5j�J�K`'1�xws^Z?U�ܬ?(��S�B��.!yWJ|Y�b'4�`��7v���=����|���}���Ջx�oz�Ưph;<��&>պ-b�ca2؍��M�+���1[�H����c[�������sI��_���
����0��h�_H����#O����ɖʰҙ�w�ٖ`TA��pG�N�4�l�Ϋ�Av�Y��ν.��-�FI��!L�YE��W��d}}��h)�N�0Z&m�#�W��D��e\݌�fR�~�屹���W-�i��/�h���i�S`�`��8"<o�u4�/��
�ɄV�-X0R���pS�qe����<��=}�I�Pt�����o�῜!=�Zj`�VKs�>C
wK�<�C|���z�<O��R��zş�P�ϱ��K��5�?=�u�v�b`�4�p�_�~�{=֭LP�xx��,%�2�pgB��rp��
�n64�{s���,r����<��݉��SH����i�-�1N��4!�C����w� տ�٪�O����Y���/��n!�`�o,eQ��s�5G�x�ͷ����
�E�Ҟ�a�DN���-8���`2�M�x��jL�F��C�H�0e=���V��#���|XC��(����L���'�@j����µ��n����KA�42b�w`p/M�a�5�9�a>�O�u��i
(!���",�]X|b�7n��bO�d5�;�p
���Xuj ��Ȳ ���������ଙ,j忁��Qt ���*+��ICO�{���:N���7`>��04۶��
J
Z�т��ۤ� [�ͽ��ڢ�jQ�n��5ɤI��":���2&եF�������q\������zr�8$˱�q ��`����bD. jQYS+"gZ��P�)��ڮ��:��1��W��ܺ�m>�V�S��%ϗ�\�(���@��!8geGd�_Y5^Խ�edߐ��w�z=��M�I'�X��fu�b���ކ!����-�Br��v;y7t#�N�����W�&����r���Yȏo�D۫�P��)���t\�KLXB���PŒ�9�f���d
��'7�va|�N	��z��{��R>�n}�b��>p��&�,��xv���=X�(�T7����B�LRk���8L�9c��d �i][;�t�Ҋ@#�K� ߅�+�S>��0�I=>�k��������eƴ
�_�ntxk�b��<�o'or���g� ��_��ک��I�'�[VYN
�gR��_Al��'|����#�"Ϟxʟ�f!d���⳷׿��r�R"��,�w= >��z
R�R���+y���Т�������	eTe�'���؏�ٳ������C�/$9nE�X�3�!>��#`��FU.�m�4;���c
Q��%���7�Dޞ�7Bƙ��צ�t!��.��u�Q��jl#٩�U��CyA�Q��$P�W[K��&��<�~�1���'�,�r��/���)~wɿ0@�m���OB����1�3(�0����&" �VTd=��������`xV#�*��S�gv��o�@ZC^��zɮ\|�p`��녨F6,w�i�QUn��kDT�As;��Nt�{�3��5i�_�9qõ͂��nؗd_�س�gk>�9ؙ��	��ֿ$���/=��#� �=����&��	���X�B�Ld�"�"x�"{��{�#�� ��D����>p����os�]s�Ե����~<D:j�R��|t7ݞ)��-w�ŭEa#ruɶ��'ʆw.a� ;��+�����[y��h�p����*�6��xR�?p�.�T���-pX!?��<LB��K�-c��%�3�V�OZ>d�<4E �W�9�r^�q�B���'�ɀ�s� ���T����K_��$���q|�6�0r 7;�c��W'%G����4��Q_R��h [�A��`*�[u�1n���%���c[���_ �o�#�|����x��i�QNl�����C�)�#��<i%'��� ��s�2��h�E�]#��aLW_�Mq�����m�R�>��1��	�>d��᭠��;�1W��b0�	�?��T��.W4��}��ބ.n
�R��[���ycy�扡�9'e!�h���Y�A�2�:����.>�]�,}�^��)����W���+���&6Utx:�'w�c4sV�6�)�����t�NO�5�ez#U�^H��ھ���e�>C�(`���]�g��
��}}w��r�
��i���!��K�+z������X]E+���t5�g��|uQ��6���,�%���kOH�܈������)>\�V�
H8���]���M�'|^:
5=��N����>s�I�[� ~1$˗�!G����҅�����<��c �c�u�#�\'T���|�����Y��4i������Ņ��|��U~�)QP��ԧj�=���v<��7&�Y�M��>��=k���w
����V��Pz����*-}No^x���g2�B<L�)GGH�h[��)�h�(v�Z��z��Q��l���K��Q�P��/4�0�x#�-k�k/��ZK	*�z�JP�tR����i]��~�,)1w�gHЗ�?gj�!!�Z�gB}2��������3�g@f̿���/�MFe�\�e��l8&�g�!�Ι*�J"�R����ښ����M��"�b�r܆*�Ӻ+��I�p���mg	�������{��"��ow�<zO������F��=Ю�����b�[+1c���ԉ��F��������� Es�iX
&
}�� Nu�^�Ƽ���'J�{�-3N���[$�G���S{�"Qg�z*�mo_r[a[o���,o�K�}1�#2?J%�,Q��d���CR��m���Y�+x�n�X�{Qp��@"w*%�S�\oY��p���f�H�� ��P?n��u�B��gY��x��uP'����K<�,*0[?sAb�
m����ǘց�X�x�]l'Į��,��%L~�=�C� �P��S�|p���]z���F�	%kz�wmo���=��k�P��i�
������p(&q`;���T���'��dBQ��lz<���#�$�	��eV��#�؉�
sSL��fF�3-�\V�E��H�F�;�Z���N�`:b���	k��-yņ0X/�':��������z&��p]N����ߊ�p���<�+����b;�+��{C�݇[�l\��#��^��tyվ<0�bF)a���Cȱ ;,�j�r:1{)��`W�b����G��!��W˧R��<@�{����<SO�A�Mz/��8s5=�0O�+�v�:����K��7,��>���^O�;Wp�-�r��*Ų��?�%���gC�e�ضobN��yN�G��&�<��i2	�!��z�z'��v�Ɩ���e'9�iÐ!.
�{�/b�_�<��k�bF ��N�lG��oN&�&f�Fc�z�K5R�wM_ZGa��@��7Ό��ꕒ`��[���֌�&/-�-���y/�F���t`3?l����䅥����8�b�
w�����J���0ƌFh��02���Ҳ�N ��
@3M�1�*%Xq\�����Ĕ�\������h��D(����V�F����֝�a(��e�s��r�"��G.~�T.�)��%ucވ���
�xdt
 S������\�ԥ�34�ۭ�Q	Y�N��
s�d"��Ԕ���Wơ�)J P�n�����>)�>5e���bM�������:Jn���rB
�#zU�1Mx������I��z���O�˫ڬ;	�~wj�O��7{�£
��N�X3��]#�1�Y�-�S�Թ:~�	�5�x��#�v�=���p��;U~cEaC��f���X����Q�a'��4\.��a�~� ���3m9��C�ќ\�J-��둠$`����2�!�� L:��x����AZ1G5i`�'����¾e�
��u��+W�+ &�nSK���T+a8� ��P
|d:���9�c�h�V�3>���Vow؞�N�Ϸ�!^\1O��1(,�a���RP6��/o��E�Պoef҅�B��[��]|�Ry&�A<]�ef�j��Z��!�&8�'{�6��ks��b�J3`ζ���wnj�<smi�`�Q�o�Ie1
�[�H�YN�����e��A�S%i���d�ß����[��m���rT�CU�ԗ�ڙ��Y��}���������M����gyw'h��Z6#���9��+����i����|/���Z��5x��߻��&d{��@Z���^�gX�pWY�F��-6�j
�-x��HU��D̈́�t���o9���dZJ��D]��P0�XY�	��7�ۗ�>9�c�'GT"?�I:�~0X�;�W	��e?�ŜVrH
��)�'��m굆p��6�
Q����F�I�3ob�dt����49��S�u�W�e[{9y�8Qs�:�s����Ť`�߹V���y�!]q�.6Lz�j$I)���7�]�Y��Z���bÒ�
$��ߎK]�4`[S~/�R.8��3ݭ���y��a�����2�S�P$��V$����V�����|{��	^)!U���@|㱶7
�qt簂��9�\9�<�� �(����� ���{Vu]@]���/����2������,�f�
w�������ZeJX���%�
�9�`lgh%��i�����9[�ͷ�u6�"�c[9&����[�e�:�HC�/?�s�~��O���8��a�9<���L�G��&:�K�v���<iD�b��$#o��B
Y?kZvܗ`G]
����j��0�1Ɋ�}!�_O��o���@?�3����4;�#�8P�Z� ޜ���8CyX��E���L�@J�~dfi[��4<�n�
���j�6_%����%*&G�c�""���	)���[&c|�Pk�

˭1���Ͳ�a���N��n��Z/ ��͋��ZK5�ힳ�TUvx#�1(�G:#߄v�߯m��=|N�/�"z��n�_R�R�H�m޵B��#%+f�;%On��mD8����&	�u%�6 ��
c�!���]�����Jռ$�2����	�\�WCf
�UK��侀�4ї� +G�1���|=]����G�{\
Vc��]���ݒ��{�q촂߈�<�>pt

�	�$֐U�;�;)���[�����M����N�}�\=����x`����"HkUJex��qT�V�	�N�)�C)B�(Qn��~�?�H��!_�F�
k�����	����W��2c���qD��9RW!%Vy�Q%L��<Ns�b�c8�d0���i��+�����ÿ=l]�q�>s�rP��d������t�|��vy�<X"m��3avGA:2M�,�+�x8cM����w�
���99A=:�C��ɉΩ�����8�Į�G-,�~�o�Y�s��DQ�V�U+Y� �V��P��|ɘ߭L���=�^��苁�*?}�
��Ў�H��Ӽ��/\ݙ]��!US�dۤ�4�x����f����Q�n/�^Ք��NwI�\�J���$�k߫�����.�(�����:��r��Ct���_�ҀT&0�6yu�3AN�h1��?����d�>g՟:9�f_롞l���2��Y}.	�
�]Ҥ���&~}�wfK�Oc'*��C�ӱh���cg?Y��~{�N9ˤ�т���6�}{�n��R�QX��Ev�*����B�
�Eâ&�}��ci���O�g�h��1� ,��,g�Y���j_-J�snڪ=?i�����9�����I��+V����KYrl�<"0"�!**DC0T��`T�s#r��Ҩ����ع$W��V����H���5m*����Ln?�b��H(b|�TM]��.��/��`�~"�
I�љx��
��C���,�W~�x��
r��X�fc���,;-_c��*�b�6��\��r����ZT/FD�!(8�R]b���D���-]oJ���
  t['centmonospace'] = 0xFFE0;
  t['centoldstyle'] = 0xF7A2;
  t['centsuperior'] = 0xF6E0;
  t['chaarmenian'] = 0x0579;
  t['chabengali'] = 0x099B;
  t['chadeva'] = 0x091B;
  t['chagujarati'] = 0x0A9B;
  t['chagurmukhi'] = 0x0A1B;
  t['chbopomofo'] = 0x3114;
  t['cheabkhasiancyrillic'] = 0x04BD;
  t['checkmark'] = 0x2713;
  t['checyrillic'] = 0x0447;
  t['chedescenderabkhasiancyrillic'] = 0x04BF;
  t['chedescendercyrillic'] = 0x04B7;
  t['chedieresiscyrillic'] = 0x04F5;
  t['cheharmenian'] = 0x0573;
  t['chekhakassiancyrillic'] = 0x04CC;
  t['cheverticalstrokecyrillic'] = 0x04B9;
  t['chi'] = 0x03C7;
  t['chieuchacirclekorean'] = 0x3277;
  t['chieuchaparenkorean'] = 0x3217;
  t['chieuchcirclekorean'] = 0x3269;
  t['chieuchkorean'] = 0x314A;
  t['chieuchparenkorean'] = 0x3209;
  t['chochangthai'] = 0x0E0A;
  t['chochanthai'] = 0x0E08;
  t['chochingthai'] = 0x0E09;
  t['chochoethai'] = 0x0E0C;
  t['chook'] = 0x0188;
  t['cieucacirclekorean'] = 0x3276;
  t['cieucaparenkorean'] = 0x3216;
  t['cieuccirclekorean'] = 0x3268;
  t['cieuckorean'] = 0x3148;
  t['cieucparenkorean'] = 0x3208;
  t['cieucuparenkorean'] = 0x321C;
  t['circle'] = 0x25CB;
  t['circlecopyrt'] = 0x00A9; // Glyph is missing from Adobe's original list.
  t['circlemultiply'] = 0x2297;
  t['circleot'] = 0x2299;
  t['circleplus'] = 0x2295;
  t['circlepostalmark'] = 0x3036;
  t['circlewithlefthalfblack'] = 0x25D0;
  t['circlewithrighthalfblack'] = 0x25D1;
  t['circumflex'] = 0x02C6;
  t['circumflexbelowcmb'] = 0x032D;
  t['circumflexcmb'] = 0x0302;
  t['clear'] = 0x2327;
  t['clickalveolar'] = 0x01C2;
  t['clickdental'] = 0x01C0;
  t['clicklateral'] = 0x01C1;
  t['clickretroflex'] = 0x01C3;
  t['club'] = 0x2663;
  t['clubsuitblack'] = 0x2663;
  t['clubsuitwhite'] = 0x2667;
  t['cmcubedsquare'] = 0x33A4;
  t['cmonospace'] = 0xFF43;
  t['cmsquaredsquare'] = 0x33A0;
  t['coarmenian'] = 0x0581;
  t['colon'] = 0x003A;
  t['colonmonetary'] = 0x20A1;
  t['colonmonospace'] = 0xFF1A;
  t['colonsign'] = 0x20A1;
  t['colonsmall'] = 0xFE55;
  t['colontriangularhalfmod'] = 0x02D1;
  t['colontriangularmod'] = 0x02D0;
  t['comma'] = 0x002C;
  t['commaabovecmb'] = 0x0313;
  t['commaaboverightcmb'] = 0x0315;
  t['commaaccent'] = 0xF6C3;
  t['commaarabic'] = 0x060C;
  t['commaarmenian'] = 0x055D;
  t['commainferior'] = 0xF6E1;
  t['commamonospace'] = 0xFF0C;
  t['commareversedabovecmb'] = 0x0314;
  t['commareversedmod'] = 0x02BD;
  t['commasmall'] = 0xFE50;
  t['commasuperior'] = 0xF6E2;
  t['commaturnedabovecmb'] = 0x0312;
  t['commaturnedmod'] = 0x02BB;
  t['compass'] = 0x263C;
  t['congruent'] = 0x2245;
  t['contourintegral'] = 0x222E;
  t['control'] = 0x2303;
  t['controlACK'] = 0x0006;
  t['controlBEL'] = 0x0007;
  t['controlBS'] = 0x0008;
  t['controlCAN'] = 0x0018;
  t['controlCR'] = 0x000D;
  t['controlDC1'] = 0x0011;
  t['controlDC2'] = 0x0012;
  t['controlDC3'] = 0x0013;
  t['controlDC4'] = 0x0014;
  t['controlDEL'] = 0x007F;
  t['controlDLE'] = 0x0010;
  t['controlEM'] = 0x0019;
  t['controlENQ'] = 0x0005;
  t['controlEOT'] = 0x0004;
  t['controlESC'] = 0x001B;
  t['controlETB'] = 0x0017;
  t['controlETX'] = 0x0003;
  t['controlFF'] = 0x000C;
  t['controlFS'] = 0x001C;
  t['controlGS'] = 0x001D;
  t['controlHT'] = 0x0009;
  t['controlLF'] = 0x000A;
  t['controlNAK'] = 0x0015;
  t['controlRS'] = 0x001E;
  t['controlSI'] = 0x000F;
  t['controlSO'] = 0x000E;
  t['controlSOT'] = 0x0002;
  t['controlSTX'] = 0x0001;
  t['controlSUB'] = 0x001A;
  t['controlSYN'] = 0x0016;
  t['controlUS'] = 0x001F;
  t['controlVT'] = 0x000B;
  t['copyright'] = 0x00A9;
  t['copyrightsans'] = 0xF8E9;
  t['copyrightserif'] = 0xF6D9;
  t['cornerbracketleft'] = 0x300C;
  t['cornerbracketlefthalfwidth'] = 0xFF62;
  t['cornerbracketleftvertical'] = 0xFE41;
  t['cornerbracketright'] = 0x300D;
  t['cornerbracketrighthalfwidth'] = 0xFF63;
  t['cornerbracketrightvertical'] = 0xFE42;
  t['corporationsquare'] = 0x337F;
  t['cosquare'] = 0x33C7;
  t['coverkgsquare'] = 0x33C6;
  t['cparen'] = 0x249E;
  t['cruzeiro'] = 0x20A2;
  t['cstretched'] = 0x0297;
  t['curlyand'] = 0x22CF;
  t['curlyor'] = 0x22CE;
  t['currency'] = 0x00A4;
  t['cyrBreve'] = 0xF6D1;
  t['cyrFlex'] = 0xF6D2;
  t['cyrbreve'] = 0xF6D4;
  t['cyrflex'] = 0xF6D5;
  t['d'] = 0x0064;
  t['daarmenian'] = 0x0564;
  t['dabengali'] = 0x09A6;
  t['dadarabic'] = 0x0636;
  t['dadeva'] = 0x0926;
  t['dadfinalarabic'] = 0xFEBE;
  t['dadinitialarabic'] = 0xFEBF;
  t['dadmedialarabic'] = 0xFEC0;
  t['dagesh'] = 0x05BC;
  t['dageshhebrew'] = 0x05BC;
  t['dagger'] = 0x2020;
  t['daggerdbl'] = 0x2021;
  t['dagujarati'] = 0x0AA6;
  t['dagurmukhi'] = 0x0A26;
  t['dahiragana'] = 0x3060;
  t['dakatakana'] = 0x30C0;
  t['dalarabic'] = 0x062F;
  t['dalet'] = 0x05D3;
  t['daletdagesh'] = 0xFB33;
  t['daletdageshhebrew'] = 0xFB33;
  t['dalethebrew'] = 0x05D3;
  t['dalfinalarabic'] = 0xFEAA;
  t['dammaarabic'] = 0x064F;
  t['dammalowarabic'] = 0x064F;
  t['dammatanaltonearabic'] = 0x064C;
  t['dammatanarabic'] = 0x064C;
  t['danda'] = 0x0964;
  t['dargahebrew'] = 0x05A7;
  t['dargalefthebrew'] = 0x05A7;
  t['dasiapneumatacyrilliccmb'] = 0x0485;
  t['dblGrave'] = 0xF6D3;
  t['dblanglebracketleft'] = 0x300A;
  t['dblanglebracketleftvertical'] = 0xFE3D;
  t['dblanglebracketright'] = 0x300B;
  t['dblanglebracketrightvertical'] = 0xFE3E;
  t['dblarchinvertedbelowcmb'] = 0x032B;
  t['dblarrowleft'] = 0x21D4;
  t['dblarrowright'] = 0x21D2;
  t['dbldanda'] = 0x0965;
  t['dblgrave'] = 0xF6D6;
  t['dblgravecmb'] = 0x030F;
  t['dblintegral'] = 0x222C;
  t['dbllowline'] = 0x2017;
  t['dbllowlinecmb'] = 0x0333;
  t['dbloverlinecmb'] = 0x033F;
  t['dblprimemod'] = 0x02BA;
  t['dblverticalbar'] = 0x2016;
  t['dblverticallineabovecmb'] = 0x030E;
  t['dbopomofo'] = 0x3109;
  t['dbsquare'] = 0x33C8;
  t['dcaron'] = 0x010F;
  t['dcedilla'] = 0x1E11;
  t['dcircle'] = 0x24D3;
  t['dcircumflexbelow'] = 0x1E13;
  t['dcroat'] = 0x0111;
  t['ddabengali'] = 0x09A1;
  t['ddadeva'] = 0x0921;
  t['ddagujarati'] = 0x0AA1;
  t['ddagurmukhi'] = 0x0A21;
  t['ddalarabic'] = 0x0688;
  t['ddalfinalarabic'] = 0xFB89;
  t['dddhadeva'] = 0x095C;
  t['ddhabengali'] = 0x09A2;
  t['ddhadeva'] = 0x0922;
  t['ddhagujarati'] = 0x0AA2;
  t['ddhagurmukhi'] = 0x0A22;
  t['ddotaccent'] = 0x1E0B;
  t['ddotbelow'] = 0x1E0D;
  t['decimalseparatorarabic'] = 0x066B;
  t['decimalseparatorpersian'] = 0x066B;
  t['decyrillic'] = 0x0434;
  t['degree'] = 0x00B0;
  t['dehihebrew'] = 0x05AD;
  t['dehiragana'] = 0x3067;
  t['deicoptic'] = 0x03EF;
  t['dekatakana'] = 0x30C7;
  t['deleteleft'] = 0x232B;
  t['deleteright'] = 0x2326;
  t['delta'] = 0x03B4;
  t['deltaturned'] = 0x018D;
  t['denominatorminusonenumeratorbengali'] = 0x09F8;
  t['dezh'] = 0x02A4;
  t['dhabengali'] = 0x09A7;
  t['dhadeva'] = 0x0927;
  t['dhagujarati'] = 0x0AA7;
  t['dhagurmukhi'] = 0x0A27;
  t['dhook'] = 0x0257;
  t['dialytikatonos'] = 0x0385;
  t['dialytikatonoscmb'] = 0x0344;
  t['diamond'] = 0x2666;
  t['diamondsuitwhite'] = 0x2662;
  t['dieresis'] = 0x00A8;
  t['dieresisacute'] = 0xF6D7;
  t['dieresisbelowcmb'] = 0x0324;
  t['dieresiscmb'] = 0x0308;
  t['dieresisgrave'] = 0xF6D8;
  t['dieresistonos'] = 0x0385;
  t['dihiragana'] = 0x3062;
  t['dikatakana'] = 0x30C2;
  t['dittomark'] = 0x3003;
  t['divide'] = 0x00F7;
  t['divides'] = 0x2223;
  t['divisionslash'] = 0x2215;
  t['djecyrillic'] = 0x0452;
  t['dkshade'] = 0x2593;
  t['dlinebelow'] = 0x1E0F;
  t['dlsquare'] = 0x3397;
  t['dmacron'] = 0x0111;
  t['dmonospace'] = 0xFF44;
  t['dnblock'] = 0x2584;
  t['dochadathai'] = 0x0E0E;
  t['dodekthai'] = 0x0E14;
  t['dohiragana'] = 0x3069;
  t['dokatakana'] = 0x30C9;
  t['dollar'] = 0x0024;
  t['dollarinferior'] = 0xF6E3;
  t['dollarmonospace'] = 0xFF04;
  t['dollaroldstyle'] = 0xF724;
  t['dollarsmall'] = 0xFE69;
  t['dollarsuperior'] = 0xF6E4;
  t['dong'] = 0x20AB;
  t['dorusquare'] = 0x3326;
  t['dotaccent'] = 0x02D9;
  t['dotaccentcmb'] = 0x0307;
  t['dotbelowcmb'] = 0x0323;
  t['dotbelowcomb'] = 0x0323;
  t['dotkatakana'] = 0x30FB;
  t['dotlessi'] = 0x0131;
  t['dotlessj'] = 0xF6BE;
  t['dotlessjstrokehook'] = 0x0284;
  t['dotmath'] = 0x22C5;
  t['dottedcircle'] = 0x25CC;
  t['doubleyodpatah'] = 0xFB1F;
  t['doubleyodpatahhebrew'] = 0xFB1F;
  t['downtackbelowcmb'] = 0x031E;
  t['downtackmod'] = 0x02D5;
  t['dparen'] = 0x249F;
  t['dsuperior'] = 0xF6EB;
  t['dtail'] = 0x0256;
  t['dtopbar'] = 0x018C;
  t['duhiragana'] = 0x3065;
  t['dukatakana'] = 0x30C5;
  t['dz'] = 0x01F3;
  t['dzaltone'] = 0x02A3;
  t['dzcaron'] = 0x01C6;
  t['dzcurl'] = 0x02A5;
  t['dzeabkhasiancyrillic'] = 0x04E1;
  t['dzecyrillic'] = 0x0455;
  t['dzhecyrillic'] = 0x045F;
  t['e'] = 0x0065;
  t['eacute'] = 0x00E9;
  t['earth'] = 0x2641;
  t['ebengali'] = 0x098F;
  t['ebopomofo'] = 0x311C;
  t['ebreve'] = 0x0115;
  t['ecandradeva'] = 0x090D;
  t['ecandragujarati'] = 0x0A8D;
  t['ecandravowelsigndeva'] = 0x0945;
  t['ecandravowelsigngujarati'] = 0x0AC5;
  t['ecaron'] = 0x011B;
  t['ecedillabreve'] = 0x1E1D;
  t['echarmenian'] = 0x0565;
  t['echyiwnarmenian'] = 0x0587;
  t['ecircle'] = 0x24D4;
  t['ecircumflex'] = 0x00EA;
  t['ecircumflexacute'] = 0x1EBF;
  t['ecircumflexbelow'] = 0x1E19;
  t['ecircumflexdotbelow'] = 0x1EC7;
  t['ecircumflexgrave'] = 0x1EC1;
  t['ecircumflexhookabove'] = 0x1EC3;
  t['ecircumflextilde'] = 0x1EC5;
  t['ecyrillic'] = 0x0454;
  t['edblgrave'] = 0x0205;
  t['edeva'] = 0x090F;
  t['edieresis'] = 0x00EB;
  t['edot'] = 0x0117;
  t['edotaccent'] = 0x0117;
  t['edotbelow'] = 0x1EB9;
  t['eegurmukhi'] = 0x0A0F;
  t['eematragurmukhi'] = 0x0A47;
  t['efcyrillic'] = 0x0444;
  t['egrave'] = 0x00E8;
  t['egujarati'] = 0x0A8F;
  t['eharmenian'] = 0x0567;
  t['ehbopomofo'] = 0x311D;
  t['ehiragana'] = 0x3048;
  t['ehookabove'] = 0x1EBB;
  t['eibopomofo'] = 0x311F;
  t['eight'] = 0x0038;
  t['eightarabic'] = 0x0668;
  t['eightbengali'] = 0x09EE;
  t['eightcircle'] = 0x2467;
  t['eightcircleinversesansserif'] = 0x2791;
  t['eightdeva'] = 0x096E;
  t['eighteencircle'] = 0x2471;
  t['eighteenparen'] = 0x2485;
  t['eighteenperiod'] = 0x2499;
  t['eightgujarati'] = 0x0AEE;
  t['eightgurmukhi'] = 0x0A6E;
  t['eighthackarabic'] = 0x0668;
  t['eighthangzhou'] = 0x3028;
  t['eighthnotebeamed'] = 0x266B;
  t['eightideographicparen'] = 0x3227;
  t['eightinferior'] = 0x2088;
  t['eightmonospace'] = 0xFF18;
  t['eightoldstyle'] = 0xF738;
  t['eightparen'] = 0x247B;
  t['eightperiod'] = 0x248F;
  t['eightpersian'] = 0x06F8;
  t['eightroman'] = 0x2177;
  t['eightsuperior'] = 0x2078;
  t['eightthai'] = 0x0E58;
  t['einvertedbreve'] = 0x0207;
  t['eiotifiedcyrillic'] = 0x0465;
  t['ekatakana'] = 0x30A8;
  t['ekatakanahalfwidth'] = 0xFF74;
  t['ekonkargurmukhi'] = 0x0A74;
  t['ekorean'] = 0x3154;
  t['elcyrillic'] = 0x043B;
  t['element'] = 0x2208;
  t['elevencircle'] = 0x246A;
  t['elevenparen'] = 0x247E;
  t['elevenperiod'] = 0x2492;
  t['elevenroman'] = 0x217A;
  t['ellipsis'] = 0x2026;
  t['ellipsisvertical'] = 0x22EE;
  t['emacron'] = 0x0113;
  t['emacronacute'] = 0x1E17;
  t['emacrongrave'] = 0x1E15;
  t['emcyrillic'] = 0x043C;
  t['emdash'] = 0x2014;
  t['emdashvertical'] = 0xFE31;
  t['emonospace'] = 0xFF45;
  t['emphasismarkarmenian'] = 0x055B;
  t['emptyset'] = 0x2205;
  t['enbopomofo'] = 0x3123;
  t['encyrillic'] = 0x043D;
  t['endash'] = 0x2013;
  t['endashvertical'] = 0xFE32;
  t['endescendercyrillic'] = 0x04A3;
  t['eng'] = 0x014B;
  t['engbopomofo'] = 0x3125;
  t['enghecyrillic'] = 0x04A5;
  t['enhookcyrillic'] = 0x04C8;
  t['enspace'] = 0x2002;
  t['eogonek'] = 0x0119;
  t['eokorean'] = 0x3153;
  t['eopen'] = 0x025B;
  t['eopenclosed'] = 0x029A;
  t['eopenreversed'] = 0x025C;
  t['eopenreversedclosed'] = 0x025E;
  t['eopenreversedhook'] = 0x025D;
  t['eparen'] = 0x24A0;
  t['epsilon'] = 0x03B5;
  t['epsilontonos'] = 0x03AD;
  t['equal'] = 0x003D;
  t['equalmonospace'] = 0xFF1D;
  t['equalsmall'] = 0xFE66;
  t['equalsuperior'] = 0x207C;
  t['equivalence'] = 0x2261;
  t['erbopomofo'] = 0x3126;
  t['ercyrillic'] = 0x0440;
  t['ereversed'] = 0x0258;
  t['ereversedcyrillic'] = 0x044D;
  t['escyrillic'] = 0x0441;
  t['esdescendercyrillic'] = 0x04AB;
  t['esh'] = 0x0283;
  t['eshcurl'] = 0x0286;
  t['eshortdeva'] = 0x090E;
  t['eshortvowelsigndeva'] = 0x0946;
  t['eshreversedloop'] = 0x01AA;
  t['eshsquatreversed'] = 0x0285;
  t['esmallhiragana'] = 0x3047;
  t['esmallkatakana'] = 0x30A7;
  t['esmallkatakanahalfwidth'] = 0xFF6A;
  t['estimated'] = 0x212E;
  t['esuperior'] = 0xF6EC;
  t['eta'] = 0x03B7;
  t['etarmenian'] = 0x0568;
  t['etatonos'] = 0x03AE;
  t['eth'] = 0x00F0;
  t['etilde'] = 0x1EBD;
  t['etildebelow'] = 0x1E1B;
  t['etnahtafoukhhebrew'] = 0x0591;
  t['etnahtafoukhlefthebrew'] = 0x0591;
  t['etnahtahebrew'] = 0x0591;
  t['etnahtalefthebrew'] = 0x0591;
  t['eturned'] = 0x01DD;
  t['eukorean'] = 0x3161;
  t['euro'] = 0x20AC;
  t['evowelsignbengali'] = 0x09C7;
  t['evowelsigndeva'] = 0x0947;
  t['evowelsigngujarati'] = 0x0AC7;
  t['exclam'] = 0x0021;
  t['exclamarmenian'] = 0x055C;
  t['exclamdbl'] = 0x203C;
  t['exclamdown'] = 0x00A1;
  t['exclamdownsmall'] = 0xF7A1;
  t['exclammonospace'] = 0xFF01;
  t['exclamsmall'] = 0xF721;
  t['existential'] = 0x2203;
  t['ezh'] = 0x0292;
  t['ezhcaron'] = 0x01EF;
  t['ezhcurl'] = 0x0293;
  t['ezhreversed'] = 0x01B9;
  t['ezhtail'] = 0x01BA;
  t['f'] = 0x0066;
  t['fadeva'] = 0x095E;
  t['fagurmukhi'] = 0x0A5E;
  t['fahrenheit'] = 0x2109;
  t['fathaarabic'] = 0x064E;
  t['fathalowarabic'] = 0x064E;
  t['fathatanarabic'] = 0x064B;
  t['fbopomofo'] = 0x3108;
  t['fcircle'] = 0x24D5;
  t['fdotaccent'] = 0x1E1F;
  t['feharabic'] = 0x0641;
  t['feharmenian'] = 0x0586;
  t['fehfinalarabic'] = 0xFED2;
  t['fehinitialarabic'] = 0xFED3;
  t['fehmedialarabic'] = 0xFED4;
  t['feicoptic'] = 0x03E5;
  t['female'] = 0x2640;
  t['ff'] = 0xFB00;
  t['ffi'] = 0xFB03;
  t['ffl'] = 0xFB04;
  t['fi'] = 0xFB01;
  t['fifteencircle'] = 0x246E;
  t['fifteenparen'] = 0x2482;
  t['fifteenperiod'] = 0x2496;
  t['figuredash'] = 0x2012;
  t['filledbox'] = 0x25A0;
  t['filledrect'] = 0x25AC;
  t['finalkaf'] = 0x05DA;
  t['finalkafdagesh'] = 0xFB3A;
  t['finalkafdageshhebrew'] = 0xFB3A;
  t['finalkafhebrew'] = 0x05DA;
  t['finalmem'] = 0x05DD;
  t['finalmemhebrew'] = 0x05DD;
  t['finalnun'] = 0x05DF;
  t['finalnunhebrew'] = 0x05DF;
  t['finalpe'] = 0x05E3;
  t['finalpehebrew'] = 0x05E3;
  t['finaltsadi'] = 0x05E5;
  t['finaltsadihebrew'] = 0x05E5;
  t['firsttonechinese'] = 0x02C9;
  t['fisheye'] = 0x25C9;
  t['fitacyrillic'] = 0x0473;
  t['five'] = 0x0035;
  t['fivearabic'] = 0x0665;
  t['fivebengali'] = 0x09EB;
  t['fivecircle'] = 0x2464;
  t['fivecircleinversesansserif'] = 0x278E;
  t['fivedeva'] = 0x096B;
  t['fiveeighths'] = 0x215D;
  t['fivegujarati'] = 0x0AEB;
  t['fivegurmukhi'] = 0x0A6B;
  t['fivehackarabic'] = 0x0665;
  t['fivehangzhou'] = 0x3025;
  t['fiveideographicparen'] = 0x3224;
  t['fiveinferior'] = 0x2085;
  t['fivemonospace'] = 0xFF15;
  t['fiveoldstyle'] = 0xF735;
  t['fiveparen'] = 0x2478;
  t['fiveperiod'] = 0x248C;
  t['fivepersian'] = 0x06F5;
  t['fiveroman'] = 0x2174;
  t['fivesuperior'] = 0x2075;
  t['fivethai'] = 0x0E55;
  t['fl'] = 0xFB02;
  t['florin'] = 0x0192;
  t['fmonospace'] = 0xFF46;
  t['fmsquare'] = 0x3399;
  t['fofanthai'] = 0x0E1F;
  t['fofathai'] = 0x0E1D;
  t['fongmanthai'] = 0x0E4F;
  t['forall'] = 0x2200;
  t['four'] = 0x0034;
  t['fourarabic'] = 0x0664;
  t['fourbengali'] = 0x09EA;
  t['fourcircle'] = 0x2463;
  t['fourcircleinversesansserif'] = 0x278D;
  t['fourdeva'] = 0x096A;
  t['fourgujarati'] = 0x0AEA;
  t['fourgurmukhi'] = 0x0A6A;
  t['fourhackarabic'] = 0x0664;
  t['fourhangzhou'] = 0x3024;
  t['fourideographicparen'] = 0x3223;
  t['fourinferior'] = 0x2084;
  t['fourmonospace'] = 0xFF14;
  t['fournumeratorbengali'] = 0x09F7;
  t['fouroldstyle'] = 0xF734;
  t['fourparen'] = 0x2477;
  t['fourperiod'] = 0x248B;
  t['fourpersian'] = 0x06F4;
  t['fourroman'] = 0x2173;
  t['foursuperior'] = 0x2074;
  t['fourteencircle'] = 0x246D;
  t['fourteenparen'] = 0x2481;
  t['fourteenperiod'] = 0x2495;
  t['fourthai'] = 0x0E54;
  t['fourthtonechinese'] = 0x02CB;
  t['fparen'] = 0x24A1;
  t['fraction'] = 0x2044;
  t['franc'] = 0x20A3;
  t['g'] = 0x0067;
  t['gabengali'] = 0x0997;
  t['gacute'] = 0x01F5;
  t['gadeva'] = 0x0917;
  t['gafarabic'] = 0x06AF;
  t['gaffinalarabic'] = 0xFB93;
  t['gafinitialarabic'] = 0xFB94;
  t['gafmedialarabic'] = 0xFB95;
  t['gagujarati'] = 0x0A97;
  t['gagurmukhi'] = 0x0A17;
  t['gahiragana'] = 0x304C;
  t['gakatakana'] = 0x30AC;
  t['gamma'] = 0x03B3;
  t['gammalatinsmall'] = 0x0263;
  t['gammasuperior'] = 0x02E0;
  t['gangiacoptic'] = 0x03EB;
  t['gbopomofo'] = 0x310D;
  t['gbreve'] = 0x011F;
  t['gcaron'] = 0x01E7;
  t['gcedilla'] = 0x0123;
  t['gcircle'] = 0x24D6;
  t['gcircumflex'] = 0x011D;
  t['gcommaaccent'] = 0x0123;
  t['gdot'] = 0x0121;
  t['gdotaccent'] = 0x0121;
  t['gecyrillic'] = 0x0433;
  t['gehiragana'] = 0x3052;
  t['gekatakana'] = 0x30B2;
  t['geometricallyequal'] = 0x2251;
  t['gereshaccenthebrew'] = 0x059C;
  t['gereshhebrew'] = 0x05F3;
  t['gereshmuqdamhebrew'] = 0x059D;
  t['germandbls'] = 0x00DF;
  t['gershayimaccenthebrew'] = 0x059E;
  t['gershayimhebrew'] = 0x05F4;
  t['getamark'] = 0x3013;
  t['ghabengali'] = 0x0998;
  t['ghadarmenian'] = 0x0572;
  t['ghadeva'] = 0x0918;
  t['ghagujarati'] = 0x0A98;
  t['ghagurmukhi'] = 0x0A18;
  t['ghainarabic'] = 0x063A;
  t['ghainfinalarabic'] = 0xFECE;
  t['ghaininitialarabic'] = 0xFECF;
  t['ghainmedialarabic'] = 0xFED0;
  t['ghemiddlehookcyrillic'] = 0x0495;
  t['ghestrokecyrillic'] = 0x0493;
  t['gheupturncyrillic'] = 0x0491;
  t['ghhadeva'] = 0x095A;
  t['ghhagurmukhi'] = 0x0A5A;
  t['ghook'] = 0x0260;
  t['ghzsquare'] = 0x3393;
  t['gihiragana'] = 0x304E;
  t['gikatakana'] = 0x30AE;
  t['gimarmenian'] = 0x0563;
  t['gimel'] = 0x05D2;
  t['gimeldagesh'] = 0xFB32;
  t['gimeldageshhebrew'] = 0xFB32;
  t['gimelhebrew'] = 0x05D2;
  t['gjecyrillic'] = 0x0453;
  t['glottalinvertedstroke'] = 0x01BE;
  t['glottalstop'] = 0x0294;
  t['glottalstopinverted'] = 0x0296;
  t['glottalstopmod'] = 0x02C0;
  t['glottalstopreversed'] = 0x0295;
  t['glottalstopreversedmod'] = 0x02C1;
  t['glottalstopreversedsuperior'] = 0x02E4;
  t['glottalstopstroke'] = 0x02A1;
  t['glottalstopstrokereversed'] = 0x02A2;
  t['gmacron'] = 0x1E21;
  t['gmonospace'] = 0xFF47;
  t['gohiragana'] = 0x3054;
  t['gokatakana'] = 0x30B4;
  t['gparen'] = 0x24A2;
  t['gpasquare'] = 0x33AC;
  t['gradient'] = 0x2207;
  t['grave'] = 0x0060;
  t['gravebelowcmb'] = 0x0316;
  t['gravecmb'] = 0x0300;
  t['gravecomb'] = 0x0300;
  t['gravedeva'] = 0x0953;
  t['gravelowmod'] = 0x02CE;
  t['gravemonospace'] = 0xFF40;
  t['gravetonecmb'] = 0x0340;
  t['greater'] = 0x003E;
  t['greaterequal'] = 0x2265;
  t['greaterequalorless'] = 0x22DB;
  t['greatermonospace'] = 0xFF1E;
  t['greaterorequivalent'] = 0x2273;
  t['greaterorless'] = 0x2277;
  t['greateroverequal'] = 0x2267;
  t['greatersmall'] = 0xFE65;
  t['gscript'] = 0x0261;
  t['gstroke'] = 0x01E5;
  t['guhiragana'] = 0x3050;
  t['guillemotleft'] = 0x00AB;
  t['guillemotright'] = 0x00BB;
  t['guilsinglleft'] = 0x2039;
  t['guilsinglright'] = 0x203A;
  t['gukatakana'] = 0x30B0;
  t['guramusquare'] = 0x3318;
  t['gysquare'] = 0x33C9;
  t['h'] = 0x0068;
  t['haabkhasiancyrillic'] = 0x04A9;
  t['haaltonearabic'] = 0x06C1;
  t['habengali'] = 0x09B9;
  t['hadescendercyrillic'] = 0x04B3;
  t['hadeva'] = 0x0939;
  t['hagujarati'] = 0x0AB9;
  t['hagurmukhi'] = 0x0A39;
  t['haharabic'] = 0x062D;
  t['hahfinalarabic'] = 0xFEA2;
  t['hahinitialarabic'] = 0xFEA3;
  t['hahiragana'] = 0x306F;
  t['hahmedialarabic'] = 0xFEA4;
  t['haitusquare'] = 0x332A;
  t['hakatakana'] = 0x30CF;
  t['hakatakanahalfwidth'] = 0xFF8A;
  t['halantgurmukhi'] = 0x0A4D;
  t['hamzaarabic'] = 0x0621;
  t['hamzalowarabic'] = 0x0621;
  t['hangulfiller'] = 0x3164;
  t['hardsigncyrillic'] = 0x044A;
  t['harpoonleftbarbup'] = 0x21BC;
  t['harpoonrightbarbup'] = 0x21C0;
  t['hasquare'] = 0x33CA;
  t['hatafpatah'] = 0x05B2;
  t['hatafpatah16'] = 0x05B2;
  t['hatafpatah23'] = 0x05B2;
  t['hatafpatah2f'] = 0x05B2;
  t['hatafpatahhebrew'] = 0x05B2;
  t['hatafpatahnarrowhebrew'] = 0x05B2;
  t['hatafpatahquarterhebrew'] = 0x05B2;
  t['hatafpatahwidehebrew'] = 0x05B2;
  t['hatafqamats'] = 0x05B3;
  t['hatafqamats1b'] = 0x05B3;
  t['hatafqamats28'] = 0x05B3;
  t['hatafqamats34'] = 0x05B3;
  t['hatafqamatshebrew'] = 0x05B3;
  t['hatafqamatsnarrowhebrew'] = 0x05B3;
  t['hatafqamatsquarterhebrew'] = 0x05B3;
  t['hatafqamatswidehebrew'] = 0x05B3;
  t['hatafsegol'] = 0x05B1;
  t['hatafsegol17'] = 0x05B1;
  t['hatafsegol24'] = 0x05B1;
  t['hatafsegol30'] = 0x05B1;
  t['hatafsegolhebrew'] = 0x05B1;
  t['hatafsegolnarrowhebrew'] = 0x05B1;
  t['hatafsegolquarterhebrew'] = 0x05B1;
  t['hatafsegolwidehebrew'] = 0x05B1;
  t['hbar'] = 0x0127;
  t['hbopomofo'] = 0x310F;
  t['hbrevebelow'] = 0x1E2B;
  t['hcedilla'] = 0x1E29;
  t['hcircle'] = 0x24D7;
  t['hcircumflex'] = 0x0125;
  t['hdieresis'] = 0x1E27;
  t['hdotaccent'] = 0x1E23;
  t['hdotbelow'] = 0x1E25;
  t['he'] = 0x05D4;
  t['heart'] = 0x2665;
  t['heartsuitblack'] = 0x2665;
  t['heartsuitwhite'] = 0x2661;
  t['hedagesh'] = 0xFB34;
  t['hedageshhebrew'] = 0xFB34;
  t['hehaltonearabic'] = 0x06C1;
  t['heharabic'] = 0x0647;
  t['hehebrew'] = 0x05D4;
  t['hehfinalaltonearabic'] = 0xFBA7;
  t['hehfinalalttwoarabic'] = 0xFEEA;
  t['hehfinalarabic'] = 0xFEEA;
  t['hehhamzaabovefinalarabic'] = 0xFBA5;
  t['hehhamzaaboveisolatedarabic'] = 0xFBA4;
  t['hehinitialaltonearabic'] = 0xFBA8;
  t['hehinitialarabic'] = 0xFEEB;
  t['hehiragana'] = 0x3078;
  t['hehmedialaltonearabic'] = 0xFBA9;
  t['hehmedialarabic'] = 0xFEEC;
  t['heiseierasquare'] = 0x337B;
  t['hekatakana'] = 0x30D8;
  t['hekatakanahalfwidth'] = 0xFF8D;
  t['hekutaarusquare'] = 0x3336;
  t['henghook'] = 0x0267;
  t['herutusquare'] = 0x3339;
  t['het'] = 0x05D7;
  t['hethebrew'] = 0x05D7;
  t['hhook'] = 0x0266;
  t['hhooksuperior'] = 0x02B1;
  t['hieuhacirclekorean'] = 0x327B;
  t['hieuhaparenkorean'] = 0x321B;
  t['hieuhcirclekorean'] = 0x326D;
  t['hieuhkorean'] = 0x314E;
  t['hieuhparenkorean'] = 0x320D;
  t['hihiragana'] = 0x3072;
  t['hikatakana'] = 0x30D2;
  t['hikatakanahalfwidth'] = 0xFF8B;
  t['hiriq'] = 0x05B4;
  t['hiriq14'] = 0x05B4;
  t['hiriq21'] = 0x05B4;
  t['hiriq2d'] = 0x05B4;
  t['hiriqhebrew'] = 0x05B4;
  t['hiriqnarrowhebrew'] = 0x05B4;
  t['hiriqquarterhebrew'] = 0x05B4;
  t['hiriqwidehebrew'] = 0x05B4;
  t['hlinebelow'] = 0x1E96;
  t['hmonospace'] = 0xFF48;
  t['hoarmenian'] = 0x0570;
  t['hohipthai'] = 0x0E2B;
  t['hohiragana'] = 0x307B;
  t['hokatakana'] = 0x30DB;
  t['hokatakanahalfwidth'] = 0xFF8E;
  t['holam'] = 0x05B9;
  t['holam19'] = 0x05B9;
  t['holam26'] = 0x05B9;
  t['holam32'] = 0x05B9;
  t['holamhebrew'] = 0x05B9;
  t['holamnarrowhebrew'] = 0x05B9;
  t['holamquarterhebrew'] = 0x05B9;
  t['holamwidehebrew'] = 0x05B9;
  t['honokhukthai'] = 0x0E2E;
  t['hookabovecomb'] = 0x0309;
  t['hookcmb'] = 0x0309;
  t['hookpalatalizedbelowcmb'] = 0x0321;
  t['hookretroflexbelowcmb'] = 0x0322;
  t['hoonsquare'] = 0x3342;
  t['horicoptic'] = 0x03E9;
  t['horizontalbar'] = 0x2015;
  t['horncmb'] = 0x031B;
  t['hotsprings'] = 0x2668;
  t['house'] = 0x2302;
  t['hparen'] = 0x24A3;
  t['hsuperior'] = 0x02B0;
  t['hturned'] = 0x0265;
  t['huhiragana'] = 0x3075;
  t['huiitosquare'] = 0x3333;
  t['hukatakana'] = 0x30D5;
  t['hukatakanahalfwidth'] = 0xFF8C;
  t['hungarumlaut'] = 0x02DD;
  t['hungarumlautcmb'] = 0x030B;
  t['hv'] = 0x0195;
  t['hyphen'] = 0x002D;
  t['hypheninferior'] = 0xF6E5;
  t['hyphenmonospace'] = 0xFF0D;
  t['hyphensmall'] = 0xFE63;
  t['hyphensuperior'] = 0xF6E6;
  t['hyphentwo'] = 0x2010;
  t['i'] = 0x0069;
  t['iacute'] = 0x00ED;
  t['iacyrillic'] = 0x044F;
  t['ibengali'] = 0x0987;
  t['ibopomofo'] = 0x3127;
  t['ibreve'] = 0x012D;
  t['icaron'] = 0x01D0;
  t['icircle'] = 0x24D8;
  t['icircumflex'] = 0x00EE;
  t['icyrillic'] = 0x0456;
  t['idblgrave'] = 0x0209;
  t['ideographearthcircle'] = 0x328F;
  t['ideographfirecircle'] = 0x328B;
  t['ideographicallianceparen'] = 0x323F;
  t['ideographiccallparen'] = 0x323A;
  t['ideographiccentrecircle'] = 0x32A5;
  t['ideographicclose'] = 0x3006;
  t['ideographiccomma'] = 0x3001;
  t['ideographiccommaleft'] = 0xFF64;
  t['ideographiccongratulationparen'] = 0x3237;
  t['ideographiccorrectcircle'] = 0x32A3;
  t['ideographicearthparen'] = 0x322F;
  t['ideographicenterpriseparen'] = 0x323D;
  t['ideographicexcellentcircle'] = 0x329D;
  t['ideographicfestivalparen'] = 0x3240;
  t['ideographicfinancialcircle'] = 0x3296;
  t['ideographicfinancialparen'] = 0x3236;
  t['ideographicfireparen'] = 0x322B;
  t['ideographichaveparen'] = 0x3232;
  t['ideographichighcircle'] = 0x32A4;
  t['ideographiciterationmark'] = 0x3005;
  t['ideographiclaborcircle'] = 0x3298;
  t['ideographiclaborparen'] = 0x3238;
  t['ideographicleftcircle'] = 0x32A7;
  t['ideographiclowcircle'] = 0x32A6;
  t['ideographicmedicinecircle'] = 0x32A9;
  t['ideographicmetalparen'] = 0x322E;
  t['ideographicmoonparen'] = 0x322A;
  t['ideographicnameparen'] = 0x3234;
  t['ideographicperiod'] = 0x3002;
  t['ideographicprintcircle'] = 0x329E;
  t['ideographicreachparen'] = 0x3243;
  t['ideographicrepresentparen'] = 0x3239;
  t['ideographicresourceparen'] = 0x323E;
  t['ideographicrightcircle'] = 0x32A8;
  t['ideographicsecretcircle'] = 0x3299;
  t['ideographicselfparen'] = 0x3242;
  t['ideographicsocietyparen'] = 0x3233;
  t['ideographicspace'] = 0x3000;
  t['ideographicspecialparen'] = 0x3235;
  t['ideographicstockparen'] = 0x3231;
  t['ideographicstudyparen'] = 0x323B;
  t['ideographicsunparen'] = 0x3230;
  t['ideographicsuperviseparen'] = 0x323C;
  t['ideographicwaterparen'] = 0x322C;
  t['ideographicwoodparen'] = 0x322D;
  t['ideographiczero'] = 0x3007;
  t['ideographmetalcircle'] = 0x328E;
  t['ideographmooncircle'] = 0x328A;
  t['ideographnamecircle'] = 0x3294;
  t['ideographsuncircle'] = 0x3290;
  t['ideographwatercircle'] = 0x328C;
  t['ideographwoodcircle'] = 0x328D;
  t['ideva'] = 0x0907;
  t['idieresis'] = 0x00EF;
  t['idieresisacute'] = 0x1E2F;
  t['idieresiscyrillic'] = 0x04E5;
  t['idotbelow'] = 0x1ECB;
  t['iebrevecyrillic'] = 0x04D7;
  t['iecyrillic'] = 0x0435;
  t['ieungacirclekorean'] = 0x3275;
  t['ieungaparenkorean'] = 0x3215;
  t['ieungcirclekorean'] = 0x3267;
  t['ieungkorean'] = 0x3147;
  t['ieungparenkorean'] = 0x3207;
  t['igrave'] = 0x00EC;
  t['igujarati'] = 0x0A87;
  t['igurmukhi'] = 0x0A07;
  t['ihiragana'] = 0x3044;
  t['ihookabove'] = 0x1EC9;
  t['iibengali'] = 0x0988;
  t['iicyrillic'] = 0x0438;
  t['iideva'] = 0x0908;
  t['iigujarati'] = 0x0A88;
  t['iigurmukhi'] = 0x0A08;
  t['iimatragurmukhi'] = 0x0A40;
  t['iinvertedbreve'] = 0x020B;
  t['iishortcyrillic'] = 0x0439;
  t['iivowelsignbengali'] = 0x09C0;
  t['iivowelsigndeva'] = 0x0940;
  t['iivowelsigngujarati'] = 0x0AC0;
  t['ij'] = 0x0133;
  t['ikatakana'] = 0x30A4;
  t['ikatakanahalfwidth'] = 0xFF72;
  t['ikorean'] = 0x3163;
  t['ilde'] = 0x02DC;
  t['iluyhebrew'] = 0x05AC;
  t['imacron'] = 0x012B;
  t['imacroncyrillic'] = 0x04E3;
  t['imageorapproximatelyequal'] = 0x2253;
  t['imatragurmukhi'] = 0x0A3F;
  t['imonospace'] = 0xFF49;
  t['increment'] = 0x2206;
  t['infinity'] = 0x221E;
  t['iniarmenian'] = 0x056B;
  t['integral'] = 0x222B;
  t['integralbottom'] = 0x2321;
  t['integralbt'] = 0x2321;
  t['integralex'] = 0xF8F5;
  t['integraltop'] = 0x2320;
  t['integraltp'] = 0x2320;
  t['intersection'] = 0x2229;
  t['intisquare'] = 0x3305;
  t['invbullet'] = 0x25D8;
  t['invcircle'] = 0x25D9;
  t['invsmileface'] = 0x263B;
  t['iocyrillic'] = 0x0451;
  t['iogonek'] = 0x012F;
  t['iota'] = 0x03B9;
  t['iotadieresis'] = 0x03CA;
  t['iotadieresistonos'] = 0x0390;
  t['iotalatin'] = 0x0269;
  t['iotatonos'] = 0x03AF;
  t['iparen'] = 0x24A4;
  t['irigurmukhi'] = 0x0A72;
  t['ismallhiragana'] = 0x3043;
  t['ismallkatakana'] = 0x30A3;
  t['ismallkatakanahalfwidth'] = 0xFF68;
  t['issharbengali'] = 0x09FA;
  t['istroke'] = 0x0268;
  t['isuperior'] = 0xF6ED;
  t['iterationhiragana'] = 0x309D;
  t['iterationkatakana'] = 0x30FD;
  t['itilde'] = 0x0129;
  t['itildebelow'] = 0x1E2D;
  t['iubopomofo'] = 0x3129;
  t['iucyrillic'] = 0x044E;
  t['ivowelsignbengali'] = 0x09BF;
  t['ivowelsigndeva'] = 0x093F;
  t['ivowelsigngujarati'] = 0x0ABF;
  t['izhitsacyrillic'] = 0x0475;
  t['izhitsadblgravecyrillic'] = 0x0477;
  t['j'] = 0x006A;
  t['jaarmenian'] = 0x0571;
  t['jabengali'] = 0x099C;
  t['jadeva'] = 0x091C;
  t['jagujarati'] = 0x0A9C;
  t['jagurmukhi'] = 0x0A1C;
  t['jbopomofo'] = 0x3110;
  t['jcaron'] = 0x01F0;
  t['jcircle'] = 0x24D9;
  t['jcircumflex'] = 0x0135;
  t['jcrossedtail'] = 0x029D;
  t['jdotlessstroke'] = 0x025F;
  t['jecyrillic'] = 0x0458;
  t['jeemarabic'] = 0x062C;
  t['jeemfinalarabic'] = 0xFE9E;
  t['jeeminitialarabic'] = 0xFE9F;
  t['jeemmedialarabic'] = 0xFEA0;
  t['jeharabic'] = 0x0698;
  t['jehfinalarabic'] = 0xFB8B;
  t['jhabengali'] = 0x099D;
  t['jhadeva'] = 0x091D;
  t['jhagujarati'] = 0x0A9D;
  t['jhagurmukhi'] = 0x0A1D;
  t['jheharmenian'] = 0x057B;
  t['jis'] = 0x3004;
  t['jmonospace'] = 0xFF4A;
  t['jparen'] = 0x24A5;
  t['jsuperior'] = 0x02B2;
  t['k'] = 0x006B;
  t['kabashkircyrillic'] = 0x04A1;
  t['kabengali'] = 0x0995;
  t['kacute'] = 0x1E31;
  t['kacyrillic'] = 0x043A;
  t['kadescendercyrillic'] = 0x049B;
  t['kadeva'] = 0x0915;
  t['kaf'] = 0x05DB;
  t['kafarabic'] = 0x0643;
  t['kafdagesh'] = 0xFB3B;
  t['kafdageshhebrew'] = 0xFB3B;
  t['kaffinalarabic'] = 0xFEDA;
  t['kafhebrew'] = 0x05DB;
  t['kafinitialarabic'] = 0xFEDB;
  t['kafmedialarabic'] = 0xFEDC;
  t['kafrafehebrew'] = 0xFB4D;
  t['kagujarati'] = 0x0A95;
  t['kagurmukhi'] = 0x0A15;
  t['kahiragana'] = 0x304B;
  t['kahookcyrillic'] = 0x04C4;
  t['kakatakana'] = 0x30AB;
  t['kakatakanahalfwidth'] = 0xFF76;
  t['kappa'] = 0x03BA;
  t['kappasymbolgreek'] = 0x03F0;
  t['kapyeounmieumkorean'] = 0x3171;
  t['kapyeounphieuphkorean'] = 0x3184;
  t['kapyeounpieupkorean'] = 0x3178;
  t['kapyeounssangpieupkorean'] = 0x3179;
  t['karoriisquare'] = 0x330D;
  t['kashidaautoarabic'] = 0x0640;
  t['kashidaautonosidebearingarabic'] = 0x0640;
  t['kasmallkatakana'] = 0x30F5;
  t['kasquare'] = 0x3384;
  t['kasraarabic'] = 0x0650;
  t['kasratanarabic'] = 0x064D;
  t['kastrokecyrillic'] = 0x049F;
  t['katahiraprolongmarkhalfwidth'] = 0xFF70;
  t['kaverticalstrokecyrillic'] = 0x049D;
  t['kbopomofo'] = 0x310E;
  t['kcalsquare'] = 0x3389;
  t['kcaron'] = 0x01E9;
  t['kcedilla'] = 0x0137;
  t['kcircle'] = 0x24DA;
  t['kcommaaccent'] = 0x0137;
  t['kdotbelow'] = 0x1E33;
  t['keharmenian'] = 0x0584;
  t['kehiragana'] = 0x3051;
  t['kekatakana'] = 0x30B1;
  t['kekatakanahalfwidth'] = 0xFF79;
  t['kenarmenian'] = 0x056F;
  t['kesmallkatakana'] = 0x30F6;
  t['kgreenlandic'] = 0x0138;
  t['khabengali'] = 0x0996;
  t['khacyrillic'] = 0x0445;
  t['khadeva'] = 0x0916;
  t['khagujarati'] = 0x0A96;
  t['khagurmukhi'] = 0x0A16;
  t['khaharabic'] = 0x062E;
  t['khahfinalarabic'] = 0xFEA6;
  t['khahinitialarabic'] = 0xFEA7;
  t['khahmedialarabic'] = 0xFEA8;
  t['kheicoptic'] = 0x03E7;
  t['khhadeva'] = 0x0959;
  t['khhagurmukhi'] = 0x0A59;
  t['khieukhacirclekorean'] = 0x3278;
  t['khieukhaparenkorean'] = 0x3218;
  t['khieukhcirclekorean'] = 0x326A;
  t['khieukhkorean'] = 0x314B;
  t['khieukhparenkorean'] = 0x320A;
  t['khokhaithai'] = 0x0E02;
  t['khokhonthai'] = 0x0E05;
  t['khokhuatthai'] = 0x0E03;
  t['khokhwaithai'] = 0x0E04;
  t['khomutthai'] = 0x0E5B;
  t['khook'] = 0x0199;
  t['khorakhangthai'] = 0x0E06;
  t['khzsquare'] = 0x3391;
  t['kihiragana'] = 0x304D;
  t['kikatakana'] = 0x30AD;
  t['kikatakanahalfwidth'] = 0xFF77;
  t['kiroguramusquare'] = 0x3315;
  t['kiromeetorusquare'] = 0x3316;
  t['kirosquare'] = 0x3314;
  t['kiyeokacirclekorean'] = 0x326E;
  t['kiyeokaparenkorean'] = 0x320E;
  t['kiyeokcirclekorean'] = 0x3260;
  t['kiyeokkorean'] = 0x3131;
  t['kiyeokparenkorean'] = 0x3200;
  t['kiyeoksioskorean'] = 0x3133;
  t['kjecyrillic'] = 0x045C;
  t['klinebelow'] = 0x1E35;
  t['klsquare'] = 0x3398;
  t['kmcubedsquare'] = 0x33A6;
  t['kmonospace'] = 0xFF4B;
  t['kmsquaredsquare'] = 0x33A2;
  t['kohiragana'] = 0x3053;
  t['kohmsquare'] = 0x33C0;
  t['kokaithai'] = 0x0E01;
  t['kokatakana'] = 0x30B3;
  t['kokatakanahalfwidth'] = 0xFF7A;
  t['kooposquare'] = 0x331E;
  t['koppacyrillic'] = 0x0481;
  t['koreanstandardsymbol'] = 0x327F;
  t['koroniscmb'] = 0x0343;
  t['kparen'] = 0x24A6;
  t['kpasquare'] = 0x33AA;
  t['ksicyrillic'] = 0x046F;
  t['ktsquare'] = 0x33CF;
  t['kturned'] = 0x029E;
  t['kuhiragana'] = 0x304F;
  t['kukatakana'] = 0x30AF;
  t['kukatakanahalfwidth'] = 0xFF78;
  t['kvsquare'] = 0x33B8;
  t['kwsquare'] = 0x33BE;
  t['l'] = 0x006C;
  t['labengali'] = 0x09B2;
  t['lacute'] = 0x013A;
  t['ladeva'] = 0x0932;
  t['lagujarati'] = 0x0AB2;
  t['lagurmukhi'] = 0x0A32;
  t['lakkhangyaothai'] = 0x0E45;
  t['lamaleffinalarabic'] = 0xFEFC;
  t['lamalefhamzaabovefinalarabic'] = 0xFEF8;
  t['lamalefhamzaaboveisolatedarabic'] = 0xFEF7;
  t['lamalefhamzabelowfinalarabic'] = 0xFEFA;
  t['lamalefhamzabelowisolatedarabic'] = 0xFEF9;
  t['lamalefisolatedarabic'] = 0xFEFB;
  t['lamalefmaddaabovefinalarabic'] = 0xFEF6;
  t['lamalefmaddaaboveisolatedarabic'] = 0xFEF5;
  t['lamarabic'] = 0x0644;
  t['lambda'] = 0x03BB;
  t['lambdastroke'] = 0x019B;
  t['lamed'] = 0x05DC;
  t['lameddagesh'] = 0xFB3C;
  t['lameddageshhebrew'] = 0xFB3C;
  t['lamedhebrew'] = 0x05DC;
  t['lamfinalarabic'] = 0xFEDE;
  t['lamhahinitialarabic'] = 0xFCCA;
  t['laminitialarabic'] = 0xFEDF;
  t['lamjeeminitialarabic'] = 0xFCC9;
  t['lamkhahinitialarabic'] = 0xFCCB;
  t['lamlamhehisolatedarabic'] = 0xFDF2;
  t['lammedialarabic'] = 0xFEE0;
  t['lammeemhahinitialarabic'] = 0xFD88;
  t['lammeeminitialarabic'] = 0xFCCC;
  t['largecircle'] = 0x25EF;
  t['lbar'] = 0x019A;
  t['lbelt'] = 0x026C;
  t['lbopomofo'] = 0x310C;
  t['lcaron'] = 0x013E;
  t['lcedilla'] = 0x013C;
  t['lcircle'] = 0x24DB;
  t['lcircumflexbelow'] = 0x1E3D;
  t['lcommaaccent'] = 0x013C;
  t['ldot'] = 0x0140;
  t['ldotaccent'] = 0x0140;
  t['ldotbelow'] = 0x1E37;
  t['ldotbelowmacron'] = 0x1E39;
  t['leftangleabovecmb'] = 0x031A;
  t['lefttackbelowcmb'] = 0x0318;
  t['less'] = 0x003C;
  t['lessequal'] = 0x2264;
  t['lessequalorgreater'] = 0x22DA;
  t['lessmonospace'] = 0xFF1C;
  t['lessorequivalent'] = 0x2272;
  t['lessorgreater'] = 0x2276;
  t['lessoverequal'] = 0x2266;
  t['lesssmall'] = 0xFE64;
  t['lezh'] = 0x026E;
  t['lfblock'] = 0x258C;
  t['lhookretroflex'] = 0x026D;
  t['lira'] = 0x20A4;
  t['liwnarmenian'] = 0x056C;
  t['lj'] = 0x01C9;
  t['ljecyrillic'] = 0x0459;
  t['ll'] = 0xF6C0;
  t['lladeva'] = 0x0933;
  t['llagujarati'] = 0x0AB3;
  t['llinebelow'] = 0x1E3B;
  t['llladeva'] = 0x0934;
  t['llvocalicbengali'] = 0x09E1;
  t['llvocalicdeva'] = 0x0961;
  t['llvocalicvowelsignbengali'] = 0x09E3;
  t['llvocalicvowelsigndeva'] = 0x0963;
  t['lmiddletilde'] = 0x026B;
  t['lmonospace'] = 0xFF4C;
  t['lmsquare'] = 0x33D0;
  t['lochulathai'] = 0x0E2C;
  t['logicaland'] = 0x2227;
  t['logicalnot'] = 0x00AC;
  t['logicalnotreversed'] = 0x2310;
  t['logicalor'] = 0x2228;
  t['lolingthai'] = 0x0E25;
  t['longs'] = 0x017F;
  t['lowlinecenterline'] = 0xFE4E;
  t['lowlinecmb'] = 0x0332;
  t['lowlinedashed'] = 0xFE4D;
  t['lozenge'] = 0x25CA;
  t['lparen'] = 0x24A7;
  t['lslash'] = 0x0142;
  t['lsquare'] = 0x2113;
  t['lsuperior'] = 0xF6EE;
  t['ltshade'] = 0x2591;
  t['luthai'] = 0x0E26;
  t['lvocalicbengali'] = 0x098C;
  t['lvocalicdeva'] = 0x090C;
  t['lvocalicvowelsignbengali'] = 0x09E2;
  t['lvocalicvowelsigndeva'] = 0x0962;
  t['lxsquare'] = 0x33D3;
  t['m'] = 0x006D;
  t['mabengali'] = 0x09AE;
  t['macron'] = 0x00AF;
  t['macronbelowcmb'] = 0x0331;
  t['macroncmb'] = 0x0304;
  t['macronlowmod'] = 0x02CD;
  t['macronmonospace'] = 0xFFE3;
  t['macute'] = 0x1E3F;
  t['madeva'] = 0x092E;
  t['magujarati'] = 0x0AAE;
  t['magurmukhi'] = 0x0A2E;
  t['mahapakhhebrew'] = 0x05A4;
  t['mahapakhlefthebrew'] = 0x05A4;
  t['mahiragana'] = 0x307E;
  t['maichattawalowleftthai'] = 0xF895;
  t['maichattawalowrightthai'] = 0xF894;
  t['maichattawathai'] = 0x0E4B;
  t['maichattawaupperleftthai'] = 0xF893;
  t['maieklowleftthai'] = 0xF88C;
  t['maieklowrightthai'] = 0xF88B;
  t['maiekthai'] = 0x0E48;
  t['maiekupperleftthai'] = 0xF88A;
  t['maihanakatleftthai'] = 0xF884;
  t['maihanakatthai'] = 0x0E31;
  t['maitaikhuleftthai'] = 0xF889;
  t['maitaikhuthai'] = 0x0E47;
  t['maitholowleftthai'] = 0xF88F;
  t['maitholowrightthai'] = 0xF88E;
  t['maithothai'] = 0x0E49;
  t['maithoupperleftthai'] = 0xF88D;
  t['maitrilowleftthai'] = 0xF892;
  t['maitrilowrightthai'] = 0xF891;
  t['maitrithai'] = 0x0E4A;
  t['maitriupperleftthai'] = 0xF890;
  t['maiyamokthai'] = 0x0E46;
  t['makatakana'] = 0x30DE;
  t['makatakanahalfwidth'] = 0xFF8F;
  t['male'] = 0x2642;
  t['mansyonsquare'] = 0x3347;
  t['maqafhebrew'] = 0x05BE;
  t['mars'] = 0x2642;
  t['masoracirclehebrew'] = 0x05AF;
  t['masquare'] = 0x3383;
  t['mbopomofo'] = 0x3107;
  t['mbsquare'] = 0x33D4;
  t['mcircle'] = 0x24DC;
  t['mcubedsquare'] = 0x33A5;
  t['mdotaccent'] = 0x1E41;
  t['mdotbelow'] = 0x1E43;
  t['meemarabic'] = 0x0645;
  t['meemfinalarabic'] = 0xFEE2;
  t['meeminitialarabic'] = 0xFEE3;
  t['meemmedialarabic'] = 0xFEE4;
  t['meemmeeminitialarabic'] = 0xFCD1;
  t['meemmeemisolatedarabic'] = 0xFC48;
  t['meetorusquare'] = 0x334D;
  t['mehiragana'] = 0x3081;
  t['meizierasquare'] = 0x337E;
  t['mekatakana'] = 0x30E1;
  t['mekatakanahalfwidth'] = 0xFF92;
  t['mem'] = 0x05DE;
  t['memdagesh'] = 0xFB3E;
  t['memdageshhebrew'] = 0xFB3E;
  t['memhebrew'] = 0x05DE;
  t['menarmenian'] = 0x0574;
  t['merkhahebrew'] = 0x05A5;
  t['merkhakefulahebrew'] = 0x05A6;
  t['merkhakefulalefthebrew'] = 0x05A6;
  t['merkhalefthebrew'] = 0x05A5;
  t['mhook'] = 0x0271;
  t['mhzsquare'] = 0x3392;
  t['middledotkatakanahalfwidth'] = 0xFF65;
  t['middot'] = 0x00B7;
  t['mieumacirclekorean'] = 0x3272;
  t['mieumaparenkorean'] = 0x3212;
  t['mieumcirclekorean'] = 0x3264;
  t['mieumkorean'] = 0x3141;
  t['mieumpansioskorean'] = 0x3170;
  t['mieumparenkorean'] = 0x3204;
  t['mieumpieupkorean'] = 0x316E;
  t['mieumsioskorean'] = 0x316F;
  t['mihiragana'] = 0x307F;
  t['mikatakana'] = 0x30DF;
  t['mikatakanahalfwidth'] = 0xFF90;
  t['minus'] = 0x2212;
  t['minusbelowcmb'] = 0x0320;
  t['minuscircle'] = 0x2296;
  t['minusmod'] = 0x02D7;
  t['minusplus'] = 0x2213;
  t['minute'] = 0x2032;
  t['miribaarusquare'] = 0x334A;
  t['mirisquare'] = 0x3349;
  t['mlonglegturned'] = 0x0270;
  t['mlsquare'] = 0x3396;
  t['mmcubedsquare'] = 0x33A3;
  t['mmonospace'] = 0xFF4D;
  t['mmsquaredsquare'] = 0x339F;
  t['mohiragana'] = 0x3082;
  t['mohmsquare'] = 0x33C1;
  t['mokatakana'] = 0x30E2;
  t['mokatakanahalfwidth'] = 0xFF93;
  t['molsquare'] = 0x33D6;
  t['momathai'] = 0x0E21;
  t['moverssquare'] = 0x33A7;
  t['moverssquaredsquare'] = 0x33A8;
  t['mparen'] = 0x24A8;
  t['mpasquare'] = 0x33AB;
  t['mssquare'] = 0x33B3;
  t['msuperior'] = 0xF6EF;
  t['mturned'] = 0x026F;
  t['mu'] = 0x00B5;
  t['mu1'] = 0x00B5;
  t['muasquare'] = 0x3382;
  t['muchgreater'] = 0x226B;
  t['muchless'] = 0x226A;
  t['mufsquare'] = 0x338C;
  t['mugreek'] = 0x03BC;
  t['mugsquare'] = 0x338D;
  t['muhiragana'] = 0x3080;
  t['mukatakana'] = 0x30E0;
  t['mukatakanahalfwidth'] = 0xFF91;
  t['mulsquare'] = 0x3395;
  t['multiply'] = 0x00D7;
  t['mumsquare'] = 0x339B;
  t['munahhebrew'] = 0x05A3;
  t['munahlefthebrew'] = 0x05A3;
  t['musicalnote'] = 0x266A;
  t['musicalnotedbl'] = 0x266B;
  t['musicflatsign'] = 0x266D;
  t['musicsharpsign'] = 0x266F;
  t['mussquare'] = 0x33B2;
  t['muvsquare'] = 0x33B6;
  t['muwsquare'] = 0x33BC;
  t['mvmegasquare'] = 0x33B9;
  t['mvsquare'] = 0x33B7;
  t['mwmegasquare'] = 0x33BF;
  t['mwsquare'] = 0x33BD;
  t['n'] = 0x006E;
  t['nabengali'] = 0x09A8;
  t['nabla'] = 0x2207;
  t['nacute'] = 0x0144;
  t['nadeva'] = 0x0928;
  t['nagujarati'] = 0x0AA8;
  t['nagurmukhi'] = 0x0A28;
  t['nahiragana'] = 0x306A;
  t['nakatakana'] = 0x30CA;
  t['nakatakanahalfwidth'] = 0xFF85;
  t['napostrophe'] = 0x0149;
  t['nasquare'] = 0x3381;
  t['nbopomofo'] = 0x310B;
  t['nbspace'] = 0x00A0;
  t['ncaron'] = 0x0148;
  t['ncedilla'] = 0x0146;
  t['ncircle'] = 0x24DD;
  t['ncircumflexbelow'] = 0x1E4B;
  t['ncommaaccent'] = 0x0146;
  t['ndotaccent'] = 0x1E45;
  t['ndotbelow'] = 0x1E47;
  t['nehiragana'] = 0x306D;
  t['nekatakana'] = 0x30CD;
  t['nekatakanahalfwidth'] = 0xFF88;
  t['newsheqelsign'] = 0x20AA;
  t['nfsquare'] = 0x338B;
  t['ngabengali'] = 0x0999;
  t['ngadeva'] = 0x0919;
  t['ngagujarati'] = 0x0A99;
  t['ngagurmukhi'] = 0x0A19;
  t['ngonguthai'] = 0x0E07;
  t['nhiragana'] = 0x3093;
  t['nhookleft'] = 0x0272;
  t['nhookretroflex'] = 0x0273;
  t['nieunacirclekorean'] = 0x326F;
  t['nieunaparenkorean'] = 0x320F;
  t['nieuncieuckorean'] = 0x3135;
  t['nieuncirclekorean'] = 0x3261;
  t['nieunhieuhkorean'] = 0x3136;
  t['nieunkorean'] = 0x3134;
  t['nieunpansioskorean'] = 0x3168;
  t['nieunparenkorean'] = 0x3201;
  t['nieunsioskorean'] = 0x3167;
  t['nieuntikeutkorean'] = 0x3166;
  t['nihiragana'] = 0x306B;
  t['nikatakana'] = 0x30CB;
  t['nikatakanahalfwidth'] = 0xFF86;
  t['nikhahitleftthai'] = 0xF899;
  t['nikhahitthai'] = 0x0E4D;
  t['nine'] = 0x0039;
  t['ninearabic'] = 0x0669;
  t['ninebengali'] = 0x09EF;
  t['ninecircle'] = 0x2468;
  t['ninecircleinversesansserif'] = 0x2792;
  t['ninedeva'] = 0x096F;
  t['ninegujarati'] = 0x0AEF;
  t['ninegurmukhi'] = 0x0A6F;
  t['ninehackarabic'] = 0x0669;
  t['ninehangzhou'] = 0x3029;
  t['nineideographicparen'] = 0x3228;
  t['nineinferior'] = 0x2089;
  t['ninemonospace'] = 0xFF19;
  t['nineoldstyle'] = 0xF739;
  t['nineparen'] = 0x247C;
  t['nineperiod'] = 0x2490;
  t['ninepersian'] = 0x06F9;
  t['nineroman'] = 0x2178;
  t['ninesuperior'] = 0x2079;
  t['nineteencircle'] = 0x2472;
  t['nineteenparen'] = 0x2486;
  t['nineteenperiod'] = 0x249A;
  t['ninethai'] = 0x0E59;
  t['nj'] = 0x01CC;
  t['njecyrillic'] = 0x045A;
  t['nkatakana'] = 0x30F3;
  t['nkatakanahalfwidth'] = 0xFF9D;
  t['nlegrightlong'] = 0x019E;
  t['nlinebelow'] = 0x1E49;
  t['nmonospace'] = 0xFF4E;
  t['nmsquare'] = 0x339A;
  t['nnabengali'] = 0x09A3;
  t['nnadeva'] = 0x0923;
  t['nnagujarati'] = 0x0AA3;
  t['nnagurmukhi'] = 0x0A23;
  t['nnnadeva'] = 0x0929;
  t['nohiragana'] = 0x306E;
  t['nokatakana'] = 0x30CE;
  t['nokatakanahalfwidth'] = 0xFF89;
  t['nonbreakingspace'] = 0x00A0;
  t['nonenthai'] = 0x0E13;
  t['nonuthai'] = 0x0E19;
  t['noonarabic'] = 0x0646;
  t['noonfinalarabic'] = 0xFEE6;
  t['noonghunnaarabic'] = 0x06BA;
  t['noonghunnafinalarabic'] = 0xFB9F;
  t['nooninitialarabic'] = 0xFEE7;
  t['noonjeeminitialarabic'] = 0xFCD2;
  t['noonjeemisolatedarabic'] = 0xFC4B;
  t['noonmedialarabic'] = 0xFEE8;
  t['noonmeeminitialarabic'] = 0xFCD5;
  t['noonmeemisolatedarabic'] = 0xFC4E;
  t['noonnoonfinalarabic'] = 0xFC8D;
  t['notcontains'] = 0x220C;
  t['notelement'] = 0x2209;
  t['notelementof'] = 0x2209;
  t['notequal'] = 0x2260;
  t['notgreater'] = 0x226F;
  t['notgreaternorequal'] = 0x2271;
  t['notgreaternorless'] = 0x2279;
  t['notidentical'] = 0x2262;
  t['notless'] = 0x226E;
  t['notlessnorequal'] = 0x2270;
  t['notparallel'] = 0x2226;
  t['notprecedes'] = 0x2280;
  t['notsubset'] = 0x2284;
  t['notsucceeds'] = 0x2281;
  t['notsuperset'] = 0x2285;
  t['nowarmenian'] = 0x0576;
  t['nparen'] = 0x24A9;
  t['nssquare'] = 0x33B1;
  t['nsuperior'] = 0x207F;
  t['ntilde'] = 0x00F1;
  t['nu'] = 0x03BD;
  t['nuhiragana'] = 0x306C;
  t['nukatakana'] = 0x30CC;
  t['nukatakanahalfwidth'] = 0xFF87;
  t['nuktabengali'] = 0x09BC;
  t['nuktadeva'] = 0x093C;
  t['nuktagujarati'] = 0x0ABC;
  t['nuktagurmukhi'] = 0x0A3C;
  t['numbersign'] = 0x0023;
  t['numbersignmonospace'] = 0xFF03;
  t['numbersignsmall'] = 0xFE5F;
  t['numeralsigngreek'] = 0x0374;
  t['numeralsignlowergreek'] = 0x0375;
  t['numero'] = 0x2116;
  t['nun'] = 0x05E0;
  t['nundagesh'] = 0xFB40;
  t['nundageshhebrew'] = 0xFB40;
  t['nunhebrew'] = 0x05E0;
  t['nvsquare'] = 0x33B5;
  t['nwsquare'] = 0x33BB;
  t['nyabengali'] = 0x099E;
  t['nyadeva'] = 0x091E;
  t['nyagujarati'] = 0x0A9E;
  t['nyagurmukhi'] = 0x0A1E;
  t['o'] = 0x006F;
  t['oacute'] = 0x00F3;
  t['oangthai'] = 0x0E2D;
  t['obarred'] = 0x0275;
  t['obarredcyrillic'] = 0x04E9;
  t['obarreddieresiscyrillic'] = 0x04EB;
  t['obengali'] = 0x0993;
  t['obopomofo'] = 0x311B;
  t['obreve'] = 0x014F;
  t['ocandradeva'] = 0x0911;
  t['ocandragujarati'] = 0x0A91;
  t['ocandravowelsigndeva'] = 0x0949;
  t['ocandravowelsigngujarati'] = 0x0AC9;
  t['ocaron'] = 0x01D2;
  t['ocircle'] = 0x24DE;
  t['ocircumflex'] = 0x00F4;
  t['ocircumflexacute'] = 0x1ED1;
  t['ocircumflexdotbelow'] = 0x1ED9;
  t['ocircumflexgrave'] = 0x1ED3;
  t['ocircumflexhookabove'] = 0x1ED5;
  t['ocircumflextilde'] = 0x1ED7;
  t['ocyrillic'] = 0x043E;
  t['odblacute'] = 0x0151;
  t['odblgrave'] = 0x020D;
  t['odeva'] = 0x0913;
  t['odieresis'] = 0x00F6;
  t['odieresiscyrillic'] = 0x04E7;
  t['odotbelow'] = 0x1ECD;
  t['oe'] = 0x0153;
  t['oekorean'] = 0x315A;
  t['ogonek'] = 0x02DB;
  t['ogonekcmb'] = 0x0328;
  t['ograve'] = 0x00F2;
  t['ogujarati'] = 0x0A93;
  t['oharmenian'] = 0x0585;
  t['ohiragana'] = 0x304A;
  t['ohookabove'] = 0x1ECF;
  t['ohorn'] = 0x01A1;
  t['ohornacute'] = 0x1EDB;
  t['ohorndotbelow'] = 0x1EE3;
  t['ohorngrave'] = 0x1EDD;
  t['ohornhookabove'] = 0x1EDF;
  t['ohorntilde'] = 0x1EE1;
  t['ohungarumlaut'] = 0x0151;
  t['oi'] = 0x01A3;
  t['oinvertedbreve'] = 0x020F;
  t['okatakana'] = 0x30AA;
  t['okatakanahalfwidth'] = 0xFF75;
  t['okorean'] = 0x3157;
  t['olehebrew'] = 0x05AB;
  t['omacron'] = 0x014D;
  t['omacronacute'] = 0x1E53;
  t['omacrongrave'] = 0x1E51;
  t['omdeva'] = 0x0950;
  t['omega'] = 0x03C9;
  t['omega1'] = 0x03D6;
  t['omegacyrillic'] = 0x0461;
  t['omegalatinclosed'] = 0x0277;
  t['omegaroundcyrillic'] = 0x047B;
  t['omegatitlocyrillic'] = 0x047D;
  t['omegatonos'] = 0x03CE;
  t['omgujarati'] = 0x0AD0;
  t['omicron'] = 0x03BF;
  t['omicrontonos'] = 0x03CC;
  t['omonospace'] = 0xFF4F;
  t['one'] = 0x0031;
  t['onearabic'] = 0x0661;
  t['onebengali'] = 0x09E7;
  t['onecircle'] = 0x2460;
  t['onecircleinversesansserif'] = 0x278A;
  t['onedeva'] = 0x0967;
  t['onedotenleader'] = 0x2024;
  t['oneeighth'] = 0x215B;
  t['onefitted'] = 0xF6DC;
  t['onegujarati'] = 0x0AE7;
  t['onegurmukhi'] = 0x0A67;
  t['onehackarabic'] = 0x0661;
  t['onehalf'] = 0x00BD;
  t['onehangzhou'] = 0x3021;
  t['oneideographicparen'] = 0x3220;
  t['oneinferior'] = 0x2081;
  t['onemonospace'] = 0xFF11;
  t['onenumeratorbengali'] = 0x09F4;
  t['oneoldstyle'] = 0xF731;
  t['oneparen'] = 0x2474;
  t['oneperiod'] = 0x2488;
  t['onepersian'] = 0x06F1;
  t['onequarter'] = 0x00BC;
  t['oneroman'] = 0x2170;
  t['onesuperior'] = 0x00B9;
  t['onethai'] = 0x0E51;
  t['onethird'] = 0x2153;
  t['oogonek'] = 0x01EB;
  t['oogonekmacron'] = 0x01ED;
  t['oogurmukhi'] = 0x0A13;
  t['oomatragurmukhi'] = 0x0A4B;
  t['oopen'] = 0x0254;
  t['oparen'] = 0x24AA;
  t['openbullet'] = 0x25E6;
  t['option'] = 0x2325;
  t['ordfeminine'] = 0x00AA;
  t['ordmasculine'] = 0x00BA;
  t['orthogonal'] = 0x221F;
  t['oshortdeva'] = 0x0912;
  t['oshortvowelsigndeva'] = 0x094A;
  t['oslash'] = 0x00F8;
  t['oslashacute'] = 0x01FF;
  t['osmallhiragana'] = 0x3049;
  t['osmallkatakana'] = 0x30A9;
  t['osmallkatakanahalfwidth'] = 0xFF6B;
  t['ostrokeacute'] = 0x01FF;
  t['osuperior'] = 0xF6F0;
  t['otcyrillic'] = 0x047F;
  t['otilde'] = 0x00F5;
  t['otildeacute'] = 0x1E4D;
  t['otildedieresis'] = 0x1E4F;
  t['oubopomofo'] = 0x3121;
  t['overline'] = 0x203E;
  t['overlinecenterline'] = 0xFE4A;
  t['overlinecmb'] = 0x0305;
  t['overlinedashed'] = 0xFE49;
  t['overlinedblwavy'] = 0xFE4C;
  t['overlinewavy'] = 0xFE4B;
  t['overscore'] = 0x00AF;
  t['ovowelsignbengali'] = 0x09CB;
  t['ovowelsigndeva'] = 0x094B;
  t['ovowelsigngujarati'] = 0x0ACB;
  t['p'] = 0x0070;
  t['paampssquare'] = 0x3380;
  t['paasentosquare'] = 0x332B;
  t['pabengali'] = 0x09AA;
  t['pacute'] = 0x1E55;
  t['padeva'] = 0x092A;
  t['pagedown'] = 0x21DF;
  t['pageup'] = 0x21DE;
  t['pagujarati'] = 0x0AAA;
  t['pagurmukhi'] = 0x0A2A;
  t['pahiragana'] = 0x3071;
  t['paiyannoithai'] = 0x0E2F;
  t['pakatakana'] = 0x30D1;
  t['palatalizationcyrilliccmb'] = 0x0484;
  t['palochkacyrillic'] = 0x04C0;
  t['pansioskorean'] = 0x317F;
  t['paragraph'] = 0x00B6;
  t['parallel'] = 0x2225;
  t['parenleft'] = 0x0028;
  t['parenleftaltonearabic'] = 0xFD3E;
  t['parenleftbt'] = 0xF8ED;
  t['parenleftex'] = 0xF8EC;
  t['parenleftinferior'] = 0x208D;
  t['parenleftmonospace'] = 0xFF08;
  t['parenleftsmall'] = 0xFE59;
  t['parenleftsuperior'] = 0x207D;
  t['parenlefttp'] = 0xF8EB;
  t['parenleftvertical'] = 0xFE35;
  t['parenright'] = 0x0029;
  t['parenrightaltonearabic'] = 0xFD3F;
  t['parenrightbt'] = 0xF8F8;
  t['parenrightex'] = 0xF8F7;
  t['parenrightinferior'] = 0x208E;
  t['parenrightmonospace'] = 0xFF09;
  t['parenrightsmall'] = 0xFE5A;
  t['parenrightsuperior'] = 0x207E;
  t['parenrighttp'] = 0xF8F6;
  t['parenrightvertical'] = 0xFE36;
  t['partialdiff'] = 0x2202;
  t['paseqhebrew'] = 0x05C0;
  t['pashtahebrew'] = 0x0599;
  t['pasquare'] = 0x33A9;
  t['patah'] = 0x05B7;
  t['patah11'] = 0x05B7;
  t['patah1d'] = 0x05B7;
  t['patah2a'] = 0x05B7;
  t['patahhebrew'] = 0x05B7;
  t['patahnarrowhebrew'] = 0x05B7;
  t['patahquarterhebrew'] = 0x05B7;
  t['patahwidehebrew'] = 0x05B7;
  t['pazerhebrew'] = 0x05A1;
  t['pbopomofo'] = 0x3106;
  t['pcircle'] = 0x24DF;
  t['pdotaccent'] = 0x1E57;
  t['pe'] = 0x05E4;
  t['pecyrillic'] = 0x043F;
  t['pedagesh'] = 0xFB44;
  t['pedageshhebrew'] = 0xFB44;
  t['peezisquare'] = 0x333B;
  t['pefinaldageshhebrew'] = 0xFB43;
  t['peharabic'] = 0x067E;
  t['peharmenian'] = 0x057A;
  t['pehebrew'] = 0x05E4;
  t['pehfinalarabic'] = 0xFB57;
  t['pehinitialarabic'] = 0xFB58;
  t['pehiragana'] = 0x307A;
  t['pehmedialarabic'] = 0xFB59;
  t['pekatakana'] = 0x30DA;
  t['pemiddlehookcyrillic'] = 0x04A7;
  t['perafehebrew'] = 0xFB4E;
  t['percent'] = 0x0025;
  t['percentarabic'] = 0x066A;
  t['percentmonospace'] = 0xFF05;
  t['percentsmall'] = 0xFE6A;
  t['period'] = 0x002E;
  t['periodarmenian'] = 0x0589;
  t['periodcentered'] = 0x00B7;
  t['periodhalfwidth'] = 0xFF61;
  t['periodinferior'] = 0xF6E7;
  t['periodmonospace'] = 0xFF0E;
  t['periodsmall'] = 0xFE52;
  t['periodsuperior'] = 0xF6E8;
  t['perispomenigreekcmb'] = 0x0342;
  t['perpendicular'] = 0x22A5;
  t['perthousand'] = 0x2030;
  t['peseta'] = 0x20A7;
  t['pfsquare'] = 0x338A;
  t['phabengali'] = 0x09AB;
  t['phadeva'] = 0x092B;
  t['phagujarati'] = 0x0AAB;
  t['phagurmukhi'] = 0x0A2B;
  t['phi'] = 0x03C6;
  t['phi1'] = 0x03D5;
  t['phieuphacirclekorean'] = 0x327A;
  t['phieuphaparenkorean'] = 0x321A;
  t['phieuphcirclekorean'] = 0x326C;
  t['phieuphkorean'] = 0x314D;
  t['phieuphparenkorean'] = 0x320C;
  t['philatin'] = 0x0278;
  t['phinthuthai'] = 0x0E3A;
  t['phisymbolgreek'] = 0x03D5;
  t['phook'] = 0x01A5;
  t['phophanthai'] = 0x0E1E;
  t['phophungthai'] = 0x0E1C;
  t['phosamphaothai'] = 0x0E20;
  t['pi'] = 0x03C0;
  t['pieupacirclekorean'] = 0x3273;
  t['pieupaparenkorean'] = 0x3213;
  t['pieupcieuckorean'] = 0x3176;
  t['pieupcirclekorean'] = 0x3265;
  t['pieupkiyeokkorean'] = 0x3172;
  t['pieupkorean'] = 0x3142;
  t['pieupparenkorean'] = 0x3205;
  t['pieupsioskiyeokkorean'] = 0x3174;
  t['pieupsioskorean'] = 0x3144;
  t['pieupsiostikeutkorean'] = 0x3175;
  t['pieupthieuthkorean'] = 0x3177;
  t['pieuptikeutkorean'] = 0x3173;
  t['pihiragana'] = 0x3074;
  t['pikatakana'] = 0x30D4;
  t['pisymbolgreek'] = 0x03D6;
  t['piwrarmenian'] = 0x0583;
  t['plus'] = 0x002B;
  t['plusbelowcmb'] = 0x031F;
  t['pluscircle'] = 0x2295;
  t['plusminus'] = 0x00B1;
  t['plusmod'] = 0x02D6;
  t['plusmonospace'] = 0xFF0B;
  t['plussmall'] = 0xFE62;
  t['plussuperior'] = 0x207A;
  t['pmonospace'] = 0xFF50;
  t['pmsquare'] = 0x33D8;
  t['pohiragana'] = 0x307D;
  t['pointingindexdownwhite'] = 0x261F;
  t['pointingindexleftwhite'] = 0x261C;
  t['pointingindexrightwhite'] = 0x261E;
  t['pointingindexupwhite'] = 0x261D;
  t['pokatakana'] = 0x30DD;
  t['poplathai'] = 0x0E1B;
  t['postalmark'] = 0x3012;
  t['postalmarkface'] = 0x3020;
  t['pparen'] = 0x24AB;
  t['precedes'] = 0x227A;
  t['prescription'] = 0x211E;
  t['primemod'] = 0x02B9;
  t['primereversed'] = 0x2035;
  t['product'] = 0x220F;
  t['projective'] = 0x2305;
  t['prolongedkana'] = 0x30FC;
  t['propellor'] = 0x2318;
  t['propersubset'] = 0x2282;
  t['propersuperset'] = 0x2283;
  t['proportion'] = 0x2237;
  t['proportional'] = 0x221D;
  t['psi'] = 0x03C8;
  t['psicyrillic'] = 0x0471;
  t['psilipneumatacyrilliccmb'] = 0x0486;
  t['pssquare'] = 0x33B0;
  t['puhiragana'] = 0x3077;
  t['pukatakana'] = 0x30D7;
  t['pvsquare'] = 0x33B4;
  t['pwsquare'] = 0x33BA;
  t['q'] = 0x0071;
  t['qadeva'] = 0x0958;
  t['qadmahebrew'] = 0x05A8;
  t['qafarabic'] = 0x0642;
  t['qaffinalarabic'] = 0xFED6;
  t['qafinitialarabic'] = 0xFED7;
  t['qafmedialarabic'] = 0xFED8;
  t['qamats'] = 0x05B8;
  t['qamats10'] = 0x05B8;
  t['qamats1a'] = 0x05B8;
  t['qamats1c'] = 0x05B8;
  t['qamats27'] = 0x05B8;
  t['qamats29'] = 0x05B8;
  t['qamats33'] = 0x05B8;
  t['qamatsde'] = 0x05B8;
  t['qamatshebrew'] = 0x05B8;
  t['qamatsnarrowhebrew'] = 0x05B8;
  t['qamatsqatanhebrew'] = 0x05B8;
  t['qamatsqatannarrowhebrew'] = 0x05B8;
  t['qamatsqatanquarterhebrew'] = 0x05B8;
  t['qamatsqatanwidehebrew'] = 0x05B8;
  t['qamatsquarterhebrew'] = 0x05B8;
  t['qamatswidehebrew'] = 0x05B8;
  t['qarneyparahebrew'] = 0x059F;
  t['qbopomofo'] = 0x3111;
  t['qcircle'] = 0x24E0;
  t['qhook'] = 0x02A0;
  t['qmonospace'] = 0xFF51;
  t['qof'] = 0x05E7;
  t['qofdagesh'] = 0xFB47;
  t['qofdageshhebrew'] = 0xFB47;
  t['qofhebrew'] = 0x05E7;
  t['qparen'] = 0x24AC;
  t['quarternote'] = 0x2669;
  t['qubuts'] = 0x05BB;
  t['qubuts18'] = 0x05BB;
  t['qubuts25'] = 0x05BB;
  t['qubuts31'] = 0x05BB;
  t['qubutshebrew'] = 0x05BB;
  t['qubutsnarrowhebrew'] = 0x05BB;
  t['qubutsquarterhebrew'] = 0x05BB;
  t['qubutswidehebrew'] = 0x05BB;
  t['question'] = 0x003F;
  t['questionarabic'] = 0x061F;
  t['questionarmenian'] = 0x055E;
  t['questiondown'] = 0x00BF;
  t['questiondownsmall'] = 0xF7BF;
  t['questiongreek'] = 0x037E;
  t['questionmonospace'] = 0xFF1F;
  t['questionsmall'] = 0xF73F;
  t['quotedbl'] = 0x0022;
  t['quotedblbase'] = 0x201E;
  t['quotedblleft'] = 0x201C;
  t['quotedblmonospace'] = 0xFF02;
  t['quotedblprime'] = 0x301E;
  t['quotedblprimereversed'] = 0x301D;
  t['quotedblright'] = 0x201D;
  t['quoteleft'] = 0x2018;
  t['quoteleftreversed'] = 0x201B;
  t['quotereversed'] = 0x201B;
  t['quoteright'] = 0x2019;
  t['quoterightn'] = 0x0149;
  t['quotesinglbase'] = 0x201A;
  t['quotesingle'] = 0x0027;
  t['quotesinglemonospace'] = 0xFF07;
  t['r'] = 0x0072;
  t['raarmenian'] = 0x057C;
  t['rabengali'] = 0x09B0;
  t['racute'] = 0x0155;
  t['radeva'] = 0x0930;
  t['radical'] = 0x221A;
  t['radicalex'] = 0xF8E5;
  t['radoverssquare'] = 0x33AE;
  t['radoverssquaredsquare'] = 0x33AF;
  t['radsquare'] = 0x33AD;
  t['rafe'] = 0x05BF;
  t['rafehebrew'] = 0x05BF;
  t['ragujarati'] = 0x0AB0;
  t['ragurmukhi'] = 0x0A30;
  t['rahiragana'] = 0x3089;
  t['rakatakana'] = 0x30E9;
  t['rakatakanahalfwidth'] = 0xFF97;
  t['ralowerdiagonalbengali'] = 0x09F1;
  t['ramiddlediagonalbengali'] = 0x09F0;
  t['ramshorn'] = 0x0264;
  t['ratio'] = 0x2236;
  t['rbopomofo'] = 0x3116;
  t['rcaron'] = 0x0159;
  t['rcedilla'] = 0x0157;
  t['rcircle'] = 0x24E1;
  t['rcommaaccent'] = 0x0157;
  t['rdblgrave'] = 0x0211;
  t['rdotaccent'] = 0x1E59;
  t['rdotbelow'] = 0x1E5B;
  t['rdotbelowmacron'] = 0x1E5D;
  t['referencemark'] = 0x203B;
  t['reflexsubset'] = 0x2286;
  t['reflexsuperset'] = 0x2287;
  t['registered'] = 0x00AE;
  t['registersans'] = 0xF8E8;
  t['registerserif'] = 0xF6DA;
  t['reharabic'] = 0x0631;
  t['reharmenian'] = 0x0580;
  t['rehfinalarabic'] = 0xFEAE;
  t['rehiragana'] = 0x308C;
  t['rekatakana'] = 0x30EC;
  t['rekatakanahalfwidth'] = 0xFF9A;
  t['resh'] = 0x05E8;
  t['reshdageshhebrew'] = 0xFB48;
  t['reshhebrew'] = 0x05E8;
  t['reversedtilde'] = 0x223D;
  t['reviahebrew'] = 0x0597;
  t['reviamugrashhebrew'] = 0x0597;
  t['revlogicalnot'] = 0x2310;
  t['rfishhook'] = 0x027E;
  t['rfishhookreversed'] = 0x027F;
  t['rhabengali'] = 0x09DD;
  t['rhadeva'] = 0x095D;
  t['rho'] = 0x03C1;
  t['rhook'] = 0x027D;
  t['rhookturned'] = 0x027B;
  t['rhookturnedsuperior'] = 0x02B5;
  t['rhosymbolgreek'] = 0x03F1;
  t['rhotichookmod'] = 0x02DE;
  t['rieulacirclekorean'] = 0x3271;
  t['rieulaparenkorean'] = 0x3211;
  t['rieulcirclekorean'] = 0x3263;
  t['rieulhieuhkorean'] = 0x3140;
  t['rieulkiyeokkorean'] = 0x313A;
  t['rieulkiyeoksioskorean'] = 0x3169;
  t['rieulkorean'] = 0x3139;
  t['rieulmieumkorean'] = 0x313B;
  t['rieulpansioskorean'] = 0x316C;
  t['rieulparenkorean'] = 0x3203;
  t['rieulphieuphkorean'] = 0x313F;
  t['rieulpieupkorean'] = 0x313C;
  t['rieulpieupsioskorean'] = 0x316B;
  t['rieulsioskorean'] = 0x313D;
  t['rieulthieuthkorean'] = 0x313E;
  t['rieultikeutkorean'] = 0x316A;
  t['rieulyeorinhieuhkorean'] = 0x316D;
  t['rightangle'] = 0x221F;
  t['righttackbelowcmb'] = 0x0319;
  t['righttriangle'] = 0x22BF;
  t['rihiragana'] = 0x308A;
  t['rikatakana'] = 0x30EA;
  t['rikatakanahalfwidth'] = 0xFF98;
  t['ring'] = 0x02DA;
  t['ringbelowcmb'] = 0x0325;
  t['ringcmb'] = 0x030A;
  t['ringhalfleft'] = 0x02BF;
  t['ringhalfleftarmenian'] = 0x0559;
  t['ringhalfleftbelowcmb'] = 0x031C;
  t['ringhalfleftcentered'] = 0x02D3;
  t['ringhalfright'] = 0x02BE;
  t['ringhalfrightbelowcmb'] = 0x0339;
  t['ringhalfrightcentered'] = 0x02D2;
  t['rinvertedbreve'] = 0x0213;
  t['rittorusquare'] = 0x3351;
  t['rlinebelow'] = 0x1E5F;
  t['rlongleg'] = 0x027C;
  t['rlonglegturned'] = 0x027A;
  t['rmonospace'] = 0xFF52;
  t['rohiragana'] = 0x308D;
  t['rokatakana'] = 0x30ED;
  t['rokatakanahalfwidth'] = 0xFF9B;
  t['roruathai'] = 0x0E23;
  t['rparen'] = 0x24AD;
  t['rrabengali'] = 0x09DC;
  t['rradeva'] = 0x0931;
  t['rragurmukhi'] = 0x0A5C;
  t['rreharabic'] = 0x0691;
  t['rrehfinalarabic'] = 0xFB8D;
  t['rrvocalicbengali'] = 0x09E0;
  t['rrvocalicdeva'] = 0x0960;
  t['rrvocalicgujarati'] = 0x0AE0;
  t['rrvocalicvowelsignbengali'] = 0x09C4;
  t['rrvocalicvowelsigndeva'] = 0x0944;
  t['rrvocalicvowelsigngujarati'] = 0x0AC4;
  t['rsuperior'] = 0xF6F1;
  t['rtblock'] = 0x2590;
  t['rturned'] = 0x0279;
  t['rturnedsuperior'] = 0x02B4;
  t['ruhiragana'] = 0x308B;
  t['rukatakana'] = 0x30EB;
  t['rukatakanahalfwidth'] = 0xFF99;
  t['rupeemarkbengali'] = 0x09F2;
  t['rupeesignbengali'] = 0x09F3;
  t['rupiah'] = 0xF6DD;
  t['ruthai'] = 0x0E24;
  t['rvocalicbengali'] = 0x098B;
  t['rvocalicdeva'] = 0x090B;
  t['rvocalicgujarati'] = 0x0A8B;
  t['rvocalicvowelsignbengali'] = 0x09C3;
  t['rvocalicvowelsigndeva'] = 0x0943;
  t['rvocalicvowelsigngujarati'] = 0x0AC3;
  t['s'] = 0x0073;
  t['sabengali'] = 0x09B8;
  t['sacute'] = 0x015B;
  t['sacutedotaccent'] = 0x1E65;
  t['sadarabic'] = 0x0635;
  t['sadeva'] = 0x0938;
  t['sadfinalarabic'] = 0xFEBA;
  t['sadinitialarabic'] = 0xFEBB;
  t['sadmedialarabic'] = 0xFEBC;
  t['sagujarati'] = 0x0AB8;
  t['sagurmukhi'] = 0x0A38;
  t['sahiragana'] = 0x3055;
  t['sakatakana'] = 0x30B5;
  t['sakatakanahalfwidth'] = 0xFF7B;
  t['sallallahoualayhewasallamarabic'] = 0xFDFA;
  t['samekh'] = 0x05E1;
  t['samekhdagesh'] = 0xFB41;
  t['samekhdageshhebrew'] = 0xFB41;
  t['samekhhebrew'] = 0x05E1;
  t['saraaathai'] = 0x0E32;
  t['saraaethai'] = 0x0E41;
  t['saraaimaimalaithai'] = 0x0E44;
  t['saraaimaimuanthai'] = 0x0E43;
  t['saraamthai'] = 0x0E33;
  t['saraathai'] = 0x0E30;
  t['saraethai'] = 0x0E40;
  t['saraiileftthai'] = 0xF886;
  t['saraiithai'] = 0x0E35;
  t['saraileftthai'] = 0xF885;
  t['saraithai'] = 0x0E34;
  t['saraothai'] = 0x0E42;
  t['saraueeleftthai'] = 0xF888;
  t['saraueethai'] = 0x0E37;
  t['saraueleftthai'] = 0xF887;
  t['sarauethai'] = 0x0E36;
  t['sarauthai'] = 0x0E38;
  t['sarauuthai'] = 0x0E39;
  t['sbopomofo'] = 0x3119;
  t['scaron'] = 0x0161;
  t['scarondotaccent'] = 0x1E67;
  t['scedilla'] = 0x015F;
  t['schwa'] = 0x0259;
  t['schwacyrillic'] = 0x04D9;
  t['schwadieresiscyrillic'] = 0x04DB;
  t['schwahook'] = 0x025A;
  t['scircle'] = 0x24E2;
  t['scircumflex'] = 0x015D;
  t['scommaaccent'] = 0x0219;
  t['sdotaccent'] = 0x1E61;
  t['sdotbelow'] = 0x1E63;
  t['sdotbelowdotaccent'] = 0x1E69;
  t['seagullbelowcmb'] = 0x033C;
  t['second'] = 0x2033;
  t['secondtonechinese'] = 0x02CA;
  t['section'] = 0x00A7;
  t['seenarabic'] = 0x0633;
  t['seenfinalarabic'] = 0xFEB2;
  t['seeninitialarabic'] = 0xFEB3;
  t['seenmedialarabic'] = 0xFEB4;
  t['segol'] = 0x05B6;
  t['segol13'] = 0x05B6;
  t['segol1f'] = 0x05B6;
  t['segol2c'] = 0x05B6;
  t['segolhebrew'] = 0x05B6;
  t['segolnarrowhebrew'] = 0x05B6;
  t['segolquarterhebrew'] = 0x05B6;
  t['segoltahebrew'] = 0x0592;
  t['segolwidehebrew'] = 0x05B6;
  t['seharmenian'] = 0x057D;
  t['sehiragana'] = 0x305B;
  t['sekatakana'] = 0x30BB;
  t['sekatakanahalfwidth'] = 0xFF7E;
  t['semicolon'] = 0x003B;
  t['semicolonarabic'] = 0x061B;
  t['semicolonmonospace'] = 0xFF1B;
  t['semicolonsmall'] = 0xFE54;
  t['semivoicedmarkkana'] = 0x309C;
  t['semivoicedmarkkanahalfwidth'] = 0xFF9F;
  t['sentisquare'] = 0x3322;
  t['sentosquare'] = 0x3323;
  t['seven'] = 0x0037;
  t['sevenarabic'] = 0x0667;
  t['sevenbengali'] = 0x09ED;
  t['sevencircle'] = 0x2466;
  t['sevencircleinversesansserif'] = 0x2790;
  t['sevendeva'] = 0x096D;
  t['seveneighths'] = 0x215E;
  t['sevengujarati'] = 0x0AED;
  t['sevengurmukhi'] = 0x0A6D;
  t['sevenhackarabic'] = 0x0667;
  t['sevenhangzhou'] = 0x3027;
  t['sevenideographicparen'] = 0x3226;
  t['seveninferior'] = 0x2087;
  t['sevenmonospace'] = 0xFF17;
  t['sevenoldstyle'] = 0xF737;
  t['sevenparen'] = 0x247A;
  t['sevenperiod'] = 0x248E;
  t['sevenpersian'] = 0x06F7;
  t['sevenroman'] = 0x2176;
  t['sevensuperior'] = 0x2077;
  t['seventeencircle'] = 0x2470;
  t['seventeenparen'] = 0x2484;
  t['seventeenperiod'] = 0x2498;
  t['seventhai'] = 0x0E57;
  t['sfthyphen'] = 0x00AD;
  t['shaarmenian'] = 0x0577;
  t['shabengali'] = 0x09B6;
  t['shacyrillic'] = 0x0448;
  t['shaddaarabic'] = 0x0651;
  t['shaddadammaarabic'] = 0xFC61;
  t['shaddadammatanarabic'] = 0xFC5E;
  t['shaddafathaarabic'] = 0xFC60;
  t['shaddakasraarabic'] = 0xFC62;
  t['shaddakasratanarabic'] = 0xFC5F;
  t['shade'] = 0x2592;
  t['shadedark'] = 0x2593;
  t['shadelight'] = 0x2591;
  t['shademedium'] = 0x2592;
  t['shadeva'] = 0x0936;
  t['shagujarati'] = 0x0AB6;
  t['shagurmukhi'] = 0x0A36;
  t['shalshelethebrew'] = 0x0593;
  t['shbopomofo'] = 0x3115;
  t['shchacyrillic'] = 0x0449;
  t['sheenarabic'] = 0x0634;
  t['sheenfinalarabic'] = 0xFEB6;
  t['sheeninitialarabic'] = 0xFEB7;
  t['sheenmedialarabic'] = 0xFEB8;
  t['sheicoptic'] = 0x03E3;
  t['sheqel'] = 0x20AA;
  t['sheqelhebrew'] = 0x20AA;
  t['sheva'] = 0x05B0;
  t['sheva115'] = 0x05B0;
  t['sheva15'] = 0x05B0;
  t['sheva22'] = 0x05B0;
  t['sheva2e'] = 0x05B0;
  t['shevahebrew'] = 0x05B0;
  t['shevanarrowhebrew'] = 0x05B0;
  t['shevaquarterhebrew'] = 0x05B0;
  t['shevawidehebrew'] = 0x05B0;
  t['shhacyrillic'] = 0x04BB;
  t['shimacoptic'] = 0x03ED;
  t['shin'] = 0x05E9;
  t['shindagesh'] = 0xFB49;
  t['shindageshhebrew'] = 0xFB49;
  t['shindageshshindot'] = 0xFB2C;
  t['shindageshshindothebrew'] = 0xFB2C;
  t['shindageshsindot'] = 0xFB2D;
  t['shindageshsindothebrew'] = 0xFB2D;
  t['shindothebrew'] = 0x05C1;
  t['shinhebrew'] = 0x05E9;
  t['shinshindot'] = 0xFB2A;
  t['shinshindothebrew'] = 0xFB2A;
  t['shinsindot'] = 0xFB2B;
  t['shinsindothebrew'] = 0xFB2B;
  t['shook'] = 0x0282;
  t['sigma'] = 0x03C3;
  t['sigma1'] = 0x03C2;
  t['sigmafinal'] = 0x03C2;
  t['sigmalunatesymbolgreek'] = 0x03F2;
  t['sihiragana'] = 0x3057;
  t['sikatakana'] = 0x30B7;
  t['sikatakanahalfwidth'] = 0xFF7C;
  t['siluqhebrew'] = 0x05BD;
  t['siluqlefthebrew'] = 0x05BD;
  t['similar'] = 0x223C;
  t['sindothebrew'] = 0x05C2;
  t['siosacirclekorean'] = 0x3274;
  t['siosaparenkorean'] = 0x3214;
  t['sioscieuckorean'] = 0x317E;
  t['sioscirclekorean'] = 0x3266;
  t['sioskiyeokkorean'] = 0x317A;
  t['sioskorean'] = 0x3145;
  t['siosnieunkorean'] = 0x317B;
  t['siosparenkorean'] = 0x3206;
  t['siospieupkorean'] = 0x317D;
  t['siostikeutkorean'] = 0x317C;
  t['six'] = 0x0036;
  t['sixarabic'] = 0x0666;
  t['sixbengali'] = 0x09EC;
  t['sixcircle'] = 0x2465;
  t['sixcircleinversesansserif'] = 0x278F;
  t['sixdeva'] = 0x096C;
  t['sixgujarati'] = 0x0AEC;
  t['sixgurmukhi'] = 0x0A6C;
  t['sixhackarabic'] = 0x0666;
  t['sixhangzhou'] = 0x3026;
  t['sixideographicparen'] = 0x3225;
  t['sixinferior'] = 0x2086;
  t['sixmonospace'] = 0xFF16;
  t['sixoldstyle'] = 0xF736;
  t['sixparen'] = 0x2479;
  t['sixperiod'] = 0x248D;
  t['sixpersian'] = 0x06F6;
  t['sixroman'] = 0x2175;
  t['sixsuperior'] = 0x2076;
  t['sixteencircle'] = 0x246F;
  t['sixteencurrencydenominatorbengali'] = 0x09F9;
  t['sixteenparen'] = 0x2483;
  t['sixteenperiod'] = 0x2497;
  t['sixthai'] = 0x0E56;
  t['slash'] = 0x002F;
  t['slashmonospace'] = 0xFF0F;
  t['slong'] = 0x017F;
  t['slongdotaccent'] = 0x1E9B;
  t['smileface'] = 0x263A;
  t['smonospace'] = 0xFF53;
  t['sofpasuqhebrew'] = 0x05C3;
  t['softhyphen'] = 0x00AD;
  t['softsigncyrillic'] = 0x044C;
  t['sohiragana'] = 0x305D;
  t['sokatakana'] = 0x30BD;
  t['sokatakanahalfwidth'] = 0xFF7F;
  t['soliduslongoverlaycmb'] = 0x0338;
  t['solidusshortoverlaycmb'] = 0x0337;
  t['sorusithai'] = 0x0E29;
  t['sosalathai'] = 0x0E28;
  t['sosothai'] = 0x0E0B;
  t['sosuathai'] = 0x0E2A;
  t['space'] = 0x0020;
  t['spacehackarabic'] = 0x0020;
  t['spade'] = 0x2660;
  t['spadesuitblack'] = 0x2660;
  t['spadesuitwhite'] = 0x2664;
  t['sparen'] = 0x24AE;
  t['squarebelowcmb'] = 0x033B;
  t['squarecc'] = 0x33C4;
  t['squarecm'] = 0x339D;
  t['squarediagonalcrosshatchfill'] = 0x25A9;
  t['squarehorizontalfill'] = 0x25A4;
  t['squarekg'] = 0x338F;
  t['squarekm'] = 0x339E;
  t['squarekmcapital'] = 0x33CE;
  t['squareln'] = 0x33D1;
  t['squarelog'] = 0x33D2;
  t['squaremg'] = 0x338E;
  t['squaremil'] = 0x33D5;
  t['squaremm'] = 0x339C;
  t['squaremsquared'] = 0x33A1;
  t['squareorthogonalcrosshatchfill'] = 0x25A6;
  t['squareupperlefttolowerrightfill'] = 0x25A7;
  t['squareupperrighttolowerleftfill'] = 0x25A8;
  t['squareverticalfill'] = 0x25A5;
  t['squarewhitewithsmallblack'] = 0x25A3;
  t['srsquare'] = 0x33DB;
  t['ssabengali'] = 0x09B7;
  t['ssadeva'] = 0x0937;
  t['ssagujarati'] = 0x0AB7;
  t['ssangcieuckorean'] = 0x3149;
  t['ssanghieuhkorean'] = 0x3185;
  t['ssangieungkorean'] = 0x3180;
  t['ssangkiyeokkorean'] = 0x3132;
  t['ssangnieunkorean'] = 0x3165;
  t['ssangpieupkorean'] = 0x3143;
  t['ssangsioskorean'] = 0x3146;
  t['ssangtikeutkorean'] = 0x3138;
  t['ssuperior'] = 0xF6F2;
  t['sterling'] = 0x00A3;
  t['sterlingmonospace'] = 0xFFE1;
  t['strokelongoverlaycmb'] = 0x0336;
  t['strokeshortoverlaycmb'] = 0x0335;
  t['subset'] = 0x2282;
  t['subsetnotequal'] = 0x228A;
  t['subsetorequal'] = 0x2286;
  t['succeeds'] = 0x227B;
  t['suchthat'] = 0x220B;
  t['suhiragana'] = 0x3059;
  t['sukatakana'] = 0x30B9;
  t['sukatakanahalfwidth'] = 0xFF7D;
  t['sukunarabic'] = 0x0652;
  t['summation'] = 0x2211;
  t['sun'] = 0x263C;
  t['superset'] = 0x2283;
  t['supersetnotequal'] = 0x228B;
  t['supersetorequal'] = 0x2287;
  t['svsquare'] = 0x33DC;
  t['syouwaerasquare'] = 0x337C;
  t['t'] = 0x0074;
  t['tabengali'] = 0x09A4;
  t['tackdown'] = 0x22A4;
  t['tackleft'] = 0x22A3;
  t['tadeva'] = 0x0924;
  t['tagujarati'] = 0x0AA4;
  t['tagurmukhi'] = 0x0A24;
  t['taharabic'] = 0x0637;
  t['tahfinalarabic'] = 0xFEC2;
  t['tahinitialarabic'] = 0xFEC3;
  t['tahiragana'] = 0x305F;
  t['tahmedialarabic'] = 0xFEC4;
  t['taisyouerasquare'] = 0x337D;
  t['takatakana'] = 0x30BF;
  t['takatakanahalfwidth'] = 0xFF80;
  t['tatweelarabic'] = 0x0640;
  t['tau'] = 0x03C4;
  t['tav'] = 0x05EA;
  t['tavdages'] = 0xFB4A;
  t['tavdagesh'] = 0xFB4A;
  t['tavdageshhebrew'] = 0xFB4A;
  t['tavhebrew'] = 0x05EA;
  t['tbar'] = 0x0167;
  t['tbopomofo'] = 0x310A;
  t['tcaron'] = 0x0165;
  t['tccurl'] = 0x02A8;
  t['tcedilla'] = 0x0163;
  t['tcheharabic'] = 0x0686;
  t['tchehfinalarabic'] = 0xFB7B;
  t['tchehinitialarabic'] = 0xFB7C;
  t['tchehmedialarabic'] = 0xFB7D;
  t['tcircle'] = 0x24E3;
  t['tcircumflexbelow'] = 0x1E71;
  t['tcommaaccent'] = 0x0163;
  t['tdieresis'] = 0x1E97;
  t['tdotaccent'] = 0x1E6B;
  t['tdotbelow'] = 0x1E6D;
  t['tecyrillic'] = 0x0442;
  t['tedescendercyrillic'] = 0x04AD;
  t['teharabic'] = 0x062A;
  t['tehfinalarabic'] = 0xFE96;
  t['tehhahinitialarabic'] = 0xFCA2;
  t['tehhahisolatedarabic'] = 0xFC0C;
  t['tehinitialarabic'] = 0xFE97;
  t['tehiragana'] = 0x3066;
  t['tehjeeminitialarabic'] = 0xFCA1;
  t['tehjeemisolatedarabic'] = 0xFC0B;
  t['tehmarbutaarabic'] = 0x0629;
  t['tehmarbutafinalarabic'] = 0xFE94;
  t['tehmedialarabic'] = 0xFE98;
  t['tehmeeminitialarabic'] = 0xFCA4;
  t['tehmeemisolatedarabic'] = 0xFC0E;
  t['tehnoonfinalarabic'] = 0xFC73;
  t['tekatakana'] = 0x30C6;
  t['tekatakanahalfwidth'] = 0xFF83;
  t['telephone'] = 0x2121;
  t['telephoneblack'] = 0x260E;
  t['telishagedolahebrew'] = 0x05A0;
  t['telishaqetanahebrew'] = 0x05A9;
  t['tencircle'] = 0x2469;
  t['tenideographicparen'] = 0x3229;
  t['tenparen'] = 0x247D;
  t['tenperiod'] = 0x2491;
  t['tenroman'] = 0x2179;
  t['tesh'] = 0x02A7;
  t['tet'] = 0x05D8;
  t['tetdagesh'] = 0xFB38;
  t['tetdageshhebrew'] = 0xFB38;
  t['tethebrew'] = 0x05D8;
  t['tetsecyrillic'] = 0x04B5;
  t['tevirhebrew'] = 0x059B;
  t['tevirlefthebrew'] = 0x059B;
  t['thabengali'] = 0x09A5;
  t['thadeva'] = 0x0925;
  t['thagujarati'] = 0x0AA5;
  t['thagurmukhi'] = 0x0A25;
  t['thalarabic'] = 0x0630;
  t['thalfinalarabic'] = 0xFEAC;
  t['thanthakhatlowleftthai'] = 0xF898;
  t['thanthakhatlowrightthai'] = 0xF897;
  t['thanthakhatthai'] = 0x0E4C;
  t['thanthakhatupperleftthai'] = 0xF896;
  t['theharabic'] = 0x062B;
  t['thehfinalarabic'] = 0xFE9A;
  t['thehinitialarabic'] = 0xFE9B;
  t['thehmedialarabic'] = 0xFE9C;
  t['thereexists'] = 0x2203;
  t['therefore'] = 0x2234;
  t['theta'] = 0x03B8;
  t['theta1'] = 0x03D1;
  t['thetasymbolgreek'] = 0x03D1;
  t['thieuthacirclekorean'] = 0x3279;
  t['thieuthaparenkorean'] = 0x3219;
  t['thieuthcirclekorean'] = 0x326B;
  t['thieuthkorean'] = 0x314C;
  t['thieuthparenkorean'] = 0x320B;
  t['thirteencircle'] = 0x246C;
  t['thirteenparen'] = 0x2480;
  t['thirteenperiod'] = 0x2494;
  t['thonangmonthothai'] = 0x0E11;
  t['thook'] = 0x01AD;
  t['thophuthaothai'] = 0x0E12;
  t['thorn'] = 0x00FE;
  t['thothahanthai'] = 0x0E17;
  t['thothanthai'] = 0x0E10;
  t['thothongthai'] = 0x0E18;
  t['thothungthai'] = 0x0E16;
  t['thousandcyrillic'] = 0x0482;
  t['thousandsseparatorarabic'] = 0x066C;
  t['thousandsseparatorpersian'] = 0x066C;
  t['three'] = 0x0033;
  t['threearabic'] = 0x0663;
  t['threebengali'] = 0x09E9;
  t['threecircle'] = 0x2462;
  t['threecircleinversesansserif'] = 0x278C;
  t['threedeva'] = 0x0969;
  t['threeeighths'] = 0x215C;
  t['threegujarati'] = 0x0AE9;
  t['threegurmukhi'] = 0x0A69;
  t['threehackarabic'] = 0x0663;
  t['threehangzhou'] = 0x3023;
  t['threeideographicparen'] = 0x3222;
  t['threeinferior'] = 0x2083;
  t['threemonospace'] = 0xFF13;
  t['threenumeratorbengali'] = 0x09F6;
  t['threeoldstyle'] = 0xF733;
  t['threeparen'] = 0x2476;
  t['threeperiod'] = 0x248A;
  t['threepersian'] = 0x06F3;
  t['threequarters'] = 0x00BE;
  t['threequartersemdash'] = 0xF6DE;
  t['threeroman'] = 0x2172;
  t['threesuperior'] = 0x00B3;
  t['threethai'] = 0x0E53;
  t['thzsquare'] = 0x3394;
  t['tihiragana'] = 0x3061;
  t['tikatakana'] = 0x30C1;
  t['tikatakanahalfwidth'] = 0xFF81;
  t['tikeutacirclekorean'] = 0x3270;
  t['tikeutaparenkorean'] = 0x3210;
  t['tikeutcirclekorean'] = 0x3262;
  t['tikeutkorean'] = 0x3137;
  t['tikeutparenkorean'] = 0x3202;
  t['tilde'] = 0x02DC;
  t['tildebelowcmb'] = 0x0330;
  t['tildecmb'] = 0x0303;
  t['tildecomb'] = 0x0303;
  t['tildedoublecmb'] = 0x0360;
  t['tildeoperator'] = 0x223C;
  t['tildeoverlaycmb'] = 0x0334;
  t['tildeverticalcmb'] = 0x033E;
  t['timescircle'] = 0x2297;
  t['tipehahebrew'] = 0x0596;
  t['tipehalefthebrew'] = 0x0596;
  t['tippigurmukhi'] = 0x0A70;
  t['titlocyrilliccmb'] = 0x0483;
  t['tiwnarmenian'] = 0x057F;
  t['tlinebelow'] = 0x1E6F;
  t['tmonospace'] = 0xFF54;
  t['toarmenian'] = 0x0569;
  t['tohiragana'] = 0x3068;
  t['tokatakana'] = 0x30C8;
  t['tokatakanahalfwidth'] = 0xFF84;
  t['tonebarextrahighmod'] = 0x02E5;
  t['tonebarextralowmod'] = 0x02E9;
  t['tonebarhighmod'] = 0x02E6;
  t['tonebarlowmod'] = 0x02E8;
  t['tonebarmidmod'] = 0x02E7;
  t['tonefive'] = 0x01BD;
  t['tonesix'] = 0x0185;
  t['tonetwo'] = 0x01A8;
  t['tonos'] = 0x0384;
  t['tonsquare'] = 0x3327;
  t['topatakthai'] = 0x0E0F;
  t['tortoiseshellbracketleft'] = 0x3014;
  t['tortoiseshellbracketleftsmall'] = 0xFE5D;
  t['tortoiseshellbracketleftvertical'] = 0xFE39;
  t['tortoiseshellbracketright'] = 0x3015;
  t['tortoiseshellbracketrightsmall'] = 0xFE5E;
  t['tortoiseshellbracketrightvertical'] = 0xFE3A;
  t['totaothai'] = 0x0E15;
  t['tpalatalhook'] = 0x01AB;
  t['tparen'] = 0x24AF;
  t['trademark'] = 0x2122;
  t['trademarksans'] = 0xF8EA;
  t['trademarkserif'] = 0xF6DB;
  t['tretroflexhook'] = 0x0288;
  t['triagdn'] = 0x25BC;
  t['triaglf'] = 0x25C4;
  t['triagrt'] = 0x25BA;
  t['triagup'] = 0x25B2;
  t['ts'] = 0x02A6;
  t['tsadi'] = 0x05E6;
  t['tsadidagesh'] = 0xFB46;
  t['tsadidageshhebrew'] = 0xFB46;
  t['tsadihebrew'] = 0x05E6;
  t['tsecyrillic'] = 0x0446;
  t['tsere'] = 0x05B5;
  t['tsere12'] = 0x05B5;
  t['tsere1e'] = 0x05B5;
  t['tsere2b'] = 0x05B5;
  t['tserehebrew'] = 0x05B5;
  t['tserenarrowhebrew'] = 0x05B5;
  t['tserequarterhebrew'] = 0x05B5;
  t['tserewidehebrew'] = 0x05B5;
  t['tshecyrillic'] = 0x045B;
  t['tsuperior'] = 0xF6F3;
  t['ttabengali'] = 0x099F;
  t['ttadeva'] = 0x091F;
  t['ttagujarati'] = 0x0A9F;
  t['ttagurmukhi'] = 0x0A1F;
  t['tteharabic'] = 0x0679;
  t['ttehfinalarabic'] = 0xFB67;
  t['ttehinitialarabic'] = 0xFB68;
  t['ttehmedialarabic'] = 0xFB69;
  t['tthabengali'] = 0x09A0;
  t['tthadeva'] = 0x0920;
  t['tthagujarati'] = 0x0AA0;
  t['tthagurmukhi'] = 0x0A20;
  t['tturned'] = 0x0287;
  t['tuhiragana'] = 0x3064;
  t['tukatakana'] = 0x30C4;
  t['tukatakanahalfwidth'] = 0xFF82;
  t['tusmallhiragana'] = 0x3063;
  t['tusmallkatakana'] = 0x30C3;
  t['tusmallkatakanahalfwidth'] = 0xFF6F;
  t['twelvecircle'] = 0x246B;
  t['twelveparen'] = 0x247F;
  t['twelveperiod'] = 0x2493;
  t['twelveroman'] = 0x217B;
  t['twentycircle'] = 0x2473;
  t['twentyhangzhou'] = 0x5344;
  t['twentyparen'] = 0x2487;
  t['twentyperiod'] = 0x249B;
  t['two'] = 0x0032;
  t['twoarabic'] = 0x0662;
  t['twobengali'] = 0x09E8;
  t['twocircle'] = 0x2461;
  t['twocircleinversesansserif'] = 0x278B;
  t['twodeva'] = 0x0968;
  t['twodotenleader'] = 0x2025;
  t['twodotleader'] = 0x2025;
  t['twodotleadervertical'] = 0xFE30;
  t['twogujarati'] = 0x0AE8;
  t['twogurmukhi'] = 0x0A68;
  t['twohackarabic'] = 0x0662;
  t['twohangzhou'] = 0x3022;
  t['twoideographicparen'] = 0x3221;
  t['twoinferior'] = 0x2082;
  t['twomonospace'] = 0xFF12;
  t['twonumeratorbengali'] = 0x09F5;
  t['twooldstyle'] = 0xF732;
  t['twoparen'] = 0x2475;
  t['twoperiod'] = 0x2489;
  t['twopersian'] = 0x06F2;
  t['tworoman'] = 0x2171;
  t['twostroke'] = 0x01BB;
  t['twosuperior'] = 0x00B2;
  t['twothai'] = 0x0E52;
  t['twothirds'] = 0x2154;
  t['u'] = 0x0075;
  t['uacute'] = 0x00FA;
  t['ubar'] = 0x0289;
  t['ubengali'] = 0x0989;
  t['ubopomofo'] = 0x3128;
  t['ubreve'] = 0x016D;
  t['ucaron'] = 0x01D4;
  t['ucircle'] = 0x24E4;
  t['ucircumflex'] = 0x00FB;
  t['ucircumflexbelow'] = 0x1E77;
  t['ucyrillic'] = 0x0443;
  t['udattadeva'] = 0x0951;
  t['udblacute'] = 0x0171;
  t['udblgrave'] = 0x0215;
  t['udeva'] = 0x0909;
  t['udieresis'] = 0x00FC;
  t['udieresisacute'] = 0x01D8;
  t['udieresisbelow'] = 0x1E73;
  t['udieresiscaron'] = 0x01DA;
  t['udieresiscyrillic'] = 0x04F1;
  t['udieresisgrave'] = 0x01DC;
  t['udieresismacron'] = 0x01D6;
  t['udotbelow'] = 0x1EE5;
  t['ugrave'] = 0x00F9;
  t['ugujarati'] = 0x0A89;
  t['ugurmukhi'] = 0x0A09;
  t['uhiragana'] = 0x3046;
  t['uhookabove'] = 0x1EE7;
  t['uhorn'] = 0x01B0;
  t['uhornacute'] = 0x1EE9;
  t['uhorndotbelow'] = 0x1EF1;
  t['uhorngrave'] = 0x1EEB;
  t['uhornhookabove'] = 0x1EED;
  t['uhorntilde'] = 0x1EEF;
  t['uhungarumlaut'] = 0x0171;
  t['uhungarumlautcyrillic'] = 0x04F3;
  t['uinvertedbreve'] = 0x0217;
  t['ukatakana'] = 0x30A6;
  t['ukatakanahalfwidth'] = 0xFF73;
  t['ukcyrillic'] = 0x0479;
  t['ukorean'] = 0x315C;
  t['umacron'] = 0x016B;
  t['umacroncyrillic'] = 0x04EF;
  t['umacrondieresis'] = 0x1E7B;
  t['umatragurmukhi'] = 0x0A41;
  t['umonospace'] = 0xFF55;
  t['underscore'] = 0x005F;
  t['underscoredbl'] = 0x2017;
  t['underscoremonospace'] = 0xFF3F;
  t['underscorevertical'] = 0xFE33;
  t['underscorewavy'] = 0xFE4F;
  t['union'] = 0x222A;
  t['universal'] = 0x2200;
  t['uogonek'] = 0x0173;
  t['uparen'] = 0x24B0;
  t['upblock'] = 0x2580;
  t['upperdothebrew'] = 0x05C4;
  t['upsilon'] = 0x03C5;
  t['upsilondieresis'] = 0x03CB;
  t['upsilondieresistonos'] = 0x03B0;
  t['upsilonlatin'] = 0x028A;
  t['upsilontonos'] = 0x03CD;
  t['uptackbelowcmb'] = 0x031D;
  t['uptackmod'] = 0x02D4;
  t['uragurmukhi'] = 0x0A73;
  t['uring'] = 0x016F;
  t['ushortcyrillic'] = 0x045E;
  t['usmallhiragana'] = 0x3045;
  t['usmallkatakana'] = 0x30A5;
  t['usmallkatakanahalfwidth'] = 0xFF69;
  t['ustraightcyrillic'] = 0x04AF;
  t['ustraightstrokecyrillic'] = 0x04B1;
  t['utilde'] = 0x0169;
  t['utildeacute'] = 0x1E79;
  t['utildebelow'] = 0x1E75;
  t['uubengali'] = 0x098A;
  t['uudeva'] = 0x090A;
  t['uugujarati'] = 0x0A8A;
  t['uugurmukhi'] = 0x0A0A;
  t['uumatragurmukhi'] = 0x0A42;
  t['uuvowelsignbengali'] = 0x09C2;
  t['uuvowelsigndeva'] = 0x0942;
  t['uuvowelsigngujarati'] = 0x0AC2;
  t['uvowelsignbengali'] = 0x09C1;
  t['uvowelsigndeva'] = 0x0941;
  t['uvowelsigngujarati'] = 0x0AC1;
  t['v'] = 0x0076;
  t['vadeva'] = 0x0935;
  t['vagujarati'] = 0x0AB5;
  t['vagurmukhi'] = 0x0A35;
  t['vakatakana'] = 0x30F7;
  t['vav'] = 0x05D5;
  t['vavdagesh'] = 0xFB35;
  t['vavdagesh65'] = 0xFB35;
  t['vavdageshhebrew'] = 0xFB35;
  t['vavhebrew'] = 0x05D5;
  t['vavholam'] = 0xFB4B;
  t['vavholamhebrew'] = 0xFB4B;
  t['vavvavhebrew'] = 0x05F0;
  t['vavyodhebrew'] = 0x05F1;
  t['vcircle'] = 0x24E5;
  t['vdotbelow'] = 0x1E7F;
  t['vecyrillic'] = 0x0432;
  t['veharabic'] = 0x06A4;
  t['vehfinalarabic'] = 0xFB6B;
  t['vehinitialarabic'] = 0xFB6C;
  t['vehmedialarabic'] = 0xFB6D;
  t['vekatakana'] = 0x30F9;
  t['venus'] = 0x2640;
  t['verticalbar'] = 0x007C;
  t['verticallineabovecmb'] = 0x030D;
  t['verticallinebelowcmb'] = 0x0329;
  t['verticallinelowmod'] = 0x02CC;
  t['verticallinemod'] = 0x02C8;
  t['vewarmenian'] = 0x057E;
  t['vhook'] = 0x028B;
  t['vikatakana'] = 0x30F8;
  t['viramabengali'] = 0x09CD;
  t['viramadeva'] = 0x094D;
  t['viramagujarati'] = 0x0ACD;
  t['visargabengali'] = 0x0983;
  t['visargadeva'] = 0x0903;
  t['visargagujarati'] = 0x0A83;
  t['vmonospace'] = 0xFF56;
  t['voarmenian'] = 0x0578;
  t['voicediterationhiragana'] = 0x309E;
  t['voicediterationkatakana'] = 0x30FE;
  t['voicedmarkkana'] = 0x309B;
  t['voicedmarkkanahalfwidth'] = 0xFF9E;
  t['vokatakana'] = 0x30FA;
  t['vparen'] = 0x24B1;
  t['vtilde'] = 0x1E7D;
  t['vturned'] = 0x028C;
  t['vuhiragana'] = 0x3094;
  t['vukatakana'] = 0x30F4;
  t['w'] = 0x0077;
  t['wacute'] = 0x1E83;
  t['waekorean'] = 0x3159;
  t['wahiragana'] = 0x308F;
  t['wakatakana'] = 0x30EF;
  t['wakatakanahalfwidth'] = 0xFF9C;
  t['wakorean'] = 0x3158;
  t['wasmallhiragana'] = 0x308E;
  t['wasmallkatakana'] = 0x30EE;
  t['wattosquare'] = 0x3357;
  t['wavedash'] = 0x301C;
  t['wavyunderscorevertical'] = 0xFE34;
  t['wawarabic'] = 0x0648;
  t['wawfinalarabic'] = 0xFEEE;
  t['wawhamzaabovearabic'] = 0x0624;
  t['wawhamzaabovefinalarabic'] = 0xFE86;
  t['wbsquare'] = 0x33DD;
  t['wcircle'] = 0x24E6;
  t['wcircumflex'] = 0x0175;
  t['wdieresis'] = 0x1E85;
  t['wdotaccent'] = 0x1E87;
  t['wdotbelow'] = 0x1E89;
  t['wehiragana'] = 0x3091;
  t['weierstrass'] = 0x2118;
  t['wekatakana'] = 0x30F1;
  t['wekorean'] = 0x315E;
  t['weokorean'] = 0x315D;
  t['wgrave'] = 0x1E81;
  t['whitebullet'] = 0x25E6;
  t['whitecircle'] = 0x25CB;
  t['whitecircleinverse'] = 0x25D9;
  t['whitecornerbracketleft'] = 0x300E;
  t['whitecornerbracketleftvertical'] = 0xFE43;
  t['whitecornerbracketright'] = 0x300F;
  t['whitecornerbracketrightvertical'] = 0xFE44;
  t['whitediamond'] = 0x25C7;
  t['whitediamondcontainingblacksmalldiamond'] = 0x25C8;
  t['whitedownpointingsmalltriangle'] = 0x25BF;
  t['whitedownpointingtriangle'] = 0x25BD;
  t['whiteleftpointingsmalltriangle'] = 0x25C3;
  t['whiteleftpointingtriangle'] = 0x25C1;
  t['whitelenticularbracketleft'] = 0x3016;
  t['whitelenticularbracketright'] = 0x3017;
  t['whiterightpointingsmalltriangle'] = 0x25B9;
  t['whiterightpointingtriangle'] = 0x25B7;
  t['whitesmallsquare'] = 0x25AB;
  t['whitesmilingface'] = 0x263A;
  t['whitesquare'] = 0x25A1;
  t['whitestar'] = 0x2606;
  t['whitetelephone'] = 0x260F;
  t['whitetortoiseshellbracketleft'] = 0x3018;
  t['whitetortoiseshellbracketright'] = 0x3019;
  t['whiteuppointingsmalltriangle'] = 0x25B5;
  t['whiteuppointingtriangle'] = 0x25B3;
  t['wihiragana'] = 0x3090;
  t['wikatakana'] = 0x30F0;
  t['wikorean'] = 0x315F;
  t['wmonospace'] = 0xFF57;
  t['wohiragana'] = 0x3092;
  t['wokatakana'] = 0x30F2;
  t['wokatakanahalfwidth'] = 0xFF66;
  t['won'] = 0x20A9;
  t['wonmonospace'] = 0xFFE6;
  t['wowaenthai'] = 0x0E27;
  t['wparen'] = 0x24B2;
  t['wring'] = 0x1E98;
  t['wsuperior'] = 0x02B7;
  t['wturned'] = 0x028D;
  t['wynn'] = 0x01BF;
  t['x'] = 0x0078;
  t['xabovecmb'] = 0x033D;
  t['xbopomofo'] = 0x3112;
  t['xcircle'] = 0x24E7;
  t['xdieresis'] = 0x1E8D;
  t['xdotaccent'] = 0x1E8B;
  t['xeharmenian'] = 0x056D;
  t['xi'] = 0x03BE;
  t['xmonospace'] = 0xFF58;
  t['xparen'] = 0x24B3;
  t['xsuperior'] = 0x02E3;
  t['y'] = 0x0079;
  t['yaadosquare'] = 0x334E;
  t['yabengali'] = 0x09AF;
  t['yacute'] = 0x00FD;
  t['yadeva'] = 0x092F;
  t['yaekorean'] = 0x3152;
  t['yagujarati'] = 0x0AAF;
  t['yagurmukhi'] = 0x0A2F;
  t['yahiragana'] = 0x3084;
  t['yakatakana'] = 0x30E4;
  t['yakatakanahalfwidth'] = 0xFF94;
  t['yakorean'] = 0x3151;
  t['yamakkanthai'] = 0x0E4E;
  t['yasmallhiragana'] = 0x3083;
  t['yasmallkatakana'] = 0x30E3;
  t['yasmallkatakanahalfwidth'] = 0xFF6C;
  t['yatcyrillic'] = 0x0463;
  t['ycircle'] = 0x24E8;
  t['ycircumflex'] = 0x0177;
  t['ydieresis'] = 0x00FF;
  t['ydotaccent'] = 0x1E8F;
  t['ydotbelow'] = 0x1EF5;
  t['yeharabic'] = 0x064A;
  t['yehbarreearabic'] = 0x06D2;
  t['yehbarreefinalarabic'] = 0xFBAF;
  t['yehfinalarabic'] = 0xFEF2;
  t['yehhamzaabovearabic'] = 0x0626;
  t['yehhamzaabovefinalarabic'] = 0xFE8A;
  t['yehhamzaaboveinitialarabic'] = 0xFE8B;
  t['yehhamzaabovemedialarabic'] = 0xFE8C;
  t['yehinitialarabic'] = 0xFEF3;
  t['yehmedialarabic'] = 0xFEF4;
  t['yehmeeminitialarabic'] = 0xFCDD;
  t['yehmeemisolatedarabic'] = 0xFC58;
  t['yehnoonfinalarabic'] = 0xFC94;
  t['yehthreedotsbelowarabic'] = 0x06D1;
  t['yekorean'] = 0x3156;
  t['yen'] = 0x00A5;
  t['yenmonospace'] = 0xFFE5;
  t['yeokorean'] = 0x3155;
  t['yeorinhieuhkorean'] = 0x3186;
  t['yerahbenyomohebrew'] = 0x05AA;
  t['yerahbenyomolefthebrew'] = 0x05AA;
  t['yericyrillic'] = 0x044B;
  t['yerudieresiscyrillic'] = 0x04F9;
  t['yesieungkorean'] = 0x3181;
  t['yesieungpansioskorean'] = 0x3183;
  t['yesieungsioskorean'] = 0x3182;
  t['yetivhebrew'] = 0x059A;
  t['ygrave'] = 0x1EF3;
  t['yhook'] = 0x01B4;
  t['yhookabove'] = 0x1EF7;
  t['yiarmenian'] = 0x0575;
  t['yicyrillic'] = 0x0457;
  t['yikorean'] = 0x3162;
  t['yinyang'] = 0x262F;
  t['yiwnarmenian'] = 0x0582;
  t['ymonospace'] = 0xFF59;
  t['yod'] = 0x05D9;
  t['yoddagesh'] = 0xFB39;
  t['yoddageshhebrew'] = 0xFB39;
  t['yodhebrew'] = 0x05D9;
  t['yodyodhebrew'] = 0x05F2;
  t['yodyodpatahhebrew'] = 0xFB1F;
  t['yohiragana'] = 0x3088;
  t['yoikorean'] = 0x3189;
  t['yokatakana'] = 0x30E8;
  t['yokatakanahalfwidth'] = 0xFF96;
  t['yokorean'] = 0x315B;
  t['yosmallhiragana'] = 0x3087;
  t['yosmallkatakana'] = 0x30E7;
  t['yosmallkatakanahalfwidth'] = 0xFF6E;
  t['yotgreek'] = 0x03F3;
  t['yoyaekorean'] = 0x3188;
  t['yoyakorean'] = 0x3187;
  t['yoyakthai'] = 0x0E22;
  t['yoyingthai'] = 0x0E0D;
  t['yparen'] = 0x24B4;
  t['ypogegrammeni'] = 0x037A;
  t['ypogegrammenigreekcmb'] = 0x0345;
  t['yr'] = 0x01A6;
  t['yring'] = 0x1E99;
  t['ysuperior'] = 0x02B8;
  t['ytilde'] = 0x1EF9;
  t['yturned'] = 0x028E;
  t['yuhiragana'] = 0x3086;
  t['yuikorean'] = 0x318C;
  t['yukatakana'] = 0x30E6;
  t['yukatakanahalfwidth'] = 0xFF95;
  t['yukorean'] = 0x3160;
  t['yusbigcyrillic'] = 0x046B;
  t['yusbigiotifiedcyrillic'] = 0x046D;
  t['yuslittlecyrillic'] = 0x0467;
  t['yuslittleiotifiedcyrillic'] = 0x0469;
  t['yusmallhiragana'] = 0x3085;
  t['yusmallkatakana'] = 0x30E5;
  t['yusmallkatakanahalfwidth'] = 0xFF6D;
  t['yuyekorean'] = 0x318B;
  t['yuyeokorean'] = 0x318A;
  t['yyabengali'] = 0x09DF;
  t['yyadeva'] = 0x095F;
  t['z'] = 0x007A;
  t['zaarmenian'] = 0x0566;
  t['zacute'] = 0x017A;
  t['zadeva'] = 0x095B;
  t['zagurmukhi'] = 0x0A5B;
  t['zaharabic'] = 0x0638;
  t['zahfinalarabic'] = 0xFEC6;
  t['zahinitialarabic'] = 0xFEC7;
  t['zahiragana'] = 0x3056;
  t['zahmedialarabic'] = 0xFEC8;
  t['zainarabic'] = 0x0632;
  t['zainfinalarabic'] = 0xFEB0;
  t['zakatakana'] = 0x30B6;
  t['zaqefgadolhebrew'] = 0x0595;
  t['zaqefqatanhebrew'] = 0x0594;
  t['zarqahebrew'] = 0x0598;
  t['zayin'] = 0x05D6;
  t['zayindagesh'] = 0xFB36;
  t['zayindageshhebrew'] = 0xFB36;
  t['zayinhebrew'] = 0x05D6;
  t['zbopomofo'] = 0x3117;
  t['zcaron'] = 0x017E;
  t['zcircle'] = 0x24E9;
  t['zcircumflex'] = 0x1E91;
  t['zcurl'] = 0x0291;
  t['zdot'] = 0x017C;
  t['zdotaccent'] = 0x017C;
  t['zdotbelow'] = 0x1E93;
  t['zecyrillic'] = 0x0437;
  t['zedescendercyrillic'] = 0x0499;
  t['zedieresiscyrillic'] = 0x04DF;
  t['zehiragana'] = 0x305C;
  t['zekatakana'] = 0x30BC;
  t['zero'] = 0x0030;
  t['zeroarabic'] = 0x0660;
  t['zerobengali'] = 0x09E6;
  t['zerodeva'] = 0x0966;
  t['zerogujarati'] = 0x0AE6;
  t['zerogurmukhi'] = 0x0A66;
  t['zerohackarabic'] = 0x0660;
  t['zeroinferior'] = 0x2080;
  t['zeromonospace'] = 0xFF10;
  t['zerooldstyle'] = 0xF730;
  t['zeropersian'] = 0x06F0;
  t['zerosuperior'] = 0x2070;
  t['zerothai'] = 0x0E50;
  t['zerowidthjoiner'] = 0xFEFF;
  t['zerowidthnonjoiner'] = 0x200C;
  t['zerowidthspace'] = 0x200B;
  t['zeta'] = 0x03B6;
  t['zhbopomofo'] = 0x3113;
  t['zhearmenian'] = 0x056A;
  t['zhebrevecyrillic'] = 0x04C2;
  t['zhecyrillic'] = 0x0436;
  t['zhedescendercyrillic'] = 0x0497;
  t['zhedieresiscyrillic'] = 0x04DD;
  t['zihiragana'] = 0x3058;
  t['zikatakana'] = 0x30B8;
  t['zinorhebrew'] = 0x05AE;
  t['zlinebelow'] = 0x1E95;
  t['zmonospace'] = 0xFF5A;
  t['zohiragana'] = 0x305E;
  t['zokatakana'] = 0x30BE;
  t['zparen'] = 0x24B5;
  t['zretroflexhook'] = 0x0290;
  t['zstroke'] = 0x01B6;
  t['zuhiragana'] = 0x305A;
  t['zukatakana'] = 0x30BA;
  t['.notdef'] = 0x0000;
});

var getDingbatsGlyphsUnicode = getLookupTableFactory(function (t) {
  t['space'] = 0x0020;
  t['a1'] = 0x2701;
  t['a2'] = 0x2702;
  t['a202'] = 0x2703;
  t['a3'] = 0x2704;
  t['a4'] = 0x260E;
  t['a5'] = 0x2706;
  t['a119'] = 0x2707;
  t['a118'] = 0x2708;
  t['a117'] = 0x2709;
  t['a11'] = 0x261B;
  t['a12'] = 0x261E;
  t['a13'] = 0x270C;
  t['a14'] = 0x270D;
  t['a15'] = 0x270E;
  t['a16'] = 0x270F;
  t['a105'] = 0x2710;
  t['a17'] = 0x2711;
  t['a18'] = 0x2712;
  t['a19'] = 0x2713;
  t['a20'] = 0x2714;
  t['a21'] = 0x2715;
  t['a22'] = 0x2716;
  t['a23'] = 0x2717;
  t['a24'] = 0x2718;
  t['a25'] = 0x2719;
  t['a26'] = 0x271A;
  t['a27'] = 0x271B;
  t['a28'] = 0x271C;
  t['a6'] = 0x271D;
  t['a7'] = 0x271E;
  t['a8'] = 0x271F;
  t['a9'] = 0x2720;
  t['a10'] = 0x2721;
  t['a29'] = 0x2722;
  t['a30'] = 0x2723;
  t['a31'] = 0x2724;
  t['a32'] = 0x2725;
  t['a33'] = 0x2726;
  t['a34'] = 0x2727;
  t['a35'] = 0x2605;
  t['a36'] = 0x2729;
  t['a37'] = 0x272A;
  t['a38'] = 0x272B;
  t['a39'] = 0x272C;
  t['a40'] = 0x272D;
  t['a41'] = 0x272E;
  t['a42'] = 0x272F;
  t['a43'] = 0x2730;
  t['a44'] = 0x2731;
  t['a45'] = 0x2732;
  t['a46'] = 0x2733;
  t['a47'] = 0x2734;
  t['a48'] = 0x2735;
  t['a49'] = 0x2736;
  t['a50'] = 0x2737;
  t['a51'] = 0x2738;
  t['a52'] = 0x2739;
  t['a53'] = 0x273A;
  t['a54'] = 0x273B;
  t['a55'] = 0x273C;
  t['a56'] = 0x273D;
  t['a57'] = 0x273E;
  t['a58'] = 0x273F;
  t['a59'] = 0x2740;
  t['a60'] = 0x2741;
  t['a61'] = 0x2742;
  t['a62'] = 0x2743;
  t['a63'] = 0x2744;
  t['a64'] = 0x2745;
  t['a65'] = 0x2746;
  t['a66'] = 0x2747;
  t['a67'] = 0x2748;
  t['a68'] = 0x2749;
  t['a69'] = 0x274A;
  t['a70'] = 0x274B;
  t['a71'] = 0x25CF;
  t['a72'] = 0x274D;
  t['a73'] = 0x25A0;
  t['a74'] = 0x274F;
  t['a203'] = 0x2750;
  t['a75'] = 0x2751;
  t['a204'] = 0x2752;
  t['a76'] = 0x25B2;
  t['a77'] = 0x25BC;
  t['a78'] = 0x25C6;
  t['a79'] = 0x2756;
  t['a81'] = 0x25D7;
  t['a82'] = 0x2758;
  t['a83'] = 0x2759;
  t['a84'] = 0x275A;
  t['a97'] = 0x275B;
  t['a98'] = 0x275C;
  t['a99'] = 0x275D;
  t['a100'] = 0x275E;
  t['a101'] = 0x2761;
  t['a102'] = 0x2762;
  t['a103'] = 0x2763;
  t['a104'] = 0x2764;
  t['a106'] = 0x2765;
  t['a107'] = 0x2766;
  t['a108'] = 0x2767;
  t['a112'] = 0x2663;
  t['a111'] = 0x2666;
  t['a110'] = 0x2665;
  t['a109'] = 0x2660;
  t['a120'] = 0x2460;
  t['a121'] = 0x2461;
  t['a122'] = 0x2462;
  t['a123'] = 0x2463;
  t['a124'] = 0x2464;
  t['a125'] = 0x2465;
  t['a126'] = 0x2466;
  t['a127'] = 0x2467;
  t['a128'] = 0x2468;
  t['a129'] = 0x2469;
  t['a130'] = 0x2776;
  t['a131'] = 0x2777;
  t['a132'] = 0x2778;
  t['a133'] = 0x2779;
  t['a134'] = 0x277A;
  t['a135'] = 0x277B;
  t['a136'] = 0x277C;
  t['a137'] = 0x277D;
  t['a138'] = 0x277E;
  t['a139'] = 0x277F;
  t['a140'] = 0x2780;
  t['a141'] = 0x2781;
  t['a142'] = 0x2782;
  t['a143'] = 0x2783;
  t['a144'] = 0x2784;
  t['a145'] = 0x2785;
  t['a146'] = 0x2786;
  t['a147'] = 0x2787;
  t['a148'] = 0x2788;
  t['a149'] = 0x2789;
  t['a150'] = 0x278A;
  t['a151'] = 0x278B;
  t['a152'] = 0x278C;
  t['a153'] = 0x278D;
  t['a154'] = 0x278E;
  t['a155'] = 0x278F;
  t['a156'] = 0x2790;
  t['a157'] = 0x2791;
  t['a158'] = 0x2792;
  t['a159'] = 0x2793;
  t['a160'] = 0x2794;
  t['a161'] = 0x2192;
  t['a163'] = 0x2194;
  t['a164'] = 0x2195;
  t['a196'] = 0x2798;
  t['a165'] = 0x2799;
  t['a192'] = 0x279A;
  t['a166'] = 0x279B;
  t['a167'] = 0x279C;
  t['a168'] = 0x279D;
  t['a169'] = 0x279E;
  t['a170'] = 0x279F;
  t['a171'] = 0x27A0;
  t['a172'] = 0x27A1;
  t['a173'] = 0x27A2;
  t['a162'] = 0x27A3;
  t['a174'] = 0x27A4;
  t['a175'] = 0x27A5;
  t['a176'] = 0x27A6;
  t['a177'] = 0x27A7;
  t['a178'] = 0x27A8;
  t['a179'] = 0x27A9;
  t['a193'] = 0x27AA;
  t['a180'] = 0x27AB;
  t['a199'] = 0x27AC;
  t['a181'] = 0x27AD;
  t['a200'] = 0x27AE;
  t['a182'] = 0x27AF;
  t['a201'] = 0x27B1;
  t['a183'] = 0x27B2;
  t['a184'] = 0x27B3;
  t['a197'] = 0x27B4;
  t['a185'] = 0x27B5;
  t['a194'] = 0x27B6;
  t['a198'] = 0x27B7;
  t['a186'] = 0x27B8;
  t['a195'] = 0x27B9;
  t['a187'] = 0x27BA;
  t['a188'] = 0x27BB;
  t['a189'] = 0x27BC;
  t['a190'] = 0x27BD;
  t['a191'] = 0x27BE;
  t['a89'] = 0x2768; // 0xF8D7
  t['a90'] = 0x2769; // 0xF8D8
  t['a93'] = 0x276A; // 0xF8D9
  t['a94'] = 0x276B; // 0xF8DA
  t['a91'] = 0x276C; // 0xF8DB
  t['a92'] = 0x276D; // 0xF8DC
  t['a205'] = 0x276E; // 0xF8DD
  t['a85'] = 0x276F; // 0xF8DE
  t['a206'] = 0x2770; // 0xF8DF
  t['a86'] = 0x2771; // 0xF8E0
  t['a87'] = 0x2772; // 0xF8E1
  t['a88'] = 0x2773; // 0xF8E2
  t['a95'] = 0x2774; // 0xF8E3
  t['a96'] = 0x2775; // 0xF8E4
  t['.notdef'] = 0x0000;
});

exports.getGlyphsUnicode = getGlyphsUnicode;
exports.getDingbatsGlyphsUnicode = getDingbatsGlyphsUnicode;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreJbig2 = {}), root.pdfjsSharedUtil,
      root.pdfjsCoreArithmeticDecoder);
  }
}(this, function (exports, sharedUtil, coreArithmeticDecoder) {

var error = sharedUtil.error;
var log2 = sharedUtil.log2;
var readInt8 = sharedUtil.readInt8;
var readUint16 = sharedUtil.readUint16;
var readUint32 = sharedUtil.readUint32;
var shadow = sharedUtil.shadow;
var ArithmeticDecoder = coreArithmeticDecoder.ArithmeticDecoder;

var Jbig2Image = (function Jbig2ImageClosure() {
  // Utility data structures
  function ContextCache() {}

  ContextCache.prototype = {
    getContexts: function(id) {
      if (id in this) {
        return this[id];
      }
      return (this[id] = new Int8Array(1 << 16));
    }
  };

  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }

  DecodingContext.prototype = {
    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, 'decoder', decoder);
    },
    get contextCache() {
      var cache = new ContextCache();
      return shadow(this, 'contextCache', cache);
    }
  };

  // Annex A. Arithmetic Integer Decoding Procedure
  // A.2 Procedure for decoding values
  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;

    function readBits(length) {
      var v = 0;
      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = (prev < 256 ? (prev << 1) | bit :
                (((prev << 1) | bit) & 511) | 256);
        v = (v << 1) | bit;
      }
      return v >>> 0;
    }

    var sign = readBits(1);
    var value = readBits(1) ?
                  (readBits(1) ?
                    (readBits(1) ?
                      (readBits(1) ?
                        (readBits(1) ?
                          (readBits(32) + 4436) :
                        readBits(12) + 340) :
                      readBits(8) + 84) :
                    readBits(6) + 20) :
                  readBits(4) + 4) :
                readBits(2);
    return (sign === 0 ? value : (value > 0 ? -value : null));
  }

  // A.3 The IAID decoding procedure
  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts('IAID');

    var prev = 1;
    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = (prev << 1) | bit;
    }
    if (codeLength < 31) {
      return prev & ((1 << codeLength) - 1);
    }
    return prev & 0x7FFFFFFF;
  }

  // 7.3 Segment types
  var SegmentTypes = [
    'SymbolDictionary', null, null, null, 'IntermediateTextRegion', null,
    'ImmediateTextRegion', 'ImmediateLosslessTextRegion', null, null, null,
    null, null, null, null, null, 'patternDictionary', null, null, null,
    'IntermediateHalftoneRegion', null, 'ImmediateHalftoneRegion',
    'ImmediateLosslessHalftoneRegion', null, null, null, null, null, null, null,
    null, null, null, null, null, 'IntermediateGenericRegion', null,
    'ImmediateGenericRegion', 'ImmediateLosslessGenericRegion',
    'IntermediateGenericRefinementRegion', null,
    'ImmediateGenericRefinementRegion',
    'ImmediateLosslessGenericRefinementRegion', null, null, null, null,
    'PageInformation', 'EndOfPage', 'EndOfStripe', 'EndOfFile', 'Profiles',
    'Tables', null, null, null, null, null, null, null, null,
    'Extension'
  ];

  var CodingTemplates = [
    [{x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: -2, y: -1},
     {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 2, y: -1},
     {x: -4, y: 0}, {x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}],
    [{x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: 2, y: -2},
     {x: -2, y: -1}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
     {x: 2, y: -1}, {x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}],
    [{x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: -2, y: -1},
     {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -2, y: 0},
     {x: -1, y: 0}],
    [{x: -3, y: -1}, {x: -2, y: -1}, {x: -1, y: -1}, {x: 0, y: -1},
     {x: 1, y: -1}, {x: -4, y: 0}, {x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}]
  ];

  var RefinementTemplates = [
    {
      coding: [{x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}],
      reference: [{x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0},
                  {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}]
    },
    {
      coding: [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}],
      reference: [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0},
                  {x: 0, y: 1}, {x: 1, y: 1}]
    }
  ];

  // See 6.2.5.7 Decoding the bitmap.
  var ReusedContexts = [
    0x9B25, // 10011 0110010 0101
    0x0795, // 0011 110010 101
    0x00E5, // 001 11001 01
    0x0195  // 011001 0101
  ];

  var RefinementReusedContexts = [
    0x0020, // '000' + '0' (coding) + '00010000' + '0' (reference)
    0x0008  // '0000' + '001000'
  ];

  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var contextLabel, i, j, pixel, row, row1, row2, bitmap = [];

    // ...ooooo....
    // ..ooooooo... Context template for current pixel (X)
    // .ooooX...... (concatenate values of 'o'-pixels to get contextLabel)
    var OLD_PIXEL_MASK = 0x7BF7; // 01111 0111111 0111

    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = (i < 1) ? row : bitmap[i - 1];
      row2 = (i < 2) ? row : bitmap[i - 2];

      // At the beginning of each row:
      // Fill contextLabel with pixels that are above/right of (X)
      contextLabel = (row2[0] << 13) | (row2[1] << 12) | (row2[2] << 11) |
                     (row1[0] << 7) | (row1[1] << 6) | (row1[2] << 5) |
                     (row1[3] << 4);

      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);

        // At each pixel: Clear contextLabel pixels that are shifted
        // out of the context, then add new ones.
        contextLabel = ((contextLabel & OLD_PIXEL_MASK) << 1) |
                       (j + 3 < width ? row2[j + 3] << 11 : 0) |
                       (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }

    return bitmap;
  }

  // 6.2 Generic Region Decoding Procedure
  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at,
                        decodingContext) {
    if (mmr) {
      error('JBIG2 error: MMR encoding is not supported');
    }

    // Use optimized version for the most common case
    if (templateIndex === 0 && !skip && !prediction && at.length === 4 &&
        at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 &&
        at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }

    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);

    // Sorting is non-standard, and it is not required. But sorting increases
    // the number of template bits that can be reused from the previous
    // contextLabel in the main loop.
    template.sort(function (a, b) {
      return (a.y - b.y) || (a.x - b.x);
    });

    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0, minX = 0, maxX = 0, minY = 0;
    var c, k;

    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);
      // Check if the template pixel appears in two consecutive context labels,
      // so it can be reused. Otherwise, we add it to the list of changing
      // template entries.
      if (k < templateLength - 1 &&
          template[k].y === template[k + 1].y &&
          template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << (templateLength - 1 - k);
      } else {
        changingTemplateEntries.push(k);
      }
    }
    var changingEntriesLength = changingTemplateEntries.length;

    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);
    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << (templateLength - 1 - k);
    }

    // Get the safe bounding box edges from the width, height, minX, maxX, minY
    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;

    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];

    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');

    var ltp = 0, j, i0, j0, contextLabel = 0, bit, shift;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          bitmap.push(row); // duplicate previous row
          continue;
        }
      }
      row = new Uint8Array(row);
      bitmap.push(row);
      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        // Are we in the middle of a scanline, so we can reuse contextLabel
        // bits?
        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          // If yes, we can just shift the bits that are reusable and only
          // fetch the remaining ones.
          contextLabel = (contextLabel << 1) & reuseMask;
          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];
            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          // compute the contextLabel from scratch
          contextLabel = 0;
          shift = templateLength - 1;
          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];
            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];
              if (i0 >= 0) {
                bit = bitmap[i0][j0];
                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }

  // 6.3.2 Generic Refinement Region Decoding Procedure
  function decodeRefinement(width, height, templateIndex, referenceBitmap,
                            offsetX, offsetY, prediction, at,
                            decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;
    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }

    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;

    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];

    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');

    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          error('JBIG2 error: prediction is not supported');
        }
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;
        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1; // out of bound pixel
          } else {
            contextLabel = (contextLabel << 1) | bitmap[i0][j0];
          }
        }
        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] + offsetY;
          j0 = j + referenceTemplateX[k] + offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 ||
              j0 >= referenceWidth) {
            contextLabel <<= 1; // out of bound pixel
          } else {
            contextLabel = (contextLabel << 1) | referenceBitmap[i0][j0];
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }

    return bitmap;
  }

  // 6.5.5 Decoding the symbol dictionary
  function decodeSymbolDictionary(huffman, refinement, symbols,
                                  numberOfNewSymbols, numberOfExportedSymbols,
                                  huffmanTables, templateIndex, at,
                                  refinementTemplateIndex, refinementAt,
                                  decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }

    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);

    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;

    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = decodeInteger(contextCache, 'IADH', decoder); // 6.5.6
      currentHeight += deltaHeight;
      var currentWidth = 0;
      var totalWidth = 0;
      while (true) {
        var deltaWidth = decodeInteger(contextCache, 'IADW', decoder); // 6.5.7
        if (deltaWidth === null) {
          break; // OOB
        }
        currentWidth += deltaWidth;
        totalWidth += currentWidth;
        var bitmap;
        if (refinement) {
          // 6.5.8.2 Refinement/aggregate-coded symbol bitmap
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);
          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement,
                                      currentWidth, currentHeight, 0,
                                      numberOfInstances, 1, //strip size
                                      symbols.concat(newSymbols),
                                      symbolCodeLength,
                                      0, //transposed
                                      0, //ds offset
                                      1, //top left 7.4.3.1.1
                                      0, //OR operator
                                      huffmanTables,
                                      refinementTemplateIndex, refinementAt,
                                      decodingContext);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, 'IARDX', decoder); // 6.4.11.3
            var rdy = decodeInteger(contextCache, 'IARDY', decoder); // 6.4.11.4
            var symbol = (symbolId < symbols.length ? symbols[symbolId] :
                          newSymbols[symbolId - symbols.length]);
            bitmap = decodeRefinement(currentWidth, currentHeight,
            refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt,
            decodingContext);
          }
        } else {
          // 6.5.8.1 Direct-coded symbol bitmap
          bitmap = decodeBitmap(false, currentWidth, currentHeight,
            templateIndex, false, null, at, decodingContext);
        }
        newSymbols.push(bitmap);
      }
    }
    // 6.5.10 Exported symbols
    var exportedSymbols = [];
    var flags = [], currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;
    while (flags.length < totalSymbolsLength) {
      var runLength = decodeInteger(contextCache, 'IAEX', decoder);
      while (runLength--) {
        flags.push(currentFlag);
      }
      currentFlag = !currentFlag;
    }
    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }
    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }
    return exportedSymbols;
  }

  function decodeTextRegion(huffman, refinement, width, height,
                            defaultPixelValue, numberOfSymbolInstances,
                            stripSize, inputSymbols, symbolCodeLength,
                            transposed, dsOffset, referenceCorner,
                            combinationOperator, huffmanTables,
                            refinementTemplateIndex, refinementAt,
                            decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }

    // Prepare bitmap
    var bitmap = [];
    var i, row;
    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }
      bitmap.push(row);
    }

    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = -decodeInteger(contextCache, 'IADT', decoder); // 6.4.6
    var firstS = 0;
    i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = decodeInteger(contextCache, 'IADT', decoder); // 6.4.6
      stripT += deltaT;

      var deltaFirstS = decodeInteger(contextCache, 'IAFS', decoder); // 6.4.7
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = (stripSize === 1 ? 0 :
                        decodeInteger(contextCache, 'IAIT', decoder)); // 6.4.9
        var t = stripSize * stripT + currentT;
        var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = (refinement &&
                               decodeInteger(contextCache, 'IARI', decoder));
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder); // 6.4.11.1
          var rdh = decodeInteger(contextCache, 'IARDH', decoder); // 6.4.11.2
          var rdx = decodeInteger(contextCache, 'IARDX', decoder); // 6.4.11.3
          var rdy = decodeInteger(contextCache, 'IARDY', decoder); // 6.4.11.4
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight,
            refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx,
            (rdh >> 1) + rdy, false, refinementAt,
            decodingContext);
        }
        var offsetT = t - ((referenceCorner & 1) ? 0 : symbolHeight);
        var offsetS = currentS - ((referenceCorner & 2) ? symbolWidth : 0);
        var s2, t2, symbolRow;
        if (transposed) {
          // Place Symbol Bitmap from T1,S1
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[s2];
            // To ignore Parts of Symbol bitmap which goes
            // outside bitmap region
            var maxWidth = Math.min(width - offsetT, symbolWidth);
            switch (combinationOperator) {
              case 0: // OR
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }
                break;
              case 2: // XOR
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator +
                      ' is not supported');
            }
          }
          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[t2];
            switch (combinationOperator) {
              case 0: // OR
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }
                break;
              case 2: // XOR
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator +
                      ' is not supported');
            }
          }
          currentS += symbolWidth - 1;
        }
        i++;
        var deltaS = decodeInteger(contextCache, 'IADS', decoder); // 6.4.8
        if (deltaS === null) {
          break; // OOB
        }
        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }

  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;
    if (!SegmentTypes[segmentType]) {
      error('JBIG2 error: invalid segment type: ' + segmentType);
    }
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);

    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = (referredFlags >> 5) & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags === 7) {
      referredToCount = readUint32(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = (referredToCount + 7) >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      error('JBIG2 error: invalid referred-to flags');
    }

    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = (segmentHeader.number <= 256 ? 1 :
      (segmentHeader.number <= 65536 ? 2 : 4));
    var referredTo = [];
    var i, ii;
    for (i = 0; i < referredToCount; i++) {
      var number = (referredToSegmentNumberSize === 1 ? data[position] :
        (referredToSegmentNumberSize === 2 ? readUint16(data, position) :
        readUint32(data, position)));
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    position += 4;

    if (segmentHeader.length === 0xFFFFFFFF) {
      // 7.2.7 Segment data length, unknown segment length
      if (segmentType === 38) { // ImmediateGenericRegion
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position +
          RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        // searching for the segment end
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);
        if (!genericRegionMmr) {
          searchPattern[0] = 0xFF;
          searchPattern[1] = 0xAC;
        }
        searchPattern[2] = (genericRegionInfo.height >>> 24) & 0xFF;
        searchPattern[3] = (genericRegionInfo.height >> 16) & 0xFF;
        searchPattern[4] = (genericRegionInfo.height >> 8) & 0xFF;
        searchPattern[5] = genericRegionInfo.height & 0xFF;
        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;
          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }
          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }
        if (segmentHeader.length === 0xFFFFFFFF) {
          error('JBIG2 error: segment end was not found');
        }
      } else {
        error('JBIG2 error: invalid unknown segment length');
      }
    }
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }

  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;
    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };
      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }
      segments.push(segment);
      if (segmentHeader.type === 51) {
        break; // end of file is found
      }
    }
    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }
    return segments;
  }

  // 7.4.1 Region segment information field
  function readRegionSegmentInformation(data, start) {
    return {
      width: readUint32(data, start),
      height: readUint32(data, start + 4),
      x: readUint32(data, start + 8),
      y: readUint32(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }
  var RegionSegmentInformationFieldLength = 17;

  function processSegment(segment, visitor) {
    var header = segment.header;

    var data = segment.data, position = segment.start, end = segment.end;
    var args, at, i, atLength;
    switch (header.type) {
      case 0: // SymbolDictionary
        // 7.4.2 Symbol dictionary segment syntax
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position); // 7.4.2.1.1
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = (dictionaryFlags >> 2) & 3;
        dictionary.huffmanDWSelector = (dictionaryFlags >> 4) & 3;
        dictionary.bitmapSizeSelector = (dictionaryFlags >> 6) & 1;
        dictionary.aggregationInstancesSelector = (dictionaryFlags >> 7) & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = (dictionaryFlags >> 10) & 3;
        dictionary.refinementTemplate = (dictionaryFlags >> 12) & 1;
        position += 2;
        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo,
                data, position, end];
        break;
      case 6: // ImmediateTextRegion
      case 7: // ImmediateLosslessTextRegion
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.stripSize = 1 << ((textRegionSegmentFlags >> 2) & 3);
        textRegion.referenceCorner = (textRegionSegmentFlags >> 4) & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = (textRegionSegmentFlags >> 7) & 3;
        textRegion.defaultPixelValue = (textRegionSegmentFlags >> 9) & 1;
        textRegion.dsOffset = (textRegionSegmentFlags << 17) >> 27;
        textRegion.refinementTemplate = (textRegionSegmentFlags >> 15) & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = (textRegionHuffmanFlags) & 3;
          textRegion.huffmanDS = (textRegionHuffmanFlags >> 2) & 3;
          textRegion.huffmanDT = (textRegionHuffmanFlags >> 4) & 3;
          textRegion.huffmanRefinementDW = (textRegionHuffmanFlags >> 6) & 3;
          textRegion.huffmanRefinementDH = (textRegionHuffmanFlags >> 8) & 3;
          textRegion.huffmanRefinementDX = (textRegionHuffmanFlags >> 10) & 3;
          textRegion.huffmanRefinementDY = (textRegionHuffmanFlags >> 12) & 3;
          textRegion.huffmanRefinementSizeSelector =
            !!(textRegionHuffmanFlags & 14);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        // TODO 7.4.3.1.7 Symbol ID Huffman table decoding
        if (textRegion.huffman) {
          error('JBIG2 error: huffman is not supported');
        }
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 38: // ImmediateGenericRegion
      case 39: // ImmediateLosslessGenericRegion
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = (genericRegionSegmentFlags >> 1) & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48: // PageInformation
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height === 0xFFFFFFFF) {
          delete pageInfo.height;
        }
        var pageSegmentFlags = data[position + 16];
        var pageStripingInformation = readUint16(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = (pageSegmentFlags >> 2) & 1;
        pageInfo.combinationOperator = (pageSegmentFlags >> 3) & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 49: // EndOfPage
        break;
      case 50: // EndOfStripe
        break;
      case 51: // EndOfFile
        break;
      case 62: // 7.4.15 defines 2 extension types which
               // are comments and can be ignored.
        break;
      default:
        error('JBIG2 error: segment type ' + header.typeName + '(' +
              header.type + ') is not implemented');
    }
    var callbackName = 'on' + header.typeName;
    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }

  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }

  function parseJbig2(data, start, end) {
    var position = start;
    if (data[position] !== 0x97 || data[position + 1] !== 0x4A ||
        data[position + 2] !== 0x42 || data[position + 3] !== 0x32 ||
        data[position + 4] !== 0x0D || data[position + 5] !== 0x0A ||
        data[position + 6] !== 0x1A || data[position + 7] !== 0x0A) {
      error('JBIG2 error: invalid header');
    }
    var header = {};
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    var segments = readSegments(header, data, position, end);
    error('Not implemented');
    // processSegments(segments, new SimpleSegmentVisitor());
  }

  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();
    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }
    return visitor.buffer;
  }

  function SimpleSegmentVisitor() {}

  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = (info.width + 7) >> 3;
      var buffer = new Uint8Array(rowSize * info.height);
      // The contents of ArrayBuffers are initialized to 0.
      // Fill the buffer with 0xFF only if info.defaultPixelValue is set
      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xFF;
        }
      }
      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width, height = regionInfo.height;
      var rowSize = (pageInfo.width + 7) >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ?
        regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 =  128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;
      switch (combinationOperator) {
        case 0: // OR
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
        break;
        case 2: // XOR
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        default:
          error('JBIG2 error: operator ' + combinationOperator +
                ' is not supported');
      }
    },
    onImmediateGenericRegion:
      function SimpleSegmentVisitor_onImmediateGenericRegion(region, data,
                                                             start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height,
                                region.template, region.prediction, null,
                                region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion:
      function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary:
      function SimpleSegmentVisitor_onSymbolDictionary(dictionary,
                                                       currentSegment,
                                                       referredSegments,
                                                       data, start, end) {
      var huffmanTables;
      if (dictionary.huffman) {
        error('JBIG2 error: huffman is not supported');
      }

      // Combines exported symbols from all referred segments
      var symbols = this.symbols;
      if (!symbols) {
        this.symbols = symbols = {};
      }

      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }

      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman,
        dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols,
        dictionary.numberOfExportedSymbols, huffmanTables,
        dictionary.template, dictionary.at,
        dictionary.refinementTemplate, dictionary.refinementAt,
        decodingContext);
    },
    onImmediateTextRegion:
      function SimpleSegmentVisitor_onImmediateTextRegion(region,
                                                          referredSegments,
                                                          data, start, end) {
      var regionInfo = region.info;
      var huffmanTables;

      // Combines exported symbols from all referred segments
      var symbols = this.symbols;
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var symbolCodeLength = log2(inputSymbols.length);

      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement,
        regionInfo.width, regionInfo.height, region.defaultPixelValue,
        region.numberOfSymbolInstances, region.stripSize, inputSymbols,
        symbolCodeLength, region.transposed, region.dsOffset,
        region.referenceCorner, region.combinationOperator, huffmanTables,
        region.refinementTemplate, region.refinementAt, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion:
      function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    }
  };

  function Jbig2Image() {}

  Jbig2Image.prototype = {
    parseChunks: function Jbig2Image_parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    }
  };

  return Jbig2Image;
})();

exports.Jbig2Image = Jbig2Image;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreJpx = {}), root.pdfjsSharedUtil,
      root.pdfjsCoreArithmeticDecoder);
  }
}(this, function (exports, sharedUtil, coreArithmeticDecoder) {

var info = sharedUtil.info;
var log2 = sharedUtil.log2;
var readUint16 = sharedUtil.readUint16;
var readUint32 = sharedUtil.readUint32;
var warn = sharedUtil.warn;
var ArithmeticDecoder = coreArithmeticDecoder.ArithmeticDecoder;

var JpxImage = (function JpxImageClosure() {
  // Table E.1
  var SubbandsGainLog2 = {
    'LL': 0,
    'LH': 1,
    'HL': 1,
    'HH': 2
  };
  function JpxImage() {
    this.failOnCorruptedImage = false;
  }
  JpxImage.prototype = {
    parse: function JpxImage_parse(data) {

      var head = readUint16(data, 0);
      // No box header, immediate start of codestream (SOC)
      if (head === 0xFF4F) {
        this.parseCodestream(data, 0, data.length);
        return;
      }

      var position = 0, length = data.length;
      while (position < length) {
        var headerSize = 8;
        var lbox = readUint32(data, position);
        var tbox = readUint32(data, position + 4);
        position += headerSize;
        if (lbox === 1) {
          // XLBox: read UInt64 according to spec.
          // JavaScript's int precision of 53 bit should be sufficient here.
          lbox = readUint32(data, position) * 4294967296 +
                 readUint32(data, position + 4);
          position += 8;
          headerSize += 8;
        }
        if (lbox === 0) {
          lbox = length - position + headerSize;
        }
        if (lbox < headerSize) {
          throw new Error('JPX Error: Invalid box field size');
        }
        var dataLength = lbox - headerSize;
        var jumpDataLength = true;
        switch (tbox) {
          case 0x6A703268: // 'jp2h'
            jumpDataLength = false; // parsing child boxes
            break;
          case 0x636F6C72: // 'colr'
            // Colorspaces are not used, the CS from the PDF is used.
            var method = data[position];
            if (method === 1) {
              // enumerated colorspace
              var colorspace = readUint32(data, position + 3);
              switch (colorspace) {
                case 16: // this indicates a sRGB colorspace
                case 17: // this indicates a grayscale colorspace
                case 18: // this indicates a YUV colorspace
                  break;
                default:
                  warn('Unknown colorspace ' + colorspace);
                  break;
              }
            } else if (method === 2) {
              info('ICC profile not supported');
            }
            break;
          case 0x6A703263: // 'jp2c'
            this.parseCodestream(data, position, position + dataLength);
            break;
          case 0x6A502020: // 'jP\024\024'
            if (0x0d0a870a !== readUint32(data, position)) {
              warn('Invalid JP2 signature');
            }
            break;
          // The following header types are valid but currently not used:
          case 0x6A501A1A: // 'jP\032\032'
          case 0x66747970: // 'ftyp'
          case 0x72726571: // 'rreq'
          case 0x72657320: // 'res '
          case 0x69686472: // 'ihdr'
            break;
          default:
            var headerType = String.fromCharCode((tbox >> 24) & 0xFF,
                                                 (tbox >> 16) & 0xFF,
                                                 (tbox >> 8) & 0xFF,
                                                 tbox & 0xFF);
            warn('Unsupported header type ' + tbox + ' (' + headerType + ')');
            break;
        }
        if (jumpDataLength) {
          position += dataLength;
        }
      }
    },
    parseImageProperties: function JpxImage_parseImageProperties(stream) {
      var newByte = stream.getByte();
      while (newByte >= 0) {
        var oldByte = newByte;
        newByte = stream.getByte();
        var code = (oldByte << 8) | newByte;
        // Image and tile size (SIZ)
        if (code === 0xFF51) {
          stream.skip(4);
          var Xsiz = stream.getInt32() >>> 0; // Byte 4
          var Ysiz = stream.getInt32() >>> 0; // Byte 8
          var XOsiz = stream.getInt32() >>> 0; // Byte 12
          var YOsiz = stream.getInt32() >>> 0; // Byte 16
          stream.skip(16);
          var Csiz = stream.getUint16(); // Byte 36
          this.width = Xsiz - XOsiz;
          this.height = Ysiz - YOsiz;
          this.componentsCount = Csiz;
          // Results are always returned as Uint8Arrays
          this.bitsPerComponent = 8;
          return;
        }
      }
      throw new Error('JPX Error: No size marker found in JPX stream');
    },
    parseCodestream: function JpxImage_parseCodestream(data, start, end) {
      var context = {};
      try {
        var doNotRecover = false;
        var position = start;
        while (position + 1 < end) {
          var code = readUint16(data, position);
          position += 2;

          var length = 0, j, sqcd, spqcds, spqcdSize, scalarExpounded, tile;
          switch (code) {
            case 0xFF4F: // Start of codestream (SOC)
              context.mainHeader = true;
              break;
            case 0xFFD9: // End of codestream (EOC)
              break;
            case 0xFF51: // Image and tile size (SIZ)
              length = readUint16(data, position);
              var siz = {};
              siz.Xsiz = readUint32(data, position + 4);
              siz.Ysiz = readUint32(data, position + 8);
              siz.XOsiz = readUint32(data, position + 12);
              siz.YOsiz = readUint32(data, position + 16);
              siz.XTsiz = readUint32(data, position + 20);
              siz.YTsiz = readUint32(data, position + 24);
              siz.XTOsiz = readUint32(data, position + 28);
              siz.YTOsiz = readUint32(data, position + 32);
              var componentsCount = readUint16(data, position + 36);
              siz.Csiz = componentsCount;
              var components = [];
              j = position + 38;
              for (var i = 0; i < componentsCount; i++) {
                var component = {
                  precision: (data[j] & 0x7F) + 1,
                  isSigned: !!(data[j] & 0x80),
                  XRsiz: data[j + 1],
                  YRsiz: data[j + 1]
                };
                calculateComponentDimensions(component, siz);
                components.push(component);
              }
              context.SIZ = siz;
              context.components = components;
              calculateTileGrids(context, components);
              context.QCC = [];
              context.COC = [];
              break;
            case 0xFF5C: // Quantization default (QCD)
              length = readUint16(data, position);
              var qcd = {};
              j = position + 2;
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('JPX Error: Invalid SQcd value ' + sqcd);
              }
              qcd.noQuantization = (spqcdSize === 8);
              qcd.scalarExpounded = scalarExpounded;
              qcd.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                var spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = ((data[j] & 0x7) << 8) | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcd.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCD = qcd;
              } else {
                context.currentTile.QCD = qcd;
                context.currentTile.QCC = [];
              }
              break;
            case 0xFF5D: // Quantization component (QCC)
              length = readUint16(data, position);
              var qcc = {};
              j = position + 2;
              var cqcc;
              if (context.SIZ.Csiz < 257) {
                cqcc = data[j++];
              } else {
                cqcc = readUint16(data, j);
                j += 2;
              }
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('JPX Error: Invalid SQcd value ' + sqcd);
              }
              qcc.noQuantization = (spqcdSize === 8);
              qcc.scalarExpounded = scalarExpounded;
              qcc.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < (length + position)) {
                spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = ((data[j] & 0x7) << 8) | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcc.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCC[cqcc] = qcc;
              } else {
                context.currentTile.QCC[cqcc] = qcc;
              }
              break;
            case 0xFF52: // Coding style default (COD)
              length = readUint16(data, position);
              var cod = {};
              j = position + 2;
              var scod = data[j++];
              cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
              cod.sopMarkerUsed = !!(scod & 2);
              cod.ephMarkerUsed = !!(scod & 4);
              cod.progressionOrder = data[j++];
              cod.layersCount = readUint16(data, j);
              j += 2;
              cod.multipleComponentTransform = data[j++];

              cod.decompositionLevelsCount = data[j++];
              cod.xcb = (data[j++] & 0xF) + 2;
              cod.ycb = (data[j++] & 0xF) + 2;
              var blockStyle = data[j++];
              cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
              cod.resetContextProbabilities = !!(blockStyle & 2);
              cod.terminationOnEachCodingPass = !!(blockStyle & 4);
              cod.verticalyStripe = !!(blockStyle & 8);
              cod.predictableTermination = !!(blockStyle & 16);
              cod.segmentationSymbolUsed = !!(blockStyle & 32);
              cod.reversibleTransformation = data[j++];
              if (cod.entropyCoderWithCustomPrecincts) {
                var precinctsSizes = [];
                while (j < length + position) {
                  var precinctsSize = data[j++];
                  precinctsSizes.push({
                    PPx: precinctsSize & 0xF,
                    PPy: precinctsSize >> 4
                  });
                }
                cod.precinctsSizes = precinctsSizes;
              }
              var unsupported = [];
              if (cod.selectiveArithmeticCodingBypass) {
                unsupported.push('selectiveArithmeticCodingBypass');
              }
              if (cod.resetContextProbabilities) {
                unsupported.push('resetContextProbabilities');
              }
              if (cod.terminationOnEachCodingPass) {
                unsupported.push('terminationOnEachCodingPass');
              }
              if (cod.verticalyStripe) {
                unsupported.push('verticalyStripe');
              }
              if (cod.predictableTermination) {
                unsupported.push('predictableTermination');
              }
              if (unsupported.length > 0) {
                doNotRecover = true;
                throw new Error('JPX Error: Unsupported COD options (' +
                                unsupported.join(', ') + ')');
              }
              if (context.mainHeader) {
                context.COD = cod;
              } else {
                context.currentTile.COD = cod;
                context.currentTile.COC = [];
              }
              break;
            case 0xFF90: // Start of tile-part (SOT)
              length = readUint16(data, position);
              tile = {};
              tile.index = readUint16(data, position + 2);
              tile.length = readUint32(data, position + 4);
              tile.dataEnd = tile.length + position - 2;
              tile.partIndex = data[position + 8];
              tile.partsCount = data[position + 9];

              context.mainHeader = false;
              if (tile.partIndex === 0) {
                // reset component specific settings
                tile.COD = context.COD;
                tile.COC = context.COC.slice(0); // clone of the global COC
                tile.QCD = context.QCD;
                tile.QCC = context.QCC.slice(0); // clone of the global COC
              }
              context.currentTile = tile;
              break;
            case 0xFF93: // Start of data (SOD)
              tile = context.currentTile;
              if (tile.partIndex === 0) {
                initializeTile(context, tile.index);
                buildPackets(context);
              }

              // moving to the end of the data
              length = tile.dataEnd - position;
              parseTilePackets(context, data, position, length);
              break;
            case 0xFF55: // Tile-part lengths, main header (TLM)
            case 0xFF57: // Packet length, main header (PLM)
            case 0xFF58: // Packet length, tile-part header (PLT)
            case 0xFF64: // Comment (COM)
              length = readUint16(data, position);
              // skipping content
              break;
            case 0xFF53: // Coding style component (COC)
              throw new Error('JPX Error: Codestream code 0xFF53 (COC) is ' +
                              'not implemented');
            default:
              throw new Error('JPX Error: Unknown codestream code: ' +
                              code.toString(16));
          }
          position += length;
        }
      } catch (e) {
        if (doNotRecover || this.failOnCorruptedImage) {
          throw e;
        } else {
          warn('Trying to recover from ' + e.message);
        }
      }
      this.tiles = transformComponents(context);
      this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
      this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
      this.componentsCount = context.SIZ.Csiz;
    }
  };
  function calculateComponentDimensions(component, siz) {
    // Section B.2 Component mapping
    component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
    component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
    component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
    component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
    component.width = component.x1 - component.x0;
    component.height = component.y1 - component.y0;
  }
  function calculateTileGrids(context, components) {
    var siz = context.SIZ;
    // Section B.3 Division into tile and tile-components
    var tile, tiles = [];
    var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
    var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
    for (var q = 0; q < numYtiles; q++) {
      for (var p = 0; p < numXtiles; p++) {
        tile = {};
        tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
        tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
        tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
        tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
        tile.width = tile.tx1 - tile.tx0;
        tile.height = tile.ty1 - tile.ty0;
        tile.components = [];
        tiles.push(tile);
      }
    }
    context.tiles = tiles;

    var componentsCount = siz.Csiz;
    for (var i = 0, ii = componentsCount; i < ii; i++) {
      var component = components[i];
      for (var j = 0, jj = tiles.length; j < jj; j++) {
        var tileComponent = {};
        tile = tiles[j];
        tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
        tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
        tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
        tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
        tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
        tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
        tile.components[i] = tileComponent;
      }
    }
  }
  function getBlocksDimensions(context, component, r) {
    var codOrCoc = component.codingStyleParameters;
    var result = {};
    if (!codOrCoc.entropyCoderWithCustomPrecincts) {
      result.PPx = 15;
      result.PPy = 15;
    } else {
      result.PPx = codOrCoc.precinctsSizes[r].PPx;
      result.PPy = codOrCoc.precinctsSizes[r].PPy;
    }
    // calculate codeblock size as described in section B.7
    result.xcb_ = (r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) :
                   Math.min(codOrCoc.xcb, result.PPx));
    result.ycb_ = (r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) :
                   Math.min(codOrCoc.ycb, result.PPy));
    return result;
  }
  function buildPrecincts(context, resolution, dimensions) {
    // Section B.6 Division resolution to precincts
    var precinctWidth = 1 << dimensions.PPx;
    var precinctHeight = 1 << dimensions.PPy;
    // Jasper introduces codeblock groups for mapping each subband codeblocks
    // to precincts. Precinct partition divides a resolution according to width
    // and height parameters. The subband that belongs to the resolution level
    // has a different size than the level, unless it is the zero resolution.

    // From Jasper documentation: jpeg2000.pdf, section K: Tier-2 coding:
    // The precinct partitioning for a particular subband is derived from a
    // partitioning of its parent LL band (i.e., the LL band at the next higher
    // resolution level)... The LL band associated with each resolution level is
    // divided into precincts... Each of the resulting precinct regions is then
    // mapped into its child subbands (if any) at the next lower resolution
    // level. This is accomplished by using the coordinate transformation
    // (u, v) = (ceil(x/2), ceil(y/2)) where (x, y) and (u, v) are the
    // coordinates of a point in the LL band and child subband, respectively.
    var isZeroRes = resolution.resLevel === 0;
    var precinctWidthInSubband = 1 << (dimensions.PPx + (isZeroRes ? 0 : -1));
    var precinctHeightInSubband = 1 << (dimensions.PPy + (isZeroRes ? 0 : -1));
    var numprecinctswide = (resolution.trx1 > resolution.trx0 ?
      Math.ceil(resolution.trx1 / precinctWidth) -
      Math.floor(resolution.trx0 / precinctWidth) : 0);
    var numprecinctshigh = (resolution.try1 > resolution.try0 ?
      Math.ceil(resolution.try1 / precinctHeight) -
      Math.floor(resolution.try0 / precinctHeight) : 0);
    var numprecincts = numprecinctswide * numprecinctshigh;

    resolution.precinctParameters = {
      precinctWidth: precinctWidth,
      precinctHeight: precinctHeight,
      numprecinctswide: numprecinctswide,
      numprecinctshigh: numprecinctshigh,
      numprecincts: numprecincts,
      precinctWidthInSubband: precinctWidthInSubband,
      precinctHeightInSubband: precinctHeightInSubband
    };
  }
  function buildCodeblocks(context, subband, dimensions) {
    // Section B.7 Division sub-band into code-blocks
    var xcb_ = dimensions.xcb_;
    var ycb_ = dimensions.ycb_;
    var codeblockWidth = 1 << xcb_;
    var codeblockHeight = 1 << ycb_;
    var cbx0 = subband.tbx0 >> xcb_;
    var cby0 = subband.tby0 >> ycb_;
    var cbx1 = (subband.tbx1 + codeblockWidth - 1) >> xcb_;
    var cby1 = (subband.tby1 + codeblockHeight - 1) >> ycb_;
    var precinctParameters = subband.resolution.precinctParameters;
    var codeblocks = [];
    var precincts = [];
    var i, j, codeblock, precinctNumber;
    for (j = cby0; j < cby1; j++) {
      for (i = cbx0; i < cbx1; i++) {
        codeblock = {
          cbx: i,
          cby: j,
          tbx0: codeblockWidth * i,
          tby0: codeblockHeight * j,
          tbx1: codeblockWidth * (i + 1),
          tby1: codeblockHeight * (j + 1)
        };

        codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
        codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
        codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
        codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);

        // Calculate precinct number for this codeblock, codeblock position
        // should be relative to its subband, use actual dimension and position
        // See comment about codeblock group width and height
        var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) /
          precinctParameters.precinctWidthInSubband);
        var pj = Math.floor((codeblock.tby0_ - subband.tby0) /
          precinctParameters.precinctHeightInSubband);
        precinctNumber = pi + (pj * precinctParameters.numprecinctswide);

        codeblock.precinctNumber = precinctNumber;
        codeblock.subbandType = subband.type;
        codeblock.Lblock = 3;

        if (codeblock.tbx1_ <= codeblock.tbx0_ ||
            codeblock.tby1_ <= codeblock.tby0_) {
          continue;
        }
        codeblocks.push(codeblock);
        // building precinct for the sub-band
        var precinct = precincts[precinctNumber];
        if (precinct !== undefined) {
          if (i < precinct.cbxMin) {
            precinct.cbxMin = i;
          } else if (i > precinct.cbxMax) {
            precinct.cbxMax = i;
          }
          if (j < precinct.cbyMin) {
            precinct.cbxMin = j;
          } else if (j > precinct.cbyMax) {
            precinct.cbyMax = j;
          }
        } else {
          precincts[precinctNumber] = precinct = {
            cbxMin: i,
            cbyMin: j,
            cbxMax: i,
            cbyMax: j
          };
        }
        codeblock.precinct = precinct;
      }
    }
    subband.codeblockParameters = {
      codeblockWidth: xcb_,
      codeblockHeight: ycb_,
      numcodeblockwide: cbx1 - cbx0 + 1,
      numcodeblockhigh: cby1 - cby0 + 1
    };
    subband.codeblocks = codeblocks;
    subband.precincts = precincts;
  }
  function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    // Section B.10.8 Order of info in packet
    var subbands = resolution.subbands;
    // sub-bands already ordered in 'LL', 'HL', 'LH', and 'HH' sequence
    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;
      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];
        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }
        precinctCodeblocks.push(codeblock);
      }
    }
    return {
      layerNumber: layerNumber,
      codeblocks: precinctCodeblocks
    };
  }
  function LayerResolutionComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount,
        tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }

    var l = 0, r = 0, i = 0, k = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      // Section B.12.1.1 Layer-resolution-component-position
      for (; l < layersCount; l++) {
        for (; r <= maxDecompositionLevelsCount; r++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }

            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        r = 0;
      }
      throw new Error('JPX Error: Out of packets');
    };
  }
  function ResolutionLayerComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount,
        tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }

    var r = 0, l = 0, i = 0, k = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      // Section B.12.1.2 Resolution-layer-component-position
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; l < layersCount; l++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }

            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        l = 0;
      }
      throw new Error('JPX Error: Out of packets');
    };
  }
  function ResolutionPositionComponentLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var l, r, c, p;
    var maxDecompositionLevelsCount = 0;
    for (c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount,
        component.codingStyleParameters.decompositionLevelsCount);
    }
    var maxNumPrecinctsInLevel = new Int32Array(
      maxDecompositionLevelsCount + 1);
    for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
      var maxNumPrecincts = 0;
      for (c = 0; c < componentsCount; ++c) {
        var resolutions = tile.components[c].resolutions;
        if (r < resolutions.length) {
          maxNumPrecincts = Math.max(maxNumPrecincts,
            resolutions[r].precinctParameters.numprecincts);
        }
      }
      maxNumPrecinctsInLevel[r] = maxNumPrecincts;
    }
    l = 0;
    r = 0;
    c = 0;
    p = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      // Section B.12.1.3 Resolution-position-component-layer
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; p < maxNumPrecinctsInLevel[r]; p++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            if (p >= numprecincts) {
              continue;
            }
            for (; l < layersCount;) {
              var packet = createPacket(resolution, p, l);
              l++;
              return packet;
            }
            l = 0;
          }
          c = 0;
        }
        p = 0;
      }
      throw new Error('JPX Error: Out of packets');
    };
  }
  function PositionComponentResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var precinctsIterationSizes = precinctsSizes;
    var l = 0, r = 0, c = 0, px = 0, py = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      // Section B.12.1.4 Position-component-resolution-layer
      for (; py < precinctsIterationSizes.maxNumHigh; py++) {
        for (; px < precinctsIterationSizes.maxNumWide; px++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount =
              component.codingStyleParameters.decompositionLevelsCount;
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale =
                precinctsSizes.components[c].resolutions[r];
              var k = getPrecinctIndexIfExist(
                px,
                py,
                sizeInImageScale,
                precinctsIterationSizes,
                resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          c = 0;
        }
        px = 0;
      }
      throw new Error('JPX Error: Out of packets');
    };
  }
  function ComponentPositionResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var l = 0, r = 0, c = 0, px = 0, py = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      // Section B.12.1.5 Component-position-resolution-layer
      for (; c < componentsCount; ++c) {
        var component = tile.components[c];
        var precinctsIterationSizes = precinctsSizes.components[c];
        var decompositionLevelsCount =
          component.codingStyleParameters.decompositionLevelsCount;
        for (; py < precinctsIterationSizes.maxNumHigh; py++) {
          for (; px < precinctsIterationSizes.maxNumWide; px++) {
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsIterationSizes.resolutions[r];
              var k = getPrecinctIndexIfExist(
                px,
                py,
                sizeInImageScale,
                precinctsIterationSizes,
                resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          px = 0;
        }
        py = 0;
      }
      throw new Error('JPX Error: Out of packets');
    };
  }
  function getPrecinctIndexIfExist(
    pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
    var posX = pxIndex * precinctIterationSizes.minWidth;
    var posY = pyIndex * precinctIterationSizes.minHeight;
    if (posX % sizeInImageScale.width !== 0 ||
        posY % sizeInImageScale.height !== 0) {
      return null;
    }
    var startPrecinctRowIndex =
      (posY / sizeInImageScale.width) *
      resolution.precinctParameters.numprecinctswide;
    return (posX / sizeInImageScale.height) + startPrecinctRowIndex;
  }
  function getPrecinctSizesInImageScale(tile) {
    var componentsCount = tile.components.length;
    var minWidth = Number.MAX_VALUE;
    var minHeight = Number.MAX_VALUE;
    var maxNumWide = 0;
    var maxNumHigh = 0;
    var sizePerComponent = new Array(componentsCount);
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount =
        component.codingStyleParameters.decompositionLevelsCount;
      var sizePerResolution = new Array(decompositionLevelsCount + 1);
      var minWidthCurrentComponent = Number.MAX_VALUE;
      var minHeightCurrentComponent = Number.MAX_VALUE;
      var maxNumWideCurrentComponent = 0;
      var maxNumHighCurrentComponent = 0;
      var scale = 1;
      for (var r = decompositionLevelsCount; r >= 0; --r) {
        var resolution = component.resolutions[r];
        var widthCurrentResolution =
          scale * resolution.precinctParameters.precinctWidth;
        var heightCurrentResolution =
          scale * resolution.precinctParameters.precinctHeight;
        minWidthCurrentComponent = Math.min(
          minWidthCurrentComponent,
          widthCurrentResolution);
        minHeightCurrentComponent = Math.min(
          minHeightCurrentComponent,
          heightCurrentResolution);
        maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent,
          resolution.precinctParameters.numprecinctswide);
        maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent,
          resolution.precinctParameters.numprecinctshigh);
        sizePerResolution[r] = {
          width: widthCurrentResolution,
          height: heightCurrentResolution
        };
        scale <<= 1;
      }
      minWidth = Math.min(minWidth, minWidthCurrentComponent);
      minHeight = Math.min(minHeight, minHeightCurrentComponent);
      maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
      maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
      sizePerComponent[c] = {
        resolutions: sizePerResolution,
        minWidth: minWidthCurrentComponent,
        minHeight: minHeightCurrentComponent,
        maxNumWide: maxNumWideCurrentComponent,
        maxNumHigh: maxNumHighCurrentComponent
      };
    }
    return {
      components: sizePerComponent,
      minWidth: minWidth,
      minHeight: minHeight,
      maxNumWide: maxNumWide,
      maxNumHigh: maxNumHigh
    };
  }
  function buildPackets(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var componentsCount = siz.Csiz;
    // Creating resolutions and sub-bands for each component
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount =
        component.codingStyleParameters.decompositionLevelsCount;
      // Section B.5 Resolution levels and sub-bands
      var resolutions = [];
      var subbands = [];
      for (var r = 0; r <= decompositionLevelsCount; r++) {
        var blocksDimensions = getBlocksDimensions(context, component, r);
        var resolution = {};
        var scale = 1 << (decompositionLevelsCount - r);
        resolution.trx0 = Math.ceil(component.tcx0 / scale);
        resolution.try0 = Math.ceil(component.tcy0 / scale);
        resolution.trx1 = Math.ceil(component.tcx1 / scale);
        resolution.try1 = Math.ceil(component.tcy1 / scale);
        resolution.resLevel = r;
        buildPrecincts(context, resolution, blocksDimensions);
        resolutions.push(resolution);

        var subband;
        if (r === 0) {
          // one sub-band (LL) with last decomposition
          subband = {};
          subband.type = 'LL';
          subband.tbx0 = Math.ceil(component.tcx0 / scale);
          subband.tby0 = Math.ceil(component.tcy0 / scale);
          subband.tbx1 = Math.ceil(component.tcx1 / scale);
          subband.tby1 = Math.ceil(component.tcy1 / scale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolution.subbands = [subband];
        } else {
          var bscale = 1 << (decompositionLevelsCount - r + 1);
          var resolutionSubbands = [];
          // three sub-bands (HL, LH and HH) with rest of decompositions
          subband = {};
          subband.type = 'HL';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);

          subband = {};
          subband.type = 'LH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);

          subband = {};
          subband.type = 'HH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);

          resolution.subbands = resolutionSubbands;
        }
      }
      component.resolutions = resolutions;
      component.subbands = subbands;
    }
    // Generate the packets sequence
    var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
    switch (progressionOrder) {
      case 0:
        tile.packetsIterator =
          new LayerResolutionComponentPositionIterator(context);
        break;
      case 1:
        tile.packetsIterator =
          new ResolutionLayerComponentPositionIterator(context);
        break;
      case 2:
        tile.packetsIterator =
          new ResolutionPositionComponentLayerIterator(context);
        break;
      case 3:
        tile.packetsIterator =
          new PositionComponentResolutionLayerIterator(context);
        break;
      case 4:
        tile.packetsIterator =
          new ComponentPositionResolutionLayerIterator(context);
        break;
      default:
        throw new Error('JPX Error: Unsupported progression order ' +
                        progressionOrder);
    }
  }
  function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer, bufferSize = 0, skipNextBit = false;
    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;
        if (skipNextBit) {
          buffer = (buffer << 7) | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = (buffer << 8) | b;
          bufferSize += 8;
        }
        if (b === 0xFF) {
          skipNextBit = true;
        }
      }
      bufferSize -= count;
      return (buffer >>> bufferSize) & ((1 << count) - 1);
    }
    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xFF &&
          data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xFF &&
                 data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }
      return false;
    }
    function skipBytes(count) {
      position += count;
    }
    function alignToByte() {
      bufferSize = 0;
      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }
    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }
      if (readBits(1) === 0) {
        return 2;
      }
      var value = readBits(2);
      if (value < 3) {
        return value + 3;
      }
      value = readBits(5);
      if (value < 31) {
        return value + 6;
      }
      value = readBits(7);
      return value + 37;
    }
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;
    while (position < dataLength) {
      alignToByte();
      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        // Skip also marker segment length and packet sequence ID
        skipBytes(4);
      }
      var packet = packetsIterator.nextPacket();
      if (!readBits(1)) {
        continue;
      }
      var layerNumber = packet.layerNumber;
      var queue = [], codeblock;
      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;
        if (codeblock['included'] !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          // reading inclusion tree
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;
          if (precinct['inclusionTree'] !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            // building inclusion and zero bit-planes trees
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }

          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();
                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }
        if (!codeblockIncluded) {
          continue;
        }
        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();
              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }
          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }
        var codingpasses = readCodingpasses();
        while (readBits(1)) {
          codeblock.Lblock++;
        }
        var codingpassesLog2 = log2(codingpasses);
        // rounding down log2
        var bits = ((codingpasses < (1 << codingpassesLog2)) ?
          codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock: codeblock,
          codingpasses: codingpasses,
          dataLength: codedDataLength
        });
      }
      alignToByte();
      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }
      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;
        if (codeblock['data'] === undefined) {
          codeblock.data = [];
        }
        codeblock.data.push({
          data: data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }
    return position;
  }
  function copyCoefficients(coefficients, levelWidth, levelHeight, subband,
                            delta, mb, reversible, segmentationSymbolUsed) {
    var x0 = subband.tbx0;
    var y0 = subband.tby0;
    var width = subband.tbx1 - subband.tbx0;
    var codeblocks = subband.codeblocks;
    var right = subband.type.charAt(0) === 'H' ? 1 : 0;
    var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;

    for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
      var codeblock = codeblocks[i];
      var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
      var blockHeight = codeblock.tby1_ - codeblock.tby0_;
      if (blockWidth === 0 || blockHeight === 0) {
        continue;
      }
      if (codeblock['data'] === undefined) {
        continue;
      }

      var bitModel, currentCodingpassType;
      bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType,
                              codeblock.zeroBitPlanes, mb);
      currentCodingpassType = 2; // first bit plane starts from cleanup

      // collect data
      var data = codeblock.data, totalLength = 0, codingpasses = 0;
      var j, jj, dataItem;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        totalLength += dataItem.end - dataItem.start;
        codingpasses += dataItem.codingpasses;
      }
      var encodedData = new Uint8Array(totalLength);
      var position = 0;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
        encodedData.set(chunk, position);
        position += chunk.length;
      }
      // decoding the item
      var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
      bitModel.setDecoder(decoder);

      for (j = 0; j < codingpasses; j++) {
        switch (currentCodingpassType) {
          case 0:
            bitModel.runSignificancePropagationPass();
            break;
          case 1:
            bitModel.runMagnitudeRefinementPass();
            break;
          case 2:
            bitModel.runCleanupPass();
            if (segmentationSymbolUsed) {
              bitModel.checkSegmentationSymbol();
            }
            break;
        }
        currentCodingpassType = (currentCodingpassType + 1) % 3;
      }

      var offset = (codeblock.tbx0_ - x0) + (codeblock.tby0_ - y0) * width;
      var sign = bitModel.coefficentsSign;
      var magnitude = bitModel.coefficentsMagnitude;
      var bitsDecoded = bitModel.bitsDecoded;
      var magnitudeCorrection = reversible ? 0 : 0.5;
      var k, n, nb;
      position = 0;
      // Do the interleaving of Section F.3.3 here, so we do not need
      // to copy later. LL level is not interleaved, just copied.
      var interleave = (subband.type !== 'LL');
      for (j = 0; j < blockHeight; j++) {
        var row = (offset / width) | 0; // row in the non-interleaved subband
        var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
        for (k = 0; k < blockWidth; k++) {
          n = magnitude[position];
          if (n !== 0) {
            n = (n + magnitudeCorrection) * delta;
            if (sign[position] !== 0) {
              n = -n;
            }
            nb = bitsDecoded[position];
            var pos = interleave ? (levelOffset + (offset << 1)) : offset;
            if (reversible && (nb >= mb)) {
              coefficients[pos] = n;
            } else {
              coefficients[pos] = n * (1 << (mb - nb));
            }
          }
          offset++;
          position++;
        }
        offset += width - blockWidth;
      }
    }
  }
  function transformTile(context, tile, c) {
    var component = tile.components[c];
    var codingStyleParameters = component.codingStyleParameters;
    var quantizationParameters = component.quantizationParameters;
    var decompositionLevelsCount =
      codingStyleParameters.decompositionLevelsCount;
    var spqcds = quantizationParameters.SPqcds;
    var scalarExpounded = quantizationParameters.scalarExpounded;
    var guardBits = quantizationParameters.guardBits;
    var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
    var precision = context.components[c].precision;

    var reversible = codingStyleParameters.reversibleTransformation;
    var transform = (reversible ? new ReversibleTransform() :
                                  new IrreversibleTransform());

    var subbandCoefficients = [];
    var b = 0;
    for (var i = 0; i <= decompositionLevelsCount; i++) {
      var resolution = component.resolutions[i];

      var width = resolution.trx1 - resolution.trx0;
      var height = resolution.try1 - resolution.try0;
      // Allocate space for the whole sublevel.
      var coefficients = new Float32Array(width * height);

      for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
        var mu, epsilon;
        if (!scalarExpounded) {
          // formula E-5
          mu = spqcds[0].mu;
          epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
        } else {
          mu = spqcds[b].mu;
          epsilon = spqcds[b].epsilon;
          b++;
        }

        var subband = resolution.subbands[j];
        var gainLog2 = SubbandsGainLog2[subband.type];

        // calulate quantization coefficient (Section E.1.1.1)
        var delta = (reversible ? 1 :
          Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048));
        var mb = (guardBits + epsilon - 1);

        // In the first resolution level, copyCoefficients will fill the
        // whole array with coefficients. In the succeding passes,
        // copyCoefficients will consecutively fill in the values that belong
        // to the interleaved positions of the HL, LH, and HH coefficients.
        // The LL coefficients will then be interleaved in Transform.iterate().
        copyCoefficients(coefficients, width, height, subband, delta, mb,
                         reversible, segmentationSymbolUsed);
      }
      subbandCoefficients.push({
        width: width,
        height: height,
        items: coefficients
      });
    }

    var result = transform.calculate(subbandCoefficients,
                                     component.tcx0, component.tcy0);
    return {
      left: component.tcx0,
      top: component.tcy0,
      width: result.width,
      height: result.height,
      items: result.items
    };
  }
  function transformComponents(context) {
    var siz = context.SIZ;
    var components = context.components;
    var componentsCount = siz.Csiz;
    var resultImages = [];
    for (var i = 0, ii = context.tiles.length; i < ii; i++) {
      var tile = context.tiles[i];
      var transformedTiles = [];
      var c;
      for (c = 0; c < componentsCount; c++) {
        transformedTiles[c] = transformTile(context, tile, c);
      }
      var tile0 = transformedTiles[0];
      var out = new Uint8Array(tile0.items.length * componentsCount);
      var result = {
        left: tile0.left,
        top: tile0.top,
        width: tile0.width,
        height: tile0.height,
        items: out
      };

      // Section G.2.2 Inverse multi component transform
      var shift, offset, max, min, maxK;
      var pos = 0, j, jj, y0, y1, y2, r, g, b, k, val;
      if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
        var fourComponents = componentsCount === 4;
        var y0items = transformedTiles[0].items;
        var y1items = transformedTiles[1].items;
        var y2items = transformedTiles[2].items;
        var y3items = fourComponents ? transformedTiles[3].items : null;

        // HACK: The multiple component transform formulas below assume that
        // all components have the same precision. With this in mind, we
        // compute shift and offset only once.
        shift = components[0].precision - 8;
        offset = (128 << shift) + 0.5;
        max = 255 * (1 << shift);
        maxK = max * 0.5;
        min = -maxK;

        var component0 = tile.components[0];
        var alpha01 = componentsCount - 3;
        jj = y0items.length;
        if (!component0.codingStyleParameters.reversibleTransformation) {
          // inverse irreversible multiple component transform
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            r = y0 + 1.402 * y2;
            g = y0 - 0.34413 * y1 - 0.71414 * y2;
            b = y0 + 1.772 * y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        } else {
          // inverse reversible multiple component transform
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            g = y0 - ((y2 + y1) >> 2);
            r = g + y2;
            b = g + y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        }
        if (fourComponents) {
          for (j = 0, pos = 3; j < jj; j++, pos += 4) {
            k = y3items[j];
            out[pos] = k <= min ? 0 : k >= maxK ? 255 : (k + offset) >> shift;
          }
        }
      } else { // no multi-component transform
        for (c = 0; c < componentsCount; c++) {
          var items = transformedTiles[c].items;
          shift = components[c].precision - 8;
          offset = (128 << shift) + 0.5;
          max = (127.5 * (1 << shift));
          min = -max;
          for (pos = c, j = 0, jj = items.length; j < jj; j++) {
            val = items[j];
            out[pos] = val <= min ? 0 :
                       val >= max ? 255 : (val + offset) >> shift;
            pos += componentsCount;
          }
        }
      }
      resultImages.push(result);
    }
    return resultImages;
  }
  function initializeTile(context, tileIndex) {
    var siz = context.SIZ;
    var componentsCount = siz.Csiz;
    var tile = context.tiles[tileIndex];
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var qcdOrQcc = (context.currentTile.QCC[c] !== undefined ?
        context.currentTile.QCC[c] : context.currentTile.QCD);
      component.quantizationParameters = qcdOrQcc;
      var codOrCoc = (context.currentTile.COC[c] !== undefined  ?
        context.currentTile.COC[c] : context.currentTile.COD);
      component.codingStyleParameters = codOrCoc;
    }
    tile.codingStyleDefaultParameters = context.currentTile.COD;
  }

  // Section B.10.2 Tag trees
  var TagTree = (function TagTreeClosure() {
    function TagTree(width, height) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width: width,
          height: height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    TagTree.prototype = {
      reset: function TagTree_reset(i, j) {
        var currentLevel = 0, value = 0, level;
        while (currentLevel < this.levels.length) {
          level = this.levels[currentLevel];
          var index = i + j * level.width;
          if (level.items[index] !== undefined) {
            value = level.items[index];
            break;
          }
          level.index = index;
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        currentLevel--;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        this.currentLevel = currentLevel;
        delete this.value;
      },
      incrementValue: function TagTree_incrementValue() {
        var level = this.levels[this.currentLevel];
        level.items[level.index]++;
      },
      nextLevel: function TagTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        currentLevel--;
        if (currentLevel < 0) {
          this.value = value;
          return false;
        }

        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return TagTree;
  })();

  var InclusionTree = (function InclusionTreeClosure() {
    function InclusionTree(width, height,  defaultValue) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var items = new Uint8Array(width * height);
        for (var j = 0, jj = items.length; j < jj; j++) {
          items[j] = defaultValue;
        }

        var level = {
          width: width,
          height: height,
          items: items
        };
        this.levels.push(level);

        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    InclusionTree.prototype = {
      reset: function InclusionTree_reset(i, j, stopValue) {
        var currentLevel = 0;
        while (currentLevel < this.levels.length) {
          var level = this.levels[currentLevel];
          var index = i + j * level.width;
          level.index = index;
          var value = level.items[index];

          if (value === 0xFF) {
            break;
          }

          if (value > stopValue) {
            this.currentLevel = currentLevel;
            // already know about this one, propagating the value to top levels
            this.propagateValues();
            return false;
          }

          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        this.currentLevel = currentLevel - 1;
        return true;
      },
      incrementValue: function InclusionTree_incrementValue(stopValue) {
        var level = this.levels[this.currentLevel];
        level.items[level.index] = stopValue + 1;
        this.propagateValues();
      },
      propagateValues: function InclusionTree_propagateValues() {
        var levelIndex = this.currentLevel;
        var level = this.levels[levelIndex];
        var currentValue = level.items[level.index];
        while (--levelIndex >= 0) {
          level = this.levels[levelIndex];
          level.items[level.index] = currentValue;
        }
      },
      nextLevel: function InclusionTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        level.items[level.index] = 0xFF;
        currentLevel--;
        if (currentLevel < 0) {
          return false;
        }

        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return InclusionTree;
  })();

  // Section D. Coefficient bit modeling
  var BitModel = (function BitModelClosure() {
    var UNIFORM_CONTEXT = 17;
    var RUNLENGTH_CONTEXT = 18;
    // Table D-1
    // The index is binary presentation: 0dddvvhh, ddd - sum of Di (0..4),
    // vv - sum of Vi (0..2), and hh - sum of Hi (0..2)
    var LLAndLHContextsLabel = new Uint8Array([
      0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4,
      7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6,
      8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8
    ]);
    var HLContextLabel = new Uint8Array([
      0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8,
      8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3,
      4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8
    ]);
    var HHContextLabel = new Uint8Array([
      0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5,
      5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8,
      8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8
    ]);

    function BitModel(width, height, subband, zeroBitPlanes, mb) {
      this.width = width;
      this.height = height;

      this.contextLabelTable = (subband === 'HH' ? HHContextLabel :
        (subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel));

      var coefficientCount = width * height;

      // coefficients outside the encoding region treated as insignificant
      // add border state cells for significanceState
      this.neighborsSignificance = new Uint8Array(coefficientCount);
      this.coefficentsSign = new Uint8Array(coefficientCount);
      this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) :
                                  mb > 6 ? new Uint16Array(coefficientCount) :
                                  new Uint8Array(coefficientCount);
      this.processingFlags = new Uint8Array(coefficientCount);

      var bitsDecoded = new Uint8Array(coefficientCount);
      if (zeroBitPlanes !== 0) {
        for (var i = 0; i < coefficientCount; i++) {
          bitsDecoded[i] = zeroBitPlanes;
        }
      }
      this.bitsDecoded = bitsDecoded;

      this.reset();
    }

    BitModel.prototype = {
      setDecoder: function BitModel_setDecoder(decoder) {
        this.decoder = decoder;
      },
      reset: function BitModel_reset() {
        // We have 17 contexts that are accessed via context labels,
        // plus the uniform and runlength context.
        this.contexts = new Int8Array(19);

        // Contexts are packed into 1 byte:
        // highest 7 bits carry the index, lowest bit carries mps
        this.contexts[0] = (4 << 1) | 0;
        this.contexts[UNIFORM_CONTEXT] = (46 << 1) | 0;
        this.contexts[RUNLENGTH_CONTEXT] = (3 << 1) | 0;
      },
      setNeighborsSignificance:
        function BitModel_setNeighborsSignificance(row, column, index) {
        var neighborsSignificance = this.neighborsSignificance;
        var width = this.width, height = this.height;
        var left = (column > 0);
        var right = (column + 1 < width);
        var i;

        if (row > 0) {
          i = index - width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }

        if (row + 1 < height) {
          i = index + width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }

        if (left) {
          neighborsSignificance[index - 1] += 0x01;
        }
        if (right) {
          neighborsSignificance[index + 1] += 0x01;
        }
        neighborsSignificance[index] |= 0x80;
      },
      runSignificancePropagationPass:
        function BitModel_runSignificancePropagationPass() {
        var decoder = this.decoder;
        var width = this.width, height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var neighborsSignificance = this.neighborsSignificance;
        var processingFlags = this.processingFlags;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processedInverseMask = ~1;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;

        for (var i0 = 0; i0 < height; i0 += 4) {
          for (var j = 0; j < width; j++) {
            var index = i0 * width + j;
            for (var i1 = 0; i1 < 4; i1++, index += width) {
              var i = i0 + i1;
              if (i >= height) {
                break;
              }
              // clear processed flag first
              processingFlags[index] &= processedInverseMask;

              if (coefficentsMagnitude[index] ||
                  !neighborsSignificance[index]) {
                continue;
              }

              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision) {
                var sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
        var width = this.width, height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contribution, sign0, sign1, significance1;
        var contextLabel, decoded;

        // calculate horizontal contribution
        significance1 = (column > 0 && coefficentsMagnitude[index - 1] !== 0);
        if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
          sign1 = coefficentsSign[index + 1];
          if (significance1) {
            sign0 = coefficentsSign[index - 1];
            contribution = 1 - sign1 - sign0;
          } else {
            contribution = 1 - sign1 - sign1;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - 1];
          contribution = 1 - sign0 - sign0;
        } else {
          contribution = 0;
        }
        var horizontalContribution = 3 * contribution;

        // calculate vertical contribution and combine with the horizontal
        significance1 = (row > 0 && coefficentsMagnitude[index - width] !== 0);
        if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
          sign1 = coefficentsSign[index + width];
          if (significance1) {
            sign0 = coefficentsSign[index - width];
            contribution = 1 - sign1 - sign0 + horizontalContribution;
          } else {
            contribution = 1 - sign1 - sign1 + horizontalContribution;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - width];
          contribution = 1 - sign0 - sign0 + horizontalContribution;
        } else {
          contribution = horizontalContribution;
        }

        if (contribution >= 0) {
          contextLabel = 9 + contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel);
        } else {
          contextLabel = 9 - contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
        }
        return decoded;
      },
      runMagnitudeRefinementPass:
        function BitModel_runMagnitudeRefinementPass() {
        var decoder = this.decoder;
        var width = this.width, height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var neighborsSignificance = this.neighborsSignificance;
        var contexts = this.contexts;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var length = width * height;
        var width4 = width * 4;

        for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
          indexNext = Math.min(length, index0 + width4);
          for (var j = 0; j < width; j++) {
            for (var index = index0 + j; index < indexNext; index += width) {

              // significant but not those that have just become
              if (!coefficentsMagnitude[index] ||
                (processingFlags[index] & processedMask) !== 0) {
                continue;
              }

              var contextLabel = 16;
              if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                processingFlags[index] ^= firstMagnitudeBitMask;
                // first refinement
               var significance = neighborsSignificance[index] & 127;
               contextLabel = significance === 0 ? 15 : 14;
              }

              var bit = decoder.readBit(contexts, contextLabel);
              coefficentsMagnitude[index] =
                (coefficentsMagnitude[index] << 1) | bit;
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      runCleanupPass: function BitModel_runCleanupPass() {
        var decoder = this.decoder;
        var width = this.width, height = this.height;
        var neighborsSignificance = this.neighborsSignificance;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var oneRowDown = width;
        var twoRowsDown = width * 2;
        var threeRowsDown = width * 3;
        var iNext;
        for (var i0 = 0; i0 < height; i0 = iNext) {
          iNext = Math.min(i0 + 4, height);
          var indexBase = i0 * width;
          var checkAllEmpty = i0 + 3 < height;
          for (var j = 0; j < width; j++) {
            var index0 = indexBase + j;
            // using the property: labels[neighborsSignificance[index]] === 0
            // when neighborsSignificance[index] === 0
            var allEmpty = (checkAllEmpty &&
              processingFlags[index0] === 0 &&
              processingFlags[index0 + oneRowDown] === 0 &&
              processingFlags[index0 + twoRowsDown] === 0 &&
              processingFlags[index0 + threeRowsDown] === 0 &&
              neighborsSignificance[index0] === 0 &&
              neighborsSignificance[index0 + oneRowDown] === 0 &&
              neighborsSignificance[index0 + twoRowsDown] === 0 &&
              neighborsSignificance[index0 + threeRowsDown] === 0);
            var i1 = 0, index = index0;
            var i = i0, sign;
            if (allEmpty) {
              var hasSignificantCoefficent =
                decoder.readBit(contexts, RUNLENGTH_CONTEXT);
              if (!hasSignificantCoefficent) {
                bitsDecoded[index0]++;
                bitsDecoded[index0 + oneRowDown]++;
                bitsDecoded[index0 + twoRowsDown]++;
                bitsDecoded[index0 + threeRowsDown]++;
                continue; // next column
              }
              i1 = (decoder.readBit(contexts, UNIFORM_CONTEXT) << 1) |
                    decoder.readBit(contexts, UNIFORM_CONTEXT);
              if (i1 !== 0) {
                i = i0 + i1;
                index += i1 * width;
              }

              sign = this.decodeSignBit(i, j, index);
              coefficentsSign[index] = sign;
              coefficentsMagnitude[index] = 1;
              this.setNeighborsSignificance(i, j, index);
              processingFlags[index] |= firstMagnitudeBitMask;

              index = index0;
              for (var i2 = i0; i2 <= i; i2++, index += width) {
                bitsDecoded[index]++;
              }

              i1++;
            }
            for (i = i0 + i1; i < iNext; i++, index += width) {
              if (coefficentsMagnitude[index] ||
                (processingFlags[index] & processedMask) !== 0) {
                continue;
              }

              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision === 1) {
                sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
            }
          }
        }
      },
      checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
        var decoder = this.decoder;
        var contexts = this.contexts;
        var symbol = (decoder.readBit(contexts, UNIFORM_CONTEXT) << 3) |
                     (decoder.readBit(contexts, UNIFORM_CONTEXT) << 2) |
                     (decoder.readBit(contexts, UNIFORM_CONTEXT) << 1) |
                      decoder.readBit(contexts, UNIFORM_CONTEXT);
        if (symbol !== 0xA) {
          throw new Error('JPX Error: Invalid segmentation symbol');
        }
      }
    };

    return BitModel;
  })();

  // Section F, Discrete wavelet transformation
  var Transform = (function TransformClosure() {
    function Transform() {}

    Transform.prototype.calculate =
      function transformCalculate(subbands, u0, v0) {
      var ll = subbands[0];
      for (var i = 1, ii = subbands.length; i < ii; i++) {
        ll = this.iterate(ll, subbands[i], u0, v0);
      }
      return ll;
    };
    Transform.prototype.extend = function extend(buffer, offset, size) {
      // Section F.3.7 extending... using max extension of 4
      var i1 = offset - 1, j1 = offset + 1;
      var i2 = offset + size - 2, j2 = offset + size;
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1] = buffer[j1];
      buffer[j2] = buffer[i2];
    };
    Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh,
                                                             u0, v0) {
      var llWidth = ll.width, llHeight = ll.height, llItems = ll.items;
      var width = hl_lh_hh.width;
      var height = hl_lh_hh.height;
      var items = hl_lh_hh.items;
      var i, j, k, l, u, v;

      // Interleave LL according to Section F.3.3
      for (k = 0, i = 0; i < llHeight; i++) {
        l = i * 2 * width;
        for (j = 0; j < llWidth; j++, k++, l += 2) {
          items[l] = llItems[k];
        }
      }
      // The LL band is not needed anymore.
      llItems = ll.items = null;

      var bufferPadding = 4;
      var rowBuffer = new Float32Array(width + 2 * bufferPadding);

      // Section F.3.4 HOR_SR
      if (width === 1) {
        // if width = 1, when u0 even keep items as is, when odd divide by 2
        if ((u0 & 1) !== 0) {
          for (v = 0, k = 0; v < height; v++, k += width) {
            items[k] *= 0.5;
          }
        }
      } else {
        for (v = 0, k = 0; v < height; v++, k += width) {
          rowBuffer.set(items.subarray(k, k + width), bufferPadding);

          this.extend(rowBuffer, bufferPadding, width);
          this.filter(rowBuffer, bufferPadding, width);

          items.set(
            rowBuffer.subarray(bufferPadding, bufferPadding + width),
            k);
        }
      }

      // Accesses to the items array can take long, because it may not fit into
      // CPU cache and has to be fetched from main memory. Since subsequent
      // accesses to the items array are not local when reading columns, we
      // have a cache miss every time. To reduce cache misses, get up to
      // 'numBuffers' items at a time and store them into the individual
      // buffers. The colBuffers should be small enough to fit into CPU cache.
      var numBuffers = 16;
      var colBuffers = [];
      for (i = 0; i < numBuffers; i++) {
        colBuffers.push(new Float32Array(height + 2 * bufferPadding));
      }
      var b, currentBuffer = 0;
      ll = bufferPadding + height;

      // Section F.3.5 VER_SR
      if (height === 1) {
          // if height = 1, when v0 even keep items as is, when odd divide by 2
        if ((v0 & 1) !== 0) {
          for (u = 0; u < width; u++) {
            items[u] *= 0.5;
          }
        }
      } else {
        for (u = 0; u < width; u++) {
          // if we ran out of buffers, copy several image columns at once
          if (currentBuffer === 0) {
            numBuffers = Math.min(width - u, numBuffers);
            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                colBuffers[b][l] = items[k + b];
              }
            }
            currentBuffer = numBuffers;
          }

          currentBuffer--;
          var buffer = colBuffers[currentBuffer];
          this.extend(buffer, bufferPadding, height);
          this.filter(buffer, bufferPadding, height);

          // If this is last buffer in this group of buffers, flush all buffers.
          if (currentBuffer === 0) {
            k = u - numBuffers + 1;
            for (l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                items[k + b] = colBuffers[b][l];
              }
            }
          }
        }
      }

      return {
        width: width,
        height: height,
        items: items
      };
    };
    return Transform;
  })();

  // Section 3.8.2 Irreversible 9-7 filter
  var IrreversibleTransform = (function IrreversibleTransformClosure() {
    function IrreversibleTransform() {
      Transform.call(this);
    }

    IrreversibleTransform.prototype = Object.create(Transform.prototype);
    IrreversibleTransform.prototype.filter =
      function irreversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n, current, next;

      var alpha = -1.586134342059924;
      var beta = -0.052980118572961;
      var gamma = 0.882911075530934;
      var delta = 0.443506852043971;
      var K = 1.230174104914001;
      var K_ = 1 / K;

      // step 1 is combined with step 3

      // step 2
      j = offset - 3;
      for (n = len + 4; n--; j += 2) {
        x[j] *= K_;
      }

      // step 1 & 3
      j = offset - 2;
      current = delta * x[j -1];
      for (n = len + 3; n--; j += 2) {
        next = delta * x[j + 1];
        x[j] = K * x[j] - current - next;
        if (n--) {
          j += 2;
          current = delta * x[j + 1];
          x[j] = K * x[j] - current - next;
        } else {
          break;
        }
      }

      // step 4
      j = offset - 1;
      current = gamma * x[j - 1];
      for (n = len + 2; n--; j += 2) {
        next = gamma * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = gamma * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }

      // step 5
      j = offset;
      current = beta * x[j - 1];
      for (n = len + 1; n--; j += 2) {
        next = beta * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = beta * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }

      // step 6
      if (len !== 0) {
        j = offset + 1;
        current = alpha * x[j - 1];
        for (n = len; n--; j += 2) {
          next = alpha * x[j + 1];
          x[j] -= current + next;
          if (n--) {
            j += 2;
            current = alpha * x[j + 1];
            x[j] -= current + next;
          } else {
            break;
          }
        }
      }
    };

    return IrreversibleTransform;
  })();

  // Section 3.8.1 Reversible 5-3 filter
  var ReversibleTransform = (function ReversibleTransformClosure() {
    function ReversibleTransform() {
      Transform.call(this);
    }

    ReversibleTransform.prototype = Object.create(Transform.prototype);
    ReversibleTransform.prototype.filter =
      function reversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n;

      for (j = offset, n = len + 1; n--; j += 2) {
        x[j] -= (x[j - 1] + x[j + 1] + 2) >> 2;
      }

      for (j = offset + 1, n = len; n--; j += 2) {
        x[j] += (x[j - 1] + x[j + 1]) >> 1;
      }
    };

    return ReversibleTransform;
  })();

  return JpxImage;
})();

exports.JpxImage = JpxImage;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreMetrics = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {
var getLookupTableFactory = sharedUtil.getLookupTableFactory;

// The Metrics object contains glyph widths (in glyph space units).
// As per PDF spec, for most fonts (Type 3 being an exception) a glyph
// space unit corresponds to 1/1000th of text space unit.
var getMetrics = getLookupTableFactory(function (t) {
  t['Courier'] = 600;
  t['Courier-Bold'] = 600;
  t['Courier-BoldOblique'] = 600;
  t['Courier-Oblique'] = 600;
  t['Helvetica'] = getLookupTableFactory(function (t) {
    t['space'] = 278;
    t['exclam'] = 278;
    t['quotedbl'] = 355;
    t['numbersign'] = 556;
    t['dollar'] = 556;
    t['percent'] = 889;
    t['ampersand'] = 667;
    t['quoteright'] = 222;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 389;
    t['plus'] = 584;
    t['comma'] = 278;
    t['hyphen'] = 333;
    t['period'] = 278;
    t['slash'] = 278;
    t['zero'] = 556;
    t['one'] = 556;
    t['two'] = 556;
    t['three'] = 556;
    t['four'] = 556;
    t['five'] = 556;
    t['six'] = 556;
    t['seven'] = 556;
    t['eight'] = 556;
    t['nine'] = 556;
    t['colon'] = 278;
    t['semicolon'] = 278;
    t['less'] = 584;
    t['equal'] = 584;
    t['greater'] = 584;
    t['question'] = 556;
    t['at'] = 1015;
    t['A'] = 667;
    t['B'] = 667;
    t['C'] = 722;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 611;
    t['G'] = 778;
    t['H'] = 722;
    t['I'] = 278;
    t['J'] = 500;
    t['K'] = 667;
    t['L'] = 556;
    t['M'] = 833;
    t['N'] = 722;
    t['O'] = 778;
    t['P'] = 667;
    t['Q'] = 778;
    t['R'] = 722;
    t['S'] = 667;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 667;
    t['W'] = 944;
    t['X'] = 667;
    t['Y'] = 667;
    t['Z'] = 611;
    t['bracketleft'] = 278;
    t['backslash'] = 278;
    t['bracketright'] = 278;
    t['asciicircum'] = 469;
    t['underscore'] = 556;
    t['quoteleft'] = 222;
    t['a'] = 556;
    t['b'] = 556;
    t['c'] = 500;
    t['d'] = 556;
    t['e'] = 556;
    t['f'] = 278;
    t['g'] = 556;
    t['h'] = 556;
    t['i'] = 222;
    t['j'] = 222;
    t['k'] = 500;
    t['l'] = 222;
    t['m'] = 833;
    t['n'] = 556;
    t['o'] = 556;
    t['p'] = 556;
    t['q'] = 556;
    t['r'] = 333;
    t['s'] = 500;
    t['t'] = 278;
    t['u'] = 556;
    t['v'] = 500;
    t['w'] = 722;
    t['x'] = 500;
    t['y'] = 500;
    t['z'] = 500;
    t['braceleft'] = 334;
    t['bar'] = 260;
    t['braceright'] = 334;
    t['asciitilde'] = 584;
    t['exclamdown'] = 333;
    t['cent'] = 556;
    t['sterling'] = 556;
    t['fraction'] = 167;
    t['yen'] = 556;
    t['florin'] = 556;
    t['section'] = 556;
    t['currency'] = 556;
    t['quotesingle'] = 191;
    t['quotedblleft'] = 333;
    t['guillemotleft'] = 556;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 500;
    t['fl'] = 500;
    t['endash'] = 556;
    t['dagger'] = 556;
    t['daggerdbl'] = 556;
    t['periodcentered'] = 278;
    t['paragraph'] = 537;
    t['bullet'] = 350;
    t['quotesinglbase'] = 222;
    t['quotedblbase'] = 333;
    t['quotedblright'] = 333;
    t['guillemotright'] = 556;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 611;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 1000;
    t['ordfeminine'] = 370;
    t['Lslash'] = 556;
    t['Oslash'] = 778;
    t['OE'] = 1000;
    t['ordmasculine'] = 365;
    t['ae'] = 889;
    t['dotlessi'] = 278;
    t['lslash'] = 222;
    t['oslash'] = 611;
    t['oe'] = 944;
    t['germandbls'] = 611;
    t['Idieresis'] = 278;
    t['eacute'] = 556;
    t['abreve'] = 556;
    t['uhungarumlaut'] = 556;
    t['ecaron'] = 556;
    t['Ydieresis'] = 667;
    t['divide'] = 584;
    t['Yacute'] = 667;
    t['Acircumflex'] = 667;
    t['aacute'] = 556;
    t['Ucircumflex'] = 722;
    t['yacute'] = 500;
    t['scommaaccent'] = 500;
    t['ecircumflex'] = 556;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 556;
    t['Uacute'] = 722;
    t['uogonek'] = 556;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 737;
    t['Emacron'] = 667;
    t['ccaron'] = 500;
    t['aring'] = 556;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 222;
    t['agrave'] = 556;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 722;
    t['atilde'] = 556;
    t['Edotaccent'] = 667;
    t['scaron'] = 500;
    t['scedilla'] = 500;
    t['iacute'] = 278;
    t['lozenge'] = 471;
    t['Rcaron'] = 722;
    t['Gcommaaccent'] = 778;
    t['ucircumflex'] = 556;
    t['acircumflex'] = 556;
    t['Amacron'] = 667;
    t['rcaron'] = 333;
    t['ccedilla'] = 500;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 667;
    t['Omacron'] = 778;
    t['Racute'] = 722;
    t['Sacute'] = 667;
    t['dcaron'] = 643;
    t['Umacron'] = 722;
    t['uring'] = 556;
    t['threesuperior'] = 333;
    t['Ograve'] = 778;
    t['Agrave'] = 667;
    t['Abreve'] = 667;
    t['multiply'] = 584;
    t['uacute'] = 556;
    t['Tcaron'] = 611;
    t['partialdiff'] = 476;
    t['ydieresis'] = 500;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 556;
    t['edieresis'] = 556;
    t['cacute'] = 500;
    t['nacute'] = 556;
    t['umacron'] = 556;
    t['Ncaron'] = 722;
    t['Iacute'] = 278;
    t['plusminus'] = 584;
    t['brokenbar'] = 260;
    t['registered'] = 737;
    t['Gbreve'] = 778;
    t['Idotaccent'] = 278;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 333;
    t['omacron'] = 556;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 722;
    t['lcommaaccent'] = 222;
    t['tcaron'] = 317;
    t['eogonek'] = 556;
    t['Uogonek'] = 722;
    t['Aacute'] = 667;
    t['Adieresis'] = 667;
    t['egrave'] = 556;
    t['zacute'] = 500;
    t['iogonek'] = 222;
    t['Oacute'] = 778;
    t['oacute'] = 556;
    t['amacron'] = 556;
    t['sacute'] = 500;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 778;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 556;
    t['twosuperior'] = 333;
    t['Odieresis'] = 778;
    t['mu'] = 556;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 556;
    t['Eogonek'] = 667;
    t['dcroat'] = 556;
    t['threequarters'] = 834;
    t['Scedilla'] = 667;
    t['lcaron'] = 299;
    t['Kcommaaccent'] = 667;
    t['Lacute'] = 556;
    t['trademark'] = 1000;
    t['edotaccent'] = 556;
    t['Igrave'] = 278;
    t['Imacron'] = 278;
    t['Lcaron'] = 556;
    t['onehalf'] = 834;
    t['lessequal'] = 549;
    t['ocircumflex'] = 556;
    t['ntilde'] = 556;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 556;
    t['gbreve'] = 556;
    t['onequarter'] = 834;
    t['Scaron'] = 667;
    t['Scommaaccent'] = 667;
    t['Ohungarumlaut'] = 778;
    t['degree'] = 400;
    t['ograve'] = 556;
    t['Ccaron'] = 722;
    t['ugrave'] = 556;
    t['radical'] = 453;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 333;
    t['Ntilde'] = 722;
    t['otilde'] = 556;
    t['Rcommaaccent'] = 722;
    t['Lcommaaccent'] = 556;
    t['Atilde'] = 667;
    t['Aogonek'] = 667;
    t['Aring'] = 667;
    t['Otilde'] = 778;
    t['zdotaccent'] = 500;
    t['Ecaron'] = 667;
    t['Iogonek'] = 278;
    t['kcommaaccent'] = 500;
    t['minus'] = 584;
    t['Icircumflex'] = 278;
    t['ncaron'] = 556;
    t['tcommaaccent'] = 278;
    t['logicalnot'] = 584;
    t['odieresis'] = 556;
    t['udieresis'] = 556;
    t['notequal'] = 549;
    t['gcommaaccent'] = 556;
    t['eth'] = 556;
    t['zcaron'] = 500;
    t['ncommaaccent'] = 556;
    t['onesuperior'] = 333;
    t['imacron'] = 278;
    t['Euro'] = 556;
  });
  t['Helvetica-Bold'] = getLookupTableFactory(function (t) {
    t['space'] = 278;
    t['exclam'] = 333;
    t['quotedbl'] = 474;
    t['numbersign'] = 556;
    t['dollar'] = 556;
    t['percent'] = 889;
    t['ampersand'] = 722;
    t['quoteright'] = 278;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 389;
    t['plus'] = 584;
    t['comma'] = 278;
    t['hyphen'] = 333;
    t['period'] = 278;
    t['slash'] = 278;
    t['zero'] = 556;
    t['one'] = 556;
    t['two'] = 556;
    t['three'] = 556;
    t['four'] = 556;
    t['five'] = 556;
    t['six'] = 556;
    t['seven'] = 556;
    t['eight'] = 556;
    t['nine'] = 556;
    t['colon'] = 333;
    t['semicolon'] = 333;
    t['less'] = 584;
    t['equal'] = 584;
    t['greater'] = 584;
    t['question'] = 611;
    t['at'] = 975;
    t['A'] = 722;
    t['B'] = 722;
    t['C'] = 722;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 611;
    t['G'] = 778;
    t['H'] = 722;
    t['I'] = 278;
    t['J'] = 556;
    t['K'] = 722;
    t['L'] = 611;
    t['M'] = 833;
    t['N'] = 722;
    t['O'] = 778;
    t['P'] = 667;
    t['Q'] = 778;
    t['R'] = 722;
    t['S'] = 667;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 667;
    t['W'] = 944;
    t['X'] = 667;
    t['Y'] = 667;
    t['Z'] = 611;
    t['bracketleft'] = 333;
    t['backslash'] = 278;
    t['bracketright'] = 333;
    t['asciicircum'] = 584;
    t['underscore'] = 556;
    t['quoteleft'] = 278;
    t['a'] = 556;
    t['b'] = 611;
    t['c'] = 556;
    t['d'] = 611;
    t['e'] = 556;
    t['f'] = 333;
    t['g'] = 611;
    t['h'] = 611;
    t['i'] = 278;
    t['j'] = 278;
    t['k'] = 556;
    t['l'] = 278;
    t['m'] = 889;
    t['n'] = 611;
    t['o'] = 611;
    t['p'] = 611;
    t['q'] = 611;
    t['r'] = 389;
    t['s'] = 556;
    t['t'] = 333;
    t['u'] = 611;
    t['v'] = 556;
    t['w'] = 778;
    t['x'] = 556;
    t['y'] = 556;
    t['z'] = 500;
    t['braceleft'] = 389;
    t['bar'] = 280;
    t['braceright'] = 389;
    t['asciitilde'] = 584;
    t['exclamdown'] = 333;
    t['cent'] = 556;
    t['sterling'] = 556;
    t['fraction'] = 167;
    t['yen'] = 556;
    t['florin'] = 556;
    t['section'] = 556;
    t['currency'] = 556;
    t['quotesingle'] = 238;
    t['quotedblleft'] = 500;
    t['guillemotleft'] = 556;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 611;
    t['fl'] = 611;
    t['endash'] = 556;
    t['dagger'] = 556;
    t['daggerdbl'] = 556;
    t['periodcentered'] = 278;
    t['paragraph'] = 556;
    t['bullet'] = 350;
    t['quotesinglbase'] = 278;
    t['quotedblbase'] = 500;
    t['quotedblright'] = 500;
    t['guillemotright'] = 556;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 611;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 1000;
    t['ordfeminine'] = 370;
    t['Lslash'] = 611;
    t['Oslash'] = 778;
    t['OE'] = 1000;
    t['ordmasculine'] = 365;
    t['ae'] = 889;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 611;
    t['oe'] = 944;
    t['germandbls'] = 611;
    t['Idieresis'] = 278;
    t['eacute'] = 556;
    t['abreve'] = 556;
    t['uhungarumlaut'] = 611;
    t['ecaron'] = 556;
    t['Ydieresis'] = 667;
    t['divide'] = 584;
    t['Yacute'] = 667;
    t['Acircumflex'] = 722;
    t['aacute'] = 556;
    t['Ucircumflex'] = 722;
    t['yacute'] = 556;
    t['scommaaccent'] = 556;
    t['ecircumflex'] = 556;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 556;
    t['Uacute'] = 722;
    t['uogonek'] = 611;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 737;
    t['Emacron'] = 667;
    t['ccaron'] = 556;
    t['aring'] = 556;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 278;
    t['agrave'] = 556;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 722;
    t['atilde'] = 556;
    t['Edotaccent'] = 667;
    t['scaron'] = 556;
    t['scedilla'] = 556;
    t['iacute'] = 278;
    t['lozenge'] = 494;
    t['Rcaron'] = 722;
    t['Gcommaaccent'] = 778;
    t['ucircumflex'] = 611;
    t['acircumflex'] = 556;
    t['Amacron'] = 722;
    t['rcaron'] = 389;
    t['ccedilla'] = 556;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 667;
    t['Omacron'] = 778;
    t['Racute'] = 722;
    t['Sacute'] = 667;
    t['dcaron'] = 743;
    t['Umacron'] = 722;
    t['uring'] = 611;
    t['threesuperior'] = 333;
    t['Ograve'] = 778;
    t['Agrave'] = 722;
    t['Abreve'] = 722;
    t['multiply'] = 584;
    t['uacute'] = 611;
    t['Tcaron'] = 611;
    t['partialdiff'] = 494;
    t['ydieresis'] = 556;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 556;
    t['edieresis'] = 556;
    t['cacute'] = 556;
    t['nacute'] = 611;
    t['umacron'] = 611;
    t['Ncaron'] = 722;
    t['Iacute'] = 278;
    t['plusminus'] = 584;
    t['brokenbar'] = 280;
    t['registered'] = 737;
    t['Gbreve'] = 778;
    t['Idotaccent'] = 278;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 389;
    t['omacron'] = 611;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 722;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 389;
    t['eogonek'] = 556;
    t['Uogonek'] = 722;
    t['Aacute'] = 722;
    t['Adieresis'] = 722;
    t['egrave'] = 556;
    t['zacute'] = 500;
    t['iogonek'] = 278;
    t['Oacute'] = 778;
    t['oacute'] = 611;
    t['amacron'] = 556;
    t['sacute'] = 556;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 778;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 611;
    t['twosuperior'] = 333;
    t['Odieresis'] = 778;
    t['mu'] = 611;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 611;
    t['Eogonek'] = 667;
    t['dcroat'] = 611;
    t['threequarters'] = 834;
    t['Scedilla'] = 667;
    t['lcaron'] = 400;
    t['Kcommaaccent'] = 722;
    t['Lacute'] = 611;
    t['trademark'] = 1000;
    t['edotaccent'] = 556;
    t['Igrave'] = 278;
    t['Imacron'] = 278;
    t['Lcaron'] = 611;
    t['onehalf'] = 834;
    t['lessequal'] = 549;
    t['ocircumflex'] = 611;
    t['ntilde'] = 611;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 556;
    t['gbreve'] = 611;
    t['onequarter'] = 834;
    t['Scaron'] = 667;
    t['Scommaaccent'] = 667;
    t['Ohungarumlaut'] = 778;
    t['degree'] = 400;
    t['ograve'] = 611;
    t['Ccaron'] = 722;
    t['ugrave'] = 611;
    t['radical'] = 549;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 389;
    t['Ntilde'] = 722;
    t['otilde'] = 611;
    t['Rcommaaccent'] = 722;
    t['Lcommaaccent'] = 611;
    t['Atilde'] = 722;
    t['Aogonek'] = 722;
    t['Aring'] = 722;
    t['Otilde'] = 778;
    t['zdotaccent'] = 500;
    t['Ecaron'] = 667;
    t['Iogonek'] = 278;
    t['kcommaaccent'] = 556;
    t['minus'] = 584;
    t['Icircumflex'] = 278;
    t['ncaron'] = 611;
    t['tcommaaccent'] = 333;
    t['logicalnot'] = 584;
    t['odieresis'] = 611;
    t['udieresis'] = 611;
    t['notequal'] = 549;
    t['gcommaaccent'] = 611;
    t['eth'] = 611;
    t['zcaron'] = 500;
    t['ncommaaccent'] = 611;
    t['onesuperior'] = 333;
    t['imacron'] = 278;
    t['Euro'] = 556;
  });
  t['Helvetica-BoldOblique'] = getLookupTableFactory(function (t) {
    t['space'] = 278;
    t['exclam'] = 333;
    t['quotedbl'] = 474;
    t['numbersign'] = 556;
    t['dollar'] = 556;
    t['percent'] = 889;
    t['ampersand'] = 722;
    t['quoteright'] = 278;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 389;
    t['plus'] = 584;
    t['comma'] = 278;
    t['hyphen'] = 333;
    t['period'] = 278;
    t['slash'] = 278;
    t['zero'] = 556;
    t['one'] = 556;
    t['two'] = 556;
    t['three'] = 556;
    t['four'] = 556;
    t['five'] = 556;
    t['six'] = 556;
    t['seven'] = 556;
    t['eight'] = 556;
    t['nine'] = 556;
    t['colon'] = 333;
    t['semicolon'] = 333;
    t['less'] = 584;
    t['equal'] = 584;
    t['greater'] = 584;
    t['question'] = 611;
    t['at'] = 975;
    t['A'] = 722;
    t['B'] = 722;
    t['C'] = 722;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 611;
    t['G'] = 778;
    t['H'] = 722;
    t['I'] = 278;
    t['J'] = 556;
    t['K'] = 722;
    t['L'] = 611;
    t['M'] = 833;
    t['N'] = 722;
    t['O'] = 778;
    t['P'] = 667;
    t['Q'] = 778;
    t['R'] = 722;
    t['S'] = 667;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 667;
    t['W'] = 944;
    t['X'] = 667;
    t['Y'] = 667;
    t['Z'] = 611;
    t['bracketleft'] = 333;
    t['backslash'] = 278;
    t['bracketright'] = 333;
    t['asciicircum'] = 584;
    t['underscore'] = 556;
    t['quoteleft'] = 278;
    t['a'] = 556;
    t['b'] = 611;
    t['c'] = 556;
    t['d'] = 611;
    t['e'] = 556;
    t['f'] = 333;
    t['g'] = 611;
    t['h'] = 611;
    t['i'] = 278;
    t['j'] = 278;
    t['k'] = 556;
    t['l'] = 278;
    t['m'] = 889;
    t['n'] = 611;
    t['o'] = 611;
    t['p'] = 611;
    t['q'] = 611;
    t['r'] = 389;
    t['s'] = 556;
    t['t'] = 333;
    t['u'] = 611;
    t['v'] = 556;
    t['w'] = 778;
    t['x'] = 556;
    t['y'] = 556;
    t['z'] = 500;
    t['braceleft'] = 389;
    t['bar'] = 280;
    t['braceright'] = 389;
    t['asciitilde'] = 584;
    t['exclamdown'] = 333;
    t['cent'] = 556;
    t['sterling'] = 556;
    t['fraction'] = 167;
    t['yen'] = 556;
    t['florin'] = 556;
    t['section'] = 556;
    t['currency'] = 556;
    t['quotesingle'] = 238;
    t['quotedblleft'] = 500;
    t['guillemotleft'] = 556;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 611;
    t['fl'] = 611;
    t['endash'] = 556;
    t['dagger'] = 556;
    t['daggerdbl'] = 556;
    t['periodcentered'] = 278;
    t['paragraph'] = 556;
    t['bullet'] = 350;
    t['quotesinglbase'] = 278;
    t['quotedblbase'] = 500;
    t['quotedblright'] = 500;
    t['guillemotright'] = 556;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 611;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 1000;
    t['ordfeminine'] = 370;
    t['Lslash'] = 611;
    t['Oslash'] = 778;
    t['OE'] = 1000;
    t['ordmasculine'] = 365;
    t['ae'] = 889;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 611;
    t['oe'] = 944;
    t['germandbls'] = 611;
    t['Idieresis'] = 278;
    t['eacute'] = 556;
    t['abreve'] = 556;
    t['uhungarumlaut'] = 611;
    t['ecaron'] = 556;
    t['Ydieresis'] = 667;
    t['divide'] = 584;
    t['Yacute'] = 667;
    t['Acircumflex'] = 722;
    t['aacute'] = 556;
    t['Ucircumflex'] = 722;
    t['yacute'] = 556;
    t['scommaaccent'] = 556;
    t['ecircumflex'] = 556;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 556;
    t['Uacute'] = 722;
    t['uogonek'] = 611;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 737;
    t['Emacron'] = 667;
    t['ccaron'] = 556;
    t['aring'] = 556;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 278;
    t['agrave'] = 556;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 722;
    t['atilde'] = 556;
    t['Edotaccent'] = 667;
    t['scaron'] = 556;
    t['scedilla'] = 556;
    t['iacute'] = 278;
    t['lozenge'] = 494;
    t['Rcaron'] = 722;
    t['Gcommaaccent'] = 778;
    t['ucircumflex'] = 611;
    t['acircumflex'] = 556;
    t['Amacron'] = 722;
    t['rcaron'] = 389;
    t['ccedilla'] = 556;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 667;
    t['Omacron'] = 778;
    t['Racute'] = 722;
    t['Sacute'] = 667;
    t['dcaron'] = 743;
    t['Umacron'] = 722;
    t['uring'] = 611;
    t['threesuperior'] = 333;
    t['Ograve'] = 778;
    t['Agrave'] = 722;
    t['Abreve'] = 722;
    t['multiply'] = 584;
    t['uacute'] = 611;
    t['Tcaron'] = 611;
    t['partialdiff'] = 494;
    t['ydieresis'] = 556;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 556;
    t['edieresis'] = 556;
    t['cacute'] = 556;
    t['nacute'] = 611;
    t['umacron'] = 611;
    t['Ncaron'] = 722;
    t['Iacute'] = 278;
    t['plusminus'] = 584;
    t['brokenbar'] = 280;
    t['registered'] = 737;
    t['Gbreve'] = 778;
    t['Idotaccent'] = 278;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 389;
    t['omacron'] = 611;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 722;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 389;
    t['eogonek'] = 556;
    t['Uogonek'] = 722;
    t['Aacute'] = 722;
    t['Adieresis'] = 722;
    t['egrave'] = 556;
    t['zacute'] = 500;
    t['iogonek'] = 278;
    t['Oacute'] = 778;
    t['oacute'] = 611;
    t['amacron'] = 556;
    t['sacute'] = 556;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 778;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 611;
    t['twosuperior'] = 333;
    t['Odieresis'] = 778;
    t['mu'] = 611;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 611;
    t['Eogonek'] = 667;
    t['dcroat'] = 611;
    t['threequarters'] = 834;
    t['Scedilla'] = 667;
    t['lcaron'] = 400;
    t['Kcommaaccent'] = 722;
    t['Lacute'] = 611;
    t['trademark'] = 1000;
    t['edotaccent'] = 556;
    t['Igrave'] = 278;
    t['Imacron'] = 278;
    t['Lcaron'] = 611;
    t['onehalf'] = 834;
    t['lessequal'] = 549;
    t['ocircumflex'] = 611;
    t['ntilde'] = 611;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 556;
    t['gbreve'] = 611;
    t['onequarter'] = 834;
    t['Scaron'] = 667;
    t['Scommaaccent'] = 667;
    t['Ohungarumlaut'] = 778;
    t['degree'] = 400;
    t['ograve'] = 611;
    t['Ccaron'] = 722;
    t['ugrave'] = 611;
    t['radical'] = 549;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 389;
    t['Ntilde'] = 722;
    t['otilde'] = 611;
    t['Rcommaaccent'] = 722;
    t['Lcommaaccent'] = 611;
    t['Atilde'] = 722;
    t['Aogonek'] = 722;
    t['Aring'] = 722;
    t['Otilde'] = 778;
    t['zdotaccent'] = 500;
    t['Ecaron'] = 667;
    t['Iogonek'] = 278;
    t['kcommaaccent'] = 556;
    t['minus'] = 584;
    t['Icircumflex'] = 278;
    t['ncaron'] = 611;
    t['tcommaaccent'] = 333;
    t['logicalnot'] = 584;
    t['odieresis'] = 611;
    t['udieresis'] = 611;
    t['notequal'] = 549;
    t['gcommaaccent'] = 611;
    t['eth'] = 611;
    t['zcaron'] = 500;
    t['ncommaaccent'] = 611;
    t['onesuperior'] = 333;
    t['imacron'] = 278;
    t['Euro'] = 556;
  });
  t['Helvetica-Oblique'] = getLookupTableFactory(function (t) {
    t['space'] = 278;
    t['exclam'] = 278;
    t['quotedbl'] = 355;
    t['numbersign'] = 556;
    t['dollar'] = 556;
    t['percent'] = 889;
    t['ampersand'] = 667;
    t['quoteright'] = 222;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 389;
    t['plus'] = 584;
    t['comma'] = 278;
    t['hyphen'] = 333;
    t['period'] = 278;
    t['slash'] = 278;
    t['zero'] = 556;
    t['one'] = 556;
    t['two'] = 556;
    t['three'] = 556;
    t['four'] = 556;
    t['five'] = 556;
    t['six'] = 556;
    t['seven'] = 556;
    t['eight'] = 556;
    t['nine'] = 556;
    t['colon'] = 278;
    t['semicolon'] = 278;
    t['less'] = 584;
    t['equal'] = 584;
    t['greater'] = 584;
    t['question'] = 556;
    t['at'] = 1015;
    t['A'] = 667;
    t['B'] = 667;
    t['C'] = 722;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 611;
    t['G'] = 778;
    t['H'] = 722;
    t['I'] = 278;
    t['J'] = 500;
    t['K'] = 667;
    t['L'] = 556;
    t['M'] = 833;
    t['N'] = 722;
    t['O'] = 778;
    t['P'] = 667;
    t['Q'] = 778;
    t['R'] = 722;
    t['S'] = 667;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 667;
    t['W'] = 944;
    t['X'] = 667;
    t['Y'] = 667;
    t['Z'] = 611;
    t['bracketleft'] = 278;
    t['backslash'] = 278;
    t['bracketright'] = 278;
    t['asciicircum'] = 469;
    t['underscore'] = 556;
    t['quoteleft'] = 222;
    t['a'] = 556;
    t['b'] = 556;
    t['c'] = 500;
    t['d'] = 556;
    t['e'] = 556;
    t['f'] = 278;
    t['g'] = 556;
    t['h'] = 556;
    t['i'] = 222;
    t['j'] = 222;
    t['k'] = 500;
    t['l'] = 222;
    t['m'] = 833;
    t['n'] = 556;
    t['o'] = 556;
    t['p'] = 556;
    t['q'] = 556;
    t['r'] = 333;
    t['s'] = 500;
    t['t'] = 278;
    t['u'] = 556;
    t['v'] = 500;
    t['w'] = 722;
    t['x'] = 500;
    t['y'] = 500;
    t['z'] = 500;
    t['braceleft'] = 334;
    t['bar'] = 260;
    t['braceright'] = 334;
    t['asciitilde'] = 584;
    t['exclamdown'] = 333;
    t['cent'] = 556;
    t['sterling'] = 556;
    t['fraction'] = 167;
    t['yen'] = 556;
    t['florin'] = 556;
    t['section'] = 556;
    t['currency'] = 556;
    t['quotesingle'] = 191;
    t['quotedblleft'] = 333;
    t['guillemotleft'] = 556;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 500;
    t['fl'] = 500;
    t['endash'] = 556;
    t['dagger'] = 556;
    t['daggerdbl'] = 556;
    t['periodcentered'] = 278;
    t['paragraph'] = 537;
    t['bullet'] = 350;
    t['quotesinglbase'] = 222;
    t['quotedblbase'] = 333;
    t['quotedblright'] = 333;
    t['guillemotright'] = 556;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 611;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 1000;
    t['ordfeminine'] = 370;
    t['Lslash'] = 556;
    t['Oslash'] = 778;
    t['OE'] = 1000;
    t['ordmasculine'] = 365;
    t['ae'] = 889;
    t['dotlessi'] = 278;
    t['lslash'] = 222;
    t['oslash'] = 611;
    t['oe'] = 944;
    t['germandbls'] = 611;
    t['Idieresis'] = 278;
    t['eacute'] = 556;
    t['abreve'] = 556;
    t['uhungarumlaut'] = 556;
    t['ecaron'] = 556;
    t['Ydieresis'] = 667;
    t['divide'] = 584;
    t['Yacute'] = 667;
    t['Acircumflex'] = 667;
    t['aacute'] = 556;
    t['Ucircumflex'] = 722;
    t['yacute'] = 500;
    t['scommaaccent'] = 500;
    t['ecircumflex'] = 556;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 556;
    t['Uacute'] = 722;
    t['uogonek'] = 556;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 737;
    t['Emacron'] = 667;
    t['ccaron'] = 500;
    t['aring'] = 556;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 222;
    t['agrave'] = 556;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 722;
    t['atilde'] = 556;
    t['Edotaccent'] = 667;
    t['scaron'] = 500;
    t['scedilla'] = 500;
    t['iacute'] = 278;
    t['lozenge'] = 471;
    t['Rcaron'] = 722;
    t['Gcommaaccent'] = 778;
    t['ucircumflex'] = 556;
    t['acircumflex'] = 556;
    t['Amacron'] = 667;
    t['rcaron'] = 333;
    t['ccedilla'] = 500;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 667;
    t['Omacron'] = 778;
    t['Racute'] = 722;
    t['Sacute'] = 667;
    t['dcaron'] = 643;
    t['Umacron'] = 722;
    t['uring'] = 556;
    t['threesuperior'] = 333;
    t['Ograve'] = 778;
    t['Agrave'] = 667;
    t['Abreve'] = 667;
    t['multiply'] = 584;
    t['uacute'] = 556;
    t['Tcaron'] = 611;
    t['partialdiff'] = 476;
    t['ydieresis'] = 500;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 556;
    t['edieresis'] = 556;
    t['cacute'] = 500;
    t['nacute'] = 556;
    t['umacron'] = 556;
    t['Ncaron'] = 722;
    t['Iacute'] = 278;
    t['plusminus'] = 584;
    t['brokenbar'] = 260;
    t['registered'] = 737;
    t['Gbreve'] = 778;
    t['Idotaccent'] = 278;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 333;
    t['omacron'] = 556;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 722;
    t['lcommaaccent'] = 222;
    t['tcaron'] = 317;
    t['eogonek'] = 556;
    t['Uogonek'] = 722;
    t['Aacute'] = 667;
    t['Adieresis'] = 667;
    t['egrave'] = 556;
    t['zacute'] = 500;
    t['iogonek'] = 222;
    t['Oacute'] = 778;
    t['oacute'] = 556;
    t['amacron'] = 556;
    t['sacute'] = 500;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 778;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 556;
    t['twosuperior'] = 333;
    t['Odieresis'] = 778;
    t['mu'] = 556;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 556;
    t['Eogonek'] = 667;
    t['dcroat'] = 556;
    t['threequarters'] = 834;
    t['Scedilla'] = 667;
    t['lcaron'] = 299;
    t['Kcommaaccent'] = 667;
    t['Lacute'] = 556;
    t['trademark'] = 1000;
    t['edotaccent'] = 556;
    t['Igrave'] = 278;
    t['Imacron'] = 278;
    t['Lcaron'] = 556;
    t['onehalf'] = 834;
    t['lessequal'] = 549;
    t['ocircumflex'] = 556;
    t['ntilde'] = 556;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 556;
    t['gbreve'] = 556;
    t['onequarter'] = 834;
    t['Scaron'] = 667;
    t['Scommaaccent'] = 667;
    t['Ohungarumlaut'] = 778;
    t['degree'] = 400;
    t['ograve'] = 556;
    t['Ccaron'] = 722;
    t['ugrave'] = 556;
    t['radical'] = 453;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 333;
    t['Ntilde'] = 722;
    t['otilde'] = 556;
    t['Rcommaaccent'] = 722;
    t['Lcommaaccent'] = 556;
    t['Atilde'] = 667;
    t['Aogonek'] = 667;
    t['Aring'] = 667;
    t['Otilde'] = 778;
    t['zdotaccent'] = 500;
    t['Ecaron'] = 667;
    t['Iogonek'] = 278;
    t['kcommaaccent'] = 500;
    t['minus'] = 584;
    t['Icircumflex'] = 278;
    t['ncaron'] = 556;
    t['tcommaaccent'] = 278;
    t['logicalnot'] = 584;
    t['odieresis'] = 556;
    t['udieresis'] = 556;
    t['notequal'] = 549;
    t['gcommaaccent'] = 556;
    t['eth'] = 556;
    t['zcaron'] = 500;
    t['ncommaaccent'] = 556;
    t['onesuperior'] = 333;
    t['imacron'] = 278;
    t['Euro'] = 556;
  });
  t['Symbol'] = getLookupTableFactory(function (t) {
    t['space'] = 250;
    t['exclam'] = 333;
    t['universal'] = 713;
    t['numbersign'] = 500;
    t['existential'] = 549;
    t['percent'] = 833;
    t['ampersand'] = 778;
    t['suchthat'] = 439;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asteriskmath'] = 500;
    t['plus'] = 549;
    t['comma'] = 250;
    t['minus'] = 549;
    t['period'] = 250;
    t['slash'] = 278;
    t['zero'] = 500;
    t['one'] = 500;
    t['two'] = 500;
    t['three'] = 500;
    t['four'] = 500;
    t['five'] = 500;
    t['six'] = 500;
    t['seven'] = 500;
    t['eight'] = 500;
    t['nine'] = 500;
    t['colon'] = 278;
    t['semicolon'] = 278;
    t['less'] = 549;
    t['equal'] = 549;
    t['greater'] = 549;
    t['question'] = 444;
    t['congruent'] = 549;
    t['Alpha'] = 722;
    t['Beta'] = 667;
    t['Chi'] = 722;
    t['Delta'] = 612;
    t['Epsilon'] = 611;
    t['Phi'] = 763;
    t['Gamma'] = 603;
    t['Eta'] = 722;
    t['Iota'] = 333;
    t['theta1'] = 631;
    t['Kappa'] = 722;
    t['Lambda'] = 686;
    t['Mu'] = 889;
    t['Nu'] = 722;
    t['Omicron'] = 722;
    t['Pi'] = 768;
    t['Theta'] = 741;
    t['Rho'] = 556;
    t['Sigma'] = 592;
    t['Tau'] = 611;
    t['Upsilon'] = 690;
    t['sigma1'] = 439;
    t['Omega'] = 768;
    t['Xi'] = 645;
    t['Psi'] = 795;
    t['Zeta'] = 611;
    t['bracketleft'] = 333;
    t['therefore'] = 863;
    t['bracketright'] = 333;
    t['perpendicular'] = 658;
    t['underscore'] = 500;
    t['radicalex'] = 500;
    t['alpha'] = 631;
    t['beta'] = 549;
    t['chi'] = 549;
    t['delta'] = 494;
    t['epsilon'] = 439;
    t['phi'] = 521;
    t['gamma'] = 411;
    t['eta'] = 603;
    t['iota'] = 329;
    t['phi1'] = 603;
    t['kappa'] = 549;
    t['lambda'] = 549;
    t['mu'] = 576;
    t['nu'] = 521;
    t['omicron'] = 549;
    t['pi'] = 549;
    t['theta'] = 521;
    t['rho'] = 549;
    t['sigma'] = 603;
    t['tau'] = 439;
    t['upsilon'] = 576;
    t['omega1'] = 713;
    t['omega'] = 686;
    t['xi'] = 493;
    t['psi'] = 686;
    t['zeta'] = 494;
    t['braceleft'] = 480;
    t['bar'] = 200;
    t['braceright'] = 480;
    t['similar'] = 549;
    t['Euro'] = 750;
    t['Upsilon1'] = 620;
    t['minute'] = 247;
    t['lessequal'] = 549;
    t['fraction'] = 167;
    t['infinity'] = 713;
    t['florin'] = 500;
    t['club'] = 753;
    t['diamond'] = 753;
    t['heart'] = 753;
    t['spade'] = 753;
    t['arrowboth'] = 1042;
    t['arrowleft'] = 987;
    t['arrowup'] = 603;
    t['arrowright'] = 987;
    t['arrowdown'] = 603;
    t['degree'] = 400;
    t['plusminus'] = 549;
    t['second'] = 411;
    t['greaterequal'] = 549;
    t['multiply'] = 549;
    t['proportional'] = 713;
    t['partialdiff'] = 494;
    t['bullet'] = 460;
    t['divide'] = 549;
    t['notequal'] = 549;
    t['equivalence'] = 549;
    t['approxequal'] = 549;
    t['ellipsis'] = 1000;
    t['arrowvertex'] = 603;
    t['arrowhorizex'] = 1000;
    t['carriagereturn'] = 658;
    t['aleph'] = 823;
    t['Ifraktur'] = 686;
    t['Rfraktur'] = 795;
    t['weierstrass'] = 987;
    t['circlemultiply'] = 768;
    t['circleplus'] = 768;
    t['emptyset'] = 823;
    t['intersection'] = 768;
    t['union'] = 768;
    t['propersuperset'] = 713;
    t['reflexsuperset'] = 713;
    t['notsubset'] = 713;
    t['propersubset'] = 713;
    t['reflexsubset'] = 713;
    t['element'] = 713;
    t['notelement'] = 713;
    t['angle'] = 768;
    t['gradient'] = 713;
    t['registerserif'] = 790;
    t['copyrightserif'] = 790;
    t['trademarkserif'] = 890;
    t['product'] = 823;
    t['radical'] = 549;
    t['dotmath'] = 250;
    t['logicalnot'] = 713;
    t['logicaland'] = 603;
    t['logicalor'] = 603;
    t['arrowdblboth'] = 1042;
    t['arrowdblleft'] = 987;
    t['arrowdblup'] = 603;
    t['arrowdblright'] = 987;
    t['arrowdbldown'] = 603;
    t['lozenge'] = 494;
    t['angleleft'] = 329;
    t['registersans'] = 790;
    t['copyrightsans'] = 790;
    t['trademarksans'] = 786;
    t['summation'] = 713;
    t['parenlefttp'] = 384;
    t['parenleftex'] = 384;
    t['parenleftbt'] = 384;
    t['bracketlefttp'] = 384;
    t['bracketleftex'] = 384;
    t['bracketleftbt'] = 384;
    t['bracelefttp'] = 494;
    t['braceleftmid'] = 494;
    t['braceleftbt'] = 494;
    t['braceex'] = 494;
    t['angleright'] = 329;
    t['integral'] = 274;
    t['integraltp'] = 686;
    t['integralex'] = 686;
    t['integralbt'] = 686;
    t['parenrighttp'] = 384;
    t['parenrightex'] = 384;
    t['parenrightbt'] = 384;
    t['bracketrighttp'] = 384;
    t['bracketrightex'] = 384;
    t['bracketrightbt'] = 384;
    t['bracerighttp'] = 494;
    t['bracerightmid'] = 494;
    t['bracerightbt'] = 494;
    t['apple'] = 790;
  });
  t['Times-Roman'] = getLookupTableFactory(function (t) {
    t['space'] = 250;
    t['exclam'] = 333;
    t['quotedbl'] = 408;
    t['numbersign'] = 500;
    t['dollar'] = 500;
    t['percent'] = 833;
    t['ampersand'] = 778;
    t['quoteright'] = 333;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 500;
    t['plus'] = 564;
    t['comma'] = 250;
    t['hyphen'] = 333;
    t['period'] = 250;
    t['slash'] = 278;
    t['zero'] = 500;
    t['one'] = 500;
    t['two'] = 500;
    t['three'] = 500;
    t['four'] = 500;
    t['five'] = 500;
    t['six'] = 500;
    t['seven'] = 500;
    t['eight'] = 500;
    t['nine'] = 500;
    t['colon'] = 278;
    t['semicolon'] = 278;
    t['less'] = 564;
    t['equal'] = 564;
    t['greater'] = 564;
    t['question'] = 444;
    t['at'] = 921;
    t['A'] = 722;
    t['B'] = 667;
    t['C'] = 667;
    t['D'] = 722;
    t['E'] = 611;
    t['F'] = 556;
    t['G'] = 722;
    t['H'] = 722;
    t['I'] = 333;
    t['J'] = 389;
    t['K'] = 722;
    t['L'] = 611;
    t['M'] = 889;
    t['N'] = 722;
    t['O'] = 722;
    t['P'] = 556;
    t['Q'] = 722;
    t['R'] = 667;
    t['S'] = 556;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 722;
    t['W'] = 944;
    t['X'] = 722;
    t['Y'] = 722;
    t['Z'] = 611;
    t['bracketleft'] = 333;
    t['backslash'] = 278;
    t['bracketright'] = 333;
    t['asciicircum'] = 469;
    t['underscore'] = 500;
    t['quoteleft'] = 333;
    t['a'] = 444;
    t['b'] = 500;
    t['c'] = 444;
    t['d'] = 500;
    t['e'] = 444;
    t['f'] = 333;
    t['g'] = 500;
    t['h'] = 500;
    t['i'] = 278;
    t['j'] = 278;
    t['k'] = 500;
    t['l'] = 278;
    t['m'] = 778;
    t['n'] = 500;
    t['o'] = 500;
    t['p'] = 500;
    t['q'] = 500;
    t['r'] = 333;
    t['s'] = 389;
    t['t'] = 278;
    t['u'] = 500;
    t['v'] = 500;
    t['w'] = 722;
    t['x'] = 500;
    t['y'] = 500;
    t['z'] = 444;
    t['braceleft'] = 480;
    t['bar'] = 200;
    t['braceright'] = 480;
    t['asciitilde'] = 541;
    t['exclamdown'] = 333;
    t['cent'] = 500;
    t['sterling'] = 500;
    t['fraction'] = 167;
    t['yen'] = 500;
    t['florin'] = 500;
    t['section'] = 500;
    t['currency'] = 500;
    t['quotesingle'] = 180;
    t['quotedblleft'] = 444;
    t['guillemotleft'] = 500;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 556;
    t['fl'] = 556;
    t['endash'] = 500;
    t['dagger'] = 500;
    t['daggerdbl'] = 500;
    t['periodcentered'] = 250;
    t['paragraph'] = 453;
    t['bullet'] = 350;
    t['quotesinglbase'] = 333;
    t['quotedblbase'] = 444;
    t['quotedblright'] = 444;
    t['guillemotright'] = 500;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 444;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 889;
    t['ordfeminine'] = 276;
    t['Lslash'] = 611;
    t['Oslash'] = 722;
    t['OE'] = 889;
    t['ordmasculine'] = 310;
    t['ae'] = 667;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 500;
    t['oe'] = 722;
    t['germandbls'] = 500;
    t['Idieresis'] = 333;
    t['eacute'] = 444;
    t['abreve'] = 444;
    t['uhungarumlaut'] = 500;
    t['ecaron'] = 444;
    t['Ydieresis'] = 722;
    t['divide'] = 564;
    t['Yacute'] = 722;
    t['Acircumflex'] = 722;
    t['aacute'] = 444;
    t['Ucircumflex'] = 722;
    t['yacute'] = 500;
    t['scommaaccent'] = 389;
    t['ecircumflex'] = 444;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 444;
    t['Uacute'] = 722;
    t['uogonek'] = 500;
    t['Edieresis'] = 611;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 760;
    t['Emacron'] = 611;
    t['ccaron'] = 444;
    t['aring'] = 444;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 278;
    t['agrave'] = 444;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 667;
    t['atilde'] = 444;
    t['Edotaccent'] = 611;
    t['scaron'] = 389;
    t['scedilla'] = 389;
    t['iacute'] = 278;
    t['lozenge'] = 471;
    t['Rcaron'] = 667;
    t['Gcommaaccent'] = 722;
    t['ucircumflex'] = 500;
    t['acircumflex'] = 444;
    t['Amacron'] = 722;
    t['rcaron'] = 333;
    t['ccedilla'] = 444;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 556;
    t['Omacron'] = 722;
    t['Racute'] = 667;
    t['Sacute'] = 556;
    t['dcaron'] = 588;
    t['Umacron'] = 722;
    t['uring'] = 500;
    t['threesuperior'] = 300;
    t['Ograve'] = 722;
    t['Agrave'] = 722;
    t['Abreve'] = 722;
    t['multiply'] = 564;
    t['uacute'] = 500;
    t['Tcaron'] = 611;
    t['partialdiff'] = 476;
    t['ydieresis'] = 500;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 611;
    t['adieresis'] = 444;
    t['edieresis'] = 444;
    t['cacute'] = 444;
    t['nacute'] = 500;
    t['umacron'] = 500;
    t['Ncaron'] = 722;
    t['Iacute'] = 333;
    t['plusminus'] = 564;
    t['brokenbar'] = 200;
    t['registered'] = 760;
    t['Gbreve'] = 722;
    t['Idotaccent'] = 333;
    t['summation'] = 600;
    t['Egrave'] = 611;
    t['racute'] = 333;
    t['omacron'] = 500;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 667;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 326;
    t['eogonek'] = 444;
    t['Uogonek'] = 722;
    t['Aacute'] = 722;
    t['Adieresis'] = 722;
    t['egrave'] = 444;
    t['zacute'] = 444;
    t['iogonek'] = 278;
    t['Oacute'] = 722;
    t['oacute'] = 500;
    t['amacron'] = 444;
    t['sacute'] = 389;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 722;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 500;
    t['twosuperior'] = 300;
    t['Odieresis'] = 722;
    t['mu'] = 500;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 500;
    t['Eogonek'] = 611;
    t['dcroat'] = 500;
    t['threequarters'] = 750;
    t['Scedilla'] = 556;
    t['lcaron'] = 344;
    t['Kcommaaccent'] = 722;
    t['Lacute'] = 611;
    t['trademark'] = 980;
    t['edotaccent'] = 444;
    t['Igrave'] = 333;
    t['Imacron'] = 333;
    t['Lcaron'] = 611;
    t['onehalf'] = 750;
    t['lessequal'] = 549;
    t['ocircumflex'] = 500;
    t['ntilde'] = 500;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 611;
    t['emacron'] = 444;
    t['gbreve'] = 500;
    t['onequarter'] = 750;
    t['Scaron'] = 556;
    t['Scommaaccent'] = 556;
    t['Ohungarumlaut'] = 722;
    t['degree'] = 400;
    t['ograve'] = 500;
    t['Ccaron'] = 667;
    t['ugrave'] = 500;
    t['radical'] = 453;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 333;
    t['Ntilde'] = 722;
    t['otilde'] = 500;
    t['Rcommaaccent'] = 667;
    t['Lcommaaccent'] = 611;
    t['Atilde'] = 722;
    t['Aogonek'] = 722;
    t['Aring'] = 722;
    t['Otilde'] = 722;
    t['zdotaccent'] = 444;
    t['Ecaron'] = 611;
    t['Iogonek'] = 333;
    t['kcommaaccent'] = 500;
    t['minus'] = 564;
    t['Icircumflex'] = 333;
    t['ncaron'] = 500;
    t['tcommaaccent'] = 278;
    t['logicalnot'] = 564;
    t['odieresis'] = 500;
    t['udieresis'] = 500;
    t['notequal'] = 549;
    t['gcommaaccent'] = 500;
    t['eth'] = 500;
    t['zcaron'] = 444;
    t['ncommaaccent'] = 500;
    t['onesuperior'] = 300;
    t['imacron'] = 278;
    t['Euro'] = 500;
  });
  t['Times-Bold'] = getLookupTableFactory(function (t) {
    t['space'] = 250;
    t['exclam'] = 333;
    t['quotedbl'] = 555;
    t['numbersign'] = 500;
    t['dollar'] = 500;
    t['percent'] = 1000;
    t['ampersand'] = 833;
    t['quoteright'] = 333;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 500;
    t['plus'] = 570;
    t['comma'] = 250;
    t['hyphen'] = 333;
    t['period'] = 250;
    t['slash'] = 278;
    t['zero'] = 500;
    t['one'] = 500;
    t['two'] = 500;
    t['three'] = 500;
    t['four'] = 500;
    t['five'] = 500;
    t['six'] = 500;
    t['seven'] = 500;
    t['eight'] = 500;
    t['nine'] = 500;
    t['colon'] = 333;
    t['semicolon'] = 333;
    t['less'] = 570;
    t['equal'] = 570;
    t['greater'] = 570;
    t['question'] = 500;
    t['at'] = 930;
    t['A'] = 722;
    t['B'] = 667;
    t['C'] = 722;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 611;
    t['G'] = 778;
    t['H'] = 778;
    t['I'] = 389;
    t['J'] = 500;
    t['K'] = 778;
    t['L'] = 667;
    t['M'] = 944;
    t['N'] = 722;
    t['O'] = 778;
    t['P'] = 611;
    t['Q'] = 778;
    t['R'] = 722;
    t['S'] = 556;
    t['T'] = 667;
    t['U'] = 722;
    t['V'] = 722;
    t['W'] = 1000;
    t['X'] = 722;
    t['Y'] = 722;
    t['Z'] = 667;
    t['bracketleft'] = 333;
    t['backslash'] = 278;
    t['bracketright'] = 333;
    t['asciicircum'] = 581;
    t['underscore'] = 500;
    t['quoteleft'] = 333;
    t['a'] = 500;
    t['b'] = 556;
    t['c'] = 444;
    t['d'] = 556;
    t['e'] = 444;
    t['f'] = 333;
    t['g'] = 500;
    t['h'] = 556;
    t['i'] = 278;
    t['j'] = 333;
    t['k'] = 556;
    t['l'] = 278;
    t['m'] = 833;
    t['n'] = 556;
    t['o'] = 500;
    t['p'] = 556;
    t['q'] = 556;
    t['r'] = 444;
    t['s'] = 389;
    t['t'] = 333;
    t['u'] = 556;
    t['v'] = 500;
    t['w'] = 722;
    t['x'] = 500;
    t['y'] = 500;
    t['z'] = 444;
    t['braceleft'] = 394;
    t['bar'] = 220;
    t['braceright'] = 394;
    t['asciitilde'] = 520;
    t['exclamdown'] = 333;
    t['cent'] = 500;
    t['sterling'] = 500;
    t['fraction'] = 167;
    t['yen'] = 500;
    t['florin'] = 500;
    t['section'] = 500;
    t['currency'] = 500;
    t['quotesingle'] = 278;
    t['quotedblleft'] = 500;
    t['guillemotleft'] = 500;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 556;
    t['fl'] = 556;
    t['endash'] = 500;
    t['dagger'] = 500;
    t['daggerdbl'] = 500;
    t['periodcentered'] = 250;
    t['paragraph'] = 540;
    t['bullet'] = 350;
    t['quotesinglbase'] = 333;
    t['quotedblbase'] = 500;
    t['quotedblright'] = 500;
    t['guillemotright'] = 500;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 500;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 1000;
    t['ordfeminine'] = 300;
    t['Lslash'] = 667;
    t['Oslash'] = 778;
    t['OE'] = 1000;
    t['ordmasculine'] = 330;
    t['ae'] = 722;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 500;
    t['oe'] = 722;
    t['germandbls'] = 556;
    t['Idieresis'] = 389;
    t['eacute'] = 444;
    t['abreve'] = 500;
    t['uhungarumlaut'] = 556;
    t['ecaron'] = 444;
    t['Ydieresis'] = 722;
    t['divide'] = 570;
    t['Yacute'] = 722;
    t['Acircumflex'] = 722;
    t['aacute'] = 500;
    t['Ucircumflex'] = 722;
    t['yacute'] = 500;
    t['scommaaccent'] = 389;
    t['ecircumflex'] = 444;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 500;
    t['Uacute'] = 722;
    t['uogonek'] = 556;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 747;
    t['Emacron'] = 667;
    t['ccaron'] = 444;
    t['aring'] = 500;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 278;
    t['agrave'] = 500;
    t['Tcommaaccent'] = 667;
    t['Cacute'] = 722;
    t['atilde'] = 500;
    t['Edotaccent'] = 667;
    t['scaron'] = 389;
    t['scedilla'] = 389;
    t['iacute'] = 278;
    t['lozenge'] = 494;
    t['Rcaron'] = 722;
    t['Gcommaaccent'] = 778;
    t['ucircumflex'] = 556;
    t['acircumflex'] = 500;
    t['Amacron'] = 722;
    t['rcaron'] = 444;
    t['ccedilla'] = 444;
    t['Zdotaccent'] = 667;
    t['Thorn'] = 611;
    t['Omacron'] = 778;
    t['Racute'] = 722;
    t['Sacute'] = 556;
    t['dcaron'] = 672;
    t['Umacron'] = 722;
    t['uring'] = 556;
    t['threesuperior'] = 300;
    t['Ograve'] = 778;
    t['Agrave'] = 722;
    t['Abreve'] = 722;
    t['multiply'] = 570;
    t['uacute'] = 556;
    t['Tcaron'] = 667;
    t['partialdiff'] = 494;
    t['ydieresis'] = 500;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 500;
    t['edieresis'] = 444;
    t['cacute'] = 444;
    t['nacute'] = 556;
    t['umacron'] = 556;
    t['Ncaron'] = 722;
    t['Iacute'] = 389;
    t['plusminus'] = 570;
    t['brokenbar'] = 220;
    t['registered'] = 747;
    t['Gbreve'] = 778;
    t['Idotaccent'] = 389;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 444;
    t['omacron'] = 500;
    t['Zacute'] = 667;
    t['Zcaron'] = 667;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 722;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 416;
    t['eogonek'] = 444;
    t['Uogonek'] = 722;
    t['Aacute'] = 722;
    t['Adieresis'] = 722;
    t['egrave'] = 444;
    t['zacute'] = 444;
    t['iogonek'] = 278;
    t['Oacute'] = 778;
    t['oacute'] = 500;
    t['amacron'] = 500;
    t['sacute'] = 389;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 778;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 556;
    t['twosuperior'] = 300;
    t['Odieresis'] = 778;
    t['mu'] = 556;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 500;
    t['Eogonek'] = 667;
    t['dcroat'] = 556;
    t['threequarters'] = 750;
    t['Scedilla'] = 556;
    t['lcaron'] = 394;
    t['Kcommaaccent'] = 778;
    t['Lacute'] = 667;
    t['trademark'] = 1000;
    t['edotaccent'] = 444;
    t['Igrave'] = 389;
    t['Imacron'] = 389;
    t['Lcaron'] = 667;
    t['onehalf'] = 750;
    t['lessequal'] = 549;
    t['ocircumflex'] = 500;
    t['ntilde'] = 556;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 444;
    t['gbreve'] = 500;
    t['onequarter'] = 750;
    t['Scaron'] = 556;
    t['Scommaaccent'] = 556;
    t['Ohungarumlaut'] = 778;
    t['degree'] = 400;
    t['ograve'] = 500;
    t['Ccaron'] = 722;
    t['ugrave'] = 556;
    t['radical'] = 549;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 444;
    t['Ntilde'] = 722;
    t['otilde'] = 500;
    t['Rcommaaccent'] = 722;
    t['Lcommaaccent'] = 667;
    t['Atilde'] = 722;
    t['Aogonek'] = 722;
    t['Aring'] = 722;
    t['Otilde'] = 778;
    t['zdotaccent'] = 444;
    t['Ecaron'] = 667;
    t['Iogonek'] = 389;
    t['kcommaaccent'] = 556;
    t['minus'] = 570;
    t['Icircumflex'] = 389;
    t['ncaron'] = 556;
    t['tcommaaccent'] = 333;
    t['logicalnot'] = 570;
    t['odieresis'] = 500;
    t['udieresis'] = 556;
    t['notequal'] = 549;
    t['gcommaaccent'] = 500;
    t['eth'] = 500;
    t['zcaron'] = 444;
    t['ncommaaccent'] = 556;
    t['onesuperior'] = 300;
    t['imacron'] = 278;
    t['Euro'] = 500;
  });
  t['Times-BoldItalic'] = getLookupTableFactory(function (t) {
    t['space'] = 250;
    t['exclam'] = 389;
    t['quotedbl'] = 555;
    t['numbersign'] = 500;
    t['dollar'] = 500;
    t['percent'] = 833;
    t['ampersand'] = 778;
    t['quoteright'] = 333;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 500;
    t['plus'] = 570;
    t['comma'] = 250;
    t['hyphen'] = 333;
    t['period'] = 250;
    t['slash'] = 278;
    t['zero'] = 500;
    t['one'] = 500;
    t['two'] = 500;
    t['three'] = 500;
    t['four'] = 500;
    t['five'] = 500;
    t['six'] = 500;
    t['seven'] = 500;
    t['eight'] = 500;
    t['nine'] = 500;
    t['colon'] = 333;
    t['semicolon'] = 333;
    t['less'] = 570;
    t['equal'] = 570;
    t['greater'] = 570;
    t['question'] = 500;
    t['at'] = 832;
    t['A'] = 667;
    t['B'] = 667;
    t['C'] = 667;
    t['D'] = 722;
    t['E'] = 667;
    t['F'] = 667;
    t['G'] = 722;
    t['H'] = 778;
    t['I'] = 389;
    t['J'] = 500;
    t['K'] = 667;
    t['L'] = 611;
    t['M'] = 889;
    t['N'] = 722;
    t['O'] = 722;
    t['P'] = 611;
    t['Q'] = 722;
    t['R'] = 667;
    t['S'] = 556;
    t['T'] = 611;
    t['U'] = 722;
    t['V'] = 667;
    t['W'] = 889;
    t['X'] = 667;
    t['Y'] = 611;
    t['Z'] = 611;
    t['bracketleft'] = 333;
    t['backslash'] = 278;
    t['bracketright'] = 333;
    t['asciicircum'] = 570;
    t['underscore'] = 500;
    t['quoteleft'] = 333;
    t['a'] = 500;
    t['b'] = 500;
    t['c'] = 444;
    t['d'] = 500;
    t['e'] = 444;
    t['f'] = 333;
    t['g'] = 500;
    t['h'] = 556;
    t['i'] = 278;
    t['j'] = 278;
    t['k'] = 500;
    t['l'] = 278;
    t['m'] = 778;
    t['n'] = 556;
    t['o'] = 500;
    t['p'] = 500;
    t['q'] = 500;
    t['r'] = 389;
    t['s'] = 389;
    t['t'] = 278;
    t['u'] = 556;
    t['v'] = 444;
    t['w'] = 667;
    t['x'] = 500;
    t['y'] = 444;
    t['z'] = 389;
    t['braceleft'] = 348;
    t['bar'] = 220;
    t['braceright'] = 348;
    t['asciitilde'] = 570;
    t['exclamdown'] = 389;
    t['cent'] = 500;
    t['sterling'] = 500;
    t['fraction'] = 167;
    t['yen'] = 500;
    t['florin'] = 500;
    t['section'] = 500;
    t['currency'] = 500;
    t['quotesingle'] = 278;
    t['quotedblleft'] = 500;
    t['guillemotleft'] = 500;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 556;
    t['fl'] = 556;
    t['endash'] = 500;
    t['dagger'] = 500;
    t['daggerdbl'] = 500;
    t['periodcentered'] = 250;
    t['paragraph'] = 500;
    t['bullet'] = 350;
    t['quotesinglbase'] = 333;
    t['quotedblbase'] = 500;
    t['quotedblright'] = 500;
    t['guillemotright'] = 500;
    t['ellipsis'] = 1000;
    t['perthousand'] = 1000;
    t['questiondown'] = 500;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 1000;
    t['AE'] = 944;
    t['ordfeminine'] = 266;
    t['Lslash'] = 611;
    t['Oslash'] = 722;
    t['OE'] = 944;
    t['ordmasculine'] = 300;
    t['ae'] = 722;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 500;
    t['oe'] = 722;
    t['germandbls'] = 500;
    t['Idieresis'] = 389;
    t['eacute'] = 444;
    t['abreve'] = 500;
    t['uhungarumlaut'] = 556;
    t['ecaron'] = 444;
    t['Ydieresis'] = 611;
    t['divide'] = 570;
    t['Yacute'] = 611;
    t['Acircumflex'] = 667;
    t['aacute'] = 500;
    t['Ucircumflex'] = 722;
    t['yacute'] = 444;
    t['scommaaccent'] = 389;
    t['ecircumflex'] = 444;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 500;
    t['Uacute'] = 722;
    t['uogonek'] = 556;
    t['Edieresis'] = 667;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 747;
    t['Emacron'] = 667;
    t['ccaron'] = 444;
    t['aring'] = 500;
    t['Ncommaaccent'] = 722;
    t['lacute'] = 278;
    t['agrave'] = 500;
    t['Tcommaaccent'] = 611;
    t['Cacute'] = 667;
    t['atilde'] = 500;
    t['Edotaccent'] = 667;
    t['scaron'] = 389;
    t['scedilla'] = 389;
    t['iacute'] = 278;
    t['lozenge'] = 494;
    t['Rcaron'] = 667;
    t['Gcommaaccent'] = 722;
    t['ucircumflex'] = 556;
    t['acircumflex'] = 500;
    t['Amacron'] = 667;
    t['rcaron'] = 389;
    t['ccedilla'] = 444;
    t['Zdotaccent'] = 611;
    t['Thorn'] = 611;
    t['Omacron'] = 722;
    t['Racute'] = 667;
    t['Sacute'] = 556;
    t['dcaron'] = 608;
    t['Umacron'] = 722;
    t['uring'] = 556;
    t['threesuperior'] = 300;
    t['Ograve'] = 722;
    t['Agrave'] = 667;
    t['Abreve'] = 667;
    t['multiply'] = 570;
    t['uacute'] = 556;
    t['Tcaron'] = 611;
    t['partialdiff'] = 494;
    t['ydieresis'] = 444;
    t['Nacute'] = 722;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 667;
    t['adieresis'] = 500;
    t['edieresis'] = 444;
    t['cacute'] = 444;
    t['nacute'] = 556;
    t['umacron'] = 556;
    t['Ncaron'] = 722;
    t['Iacute'] = 389;
    t['plusminus'] = 570;
    t['brokenbar'] = 220;
    t['registered'] = 747;
    t['Gbreve'] = 722;
    t['Idotaccent'] = 389;
    t['summation'] = 600;
    t['Egrave'] = 667;
    t['racute'] = 389;
    t['omacron'] = 500;
    t['Zacute'] = 611;
    t['Zcaron'] = 611;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 667;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 366;
    t['eogonek'] = 444;
    t['Uogonek'] = 722;
    t['Aacute'] = 667;
    t['Adieresis'] = 667;
    t['egrave'] = 444;
    t['zacute'] = 389;
    t['iogonek'] = 278;
    t['Oacute'] = 722;
    t['oacute'] = 500;
    t['amacron'] = 500;
    t['sacute'] = 389;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 722;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 500;
    t['twosuperior'] = 300;
    t['Odieresis'] = 722;
    t['mu'] = 576;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 500;
    t['Eogonek'] = 667;
    t['dcroat'] = 500;
    t['threequarters'] = 750;
    t['Scedilla'] = 556;
    t['lcaron'] = 382;
    t['Kcommaaccent'] = 667;
    t['Lacute'] = 611;
    t['trademark'] = 1000;
    t['edotaccent'] = 444;
    t['Igrave'] = 389;
    t['Imacron'] = 389;
    t['Lcaron'] = 611;
    t['onehalf'] = 750;
    t['lessequal'] = 549;
    t['ocircumflex'] = 500;
    t['ntilde'] = 556;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 667;
    t['emacron'] = 444;
    t['gbreve'] = 500;
    t['onequarter'] = 750;
    t['Scaron'] = 556;
    t['Scommaaccent'] = 556;
    t['Ohungarumlaut'] = 722;
    t['degree'] = 400;
    t['ograve'] = 500;
    t['Ccaron'] = 667;
    t['ugrave'] = 556;
    t['radical'] = 549;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 389;
    t['Ntilde'] = 722;
    t['otilde'] = 500;
    t['Rcommaaccent'] = 667;
    t['Lcommaaccent'] = 611;
    t['Atilde'] = 667;
    t['Aogonek'] = 667;
    t['Aring'] = 667;
    t['Otilde'] = 722;
    t['zdotaccent'] = 389;
    t['Ecaron'] = 667;
    t['Iogonek'] = 389;
    t['kcommaaccent'] = 500;
    t['minus'] = 606;
    t['Icircumflex'] = 389;
    t['ncaron'] = 556;
    t['tcommaaccent'] = 278;
    t['logicalnot'] = 606;
    t['odieresis'] = 500;
    t['udieresis'] = 556;
    t['notequal'] = 549;
    t['gcommaaccent'] = 500;
    t['eth'] = 500;
    t['zcaron'] = 389;
    t['ncommaaccent'] = 556;
    t['onesuperior'] = 300;
    t['imacron'] = 278;
    t['Euro'] = 500;
  });
  t['Times-Italic'] = getLookupTableFactory(function (t) {
    t['space'] = 250;
    t['exclam'] = 333;
    t['quotedbl'] = 420;
    t['numbersign'] = 500;
    t['dollar'] = 500;
    t['percent'] = 833;
    t['ampersand'] = 778;
    t['quoteright'] = 333;
    t['parenleft'] = 333;
    t['parenright'] = 333;
    t['asterisk'] = 500;
    t['plus'] = 675;
    t['comma'] = 250;
    t['hyphen'] = 333;
    t['period'] = 250;
    t['slash'] = 278;
    t['zero'] = 500;
    t['one'] = 500;
    t['two'] = 500;
    t['three'] = 500;
    t['four'] = 500;
    t['five'] = 500;
    t['six'] = 500;
    t['seven'] = 500;
    t['eight'] = 500;
    t['nine'] = 500;
    t['colon'] = 333;
    t['semicolon'] = 333;
    t['less'] = 675;
    t['equal'] = 675;
    t['greater'] = 675;
    t['question'] = 500;
    t['at'] = 920;
    t['A'] = 611;
    t['B'] = 611;
    t['C'] = 667;
    t['D'] = 722;
    t['E'] = 611;
    t['F'] = 611;
    t['G'] = 722;
    t['H'] = 722;
    t['I'] = 333;
    t['J'] = 444;
    t['K'] = 667;
    t['L'] = 556;
    t['M'] = 833;
    t['N'] = 667;
    t['O'] = 722;
    t['P'] = 611;
    t['Q'] = 722;
    t['R'] = 611;
    t['S'] = 500;
    t['T'] = 556;
    t['U'] = 722;
    t['V'] = 611;
    t['W'] = 833;
    t['X'] = 611;
    t['Y'] = 556;
    t['Z'] = 556;
    t['bracketleft'] = 389;
    t['backslash'] = 278;
    t['bracketright'] = 389;
    t['asciicircum'] = 422;
    t['underscore'] = 500;
    t['quoteleft'] = 333;
    t['a'] = 500;
    t['b'] = 500;
    t['c'] = 444;
    t['d'] = 500;
    t['e'] = 444;
    t['f'] = 278;
    t['g'] = 500;
    t['h'] = 500;
    t['i'] = 278;
    t['j'] = 278;
    t['k'] = 444;
    t['l'] = 278;
    t['m'] = 722;
    t['n'] = 500;
    t['o'] = 500;
    t['p'] = 500;
    t['q'] = 500;
    t['r'] = 389;
    t['s'] = 389;
    t['t'] = 278;
    t['u'] = 500;
    t['v'] = 444;
    t['w'] = 667;
    t['x'] = 444;
    t['y'] = 444;
    t['z'] = 389;
    t['braceleft'] = 400;
    t['bar'] = 275;
    t['braceright'] = 400;
    t['asciitilde'] = 541;
    t['exclamdown'] = 389;
    t['cent'] = 500;
    t['sterling'] = 500;
    t['fraction'] = 167;
    t['yen'] = 500;
    t['florin'] = 500;
    t['section'] = 500;
    t['currency'] = 500;
    t['quotesingle'] = 214;
    t['quotedblleft'] = 556;
    t['guillemotleft'] = 500;
    t['guilsinglleft'] = 333;
    t['guilsinglright'] = 333;
    t['fi'] = 500;
    t['fl'] = 500;
    t['endash'] = 500;
    t['dagger'] = 500;
    t['daggerdbl'] = 500;
    t['periodcentered'] = 250;
    t['paragraph'] = 523;
    t['bullet'] = 350;
    t['quotesinglbase'] = 333;
    t['quotedblbase'] = 556;
    t['quotedblright'] = 556;
    t['guillemotright'] = 500;
    t['ellipsis'] = 889;
    t['perthousand'] = 1000;
    t['questiondown'] = 500;
    t['grave'] = 333;
    t['acute'] = 333;
    t['circumflex'] = 333;
    t['tilde'] = 333;
    t['macron'] = 333;
    t['breve'] = 333;
    t['dotaccent'] = 333;
    t['dieresis'] = 333;
    t['ring'] = 333;
    t['cedilla'] = 333;
    t['hungarumlaut'] = 333;
    t['ogonek'] = 333;
    t['caron'] = 333;
    t['emdash'] = 889;
    t['AE'] = 889;
    t['ordfeminine'] = 276;
    t['Lslash'] = 556;
    t['Oslash'] = 722;
    t['OE'] = 944;
    t['ordmasculine'] = 310;
    t['ae'] = 667;
    t['dotlessi'] = 278;
    t['lslash'] = 278;
    t['oslash'] = 500;
    t['oe'] = 667;
    t['germandbls'] = 500;
    t['Idieresis'] = 333;
    t['eacute'] = 444;
    t['abreve'] = 500;
    t['uhungarumlaut'] = 500;
    t['ecaron'] = 444;
    t['Ydieresis'] = 556;
    t['divide'] = 675;
    t['Yacute'] = 556;
    t['Acircumflex'] = 611;
    t['aacute'] = 500;
    t['Ucircumflex'] = 722;
    t['yacute'] = 444;
    t['scommaaccent'] = 389;
    t['ecircumflex'] = 444;
    t['Uring'] = 722;
    t['Udieresis'] = 722;
    t['aogonek'] = 500;
    t['Uacute'] = 722;
    t['uogonek'] = 500;
    t['Edieresis'] = 611;
    t['Dcroat'] = 722;
    t['commaaccent'] = 250;
    t['copyright'] = 760;
    t['Emacron'] = 611;
    t['ccaron'] = 444;
    t['aring'] = 500;
    t['Ncommaaccent'] = 667;
    t['lacute'] = 278;
    t['agrave'] = 500;
    t['Tcommaaccent'] = 556;
    t['Cacute'] = 667;
    t['atilde'] = 500;
    t['Edotaccent'] = 611;
    t['scaron'] = 389;
    t['scedilla'] = 389;
    t['iacute'] = 278;
    t['lozenge'] = 471;
    t['Rcaron'] = 611;
    t['Gcommaaccent'] = 722;
    t['ucircumflex'] = 500;
    t['acircumflex'] = 500;
    t['Amacron'] = 611;
    t['rcaron'] = 389;
    t['ccedilla'] = 444;
    t['Zdotaccent'] = 556;
    t['Thorn'] = 611;
    t['Omacron'] = 722;
    t['Racute'] = 611;
    t['Sacute'] = 500;
    t['dcaron'] = 544;
    t['Umacron'] = 722;
    t['uring'] = 500;
    t['threesuperior'] = 300;
    t['Ograve'] = 722;
    t['Agrave'] = 611;
    t['Abreve'] = 611;
    t['multiply'] = 675;
    t['uacute'] = 500;
    t['Tcaron'] = 556;
    t['partialdiff'] = 476;
    t['ydieresis'] = 444;
    t['Nacute'] = 667;
    t['icircumflex'] = 278;
    t['Ecircumflex'] = 611;
    t['adieresis'] = 500;
    t['edieresis'] = 444;
    t['cacute'] = 444;
    t['nacute'] = 500;
    t['umacron'] = 500;
    t['Ncaron'] = 667;
    t['Iacute'] = 333;
    t['plusminus'] = 675;
    t['brokenbar'] = 275;
    t['registered'] = 760;
    t['Gbreve'] = 722;
    t['Idotaccent'] = 333;
    t['summation'] = 600;
    t['Egrave'] = 611;
    t['racute'] = 389;
    t['omacron'] = 500;
    t['Zacute'] = 556;
    t['Zcaron'] = 556;
    t['greaterequal'] = 549;
    t['Eth'] = 722;
    t['Ccedilla'] = 667;
    t['lcommaaccent'] = 278;
    t['tcaron'] = 300;
    t['eogonek'] = 444;
    t['Uogonek'] = 722;
    t['Aacute'] = 611;
    t['Adieresis'] = 611;
    t['egrave'] = 444;
    t['zacute'] = 389;
    t['iogonek'] = 278;
    t['Oacute'] = 722;
    t['oacute'] = 500;
    t['amacron'] = 500;
    t['sacute'] = 389;
    t['idieresis'] = 278;
    t['Ocircumflex'] = 722;
    t['Ugrave'] = 722;
    t['Delta'] = 612;
    t['thorn'] = 500;
    t['twosuperior'] = 300;
    t['Odieresis'] = 722;
    t['mu'] = 500;
    t['igrave'] = 278;
    t['ohungarumlaut'] = 500;
    t['Eogonek'] = 611;
    t['dcroat'] = 500;
    t['threequarters'] = 750;
    t['Scedilla'] = 500;
    t['lcaron'] = 300;
    t['Kcommaaccent'] = 667;
    t['Lacute'] = 556;
    t['trademark'] = 980;
    t['edotaccent'] = 444;
    t['Igrave'] = 333;
    t['Imacron'] = 333;
    t['Lcaron'] = 611;
    t['onehalf'] = 750;
    t['lessequal'] = 549;
    t['ocircumflex'] = 500;
    t['ntilde'] = 500;
    t['Uhungarumlaut'] = 722;
    t['Eacute'] = 611;
    t['emacron'] = 444;
    t['gbreve'] = 500;
    t['onequarter'] = 750;
    t['Scaron'] = 500;
    t['Scommaaccent'] = 500;
    t['Ohungarumlaut'] = 722;
    t['degree'] = 400;
    t['ograve'] = 500;
    t['Ccaron'] = 667;
    t['ugrave'] = 500;
    t['radical'] = 453;
    t['Dcaron'] = 722;
    t['rcommaaccent'] = 389;
    t['Ntilde'] = 667;
    t['otilde'] = 500;
    t['Rcommaaccent'] = 611;
    t['Lcommaaccent'] = 556;
    t['Atilde'] = 611;
    t['Aogonek'] = 611;
    t['Aring'] = 611;
    t['Otilde'] = 722;
    t['zdotaccent'] = 389;
    t['Ecaron'] = 611;
    t['Iogonek'] = 333;
    t['kcommaaccent'] = 444;
    t['minus'] = 675;
    t['Icircumflex'] = 333;
    t['ncaron'] = 500;
    t['tcommaaccent'] = 278;
    t['logicalnot'] = 675;
    t['odieresis'] = 500;
    t['udieresis'] = 500;
    t['notequal'] = 549;
    t['gcommaaccent'] = 500;
    t['eth'] = 500;
    t['zcaron'] = 389;
    t['ncommaaccent'] = 500;
    t['onesuperior'] = 300;
    t['imacron'] = 278;
    t['Euro'] = 500;
  });
  t['ZapfDingbats'] = getLookupTableFactory(function (t) {
    t['space'] = 278;
    t['a1'] = 974;
    t['a2'] = 961;
    t['a202'] = 974;
    t['a3'] = 980;
    t['a4'] = 719;
    t['a5'] = 789;
    t['a119'] = 790;
    t['a118'] = 791;
    t['a117'] = 690;
    t['a11'] = 960;
    t['a12'] = 939;
    t['a13'] = 549;
    t['a14'] = 855;
    t['a15'] = 911;
    t['a16'] = 933;
    t['a105'] = 911;
    t['a17'] = 945;
    t['a18'] = 974;
    t['a19'] = 755;
    t['a20'] = 846;
    t['a21'] = 762;
    t['a22'] = 761;
    t['a23'] = 571;
    t['a24'] = 677;
    t['a25'] = 763;
    t['a26'] = 760;
    t['a27'] = 759;
    t['a28'] = 754;
    t['a6'] = 494;
    t['a7'] = 552;
    t['a8'] = 537;
    t['a9'] = 577;
    t['a10'] = 692;
    t['a29'] = 786;
    t['a30'] = 788;
    t['a31'] = 788;
    t['a32'] = 790;
    t['a33'] = 793;
    t['a34'] = 794;
    t['a35'] = 816;
    t['a36'] = 823;
    t['a37'] = 789;
    t['a38'] = 841;
    t['a39'] = 823;
    t['a40'] = 833;
    t['a41'] = 816;
    t['a42'] = 831;
    t['a43'] = 923;
    t['a44'] = 744;
    t['a45'] = 723;
    t['a46'] = 749;
    t['a47'] = 790;
    t['a48'] = 792;
    t['a49'] = 695;
    t['a50'] = 776;
    t['a51'] = 768;
    t['a52'] = 792;
    t['a53'] = 759;
    t['a54'] = 707;
    t['a55'] = 708;
    t['a56'] = 682;
    t['a57'] = 701;
    t['a58'] = 826;
    t['a59'] = 815;
    t['a60'] = 789;
    t['a61'] = 789;
    t['a62'] = 707;
    t['a63'] = 687;
    t['a64'] = 696;
    t['a65'] = 689;
    t['a66'] = 786;
    t['a67'] = 787;
    t['a68'] = 713;
    t['a69'] = 791;
    t['a70'] = 785;
    t['a71'] = 791;
    t['a72'] = 873;
    t['a73'] = 761;
    t['a74'] = 762;
    t['a203'] = 762;
    t['a75'] = 759;
    t['a204'] = 759;
    t['a76'] = 892;
    t['a77'] = 892;
    t['a78'] = 788;
    t['a79'] = 784;
    t['a81'] = 438;
    t['a82'] = 138;
    t['a83'] = 277;
    t['a84'] = 415;
    t['a97'] = 392;
    t['a98'] = 392;
    t['a99'] = 668;
    t['a100'] = 668;
    t['a89'] = 390;
    t['a90'] = 390;
    t['a93'] = 317;
    t['a94'] = 317;
    t['a91'] = 276;
    t['a92'] = 276;
    t['a205'] = 509;
    t['a85'] = 509;
    t['a206'] = 410;
    t['a86'] = 410;
    t['a87'] = 234;
    t['a88'] = 234;
    t['a95'] = 334;
    t['a96'] = 334;
    t['a101'] = 732;
    t['a102'] = 544;
    t['a103'] = 544;
    t['a104'] = 910;
    t['a106'] = 667;
    t['a107'] = 760;
    t['a108'] = 760;
    t['a112'] = 776;
    t['a111'] = 595;
    t['a110'] = 694;
    t['a109'] = 626;
    t['a120'] = 788;
    t['a121'] = 788;
    t['a122'] = 788;
    t['a123'] = 788;
    t['a124'] = 788;
    t['a125'] = 788;
    t['a126'] = 788;
    t['a127'] = 788;
    t['a128'] = 788;
    t['a129'] = 788;
    t['a130'] = 788;
    t['a131'] = 788;
    t['a132'] = 788;
    t['a133'] = 788;
    t['a134'] = 788;
    t['a135'] = 788;
    t['a136'] = 788;
    t['a137'] = 788;
    t['a138'] = 788;
    t['a139'] = 788;
    t['a140'] = 788;
    t['a141'] = 788;
    t['a142'] = 788;
    t['a143'] = 788;
    t['a144'] = 788;
    t['a145'] = 788;
    t['a146'] = 788;
    t['a147'] = 788;
    t['a148'] = 788;
    t['a149'] = 788;
    t['a150'] = 788;
    t['a151'] = 788;
    t['a152'] = 788;
    t['a153'] = 788;
    t['a154'] = 788;
    t['a155'] = 788;
    t['a156'] = 788;
    t['a157'] = 788;
    t['a158'] = 788;
    t['a159'] = 788;
    t['a160'] = 894;
    t['a161'] = 838;
    t['a163'] = 1016;
    t['a164'] = 458;
    t['a196'] = 748;
    t['a165'] = 924;
    t['a192'] = 748;
    t['a166'] = 918;
    t['a167'] = 927;
    t['a168'] = 928;
    t['a169'] = 928;
    t['a170'] = 834;
    t['a171'] = 873;
    t['a172'] = 828;
    t['a173'] = 924;
    t['a162'] = 924;
    t['a174'] = 917;
    t['a175'] = 930;
    t['a176'] = 931;
    t['a177'] = 463;
    t['a178'] = 883;
    t['a179'] = 836;
    t['a193'] = 836;
    t['a180'] = 867;
    t['a199'] = 867;
    t['a181'] = 696;
    t['a200'] = 696;
    t['a182'] = 874;
    t['a201'] = 874;
    t['a183'] = 760;
    t['a184'] = 946;
    t['a197'] = 771;
    t['a185'] = 865;
    t['a194'] = 771;
    t['a198'] = 888;
    t['a186'] = 967;
    t['a195'] = 888;
    t['a187'] = 831;
    t['a188'] = 873;
    t['a189'] = 927;
    t['a190'] = 970;
    t['a191'] = 918;
  });
});

exports.getMetrics = getMetrics;
}));



(function (root, factory) {
  {
    factory((root.pdfjsCoreMurmurHash3 = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {

var Uint32ArrayView = sharedUtil.Uint32ArrayView;

var MurmurHash3_64 = (function MurmurHash3_64Closure (seed) {
  // Workaround for missing math precison in JS.
  var MASK_HIGH = 0xffff0000;
  var MASK_LOW = 0xffff;

  function MurmurHash3_64 (seed) {
    var SEED = 0xc3d2e1f0;
    this.h1 = seed ? seed & 0xffffffff : SEED;
    this.h2 = seed ? seed & 0xffffffff : SEED;
  }

  var alwaysUseUint32ArrayView = false;
  // old webkits have issues with non-aligned arrays
  try {
    new Uint32Array(new Uint8Array(5).buffer, 0, 1);
  } catch (e) {
    alwaysUseUint32ArrayView = true;
  }

  MurmurHash3_64.prototype = {
    update: function MurmurHash3_64_update(input) {
      var useUint32ArrayView = alwaysUseUint32ArrayView;
      var i;
      if (typeof input === 'string') {
        var data = new Uint8Array(input.length * 2);
        var length = 0;
        for (i = 0; i < input.length; i++) {
          var code = input.charCodeAt(i);
          if (code <= 0xff) {
            data[length++] = code;
          }
          else {
            data[length++] = code >>> 8;
            data[length++] = code & 0xff;
          }
        }
      } else if (input instanceof Uint8Array) {
        data = input;
        length = data.length;
      } else if (typeof input === 'object' && ('length' in input)) {
        // processing regular arrays as well, e.g. for IE9
        data = input;
        length = data.length;
        useUint32ArrayView = true;
      } else {
        throw new Error('Wrong data format in MurmurHash3_64_update. ' +
                        'Input must be a string or array.');
      }

      var blockCounts = length >> 2;
      var tailLength = length - blockCounts * 4;
      // we don't care about endianness here
      var dataUint32 = useUint32ArrayView ?
        new Uint32ArrayView(data, blockCounts) :
        new Uint32Array(data.buffer, 0, blockCounts);
      var k1 = 0;
      var k2 = 0;
      var h1 = this.h1;
      var h2 = this.h2;
      var C1 = 0xcc9e2d51;
      var C2 = 0x1b873593;
      var C1_LOW = C1 & MASK_LOW;
      var C2_LOW = C2 & MASK_LOW;

      for (i = 0; i < blockCounts; i++) {
        if (i & 1) {
          k1 = dataUint32[i];
          k1 = (k1 * C1 & MASK_HIGH) | (k1 * C1_LOW & MASK_LOW);
          k1 = k1 << 15 | k1 >>> 17;
          k1 = (k1 * C2 & MASK_HIGH) | (k1 * C2_LOW & MASK_LOW);
          h1 ^= k1;
          h1 = h1 << 13 | h1 >>> 19;
          h1 = h1 * 5 + 0xe6546b64;
        } else {
          k2 = dataUint32[i];
          k2 = (k2 * C1 & MASK_HIGH) | (k2 * C1_LOW & MASK_LOW);
          k2 = k2 << 15 | k2 >>> 17;
          k2 = (k2 * C2 & MASK_HIGH) | (k2 * C2_LOW & MASK_LOW);
          h2 ^= k2;
          h2 = h2 << 13 | h2 >>> 19;
          h2 = h2 * 5 + 0xe6546b64;
        }
      }

      k1 = 0;

      switch (tailLength) {
        case 3:
          k1 ^= data[blockCounts * 4 + 2] << 16;
          /* falls through */
        case 2:
          k1 ^= data[blockCounts * 4 + 1] << 8;
          /* falls through */
        case 1:
          k1 ^= data[blockCounts * 4];
          /* falls through */
        k1 = (k1 * C1 & MASK_HIGH) | (k1 * C1_LOW & MASK_LOW);
        k1 = k1 << 15 | k1 >>> 17;
        k1 = (k1 * C2 & MASK_HIGH) | (k1 * C2_LOW & MASK_LOW);
        if (blockCounts & 1) {
          h1 ^= k1;
        } else {
          h2 ^= k1;
        }
      }

      this.h1 = h1;
      this.h2 = h2;
      return this;
    },

    hexdigest: function MurmurHash3_64_hexdigest () {
      var h1 = this.h1;
      var h2 = this.h2;

      h1 ^= h2 >>> 1;
      h1 = (h1 * 0xed558ccd & MASK_HIGH) | (h1 * 0x8ccd & MASK_LOW);
      h2 = (h2 * 0xff51afd7 & MASK_HIGH) |
           (((h2 << 16 | h1 >>> 16) * 0xafd7ed55 & MASK_HIGH) >>> 16);
      h1 ^= h2 >>> 1;
      h1 = (h1 * 0x1a85ec53 & MASK_HIGH) | (h1 * 0xec53 & MASK_LOW);
      h2 = (h2 * 0xc4ceb9fe & MASK_HIGH) |
           (((h2 << 16 | h1 >>> 16) * 0xb9fe1a85 & MASK_HIGH) >>> 16);
      h1 ^= h2 >>> 1;

      for (var i = 0, arr = [h1, h2], str = ''; i < arr.length; i++) {
        var hex = (arr[i] >>> 0).toString(16);
        while (hex.length < 8) {
          hex = '0' + hex;
        }
        str += hex;
      }

      return str;
    }
  };

  return MurmurHash3_64;
})();

exports.MurmurHash3_64 = MurmurHash3_64;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCorePrimitives = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {

var isArray = sharedUtil.isArray;

var Name = (function NameClosure() {
  function Name(name) {
    this.name = name;
  }

  Name.prototype = {};

  var nameCache = Object.create(null);

  Name.get = function Name_get(name) {
    var nameValue = nameCache[name];
    return (nameValue ? nameValue : (nameCache[name] = new Name(name)));
  };

  return Name;
})();

var Cmd = (function CmdClosure() {
  function Cmd(cmd) {
    this.cmd = cmd;
  }

  Cmd.prototype = {};

  var cmdCache = Object.create(null);

  Cmd.get = function Cmd_get(cmd) {
    var cmdValue = cmdCache[cmd];
    return (cmdValue ? cmdValue : (cmdCache[cmd] = new Cmd(cmd)));
  };

  return Cmd;
})();

var Dict = (function DictClosure() {
  var nonSerializable = function nonSerializableClosure() {
    return nonSerializable; // creating closure on some variable
  };

  // xref is optional
  function Dict(xref) {
    // Map should only be used internally, use functions below to access.
    this.map = Object.create(null);
    this.xref = xref;
    this.objId = null;
    this.__nonSerializable__ = nonSerializable; // disable cloning of the Dict
  }

  Dict.prototype = {
    assignXref: function Dict_assignXref(newXref) {
      this.xref = newXref;
    },

    // automatically dereferences Ref objects
    get: function Dict_get(key1, key2, key3) {
      var value;
      var xref = this.xref;
      if (typeof (value = this.map[key1]) !== 'undefined' || key1 in this.map ||
          typeof key2 === 'undefined') {
        return xref ? xref.fetchIfRef(value) : value;
      }
      if (typeof (value = this.map[key2]) !== 'undefined' || key2 in this.map ||
          typeof key3 === 'undefined') {
        return xref ? xref.fetchIfRef(value) : value;
      }
      value = this.map[key3] || null;
      return xref ? xref.fetchIfRef(value) : value;
    },

    // Same as get(), but returns a promise and uses fetchIfRefAsync().
    getAsync: function Dict_getAsync(key1, key2, key3) {
      var value;
      var xref = this.xref;
      if (typeof (value = this.map[key1]) !== 'undefined' || key1 in this.map ||
          typeof key2 === 'undefined') {
        if (xref) {
          return xref.fetchIfRefAsync(value);
        }
        return Promise.resolve(value);
      }
      if (typeof (value = this.map[key2]) !== 'undefined' || key2 in this.map ||
          typeof key3 === 'undefined') {
        if (xref) {
          return xref.fetchIfRefAsync(value);
        }
        return Promise.resolve(value);
      }
      value = this.map[key3] || null;
      if (xref) {
        return xref.fetchIfRefAsync(value);
      }
      return Promise.resolve(value);
    },

    // Same as get(), but dereferences all elements if the result is an Array.
    getArray: function Dict_getArray(key1, key2, key3) {
      var value = this.get(key1, key2, key3);
      var xref = this.xref;
      if (!isArray(value) || !xref) {
        return value;
      }
      value = value.slice(); // Ensure that we don't modify the Dict data.
      for (var i = 0, ii = value.length; i < ii; i++) {
        if (!isRef(value[i])) {
          continue;
        }
        value[i] = xref.fetch(value[i]);
      }
      return value;
    },

    // no dereferencing
    getRaw: function Dict_getRaw(key) {
      return this.map[key];
    },

    getKeys: function Dict_getKeys() {
      return Object.keys(this.map);
    },

    set: function Dict_set(key, value) {
      this.map[key] = value;
    },

    has: function Dict_has(key) {
      return key in this.map;
    },

    forEach: function Dict_forEach(callback) {
      for (var key in this.map) {
        callback(key, this.get(key));
      }
    }
  };

  Dict.empty = new Dict(null);

  Dict.merge = function Dict_merge(xref, dictArray) {
    var mergedDict = new Dict(xref);

    for (var i = 0, ii = dictArray.length; i < ii; i++) {
      var dict = dictArray[i];
      if (!isDict(dict)) {
        continue;
      }
      for (var keyName in dict.map) {
        if (mergedDict.map[keyName]) {
          continue;
        }
        mergedDict.map[keyName] = dict.map[keyName];
      }
    }
    return mergedDict;
  };

  return Dict;
})();

var Ref = (function RefClosure() {
  function Ref(num, gen) {
    this.num = num;
    this.gen = gen;
  }

  Ref.prototype = {
    toString: function Ref_toString() {
      // This function is hot, so we make the string as compact as possible.
      // |this.gen| is almost always zero, so we treat that case specially.
      var str = this.num + 'R';
      if (this.gen !== 0) {
        str += this.gen;
      }
      return str;
    }
  };

  return Ref;
})();

// The reference is identified by number and generation.
// This structure stores only one instance of the reference.
var RefSet = (function RefSetClosure() {
  function RefSet() {
    this.dict = Object.create(null);
  }

  RefSet.prototype = {
    has: function RefSet_has(ref) {
      return ref.toString() in this.dict;
    },

    put: function RefSet_put(ref) {
      this.dict[ref.toString()] = true;
    },

    remove: function RefSet_remove(ref) {
      delete this.dict[ref.toString()];
    }
  };

  return RefSet;
})();

var RefSetCache = (function RefSetCacheClosure() {
  function RefSetCache() {
    this.dict = Object.create(null);
  }

  RefSetCache.prototype = {
    get: function RefSetCache_get(ref) {
      return this.dict[ref.toString()];
    },

    has: function RefSetCache_has(ref) {
      return ref.toString() in this.dict;
    },

    put: function RefSetCache_put(ref, obj) {
      this.dict[ref.toString()] = obj;
    },

    putAlias: function RefSetCache_putAlias(ref, aliasRef) {
      this.dict[ref.toString()] = this.get(aliasRef);
    },

    forEach: function RefSetCache_forEach(fn, thisArg) {
      for (var i in this.dict) {
        fn.call(thisArg, this.dict[i]);
      }
    },

    clear: function RefSetCache_clear() {
      this.dict = Object.create(null);
    }
  };

  return RefSetCache;
})();

function isName(v) {
  return v instanceof Name;
}

function isCmd(v, cmd) {
  return v instanceof Cmd && (cmd === undefined || v.cmd === cmd);
}

function isDict(v, type) {
  if (!(v instanceof Dict)) {
    return false;
  }
  if (!type) {
    return true;
  }
  var dictType = v.get('Type');
  return isName(dictType) && dictType.name === type;
}

function isRef(v) {
  return v instanceof Ref;
}

function isRefsEqual(v1, v2) {
  return v1.num === v2.num && v1.gen === v2.gen;
}

function isStream(v) {
  return typeof v === 'object' && v !== null && v.getBytes !== undefined;
}

exports.Cmd = Cmd;
exports.Dict = Dict;
exports.Name = Name;
exports.Ref = Ref;
exports.RefSet = RefSet;
exports.RefSetCache = RefSetCache;
exports.isCmd = isCmd;
exports.isDict = isDict;
exports.isName = isName;
exports.isRef = isRef;
exports.isRefsEqual = isRefsEqual;
exports.isStream = isStream;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreStandardFonts = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {
  var getLookupTableFactory = sharedUtil.getLookupTableFactory;

  /**
   * Hold a map of decoded fonts and of the standard fourteen Type1
   * fonts and their acronyms.
   */
  var getStdFontMap = getLookupTableFactory(function (t) {
    t['ArialNarrow'] = 'Helvetica';
    t['ArialNarrow-Bold'] = 'Helvetica-Bold';
    t['ArialNarrow-BoldItalic'] = 'Helvetica-BoldOblique';
    t['ArialNarrow-Italic'] = 'Helvetica-Oblique';
    t['ArialBlack'] = 'Helvetica';
    t['ArialBlack-Bold'] = 'Helvetica-Bold';
    t['ArialBlack-BoldItalic'] = 'Helvetica-BoldOblique';
    t['ArialBlack-Italic'] = 'Helvetica-Oblique';
    t['Arial'] = 'Helvetica';
    t['Arial-Bold'] = 'Helvetica-Bold';
    t['Arial-BoldItalic'] = 'Helvetica-BoldOblique';
    t['Arial-Italic'] = 'Helvetica-Oblique';
    t['Arial-BoldItalicMT'] = 'Helvetica-BoldOblique';
    t['Arial-BoldMT'] = 'Helvetica-Bold';
    t['Arial-ItalicMT'] = 'Helvetica-Oblique';
    t['ArialMT'] = 'Helvetica';
    t['Courier-Bold'] = 'Courier-Bold';
    t['Courier-BoldItalic'] = 'Courier-BoldOblique';
    t['Courier-Italic'] = 'Courier-Oblique';
    t['CourierNew'] = 'Courier';
    t['CourierNew-Bold'] = 'Courier-Bold';
    t['CourierNew-BoldItalic'] = 'Courier-BoldOblique';
    t['CourierNew-Italic'] = 'Courier-Oblique';
    t['CourierNewPS-BoldItalicMT'] = 'Courier-BoldOblique';
    t['CourierNewPS-BoldMT'] = 'Courier-Bold';
    t['CourierNewPS-ItalicMT'] = 'Courier-Oblique';
    t['CourierNewPSMT'] = 'Courier';
    t['Helvetica'] = 'Helvetica';
    t['Helvetica-Bold'] = 'Helvetica-Bold';
    t['Helvetica-BoldItalic'] = 'Helvetica-BoldOblique';
    t['Helvetica-BoldOblique'] = 'Helvetica-BoldOblique';
    t['Helvetica-Italic'] = 'Helvetica-Oblique';
    t['Helvetica-Oblique'] = 'Helvetica-Oblique';
    t['Symbol-Bold'] = 'Symbol';
    t['Symbol-BoldItalic'] = 'Symbol';
    t['Symbol-Italic'] = 'Symbol';
    t['TimesNewRoman'] = 'Times-Roman';
    t['TimesNewRoman-Bold'] = 'Times-Bold';
    t['TimesNewRoman-BoldItalic'] = 'Times-BoldItalic';
    t['TimesNewRoman-Italic'] = 'Times-Italic';
    t['TimesNewRomanPS'] = 'Times-Roman';
    t['TimesNewRomanPS-Bold'] = 'Times-Bold';
    t['TimesNewRomanPS-BoldItalic'] = 'Times-BoldItalic';
    t['TimesNewRomanPS-BoldItalicMT'] = 'Times-BoldItalic';
    t['TimesNewRomanPS-BoldMT'] = 'Times-Bold';
    t['TimesNewRomanPS-Italic'] = 'Times-Italic';
    t['TimesNewRomanPS-ItalicMT'] = 'Times-Italic';
    t['TimesNewRomanPSMT'] = 'Times-Roman';
    t['TimesNewRomanPSMT-Bold'] = 'Times-Bold';
    t['TimesNewRomanPSMT-BoldItalic'] = 'Times-BoldItalic';
    t['TimesNewRomanPSMT-Italic'] = 'Times-Italic';
  });

  /**
   * Holds the map of the non-standard fonts that might be included as
   * a standard fonts without glyph data.
   */
  var getNonStdFontMap = getLookupTableFactory(function (t) {
    t['CenturyGothic'] = 'Helvetica';
    t['CenturyGothic-Bold'] = 'Helvetica-Bold';
    t['CenturyGothic-BoldItalic'] = 'Helvetica-BoldOblique';
    t['CenturyGothic-Italic'] = 'Helvetica-Oblique';
    t['ComicSansMS'] = 'Comic Sans MS';
    t['ComicSansMS-Bold'] = 'Comic Sans MS-Bold';
    t['ComicSansMS-BoldItalic'] = 'Comic Sans MS-BoldItalic';
    t['ComicSansMS-Italic'] = 'Comic Sans MS-Italic';
    t['LucidaConsole'] = 'Courier';
    t['LucidaConsole-Bold'] = 'Courier-Bold';
    t['LucidaConsole-BoldItalic'] = 'Courier-BoldOblique';
    t['LucidaConsole-Italic'] = 'Courier-Oblique';
    t['MS-Gothic'] = 'MS Gothic';
    t['MS-Gothic-Bold'] = 'MS Gothic-Bold';
    t['MS-Gothic-BoldItalic'] = 'MS Gothic-BoldItalic';
    t['MS-Gothic-Italic'] = 'MS Gothic-Italic';
    t['MS-Mincho'] = 'MS Mincho';
    t['MS-Mincho-Bold'] = 'MS Mincho-Bold';
    t['MS-Mincho-BoldItalic'] = 'MS Mincho-BoldItalic';
    t['MS-Mincho-Italic'] = 'MS Mincho-Italic';
    t['MS-PGothic'] = 'MS PGothic';
    t['MS-PGothic-Bold'] = 'MS PGothic-Bold';
    t['MS-PGothic-BoldItalic'] = 'MS PGothic-BoldItalic';
    t['MS-PGothic-Italic'] = 'MS PGothic-Italic';
    t['MS-PMincho'] = 'MS PMincho';
    t['MS-PMincho-Bold'] = 'MS PMincho-Bold';
    t['MS-PMincho-BoldItalic'] = 'MS PMincho-BoldItalic';
    t['MS-PMincho-Italic'] = 'MS PMincho-Italic';
    t['Wingdings'] = 'ZapfDingbats';
  });

  var getSerifFonts = getLookupTableFactory(function (t) {
    t['Adobe Jenson'] = true;
    t['Adobe Text'] = true;
    t['Albertus'] = true;
    t['Aldus'] = true;
    t['Alexandria'] = true;
    t['Algerian'] = true;
    t['American Typewriter'] = true;
    t['Antiqua'] = true;
    t['Apex'] = true;
    t['Arno'] = true;
    t['Aster'] = true;
    t['Aurora'] = true;
    t['Baskerville'] = true;
    t['Bell'] = true;
    t['Bembo'] = true;
    t['Bembo Schoolbook'] = true;
    t['Benguiat'] = true;
    t['Berkeley Old Style'] = true;
    t['Bernhard Modern'] = true;
    t['Berthold City'] = true;
    t['Bodoni'] = true;
    t['Bauer Bodoni'] = true;
    t['Book Antiqua'] = true;
    t['Bookman'] = true;
    t['Bordeaux Roman'] = true;
    t['Californian FB'] = true;
    t['Calisto'] = true;
    t['Calvert'] = true;
    t['Capitals'] = true;
    t['Cambria'] = true;
    t['Cartier'] = true;
    t['Caslon'] = true;
    t['Catull'] = true;
    t['Centaur'] = true;
    t['Century Old Style'] = true;
    t['Century Schoolbook'] = true;
    t['Chaparral'] = true;
    t['Charis SIL'] = true;
    t['Cheltenham'] = true;
    t['Cholla Slab'] = true;
    t['Clarendon'] = true;
    t['Clearface'] = true;
    t['Cochin'] = true;
    t['Colonna'] = true;
    t['Computer Modern'] = true;
    t['Concrete Roman'] = true;
    t['Constantia'] = true;
    t['Cooper Black'] = true;
    t['Corona'] = true;
    t['Ecotype'] = true;
    t['Egyptienne'] = true;
    t['Elephant'] = true;
    t['Excelsior'] = true;
    t['Fairfield'] = true;
    t['FF Scala'] = true;
    t['Folkard'] = true;
    t['Footlight'] = true;
    t['FreeSerif'] = true;
    t['Friz Quadrata'] = true;
    t['Garamond'] = true;
    t['Gentium'] = true;
    t['Georgia'] = true;
    t['Gloucester'] = true;
    t['Goudy Old Style'] = true;
    t['Goudy Schoolbook'] = true;
    t['Goudy Pro Font'] = true;
    t['Granjon'] = true;
    t['Guardian Egyptian'] = true;
    t['Heather'] = true;
    t['Hercules'] = true;
    t['High Tower Text'] = true;
    t['Hiroshige'] = true;
    t['Hoefler Text'] = true;
    t['Humana Serif'] = true;
    t['Imprint'] = true;
    t['Ionic No. 5'] = true;
    t['Janson'] = true;
    t['Joanna'] = true;
    t['Korinna'] = true;
    t['Lexicon'] = true;
    t['Liberation Serif'] = true;
    t['Linux Libertine'] = true;
    t['Literaturnaya'] = true;
    t['Lucida'] = true;
    t['Lucida Bright'] = true;
    t['Melior'] = true;
    t['Memphis'] = true;
    t['Miller'] = true;
    t['Minion'] = true;
    t['Modern'] = true;
    t['Mona Lisa'] = true;
    t['Mrs Eaves'] = true;
    t['MS Serif'] = true;
    t['Museo Slab'] = true;
    t['New York'] = true;
    t['Nimbus Roman'] = true;
    t['NPS Rawlinson Roadway'] = true;
    t['Palatino'] = true;
    t['Perpetua'] = true;
    t['Plantin'] = true;
    t['Plantin Schoolbook'] = true;
    t['Playbill'] = true;
    t['Poor Richard'] = true;
    t['Rawlinson Roadway'] = true;
    t['Renault'] = true;
    t['Requiem'] = true;
    t['Rockwell'] = true;
    t['Roman'] = true;
    t['Rotis Serif'] = true;
    t['Sabon'] = true;
    t['Scala'] = true;
    t['Seagull'] = true;
    t['Sistina'] = true;
    t['Souvenir'] = true;
    t['STIX'] = true;
    t['Stone Informal'] = true;
    t['Stone Serif'] = true;
    t['Sylfaen'] = true;
    t['Times'] = true;
    t['Trajan'] = true;
    t['Trinité'] = true;
    t['Trump Mediaeval'] = true;
    t['Utopia'] = true;
    t['Vale Type'] = true;
    t['Bitstream Vera'] = true;
    t['Vera Serif'] = true;
    t['Versailles'] = true;
    t['Wanted'] = true;
    t['Weiss'] = true;
    t['Wide Latin'] = true;
    t['Windsor'] = true;
    t['XITS'] = true;
  });

  var getSymbolsFonts = getLookupTableFactory(function (t) {
    t['Dingbats'] = true;
    t['Symbol'] = true;
    t['ZapfDingbats'] = true;
  });

  // Glyph map for well-known standard fonts. Sometimes Ghostscript uses CID
  // fonts, but does not embed the CID to GID mapping. The mapping is incomplete
  // for all glyphs, but common for some set of the standard fonts.
  var getGlyphMapForStandardFonts = getLookupTableFactory(function (t) {
    t[2] = 10; t[3] = 32; t[4] = 33; t[5] = 34; t[6] = 35; t[7] = 36; t[8] = 37;
    t[9] = 38; t[10] = 39; t[11] = 40; t[12] = 41; t[13] = 42; t[14] = 43;
    t[15] = 44; t[16] = 45; t[17] = 46; t[18] = 47; t[19] = 48; t[20] = 49;
    t[21] = 50; t[22] = 51; t[23] = 52; t[24] = 53; t[25] = 54; t[26] = 55;
    t[27] = 56; t[28] = 57; t[29] = 58; t[30] = 894; t[31] = 60; t[32] = 61;
    t[33] = 62; t[34] = 63; t[35] = 64; t[36] = 65; t[37] = 66; t[38] = 67;
    t[39] = 68; t[40] = 69; t[41] = 70; t[42] = 71; t[43] = 72; t[44] = 73;
    t[45] = 74; t[46] = 75; t[47] = 76; t[48] = 77; t[49] = 78; t[50] = 79;
    t[51] = 80; t[52] = 81; t[53] = 82; t[54] = 83; t[55] = 84; t[56] = 85;
    t[57] = 86; t[58] = 87; t[59] = 88; t[60] = 89; t[61] = 90; t[62] = 91;
    t[63] = 92; t[64] = 93; t[65] = 94; t[66] = 95; t[67] = 96; t[68] = 97;
    t[69] = 98; t[70] = 99; t[71] = 100; t[72] = 101; t[73] = 102; t[74] = 103;
    t[75] = 104; t[76] = 105; t[77] = 106; t[78] = 107; t[79] = 108;
    t[80] = 109; t[81] = 110; t[82] = 111; t[83] = 112; t[84] = 113;
    t[85] = 114; t[86] = 115; t[87] = 116; t[88] = 117; t[89] = 118;
    t[90] = 119; t[91] = 120; t[92] = 121; t[93] = 122; t[94] = 123;
    t[95] = 124; t[96] = 125; t[97] = 126; t[98] = 196; t[99] = 197;
    t[100] = 199; t[101] = 201; t[102] = 209; t[103] = 214; t[104] = 220;
    t[105] = 225; t[106] = 224; t[107] = 226; t[108] = 228; t[109] = 227;
    t[110] = 229; t[111] = 231; t[112] = 233; t[113] = 232; t[114] = 234;
    t[115] = 235; t[116] = 237; t[117] = 236; t[118] = 238; t[119] = 239;
    t[120] = 241; t[121] = 243; t[122] = 242; t[123] = 244; t[124] = 246;
    t[125] = 245; t[126] = 250; t[127] = 249; t[128] = 251; t[129] = 252;
    t[130] = 8224; t[131] = 176; t[132] = 162; t[133] = 163; t[134] = 167;
    t[135] = 8226; t[136] = 182; t[137] = 223; t[138] = 174; t[139] = 169;
    t[140] = 8482; t[141] = 180; t[142] = 168; t[143] = 8800; t[144] = 198;
    t[145] = 216; t[146] = 8734; t[147] = 177; t[148] = 8804; t[149] = 8805;
    t[150] = 165; t[151] = 181; t[152] = 8706; t[153] = 8721; t[154] = 8719;
    t[156] = 8747; t[157] = 170; t[158] = 186; t[159] = 8486; t[160] = 230;
    t[161] = 248; t[162] = 191; t[163] = 161; t[164] = 172; t[165] = 8730;
    t[166] = 402; t[167] = 8776; t[168] = 8710; t[169] = 171; t[170] = 187;
    t[171] = 8230; t[210] = 218; t[223] = 711; t[224] = 321; t[225] = 322;
    t[227] = 353; t[229] = 382; t[234] = 253; t[252] = 263; t[253] = 268;
    t[254] = 269; t[258] = 258; t[260] = 260; t[261] = 261; t[265] = 280;
    t[266] = 281; t[268] = 283; t[269] = 313; t[275] = 323; t[276] = 324;
    t[278] = 328; t[284] = 345; t[285] = 346; t[286] = 347; t[292] = 367;
    t[295] = 377; t[296] = 378; t[298] = 380; t[305] = 963; t[306] = 964;
    t[307] = 966; t[308] = 8215; t[309] = 8252; t[310] = 8319; t[311] = 8359;
    t[312] = 8592; t[313] = 8593; t[337] = 9552; t[493] = 1039;
    t[494] = 1040; t[705] = 1524; t[706] = 8362; t[710] = 64288; t[711] = 64298;
    t[759] = 1617; t[761] = 1776; t[763] = 1778; t[775] = 1652; t[777] = 1764;
    t[778] = 1780; t[779] = 1781; t[780] = 1782; t[782] = 771; t[783] = 64726;
    t[786] = 8363; t[788] = 8532; t[790] = 768; t[791] = 769; t[792] = 768;
    t[795] = 803; t[797] = 64336; t[798] = 64337; t[799] = 64342;
    t[800] = 64343; t[801] = 64344; t[802] = 64345; t[803] = 64362;
    t[804] = 64363; t[805] = 64364; t[2424] = 7821; t[2425] = 7822;
    t[2426] = 7823; t[2427] = 7824; t[2428] = 7825; t[2429] = 7826;
    t[2430] = 7827; t[2433] = 7682; t[2678] = 8045; t[2679] = 8046;
    t[2830] = 1552; t[2838] = 686; t[2840] = 751; t[2842] = 753; t[2843] = 754;
    t[2844] = 755; t[2846] = 757; t[2856] = 767; t[2857] = 848; t[2858] = 849;
    t[2862] = 853; t[2863] = 854; t[2864] = 855; t[2865] = 861; t[2866] = 862;
    t[2906] = 7460; t[2908] = 7462; t[2909] = 7463; t[2910] = 7464;
    t[2912] = 7466; t[2913] = 7467; t[2914] = 7468; t[2916] = 7470;
    t[2917] = 7471; t[2918] = 7472; t[2920] = 7474; t[2921] = 7475;
    t[2922] = 7476; t[2924] = 7478; t[2925] = 7479; t[2926] = 7480;
    t[2928] = 7482; t[2929] = 7483; t[2930] = 7484; t[2932] = 7486;
    t[2933] = 7487; t[2934] = 7488; t[2936] = 7490; t[2937] = 7491;
    t[2938] = 7492; t[2940] = 7494; t[2941] = 7495; t[2942] = 7496;
    t[2944] = 7498; t[2946] = 7500; t[2948] = 7502; t[2950] = 7504;
    t[2951] = 7505; t[2952] = 7506; t[2954] = 7508; t[2955] = 7509;
    t[2956] = 7510; t[2958] = 7512; t[2959] = 7513; t[2960] = 7514;
    t[2962] = 7516; t[2963] = 7517; t[2964] = 7518; t[2966] = 7520;
    t[2967] = 7521; t[2968] = 7522; t[2970] = 7524; t[2971] = 7525;
    t[2972] = 7526; t[2974] = 7528; t[2975] = 7529; t[2976] = 7530;
    t[2978] = 1537; t[2979] = 1538; t[2980] = 1539; t[2982] = 1549;
    t[2983] = 1551; t[2984] = 1552; t[2986] = 1554; t[2987] = 1555;
    t[2988] = 1556; t[2990] = 1623; t[2991] = 1624; t[2995] = 1775;
    t[2999] = 1791; t[3002] = 64290; t[3003] = 64291; t[3004] = 64292;
    t[3006] = 64294; t[3007] = 64295; t[3008] = 64296; t[3011] = 1900;
    t[3014] = 8223; t[3015] = 8244; t[3017] = 7532; t[3018] = 7533;
    t[3019] = 7534; t[3075] = 7590; t[3076] = 7591; t[3079] = 7594;
    t[3080] = 7595; t[3083] = 7598; t[3084] = 7599; t[3087] = 7602;
    t[3088] = 7603; t[3091] = 7606; t[3092] = 7607; t[3095] = 7610;
    t[3096] = 7611; t[3099] = 7614; t[3100] = 7615; t[3103] = 7618;
    t[3104] = 7619; t[3107] = 8337; t[3108] = 8338; t[3116] = 1884;
    t[3119] = 1885; t[3120] = 1885; t[3123] = 1886; t[3124] = 1886;
    t[3127] = 1887; t[3128] = 1887; t[3131] = 1888; t[3132] = 1888;
    t[3135] = 1889; t[3136] = 1889; t[3139] = 1890; t[3140] = 1890;
    t[3143] = 1891; t[3144] = 1891; t[3147] = 1892; t[3148] = 1892;
    t[3153] = 580; t[3154] = 581; t[3157] = 584; t[3158] = 585; t[3161] = 588;
    t[3162] = 589; t[3165] = 891; t[3166] = 892; t[3169] = 1274; t[3170] = 1275;
    t[3173] = 1278; t[3174] = 1279; t[3181] = 7622; t[3182] = 7623;
    t[3282] = 11799; t[3316] = 578; t[3379] = 42785; t[3393] = 1159;
    t[3416] = 8377;
  });

  // The glyph map for ArialBlack differs slightly from the glyph map used for
  // other well-known standard fonts. Hence we use this (incomplete) CID to GID
  // mapping to adjust the glyph map for non-embedded ArialBlack fonts.
  var getSupplementalGlyphMapForArialBlack =
      getLookupTableFactory(function (t) {
    t[227] = 322; t[264] = 261; t[291] = 346;
  });

  exports.getStdFontMap = getStdFontMap;
  exports.getNonStdFontMap = getNonStdFontMap;
  exports.getSerifFonts = getSerifFonts;
  exports.getSymbolsFonts = getSymbolsFonts;
  exports.getGlyphMapForStandardFonts = getGlyphMapForStandardFonts;
  exports.getSupplementalGlyphMapForArialBlack =
    getSupplementalGlyphMapForArialBlack;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreUnicode = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {
  var getLookupTableFactory = sharedUtil.getLookupTableFactory;

  // Some characters, e.g. copyrightserif, are mapped to the private use area
  // and might not be displayed using standard fonts. Mapping/hacking well-known
  // chars to the similar equivalents in the normal characters range.
  var getSpecialPUASymbols = getLookupTableFactory(function (t) {
    t[63721] = 0x00A9; // copyrightsans (0xF8E9) => copyright
    t[63193] = 0x00A9; // copyrightserif (0xF6D9) => copyright
    t[63720] = 0x00AE; // registersans (0xF8E8) => registered
    t[63194] = 0x00AE; // registerserif (0xF6DA) => registered
    t[63722] = 0x2122; // trademarksans (0xF8EA) => trademark
    t[63195] = 0x2122; // trademarkserif (0xF6DB) => trademark
    t[63729] = 0x23A7; // bracelefttp (0xF8F1)
    t[63730] = 0x23A8; // braceleftmid (0xF8F2)
    t[63731] = 0x23A9; // braceleftbt (0xF8F3)
    t[63740] = 0x23AB; // bracerighttp (0xF8FC)
    t[63741] = 0x23AC; // bracerightmid (0xF8FD)
    t[63742] = 0x23AD; // bracerightbt (0xF8FE)
    t[63726] = 0x23A1; // bracketlefttp (0xF8EE)
    t[63727] = 0x23A2; // bracketleftex (0xF8EF)
    t[63728] = 0x23A3; // bracketleftbt (0xF8F0)
    t[63737] = 0x23A4; // bracketrighttp (0xF8F9)
    t[63738] = 0x23A5; // bracketrightex (0xF8FA)
    t[63739] = 0x23A6; // bracketrightbt (0xF8FB)
    t[63723] = 0x239B; // parenlefttp (0xF8EB)
    t[63724] = 0x239C; // parenleftex (0xF8EC)
    t[63725] = 0x239D; // parenleftbt (0xF8ED)
    t[63734] = 0x239E; // parenrighttp (0xF8F6)
    t[63735] = 0x239F; // parenrightex (0xF8F7)
    t[63736] = 0x23A0; // parenrightbt (0xF8F8)
  });

  function mapSpecialUnicodeValues(code) {
    if (code >= 0xFFF0 && code <= 0xFFFF) { // Specials unicode block.
      return 0;
    } else if (code >= 0xF600 && code <= 0xF8FF) {
      return (getSpecialPUASymbols()[code] || code);
    }
    return code;
  }

  function getUnicodeForGlyph(name, glyphsUnicodeMap) {
    var unicode = glyphsUnicodeMap[name];
    if (unicode !== undefined) {
      return unicode;
    }
    if (!name) {
      return -1;
    }
    // Try to recover valid Unicode values from 'uniXXXX'/'uXXXX{XX}' glyphs.
    if (name[0] === 'u') {
      var nameLen = name.length, hexStr;

      if (nameLen === 7 && name[1] === 'n' && name[2] === 'i') { // 'uniXXXX'
        hexStr = name.substr(3);
      } else if (nameLen >= 5 && nameLen <= 7) { // 'uXXXX{XX}'
        hexStr = name.substr(1);
      } else {
        return -1;
      }
      // Check for upper-case hexadecimal characters, to avoid false positives.
      if (hexStr === hexStr.toUpperCase()) {
        unicode = parseInt(hexStr, 16);
        if (unicode >= 0) {
          return unicode;
        }
      }
    }
    return -1;
  }

  var UnicodeRanges = [
    { 'begin': 0x0000, 'end': 0x007F }, // Basic Latin
    { 'begin': 0x0080, 'end': 0x00FF }, // Latin-1 Supplement
    { 'begin': 0x0100, 'end': 0x017F }, // Latin Extended-A
    { 'begin': 0x0180, 'end': 0x024F }, // Latin Extended-B
    { 'begin': 0x0250, 'end': 0x02AF }, // IPA Extensions
    { 'begin': 0x02B0, 'end': 0x02FF }, // Spacing Modifier Letters
    { 'begin': 0x0300, 'end': 0x036F }, // Combining Diacritical Marks
    { 'begin': 0x0370, 'end': 0x03FF }, // Greek and Coptic
    { 'begin': 0x2C80, 'end': 0x2CFF }, // Coptic
    { 'begin': 0x0400, 'end': 0x04FF }, // Cyrillic
    { 'begin': 0x0530, 'end': 0x058F }, // Armenian
    { 'begin': 0x0590, 'end': 0x05FF }, // Hebrew
    { 'begin': 0xA500, 'end': 0xA63F }, // Vai
    { 'begin': 0x0600, 'end': 0x06FF }, // Arabic
    { 'begin': 0x07C0, 'end': 0x07FF }, // NKo
    { 'begin': 0x0900, 'end': 0x097F }, // Devanagari
    { 'begin': 0x0980, 'end': 0x09FF }, // Bengali
    { 'begin': 0x0A00, 'end': 0x0A7F }, // Gurmukhi
    { 'begin': 0x0A80, 'end': 0x0AFF }, // Gujarati
    { 'begin': 0x0B00, 'end': 0x0B7F }, // Oriya
    { 'begin': 0x0B80, 'end': 0x0BFF }, // Tamil
    { 'begin': 0x0C00, 'end': 0x0C7F }, // Telugu
    { 'begin': 0x0C80, 'end': 0x0CFF }, // Kannada
    { 'begin': 0x0D00, 'end': 0x0D7F }, // Malayalam
    { 'begin': 0x0E00, 'end': 0x0E7F }, // Thai
    { 'begin': 0x0E80, 'end': 0x0EFF }, // Lao
    { 'begin': 0x10A0, 'end': 0x10FF }, // Georgian
    { 'begin': 0x1B00, 'end': 0x1B7F }, // Balinese
    { 'begin': 0x1100, 'end': 0x11FF }, // Hangul Jamo
    { 'begin': 0x1E00, 'end': 0x1EFF }, // Latin Extended Additional
    { 'begin': 0x1F00, 'end': 0x1FFF }, // Greek Extended
    { 'begin': 0x2000, 'end': 0x206F }, // General Punctuation
    { 'begin': 0x2070, 'end': 0x209F }, // Superscripts And Subscripts
    { 'begin': 0x20A0, 'end': 0x20CF }, // Currency Symbol
    { 'begin': 0x20D0, 'end': 0x20FF }, // Combining Diacritical Marks
    { 'begin': 0x2100, 'end': 0x214F }, // Letterlike Symbols
    { 'begin': 0x2150, 'end': 0x218F }, // Number Forms
    { 'begin': 0x2190, 'end': 0x21FF }, // Arrows
    { 'begin': 0x2200, 'end': 0x22FF }, // Mathematical Operators
    { 'begin': 0x2300, 'end': 0x23FF }, // Miscellaneous Technical
    { 'begin': 0x2400, 'end': 0x243F }, // Control Pictures
    { 'begin': 0x2440, 'end': 0x245F }, // Optical Character Recognition
    { 'begin': 0x2460, 'end': 0x24FF }, // Enclosed Alphanumerics
    { 'begin': 0x2500, 'end': 0x257F }, // Box Drawing
    { 'begin': 0x2580, 'end': 0x259F }, // Block Elements
    { 'begin': 0x25A0, 'end': 0x25FF }, // Geometric Shapes
    { 'begin': 0x2600, 'end': 0x26FF }, // Miscellaneous Symbols
    { 'begin': 0x2700, 'end': 0x27BF }, // Dingbats
    { 'begin': 0x3000, 'end': 0x303F }, // CJK Symbols And Punctuation
    { 'begin': 0x3040, 'end': 0x309F }, // Hiragana
    { 'begin': 0x30A0, 'end': 0x30FF }, // Katakana
    { 'begin': 0x3100, 'end': 0x312F }, // Bopomofo
    { 'begin': 0x3130, 'end': 0x318F }, // Hangul Compatibility Jamo
    { 'begin': 0xA840, 'end': 0xA87F }, // Phags-pa
    { 'begin': 0x3200, 'end': 0x32FF }, // Enclosed CJK Letters And Months
    { 'begin': 0x3300, 'end': 0x33FF }, // CJK Compatibility
    { 'begin': 0xAC00, 'end': 0xD7AF }, // Hangul Syllables
    { 'begin': 0xD800, 'end': 0xDFFF }, // Non-Plane 0 *
    { 'begin': 0x10900, 'end': 0x1091F }, // Phoenicia
    { 'begin': 0x4E00, 'end': 0x9FFF }, // CJK Unified Ideographs
    { 'begin': 0xE000, 'end': 0xF8FF }, // Private Use Area (plane 0)
    { 'begin': 0x31C0, 'end': 0x31EF }, // CJK Strokes
    { 'begin': 0xFB00, 'end': 0xFB4F }, // Alphabetic Presentation Forms
    { 'begin': 0xFB50, 'end': 0xFDFF }, // Arabic Presentation Forms-A
    { 'begin': 0xFE20, 'end': 0xFE2F }, // Combining Half Marks
    { 'begin': 0xFE10, 'end': 0xFE1F }, // Vertical Forms
    { 'begin': 0xFE50, 'end': 0xFE6F }, // Small Form Variants
    { 'begin': 0xFE70, 'end': 0xFEFF }, // Arabic Presentation Forms-B
    { 'begin': 0xFF00, 'end': 0xFFEF }, // Halfwidth And Fullwidth Forms
    { 'begin': 0xFFF0, 'end': 0xFFFF }, // Specials
    { 'begin': 0x0F00, 'end': 0x0FFF }, // Tibetan
    { 'begin': 0x0700, 'end': 0x074F }, // Syriac
    { 'begin': 0x0780, 'end': 0x07BF }, // Thaana
    { 'begin': 0x0D80, 'end': 0x0DFF }, // Sinhala
    { 'begin': 0x1000, 'end': 0x109F }, // Myanmar
    { 'begin': 0x1200, 'end': 0x137F }, // Ethiopic
    { 'begin': 0x13A0, 'end': 0x13FF }, // Cherokee
    { 'begin': 0x1400, 'end': 0x167F }, // Unified Canadian Aboriginal Syllabics
    { 'begin': 0x1680, 'end': 0x169F }, // Ogham
    { 'begin': 0x16A0, 'end': 0x16FF }, // Runic
    { 'begin': 0x1780, 'end': 0x17FF }, // Khmer
    { 'begin': 0x1800, 'end': 0x18AF }, // Mongolian
    { 'begin': 0x2800, 'end': 0x28FF }, // Braille Patterns
    { 'begin': 0xA000, 'end': 0xA48F }, // Yi Syllables
    { 'begin': 0x1700, 'end': 0x171F }, // Tagalog
    { 'begin': 0x10300, 'end': 0x1032F }, // Old Italic
    { 'begin': 0x10330, 'end': 0x1034F }, // Gothic
    { 'begin': 0x10400, 'end': 0x1044F }, // Deseret
    { 'begin': 0x1D000, 'end': 0x1D0FF }, // Byzantine Musical Symbols
    { 'begin': 0x1D400, 'end': 0x1D7FF }, // Mathematical Alphanumeric Symbols
    { 'begin': 0xFF000, 'end': 0xFFFFD }, // Private Use (plane 15)
    { 'begin': 0xFE00, 'end': 0xFE0F }, // Variation Selectors
    { 'begin': 0xE0000, 'end': 0xE007F }, // Tags
    { 'begin': 0x1900, 'end': 0x194F }, // Limbu
    { 'begin': 0x1950, 'end': 0x197F }, // Tai Le
    { 'begin': 0x1980, 'end': 0x19DF }, // New Tai Lue
    { 'begin': 0x1A00, 'end': 0x1A1F }, // Buginese
    { 'begin': 0x2C00, 'end': 0x2C5F }, // Glagolitic
    { 'begin': 0x2D30, 'end': 0x2D7F }, // Tifinagh
    { 'begin': 0x4DC0, 'end': 0x4DFF }, // Yijing Hexagram Symbols
    { 'begin': 0xA800, 'end': 0xA82F }, // Syloti Nagri
    { 'begin': 0x10000, 'end': 0x1007F }, // Linear B Syllabary
    { 'begin': 0x10140, 'end': 0x1018F }, // Ancient Greek Numbers
    { 'begin': 0x10380, 'end': 0x1039F }, // Ugaritic
    { 'begin': 0x103A0, 'end': 0x103DF }, // Old Persian
    { 'begin': 0x10450, 'end': 0x1047F }, // Shavian
    { 'begin': 0x10480, 'end': 0x104AF }, // Osmanya
    { 'begin': 0x10800, 'end': 0x1083F }, // Cypriot Syllabary
    { 'begin': 0x10A00, 'end': 0x10A5F }, // Kharoshthi
    { 'begin': 0x1D300, 'end': 0x1D35F }, // Tai Xuan Jing Symbols
    { 'begin': 0x12000, 'end': 0x123FF }, // Cuneiform
    { 'begin': 0x1D360, 'end': 0x1D37F }, // Counting Rod Numerals
    { 'begin': 0x1B80, 'end': 0x1BBF }, // Sundanese
    { 'begin': 0x1C00, 'end': 0x1C4F }, // Lepcha
    { 'begin': 0x1C50, 'end': 0x1C7F }, // Ol Chiki
    { 'begin': 0xA880, 'end': 0xA8DF }, // Saurashtra
    { 'begin': 0xA900, 'end': 0xA92F }, // Kayah Li
    { 'begin': 0xA930, 'end': 0xA95F }, // Rejang
    { 'begin': 0xAA00, 'end': 0xAA5F }, // Cham
    { 'begin': 0x10190, 'end': 0x101CF }, // Ancient Symbols
    { 'begin': 0x101D0, 'end': 0x101FF }, // Phaistos Disc
    { 'begin': 0x102A0, 'end': 0x102DF }, // Carian
    { 'begin': 0x1F030, 'end': 0x1F09F }  // Domino Tiles
  ];

  function getUnicodeRangeFor(value) {
    for (var i = 0, ii = UnicodeRanges.length; i < ii; i++) {
      var range = UnicodeRanges[i];
      if (value >= range.begin && value < range.end) {
        return i;
      }
    }
    return -1;
  }

  function isRTLRangeFor(value) {
    var range = UnicodeRanges[13];
    if (value >= range.begin && value < range.end) {
      return true;
    }
    range = UnicodeRanges[11];
    if (value >= range.begin && value < range.end) {
      return true;
    }
    return false;
  }

  // The normalization table is obtained by filtering the Unicode characters
  // database with <compat> entries.
  var getNormalizedUnicodes = getLookupTableFactory(function (t) {
    t['\u00A8'] = '\u0020\u0308';
    t['\u00AF'] = '\u0020\u0304';
    t['\u00B4'] = '\u0020\u0301';
    t['\u00B5'] = '\u03BC';
    t['\u00B8'] = '\u0020\u0327';
    t['\u0132'] = '\u0049\u004A';
    t['\u0133'] = '\u0069\u006A';
    t['\u013F'] = '\u004C\u00B7';
    t['\u0140'] = '\u006C\u00B7';
    t['\u0149'] = '\u02BC\u006E';
    t['\u017F'] = '\u0073';
    t['\u01C4'] = '\u0044\u017D';
    t['\u01C5'] = '\u0044\u017E';
    t['\u01C6'] = '\u0064\u017E';
    t['\u01C7'] = '\u004C\u004A';
    t['\u01C8'] = '\u004C\u006A';
    t['\u01C9'] = '\u006C\u006A';
    t['\u01CA'] = '\u004E\u004A';
    t['\u01CB'] = '\u004E\u006A';
    t['\u01CC'] = '\u006E\u006A';
    t['\u01F1'] = '\u0044\u005A';
    t['\u01F2'] = '\u0044\u007A';
    t['\u01F3'] = '\u0064\u007A';
    t['\u02D8'] = '\u0020\u0306';
    t['\u02D9'] = '\u0020\u0307';
    t['\u02DA'] = '\u0020\u030A';
    t['\u02DB'] = '\u0020\u0328';
    t['\u02DC'] = '\u0020\u0303';
    t['\u02DD'] = '\u0020\u030B';
    t['\u037A'] = '\u0020\u0345';
    t['\u0384'] = '\u0020\u0301';
    t['\u03D0'] = '\u03B2';
    t['\u03D1'] = '\u03B8';
    t['\u03D2'] = '\u03A5';
    t['\u03D5'] = '\u03C6';
    t['\u03D6'] = '\u03C0';
    t['\u03F0'] = '\u03BA';
    t['\u03F1'] = '\u03C1';
    t['\u03F2'] = '\u03C2';
    t['\u03F4'] = '\u0398';
    t['\u03F5'] = '\u03B5';
    t['\u03F9'] = '\u03A3';
    t['\u0587'] = '\u0565\u0582';
    t['\u0675'] = '\u0627\u0674';
    t['\u0676'] = '\u0648\u0674';
    t['\u0677'] = '\u06C7\u0674';
    t['\u0678'] = '\u064A\u0674';
    t['\u0E33'] = '\u0E4D\u0E32';
    t['\u0EB3'] = '\u0ECD\u0EB2';
    t['\u0EDC'] = '\u0EAB\u0E99';
    t['\u0EDD'] = '\u0EAB\u0EA1';
    t['\u0F77'] = '\u0FB2\u0F81';
    t['\u0F79'] = '\u0FB3\u0F81';
    t['\u1E9A'] = '\u0061\u02BE';
    t['\u1FBD'] = '\u0020\u0313';
    t['\u1FBF'] = '\u0020\u0313';
    t['\u1FC0'] = '\u0020\u0342';
    t['\u1FFE'] = '\u0020\u0314';
    t['\u2002'] = '\u0020';
    t['\u2003'] = '\u0020';
    t['\u2004'] = '\u0020';
    t['\u2005'] = '\u0020';
    t['\u2006'] = '\u0020';
    t['\u2008'] = '\u0020';
    t['\u2009'] = '\u0020';
    t['\u200A'] = '\u0020';
    t['\u2017'] = '\u0020\u0333';
    t['\u2024'] = '\u002E';
    t['\u2025'] = '\u002E\u002E';
    t['\u2026'] = '\u002E\u002E\u002E';
    t['\u2033'] = '\u2032\u2032';
    t['\u2034'] = '\u2032\u2032\u2032';
    t['\u2036'] = '\u2035\u2035';
    t['\u2037'] = '\u2035\u2035\u2035';
    t['\u203C'] = '\u0021\u0021';
    t['\u203E'] = '\u0020\u0305';
    t['\u2047'] = '\u003F\u003F';
    t['\u2048'] = '\u003F\u0021';
    t['\u2049'] = '\u0021\u003F';
    t['\u2057'] = '\u2032\u2032\u2032\u2032';
    t['\u205F'] = '\u0020';
    t['\u20A8'] = '\u0052\u0073';
    t['\u2100'] = '\u0061\u002F\u0063';
    t['\u2101'] = '\u0061\u002F\u0073';
    t['\u2103'] = '\u00B0\u0043';
    t['\u2105'] = '\u0063\u002F\u006F';
    t['\u2106'] = '\u0063\u002F\u0075';
    t['\u2107'] = '\u0190';
    t['\u2109'] = '\u00B0\u0046';
    t['\u2116'] = '\u004E\u006F';
    t['\u2121'] = '\u0054\u0045\u004C';
    t['\u2135'] = '\u05D0';
    t['\u2136'] = '\u05D1';
    t['\u2137'] = '\u05D2';
    t['\u2138'] = '\u05D3';
    t['\u213B'] = '\u0046\u0041\u0058';
    t['\u2160'] = '\u0049';
    t['\u2161'] = '\u0049\u0049';
    t['\u2162'] = '\u0049\u0049\u0049';
    t['\u2163'] = '\u0049\u0056';
    t['\u2164'] = '\u0056';
    t['\u2165'] = '\u0056\u0049';
    t['\u2166'] = '\u0056\u0049\u0049';
    t['\u2167'] = '\u0056\u0049\u0049\u0049';
    t['\u2168'] = '\u0049\u0058';
    t['\u2169'] = '\u0058';
    t['\u216A'] = '\u0058\u0049';
    t['\u216B'] = '\u0058\u0049\u0049';
    t['\u216C'] = '\u004C';
    t['\u216D'] = '\u0043';
    t['\u216E'] = '\u0044';
    t['\u216F'] = '\u004D';
    t['\u2170'] = '\u0069';
    t['\u2171'] = '\u0069\u0069';
    t['\u2172'] = '\u0069\u0069\u0069';
    t['\u2173'] = '\u0069\u0076';
    t['\u2174'] = '\u0076';
    t['\u2175'] = '\u0076\u0069';
    t['\u2176'] = '\u0076\u0069\u0069';
    t['\u2177'] = '\u0076\u0069\u0069\u0069';
    t['\u2178'] = '\u0069\u0078';
    t['\u2179'] = '\u0078';
    t['\u217A'] = '\u0078\u0069';
    t['\u217B'] = '\u0078\u0069\u0069';
    t['\u217C'] = '\u006C';
    t['\u217D'] = '\u0063';
    t['\u217E'] = '\u0064';
    t['\u217F'] = '\u006D';
    t['\u222C'] = '\u222B\u222B';
    t['\u222D'] = '\u222B\u222B\u222B';
    t['\u222F'] = '\u222E\u222E';
    t['\u2230'] = '\u222E\u222E\u222E';
    t['\u2474'] = '\u0028\u0031\u0029';
    t['\u2475'] = '\u0028\u0032\u0029';
    t['\u2476'] = '\u0028\u0033\u0029';
    t['\u2477'] = '\u0028\u0034\u0029';
    t['\u2478'] = '\u0028\u0035\u0029';
    t['\u2479'] = '\u0028\u0036\u0029';
    t['\u247A'] = '\u0028\u0037\u0029';
    t['\u247B'] = '\u0028\u0038\u0029';
    t['\u247C'] = '\u0028\u0039\u0029';
    t['\u247D'] = '\u0028\u0031\u0030\u0029';
    t['\u247E'] = '\u0028\u0031\u0031\u0029';
    t['\u247F'] = '\u0028\u0031\u0032\u0029';
    t['\u2480'] = '\u0028\u0031\u0033\u0029';
    t['\u2481'] = '\u0028\u0031\u0034\u0029';
    t['\u2482'] = '\u0028\u0031\u0035\u0029';
    t['\u2483'] = '\u0028\u0031\u0036\u0029';
    t['\u2484'] = '\u0028\u0031\u0037\u0029';
    t['\u2485'] = '\u0028\u0031\u0038\u0029';
    t['\u2486'] = '\u0028\u0031\u0039\u0029';
    t['\u2487'] = '\u0028\u0032\u0030\u0029';
    t['\u2488'] = '\u0031\u002E';
    t['\u2489'] = '\u0032\u002E';
    t['\u248A'] = '\u0033\u002E';
    t['\u248B'] = '\u0034\u002E';
    t['\u248C'] = '\u0035\u002E';
    t['\u248D'] = '\u0036\u002E';
    t['\u248E'] = '\u0037\u002E';
    t['\u248F'] = '\u0038\u002E';
    t['\u2490'] = '\u0039\u002E';
    t['\u2491'] = '\u0031\u0030\u002E';
    t['\u2492'] = '\u0031\u0031\u002E';
    t['\u2493'] = '\u0031\u0032\u002E';
    t['\u2494'] = '\u0031\u0033\u002E';
    t['\u2495'] = '\u0031\u0034\u002E';
    t['\u2496'] = '\u0031\u0035\u002E';
    t['\u2497'] = '\u0031\u0036\u002E';
    t['\u2498'] = '\u0031\u0037\u002E';
    t['\u2499'] = '\u0031\u0038\u002E';
    t['\u249A'] = '\u0031\u0039\u002E';
    t['\u249B'] = '\u0032\u0030\u002E';
    t['\u249C'] = '\u0028\u0061\u0029';
    t['\u249D'] = '\u0028\u0062\u0029';
    t['\u249E'] = '\u0028\u0063\u0029';
    t['\u249F'] = '\u0028\u0064\u0029';
    t['\u24A0'] = '\u0028\u0065\u0029';
    t['\u24A1'] = '\u0028\u0066\u0029';
    t['\u24A2'] = '\u0028\u0067\u0029';
    t['\u24A3'] = '\u0028\u0068\u0029';
    t['\u24A4'] = '\u0028\u0069\u0029';
    t['\u24A5'] = '\u0028\u006A\u0029';
    t['\u24A6'] = '\u0028\u006B\u0029';
    t['\u24A7'] = '\u0028\u006C\u0029';
    t['\u24A8'] = '\u0028\u006D\u0029';
    t['\u24A9'] = '\u0028\u006E\u0029';
    t['\u24AA'] = '\u0028\u006F\u0029';
    t['\u24AB'] = '\u0028\u0070\u0029';
    t['\u24AC'] = '\u0028\u0071\u0029';
    t['\u24AD'] = '\u0028\u0072\u0029';
    t['\u24AE'] = '\u0028\u0073\u0029';
    t['\u24AF'] = '\u0028\u0074\u0029';
    t['\u24B0'] = '\u0028\u0075\u0029';
    t['\u24B1'] = '\u0028\u0076\u0029';
    t['\u24B2'] = '\u0028\u0077\u0029';
    t['\u24B3'] = '\u0028\u0078\u0029';
    t['\u24B4'] = '\u0028\u0079\u0029';
    t['\u24B5'] = '\u0028\u007A\u0029';
    t['\u2A0C'] = '\u222B\u222B\u222B\u222B';
    t['\u2A74'] = '\u003A\u003A\u003D';
    t['\u2A75'] = '\u003D\u003D';
    t['\u2A76'] = '\u003D\u003D\u003D';
    t['\u2E9F'] = '\u6BCD';
    t['\u2EF3'] = '\u9F9F';
    t['\u2F00'] = '\u4E00';
    t['\u2F01'] = '\u4E28';
    t['\u2F02'] = '\u4E36';
    t['\u2F03'] = '\u4E3F';
    t['\u2F04'] = '\u4E59';
    t['\u2F05'] = '\u4E85';
    t['\u2F06'] = '\u4E8C';
    t['\u2F07'] = '\u4EA0';
    t['\u2F08'] = '\u4EBA';
    t['\u2F09'] = '\u513F';
    t['\u2F0A'] = '\u5165';
    t['\u2F0B'] = '\u516B';
    t['\u2F0C'] = '\u5182';
    t['\u2F0D'] = '\u5196';
    t['\u2F0E'] = '\u51AB';
    t['\u2F0F'] = '\u51E0';
    t['\u2F10'] = '\u51F5';
    t['\u2F11'] = '\u5200';
    t['\u2F12'] = '\u529B';
    t['\u2F13'] = '\u52F9';
    t['\u2F14'] = '\u5315';
    t['\u2F15'] = '\u531A';
    t['\u2F16'] = '\u5338';
    t['\u2F17'] = '\u5341';
    t['\u2F18'] = '\u535C';
    t['\u2F19'] = '\u5369';
    t['\u2F1A'] = '\u5382';
    t['\u2F1B'] = '\u53B6';
    t['\u2F1C'] = '\u53C8';
    t['\u2F1D'] = '\u53E3';
    t['\u2F1E'] = '\u56D7';
    t['\u2F1F'] = '\u571F';
    t['\u2F20'] = '\u58EB';
    t['\u2F21'] = '\u5902';
    t['\u2F22'] = '\u590A';
    t['\u2F23'] = '\u5915';
    t['\u2F24'] = '\u5927';
    t['\u2F25'] = '\u5973';
    t['\u2F26'] = '\u5B50';
    t['\u2F27'] = '\u5B80';
    t['\u2F28'] = '\u5BF8';
    t['\u2F29'] = '\u5C0F';
    t['\u2F2A'] = '\u5C22';
    t['\u2F2B'] = '\u5C38';
    t['\u2F2C'] = '\u5C6E';
    t['\u2F2D'] = '\u5C71';
    t['\u2F2E'] = '\u5DDB';
    t['\u2F2F'] = '\u5DE5';
    t['\u2F30'] = '\u5DF1';
    t['\u2F31'] = '\u5DFE';
    t['\u2F32'] = '\u5E72';
    t['\u2F33'] = '\u5E7A';
    t['\u2F34'] = '\u5E7F';
    t['\u2F35'] = '\u5EF4';
    t['\u2F36'] = '\u5EFE';
    t['\u2F37'] = '\u5F0B';
    t['\u2F38'] = '\u5F13';
    t['\u2F39'] = '\u5F50';
    t['\u2F3A'] = '\u5F61';
    t['\u2F3B'] = '\u5F73';
    t['\u2F3C'] = '\u5FC3';
    t['\u2F3D'] = '\u6208';
    t['\u2F3E'] = '\u6236';
    t['\u2F3F'] = '\u624B';
    t['\u2F40'] = '\u652F';
    t['\u2F41'] = '\u6534';
    t['\u2F42'] = '\u6587';
    t['\u2F43'] = '\u6597';
    t['\u2F44'] = '\u65A4';
    t['\u2F45'] = '\u65B9';
    t['\u2F46'] = '\u65E0';
    t['\u2F47'] = '\u65E5';
    t['\u2F48'] = '\u66F0';
    t['\u2F49'] = '\u6708';
    t['\u2F4A'] = '\u6728';
    t['\u2F4B'] = '\u6B20';
    t['\u2F4C'] = '\u6B62';
    t['\u2F4D'] = '\u6B79';
    t['\u2F4E'] = '\u6BB3';
    t['\u2F4F'] = '\u6BCB';
    t['\u2F50'] = '\u6BD4';
    t['\u2F51'] = '\u6BDB';
    t['\u2F52'] = '\u6C0F';
    t['\u2F53'] = '\u6C14';
    t['\u2F54'] = '\u6C34';
    t['\u2F55'] = '\u706B';
    t['\u2F56'] = '\u722A';
    t['\u2F57'] = '\u7236';
    t['\u2F58'] = '\u723B';
    t['\u2F59'] = '\u723F';
    t['\u2F5A'] = '\u7247';
    t['\u2F5B'] = '\u7259';
    t['\u2F5C'] = '\u725B';
    t['\u2F5D'] = '\u72AC';
    t['\u2F5E'] = '\u7384';
    t['\u2F5F'] = '\u7389';
    t['\u2F60'] = '\u74DC';
    t['\u2F61'] = '\u74E6';
    t['\u2F62'] = '\u7518';
    t['\u2F63'] = '\u751F';
    t['\u2F64'] = '\u7528';
    t['\u2F65'] = '\u7530';
    t['\u2F66'] = '\u758B';
    t['\u2F67'] = '\u7592';
    t['\u2F68'] = '\u7676';
    t['\u2F69'] = '\u767D';
    t['\u2F6A'] = '\u76AE';
    t['\u2F6B'] = '\u76BF';
    t['\u2F6C'] = '\u76EE';
    t['\u2F6D'] = '\u77DB';
    t['\u2F6E'] = '\u77E2';
    t['\u2F6F'] = '\u77F3';
    t['\u2F70'] = '\u793A';
    t['\u2F71'] = '\u79B8';
    t['\u2F72'] = '\u79BE';
    t['\u2F73'] = '\u7A74';
    t['\u2F74'] = '\u7ACB';
    t['\u2F75'] = '\u7AF9';
    t['\u2F76'] = '\u7C73';
    t['\u2F77'] = '\u7CF8';
    t['\u2F78'] = '\u7F36';
    t['\u2F79'] = '\u7F51';
    t['\u2F7A'] = '\u7F8A';
    t['\u2F7B'] = '\u7FBD';
    t['\u2F7C'] = '\u8001';
    t['\u2F7D'] = '\u800C';
    t['\u2F7E'] = '\u8012';
    t['\u2F7F'] = '\u8033';
    t['\u2F80'] = '\u807F';
    t['\u2F81'] = '\u8089';
    t['\u2F82'] = '\u81E3';
    t['\u2F83'] = '\u81EA';
    t['\u2F84'] = '\u81F3';
    t['\u2F85'] = '\u81FC';
    t['\u2F86'] = '\u820C';
    t['\u2F87'] = '\u821B';
    t['\u2F88'] = '\u821F';
    t['\u2F89'] = '\u826E';
    t['\u2F8A'] = '\u8272';
    t['\u2F8B'] = '\u8278';
    t['\u2F8C'] = '\u864D';
    t['\u2F8D'] = '\u866B';
    t['\u2F8E'] = '\u8840';
    t['\u2F8F'] = '\u884C';
    t['\u2F90'] = '\u8863';
    t['\u2F91'] = '\u897E';
    t['\u2F92'] = '\u898B';
    t['\u2F93'] = '\u89D2';
    t['\u2F94'] = '\u8A00';
    t['\u2F95'] = '\u8C37';
    t['\u2F96'] = '\u8C46';
    t['\u2F97'] = '\u8C55';
    t['\u2F98'] = '\u8C78';
    t['\u2F99'] = '\u8C9D';
    t['\u2F9A'] = '\u8D64';
    t['\u2F9B'] = '\u8D70';
    t['\u2F9C'] = '\u8DB3';
    t['\u2F9D'] = '\u8EAB';
    t['\u2F9E'] = '\u8ECA';
    t['\u2F9F'] = '\u8F9B';
    t['\u2FA0'] = '\u8FB0';
    t['\u2FA1'] = '\u8FB5';
    t['\u2FA2'] = '\u9091';
    t['\u2FA3'] = '\u9149';
    t['\u2FA4'] = '\u91C6';
    t['\u2FA5'] = '\u91CC';
    t['\u2FA6'] = '\u91D1';
    t['\u2FA7'] = '\u9577';
    t['\u2FA8'] = '\u9580';
    t['\u2FA9'] = '\u961C';
    t['\u2FAA'] = '\u96B6';
    t['\u2FAB'] = '\u96B9';
    t['\u2FAC'] = '\u96E8';
    t['\u2FAD'] = '\u9751';
    t['\u2FAE'] = '\u975E';
    t['\u2FAF'] = '\u9762';
    t['\u2FB0'] = '\u9769';
    t['\u2FB1'] = '\u97CB';
    t['\u2FB2'] = '\u97ED';
    t['\u2FB3'] = '\u97F3';
    t['\u2FB4'] = '\u9801';
    t['\u2FB5'] = '\u98A8';
    t['\u2FB6'] = '\u98DB';
    t['\u2FB7'] = '\u98DF';
    t['\u2FB8'] = '\u9996';
    t['\u2FB9'] = '\u9999';
    t['\u2FBA'] = '\u99AC';
    t['\u2FBB'] = '\u9AA8';
    t['\u2FBC'] = '\u9AD8';
    t['\u2FBD'] = '\u9ADF';
    t['\u2FBE'] = '\u9B25';
    t['\u2FBF'] = '\u9B2F';
    t['\u2FC0'] = '\u9B32';
    t['\u2FC1'] = '\u9B3C';
    t['\u2FC2'] = '\u9B5A';
    t['\u2FC3'] = '\u9CE5';
    t['\u2FC4'] = '\u9E75';
    t['\u2FC5'] = '\u9E7F';
    t['\u2FC6'] = '\u9EA5';
    t['\u2FC7'] = '\u9EBB';
    t['\u2FC8'] = '\u9EC3';
    t['\u2FC9'] = '\u9ECD';
    t['\u2FCA'] = '\u9ED1';
    t['\u2FCB'] = '\u9EF9';
    t['\u2FCC'] = '\u9EFD';
    t['\u2FCD'] = '\u9F0E';
    t['\u2FCE'] = '\u9F13';
    t['\u2FCF'] = '\u9F20';
    t['\u2FD0'] = '\u9F3B';
    t['\u2FD1'] = '\u9F4A';
    t['\u2FD2'] = '\u9F52';
    t['\u2FD3'] = '\u9F8D';
    t['\u2FD4'] = '\u9F9C';
    t['\u2FD5'] = '\u9FA0';
    t['\u3036'] = '\u3012';
    t['\u3038'] = '\u5341';
    t['\u3039'] = '\u5344';
    t['\u303A'] = '\u5345';
    t['\u309B'] = '\u0020\u3099';
    t['\u309C'] = '\u0020\u309A';
    t['\u3131'] = '\u1100';
    t['\u3132'] = '\u1101';
    t['\u3133'] = '\u11AA';
    t['\u3134'] = '\u1102';
    t['\u3135'] = '\u11AC';
    t['\u3136'] = '\u11AD';
    t['\u3137'] = '\u1103';
    t['\u3138'] = '\u1104';
    t['\u3139'] = '\u1105';
    t['\u313A'] = '\u11B0';
    t['\u313B'] = '\u11B1';
    t['\u313C'] = '\u11B2';
    t['\u313D'] = '\u11B3';
    t['\u313E'] = '\u11B4';
    t['\u313F'] = '\u11B5';
    t['\u3140'] = '\u111A';
    t['\u3141'] = '\u1106';
    t['\u3142'] = '\u1107';
    t['\u3143'] = '\u1108';
    t['\u3144'] = '\u1121';
    t['\u3145'] = '\u1109';
    t['\u3146'] = '\u110A';
    t['\u3147'] = '\u110B';
    t['\u3148'] = '\u110C';
    t['\u3149'] = '\u110D';
    t['\u314A'] = '\u110E';
    t['\u314B'] = '\u110F';
    t['\u314C'] = '\u1110';
    t['\u314D'] = '\u1111';
    t['\u314E'] = '\u1112';
    t['\u314F'] = '\u1161';
    t['\u3150'] = '\u1162';
    t['\u3151'] = '\u1163';
    t['\u3152'] = '\u1164';
    t['\u3153'] = '\u1165';
    t['\u3154'] = '\u1166';
    t['\u3155'] = '\u1167';
    t['\u3156'] = '\u1168';
    t['\u3157'] = '\u1169';
    t['\u3158'] = '\u116A';
    t['\u3159'] = '\u116B';
    t['\u315A'] = '\u116C';
    t['\u315B'] = '\u116D';
    t['\u315C'] = '\u116E';
    t['\u315D'] = '\u116F';
    t['\u315E'] = '\u1170';
    t['\u315F'] = '\u1171';
    t['\u3160'] = '\u1172';
    t['\u3161'] = '\u1173';
    t['\u3162'] = '\u1174';
    t['\u3163'] = '\u1175';
    t['\u3164'] = '\u1160';
    t['\u3165'] = '\u1114';
    t['\u3166'] = '\u1115';
    t['\u3167'] = '\u11C7';
    t['\u3168'] = '\u11C8';
    t['\u3169'] = '\u11CC';
    t['\u316A'] = '\u11CE';
    t['\u316B'] = '\u11D3';
    t['\u316C'] = '\u11D7';
    t['\u316D'] = '\u11D9';
    t['\u316E'] = '\u111C';
    t['\u316F'] = '\u11DD';
    t['\u3170'] = '\u11DF';
    t['\u3171'] = '\u111D';
    t['\u3172'] = '\u111E';
    t['\u3173'] = '\u1120';
    t['\u3174'] = '\u1122';
    t['\u3175'] = '\u1123';
    t['\u3176'] = '\u1127';
    t['\u3177'] = '\u1129';
    t['\u3178'] = '\u112B';
    t['\u3179'] = '\u112C';
    t['\u317A'] = '\u112D';
    t['\u317B'] = '\u112E';
    t['\u317C'] = '\u112F';
    t['\u317D'] = '\u1132';
    t['\u317E'] = '\u1136';
    t['\u317F'] = '\u1140';
    t['\u3180'] = '\u1147';
    t['\u3181'] = '\u114C';
    t['\u3182'] = '\u11F1';
    t['\u3183'] = '\u11F2';
    t['\u3184'] = '\u1157';
    t['\u3185'] = '\u1158';
    t['\u3186'] = '\u1159';
    t['\u3187'] = '\u1184';
    t['\u3188'] = '\u1185';
    t['\u3189'] = '\u1188';
    t['\u318A'] = '\u1191';
    t['\u318B'] = '\u1192';
    t['\u318C'] = '\u1194';
    t['\u318D'] = '\u119E';
    t['\u318E'] = '\u11A1';
    t['\u3200'] = '\u0028\u1100\u0029';
    t['\u3201'] = '\u0028\u1102\u0029';
    t['\u3202'] = '\u0028\u1103\u0029';
    t['\u3203'] = '\u0028\u1105\u0029';
    t['\u3204'] = '\u0028\u1106\u0029';
    t['\u3205'] = '\u0028\u1107\u0029';
    t['\u3206'] = '\u0028\u1109\u0029';
    t['\u3207'] = '\u0028\u110B\u0029';
    t['\u3208'] = '\u0028\u110C\u0029';
    t['\u3209'] = '\u0028\u110E\u0029';
    t['\u320A'] = '\u0028\u110F\u0029';
    t['\u320B'] = '\u0028\u1110\u0029';
    t['\u320C'] = '\u0028\u1111\u0029';
    t['\u320D'] = '\u0028\u1112\u0029';
    t['\u320E'] = '\u0028\u1100\u1161\u0029';
    t['\u320F'] = '\u0028\u1102\u1161\u0029';
    t['\u3210'] = '\u0028\u1103\u1161\u0029';
    t['\u3211'] = '\u0028\u1105\u1161\u0029';
    t['\u3212'] = '\u0028\u1106\u1161\u0029';
    t['\u3213'] = '\u0028\u1107\u1161\u0029';
    t['\u3214'] = '\u0028\u1109\u1161\u0029';
    t['\u3215'] = '\u0028\u110B\u1161\u0029';
    t['\u3216'] = '\u0028\u110C\u1161\u0029';
    t['\u3217'] = '\u0028\u110E\u1161\u0029';
    t['\u3218'] = '\u0028\u110F\u1161\u0029';
    t['\u3219'] = '\u0028\u1110\u1161\u0029';
    t['\u321A'] = '\u0028\u1111\u1161\u0029';
    t['\u321B'] = '\u0028\u1112\u1161\u0029';
    t['\u321C'] = '\u0028\u110C\u116E\u0029';
    t['\u321D'] = '\u0028\u110B\u1169\u110C\u1165\u11AB\u0029';
    t['\u321E'] = '\u0028\u110B\u1169\u1112\u116E\u0029';
    t['\u3220'] = '\u0028\u4E00\u0029';
    t['\u3221'] = '\u0028\u4E8C\u0029';
    t['\u3222'] = '\u0028\u4E09\u0029';
    t['\u3223'] = '\u0028\u56DB\u0029';
    t['\u3224'] = '\u0028\u4E94\u0029';
    t['\u3225'] = '\u0028\u516D\u0029';
    t['\u3226'] = '\u0028\u4E03\u0029';
    t['\u3227'] = '\u0028\u516B\u0029';
    t['\u3228'] = '\u0028\u4E5D\u0029';
    t['\u3229'] = '\u0028\u5341\u0029';
    t['\u322A'] = '\u0028\u6708\u0029';
    t['\u322B'] = '\u0028\u706B\u0029';
    t['\u322C'] = '\u0028\u6C34\u0029';
    t['\u322D'] = '\u0028\u6728\u0029';
    t['\u322E'] = '\u0028\u91D1\u0029';
    t['\u322F'] = '\u0028\u571F\u0029';
    t['\u3230'] = '\u0028\u65E5\u0029';
    t['\u3231'] = '\u0028\u682A\u0029';
    t['\u3232'] = '\u0028\u6709\u0029';
    t['\u3233'] = '\u0028\u793E\u0029';
    t['\u3234'] = '\u0028\u540D\u0029';
    t['\u3235'] = '\u0028\u7279\u0029';
    t['\u3236'] = '\u0028\u8CA1\u0029';
    t['\u3237'] = '\u0028\u795D\u0029';
    t['\u3238'] = '\u0028\u52B4\u0029';
    t['\u3239'] = '\u0028\u4EE3\u0029';
    t['\u323A'] = '\u0028\u547C\u0029';
    t['\u323B'] = '\u0028\u5B66\u0029';
    t['\u323C'] = '\u0028\u76E3\u0029';
    t['\u323D'] = '\u0028\u4F01\u0029';
    t['\u323E'] = '\u0028\u8CC7\u0029';
    t['\u323F'] = '\u0028\u5354\u0029';
    t['\u3240'] = '\u0028\u796D\u0029';
    t['\u3241'] = '\u0028\u4F11\u0029';
    t['\u3242'] = '\u0028\u81EA\u0029';
    t['\u3243'] = '\u0028\u81F3\u0029';
    t['\u32C0'] = '\u0031\u6708';
    t['\u32C1'] = '\u0032\u6708';
    t['\u32C2'] = '\u0033\u6708';
    t['\u32C3'] = '\u0034\u6708';
    t['\u32C4'] = '\u0035\u6708';
    t['\u32C5'] = '\u0036\u6708';
    t['\u32C6'] = '\u0037\u6708';
    t['\u32C7'] = '\u0038\u6708';
    t['\u32C8'] = '\u0039\u6708';
    t['\u32C9'] = '\u0031\u0030\u6708';
    t['\u32CA'] = '\u0031\u0031\u6708';
    t['\u32CB'] = '\u0031\u0032\u6708';
    t['\u3358'] = '\u0030\u70B9';
    t['\u3359'] = '\u0031\u70B9';
    t['\u335A'] = '\u0032\u70B9';
    t['\u335B'] = '\u0033\u70B9';
    t['\u335C'] = '\u0034\u70B9';
    t['\u335D'] = '\u0035\u70B9';
    t['\u335E'] = '\u0036\u70B9';
    t['\u335F'] = '\u0037\u70B9';
    t['\u3360'] = '\u0038\u70B9';
    t['\u3361'] = '\u0039\u70B9';
    t['\u3362'] = '\u0031\u0030\u70B9';
    t['\u3363'] = '\u0031\u0031\u70B9';
    t['\u3364'] = '\u0031\u0032\u70B9';
    t['\u3365'] = '\u0031\u0033\u70B9';
    t['\u3366'] = '\u0031\u0034\u70B9';
    t['\u3367'] = '\u0031\u0035\u70B9';
    t['\u3368'] = '\u0031\u0036\u70B9';
    t['\u3369'] = '\u0031\u0037\u70B9';
    t['\u336A'] = '\u0031\u0038\u70B9';
    t['\u336B'] = '\u0031\u0039\u70B9';
    t['\u336C'] = '\u0032\u0030\u70B9';
    t['\u336D'] = '\u0032\u0031\u70B9';
    t['\u336E'] = '\u0032\u0032\u70B9';
    t['\u336F'] = '\u0032\u0033\u70B9';
    t['\u3370'] = '\u0032\u0034\u70B9';
    t['\u33E0'] = '\u0031\u65E5';
    t['\u33E1'] = '\u0032\u65E5';
    t['\u33E2'] = '\u0033\u65E5';
    t['\u33E3'] = '\u0034\u65E5';
    t['\u33E4'] = '\u0035\u65E5';
    t['\u33E5'] = '\u0036\u65E5';
    t['\u33E6'] = '\u0037\u65E5';
    t['\u33E7'] = '\u0038\u65E5';
    t['\u33E8'] = '\u0039\u65E5';
    t['\u33E9'] = '\u0031\u0030\u65E5';
    t['\u33EA'] = '\u0031\u0031\u65E5';
    t['\u33EB'] = '\u0031\u0032\u65E5';
    t['\u33EC'] = '\u0031\u0033\u65E5';
    t['\u33ED'] = '\u0031\u0034\u65E5';
    t['\u33EE'] = '\u0031\u0035\u65E5';
    t['\u33EF'] = '\u0031\u0036\u65E5';
    t['\u33F0'] = '\u0031\u0037\u65E5';
    t['\u33F1'] = '\u0031\u0038\u65E5';
    t['\u33F2'] = '\u0031\u0039\u65E5';
    t['\u33F3'] = '\u0032\u0030\u65E5';
    t['\u33F4'] = '\u0032\u0031\u65E5';
    t['\u33F5'] = '\u0032\u0032\u65E5';
    t['\u33F6'] = '\u0032\u0033\u65E5';
    t['\u33F7'] = '\u0032\u0034\u65E5';
    t['\u33F8'] = '\u0032\u0035\u65E5';
    t['\u33F9'] = '\u0032\u0036\u65E5';
    t['\u33FA'] = '\u0032\u0037\u65E5';
    t['\u33FB'] = '\u0032\u0038\u65E5';
    t['\u33FC'] = '\u0032\u0039\u65E5';
    t['\u33FD'] = '\u0033\u0030\u65E5';
    t['\u33FE'] = '\u0033\u0031\u65E5';
    t['\uFB00'] = '\u0066\u0066';
    t['\uFB01'] = '\u0066\u0069';
    t['\uFB02'] = '\u0066\u006C';
    t['\uFB03'] = '\u0066\u0066\u0069';
    t['\uFB04'] = '\u0066\u0066\u006C';
    t['\uFB05'] = '\u017F\u0074';
    t['\uFB06'] = '\u0073\u0074';
    t['\uFB13'] = '\u0574\u0576';
    t['\uFB14'] = '\u0574\u0565';
    t['\uFB15'] = '\u0574\u056B';
    t['\uFB16'] = '\u057E\u0576';
    t['\uFB17'] = '\u0574\u056D';
    t['\uFB4F'] = '\u05D0\u05DC';
    t['\uFB50'] = '\u0671';
    t['\uFB51'] = '\u0671';
    t['\uFB52'] = '\u067B';
    t['\uFB53'] = '\u067B';
    t['\uFB54'] = '\u067B';
    t['\uFB55'] = '\u067B';
    t['\uFB56'] = '\u067E';
    t['\uFB57'] = '\u067E';
    t['\uFB58'] = '\u067E';
    t['\uFB59'] = '\u067E';
    t['\uFB5A'] = '\u0680';
    t['\uFB5B'] = '\u0680';
    t['\uFB5C'] = '\u0680';
    t['\uFB5D'] = '\u0680';
    t['\uFB5E'] = '\u067A';
    t['\uFB5F'] = '\u067A';
    t['\uFB60'] = '\u067A';
    t['\uFB61'] = '\u067A';
    t['\uFB62'] = '\u067F';
    t['\uFB63'] = '\u067F';
    t['\uFB64'] = '\u067F';
    t['\uFB65'] = '\u067F';
    t['\uFB66'] = '\u0679';
    t['\uFB67'] = '\u0679';
    t['\uFB68'] = '\u0679';
    t['\uFB69'] = '\u0679';
    t['\uFB6A'] = '\u06A4';
    t['\uFB6B'] = '\u06A4';
    t['\uFB6C'] = '\u06A4';
    t['\uFB6D'] = '\u06A4';
    t['\uFB6E'] = '\u06A6';
    t['\uFB6F'] = '\u06A6';
    t['\uFB70'] = '\u06A6';
    t['\uFB71'] = '\u06A6';
    t['\uFB72'] = '\u0684';
    t['\uFB73'] = '\u0684';
    t['\uFB74'] = '\u0684';
    t['\uFB75'] = '\u0684';
    t['\uFB76'] = '\u0683';
    t['\uFB77'] = '\u0683';
    t['\uFB78'] = '\u0683';
    t['\uFB79'] = '\u0683';
    t['\uFB7A'] = '\u0686';
    t['\uFB7B'] = '\u0686';
    t['\uFB7C'] = '\u0686';
    t['\uFB7D'] = '\u0686';
    t['\uFB7E'] = '\u0687';
    t['\uFB7F'] = '\u0687';
    t['\uFB80'] = '\u0687';
    t['\uFB81'] = '\u0687';
    t['\uFB82'] = '\u068D';
    t['\uFB83'] = '\u068D';
    t['\uFB84'] = '\u068C';
    t['\uFB85'] = '\u068C';
    t['\uFB86'] = '\u068E';
    t['\uFB87'] = '\u068E';
    t['\uFB88'] = '\u0688';
    t['\uFB89'] = '\u0688';
    t['\uFB8A'] = '\u0698';
    t['\uFB8B'] = '\u0698';
    t['\uFB8C'] = '\u0691';
    t['\uFB8D'] = '\u0691';
    t['\uFB8E'] = '\u06A9';
    t['\uFB8F'] = '\u06A9';
    t['\uFB90'] = '\u06A9';
    t['\uFB91'] = '\u06A9';
    t['\uFB92'] = '\u06AF';
    t['\uFB93'] = '\u06AF';
    t['\uFB94'] = '\u06AF';
    t['\uFB95'] = '\u06AF';
    t['\uFB96'] = '\u06B3';
    t['\uFB97'] = '\u06B3';
    t['\uFB98'] = '\u06B3';
    t['\uFB99'] = '\u06B3';
    t['\uFB9A'] = '\u06B1';
    t['\uFB9B'] = '\u06B1';
    t['\uFB9C'] = '\u06B1';
    t['\uFB9D'] = '\u06B1';
    t['\uFB9E'] = '\u06BA';
    t['\uFB9F'] = '\u06BA';
    t['\uFBA0'] = '\u06BB';
    t['\uFBA1'] = '\u06BB';
    t['\uFBA2'] = '\u06BB';
    t['\uFBA3'] = '\u06BB';
    t['\uFBA4'] = '\u06C0';
    t['\uFBA5'] = '\u06C0';
    t['\uFBA6'] = '\u06C1';
    t['\uFBA7'] = '\u06C1';
    t['\uFBA8'] = '\u06C1';
    t['\uFBA9'] = '\u06C1';
    t['\uFBAA'] = '\u06BE';
    t['\uFBAB'] = '\u06BE';
    t['\uFBAC'] = '\u06BE';
    t['\uFBAD'] = '\u06BE';
    t['\uFBAE'] = '\u06D2';
    t['\uFBAF'] = '\u06D2';
    t['\uFBB0'] = '\u06D3';
    t['\uFBB1'] = '\u06D3';
    t['\uFBD3'] = '\u06AD';
    t['\uFBD4'] = '\u06AD';
    t['\uFBD5'] = '\u06AD';
    t['\uFBD6'] = '\u06AD';
    t['\uFBD7'] = '\u06C7';
    t['\uFBD8'] = '\u06C7';
    t['\uFBD9'] = '\u06C6';
    t['\uFBDA'] = '\u06C6';
    t['\uFBDB'] = '\u06C8';
    t['\uFBDC'] = '\u06C8';
    t['\uFBDD'] = '\u0677';
    t['\uFBDE'] = '\u06CB';
    t['\uFBDF'] = '\u06CB';
    t['\uFBE0'] = '\u06C5';
    t['\uFBE1'] = '\u06C5';
    t['\uFBE2'] = '\u06C9';
    t['\uFBE3'] = '\u06C9';
    t['\uFBE4'] = '\u06D0';
    t['\uFBE5'] = '\u06D0';
    t['\uFBE6'] = '\u06D0';
    t['\uFBE7'] = '\u06D0';
    t['\uFBE8'] = '\u0649';
    t['\uFBE9'] = '\u0649';
    t['\uFBEA'] = '\u0626\u0627';
    t['\uFBEB'] = '\u0626\u0627';
    t['\uFBEC'] = '\u0626\u06D5';
    t['\uFBED'] = '\u0626\u06D5';
    t['\uFBEE'] = '\u0626\u0648';
    t['\uFBEF'] = '\u0626\u0648';
    t['\uFBF0'] = '\u0626\u06C7';
    t['\uFBF1'] = '\u0626\u06C7';
    t['\uFBF2'] = '\u0626\u06C6';
    t['\uFBF3'] = '\u0626\u06C6';
    t['\uFBF4'] = '\u0626\u06C8';
    t['\uFBF5'] = '\u0626\u06C8';
    t['\uFBF6'] = '\u0626\u06D0';
    t['\uFBF7'] = '\u0626\u06D0';
    t['\uFBF8'] = '\u0626\u06D0';
    t['\uFBF9'] = '\u0626\u0649';
    t['\uFBFA'] = '\u0626\u0649';
    t['\uFBFB'] = '\u0626\u0649';
    t['\uFBFC'] = '\u06CC';
    t['\uFBFD'] = '\u06CC';
    t['\uFBFE'] = '\u06CC';
    t['\uFBFF'] = '\u06CC';
    t['\uFC00'] = '\u0626\u062C';
    t['\uFC01'] = '\u0626\u062D';
    t['\uFC02'] = '\u0626\u0645';
    t['\uFC03'] = '\u0626\u0649';
    t['\uFC04'] = '\u0626\u064A';
    t['\uFC05'] = '\u0628\u062C';
    t['\uFC06'] = '\u0628\u062D';
    t['\uFC07'] = '\u0628\u062E';
    t['\uFC08'] = '\u0628\u0645';
    t['\uFC09'] = '\u0628\u0649';
    t['\uFC0A'] = '\u0628\u064A';
    t['\uFC0B'] = '\u062A\u062C';
    t['\uFC0C'] = '\u062A\u062D';
    t['\uFC0D'] = '\u062A\u062E';
    t['\uFC0E'] = '\u062A\u0645';
    t['\uFC0F'] = '\u062A\u0649';
    t['\uFC10'] = '\u062A\u064A';
    t['\uFC11'] = '\u062B\u062C';
    t['\uFC12'] = '\u062B\u0645';
    t['\uFC13'] = '\u062B\u0649';
    t['\uFC14'] = '\u062B\u064A';
    t['\uFC15'] = '\u062C\u062D';
    t['\uFC16'] = '\u062C\u0645';
    t['\uFC17'] = '\u062D\u062C';
    t['\uFC18'] = '\u062D\u0645';
    t['\uFC19'] = '\u062E\u062C';
    t['\uFC1A'] = '\u062E\u062D';
    t['\uFC1B'] = '\u062E\u0645';
    t['\uFC1C'] = '\u0633\u062C';
    t['\uFC1D'] = '\u0633\u062D';
    t['\uFC1E'] = '\u0633\u062E';
    t['\uFC1F'] = '\u0633\u0645';
    t['\uFC20'] = '\u0635\u062D';
    t['\uFC21'] = '\u0635\u0645';
    t['\uFC22'] = '\u0636\u062C';
    t['\uFC23'] = '\u0636\u062D';
    t['\uFC24'] = '\u0636\u062E';
    t['\uFC25'] = '\u0636\u0645';
    t['\uFC26'] = '\u0637\u062D';
    t['\uFC27'] = '\u0637\u0645';
    t['\uFC28'] = '\u0638\u0645';
    t['\uFC29'] = '\u0639\u062C';
    t['\uFC2A'] = '\u0639\u0645';
    t['\uFC2B'] = '\u063A\u062C';
    t['\uFC2C'] = '\u063A\u0645';
    t['\uFC2D'] = '\u0641\u062C';
    t['\uFC2E'] = '\u0641\u062D';
    t['\uFC2F'] = '\u0641\u062E';
    t['\uFC30'] = '\u0641\u0645';
    t['\uFC31'] = '\u0641\u0649';
    t['\uFC32'] = '\u0641\u064A';
    t['\uFC33'] = '\u0642\u062D';
    t['\uFC34'] = '\u0642\u0645';
    t['\uFC35'] = '\u0642\u0649';
    t['\uFC36'] = '\u0642\u064A';
    t['\uFC37'] = '\u0643\u0627';
    t['\uFC38'] = '\u0643\u062C';
    t['\uFC39'] = '\u0643\u062D';
    t['\uFC3A'] = '\u0643\u062E';
    t['\uFC3B'] = '\u0643\u0644';
    t['\uFC3C'] = '\u0643\u0645';
    t['\uFC3D'] = '\u0643\u0649';
    t['\uFC3E'] = '\u0643\u064A';
    t['\uFC3F'] = '\u0644\u062C';
    t['\uFC40'] = '\u0644\u062D';
    t['\uFC41'] = '\u0644\u062E';
    t['\uFC42'] = '\u0644\u0645';
    t['\uFC43'] = '\u0644\u0649';
    t['\uFC44'] = '\u0644\u064A';
    t['\uFC45'] = '\u0645\u062C';
    t['\uFC46'] = '\u0645\u062D';
    t['\uFC47'] = '\u0645\u062E';
    t['\uFC48'] = '\u0645\u0645';
    t['\uFC49'] = '\u0645\u0649';
    t['\uFC4A'] = '\u0645\u064A';
    t['\uFC4B'] = '\u0646\u062C';
    t['\uFC4C'] = '\u0646\u062D';
    t['\uFC4D'] = '\u0646\u062E';
    t['\uFC4E'] = '\u0646\u0645';
    t['\uFC4F'] = '\u0646\u0649';
    t['\uFC50'] = '\u0646\u064A';
    t['\uFC51'] = '\u0647\u062C';
    t['\uFC52'] = '\u0647\u0645';
    t['\uFC53'] = '\u0647\u0649';
    t['\uFC54'] = '\u0647\u064A';
    t['\uFC55'] = '\u064A\u062C';
    t['\uFC56'] = '\u064A\u062D';
    t['\uFC57'] = '\u064A\u062E';
    t['\uFC58'] = '\u064A\u0645';
    t['\uFC59'] = '\u064A\u0649';
    t['\uFC5A'] = '\u064A\u064A';
    t['\uFC5B'] = '\u0630\u0670';
    t['\uFC5C'] = '\u0631\u0670';
    t['\uFC5D'] = '\u0649\u0670';
    t['\uFC5E'] = '\u0020\u064C\u0651';
    t['\uFC5F'] = '\u0020\u064D\u0651';
    t['\uFC60'] = '\u0020\u064E\u0651';
    t['\uFC61'] = '\u0020\u064F\u0651';
    t['\uFC62'] = '\u0020\u0650\u0651';
    t['\uFC63'] = '\u0020\u0651\u0670';
    t['\uFC64'] = '\u0626\u0631';
    t['\uFC65'] = '\u0626\u0632';
    t['\uFC66'] = '\u0626\u0645';
    t['\uFC67'] = '\u0626\u0646';
    t['\uFC68'] = '\u0626\u0649';
    t['\uFC69'] = '\u0626\u064A';
    t['\uFC6A'] = '\u0628\u0631';
    t['\uFC6B'] = '\u0628\u0632';
    t['\uFC6C'] = '\u0628\u0645';
    t['\uFC6D'] = '\u0628\u0646';
    t['\uFC6E'] = '\u0628\u0649';
    t['\uFC6F'] = '\u0628\u064A';
    t['\uFC70'] = '\u062A\u0631';
    t['\uFC71'] = '\u062A\u0632';
    t['\uFC72'] = '\u062A\u0645';
    t['\uFC73'] = '\u062A\u0646';
    t['\uFC74'] = '\u062A\u0649';
    t['\uFC75'] = '\u062A\u064A';
    t['\uFC76'] = '\u062B\u0631';
    t['\uFC77'] = '\u062B\u0632';
    t['\uFC78'] = '\u062B\u0645';
    t['\uFC79'] = '\u062B\u0646';
    t['\uFC7A'] = '\u062B\u0649';
    t['\uFC7B'] = '\u062B\u064A';
    t['\uFC7C'] = '\u0641\u0649';
    t['\uFC7D'] = '\u0641\u064A';
    t['\uFC7E'] = '\u0642\u0649';
    t['\uFC7F'] = '\u0642\u064A';
    t['\uFC80'] = '\u0643\u0627';
    t['\uFC81'] = '\u0643\u0644';
    t['\uFC82'] = '\u0643\u0645';
    t['\uFC83'] = '\u0643\u0649';
    t['\uFC84'] = '\u0643\u064A';
    t['\uFC85'] = '\u0644\u0645';
    t['\uFC86'] = '\u0644\u0649';
    t['\uFC87'] = '\u0644\u064A';
    t['\uFC88'] = '\u0645\u0627';
    t['\uFC89'] = '\u0645\u0645';
    t['\uFC8A'] = '\u0646\u0631';
    t['\uFC8B'] = '\u0646\u0632';
    t['\uFC8C'] = '\u0646\u0645';
    t['\uFC8D'] = '\u0646\u0646';
    t['\uFC8E'] = '\u0646\u0649';
    t['\uFC8F'] = '\u0646\u064A';
    t['\uFC90'] = '\u0649\u0670';
    t['\uFC91'] = '\u064A\u0631';
    t['\uFC92'] = '\u064A\u0632';
    t['\uFC93'] = '\u064A\u0645';
    t['\uFC94'] = '\u064A\u0646';
    t['\uFC95'] = '\u064A\u0649';
    t['\uFC96'] = '\u064A\u064A';
    t['\uFC97'] = '\u0626\u062C';
    t['\uFC98'] = '\u0626\u062D';
    t['\uFC99'] = '\u0626\u062E';
    t['\uFC9A'] = '\u0626\u0645';
    t['\uFC9B'] = '\u0626\u0647';
    t['\uFC9C'] = '\u0628\u062C';
    t['\uFC9D'] = '\u0628\u062D';
    t['\uFC9E'] = '\u0628\u062E';
    t['\uFC9F'] = '\u0628\u0645';
    t['\uFCA0'] = '\u0628\u0647';
    t['\uFCA1'] = '\u062A\u062C';
    t['\uFCA2'] = '\u062A\u062D';
    t['\uFCA3'] = '\u062A\u062E';
    t['\uFCA4'] = '\u062A\u0645';
    t['\uFCA5'] = '\u062A\u0647';
    t['\uFCA6'] = '\u062B\u0645';
    t['\uFCA7'] = '\u062C\u062D';
    t['\uFCA8'] = '\u062C\u0645';
    t['\uFCA9'] = '\u062D\u062C';
    t['\uFCAA'] = '\u062D\u0645';
    t['\uFCAB'] = '\u062E\u062C';
    t['\uFCAC'] = '\u062E\u0645';
    t['\uFCAD'] = '\u0633\u062C';
    t['\uFCAE'] = '\u0633\u062D';
    t['\uFCAF'] = '\u0633\u062E';
    t['\uFCB0'] = '\u0633\u0645';
    t['\uFCB1'] = '\u0635\u062D';
    t['\uFCB2'] = '\u0635\u062E';
    t['\uFCB3'] = '\u0635\u0645';
    t['\uFCB4'] = '\u0636\u062C';
    t['\uFCB5'] = '\u0636\u062D';
    t['\uFCB6'] = '\u0636\u062E';
    t['\uFCB7'] = '\u0636\u0645';
    t['\uFCB8'] = '\u0637\u062D';
    t['\uFCB9'] = '\u0638\u0645';
    t['\uFCBA'] = '\u0639\u062C';
    t['\uFCBB'] = '\u0639\u0645';
    t['\uFCBC'] = '\u063A\u062C';
    t['\uFCBD'] = '\u063A\u0645';
    t['\uFCBE'] = '\u0641\u062C';
    t['\uFCBF'] = '\u0641\u062D';
    t['\uFCC0'] = '\u0641\u062E';
    t['\uFCC1'] = '\u0641\u0645';
    t['\uFCC2'] = '\u0642\u062D';
    t['\uFCC3'] = '\u0642\u0645';
    t['\uFCC4'] = '\u0643\u062C';
    t['\uFCC5'] = '\u0643\u062D';
    t['\uFCC6'] = '\u0643\u062E';
    t['\uFCC7'] = '\u0643\u0644';
    t['\uFCC8'] = '\u0643\u0645';
    t['\uFCC9'] = '\u0644\u062C';
    t['\uFCCA'] = '\u0644\u062D';
    t['\uFCCB'] = '\u0644\u062E';
    t['\uFCCC'] = '\u0644\u0645';
    t['\uFCCD'] = '\u0644\u0647';
    t['\uFCCE'] = '\u0645\u062C';
    t['\uFCCF'] = '\u0645\u062D';
    t['\uFCD0'] = '\u0645\u062E';
    t['\uFCD1'] = '\u0645\u0645';
    t['\uFCD2'] = '\u0646\u062C';
    t['\uFCD3'] = '\u0646\u062D';
    t['\uFCD4'] = '\u0646\u062E';
    t['\uFCD5'] = '\u0646\u0645';
    t['\uFCD6'] = '\u0646\u0647';
    t['\uFCD7'] = '\u0647\u062C';
    t['\uFCD8'] = '\u0647\u0645';
    t['\uFCD9'] = '\u0647\u0670';
    t['\uFCDA'] = '\u064A\u062C';
    t['\uFCDB'] = '\u064A\u062D';
    t['\uFCDC'] = '\u064A\u062E';
    t['\uFCDD'] = '\u064A\u0645';
    t['\uFCDE'] = '\u064A\u0647';
    t['\uFCDF'] = '\u0626\u0645';
    t['\uFCE0'] = '\u0626\u0647';
    t['\uFCE1'] = '\u0628\u0645';
    t['\uFCE2'] = '\u0628\u0647';
    t['\uFCE3'] = '\u062A\u0645';
    t['\uFCE4'] = '\u062A\u0647';
    t['\uFCE5'] = '\u062B\u0645';
    t['\uFCE6'] = '\u062B\u0647';
    t['\uFCE7'] = '\u0633\u0645';
    t['\uFCE8'] = '\u0633\u0647';
    t['\uFCE9'] = '\u0634\u0645';
    t['\uFCEA'] = '\u0634\u0647';
    t['\uFCEB'] = '\u0643\u0644';
    t['\uFCEC'] = '\u0643\u0645';
    t['\uFCED'] = '\u0644\u0645';
    t['\uFCEE'] = '\u0646\u0645';
    t['\uFCEF'] = '\u0646\u0647';
    t['\uFCF0'] = '\u064A\u0645';
    t['\uFCF1'] = '\u064A\u0647';
    t['\uFCF2'] = '\u0640\u064E\u0651';
    t['\uFCF3'] = '\u0640\u064F\u0651';
    t['\uFCF4'] = '\u0640\u0650\u0651';
    t['\uFCF5'] = '\u0637\u0649';
    t['\uFCF6'] = '\u0637\u064A';
    t['\uFCF7'] = '\u0639\u0649';
    t['\uFCF8'] = '\u0639\u064A';
    t['\uFCF9'] = '\u063A\u0649';
    t['\uFCFA'] = '\u063A\u064A';
    t['\uFCFB'] = '\u0633\u0649';
    t['\uFCFC'] = '\u0633\u064A';
    t['\uFCFD'] = '\u0634\u0649';
    t['\uFCFE'] = '\u0634\u064A';
    t['\uFCFF'] = '\u062D\u0649';
    t['\uFD00'] = '\u062D\u064A';
    t['\uFD01'] = '\u062C\u0649';
    t['\uFD02'] = '\u062C\u064A';
    t['\uFD03'] = '\u062E\u0649';
    t['\uFD04'] = '\u062E\u064A';
    t['\uFD05'] = '\u0635\u0649';
    t['\uFD06'] = '\u0635\u064A';
    t['\uFD07'] = '\u0636\u0649';
    t['\uFD08'] = '\u0636\u064A';
    t['\uFD09'] = '\u0634\u062C';
    t['\uFD0A'] = '\u0634\u062D';
    t['\uFD0B'] = '\u0634\u062E';
    t['\uFD0C'] = '\u0634\u0645';
    t['\uFD0D'] = '\u0634\u0631';
    t['\uFD0E'] = '\u0633\u0631';
    t['\uFD0F'] = '\u0635\u0631';
    t['\uFD10'] = '\u0636\u0631';
    t['\uFD11'] = '\u0637\u0649';
    t['\uFD12'] = '\u0637\u064A';
    t['\uFD13'] = '\u0639\u0649';
    t['\uFD14'] = '\u0639\u064A';
    t['\uFD15'] = '\u063A\u0649';
    t['\uFD16'] = '\u063A\u064A';
    t['\uFD17'] = '\u0633\u0649';
    t['\uFD18'] = '\u0633\u064A';
    t['\uFD19'] = '\u0634\u0649';
    t['\uFD1A'] = '\u0634\u064A';
    t['\uFD1B'] = '\u062D\u0649';
    t['\uFD1C'] = '\u062D\u064A';
    t['\uFD1D'] = '\u062C\u0649';
    t['\uFD1E'] = '\u062C\u064A';
    t['\uFD1F'] = '\u062E\u0649';
    t['\uFD20'] = '\u062E\u064A';
    t['\uFD21'] = '\u0635\u0649';
    t['\uFD22'] = '\u0635\u064A';
    t['\uFD23'] = '\u0636\u0649';
    t['\uFD24'] = '\u0636\u064A';
    t['\uFD25'] = '\u0634\u062C';
    t['\uFD26'] = '\u0634\u062D';
    t['\uFD27'] = '\u0634\u062E';
    t['\uFD28'] = '\u0634\u0645';
    t['\uFD29'] = '\u0634\u0631';
    t['\uFD2A'] = '\u0633\u0631';
    t['\uFD2B'] = '\u0635\u0631';
    t['\uFD2C'] = '\u0636\u0631';
    t['\uFD2D'] = '\u0634\u062C';
    t['\uFD2E'] = '\u0634\u062D';
    t['\uFD2F'] = '\u0634\u062E';
    t['\uFD30'] = '\u0634\u0645';
    t['\uFD31'] = '\u0633\u0647';
    t['\uFD32'] = '\u0634\u0647';
    t['\uFD33'] = '\u0637\u0645';
    t['\uFD34'] = '\u0633\u062C';
    t['\uFD35'] = '\u0633\u062D';
    t['\uFD36'] = '\u0633\u062E';
    t['\uFD37'] = '\u0634\u062C';
    t['\uFD38'] = '\u0634\u062D';
    t['\uFD39'] = '\u0634\u062E';
    t['\uFD3A'] = '\u0637\u0645';
    t['\uFD3B'] = '\u0638\u0645';
    t['\uFD3C'] = '\u0627\u064B';
    t['\uFD3D'] = '\u0627\u064B';
    t['\uFD50'] = '\u062A\u062C\u0645';
    t['\uFD51'] = '\u062A\u062D\u062C';
    t['\uFD52'] = '\u062A\u062D\u062C';
    t['\uFD53'] = '\u062A\u062D\u0645';
    t['\uFD54'] = '\u062A\u062E\u0645';
    t['\uFD55'] = '\u062A\u0645\u062C';
    t['\uFD56'] = '\u062A\u0645\u062D';
    t['\uFD57'] = '\u062A\u0645\u062E';
    t['\uFD58'] = '\u062C\u0645\u062D';
    t['\uFD59'] = '\u062C\u0645\u062D';
    t['\uFD5A'] = '\u062D\u0645\u064A';
    t['\uFD5B'] = '\u062D\u0645\u0649';
    t['\uFD5C'] = '\u0633\u062D\u062C';
    t['\uFD5D'] = '\u0633\u062C\u062D';
    t['\uFD5E'] = '\u0633\u062C\u0649';
    t['\uFD5F'] = '\u0633\u0645\u062D';
    t['\uFD60'] = '\u0633\u0645\u062D';
    t['\uFD61'] = '\u0633\u0645\u062C';
    t['\uFD62'] = '\u0633\u0645\u0645';
    t['\uFD63'] = '\u0633\u0645\u0645';
    t['\uFD64'] = '\u0635\u062D\u062D';
    t['\uFD65'] = '\u0635\u062D\u062D';
    t['\uFD66'] = '\u0635\u0645\u0645';
    t['\uFD67'] = '\u0634\u062D\u0645';
    t['\uFD68'] = '\u0634\u062D\u0645';
    t['\uFD69'] = '\u0634\u062C\u064A';
    t['\uFD6A'] = '\u0634\u0645\u062E';
    t['\uFD6B'] = '\u0634\u0645\u062E';
    t['\uFD6C'] = '\u0634\u0645\u0645';
    t['\uFD6D'] = '\u0634\u0645\u0645';
    t['\uFD6E'] = '\u0636\u062D\u0649';
    t['\uFD6F'] = '\u0636\u062E\u0645';
    t['\uFD70'] = '\u0636\u062E\u0645';
    t['\uFD71'] = '\u0637\u0645\u062D';
    t['\uFD72'] = '\u0637\u0645\u062D';
    t['\uFD73'] = '\u0637\u0645\u0645';
    t['\uFD74'] = '\u0637\u0645\u064A';
    t['\uFD75'] = '\u0639\u062C\u0645';
    t['\uFD76'] = '\u0639\u0645\u0645';
    t['\uFD77'] = '\u0639\u0645\u0645';
    t['\uFD78'] = '\u0639\u0645\u0649';
    t['\uFD79'] = '\u063A\u0645\u0645';
    t['\uFD7A'] = '\u063A\u0645\u064A';
    t['\uFD7B'] = '\u063A\u0645\u0649';
    t['\uFD7C'] = '\u0641\u062E\u0645';
    t['\uFD7D'] = '\u0641\u062E\u0645';
    t['\uFD7E'] = '\u0642\u0645\u062D';
    t['\uFD7F'] = '\u0642\u0645\u0645';
    t['\uFD80'] = '\u0644\u062D\u0645';
    t['\uFD81'] = '\u0644\u062D\u064A';
    t['\uFD82'] = '\u0644\u062D\u0649';
    t['\uFD83'] = '\u0644\u062C\u062C';
    t['\uFD84'] = '\u0644\u062C\u062C';
    t['\uFD85'] = '\u0644\u062E\u0645';
    t['\uFD86'] = '\u0644\u062E\u0645';
    t['\uFD87'] = '\u0644\u0645\u062D';
    t['\uFD88'] = '\u0644\u0645\u062D';
    t['\uFD89'] = '\u0645\u062D\u062C';
    t['\uFD8A'] = '\u0645\u062D\u0645';
    t['\uFD8B'] = '\u0645\u062D\u064A';
    t['\uFD8C'] = '\u0645\u062C\u062D';
    t['\uFD8D'] = '\u0645\u062C\u0645';
    t['\uFD8E'] = '\u0645\u062E\u062C';
    t['\uFD8F'] = '\u0645\u062E\u0645';
    t['\uFD92'] = '\u0645\u062C\u062E';
    t['\uFD93'] = '\u0647\u0645\u062C';
    t['\uFD94'] = '\u0647\u0645\u0645';
    t['\uFD95'] = '\u0646\u062D\u0645';
    t['\uFD96'] = '\u0646\u062D\u0649';
    t['\uFD97'] = '\u0646\u062C\u0645';
    t['\uFD98'] = '\u0646\u062C\u0645';
    t['\uFD99'] = '\u0646\u062C\u0649';
    t['\uFD9A'] = '\u0646\u0645\u064A';
    t['\uFD9B'] = '\u0646\u0645\u0649';
    t['\uFD9C'] = '\u064A\u0645\u0645';
    t['\uFD9D'] = '\u064A\u0645\u0645';
    t['\uFD9E'] = '\u0628\u062E\u064A';
    t['\uFD9F'] = '\u062A\u062C\u064A';
    t['\uFDA0'] = '\u062A\u062C\u0649';
    t['\uFDA1'] = '\u062A\u062E\u064A';
    t['\uFDA2'] = '\u062A\u062E\u0649';
    t['\uFDA3'] = '\u062A\u0645\u064A';
    t['\uFDA4'] = '\u062A\u0645\u0649';
    t['\uFDA5'] = '\u062C\u0645\u064A';
    t['\uFDA6'] = '\u062C\u062D\u0649';
    t['\uFDA7'] = '\u062C\u0645\u0649';
    t['\uFDA8'] = '\u0633\u062E\u0649';
    t['\uFDA9'] = '\u0635\u062D\u064A';
    t['\uFDAA'] = '\u0634\u062D\u064A';
    t['\uFDAB'] = '\u0636\u062D\u064A';
    t['\uFDAC'] = '\u0644\u062C\u064A';
    t['\uFDAD'] = '\u0644\u0645\u064A';
    t['\uFDAE'] = '\u064A\u062D\u064A';
    t['\uFDAF'] = '\u064A\u062C\u064A';
    t['\uFDB0'] = '\u064A\u0645\u064A';
    t['\uFDB1'] = '\u0645\u0645\u064A';
    t['\uFDB2'] = '\u0642\u0645\u064A';
    t['\uFDB3'] = '\u0646\u062D\u064A';
    t['\uFDB4'] = '\u0642\u0645\u062D';
    t['\uFDB5'] = '\u0644\u062D\u0645';
    t['\uFDB6'] = '\u0639\u0645\u064A';
    t['\uFDB7'] = '\u0643\u0645\u064A';
    t['\uFDB8'] = '\u0646\u062C\u062D';
    t['\uFDB9'] = '\u0645\u062E\u064A';
    t['\uFDBA'] = '\u0644\u062C\u0645';
    t['\uFDBB'] = '\u0643\u0645\u0645';
    t['\uFDBC'] = '\u0644\u062C\u0645';
    t['\uFDBD'] = '\u0646\u062C\u062D';
    t['\uFDBE'] = '\u062C\u062D\u064A';
    t['\uFDBF'] = '\u062D\u062C\u064A';
    t['\uFDC0'] = '\u0645\u062C\u064A';
    t['\uFDC1'] = '\u0641\u0645\u064A';
    t['\uFDC2'] = '\u0628\u062D\u064A';
    t['\uFDC3'] = '\u0643\u0645\u0645';
    t['\uFDC4'] = '\u0639\u062C\u0645';
    t['\uFDC5'] = '\u0635\u0645\u0645';
    t['\uFDC6'] = '\u0633\u062E\u064A';
    t['\uFDC7'] = '\u0646\u062C\u064A';
    t['\uFE49'] = '\u203E';
    t['\uFE4A'] = '\u203E';
    t['\uFE4B'] = '\u203E';
    t['\uFE4C'] = '\u203E';
    t['\uFE4D'] = '\u005F';
    t['\uFE4E'] = '\u005F';
    t['\uFE4F'] = '\u005F';
    t['\uFE80'] = '\u0621';
    t['\uFE81'] = '\u0622';
    t['\uFE82'] = '\u0622';
    t['\uFE83'] = '\u0623';
    t['\uFE84'] = '\u0623';
    t['\uFE85'] = '\u0624';
    t['\uFE86'] = '\u0624';
    t['\uFE87'] = '\u0625';
    t['\uFE88'] = '\u0625';
    t['\uFE89'] = '\u0626';
    t['\uFE8A'] = '\u0626';
    t['\uFE8B'] = '\u0626';
    t['\uFE8C'] = '\u0626';
    t['\uFE8D'] = '\u0627';
    t['\uFE8E'] = '\u0627';
    t['\uFE8F'] = '\u0628';
    t['\uFE90'] = '\u0628';
    t['\uFE91'] = '\u0628';
    t['\uFE92'] = '\u0628';
    t['\uFE93'] = '\u0629';
    t['\uFE94'] = '\u0629';
    t['\uFE95'] = '\u062A';
    t['\uFE96'] = '\u062A';
    t['\uFE97'] = '\u062A';
    t['\uFE98'] = '\u062A';
    t['\uFE99'] = '\u062B';
    t['\uFE9A'] = '\u062B';
    t['\uFE9B'] = '\u062B';
    t['\uFE9C'] = '\u062B';
    t['\uFE9D'] = '\u062C';
    t['\uFE9E'] = '\u062C';
    t['\uFE9F'] = '\u062C';
    t['\uFEA0'] = '\u062C';
    t['\uFEA1'] = '\u062D';
    t['\uFEA2'] = '\u062D';
    t['\uFEA3'] = '\u062D';
    t['\uFEA4'] = '\u062D';
    t['\uFEA5'] = '\u062E';
    t['\uFEA6'] = '\u062E';
    t['\uFEA7'] = '\u062E';
    t['\uFEA8'] = '\u062E';
    t['\uFEA9'] = '\u062F';
    t['\uFEAA'] = '\u062F';
    t['\uFEAB'] = '\u0630';
    t['\uFEAC'] = '\u0630';
    t['\uFEAD'] = '\u0631';
    t['\uFEAE'] = '\u0631';
    t['\uFEAF'] = '\u0632';
    t['\uFEB0'] = '\u0632';
    t['\uFEB1'] = '\u0633';
    t['\uFEB2'] = '\u0633';
    t['\uFEB3'] = '\u0633';
    t['\uFEB4'] = '\u0633';
    t['\uFEB5'] = '\u0634';
    t['\uFEB6'] = '\u0634';
    t['\uFEB7'] = '\u0634';
    t['\uFEB8'] = '\u0634';
    t['\uFEB9'] = '\u0635';
    t['\uFEBA'] = '\u0635';
    t['\uFEBB'] = '\u0635';
    t['\uFEBC'] = '\u0635';
    t['\uFEBD'] = '\u0636';
    t['\uFEBE'] = '\u0636';
    t['\uFEBF'] = '\u0636';
    t['\uFEC0'] = '\u0636';
    t['\uFEC1'] = '\u0637';
    t['\uFEC2'] = '\u0637';
    t['\uFEC3'] = '\u0637';
    t['\uFEC4'] = '\u0637';
    t['\uFEC5'] = '\u0638';
    t['\uFEC6'] = '\u0638';
    t['\uFEC7'] = '\u0638';
    t['\uFEC8'] = '\u0638';
    t['\uFEC9'] = '\u0639';
    t['\uFECA'] = '\u0639';
    t['\uFECB'] = '\u0639';
    t['\uFECC'] = '\u0639';
    t['\uFECD'] = '\u063A';
    t['\uFECE'] = '\u063A';
    t['\uFECF'] = '\u063A';
    t['\uFED0'] = '\u063A';
    t['\uFED1'] = '\u0641';
    t['\uFED2'] = '\u0641';
    t['\uFED3'] = '\u0641';
    t['\uFED4'] = '\u0641';
    t['\uFED5'] = '\u0642';
    t['\uFED6'] = '\u0642';
    t['\uFED7'] = '\u0642';
    t['\uFED8'] = '\u0642';
    t['\uFED9'] = '\u0643';
    t['\uFEDA'] = '\u0643';
    t['\uFEDB'] = '\u0643';
    t['\uFEDC'] = '\u0643';
    t['\uFEDD'] = '\u0644';
    t['\uFEDE'] = '\u0644';
    t['\uFEDF'] = '\u0644';
    t['\uFEE0'] = '\u0644';
    t['\uFEE1'] = '\u0645';
    t['\uFEE2'] = '\u0645';
    t['\uFEE3'] = '\u0645';
    t['\uFEE4'] = '\u0645';
    t['\uFEE5'] = '\u0646';
    t['\uFEE6'] = '\u0646';
    t['\uFEE7'] = '\u0646';
    t['\uFEE8'] = '\u0646';
    t['\uFEE9'] = '\u0647';
    t['\uFEEA'] = '\u0647';
    t['\uFEEB'] = '\u0647';
    t['\uFEEC'] = '\u0647';
    t['\uFEED'] = '\u0648';
    t['\uFEEE'] = '\u0648';
    t['\uFEEF'] = '\u0649';
    t['\uFEF0'] = '\u0649';
    t['\uFEF1'] = '\u064A';
    t['\uFEF2'] = '\u064A';
    t['\uFEF3'] = '\u064A';
    t['\uFEF4'] = '\u064A';
    t['\uFEF5'] = '\u0644\u0622';
    t['\uFEF6'] = '\u0644\u0622';
    t['\uFEF7'] = '\u0644\u0623';
    t['\uFEF8'] = '\u0644\u0623';
    t['\uFEF9'] = '\u0644\u0625';
    t['\uFEFA'] = '\u0644\u0625';
    t['\uFEFB'] = '\u0644\u0627';
    t['\uFEFC'] = '\u0644\u0627';
  });

  function reverseIfRtl(chars) {
    var charsLength = chars.length;
    //reverse an arabic ligature
    if (charsLength <= 1 || !isRTLRangeFor(chars.charCodeAt(0))) {
      return chars;
    }
    var s = '';
    for (var ii = charsLength - 1; ii >= 0; ii--) {
      s += chars[ii];
    }
    return s;
  }

  exports.mapSpecialUnicodeValues = mapSpecialUnicodeValues;
  exports.reverseIfRtl = reverseIfRtl;
  exports.getUnicodeRangeFor = getUnicodeRangeFor;
  exports.getNormalizedUnicodes = getNormalizedUnicodes;
  exports.getUnicodeForGlyph = getUnicodeForGlyph;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreStream = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCoreJbig2, root.pdfjsCoreJpg,
      root.pdfjsCoreJpx);
  }
}(this, function (exports, sharedUtil, corePrimitives, coreJbig2, coreJpg,
                  coreJpx) {

var Util = sharedUtil.Util;
var error = sharedUtil.error;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var createObjectURL = sharedUtil.createObjectURL;
var shadow = sharedUtil.shadow;
var warn = sharedUtil.warn;
var isSpace = sharedUtil.isSpace;
var Dict = corePrimitives.Dict;
var isDict = corePrimitives.isDict;
var Jbig2Image = coreJbig2.Jbig2Image;
var JpegImage = coreJpg.JpegImage;
var JpxImage = coreJpx.JpxImage;

var Stream = (function StreamClosure() {
  function Stream(arrayBuffer, start, length, dict) {
    this.bytes = (arrayBuffer instanceof Uint8Array ?
                  arrayBuffer : new Uint8Array(arrayBuffer));
    this.start = start || 0;
    this.pos = this.start;
    this.end = (start + length) || this.bytes.length;
    this.dict = dict;
  }

  // required methods for a stream. if a particular stream does not
  // implement these, an error should be thrown
  Stream.prototype = {
    get length() {
      return this.end - this.start;
    },
    get isEmpty() {
      return this.length === 0;
    },
    getByte: function Stream_getByte() {
      if (this.pos >= this.end) {
        return -1;
      }
      return this.bytes[this.pos++];
    },
    getUint16: function Stream_getUint16() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      if (b0 === -1 || b1 === -1) {
        return -1;
      }
      return (b0 << 8) + b1;
    },
    getInt32: function Stream_getInt32() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      var b2 = this.getByte();
      var b3 = this.getByte();
      return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    },
    // returns subarray of original buffer
    // should only be read
    getBytes: function Stream_getBytes(length) {
      var bytes = this.bytes;
      var pos = this.pos;
      var strEnd = this.end;

      if (!length) {
        return bytes.subarray(pos, strEnd);
      }
      var end = pos + length;
      if (end > strEnd) {
        end = strEnd;
      }
      this.pos = end;
      return bytes.subarray(pos, end);
    },
    peekByte: function Stream_peekByte() {
      var peekedByte = this.getByte();
      this.pos--;
      return peekedByte;
    },
    peekBytes: function Stream_peekBytes(length) {
      var bytes = this.getBytes(length);
      this.pos -= bytes.length;
      return bytes;
    },
    skip: function Stream_skip(n) {
      if (!n) {
        n = 1;
      }
      this.pos += n;
    },
    reset: function Stream_reset() {
      this.pos = this.start;
    },
    moveStart: function Stream_moveStart() {
      this.start = this.pos;
    },
    makeSubStream: function Stream_makeSubStream(start, length, dict) {
      return new Stream(this.bytes.buffer, start, length, dict);
    },
    isStream: true
  };

  return Stream;
})();

var StringStream = (function StringStreamClosure() {
  function StringStream(str) {
    var length = str.length;
    var bytes = new Uint8Array(length);
    for (var n = 0; n < length; ++n) {
      bytes[n] = str.charCodeAt(n);
    }
    Stream.call(this, bytes);
  }

  StringStream.prototype = Stream.prototype;

  return StringStream;
})();

// super class for the decoding streams
var DecodeStream = (function DecodeStreamClosure() {
  // Lots of DecodeStreams are created whose buffers are never used.  For these
  // we share a single empty buffer. This is (a) space-efficient and (b) avoids
  // having special cases that would be required if we used |null| for an empty
  // buffer.
  var emptyBuffer = new Uint8Array(0);

  function DecodeStream(maybeMinBufferLength) {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = emptyBuffer;
    this.minBufferLength = 512;
    if (maybeMinBufferLength) {
      // Compute the first power of two that is as big as maybeMinBufferLength.
      while (this.minBufferLength < maybeMinBufferLength) {
        this.minBufferLength *= 2;
      }
    }
  }

  DecodeStream.prototype = {
    get isEmpty() {
      while (!this.eof && this.bufferLength === 0) {
        this.readBlock();
      }
      return this.bufferLength === 0;
    },
    ensureBuffer: function DecodeStream_ensureBuffer(requested) {
      var buffer = this.buffer;
      if (requested <= buffer.byteLength) {
        return buffer;
      }
      var size = this.minBufferLength;
      while (size < requested) {
        size *= 2;
      }
      var buffer2 = new Uint8Array(size);
      buffer2.set(buffer);
      return (this.buffer = buffer2);
    },
    getByte: function DecodeStream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof) {
          return -1;
        }
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getUint16: function DecodeStream_getUint16() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      if (b0 === -1 || b1 === -1) {
        return -1;
      }
      return (b0 << 8) + b1;
    },
    getInt32: function DecodeStream_getInt32() {
      var b0 = this.getByte();
      var b1 = this.getByte();
      var b2 = this.getByte();
      var b3 = this.getByte();
      return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    },
    getBytes: function DecodeStream_getBytes(length) {
      var end, pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        end = pos + length;

        while (!this.eof && this.bufferLength < end) {
          this.readBlock();
        }
        var bufEnd = this.bufferLength;
        if (end > bufEnd) {
          end = bufEnd;
        }
      } else {
        while (!this.eof) {
          this.readBlock();
        }
        end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    peekByte: function DecodeStream_peekByte() {
      var peekedByte = this.getByte();
      this.pos--;
      return peekedByte;
    },
    peekBytes: function DecodeStream_peekBytes(length) {
      var bytes = this.getBytes(length);
      this.pos -= bytes.length;
      return bytes;
    },
    makeSubStream: function DecodeStream_makeSubStream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof) {
        this.readBlock();
      }
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function DecodeStream_skip(n) {
      if (!n) {
        n = 1;
      }
      this.pos += n;
    },
    reset: function DecodeStream_reset() {
      this.pos = 0;
    },
    getBaseStreams: function DecodeStream_getBaseStreams() {
      if (this.str && this.str.getBaseStreams) {
        return this.str.getBaseStreams();
      }
      return [];
    }
  };

  return DecodeStream;
})();

var StreamsSequenceStream = (function StreamsSequenceStreamClosure() {
  function StreamsSequenceStream(streams) {
    this.streams = streams;
    DecodeStream.call(this, /* maybeLength = */ null);
  }

  StreamsSequenceStream.prototype = Object.create(DecodeStream.prototype);

  StreamsSequenceStream.prototype.readBlock =
      function streamSequenceStreamReadBlock() {

    var streams = this.streams;
    if (streams.length === 0) {
      this.eof = true;
      return;
    }
    var stream = streams.shift();
    var chunk = stream.getBytes();
    var bufferLength = this.bufferLength;
    var newLength = bufferLength + chunk.length;
    var buffer = this.ensureBuffer(newLength);
    buffer.set(chunk, bufferLength);
    this.bufferLength = newLength;
  };

  StreamsSequenceStream.prototype.getBaseStreams =
    function StreamsSequenceStream_getBaseStreams() {

    var baseStreams = [];
    for (var i = 0, ii = this.streams.length; i < ii; i++) {
      var stream = this.streams[i];
      if (stream.getBaseStreams) {
        Util.appendToArray(baseStreams, stream.getBaseStreams());
      }
    }
    return baseStreams;
  };

  return StreamsSequenceStream;
})();

var FlateStream = (function FlateStreamClosure() {
  var codeLenCodeMap = new Int32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Int32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Int32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Int32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Int32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];

  function FlateStream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;

    var cmf = str.getByte();
    var flg = str.getByte();
    if (cmf === -1 || flg === -1) {
      error('Invalid header in flate stream: ' + cmf + ', ' + flg);
    }
    if ((cmf & 0x0f) !== 0x08) {
      error('Unknown compression method in flate stream: ' + cmf + ', ' + flg);
    }
    if ((((cmf << 8) + flg) % 31) !== 0) {
      error('Bad FCHECK in flate stream: ' + cmf + ', ' + flg);
    }
    if (flg & 0x20) {
      error('FDICT bit set in flate stream: ' + cmf + ', ' + flg);
    }

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this, maybeLength);
  }

  FlateStream.prototype = Object.create(DecodeStream.prototype);

  FlateStream.prototype.getBits = function FlateStream_getBits(bits) {
    var str = this.str;
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;

    var b;
    while (codeSize < bits) {
      if ((b = str.getByte()) === -1) {
        error('Bad encoding in flate stream');
      }
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;

    return b;
  };

  FlateStream.prototype.getCode = function FlateStream_getCode(table) {
    var str = this.str;
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;

    var b;
    while (codeSize < maxLen) {
      if ((b = str.getByte()) === -1) {
        // premature end of stream. code might however still be valid.
        // codeSize < codeLen check below guards against incomplete codeVal.
        break;
      }
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeLen < 1 || codeSize < codeLen) {
      error('Bad encoding in flate stream');
    }
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    return codeVal;
  };

  FlateStream.prototype.generateHuffmanTable =
      function flateStreamGenerateHuffmanTable(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    var i;
    for (i = 0; i < n; ++i) {
      if (lengths[i] > maxLen) {
        maxLen = lengths[i];
      }
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Int32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] === len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (i = code2; i < size; i += skip) {
            codes[i] = (len << 16) | val;
          }
          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  FlateStream.prototype.readBlock = function FlateStream_readBlock() {
    var buffer, len;
    var str = this.str;
    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1) {
      this.eof = true;
    }
    hdr >>= 1;

    if (hdr === 0) { // uncompressed block
      var b;

      if ((b = str.getByte()) === -1) {
        error('Bad block header in flate stream');
      }
      var blockLen = b;
      if ((b = str.getByte()) === -1) {
        error('Bad block header in flate stream');
      }
      blockLen |= (b << 8);
      if ((b = str.getByte()) === -1) {
        error('Bad block header in flate stream');
      }
      var check = b;
      if ((b = str.getByte()) === -1) {
        error('Bad block header in flate stream');
      }
      check |= (b << 8);
      if (check !== (~blockLen & 0xffff) &&
          (blockLen !== 0 || check !== 0)) {
        // Ignoring error for bad "empty" block (see issue 1277)
        error('Bad uncompressed block length in flate stream');
      }

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      if (blockLen === 0) {
        if (str.peekByte() === -1) {
          this.eof = true;
        }
      } else {
        for (var n = bufferLength; n < end; ++n) {
          if ((b = str.getByte()) === -1) {
            this.eof = true;
            break;
          }
          buffer[n] = b;
        }
      }
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr === 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr === 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = new Uint8Array(codeLenCodeMap.length);

      var i;
      for (i = 0; i < numCodeLenCodes; ++i) {
        codeLenCodeLengths[codeLenCodeMap[i]] = this.getBits(3);
      }
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      len = 0;
      i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Uint8Array(codes);
      var bitsLength, bitsOffset, what;
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code === 16) {
          bitsLength = 2; bitsOffset = 3; what = len;
        } else if (code === 17) {
          bitsLength = 3; bitsOffset = 3; what = (len = 0);
        } else if (code === 18) {
          bitsLength = 7; bitsOffset = 11; what = (len = 0);
        } else {
          codeLengths[i++] = len = code;
          continue;
        }

        var repeatLength = this.getBits(bitsLength) + bitsOffset;
        while (repeatLength-- > 0) {
          codeLengths[i++] = what;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.subarray(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.subarray(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 === 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0) {
        code2 = this.getBits(code2);
      }
      len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0) {
        code2 = this.getBits(code2);
      }
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos) {
        buffer[pos] = buffer[pos - dist];
      }
    }
  };

  return FlateStream;
})();

var PredictorStream = (function PredictorStreamClosure() {
  function PredictorStream(str, maybeLength, params) {
    if (!isDict(params)) {
      return str; // no prediction
    }
    var predictor = this.predictor = params.get('Predictor') || 1;

    if (predictor <= 1) {
      return str; // no prediction
    }
    if (predictor !== 2 && (predictor < 10 || predictor > 15)) {
      error('Unsupported predictor: ' + predictor);
    }

    if (predictor === 2) {
      this.readBlock = this.readBlockTiff;
    } else {
      this.readBlock = this.readBlockPng;
    }

    this.str = str;
    this.dict = str.dict;

    var colors = this.colors = params.get('Colors') || 1;
    var bits = this.bits = params.get('BitsPerComponent') || 8;
    var columns = this.columns = params.get('Columns') || 1;

    this.pixBytes = (colors * bits + 7) >> 3;
    this.rowBytes = (columns * colors * bits + 7) >> 3;

    DecodeStream.call(this, maybeLength);
    return this;
  }

  PredictorStream.prototype = Object.create(DecodeStream.prototype);

  PredictorStream.prototype.readBlockTiff =
      function predictorStreamReadBlockTiff() {
    var rowBytes = this.rowBytes;

    var bufferLength = this.bufferLength;
    var buffer = this.ensureBuffer(bufferLength + rowBytes);

    var bits = this.bits;
    var colors = this.colors;

    var rawBytes = this.str.getBytes(rowBytes);
    this.eof = !rawBytes.length;
    if (this.eof) {
      return;
    }

    var inbuf = 0, outbuf = 0;
    var inbits = 0, outbits = 0;
    var pos = bufferLength;
    var i;

    if (bits === 1) {
      for (i = 0; i < rowBytes; ++i) {
        var c = rawBytes[i];
        inbuf = (inbuf << 8) | c;
        // bitwise addition is exclusive or
        // first shift inbuf and then add
        buffer[pos++] = (c ^ (inbuf >> colors)) & 0xFF;
        // truncate inbuf (assumes colors < 16)
        inbuf &= 0xFFFF;
      }
    } else if (bits === 8) {
      for (i = 0; i < colors; ++i) {
        buffer[pos++] = rawBytes[i];
      }
      for (; i < rowBytes; ++i) {
        buffer[pos] = buffer[pos - colors] + rawBytes[i];
        pos++;
      }
    } else {
      var compArray = new Uint8Array(colors + 1);
      var bitMask = (1 << bits) - 1;
      var j = 0, k = bufferLength;
      var columns = this.columns;
      for (i = 0; i < columns; ++i) {
        for (var kk = 0; kk < colors; ++kk) {
          if (inbits < bits) {
            inbuf = (inbuf << 8) | (rawBytes[j++] & 0xFF);
            inbits += 8;
          }
          compArray[kk] = (compArray[kk] +
                           (inbuf >> (inbits - bits))) & bitMask;
          inbits -= bits;
          outbuf = (outbuf << bits) | compArray[kk];
          outbits += bits;
          if (outbits >= 8) {
            buffer[k++] = (outbuf >> (outbits - 8)) & 0xFF;
            outbits -= 8;
          }
        }
      }
      if (outbits > 0) {
        buffer[k++] = (outbuf << (8 - outbits)) +
                      (inbuf & ((1 << (8 - outbits)) - 1));
      }
    }
    this.bufferLength += rowBytes;
  };

  PredictorStream.prototype.readBlockPng =
      function predictorStreamReadBlockPng() {

    var rowBytes = this.rowBytes;
    var pixBytes = this.pixBytes;

    var predictor = this.str.getByte();
    var rawBytes = this.str.getBytes(rowBytes);
    this.eof = !rawBytes.length;
    if (this.eof) {
      return;
    }

    var bufferLength = this.bufferLength;
    var buffer = this.ensureBuffer(bufferLength + rowBytes);

    var prevRow = buffer.subarray(bufferLength - rowBytes, bufferLength);
    if (prevRow.length === 0) {
      prevRow = new Uint8Array(rowBytes);
    }

    var i, j = bufferLength, up, c;
    switch (predictor) {
      case 0:
        for (i = 0; i < rowBytes; ++i) {
          buffer[j++] = rawBytes[i];
        }
        break;
      case 1:
        for (i = 0; i < pixBytes; ++i) {
          buffer[j++] = rawBytes[i];
        }
        for (; i < rowBytes; ++i) {
          buffer[j] = (buffer[j - pixBytes] + rawBytes[i]) & 0xFF;
          j++;
        }
        break;
      case 2:
        for (i = 0; i < rowBytes; ++i) {
          buffer[j++] = (prevRow[i] + rawBytes[i]) & 0xFF;
        }
        break;
      case 3:
        for (i = 0; i < pixBytes; ++i) {
          buffer[j++] = (prevRow[i] >> 1) + rawBytes[i];
        }
        for (; i < rowBytes; ++i) {
          buffer[j] = (((prevRow[i] + buffer[j - pixBytes]) >> 1) +
                           rawBytes[i]) & 0xFF;
          j++;
        }
        break;
      case 4:
        // we need to save the up left pixels values. the simplest way
        // is to create a new buffer
        for (i = 0; i < pixBytes; ++i) {
          up = prevRow[i];
          c = rawBytes[i];
          buffer[j++] = up + c;
        }
        for (; i < rowBytes; ++i) {
          up = prevRow[i];
          var upLeft = prevRow[i - pixBytes];
          var left = buffer[j - pixBytes];
          var p = left + up - upLeft;

          var pa = p - left;
          if (pa < 0) {
            pa = -pa;
          }
          var pb = p - up;
          if (pb < 0) {
            pb = -pb;
          }
          var pc = p - upLeft;
          if (pc < 0) {
            pc = -pc;
          }

          c = rawBytes[i];
          if (pa <= pb && pa <= pc) {
            buffer[j++] = left + c;
          } else if (pb <= pc) {
            buffer[j++] = up + c;
          } else {
            buffer[j++] = upLeft + c;
          }
        }
        break;
      default:
        error('Unsupported predictor: ' + predictor);
    }
    this.bufferLength += rowBytes;
  };

  return PredictorStream;
})();

/**
 * Depending on the type of JPEG a JpegStream is handled in different ways. For
 * JPEG's that are supported natively such as DeviceGray and DeviceRGB the image
 * data is stored and then loaded by the browser.  For unsupported JPEG's we use
 * a library to decode these images and the stream behaves like all the other
 * DecodeStreams.
 */
var JpegStream = (function JpegStreamClosure() {
  function JpegStream(stream, maybeLength, dict, xref) {
    // Some images may contain 'junk' before the SOI (start-of-image) marker.
    // Note: this seems to mainly affect inline images.
    var ch;
    while ((ch = stream.getByte()) !== -1) {
      if (ch === 0xFF) { // Find the first byte of the SOI marker (0xFFD8).
        stream.skip(-1); // Reset the stream position to the SOI.
        break;
      }
    }
    this.stream = stream;
    this.maybeLength = maybeLength;
    this.dict = dict;

    DecodeStream.call(this, maybeLength);
  }

  JpegStream.prototype = Object.create(DecodeStream.prototype);

  Object.defineProperty(JpegStream.prototype, 'bytes', {
    get: function JpegStream_bytes() {
      // If this.maybeLength is null, we'll get the entire stream.
      return shadow(this, 'bytes', this.stream.getBytes(this.maybeLength));
    },
    configurable: true
  });

  JpegStream.prototype.ensureBuffer = function JpegStream_ensureBuffer(req) {
    if (this.bufferLength) {
      return;
    }
    try {
      var jpegImage = new JpegImage();

      // checking if values needs to be transformed before conversion
      if (this.forceRGB && this.dict && isArray(this.dict.get('Decode'))) {
        var decodeArr = this.dict.getArray('Decode');
        var bitsPerComponent = this.dict.get('BitsPerComponent') || 8;
        var decodeArrLength = decodeArr.length;
        var transform = new Int32Array(decodeArrLength);
        var transformNeeded = false;
        var maxValue = (1 << bitsPerComponent) - 1;
        for (var i = 0; i < decodeArrLength; i += 2) {
          transform[i] = ((decodeArr[i + 1] - decodeArr[i]) * 256) | 0;
          transform[i + 1] = (decodeArr[i] * maxValue) | 0;
          if (transform[i] !== 256 || transform[i + 1] !== 0) {
            transformNeeded = true;
          }
        }
        if (transformNeeded) {
          jpegImage.decodeTransform = transform;
        }
      }

      jpegImage.parse(this.bytes);
      var data = jpegImage.getData(this.drawWidth, this.drawHeight,
                                   this.forceRGB);
      this.buffer = data;
      this.bufferLength = data.length;
      this.eof = true;
    } catch (e) {
      error('JPEG error: ' + e);
    }
  };

  JpegStream.prototype.getBytes = function JpegStream_getBytes(length) {
    this.ensureBuffer();
    return this.buffer;
  };

  JpegStream.prototype.getIR = function JpegStream_getIR(forceDataSchema) {
    return createObjectURL(this.bytes, 'image/jpeg', forceDataSchema);
  };

  return JpegStream;
})();

/**
 * For JPEG 2000's we use a library to decode these images and
 * the stream behaves like all the other DecodeStreams.
 */
var JpxStream = (function JpxStreamClosure() {
  function JpxStream(stream, maybeLength, dict) {
    this.stream = stream;
    this.maybeLength = maybeLength;
    this.dict = dict;

    DecodeStream.call(this, maybeLength);
  }

  JpxStream.prototype = Object.create(DecodeStream.prototype);

  Object.defineProperty(JpxStream.prototype, 'bytes', {
    get: function JpxStream_bytes() {
      // If this.maybeLength is null, we'll get the entire stream.
      return shadow(this, 'bytes', this.stream.getBytes(this.maybeLength));
    },
    configurable: true
  });

  JpxStream.prototype.ensureBuffer = function JpxStream_ensureBuffer(req) {
    if (this.bufferLength) {
      return;
    }

    var jpxImage = new JpxImage();
    jpxImage.parse(this.bytes);

    var width = jpxImage.width;
    var height = jpxImage.height;
    var componentsCount = jpxImage.componentsCount;
    var tileCount = jpxImage.tiles.length;
    if (tileCount === 1) {
      this.buffer = jpxImage.tiles[0].items;
    } else {
      var data = new Uint8Array(width * height * componentsCount);

      for (var k = 0; k < tileCount; k++) {
        var tileComponents = jpxImage.tiles[k];
        var tileWidth = tileComponents.width;
        var tileHeight = tileComponents.height;
        var tileLeft = tileComponents.left;
        var tileTop = tileComponents.top;

        var src = tileComponents.items;
        var srcPosition = 0;
        var dataPosition = (width * tileTop + tileLeft) * componentsCount;
        var imgRowSize = width * componentsCount;
        var tileRowSize = tileWidth * componentsCount;

        for (var j = 0; j < tileHeight; j++) {
          var rowBytes = src.subarray(srcPosition, srcPosition + tileRowSize);
          data.set(rowBytes, dataPosition);
          srcPosition += tileRowSize;
          dataPosition += imgRowSize;
        }
      }
      this.buffer = data;
    }
    this.bufferLength = this.buffer.length;
    this.eof = true;
  };

  return JpxStream;
})();

/**
 * For JBIG2's we use a library to decode these images and
 * the stream behaves like all the other DecodeStreams.
 */
var Jbig2Stream = (function Jbig2StreamClosure() {
  function Jbig2Stream(stream, maybeLength, dict) {
    this.stream = stream;
    this.maybeLength = maybeLength;
    this.dict = dict;

    DecodeStream.call(this, maybeLength);
  }

  Jbig2Stream.prototype = Object.create(DecodeStream.prototype);

  Object.defineProperty(Jbig2Stream.prototype, 'bytes', {
    get: function Jbig2Stream_bytes() {
      // If this.maybeLength is null, we'll get the entire stream.
      return shadow(this, 'bytes', this.stream.getBytes(this.maybeLength));
    },
    configurable: true
  });

  Jbig2Stream.prototype.ensureBuffer = function Jbig2Stream_ensureBuffer(req) {
    if (this.bufferLength) {
      return;
    }

    var jbig2Image = new Jbig2Image();

    var chunks = [];
    var decodeParams = this.dict.getArray('DecodeParms');

    // According to the PDF specification, DecodeParms can be either
    // a dictionary, or an array whose elements are dictionaries.
    if (isArray(decodeParams)) {
      if (decodeParams.length > 1) {
        warn('JBIG2 - \'DecodeParms\' array with multiple elements ' +
             'not supported.');
      }
      decodeParams = decodeParams[0];
    }
    if (decodeParams && decodeParams.has('JBIG2Globals')) {
      var globalsStream = decodeParams.get('JBIG2Globals');
      var globals = globalsStream.getBytes();
      chunks.push({data: globals, start: 0, end: globals.length});
    }
    chunks.push({data: this.bytes, start: 0, end: this.bytes.length});
    var data = jbig2Image.parseChunks(chunks);
    var dataLength = data.length;

    // JBIG2 had black as 1 and white as 0, inverting the colors
    for (var i = 0; i < dataLength; i++) {
      data[i] ^= 0xFF;
    }

    this.buffer = data;
    this.bufferLength = dataLength;
    this.eof = true;
  };

  return Jbig2Stream;
})();

var DecryptStream = (function DecryptStreamClosure() {
  function DecryptStream(str, maybeLength, decrypt) {
    this.str = str;
    this.dict = str.dict;
    this.decrypt = decrypt;
    this.nextChunk = null;
    this.initialized = false;

    DecodeStream.call(this, maybeLength);
  }

  var chunkSize = 512;

  DecryptStream.prototype = Object.create(DecodeStream.prototype);

  DecryptStream.prototype.readBlock = function DecryptStream_readBlock() {
    var chunk;
    if (this.initialized) {
      chunk = this.nextChunk;
    } else {
      chunk = this.str.getBytes(chunkSize);
      this.initialized = true;
    }
    if (!chunk || chunk.length === 0) {
      this.eof = true;
      return;
    }
    this.nextChunk = this.str.getBytes(chunkSize);
    var hasMoreData = this.nextChunk && this.nextChunk.length > 0;

    var decrypt = this.decrypt;
    chunk = decrypt(chunk, !hasMoreData);

    var bufferLength = this.bufferLength;
    var i, n = chunk.length;
    var buffer = this.ensureBuffer(bufferLength + n);
    for (i = 0; i < n; i++) {
      buffer[bufferLength++] = chunk[i];
    }
    this.bufferLength = bufferLength;
  };

  return DecryptStream;
})();

var Ascii85Stream = (function Ascii85StreamClosure() {
  function Ascii85Stream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;
    this.input = new Uint8Array(5);

    // Most streams increase in size when decoded, but Ascii85 streams
    // typically shrink by ~20%.
    if (maybeLength) {
      maybeLength = 0.8 * maybeLength;
    }
    DecodeStream.call(this, maybeLength);
  }

  Ascii85Stream.prototype = Object.create(DecodeStream.prototype);

  Ascii85Stream.prototype.readBlock = function Ascii85Stream_readBlock() {
    var TILDA_CHAR = 0x7E; // '~'
    var Z_LOWER_CHAR = 0x7A; // 'z'
    var EOF = -1;

    var str = this.str;

    var c = str.getByte();
    while (isSpace(c)) {
      c = str.getByte();
    }

    if (c === EOF || c === TILDA_CHAR) {
      this.eof = true;
      return;
    }

    var bufferLength = this.bufferLength, buffer;
    var i;

    // special code for z
    if (c === Z_LOWER_CHAR) {
      buffer = this.ensureBuffer(bufferLength + 4);
      for (i = 0; i < 4; ++i) {
        buffer[bufferLength + i] = 0;
      }
      this.bufferLength += 4;
    } else {
      var input = this.input;
      input[0] = c;
      for (i = 1; i < 5; ++i) {
        c = str.getByte();
        while (isSpace(c)) {
          c = str.getByte();
        }

        input[i] = c;

        if (c === EOF || c === TILDA_CHAR) {
          break;
        }
      }
      buffer = this.ensureBuffer(bufferLength + i - 1);
      this.bufferLength += i - 1;

      // partial ending;
      if (i < 5) {
        for (; i < 5; ++i) {
          input[i] = 0x21 + 84;
        }
        this.eof = true;
      }
      var t = 0;
      for (i = 0; i < 5; ++i) {
        t = t * 85 + (input[i] - 0x21);
      }

      for (i = 3; i >= 0; --i) {
        buffer[bufferLength + i] = t & 0xFF;
        t >>= 8;
      }
    }
  };

  return Ascii85Stream;
})();

var AsciiHexStream = (function AsciiHexStreamClosure() {
  function AsciiHexStream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;

    this.firstDigit = -1;

    // Most streams increase in size when decoded, but AsciiHex streams shrink
    // by 50%.
    if (maybeLength) {
      maybeLength = 0.5 * maybeLength;
    }
    DecodeStream.call(this, maybeLength);
  }

  AsciiHexStream.prototype = Object.create(DecodeStream.prototype);

  AsciiHexStream.prototype.readBlock = function AsciiHexStream_readBlock() {
    var UPSTREAM_BLOCK_SIZE = 8000;
    var bytes = this.str.getBytes(UPSTREAM_BLOCK_SIZE);
    if (!bytes.length) {
      this.eof = true;
      return;
    }

    var maxDecodeLength = (bytes.length + 1) >> 1;
    var buffer = this.ensureBuffer(this.bufferLength + maxDecodeLength);
    var bufferLength = this.bufferLength;

    var firstDigit = this.firstDigit;
    for (var i = 0, ii = bytes.length; i < ii; i++) {
      var ch = bytes[i], digit;
      if (ch >= 0x30 && ch <= 0x39) { // '0'-'9'
        digit = ch & 0x0F;
      } else if ((ch >= 0x41 && ch <= 0x46) || (ch >= 0x61 && ch <= 0x66)) {
        // 'A'-'Z', 'a'-'z'
        digit = (ch & 0x0F) + 9;
      } else if (ch === 0x3E) { // '>'
        this.eof = true;
        break;
      } else { // probably whitespace
        continue; // ignoring
      }
      if (firstDigit < 0) {
        firstDigit = digit;
      } else {
        buffer[bufferLength++] = (firstDigit << 4) | digit;
        firstDigit = -1;
      }
    }
    if (firstDigit >= 0 && this.eof) {
      // incomplete byte
      buffer[bufferLength++] = (firstDigit << 4);
      firstDigit = -1;
    }
    this.firstDigit = firstDigit;
    this.bufferLength = bufferLength;
  };

  return AsciiHexStream;
})();

var RunLengthStream = (function RunLengthStreamClosure() {
  function RunLengthStream(str, maybeLength) {
    this.str = str;
    this.dict = str.dict;

    DecodeStream.call(this, maybeLength);
  }

  RunLengthStream.prototype = Object.create(DecodeStream.prototype);

  RunLengthStream.prototype.readBlock = function RunLengthStream_readBlock() {
    // The repeatHeader has following format. The first byte defines type of run
    // and amount of bytes to repeat/copy: n = 0 through 127 - copy next n bytes
    // (in addition to the second byte from the header), n = 129 through 255 -
    // duplicate the second byte from the header (257 - n) times, n = 128 - end.
    var repeatHeader = this.str.getBytes(2);
    if (!repeatHeader || repeatHeader.length < 2 || repeatHeader[0] === 128) {
      this.eof = true;
      return;
    }

    var buffer;
    var bufferLength = this.bufferLength;
    var n = repeatHeader[0];
    if (n < 128) {
      // copy n bytes
      buffer = this.ensureBuffer(bufferLength + n + 1);
      buffer[bufferLength++] = repeatHeader[1];
      if (n > 0) {
        var source = this.str.getBytes(n);
        buffer.set(source, bufferLength);
        bufferLength += n;
      }
    } else {
      n = 257 - n;
      var b = repeatHeader[1];
      buffer = this.ensureBuffer(bufferLength + n + 1);
      for (var i = 0; i < n; i++) {
        buffer[bufferLength++] = b;
      }
    }
    this.bufferLength = bufferLength;
  };

  return RunLengthStream;
})();

var CCITTFaxStream = (function CCITTFaxStreamClosure() {

  var ccittEOL = -2;
  var ccittEOF = -1;
  var twoDimPass = 0;
  var twoDimHoriz = 1;
  var twoDimVert0 = 2;
  var twoDimVertR1 = 3;
  var twoDimVertL1 = 4;
  var twoDimVertR2 = 5;
  var twoDimVertL2 = 6;
  var twoDimVertR3 = 7;
  var twoDimVertL3 = 8;

  var twoDimTable = [
    [-1, -1], [-1, -1],                   // 000000x
    [7, twoDimVertL3],                    // 0000010
    [7, twoDimVertR3],                    // 0000011
    [6, twoDimVertL2], [6, twoDimVertL2], // 000010x
    [6, twoDimVertR2], [6, twoDimVertR2], // 000011x
    [4, twoDimPass], [4, twoDimPass],     // 0001xxx
    [4, twoDimPass], [4, twoDimPass],
    [4, twoDimPass], [4, twoDimPass],
    [4, twoDimPass], [4, twoDimPass],
    [3, twoDimHoriz], [3, twoDimHoriz],   // 001xxxx
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimHoriz], [3, twoDimHoriz],
    [3, twoDimVertL1], [3, twoDimVertL1], // 010xxxx
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertL1], [3, twoDimVertL1],
    [3, twoDimVertR1], [3, twoDimVertR1], // 011xxxx
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [3, twoDimVertR1], [3, twoDimVertR1],
    [1, twoDimVert0], [1, twoDimVert0],   // 1xxxxxx
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0],
    [1, twoDimVert0], [1, twoDimVert0]
  ];

  var whiteTable1 = [
    [-1, -1],                               // 00000
    [12, ccittEOL],                         // 00001
    [-1, -1], [-1, -1],                     // 0001x
    [-1, -1], [-1, -1], [-1, -1], [-1, -1], // 001xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1], // 010xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1], // 011xx
    [11, 1792], [11, 1792],                 // 1000x
    [12, 1984],                             // 10010
    [12, 2048],                             // 10011
    [12, 2112],                             // 10100
    [12, 2176],                             // 10101
    [12, 2240],                             // 10110
    [12, 2304],                             // 10111
    [11, 1856], [11, 1856],                 // 1100x
    [11, 1920], [11, 1920],                 // 1101x
    [12, 2368],                             // 11100
    [12, 2432],                             // 11101
    [12, 2496],                             // 11110
    [12, 2560]                              // 11111
  ];

  var whiteTable2 = [
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],     // 0000000xx
    [8, 29], [8, 29],                           // 00000010x
    [8, 30], [8, 30],                           // 00000011x
    [8, 45], [8, 45],                           // 00000100x
    [8, 46], [8, 46],                           // 00000101x
    [7, 22], [7, 22], [7, 22], [7, 22],         // 0000011xx
    [7, 23], [7, 23], [7, 23], [7, 23],         // 0000100xx
    [8, 47], [8, 47],                           // 00001010x
    [8, 48], [8, 48],                           // 00001011x
    [6, 13], [6, 13], [6, 13], [6, 13],         // 000011xxx
    [6, 13], [6, 13], [6, 13], [6, 13],
    [7, 20], [7, 20], [7, 20], [7, 20],         // 0001000xx
    [8, 33], [8, 33],                           // 00010010x
    [8, 34], [8, 34],                           // 00010011x
    [8, 35], [8, 35],                           // 00010100x
    [8, 36], [8, 36],                           // 00010101x
    [8, 37], [8, 37],                           // 00010110x
    [8, 38], [8, 38],                           // 00010111x
    [7, 19], [7, 19], [7, 19], [7, 19],         // 0001100xx
    [8, 31], [8, 31],                           // 00011010x
    [8, 32], [8, 32],                           // 00011011x
    [6, 1], [6, 1], [6, 1], [6, 1],             // 000111xxx
    [6, 1], [6, 1], [6, 1], [6, 1],
    [6, 12], [6, 12], [6, 12], [6, 12],         // 001000xxx
    [6, 12], [6, 12], [6, 12], [6, 12],
    [8, 53], [8, 53],                           // 00100100x
    [8, 54], [8, 54],                           // 00100101x
    [7, 26], [7, 26], [7, 26], [7, 26],         // 0010011xx
    [8, 39], [8, 39],                           // 00101000x
    [8, 40], [8, 40],                           // 00101001x
    [8, 41], [8, 41],                           // 00101010x
    [8, 42], [8, 42],                           // 00101011x
    [8, 43], [8, 43],                           // 00101100x
    [8, 44], [8, 44],                           // 00101101x
    [7, 21], [7, 21], [7, 21], [7, 21],         // 0010111xx
    [7, 28], [7, 28], [7, 28], [7, 28],         // 0011000xx
    [8, 61], [8, 61],                           // 00110010x
    [8, 62], [8, 62],                           // 00110011x
    [8, 63], [8, 63],                           // 00110100x
    [8, 0], [8, 0],                             // 00110101x
    [8, 320], [8, 320],                         // 00110110x
    [8, 384], [8, 384],                         // 00110111x
    [5, 10], [5, 10], [5, 10], [5, 10],         // 00111xxxx
    [5, 10], [5, 10], [5, 10], [5, 10],
    [5, 10], [5, 10], [5, 10], [5, 10],
    [5, 10], [5, 10], [5, 10], [5, 10],
    [5, 11], [5, 11], [5, 11], [5, 11],         // 01000xxxx
    [5, 11], [5, 11], [5, 11], [5, 11],
    [5, 11], [5, 11], [5, 11], [5, 11],
    [5, 11], [5, 11], [5, 11], [5, 11],
    [7, 27], [7, 27], [7, 27], [7, 27],         // 0100100xx
    [8, 59], [8, 59],                           // 01001010x
    [8, 60], [8, 60],                           // 01001011x
    [9, 1472],                                  // 010011000
    [9, 1536],                                  // 010011001
    [9, 1600],                                  // 010011010
    [9, 1728],                                  // 010011011
    [7, 18], [7, 18], [7, 18], [7, 18],         // 0100111xx
    [7, 24], [7, 24], [7, 24], [7, 24],         // 0101000xx
    [8, 49], [8, 49],                           // 01010010x
    [8, 50], [8, 50],                           // 01010011x
    [8, 51], [8, 51],                           // 01010100x
    [8, 52], [8, 52],                           // 01010101x
    [7, 25], [7, 25], [7, 25], [7, 25],         // 0101011xx
    [8, 55], [8, 55],                           // 01011000x
    [8, 56], [8, 56],                           // 01011001x
    [8, 57], [8, 57],                           // 01011010x
    [8, 58], [8, 58],                           // 01011011x
    [6, 192], [6, 192], [6, 192], [6, 192],     // 010111xxx
    [6, 192], [6, 192], [6, 192], [6, 192],
    [6, 1664], [6, 1664], [6, 1664], [6, 1664], // 011000xxx
    [6, 1664], [6, 1664], [6, 1664], [6, 1664],
    [8, 448], [8, 448],                         // 01100100x
    [8, 512], [8, 512],                         // 01100101x
    [9, 704],                                   // 011001100
    [9, 768],                                   // 011001101
    [8, 640], [8, 640],                         // 01100111x
    [8, 576], [8, 576],                         // 01101000x
    [9, 832],                                   // 011010010
    [9, 896],                                   // 011010011
    [9, 960],                                   // 011010100
    [9, 1024],                                  // 011010101
    [9, 1088],                                  // 011010110
    [9, 1152],                                  // 011010111
    [9, 1216],                                  // 011011000
    [9, 1280],                                  // 011011001
    [9, 1344],                                  // 011011010
    [9, 1408],                                  // 011011011
    [7, 256], [7, 256], [7, 256], [7, 256],     // 0110111xx
    [4, 2], [4, 2], [4, 2], [4, 2],             // 0111xxxxx
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 2], [4, 2], [4, 2], [4, 2],
    [4, 3], [4, 3], [4, 3], [4, 3],             // 1000xxxxx
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [4, 3], [4, 3], [4, 3], [4, 3],
    [5, 128], [5, 128], [5, 128], [5, 128],     // 10010xxxx
    [5, 128], [5, 128], [5, 128], [5, 128],
    [5, 128], [5, 128], [5, 128], [5, 128],
    [5, 128], [5, 128], [5, 128], [5, 128],
    [5, 8], [5, 8], [5, 8], [5, 8],             // 10011xxxx
    [5, 8], [5, 8], [5, 8], [5, 8],
    [5, 8], [5, 8], [5, 8], [5, 8],
    [5, 8], [5, 8], [5, 8], [5, 8],
    [5, 9], [5, 9], [5, 9], [5, 9],             // 10100xxxx
    [5, 9], [5, 9], [5, 9], [5, 9],
    [5, 9], [5, 9], [5, 9], [5, 9],
    [5, 9], [5, 9], [5, 9], [5, 9],
    [6, 16], [6, 16], [6, 16], [6, 16],         // 101010xxx
    [6, 16], [6, 16], [6, 16], [6, 16],
    [6, 17], [6, 17], [6, 17], [6, 17],         // 101011xxx
    [6, 17], [6, 17], [6, 17], [6, 17],
    [4, 4], [4, 4], [4, 4], [4, 4],             // 1011xxxxx
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 4], [4, 4], [4, 4], [4, 4],
    [4, 5], [4, 5], [4, 5], [4, 5],             // 1100xxxxx
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [4, 5], [4, 5], [4, 5], [4, 5],
    [6, 14], [6, 14], [6, 14], [6, 14],         // 110100xxx
    [6, 14], [6, 14], [6, 14], [6, 14],
    [6, 15], [6, 15], [6, 15], [6, 15],         // 110101xxx
    [6, 15], [6, 15], [6, 15], [6, 15],
    [5, 64], [5, 64], [5, 64], [5, 64],         // 11011xxxx
    [5, 64], [5, 64], [5, 64], [5, 64],
    [5, 64], [5, 64], [5, 64], [5, 64],
    [5, 64], [5, 64], [5, 64], [5, 64],
    [4, 6], [4, 6], [4, 6], [4, 6],             // 1110xxxxx
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 6], [4, 6], [4, 6], [4, 6],
    [4, 7], [4, 7], [4, 7], [4, 7],             // 1111xxxxx
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7],
    [4, 7], [4, 7], [4, 7], [4, 7]
  ];

  var blackTable1 = [
    [-1, -1], [-1, -1],                             // 000000000000x
    [12, ccittEOL], [12, ccittEOL],                 // 000000000001x
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000001xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000010xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000011xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000100xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000101xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000110xx
    [-1, -1], [-1, -1], [-1, -1], [-1, -1],         // 00000000111xx
    [11, 1792], [11, 1792], [11, 1792], [11, 1792], // 00000001000xx
    [12, 1984], [12, 1984],                         // 000000010010x
    [12, 2048], [12, 2048],                         // 000000010011x
    [12, 2112], [12, 2112],                         // 000000010100x
    [12, 2176], [12, 2176],                         // 000000010101x
    [12, 2240], [12, 2240],                         // 000000010110x
    [12, 2304], [12, 2304],                         // 000000010111x
    [11, 1856], [11, 1856], [11, 1856], [11, 1856], // 00000001100xx
    [11, 1920], [11, 1920], [11, 1920], [11, 1920], // 00000001101xx
    [12, 2368], [12, 2368],                         // 000000011100x
    [12, 2432], [12, 2432],                         // 000000011101x
    [12, 2496], [12, 2496],                         // 000000011110x
    [12, 2560], [12, 2560],                         // 000000011111x
    [10, 18], [10, 18], [10, 18], [10, 18],         // 0000001000xxx
    [10, 18], [10, 18], [10, 18], [10, 18],
    [12, 52], [12, 52],                             // 000000100100x
    [13, 640],                                      // 0000001001010
    [13, 704],                                      // 0000001001011
    [13, 768],                                      // 0000001001100
    [13, 832],                                      // 0000001001101
    [12, 55], [12, 55],                             // 000000100111x
    [12, 56], [12, 56],                             // 000000101000x
    [13, 1280],                                     // 0000001010010
    [13, 1344],                                     // 0000001010011
    [13, 1408],                                     // 0000001010100
    [13, 1472],                                     // 0000001010101
    [12, 59], [12, 59],                             // 000000101011x
    [12, 60], [12, 60],                             // 000000101100x
    [13, 1536],                                     // 0000001011010
    [13, 1600],                                     // 0000001011011
    [11, 24], [11, 24], [11, 24], [11, 24],         // 00000010111xx
    [11, 25], [11, 25], [11, 25], [11, 25],         // 00000011000xx
    [13, 1664],                                     // 0000001100100
    [13, 1728],                                     // 0000001100101
    [12, 320], [12, 320],                           // 000000110011x
    [12, 384], [12, 384],                           // 000000110100x
    [12, 448], [12, 448],                           // 000000110101x
    [13, 512],                                      // 0000001101100
    [13, 576],                                      // 0000001101101
    [12, 53], [12, 53],                             // 000000110111x
    [12, 54], [12, 54],                             // 000000111000x
    [13, 896],                                      // 0000001110010
    [13, 960],                                      // 0000001110011
    [13, 1024],                                     // 0000001110100
    [13, 1088],                                     // 0000001110101
    [13, 1152],                                     // 0000001110110
    [13, 1216],                                     // 0000001110111
    [10, 64], [10, 64], [10, 64], [10, 64],         // 0000001111xxx
    [10, 64], [10, 64], [10, 64], [10, 64]
  ];

  var blackTable2 = [
    [8, 13], [8, 13], [8, 13], [8, 13],     // 00000100xxxx
    [8, 13], [8, 13], [8, 13], [8, 13],
    [8, 13], [8, 13], [8, 13], [8, 13],
    [8, 13], [8, 13], [8, 13], [8, 13],
    [11, 23], [11, 23],                     // 00000101000x
    [12, 50],                               // 000001010010
    [12, 51],                               // 000001010011
    [12, 44],                               // 000001010100
    [12, 45],                               // 000001010101
    [12, 46],                               // 000001010110
    [12, 47],                               // 000001010111
    [12, 57],                               // 000001011000
    [12, 58],                               // 000001011001
    [12, 61],                               // 000001011010
    [12, 256],                              // 000001011011
    [10, 16], [10, 16], [10, 16], [10, 16], // 0000010111xx
    [10, 17], [10, 17], [10, 17], [10, 17], // 0000011000xx
    [12, 48],                               // 000001100100
    [12, 49],                               // 000001100101
    [12, 62],                               // 000001100110
    [12, 63],                               // 000001100111
    [12, 30],                               // 000001101000
    [12, 31],                               // 000001101001
    [12, 32],                               // 000001101010
    [12, 33],                               // 000001101011
    [12, 40],                               // 000001101100
    [12, 41],                               // 000001101101
    [11, 22], [11, 22],                     // 00000110111x
    [8, 14], [8, 14], [8, 14], [8, 14],     // 00000111xxxx
    [8, 14], [8, 14], [8, 14], [8, 14],
    [8, 14], [8, 14], [8, 14], [8, 14],
    [8, 14], [8, 14], [8, 14], [8, 14],
    [7, 10], [7, 10], [7, 10], [7, 10],     // 0000100xxxxx
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 10], [7, 10], [7, 10], [7, 10],
    [7, 11], [7, 11], [7, 11], [7, 11],     // 0000101xxxxx
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [7, 11], [7, 11], [7, 11], [7, 11],
    [9, 15], [9, 15], [9, 15], [9, 15],     // 000011000xxx
    [9, 15], [9, 15], [9, 15], [9, 15],
    [12, 128],                              // 000011001000
    [12, 192],                              // 000011001001
    [12, 26],                               // 000011001010
    [12, 27],                               // 000011001011
    [12, 28],                               // 000011001100
    [12, 29],                               // 000011001101
    [11, 19], [11, 19],                     // 00001100111x
    [11, 20], [11, 20],                     // 00001101000x
    [12, 34],                               // 000011010010
    [12, 35],                               // 000011010011
    [12, 36],                               // 000011010100
    [12, 37],                               // 000011010101
    [12, 38],                               // 000011010110
    [12, 39],                               // 000011010111
    [11, 21], [11, 21],                     // 00001101100x
    [12, 42],                               // 000011011010
    [12, 43],                               // 000011011011
    [10, 0], [10, 0], [10, 0], [10, 0],     // 0000110111xx
    [7, 12], [7, 12], [7, 12], [7, 12],     // 0000111xxxxx
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12],
    [7, 12], [7, 12], [7, 12], [7, 12]
  ];

  var blackTable3 = [
    [-1, -1], [-1, -1], [-1, -1], [-1, -1], // 0000xx
    [6, 9],                                 // 000100
    [6, 8],                                 // 000101
    [5, 7], [5, 7],                         // 00011x
    [4, 6], [4, 6], [4, 6], [4, 6],         // 0010xx
    [4, 5], [4, 5], [4, 5], [4, 5],         // 0011xx
    [3, 1], [3, 1], [3, 1], [3, 1],         // 010xxx
    [3, 1], [3, 1], [3, 1], [3, 1],
    [3, 4], [3, 4], [3, 4], [3, 4],         // 011xxx
    [3, 4], [3, 4], [3, 4], [3, 4],
    [2, 3], [2, 3], [2, 3], [2, 3],         // 10xxxx
    [2, 3], [2, 3], [2, 3], [2, 3],
    [2, 3], [2, 3], [2, 3], [2, 3],
    [2, 3], [2, 3], [2, 3], [2, 3],
    [2, 2], [2, 2], [2, 2], [2, 2],         // 11xxxx
    [2, 2], [2, 2], [2, 2], [2, 2],
    [2, 2], [2, 2], [2, 2], [2, 2],
    [2, 2], [2, 2], [2, 2], [2, 2]
  ];

  function CCITTFaxStream(str, maybeLength, params) {
    this.str = str;
    this.dict = str.dict;

    params = params || Dict.empty;

    this.encoding = params.get('K') || 0;
    this.eoline = params.get('EndOfLine') || false;
    this.byteAlign = params.get('EncodedByteAlign') || false;
    this.columns = params.get('Columns') || 1728;
    this.rows = params.get('Rows') || 0;
    var eoblock = params.get('EndOfBlock');
    if (eoblock === null || eoblock === undefined) {
      eoblock = true;
    }
    this.eoblock = eoblock;
    this.black = params.get('BlackIs1') || false;

    this.codingLine = new Uint32Array(this.columns + 1);
    this.refLine = new Uint32Array(this.columns + 2);

    this.codingLine[0] = this.columns;
    this.codingPos = 0;

    this.row = 0;
    this.nextLine2D = this.encoding < 0;
    this.inputBits = 0;
    this.inputBuf = 0;
    this.outputBits = 0;

    var code1;
    while ((code1 = this.lookBits(12)) === 0) {
      this.eatBits(1);
    }
    if (code1 === 1) {
      this.eatBits(12);
    }
    if (this.encoding > 0) {
      this.nextLine2D = !this.lookBits(1);
      this.eatBits(1);
    }

    DecodeStream.call(this, maybeLength);
  }

  CCITTFaxStream.prototype = Object.create(DecodeStream.prototype);

  CCITTFaxStream.prototype.readBlock = function CCITTFaxStream_readBlock() {
    while (!this.eof) {
      var c = this.lookChar();
      this.ensureBuffer(this.bufferLength + 1);
      this.buffer[this.bufferLength++] = c;
    }
  };

  CCITTFaxStream.prototype.addPixels =
      function ccittFaxStreamAddPixels(a1, blackPixels) {
    var codingLine = this.codingLine;
    var codingPos = this.codingPos;

    if (a1 > codingLine[codingPos]) {
      if (a1 > this.columns) {
        info('row is wrong length');
        this.err = true;
        a1 = this.columns;
      }
      if ((codingPos & 1) ^ blackPixels) {
        ++codingPos;
      }

      codingLine[codingPos] = a1;
    }
    this.codingPos = codingPos;
  };

  CCITTFaxStream.prototype.addPixelsNeg =
      function ccittFaxStreamAddPixelsNeg(a1, blackPixels) {
    var codingLine = this.codingLine;
    var codingPos = this.codingPos;

    if (a1 > codingLine[codingPos]) {
      if (a1 > this.columns) {
        info('row is wrong length');
        this.err = true;
        a1 = this.columns;
      }
      if ((codingPos & 1) ^ blackPixels) {
        ++codingPos;
      }

      codingLine[codingPos] = a1;
    } else if (a1 < codingLine[codingPos]) {
      if (a1 < 0) {
        info('invalid code');
        this.err = true;
        a1 = 0;
      }
      while (codingPos > 0 && a1 < codingLine[codingPos - 1]) {
        --codingPos;
      }
      codingLine[codingPos] = a1;
    }

    this.codingPos = codingPos;
  };

  CCITTFaxStream.prototype.lookChar = function CCITTFaxStream_lookChar() {
    var refLine = this.refLine;
    var codingLine = this.codingLine;
    var columns = this.columns;

    var refPos, blackPixels, bits, i;

    if (this.outputBits === 0) {
      if (this.eof) {
        return null;
      }
      this.err = false;

      var code1, code2, code3;
      if (this.nextLine2D) {
        for (i = 0; codingLine[i] < columns; ++i) {
          refLine[i] = codingLine[i];
        }
        refLine[i++] = columns;
        refLine[i] = columns;
        codingLine[0] = 0;
        this.codingPos = 0;
        refPos = 0;
        blackPixels = 0;

        while (codingLine[this.codingPos] < columns) {
          code1 = this.getTwoDimCode();
          switch (code1) {
            case twoDimPass:
              this.addPixels(refLine[refPos + 1], blackPixels);
              if (refLine[refPos + 1] < columns) {
                refPos += 2;
              }
              break;
            case twoDimHoriz:
              code1 = code2 = 0;
              if (blackPixels) {
                do {
                  code1 += (code3 = this.getBlackCode());
                } while (code3 >= 64);
                do {
                  code2 += (code3 = this.getWhiteCode());
                } while (code3 >= 64);
              } else {
                do {
                  code1 += (code3 = this.getWhiteCode());
                } while (code3 >= 64);
                do {
                  code2 += (code3 = this.getBlackCode());
                } while (code3 >= 64);
              }
              this.addPixels(codingLine[this.codingPos] +
                             code1, blackPixels);
              if (codingLine[this.codingPos] < columns) {
                this.addPixels(codingLine[this.codingPos] + code2,
                               blackPixels ^ 1);
              }
              while (refLine[refPos] <= codingLine[this.codingPos] &&
                     refLine[refPos] < columns) {
                refPos += 2;
              }
              break;
            case twoDimVertR3:
              this.addPixels(refLine[refPos] + 3, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                ++refPos;
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVertR2:
              this.addPixels(refLine[refPos] + 2, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                ++refPos;
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVertR1:
              this.addPixels(refLine[refPos] + 1, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                ++refPos;
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVert0:
              this.addPixels(refLine[refPos], blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                ++refPos;
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVertL3:
              this.addPixelsNeg(refLine[refPos] - 3, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                if (refPos > 0) {
                  --refPos;
                } else {
                  ++refPos;
                }
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVertL2:
              this.addPixelsNeg(refLine[refPos] - 2, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                if (refPos > 0) {
                  --refPos;
                } else {
                  ++refPos;
                }
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case twoDimVertL1:
              this.addPixelsNeg(refLine[refPos] - 1, blackPixels);
              blackPixels ^= 1;
              if (codingLine[this.codingPos] < columns) {
                if (refPos > 0) {
                  --refPos;
                } else {
                  ++refPos;
                }
                while (refLine[refPos] <= codingLine[this.codingPos] &&
                       refLine[refPos] < columns) {
                  refPos += 2;
                }
              }
              break;
            case ccittEOF:
              this.addPixels(columns, 0);
              this.eof = true;
              break;
            default:
              info('bad 2d code');
              this.addPixels(columns, 0);
              this.err = true;
          }
        }
      } else {
        codingLine[0] = 0;
        this.codingPos = 0;
        blackPixels = 0;
        while (codingLine[this.codingPos] < columns) {
          code1 = 0;
          if (blackPixels) {
            do {
              code1 += (code3 = this.getBlackCode());
            } while (code3 >= 64);
          } else {
            do {
              code1 += (code3 = this.getWhiteCode());
            } while (code3 >= 64);
          }
          this.addPixels(codingLine[this.codingPos] + code1, blackPixels);
          blackPixels ^= 1;
        }
      }

      var gotEOL = false;

      if (this.byteAlign) {
        this.inputBits &= ~7;
      }

      if (!this.eoblock && this.row === this.rows - 1) {
        this.eof = true;
      } else {
        code1 = this.lookBits(12);
        if (this.eoline) {
          while (code1 !== ccittEOF && code1 !== 1) {
            this.eatBits(1);
            code1 = this.lookBits(12);
          }
        } else {
          while (code1 === 0) {
            this.eatBits(1);
            code1 = this.lookBits(12);
          }
        }
        if (code1 === 1) {
          this.eatBits(12);
          gotEOL = true;
        } else if (code1 === ccittEOF) {
          this.eof = true;
        }
      }

      if (!this.eof && this.encoding > 0) {
        this.nextLine2D = !this.lookBits(1);
        this.eatBits(1);
      }

      if (this.eoblock && gotEOL && this.byteAlign) {
        code1 = this.lookBits(12);
        if (code1 === 1) {
          this.eatBits(12);
          if (this.encoding > 0) {
            this.lookBits(1);
            this.eatBits(1);
          }
          if (this.encoding >= 0) {
            for (i = 0; i < 4; ++i) {
              code1 = this.lookBits(12);
              if (code1 !== 1) {
                info('bad rtc code: ' + code1);
              }
              this.eatBits(12);
              if (this.encoding > 0) {
                this.lookBits(1);
                this.eatBits(1);
              }
            }
          }
          this.eof = true;
        }
      } else if (this.err && this.eoline) {
        while (true) {
          code1 = this.lookBits(13);
          if (code1 === ccittEOF) {
            this.eof = true;
            return null;
          }
          if ((code1 >> 1) === 1) {
            break;
          }
          this.eatBits(1);
        }
        this.eatBits(12);
        if (this.encoding > 0) {
          this.eatBits(1);
          this.nextLine2D = !(code1 & 1);
        }
      }

      if (codingLine[0] > 0) {
        this.outputBits = codingLine[this.codingPos = 0];
      } else {
        this.outputBits = codingLine[this.codingPos = 1];
      }
      this.row++;
    }

    var c;
    if (this.outputBits >= 8) {
      c = (this.codingPos & 1) ? 0 : 0xFF;
      this.outputBits -= 8;
      if (this.outputBits === 0 && codingLine[this.codingPos] < columns) {
        this.codingPos++;
        this.outputBits = (codingLine[this.codingPos] -
                           codingLine[this.codingPos - 1]);
      }
    } else {
      bits = 8;
      c = 0;
      do {
        if (this.outputBits > bits) {
          c <<= bits;
          if (!(this.codingPos & 1)) {
            c |= 0xFF >> (8 - bits);
          }
          this.outputBits -= bits;
          bits = 0;
        } else {
          c <<= this.outputBits;
          if (!(this.codingPos & 1)) {
            c |= 0xFF >> (8 - this.outputBits);
          }
          bits -= this.outputBits;
          this.outputBits = 0;
          if (codingLine[this.codingPos] < columns) {
            this.codingPos++;
            this.outputBits = (codingLine[this.codingPos] -
                               codingLine[this.codingPos - 1]);
          } else if (bits > 0) {
            c <<= bits;
            bits = 0;
          }
        }
      } while (bits);
    }
    if (this.black) {
      c ^= 0xFF;
    }
    return c;
  };

  // This functions returns the code found from the table.
  // The start and end parameters set the boundaries for searching the table.
  // The limit parameter is optional. Function returns an array with three
  // values. The first array element indicates whether a valid code is being
  // returned. The second array element is the actual code. The third array
  // element indicates whether EOF was reached.
  CCITTFaxStream.prototype.findTableCode =
      function ccittFaxStreamFindTableCode(start, end, table, limit) {

    var limitValue = limit || 0;
    for (var i = start; i <= end; ++i) {
      var code = this.lookBits(i);
      if (code === ccittEOF) {
        return [true, 1, false];
      }
      if (i < end) {
        code <<= end - i;
      }
      if (!limitValue || code >= limitValue) {
        var p = table[code - limitValue];
        if (p[0] === i) {
          this.eatBits(i);
          return [true, p[1], true];
        }
      }
    }
    return [false, 0, false];
  };

  CCITTFaxStream.prototype.getTwoDimCode =
      function ccittFaxStreamGetTwoDimCode() {

    var code = 0;
    var p;
    if (this.eoblock) {
      code = this.lookBits(7);
      p = twoDimTable[code];
      if (p && p[0] > 0) {
        this.eatBits(p[0]);
        return p[1];
      }
    } else {
      var result = this.findTableCode(1, 7, twoDimTable);
      if (result[0] && result[2]) {
        return result[1];
      }
    }
    info('Bad two dim code');
    return ccittEOF;
  };

  CCITTFaxStream.prototype.getWhiteCode =
      function ccittFaxStreamGetWhiteCode() {

    var code = 0;
    var p;
    if (this.eoblock) {
      code = this.lookBits(12);
      if (code === ccittEOF) {
        return 1;
      }

      if ((code >> 5) === 0) {
        p = whiteTable1[code];
      } else {
        p = whiteTable2[code >> 3];
      }

      if (p[0] > 0) {
        this.eatBits(p[0]);
        return p[1];
      }
    } else {
      var result = this.findTableCode(1, 9, whiteTable2);
      if (result[0]) {
        return result[1];
      }

      result = this.findTableCode(11, 12, whiteTable1);
      if (result[0]) {
        return result[1];
      }
    }
    info('bad white code');
    this.eatBits(1);
    return 1;
  };

  CCITTFaxStream.prototype.getBlackCode =
      function ccittFaxStreamGetBlackCode() {

    var code, p;
    if (this.eoblock) {
      code = this.lookBits(13);
      if (code === ccittEOF) {
        return 1;
      }
      if ((code >> 7) === 0) {
        p = blackTable1[code];
      } else if ((code >> 9) === 0 && (code >> 7) !== 0) {
        p = blackTable2[(code >> 1) - 64];
      } else {
        p = blackTable3[code >> 7];
      }

      if (p[0] > 0) {
        this.eatBits(p[0]);
        return p[1];
      }
    } else {
      var result = this.findTableCode(2, 6, blackTable3);
      if (result[0]) {
        return result[1];
      }

      result = this.findTableCode(7, 12, blackTable2, 64);
      if (result[0]) {
        return result[1];
      }

      result = this.findTableCode(10, 13, blackTable1);
      if (result[0]) {
        return result[1];
      }
    }
    info('bad black code');
    this.eatBits(1);
    return 1;
  };

  CCITTFaxStream.prototype.lookBits = function CCITTFaxStream_lookBits(n) {
    var c;
    while (this.inputBits < n) {
      if ((c = this.str.getByte()) === -1) {
        if (this.inputBits === 0) {
          return ccittEOF;
        }
        return ((this.inputBuf << (n - this.inputBits)) &
                (0xFFFF >> (16 - n)));
      }
      this.inputBuf = (this.inputBuf << 8) | c;
      this.inputBits += 8;
    }
    return (this.inputBuf >> (this.inputBits - n)) & (0xFFFF >> (16 - n));
  };

  CCITTFaxStream.prototype.eatBits = function CCITTFaxStream_eatBits(n) {
    if ((this.inputBits -= n) < 0) {
      this.inputBits = 0;
    }
  };

  return CCITTFaxStream;
})();

var LZWStream = (function LZWStreamClosure() {
  function LZWStream(str, maybeLength, earlyChange) {
    this.str = str;
    this.dict = str.dict;
    this.cachedData = 0;
    this.bitsCached = 0;

    var maxLzwDictionarySize = 4096;
    var lzwState = {
      earlyChange: earlyChange,
      codeLength: 9,
      nextCode: 258,
      dictionaryValues: new Uint8Array(maxLzwDictionarySize),
      dictionaryLengths: new Uint16Array(maxLzwDictionarySize),
      dictionaryPrevCodes: new Uint16Array(maxLzwDictionarySize),
      currentSequence: new Uint8Array(maxLzwDictionarySize),
      currentSequenceLength: 0
    };
    for (var i = 0; i < 256; ++i) {
      lzwState.dictionaryValues[i] = i;
      lzwState.dictionaryLengths[i] = 1;
    }
    this.lzwState = lzwState;

    DecodeStream.call(this, maybeLength);
  }

  LZWStream.prototype = Object.create(DecodeStream.prototype);

  LZWStream.prototype.readBits = function LZWStream_readBits(n) {
    var bitsCached = this.bitsCached;
    var cachedData = this.cachedData;
    while (bitsCached < n) {
      var c = this.str.getByte();
      if (c === -1) {
        this.eof = true;
        return null;
      }
      cachedData = (cachedData << 8) | c;
      bitsCached += 8;
    }
    this.bitsCached = (bitsCached -= n);
    this.cachedData = cachedData;
    this.lastCode = null;
    return (cachedData >>> bitsCached) & ((1 << n) - 1);
  };

  LZWStream.prototype.readBlock = function LZWStream_readBlock() {
    var blockSize = 512;
    var estimatedDecodedSize = blockSize * 2, decodedSizeDelta = blockSize;
    var i, j, q;

    var lzwState = this.lzwState;
    if (!lzwState) {
      return; // eof was found
    }

    var earlyChange = lzwState.earlyChange;
    var nextCode = lzwState.nextCode;
    var dictionaryValues = lzwState.dictionaryValues;
    var dictionaryLengths = lzwState.dictionaryLengths;
    var dictionaryPrevCodes = lzwState.dictionaryPrevCodes;
    var codeLength = lzwState.codeLength;
    var prevCode = lzwState.prevCode;
    var currentSequence = lzwState.currentSequence;
    var currentSequenceLength = lzwState.currentSequenceLength;

    var decodedLength = 0;
    var currentBufferLength = this.bufferLength;
    var buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);

    for (i = 0; i < blockSize; i++) {
      var code = this.readBits(codeLength);
      var hasPrev = currentSequenceLength > 0;
      if (code < 256) {
        currentSequence[0] = code;
        currentSequenceLength = 1;
      } else if (code >= 258) {
        if (code < nextCode) {
          currentSequenceLength = dictionaryLengths[code];
          for (j = currentSequenceLength - 1, q = code; j >= 0; j--) {
            currentSequence[j] = dictionaryValues[q];
            q = dictionaryPrevCodes[q];
          }
        } else {
          currentSequence[currentSequenceLength++] = currentSequence[0];
        }
      } else if (code === 256) {
        codeLength = 9;
        nextCode = 258;
        currentSequenceLength = 0;
        continue;
      } else {
        this.eof = true;
        delete this.lzwState;
        break;
      }

      if (hasPrev) {
        dictionaryPrevCodes[nextCode] = prevCode;
        dictionaryLengths[nextCode] = dictionaryLengths[prevCode] + 1;
        dictionaryValues[nextCode] = currentSequence[0];
        nextCode++;
        codeLength = (nextCode + earlyChange) & (nextCode + earlyChange - 1) ?
          codeLength : Math.min(Math.log(nextCode + earlyChange) /
          0.6931471805599453 + 1, 12) | 0;
      }
      prevCode = code;

      decodedLength += currentSequenceLength;
      if (estimatedDecodedSize < decodedLength) {
        do {
          estimatedDecodedSize += decodedSizeDelta;
        } while (estimatedDecodedSize < decodedLength);
        buffer = this.ensureBuffer(this.bufferLength + estimatedDecodedSize);
      }
      for (j = 0; j < currentSequenceLength; j++) {
        buffer[currentBufferLength++] = currentSequence[j];
      }
    }
    lzwState.nextCode = nextCode;
    lzwState.codeLength = codeLength;
    lzwState.prevCode = prevCode;
    lzwState.currentSequenceLength = currentSequenceLength;

    this.bufferLength = currentBufferLength;
  };

  return LZWStream;
})();

var NullStream = (function NullStreamClosure() {
  function NullStream() {
    Stream.call(this, new Uint8Array(0));
  }

  NullStream.prototype = Stream.prototype;

  return NullStream;
})();

exports.Ascii85Stream = Ascii85Stream;
exports.AsciiHexStream = AsciiHexStream;
exports.CCITTFaxStream = CCITTFaxStream;
exports.DecryptStream = DecryptStream;
exports.DecodeStream = DecodeStream;
exports.FlateStream = FlateStream;
exports.Jbig2Stream = Jbig2Stream;
exports.JpegStream = JpegStream;
exports.JpxStream = JpxStream;
exports.NullStream = NullStream;
exports.PredictorStream = PredictorStream;
exports.RunLengthStream = RunLengthStream;
exports.Stream = Stream;
exports.StreamsSequenceStream = StreamsSequenceStream;
exports.StringStream = StringStream;
exports.LZWStream = LZWStream;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreCrypto = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCoreStream);
  }
}(this, function (exports, sharedUtil, corePrimitives, coreStream) {

var PasswordException = sharedUtil.PasswordException;
var PasswordResponses = sharedUtil.PasswordResponses;
var bytesToString = sharedUtil.bytesToString;
var error = sharedUtil.error;
var isInt = sharedUtil.isInt;
var stringToBytes = sharedUtil.stringToBytes;
var utf8StringToString = sharedUtil.utf8StringToString;
var warn = sharedUtil.warn;
var Name = corePrimitives.Name;
var isName = corePrimitives.isName;
var isDict = corePrimitives.isDict;
var DecryptStream = coreStream.DecryptStream;

var ARCFourCipher = (function ARCFourCipherClosure() {
  function ARCFourCipher(key) {
    this.a = 0;
    this.b = 0;
    var s = new Uint8Array(256);
    var i, j = 0, tmp, keyLength = key.length;
    for (i = 0; i < 256; ++i) {
      s[i] = i;
    }
    for (i = 0; i < 256; ++i) {
      tmp = s[i];
      j = (j + tmp + key[i % keyLength]) & 0xFF;
      s[i] = s[j];
      s[j] = tmp;
    }
    this.s = s;
  }

  ARCFourCipher.prototype = {
    encryptBlock: function ARCFourCipher_encryptBlock(data) {
      var i, n = data.length, tmp, tmp2;
      var a = this.a, b = this.b, s = this.s;
      var output = new Uint8Array(n);
      for (i = 0; i < n; ++i) {
        a = (a + 1) & 0xFF;
        tmp = s[a];
        b = (b + tmp) & 0xFF;
        tmp2 = s[b];
        s[a] = tmp2;
        s[b] = tmp;
        output[i] = data[i] ^ s[(tmp + tmp2) & 0xFF];
      }
      this.a = a;
      this.b = b;
      return output;
    }
  };
  ARCFourCipher.prototype.decryptBlock = ARCFourCipher.prototype.encryptBlock;

  return ARCFourCipher;
})();

var calculateMD5 = (function calculateMD5Closure() {
  var r = new Uint8Array([
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21]);

  var k = new Int32Array([
    -680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426,
    -1473231341, -45705983, 1770035416, -1958414417, -42063, -1990404162,
    1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632,
    643717713, -373897302, -701558691, 38016083, -660478335, -405537848,
    568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784,
    1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556,
    -1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222,
    -722521979, 76029189, -640364487, -421815835, 530742520, -995338651,
    -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606,
    -1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649,
    -145523070, -1120210379, 718787259, -343485551]);

  function hash(data, offset, length) {
    var h0 = 1732584193, h1 = -271733879, h2 = -1732584194, h3 = 271733878;
    // pre-processing
    var paddedLength = (length + 72) & ~63; // data + 9 extra bytes
    var padded = new Uint8Array(paddedLength);
    var i, j, n;
    for (i = 0; i < length; ++i) {
      padded[i] = data[offset++];
    }
    padded[i++] = 0x80;
    n = paddedLength - 8;
    while (i < n) {
      padded[i++] = 0;
    }
    padded[i++] = (length << 3) & 0xFF;
    padded[i++] = (length >> 5) & 0xFF;
    padded[i++] = (length >> 13) & 0xFF;
    padded[i++] = (length >> 21) & 0xFF;
    padded[i++] = (length >>> 29) & 0xFF;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    var w = new Int32Array(16);
    for (i = 0; i < paddedLength;) {
      for (j = 0; j < 16; ++j, i += 4) {
        w[j] = (padded[i] | (padded[i + 1] << 8) |
               (padded[i + 2] << 16) | (padded[i + 3] << 24));
      }
      var a = h0, b = h1, c = h2, d = h3, f, g;
      for (j = 0; j < 64; ++j) {
        if (j < 16) {
          f = (b & c) | ((~b) & d);
          g = j;
        } else if (j < 32) {
          f = (d & b) | ((~d) & c);
          g = (5 * j + 1) & 15;
        } else if (j < 48) {
          f = b ^ c ^ d;
          g = (3 * j + 5) & 15;
        } else {
          f = c ^ (b | (~d));
          g = (7 * j) & 15;
        }
        var tmp = d, rotateArg = (a + f + k[j] + w[g]) | 0, rotate = r[j];
        d = c;
        c = b;
        b = (b + ((rotateArg << rotate) | (rotateArg >>> (32 - rotate)))) | 0;
        a = tmp;
      }
      h0 = (h0 + a) | 0;
      h1 = (h1 + b) | 0;
      h2 = (h2 + c) | 0;
      h3 = (h3 + d) | 0;
    }
    return new Uint8Array([
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >>> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >>> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >>> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >>> 24) & 0xFF
    ]);
  }

  return hash;
})();
var Word64 = (function Word64Closure() {
  function Word64(highInteger, lowInteger) {
    this.high = highInteger | 0;
    this.low = lowInteger | 0;
  }
  Word64.prototype = {
    and: function Word64_and(word) {
      this.high &= word.high;
      this.low &= word.low;
    },
    xor: function Word64_xor(word) {
     this.high ^= word.high;
     this.low ^= word.low;
    },

    or: function Word64_or(word) {
      this.high |= word.high;
      this.low |= word.low;
    },

    shiftRight: function Word64_shiftRight(places) {
      if (places >= 32) {
        this.low = (this.high >>> (places - 32)) | 0;
        this.high = 0;
      } else {
        this.low = (this.low >>> places) | (this.high << (32 - places));
        this.high = (this.high >>> places) | 0;
      }
    },

    shiftLeft: function Word64_shiftLeft(places) {
      if (places >= 32) {
        this.high = this.low << (places - 32);
        this.low = 0;
      } else {
        this.high = (this.high << places) | (this.low >>> (32 - places));
        this.low = this.low << places;
      }
    },

    rotateRight: function Word64_rotateRight(places) {
      var low, high;
      if (places & 32) {
        high = this.low;
        low = this.high;
      } else {
        low = this.low;
        high = this.high;
      }
      places &= 31;
      this.low = (low >>> places) | (high << (32 - places));
      this.high = (high >>> places) | (low << (32 - places));
    },

    not: function Word64_not() {
      this.high = ~this.high;
      this.low = ~this.low;
    },

    add: function Word64_add(word) {
      var lowAdd = (this.low >>> 0) + (word.low >>> 0);
      var highAdd = (this.high >>> 0) + (word.high >>> 0);
      if (lowAdd > 0xFFFFFFFF) {
        highAdd += 1;
      }
      this.low = lowAdd | 0;
      this.high = highAdd | 0;
    },

    copyTo: function Word64_copyTo(bytes, offset) {
      bytes[offset] = (this.high >>> 24) & 0xFF;
      bytes[offset + 1] = (this.high >> 16) & 0xFF;
      bytes[offset + 2] = (this.high >> 8) & 0xFF;
      bytes[offset + 3] = this.high & 0xFF;
      bytes[offset + 4] = (this.low >>> 24) & 0xFF;
      bytes[offset + 5] = (this.low >> 16) & 0xFF;
      bytes[offset + 6] = (this.low >> 8) & 0xFF;
      bytes[offset + 7] = this.low & 0xFF;
    },

    assign: function Word64_assign(word) {
      this.high = word.high;
      this.low = word.low;
    }
  };
  return Word64;
})();

var calculateSHA256 = (function calculateSHA256Closure() {
  function rotr(x, n) {
    return (x >>> n) | (x << 32 - n);
  }

  function ch(x, y, z) {
    return (x & y) ^ (~x & z);
  }

  function maj(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }

  function sigma(x) {
    return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
  }

  function sigmaPrime(x) {
    return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
  }

  function littleSigma(x) {
    return rotr(x, 7) ^ rotr(x, 18) ^ x >>> 3;
  }

  function littleSigmaPrime(x) {
    return rotr(x, 17) ^ rotr(x, 19) ^ x >>> 10;
  }

  var k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
           0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
           0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
           0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
           0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
           0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
           0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
           0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
           0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
           0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
           0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
           0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
           0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  function hash(data, offset, length) {
    // initial hash values
    var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372,
        h3 = 0xa54ff53a, h4 = 0x510e527f, h5 = 0x9b05688c,
        h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    // pre-processing
    var paddedLength = Math.ceil((length + 9) / 64) * 64;
    var padded = new Uint8Array(paddedLength);
    var i, j, n;
    for (i = 0; i < length; ++i) {
      padded[i] = data[offset++];
    }
    padded[i++] = 0x80;
    n = paddedLength - 8;
    while (i < n) {
      padded[i++] = 0;
    }
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = (length >>> 29) & 0xFF;
    padded[i++] = (length >> 21) & 0xFF;
    padded[i++] = (length >> 13) & 0xFF;
    padded[i++] = (length >> 5) & 0xFF;
    padded[i++] = (length << 3) & 0xFF;
    var w = new Uint32Array(64);
    // for each 512 bit block
    for (i = 0; i < paddedLength;) {
      for (j = 0; j < 16; ++j) {
        w[j] = (padded[i] << 24 | (padded[i + 1] << 16) |
               (padded[i + 2] << 8) | (padded[i + 3]));
        i += 4;
      }

      for (j = 16; j < 64; ++j) {
        w[j] = littleSigmaPrime(w[j - 2]) + w[j - 7] +
               littleSigma(w[j - 15]) + w[j - 16] | 0;
      }
      var a = h0, b = h1, c = h2, d = h3, e = h4,
          f = h5, g = h6, h = h7, t1, t2;
      for (j = 0; j < 64; ++j) {
        t1 = h + sigmaPrime(e) + ch(e, f, g) + k[j] + w[j];
        t2 = sigma(a) + maj(a, b, c);
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }
      h0 = (h0 + a) | 0;
      h1 = (h1 + b) | 0;
      h2 = (h2 + c) | 0;
      h3 = (h3 + d) | 0;
      h4 = (h4 + e) | 0;
      h5 = (h5 + f) | 0;
      h6 = (h6 + g) | 0;
      h7 = (h7 + h) | 0;
    }
    return new Uint8Array([
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, (h0) & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, (h1) & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, (h2) & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, (h3) & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, (h4) & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, (h5) & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, (h6) & 0xFF,
      (h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, (h7) & 0xFF
    ]);
  }

  return hash;
})();

var calculateSHA512 = (function calculateSHA512Closure() {
  function ch(result, x, y, z, tmp) {
    result.assign(x);
    result.and(y);
    tmp.assign(x);
    tmp.not();
    tmp.and(z);
    result.xor(tmp);
  }

  function maj(result, x, y, z, tmp) {
    result.assign(x);
    result.and(y);
    tmp.assign(x);
    tmp.and(z);
    result.xor(tmp);
    tmp.assign(y);
    tmp.and(z);
    result.xor(tmp);
  }

  function sigma(result, x, tmp) {
    result.assign(x);
    result.rotateRight(28);
    tmp.assign(x);
    tmp.rotateRight(34);
    result.xor(tmp);
    tmp.assign(x);
    tmp.rotateRight(39);
    result.xor(tmp);
  }

  function sigmaPrime(result, x, tmp) {
    result.assign(x);
    result.rotateRight(14);
    tmp.assign(x);
    tmp.rotateRight(18);
    result.xor(tmp);
    tmp.assign(x);
    tmp.rotateRight(41);
    result.xor(tmp);
  }

  function littleSigma(result, x, tmp) {
    result.assign(x);
    result.rotateRight(1);
    tmp.assign(x);
    tmp.rotateRight(8);
    result.xor(tmp);
    tmp.assign(x);
    tmp.shiftRight(7);
    result.xor(tmp);
  }

  function littleSigmaPrime(result, x, tmp) {
    result.assign(x);
    result.rotateRight(19);
    tmp.assign(x);
    tmp.rotateRight(61);
    result.xor(tmp);
    tmp.assign(x);
    tmp.shiftRight(6);
    result.xor(tmp);
  }

  var k = [
    new Word64(0x428a2f98, 0xd728ae22), new Word64(0x71374491, 0x23ef65cd),
    new Word64(0xb5c0fbcf, 0xec4d3b2f), new Word64(0xe9b5dba5, 0x8189dbbc),
    new Word64(0x3956c25b, 0xf348b538), new Word64(0x59f111f1, 0xb605d019),
    new Word64(0x923f82a4, 0xaf194f9b), new Word64(0xab1c5ed5, 0xda6d8118),
    new Word64(0xd807aa98, 0xa3030242), new Word64(0x12835b01, 0x45706fbe),
    new Word64(0x243185be, 0x4ee4b28c), new Word64(0x550c7dc3, 0xd5ffb4e2),
    new Word64(0x72be5d74, 0xf27b896f), new Word64(0x80deb1fe, 0x3b1696b1),
    new Word64(0x9bdc06a7, 0x25c71235), new Word64(0xc19bf174, 0xcf692694),
    new Word64(0xe49b69c1, 0x9ef14ad2), new Word64(0xefbe4786, 0x384f25e3),
    new Word64(0x0fc19dc6, 0x8b8cd5b5), new Word64(0x240ca1cc, 0x77ac9c65),
    new Word64(0x2de92c6f, 0x592b0275), new Word64(0x4a7484aa, 0x6ea6e483),
    new Word64(0x5cb0a9dc, 0xbd41fbd4), new Word64(0x76f988da, 0x831153b5),
    new Word64(0x983e5152, 0xee66dfab), new Word64(0xa831c66d, 0x2db43210),
    new Word64(0xb00327c8, 0x98fb213f), new Word64(0xbf597fc7, 0xbeef0ee4),
    new Word64(0xc6e00bf3, 0x3da88fc2), new Word64(0xd5a79147, 0x930aa725),
    new Word64(0x06ca6351, 0xe003826f), new Word64(0x14292967, 0x0a0e6e70),
    new Word64(0x27b70a85, 0x46d22ffc), new Word64(0x2e1b2138, 0x5c26c926),
    new Word64(0x4d2c6dfc, 0x5ac42aed), new Word64(0x53380d13, 0x9d95b3df),
    new Word64(0x650a7354, 0x8baf63de), new Word64(0x766a0abb, 0x3c77b2a8),
    new Word64(0x81c2c92e, 0x47edaee6), new Word64(0x92722c85, 0x1482353b),
    new Word64(0xa2bfe8a1, 0x4cf10364), new Word64(0xa81a664b, 0xbc423001),
    new Word64(0xc24b8b70, 0xd0f89791), new Word64(0xc76c51a3, 0x0654be30),
    new Word64(0xd192e819, 0xd6ef5218), new Word64(0xd6990624, 0x5565a910),
    new Word64(0xf40e3585, 0x5771202a), new Word64(0x106aa070, 0x32bbd1b8),
    new Word64(0x19a4c116, 0xb8d2d0c8), new Word64(0x1e376c08, 0x5141ab53),
    new Word64(0x2748774c, 0xdf8eeb99), new Word64(0x34b0bcb5, 0xe19b48a8),
    new Word64(0x391c0cb3, 0xc5c95a63), new Word64(0x4ed8aa4a, 0xe3418acb),
    new Word64(0x5b9cca4f, 0x7763e373), new Word64(0x682e6ff3, 0xd6b2b8a3),
    new Word64(0x748f82ee, 0x5defb2fc), new Word64(0x78a5636f, 0x43172f60),
    new Word64(0x84c87814, 0xa1f0ab72), new Word64(0x8cc70208, 0x1a6439ec),
    new Word64(0x90befffa, 0x23631e28), new Word64(0xa4506ceb, 0xde82bde9),
    new Word64(0xbef9a3f7, 0xb2c67915), new Word64(0xc67178f2, 0xe372532b),
    new Word64(0xca273ece, 0xea26619c), new Word64(0xd186b8c7, 0x21c0c207),
    new Word64(0xeada7dd6, 0xcde0eb1e), new Word64(0xf57d4f7f, 0xee6ed178),
    new Word64(0x06f067aa, 0x72176fba), new Word64(0x0a637dc5, 0xa2c898a6),
    new Word64(0x113f9804, 0xbef90dae), new Word64(0x1b710b35, 0x131c471b),
    new Word64(0x28db77f5, 0x23047d84), new Word64(0x32caab7b, 0x40c72493),
    new Word64(0x3c9ebe0a, 0x15c9bebc), new Word64(0x431d67c4, 0x9c100d4c),
    new Word64(0x4cc5d4be, 0xcb3e42b6), new Word64(0x597f299c, 0xfc657e2a),
    new Word64(0x5fcb6fab, 0x3ad6faec), new Word64(0x6c44198c, 0x4a475817)];

  function hash(data, offset, length, mode384) {
    mode384 = !!mode384;
    // initial hash values
    var h0, h1, h2, h3, h4, h5, h6, h7;
    if (!mode384) {
      h0 = new Word64(0x6a09e667, 0xf3bcc908);
      h1 = new Word64(0xbb67ae85, 0x84caa73b);
      h2 = new Word64(0x3c6ef372, 0xfe94f82b);
      h3 = new Word64(0xa54ff53a, 0x5f1d36f1);
      h4 = new Word64(0x510e527f, 0xade682d1);
      h5 = new Word64(0x9b05688c, 0x2b3e6c1f);
      h6 = new Word64(0x1f83d9ab, 0xfb41bd6b);
      h7 = new Word64(0x5be0cd19, 0x137e2179);
    }
    else {
      // SHA384 is exactly the same
      // except with different starting values and a trimmed result
      h0 = new Word64(0xcbbb9d5d, 0xc1059ed8);
      h1 = new Word64(0x629a292a, 0x367cd507);
      h2 = new Word64(0x9159015a, 0x3070dd17);
      h3 = new Word64(0x152fecd8, 0xf70e5939);
      h4 = new Word64(0x67332667, 0xffc00b31);
      h5 = new Word64(0x8eb44a87, 0x68581511);
      h6 = new Word64(0xdb0c2e0d, 0x64f98fa7);
      h7 = new Word64(0x47b5481d, 0xbefa4fa4);
    }

    // pre-processing
    var paddedLength = Math.ceil((length + 17) / 128) * 128;
    var padded = new Uint8Array(paddedLength);
    var i, j, n;
    for (i = 0; i < length; ++i) {
      padded[i] = data[offset++];
    }
    padded[i++] = 0x80;
    n = paddedLength - 16;
    while (i < n) {
      padded[i++] = 0;
    }
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = 0;
    padded[i++] = (length >>> 29) & 0xFF;
    padded[i++] = (length >> 21) & 0xFF;
    padded[i++] = (length >> 13) & 0xFF;
    padded[i++] = (length >> 5) & 0xFF;
    padded[i++] = (length << 3) & 0xFF;

    var w = new Array(80);
    for (i = 0; i < 80; i++) {
      w[i] = new Word64(0, 0);
    }
    var a = new Word64(0, 0), b = new Word64(0, 0), c = new Word64(0, 0);
    var d = new Word64(0, 0), e = new Word64(0, 0), f = new Word64(0, 0);
    var g = new Word64(0, 0), h = new Word64(0, 0);
    var t1 = new Word64(0, 0), t2 = new Word64(0, 0);
    var tmp1 = new Word64(0, 0), tmp2 = new Word64(0, 0), tmp3;

    // for each 1024 bit block
    for (i = 0; i < paddedLength;) {
      for (j = 0; j < 16; ++j) {
        w[j].high = (padded[i] << 24) | (padded[i + 1] << 16) |
                    (padded[i + 2] << 8) | (padded[i + 3]);
        w[j].low = (padded[i + 4]) << 24 | (padded[i + 5]) << 16 |
                   (padded[i + 6]) << 8 | (padded[i + 7]);
        i += 8;
      }
      for (j = 16; j < 80; ++j) {
        tmp3 = w[j];
        littleSigmaPrime(tmp3, w[j - 2], tmp2);
        tmp3.add(w[j - 7]);
        littleSigma(tmp1, w[j - 15], tmp2);
        tmp3.add(tmp1);
        tmp3.add(w[j - 16]);
      }

      a.assign(h0); b.assign(h1); c.assign(h2); d.assign(h3);
      e.assign(h4); f.assign(h5); g.assign(h6); h.assign(h7);
      for (j = 0; j < 80; ++j) {
        t1.assign(h);
        sigmaPrime(tmp1, e, tmp2);
        t1.add(tmp1);
        ch(tmp1, e, f, g, tmp2);
        t1.add(tmp1);
        t1.add(k[j]);
        t1.add(w[j]);

        sigma(t2, a, tmp2);
        maj(tmp1, a, b, c, tmp2);
        t2.add(tmp1);

        tmp3 = h;
        h = g;
        g = f;
        f = e;
        d.add(t1);
        e = d;
        d = c;
        c = b;
        b = a;
        tmp3.assign(t1);
        tmp3.add(t2);
        a = tmp3;
      }
      h0.add(a);
      h1.add(b);
      h2.add(c);
      h3.add(d);
      h4.add(e);
      h5.add(f);
      h6.add(g);
      h7.add(h);
    }

    var result;
    if (!mode384) {
      result = new Uint8Array(64);
      h0.copyTo(result,0);
      h1.copyTo(result,8);
      h2.copyTo(result,16);
      h3.copyTo(result,24);
      h4.copyTo(result,32);
      h5.copyTo(result,40);
      h6.copyTo(result,48);
      h7.copyTo(result,56);
    }
    else {
      result = new Uint8Array(48);
      h0.copyTo(result,0);
      h1.copyTo(result,8);
      h2.copyTo(result,16);
      h3.copyTo(result,24);
      h4.copyTo(result,32);
      h5.copyTo(result,40);
    }
    return result;
  }

  return hash;
})();
var calculateSHA384 = (function calculateSHA384Closure() {
  function hash(data, offset, length) {
    return calculateSHA512(data, offset, length, true);
  }

  return hash;
})();
var NullCipher = (function NullCipherClosure() {
  function NullCipher() {
  }

  NullCipher.prototype = {
    decryptBlock: function NullCipher_decryptBlock(data) {
      return data;
    }
  };

  return NullCipher;
})();

var AES128Cipher = (function AES128CipherClosure() {
  var rcon = new Uint8Array([
    0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
    0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
    0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
    0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
    0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,
    0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6,
    0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72,
    0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc,
    0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10,
    0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e,
    0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
    0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
    0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
    0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
    0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
    0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
    0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb,
    0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
    0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
    0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
    0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
    0x74, 0xe8, 0xcb, 0x8d]);

  var s = new Uint8Array([
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b,
    0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
    0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26,
    0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2,
    0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
    0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed,
    0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f,
    0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
    0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec,
    0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
    0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
    0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d,
    0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f,
    0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
    0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11,
    0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f,
    0xb0, 0x54, 0xbb, 0x16]);

  var inv_s = new Uint8Array([
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e,
    0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87,
    0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32,
    0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49,
    0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16,
    0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50,
    0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05,
    0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02,
    0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41,
    0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
    0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89,
    0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b,
    0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59,
    0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d,
    0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d,
    0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63,
    0x55, 0x21, 0x0c, 0x7d]);
  var mixCol = new Uint8Array(256);
  for (var i = 0; i < 256; i++) {
    if (i < 128) {
      mixCol[i] = i << 1;
    } else {
      mixCol[i] = (i << 1) ^ 0x1b;
    }
  }
  var mix = new Uint32Array([
    0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927,
    0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45,
    0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb,
    0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381,
    0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf,
    0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66,
    0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28,
    0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012,
    0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec,
    0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e,
    0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd,
    0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7,
    0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89,
    0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b,
    0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815,
    0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f,
    0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa,
    0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8,
    0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36,
    0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c,
    0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742,
    0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea,
    0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4,
    0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e,
    0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360,
    0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502,
    0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87,
    0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd,
    0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3,
    0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621,
    0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f,
    0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55,
    0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26,
    0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844,
    0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba,
    0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480,
    0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce,
    0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67,
    0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929,
    0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713,
    0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed,
    0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f,
    0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3]);

  function expandKey128(cipherKey) {
    var b = 176, result = new Uint8Array(b);
    result.set(cipherKey);
    for (var j = 16, i = 1; j < b; ++i) {
      // RotWord
      var t1 = result[j - 3], t2 = result[j - 2],
          t3 = result[j - 1], t4 = result[j - 4];
      // SubWord
      t1 = s[t1];
      t2 = s[t2];
      t3 = s[t3];
      t4 = s[t4];
      // Rcon
      t1 = t1 ^ rcon[i];
      for (var n = 0; n < 4; ++n) {
        result[j] = (t1 ^= result[j - 16]);
        j++;
        result[j] = (t2 ^= result[j - 16]);
        j++;
        result[j] = (t3 ^= result[j - 16]);
        j++;
        result[j] = (t4 ^= result[j - 16]);
        j++;
      }
    }
    return result;
  }

  function decrypt128(input, key) {
    var state = new Uint8Array(16);
    state.set(input);
    var i, j, k;
    var t, u, v;
    // AddRoundKey
    for (j = 0, k = 160; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }
    for (i = 9; i >= 1; --i) {
      // InvShiftRows
      t = state[13];
      state[13] = state[9];
      state[9] = state[5];
      state[5] = state[1];
      state[1] = t;
      t = state[14];
      u = state[10];
      state[14] = state[6];
      state[10] = state[2];
      state[6] = t;
      state[2] = u;
      t = state[15];
      u = state[11];
      v = state[7];
      state[15] = state[3];
      state[11] = t;
      state[7] = u;
      state[3] = v;
      // InvSubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = inv_s[state[j]];
      }
      // AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
      // InvMixColumns
      for (j = 0; j < 16; j += 4) {
        var s0 = mix[state[j]], s1 = mix[state[j + 1]],
          s2 = mix[state[j + 2]], s3 = mix[state[j + 3]];
        t = (s0 ^ (s1 >>> 8) ^ (s1 << 24) ^ (s2 >>> 16) ^ (s2 << 16) ^
          (s3 >>> 24) ^ (s3 << 8));
        state[j] = (t >>> 24) & 0xFF;
        state[j + 1] = (t >> 16) & 0xFF;
        state[j + 2] = (t >> 8) & 0xFF;
        state[j + 3] = t & 0xFF;
      }
    }
    // InvShiftRows
    t = state[13];
    state[13] = state[9];
    state[9] = state[5];
    state[5] = state[1];
    state[1] = t;
    t = state[14];
    u = state[10];
    state[14] = state[6];
    state[10] = state[2];
    state[6] = t;
    state[2] = u;
    t = state[15];
    u = state[11];
    v = state[7];
    state[15] = state[3];
    state[11] = t;
    state[7] = u;
    state[3] = v;
    for (j = 0; j < 16; ++j) {
      // InvSubBytes
      state[j] = inv_s[state[j]];
      // AddRoundKey
      state[j] ^= key[j];
    }
    return state;
  }

  function encrypt128(input, key) {
    var t, u, v, k;
    var state = new Uint8Array(16);
    state.set(input);
    for (j = 0; j < 16; ++j) {
      // AddRoundKey
      state[j] ^= key[j];
    }

    for (i = 1; i < 10; i++) {
      //SubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = s[state[j]];
      }
      //ShiftRows
      v = state[1];
      state[1] = state[5];
      state[5] = state[9];
      state[9] = state[13];
      state[13] = v;
      v = state[2];
      u = state[6];
      state[2] = state[10];
      state[6] = state[14];
      state[10] = v;
      state[14] = u;
      v = state[3];
      u = state[7];
      t = state[11];
      state[3] = state[15];
      state[7] = v;
      state[11] = u;
      state[15] = t;
      //MixColumns
      for (var j = 0; j < 16; j += 4) {
        var s0 = state[j + 0], s1 = state[j + 1];
        var s2 = state[j + 2], s3 = state[j + 3];
        t = s0 ^ s1 ^ s2 ^ s3;
        state[j + 0] ^= t ^ mixCol[s0 ^ s1];
        state[j + 1] ^= t ^ mixCol[s1 ^ s2];
        state[j + 2] ^= t ^ mixCol[s2 ^ s3];
        state[j + 3] ^= t ^ mixCol[s3 ^ s0];
      }
      //AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
    }

    //SubBytes
    for (j = 0; j < 16; ++j) {
      state[j] = s[state[j]];
    }
    //ShiftRows
    v = state[1];
    state[1] = state[5];
    state[5] = state[9];
    state[9] = state[13];
    state[13] = v;
    v = state[2];
    u = state[6];
    state[2] = state[10];
    state[6] = state[14];
    state[10] = v;
    state[14] = u;
    v = state[3];
    u = state[7];
    t = state[11];
    state[3] = state[15];
    state[7] = v;
    state[11] = u;
    state[15] = t;
    //AddRoundKey
    for (j = 0, k = 160; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }
    return state;
  }

  function AES128Cipher(key) {
    this.key = expandKey128(key);
    this.buffer = new Uint8Array(16);
    this.bufferPosition = 0;
  }

  function decryptBlock2(data, finalize) {
    var i, j, ii, sourceLength = data.length,
        buffer = this.buffer, bufferLength = this.bufferPosition,
        result = [], iv = this.iv;
    for (i = 0; i < sourceLength; ++i) {
      buffer[bufferLength] = data[i];
      ++bufferLength;
      if (bufferLength < 16) {
        continue;
      }
      // buffer is full, decrypting
      var plain = decrypt128(buffer, this.key);
      // xor-ing the IV vector to get plain text
      for (j = 0; j < 16; ++j) {
        plain[j] ^= iv[j];
      }
      iv = buffer;
      result.push(plain);
      buffer = new Uint8Array(16);
      bufferLength = 0;
    }
    // saving incomplete buffer
    this.buffer = buffer;
    this.bufferLength = bufferLength;
    this.iv = iv;
    if (result.length === 0) {
      return new Uint8Array([]);
    }
    // combining plain text blocks into one
    var outputLength = 16 * result.length;
    if (finalize) {
      // undo a padding that is described in RFC 2898
      var lastBlock = result[result.length - 1];
      var psLen = lastBlock[15];
      if (psLen <= 16) {
        for (i = 15, ii = 16 - psLen; i >= ii; --i) {
          if (lastBlock[i] !== psLen) {
            // Invalid padding, assume that the block has no padding.
            psLen = 0;
            break;
          }
        }
        outputLength -= psLen;
        result[result.length - 1] = lastBlock.subarray(0, 16 - psLen);
      }
    }
    var output = new Uint8Array(outputLength);
    for (i = 0, j = 0, ii = result.length; i < ii; ++i, j += 16) {
      output.set(result[i], j);
    }
    return output;
  }

  AES128Cipher.prototype = {
    decryptBlock: function AES128Cipher_decryptBlock(data, finalize) {
      var i, sourceLength = data.length;
      var buffer = this.buffer, bufferLength = this.bufferPosition;
      // waiting for IV values -- they are at the start of the stream
      for (i = 0; bufferLength < 16 && i < sourceLength; ++i, ++bufferLength) {
        buffer[bufferLength] = data[i];
      }
      if (bufferLength < 16) {
        // need more data
        this.bufferLength = bufferLength;
        return new Uint8Array([]);
      }
      this.iv = buffer;
      this.buffer = new Uint8Array(16);
      this.bufferLength = 0;
      // starting decryption
      this.decryptBlock = decryptBlock2;
      return this.decryptBlock(data.subarray(16), finalize);
    },
    encrypt: function AES128Cipher_encrypt(data, iv) {
      var i, j, ii, sourceLength = data.length,
          buffer = this.buffer, bufferLength = this.bufferPosition,
          result = [];
      if (!iv) {
        iv = new Uint8Array(16);
      }
      for (i = 0; i < sourceLength; ++i) {
        buffer[bufferLength] = data[i];
        ++bufferLength;
        if (bufferLength < 16) {
          continue;
        }
        for (j = 0; j < 16; ++j) {
          buffer[j] ^= iv[j];
        }

        // buffer is full, encrypting
        var cipher = encrypt128(buffer, this.key);
        iv = cipher;
        result.push(cipher);
        buffer = new Uint8Array(16);
        bufferLength = 0;
      }
      // saving incomplete buffer
      this.buffer = buffer;
      this.bufferLength = bufferLength;
      this.iv = iv;
      if (result.length === 0) {
        return new Uint8Array([]);
      }
      // combining plain text blocks into one
      var outputLength = 16 * result.length;
      var output = new Uint8Array(outputLength);
      for (i = 0, j = 0, ii = result.length; i < ii; ++i, j += 16) {
        output.set(result[i], j);
      }
      return output;
    }
  };

  return AES128Cipher;
})();

var AES256Cipher = (function AES256CipherClosure() {
  var rcon = new Uint8Array([
    0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
    0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
    0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
    0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
    0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,
    0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6,
    0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72,
    0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc,
    0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10,
    0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e,
    0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
    0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
    0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
    0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
    0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
    0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
    0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb,
    0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
    0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
    0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
    0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
    0x74, 0xe8, 0xcb, 0x8d]);

  var s = new Uint8Array([
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b,
    0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
    0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26,
    0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2,
    0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
    0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed,
    0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f,
    0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
    0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec,
    0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
    0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
    0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d,
    0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f,
    0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
    0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11,
    0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f,
    0xb0, 0x54, 0xbb, 0x16]);

  var inv_s = new Uint8Array([
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e,
    0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87,
    0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32,
    0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49,
    0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16,
    0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50,
    0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05,
    0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02,
    0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41,
    0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
    0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89,
    0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b,
    0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59,
    0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d,
    0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d,
    0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63,
    0x55, 0x21, 0x0c, 0x7d]);

  var mixCol = new Uint8Array(256);
  for (var i = 0; i < 256; i++) {
    if (i < 128) {
      mixCol[i] = i << 1;
    } else {
      mixCol[i] = (i << 1) ^ 0x1b;
    }
  }
  var mix = new Uint32Array([
    0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927,
    0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45,
    0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb,
    0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381,
    0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf,
    0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66,
    0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28,
    0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012,
    0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec,
    0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e,
    0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd,
    0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7,
    0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89,
    0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b,
    0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815,
    0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f,
    0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa,
    0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8,
    0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36,
    0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c,
    0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742,
    0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea,
    0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4,
    0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e,
    0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360,
    0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502,
    0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87,
    0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd,
    0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3,
    0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621,
    0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f,
    0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55,
    0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26,
    0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844,
    0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba,
    0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480,
    0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce,
    0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67,
    0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929,
    0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713,
    0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed,
    0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f,
    0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3]);

  function expandKey256(cipherKey) {
    var b = 240, result = new Uint8Array(b);
    var r = 1;

    result.set(cipherKey);
    for (var j = 32, i = 1; j < b; ++i) {
      if (j % 32 === 16) {
        t1 = s[t1];
        t2 = s[t2];
        t3 = s[t3];
        t4 = s[t4];
      } else if (j % 32 === 0) {
        // RotWord
        var t1 = result[j - 3], t2 = result[j - 2],
          t3 = result[j - 1], t4 = result[j - 4];
        // SubWord
        t1 = s[t1];
        t2 = s[t2];
        t3 = s[t3];
        t4 = s[t4];
        // Rcon
        t1 = t1 ^ r;
        if ((r <<= 1) >= 256) {
          r = (r ^ 0x1b) & 0xFF;
        }
      }

      for (var n = 0; n < 4; ++n) {
        result[j] = (t1 ^= result[j - 32]);
        j++;
        result[j] = (t2 ^= result[j - 32]);
        j++;
        result[j] = (t3 ^= result[j - 32]);
        j++;
        result[j] = (t4 ^= result[j - 32]);
        j++;
      }
    }
    return result;
  }

  function decrypt256(input, key) {
    var state = new Uint8Array(16);
    state.set(input);
    var i, j, k;
    var t, u, v;
    // AddRoundKey
    for (j = 0, k = 224; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }
    for (i = 13; i >= 1; --i) {
      // InvShiftRows
      t = state[13];
      state[13] = state[9];
      state[9] = state[5];
      state[5] = state[1];
      state[1] = t;
      t = state[14];
      u = state[10];
      state[14] = state[6];
      state[10] = state[2];
      state[6] = t;
      state[2] = u;
      t = state[15];
      u = state[11];
      v = state[7];
      state[15] = state[3];
      state[11] = t;
      state[7] = u;
      state[3] = v;
      // InvSubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = inv_s[state[j]];
      }
      // AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
      // InvMixColumns
      for (j = 0; j < 16; j += 4) {
        var s0 = mix[state[j]], s1 = mix[state[j + 1]],
            s2 = mix[state[j + 2]], s3 = mix[state[j + 3]];
        t = (s0 ^ (s1 >>> 8) ^ (s1 << 24) ^ (s2 >>> 16) ^ (s2 << 16) ^
            (s3 >>> 24) ^ (s3 << 8));
        state[j] = (t >>> 24) & 0xFF;
        state[j + 1] = (t >> 16) & 0xFF;
        state[j + 2] = (t >> 8) & 0xFF;
        state[j + 3] = t & 0xFF;
      }
    }
    // InvShiftRows
    t = state[13];
    state[13] = state[9];
    state[9] = state[5];
    state[5] = state[1];
    state[1] = t;
    t = state[14];
    u = state[10];
    state[14] = state[6];
    state[10] = state[2];
    state[6] = t;
    state[2] = u;
    t = state[15];
    u = state[11];
    v = state[7];
    state[15] = state[3];
    state[11] = t;
    state[7] = u;
    state[3] = v;
    for (j = 0; j < 16; ++j) {
      // InvSubBytes
      state[j] = inv_s[state[j]];
      // AddRoundKey
      state[j] ^= key[j];
    }
    return state;
  }

  function encrypt256(input, key) {
    var t, u, v, k;
    var state = new Uint8Array(16);
    state.set(input);
    for (j = 0; j < 16; ++j) {
      // AddRoundKey
      state[j] ^= key[j];
    }

    for (i = 1; i < 14; i++) {
      //SubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = s[state[j]];
      }
      //ShiftRows
      v = state[1];
      state[1] = state[5];
      state[5] = state[9];
      state[9] = state[13];
      state[13] = v;
      v = state[2];
      u = state[6];
      state[2] = state[10];
      state[6] = state[14];
      state[10] = v;
      state[14] = u;
      v = state[3];
      u = state[7];
      t = state[11];
      state[3] = state[15];
      state[7] = v;
      state[11] = u;
      state[15] = t;
      //MixColumns
      for (var j = 0; j < 16; j += 4) {
        var s0 = state[j + 0], s1 = state[j + 1];
        var s2 = state[j + 2], s3 = state[j + 3];
        t = s0 ^ s1 ^ s2 ^ s3;
        state[j + 0] ^= t ^ mixCol[s0 ^ s1];
        state[j + 1] ^= t ^ mixCol[s1 ^ s2];
        state[j + 2] ^= t ^ mixCol[s2 ^ s3];
        state[j + 3] ^= t ^ mixCol[s3 ^ s0];
      }
      //AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
    }

    //SubBytes
    for (j = 0; j < 16; ++j) {
      state[j] = s[state[j]];
    }
    //ShiftRows
    v = state[1];
    state[1] = state[5];
    state[5] = state[9];
    state[9] = state[13];
    state[13] = v;
    v = state[2];
    u = state[6];
    state[2] = state[10];
    state[6] = state[14];
    state[10] = v;
    state[14] = u;
    v = state[3];
    u = state[7];
    t = state[11];
    state[3] = state[15];
    state[7] = v;
    state[11] = u;
    state[15] = t;
    //AddRoundKey
    for (j = 0, k = 224; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }

    return state;

  }

  function AES256Cipher(key) {
    this.key = expandKey256(key);
    this.buffer = new Uint8Array(16);
    this.bufferPosition = 0;
  }

  function decryptBlock2(data, finalize) {
    var i, j, ii, sourceLength = data.length,
        buffer = this.buffer, bufferLength = this.bufferPosition,
        result = [], iv = this.iv;

    for (i = 0; i < sourceLength; ++i) {
      buffer[bufferLength] = data[i];
      ++bufferLength;
      if (bufferLength < 16) {
        continue;
      }
      // buffer is full, decrypting
      var plain = decrypt256(buffer, this.key);
      // xor-ing the IV vector to get plain text
      for (j = 0; j < 16; ++j) {
        plain[j] ^= iv[j];
      }
      iv = buffer;
      result.push(plain);
      buffer = new Uint8Array(16);
      bufferLength = 0;
    }
    // saving incomplete buffer
    this.buffer = buffer;
    this.bufferLength = bufferLength;
    this.iv = iv;
    if (result.length === 0) {
      return new Uint8Array([]);
    }
    // combining plain text blocks into one
    var outputLength = 16 * result.length;
    if (finalize) {
      // undo a padding that is described in RFC 2898
      var lastBlock = result[result.length - 1];
      var psLen = lastBlock[15];
      if (psLen <= 16) {
        for (i = 15, ii = 16 - psLen; i >= ii; --i) {
          if (lastBlock[i] !== psLen) {
            // Invalid padding, assume that the block has no padding.
            psLen = 0;
            break;
          }
        }
        outputLength -= psLen;
        result[result.length - 1] = lastBlock.subarray(0, 16 - psLen);
      }
    }
    var output = new Uint8Array(outputLength);
    for (i = 0, j = 0, ii = result.length; i < ii; ++i, j += 16) {
      output.set(result[i], j);
    }
    return output;

  }

  AES256Cipher.prototype = {
    decryptBlock: function AES256Cipher_decryptBlock(data, finalize, iv) {
      var i, sourceLength = data.length;
      var buffer = this.buffer, bufferLength = this.bufferPosition;
      // if not supplied an IV wait for IV values
      // they are at the start of the stream
      if (iv) {
        this.iv = iv;
      } else {
        for (i = 0; bufferLength < 16 &&
             i < sourceLength; ++i, ++bufferLength) {
          buffer[bufferLength] = data[i];
        }
        if (bufferLength < 16) {
          //need more data
          this.bufferLength = bufferLength;
          return new Uint8Array([]);
        }
        this.iv = buffer;
        data = data.subarray(16);
      }
      this.buffer = new Uint8Array(16);
      this.bufferLength = 0;
      // starting decryption
      this.decryptBlock = decryptBlock2;
      return this.decryptBlock(data, finalize);
    },
    encrypt: function AES256Cipher_encrypt(data, iv) {
      var i, j, ii, sourceLength = data.length,
          buffer = this.buffer, bufferLength = this.bufferPosition,
          result = [];
      if (!iv) {
        iv = new Uint8Array(16);
      }
      for (i = 0; i < sourceLength; ++i) {
        buffer[bufferLength] = data[i];
        ++bufferLength;
        if (bufferLength < 16) {
          continue;
        }
        for (j = 0; j < 16; ++j) {
          buffer[j] ^= iv[j];
        }

        // buffer is full, encrypting
        var cipher = encrypt256(buffer, this.key);
        this.iv = cipher;
        result.push(cipher);
        buffer = new Uint8Array(16);
        bufferLength = 0;
      }
      // saving incomplete buffer
      this.buffer = buffer;
      this.bufferLength = bufferLength;
      this.iv = iv;
      if (result.length === 0) {
        return new Uint8Array([]);
      }
      // combining plain text blocks into one
      var outputLength = 16 * result.length;
      var output = new Uint8Array(outputLength);
      for (i = 0, j = 0, ii = result.length; i < ii; ++i, j += 16) {
        output.set(result[i], j);
      }
      return output;
    }
  };

  return AES256Cipher;
})();

var PDF17 = (function PDF17Closure() {

  function compareByteArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  function PDF17() {
  }

  PDF17.prototype = {
    checkOwnerPassword: function PDF17_checkOwnerPassword(password,
                                                          ownerValidationSalt,
                                                          userBytes,
                                                          ownerPassword) {
      var hashData = new Uint8Array(password.length + 56);
      hashData.set(password, 0);
      hashData.set(ownerValidationSalt, password.length);
      hashData.set(userBytes, password.length + ownerValidationSalt.length);
      var result = calculateSHA256(hashData, 0, hashData.length);
      return compareByteArrays(result, ownerPassword);
    },
    checkUserPassword: function PDF17_checkUserPassword(password,
                                                        userValidationSalt,
                                                        userPassword) {
      var hashData = new Uint8Array(password.length + 8);
      hashData.set(password, 0);
      hashData.set(userValidationSalt, password.length);
      var result = calculateSHA256(hashData, 0, hashData.length);
      return compareByteArrays(result, userPassword);
    },
    getOwnerKey: function PDF17_getOwnerKey(password, ownerKeySalt, userBytes,
                                            ownerEncryption) {
      var hashData = new Uint8Array(password.length + 56);
      hashData.set(password, 0);
      hashData.set(ownerKeySalt, password.length);
      hashData.set(userBytes, password.length + ownerKeySalt.length);
      var key = calculateSHA256(hashData, 0, hashData.length);
      var cipher = new AES256Cipher(key);
      return cipher.decryptBlock(ownerEncryption,
                                 false,
                                 new Uint8Array(16));

    },
    getUserKey: function PDF17_getUserKey(password, userKeySalt,
                                          userEncryption) {
      var hashData = new Uint8Array(password.length + 8);
      hashData.set(password, 0);
      hashData.set(userKeySalt, password.length);
      //key is the decryption key for the UE string
      var key = calculateSHA256(hashData, 0, hashData.length);
      var cipher = new AES256Cipher(key);
      return cipher.decryptBlock(userEncryption,
                                 false,
                                 new Uint8Array(16));
    }
  };
  return PDF17;
})();

var PDF20 = (function PDF20Closure() {

  function concatArrays(array1, array2) {
    var t = new Uint8Array(array1.length + array2.length);
    t.set(array1, 0);
    t.set(array2, array1.length);
    return t;
  }

  function calculatePDF20Hash(password, input, userBytes) {
    //This refers to Algorithm 2.B as defined in ISO 32000-2
    var k = calculateSHA256(input, 0, input.length).subarray(0, 32);
    var e = [0];
    var i = 0;
    while (i < 64 || e[e.length - 1] > i - 32) {
      var arrayLength = password.length + k.length + userBytes.length;

      var k1 = new Uint8Array(arrayLength * 64);
      var array = concatArrays(password, k);
      array = concatArrays(array, userBytes);
      for (var j = 0, pos = 0; j < 64; j++, pos += arrayLength) {
        k1.set(array, pos);
      }
      //AES128 CBC NO PADDING with
      //first 16 bytes of k as the key and the second 16 as the iv.
      var cipher = new AES128Cipher(k.subarray(0, 16));
      e = cipher.encrypt(k1, k.subarray(16, 32));
      //Now we have to take the first 16 bytes of an unsigned
      //big endian integer... and compute the remainder
      //modulo 3.... That is a fairly large number and
      //JavaScript isn't going to handle that well...
      //So we're using a trick that allows us to perform
      //modulo math byte by byte
      var remainder = 0;
      for (var z = 0; z < 16; z++) {
        remainder *= (256 % 3);
        remainder %= 3;
        remainder += ((e[z] >>> 0) % 3);
        remainder %= 3;
      }
      if (remainder === 0) {
        k = calculateSHA256(e, 0, e.length);
      }
      else if (remainder === 1) {
        k = calculateSHA384(e, 0, e.length);
      }
      else if (remainder === 2) {
        k = calculateSHA512(e, 0, e.length);
      }
      i++;
    }
    return k.subarray(0, 32);
  }

  function PDF20() {
  }

  function compareByteArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  PDF20.prototype = {
    hash: function PDF20_hash(password, concatBytes, userBytes) {
      return calculatePDF20Hash(password, concatBytes, userBytes);
    },
    checkOwnerPassword: function PDF20_checkOwnerPassword(password,
                                                          ownerValidationSalt,
                                                          userBytes,
                                                          ownerPassword) {
      var hashData = new Uint8Array(password.length + 56);
      hashData.set(password, 0);
      hashData.set(ownerValidationSalt, password.length);
      hashData.set(userBytes, password.length + ownerValidationSalt.length);
      var result = calculatePDF20Hash(password, hashData, userBytes);
      return compareByteArrays(result, ownerPassword);
    },
    checkUserPassword: function PDF20_checkUserPassword(password,
                                                        userValidationSalt,
                                                        userPassword) {
      var hashData = new Uint8Array(password.length + 8);
      hashData.set(password, 0);
      hashData.set(userValidationSalt, password.length);
      var result = calculatePDF20Hash(password, hashData, []);
      return compareByteArrays(result, userPassword);
    },
    getOwnerKey: function PDF20_getOwnerKey(password, ownerKeySalt, userBytes,
                                            ownerEncryption) {
      var hashData = new Uint8Array(password.length + 56);
      hashData.set(password, 0);
      hashData.set(ownerKeySalt, password.length);
      hashData.set(userBytes, password.length + ownerKeySalt.length);
      var key = calculatePDF20Hash(password, hashData, userBytes);
      var cipher = new AES256Cipher(key);
      return cipher.decryptBlock(ownerEncryption,
                                 false,
                                 new Uint8Array(16));

    },
    getUserKey: function PDF20_getUserKey(password, userKeySalt,
                                          userEncryption) {
      var hashData = new Uint8Array(password.length + 8);
      hashData.set(password, 0);
      hashData.set(userKeySalt, password.length);
      //key is the decryption key for the UE string
      var key = calculatePDF20Hash(password, hashData, []);
      var cipher = new AES256Cipher(key);
      return cipher.decryptBlock(userEncryption,
                                 false,
                                 new Uint8Array(16));
    }
  };
  return PDF20;
})();

var CipherTransform = (function CipherTransformClosure() {
  function CipherTransform(stringCipherConstructor, streamCipherConstructor) {
    this.stringCipherConstructor = stringCipherConstructor;
    this.streamCipherConstructor = streamCipherConstructor;
  }

  CipherTransform.prototype = {
    createStream: function CipherTransform_createStream(stream, length) {
      var cipher = new this.streamCipherConstructor();
      return new DecryptStream(stream, length,
        function cipherTransformDecryptStream(data, finalize) {
          return cipher.decryptBlock(data, finalize);
        }
      );
    },
    decryptString: function CipherTransform_decryptString(s) {
      var cipher = new this.stringCipherConstructor();
      var data = stringToBytes(s);
      data = cipher.decryptBlock(data, true);
      return bytesToString(data);
    }
  };
  return CipherTransform;
})();

var CipherTransformFactory = (function CipherTransformFactoryClosure() {
  var defaultPasswordBytes = new Uint8Array([
    0x28, 0xBF, 0x4E, 0x5E, 0x4E, 0x75, 0x8A, 0x41,
    0x64, 0x00, 0x4E, 0x56, 0xFF, 0xFA, 0x01, 0x08,
    0x2E, 0x2E, 0x00, 0xB6, 0xD0, 0x68, 0x3E, 0x80,
    0x2F, 0x0C, 0xA9, 0xFE, 0x64, 0x53, 0x69, 0x7A]);

  function createEncryptionKey20(revision, password, ownerPassword,
                                 ownerValidationSalt, ownerKeySalt, uBytes,
                                 userPassword, userValidationSalt, userKeySalt,
                                 ownerEncryption, userEncryption, perms) {
    if (password) {
      var passwordLength = Math.min(127, password.length);
      password = password.subarray(0, passwordLength);
    } else {
      password = [];
    }
    var pdfAlgorithm;
    if (revision === 6) {
      pdfAlgorithm = new PDF20();
    } else {
      pdfAlgorithm = new PDF17();
    }

    if (pdfAlgorithm.checkUserPassword(password, userValidationSalt,
                                        userPassword)) {
      return pdfAlgorithm.getUserKey(password, userKeySalt, userEncryption);
    } else if (password.length && pdfAlgorithm.checkOwnerPassword(password,
                                                  ownerValidationSalt,
                                                  uBytes,
                                                  ownerPassword)) {
      return pdfAlgorithm.getOwnerKey(password, ownerKeySalt, uBytes,
                                      ownerEncryption);
    }

    return null;
  }

  function prepareKeyData(fileId, password, ownerPassword, userPassword,
                          flags, revision, keyLength, encryptMetadata) {
    var hashDataSize = 40 + ownerPassword.length + fileId.length;
    var hashData = new Uint8Array(hashDataSize), i = 0, j, n;
    if (password) {
      n = Math.min(32, password.length);
      for (; i < n; ++i) {
        hashData[i] = password[i];
      }
    }
    j = 0;
    while (i < 32) {
      hashData[i++] = defaultPasswordBytes[j++];
    }
    // as now the padded password in the hashData[0..i]
    for (j = 0, n = ownerPassword.length; j < n; ++j) {
      hashData[i++] = ownerPassword[j];
    }
    hashData[i++] = flags & 0xFF;
    hashData[i++] = (flags >> 8) & 0xFF;
    hashData[i++] = (flags >> 16) & 0xFF;
    hashData[i++] = (flags >>> 24) & 0xFF;
    for (j = 0, n = fileId.length; j < n; ++j) {
      hashData[i++] = fileId[j];
    }
    if (revision >= 4 && !encryptMetadata) {
      hashData[i++] = 0xFF;
      hashData[i++] = 0xFF;
      hashData[i++] = 0xFF;
      hashData[i++] = 0xFF;
    }
    var hash = calculateMD5(hashData, 0, i);
    var keyLengthInBytes = keyLength >> 3;
    if (revision >= 3) {
      for (j = 0; j < 50; ++j) {
        hash = calculateMD5(hash, 0, keyLengthInBytes);
      }
    }
    var encryptionKey = hash.subarray(0, keyLengthInBytes);
    var cipher, checkData;

    if (revision >= 3) {
      for (i = 0; i < 32; ++i) {
        hashData[i] = defaultPasswordBytes[i];
      }
      for (j = 0, n = fileId.length; j < n; ++j) {
        hashData[i++] = fileId[j];
      }
      cipher = new ARCFourCipher(encryptionKey);
      checkData = cipher.encryptBlock(calculateMD5(hashData, 0, i));
      n = encryptionKey.length;
      var derivedKey = new Uint8Array(n), k;
      for (j = 1; j <= 19; ++j) {
        for (k = 0; k < n; ++k) {
          derivedKey[k] = encryptionKey[k] ^ j;
        }
        cipher = new ARCFourCipher(derivedKey);
        checkData = cipher.encryptBlock(checkData);
      }
      for (j = 0, n = checkData.length; j < n; ++j) {
        if (userPassword[j] !== checkData[j]) {
          return null;
        }
      }
    } else {
      cipher = new ARCFourCipher(encryptionKey);
      checkData = cipher.encryptBlock(defaultPasswordBytes);
      for (j = 0, n = checkData.length; j < n; ++j) {
        if (userPassword[j] !== checkData[j]) {
          return null;
        }
      }
    }
    return encryptionKey;
  }

  function decodeUserPassword(password, ownerPassword, revision, keyLength) {
    var hashData = new Uint8Array(32), i = 0, j, n;
    n = Math.min(32, password.length);
    for (; i < n; ++i) {
      hashData[i] = password[i];
    }
    j = 0;
    while (i < 32) {
      hashData[i++] = defaultPasswordBytes[j++];
    }
    var hash = calculateMD5(hashData, 0, i);
    var keyLengthInBytes = keyLength >> 3;
    if (revision >= 3) {
      for (j = 0; j < 50; ++j) {
        hash = calculateMD5(hash, 0, hash.length);
      }
    }

    var cipher, userPassword;
    if (revision >= 3) {
      userPassword = ownerPassword;
      var derivedKey = new Uint8Array(keyLengthInBytes), k;
      for (j = 19; j >= 0; j--) {
        for (k = 0; k < keyLengthInBytes; ++k) {
          derivedKey[k] = hash[k] ^ j;
        }
        cipher = new ARCFourCipher(derivedKey);
        userPassword = cipher.encryptBlock(userPassword);
      }
    } else {
      cipher = new ARCFourCipher(hash.subarray(0, keyLengthInBytes));
      userPassword = cipher.encryptBlock(ownerPassword);
    }
    return userPassword;
  }

  var identityName = Name.get('Identity');

  function CipherTransformFactory(dict, fileId, password) {
    var filter = dict.get('Filter');
    if (!isName(filter) || filter.name !== 'Standard') {
      error('unknown encryption method');
    }
    this.dict = dict;
    var algorithm = dict.get('V');
    if (!isInt(algorithm) ||
        (algorithm !== 1 && algorithm !== 2 && algorithm !== 4 &&
        algorithm !== 5)) {
      error('unsupported encryption algorithm');
    }
    this.algorithm = algorithm;
    var keyLength = dict.get('Length');
    if (!keyLength) {
      // Spec asks to rely on encryption dictionary's Length entry, however
      // some PDFs don't have it. Trying to recover.
      if (algorithm <= 3) {
        // For 1 and 2 it's fixed to 40-bit, for 3 40-bit is a minimal value.
        keyLength = 40;
      } else {
        // Trying to find default handler -- it usually has Length.
        var cfDict = dict.get('CF');
        var streamCryptoName = dict.get('StmF');
        if (isDict(cfDict) && isName(streamCryptoName)) {
          var handlerDict = cfDict.get(streamCryptoName.name);
          keyLength = (handlerDict && handlerDict.get('Length')) || 128;
          if (keyLength < 40) {
            // Sometimes it's incorrect value of bits, generators specify bytes.
            keyLength <<= 3;
          }
        }
      }
    }
    if (!isInt(keyLength) ||
        keyLength < 40 || (keyLength % 8) !== 0) {
      error('invalid key length');
    }

    // prepare keys
    var ownerPassword = stringToBytes(dict.get('O')).subarray(0, 32);
    var userPassword = stringToBytes(dict.get('U')).subarray(0, 32);
    var flags = dict.get('P');
    var revision = dict.get('R');
    // meaningful when V is 4 or 5
    var encryptMetadata = ((algorithm === 4 || algorithm === 5) &&
                           dict.get('EncryptMetadata') !== false);
    this.encryptMetadata = encryptMetadata;

    var fileIdBytes = stringToBytes(fileId);
    var passwordBytes;
    if (password) {
      if (revision === 6) {
        try {
          password = utf8StringToString(password);
        } catch (ex) {
          warn('CipherTransformFactory: ' +
               'Unable to convert UTF8 encoded password.');
        }
      }
      passwordBytes = stringToBytes(password);
    }

    var encryptionKey;
    if (algorithm !== 5) {
      encryptionKey = prepareKeyData(fileIdBytes, passwordBytes,
                                     ownerPassword, userPassword, flags,
                                     revision, keyLength, encryptMetadata);
    }
    else {
      var ownerValidationSalt = stringToBytes(dict.get('O')).subarray(32, 40);
      var ownerKeySalt = stringToBytes(dict.get('O')).subarray(40, 48);
      var uBytes = stringToBytes(dict.get('U')).subarray(0, 48);
      var userValidationSalt = stringToBytes(dict.get('U')).subarray(32, 40);
      var userKeySalt = stringToBytes(dict.get('U')).subarray(40, 48);
      var ownerEncryption = stringToBytes(dict.get('OE'));
      var userEncryption = stringToBytes(dict.get('UE'));
      var perms = stringToBytes(dict.get('Perms'));
      encryptionKey =
        createEncryptionKey20(revision, passwordBytes,
          ownerPassword, ownerValidationSalt,
          ownerKeySalt, uBytes,
          userPassword, userValidationSalt,
          userKeySalt, ownerEncryption,
          userEncryption, perms);
    }
    if (!encryptionKey && !password) {
      throw new PasswordException('No password given',
                                  PasswordResponses.NEED_PASSWORD);
    } else if (!encryptionKey && password) {
      // Attempting use the password as an owner password
      var decodedPassword = decodeUserPassword(passwordBytes, ownerPassword,
                                               revision, keyLength);
      encryptionKey = prepareKeyData(fileIdBytes, decodedPassword,
                                     ownerPassword, userPassword, flags,
                                     revision, keyLength, encryptMetadata);
    }

    if (!encryptionKey) {
      throw new PasswordException('Incorrect Password',
                                  PasswordResponses.INCORRECT_PASSWORD);
    }

    this.encryptionKey = encryptionKey;

    if (algorithm >= 4) {
      this.cf = dict.get('CF');
      this.stmf = dict.get('StmF') || identityName;
      this.strf = dict.get('StrF') || identityName;
      this.eff = dict.get('EFF') || this.stmf;
    }
  }

  function buildObjectKey(num, gen, encryptionKey, isAes) {
    var key = new Uint8Array(encryptionKey.length + 9), i, n;
    for (i = 0, n = encryptionKey.length; i < n; ++i) {
      key[i] = encryptionKey[i];
    }
    key[i++] = num & 0xFF;
    key[i++] = (num >> 8) & 0xFF;
    key[i++] = (num >> 16) & 0xFF;
    key[i++] = gen & 0xFF;
    key[i++] = (gen >> 8) & 0xFF;
    if (isAes) {
      key[i++] = 0x73;
      key[i++] = 0x41;
      key[i++] = 0x6C;
      key[i++] = 0x54;
    }
    var hash = calculateMD5(key, 0, i);
    return hash.subarray(0, Math.min(encryptionKey.length + 5, 16));
  }

  function buildCipherConstructor(cf, name, num, gen, key) {
    var cryptFilter = cf.get(name.name);
    var cfm;
    if (cryptFilter !== null && cryptFilter !== undefined) {
      cfm = cryptFilter.get('CFM');
    }
    if (!cfm || cfm.name === 'None') {
      return function cipherTransformFactoryBuildCipherConstructorNone() {
        return new NullCipher();
      };
    }
    if ('V2' === cfm.name) {
      return function cipherTransformFactoryBuildCipherConstructorV2() {
        return new ARCFourCipher(buildObjectKey(num, gen, key, false));
      };
    }
    if ('AESV2' === cfm.name) {
      return function cipherTransformFactoryBuildCipherConstructorAESV2() {
        return new AES128Cipher(buildObjectKey(num, gen, key, true));
      };
    }
    if ('AESV3' === cfm.name) {
      return function cipherTransformFactoryBuildCipherConstructorAESV3() {
        return new AES256Cipher(key);
      };
    }
    error('Unknown crypto method');
  }

  CipherTransformFactory.prototype = {
    createCipherTransform:
        function CipherTransformFactory_createCipherTransform(num, gen) {
      if (this.algorithm === 4 || this.algorithm === 5) {
        return new CipherTransform(
          buildCipherConstructor(this.cf, this.stmf,
                                 num, gen, this.encryptionKey),
          buildCipherConstructor(this.cf, this.strf,
                                 num, gen, this.encryptionKey));
      }
      // algorithms 1 and 2
      var key = buildObjectKey(num, gen, this.encryptionKey, false);
      var cipherConstructor = function buildCipherCipherConstructor() {
        return new ARCFourCipher(key);
      };
      return new CipherTransform(cipherConstructor, cipherConstructor);
    }
  };

  return CipherTransformFactory;
})();

exports.AES128Cipher = AES128Cipher;
exports.AES256Cipher = AES256Cipher;
exports.ARCFourCipher = ARCFourCipher;
exports.CipherTransformFactory = CipherTransformFactory;
exports.PDF17 = PDF17;
exports.PDF20 = PDF20;
exports.calculateMD5 = calculateMD5;
exports.calculateSHA256 = calculateSHA256;
exports.calculateSHA384 = calculateSHA384;
exports.calculateSHA512 = calculateSHA512;
}));

(function (root, factory) {
  {
    factory((root.pdfjsCoreFontRenderer = {}), root.pdfjsSharedUtil,
      root.pdfjsCoreStream, root.pdfjsCoreGlyphList, root.pdfjsCoreEncodings,
      root.pdfjsCoreCFFParser);
  }
}(this, function (exports, sharedUtil, coreStream, coreGlyphList,
                  coreEncodings, coreCFFParser) {

var Util = sharedUtil.Util;
var bytesToString = sharedUtil.bytesToString;
var error = sharedUtil.error;
var Stream = coreStream.Stream;
var getGlyphsUnicode = coreGlyphList.getGlyphsUnicode;
var StandardEncoding = coreEncodings.StandardEncoding;
var CFFParser = coreCFFParser.CFFParser;

var FontRendererFactory = (function FontRendererFactoryClosure() {
  function getLong(data, offset) {
    return (data[offset] << 24) | (data[offset + 1] << 16) |
           (data[offset + 2] << 8) | data[offset + 3];
  }

  function getUshort(data, offset) {
    return (data[offset] << 8) | data[offset + 1];
  }

  function parseCmap(data, start, end) {
    var offset = (getUshort(data, start + 2) === 1 ?
                  getLong(data, start + 8) : getLong(data, start + 16));
    var format = getUshort(data, start + offset);
    var length, ranges, p, i;
    if (format === 4) {
      length = getUshort(data, start + offset + 2);
      var segCount = getUshort(data, start + offset + 6) >> 1;
      p = start + offset + 14;
      ranges = [];
      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i] = {end: getUshort(data, p)};
      }
      p += 2;
      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i].start = getUshort(data, p);
      }
      for (i = 0; i < segCount; i++, p += 2) {
        ranges[i].idDelta = getUshort(data, p);
      }
      for (i = 0; i < segCount; i++, p += 2) {
        var idOffset = getUshort(data, p);
        if (idOffset === 0) {
          continue;
        }
        ranges[i].ids = [];
        for (var j = 0, jj = ranges[i].end - ranges[i].start + 1; j < jj; j++) {
          ranges[i].ids[j] = getUshort(data, p + idOffset);
          idOffset += 2;
        }
      }
      return ranges;
    } else if (format === 12) {
      length = getLong(data, start + offset + 4);
      var groups = getLong(data, start + offset + 12);
      p = start + offset + 16;
      ranges = [];
      for (i = 0; i < groups; i++) {
        ranges.push({
          start: getLong(data, p),
          end: getLong(data, p + 4),
          idDelta: getLong(data, p + 8) - getLong(data, p)
        });
        p += 12;
      }
      return ranges;
    }
    error('not supported cmap: ' + format);
  }

  function parseCff(data, start, end, seacAnalysisEnabled) {
    var properties = {};
    var parser = new CFFParser(new Stream(data, start, end - start),
                               properties, seacAnalysisEnabled);
    var cff = parser.parse();
    return {
      glyphs: cff.charStrings.objects,
      subrs: (cff.topDict.privateDict && cff.topDict.privateDict.subrsIndex &&
              cff.topDict.privateDict.subrsIndex.objects),
      gsubrs: cff.globalSubrIndex && cff.globalSubrIndex.objects
    };
  }

  function parseGlyfTable(glyf, loca, isGlyphLocationsLong) {
    var itemSize, itemDecode;
    if (isGlyphLocationsLong) {
      itemSize = 4;
      itemDecode = function fontItemDecodeLong(data, offset) {
        return (data[offset] << 24) | (data[offset + 1] << 16) |
               (data[offset + 2] << 8) | data[offset + 3];
      };
    } else {
      itemSize = 2;
      itemDecode = function fontItemDecode(data, offset) {
        return (data[offset] << 9) | (data[offset + 1] << 1);
      };
    }
    var glyphs = [];
    var startOffset = itemDecode(loca, 0);
    for (var j = itemSize; j < loca.length; j += itemSize) {
      var endOffset = itemDecode(loca, j);
      glyphs.push(glyf.subarray(startOffset, endOffset));
      startOffset = endOffset;
    }
    return glyphs;
  }

  function lookupCmap(ranges, unicode) {
    var code = unicode.charCodeAt(0), gid = 0;
    var l = 0, r = ranges.length - 1;
    while (l < r) {
      var c = (l + r + 1) >> 1;
      if (code < ranges[c].start) {
        r = c - 1;
      } else {
        l = c;
      }
    }
    if (ranges[l].start <= code && code <= ranges[l].end) {
      gid = (ranges[l].idDelta + (ranges[l].ids ?
             ranges[l].ids[code - ranges[l].start] : code)) & 0xFFFF;
    }
    return {
      charCode: code,
      glyphId: gid,
    };
  }

  function compileGlyf(code, cmds, font) {
    function moveTo(x, y) {
      cmds.push({cmd: 'moveTo', args: [x, y]});
    }
    function lineTo(x, y) {
      cmds.push({cmd: 'lineTo', args: [x, y]});
    }
    function quadraticCurveTo(xa, ya, x, y) {
      cmds.push({cmd: 'quadraticCurveTo', args: [xa, ya, x, y]});
    }

    var i = 0;
    var numberOfContours = ((code[i] << 24) | (code[i + 1] << 16)) >> 16;
    var flags;
    var x = 0, y = 0;
    i += 10;
    if (numberOfContours < 0) {
      // composite glyph
      do {
        flags = (code[i] << 8) | code[i + 1];
        var glyphIndex = (code[i + 2] << 8) | code[i + 3];
        i += 4;
        var arg1, arg2;
        if ((flags & 0x01)) {
          arg1 = ((code[i] << 24) | (code[i + 1] << 16)) >> 16;
          arg2 = ((code[i + 2] << 24) | (code[i + 3] << 16)) >> 16;
          i += 4;
        } else {
          arg1 = code[i++]; arg2 = code[i++];
        }
        if ((flags & 0x02)) {
           x = arg1;
           y = arg2;
        } else {
           x = 0; y = 0; // TODO "they are points" ?
        }
        var scaleX = 1, scaleY = 1, scale01 = 0, scale10 = 0;
        if ((flags & 0x08)) {
          scaleX =
          scaleY = ((code[i] << 24) | (code[i + 1] << 16)) / 1073741824;
          i += 2;
        } else if ((flags & 0x40)) {
          scaleX = ((code[i] << 24) | (code[i + 1] << 16)) / 1073741824;
          scaleY = ((code[i + 2] << 24) | (code[i + 3] << 16)) / 1073741824;
          i += 4;
        } else if ((flags & 0x80)) {
          scaleX = ((code[i] << 24) | (code[i + 1] << 16)) / 1073741824;
          scale01 = ((code[i + 2] << 24) | (code[i + 3] << 16)) / 1073741824;
          scale10 = ((code[i + 4] << 24) | (code[i + 5] << 16)) / 1073741824;
          scaleY = ((code[i + 6] << 24) | (code[i + 7] << 16)) / 1073741824;
          i += 8;
        }
        var subglyph = font.glyphs[glyphIndex];
        if (subglyph) {
          cmds.push({cmd: 'save'});
          cmds.push({cmd: 'transform',
                     args: [scaleX, scale01, scale10, scaleY, x, y]});
          compileGlyf(subglyph, cmds, font);
          cmds.push({cmd: 'restore'});
        }
      } while ((flags & 0x20));
    } else {
      // simple glyph
      var endPtsOfContours = [];
      var j, jj;
      for (j = 0; j < numberOfContours; j++) {
        endPtsOfContours.push((code[i] << 8) | code[i + 1]);
        i += 2;
      }
      var instructionLength = (code[i] << 8) | code[i + 1];
      i += 2 + instructionLength; // skipping the instructions
      var numberOfPoints = endPtsOfContours[endPtsOfContours.length - 1] + 1;
      var points = [];
      while (points.length < numberOfPoints) {
        flags = code[i++];
        var repeat = 1;
        if ((flags & 0x08)) {
          repeat += code[i++];
        }
        while (repeat-- > 0) {
          points.push({flags: flags});
        }
      }
      for (j = 0; j < numberOfPoints; j++) {
        switch (points[j].flags & 0x12) {
          case 0x00:
            x += ((code[i] << 24) | (code[i + 1] << 16)) >> 16;
            i += 2;
            break;
          case 0x02:
            x -= code[i++];
            break;
          case 0x12:
            x += code[i++];
            break;
        }
        points[j].x = x;
      }
      for (j = 0; j < numberOfPoints; j++) {
        switch (points[j].flags & 0x24) {
          case 0x00:
            y += ((code[i] << 24) | (code[i + 1] << 16)) >> 16;
            i += 2;
            break;
          case 0x04:
            y -= code[i++];
            break;
          case 0x24:
            y += code[i++];
            break;
        }
        points[j].y = y;
      }

      var startPoint = 0;
      for (i = 0; i < numberOfContours; i++) {
        var endPoint = endPtsOfContours[i];
        // contours might have implicit points, which is located in the middle
        // between two neighboring off-curve points
        var contour = points.slice(startPoint, endPoint + 1);
        if ((contour[0].flags & 1)) {
          contour.push(contour[0]); // using start point at the contour end
        } else if ((contour[contour.length - 1].flags & 1)) {
          // first is off-curve point, trying to use one from the end
          contour.unshift(contour[contour.length - 1]);
        } else {
          // start and end are off-curve points, creating implicit one
          var p = {
            flags: 1,
            x: (contour[0].x + contour[contour.length - 1].x) / 2,
            y: (contour[0].y + contour[contour.length - 1].y) / 2
          };
          contour.unshift(p);
          contour.push(p);
        }
        moveTo(contour[0].x, contour[0].y);
        for (j = 1, jj = contour.length; j < jj; j++) {
          if ((contour[j].flags & 1)) {
            lineTo(contour[j].x, contour[j].y);
          } else if ((contour[j + 1].flags & 1)){
            quadraticCurveTo(contour[j].x, contour[j].y,
                             contour[j + 1].x, contour[j + 1].y);
            j++;
          } else {
            quadraticCurveTo(contour[j].x, contour[j].y,
              (contour[j].x + contour[j + 1].x) / 2,
              (contour[j].y + contour[j + 1].y) / 2);
          }
        }
        startPoint = endPoint + 1;
      }
    }
  }

  function compileCharString(code, cmds, font) {
    var stack = [];
    var x = 0, y = 0;
    var stems = 0;

    function moveTo(x, y) {
      cmds.push({cmd: 'moveTo', args: [x, y]});
    }
    function lineTo(x, y) {
      cmds.push({cmd: 'lineTo', args: [x, y]});
    }
    function bezierCurveTo(x1, y1, x2, y2, x, y) {
      cmds.push({cmd: 'bezierCurveTo', args: [x1, y1, x2, y2, x, y]});
    }

    function parse(code) {
      var i = 0;
      while (i < code.length) {
        var stackClean = false;
        var v = code[i++];
        var xa, xb, ya, yb, y1, y2, y3, n, subrCode;
        switch (v) {
          case 1: // hstem
            stems += stack.length >> 1;
            stackClean = true;
            break;
          case 3: // vstem
            stems += stack.length >> 1;
            stackClean = true;
            break;
          case 4: // vmoveto
            y += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;
          case 5: // rlineto
            while (stack.length > 0) {
              x += stack.shift();
              y += stack.shift();
              lineTo(x, y);
            }
            break;
          case 6: // hlineto
            while (stack.length > 0) {
              x += stack.shift();
              lineTo(x, y);
              if (stack.length === 0) {
                break;
              }
              y += stack.shift();
              lineTo(x, y);
            }
            break;
          case 7: // vlineto
            while (stack.length > 0) {
              y += stack.shift();
              lineTo(x, y);
              if (stack.length === 0) {
                break;
              }
              x += stack.shift();
              lineTo(x, y);
            }
            break;
          case 8: // rrcurveto
            while (stack.length > 0) {
              xa = x + stack.shift(); ya = y + stack.shift();
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb + stack.shift(); y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            break;
          case 10: // callsubr
            n = stack.pop() + font.subrsBias;
            subrCode = font.subrs[n];
            if (subrCode) {
              parse(subrCode);
            }
            break;
          case 11: // return
            return;
          case 12:
            v = code[i++];
            switch (v) {
              case 34: // flex
                xa = x + stack.shift();
                xb = xa + stack.shift(); y1 = y + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y, xb, y1, x, y1);
                xa = x + stack.shift();
                xb = xa + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y1, xb, y, x, y);
                break;
              case 35: // flex
                xa = x + stack.shift(); ya = y + stack.shift();
                xb = xa + stack.shift(); yb = ya + stack.shift();
                x = xb + stack.shift(); y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                xa = x + stack.shift(); ya = y + stack.shift();
                xb = xa + stack.shift(); yb = ya + stack.shift();
                x = xb + stack.shift(); y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                stack.pop(); // fd
                break;
              case 36: // hflex1
                xa = x + stack.shift(); y1 = y + stack.shift();
                xb = xa + stack.shift(); y2 = y1 + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y1, xb, y2, x, y2);
                xa = x + stack.shift();
                xb = xa + stack.shift(); y3 = y2 + stack.shift();
                x = xb + stack.shift();
                bezierCurveTo(xa, y2, xb, y3, x, y);
                break;
              case 37: // flex1
                var x0 = x, y0 = y;
                xa = x + stack.shift(); ya = y + stack.shift();
                xb = xa + stack.shift(); yb = ya + stack.shift();
                x = xb + stack.shift(); y = yb + stack.shift();
                bezierCurveTo(xa, ya, xb, yb, x, y);
                xa = x + stack.shift(); ya = y + stack.shift();
                xb = xa + stack.shift(); yb = ya + stack.shift();
                x = xb; y = yb;
                if (Math.abs(x - x0) > Math.abs(y - y0)) {
                  x += stack.shift();
                } else  {
                  y += stack.shift();
                }
                bezierCurveTo(xa, ya, xb, yb, x, y);
                break;
              default:
                error('unknown operator: 12 ' + v);
            }
            break;
          case 14: // endchar
            if (stack.length >= 4) {
              var achar = stack.pop();
              var bchar = stack.pop();
              y = stack.pop();
              x = stack.pop();
              cmds.push({cmd: 'save'});
              cmds.push({cmd: 'translate', args: [x, y]});
              var cmap = lookupCmap(font.cmap, String.fromCharCode(
                font.glyphNameMap[StandardEncoding[achar]]));
              compileCharString(font.glyphs[cmap.glyphId], cmds, font);
              cmds.push({cmd: 'restore'});

              cmap = lookupCmap(font.cmap, String.fromCharCode(
                font.glyphNameMap[StandardEncoding[bchar]]));
              compileCharString(font.glyphs[cmap.glyphId], cmds, font);
            }
            return;
          case 18: // hstemhm
            stems += stack.length >> 1;
            stackClean = true;
            break;
          case 19: // hintmask
            stems += stack.length >> 1;
            i += (stems + 7) >> 3;
            stackClean = true;
            break;
          case 20: // cntrmask
            stems += stack.length >> 1;
            i += (stems + 7) >> 3;
            stackClean = true;
            break;
          case 21: // rmoveto
            y += stack.pop();
            x += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;
          case 22: // hmoveto
            x += stack.pop();
            moveTo(x, y);
            stackClean = true;
            break;
          case 23: // vstemhm
            stems += stack.length >> 1;
            stackClean = true;
            break;
          case 24: // rcurveline
            while (stack.length > 2) {
              xa = x + stack.shift(); ya = y + stack.shift();
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb + stack.shift(); y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            x += stack.shift();
            y += stack.shift();
            lineTo(x, y);
            break;
          case 25: // rlinecurve
            while (stack.length > 6) {
              x += stack.shift();
              y += stack.shift();
              lineTo(x, y);
            }
            xa = x + stack.shift(); ya = y + stack.shift();
            xb = xa + stack.shift(); yb = ya + stack.shift();
            x = xb + stack.shift(); y = yb + stack.shift();
            bezierCurveTo(xa, ya, xb, yb, x, y);
            break;
          case 26: // vvcurveto
            if (stack.length % 2) {
              x += stack.shift();
            }
            while (stack.length > 0) {
              xa = x; ya = y + stack.shift();
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb; y = yb + stack.shift();
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            break;
          case 27: // hhcurveto
            if (stack.length % 2) {
              y += stack.shift();
            }
            while (stack.length > 0) {
              xa = x + stack.shift(); ya = y;
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb + stack.shift(); y = yb;
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            break;
          case 28:
            stack.push(((code[i] << 24) | (code[i + 1] << 16)) >> 16);
            i += 2;
            break;
          case 29: // callgsubr
            n = stack.pop() + font.gsubrsBias;
            subrCode = font.gsubrs[n];
            if (subrCode) {
              parse(subrCode);
            }
            break;
          case 30: // vhcurveto
            while (stack.length > 0) {
              xa = x; ya = y + stack.shift();
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
              if (stack.length === 0) {
                break;
              }

              xa = x + stack.shift(); ya = y;
              xb = xa + stack.shift(); yb = ya + stack.shift();
              y = yb + stack.shift();
              x = xb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            break;
          case 31: // hvcurveto
            while (stack.length > 0) {
              xa = x + stack.shift(); ya = y;
              xb = xa + stack.shift(); yb = ya + stack.shift();
              y = yb + stack.shift();
              x = xb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
              if (stack.length === 0) {
                break;
              }

              xa = x; ya = y + stack.shift();
              xb = xa + stack.shift(); yb = ya + stack.shift();
              x = xb + stack.shift();
              y = yb + (stack.length === 1 ? stack.shift() : 0);
              bezierCurveTo(xa, ya, xb, yb, x, y);
            }
            break;
          default:
            if (v < 32) {
              error('unknown operator: ' + v);
            }
            if (v < 247) {
              stack.push(v - 139);
            } else if (v < 251) {
              stack.push((v - 247) * 256 + code[i++] + 108);
            } else if (v < 255) {
              stack.push(-(v - 251) * 256 - code[i++] - 108);
            } else {
              stack.push(((code[i] << 24) | (code[i + 1] << 16) |
                         (code[i + 2] << 8) | code[i + 3]) / 65536);
              i += 4;
            }
            break;
        }
        if (stackClean) {
          stack.length = 0;
        }
      }
    }
    parse(code);
  }

  var noop = '';

  function CompiledFont(fontMatrix) {
    this.compiledGlyphs = Object.create(null);
    this.compiledCharCodeToGlyphId = Object.create(null);
    this.fontMatrix = fontMatrix;
  }
  CompiledFont.prototype = {
    getPathJs: function (unicode) {
      var cmap = lookupCmap(this.cmap, unicode);
      var fn = this.compiledGlyphs[cmap.glyphId];
      if (!fn) {
        fn = this.compileGlyph(this.glyphs[cmap.glyphId]);
        this.compiledGlyphs[cmap.glyphId] = fn;
      }
      if (this.compiledCharCodeToGlyphId[cmap.charCode] === undefined) {
        this.compiledCharCodeToGlyphId[cmap.charCode] = cmap.glyphId;
      }
      return fn;
    },

    compileGlyph: function (code) {
      if (!code || code.length === 0 || code[0] === 14) {
        return noop;
      }

      var cmds = [];
      cmds.push({cmd: 'save'});
      cmds.push({cmd: 'transform', args: this.fontMatrix.slice()});
      cmds.push({cmd: 'scale', args: ['size', '-size']});

      this.compileGlyphImpl(code, cmds);

      cmds.push({cmd: 'restore'});

      return cmds;
    },

    compileGlyphImpl: function () {
      error('Children classes should implement this.');
    },

    hasBuiltPath: function (unicode) {
      var cmap = lookupCmap(this.cmap, unicode);
      return (this.compiledGlyphs[cmap.glyphId] !== undefined &&
              this.compiledCharCodeToGlyphId[cmap.charCode] !== undefined);
    }
  };

  function TrueTypeCompiled(glyphs, cmap, fontMatrix) {
    fontMatrix = fontMatrix || [0.000488, 0, 0, 0.000488, 0, 0];
    CompiledFont.call(this, fontMatrix);

    this.glyphs = glyphs;
    this.cmap = cmap;
  }

  Util.inherit(TrueTypeCompiled, CompiledFont, {
    compileGlyphImpl: function (code, cmds) {
      compileGlyf(code, cmds, this);
    }
  });

  function Type2Compiled(cffInfo, cmap, fontMatrix, glyphNameMap) {
    fontMatrix = fontMatrix || [0.001, 0, 0, 0.001, 0, 0];
    CompiledFont.call(this, fontMatrix);

    this.glyphs = cffInfo.glyphs;
    this.gsubrs = cffInfo.gsubrs || [];
    this.subrs = cffInfo.subrs || [];
    this.cmap = cmap;
    this.glyphNameMap = glyphNameMap || getGlyphsUnicode();

    this.gsubrsBias = (this.gsubrs.length < 1240 ?
                       107 : (this.gsubrs.length < 33900 ? 1131 : 32768));
    this.subrsBias = (this.subrs.length < 1240 ?
                      107 : (this.subrs.length < 33900 ? 1131 : 32768));
  }

  Util.inherit(Type2Compiled, CompiledFont, {
    compileGlyphImpl: function (code, cmds) {
      compileCharString(code, cmds, this);
    }
  });


  return {
    create: function FontRendererFactory_create(font, seacAnalysisEnabled) {
      var data = new Uint8Array(font.data);
      var cmap, glyf, loca, cff, indexToLocFormat, unitsPerEm;
      var numTables = getUshort(data, 4);
      for (var i = 0, p = 12; i < numTables; i++, p += 16) {
        var tag = bytesToString(data.subarray(p, p + 4));
        var offset = getLong(data, p + 8);
        var length = getLong(data, p + 12);
        switch (tag) {
          case 'cmap':
            cmap = parseCmap(data, offset, offset + length);
            break;
          case 'glyf':
            glyf = data.subarray(offset, offset + length);
            break;
          case 'loca':
            loca = data.subarray(offset, offset + length);
            break;
          case 'head':
            unitsPerEm = getUshort(data, offset + 18);
            indexToLocFormat = getUshort(data, offset + 50);
            break;
          case 'CFF ':
            cff = parseCff(data, offset, offset + length, seacAnalysisEnabled);
            break;
        }
      }

      if (glyf) {
        var fontMatrix = (!unitsPerEm ? font.fontMatrix :
                          [1 / unitsPerEm, 0, 0, 1 / unitsPerEm, 0, 0]);
        return new TrueTypeCompiled(
          parseGlyfTable(glyf, loca, indexToLocFormat), cmap, fontMatrix);
      } else {
        return new Type2Compiled(cff, cmap, font.fontMatrix, font.glyphNameMap);
      }
    }
  };
})();

exports.FontRendererFactory = FontRendererFactory;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreParser = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCoreStream);
  }
}(this, function (exports, sharedUtil, corePrimitives, coreStream) {

var MissingDataException = sharedUtil.MissingDataException;
var StreamType = sharedUtil.StreamType;
var assert = sharedUtil.assert;
var error = sharedUtil.error;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var isInt = sharedUtil.isInt;
var isNum = sharedUtil.isNum;
var isString = sharedUtil.isString;
var warn = sharedUtil.warn;
var Cmd = corePrimitives.Cmd;
var Dict = corePrimitives.Dict;
var Name = corePrimitives.Name;
var Ref = corePrimitives.Ref;
var isCmd = corePrimitives.isCmd;
var isDict = corePrimitives.isDict;
var isName = corePrimitives.isName;
var Ascii85Stream = coreStream.Ascii85Stream;
var AsciiHexStream = coreStream.AsciiHexStream;
var CCITTFaxStream = coreStream.CCITTFaxStream;
var FlateStream = coreStream.FlateStream;
var Jbig2Stream = coreStream.Jbig2Stream;
var JpegStream = coreStream.JpegStream;
var JpxStream = coreStream.JpxStream;
var LZWStream = coreStream.LZWStream;
var NullStream = coreStream.NullStream;
var PredictorStream = coreStream.PredictorStream;
var RunLengthStream = coreStream.RunLengthStream;

var EOF = {};

function isEOF(v) {
  return (v === EOF);
}

var MAX_LENGTH_TO_CACHE = 1000;

var Parser = (function ParserClosure() {
  function Parser(lexer, allowStreams, xref) {
    this.lexer = lexer;
    this.allowStreams = allowStreams;
    this.xref = xref;
    this.imageCache = Object.create(null);
    this.refill();
  }

  Parser.prototype = {
    refill: function Parser_refill() {
      this.buf1 = this.lexer.getObj();
      this.buf2 = this.lexer.getObj();
    },
    shift: function Parser_shift() {
      if (isCmd(this.buf2, 'ID')) {
        this.buf1 = this.buf2;
        this.buf2 = null;
      } else {
        this.buf1 = this.buf2;
        this.buf2 = this.lexer.getObj();
      }
    },
    tryShift: function Parser_tryShift() {
      try {
        this.shift();
        return true;
      } catch (e) {
        if (e instanceof MissingDataException) {
          throw e;
        }
        // Upon failure, the caller should reset this.lexer.pos to a known good
        // state and call this.shift() twice to reset the buffers.
        return false;
      }
    },
    getObj: function Parser_getObj(cipherTransform) {
      var buf1 = this.buf1;
      this.shift();

      if (buf1 instanceof Cmd) {
        switch (buf1.cmd) {
          case 'BI': // inline image
            return this.makeInlineImage(cipherTransform);
          case '[': // array
            var array = [];
            while (!isCmd(this.buf1, ']') && !isEOF(this.buf1)) {
              array.push(this.getObj(cipherTransform));
            }
            if (isEOF(this.buf1)) {
              error('End of file inside array');
            }
            this.shift();
            return array;
          case '<<': // dictionary or stream
            var dict = new Dict(this.xref);
            while (!isCmd(this.buf1, '>>') && !isEOF(this.buf1)) {
              if (!isName(this.buf1)) {
                info('Malformed dictionary: key must be a name object');
                this.shift();
                continue;
              }

              var key = this.buf1.name;
              this.shift();
              if (isEOF(this.buf1)) {
                break;
              }
              dict.set(key, this.getObj(cipherTransform));
            }
            if (isEOF(this.buf1)) {
              error('End of file inside dictionary');
            }

            // Stream objects are not allowed inside content streams or
            // object streams.
            if (isCmd(this.buf2, 'stream')) {
              return (this.allowStreams ?
                      this.makeStream(dict, cipherTransform) : dict);
            }
            this.shift();
            return dict;
          default: // simple object
            return buf1;
        }
      }

      if (isInt(buf1)) { // indirect reference or integer
        var num = buf1;
        if (isInt(this.buf1) && isCmd(this.buf2, 'R')) {
          var ref = new Ref(num, this.buf1);
          this.shift();
          this.shift();
          return ref;
        }
        return num;
      }

      if (isString(buf1)) { // string
        var str = buf1;
        if (cipherTransform) {
          str = cipherTransform.decryptString(str);
        }
        return str;
      }

      // simple object
      return buf1;
    },
    /**
     * Find the end of the stream by searching for the /EI\s/.
     * @returns {number} The inline stream length.
     */
    findDefaultInlineStreamEnd:
        function Parser_findDefaultInlineStreamEnd(stream) {
      var E = 0x45, I = 0x49, SPACE = 0x20, LF = 0xA, CR = 0xD;
      var startPos = stream.pos, state = 0, ch, i, n, followingBytes;
      while ((ch = stream.getByte()) !== -1) {
        if (state === 0) {
          state = (ch === E) ? 1 : 0;
        } else if (state === 1) {
          state = (ch === I) ? 2 : 0;
        } else {
          assert(state === 2);
          if (ch === SPACE || ch === LF || ch === CR) {
            // Let's check the next five bytes are ASCII... just be sure.
            n = 5;
            followingBytes = stream.peekBytes(n);
            for (i = 0; i < n; i++) {
              ch = followingBytes[i];
              if (ch !== LF && ch !== CR && (ch < SPACE || ch > 0x7F)) {
                // Not a LF, CR, SPACE or any visible ASCII character, i.e.
                // it's binary stuff. Resetting the state.
                state = 0;
                break;
              }
            }
            if (state === 2) {
              break;  // Finished!
            }
          } else {
            state = 0;
          }
        }
      }
      return ((stream.pos - 4) - startPos);
    },
    /**
     * Find the EOI (end-of-image) marker 0xFFD9 of the stream.
     * @returns {number} The inline stream length.
     */
    findDCTDecodeInlineStreamEnd:
        function Parser_findDCTDecodeInlineStreamEnd(stream) {
      var startPos = stream.pos, foundEOI = false, b, markerLength, length;
      while ((b = stream.getByte()) !== -1) {
        if (b !== 0xFF) { // Not a valid marker.
          continue;
        }
        switch (stream.getByte()) {
          case 0x00: // Byte stuffing.
            // 0xFF00 appears to be a very common byte sequence in JPEG images.
            break;

          case 0xFF: // Fill byte.
            // Avoid skipping a valid marker, resetting the stream position.
            stream.skip(-1);
            break;

          case 0xD9: // EOI
            foundEOI = true;
            break;

          case 0xC0: // SOF0
          case 0xC1: // SOF1
          case 0xC2: // SOF2
          case 0xC3: // SOF3

          case 0xC5: // SOF5
          case 0xC6: // SOF6
          case 0xC7: // SOF7

          case 0xC9: // SOF9
          case 0xCA: // SOF10
          case 0xCB: // SOF11

          case 0xCD: // SOF13
          case 0xCE: // SOF14
          case 0xCF: // SOF15

          case 0xC4: // DHT
          case 0xCC: // DAC

          case 0xDA: // SOS
          case 0xDB: // DQT
          case 0xDC: // DNL
          case 0xDD: // DRI
          case 0xDE: // DHP
          case 0xDF: // EXP

          case 0xE0: // APP0
          case 0xE1: // APP1
          case 0xE2: // APP2
          case 0xE3: // APP3
          case 0xE4: // APP4
          case 0xE5: // APP5
          case 0xE6: // APP6
          case 0xE7: // APP7
          case 0xE8: // APP8
          case 0xE9: // APP9
          case 0xEA: // APP10
          case 0xEB: // APP11
          case 0xEC: // APP12
          case 0xED: // APP13
          case 0xEE: // APP14
          case 0xEF: // APP15

          case 0xFE: // COM
            // The marker should be followed by the length of the segment.
            markerLength = stream.getUint16();
            if (markerLength > 2) {
              // |markerLength| contains the byte length of the marker segment,
              // including its own length (2 bytes) and excluding the marker.
              stream.skip(markerLength - 2); // Jump to the next marker.
            } else {
              // The marker length is invalid, resetting the stream position.
              stream.skip(-2);
            }
            break;
        }
        if (foundEOI) {
          break;
        }
      }
      length = stream.pos - startPos;
      if (b === -1) {
        warn('Inline DCTDecode image stream: ' +
             'EOI marker not found, searching for /EI/ instead.');
        stream.skip(-length); // Reset the stream position.
        return this.findDefaultInlineStreamEnd(stream);
      }
      this.inlineStreamSkipEI(stream);
      return length;
    },
    /**
     * Find the EOD (end-of-data) marker '~>' (i.e. TILDE + GT) of the stream.
     * @returns {number} The inline stream length.
     */
    findASCII85DecodeInlineStreamEnd:
        function Parser_findASCII85DecodeInlineStreamEnd(stream) {
      var TILDE = 0x7E, GT = 0x3E;
      var startPos = stream.pos, ch, length;
      while ((ch = stream.getByte()) !== -1) {
        if (ch === TILDE && stream.peekByte() === GT) {
          stream.skip();
          break;
        }
      }
      length = stream.pos - startPos;
      if (ch === -1) {
        warn('Inline ASCII85Decode image stream: ' +
             'EOD marker not found, searching for /EI/ instead.');
        stream.skip(-length); // Reset the stream position.
        return this.findDefaultInlineStreamEnd(stream);
      }
      this.inlineStreamSkipEI(stream);
      return length;
    },
    /**
     * Find the EOD (end-of-data) marker '>' (i.e. GT) of the stream.
     * @returns {number} The inline stream length.
     */
    findASCIIHexDecodeInlineStreamEnd:
        function Parser_findASCIIHexDecodeInlineStreamEnd(stream) {
      var GT = 0x3E;
      var startPos = stream.pos, ch, length;
      while ((ch = stream.getByte()) !== -1) {
        if (ch === GT) {
          break;
        }
      }
      length = stream.pos - startPos;
      if (ch === -1) {
        warn('Inline ASCIIHexDecode image stream: ' +
             'EOD marker not found, searching for /EI/ instead.');
        stream.skip(-length); // Reset the stream position.
        return this.findDefaultInlineStreamEnd(stream);
      }
      this.inlineStreamSkipEI(stream);
      return length;
    },
    /**
     * Skip over the /EI/ for streams where we search for an EOD marker.
     */
    inlineStreamSkipEI: function Parser_inlineStreamSkipEI(stream) {
      var E = 0x45, I = 0x49;
      var state = 0, ch;
      while ((ch = stream.getByte()) !== -1) {
        if (state === 0) {
          state = (ch === E) ? 1 : 0;
        } else if (state === 1) {
          state = (ch === I) ? 2 : 0;
        } else if (state === 2) {
          break;
        }
      }
    },
    makeInlineImage: function Parser_makeInlineImage(cipherTransform) {
      var lexer = this.lexer;
      var stream = lexer.stream;

      // Parse dictionary.
      var dict = new Dict(this.xref);
      while (!isCmd(this.buf1, 'ID') && !isEOF(this.buf1)) {
        if (!isName(this.buf1)) {
          error('Dictionary key must be a name object');
        }
        var key = this.buf1.name;
        this.shift();
        if (isEOF(this.buf1)) {
          break;
        }
        dict.set(key, this.getObj(cipherTransform));
      }

      // Extract the name of the first (i.e. the current) image filter.
      var filter = dict.get('Filter', 'F'), filterName;
      if (isName(filter)) {
        filterName = filter.name;
      } else if (isArray(filter) && isName(filter[0])) {
        filterName = filter[0].name;
      }

      // Parse image stream.
      var startPos = stream.pos, length, i, ii;
      if (filterName === 'DCTDecode' || filterName === 'DCT') {
        length = this.findDCTDecodeInlineStreamEnd(stream);
      } else if (filterName === 'ASCII85Decide' || filterName === 'A85') {
        length = this.findASCII85DecodeInlineStreamEnd(stream);
      } else if (filterName === 'ASCIIHexDecode' || filterName === 'AHx') {
        length = this.findASCIIHexDecodeInlineStreamEnd(stream);
      } else {
        length = this.findDefaultInlineStreamEnd(stream);
      }
      var imageStream = stream.makeSubStream(startPos, length, dict);

      // Cache all images below the MAX_LENGTH_TO_CACHE threshold by their
      // adler32 checksum.
      var adler32;
      if (length < MAX_LENGTH_TO_CACHE) {
        var imageBytes = imageStream.getBytes();
        imageStream.reset();

        var a = 1;
        var b = 0;
        for (i = 0, ii = imageBytes.length; i < ii; ++i) {
          // No modulo required in the loop if imageBytes.length < 5552.
          a += imageBytes[i] & 0xff;
          b += a;
        }
        adler32 = ((b % 65521) << 16) | (a % 65521);

        if (this.imageCache.adler32 === adler32) {
          this.buf2 = Cmd.get('EI');
          this.shift();

          this.imageCache[adler32].reset();
          return this.imageCache[adler32];
        }
      }

      if (cipherTransform) {
        imageStream = cipherTransform.createStream(imageStream, length);
      }

      imageStream = this.filter(imageStream, dict, length);
      imageStream.dict = dict;
      if (adler32 !== undefined) {
        imageStream.cacheKey = 'inline_' + length + '_' + adler32;
        this.imageCache[adler32] = imageStream;
      }

      this.buf2 = Cmd.get('EI');
      this.shift();

      return imageStream;
    },
    makeStream: function Parser_makeStream(dict, cipherTransform) {
      var lexer = this.lexer;
      var stream = lexer.stream;

      // get stream start position
      lexer.skipToNextLine();
      var pos = stream.pos - 1;

      // get length
      var length = dict.get('Length');
      if (!isInt(length)) {
        info('Bad ' + length + ' attribute in stream');
        length = 0;
      }

      // skip over the stream data
      stream.pos = pos + length;
      lexer.nextChar();

      // Shift '>>' and check whether the new object marks the end of the stream
      if (this.tryShift() && isCmd(this.buf2, 'endstream')) {
        this.shift(); // 'stream'
      } else {
        // bad stream length, scanning for endstream
        stream.pos = pos;
        var SCAN_BLOCK_SIZE = 2048;
        var ENDSTREAM_SIGNATURE_LENGTH = 9;
        var ENDSTREAM_SIGNATURE = [0x65, 0x6E, 0x64, 0x73, 0x74, 0x72, 0x65,
                                   0x61, 0x6D];
        var skipped = 0, found = false, i, j;
        while (stream.pos < stream.end) {
          var scanBytes = stream.peekBytes(SCAN_BLOCK_SIZE);
          var scanLength = scanBytes.length - ENDSTREAM_SIGNATURE_LENGTH;
          if (scanLength <= 0) {
            break;
          }
          found = false;
          i = 0;
          while (i < scanLength) {
            j = 0;
            while (j < ENDSTREAM_SIGNATURE_LENGTH &&
                   scanBytes[i + j] === ENDSTREAM_SIGNATURE[j]) {
              j++;
            }
            if (j >= ENDSTREAM_SIGNATURE_LENGTH) {
              found = true;
              break;
            }
            i++;
          }
          if (found) {
            skipped += i;
            stream.pos += i;
            break;
          }
          skipped += scanLength;
          stream.pos += scanLength;
        }
        if (!found) {
          error('Missing endstream');
        }
        length = skipped;

        lexer.nextChar();
        this.shift();
        this.shift();
      }
      this.shift(); // 'endstream'

      stream = stream.makeSubStream(pos, length, dict);
      if (cipherTransform) {
        stream = cipherTransform.createStream(stream, length);
      }
      stream = this.filter(stream, dict, length);
      stream.dict = dict;
      return stream;
    },
    filter: function Parser_filter(stream, dict, length) {
      var filter = dict.get('Filter', 'F');
      var params = dict.get('DecodeParms', 'DP');
      if (isName(filter)) {
        return this.makeFilter(stream, filter.name, length, params);
      }

      var maybeLength = length;
      if (isArray(filter)) {
        var filterArray = filter;
        var paramsArray = params;
        for (var i = 0, ii = filterArray.length; i < ii; ++i) {
          filter = filterArray[i];
          if (!isName(filter)) {
            error('Bad filter name: ' + filter);
          }

          params = null;
          if (isArray(paramsArray) && (i in paramsArray)) {
            params = paramsArray[i];
          }
          stream = this.makeFilter(stream, filter.name, maybeLength, params);
          // after the first stream the length variable is invalid
          maybeLength = null;
        }
      }
      return stream;
    },
    makeFilter: function Parser_makeFilter(stream, name, maybeLength, params) {
      if (stream.dict.get('Length') === 0 && !maybeLength) {
        warn('Empty "' + name + '" stream.');
        return new NullStream(stream);
      }
      try {
        if (params && this.xref) {
          params = this.xref.fetchIfRef(params);
        }
        var xrefStreamStats = this.xref.stats.streamTypes;
        if (name === 'FlateDecode' || name === 'Fl') {
          xrefStreamStats[StreamType.FLATE] = true;
          if (params) {
            return new PredictorStream(new FlateStream(stream, maybeLength),
                                       maybeLength, params);
          }
          return new FlateStream(stream, maybeLength);
        }
        if (name === 'LZWDecode' || name === 'LZW') {
          xrefStreamStats[StreamType.LZW] = true;
          var earlyChange = 1;
          if (params) {
            if (params.has('EarlyChange')) {
              earlyChange = params.get('EarlyChange');
            }
            return new PredictorStream(
              new LZWStream(stream, maybeLength, earlyChange),
              maybeLength, params);
          }
          return new LZWStream(stream, maybeLength, earlyChange);
        }
        if (name === 'DCTDecode' || name === 'DCT') {
          xrefStreamStats[StreamType.DCT] = true;
          return new JpegStream(stream, maybeLength, stream.dict, this.xref);
        }
        if (name === 'JPXDecode' || name === 'JPX') {
          xrefStreamStats[StreamType.JPX] = true;
          return new JpxStream(stream, maybeLength, stream.dict);
        }
        if (name === 'ASCII85Decode' || name === 'A85') {
          xrefStreamStats[StreamType.A85] = true;
          return new Ascii85Stream(stream, maybeLength);
        }
        if (name === 'ASCIIHexDecode' || name === 'AHx') {
          xrefStreamStats[StreamType.AHX] = true;
          return new AsciiHexStream(stream, maybeLength);
        }
        if (name === 'CCITTFaxDecode' || name === 'CCF') {
          xrefStreamStats[StreamType.CCF] = true;
          return new CCITTFaxStream(stream, maybeLength, params);
        }
        if (name === 'RunLengthDecode' || name === 'RL') {
          xrefStreamStats[StreamType.RL] = true;
          return new RunLengthStream(stream, maybeLength);
        }
        if (name === 'JBIG2Decode') {
          xrefStreamStats[StreamType.JBIG] = true;
          return new Jbig2Stream(stream, maybeLength, stream.dict);
        }
        warn('filter "' + name + '" not supported yet');
        return stream;
      } catch (ex) {
        if (ex instanceof MissingDataException) {
          throw ex;
        }
        warn('Invalid stream: \"' + ex + '\"');
        return new NullStream(stream);
      }
    }
  };

  return Parser;
})();

var Lexer = (function LexerClosure() {
  function Lexer(stream, knownCommands) {
    this.stream = stream;
    this.nextChar();

    // While lexing, we build up many strings one char at a time. Using += for
    // this can result in lots of garbage strings. It's better to build an
    // array of single-char strings and then join() them together at the end.
    // And reusing a single array (i.e. |this.strBuf|) over and over for this
    // purpose uses less memory than using a new array for each string.
    this.strBuf = [];

    // The PDFs might have "glued" commands with other commands, operands or
    // literals, e.g. "q1". The knownCommands is a dictionary of the valid
    // commands and their prefixes. The prefixes are built the following way:
    // if there a command that is a prefix of the other valid command or
    // literal (e.g. 'f' and 'false') the following prefixes must be included,
    // 'fa', 'fal', 'fals'. The prefixes are not needed, if the command has no
    // other commands or literals as a prefix. The knowCommands is optional.
    this.knownCommands = knownCommands;
  }

  // A '1' in this array means the character is white space. A '1' or
  // '2' means the character ends a name or command.
  var specialChars = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, // 0x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1x
    1, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, // 2x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, // 3x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, // 5x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, // 7x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 8x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 9x
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // ax
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // bx
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // cx
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // dx
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // ex
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  // fx
  ];

  function toHexDigit(ch) {
    if (ch >= 0x30 && ch <= 0x39) { // '0'-'9'
      return ch & 0x0F;
    }
    if ((ch >= 0x41 && ch <= 0x46) || (ch >= 0x61 && ch <= 0x66)) {
      // 'A'-'F', 'a'-'f'
      return (ch & 0x0F) + 9;
    }
    return -1;
  }

  Lexer.prototype = {
    nextChar: function Lexer_nextChar() {
      return (this.currentChar = this.stream.getByte());
    },
    peekChar: function Lexer_peekChar() {
      return this.stream.peekByte();
    },
    getNumber: function Lexer_getNumber() {
      var ch = this.currentChar;
      var eNotation = false;
      var divideBy = 0; // different from 0 if it's a floating point value
      var sign = 1;

      if (ch === 0x2D) { // '-'
        sign = -1;
        ch = this.nextChar();

        if (ch === 0x2D) { // '-'
          // Ignore double negative (this is consistent with Adobe Reader).
          ch = this.nextChar();
        }
      } else if (ch === 0x2B) { // '+'
        ch = this.nextChar();
      }
      if (ch === 0x2E) { // '.'
        divideBy = 10;
        ch = this.nextChar();
      }
      if (ch < 0x30 || ch > 0x39) { // '0' - '9'
        error('Invalid number: ' + String.fromCharCode(ch));
        return 0;
      }

      var baseValue = ch - 0x30; // '0'
      var powerValue = 0;
      var powerValueSign = 1;

      while ((ch = this.nextChar()) >= 0) {
        if (0x30 <= ch && ch <= 0x39) { // '0' - '9'
          var currentDigit = ch - 0x30; // '0'
          if (eNotation) { // We are after an 'e' or 'E'
            powerValue = powerValue * 10 + currentDigit;
          } else {
            if (divideBy !== 0) { // We are after a point
              divideBy *= 10;
            }
            baseValue = baseValue * 10 + currentDigit;
          }
        } else if (ch === 0x2E) { // '.'
          if (divideBy === 0) {
            divideBy = 1;
          } else {
            // A number can have only one '.'
            break;
          }
        } else if (ch === 0x2D) { // '-'
          // ignore minus signs in the middle of numbers to match
          // Adobe's behavior
          warn('Badly formated number');
        } else if (ch === 0x45 || ch === 0x65) { // 'E', 'e'
          // 'E' can be either a scientific notation or the beginning of a new
          // operator
          ch = this.peekChar();
          if (ch === 0x2B || ch === 0x2D) { // '+', '-'
            powerValueSign = (ch === 0x2D) ? -1 : 1;
            this.nextChar(); // Consume the sign character
          } else if (ch < 0x30 || ch > 0x39) { // '0' - '9'
            // The 'E' must be the beginning of a new operator
            break;
          }
          eNotation = true;
        } else {
          // the last character doesn't belong to us
          break;
        }
      }

      if (divideBy !== 0) {
        baseValue /= divideBy;
      }
      if (eNotation) {
        baseValue *= Math.pow(10, powerValueSign * powerValue);
      }
      return sign * baseValue;
    },
    getString: function Lexer_getString() {
      var numParen = 1;
      var done = false;
      var strBuf = this.strBuf;
      strBuf.length = 0;

      var ch = this.nextChar();
      while (true) {
        var charBuffered = false;
        switch (ch | 0) {
          case -1:
            warn('Unterminated string');
            done = true;
            break;
          case 0x28: // '('
            ++numParen;
            strBuf.push('(');
            break;
          case 0x29: // ')'
            if (--numParen === 0) {
              this.nextChar(); // consume strings ')'
              done = true;
            } else {
              strBuf.push(')');
            }
            break;
          case 0x5C: // '\\'
            ch = this.nextChar();
            switch (ch) {
              case -1:
                warn('Unterminated string');
                done = true;
                break;
              case 0x6E: // 'n'
                strBuf.push('\n');
                break;
              case 0x72: // 'r'
                strBuf.push('\r');
                break;
              case 0x74: // 't'
                strBuf.push('\t');
                break;
              case 0x62: // 'b'
                strBuf.push('\b');
                break;
              case 0x66: // 'f'
                strBuf.push('\f');
                break;
              case 0x5C: // '\'
              case 0x28: // '('
              case 0x29: // ')'
                strBuf.push(String.fromCharCode(ch));
                break;
              case 0x30: case 0x31: case 0x32: case 0x33: // '0'-'3'
              case 0x34: case 0x35: case 0x36: case 0x37: // '4'-'7'
                var x = ch & 0x0F;
                ch = this.nextChar();
                charBuffered = true;
                if (ch >= 0x30 && ch <= 0x37) { // '0'-'7'
                  x = (x << 3) + (ch & 0x0F);
                  ch = this.nextChar();
                  if (ch >= 0x30 && ch <= 0x37) {  // '0'-'7'
                    charBuffered = false;
                    x = (x << 3) + (ch & 0x0F);
                  }
                }
                strBuf.push(String.fromCharCode(x));
                break;
              case 0x0D: // CR
                if (this.peekChar() === 0x0A) { // LF
                  this.nextChar();
                }
                break;
              case 0x0A: // LF
                break;
              default:
                strBuf.push(String.fromCharCode(ch));
                break;
            }
            break;
          default:
            strBuf.push(String.fromCharCode(ch));
            break;
        }
        if (done) {
          break;
        }
        if (!charBuffered) {
          ch = this.nextChar();
        }
      }
      return strBuf.join('');
    },
    getName: function Lexer_getName() {
      var ch, previousCh;
      var strBuf = this.strBuf;
      strBuf.length = 0;
      while ((ch = this.nextChar()) >= 0 && !specialChars[ch]) {
        if (ch === 0x23) { // '#'
          ch = this.nextChar();
          if (specialChars[ch]) {
            warn('Lexer_getName: ' +
                 'NUMBER SIGN (#) should be followed by a hexadecimal number.');
            strBuf.push('#');
            break;
          }
          var x = toHexDigit(ch);
          if (x !== -1) {
            previousCh = ch;
            ch = this.nextChar();
            var x2 = toHexDigit(ch);
            if (x2 === -1) {
              warn('Lexer_getName: Illegal digit (' +
                   String.fromCharCode(ch) +') in hexadecimal number.');
              strBuf.push('#', String.fromCharCode(previousCh));
              if (specialChars[ch]) {
                break;
              }
              strBuf.push(String.fromCharCode(ch));
              continue;
            }
            strBuf.push(String.fromCharCode((x << 4) | x2));
          } else {
            strBuf.push('#', String.fromCharCode(ch));
          }
        } else {
          strBuf.push(String.fromCharCode(ch));
        }
      }
      if (strBuf.length > 127) {
        warn('name token is longer than allowed by the spec: ' + strBuf.length);
      }
      return Name.get(strBuf.join(''));
    },
    getHexString: function Lexer_getHexString() {
      var strBuf = this.strBuf;
      strBuf.length = 0;
      var ch = this.currentChar;
      var isFirstHex = true;
      var firstDigit;
      var secondDigit;
      while (true) {
        if (ch < 0) {
          warn('Unterminated hex string');
          break;
        } else if (ch === 0x3E) { // '>'
          this.nextChar();
          break;
        } else if (specialChars[ch] === 1) {
          ch = this.nextChar();
          continue;
        } else {
          if (isFirstHex) {
            firstDigit = toHexDigit(ch);
            if (firstDigit === -1) {
              warn('Ignoring invalid character "' + ch + '" in hex string');
              ch = this.nextChar();
              continue;
            }
          } else {
            secondDigit = toHexDigit(ch);
            if (secondDigit === -1) {
              warn('Ignoring invalid character "' + ch + '" in hex string');
              ch = this.nextChar();
              continue;
            }
            strBuf.push(String.fromCharCode((firstDigit << 4) | secondDigit));
          }
          isFirstHex = !isFirstHex;
          ch = this.nextChar();
        }
      }
      return strBuf.join('');
    },
    getObj: function Lexer_getObj() {
      // skip whitespace and comments
      var comment = false;
      var ch = this.currentChar;
      while (true) {
        if (ch < 0) {
          return EOF;
        }
        if (comment) {
          if (ch === 0x0A || ch === 0x0D) { // LF, CR
            comment = false;
          }
        } else if (ch === 0x25) { // '%'
          comment = true;
        } else if (specialChars[ch] !== 1) {
          break;
        }
        ch = this.nextChar();
      }

      // start reading token
      switch (ch | 0) {
        case 0x30: case 0x31: case 0x32: case 0x33: case 0x34: // '0'-'4'
        case 0x35: case 0x36: case 0x37: case 0x38: case 0x39: // '5'-'9'
        case 0x2B: case 0x2D: case 0x2E: // '+', '-', '.'
          return this.getNumber();
        case 0x28: // '('
          return this.getString();
        case 0x2F: // '/'
          return this.getName();
        // array punctuation
        case 0x5B: // '['
          this.nextChar();
          return Cmd.get('[');
        case 0x5D: // ']'
          this.nextChar();
          return Cmd.get(']');
        // hex string or dict punctuation
        case 0x3C: // '<'
          ch = this.nextChar();
          if (ch === 0x3C) {
            // dict punctuation
            this.nextChar();
            return Cmd.get('<<');
          }
          return this.getHexString();
        // dict punctuation
        case 0x3E: // '>'
          ch = this.nextChar();
          if (ch === 0x3E) {
            this.nextChar();
            return Cmd.get('>>');
          }
          return Cmd.get('>');
        case 0x7B: // '{'
          this.nextChar();
          return Cmd.get('{');
        case 0x7D: // '}'
          this.nextChar();
          return Cmd.get('}');
        case 0x29: // ')'
          error('Illegal character: ' + ch);
          break;
      }

      // command
      var str = String.fromCharCode(ch);
      var knownCommands = this.knownCommands;
      var knownCommandFound = knownCommands && knownCommands[str] !== undefined;
      while ((ch = this.nextChar()) >= 0 && !specialChars[ch]) {
        // stop if known command is found and next character does not make
        // the str a command
        var possibleCommand = str + String.fromCharCode(ch);
        if (knownCommandFound && knownCommands[possibleCommand] === undefined) {
          break;
        }
        if (str.length === 128) {
          error('Command token too long: ' + str.length);
        }
        str = possibleCommand;
        knownCommandFound = knownCommands && knownCommands[str] !== undefined;
      }
      if (str === 'true') {
        return true;
      }
      if (str === 'false') {
        return false;
      }
      if (str === 'null') {
        return null;
      }
      return Cmd.get(str);
    },
    skipToNextLine: function Lexer_skipToNextLine() {
      var ch = this.currentChar;
      while (ch >= 0) {
        if (ch === 0x0D) { // CR
          ch = this.nextChar();
          if (ch === 0x0A) { // LF
            this.nextChar();
          }
          break;
        } else if (ch === 0x0A) { // LF
          this.nextChar();
          break;
        }
        ch = this.nextChar();
      }
    }
  };

  return Lexer;
})();

var Linearization = {
  create: function LinearizationCreate(stream) {
    function getInt(name, allowZeroValue) {
      var obj = linDict.get(name);
      if (isInt(obj) && (allowZeroValue ? obj >= 0 : obj > 0)) {
        return obj;
      }
      throw new Error('The "' + name + '" parameter in the linearization ' +
                      'dictionary is invalid.');
    }
    function getHints() {
      var hints = linDict.get('H'), hintsLength, item;
      if (isArray(hints) &&
          ((hintsLength = hints.length) === 2 || hintsLength === 4)) {
        for (var index = 0; index < hintsLength; index++) {
          if (!(isInt(item = hints[index]) && item > 0)) {
            throw new Error('Hint (' + index +
                            ') in the linearization dictionary is invalid.');
          }
        }
        return hints;
      }
      throw new Error('Hint array in the linearization dictionary is invalid.');
    }
    var parser = new Parser(new Lexer(stream), false, null);
    var obj1 = parser.getObj();
    var obj2 = parser.getObj();
    var obj3 = parser.getObj();
    var linDict = parser.getObj();
    var obj, length;
    if (!(isInt(obj1) && isInt(obj2) && isCmd(obj3, 'obj') && isDict(linDict) &&
          isNum(obj = linDict.get('Linearized')) && obj > 0)) {
      return null; // No valid linearization dictionary found.
    } else if ((length = getInt('L')) !== stream.length) {
      throw new Error('The "L" parameter in the linearization dictionary ' +
                      'does not equal the stream length.');
    }
    return {
      length: length,
      hints: getHints(),
      objectNumberFirst: getInt('O'),
      endFirst: getInt('E'),
      numPages: getInt('N'),
      mainXRefEntriesOffset: getInt('T'),
      pageFirst: (linDict.has('P') ? getInt('P', true) : 0)
    };
  }
};

exports.EOF = EOF;
exports.Lexer = Lexer;
exports.Linearization = Linearization;
exports.Parser = Parser;
exports.isEOF = isEOF;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreType1Parser = {}), root.pdfjsSharedUtil,
      root.pdfjsCoreStream, root.pdfjsCoreEncodings);
  }
}(this, function (exports, sharedUtil, coreStream, coreEncodings) {

var warn = sharedUtil.warn;
var isSpace = sharedUtil.isSpace;
var Stream = coreStream.Stream;
var getEncoding = coreEncodings.getEncoding;

// Hinting is currently disabled due to unknown problems on windows
// in tracemonkey and various other pdfs with type1 fonts.
var HINTING_ENABLED = false;

/*
 * CharStrings are encoded following the the CharString Encoding sequence
 * describe in Chapter 6 of the "Adobe Type1 Font Format" specification.
 * The value in a byte indicates a command, a number, or subsequent bytes
 * that are to be interpreted in a special way.
 *
 * CharString Number Encoding:
 *  A CharString byte containing the values from 32 through 255 inclusive
 *  indicate an integer. These values are decoded in four ranges.
 *
 * 1. A CharString byte containing a value, v, between 32 and 246 inclusive,
 * indicate the integer v - 139. Thus, the integer values from -107 through
 * 107 inclusive may be encoded in single byte.
 *
 * 2. A CharString byte containing a value, v, between 247 and 250 inclusive,
 * indicates an integer involving the next byte, w, according to the formula:
 * [(v - 247) x 256] + w + 108
 *
 * 3. A CharString byte containing a value, v, between 251 and 254 inclusive,
 * indicates an integer involving the next byte, w, according to the formula:
 * -[(v - 251) * 256] - w - 108
 *
 * 4. A CharString containing the value 255 indicates that the next 4 bytes
 * are a two complement signed integer. The first of these bytes contains the
 * highest order bits, the second byte contains the next higher order bits
 * and the fourth byte contain the lowest order bits.
 *
 *
 * CharString Command Encoding:
 *  CharStrings commands are encoded in 1 or 2 bytes.
 *
 *  Single byte commands are encoded in 1 byte that contains a value between
 *  0 and 31 inclusive.
 *  If a command byte contains the value 12, then the value in the next byte
 *  indicates a command. This "escape" mechanism allows many extra commands
 * to be encoded and this encoding technique helps to minimize the length of
 * the charStrings.
 */
var Type1CharString = (function Type1CharStringClosure() {
  var COMMAND_MAP = {
    'hstem': [1],
    'vstem': [3],
    'vmoveto': [4],
    'rlineto': [5],
    'hlineto': [6],
    'vlineto': [7],
    'rrcurveto': [8],
    'callsubr': [10],
    'flex': [12, 35],
    'drop' : [12, 18],
    'endchar': [14],
    'rmoveto': [21],
    'hmoveto': [22],
    'vhcurveto': [30],
    'hvcurveto': [31]
  };

  function Type1CharString() {
    this.width = 0;
    this.lsb = 0;
    this.flexing = false;
    this.output = [];
    this.stack = [];
  }

  Type1CharString.prototype = {
    convert: function Type1CharString_convert(encoded, subrs,
                                              seacAnalysisEnabled) {
      var count = encoded.length;
      var error = false;
      var wx, sbx, subrNumber;
      for (var i = 0; i < count; i++) {
        var value = encoded[i];
        if (value < 32) {
          if (value === 12) {
            value = (value << 8) + encoded[++i];
          }
          switch (value) {
            case 1: // hstem
              if (!HINTING_ENABLED) {
                this.stack = [];
                break;
              }
              error = this.executeCommand(2, COMMAND_MAP.hstem);
              break;
            case 3: // vstem
              if (!HINTING_ENABLED) {
                this.stack = [];
                break;
              }
              error = this.executeCommand(2, COMMAND_MAP.vstem);
              break;
            case 4: // vmoveto
              if (this.flexing) {
                if (this.stack.length < 1) {
                  error = true;
                  break;
                }
                // Add the dx for flex and but also swap the values so they are
                // the right order.
                var dy = this.stack.pop();
                this.stack.push(0, dy);
                break;
              }
              error = this.executeCommand(1, COMMAND_MAP.vmoveto);
              break;
            case 5: // rlineto
              error = this.executeCommand(2, COMMAND_MAP.rlineto);
              break;
            case 6: // hlineto
              error = this.executeCommand(1, COMMAND_MAP.hlineto);
              break;
            case 7: // vlineto
              error = this.executeCommand(1, COMMAND_MAP.vlineto);
              break;
            case 8: // rrcurveto
              error = this.executeCommand(6, COMMAND_MAP.rrcurveto);
              break;
            case 9: // closepath
              // closepath is a Type1 command that does not take argument and is
              // useless in Type2 and it can simply be ignored.
              this.stack = [];
              break;
            case 10: // callsubr
              if (this.stack.length < 1) {
                error = true;
                break;
              }
              subrNumber = this.stack.pop();
              error = this.convert(subrs[subrNumber], subrs,
                                   seacAnalysisEnabled);
              break;
            case 11: // return
              return error;
            case 13: // hsbw
              if (this.stack.length < 2) {
                error = true;
                break;
              }
              // To convert to type2 we have to move the width value to the
              // first part of the charstring and then use hmoveto with lsb.
              wx = this.stack.pop();
              sbx = this.stack.pop();
              this.lsb = sbx;
              this.width = wx;
              this.stack.push(wx, sbx);
              error = this.executeCommand(2, COMMAND_MAP.hmoveto);
              break;
            case 14: // endchar
              this.output.push(COMMAND_MAP.endchar[0]);
              break;
            case 21: // rmoveto
              if (this.flexing) {
                break;
              }
              error = this.executeCommand(2, COMMAND_MAP.rmoveto);
              break;
            case 22: // hmoveto
              if (this.flexing) {
                // Add the dy for flex.
                this.stack.push(0);
                break;
              }
              error = this.executeCommand(1, COMMAND_MAP.hmoveto);
              break;
            case 30: // vhcurveto
              error = this.executeCommand(4, COMMAND_MAP.vhcurveto);
              break;
            case 31: // hvcurveto
              error = this.executeCommand(4, COMMAND_MAP.hvcurveto);
              break;
            case (12 << 8) + 0: // dotsection
              // dotsection is a Type1 command to specify some hinting feature
              // for dots that do not take a parameter and it can safely be
              // ignored for Type2.
              this.stack = [];
              break;
            case (12 << 8) + 1: // vstem3
              if (!HINTING_ENABLED) {
                this.stack = [];
                break;
              }
              // [vh]stem3 are Type1 only and Type2 supports [vh]stem with
              // multiple parameters, so instead of returning [vh]stem3 take a
              // shortcut and return [vhstem] instead.
              error = this.executeCommand(2, COMMAND_MAP.vstem);
              break;
            case (12 << 8) + 2: // hstem3
              if (!HINTING_ENABLED) {
                 this.stack = [];
                break;
              }
              // See vstem3.
              error = this.executeCommand(2, COMMAND_MAP.hstem);
              break;
            case (12 << 8) + 6: // seac
              // seac is like type 2's special endchar but it doesn't use the
              // first argument asb, so remove it.
              if (seacAnalysisEnabled) {
                this.seac = this.stack.splice(-4, 4);
                error = this.executeCommand(0, COMMAND_MAP.endchar);
              } else {
                error = this.executeCommand(4, COMMAND_MAP.endchar);
              }
              break;
            case (12 << 8) + 7: // sbw
              if (this.stack.length < 4) {
                error = true;
                break;
              }
              // To convert to type2 we have to move the width value to the
              // first part of the charstring and then use rmoveto with
              // (dx, dy). The height argument will not be used for vmtx and
              // vhea tables reconstruction -- ignoring it.
              var wy = this.stack.pop();
              wx = this.stack.pop();
              var sby = this.stack.pop();
              sbx = this.stack.pop();
              this.lsb = sbx;
              this.width = wx;
              this.stack.push(wx, sbx, sby);
              error = this.executeCommand(3, COMMAND_MAP.rmoveto);
              break;
            case (12 << 8) + 12: // div
              if (this.stack.length < 2) {
                error = true;
                break;
              }
              var num2 = this.stack.pop();
              var num1 = this.stack.pop();
              this.stack.push(num1 / num2);
              break;
            case (12 << 8) + 16: // callothersubr
              if (this.stack.length < 2) {
                error = true;
                break;
              }
              subrNumber = this.stack.pop();
              var numArgs = this.stack.pop();
              if (subrNumber === 0 && numArgs === 3) {
                var flexArgs = this.stack.splice(this.stack.length - 17, 17);
                this.stack.push(
                  flexArgs[2] + flexArgs[0], // bcp1x + rpx
                  flexArgs[3] + flexArgs[1], // bcp1y + rpy
                  flexArgs[4], // bcp2x
                  flexArgs[5], // bcp2y
                  flexArgs[6], // p2x
                  flexArgs[7], // p2y
                  flexArgs[8], // bcp3x
                  flexArgs[9], // bcp3y
                  flexArgs[10], // bcp4x
                  flexArgs[11], // bcp4y
                  flexArgs[12], // p3x
                  flexArgs[13], // p3y
                  flexArgs[14] // flexDepth
                  // 15 = finalx unused by flex
                  // 16 = finaly unused by flex
                );
                error = this.executeCommand(13, COMMAND_MAP.flex, true);
                this.flexing = false;
                this.stack.push(flexArgs[15], flexArgs[16]);
              } else if (subrNumber === 1 && numArgs === 0) {
                this.flexing = true;
              }
              break;
            case (12 << 8) + 17: // pop
              // Ignore this since it is only used with othersubr.
              break;
            case (12 << 8) + 33: // setcurrentpoint
              // Ignore for now.
              this.stack = [];
              break;
            default:
              warn('Unknown type 1 charstring command of "' + value + '"');
              break;
          }
          if (error) {
            break;
          }
          continue;
        } else if (value <= 246) {
          value = value - 139;
        } else if (value <= 250) {
          value = ((value - 247) * 256) + encoded[++i] + 108;
        } else if (value <= 254) {
          value = -((value - 251) * 256) - encoded[++i] - 108;
        } else {
          value = (encoded[++i] & 0xff) << 24 | (encoded[++i] & 0xff) << 16 |
                  (encoded[++i] & 0xff) << 8 | (encoded[++i] & 0xff) << 0;
        }
        this.stack.push(value);
      }
      return error;
    },

    executeCommand: function(howManyArgs, command, keepStack) {
      var stackLength = this.stack.length;
      if (howManyArgs > stackLength) {
        return true;
      }
      var start = stackLength - howManyArgs;
      for (var i = start; i < stackLength; i++) {
        var value = this.stack[i];
        if (value === (value | 0)) { // int
          this.output.push(28, (value >> 8) & 0xff, value & 0xff);
        } else { // fixed point
          value = (65536 * value) | 0;
          this.output.push(255,
                           (value >> 24) & 0xFF,
                           (value >> 16) & 0xFF,
                           (value >> 8) & 0xFF,
                           value & 0xFF);
        }
      }
      this.output.push.apply(this.output, command);
      if (keepStack) {
        this.stack.splice(start, howManyArgs);
      } else {
        this.stack.length = 0;
      }
      return false;
    }
  };

  return Type1CharString;
})();

/*
 * Type1Parser encapsulate the needed code for parsing a Type1 font
 * program. Some of its logic depends on the Type2 charstrings
 * structure.
 * Note: this doesn't really parse the font since that would require evaluation
 * of PostScript, but it is possible in most cases to extract what we need
 * without a full parse.
 */
var Type1Parser = (function Type1ParserClosure() {
  /*
   * Decrypt a Sequence of Ciphertext Bytes to Produce the Original Sequence
   * of Plaintext Bytes. The function took a key as a parameter which can be
   * for decrypting the eexec block of for decoding charStrings.
   */
  var EEXEC_ENCRYPT_KEY = 55665;
  var CHAR_STRS_ENCRYPT_KEY = 4330;

  function isHexDigit(code) {
    return code >= 48 && code <= 57 || // '0'-'9'
           code >= 65 && code <= 70 || // 'A'-'F'
           code >= 97 && code <= 102;  // 'a'-'f'
  }

  function decrypt(data, key, discardNumber) {
    if (discardNumber >= data.length) {
      return new Uint8Array(0);
    }
    var r = key | 0, c1 = 52845, c2 = 22719, i, j;
    for (i = 0; i < discardNumber; i++) {
      r = ((data[i] + r) * c1 + c2) & ((1 << 16) - 1);
    }
    var count = data.length - discardNumber;
    var decrypted = new Uint8Array(count);
    for (i = discardNumber, j = 0; j < count; i++, j++) {
      var value = data[i];
      decrypted[j] = value ^ (r >> 8);
      r = ((value + r) * c1 + c2) & ((1 << 16) - 1);
    }
    return decrypted;
  }

  function decryptAscii(data, key, discardNumber) {
    var r = key | 0, c1 = 52845, c2 = 22719;
    var count = data.length, maybeLength = count >>> 1;
    var decrypted = new Uint8Array(maybeLength);
    var i, j;
    for (i = 0, j = 0; i < count; i++) {
      var digit1 = data[i];
      if (!isHexDigit(digit1)) {
        continue;
      }
      i++;
      var digit2;
      while (i < count && !isHexDigit(digit2 = data[i])) {
        i++;
      }
      if (i < count) {
        var value = parseInt(String.fromCharCode(digit1, digit2), 16);
        decrypted[j++] = value ^ (r >> 8);
        r = ((value + r) * c1 + c2) & ((1 << 16) - 1);
      }
    }
    return Array.prototype.slice.call(decrypted, discardNumber, j);
  }

  function isSpecial(c) {
    return c === 0x2F || // '/'
           c === 0x5B || c === 0x5D || // '[', ']'
           c === 0x7B || c === 0x7D || // '{', '}'
           c === 0x28 || c === 0x29; // '(', ')'
  }

  function Type1Parser(stream, encrypted, seacAnalysisEnabled) {
    if (encrypted) {
      var data = stream.getBytes();
      var isBinary = !(isHexDigit(data[0]) && isHexDigit(data[1]) &&
                       isHexDigit(data[2]) && isHexDigit(data[3]));
      stream = new Stream(isBinary ? decrypt(data, EEXEC_ENCRYPT_KEY, 4) :
                          decryptAscii(data, EEXEC_ENCRYPT_KEY, 4));
    }
    this.seacAnalysisEnabled = !!seacAnalysisEnabled;

    this.stream = stream;
    this.nextChar();
  }

  Type1Parser.prototype = {
    readNumberArray: function Type1Parser_readNumberArray() {
      this.getToken(); // read '[' or '{' (arrays can start with either)
      var array = [];
      while (true) {
        var token = this.getToken();
        if (token === null || token === ']' || token === '}') {
          break;
        }
        array.push(parseFloat(token || 0));
      }
      return array;
    },

    readNumber: function Type1Parser_readNumber() {
      var token = this.getToken();
      return parseFloat(token || 0);
    },

    readInt: function Type1Parser_readInt() {
      // Use '| 0' to prevent setting a double into length such as the double
      // does not flow into the loop variable.
      var token = this.getToken();
      return parseInt(token || 0, 10) | 0;
    },

    readBoolean: function Type1Parser_readBoolean() {
      var token = this.getToken();

      // Use 1 and 0 since that's what type2 charstrings use.
      return token === 'true' ? 1 : 0;
    },

    nextChar : function Type1_nextChar() {
      return (this.currentChar = this.stream.getByte());
    },

    getToken: function Type1Parser_getToken() {
      // Eat whitespace and comments.
      var comment = false;
      var ch = this.currentChar;
      while (true) {
        if (ch === -1) {
          return null;
        }

        if (comment) {
          if (ch === 0x0A || ch === 0x0D) {
            comment = false;
          }
        } else if (ch === 0x25) { // '%'
          comment = true;
        } else if (!isSpace(ch)) {
          break;
        }
        ch = this.nextChar();
      }
      if (isSpecial(ch)) {
        this.nextChar();
        return String.fromCharCode(ch);
      }
      var token = '';
      do {
        token += String.fromCharCode(ch);
        ch = this.nextChar();
      } while (ch >= 0 && !isSpace(ch) && !isSpecial(ch));
      return token;
    },

    /*
     * Returns an object containing a Subrs array and a CharStrings
     * array extracted from and eexec encrypted block of data
     */
    extractFontProgram: function Type1Parser_extractFontProgram() {
      var stream = this.stream;

      var subrs = [], charstrings = [];
      var privateData = Object.create(null);
      privateData['lenIV'] = 4;
      var program = {
        subrs: [],
        charstrings: [],
        properties: {
          'privateData': privateData
        }
      };
      var token, length, data, lenIV, encoded;
      while ((token = this.getToken()) !== null) {
        if (token !== '/') {
          continue;
        }
        token = this.getToken();
        switch (token) {
          case 'CharStrings':
            // The number immediately following CharStrings must be greater or
            // equal to the number of CharStrings.
            this.getToken();
            this.getToken(); // read in 'dict'
            this.getToken(); // read in 'dup'
            this.getToken(); // read in 'begin'
            while(true) {
              token = this.getToken();
              if (token === null || token === 'end') {
                break;
              }

              if (token !== '/') {
                continue;
              }
              var glyph = this.getToken();
              length = this.readInt();
              this.getToken(); // read in 'RD' or '-|'
              data = stream.makeSubStream(stream.pos, length);
              lenIV = program.properties.privateData['lenIV'];
              encoded = decrypt(data.getBytes(), CHAR_STRS_ENCRYPT_KEY, lenIV);
              // Skip past the required space and binary data.
              stream.skip(length);
              this.nextChar();
              token = this.getToken(); // read in 'ND' or '|-'
              if (token === 'noaccess') {
                this.getToken(); // read in 'def'
              }
              charstrings.push({
                glyph: glyph,
                encoded: encoded
              });
            }
            break;
          case 'Subrs':
            var num = this.readInt();
            this.getToken(); // read in 'array'
            while ((token = this.getToken()) === 'dup') {
              var index = this.readInt();
              length = this.readInt();
              this.getToken(); // read in 'RD' or '-|'
              data = stream.makeSubStream(stream.pos, length);
              lenIV = program.properties.privateData['lenIV'];
              encoded = decrypt(data.getBytes(), CHAR_STRS_ENCRYPT_KEY, lenIV);
              // Skip past the required space and binary data.
              stream.skip(length);
              this.nextChar();
              token = this.getToken(); // read in 'NP' or '|'
              if (token === 'noaccess') {
                this.getToken(); // read in 'put'
              }
              subrs[index] = encoded;
            }
            break;
          case 'BlueValues':
          case 'OtherBlues':
          case 'FamilyBlues':
          case 'FamilyOtherBlues':
            var blueArray = this.readNumberArray();
            // *Blue* values may contain invalid data: disables reading of
            // those values when hinting is disabled.
            if (blueArray.length > 0 && (blueArray.length % 2) === 0 &&
                HINTING_ENABLED) {
              program.properties.privateData[token] = blueArray;
            }
            break;
          case 'StemSnapH':
          case 'StemSnapV':
            program.properties.privateData[token] = this.readNumberArray();
            break;
          case 'StdHW':
          case 'StdVW':
            program.properties.privateData[token] =
              this.readNumberArray()[0];
            break;
          case 'BlueShift':
          case 'lenIV':
          case 'BlueFuzz':
          case 'BlueScale':
          case 'LanguageGroup':
          case 'ExpansionFactor':
            program.properties.privateData[token] = this.readNumber();
            break;
          case 'ForceBold':
            program.properties.privateData[token] = this.readBoolean();
            break;
        }
      }

      for (var i = 0; i < charstrings.length; i++) {
        glyph = charstrings[i].glyph;
        encoded = charstrings[i].encoded;
        var charString = new Type1CharString();
        var error = charString.convert(encoded, subrs,
                                       this.seacAnalysisEnabled);
        var output = charString.output;
        if (error) {
          // It seems when FreeType encounters an error while evaluating a glyph
          // that it completely ignores the glyph so we'll mimic that behaviour
          // here and put an endchar to make the validator happy.
          output = [14];
        }
        program.charstrings.push({
          glyphName: glyph,
          charstring: output,
          width: charString.width,
          lsb: charString.lsb,
          seac: charString.seac
        });
      }

      return program;
    },

    extractFontHeader: function Type1Parser_extractFontHeader(properties) {
      var token;
      while ((token = this.getToken()) !== null) {
        if (token !== '/') {
          continue;
        }
        token = this.getToken();
        switch (token) {
          case 'FontMatrix':
            var matrix = this.readNumberArray();
            properties.fontMatrix = matrix;
            break;
          case 'Encoding':
            var encodingArg = this.getToken();
            var encoding;
            if (!/^\d+$/.test(encodingArg)) {
              // encoding name is specified
              encoding = getEncoding(encodingArg);
            } else {
              encoding = [];
              var size = parseInt(encodingArg, 10) | 0;
              this.getToken(); // read in 'array'

              for (var j = 0; j < size; j++) {
                token = this.getToken();
                // skipping till first dup or def (e.g. ignoring for statement)
                while (token !== 'dup' && token !== 'def') {
                  token = this.getToken();
                  if (token === null) {
                    return; // invalid header
                  }
                }
                if (token === 'def') {
                  break; // read all array data
                }
                var index = this.readInt();
                this.getToken(); // read in '/'
                var glyph = this.getToken();
                encoding[index] = glyph;
                this.getToken(); // read the in 'put'
              }
            }
            properties.builtInEncoding = encoding;
            break;
          case 'FontBBox':
            var fontBBox = this.readNumberArray();
            // adjusting ascent/descent
            properties.ascent = fontBBox[3];
            properties.descent = fontBBox[1];
            properties.ascentScaled = true;
            break;
        }
      }
    }
  };

  return Type1Parser;
})();

exports.Type1Parser = Type1Parser;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreCMap = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCoreStream, root.pdfjsCoreParser);
  }
}(this, function (exports, sharedUtil, corePrimitives, coreStream, coreParser) {

var Util = sharedUtil.Util;
var assert = sharedUtil.assert;
var error = sharedUtil.error;
var isInt = sharedUtil.isInt;
var isString = sharedUtil.isString;
var isName = corePrimitives.isName;
var isCmd = corePrimitives.isCmd;
var isStream = corePrimitives.isStream;
var StringStream = coreStream.StringStream;
var Lexer = coreParser.Lexer;
var isEOF = coreParser.isEOF;

var BUILT_IN_CMAPS = [
// << Start unicode maps.
'Adobe-GB1-UCS2',
'Adobe-CNS1-UCS2',
'Adobe-Japan1-UCS2',
'Adobe-Korea1-UCS2',
// >> End unicode maps.
'78-EUC-H',
'78-EUC-V',
'78-H',
'78-RKSJ-H',
'78-RKSJ-V',
'78-V',
'78ms-RKSJ-H',
'78ms-RKSJ-V',
'83pv-RKSJ-H',
'90ms-RKSJ-H',
'90ms-RKSJ-V',
'90msp-RKSJ-H',
'90msp-RKSJ-V',
'90pv-RKSJ-H',
'90pv-RKSJ-V',
'Add-H',
'Add-RKSJ-H',
'Add-RKSJ-V',
'Add-V',
'Adobe-CNS1-0',
'Adobe-CNS1-1',
'Adobe-CNS1-2',
'Adobe-CNS1-3',
'Adobe-CNS1-4',
'Adobe-CNS1-5',
'Adobe-CNS1-6',
'Adobe-GB1-0',
'Adobe-GB1-1',
'Adobe-GB1-2',
'Adobe-GB1-3',
'Adobe-GB1-4',
'Adobe-GB1-5',
'Adobe-Japan1-0',
'Adobe-Japan1-1',
'Adobe-Japan1-2',
'Adobe-Japan1-3',
'Adobe-Japan1-4',
'Adobe-Japan1-5',
'Adobe-Japan1-6',
'Adobe-Korea1-0',
'Adobe-Korea1-1',
'Adobe-Korea1-2',
'B5-H',
'B5-V',
'B5pc-H',
'B5pc-V',
'CNS-EUC-H',
'CNS-EUC-V',
'CNS1-H',
'CNS1-V',
'CNS2-H',
'CNS2-V',
'ETHK-B5-H',
'ETHK-B5-V',
'ETen-B5-H',
'ETen-B5-V',
'ETenms-B5-H',
'ETenms-B5-V',
'EUC-H',
'EUC-V',
'Ext-H',
'Ext-RKSJ-H',
'Ext-RKSJ-V',
'Ext-V',
'GB-EUC-H',
'GB-EUC-V',
'GB-H',
'GB-V',
'GBK-EUC-H',
'GBK-EUC-V',
'GBK2K-H',
'GBK2K-V',
'GBKp-EUC-H',
'GBKp-EUC-V',
'GBT-EUC-H',
'GBT-EUC-V',
'GBT-H',
'GBT-V',
'GBTpc-EUC-H',
'GBTpc-EUC-V',
'GBpc-EUC-H',
'GBpc-EUC-V',
'H',
'HKdla-B5-H',
'HKdla-B5-V',
'HKdlb-B5-H',
'HKdlb-B5-V',
'HKgccs-B5-H',
'HKgccs-B5-V',
'HKm314-B5-H',
'HKm314-B5-V',
'HKm471-B5-H',
'HKm471-B5-V',
'HKscs-B5-H',
'HKscs-B5-V',
'Hankaku',
'Hiragana',
'KSC-EUC-H',
'KSC-EUC-V',
'KSC-H',
'KSC-Johab-H',
'KSC-Johab-V',
'KSC-V',
'KSCms-UHC-H',
'KSCms-UHC-HW-H',
'KSCms-UHC-HW-V',
'KSCms-UHC-V',
'KSCpc-EUC-H',
'KSCpc-EUC-V',
'Katakana',
'NWP-H',
'NWP-V',
'RKSJ-H',
'RKSJ-V',
'Roman',
'UniCNS-UCS2-H',
'UniCNS-UCS2-V',
'UniCNS-UTF16-H',
'UniCNS-UTF16-V',
'UniCNS-UTF32-H',
'UniCNS-UTF32-V',
'UniCNS-UTF8-H',
'UniCNS-UTF8-V',
'UniGB-UCS2-H',
'UniGB-UCS2-V',
'UniGB-UTF16-H',
'UniGB-UTF16-V',
'UniGB-UTF32-H',
'UniGB-UTF32-V',
'UniGB-UTF8-H',
'UniGB-UTF8-V',
'UniJIS-UCS2-H',
'UniJIS-UCS2-HW-H',
'UniJIS-UCS2-HW-V',
'UniJIS-UCS2-V',
'UniJIS-UTF16-H',
'UniJIS-UTF16-V',
'UniJIS-UTF32-H',
'UniJIS-UTF32-V',
'UniJIS-UTF8-H',
'UniJIS-UTF8-V',
'UniJIS2004-UTF16-H',
'UniJIS2004-UTF16-V',
'UniJIS2004-UTF32-H',
'UniJIS2004-UTF32-V',
'UniJIS2004-UTF8-H',
'UniJIS2004-UTF8-V',
'UniJISPro-UCS2-HW-V',
'UniJISPro-UCS2-V',
'UniJISPro-UTF8-V',
'UniJISX0213-UTF32-H',
'UniJISX0213-UTF32-V',
'UniJISX02132004-UTF32-H',
'UniJISX02132004-UTF32-V',
'UniKS-UCS2-H',
'UniKS-UCS2-V',
'UniKS-UTF16-H',
'UniKS-UTF16-V',
'UniKS-UTF32-H',
'UniKS-UTF32-V',
'UniKS-UTF8-H',
'UniKS-UTF8-V',
'V',
'WP-Symbol'];

// CMap, not to be confused with TrueType's cmap.
var CMap = (function CMapClosure() {
  function CMap(builtInCMap) {
    // Codespace ranges are stored as follows:
    // [[1BytePairs], [2BytePairs], [3BytePairs], [4BytePairs]]
    // where nBytePairs are ranges e.g. [low1, high1, low2, high2, ...]
    this.codespaceRanges = [[], [], [], []];
    this.numCodespaceRanges = 0;
    // Map entries have one of two forms.
    // - cid chars are 16-bit unsigned integers, stored as integers.
    // - bf chars are variable-length byte sequences, stored as strings, with
    //   one byte per character.
    this._map = [];
    this.name = '';
    this.vertical = false;
    this.useCMap = null;
    this.builtInCMap = builtInCMap;
  }
  CMap.prototype = {
    addCodespaceRange: function(n, low, high) {
      this.codespaceRanges[n - 1].push(low, high);
      this.numCodespaceRanges++;
    },

    mapCidRange: function(low, high, dstLow) {
      while (low <= high) {
        this._map[low++] = dstLow++;
      }
    },

    mapBfRange: function(low, high, dstLow) {
      var lastByte = dstLow.length - 1;
      while (low <= high) {
        this._map[low++] = dstLow;
        // Only the last byte has to be incremented.
        dstLow = dstLow.substr(0, lastByte) +
                 String.fromCharCode(dstLow.charCodeAt(lastByte) + 1);
      }
    },

    mapBfRangeToArray: function(low, high, array) {
      var i = 0, ii = array.length;
      while (low <= high && i < ii) {
        this._map[low] = array[i++];
        ++low;
      }
    },

    // This is used for both bf and cid chars.
    mapOne: function(src, dst) {
      this._map[src] = dst;
    },

    lookup: function(code) {
      return this._map[code];
    },

    contains: function(code) {
      return this._map[code] !== undefined;
    },

    forEach: function(callback) {
      // Most maps have fewer than 65536 entries, and for those we use normal
      // array iteration. But really sparse tables are possible -- e.g. with
      // indices in the *billions*. For such tables we use for..in, which isn't
      // ideal because it stringifies the indices for all present elements, but
      // it does avoid iterating over every undefined entry.
      var map = this._map;
      var length = map.length;
      var i;
      if (length <= 0x10000) {
        for (i = 0; i < length; i++) {
          if (map[i] !== undefined) {
            callback(i, map[i]);
          }
        }
      } else {
        for (i in this._map) {
          callback(i, map[i]);
        }
      }
    },

    charCodeOf: function(value) {
      return this._map.indexOf(value);
    },

    getMap: function() {
      return this._map;
    },

    readCharCode: function(str, offset, out) {
      var c = 0;
      var codespaceRanges = this.codespaceRanges;
      var codespaceRangesLen = this.codespaceRanges.length;
      // 9.7.6.2 CMap Mapping
      // The code length is at most 4.
      for (var n = 0; n < codespaceRangesLen; n++) {
        c = ((c << 8) | str.charCodeAt(offset + n)) >>> 0;
        // Check each codespace range to see if it falls within.
        var codespaceRange = codespaceRanges[n];
        for (var k = 0, kk = codespaceRange.length; k < kk;) {
          var low = codespaceRange[k++];
          var high = codespaceRange[k++];
          if (c >= low && c <= high) {
            out.charcode = c;
            out.length = n + 1;
            return;
          }
        }
      }
      out.charcode = 0;
      out.length = 1;
    },

    get length() {
      return this._map.length;
    },

    get isIdentityCMap() {
      if (!(this.name === 'Identity-H' || this.name === 'Identity-V')) {
        return false;
      }
      if (this._map.length !== 0x10000) {
        return false;
      }
      for (var i = 0; i < 0x10000; i++) {
        if (this._map[i] !== i) {
          return false;
        }
      }
      return true;
    }
  };
  return CMap;
})();

// A special case of CMap, where the _map array implicitly has a length of
// 65536 and each element is equal to its index.
var IdentityCMap = (function IdentityCMapClosure() {
  function IdentityCMap(vertical, n) {
    CMap.call(this);
    this.vertical = vertical;
    this.addCodespaceRange(n, 0, 0xffff);
  }
  Util.inherit(IdentityCMap, CMap, {});

  IdentityCMap.prototype = {
    addCodespaceRange: CMap.prototype.addCodespaceRange,

    mapCidRange: function(low, high, dstLow) {
      error('should not call mapCidRange');
    },

    mapBfRange: function(low, high, dstLow) {
      error('should not call mapBfRange');
    },

    mapBfRangeToArray: function(low, high, array) {
      error('should not call mapBfRangeToArray');
    },

    mapOne: function(src, dst) {
      error('should not call mapCidOne');
    },

    lookup: function(code) {
      return (isInt(code) && code <= 0xffff) ? code : undefined;
    },

    contains: function(code) {
      return isInt(code) && code <= 0xffff;
    },

    forEach: function(callback) {
      for (var i = 0; i <= 0xffff; i++) {
        callback(i, i);
      }
    },

    charCodeOf: function(value) {
      return (isInt(value) && value <= 0xffff) ? value : -1;
    },

    getMap: function() {
      // Sometimes identity maps must be instantiated, but it's rare.
      var map = new Array(0x10000);
      for (var i = 0; i <= 0xffff; i++) {
        map[i] = i;
      }
      return map;
    },

    readCharCode: CMap.prototype.readCharCode,

    get length() {
      return 0x10000;
    },

    get isIdentityCMap() {
      error('should not access .isIdentityCMap');
    }
  };

  return IdentityCMap;
})();

var BinaryCMapReader = (function BinaryCMapReaderClosure() {
  function fetchBinaryData(url) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (!request.response || request.status !== 200 &&
              request.status !== 0) {
            reject(new Error('Unable to get binary cMap at: ' + url));
          } else {
            resolve(new Uint8Array(request.response));
          }
        }
      };
      request.send(null);
    });
  }

  function hexToInt(a, size) {
    var n = 0;
    for (var i = 0; i <= size; i++) {
      n = (n << 8) | a[i];
    }
    return n >>> 0;
  }

  function hexToStr(a, size) {
    // This code is hot. Special-case some common values to avoid creating an
    // object with subarray().
    if (size === 1) {
      return String.fromCharCode(a[0], a[1]);
    }
    if (size === 3) {
      return String.fromCharCode(a[0], a[1], a[2], a[3]);
    }
    return String.fromCharCode.apply(null, a.subarray(0, size + 1));
  }

  function addHex(a, b, size) {
    var c = 0;
    for (var i = size; i >= 0; i--) {
      c += a[i] + b[i];
      a[i] = c & 255;
      c >>= 8;
    }
  }

  function incHex(a, size) {
    var c = 1;
    for (var i = size; i >= 0 && c > 0; i--) {
      c += a[i];
      a[i] = c & 255;
      c >>= 8;
    }
  }

  var MAX_NUM_SIZE = 16;
  var MAX_ENCODED_NUM_SIZE = 19; // ceil(MAX_NUM_SIZE * 7 / 8)

  function BinaryCMapStream(data) {
    this.buffer = data;
    this.pos = 0;
    this.end = data.length;
    this.tmpBuf = new Uint8Array(MAX_ENCODED_NUM_SIZE);
  }

  BinaryCMapStream.prototype = {
    readByte: function () {
      if (this.pos >= this.end) {
        return -1;
      }
      return this.buffer[this.pos++];
    },
    readNumber: function () {
      var n = 0;
      var last;
      do {
        var b = this.readByte();
        if (b < 0) {
          error('unexpected EOF in bcmap');
        }
        last = !(b & 0x80);
        n = (n << 7) | (b & 0x7F);
      } while (!last);
      return n;
    },
    readSigned: function () {
      var n = this.readNumber();
      return (n & 1) ? ~(n >>> 1) : n >>> 1;
    },
    readHex: function (num, size) {
      num.set(this.buffer.subarray(this.pos,
        this.pos + size + 1));
      this.pos += size + 1;
    },
    readHexNumber: function (num, size) {
      var last;
      var stack = this.tmpBuf, sp = 0;
      do {
        var b = this.readByte();
        if (b < 0) {
          error('unexpected EOF in bcmap');
        }
        last = !(b & 0x80);
        stack[sp++] = b & 0x7F;
      } while (!last);
      var i = size, buffer = 0, bufferSize = 0;
      while (i >= 0) {
        while (bufferSize < 8 && stack.length > 0) {
          buffer = (stack[--sp] << bufferSize) | buffer;
          bufferSize += 7;
        }
        num[i] = buffer & 255;
        i--;
        buffer >>= 8;
        bufferSize -= 8;
      }
    },
    readHexSigned: function (num, size) {
      this.readHexNumber(num, size);
      var sign = num[size] & 1 ? 255 : 0;
      var c = 0;
      for (var i = 0; i <= size; i++) {
        c = ((c & 1) << 8) | num[i];
        num[i] = (c >> 1) ^ sign;
      }
    },
    readString: function () {
      var len = this.readNumber();
      var s = '';
      for (var i = 0; i < len; i++) {
        s += String.fromCharCode(this.readNumber());
      }
      return s;
    }
  };

  function processBinaryCMap(url, cMap, extend) {
    return fetchBinaryData(url).then(function (data) {
      var stream = new BinaryCMapStream(data);
      var header = stream.readByte();
      cMap.vertical = !!(header & 1);

      var useCMap = null;
      var start = new Uint8Array(MAX_NUM_SIZE);
      var end = new Uint8Array(MAX_NUM_SIZE);
      var char = new Uint8Array(MAX_NUM_SIZE);
      var charCode = new Uint8Array(MAX_NUM_SIZE);
      var tmp = new Uint8Array(MAX_NUM_SIZE);
      var code;

      var b;
      while ((b = stream.readByte()) >= 0) {
        var type = b >> 5;
        if (type === 7) { // metadata, e.g. comment or usecmap
          switch (b & 0x1F) {
            case 0:
              stream.readString(); // skipping comment
              break;
            case 1:
              useCMap = stream.readString();
              break;
          }
          continue;
        }
        var sequence = !!(b & 0x10);
        var dataSize = b & 15;

        assert(dataSize + 1 <= MAX_NUM_SIZE);

        var ucs2DataSize = 1;
        var subitemsCount = stream.readNumber();
        var i;
        switch (type) {
          case 0: // codespacerange
            stream.readHex(start, dataSize);
            stream.readHexNumber(end, dataSize);
            addHex(end, start, dataSize);
            cMap.addCodespaceRange(dataSize + 1, hexToInt(start, dataSize),
                                   hexToInt(end, dataSize));
            for (i = 1; i < subitemsCount; i++) {
              incHex(end, dataSize);
              stream.readHexNumber(start, dataSize);
              addHex(start, end, dataSize);
              stream.readHexNumber(end, dataSize);
              addHex(end, start, dataSize);
              cMap.addCodespaceRange(dataSize + 1, hexToInt(start, dataSize),
                                     hexToInt(end, dataSize));
            }
            break;
          case 1: // notdefrange
            stream.readHex(start, dataSize);
            stream.readHexNumber(end, dataSize);
            addHex(end, start, dataSize);
            code = stream.readNumber();
            // undefined range, skipping
            for (i = 1; i < subitemsCount; i++) {
              incHex(end, dataSize);
              stream.readHexNumber(start, dataSize);
              addHex(start, end, dataSize);
              stream.readHexNumber(end, dataSize);
              addHex(end, start, dataSize);
              code = stream.readNumber();
              // nop
            }
            break;
          case 2: // cidchar
            stream.readHex(char, dataSize);
            code = stream.readNumber();
            cMap.mapOne(hexToInt(char, dataSize), code);
            for (i = 1; i < subitemsCount; i++) {
              incHex(char, dataSize);
              if (!sequence) {
                stream.readHexNumber(tmp, dataSize);
                addHex(char, tmp, dataSize);
              }
              code = stream.readSigned() + (code + 1);
              cMap.mapOne(hexToInt(char, dataSize), code);
            }
            break;
          case 3: // cidrange
            stream.readHex(start, dataSize);
            stream.readHexNumber(end, dataSize);
            addHex(end, start, dataSize);
            code = stream.readNumber();
            cMap.mapCidRange(hexToInt(start, dataSize), hexToInt(end, dataSize),
                             code);
            for (i = 1; i < subitemsCount; i++) {
              incHex(end, dataSize);
              if (!sequence) {
                stream.readHexNumber(start, dataSize);
                addHex(start, end, dataSize);
              } else {
                start.set(end);
              }
              stream.readHexNumber(end, dataSize);
              addHex(end, start, dataSize);
              code = stream.readNumber();
              cMap.mapCidRange(hexToInt(start, dataSize),
                               hexToInt(end, dataSize), code);
            }
            break;
          case 4: // bfchar
            stream.readHex(char, ucs2DataSize);
            stream.readHex(charCode, dataSize);
            cMap.mapOne(hexToInt(char, ucs2DataSize),
                        hexToStr(charCode, dataSize));
            for (i = 1; i < subitemsCount; i++) {
              incHex(char, ucs2DataSize);
              if (!sequence) {
                stream.readHexNumber(tmp, ucs2DataSize);
                addHex(char, tmp, ucs2DataSize);
              }
              incHex(charCode, dataSize);
              stream.readHexSigned(tmp, dataSize);
              addHex(charCode, tmp, dataSize);
              cMap.mapOne(hexToInt(char, ucs2DataSize),
                          hexToStr(charCode, dataSize));
            }
            break;
          case 5: // bfrange
            stream.readHex(start, ucs2DataSize);
            stream.readHexNumber(end, ucs2DataSize);
            addHex(end, start, ucs2DataSize);
            stream.readHex(charCode, dataSize);
            cMap.mapBfRange(hexToInt(start, ucs2DataSize),
                            hexToInt(end, ucs2DataSize),
                            hexToStr(charCode, dataSize));
            for (i = 1; i < subitemsCount; i++) {
              incHex(end, ucs2DataSize);
              if (!sequence) {
                stream.readHexNumber(start, ucs2DataSize);
                addHex(start, end, ucs2DataSize);
              } else {
                start.set(end);
              }
              stream.readHexNumber(end, ucs2DataSize);
              addHex(end, start, ucs2DataSize);
              stream.readHex(charCode, dataSize);
              cMap.mapBfRange(hexToInt(start, ucs2DataSize),
                              hexToInt(end, ucs2DataSize),
                              hexToStr(charCode, dataSize));
            }
            break;
          default:
            error('Unknown type: ' + type);
            break;
        }
      }

      if (useCMap) {
        return extend(useCMap);
      }
      return cMap;
    });
  }

  function BinaryCMapReader() {}

  BinaryCMapReader.prototype = {
    read: processBinaryCMap
  };

  return BinaryCMapReader;
})();

var CMapFactory = (function CMapFactoryClosure() {
  function strToInt(str) {
    var a = 0;
    for (var i = 0; i < str.length; i++) {
      a = (a << 8) | str.charCodeAt(i);
    }
    return a >>> 0;
  }

  function expectString(obj) {
    if (!isString(obj)) {
      error('Malformed CMap: expected string.');
    }
  }

  function expectInt(obj) {
    if (!isInt(obj)) {
      error('Malformed CMap: expected int.');
    }
  }

  function parseBfChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      }
      if (isCmd(obj, 'endbfchar')) {
        return;
      }
      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      // TODO are /dstName used?
      expectString(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }

  function parseBfRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      }
      if (isCmd(obj, 'endbfrange')) {
        return;
      }
      expectString(obj);
      var low = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var high = strToInt(obj);
      obj = lexer.getObj();
      if (isInt(obj) || isString(obj)) {
        var dstLow = isInt(obj) ? String.fromCharCode(obj) : obj;
        cMap.mapBfRange(low, high, dstLow);
      } else if (isCmd(obj, '[')) {
        obj = lexer.getObj();
        var array = [];
        while (!isCmd(obj, ']') && !isEOF(obj)) {
          array.push(obj);
          obj = lexer.getObj();
        }
        cMap.mapBfRangeToArray(low, high, array);
      } else {
        break;
      }
    }
    error('Invalid bf range.');
  }

  function parseCidChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      }
      if (isCmd(obj, 'endcidchar')) {
        return;
      }
      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      expectInt(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }

  function parseCidRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      }
      if (isCmd(obj, 'endcidrange')) {
        return;
      }
      expectString(obj);
      var low = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var high = strToInt(obj);
      obj = lexer.getObj();
      expectInt(obj);
      var dstLow = obj;
      cMap.mapCidRange(low, high, dstLow);
    }
  }

  function parseCodespaceRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      }
      if (isCmd(obj, 'endcodespacerange')) {
        return;
      }
      if (!isString(obj)) {
        break;
      }
      var low = strToInt(obj);
      obj = lexer.getObj();
      if (!isString(obj)) {
        break;
      }
      var high = strToInt(obj);
      cMap.addCodespaceRange(obj.length, low, high);
    }
    error('Invalid codespace range.');
  }

  function parseWMode(cMap, lexer) {
    var obj = lexer.getObj();
    if (isInt(obj)) {
      cMap.vertical = !!obj;
    }
  }

  function parseCMapName(cMap, lexer) {
    var obj = lexer.getObj();
    if (isName(obj) && isString(obj.name)) {
      cMap.name = obj.name;
    }
  }

  function parseCMap(cMap, lexer, builtInCMapParams, useCMap) {
    var previous;
    var embededUseCMap;
    objLoop: while (true) {
      var obj = lexer.getObj();
      if (isEOF(obj)) {
        break;
      } else if (isName(obj)) {
        if (obj.name === 'WMode') {
          parseWMode(cMap, lexer);
        } else if (obj.name === 'CMapName') {
          parseCMapName(cMap, lexer);
        }
        previous = obj;
      } else if (isCmd(obj)) {
        switch (obj.cmd) {
          case 'endcmap':
            break objLoop;
          case 'usecmap':
            if (isName(previous)) {
              embededUseCMap = previous.name;
            }
            break;
          case 'begincodespacerange':
            parseCodespaceRange(cMap, lexer);
            break;
          case 'beginbfchar':
            parseBfChar(cMap, lexer);
            break;
          case 'begincidchar':
            parseCidChar(cMap, lexer);
            break;
          case 'beginbfrange':
            parseBfRange(cMap, lexer);
            break;
          case 'begincidrange':
            parseCidRange(cMap, lexer);
            break;
        }
      }
    }

    if (!useCMap && embededUseCMap) {
      // Load the usecmap definition from the file only if there wasn't one
      // specified.
      useCMap = embededUseCMap;
    }
    if (useCMap) {
      return extendCMap(cMap, builtInCMapParams, useCMap);
    } else {
      return Promise.resolve(cMap);
    }
  }

  function extendCMap(cMap, builtInCMapParams, useCMap) {
    return createBuiltInCMap(useCMap, builtInCMapParams).then(
        function(newCMap) {
      cMap.useCMap = newCMap;
      // If there aren't any code space ranges defined clone all the parent ones
      // into this cMap.
      if (cMap.numCodespaceRanges === 0) {
        var useCodespaceRanges = cMap.useCMap.codespaceRanges;
        for (var i = 0; i < useCodespaceRanges.length; i++) {
          cMap.codespaceRanges[i] = useCodespaceRanges[i].slice();
        }
        cMap.numCodespaceRanges = cMap.useCMap.numCodespaceRanges;
      }
      // Merge the map into the current one, making sure not to override
      // any previously defined entries.
      cMap.useCMap.forEach(function(key, value) {
        if (!cMap.contains(key)) {
          cMap.mapOne(key, cMap.useCMap.lookup(key));
        }
      });

      return cMap;
    });
  }

  function parseBinaryCMap(name, builtInCMapParams) {
    var url = builtInCMapParams.url + name + '.bcmap';
    var cMap = new CMap(true);
    return new BinaryCMapReader().read(url, cMap, function (useCMap) {
      return extendCMap(cMap, builtInCMapParams, useCMap);
    });
  }

  function createBuiltInCMap(name, builtInCMapParams) {
    if (name === 'Identity-H') {
      return Promise.resolve(new IdentityCMap(false, 2));
    } else if (name === 'Identity-V') {
      return Promise.resolve(new IdentityCMap(true, 2));
    }
    if (BUILT_IN_CMAPS.indexOf(name) === -1) {
      return Promise.reject(new Error('Unknown cMap name: ' + name));
    }
    assert(builtInCMapParams, 'built-in cMap parameters are not provided');

    if (builtInCMapParams.packed) {
      return parseBinaryCMap(name, builtInCMapParams);
    }

    return new Promise(function (resolve, reject) {
      var url = builtInCMapParams.url + name;
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 || request.status === 0) {
            var cMap = new CMap(true);
            var lexer = new Lexer(new StringStream(request.responseText));
            parseCMap(cMap, lexer, builtInCMapParams, null).then(
                function (parsedCMap) {
              resolve(parsedCMap);
            }).catch(function (e) {
              reject(new Error({ message: 'Invalid CMap data', error: e }));
            });
          } else {
            reject(new Error('Unable to get cMap at: ' + url));
          }
        }
      };
      request.open('GET', url, true);
      request.send(null);
    });
  }

  return {
    create: function (encoding, builtInCMapParams, useCMap) {
      if (isName(encoding)) {
        return createBuiltInCMap(encoding.name, builtInCMapParams);
      } else if (isStream(encoding)) {
        var cMap = new CMap();
        var lexer = new Lexer(encoding);
        return parseCMap(cMap, lexer, builtInCMapParams, useCMap).then(
            function (parsedCMap) {
          if (parsedCMap.isIdentityCMap) {
            return createBuiltInCMap(parsedCMap.name, builtInCMapParams);
          }
          return parsedCMap;
        });
      }
      return Promise.reject(new Error('Encoding required.'));
    }
  };
})();

exports.CMap = CMap;
exports.CMapFactory = CMapFactory;
exports.IdentityCMap = IdentityCMap;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreFonts = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCoreStream, root.pdfjsCoreGlyphList,
      root.pdfjsCoreFontRenderer, root.pdfjsCoreEncodings,
      root.pdfjsCoreStandardFonts, root.pdfjsCoreUnicode,
      root.pdfjsCoreType1Parser, root.pdfjsCoreCFFParser);
  }
}(this, function (exports, sharedUtil, corePrimitives, coreStream,
                  coreGlyphList, coreFontRenderer, coreEncodings,
                  coreStandardFonts, coreUnicode, coreType1Parser,
                  coreCFFParser) {

var FONT_IDENTITY_MATRIX = sharedUtil.FONT_IDENTITY_MATRIX;
var FontType = sharedUtil.FontType;
var assert = sharedUtil.assert;
var bytesToString = sharedUtil.bytesToString;
var error = sharedUtil.error;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var isInt = sharedUtil.isInt;
var isNum = sharedUtil.isNum;
var readUint32 = sharedUtil.readUint32;
var shadow = sharedUtil.shadow;
var string32 = sharedUtil.string32;
var warn = sharedUtil.warn;
var MissingDataException = sharedUtil.MissingDataException;
var isSpace = sharedUtil.isSpace;
var Stream = coreStream.Stream;
var getGlyphsUnicode = coreGlyphList.getGlyphsUnicode;
var getDingbatsGlyphsUnicode = coreGlyphList.getDingbatsGlyphsUnicode;
var FontRendererFactory = coreFontRenderer.FontRendererFactory;
var StandardEncoding = coreEncodings.StandardEncoding;
var MacRomanEncoding = coreEncodings.MacRomanEncoding;
var SymbolSetEncoding = coreEncodings.SymbolSetEncoding;
var ZapfDingbatsEncoding = coreEncodings.ZapfDingbatsEncoding;
var getEncoding = coreEncodings.getEncoding;
var getStdFontMap = coreStandardFonts.getStdFontMap;
var getNonStdFontMap = coreStandardFonts.getNonStdFontMap;
var getGlyphMapForStandardFonts = coreStandardFonts.getGlyphMapForStandardFonts;
var getSupplementalGlyphMapForArialBlack =
  coreStandardFonts.getSupplementalGlyphMapForArialBlack;
var getUnicodeRangeFor = coreUnicode.getUnicodeRangeFor;
var mapSpecialUnicodeValues = coreUnicode.mapSpecialUnicodeValues;
var getUnicodeForGlyph = coreUnicode.getUnicodeForGlyph;
var Type1Parser = coreType1Parser.Type1Parser;
var CFFStandardStrings = coreCFFParser.CFFStandardStrings;
var CFFParser = coreCFFParser.CFFParser;
var CFFCompiler = coreCFFParser.CFFCompiler;
var CFF = coreCFFParser.CFF;
var CFFHeader = coreCFFParser.CFFHeader;
var CFFTopDict = coreCFFParser.CFFTopDict;
var CFFPrivateDict = coreCFFParser.CFFPrivateDict;
var CFFStrings = coreCFFParser.CFFStrings;
var CFFIndex = coreCFFParser.CFFIndex;
var CFFCharset = coreCFFParser.CFFCharset;

// Unicode Private Use Area
var PRIVATE_USE_OFFSET_START = 0xE000;
var PRIVATE_USE_OFFSET_END = 0xF8FF;
var SKIP_PRIVATE_USE_RANGE_F000_TO_F01F = false;

// PDF Glyph Space Units are one Thousandth of a TextSpace Unit
// except for Type 3 fonts
var PDF_GLYPH_SPACE_UNITS = 1000;

// Accented charactars are not displayed properly on Windows, using this flag
// to control analysis of seac charstrings.
var SEAC_ANALYSIS_ENABLED = false;

var FontFlags = {
  FixedPitch: 1,
  Serif: 2,
  Symbolic: 4,
  Script: 8,
  Nonsymbolic: 32,
  Italic: 64,
  AllCap: 65536,
  SmallCap: 131072,
  ForceBold: 262144
};

var MacStandardGlyphOrdering = [
  '.notdef', '.null', 'nonmarkingreturn', 'space', 'exclam', 'quotedbl',
  'numbersign', 'dollar', 'percent', 'ampersand', 'quotesingle', 'parenleft',
  'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash',
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'colon', 'semicolon', 'less', 'equal', 'greater', 'question', 'at',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft',
  'backslash', 'bracketright', 'asciicircum', 'underscore', 'grave', 'a', 'b',
  'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright',
  'asciitilde', 'Adieresis', 'Aring', 'Ccedilla', 'Eacute', 'Ntilde',
  'Odieresis', 'Udieresis', 'aacute', 'agrave', 'acircumflex', 'adieresis',
  'atilde', 'aring', 'ccedilla', 'eacute', 'egrave', 'ecircumflex', 'edieresis',
  'iacute', 'igrave', 'icircumflex', 'idieresis', 'ntilde', 'oacute', 'ograve',
  'ocircumflex', 'odieresis', 'otilde', 'uacute', 'ugrave', 'ucircumflex',
  'udieresis', 'dagger', 'degree', 'cent', 'sterling', 'section', 'bullet',
  'paragraph', 'germandbls', 'registered', 'copyright', 'trademark', 'acute',
  'dieresis', 'notequal', 'AE', 'Oslash', 'infinity', 'plusminus', 'lessequal',
  'greaterequal', 'yen', 'mu', 'partialdiff', 'summation', 'product', 'pi',
  'integral', 'ordfeminine', 'ordmasculine', 'Omega', 'ae', 'oslash',
  'questiondown', 'exclamdown', 'logicalnot', 'radical', 'florin',
  'approxequal', 'Delta', 'guillemotleft', 'guillemotright', 'ellipsis',
  'nonbreakingspace', 'Agrave', 'Atilde', 'Otilde', 'OE', 'oe', 'endash',
  'emdash', 'quotedblleft', 'quotedblright', 'quoteleft', 'quoteright',
  'divide', 'lozenge', 'ydieresis', 'Ydieresis', 'fraction', 'currency',
  'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'daggerdbl', 'periodcentered',
  'quotesinglbase', 'quotedblbase', 'perthousand', 'Acircumflex',
  'Ecircumflex', 'Aacute', 'Edieresis', 'Egrave', 'Iacute', 'Icircumflex',
  'Idieresis', 'Igrave', 'Oacute', 'Ocircumflex', 'apple', 'Ograve', 'Uacute',
  'Ucircumflex', 'Ugrave', 'dotlessi', 'circumflex', 'tilde', 'macron',
  'breve', 'dotaccent', 'ring', 'cedilla', 'hungarumlaut', 'ogonek', 'caron',
  'Lslash', 'lslash', 'Scaron', 'scaron', 'Zcaron', 'zcaron', 'brokenbar',
  'Eth', 'eth', 'Yacute', 'yacute', 'Thorn', 'thorn', 'minus', 'multiply',
  'onesuperior', 'twosuperior', 'threesuperior', 'onehalf', 'onequarter',
  'threequarters', 'franc', 'Gbreve', 'gbreve', 'Idotaccent', 'Scedilla',
  'scedilla', 'Cacute', 'cacute', 'Ccaron', 'ccaron', 'dcroat'];

function adjustWidths(properties) {
  if (!properties.fontMatrix) {
    return;
  }
  if (properties.fontMatrix[0] === FONT_IDENTITY_MATRIX[0]) {
    return;
  }
  // adjusting width to fontMatrix scale
  var scale = 0.001 / properties.fontMatrix[0];
  var glyphsWidths = properties.widths;
  for (var glyph in glyphsWidths) {
    glyphsWidths[glyph] *= scale;
  }
  properties.defaultWidth *= scale;
}

function getFontType(type, subtype) {
  switch (type) {
    case 'Type1':
      return subtype === 'Type1C' ? FontType.TYPE1C : FontType.TYPE1;
    case 'CIDFontType0':
      return subtype === 'CIDFontType0C' ? FontType.CIDFONTTYPE0C :
        FontType.CIDFONTTYPE0;
    case 'OpenType':
      return FontType.OPENTYPE;
    case 'TrueType':
      return FontType.TRUETYPE;
    case 'CIDFontType2':
      return FontType.CIDFONTTYPE2;
    case 'MMType1':
      return FontType.MMTYPE1;
    case 'Type0':
      return FontType.TYPE0;
    default:
      return FontType.UNKNOWN;
  }
}

var Glyph = (function GlyphClosure() {
  function Glyph(fontChar, unicode, accent, width, vmetric, operatorListId,
                 isSpace, isInFont) {
    this.fontChar = fontChar;
    this.unicode = unicode;
    this.accent = accent;
    this.width = width;
    this.vmetric = vmetric;
    this.operatorListId = operatorListId;
    this.isSpace = isSpace;
    this.isInFont = isInFont;
  }

  Glyph.prototype.matchesForCache = function(fontChar, unicode, accent, width,
                                             vmetric, operatorListId, isSpace,
                                             isInFont) {
    return this.fontChar === fontChar &&
           this.unicode === unicode &&
           this.accent === accent &&
           this.width === width &&
           this.vmetric === vmetric &&
           this.operatorListId === operatorListId &&
           this.isSpace === isSpace &&
           this.isInFont === isInFont;
  };

  return Glyph;
})();

var ToUnicodeMap = (function ToUnicodeMapClosure() {
  function ToUnicodeMap(cmap) {
    // The elements of this._map can be integers or strings, depending on how
    // |cmap| was created.
    this._map = cmap;
  }

  ToUnicodeMap.prototype = {
    get length() {
      return this._map.length;
    },

    forEach: function(callback) {
      for (var charCode in this._map) {
        callback(charCode, this._map[charCode].charCodeAt(0));
      }
    },

    has: function(i) {
      return this._map[i] !== undefined;
    },

    get: function(i) {
      return this._map[i];
    },

    charCodeOf: function(v) {
      return this._map.indexOf(v);
    }
  };

  return ToUnicodeMap;
})();

var IdentityToUnicodeMap = (function IdentityToUnicodeMapClosure() {
  function IdentityToUnicodeMap(firstChar, lastChar) {
    this.firstChar = firstChar;
    this.lastChar = lastChar;
  }

  IdentityToUnicodeMap.prototype = {
    get length() {
      return (this.lastChar + 1) - this.firstChar;
    },

    forEach: function (callback) {
      for (var i = this.firstChar, ii = this.lastChar; i <= ii; i++) {
        callback(i, i);
      }
    },

    has: function (i) {
      return this.firstChar <= i && i <= this.lastChar;
    },

    get: function (i) {
      if (this.firstChar <= i && i <= this.lastChar) {
        return String.fromCharCode(i);
      }
      return undefined;
    },

    charCodeOf: function (v) {
      return (isInt(v) && v >= this.firstChar && v <= this.lastChar) ? v : -1;
    }
  };

  return IdentityToUnicodeMap;
})();

var OpenTypeFileBuilder = (function OpenTypeFileBuilderClosure() {
  function writeInt16(dest, offset, num) {
    dest[offset] = (num >> 8) & 0xFF;
    dest[offset + 1] = num & 0xFF;
  }

  function writeInt32(dest, offset, num) {
    dest[offset] = (num >> 24) & 0xFF;
    dest[offset + 1] = (num >> 16) & 0xFF;
    dest[offset + 2] = (num >> 8) & 0xFF;
    dest[offset + 3] = num & 0xFF;
  }

  function writeData(dest, offset, data) {
    var i, ii;
    if (data instanceof Uint8Array) {
      dest.set(data, offset);
    } else if (typeof data === 'string') {
      for (i = 0, ii = data.length; i < ii; i++) {
        dest[offset++] = data.charCodeAt(i) & 0xFF;
      }
    } else {
      // treating everything else as array
      for (i = 0, ii = data.length; i < ii; i++) {
        dest[offset++] = data[i] & 0xFF;
      }
    }
  }

  function OpenTypeFileBuilder(sfnt) {
    this.sfnt = sfnt;
    this.tables = Object.create(null);
  }

  OpenTypeFileBuilder.getSearchParams =
      function OpenTypeFileBuilder_getSearchParams(entriesCount, entrySize) {
    var maxPower2 = 1, log2 = 0;
    while ((maxPower2 ^ entriesCount) > maxPower2) {
      maxPower2 <<= 1;
      log2++;
    }
    var searchRange = maxPower2 * entrySize;
    return {
      range: searchRange,
      entry: log2,
      rangeShift: entrySize * entriesCount - searchRange
    };
  };

  var OTF_HEADER_SIZE = 12;
  var OTF_TABLE_ENTRY_SIZE = 16;

  OpenTypeFileBuilder.prototype = {
    toArray: function OpenTypeFileBuilder_toArray() {
      var sfnt = this.sfnt;

      // Tables needs to be written by ascendant alphabetic order
      var tables = this.tables;
      var tablesNames = Object.keys(tables);
      tablesNames.sort();
      var numTables = tablesNames.length;

      var i, j, jj, table, tableName;
      // layout the tables data
      var offset = OTF_HEADER_SIZE + numTables * OTF_TABLE_ENTRY_SIZE;
      var tableOffsets = [offset];
      for (i = 0; i < numTables; i++) {
        table = tables[tablesNames[i]];
        var paddedLength = ((table.length + 3) & ~3) >>> 0;
        offset += paddedLength;
        tableOffsets.push(offset);
      }

      var file = new Uint8Array(offset);
      // write the table data first (mostly for checksum)
      for (i = 0; i < numTables; i++) {
        table = tables[tablesNames[i]];
        writeData(file, tableOffsets[i], table);
      }

      // sfnt version (4 bytes)
      if (sfnt === 'true') {
        // Windows hates the Mac TrueType sfnt version number
        sfnt = string32(0x00010000);
      }
      file[0] = sfnt.charCodeAt(0) & 0xFF;
      file[1] = sfnt.charCodeAt(1) & 0xFF;
      file[2] = sfnt.charCodeAt(2) & 0xFF;
      file[3] = sfnt.charCodeAt(3) & 0xFF;

      // numTables (2 bytes)
      writeInt16(file, 4, numTables);

      var searchParams = OpenTypeFileBuilder.getSearchParams(numTables, 16);

      // searchRange (2 bytes)
      writeInt16(file, 6, searchParams.range);
      // entrySelector (2 bytes)
      writeInt16(file, 8, searchParams.entry);
      // rangeShift (2 bytes)
      writeInt16(file, 10, searchParams.rangeShift);

      offset = OTF_HEADER_SIZE;
      // writing table entries
      for (i = 0; i < numTables; i++) {
        tableName = tablesNames[i];
        file[offset] = tableName.charCodeAt(0) & 0xFF;
        file[offset + 1] = tableName.charCodeAt(1) & 0xFF;
        file[offset + 2] = tableName.charCodeAt(2) & 0xFF;
        file[offset + 3] = tableName.charCodeAt(3) & 0xFF;

        // checksum
        var checksum = 0;
        for (j = tableOffsets[i], jj = tableOffsets[i + 1]; j < jj; j += 4) {
          var quad = readUint32(file, j);
          checksum = (checksum + quad) >>> 0;
        }
        writeInt32(file, offset + 4, checksum);

        // offset
        writeInt32(file, offset + 8, tableOffsets[i]);
        // length
        writeInt32(file, offset + 12, tables[tableName].length);

        offset += OTF_TABLE_ENTRY_SIZE;
      }
      return file;
    },

    addTable: function OpenTypeFileBuilder_addTable(tag, data) {
      if (tag in this.tables) {
        throw new Error('Table ' + tag + ' already exists');
      }
      this.tables[tag] = data;
    }
  };

  return OpenTypeFileBuilder;
})();

// Problematic Unicode characters in the fonts that needs to be moved to avoid
// issues when they are painted on the canvas, e.g. complex-script shaping or
// control/whitespace characters. The ranges are listed in pairs: the first item
// is a code of the first problematic code, the second one is the next
// non-problematic code. The ranges must be in sorted order.
var ProblematicCharRanges = new Int32Array([
  // Control characters.
  0x0000, 0x0020,
  0x007F, 0x00A1,
  0x00AD, 0x00AE,
  // Chars that is used in complex-script shaping.
  0x0600, 0x0780,
  0x08A0, 0x10A0,
  0x1780, 0x1800,
  // General punctuation chars.
  0x2000, 0x2010,
  0x2011, 0x2012,
  0x2028, 0x2030,
  0x205F, 0x2070,
  0x25CC, 0x25CD,
  // Chars that is used in complex-script shaping.
  0xAA60, 0xAA80,
  // Specials Unicode block.
  0xFFF0, 0x10000
]);

/**
 * 'Font' is the class the outside world should use, it encapsulate all the font
 * decoding logics whatever type it is (assuming the font type is supported).
 *
 * For example to read a Type1 font and to attach it to the document:
 *   var type1Font = new Font("MyFontName", binaryFile, propertiesObject);
 *   type1Font.bind();
 */
var Font = (function FontClosure() {
  function Font(name, file, properties) {
    var charCode, glyphName, unicode;

    this.name = name;
    this.loadedName = properties.loadedName;
    this.isType3Font = properties.isType3Font;
    this.sizes = [];
    this.missingFile = false;

    this.glyphCache = Object.create(null);

    var names = name.split('+');
    names = names.length > 1 ? names[1] : names[0];
    names = names.split(/[-,_]/g)[0];
    this.isSerifFont = !!(properties.flags & FontFlags.Serif);
    this.isSymbolicFont = !!(properties.flags & FontFlags.Symbolic);
    this.isMonospace = !!(properties.flags & FontFlags.FixedPitch);

    var type = properties.type;
    var subtype = properties.subtype;
    this.type = type;

    this.fallbackName = (this.isMonospace ? 'monospace' :
                         (this.isSerifFont ? 'serif' : 'sans-serif'));

    this.differences = properties.differences;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.composite = properties.composite;
    this.wideChars = properties.wideChars;
    this.cMap = properties.cMap;
    this.ascent = properties.ascent / PDF_GLYPH_SPACE_UNITS;
    this.descent = properties.descent / PDF_GLYPH_SPACE_UNITS;
    this.fontMatrix = properties.fontMatrix;
    this.bbox = properties.bbox;

    this.toUnicode = properties.toUnicode;

    this.toFontChar = [];

    if (properties.type === 'Type3') {
      for (charCode = 0; charCode < 256; charCode++) {
        this.toFontChar[charCode] = (this.differences[charCode] ||
                                     properties.defaultEncoding[charCode]);
      }
      this.fontType = FontType.TYPE3;
      return;
    }

    this.cidEncoding = properties.cidEncoding;
    this.vertical = properties.vertical;
    if (this.vertical) {
      this.vmetrics = properties.vmetrics;
      this.defaultVMetrics = properties.defaultVMetrics;
    }
    var glyphsUnicodeMap;
    if (!file || file.isEmpty) {
      if (file) {
        // Some bad PDF generators will include empty font files,
        // attempting to recover by assuming that no file exists.
        warn('Font file is empty in "' + name + '" (' + this.loadedName + ')');
      }

      this.missingFile = true;
      // The file data is not specified. Trying to fix the font name
      // to be used with the canvas.font.
      var fontName = name.replace(/[,_]/g, '-');
      var stdFontMap = getStdFontMap(), nonStdFontMap = getNonStdFontMap();
      var isStandardFont = !!stdFontMap[fontName] ||
        !!(nonStdFontMap[fontName] && stdFontMap[nonStdFontMap[fontName]]);
      fontName = stdFontMap[fontName] || nonStdFontMap[fontName] || fontName;

      this.bold = (fontName.search(/bold/gi) !== -1);
      this.italic = ((fontName.search(/oblique/gi) !== -1) ||
                     (fontName.search(/italic/gi) !== -1));

      // Use 'name' instead of 'fontName' here because the original
      // name ArialBlack for example will be replaced by Helvetica.
      this.black = (name.search(/Black/g) !== -1);

      // if at least one width is present, remeasure all chars when exists
      this.remeasure = Object.keys(this.widths).length > 0;
      if (isStandardFont && type === 'CIDFontType2' &&
          properties.cidEncoding.indexOf('Identity-') === 0) {
        var GlyphMapForStandardFonts = getGlyphMapForStandardFonts();
        // Standard fonts might be embedded as CID font without glyph mapping.
        // Building one based on GlyphMapForStandardFonts.
        var map = [];
        for (charCode in GlyphMapForStandardFonts) {
          map[+charCode] = GlyphMapForStandardFonts[charCode];
        }
        if (/ArialBlack/i.test(name)) {
          var SupplementalGlyphMapForArialBlack =
            getSupplementalGlyphMapForArialBlack();
          for (charCode in SupplementalGlyphMapForArialBlack) {
            map[+charCode] = SupplementalGlyphMapForArialBlack[charCode];
          }
        }
        var isIdentityUnicode = this.toUnicode instanceof IdentityToUnicodeMap;
        if (!isIdentityUnicode) {
          this.toUnicode.forEach(function(charCode, unicodeCharCode) {
            map[+charCode] = unicodeCharCode;
          });
        }
        this.toFontChar = map;
        this.toUnicode = new ToUnicodeMap(map);
      } else if (/Symbol/i.test(fontName)) {
        this.toFontChar = buildToFontChar(SymbolSetEncoding, getGlyphsUnicode(),
                                          properties.differences);
      } else if (/Dingbats/i.test(fontName)) {
        if (/Wingdings/i.test(name)) {
          warn('Non-embedded Wingdings font, falling back to ZapfDingbats.');
        }
        this.toFontChar = buildToFontChar(ZapfDingbatsEncoding,
                                          getDingbatsGlyphsUnicode(),
                                          properties.differences);
      } else if (isStandardFont) {
        this.toFontChar = buildToFontChar(properties.defaultEncoding,
                                          getGlyphsUnicode(),
                                          properties.differences);
      } else {
        glyphsUnicodeMap = getGlyphsUnicode();
        this.toUnicode.forEach(function(charCode, unicodeCharCode) {
          if (!this.composite) {
            glyphName = (properties.differences[charCode] ||
                         properties.defaultEncoding[charCode]);
            unicode = getUnicodeForGlyph(glyphName, glyphsUnicodeMap);
            if (unicode !== -1) {
              unicodeCharCode = unicode;
            }
          }
          this.toFontChar[charCode] = unicodeCharCode;
        }.bind(this));
      }
      this.loadedName = fontName.split('-')[0];
      this.loading = false;
      this.fontType = getFontType(type, subtype);
      return;
    }

    // Some fonts might use wrong font types for Type1C or CIDFontType0C
    if (subtype === 'Type1C' && (type !== 'Type1' && type !== 'MMType1')) {
      // Some TrueType fonts by mistake claim Type1C
      if (isTrueTypeFile(file)) {
        subtype = 'TrueType';
      } else {
        type = 'Type1';
      }
    }
    if (subtype === 'CIDFontType0C' && type !== 'CIDFontType0') {
      type = 'CIDFontType0';
    }
    if (subtype === 'OpenType') {
      type = 'OpenType';
    }
    // Some CIDFontType0C fonts by mistake claim CIDFontType0.
    if (type === 'CIDFontType0') {
      if (isType1File(file)) {
        subtype = 'CIDFontType0';
      } else if (isOpenTypeFile(file)) {
        // Sometimes the type/subtype can be a complete lie (see issue6782.pdf).
        type = subtype = 'OpenType';
      } else {
        subtype = 'CIDFontType0C';
      }
    }

    var data;
    switch (type) {
      case 'MMType1':
        info('MMType1 font (' + name + '), falling back to Type1.');
        /* falls through */
      case 'Type1':
      case 'CIDFontType0':
        this.mimetype = 'font/opentype';

        var cff = (subtype === 'Type1C' || subtype === 'CIDFontType0C') ?
          new CFFFont(file, properties) : new Type1Font(name, file, properties);

        adjustWidths(properties);

        // Wrap the CFF data inside an OTF font file
        data = this.convert(name, cff, properties);
        break;

      case 'OpenType':
      case 'TrueType':
      case 'CIDFontType2':
        this.mimetype = 'font/opentype';

        // Repair the TrueType file. It is can be damaged in the point of
        // view of the sanitizer
        data = this.checkAndRepair(name, file, properties);
        if (this.isOpenType) {
          adjustWidths(properties);

          type = 'OpenType';
        }
        break;

      default:
        error('Font ' + type + ' is not supported');
        break;
    }

    this.data = data;
    this.fontType = getFontType(type, subtype);

    // Transfer some properties again that could change during font conversion
    this.fontMatrix = properties.fontMatrix;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.encoding = properties.baseEncoding;
    this.seacMap = properties.seacMap;

    this.loading = true;
  }

  Font.getFontID = (function () {
    var ID = 1;
    return function Font_getFontID() {
      return String(ID++);
    };
  })();

  function int16(b0, b1) {
    return (b0 << 8) + b1;
  }

  function signedInt16(b0, b1) {
    var value = (b0 << 8) + b1;
    return value & (1 << 15) ? value - 0x10000 : value;
  }

  function int32(b0, b1, b2, b3) {
    return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
  }

  function string16(value) {
    return String.fromCharCode((value >> 8) & 0xff, value & 0xff);
  }

  function safeString16(value) {
    // clamp value to the 16-bit int range
    value = (value > 0x7FFF ? 0x7FFF : (value < -0x8000 ? -0x8000 : value));
    return String.fromCharCode((value >> 8) & 0xff, value & 0xff);
  }

  function isTrueTypeFile(file) {
    var header = file.peekBytes(4);
    return readUint32(header, 0) === 0x00010000;
  }

  function isOpenTypeFile(file) {
    var header = file.peekBytes(4);
    return bytesToString(header) === 'OTTO';
  }

  function isType1File(file) {
    var header = file.peekBytes(2);
    // All Type1 font programs must begin with the comment '%!' (0x25 + 0x21).
    if (header[0] === 0x25 && header[1] === 0x21) {
      return true;
    }
    // ... obviously some fonts violate that part of the specification,
    // please refer to the comment in |Type1Font| below.
    if (header[0] === 0x80 && header[1] === 0x01) { // pfb file header.
      return true;
    }
    return false;
  }

  function buildToFontChar(encoding, glyphsUnicodeMap, differences) {
    var toFontChar = [], unicode;
    for (var i = 0, ii = encoding.length; i < ii; i++) {
      unicode = getUnicodeForGlyph(encoding[i], glyphsUnicodeMap);
      if (unicode !== -1) {
        toFontChar[i] = unicode;
      }
    }
    for (var charCode in differences) {
      unicode = getUnicodeForGlyph(differences[charCode], glyphsUnicodeMap);
      if (unicode !== -1) {
        toFontChar[+charCode] = unicode;
      }
    }
    return toFontChar;
  }

  /**
   * Helper function for |adjustMapping|.
   * @return {boolean}
   */
  function isProblematicUnicodeLocation(code) {
    // Using binary search to find a range start.
    var i = 0, j = ProblematicCharRanges.length - 1;
    while (i < j) {
      var c = (i + j + 1) >> 1;
      if (code < ProblematicCharRanges[c]) {
        j = c - 1;
      } else {
        i = c;
      }
    }
    // Even index means code in problematic range.
    return !(i & 1);
  }

  /**
   * Rebuilds the char code to glyph ID map by trying to replace the char codes
   * with their unicode value. It also moves char codes that are in known
   * problematic locations.
   * @return {Object} Two properties:
   * 'toFontChar' - maps original char codes(the value that will be read
   * from commands such as show text) to the char codes that will be used in the
   * font that we build
   * 'charCodeToGlyphId' - maps the new font char codes to glyph ids
   */
  function adjustMapping(charCodeToGlyphId, properties) {
    var toUnicode = properties.toUnicode;
    var isSymbolic = !!(properties.flags & FontFlags.Symbolic);
    var isIdentityUnicode =
      properties.toUnicode instanceof IdentityToUnicodeMap;
    var newMap = Object.create(null);
    var toFontChar = [];
    var usedFontCharCodes = [];
    var nextAvailableFontCharCode = PRIVATE_USE_OFFSET_START;
    for (var originalCharCode in charCodeToGlyphId) {
      originalCharCode |= 0;
      var glyphId = charCodeToGlyphId[originalCharCode];
      var fontCharCode = originalCharCode;
      // First try to map the value to a unicode position if a non identity map
      // was created.
      if (!isIdentityUnicode && toUnicode.has(originalCharCode)) {
        var unicode = toUnicode.get(fontCharCode);
        // TODO: Try to map ligatures to the correct spot.
        if (unicode.length === 1) {
          fontCharCode = unicode.charCodeAt(0);
        }
      }
      // Try to move control characters, special characters and already mapped
      // characters to the private use area since they will not be drawn by
      // canvas if left in their current position. Also, move characters if the
      // font was symbolic and there is only an identity unicode map since the
      // characters probably aren't in the correct position (fixes an issue
      // with firefox and thuluthfont).
      if ((usedFontCharCodes[fontCharCode] !== undefined ||
           isProblematicUnicodeLocation(fontCharCode) ||
           (isSymbolic && isIdentityUnicode)) &&
          nextAvailableFontCharCode <= PRIVATE_USE_OFFSET_END) { // Room left.
        // Loop to try and find a free spot in the private use area.
        do {
          fontCharCode = nextAvailableFontCharCode++;

          if (SKIP_PRIVATE_USE_RANGE_F000_TO_F01F && fontCharCode === 0xF000) {
            fontCharCode = 0xF020;
            nextAvailableFontCharCode = fontCharCode + 1;
          }

        } while (usedFontCharCodes[fontCharCode] !== undefined &&
                 nextAvailableFontCharCode <= PRIVATE_USE_OFFSET_END);
      }

      newMap[fontCharCode] = glyphId;
      toFontChar[originalCharCode] = fontCharCode;
      usedFontCharCodes[fontCharCode] = true;
    }
    return {
      toFontChar: toFontChar,
      charCodeToGlyphId: newMap,
      nextAvailableFontCharCode: nextAvailableFontCharCode
    };
  }

  function getRanges(glyphs, numGlyphs) {
    // Array.sort() sorts by characters, not numerically, so convert to an
    // array of characters.
    var codes = [];
    for (var charCode in glyphs) {
      // Remove an invalid glyph ID mappings to make OTS happy.
      if (glyphs[charCode] >= numGlyphs) {
        continue;
      }
      codes.push({ fontCharCode: charCode | 0, glyphId: glyphs[charCode] });
    }
    codes.sort(function fontGetRangesSort(a, b) {
      return a.fontCharCode - b.fontCharCode;
    });

    // Split the sorted codes into ranges.
    var ranges = [];
    var length = codes.length;
    for (var n = 0; n < length; ) {
      var start = codes[n].fontCharCode;
      var codeIndices = [codes[n].glyphId];
      ++n;
      var end = start;
      while (n < length && end + 1 === codes[n].fontCharCode) {
        codeIndices.push(codes[n].glyphId);
        ++end;
        ++n;
        if (end === 0xFFFF) {
          break;
        }
      }
      ranges.push([start, end, codeIndices]);
    }

    return ranges;
  }

  function createCmapTable(glyphs, numGlyphs) {
    var ranges = getRanges(glyphs, numGlyphs);
    var numTables = ranges[ranges.length - 1][1] > 0xFFFF ? 2 : 1;
    var cmap = '\x00\x00' + // version
               string16(numTables) +  // numTables
               '\x00\x03' + // platformID
               '\x00\x01' + // encodingID
               string32(4 + numTables * 8); // start of the table record

    var i, ii, j, jj;
    for (i = ranges.length - 1; i >= 0; --i) {
      if (ranges[i][0] <= 0xFFFF) { break; }
    }
    var bmpLength = i + 1;

    if (ranges[i][0] < 0xFFFF && ranges[i][1] === 0xFFFF) {
      ranges[i][1] = 0xFFFE;
    }
    var trailingRangesCount = ranges[i][1] < 0xFFFF ? 1 : 0;
    var segCount = bmpLength + trailingRangesCount;
    var searchParams = OpenTypeFileBuilder.getSearchParams(segCount, 2);

    // Fill up the 4 parallel arrays describing the segments.
    var startCount = '';
    var endCount = '';
    var idDeltas = '';
    var idRangeOffsets = '';
    var glyphsIds = '';
    var bias = 0;

    var range, start, end, codes;
    for (i = 0, ii = bmpLength; i < ii; i++) {
      range = ranges[i];
      start = range[0];
      end = range[1];
      startCount += string16(start);
      endCount += string16(end);
      codes = range[2];
      var contiguous = true;
      for (j = 1, jj = codes.length; j < jj; ++j) {
        if (codes[j] !== codes[j - 1] + 1) {
          contiguous = false;
          break;
        }
      }
      if (!contiguous) {
        var offset = (segCount - i) * 2 + bias * 2;
        bias += (end - start + 1);

        idDeltas += string16(0);
        idRangeOffsets += string16(offset);

        for (j = 0, jj = codes.length; j < jj; ++j) {
          glyphsIds += string16(codes[j]);
        }
      } else {
        var startCode = codes[0];

        idDeltas += string16((startCode - start) & 0xFFFF);
        idRangeOffsets += string16(0);
      }
    }

    if (trailingRangesCount > 0) {
      endCount += '\xFF\xFF';
      startCount += '\xFF\xFF';
      idDeltas += '\x00\x01';
      idRangeOffsets += '\x00\x00';
    }

    var format314 = '\x00\x00' + // language
                    string16(2 * segCount) +
                    string16(searchParams.range) +
                    string16(searchParams.entry) +
                    string16(searchParams.rangeShift) +
                    endCount + '\x00\x00' + startCount +
                    idDeltas + idRangeOffsets + glyphsIds;

    var format31012 = '';
    var header31012 = '';
    if (numTables > 1) {
      cmap += '\x00\x03' + // platformID
              '\x00\x0A' + // encodingID
              string32(4 + numTables * 8 +
                       4 + format314.length); // start of the table record
      format31012 = '';
      for (i = 0, ii = ranges.length; i < ii; i++) {
        range = ranges[i];
        start = range[0];
        codes = range[2];
        var code = codes[0];
        for (j = 1, jj = codes.length; j < jj; ++j) {
          if (codes[j] !== codes[j - 1] + 1) {
            end = range[0] + j - 1;
            format31012 += string32(start) + // startCharCode
                           string32(end) + // endCharCode
                           string32(code); // startGlyphID
            start = end + 1;
            code = codes[j];
          }
        }
        format31012 += string32(start) + // startCharCode
                       string32(range[1]) + // endCharCode
                       string32(code); // startGlyphID
      }
      header31012 = '\x00\x0C' + // format
                    '\x00\x00' + // reserved
                    string32(format31012.length + 16) + // length
                    '\x00\x00\x00\x00' + // language
                    string32(format31012.length / 12); // nGroups
    }

    return cmap + '\x00\x04' + // format
                  string16(format314.length + 4) + // length
                  format314 + header31012 + format31012;
  }

  function validateOS2Table(os2) {
    var stream = new Stream(os2.data);
    var version = stream.getUint16();
    // TODO verify all OS/2 tables fields, but currently we validate only those
    // that give us issues
    stream.getBytes(60); // skipping type, misc sizes, panose, unicode ranges
    var selection = stream.getUint16();
    if (version < 4 && (selection & 0x0300)) {
      return false;
    }
    var firstChar = stream.getUint16();
    var lastChar = stream.getUint16();
    if (firstChar > lastChar) {
      return false;
    }
    stream.getBytes(6); // skipping sTypoAscender/Descender/LineGap
    var usWinAscent = stream.getUint16();
    if (usWinAscent === 0) { // makes font unreadable by windows
      return false;
    }

    // OS/2 appears to be valid, resetting some fields
    os2.data[8] = os2.data[9] = 0; // IE rejects fonts if fsType != 0
    return true;
  }

  function createOS2Table(properties, charstrings, override) {
    override = override || {
      unitsPerEm: 0,
      yMax: 0,
      yMin: 0,
      ascent: 0,
      descent: 0
    };

    var ulUnicodeRange1 = 0;
    var ulUnicodeRange2 = 0;
    var ulUnicodeRange3 = 0;
    var ulUnicodeRange4 = 0;

    var firstCharIndex = null;
    var lastCharIndex = 0;

    if (charstrings) {
      for (var code in charstrings) {
        code |= 0;
        if (firstCharIndex > code || !firstCharIndex) {
          firstCharIndex = code;
        }
        if (lastCharIndex < code) {
          lastCharIndex = code;
        }

        var position = getUnicodeRangeFor(code);
        if (position < 32) {
          ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
          ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
          ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
          ulUnicodeRange4 |= 1 << position - 96;
        } else {
          error('Unicode ranges Bits > 123 are reserved for internal usage');
        }
      }
    } else {
      // TODO
      firstCharIndex = 0;
      lastCharIndex = 255;
    }

    var bbox = properties.bbox || [0, 0, 0, 0];
    var unitsPerEm = (override.unitsPerEm ||
                      1 / (properties.fontMatrix || FONT_IDENTITY_MATRIX)[0]);

    // if the font units differ to the PDF glyph space units
    // then scale up the values
    var scale = (properties.ascentScaled ? 1.0 :
                 unitsPerEm / PDF_GLYPH_SPACE_UNITS);

    var typoAscent = (override.ascent ||
                      Math.round(scale * (properties.ascent || bbox[3])));
    var typoDescent = (override.descent ||
                       Math.round(scale * (properties.descent || bbox[1])));
    if (typoDescent > 0 && properties.descent > 0 && bbox[1] < 0) {
      typoDescent = -typoDescent; // fixing incorrect descent
    }
    var winAscent = override.yMax || typoAscent;
    var winDescent = -override.yMin || -typoDescent;

    return '\x00\x03' + // version
           '\x02\x24' + // xAvgCharWidth
           '\x01\xF4' + // usWeightClass
           '\x00\x05' + // usWidthClass
           '\x00\x00' + // fstype (0 to let the font loads via font-face on IE)
           '\x02\x8A' + // ySubscriptXSize
           '\x02\xBB' + // ySubscriptYSize
           '\x00\x00' + // ySubscriptXOffset
           '\x00\x8C' + // ySubscriptYOffset
           '\x02\x8A' + // ySuperScriptXSize
           '\x02\xBB' + // ySuperScriptYSize
           '\x00\x00' + // ySuperScriptXOffset
           '\x01\xDF' + // ySuperScriptYOffset
           '\x00\x31' + // yStrikeOutSize
           '\x01\x02' + // yStrikeOutPosition
           '\x00\x00' + // sFamilyClass
           '\x00\x00\x06' +
           String.fromCharCode(properties.fixedPitch ? 0x09 : 0x00) +
           '\x00\x00\x00\x00\x00\x00' + // Panose
           string32(ulUnicodeRange1) + // ulUnicodeRange1 (Bits 0-31)
           string32(ulUnicodeRange2) + // ulUnicodeRange2 (Bits 32-63)
           string32(ulUnicodeRange3) + // ulUnicodeRange3 (Bits 64-95)
           string32(ulUnicodeRange4) + // ulUnicodeRange4 (Bits 96-127)
           '\x2A\x32\x31\x2A' + // achVendID
           string16(properties.italicAngle ? 1 : 0) + // fsSelection
           string16(firstCharIndex ||
                    properties.firstChar) + // usFirstCharIndex
           string16(lastCharIndex || properties.lastChar) +  // usLastCharIndex
           string16(typoAscent) + // sTypoAscender
           string16(typoDescent) + // sTypoDescender
           '\x00\x64' + // sTypoLineGap (7%-10% of the unitsPerEM value)
           string16(winAscent) + // usWinAscent
           string16(winDescent) + // usWinDescent
           '\x00\x00\x00\x00' + // ulCodePageRange1 (Bits 0-31)
           '\x00\x00\x00\x00' + // ulCodePageRange2 (Bits 32-63)
           string16(properties.xHeight) + // sxHeight
           string16(properties.capHeight) + // sCapHeight
           string16(0) + // usDefaultChar
           string16(firstCharIndex || properties.firstChar) + // usBreakChar
           '\x00\x03';  // usMaxContext
  }

  function createPostTable(properties) {
    var angle = Math.floor(properties.italicAngle * (Math.pow(2, 16)));
    return ('\x00\x03\x00\x00' + // Version number
            string32(angle) + // italicAngle
            '\x00\x00' + // underlinePosition
            '\x00\x00' + // underlineThickness
            string32(properties.fixedPitch) + // isFixedPitch
            '\x00\x00\x00\x00' + // minMemType42
            '\x00\x00\x00\x00' + // maxMemType42
            '\x00\x00\x00\x00' + // minMemType1
            '\x00\x00\x00\x00');  // maxMemType1
  }

  function createNameTable(name, proto) {
    if (!proto) {
      proto = [[], []]; // no strings and unicode strings
    }

    var strings = [
      proto[0][0] || 'Original licence',  // 0.Copyright
      proto[0][1] || name,                // 1.Font family
      proto[0][2] || 'Unknown',           // 2.Font subfamily (font weight)
      proto[0][3] || 'uniqueID',          // 3.Unique ID
      proto[0][4] || name,                // 4.Full font name
      proto[0][5] || 'Version 0.11',      // 5.Version
      proto[0][6] || '',                  // 6.Postscript name
      proto[0][7] || 'Unknown',           // 7.Trademark
      proto[0][8] || 'Unknown',           // 8.Manufacturer
      proto[0][9] || 'Unknown'            // 9.Designer
    ];

    // Mac want 1-byte per character strings while Windows want
    // 2-bytes per character, so duplicate the names table
    var stringsUnicode = [];
    var i, ii, j, jj, str;
    for (i = 0, ii = strings.length; i < ii; i++) {
      str = proto[1][i] || strings[i];

      var strBufUnicode = [];
      for (j = 0, jj = str.length; j < jj; j++) {
        strBufUnicode.push(string16(str.charCodeAt(j)));
      }
      stringsUnicode.push(strBufUnicode.join(''));
    }

    var names = [strings, stringsUnicode];
    var platforms = ['\x00\x01', '\x00\x03'];
    var encodings = ['\x00\x00', '\x00\x01'];
    var languages = ['\x00\x00', '\x04\x09'];

    var namesRecordCount = strings.length * platforms.length;
    var nameTable =
      '\x00\x00' +                           // format
      string16(namesRecordCount) +           // Number of names Record
      string16(namesRecordCount * 12 + 6);   // Storage

    // Build the name records field
    var strOffset = 0;
    for (i = 0, ii = platforms.length; i < ii; i++) {
      var strs = names[i];
      for (j = 0, jj = strs.length; j < jj; j++) {
        str = strs[j];
        var nameRecord =
          platforms[i] + // platform ID
          encodings[i] + // encoding ID
          languages[i] + // language ID
          string16(j) + // name ID
          string16(str.length) +
          string16(strOffset);
        nameTable += nameRecord;
        strOffset += str.length;
      }
    }

    nameTable += strings.join('') + stringsUnicode.join('');
    return nameTable;
  }

  Font.prototype = {
    name: null,
    font: null,
    mimetype: null,
    encoding: null,
    get renderer() {
      var renderer = FontRendererFactory.create(this, SEAC_ANALYSIS_ENABLED);
      return shadow(this, 'renderer', renderer);
    },

    exportData: function Font_exportData() {
      // TODO remove enumerating of the properties, e.g. hardcode exact names.
      var data = {};
      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          data[i] = this[i];
        }
      }
      return data;
    },

    checkAndRepair: function Font_checkAndRepair(name, font, properties) {
      function readTableEntry(file) {
        var tag = bytesToString(file.getBytes(4));

        var checksum = file.getInt32() >>> 0;
        var offset = file.getInt32() >>> 0;
        var length = file.getInt32() >>> 0;

        // Read the table associated data
        var previousPosition = file.pos;
        file.pos = file.start ? file.start : 0;
        file.skip(offset);
        var data = file.getBytes(length);
        file.pos = previousPosition;

        if (tag === 'head') {
          // clearing checksum adjustment
          data[8] = data[9] = data[10] = data[11] = 0;
          data[17] |= 0x20; //Set font optimized for cleartype flag
        }

        return {
          tag: tag,
          checksum: checksum,
          length: length,
          offset: offset,
          data: data
        };
      }

      function readOpenTypeHeader(ttf) {
        return {
          version: bytesToString(ttf.getBytes(4)),
          numTables: ttf.getUint16(),
          searchRange: ttf.getUint16(),
          entrySelector: ttf.getUint16(),
          rangeShift: ttf.getUint16()
        };
      }

      /**
       * Read the appropriate subtable from the cmap according to 9.6.6.4 from
       * PDF spec
       */
      function readCmapTable(cmap, font, isSymbolicFont, hasEncoding) {
        if (!cmap) {
          warn('No cmap table available.');
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }
        var segment;
        var start = (font.start ? font.start : 0) + cmap.offset;
        font.pos = start;

        var version = font.getUint16();
        var numTables = font.getUint16();

        var potentialTable;
        var canBreak = false;
        // There's an order of preference in terms of which cmap subtable to
        // use:
        // - non-symbolic fonts the preference is a 3,1 table then a 1,0 table
        // - symbolic fonts the preference is a 3,0 table then a 1,0 table
        // The following takes advantage of the fact that the tables are sorted
        // to work.
        for (var i = 0; i < numTables; i++) {
          var platformId = font.getUint16();
          var encodingId = font.getUint16();
          var offset = font.getInt32() >>> 0;
          var useTable = false;

          if (platformId === 0 && encodingId === 0) {
            useTable = true;
            // Continue the loop since there still may be a higher priority
            // table.
          } else if (platformId === 1 && encodingId === 0) {
            useTable = true;
            // Continue the loop since there still may be a higher priority
            // table.
          } else if (platformId === 3 && encodingId === 1 &&
                     ((!isSymbolicFont && hasEncoding) || !potentialTable)) {
            useTable = true;
            if (!isSymbolicFont) {
              canBreak = true;
            }
          } else if (isSymbolicFont && platformId === 3 && encodingId === 0) {
            useTable = true;
            canBreak = true;
          }

          if (useTable) {
            potentialTable = {
              platformId: platformId,
              encodingId: encodingId,
              offset: offset
            };
          }
          if (canBreak) {
            break;
          }
        }

        if (potentialTable) {
          font.pos = start + potentialTable.offset;
        }
        if (!potentialTable || font.peekByte() === -1) {
          warn('Could not find a preferred cmap table.');
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        var format = font.getUint16();
        var length = font.getUint16();
        var language = font.getUint16();

        var hasShortCmap = false;
        var mappings = [];
        var j, glyphId;

        // TODO(mack): refactor this cmap subtable reading logic out
        if (format === 0) {
          for (j = 0; j < 256; j++) {
            var index = font.getByte();
            if (!index) {
              continue;
            }
            mappings.push({
              charCode: j,
              glyphId: index
            });
          }
          hasShortCmap = true;
        } else if (format === 4) {
          // re-creating the table in format 4 since the encoding
          // might be changed
          var segCount = (font.getUint16() >> 1);
          font.getBytes(6); // skipping range fields
          var segIndex, segments = [];
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments.push({ end: font.getUint16() });
          }
          font.getUint16();
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].start = font.getUint16();
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segments[segIndex].delta = font.getUint16();
          }

          var offsetsCount = 0;
          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            var rangeOffset = font.getUint16();
            if (!rangeOffset) {
              segment.offsetIndex = -1;
              continue;
            }

            var offsetIndex = (rangeOffset >> 1) - (segCount - segIndex);
            segment.offsetIndex = offsetIndex;
            offsetsCount = Math.max(offsetsCount, offsetIndex +
                                    segment.end - segment.start + 1);
          }

          var offsets = [];
          for (j = 0; j < offsetsCount; j++) {
            offsets.push(font.getUint16());
          }

          for (segIndex = 0; segIndex < segCount; segIndex++) {
            segment = segments[segIndex];
            start = segment.start;
            var end = segment.end;
            var delta = segment.delta;
            offsetIndex = segment.offsetIndex;

            for (j = start; j <= end; j++) {
              if (j === 0xFFFF) {
                continue;
              }

              glyphId = (offsetIndex < 0 ?
                         j : offsets[offsetIndex + j - start]);
              glyphId = (glyphId + delta) & 0xFFFF;
              if (glyphId === 0) {
                continue;
              }
              mappings.push({
                charCode: j,
                glyphId: glyphId
              });
            }
          }
        } else if (format === 6) {
          // Format 6 is a 2-bytes dense mapping, which means the font data
          // lives glue together even if they are pretty far in the unicode
          // table. (This looks weird, so I can have missed something), this
          // works on Linux but seems to fails on Mac so let's rewrite the
          // cmap table to a 3-1-4 style
          var firstCode = font.getUint16();
          var entryCount = font.getUint16();

          for (j = 0; j < entryCount; j++) {
            glyphId = font.getUint16();
            var charCode = firstCode + j;

            mappings.push({
              charCode: charCode,
              glyphId: glyphId
            });
          }
        } else {
          warn('cmap table has unsupported format: ' + format);
          return {
            platformId: -1,
            encodingId: -1,
            mappings: [],
            hasShortCmap: false
          };
        }

        // removing duplicate entries
        mappings.sort(function (a, b) {
          return a.charCode - b.charCode;
        });
        for (i = 1; i < mappings.length; i++) {
          if (mappings[i - 1].charCode === mappings[i].charCode) {
            mappings.splice(i, 1);
            i--;
          }
        }

        return {
          platformId: potentialTable.platformId,
          encodingId: potentialTable.encodingId,
          mappings: mappings,
          hasShortCmap: hasShortCmap
        };
      }

      function sanitizeMetrics(font, header, metrics, numGlyphs) {
        if (!header) {
          if (metrics) {
            metrics.data = null;
          }
          return;
        }

        font.pos = (font.start ? font.start : 0) + header.offset;
        font.pos += header.length - 2;
        var numOfMetrics = font.getUint16();

        if (numOfMetrics > numGlyphs) {
          info('The numOfMetrics (' + numOfMetrics + ') should not be ' +
               'greater than the numGlyphs (' + numGlyphs + ')');
          // Reduce numOfMetrics if it is greater than numGlyphs
          numOfMetrics = numGlyphs;
          header.data[34] = (numOfMetrics & 0xff00) >> 8;
          header.data[35] = numOfMetrics & 0x00ff;
        }

        var numOfSidebearings = numGlyphs - numOfMetrics;
        var numMissing = numOfSidebearings -
          ((metrics.length - numOfMetrics * 4) >> 1);

        if (numMissing > 0) {
          // For each missing glyph, we set both the width and lsb to 0 (zero).
          // Since we need to add two properties for each glyph, this explains
          // the use of |numMissing * 2| when initializing the typed array.
          var entries = new Uint8Array(metrics.length + numMissing * 2);
          entries.set(metrics.data);
          metrics.data = entries;
        }
      }

      function sanitizeGlyph(source, sourceStart, sourceEnd, dest, destStart,
                             hintsValid) {
        if (sourceEnd - sourceStart <= 12) {
          // glyph with data less than 12 is invalid one
          return 0;
        }
        var glyf = source.subarray(sourceStart, sourceEnd);
        var contoursCount = (glyf[0] << 8) | glyf[1];
        if (contoursCount & 0x8000) {
          // complex glyph, writing as is
          dest.set(glyf, destStart);
          return glyf.length;
        }

        var i, j = 10, flagsCount = 0;
        for (i = 0; i < contoursCount; i++) {
          var endPoint = (glyf[j] << 8) | glyf[j + 1];
          flagsCount = endPoint + 1;
          j += 2;
        }
        // skipping instructions
        var instructionsStart = j;
        var instructionsLength = (glyf[j] << 8) | glyf[j + 1];
        j += 2 + instructionsLength;
        var instructionsEnd = j;
        // validating flags
        var coordinatesLength = 0;
        for (i = 0; i < flagsCount; i++) {
          var flag = glyf[j++];
          if (flag & 0xC0) {
            // reserved flags must be zero, cleaning up
            glyf[j - 1] = flag & 0x3F;
          }
          var xyLength = ((flag & 2) ? 1 : (flag & 16) ? 0 : 2) +
                         ((flag & 4) ? 1 : (flag & 32) ? 0 : 2);
          coordinatesLength += xyLength;
          if (flag & 8) {
            var repeat = glyf[j++];
            i += repeat;
            coordinatesLength += repeat * xyLength;
          }
        }
        // glyph without coordinates will be rejected
        if (coordinatesLength === 0) {
          return 0;
        }
        var glyphDataLength = j + coordinatesLength;
        if (glyphDataLength > glyf.length) {
          // not enough data for coordinates
          return 0;
        }
        if (!hintsValid && instructionsLength > 0) {
          dest.set(glyf.subarray(0, instructionsStart), destStart);
          dest.set([0, 0], destStart + instructionsStart);
          dest.set(glyf.subarray(instructionsEnd, glyphDataLength),
                   destStart + instructionsStart + 2);
          glyphDataLength -= instructionsLength;
          if (glyf.length - glyphDataLength > 3) {
            glyphDataLength = (glyphDataLength + 3) & ~3;
          }
          return glyphDataLength;
        }
        if (glyf.length - glyphDataLength > 3) {
          // truncating and aligning to 4 bytes the long glyph data
          glyphDataLength = (glyphDataLength + 3) & ~3;
          dest.set(glyf.subarray(0, glyphDataLength), destStart);
          return glyphDataLength;
        }
        // glyph data is fine
        dest.set(glyf, destStart);
        return glyf.length;
      }

      function sanitizeHead(head, numGlyphs, locaLength) {
        var data = head.data;

        // Validate version:
        // Should always be 0x00010000
        var version = int32(data[0], data[1], data[2], data[3]);
        if (version >> 16 !== 1) {
          info('Attempting to fix invalid version in head table: ' + version);
          data[0] = 0;
          data[1] = 1;
          data[2] = 0;
          data[3] = 0;
        }

        var indexToLocFormat = int16(data[50], data[51]);
        if (indexToLocFormat < 0 || indexToLocFormat > 1) {
          info('Attempting to fix invalid indexToLocFormat in head table: ' +
               indexToLocFormat);

          // The value of indexToLocFormat should be 0 if the loca table
          // consists of short offsets, and should be 1 if the loca table
          // consists of long offsets.
          //
          // The number of entries in the loca table should be numGlyphs + 1.
          //
          // Using this information, we can work backwards to deduce if the
          // size of each offset in the loca table, and thus figure out the
          // appropriate value for indexToLocFormat.

          var numGlyphsPlusOne = numGlyphs + 1;
          if (locaLength === numGlyphsPlusOne << 1) {
            // 0x0000 indicates the loca table consists of short offsets
            data[50] = 0;
            data[51] = 0;
          } else if (locaLength === numGlyphsPlusOne << 2) {
            // 0x0001 indicates the loca table consists of long offsets
            data[50] = 0;
            data[51] = 1;
          } else {
            warn('Could not fix indexToLocFormat: ' + indexToLocFormat);
          }
        }
      }

      function sanitizeGlyphLocations(loca, glyf, numGlyphs,
                                      isGlyphLocationsLong, hintsValid,
                                      dupFirstEntry) {
        var itemSize, itemDecode, itemEncode;
        if (isGlyphLocationsLong) {
          itemSize = 4;
          itemDecode = function fontItemDecodeLong(data, offset) {
            return (data[offset] << 24) | (data[offset + 1] << 16) |
                   (data[offset + 2] << 8) | data[offset + 3];
          };
          itemEncode = function fontItemEncodeLong(data, offset, value) {
            data[offset] = (value >>> 24) & 0xFF;
            data[offset + 1] = (value >> 16) & 0xFF;
            data[offset + 2] = (value >> 8) & 0xFF;
            data[offset + 3] = value & 0xFF;
          };
        } else {
          itemSize = 2;
          itemDecode = function fontItemDecode(data, offset) {
            return (data[offset] << 9) | (data[offset + 1] << 1);
          };
          itemEncode = function fontItemEncode(data, offset, value) {
            data[offset] = (value >> 9) & 0xFF;
            data[offset + 1] = (value >> 1) & 0xFF;
          };
        }
        var locaData = loca.data;
        var locaDataSize = itemSize * (1 + numGlyphs);
        // is loca.data too short or long?
        if (locaData.length !== locaDataSize) {
          locaData = new Uint8Array(locaDataSize);
          locaData.set(loca.data.subarray(0, locaDataSize));
          loca.data = locaData;
        }
        // removing the invalid glyphs
        var oldGlyfData = glyf.data;
        var oldGlyfDataLength = oldGlyfData.length;
        var newGlyfData = new Uint8Array(oldGlyfDataLength);
        var startOffset = itemDecode(locaData, 0);
        var writeOffset = 0;
        var missingGlyphData = Object.create(null);
        itemEncode(locaData, 0, writeOffset);
        var i, j;
        for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
          var endOffset = itemDecode(locaData, j);
          if (endOffset > oldGlyfDataLength &&
              ((oldGlyfDataLength + 3) & ~3) === endOffset) {
            // Aspose breaks fonts by aligning the glyphs to the qword, but not
            // the glyf table size, which makes last glyph out of range.
            endOffset = oldGlyfDataLength;
          }
          if (endOffset > oldGlyfDataLength) {
            // glyph end offset points outside glyf data, rejecting the glyph
            itemEncode(locaData, j, writeOffset);
            startOffset = endOffset;
            continue;
          }

          if (startOffset === endOffset) {
            missingGlyphData[i] = true;
          }

          var newLength = sanitizeGlyph(oldGlyfData, startOffset, endOffset,
                                        newGlyfData, writeOffset, hintsValid);
          writeOffset += newLength;
          itemEncode(locaData, j, writeOffset);
          startOffset = endOffset;
        }

        if (writeOffset === 0) {
          // glyf table cannot be empty -- redoing the glyf and loca tables
          // to have single glyph with one point
          var simpleGlyph = new Uint8Array(
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0]);
          for (i = 0, j = itemSize; i < numGlyphs; i++, j += itemSize) {
            itemEncode(locaData, j, simpleGlyph.length);
          }
          glyf.data = simpleGlyph;
          return missingGlyphData;
        }

        if (dupFirstEntry) {
          var firstEntryLength = itemDecode(locaData, itemSize);
          if (newGlyfData.length > firstEntryLength + writeOffset) {
            glyf.data = newGlyfData.subarray(0, firstEntryLength + writeOffset);
          } else {
            glyf.data = new Uint8Array(firstEntryLength + writeOffset);
            glyf.data.set(newGlyfData.subarray(0, writeOffset));
          }
          glyf.data.set(newGlyfData.subarray(0, firstEntryLength), writeOffset);
          itemEncode(loca.data, locaData.length - itemSize,
                     writeOffset + firstEntryLength);
        } else {
          glyf.data = newGlyfData.subarray(0, writeOffset);
        }
        return missingGlyphData;
      }

      function readPostScriptTable(post, properties, maxpNumGlyphs) {
        var start = (font.start ? font.start : 0) + post.offset;
        font.pos = start;

        var length = post.length, end = start + length;
        var version = font.getInt32();
        // skip rest to the tables
        font.getBytes(28);

        var glyphNames;
        var valid = true;
        var i;

        switch (version) {
          case 0x00010000:
            glyphNames = MacStandardGlyphOrdering;
            break;
          case 0x00020000:
            var numGlyphs = font.getUint16();
            if (numGlyphs !== maxpNumGlyphs) {
              valid = false;
              break;
            }
            var glyphNameIndexes = [];
            for (i = 0; i < numGlyphs; ++i) {
              var index = font.getUint16();
              if (index >= 32768) {
                valid = false;
                break;
              }
              glyphNameIndexes.push(index);
            }
            if (!valid) {
              break;
            }
            var customNames = [];
            var strBuf = [];
            while (font.pos < end) {
              var stringLength = font.getByte();
              strBuf.length = stringLength;
              for (i = 0; i < stringLength; ++i) {
                strBuf[i] = String.fromCharCode(font.getByte());
              }
              customNames.push(strBuf.join(''));
            }
            glyphNames = [];
            for (i = 0; i < numGlyphs; ++i) {
              var j = glyphNameIndexes[i];
              if (j < 258) {
                glyphNames.push(MacStandardGlyphOrdering[j]);
                continue;
              }
              glyphNames.push(customNames[j - 258]);
            }
            break;
          case 0x00030000:
            break;
          default:
            warn('Unknown/unsupported post table version ' + version);
            valid = false;
            if (properties.defaultEncoding) {
              glyphNames = properties.defaultEncoding;
            }
            break;
        }
        properties.glyphNames = glyphNames;
        return valid;
      }

      function readNameTable(nameTable) {
        var start = (font.start ? font.start : 0) + nameTable.offset;
        font.pos = start;

        var names = [[], []];
        var length = nameTable.length, end = start + length;
        var format = font.getUint16();
        var FORMAT_0_HEADER_LENGTH = 6;
        if (format !== 0 || length < FORMAT_0_HEADER_LENGTH) {
          // unsupported name table format or table "too" small
          return names;
        }
        var numRecords = font.getUint16();
        var stringsStart = font.getUint16();
        var records = [];
        var NAME_RECORD_LENGTH = 12;
        var i, ii;

        for (i = 0; i < numRecords &&
                        font.pos + NAME_RECORD_LENGTH <= end; i++) {
          var r = {
            platform: font.getUint16(),
            encoding: font.getUint16(),
            language: font.getUint16(),
            name: font.getUint16(),
            length: font.getUint16(),
            offset: font.getUint16()
          };
          // using only Macintosh and Windows platform/encoding names
          if ((r.platform === 1 && r.encoding === 0 && r.language === 0) ||
              (r.platform === 3 && r.encoding === 1 && r.language === 0x409)) {
            records.push(r);
          }
        }
        for (i = 0, ii = records.length; i < ii; i++) {
          var record = records[i];
          if (record.length <= 0) {
            continue; // Nothing to process, ignoring.
          }
          var pos = start + stringsStart + record.offset;
          if (pos + record.length > end) {
            continue; // outside of name table, ignoring
          }
          font.pos = pos;
          var nameIndex = record.name;
          if (record.encoding) {
            // unicode
            var str = '';
            for (var j = 0, jj = record.length; j < jj; j += 2) {
              str += String.fromCharCode(font.getUint16());
            }
            names[1][nameIndex] = str;
          } else {
            names[0][nameIndex] = bytesToString(font.getBytes(record.length));
          }
        }
        return names;
      }

      var TTOpsStackDeltas = [
        0, 0, 0, 0, 0, 0, 0, 0, -2, -2, -2, -2, 0, 0, -2, -5,
        -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, -1, -1,
        1, -1, -999, 0, 1, 0, -1, -2, 0, -1, -2, -1, -1, 0, -1, -1,
        0, 0, -999, -999, -1, -1, -1, -1, -2, -999, -2, -2, -999, 0, -2, -2,
        0, 0, -2, 0, -2, 0, 0, 0, -2, -1, -1, 1, 1, 0, 0, -1,
        -1, -1, -1, -1, -1, -1, 0, 0, -1, 0, -1, -1, 0, -999, -1, -1,
        -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        -2, -999, -999, -999, -999, -999, -1, -1, -2, -2, 0, 0, 0, 0, -1, -1,
        -999, -2, -2, 0, 0, -1, -2, -2, 0, 0, 0, -1, -1, -1, -2];
        // 0xC0-DF == -1 and 0xE0-FF == -2

      function sanitizeTTProgram(table, ttContext) {
        var data = table.data;
        var i = 0, j, n, b, funcId, pc, lastEndf = 0, lastDeff = 0;
        var stack = [];
        var callstack = [];
        var functionsCalled = [];
        var tooComplexToFollowFunctions =
          ttContext.tooComplexToFollowFunctions;
        var inFDEF = false, ifLevel = 0, inELSE = 0;
        for (var ii = data.length; i < ii;) {
          var op = data[i++];
          // The TrueType instruction set docs can be found at
          // https://developer.apple.com/fonts/TTRefMan/RM05/Chap5.html
          if (op === 0x40) { // NPUSHB - pushes n bytes
            n = data[i++];
            if (inFDEF || inELSE) {
              i += n;
            } else {
              for (j = 0; j < n; j++) {
                stack.push(data[i++]);
              }
            }
          } else if (op === 0x41) { // NPUSHW - pushes n words
            n = data[i++];
            if (inFDEF || inELSE) {
              i += n * 2;
            } else {
              for (j = 0; j < n; j++) {
                b = data[i++];
                stack.push((b << 8) | data[i++]);
              }
            }
          } else if ((op & 0xF8) === 0xB0) { // PUSHB - pushes bytes
            n = op - 0xB0 + 1;
            if (inFDEF || inELSE) {
              i += n;
            } else {
              for (j = 0; j < n; j++) {
                stack.push(data[i++]);
              }
            }
          } else if ((op & 0xF8) === 0xB8) { // PUSHW - pushes words
            n = op - 0xB8 + 1;
            if (inFDEF || inELSE) {
              i += n * 2;
            } else {
              for (j = 0; j < n; j++) {
                b = data[i++];
                stack.push((b << 8) | data[i++]);
              }
            }
          } else if (op === 0x2B && !tooComplexToFollowFunctions) { // CALL
            if (!inFDEF && !inELSE) {
              // collecting inforamtion about which functions are used
              funcId = stack[stack.length - 1];
              ttContext.functionsUsed[funcId] = true;
              if (funcId in ttContext.functionsStackDeltas) {
                stack.length += ttContext.functionsStackDeltas[funcId];
              } else if (funcId in ttContext.functionsDefined &&
                         functionsCalled.indexOf(funcId) < 0) {
                callstack.push({data: data, i: i, stackTop: stack.length - 1});
                functionsCalled.push(funcId);
                pc = ttContext.functionsDefined[funcId];
                if (!pc) {
                  warn('TT: CALL non-existent function');
                  ttContext.hintsValid = false;
                  return;
                }
                data = pc.data;
                i = pc.i;
              }
            }
          } else if (op === 0x2C && !tooComplexToFollowFunctions) { // FDEF
            if (inFDEF || inELSE) {
              warn('TT: nested FDEFs not allowed');
              tooComplexToFollowFunctions = true;
            }
            inFDEF = true;
            // collecting inforamtion about which functions are defined
            lastDeff = i;
            funcId = stack.pop();
            ttContext.functionsDefined[funcId] = {data: data, i: i};
          } else if (op === 0x2D) { // ENDF - end of function
            if (inFDEF) {
              inFDEF = false;
              lastEndf = i;
            } else {
              pc = callstack.pop();
              if (!pc) {
                warn('TT: ENDF bad stack');
                ttContext.hintsValid = false;
                return;
              }
              funcId = functionsCalled.pop();
              data = pc.data;
              i = pc.i;
              ttContext.functionsStackDeltas[funcId] =
                stack.length - pc.stackTop;
            }
          } else if (op === 0x89) { // IDEF - instruction definition
            if (inFDEF || inELSE) {
              warn('TT: nested IDEFs not allowed');
              tooComplexToFollowFunctions = true;
            }
            inFDEF = true;
            // recording it as a function to track ENDF
            lastDeff = i;
          } else if (op === 0x58) { // IF
            ++ifLevel;
          } else if (op === 0x1B) { // ELSE
            inELSE = ifLevel;
          } else if (op === 0x59) { // EIF
            if (inELSE === ifLevel) {
              inELSE = 0;
            }
            --ifLevel;
          } else if (op === 0x1C) { // JMPR
            if (!inFDEF && !inELSE) {
              var offset = stack[stack.length - 1];
              // only jumping forward to prevent infinite loop
              if (offset > 0) {
                i += offset - 1;
              }
            }
          }
          // Adjusting stack not extactly, but just enough to get function id
          if (!inFDEF && !inELSE) {
            var stackDelta = op <= 0x8E ? TTOpsStackDeltas[op] :
              op >= 0xC0 && op <= 0xDF ? -1 : op >= 0xE0 ? -2 : 0;
            if (op >= 0x71 && op <= 0x75) {
              n = stack.pop();
              if (n === n) {
                stackDelta = -n * 2;
              }
            }
            while (stackDelta < 0 && stack.length > 0) {
              stack.pop();
              stackDelta++;
            }
            while (stackDelta > 0) {
              stack.push(NaN); // pushing any number into stack
              stackDelta--;
            }
          }
        }
        ttContext.tooComplexToFollowFunctions = tooComplexToFollowFunctions;
        var content = [data];
        if (i > data.length) {
          content.push(new Uint8Array(i - data.length));
        }
        if (lastDeff > lastEndf) {
          warn('TT: complementing a missing function tail');
          // new function definition started, but not finished
          // complete function by [CLEAR, ENDF]
          content.push(new Uint8Array([0x22, 0x2D]));
        }
        foldTTTable(table, content);
      }

      function checkInvalidFunctions(ttContext, maxFunctionDefs) {
        if (ttContext.tooComplexToFollowFunctions) {
          return;
        }
        if (ttContext.functionsDefined.length > maxFunctionDefs) {
          warn('TT: more functions defined than expected');
          ttContext.hintsValid = false;
          return;
        }
        for (var j = 0, jj = ttContext.functionsUsed.length; j < jj; j++) {
          if (j > maxFunctionDefs) {
            warn('TT: invalid function id: ' + j);
            ttContext.hintsValid = false;
            return;
          }
          if (ttContext.functionsUsed[j] && !ttContext.functionsDefined[j]) {
            warn('TT: undefined function: ' + j);
            ttContext.hintsValid = false;
            return;
          }
        }
      }

      function foldTTTable(table, content) {
        if (content.length > 1) {
          // concatenating the content items
          var newLength = 0;
          var j, jj;
          for (j = 0, jj = content.length; j < jj; j++) {
            newLength += content[j].length;
          }
          newLength = (newLength + 3) & ~3;
          var result = new Uint8Array(newLength);
          var pos = 0;
          for (j = 0, jj = content.length; j < jj; j++) {
            result.set(content[j], pos);
            pos += content[j].length;
          }
          table.data = result;
          table.length = newLength;
        }
      }

      function sanitizeTTPrograms(fpgm, prep, cvt, maxFunctionDefs) {
        var ttContext = {
          functionsDefined: [],
          functionsUsed: [],
          functionsStackDeltas: [],
          tooComplexToFollowFunctions: false,
          hintsValid: true
        };
        if (fpgm) {
          sanitizeTTProgram(fpgm, ttContext);
        }
        if (prep) {
          sanitizeTTProgram(prep, ttContext);
        }
        if (fpgm) {
          checkInvalidFunctions(ttContext, maxFunctionDefs);
        }
        if (cvt && (cvt.length & 1)) {
          var cvtData = new Uint8Array(cvt.length + 1);
          cvtData.set(cvt.data);
          cvt.data = cvtData;
        }
        return ttContext.hintsValid;
      }

      // The following steps modify the original font data, making copy
      font = new Stream(new Uint8Array(font.getBytes()));

      var VALID_TABLES = ['OS/2', 'cmap', 'head', 'hhea', 'hmtx', 'maxp',
        'name', 'post', 'loca', 'glyf', 'fpgm', 'prep', 'cvt ', 'CFF '];

      var header = readOpenTypeHeader(font);
      var numTables = header.numTables;
      var cff, cffFile;

      var tables = Object.create(null);
      tables['OS/2'] = null;
      tables['cmap'] = null;
      tables['head'] = null;
      tables['hhea'] = null;
      tables['hmtx'] = null;
      tables['maxp'] = null;
      tables['name'] = null;
      tables['post'] = null;

      var table;
      for (var i = 0; i < numTables; i++) {
        table = readTableEntry(font);
        if (VALID_TABLES.indexOf(table.tag) < 0) {
          continue; // skipping table if it's not a required or optional table
        }
        if (table.length === 0) {
          continue; // skipping empty tables
        }
        tables[table.tag] = table;
      }

      var isTrueType = !tables['CFF '];
      if (!isTrueType) {
        // OpenType font
        if ((header.version === 'OTTO' && properties.type !== 'CIDFontType2') ||
            !tables['head'] || !tables['hhea'] || !tables['maxp'] ||
            !tables['post']) {
          // no major tables: throwing everything at CFFFont
          cffFile = new Stream(tables['CFF '].data);
          cff = new CFFFont(cffFile, properties);

          adjustWidths(properties);

          return this.convert(name, cff, properties);
        }

        delete tables['glyf'];
        delete tables['loca'];
        delete tables['fpgm'];
        delete tables['prep'];
        delete tables['cvt '];
        this.isOpenType = true;
      } else {
        if (!tables['loca']) {
          error('Required "loca" table is not found');
        }
        if (!tables['glyf']) {
          warn('Required "glyf" table is not found -- trying to recover.');
          // Note: We use `sanitizeGlyphLocations` to add dummy glyf data below.
          tables['glyf'] = {
            tag: 'glyf',
            data: new Uint8Array(0),
          };
        }
        this.isOpenType = false;
      }

      if (!tables['maxp']) {
        error('Required "maxp" table is not found');
      }

      font.pos = (font.start || 0) + tables['maxp'].offset;
      var version = font.getInt32();
      var numGlyphs = font.getUint16();
      var maxFunctionDefs = 0;
      if (version >= 0x00010000 && tables['maxp'].length >= 22) {
        // maxZones can be invalid
        font.pos += 8;
        var maxZones = font.getUint16();
        if (maxZones > 2) { // reset to 2 if font has invalid maxZones
          tables['maxp'].data[14] = 0;
          tables['maxp'].data[15] = 2;
        }
        font.pos += 4;
        maxFunctionDefs = font.getUint16();
      }

      var dupFirstEntry = false;
      if (properties.type === 'CIDFontType2' && properties.toUnicode &&
          properties.toUnicode.get(0) > '\u0000') {
        // oracle's defect (see 3427), duplicating first entry
        dupFirstEntry = true;
        numGlyphs++;
        tables['maxp'].data[4] = numGlyphs >> 8;
        tables['maxp'].data[5] = numGlyphs & 255;
      }

      var hintsValid = sanitizeTTPrograms(tables['fpgm'], tables['prep'],
                                          tables['cvt '], maxFunctionDefs);
      if (!hintsValid) {
        delete tables['fpgm'];
        delete tables['prep'];
        delete tables['cvt '];
      }

      // Ensure the hmtx table contains the advance width and
      // sidebearings information for numGlyphs in the maxp table
      sanitizeMetrics(font, tables['hhea'], tables['hmtx'], numGlyphs);

      if (!tables['head']) {
        error('Required "head" table is not found');
      }

      sanitizeHead(tables['head'], numGlyphs,
                   isTrueType ? tables['loca'].length : 0);

      var missingGlyphs = Object.create(null);
      if (isTrueType) {
        var isGlyphLocationsLong = int16(tables['head'].data[50],
                                         tables['head'].data[51]);
        missingGlyphs = sanitizeGlyphLocations(tables['loca'], tables['glyf'],
                                               numGlyphs, isGlyphLocationsLong,
                                               hintsValid, dupFirstEntry);
      }

      if (!tables['hhea']) {
        error('Required "hhea" table is not found');
      }

      // Sanitizer reduces the glyph advanceWidth to the maxAdvanceWidth
      // Sometimes it's 0. That needs to be fixed
      if (tables['hhea'].data[10] === 0 && tables['hhea'].data[11] === 0) {
        tables['hhea'].data[10] = 0xFF;
        tables['hhea'].data[11] = 0xFF;
      }

      // Extract some more font properties from the OpenType head and
      // hhea tables; yMin and descent value are always negative.
      var metricsOverride = {
        unitsPerEm: int16(tables['head'].data[18], tables['head'].data[19]),
        yMax: int16(tables['head'].data[42], tables['head'].data[43]),
        yMin: signedInt16(tables['head'].data[38], tables['head'].data[39]),
        ascent: int16(tables['hhea'].data[4], tables['hhea'].data[5]),
        descent: signedInt16(tables['hhea'].data[6], tables['hhea'].data[7])
      };

      // PDF FontDescriptor metrics lie -- using data from actual font.
      this.ascent = metricsOverride.ascent / metricsOverride.unitsPerEm;
      this.descent = metricsOverride.descent / metricsOverride.unitsPerEm;

      // The 'post' table has glyphs names.
      if (tables['post']) {
        var valid = readPostScriptTable(tables['post'], properties, numGlyphs);
        if (!valid) {
          tables['post'] = null;
        }
      }

      var charCodeToGlyphId = [], charCode;
      var toUnicode = properties.toUnicode, widths = properties.widths;
      var skipToUnicode = (toUnicode instanceof IdentityToUnicodeMap ||
                           toUnicode.length === 0x10000);

      // Helper function to try to skip mapping of empty glyphs.
      // Note: In some cases, just relying on the glyph data doesn't work,
      //       hence we also use a few heuristics to fix various PDF files.
      function hasGlyph(glyphId, charCode, widthCode) {
        if (!missingGlyphs[glyphId]) {
          return true;
        }
        if (!skipToUnicode && charCode >= 0 && toUnicode.has(charCode)) {
          return true;
        }
        if (widths && widthCode >= 0 && isNum(widths[widthCode])) {
          return true;
        }
        return false;
      }

      // Some bad PDF generators, e.g. Scribus PDF, include glyph names
      // in a 'uniXXXX' format -- attempting to recover proper ones.
      function recoverGlyphName(name, glyphsUnicodeMap) {
        if (glyphsUnicodeMap[name] !== undefined) {
          return name;
        }
        // The glyph name is non-standard, trying to recover.
        var unicode = getUnicodeForGlyph(name, glyphsUnicodeMap);
        if (unicode !== -1) {
          for (var key in glyphsUnicodeMap) {
            if (glyphsUnicodeMap[key] === unicode) {
              return key;
            }
          }
        }
        warn('Unable to recover a standard glyph name for: ' + name);
        return name;
      }


      if (properties.type === 'CIDFontType2') {
        var cidToGidMap = properties.cidToGidMap || [];
        var isCidToGidMapEmpty = cidToGidMap.length === 0;

        properties.cMap.forEach(function(charCode, cid) {
          assert(cid <= 0xffff, 'Max size of CID is 65,535');
          var glyphId = -1;
          if (isCidToGidMapEmpty) {
            glyphId = cid;
          } else if (cidToGidMap[cid] !== undefined) {
            glyphId = cidToGidMap[cid];
          }

          if (glyphId >= 0 && glyphId < numGlyphs &&
              hasGlyph(glyphId, charCode, cid)) {
            charCodeToGlyphId[charCode] = glyphId;
          }
        });
        if (dupFirstEntry) {
          charCodeToGlyphId[0] = numGlyphs - 1;
        }
      } else {
        // Most of the following logic in this code branch is based on the
        // 9.6.6.4 of the PDF spec.
        var hasEncoding =
          properties.differences.length > 0 || !!properties.baseEncodingName;
        var cmapTable =
          readCmapTable(tables['cmap'], font, this.isSymbolicFont, hasEncoding);
        var cmapPlatformId = cmapTable.platformId;
        var cmapEncodingId = cmapTable.encodingId;
        var cmapMappings = cmapTable.mappings;
        var cmapMappingsLength = cmapMappings.length;

        // The spec seems to imply that if the font is symbolic the encoding
        // should be ignored, this doesn't appear to work for 'preistabelle.pdf'
        // where the the font is symbolic and it has an encoding.
        if (hasEncoding &&
            (cmapPlatformId === 3 && cmapEncodingId === 1 ||
             cmapPlatformId === 1 && cmapEncodingId === 0) ||
            (cmapPlatformId === -1 && cmapEncodingId === -1 && // Temporary hack
             !!getEncoding(properties.baseEncodingName))) {    // Temporary hack
          // When no preferred cmap table was found and |baseEncodingName| is
          // one of the predefined encodings, we seem to obtain a better
          // |charCodeToGlyphId| map from the code below (fixes bug 1057544).
          // TODO: Note that this is a hack which should be removed as soon as
          //       we have proper support for more exotic cmap tables.

          var baseEncoding = [];
          if (properties.baseEncodingName === 'MacRomanEncoding' ||
              properties.baseEncodingName === 'WinAnsiEncoding') {
            baseEncoding = getEncoding(properties.baseEncodingName);
          }
          var glyphsUnicodeMap = getGlyphsUnicode();
          for (charCode = 0; charCode < 256; charCode++) {
            var glyphName, standardGlyphName;
            if (this.differences && charCode in this.differences) {
              glyphName = this.differences[charCode];
            } else if (charCode in baseEncoding &&
                       baseEncoding[charCode] !== '') {
              glyphName = baseEncoding[charCode];
            } else {
              glyphName = StandardEncoding[charCode];
            }
            if (!glyphName) {
              continue;
            }
            // Ensure that non-standard glyph names are resolved to valid ones.
            standardGlyphName = recoverGlyphName(glyphName, glyphsUnicodeMap);

            var unicodeOrCharCode, isUnicode = false;
            if (cmapPlatformId === 3 && cmapEncodingId === 1) {
              unicodeOrCharCode = glyphsUnicodeMap[standardGlyphName];
              isUnicode = true;
            } else if (cmapPlatformId === 1 && cmapEncodingId === 0) {
              // TODO: the encoding needs to be updated with mac os table.
              unicodeOrCharCode = MacRomanEncoding.indexOf(standardGlyphName);
            }

            var found = false;
            for (i = 0; i < cmapMappingsLength; ++i) {
              if (cmapMappings[i].charCode !== unicodeOrCharCode) {
                continue;
              }
              var code = isUnicode ? charCode : unicodeOrCharCode;
              if (hasGlyph(cmapMappings[i].glyphId, code, -1)) {
                charCodeToGlyphId[charCode] = cmapMappings[i].glyphId;
                found = true;
                break;
              }
            }
            if (!found && properties.glyphNames) {
              // Try to map using the post table.
              var glyphId = properties.glyphNames.indexOf(glyphName);
              // The post table ought to use the same kind of glyph names as the
              // `differences` array, but check the standard ones as a fallback.
              if (glyphId === -1 && standardGlyphName !== glyphName) {
                glyphId = properties.glyphNames.indexOf(standardGlyphName);
              }
              if (glyphId > 0 && hasGlyph(glyphId, -1, -1)) {
                charCodeToGlyphId[charCode] = glyphId;
                found = true;
              }
            }
            if (!found) {
              charCodeToGlyphId[charCode] = 0; // notdef
            }
          }
        } else if (cmapPlatformId === 0 && cmapEncodingId === 0) {
          // Default Unicode semantics, use the charcodes as is.
          for (i = 0; i < cmapMappingsLength; ++i) {
            charCodeToGlyphId[cmapMappings[i].charCode] =
              cmapMappings[i].glyphId;
          }
        } else {
          // For (3, 0) cmap tables:
          // The charcode key being stored in charCodeToGlyphId is the lower
          // byte of the two-byte charcodes of the cmap table since according to
          // the spec: 'each byte from the string shall be prepended with the
          // high byte of the range [of charcodes in the cmap table], to form
          // a two-byte character, which shall be used to select the
          // associated glyph description from the subtable'.
          //
          // For (1, 0) cmap tables:
          // 'single bytes from the string shall be used to look up the
          // associated glyph descriptions from the subtable'. This means
          // charcodes in the cmap will be single bytes, so no-op since
          // glyph.charCode & 0xFF === glyph.charCode
          for (i = 0; i < cmapMappingsLength; ++i) {
            charCode = cmapMappings[i].charCode & 0xFF;
            charCodeToGlyphId[charCode] = cmapMappings[i].glyphId;
          }
        }
      }

      if (charCodeToGlyphId.length === 0) {
        // defines at least one glyph
        charCodeToGlyphId[0] = 0;
      }

      // Converting glyphs and ids into font's cmap table
      var newMapping = adjustMapping(charCodeToGlyphId, properties);
      this.toFontChar = newMapping.toFontChar;
      tables['cmap'] = {
        tag: 'cmap',
        data: createCmapTable(newMapping.charCodeToGlyphId, numGlyphs)
      };

      if (!tables['OS/2'] || !validateOS2Table(tables['OS/2'])) {
        tables['OS/2'] = {
          tag: 'OS/2',
          data: createOS2Table(properties, newMapping.charCodeToGlyphId,
                               metricsOverride)
        };
      }

      // Rewrite the 'post' table if needed
      if (!tables['post']) {
        tables['post'] = {
          tag: 'post',
          data: createPostTable(properties)
        };
      }

      if (!isTrueType) {
        try {
          // Trying to repair CFF file
          cffFile = new Stream(tables['CFF '].data);
          var parser = new CFFParser(cffFile, properties,
                                     SEAC_ANALYSIS_ENABLED);
          cff = parser.parse();
          var compiler = new CFFCompiler(cff);
          tables['CFF '].data = compiler.compile();
        } catch (e) {
          warn('Failed to compile font ' + properties.loadedName);
        }
      }

      // Re-creating 'name' table
      if (!tables['name']) {
        tables['name'] = {
          tag: 'name',
          data: createNameTable(this.name)
        };
      } else {
        // ... using existing 'name' table as prototype
        var namePrototype = readNameTable(tables['name']);
        tables['name'].data = createNameTable(name, namePrototype);
      }

      var builder = new OpenTypeFileBuilder(header.version);
      for (var tableTag in tables) {
        builder.addTable(tableTag, tables[tableTag].data);
      }
      return builder.toArray();
    },

    convert: function Font_convert(fontName, font, properties) {
      // TODO: Check the charstring widths to determine this.
      properties.fixedPitch = false;

      var mapping = font.getGlyphMapping(properties);
      var newMapping = adjustMapping(mapping, properties);
      this.toFontChar = newMapping.toFontChar;
      var numGlyphs = font.numGlyphs;

      function getCharCodes(charCodeToGlyphId, glyphId) {
        var charCodes = null;
        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            if (!charCodes) {
              charCodes = [];
            }
            charCodes.push(charCode | 0);
          }
        }
        return charCodes;
      }

      function createCharCode(charCodeToGlyphId, glyphId) {
        for (var charCode in charCodeToGlyphId) {
          if (glyphId === charCodeToGlyphId[charCode]) {
            return charCode | 0;
          }
        }
        newMapping.charCodeToGlyphId[newMapping.nextAvailableFontCharCode] =
            glyphId;
        return newMapping.nextAvailableFontCharCode++;
      }

      var seacs = font.seacs;
      if (SEAC_ANALYSIS_ENABLED && seacs && seacs.length) {
        var matrix = properties.fontMatrix || FONT_IDENTITY_MATRIX;
        var charset = font.getCharset();
        var seacMap = Object.create(null);
        for (var glyphId in seacs) {
          glyphId |= 0;
          var seac = seacs[glyphId];
          var baseGlyphName = StandardEncoding[seac[2]];
          var accentGlyphName = StandardEncoding[seac[3]];
          var baseGlyphId = charset.indexOf(baseGlyphName);
          var accentGlyphId = charset.indexOf(accentGlyphName);
          if (baseGlyphId < 0 || accentGlyphId < 0) {
            continue;
          }
          var accentOffset = {
            x: seac[0] * matrix[0] + seac[1] * matrix[2] + matrix[4],
            y: seac[0] * matrix[1] + seac[1] * matrix[3] + matrix[5]
          };

          var charCodes = getCharCodes(mapping, glyphId);
          if (!charCodes) {
            // There's no point in mapping it if the char code was never mapped
            // to begin with.
            continue;
          }
          for (var i = 0, ii = charCodes.length; i < ii; i++) {
            var charCode = charCodes[i];
            // Find a fontCharCode that maps to the base and accent glyphs.
            // If one doesn't exists, create it.
            var charCodeToGlyphId = newMapping.charCodeToGlyphId;
            var baseFontCharCode = createCharCode(charCodeToGlyphId,
                                                  baseGlyphId);
            var accentFontCharCode = createCharCode(charCodeToGlyphId,
                                                    accentGlyphId);
            seacMap[charCode] = {
              baseFontCharCode: baseFontCharCode,
              accentFontCharCode: accentFontCharCode,
              accentOffset: accentOffset
            };
          }
        }
        properties.seacMap = seacMap;
      }

      var unitsPerEm = 1 / (properties.fontMatrix || FONT_IDENTITY_MATRIX)[0];

      var builder = new OpenTypeFileBuilder('\x4F\x54\x54\x4F');
      // PostScript Font Program
      builder.addTable('CFF ', font.data);
      // OS/2 and Windows Specific metrics
      builder.addTable('OS/2', createOS2Table(properties,
                                              newMapping.charCodeToGlyphId));
      // Character to glyphs mapping
      builder.addTable('cmap', createCmapTable(newMapping.charCodeToGlyphId,
                       numGlyphs));
      // Font header
      builder.addTable('head',
            '\x00\x01\x00\x00' + // Version number
            '\x00\x00\x10\x00' + // fontRevision
            '\x00\x00\x00\x00' + // checksumAdjustement
            '\x5F\x0F\x3C\xF5' + // magicNumber
            '\x00\x00' + // Flags
            safeString16(unitsPerEm) + // unitsPerEM
            '\x00\x00\x00\x00\x9e\x0b\x7e\x27' + // creation date
            '\x00\x00\x00\x00\x9e\x0b\x7e\x27' + // modifification date
            '\x00\x00' + // xMin
            safeString16(properties.descent) + // yMin
            '\x0F\xFF' + // xMax
            safeString16(properties.ascent) + // yMax
            string16(properties.italicAngle ? 2 : 0) + // macStyle
            '\x00\x11' + // lowestRecPPEM
            '\x00\x00' + // fontDirectionHint
            '\x00\x00' + // indexToLocFormat
            '\x00\x00');  // glyphDataFormat

      // Horizontal header
      builder.addTable('hhea',
            '\x00\x01\x00\x00' + // Version number
            safeString16(properties.ascent) + // Typographic Ascent
            safeString16(properties.descent) + // Typographic Descent
            '\x00\x00' + // Line Gap
            '\xFF\xFF' + // advanceWidthMax
            '\x00\x00' + // minLeftSidebearing
            '\x00\x00' + // minRightSidebearing
            '\x00\x00' + // xMaxExtent
            safeString16(properties.capHeight) + // caretSlopeRise
            safeString16(Math.tan(properties.italicAngle) *
                         properties.xHeight) + // caretSlopeRun
            '\x00\x00' + // caretOffset
            '\x00\x00' + // -reserved-
            '\x00\x00' + // -reserved-
            '\x00\x00' + // -reserved-
            '\x00\x00' + // -reserved-
            '\x00\x00' + // metricDataFormat
            string16(numGlyphs)); // Number of HMetrics

      // Horizontal metrics
      builder.addTable('hmtx', (function fontFieldsHmtx() {
          var charstrings = font.charstrings;
          var cffWidths = font.cff ? font.cff.widths : null;
          var hmtx = '\x00\x00\x00\x00'; // Fake .notdef
          for (var i = 1, ii = numGlyphs; i < ii; i++) {
            var width = 0;
            if (charstrings) {
              var charstring = charstrings[i - 1];
              width = 'width' in charstring ? charstring.width : 0;
            } else if (cffWidths) {
              width = Math.ceil(cffWidths[i] || 0);
            }
            hmtx += string16(width) + string16(0);
          }
          return hmtx;
        })());

      // Maximum profile
      builder.addTable('maxp',
            '\x00\x00\x50\x00' + // Version number
            string16(numGlyphs)); // Num of glyphs

      // Naming tables
      builder.addTable('name', createNameTable(fontName));

      // PostScript informations
      builder.addTable('post', createPostTable(properties));

      return builder.toArray();
    },

    get spaceWidth() {
      if ('_shadowWidth' in this) {
        return this._shadowWidth;
      }

      // trying to estimate space character width
      var possibleSpaceReplacements = ['space', 'minus', 'one', 'i'];
      var width;
      for (var i = 0, ii = possibleSpaceReplacements.length; i < ii; i++) {
        var glyphName = possibleSpaceReplacements[i];
        // if possible, getting width by glyph name
        if (glyphName in this.widths) {
          width = this.widths[glyphName];
          break;
        }
        var glyphsUnicodeMap = getGlyphsUnicode();
        var glyphUnicode = glyphsUnicodeMap[glyphName];
        // finding the charcode via unicodeToCID map
        var charcode = 0;
        if (this.composite) {
          if (this.cMap.contains(glyphUnicode)) {
            charcode = this.cMap.lookup(glyphUnicode);
          }
        }
        // ... via toUnicode map
        if (!charcode && this.toUnicode) {
          charcode = this.toUnicode.charCodeOf(glyphUnicode);
        }
        // setting it to unicode if negative or undefined
        if (charcode <= 0) {
          charcode = glyphUnicode;
        }
        // trying to get width via charcode
        width = this.widths[charcode];
        if (width) {
          break; // the non-zero width found
        }
      }
      width = width || this.defaultWidth;
      // Do not shadow the property here. See discussion:
      // https://github.com/mozilla/pdf.js/pull/2127#discussion_r1662280
      this._shadowWidth = width;
      return width;
    },

    charToGlyph: function Font_charToGlyph(charcode, isSpace) {
      var fontCharCode, width, operatorListId;

      var widthCode = charcode;
      if (this.cMap && this.cMap.contains(charcode)) {
        widthCode = this.cMap.lookup(charcode);
      }
      width = this.widths[widthCode];
      width = isNum(width) ? width : this.defaultWidth;
      var vmetric = this.vmetrics && this.vmetrics[widthCode];

      var unicode = this.toUnicode.get(charcode) || charcode;
      if (typeof unicode === 'number') {
        unicode = String.fromCharCode(unicode);
      }

      var isInFont = charcode in this.toFontChar;
      // First try the toFontChar map, if it's not there then try falling
      // back to the char code.
      fontCharCode = this.toFontChar[charcode] || charcode;
      if (this.missingFile) {
        fontCharCode = mapSpecialUnicodeValues(fontCharCode);
      }

      if (this.isType3Font) {
        // Font char code in this case is actually a glyph name.
        operatorListId = fontCharCode;
      }

      var accent = null;
      if (this.seacMap && this.seacMap[charcode]) {
        isInFont = true;
        var seac = this.seacMap[charcode];
        fontCharCode = seac.baseFontCharCode;
        accent = {
          fontChar: String.fromCharCode(seac.accentFontCharCode),
          offset: seac.accentOffset
        };
      }

      var fontChar = String.fromCharCode(fontCharCode);

      var glyph = this.glyphCache[charcode];
      if (!glyph ||
          !glyph.matchesForCache(fontChar, unicode, accent, width, vmetric,
                                 operatorListId, isSpace, isInFont)) {
        glyph = new Glyph(fontChar, unicode, accent, width, vmetric,
                          operatorListId, isSpace, isInFont);
        this.glyphCache[charcode] = glyph;
      }
      return glyph;
    },

    charsToGlyphs: function Font_charsToGlyphs(chars) {
      var charsCache = this.charsCache;
      var glyphs, glyph, charcode;

      // if we translated this string before, just grab it from the cache
      if (charsCache) {
        glyphs = charsCache[chars];
        if (glyphs) {
          return glyphs;
        }
      }

      // lazily create the translation cache
      if (!charsCache) {
        charsCache = this.charsCache = Object.create(null);
      }

      glyphs = [];
      var charsCacheKey = chars;
      var i = 0, ii;

      if (this.cMap) {
        // composite fonts have multi-byte strings convert the string from
        // single-byte to multi-byte
        var c = Object.create(null);
        while (i < chars.length) {
          this.cMap.readCharCode(chars, i, c);
          charcode = c.charcode;
          var length = c.length;
          i += length;
          // Space is char with code 0x20 and length 1 in multiple-byte codes.
          var isSpace = length === 1 && chars.charCodeAt(i - 1) === 0x20;
          glyph = this.charToGlyph(charcode, isSpace);
          glyphs.push(glyph);
        }
      } else {
        for (i = 0, ii = chars.length; i < ii; ++i) {
          charcode = chars.charCodeAt(i);
          glyph = this.charToGlyph(charcode, charcode === 0x20);
          glyphs.push(glyph);
        }
      }

      // Enter the translated string into the cache
      return (charsCache[charsCacheKey] = glyphs);
    }
  };

  return Font;
})();

var ErrorFont = (function ErrorFontClosure() {
  function ErrorFont(error) {
    this.error = error;
    this.loadedName = 'g_font_error';
    this.loading = false;
  }

  ErrorFont.prototype = {
    charsToGlyphs: function ErrorFont_charsToGlyphs() {
      return [];
    },
    exportData: function ErrorFont_exportData() {
      return {error: this.error};
    }
  };

  return ErrorFont;
})();

/**
 * Shared logic for building a char code to glyph id mapping for Type1 and
 * simple CFF fonts. See section 9.6.6.2 of the spec.
 * @param {Object} properties Font properties object.
 * @param {Object} builtInEncoding The encoding contained within the actual font
 * data.
 * @param {Array} glyphNames Array of glyph names where the index is the
 * glyph ID.
 * @returns {Object} A char code to glyph ID map.
 */
function type1FontGlyphMapping(properties, builtInEncoding, glyphNames) {
  var charCodeToGlyphId = Object.create(null);
  var glyphId, charCode, baseEncoding;

  if (properties.baseEncodingName) {
    // If a valid base encoding name was used, the mapping is initialized with
    // that.
    baseEncoding = getEncoding(properties.baseEncodingName);
    for (charCode = 0; charCode < baseEncoding.length; charCode++) {
      glyphId = glyphNames.indexOf(baseEncoding[charCode]);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  } else if (!!(properties.flags & FontFlags.Symbolic)) {
    // For a symbolic font the encoding should be the fonts built-in
    // encoding.
    for (charCode in builtInEncoding) {
      charCodeToGlyphId[charCode] = builtInEncoding[charCode];
    }
  } else {
    // For non-symbolic fonts that don't have a base encoding the standard
    // encoding should be used.
    baseEncoding = StandardEncoding;
    for (charCode = 0; charCode < baseEncoding.length; charCode++) {
      glyphId = glyphNames.indexOf(baseEncoding[charCode]);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  }

  // Lastly, merge in the differences.
  var differences = properties.differences;
  if (differences) {
    for (charCode in differences) {
      var glyphName = differences[charCode];
      glyphId = glyphNames.indexOf(glyphName);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  }
  return charCodeToGlyphId;
}

// Type1Font is also a CIDFontType0.
var Type1Font = (function Type1FontClosure() {
  function findBlock(streamBytes, signature, startIndex) {
    var streamBytesLength = streamBytes.length;
    var signatureLength = signature.length;
    var scanLength = streamBytesLength - signatureLength;

    var i = startIndex, j, found = false;
    while (i < scanLength) {
      j = 0;
      while (j < signatureLength && streamBytes[i + j] === signature[j]) {
        j++;
      }
      if (j >= signatureLength) { // `signature` found, skip over whitespace.
        i += j;
        while (i < streamBytesLength && isSpace(streamBytes[i])) {
          i++;
        }
        found = true;
        break;
      }
      i++;
    }
    return {
      found: found,
      length: i,
    };
  }

  function getHeaderBlock(stream, suggestedLength) {
    var EEXEC_SIGNATURE = [0x65, 0x65, 0x78, 0x65, 0x63];

    var streamStartPos = stream.pos; // Save the initial stream position.
    var headerBytes, headerBytesLength, block;
    try {
      headerBytes = stream.getBytes(suggestedLength);
      headerBytesLength = headerBytes.length;
    } catch (ex) {
      if (ex instanceof MissingDataException) {
        throw ex;
      }
      // Ignore errors if the `suggestedLength` is huge enough that a Uint8Array
      // cannot hold the result of `getBytes`, and fallback to simply checking
      // the entire stream (fixes issue3928.pdf).
    }

    if (headerBytesLength === suggestedLength) {
      // Most of the time `suggestedLength` is correct, so to speed things up we
      // initially only check the last few bytes to see if the header was found.
      // Otherwise we (potentially) check the entire stream to prevent errors in
      // `Type1Parser` (fixes issue5686.pdf).
      block = findBlock(headerBytes, EEXEC_SIGNATURE,
                        suggestedLength - 2 * EEXEC_SIGNATURE.length);

      if (block.found && block.length === suggestedLength) {
        return {
          stream: new Stream(headerBytes),
          length: suggestedLength,
        };
      }
    }
    warn('Invalid "Length1" property in Type1 font -- trying to recover.');
    stream.pos = streamStartPos; // Reset the stream position.

    var SCAN_BLOCK_LENGTH = 2048;
    var actualLength;
    while (true) {
      var scanBytes = stream.peekBytes(SCAN_BLOCK_LENGTH);
      block = findBlock(scanBytes, EEXEC_SIGNATURE, 0);

      if (block.length === 0) {
        break;
      }
      stream.pos += block.length; // Update the stream position.

      if (block.found) {
        actualLength = stream.pos - streamStartPos;
        break;
      }
    }
    stream.pos = streamStartPos; // Reset the stream position.

    if (actualLength) {
      return {
        stream: new Stream(stream.getBytes(actualLength)),
        length: actualLength,
      };
    }
    warn('Unable to recover "Length1" property in Type1 font -- using as is.');
    return {
      stream: new Stream(stream.getBytes(suggestedLength)),
      length: suggestedLength,
    };
  }

  function getEexecBlock(stream, suggestedLength) {
    // We should ideally parse the eexec block to ensure that `suggestedLength`
    // is correct, so we don't truncate the block data if it's too small.
    // However, this would also require checking if the fixed-content portion
    // exists (using the 'Length3' property), and ensuring that it's valid.
    //
    // Given that `suggestedLength` almost always is correct, all the validation
    // would require a great deal of unnecessary parsing for most fonts.
    // To save time, we always fetch the entire stream instead, which also avoid
    // issues if `suggestedLength` is huge (see comment in `getHeaderBlock`).
    //
    // NOTE: This means that the function can include the fixed-content portion
    // in the returned eexec block. In practice this does *not* seem to matter,
    // since `Type1Parser_extractFontProgram` will skip over any non-commands.
    var eexecBytes = stream.getBytes();
    return {
      stream: new Stream(eexecBytes),
      length: eexecBytes.length,
    };
  }

  function Type1Font(name, file, properties) {
    // Some bad generators embed pfb file as is, we have to strip 6-byte header.
    // Also, length1 and length2 might be off by 6 bytes as well.
    // http://www.math.ubc.ca/~cass/piscript/type1.pdf
    var PFB_HEADER_SIZE = 6;
    var headerBlockLength = properties.length1;
    var eexecBlockLength = properties.length2;
    var pfbHeader = file.peekBytes(PFB_HEADER_SIZE);
    var pfbHeaderPresent = pfbHeader[0] === 0x80 && pfbHeader[1] === 0x01;
    if (pfbHeaderPresent) {
      file.skip(PFB_HEADER_SIZE);
      headerBlockLength = (pfbHeader[5] << 24) | (pfbHeader[4] << 16) |
                          (pfbHeader[3] << 8) | pfbHeader[2];
    }

    // Get the data block containing glyphs and subrs informations
    var headerBlock = getHeaderBlock(file, headerBlockLength);
    headerBlockLength = headerBlock.length;
    var headerBlockParser = new Type1Parser(headerBlock.stream, false,
                                            SEAC_ANALYSIS_ENABLED);
    headerBlockParser.extractFontHeader(properties);

    if (pfbHeaderPresent) {
      pfbHeader = file.getBytes(PFB_HEADER_SIZE);
      eexecBlockLength = (pfbHeader[5] << 24) | (pfbHeader[4] << 16) |
                         (pfbHeader[3] << 8) | pfbHeader[2];
    }

    // Decrypt the data blocks and retrieve it's content
    var eexecBlock = getEexecBlock(file, eexecBlockLength);
    eexecBlockLength = eexecBlock.length;
    var eexecBlockParser = new Type1Parser(eexecBlock.stream, true,
                                           SEAC_ANALYSIS_ENABLED);
    var data = eexecBlockParser.extractFontProgram();
    for (var info in data.properties) {
      properties[info] = data.properties[info];
    }

    var charstrings = data.charstrings;
    var type2Charstrings = this.getType2Charstrings(charstrings);
    var subrs = this.getType2Subrs(data.subrs);

    this.charstrings = charstrings;
    this.data = this.wrap(name, type2Charstrings, this.charstrings,
                          subrs, properties);
    this.seacs = this.getSeacs(data.charstrings);
  }

  Type1Font.prototype = {
    get numGlyphs() {
      return this.charstrings.length + 1;
    },

    getCharset: function Type1Font_getCharset() {
      var charset = ['.notdef'];
      var charstrings = this.charstrings;
      for (var glyphId = 0; glyphId < charstrings.length; glyphId++) {
        charset.push(charstrings[glyphId].glyphName);
      }
      return charset;
    },

    getGlyphMapping: function Type1Font_getGlyphMapping(properties) {
      var charstrings = this.charstrings;
      var glyphNames = ['.notdef'], glyphId;
      for (glyphId = 0; glyphId < charstrings.length; glyphId++) {
        glyphNames.push(charstrings[glyphId].glyphName);
      }
      var encoding = properties.builtInEncoding;
      if (encoding) {
        var builtInEncoding = Object.create(null);
        for (var charCode in encoding) {
          glyphId = glyphNames.indexOf(encoding[charCode]);
          if (glyphId >= 0) {
            builtInEncoding[charCode] = glyphId;
          }
        }
      }

      return type1FontGlyphMapping(properties, builtInEncoding, glyphNames);
    },

    getSeacs: function Type1Font_getSeacs(charstrings) {
      var i, ii;
      var seacMap = [];
      for (i = 0, ii = charstrings.length; i < ii; i++) {
        var charstring = charstrings[i];
        if (charstring.seac) {
          // Offset by 1 for .notdef
          seacMap[i + 1] = charstring.seac;
        }
      }
      return seacMap;
    },

    getType2Charstrings: function Type1Font_getType2Charstrings(
                                    type1Charstrings) {
      var type2Charstrings = [];
      for (var i = 0, ii = type1Charstrings.length; i < ii; i++) {
        type2Charstrings.push(type1Charstrings[i].charstring);
      }
      return type2Charstrings;
    },

    getType2Subrs: function Type1Font_getType2Subrs(type1Subrs) {
      var bias = 0;
      var count = type1Subrs.length;
      if (count < 1133) {
        bias = 107;
      } else if (count < 33769) {
        bias = 1131;
      } else {
        bias = 32768;
      }

      // Add a bunch of empty subrs to deal with the Type2 bias
      var type2Subrs = [];
      var i;
      for (i = 0; i < bias; i++) {
        type2Subrs.push([0x0B]);
      }

      for (i = 0; i < count; i++) {
        type2Subrs.push(type1Subrs[i]);
      }

      return type2Subrs;
    },

    wrap: function Type1Font_wrap(name, glyphs, charstrings, subrs,
                                  properties) {
      var cff = new CFF();
      cff.header = new CFFHeader(1, 0, 4, 4);

      cff.names = [name];

      var topDict = new CFFTopDict();
      // CFF strings IDs 0...390 are predefined names, so refering
      // to entries in our own String INDEX starts at SID 391.
      topDict.setByName('version', 391);
      topDict.setByName('Notice', 392);
      topDict.setByName('FullName', 393);
      topDict.setByName('FamilyName', 394);
      topDict.setByName('Weight', 395);
      topDict.setByName('Encoding', null); // placeholder
      topDict.setByName('FontMatrix', properties.fontMatrix);
      topDict.setByName('FontBBox', properties.bbox);
      topDict.setByName('charset', null); // placeholder
      topDict.setByName('CharStrings', null); // placeholder
      topDict.setByName('Private', null); // placeholder
      cff.topDict = topDict;

      var strings = new CFFStrings();
      strings.add('Version 0.11'); // Version
      strings.add('See original notice'); // Notice
      strings.add(name); // FullName
      strings.add(name); // FamilyName
      strings.add('Medium'); // Weight
      cff.strings = strings;

      cff.globalSubrIndex = new CFFIndex();

      var count = glyphs.length;
      var charsetArray = [0];
      var i, ii;
      for (i = 0; i < count; i++) {
        var index = CFFStandardStrings.indexOf(charstrings[i].glyphName);
        // TODO: Insert the string and correctly map it.  Previously it was
        // thought mapping names that aren't in the standard strings to .notdef
        // was fine, however in issue818 when mapping them all to .notdef the
        // adieresis glyph no longer worked.
        if (index === -1) {
          index = 0;
        }
        charsetArray.push((index >> 8) & 0xff, index & 0xff);
      }
      cff.charset = new CFFCharset(false, 0, [], charsetArray);

      var charStringsIndex = new CFFIndex();
      charStringsIndex.add([0x8B, 0x0E]); // .notdef
      for (i = 0; i < count; i++) {
        charStringsIndex.add(glyphs[i]);
      }
      cff.charStrings = charStringsIndex;

      var privateDict = new CFFPrivateDict();
      privateDict.setByName('Subrs', null); // placeholder
      var fields = [
        'BlueValues',
        'OtherBlues',
        'FamilyBlues',
        'FamilyOtherBlues',
        'StemSnapH',
        'StemSnapV',
        'BlueShift',
        'BlueFuzz',
        'BlueScale',
        'LanguageGroup',
        'ExpansionFactor',
        'ForceBold',
        'StdHW',
        'StdVW'
      ];
      for (i = 0, ii = fields.length; i < ii; i++) {
        var field = fields[i];
        if (!(field in properties.privateData)) {
          continue;
        }
        var value = properties.privateData[field];
        if (isArray(value)) {
          // All of the private dictionary array data in CFF must be stored as
          // "delta-encoded" numbers.
          for (var j = value.length - 1; j > 0; j--) {
            value[j] -= value[j - 1]; // ... difference from previous value
          }
        }
        privateDict.setByName(field, value);
      }
      cff.topDict.privateDict = privateDict;

      var subrIndex = new CFFIndex();
      for (i = 0, ii = subrs.length; i < ii; i++) {
        subrIndex.add(subrs[i]);
      }
      privateDict.subrsIndex = subrIndex;

      var compiler = new CFFCompiler(cff);
      return compiler.compile();
    }
  };

  return Type1Font;
})();

var CFFFont = (function CFFFontClosure() {
  function CFFFont(file, properties) {
    this.properties = properties;

    var parser = new CFFParser(file, properties, SEAC_ANALYSIS_ENABLED);
    this.cff = parser.parse();
    var compiler = new CFFCompiler(this.cff);
    this.seacs = this.cff.seacs;
    try {
      this.data = compiler.compile();
    } catch (e) {
      warn('Failed to compile font ' + properties.loadedName);
      // There may have just been an issue with the compiler, set the data
      // anyway and hope the font loaded.
      this.data = file;
    }
  }

  CFFFont.prototype = {
    get numGlyphs() {
      return this.cff.charStrings.count;
    },
    getCharset: function CFFFont_getCharset() {
      return this.cff.charset.charset;
    },
    getGlyphMapping: function CFFFont_getGlyphMapping() {
      var cff = this.cff;
      var properties = this.properties;
      var charsets = cff.charset.charset;
      var charCodeToGlyphId;
      var glyphId;

      if (properties.composite) {
        charCodeToGlyphId = Object.create(null);
        if (cff.isCIDFont) {
          // If the font is actually a CID font then we should use the charset
          // to map CIDs to GIDs.
          for (glyphId = 0; glyphId < charsets.length; glyphId++) {
            var cid = charsets[glyphId];
            var charCode = properties.cMap.charCodeOf(cid);
            charCodeToGlyphId[charCode] = glyphId;
          }
        } else {
          // If it is NOT actually a CID font then CIDs should be mapped
          // directly to GIDs.
          for (glyphId = 0; glyphId < cff.charStrings.count; glyphId++) {
            charCodeToGlyphId[glyphId] = glyphId;
          }
        }
        return charCodeToGlyphId;
      }

      var encoding = cff.encoding ? cff.encoding.encoding : null;
      charCodeToGlyphId = type1FontGlyphMapping(properties, encoding, charsets);
      return charCodeToGlyphId;
    }
  };

  return CFFFont;
})();

// Workaround for seac on Windows.
(function checkSeacSupport() {
  if (typeof navigator !== 'undefined' && /Windows/.test(navigator.userAgent)) {
    SEAC_ANALYSIS_ENABLED = true;
  }
})();

// Workaround for Private Use Area characters in Chrome on Windows
// http://code.google.com/p/chromium/issues/detail?id=122465
// https://github.com/mozilla/pdf.js/issues/1689
(function checkChromeWindows() {
  if (typeof navigator !== 'undefined' &&
      /Windows.*Chrome/.test(navigator.userAgent)) {
    SKIP_PRIVATE_USE_RANGE_F000_TO_F01F = true;
  }
})();

exports.SEAC_ANALYSIS_ENABLED = SEAC_ANALYSIS_ENABLED;
exports.ErrorFont = ErrorFont;
exports.Font = Font;
exports.FontFlags = FontFlags;
exports.IdentityToUnicodeMap = IdentityToUnicodeMap;
exports.ToUnicodeMap = ToUnicodeMap;
exports.getFontType = getFontType;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCorePsParser = {}), root.pdfjsSharedUtil,
      root.pdfjsCoreParser);
  }
}(this, function (exports, sharedUtil, coreParser) {

var error = sharedUtil.error;
var isSpace = sharedUtil.isSpace;
var EOF = coreParser.EOF;

var PostScriptParser = (function PostScriptParserClosure() {
  function PostScriptParser(lexer) {
    this.lexer = lexer;
    this.operators = [];
    this.token = null;
    this.prev = null;
  }
  PostScriptParser.prototype = {
    nextToken: function PostScriptParser_nextToken() {
      this.prev = this.token;
      this.token = this.lexer.getToken();
    },
    accept: function PostScriptParser_accept(type) {
      if (this.token.type === type) {
        this.nextToken();
        return true;
      }
      return false;
    },
    expect: function PostScriptParser_expect(type) {
      if (this.accept(type)) {
        return true;
      }
      error('Unexpected symbol: found ' + this.token.type + ' expected ' +
        type + '.');
    },
    parse: function PostScriptParser_parse() {
      this.nextToken();
      this.expect(PostScriptTokenTypes.LBRACE);
      this.parseBlock();
      this.expect(PostScriptTokenTypes.RBRACE);
      return this.operators;
    },
    parseBlock: function PostScriptParser_parseBlock() {
      while (true) {
        if (this.accept(PostScriptTokenTypes.NUMBER)) {
          this.operators.push(this.prev.value);
        } else if (this.accept(PostScriptTokenTypes.OPERATOR)) {
          this.operators.push(this.prev.value);
        } else if (this.accept(PostScriptTokenTypes.LBRACE)) {
          this.parseCondition();
        } else {
          return;
        }
      }
    },
    parseCondition: function PostScriptParser_parseCondition() {
      // Add two place holders that will be updated later
      var conditionLocation = this.operators.length;
      this.operators.push(null, null);

      this.parseBlock();
      this.expect(PostScriptTokenTypes.RBRACE);
      if (this.accept(PostScriptTokenTypes.IF)) {
        // The true block is right after the 'if' so it just falls through on
        // true else it jumps and skips the true block.
        this.operators[conditionLocation] = this.operators.length;
        this.operators[conditionLocation + 1] = 'jz';
      } else if (this.accept(PostScriptTokenTypes.LBRACE)) {
        var jumpLocation = this.operators.length;
        this.operators.push(null, null);
        var endOfTrue = this.operators.length;
        this.parseBlock();
        this.expect(PostScriptTokenTypes.RBRACE);
        this.expect(PostScriptTokenTypes.IFELSE);
        // The jump is added at the end of the true block to skip the false
        // block.
        this.operators[jumpLocation] = this.operators.length;
        this.operators[jumpLocation + 1] = 'j';

        this.operators[conditionLocation] = endOfTrue;
        this.operators[conditionLocation + 1] = 'jz';
      } else {
        error('PS Function: error parsing conditional.');
      }
    }
  };
  return PostScriptParser;
})();

var PostScriptTokenTypes = {
  LBRACE: 0,
  RBRACE: 1,
  NUMBER: 2,
  OPERATOR: 3,
  IF: 4,
  IFELSE: 5
};

var PostScriptToken = (function PostScriptTokenClosure() {
  function PostScriptToken(type, value) {
    this.type = type;
    this.value = value;
  }

  var opCache = Object.create(null);

  PostScriptToken.getOperator = function PostScriptToken_getOperator(op) {
    var opValue = opCache[op];
    if (opValue) {
      return opValue;
    }
    return opCache[op] = new PostScriptToken(PostScriptTokenTypes.OPERATOR, op);
  };

  PostScriptToken.LBRACE = new PostScriptToken(PostScriptTokenTypes.LBRACE,
    '{');
  PostScriptToken.RBRACE = new PostScriptToken(PostScriptTokenTypes.RBRACE,
    '}');
  PostScriptToken.IF = new PostScriptToken(PostScriptTokenTypes.IF, 'IF');
  PostScriptToken.IFELSE = new PostScriptToken(PostScriptTokenTypes.IFELSE,
    'IFELSE');
  return PostScriptToken;
})();

var PostScriptLexer = (function PostScriptLexerClosure() {
  function PostScriptLexer(stream) {
    this.stream = stream;
    this.nextChar();

    this.strBuf = [];
  }
  PostScriptLexer.prototype = {
    nextChar: function PostScriptLexer_nextChar() {
      return (this.currentChar = this.stream.getByte());
    },
    getToken: function PostScriptLexer_getToken() {
      var comment = false;
      var ch = this.currentChar;

      // skip comments
      while (true) {
        if (ch < 0) {
          return EOF;
        }

        if (comment) {
          if (ch === 0x0A || ch === 0x0D) {
            comment = false;
          }
        } else if (ch === 0x25) { // '%'
          comment = true;
        } else if (!isSpace(ch)) {
          break;
        }
        ch = this.nextChar();
      }
      switch (ch | 0) {
        case 0x30: case 0x31: case 0x32: case 0x33: case 0x34: // '0'-'4'
        case 0x35: case 0x36: case 0x37: case 0x38: case 0x39: // '5'-'9'
        case 0x2B: case 0x2D: case 0x2E: // '+', '-', '.'
          return new PostScriptToken(PostScriptTokenTypes.NUMBER,
                                     this.getNumber());
        case 0x7B: // '{'
          this.nextChar();
          return PostScriptToken.LBRACE;
        case 0x7D: // '}'
          this.nextChar();
          return PostScriptToken.RBRACE;
      }
      // operator
      var strBuf = this.strBuf;
      strBuf.length = 0;
      strBuf[0] = String.fromCharCode(ch);

      while ((ch = this.nextChar()) >= 0 && // and 'A'-'Z', 'a'-'z'
             ((ch >= 0x41 && ch <= 0x5A) || (ch >= 0x61 && ch <= 0x7A))) {
        strBuf.push(String.fromCharCode(ch));
      }
      var str = strBuf.join('');
      switch (str.toLowerCase()) {
        case 'if':
          return PostScriptToken.IF;
        case 'ifelse':
          return PostScriptToken.IFELSE;
        default:
          return PostScriptToken.getOperator(str);
      }
    },
    getNumber: function PostScriptLexer_getNumber() {
      var ch = this.currentChar;
      var strBuf = this.strBuf;
      strBuf.length = 0;
      strBuf[0] = String.fromCharCode(ch);

      while ((ch = this.nextChar()) >= 0) {
        if ((ch >= 0x30 && ch <= 0x39) || // '0'-'9'
            ch === 0x2D || ch === 0x2E) { // '-', '.'
          strBuf.push(String.fromCharCode(ch));
        } else {
          break;
        }
      }
      var value = parseFloat(strBuf.join(''));
      if (isNaN(value)) {
        error('Invalid floating point number: ' + value);
      }
      return value;
    }
  };
  return PostScriptLexer;
})();

exports.PostScriptLexer = PostScriptLexer;
exports.PostScriptParser = PostScriptParser;
}));


(function (root, factory) {
  {
    factory((root.pdfjsCoreFunction = {}), root.pdfjsSharedUtil,
      root.pdfjsCorePrimitives, root.pdfjsCorePsParser);
  }
}(this, function (exports, sharedUtil, corePrimitives, corePsParser) {

var error = sharedUtil.error;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var isBool = sharedUtil.isBool;
var isDict = corePrimitives.isDict;
var isStream = corePrimitives.isStream;
var PostScriptLexer = corePsParser.PostScriptLexer;
var PostScriptParser = corePsParser.PostScriptParser;

var PDFFunction = (function PDFFunctionClosure() {
  var CONSTRUCT_SAMPLED = 0;
  var CONSTRUCT_INTERPOLATED = 2;
  var CONSTRUCT_STICHED = 3;
  var CONSTRUCT_POSTSCRIPT = 4;

  return {
    getSampleArray: function PDFFunction_getSampleArray(size, outputSize, bps,
                                                       str) {
      var i, ii;
      var length = 1;
      for (i = 0, ii = size.length; i < ii; i++) {
        length *= size[i];
      }
      length *= outputSize;

      var array = new Array(length);
      var codeSize = 0;
      var codeBuf = 0;
      // 32 is a valid bps so shifting won't work
      var sampleMul = 1.0 / (Math.pow(2.0, bps) - 1);

      var strBytes = str.getBytes((length * bps + 7) / 8);
      var strIdx = 0;
      for (i = 0; i < length; i++) {
        while (codeSize < bps) {
          codeBuf <<= 8;
          codeBuf |= strBytes[strIdx++];
          codeSize += 8;
        }
        codeSize -= bps;
        array[i] = (codeBuf >> codeSize) * sampleMul;
        codeBuf &= (1 << codeSize) - 1;
      }
      return array;
    },

    getIR: function PDFFunction_getIR(xref, fn) {
      var dict = fn.dict;
      if (!dict) {
        dict = fn;
      }

      var types = [this.constructSampled,
                   null,
                   this.constructInterpolated,
                   this.constructStiched,
                   this.constructPostScript];

      var typeNum = dict.get('FunctionType');
      var typeFn = types[typeNum];
      if (!typeFn) {
        error('Unknown type of function');
      }

      return typeFn.call(this, fn, dict, xref);
    },

    fromIR: function PDFFunction_fromIR(IR) {
      var type = IR[0];
      switch (type) {
        case CONSTRUCT_SAMPLED:
          return this.constructSampledFromIR(IR);
        case CONSTRUCT_INTERPOLATED:
          return this.constructInterpolatedFromIR(IR);
        case CONSTRUCT_STICHED:
          return this.constructStichedFromIR(IR);
        //case CONSTRUCT_POSTSCRIPT:
        default:
          return this.constructPostScriptFromIR(IR);
      }
    },

    parse: function PDFFunction_parse(xref, fn) {
      var IR = this.getIR(xref, fn);
      return this.fromIR(IR);
    },

    parseArray: function PDFFunction_parseArray(xref, fnObj) {
      if (!isArray(fnObj)) {
        // not an array -- parsing as regular function
        return this.parse(xref, fnObj);
      }

      var fnArray = [];
      for (var j = 0, jj = fnObj.length; j < jj; j++) {
        var obj = xref.fetchIfRef(fnObj[j]);
        fnArray.push(PDFFunction.parse(xref, obj));
      }
      return function (src, srcOffset, dest, destOffset) {
        for (var i = 0, ii = fnArray.length; i < ii; i++) {
          fnArray[i](src, srcOffset, dest, destOffset + i);
        }
      };
    },

    constructSampled: function PDFFunction_constructSampled(str, dict) {
      function toMultiArray(arr) {
        var inputLength = arr.length;
        var out = [];
        var index = 0;
        for (var i = 0; i < inputLength; i += 2) {
          out[index] = [arr[i], arr[i + 1]];
          ++index;
        }
        return out;
      }
      var domain = dict.getArray('Domain');
      var range = dict.getArray('Range');

      if (!domain || !range) {
        error('No domain or range');
      }

      var inputSize = domain.length / 2;
      var outputSize = range.length / 2;

      domain = toMultiArray(domain);
      range = toMultiArray(range);

      var size = dict.get('Size');
      var bps = dict.get('BitsPerSample');
      var order = dict.get('Order') || 1;
      if (order !== 1) {
        // No description how cubic spline interpolation works in PDF32000:2008
        // As in poppler, ignoring order, linear interpolation may work as good
        info('No support for cubic spline interpolation: ' + order);
      }

      var encode = dict.getArray('Encode');
      if (!encode) {
        encode = [];
        for (var i = 0; i < inputSize; ++i) {
          encode.push(0);
          encode.push(size[i] - 1);
        }
      }
      encode = toMultiArray(encode);

      var decode = dict.getArray('Decode');
      if (!decode) {
        decode = range;
      } else {
        decode = toMultiArray(decode);
      }

      var samples = this.getSampleArray(size, outputSize, bps, str);

      return [
        CONSTRUCT_SAMPLED, inputSize, domain, encode, decode, samples, size,
        outputSize, Math.pow(2, bps) - 1, range
      ];
    },

    constructSampledFromIR: function PDFFunction_constructSampledFromIR(IR) {
      // See chapter 3, page 109 of the PDF reference
      function interpolate(x, xmin, xmax, ymin, ymax) {
        return ymin + ((x - xmin) * ((ymax - ymin) / (xmax - xmin)));
      }

      return function constructSampledFromIRResult(src, srcOffset,
                                                   dest, destOffset) {
        // See chapter 3, page 110 of the PDF reference.
        var m = IR[1];
        var domain = IR[2];
        var encode = IR[3];
        var decode = IR[4];
        var samples = IR[5];
        var size = IR[6];
        var n = IR[7];
        //var mask = IR[8];
        var range = IR[9];

        // Building the cube vertices: its part and sample index
        // http://rjwagner49.com/Mathematics/Interpolation.pdf
        var cubeVertices = 1 << m;
        var cubeN = new Float64Array(cubeVertices);
        var cubeVertex = new Uint32Array(cubeVertices);
        var i, j;
        for (j = 0; j < cubeVertices; j++) {
          cubeN[j] = 1;
        }

        var k = n, pos = 1;
        // Map x_i to y_j for 0 <= i < m using the sampled function.
        for (i = 0; i < m; ++i) {
          // x_i' = min(max(x_i, Domain_2i), Domain_2i+1)
          var domain_2i = domain[i][0];
          var domain_2i_1 = domain[i][1];
          var xi = Math.min(Math.max(src[srcOffset +i], domain_2i),
                            domain_2i_1);

          // e_i = Interpolate(x_i', Domain_2i, Domain_2i+1,
          //                   Encode_2i, Encode_2i+1)
          var e = interpolate(xi, domain_2i, domain_2i_1,
                              encode[i][0], encode[i][1]);

          // e_i' = min(max(e_i, 0), Size_i - 1)
          var size_i = size[i];
          e = Math.min(Math.max(e, 0), size_i - 1);

          // Adjusting the cube: N and vertex sample index
          var e0 = e < size_i - 1 ? Math.floor(e) : e - 1; // e1 = e0 + 1;
          var n0 = e0 + 1 - e; // (e1 - e) / (e1 - e0);
          var n1 = e - e0; // (e - e0) / (e1 - e0);
          var offset0 = e0 * k;
          var offset1 = offset0 + k; // e1 * k
          for (j = 0; j < cubeVertices; j++) {
            if (j & pos) {
              cubeN[j] *= n1;
              cubeVertex[j] += offset1;
            } else {
              cubeN[j] *= n0;
              cubeVertex[j] += offset0;
            }
          }

          k *= size_i;
          pos <<= 1;
        }

        for (j = 0; j < n; ++j) {
          // Sum all cube vertices' samples portions
          var rj = 0;
          for (i = 0; i < cubeVertices; i++) {
            rj += samples[cubeVertex[i] + j] * cubeN[i];
          }

          // r_j' = Interpolate(r_j, 0, 2^BitsPerSample - 1,
          //                    Decode_2j, Decode_2j+1)
          rj = interpolate(rj, 0, 1, decode[j][0], decode[j][1]);

          // y_j = min(max(r_j, range_2j), range_2j+1)
          dest[destOffset + j] = Math.min(Math.max(rj, range[j][0]),
                                          range[j][1]);
        }
      };
    },

    constructInterpolated: function PDFFunction_constructInterpolated(str,
                                                                      dict) {
      var c0 = dict.getArray('C0') || [0];
      var c1 = dict.getArray('C1') || [1];
      var n = dict.get('N');

      if (!isArray(c0) || !isArray(c1)) {
        error('Illegal dictionary for interpolated function');
      }

      var length = c0.length;
      var diff = [];
      for (var i = 0; i < length; ++i) {
        diff.push(c1[i] - c0[i]);
      }

      return [CONSTRUCT_INTERPOLATED, c0, diff, n];
    },

    constructInterpolatedFromIR:
      function PDFFunction_constructInterpolatedFromIR(IR) {
      var c0 = IR[1];
      var diff = IR[2];
      var n = IR[3];

      var length = diff.length;

      return function constructInterpolatedFromIRResult(src, srcOffset,
                                                        dest, destOffset) {
        var x = n === 1 ? src[srcOffset] : Math.pow(src[srcOffset], n);

        for (var j = 0; j < length; ++j) {
          dest[destOffset + j] = c0[j] + (x * diff[j]);
        }
      };
    },

    constructStiched: function PDFFunction_constructStiched(fn, dict, xref) {
      var domain = dict.getArray('Domain');

      if (!domain) {
        error('No domain');
      }

      var inputSize = domain.length / 2;
      if (inputSize !== 1) {
        error('Bad domain for stiched function');
      }

      var fnRefs = dict.get('Functions');
      var fns = [];
      for (var i = 0, ii = fnRefs.length; i < ii; ++i) {
        fns.push(PDFFunction.getIR(xref, xref.fetchIfRef(fnRefs[i])));
      }

      var bounds = dict.getArray('Bounds');
      var encode = dict.getArray('Encode');

      return [CONSTRUCT_STICHED, domain, bounds, encode, fns];
    },

    constructStichedFromIR: function PDFFunction_constructStichedFromIR(IR) {
      var domain = IR[1];
      var bounds = IR[2];
      var encode = IR[3];
      var fnsIR = IR[4];
      var fns = [];
      var tmpBuf = new Float32Array(1);

      for (var i = 0, ii = fnsIR.length; i < ii; i++) {
        fns.push(PDFFunction.fromIR(fnsIR[i]));
      }

      return function constructStichedFromIRResult(src, srcOffset,
                                                   dest, destOffset) {
        var clip = function constructStichedFromIRClip(v, min, max) {
          if (v > max) {
            v = max;
          } else if (v < min) {
            v = min;
          }
          return v;
        };

        // clip to domain
        var v = clip(src[srcOffset], domain[0], domain[1]);
        // calulate which bound the value is in
        for (var i = 0, ii = bounds.length; i < ii; ++i) {
          if (v < bounds[i]) {
            break;
          }
        }

        // encode value into domain of function
        var dmin = domain[0];
        if (i > 0) {
          dmin = bounds[i - 1];
        }
        var dmax = domain[1];
        if (i < bounds.length) {
          dmax = bounds[i];
        }

        var rmin = encode[2 * i];
        var rmax = encode[2 * i + 1];

        // Prevent the value from becoming NaN as a result
        // of division by zero (fixes issue6113.pdf).
        tmpBuf[0] = dmin === dmax ? rmin :
                    rmin + (v - dmin) * (rmax - rmin) / (dmax - dmin);

        // call the appropriate function
        fns[i](tmpBuf, 0, dest, destOffset);
      };
    },

    constructPostScript: function PDFFunction_constructPostScript(fn, dict,
                                                                  xref) {
      var domain = dict.getArray('Domain');
      var range = dict.getArray('Range');

      if (!domain) {
        error('No domain.');
      }

      if (!range) {
        error('No range.');
      }

      var lexer = new PostScriptLexer(fn);
      var parser = new PostScriptParser(lexer);
      var code = parser.parse();

      return [CONSTRUCT_POSTSCRIPT, domain, range, code];
    },

    constructPostScriptFromIR: function PDFFunction_constructPostScriptFromIR(
                                          IR) {
      var domain = IR[1];
      var range = IR[2];
      var code = IR[3];

      var compiled = (new PostScriptCompiler()).compile(code, domain, range);
      if (compiled) {
        // Compiled function consists of simple expressions such as addition,
        // subtraction, Math.max, and also contains 'var' and 'return'
        // statements. See the generation in the PostScriptCompiler below.
        /*jshint -W054 */
        return new Function('src', 'srcOffset', 'dest', 'destOffset', compiled);
      }

      info('Unable to compile PS function');

      var numOutputs = range.length >> 1;
      var numInputs = domain.length >> 1;
      var evaluator = new PostScriptEvaluator(code);
      // Cache the values for a big speed up, the cache size is limited though
      // since the number of possible values can be huge from a PS function.
      var cache = Object.create(null);
      // The MAX_CACHE_SIZE is set to ~4x the maximum number of distinct values
      // seen in our tests.
      var MAX_CACHE_SIZE = 2048 * 4;
      var cache_available = MAX_CACHE_SIZE;
      var tmpBuf = new Float32Array(numInputs);

      return function constructPostScriptFromIRResult(src, srcOffset,
                                                      dest, destOffset) {
        var i, value;
        var key = '';
        var input = tmpBuf;
        for (i = 0; i < numInputs; i++) {
          value = src[srcOffset + i];
          input[i] = value;
          key += value + '_';
        }

        var cachedValue = cache[key];
        if (cachedValue !== undefined) {
          dest.set(cachedValue, destOffset);
        }

