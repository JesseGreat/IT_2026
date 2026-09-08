/* ============================================================================
   qrcode.js — a small, self-contained QR code encoder.

   Byte mode, error-correction level M (recovers ~15% damage — the right level
   for a printed card that may get creased), versions 1–10, which covers any
   URL up to 213 characters. No dependencies, no network, ~7 KB.

   Usage:  QR.svg("https://example.com", { scale: 8, quiet: 4 })  -> SVG string
           QR.matrix("https://example.com")                       -> boolean[][]
   ========================================================================== */
(function () {
  "use strict";

  /* Error-correction level M, per version:
     [ ecCodewordsPerBlock, [ [blockCount, dataCodewordsPerBlock], ... ] ]   */
  const EC_M = {
    1:  [10, [[1, 16]]],
    2:  [16, [[1, 28]]],
    3:  [26, [[1, 44]]],
    4:  [18, [[2, 32]]],
    5:  [24, [[2, 43]]],
    6:  [16, [[4, 27]]],
    7:  [18, [[4, 31]]],
    8:  [22, [[2, 38], [2, 39]]],
    9:  [22, [[3, 36], [2, 37]]],
    10: [26, [[4, 43], [1, 44]]],
  };

  /* Alignment-pattern centre coordinates per version. */
  const ALIGN = {
    1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
    6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
  };

  const MAX_VERSION = 10;

  /* ── GF(256) arithmetic, polynomial 0x11D ─────────────────────────────── */
  function gfMul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z & 0xff;
  }

  function rsDivisor(degree) {
    const result = new Array(degree).fill(0);
    result[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < degree; j++) {
        result[j] = gfMul(result[j], root);
        if (j + 1 < degree) result[j] ^= result[j + 1];
      }
      root = gfMul(root, 0x02);
    }
    return result;
  }

  function rsRemainder(data, divisor) {
    const result = new Array(divisor.length).fill(0);
    for (const b of data) {
      const factor = (b ^ result[0]) & 0xff;
      result.shift();
      result.push(0);
      for (let i = 0; i < result.length; i++) result[i] ^= gfMul(divisor[i], factor);
    }
    return result;
  }

  /* ── bit stream ───────────────────────────────────────────────────────── */
  function BitBuffer() { this.bits = []; }
  BitBuffer.prototype.push = function (value, len) {
    for (let i = len - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  };

  function utf8Bytes(str) {
    if (typeof TextEncoder !== "undefined") return Array.from(new TextEncoder().encode(str));
    return Array.from(unescape(encodeURIComponent(str))).map((c) => c.charCodeAt(0));
  }

  function totalDataCodewords(version) {
    return EC_M[version][1].reduce((sum, [count, len]) => sum + count * len, 0);
  }

  function chooseVersion(byteLen) {
    for (let v = 1; v <= MAX_VERSION; v++) {
      const countBits = v < 10 ? 8 : 16;
      const needed = 4 + countBits + 8 * byteLen;
      if (needed <= totalDataCodewords(v) * 8) return v;
    }
    throw new Error(
      "That text is too long for this encoder (" + byteLen + " bytes). " +
      "Keep the URL under ~200 characters."
    );
  }

  /* ── data codewords: mode, length, payload, padding ───────────────────── */
  function makeCodewords(bytes, version) {
    const capacityBits = totalDataCodewords(version) * 8;
    const bb = new BitBuffer();
    bb.push(0b0100, 4);                                   // byte mode
    bb.push(bytes.length, version < 10 ? 8 : 16);         // character count
    bytes.forEach((b) => bb.push(b, 8));

    bb.push(0, Math.min(4, capacityBits - bb.bits.length));   // terminator
    while (bb.bits.length % 8 !== 0) bb.bits.push(0);         // to a byte edge

    const words = [];
    for (let i = 0; i < bb.bits.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8; j++) byte = (byte << 1) | bb.bits[i + j];
      words.push(byte);
    }
    // Alternating pad bytes, as the spec prescribes.
    for (let pad = 0xec; words.length < capacityBits / 8; pad ^= 0xec ^ 0x11) words.push(pad);
    return words;
  }

  /* ── split into blocks, add error correction, interleave ──────────────── */
  function addEcc(words, version) {
    const [ecLen, groups] = EC_M[version];
    const divisor = rsDivisor(ecLen);

    const blocks = [];
    let at = 0;
    groups.forEach(([count, len]) => {
      for (let i = 0; i < count; i++) {
        const data = words.slice(at, at + len);
        at += len;
        blocks.push({ data: data, ecc: rsRemainder(data, divisor) });
      }
    });

    const out = [];
    const maxData = Math.max(...blocks.map((b) => b.data.length));
    for (let i = 0; i < maxData; i++)
      blocks.forEach((b) => { if (i < b.data.length) out.push(b.data[i]); });
    for (let i = 0; i < ecLen; i++)
      blocks.forEach((b) => out.push(b.ecc[i]));
    return out;
  }

  /* ── the module grid ──────────────────────────────────────────────────── */
  function buildMatrix(version, codewords) {
    const size = version * 4 + 17;
    const grid = Array.from({ length: size }, () => new Array(size).fill(false));
    const fixed = Array.from({ length: size }, () => new Array(size).fill(false));

    const set = (row, col, dark) => {
      grid[row][col] = dark;
      fixed[row][col] = true;
    };

    /* finder patterns and their separators */
    [[3, 3], [3, size - 4], [size - 4, 3]].forEach(([cr, cc]) => {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const r = cr + dy, c = cc + dx;
          if (r < 0 || r >= size || c < 0 || c >= size) continue;
          const d = Math.max(Math.abs(dx), Math.abs(dy));
          set(r, c, d !== 2 && d !== 4);
        }
      }
    });

    /* timing patterns */
    for (let i = 0; i < size; i++) {
      if (!fixed[6][i]) set(6, i, i % 2 === 0);
      if (!fixed[i][6]) set(i, 6, i % 2 === 0);
    }

    /* alignment patterns, skipping the three that clash with the finders */
    const centres = ALIGN[version];
    const n = centres.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue;
        const cr = centres[i], cc = centres[j];
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++)
            set(cr + dy, cc + dx, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }

    /* reserve the format-information strips (values written later) */
    for (let i = 0; i <= 5; i++) set(i, 8, false);
    set(7, 8, false); set(8, 8, false); set(8, 7, false);
    for (let i = 9; i < 15; i++) set(8, 14 - i, false);
    for (let i = 0; i < 8; i++) set(8, size - 1 - i, false);
    for (let i = 8; i < 15; i++) set(size - 15 + i, 8, false);
    set(size - 8, 8, true);                       // the module that is always dark

    /* version information, versions 7 and up */
    if (version >= 7) {
      let rem = version;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const bits = (version << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const bit = ((bits >>> i) & 1) === 1;
        const a = size - 11 + (i % 3), b = Math.floor(i / 3);
        set(b, a, bit);
        set(a, b, bit);
      }
    }

    /* the data, snaking up and down in two-column strips */
    let bitIndex = 0;
    const totalBits = codewords.length * 8;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;                 // skip the timing column
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const col = right - j;
          const upward = ((right + 1) & 2) === 0;
          const row = upward ? size - 1 - vert : vert;
          if (fixed[row][col] || bitIndex >= totalBits) continue;
          grid[row][col] = ((codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) === 1;
          bitIndex++;
        }
      }
    }

    return { grid: grid, fixed: fixed, size: size };
  }

  /* ── masking ──────────────────────────────────────────────────────────── */
  const MASKS = [
    (r, c) => (r + c) % 2 === 0,
    (r, c) => r % 2 === 0,
    (r, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
  ];

  function applyMask(grid, fixed, size, mask) {
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++)
        if (!fixed[r][c] && MASKS[mask](r, c)) grid[r][c] = !grid[r][c];
  }

  function drawFormat(grid, size, mask) {
    // Level M is 0b00; the five data bits are (level << 3) | mask.
    const data = (0b00 << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = (((data << 10) | rem) ^ 0x5412) & 0x7fff;
    const bit = (i) => ((bits >>> i) & 1) === 1;

    for (let i = 0; i <= 5; i++) grid[i][8] = bit(i);
    grid[7][8] = bit(6);
    grid[8][8] = bit(7);
    grid[8][7] = bit(8);
    for (let i = 9; i < 15; i++) grid[8][14 - i] = bit(i);

    for (let i = 0; i < 8; i++) grid[8][size - 1 - i] = bit(i);
    for (let i = 8; i < 15; i++) grid[size - 15 + i][8] = bit(i);
    grid[size - 8][8] = true;
  }

  function penalty(grid, size) {
    let score = 0;

    // Rule 1 — runs of five or more identical modules in a line.
    const runScore = (get) => {
      let total = 0;
      for (let a = 0; a < size; a++) {
        let run = 1;
        for (let b = 1; b < size; b++) {
          if (get(a, b) === get(a, b - 1)) {
            run++;
            if (run === 5) total += 3;
            else if (run > 5) total += 1;
          } else run = 1;
        }
      }
      return total;
    };
    score += runScore((r, c) => grid[r][c]);
    score += runScore((c, r) => grid[r][c]);

    // Rule 2 — every 2x2 block of one colour.
    for (let r = 0; r < size - 1; r++)
      for (let c = 0; c < size - 1; c++) {
        const v = grid[r][c];
        if (v === grid[r][c + 1] && v === grid[r + 1][c] && v === grid[r + 1][c + 1]) score += 3;
      }

    // Rule 3 — finder-like 1:1:3:1:1 patterns with a four-module quiet run.
    const PAT = [true, false, true, true, true, false, true];
    const matches = (line, i) => {
      for (let k = 0; k < 7; k++) if (line[i + k] !== PAT[k]) return false;
      const before = line.slice(Math.max(0, i - 4), i);
      const after = line.slice(i + 7, i + 11);
      const clear = (arr) => arr.length === 4 && arr.every((v) => v === false);
      return clear(before) || clear(after);
    };
    for (let a = 0; a < size; a++) {
      const row = grid[a];
      const col = grid.map((r) => r[a]);
      for (let i = 0; i + 7 <= size; i++) {
        if (matches(row, i)) score += 40;
        if (matches(col, i)) score += 40;
      }
    }

    // Rule 4 — imbalance between dark and light.
    let dark = 0;
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (grid[r][c]) dark++;
    const percent = (dark * 100) / (size * size);
    score += Math.floor(Math.abs(percent - 50) / 5) * 10;

    return score;
  }

  /* ── public API ───────────────────────────────────────────────────────── */
  function matrix(text, opts) {
    const bytes = utf8Bytes(String(text));
    const version = chooseVersion(bytes.length);
    const codewords = addEcc(makeCodewords(bytes, version), version);
    const forced = opts && opts.mask != null ? opts.mask : null;

    let best = null;
    for (let mask = forced == null ? 0 : forced; mask < (forced == null ? 8 : forced + 1); mask++) {
      const built = buildMatrix(version, codewords);
      applyMask(built.grid, built.fixed, built.size, mask);
      drawFormat(built.grid, built.size, mask);
      const score = penalty(built.grid, built.size);
      if (!best || score < best.score) best = { score: score, grid: built.grid, size: built.size, mask: mask, version: version };
    }
    return best;
  }

  function svg(text, opts) {
    const o = opts || {};
    const scale = o.scale || 8;
    const quiet = o.quiet == null ? 4 : o.quiet;
    const dark = o.dark || "#06170F";
    const light = o.light || "#FCF8ED";

    const qr = matrix(text);
    const dim = (qr.size + quiet * 2) * scale;

    let path = "";
    for (let r = 0; r < qr.size; r++)
      for (let c = 0; c < qr.size; c++)
        if (qr.grid[r][c])
          path += "M" + (c + quiet) * scale + " " + (r + quiet) * scale +
                  "h" + scale + "v" + scale + "h-" + scale + "z";

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + dim + '" height="' + dim +
      '" viewBox="0 0 ' + dim + " " + dim + '" shape-rendering="crispEdges" role="img" ' +
      'aria-label="QR code linking to the wedding website">' +
      '<rect width="' + dim + '" height="' + dim + '" fill="' + light + '"/>' +
      '<path d="' + path + '" fill="' + dark + '"/></svg>'
    );
  }

  const QR = { matrix: matrix, svg: svg, EC_M: EC_M };
  if (typeof module !== "undefined" && module.exports) module.exports = QR;
  if (typeof window !== "undefined") window.QR = QR;
})();
