// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

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
