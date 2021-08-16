// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { AxLink } from "../../src";
import { LinkProps } from "../../src/typography/Link";

const Template: Story<PropsWithChildren<LinkProps>> = (props) => (
  <BrowserRouter>
    <AxLink {...props} />
  </BrowserRouter>
);

export const LinkStory = Template.bind({});
LinkStory.args = {
  children: "Simple link",
  href: "#/test"
};

export default { title: "Example/Link", component: AxLink };
