/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEqual } from "../src";

describe("isEqual test", () => {
  it("should check string", (done) => {
    expect(isEqual("test", "test")).toBeTruthy();
    expect(isEqual("TEST", "test")).toBeFalsy();
    done();
  });

  it("should check number", (done) => {
    expect(isEqual(9, 9)).toBeTruthy();
    expect(isEqual(9, "9")).toBeFalsy();
    done();
  });

  it("should check boolean", (done) => {
    expect(isEqual(true, true)).toBeTruthy();
    expect(isEqual(false, "false")).toBeFalsy();
    done();
  });

  it("should check array", (done) => {
    expect(isEqual([], [])).toBeTruthy();
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(isEqual([1, 2], [1])).toBeFalsy();
    expect(isEqual([1, 2], [1, 3])).toBeFalsy();
    expect(isEqual([1, 2], undefined)).toBeFalsy();
    done();
  });

  it("should check object", (done) => {
    expect(isEqual({}, {})).toBeTruthy();
    expect(isEqual({ a: 1 }, { a: 1 })).toBeTruthy();
    expect(isEqual({ a: 1 }, {})).toBeFalsy();
    expect(isEqual({ a: 1 }, { b: false })).toBeFalsy();
    done();
  });

  it("should check object array", (done) => {
    const obj = [
      {
        name: "First name",
        password: "Passwd!2#",
      },
      {
        isAuthenticated: true,
      },
    ];
    expect(isEqual(obj, [...obj])).toBeTruthy();
    expect(isEqual(obj, [...obj, { isAuthenticated: false }])).toBeFalsy();
    expect(
      isEqual({ ...obj, temp: [1, 2] }, { ...obj, temp: [1, 2] })
    ).toBeTruthy();
    expect(
      isEqual({ ...obj, temp: [1, 2] }, { ...obj, temp: [1] })
    ).toBeFalsy();
    done();
  });
});
