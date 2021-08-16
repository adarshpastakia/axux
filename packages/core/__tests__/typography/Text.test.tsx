// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import * as stories from "../../__stories__/typography/TextStory";

const { TextStory, SerifStory, ColorStory } = composeStories(stories);

describe("Text", () => {
  it("renders simple text", (done) => {
    const fragment = render(<TextStory />);
    expect(fragment.container.querySelector(".ax-text")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders serif text", (done) => {
    const fragment = render(<SerifStory />);
    expect(fragment.container.querySelector(".ax-font--serif")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders color text", (done) => {
    const fragment = render(<ColorStory />);
    expect(fragment.container.querySelector(".ax-bg--lightest")).toBeInTheDocument();
    expect(fragment.container.querySelector(".ax-color--secondary")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders weighted text", (done) => {
    const fragment = render(<TextStory weight="bold" />);
    expect(fragment.container.querySelector(".ax-weight--bold")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders sized text", (done) => {
    const fragment = render(
      <div>
        <TextStory size="md" />
        <TextStory size="10px" />
        <TextStory size={3} />
      </div>
    );
    expect(fragment.container.querySelector(".ax-font--md")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders block text", (done) => {
    const fragment = render(<TextStory block />);
    expect(fragment.container.querySelector(".ax-block")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders clipped text", (done) => {
    const fragment = render(<TextStory clip={2} />);
    expect(fragment.container.querySelector(".ax-text")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders marked text", (done) => {
    const fragment = render(<TextStory mark={LIPSUM.text} />);
    expect(fragment.container.querySelector("mark")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders marked text when not found", (done) => {
    let fragment = render(<TextStory mark="Test me" />);
    expect(fragment.container.querySelector("mark")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();

    fragment = render(
      <TextStory mark={LIPSUM.text}>
        <b>{LIPSUM.line}</b>
      </TextStory>
    );
    expect(fragment.container.querySelector("mark")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with tooltip", async () => {
    const fragment = render(<TextStory tooltip={{ content: "Test tooltip" }} />);

    const el = fragment.container.querySelector("abbr") as HTMLElement;
    act(() => {
      fireEvent.mouseOver(el);
    });
    await waitFor(() => fragment.container.querySelector(".ax-tooltip"));
    expect(fragment.container).toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    act(() => {
      fireEvent.mouseOut(el);
    });
    expect(fragment.container).not.toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
  });
});
