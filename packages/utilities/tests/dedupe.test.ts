/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
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
        "field",
      ),
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
