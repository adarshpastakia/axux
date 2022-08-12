/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ascii, iconToken, tokenize } from "../src";

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
