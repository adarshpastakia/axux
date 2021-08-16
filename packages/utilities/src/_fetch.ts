// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

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
    method
  };

  headers["accept"] = "application/json";
  if (method === "post" || method === "put") {
    options.body = body;
    if (!(body instanceof FormData)) {
      headers["content-type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

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
      try {
        return resp.json();
      } catch (e) {
        throw Error(resp.statusText);
      }
    })
    .then((resp) => {
      const errorCode = resp.error_code ?? resp.errorCode ?? resp.error;
      const message = resp.error_message ?? resp.errorMessage ?? resp.message;
      if (resp.status === "error" || errorCode) {
        throw Error(`[${errorCode ?? "ERR"}] ${message}`);
      }
      return resp;
    });
};

_fetch.isAborted = ({ name }: Error) => name === "AbortError";
_fetch.abort = (signal: string) => {
  if (_signals.has(signal)) {
    const _s = _signals.get(signal) as AbortController;
    _s.abort();
    _signals.delete(signal);
  }
};
