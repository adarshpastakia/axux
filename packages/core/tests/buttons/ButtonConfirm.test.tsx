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
import * as stories from "../../stories/buttons/ButtonConfirm.stories";

const { Confirm } = composeStories(stories);

describe("Confirm Button", () => {
  it("should render", () => {
    const fn = jest.fn();
    const fragment = render(<Confirm onClick={fn}>Click Me</Confirm>);
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
      <Confirm isDisabled onClick={fn}>
        Click Me
      </Confirm>,
    );
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).toBeNull();
    fragment.unmount();
  });

  it("should receive true on ok click", () => {
    const fn = jest.fn();
    const fragment = render(<Confirm onClick={fn}>Click Me</Confirm>);
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).not.toBeNull();
    fireEvent.mouseUp(fragment.getByText("OK").parentElement as HTMLElement);
    fireEvent.click(fragment.getByText("OK").parentElement as HTMLElement);
    expect(fragment.container.querySelector(".ax-popover")).toBeNull();
    expect(fn).toHaveBeenCalledWith(true);
    fragment.unmount();
  });

  it("should receive false on cancel click", () => {
    const fn = jest.fn();
    const fragment = render(<Confirm onClick={fn}>Click Me</Confirm>);
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fragment.container.querySelector(".ax-popover")).not.toBeNull();
    fireEvent.mouseUp(
      fragment.getByText("Cancel").parentElement as HTMLElement,
    );
    fireEvent.click(fragment.getByText("Cancel").parentElement as HTMLElement);
    expect(fragment.container.querySelector(".ax-popover")).toBeNull();
    expect(fn).toHaveBeenCalledWith(false);
    fragment.unmount();
  });
});
