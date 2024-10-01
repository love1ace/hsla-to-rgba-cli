#!/usr/bin/env node

const hslaToRgba = (h, s, l, a = 1) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b, a };
};

const [h, s, l, aValue] = process.argv.slice(2).map(Number);
const a = parseFloat(aValue) || 1;

if ([h, s, l].some((value) => isNaN(value) || value < 0 || h > 360 || s > 100 || l > 100)) {
  console.error("Invalid HSLA values. Please provide valid values: H (0-360), S (0-100), L (0-100).");
  process.exit(1);
}

if (isNaN(a) || a < 0 || a > 1) {
  console.error("Invalid alpha value. Alpha should be between 0 and 1.");
  process.exit(1);
}

const { r, g, b, a: alpha } = hslaToRgba(h, s, l, a);

console.log(`HSLA: (${h}°, ${s}%, ${l}%, ${alpha})`);
console.log(`RGBA: (${r}, ${g}, ${b}, ${alpha})`);

console.log(`\x1b[48;2;${r};${g};${b}m   COLOR   \x1b[0m`);
console.log(`Alpha: ${a} (not visible in ANSI)`);