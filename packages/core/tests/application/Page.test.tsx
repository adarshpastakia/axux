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
import * as stories from "../../stories/application/Page.stories";

const { Example } = composeStories(stories);

describe("Page", () => {
  beforeAll(() => {
    render(
      <Example title="Page title" showTitle isLoading>
        Page content
      </Example>,
    );
  });

  it("should render", () => {
    expect(document.querySelector(".ax-page")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it("should render with title", () => {
    expect(document.querySelector(".ax-page__title")).not.toBeNull();
  });
  it("should render loading indicator", () => {
    expect(document.querySelector(".loading-indicator")).not.toBeNull();
  });

  afterAll(() => {
    cleanup();
  });
});
