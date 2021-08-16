// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { getByPath } from "../src";

describe("get values by JSON path", () => {
  const tester = {
    outer: {
      inner: {
        main: {
          name: "Test",
          age: 18
        },
        "my.field": "yes"
      },
      "some.field": "yes",
      "test.array": [{ field: "string" }, { field: "number" }, { field: "boolean" }]
    }
  };
  it("should get by path", (done) => {
    expect(getByPath({}, "prop", "default")).toBe("default");
    expect(getByPath({ props: "test" }, "prop", "default")).toBe("default");
    expect(
      getByPath({ props: [{ prop1: "temp" }, {}, "temp"] }, "props.prop.type", "default")
    ).toBe("default");
    done();
  });

  it("should get inner path", (done) => {
    expect(getByPath(tester, "outer.inner.main.name")).toBe("Test");
    expect(getByPath(tester, "outer.inner.main.age")).toBe(18);
    expect(getByPath(tester, "outer.inner.main.gender")).toBe(undefined);
    done();
  });

  it("should get inner path with . in name", (done) => {
    expect(getByPath(tester, "outer.some.field")).toBe("yes");
    expect(getByPath(tester, "outer.inner.my.field")).toBe("yes");
    expect(getByPath(tester, "outer.test.array.field")).toStrictEqual([
      "string",
      "number",
      "boolean"
    ]);
    done();
  });
});
