/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Format } from "../src";

describe("format test", () => {
  it("should format number", (done) => {
    expect(Format.number()).toBe("");
    expect(Format.number(9.9)).toBe("9.90");
    expect(Format.number(9990)).toBe("9.99k");
    expect(Format.number("-9.81")).toBe("-9.81");
    expect(Format.number("+9.24")).toBe("+9.24");
    done();
  });

  it("should format bytes", (done) => {
    expect(Format.bytes()).toBe("");
    expect(Format.bytes(1000)).toBe("1KB");
    expect(Format.bytes(1000 * 1000)).toBe("1MB");
    expect(Format.bytes(1000 * 1000 * 1000)).toBe("1GB");
    done();
  });

  it("should format percentage", (done) => {
    expect(Format.percent()).toBe("");
    expect(Format.percent(0.24)).toBe("24%");
    expect(Format.percent(0.2418)).toBe("24.18%");
    done();
  });

  it("should format date", (done) => {
    expect(Format.date()).toBe("");
    expect(Format.date("2020-01-01")).toBe("1-1-2020");
    expect(Format.date("2020-01-01", "dd-MMM-y")).toBe("01-Jan-2020");
    done();
  });

  it("should format duration", (done) => {
    expect(Format.duration()).toBe("00:00.000");
    expect(Format.duration("test")).toBe("00:00.000");
    expect(Format.duration(86400000 + 14400000 + 1740000 + 18000 + 189)).toBe(
      "1d:04:29:18.189"
    );
    expect(Format.duration(60 * 24 + 3 + 0.128, true)).toBe("24:03.128");
    done();
  });

  it("should format duration seconds", (done) => {
    expect(Format.durationSeconds()).toBe("00:00");
    expect(Format.durationSeconds("test")).toBe("00:00");
    expect(Format.durationSeconds(1000 * 60 * 24 + 3000 + 128)).toBe("24:03");
    expect(Format.durationSeconds(60 * 24 + 3 + 0.128, true)).toBe("24:03");
    done();
  });

  it("should format phone", (done) => {
    expect(Format.phone()).toBe(undefined);
    expect(Format.phone("99123")).toMatchSnapshot();
    expect(Format.phone("971502491824")).toMatchSnapshot();
    expect(Format.phone("00971502491824")).toMatchSnapshot();
    done();
  });
});
