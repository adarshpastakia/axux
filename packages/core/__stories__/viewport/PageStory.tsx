// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxContent, AxHeading, AxPage, AxSection, AxSpacer, AxText, AxViewport } from "../../src";
import { AsideProps } from "../../src/page/Aside";
import { PageProps } from "../../src/page/Page";

const Template: Story<PageProps> = (props) => (
  <AxViewport>
    <AxPage {...props} paper>
      <AxContent>
        <AxHeading level={2}>Page content</AxHeading>
        <AxSpacer />
        <AxText block>{LIPSUM.para}</AxText>
        <AxSpacer size="sm" />
        <AxText block>{LIPSUM.para}</AxText>
        <AxSpacer size="sm" />
        <AxText block>{LIPSUM.para}</AxText>
      </AxContent>
    </AxPage>
  </AxViewport>
);

export const PageStory = Template.bind({});
PageStory.args = {};

const SectionTemplate: Story<AsideProps> = (props) => (
  <AxViewport>
    <AxPage paper>
      <AxSection.Side {...props}>
        <AxContent>Side content</AxContent>
      </AxSection.Side>
      <AxContent>
        <AxHeading level={2}>Page content</AxHeading>
        <AxSpacer />
        <AxText block>{LIPSUM.para}</AxText>
        <AxSpacer size="sm" />
        <AxText block>{LIPSUM.para}</AxText>
        <AxSpacer size="sm" />
        <AxText block>{LIPSUM.para}</AxText>
      </AxContent>
    </AxPage>
  </AxViewport>
);

export const SectionStory = SectionTemplate.bind({});
SectionStory.args = {
  title: "Sidebar",
  flyout: true,
  isResizeable: true,
  isCollapsable: true,
  icon: "mdi mdi-heart-circle-outline"
};

export default { title: "Example/Page", component: AxPage };
