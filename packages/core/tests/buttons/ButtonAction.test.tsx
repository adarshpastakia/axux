/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import * as stories from "../../stories/buttons/ButtonAction.stories";

const { Action } = composeStories(stories);

describe("Action Button", () => {
  it("should render", () => {
    const fn = jest.fn(() => true);
    const fragment = render(
      <Action message="Done message" onClick={fn}>
        Click Me
      </Action>,
    );
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should render animation on true result", async () => {
    const fn = jest.fn(() => true);
    const fragment = render(
      <Action message="Done message" onClick={fn}>
        Click Me
      </Action>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    await waitFor(() => {
      expect(fragment.container.querySelector(".animated-svg")).not.toBeNull();
      expect(
        fragment.container.querySelector(".ax-popover.ax-tooltip"),
      ).not.toBeNull();
    });
    fragment.unmount();
  });

  it("should not render animation on false result", () => {
    const fn = jest.fn(() => false);
    const fragment = render(
      <Action message="Done message" onClick={fn}>
        Click Me
      </Action>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".animated-svg")).toBeNull();
    expect(
      fragment.container.querySelector(".ax-popover.ax-tooltip"),
    ).toBeNull();
    fragment.unmount();
  });

  it("should be disabled", () => {
    const fn = jest.fn();
    const fragment = render(
      <Action isDisabled onClick={fn}>
        Click Me
      </Action>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".animated-svg")).toBeNull();
    expect(
      fragment.container.querySelector(".ax-popover.ax-tooltip"),
    ).toBeNull();
    fragment.unmount();
  });
});
