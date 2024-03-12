/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  AxContent,
  AxErrorBoundary,
  AxHeader,
  AxPage,
  AxViewport,
} from "../../src";

const meta: Meta<typeof AxErrorBoundary> = {
  component: AxErrorBoundary,
  title: "@core/Application/Error Boundary",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxErrorBoundary>;

export const Example: Story = {
  render: (args) => (
    <div className="viewport-wrapper">
      <AxPage>
        <AxHeader className="text-primary justify-center">Title</AxHeader>
        <AxContent>
          <AxErrorBoundary
            {...args}
            errorElement={({ error }) => (
              <div>
                <p>Application error [{error}]</p>
                <a className="link">Navigate to previous state</a>
              </div>
            )}
          >
            {/** @ts-expect-error ignore */}
            <div ref={(el) => badcall()}>Bad state</div>
          </AxErrorBoundary>
        </AxContent>
      </AxPage>
    </div>
  ),
  args: {},
};
