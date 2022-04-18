// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { Fragment, PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxBox, AxCallout, AxCollapsable, AxText } from "../../src";
import { CollapsableProps } from "../../src/panels/Collapsable";

const Template: Story<PropsWithChildren<CollapsableProps>> = (props) => (
  <Fragment>
    <AxCollapsable {...props} className="ax-border">
      <AxText>Collapsable Title</AxText>
      <AxBox padding="sm">{LIPSUM.para}</AxBox>
    </AxCollapsable>
    <AxCollapsable {...props} className="ax-border">
      <AxText>Collapsable Title</AxText>
      <AxBox padding="sm">{LIPSUM.para}</AxBox>
    </AxCollapsable>
  </Fragment>
);

export const CollapsableStory = Template.bind({});
CollapsableStory.args = {};

export default { title: "Example/Callout", component: AxCallout };
