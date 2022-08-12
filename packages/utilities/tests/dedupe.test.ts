/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { dedupe, flattenAndDedupe } from "../src";

describe("dedupe test", () => {
  it("should dedupe", (done) => {
    expect(dedupe(["test", "next", "text", "test"])).toEqual([
      "test",
      "next",
      "text",
    ]);
    done();
  });

  it("should flatten and dedupe", (done) => {
    expect(flattenAndDedupe()).toEqual([]);
    expect(
      flattenAndDedupe(
        [
          [
            {
              field: "test",
            },
          ],
          [
            {
              field: "text",
            },
            { field: "test" },
          ],
        ],
        "field"
      )
    ).toEqual([
      {
        field: "test",
      },
      {
        field: "text",
      },
    ]);
    done();
  });
});
