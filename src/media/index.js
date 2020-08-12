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

const SUPPORTED_FORMAT = {
  VIDEO: {
    MIME: [
      'video/x-matroska',
      'video/mp4',
      'video/x-m4v',
      'video/quicktime',
      'video/3gpp',
      'video/mpeg',
      'video/mp2p',
      'video/mp2t',
      'video/x-msvideo',
      'video/vnd.avi',
      'video/divx',
      'video/x-ms-wmv',
      'video/webm',
      'video/x-ms-vob',
      'video/x-motion-jpeg',
      'video/ogg',
      'video/x-viero-unknown',
    ],
    EXT: {
      divx: {
        mime: 'video/divx',
      },
    },
  },
  SUBTITLE: {
    EXT: {
      srt: {
        mime: 'text/plain',
      },
      sub: {
        mime: 'text/plain',
      },
      idx: {
        mime: 'text/plain',
      },
      smi: {
        mime: 'application/smil',
      },
      smil: {
        mime: 'application/smil',
      },
    },
  },
  IMAGE: {
    MIME: {
      'image/x-viero-unknown': {
        ext: [],
        transcode: false,
      },
      'image/jpeg': {
        ext: ['jpg', 'jpeg'],
        transcode: false,
      },
      'image/gif': {
        ext: ['gif'],
        transcode: false,
      },
      'image/png': {
        ext: ['png'],
        transcode: false,
      },
      'image/bmp': {
        ext: ['bmp'],
        transcode: 'jpeg',
      },
      'image/heif': {
        ext: ['heif', 'heic'],
        transcode: 'jpeg',
      },
      'image/heif-sequence': {
        ext: ['heif', 'heic'],
        transcode: 'jpeg',
      },
      'image/heic': {
        ext: ['heif', 'heic'],
        transcode: 'jpeg',
      },
      'image/heic-sequence': {
        ext: ['heif', 'heic'],
        transcode: 'jpeg',
      },
      'image/tiff': {
        ext: ['tif'],
        transcode: 'jpeg',
      },
      'image/tiff-fx': {
        ext: ['tif'],
        transcode: 'jpeg',
      },
      'image/x-portable-pixmap': {
        ext: ['ppm'],
        transcode: 'jpeg',
      },
      'image/x-sony-arw': {
        ext: ['arw'],
        transcode: 'jpeg',
      }, // (Sony)
      'image/x-sony-sr2': {
        ext: ['sr2'],
        transcode: 'jpeg',
      }, // (Sony)
      'image/x-canon-crw': {
        ext: ['crw'],
        transcode: 'jpeg',
      }, // (Canon)
      'image/x-canon-cr2': {
        ext: ['crw'],
        transcode: 'jpeg',
      }, // (Canon)
      'image/x-kodak-dcr': {
        ext: ['dcr'],
        transcode: 'jpeg',
      }, // (Kodak)
      'image/x-adobe-dng': {
        ext: ['dng'],
        transcode: 'jpeg',
      }, // (Adobe)
      'image/x-minolta-mrw': {
        ext: ['mrw'],
        transcode: 'jpeg',
      }, // (Minolta, Konica Minolta)
      'image/x-nikon-nef': {
        ext: ['nef'],
        transcode: 'jpeg',
      }, // (Nikon)
      'image/x-olympus-orf': {
        ext: ['orf'],
        transcode: 'jpeg',
      }, // (Olympus)
      'image/x-pentax-pef': {
        ext: ['pef'],
        transcode: 'jpeg',
      }, // (Pentax)
      'image/x-fuji-raf': {
        ext: ['raf'],
        transcode: 'jpeg',
      }, // (Fuji)
      'image/x-sigma-x3f': {
        ext: ['x3f'],
        transcode: 'jpeg',
      }, // (Sigma)
    },
  },
};

const supportedFormats = () => JSON.parse(JSON.stringify(SUPPORTED_FORMAT));

const mimeTypesForExt = (extension, map) => Object.keys(map)
  .filter((mime) => map[mime].ext.includes((extension || '').toLowerCase()));

const isVideo = (mime, extension) => SUPPORTED_FORMAT.VIDEO.MIME.includes(mime)
  || !!SUPPORTED_FORMAT.VIDEO.EXT[(extension || '').toLowerCase()];

const isImage = (mime, extension) => !!SUPPORTED_FORMAT.IMAGE.MIME[mime]
  || mimeTypesForExt(extension, SUPPORTED_FORMAT.IMAGE.MIME).length > 0;

const isSubtitle = (extension) => !!SUPPORTED_FORMAT.SUBTITLE.EXT[(extension || '').toLowerCase()];

const isSupported = (size, mime, ext) => size > 0 && (isVideo(mime, ext) || isImage(mime, ext) || isSubtitle(ext));

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

const parseMime = (mime) => {
  const split = mime.split(';');
  const type = split[0];
  const typeSplit = type.split('/');
  if (split.length === 1) {
    return { type, major: typeSplit[0].trim(), minor: typeSplit[1].trim() };
  }
  const codecsSplit = split[1].slice(7).split(',');
  return {
    type, major: typeSplit[0], minor: typeSplit[1], codecs: codecsSplit,
  };
};

export {
  supportedFormats, isVideo, isImage, isSubtitle, isSupported, humanReadableTimeCode, parseMime,
};
