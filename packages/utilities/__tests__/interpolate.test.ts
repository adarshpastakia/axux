// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { interpolate } from "../src";

describe("interpolation test", () => {
  it("should interpolate", (done) => {
    expect(interpolate("Blank: ${firstName} ${lastName}", {})).toBe("Blank:  ");
    expect(
      interpolate("Fullname: ${firstName} ${lastName}", { firstName: "Cary", lastName: "Grant" })
    ).toBe("Fullname: Cary Grant");
    done();
  });
});
