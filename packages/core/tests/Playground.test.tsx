/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { composeStories } from "@storybook/testing-react";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import * as stories from "../stories/2.Playground.stories";

const { Playground } = composeStories(stories);

describe("Playground", () => {
  beforeAll(() => {
    render(<Playground />);
  });

  it("has viewport", () => {
    expect(document.querySelectorAll(".ax-viewport")).not.toBeNull();
  });
  it("has playground page", () => {
    expect(document.querySelector(".ax-page.playground")).not.toBeNull();
  });
  it("has page sample", () => {
    // page
    expect(
      document.querySelector(".ax-page.playground .ax-page"),
    ).not.toBeNull();
    expect(
      document.querySelector(".ax-page.playground .ax-page .ax-page__title"),
    ).not.toBeNull();
  });
  it("has page elements", () => {
    expect(
      document.querySelector(".ax-page.playground .ax-page .ax-header"),
    ).not.toBeNull();
    expect(
      document.querySelector(".ax-page.playground .ax-page .ax-footer"),
    ).not.toBeNull();
    expect(
      document.querySelector(".ax-page.playground .ax-page .ax-content"),
    ).not.toBeNull();
    expect(
      document.querySelector(
        '.ax-page.playground .ax-page .ax-side[data-align="start"]',
      ),
    ).not.toBeNull();
    expect(
      document.querySelector(
        '.ax-page.playground .ax-page .ax-side[data-align="end"]',
      ),
    ).not.toBeNull();
  });
  it("has tab panel", () => {
    expect(
      document.querySelector(".ax-page.playground .ax-tab__panel"),
    ).not.toBeNull();
    expect(
      document.querySelector(".ax-page.playground .ax-tab__panel .ax-tab__bar"),
    ).not.toBeNull();
    expect(
      document.querySelector(
        ".ax-page.playground .ax-tab__panel .ax-tab__body",
      ),
    ).not.toBeNull();
  });
  it("has panels", () => {
    expect(
      document.querySelectorAll(".ax-page.playground .ax-panel"),
    ).toHaveLength(6);
  });
  it("has callouts", () => {
    expect(
      document.querySelectorAll(".ax-page.playground .ax-callout"),
    ).toHaveLength(8);
  });
  it("has meter", () => {
    expect(
      document.querySelectorAll(".ax-page.playground .ax-meter"),
    ).toHaveLength(3);
  });
  it("has cards", () => {
    expect(
      document.querySelectorAll(".ax-page.playground .ax-card"),
    ).toHaveLength(3);
  });
  it("has progress", () => {
    expect(
      document.querySelector(".ax-page.playground .progress-circle"),
    ).not.toBeNull();
    expect(
      document.querySelector(".ax-page.playground .progress-bar"),
    ).not.toBeNull();
  });

  afterAll(() => {
    cleanup();
  });
});
