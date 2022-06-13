// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxBox, AxText } from "../../src";
import { BoxProps } from "../../src/layout/Box";

const Template: Story<PropsWithChildren<BoxProps>> = (props) => {
  return (
    <div className="ax-root">
      <AxBox className="ax-border ax-border--dashed">
        <AxBox {...props}>
          <AxText block>
            Box wrappers with margin and padding
          </AxText>
        </AxBox>
      </AxBox>
    </div>
  );
};

export const BoxStory = Template.bind({});
BoxStory.args = {
  className: "ax-border ax-border--dashed",
  margin: "md@md sm@sm lg@lg",
  padding: "md@md sm@sm lg@lg",
  bg: "lightest"
};

export default { title: "Example/Box", component: AxBox };
