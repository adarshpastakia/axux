// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxProfileCard } from "../../src";
import { ProfileCardProps } from "../../src/profile/ProfileCard";

const Template: Story<PropsWithChildren<ProfileCardProps>> = (props) => (
  <AxProfileCard {...props}>{LIPSUM.line}</AxProfileCard>
);

export const ProfileStory = Template.bind({});
ProfileStory.args = {
  name: "Username goes here",
  avatarImage: "https://picsum.photos/id/515/200"
};

export default { title: "Example/Profile", component: AxProfileCard };
