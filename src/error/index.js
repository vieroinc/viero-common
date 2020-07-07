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

export class VieroError extends Error {

  constructor(domain, code, userData) {
    super(`VieroError ${domain}:${code}`);
    this._domain = domain;
    this._code = code;
    this._userData = userData || {};
  }

  get domain() {
    return this._domain;
  }

  get code() {
    return this._code;
  }

  get userData() {
    return this._userData;
  }

  get(key) {
    return this.userData[key];
  }

}

VieroError.KEY = {
  ERROR: 'VieroErrorKeyError',
  MESSAGE: 'VieroErrorKeyMessage',
  RESOLUTION: 'VieroErrorKeyResolution',
};
