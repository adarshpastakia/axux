/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { isString } from "./_isType";

declare type METHODS = "get" | "post" | "put" | "delete";
declare type FetchOptions = {
  body?: KeyValue | FormData;
  headers?: KeyValue;
  signal?: string | AbortSignal;
};

const _signals: Map<string, AbortController> = new Map();

/**
 * Fetch helper
 * @param method
 * @param url
 * @param headers
 * @param body
 * @param signal
 * @internal
 */
export const _fetch = (
  method: METHODS,
  url: string,
  { headers = {}, body, signal }: FetchOptions
) => {
  const options: KeyValue = {
    method,
  };

  headers["accept"] = "application/json";
  if (method === "post" || method === "put") {
    options.body = body;
    /******************* set body to json when not FormData *******************/
    if (!(body instanceof FormData)) {
      headers["content-type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  /******************* reset abort signal *******************/
  if (signal && isString(signal)) {
    if (_signals.has(signal)) {
      const _s = _signals.get(signal) as AbortController;
      _s.abort();
      _signals.delete(signal);
    }
    const ac = new AbortController();
    options.signal = ac.signal;
    _signals.set(signal, ac);
  } else if (signal instanceof AbortSignal) {
    options.signal = signal;
  }

  return fetch(url, { ...options, headers })
    .then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json();
      }
      throw { status: resp.status, code: -1, message: resp.statusText };
    })
    .then((resp) => {
      /******************* check for possible error code propeties in response *******************/
      const code = resp.error_code ?? resp.errorCode ?? resp.error;
      const message = resp.error_message ?? resp.errorMessage ?? resp.message;
      if (resp.status === "error" || code) {
        throw { status: 500, code, message };
      }
      return resp;
    });
};

/******************* attach isAborted helper to fetch method *******************/
_fetch.isAborted = ({ name }: Error) => name === "AbortError";

/******************* attach abort helper to fetch method *******************/
_fetch.abort = (signal: string) => {
  if (_signals.has(signal)) {
    const _s = _signals.get(signal) as AbortController;
    _s.abort();
    _signals.delete(signal);
  }
};
