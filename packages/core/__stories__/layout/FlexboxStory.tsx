// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxBox } from "../../dist/layout/Box";
import { FlexBoxProps } from "../../dist/layout/FlexBox";
import { AxFlexBox } from "../../src";

const Template: Story<PropsWithChildren<FlexBoxProps>> = (props) => (
  <AxBox paddingY="md">
    <AxFlexBox {...props}>
      <AxFlexBox.Row height={3}>
        <AxFlexBox.Col span={3} className="ax-bg--light" />
        <AxFlexBox.Col span={6} className="ax-bg--light" />
        <AxFlexBox.Col span={3} className="ax-bg--light" />
      </AxFlexBox.Row>
      <AxFlexBox.Row height={5}>
        <AxFlexBox.Col span={4} className="ax-bg--light" />
        <AxFlexBox.Col span={4} className="ax-bg--light" />
        <AxFlexBox.Col span={4} className="ax-bg--light" />
      </AxFlexBox.Row>
      <AxFlexBox.Row>
        {new Array(12).fill(null).map((_, i) => (
          <AxFlexBox.Col
            key={i}
            height={5}
            span="12@xs 6@sm 4@md 3@lg 2@xl 1@xxl"
            padding="sm@xs @md md@xl"
            stretchContent
            className="ax-bg--light"
          >
            <AxBox className="ax-bg--base" />
          </AxFlexBox.Col>
        ))}
      </AxFlexBox.Row>
    </AxFlexBox>
  </AxBox>
);

export const FlexboxStory = Template.bind({});
FlexboxStory.args = {};

export default { title: "Example/Flexbox", component: AxFlexBox };
