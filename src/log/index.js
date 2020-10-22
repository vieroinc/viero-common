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

import { VieroError } from '../error';
import { VieroConsoleLog } from './backend/console';

let BACKEND;
let LEVEL;

const time = () => new Date().toISOString().slice(11, -1);

class VieroLog {
  static set backend(backend) {
    BACKEND = backend;
  }

  static set level(level) {
    switch (level) {
      case VieroLog.LEVEL.NONE: {
        LEVEL = VieroLog.LEVEL.NONE;
        return;
      }
      case VieroLog.LEVEL.ERROR: {
        LEVEL = VieroLog.LEVEL.ERROR;
        return;
      }
      case VieroLog.LEVEL.WARNING: {
        LEVEL = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING;
        return;
      }
      case VieroLog.LEVEL.INFO: {
        LEVEL = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO;
        return;
      }
      case VieroLog.LEVEL.DEBUG: {
        LEVEL = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO | VieroLog.LEVEL.DEBUG;
        return;
      }
      case VieroLog.LEVEL.TRACE: {
        LEVEL = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO | VieroLog.LEVEL.DEBUG
          | VieroLog.LEVEL.TRACE;
        return;
      }
      default: {
        throw new VieroError('/log', 118653);
      }
    }
  }

  static get level() {
    return LEVEL;
  }

  static isTrace() {
    return LEVEL & VieroLog.LEVEL.TRACE;
  }

  static isDebug() {
    return LEVEL & VieroLog.LEVEL.DEBUG;
  }

  static isInfo() {
    return LEVEL & VieroLog.LEVEL.INFO;
  }

  static isWarning() {
    return LEVEL & VieroLog.LEVEL.WARNING;
  }

  static isError() {
    return LEVEL & VieroLog.LEVEL.ERROR;
  }

  static isNone() {
    return LEVEL & VieroLog.LEVEL.NONE;
  }

  constructor(domain, backend) {
    this._domain = domain;
    this.BACKEND = backend || BACKEND || new VieroConsoleLog();
  }

  isTrace() {
    return VieroLog.isTrace();
  }

  isDebug() {
    return VieroLog.isDebug();
  }

  isInfo() {
    return VieroLog.isInfo();
  }

  isWarning() {
    return VieroLog.isWarning();
  }

  isError() {
    return VieroLog.isError();
  }

  isNone() {
    return VieroLog.isNone();
  }

  trace(...args) {
    if (this.isTrace()) {
      this.BACKEND.trace(time(), 'T', this._domain, ...args);
    }
  }

  debug(...args) {
    if (this.isDebug()) {
      this.BACKEND.debug(time(), 'D', this._domain, ...args);
    }
  }

  info(...args) {
    if (this.isInfo()) {
      this.BACKEND.info(time(), 'I', this._domain, ...args);
    }
  }

  warning(...args) {
    if (this.isWarning()) {
      this.BACKEND.warning(time(), 'W', this._domain, ...args);
    }
  }

  error(...args) {
    if (this.isError()) {
      this.BACKEND.error(time(), 'E', this._domain, ...args);
    }
  }
}

VieroLog.LEVEL = {
  NONE: 1 << 0,
  ERROR: 1 << 1,
  WARNING: 1 << 2,
  INFO: 1 << 3,
  DEBUG: 1 << 4,
  TRACE: 1 << 5,
};

export { VieroLog };
