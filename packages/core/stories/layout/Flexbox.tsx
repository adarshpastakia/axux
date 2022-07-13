/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AxFlexBox } from "../../src";

const containerClass = "text-sm text-center";
const colClass = "bg-primary-500/10 p-2 shadow-sm";

export const FlexboxTemplate: ComponentStory<typeof AxFlexBox> = (props) => (
  <AxFlexBox {...props} className={containerClass}>
    <AxFlexBox.Row>
      <AxFlexBox.Col className={colClass}>Flex auto</AxFlexBox.Col>
      <AxFlexBox.Col className={colClass} width="12em">
        Flex fixed width
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="fill" className={colClass}>
        Flex fill
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="full" className={colClass}>
        Flex full
      </AxFlexBox.Col>
    </AxFlexBox.Row>
    <AxFlexBox.Row>
      <AxFlexBox.Col span={3} className={colClass}>
        3..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={3} className={colClass}>
        3..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={3} className={colClass}>
        3..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={3} className={colClass}>
        3..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={4} className={colClass}>
        4..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={4} className={colClass}>
        4..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={4} className={colClass}>
        4..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={6} className={colClass}>
        6..12
      </AxFlexBox.Col>
      <AxFlexBox.Col span={6} className="ring-1">
        <AxFlexBox.Row>
          <AxFlexBox.Col span={6} className={colClass}>
            6..12
          </AxFlexBox.Col>
          <AxFlexBox.Col span={6} className={colClass}>
            6..12
          </AxFlexBox.Col>
          <AxFlexBox.Col span={6} className={colClass}>
            6..12
          </AxFlexBox.Col>
          <AxFlexBox.Col span={6} className={colClass}>
            6..12
          </AxFlexBox.Col>
        </AxFlexBox.Row>
      </AxFlexBox.Col>
      <AxFlexBox.Col span={12} className={colClass}>
        12..12
      </AxFlexBox.Col>
    </AxFlexBox.Row>
    <AxFlexBox.Row>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
      <AxFlexBox.Col span="12 sm:6 md:4 lg:3 xl:2" className={colClass}>
        <span className="sm:hidden">12..12</span>
        <span className="hidden md:hidden sm:block">6..12</span>
        <span className="hidden lg:hidden md:block">4..12</span>
        <span className="hidden xl:hidden lg:block">3..12</span>
        <span className="hidden xl:block">2..12</span>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);
export const FlexboxStory = FlexboxTemplate.bind({});
FlexboxStory.args = {};

export const AlignmentStory: ComponentStory<AnyObject> = () => {
  return (
    <AxFlexBox className={containerClass}>
      <AxFlexBox.Row height="8em">
        <AxFlexBox.Col flex="fill" className={colClass} align="start">
          Start
        </AxFlexBox.Col>
        <AxFlexBox.Col flex="fill" className={colClass} align="middle">
          Middle
        </AxFlexBox.Col>
        <AxFlexBox.Col flex="fill" className={colClass} align="end">
          End
        </AxFlexBox.Col>
        <AxFlexBox.Col flex="fill" className={colClass} align="stretch">
          Strecth
        </AxFlexBox.Col>
      </AxFlexBox.Row>
    </AxFlexBox>
  );
};

export const JustifyStory: ComponentStory<AnyObject> = () => {
  return (
    <AxFlexBox className={containerClass}>
      <AxFlexBox.Row>
        <AxFlexBox.Col width="6em" className={colClass}>
          Start
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Start
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Start
        </AxFlexBox.Col>
      </AxFlexBox.Row>
      <AxFlexBox.Row justify="center">
        <AxFlexBox.Col width="6em" className={colClass}>
          Center
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Center
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Center
        </AxFlexBox.Col>
      </AxFlexBox.Row>
      <AxFlexBox.Row justify="end">
        <AxFlexBox.Col width="6em" className={colClass}>
          End
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          End
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          End
        </AxFlexBox.Col>
      </AxFlexBox.Row>
      <AxFlexBox.Row justify="spaced">
        <AxFlexBox.Col width="6em" className={colClass}>
          Spaced
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Spaced
        </AxFlexBox.Col>
        <AxFlexBox.Col width="6em" className={colClass}>
          Spaced
        </AxFlexBox.Col>
      </AxFlexBox.Row>
    </AxFlexBox>
  );
};

export default {
  title: "AxFlexBox",
  component: AxFlexBox,
  subcomponents: {
    "AxFlexBox.Row": AxFlexBox.Row,
    "AxFlexBox.Col": AxFlexBox.Col,
  },
} as ComponentMeta<typeof AxFlexBox>;
