// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren, useCallback } from "react";
import { AxBox, AxContextMenu, AxMenu, AxText, useAxContextMenu } from "../../src";
import { FlexBoxProps } from "../../src/layout/FlexBox";

const innerItems = [
  <AxMenu key="menu1">
    <AxMenu.Item label="Option Inner" />
  </AxMenu>
];

const Template: Story<PropsWithChildren<FlexBoxProps>> = (props) => {
  const { showContextMenu } = useAxContextMenu();
  const onContext = useCallback((e) => {
    showContextMenu({
      x: e.clientX,
      y: e.clientY,
      menu: [
        <AxMenu key="menu1">
          <AxMenu.Item label="Option Outer" />
        </AxMenu>
      ]
    });
    e.preventDefault();
    return false;
  }, []);

  return (
    <div className="ax-root">
      <AxBox className="ax-border ax-border--dashed" onContextMenu={onContext} {...props}>
        <AxContextMenu menu={innerItems}>
          <AxBox
            className="ax-border ax-border--dashed ax-bg--lightest"
            margin="md@md sm@sm lg@lg"
            padding="md@md sm@sm lg@lg"
          >
            <AxText bg="base" block>
              Box wrappers with margin and padding
            </AxText>
          </AxBox>
        </AxContextMenu>
      </AxBox>
    </div>
  );
};

export const BoxStory = Template.bind({});
BoxStory.args = {};

export default { title: "Example/Box", component: AxBox };
