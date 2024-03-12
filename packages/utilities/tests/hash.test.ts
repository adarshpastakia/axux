/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { hash, uuid } from "../src";

describe("hash/uuid test", () => {
  it("should create hash", (done) => {
    expect(hash("")).toBe(0);
    expect(hash("ABC")).toBe(64578);
    done();
  });

  it("should generate uuid", (done) => {
    expect(uuid()).toMatch(
      /^[a-f0-9]{8,8}-[a-f0-9]{4,4}-[a-f0-9]{4,4}-[a-f0-9]{4,4}-[a-f0-9]{12,12}$/,
    );
    done();
  });
});
