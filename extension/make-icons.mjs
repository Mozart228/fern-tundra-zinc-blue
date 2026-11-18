import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "icons");
fs.mkdirSync(dir, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function png(size, rgba) {
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function rounded(x, y, size, radius) {
  const max = size - 0.5;
  const dx = x < radius ? radius - x : x > max - radius ? x - (max - radius) : 0;
  const dy = y < radius ? radius - y : y > max - radius ? y - (max - radius) : 0;
  return dx * dx + dy * dy <= radius * radius;
}

function draw(size) {
  const img = Buffer.alloc(size * size * 4);
  const radius = size * 0.22;
  const x1 = size * 0.66;
  const y1 = size * 0.16;
  const x2 = size * 0.34;
  const y2 = size * 0.84;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const thick = size * 0.11;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const i = (y * size + x) * 4;
      if (!rounded(px, py, size, radius)) continue;
      img[i] = 0x0e;
      img[i + 1] = 0x11;
      img[i + 2] = 0x16;
      img[i + 3] = 255;
      const t = Math.max(0, Math.min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / (len * len)));
      const dist = Math.hypot(px - (x1 + (x2 - x1) * t), py - (y1 + (y2 - y1) * t));
      if (dist <= thick / 2) {
        img[i] = 0xe4;
        img[i + 1] = 0xa0;
        img[i + 2] = 0x4a;
      }
    }
  }
  return img;
}

for (const size of [16, 32, 48, 128]) {
  fs.writeFileSync(path.join(dir, `icon${size}.png`), png(size, draw(size)));
}
