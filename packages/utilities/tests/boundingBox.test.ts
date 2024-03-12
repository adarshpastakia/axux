/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { getBoundingBox, getBox } from "../src";

describe("bounding box test", () => {
  it("should get bounding box", (done) => {
    expect(getBoundingBox()).toEqual([0, 0, 0, 0]);
    expect(getBoundingBox("")).toEqual([0, 0, 0, 0]);
    expect(getBoundingBox("10,10, 96,128")).toEqual([10, 10, 86, 118]);
    expect(getBoundingBox("-10,-10, 96,128")).toEqual([0, 0, 106, 138]);
    done();
  });

  it("should get box", (done) => {
    expect(getBox()).toEqual([0, 0, 0, 0]);
    expect(getBox("")).toEqual([0, 0, 0, 0]);
    expect(getBox("10,10, 96,128")).toEqual([10, 10, 96, 128]);
    expect(getBox("-10,-10, 96,128")).toEqual([0, 0, 86, 118]);
    done();
  });
});
