// Jalali (Persian / Solar Hijri) calendar utilities — zero dependency.
// Based on the well-known algorithm by Roozbeh Pournader & Mohammad Toossi.

function div(a, b) { return Math.floor(a / b); }
function mod(a, b) { return a - Math.floor(a / b) * b; }

function jalCal(jy) {
  const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
  const bl = breaks.length;
  const gy = jy + 621;
  let leapJ = -14, jp = breaks[0], jm, jump, leap, n, i;
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;
  return { leap, gy, march };
}

function g2d(gy, gm, gd) {
  let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

function j2d(jy, jm, jd) {
  const r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let jd, jm, k;
  k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy, jm, jd };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }
  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy, jm, jd };
}

export function toJalaali(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return d2j(g2d(date.getFullYear(), date.getMonth() + 1, date.getDate()));
}

export function toJalaaliFromArray(gy, gm, gd) {
  return d2j(g2d(gy, gm, gd));
}

export function toGregorian(jy, jm, jd) {
  const d = d2g(j2d(jy, jm, jd));
  return new Date(d.gy, d.gm - 1, d.gd);
}

export function isLeapJalaliYear(jy) {
  return jalCal(jy).leap === 0;
}

export function jalaliMonthLength(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isLeapJalaliYear(jy) ? 30 : 29;
}

export const JALALI_MONTHS_FA = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

export const JALALI_MONTHS_FA_LATIN = [
  'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
  'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand',
];

export const JALALI_WEEKDAYS_FA = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
export const JALALI_WEEKDAYS_SHORT_FA = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export function toFaDigits(s) {
  return String(s).replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}

// Format a Date/string into a Jalali string.
// style: 'short' -> 1403/05/12 , 'long' -> 12 مرداد 1403 , 'datetime' -> 1403/05/12 14:30
export function formatJalali(date, style = 'short', lang = 'fa') {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const { jy, jm, jd } = toJalaali(d);
  const mm = String(jm).padStart(2, '0');
  const dd = String(jd).padStart(2, '0');
  const nums = (s) => (lang === 'fa' ? toFaDigits(s) : s);
  if (style === 'short') return `${nums(jy)}/${nums(mm)}/${nums(dd)}`;
  if (style === 'long') {
    const monthName = lang === 'fa' ? JALALI_MONTHS_FA[jm - 1] : JALALI_MONTHS_FA_LATIN[jm - 1];
    return `${nums(dd)} ${monthName} ${nums(jy)}`;
  }
  if (style === 'datetime') {
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${nums(jy)}/${nums(mm)}/${nums(dd)} - ${nums(hh)}:${nums(mi)}`;
  }
  if (style === 'weekday') {
    const wd = lang === 'fa' ? JALALI_WEEKDAYS_FA[d.getDay()] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    return wd;
  }
  return `${nums(jy)}/${nums(mm)}/${nums(dd)}`;
}

// Convert a Jalali date input (jy, jm, jd) to an ISO Gregorian string for storage.
export function jalaliToISO(jy, jm, jd) {
  const g = toGregorian(jy, jm, jd);
  return g.toISOString();
}