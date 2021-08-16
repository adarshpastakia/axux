// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  isBoolean,
  isEmpty,
  isFalse,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isSvgPath,
  isTrue,
  isUndefined
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
    expect(isSvgPath("1,1 45z")).toBeFalsy();
    done();
  });
});
