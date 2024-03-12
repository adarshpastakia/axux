/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { interpolate, renderTemplate } from "../src";

describe("interpolation test", () => {
  it("should interpolate", (done) => {
    expect(interpolate("Blank: ${firstName} ${lastName}", {})).toBe("Blank:  ");
    expect(
      interpolate("Fullname: ${firstName} ${lastName}", {
        firstName: "Cary",
        lastName: "Grant",
      }),
    ).toBe("Fullname: Cary Grant");
    done();
  });

  it("should render template", (done) => {
    const model = {
      person: {
        firstName: "John",
        lastName: "Doe",
      },
      dob: "2000-01-01",
    };
    expect(
      renderTemplate("Person: {{person.firstName}} {{person.lastName}}", model),
    ).toBe("Person: John Doe");
    done();
  });
});
