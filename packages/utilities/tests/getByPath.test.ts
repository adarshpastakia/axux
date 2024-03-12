/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { getByPath, getValue } from "../src";

describe("get values by JSON path", () => {
  const tester = {
    outer: {
      inner: {
        main: {
          name: "Test",
          age: 18,
        },
        "my.field": "yes",
        blank: undefined,
      },
      "some.field": "yes",
      "test.array": [
        { field: "string" },
        { field: "number" },
        { field: "boolean" },
      ],
    },
  };
  it("should get default values", (done) => {
    expect(getByPath({}, "prop", "default")).toBe("default");
    expect(getByPath({ props: "test" }, "prop", "default")).toBe("default");
    // will return empty array, reason: outer prop value is array type
    expect(
      getByPath(
        { props: [{ prop1: "temp" }, {}, "temp"] },
        "props.prop.type",
        "default",
      ),
    ).toStrictEqual([]);
    done();
  });

  it("should get inner path", (done) => {
    expect(getByPath(tester, "inner.blank")).toBe(undefined);
    expect(getByPath(tester, "outer.inner.main.name")).toBe("Test");
    expect(getByPath(tester, "outer.inner.main.age")).toBe(18);
    expect(getByPath(tester, "outer.inner.main.gender")).toBe(undefined);
    done();
  });

  it("should get inner path with . in name", (done) => {
    expect(getByPath(tester, "outer.some.field")).toBe("yes");
    expect(getByPath(tester, "outer.inner.my.field")).toBe("yes");
    expect(getByPath(tester, "outer.test.array.0")).toStrictEqual({
      field: "string",
    });
    expect(getByPath(tester, "outer.test.array.field")).toStrictEqual([
      "string",
      "number",
      "boolean",
    ]);
    done();
  });

  it("should get first no null value", (done) => {
    expect(getValue(undefined, "yes", null)).toBe("yes");
    expect(getValue(null, 0, undefined, "yes", null)).toBe(0);
    done();
  });
});
