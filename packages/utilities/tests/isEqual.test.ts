/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { compareValues, isEqual, matchString } from "../src";

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
      isEqual({ ...obj, temp: [1, 2] }, { ...obj, temp: [1, 2] }),
    ).toBeTruthy();
    expect(
      isEqual({ ...obj, temp: [1, 2] }, { ...obj, temp: [1] }),
    ).toBeFalsy();
    done();
  });

  it("should match string", (done) => {
    expect(matchString("mañana", "manana")).toBeTruthy();
    expect(matchString("São Tomé", "sao tome")).toBeTruthy();
    done();
  });

  it("should compare", (done) => {
    expect(compareValues()("testing", "testing")).toBe(0);
    expect(compareValues()("testing", "completed")).toBe(1);
    expect(compareValues()("abacus", "completed")).toBe(-1);
    expect(compareValues("desc")("testing", "completed")).toBe(-1);

    expect(compareValues()(9, 4)).toBe(1);
    expect(compareValues()(false, true)).toBe(1);
    expect(compareValues()(9, 24)).toBe(-1);
    expect(compareValues()(true, false)).toBe(-1);

    expect(
      compareValues("asc", "field")({ field: "a value" }, { field: "b value" }),
    ).toBe(-1);

    done();
  });
});
