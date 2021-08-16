// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import * as stories from "../../__stories__/typography/LinkStory";

const { LinkStory } = composeStories(stories);

describe("Links", () => {
  it("should render link", (done) => {
    const fragment = render(<LinkStory />);
    expect(fragment.container).toHaveTextContent("Simple link");
    expect(fragment.container.querySelector(".ax-link")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("should render new tab link", (done) => {
    const fragment = render(<LinkStory target="_blank" />);
    expect(fragment.container).toHaveTextContent("Simple link");
    expect(fragment.container.querySelector("[target='_blank']")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("should handle onClick", (done) => {
    const handler = jest.fn();
    const fragment = render(<LinkStory className="test" onClick={handler} />);
    fireEvent.click(fragment.getByText("Simple link"));
    expect(handler).toBeCalled();
    fragment.unmount();
    done();
  });
});
