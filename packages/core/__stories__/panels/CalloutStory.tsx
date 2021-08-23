// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxCallout } from "../../src";
import { CalloutProps } from "../../src/panels/Callout";

const Template: Story<PropsWithChildren<CalloutProps>> = (props) => (
  <AxCallout {...props}>{LIPSUM.line}</AxCallout>
);

export const CalloutStory = Template.bind({});
CalloutStory.args = {
  title: "Callout Message",
  isClosable: true,
  icon: "mdi mdi-bell"
};

export default { title: "Example/Callout", component: AxCallout };
