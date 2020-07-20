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

const MERGE = {};

/**
 * Throttles parallel calls with the same intent by returning the response of
 * the first completed operation to each subsequent ones until the first completes.
 * @param {*} intent the intent of the merge. Must be unique to the use case.
 * @param {*} op the function that MUST return with a Promise.
 */
const merge = (intent, op) => {
  if (!MERGE[intent]) {
    MERGE[intent] = op().then((res) => {
      delete MERGE[intent];
      return res;
    }).catch((err) => {
      delete MERGE[intent];
      throw err;
    });
  }
  return MERGE[intent];
};

/**
 * Not implemented!
 */
/*
export const throttle = () => {
  // TODO: implement
};
*/

/**
 * Not implemented!
 */
/*
export const debounce = () => {
  // TODO: implement
};
*/

export { merge };
