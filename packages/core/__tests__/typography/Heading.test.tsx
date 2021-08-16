// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import * as stories from "../../__stories__/typography/HeadingStory";

const { HeadingStory, DisplayStory, ColorStory, SerifStory } = composeStories(stories);

describe("Heading", () => {
  it("renders simple heading", (done) => {
    const fragment = render(<HeadingStory />);
    expect(fragment.container.querySelector(".ax-heading--1")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders display heading", (done) => {
    const fragment = render(<DisplayStory />);
    expect(fragment.container.querySelector(".ax-display--1")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders serif font heading", (done) => {
    const fragment = render(<SerifStory />);
    expect(fragment.container.querySelector(".ax-font--serif")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders color heading", (done) => {
    const fragment = render(<ColorStory />);
    expect(fragment.container.querySelector(".ax-bg--lightest")).toBeInTheDocument();
    expect(fragment.container.querySelector(".ax-color--secondary")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });
});
