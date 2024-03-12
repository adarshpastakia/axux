/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import * as stories from "../../stories/buttons/ButtonDropdown.stories";
import { AxMenu } from "../../src";

const { Dropdown } = composeStories(stories);

describe("Dropdown Button", () => {
  it("should render", () => {
    const fn = jest.fn();
    const fragment = render(
      <Dropdown onClick={fn}>
        <AxMenu.Item id="menu-test" label="Test menu" />
      </Dropdown>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should be disabled", () => {
    const fn = jest.fn();
    const fragment = render(
      <Dropdown isDisabled onClick={fn}>
        <AxMenu.Item id="menu-test" label="Test menu" />
      </Dropdown>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).toBeNull();
    fragment.unmount();
  });

  it("should recieve menu id on click", () => {
    const fn = jest.fn();
    const fragment = render(
      <Dropdown onClick={fn}>
        <AxMenu.Item id="menu-test" label="Test menu" />
      </Dropdown>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).not.toBeNull();
    fireEvent.mouseUp(
      fragment.getByText("Test menu").parentElement as HTMLElement,
    );
    fireEvent.click(
      fragment.getByText("Test menu").parentElement as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).toBeNull();
    expect(fn).toHaveBeenCalledWith("menu-test");
    fragment.unmount();
  });
});
