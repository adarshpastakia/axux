// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {Countries} from "../src";

describe("countries test", () => {
  it("should return country model", (done) => {
    expect(Countries.find("xx")).toBeUndefined();
    const model = Countries.find("ae");
    if (model) {
      expect(model.iso3).toBe("ARE");
      expect(model.alt).toBe("UAE");
    }
    done();
  });

  it("should convert iso2 to iso3", (done) => {
    expect(Countries.toIso3("xx")).toBeUndefined();
    expect(Countries.toIso3("ae")).toBe("ARE");
    done();
  });

  it("should convert iso3 to iso2", (done) => {
    expect(Countries.toIso2("xxx")).toBeUndefined();
    expect(Countries.toIso2("are")).toBe("AE");
    done();
  });

  it("should convert alternate code to iso2", (done) => {
    expect(Countries.toIso2("uae")).toBe("AE");
    done();
  });

  it("should receive flag emoji", (done) => {
    expect(Countries.emoji("xxx")).toBe("🏳️");
    expect(Countries.emoji("are")).toBe("🇦🇪");
    done();
  });

  it("should receive country name", (done) => {
    expect(Countries.name("xxx")).toBe("xxx");
    expect(Countries.name("are")).toBe("United Arab Emirates");
    done();
  });
});
