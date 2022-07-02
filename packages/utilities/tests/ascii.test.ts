/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ascii } from "../src";

describe("ascii converter test", () => {
  it("should convert latin to ascii", (done) => {
    expect(ascii("")).toBe("");
    expect(ascii("mañana")).toBe("manana");
    expect(ascii("sáo tomê")).toBe("sao tome");
    expect(ascii("são paulo")).toBe("sao paulo");
    done();
  });
});
