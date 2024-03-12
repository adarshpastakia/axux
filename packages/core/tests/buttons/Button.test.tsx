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
import * as stories from "../../stories/buttons/Button.stories";

const { Basic } = composeStories(stories);

describe("Button", () => {
  it("should render", () => {
    const fn = jest.fn();
    const fragment = render(<Basic onClick={fn}>Click Me</Basic>);
    expect(
      fragment.container.querySelector(".ax-button__inner"),
    ).not.toBeNull();
    expect(fragment.container.querySelector(".ax-button__icon")).toBeNull();
    expect(
      fragment.container.querySelector(".ax-button__label")?.innerHTML,
    ).toBe("Click Me");
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fn).toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should render icon only", () => {
    const fragment = render(<Basic icon="mdi mdi-bell">{null}</Basic>);
    expect(fragment.container.querySelector(".ax-button__label")).toBeNull();
    expect(fragment.container.querySelector(".ax-button__icon")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should render icon and label", () => {
    const fragment = render(<Basic icon="mdi mdi-bell">Click Me</Basic>);
    expect(
      fragment.container.querySelector(".ax-button__label"),
    ).not.toBeNull();
    expect(fragment.container.querySelector(".ax-button__icon")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should be disabled", () => {
    const fn = jest.fn();
    const fragment = render(
      <Basic isDisabled onClick={fn}>
        Click Me
      </Basic>,
    );
    expect(
      fragment.container.querySelector('.ax-button[data-disabled="true"]'),
    ).not.toBeNull();
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fn).not.toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should show loading overlay", () => {
    const fn = jest.fn();
    const fragment = render(
      <Basic isLoading onClick={fn}>
        Click Me
      </Basic>,
    );
    expect(
      fragment.container.querySelector('.ax-button[data-loading="true"]'),
    ).not.toBeNull();
    expect(
      fragment.container.querySelector(".ax-button__loader"),
    ).not.toBeNull();
    fireEvent.click(
      fragment.container.querySelector(".ax-button__inner") as HTMLElement,
    );
    expect(fn).not.toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });
});
