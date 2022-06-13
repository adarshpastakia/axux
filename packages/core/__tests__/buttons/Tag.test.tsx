// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import * as stories from "../../__stories__/buttons/TagStory";

const { TagStory, WithIconStory, WithTooltipStory } = composeStories(stories);

describe("Tag", () => {
  it("renders basic tag", (done) => {
    const fragment = render(<TagStory />);
    expect(fragment.container).toHaveTextContent("Tag");
    expect(fragment.container.querySelector(".ax-icon")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with icon", (done) => {
    const fragment = render(<WithIconStory />);
    expect(fragment.container).toHaveTextContent("Icon");
    expect(fragment.container.querySelector(".ax-tag__inner > .ax-icon")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders color", (done) => {
    const fragment = render(<TagStory color="secondary" />);
    expect(fragment.container).toHaveTextContent("Tag");
    expect(fragment.container.querySelector(".ax-color--secondary")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    done();
  });

  it("renders style", (done) => {
    const fragment = render(<TagStory fillColor />);
    expect(fragment.container).toHaveTextContent("Tag");
    expect(fragment.container.querySelector("[data-solid='true']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with tooltip", async () => {
    const fragment = render(<WithTooltipStory />);
    expect(fragment.container).toHaveTextContent("Tooltip");

    const button = fragment.container.querySelector(".ax-tag__inner") as HTMLElement;
    act(() => {
      fireEvent.mouseOver(button);
    });
    await waitFor(() => fragment.container.querySelector(".ax-tooltip"));
    expect(fragment.container).toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    act(() => {
      fireEvent.mouseOut(button);
    });
    expect(fragment.container).not.toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
  });

  it("should trigger click event", (done) => {
    const handler = jest.fn();
    const fragment = render(<TagStory onClick={handler}>Click</TagStory>);
    fireEvent.click(fragment.getByText("Click"));
    expect(handler).toBeCalled();
    fragment.unmount();
    done();
  });

  it("should trigger remove event", (done) => {
    const handler = jest.fn();
    const fragment = render(<TagStory onRemove={handler}>Click</TagStory>);
    fireEvent.click(fragment.getByRole("remove"));
    expect(handler).toBeCalled();
    fragment.unmount();
    done();
  });
});
