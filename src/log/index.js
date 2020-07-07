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

import { VieroError } from '../error/index.js';

let _backend;
let _level;

const time = () => new Date().toISOString().slice(11, -1);

class VieroConsoleLog {

  trace(...args) {
    console.trace(...args);
  }

  debug(...args) {
    console.debug(...args);
  }

  info(...args) {
    console.info(...args);
  }

  warning(...args) {
    console.warn(...args);
  }

  error(...args) {
    console.error(...args);
  }

}

export class VieroLog {

  static set backend(backend) {
    _backend = backend;
  }

  static set level(level) {
    switch (level) {
      case VieroLog.LEVEL.NONE: {
        return _level = VieroLog.LEVEL.NONE;
      }
      case VieroLog.LEVEL.ERROR: {
        return _level = VieroLog.LEVEL.ERROR;
      }
      case VieroLog.LEVEL.WARNING: {
        return _level = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING;
      }
      case VieroLog.LEVEL.INFO: {
        return _level = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO;
      }
      case VieroLog.LEVEL.DEBUG: {
        return _level = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO | VieroLog.LEVEL.DEBUG;
      }
      case VieroLog.LEVEL.TRACE: {
        return _level = VieroLog.LEVEL.ERROR | VieroLog.LEVEL.WARNING | VieroLog.LEVEL.INFO | VieroLog.LEVEL.DEBUG | VieroLog.LEVEL.TRACE;
      }
    }
    throw new VieroError('/log', 118653);
  }

  static get level() {
    return _level;
  }

  static isTrace() {
    return _level & VieroLog.LEVEL.TRACE;
  }

  static isDebug() {
    return _level & VieroLog.LEVEL.DEBUG;
  }

  static isInfo() {
    return _level & VieroLog.LEVEL.INFO;
  }

  static isWarning() {
    return _level & VieroLog.LEVEL.WARNING;
  }

  static isError() {
    return _level & VieroLog.LEVEL.ERROR;
  }

  static isNone() {
    return _level & VieroLog.LEVEL.NONE;
  }

  constructor(domain, backend) {
    this._domain = domain;
    this._backend = backend || _backend || new VieroConsoleLog();
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
      this._backend.trace(this._domain, time(), ...args);
    }
  }

  debug(...args) {
    if (this.isDebug()) {
      this._backend.debug(this._domain, time(), ...args);
    }
  }

  info(...args) {
    if (this.isInfo()) {
      this._backend.info(this._domain, time(), ...args);
    }
  }

  warning(...args) {
    if (this.isWarning()) {
      this._backend.warning(this._domain, time(), ...args);
    }
  }

  error(...args) {
    if (this.isError()) {
      this._backend.error(this._domain, time(), ...args);
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
