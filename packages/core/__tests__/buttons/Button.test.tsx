// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as stories from "../../__stories__/buttons/ButtonStory";

const { ButtonStory, WithIconStory, OnlyIconStory, WithTooltipStory } = composeStories(stories);

describe("Button", () => {
  it("renders basic button", (done) => {
    const fragment = render(<ButtonStory />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector(".ax-button__icon")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with icon", (done) => {
    const fragment = render(<WithIconStory />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector(".ax-button__icon")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders only icon", (done) => {
    const fragment = render(<OnlyIconStory />);
    expect(fragment.container).not.toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector(".ax-button__icon")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders color", (done) => {
    const fragment = render(<ButtonStory color="secondary" />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-theme='secondary']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    done();
  });

  it("renders style", (done) => {
    const fragment = render(<ButtonStory type="outline" />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-style='outline']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders size", (done) => {
    const fragment = render(<ButtonStory size="md" />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-size='md']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders block", (done) => {
    const fragment = render(<ButtonStory block />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-block='true']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders icon align", (done) => {
    const fragment = render(<WithIconStory iconAlign="end" />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-icon-align='end']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders icon hilight", (done) => {
    const fragment = render(<WithIconStory iconHilight />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-icon-hilight='true']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders link", (done) => {
    const fragment = render(<WithIconStory href="/test" />, {
      wrapper: BrowserRouter
    });
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[href='/test']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders new tab link", (done) => {
    const fragment = render(<WithIconStory href="/test" target="_blank" />, {
      wrapper: BrowserRouter
    });
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[target='_blank']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with spinner", (done) => {
    const fragment = render(<WithIconStory isLoading />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector(".ax-button__spinner")).toBeInTheDocument();
    expect(fragment.container.querySelector("[data-busy='true']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    done();
  });

  it("renders disabled", (done) => {
    const fragment = render(<WithIconStory isDisabled />);
    expect(fragment.container).toHaveTextContent("Click Me!");
    expect(fragment.container.querySelector("[data-disabled='true']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with tooltip", async () => {
    const fragment = render(<WithTooltipStory />);
    expect(fragment.container).toHaveTextContent("Tooltip!");

    const button = fragment.container.querySelector(".ax-button__inner") as HTMLElement;
    act(() => {
      fireEvent.mouseOver(button);
    });
    await waitFor(() => fragment.container.querySelector(".ax-tooltip"));
    expect(fragment.container).toHaveTextContent("This is a clickable button");
    expect(fragment.container).toMatchSnapshot();
    act(() => {
      fireEvent.mouseOut(button);
    });
    expect(fragment.container).not.toHaveTextContent("This is a clickable button");
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
  });

  it("should trigger click event", (done) => {
    const handler = jest.fn();
    const fragment = render(<ButtonStory onClick={handler}>Click</ButtonStory>);
    fireEvent.click(fragment.getByText("Click"));
    expect(handler).toBeCalled();
    fragment.unmount();
    done();
  });
});
