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
import * as stories from "../../stories/tag/Tag.stories";

const { Example } = composeStories(stories);

describe("Tag", () => {
  it("should render", () => {
    const fragment = render(<Example>Simple Tag</Example>);
    expect(fragment.container.querySelector(".ax-tag")).not.toBeNull();
    expect(fragment.container.querySelector(".ax-tag > .ax-icon")).toBeNull();
    expect(fragment.container.querySelector(".ax-tag > label")?.innerHTML).toBe(
      "Simple Tag",
    );
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should render with icon", () => {
    const fragment = render(<Example icon="mdi mdi-bell" />);
    expect(
      fragment.container.querySelector(".ax-tag > .ax-icon"),
    ).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should render icon and label", () => {
    const fragment = render(<Example icon="mdi mdi-bell">Click Me</Example>);
    expect(
      fragment.container.querySelector(".ax-tag > .ax-icon"),
    ).not.toBeNull();
    expect(fragment.container.querySelector(".ax-tag > label")).not.toBeNull();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should be clickable", () => {
    const fn = jest.fn();
    const fragment = render(<Example onClick={fn}>Click Me</Example>);
    fireEvent.click(fragment.container.querySelector(".ax-tag") as HTMLElement);
    expect(fn).toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should be closable", () => {
    const fn = jest.fn();
    const fragment = render(<Example onRemove={fn}>Click Me</Example>);
    expect(
      fragment.container.querySelector(".ax-tag > .close-x"),
    ).not.toBeNull();
    fireEvent.click(
      fragment.container.querySelector(".ax-tag > .close-x") as HTMLElement,
    );
    expect(fn).toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });

  it("should be disabled", () => {
    const fn = jest.fn();
    const fragment = render(
      <Example isDisabled onClick={fn}>
        Click Me
      </Example>,
    );
    expect(
      fragment.container.querySelector('.ax-tag[data-disabled="true"]'),
    ).not.toBeNull();
    fireEvent.click(fragment.container.querySelector(".ax-tag") as HTMLElement);
    expect(fn).not.toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
    fragment.unmount();
  });
});
