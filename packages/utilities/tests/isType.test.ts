/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  isBoolean,
  isColor,
  isEmpty,
  isFalse,
  isNil,
  isNull,
  isNumber,
  isObject,
  isRtl,
  isString,
  isSvgPath,
  isTrue,
  isUndefined,
} from "../src";

describe("check type test", () => {
  it("should check nils", (done) => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined(null)).toBeFalsy();
    expect(isNull(null)).toBeTruthy();
    expect(isNull(undefined)).toBeFalsy();
    expect(isNil(null)).toBeTruthy();
    expect(isNil(undefined)).toBeTruthy();
    done();
  });
  it("should check empty", (done) => {
    expect(isEmpty("test")).toBeFalsy();
    expect(isEmpty(9)).toBeFalsy();
    expect(isEmpty(true)).toBeFalsy();
    expect(isEmpty([1, 2])).toBeFalsy();
    expect(isEmpty({ a: 1, b: 2 })).toBeFalsy();
    expect(isEmpty(new Map([["a", "test"]]))).toBeFalsy();

    expect(isEmpty("")).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(new Map())).toBeTruthy();
    done();
  });
  it("should check string", (done) => {
    expect(isString("test")).toBeTruthy();
    expect(isString(9)).toBeFalsy();
    done();
  });
  it("should check number", (done) => {
    expect(isNumber(9)).toBeTruthy();
    expect(isNumber("9")).toBeFalsy();
    done();
  });
  it("should check boolean", (done) => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean("true")).toBeFalsy();
    done();
  });
  it("should check truthy", (done) => {
    expect(isTrue()).toBeFalsy();
    expect(isTrue(true)).toBeTruthy();
    expect(isTrue("true")).toBeTruthy();
    expect(isTrue("yes")).toBeTruthy();
    done();
  });
  it("should check falsy", (done) => {
    expect(isFalse()).toBeFalsy();
    expect(isFalse(false)).toBeTruthy();
    expect(isFalse("false")).toBeTruthy();
    expect(isFalse("no")).toBeTruthy();
    done();
  });
  it("should check object", (done) => {
    expect(isObject({ a: 1 })).toBeTruthy();
    expect(isObject("{a:1}")).toBeFalsy();
    done();
  });
  it("should check svg path", (done) => {
    expect(isSvgPath("M9 9z")).toBeTruthy();
    expect(isSvgPath("M9,56.8-89.12 9z")).toBeTruthy();
    expect(isSvgPath("1,1 45z")).toBeFalsy();
    done();
  });
  it("should check color", (done) => {
    expect(isColor("blue")).toBeFalsy();
    expect(isColor("#fc9832")).toBeTruthy();
    done();
  });
  it("should check rtl", (done) => {
    expect(isRtl()).toBeFalsy();
    done();
  });
});
