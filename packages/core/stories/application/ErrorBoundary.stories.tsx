import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { AxErrorBoundary, AxViewport } from "../../src";

const meta: Meta<typeof AxErrorBoundary> = {
  title: "@core/Application/Error Boundary",
  component: AxErrorBoundary,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;

const BrokenComponent = () => {
  useEffect(() => {
    throw Error("Unknown error");
  }, []);
  return null;
};

export const ErrorBoundary: StoryObj<typeof AxErrorBoundary> = {
  render: ({ children, ...args }) => {
    return (
      <div className="min-h-[32rem] relative">
        <AxViewport>
          <AxErrorBoundary {...args}>
            <BrokenComponent />
          </AxErrorBoundary>
        </AxViewport>
      </div>
    );
  },
  args: {},
};
