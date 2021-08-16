// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { AxDateRange, AxDateTime, AxSuperDate } from "../../src";
import { AxDatePanel } from "../../src/panels/DatePanel";
import { DateProps } from "../../src/types";

const Template: Story<DateProps> = (props) => (
  <div>
    <AxDateTime.Panel {...props} />
    <AxDateRange.Input showHijriToggle />
    <AxSuperDate />
  </div>
);

export const DateStory = Template.bind({});
DateStory.args = {
  showHijriToggle: true
};

export default { title: "Example/Date", component: AxDatePanel };
