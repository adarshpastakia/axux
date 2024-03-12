/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { composeStories } from "@storybook/testing-react";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import * as stories from "../../stories/application/ErrorBoundary.stories";

const { Example } = composeStories(stories);

describe("ErrorBoundary", () => {
  beforeAll(() => {
    render(<Example />);
  });

  it("should render", () => {
    expect(document.querySelector(".ax-error-boundary")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  afterAll(() => {
    cleanup();
  });
});
