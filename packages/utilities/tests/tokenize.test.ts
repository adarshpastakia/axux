/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { iconToken, tokenize } from "../src";

describe("tokenize test", () => {
  it("should tokenize text", (done) => {
    expect(tokenize("lorem ipsum lorem dolor", "")).toEqual([
      ["lorem ipsum lorem dolor", ""],
    ]);
    expect(tokenize("lorem ipsum lorem dolor", "lorem")).toEqual([
      ["", "lorem"],
      [" ipsum ", "lorem"],
      [" dolor", ""],
    ]);
    expect(tokenize("lorem ipsum lorem dolor", ["lorem", "ipsum"])).toEqual([
      ["", "lorem"],
      [" ", "ipsum"],
      [" ", "lorem"],
      [" dolor", ""],
    ]);
    done();
  });

  it("should tokenize text for icon", (done) => {
    expect(iconToken("Username")).toBe("US");
    expect(iconToken("Doctor Who")).toBe("DW");
    done();
  });
});
