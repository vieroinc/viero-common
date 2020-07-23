/**
 * Copyright 2020 Viero, Inc.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const MILIS_IN_SEC = 1000;
const SECS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECS_IN_HOUR = SECS_IN_MINUTE * MINUTES_IN_HOUR;

const humanReadableTimeCode = (miliseconds, options = {}) => {
  if (!Number.isFinite(miliseconds)) {
    if (options.compress) return '-';
    if (options.milis) return '--:--:--.---';
    return '--:--:--';
  }
  const milis = miliseconds % MILIS_IN_SEC;
  let secs = Math.floor(miliseconds / MILIS_IN_SEC);
  const hours = Math.floor(secs / SECS_IN_HOUR);
  if (hours) secs -= (hours * SECS_IN_HOUR);
  const minutes = Math.floor(secs / MINUTES_IN_HOUR);
  if (minutes) secs -= (minutes * MINUTES_IN_HOUR);
  if (options.compress) {
    if (hours) return `${hours}:${(`0${minutes}`).slice(-2)}:${(`0${secs}`).slice(-2)}`;
    if (minutes) return `${minutes}:${(`0${secs}`).slice(-2)}`;
    return `${secs}`;
  }
  const hhmmss = [['00', `${hours}`], ['00', `${minutes}`], ['00', `${secs}`]]
    .map((def) => (def[0] + def[1]).slice(-(Math.max(2, def[1].length)))).join(':');

  if (options.milis) return `${hhmmss}.${`000${milis}`.slice(-3)}`;
  return hhmmss;
};

export { humanReadableTimeCode };