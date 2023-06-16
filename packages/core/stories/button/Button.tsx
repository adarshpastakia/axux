/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import {
  AxApplicationProvider,
  AxButton,
  AxContent,
  AxFlexBox,
  AxHeader,
  AxPanel,
  AxTitle,
} from "../../src";
import { HotKeyWrapper } from "../../src/hotkeys/HotKeyWrapper";
import { AxMenu } from "../../src/menu/Menu";

export const ButtonTemplate: ComponentStory<typeof AxButton> = (props) => (
  <AxButton {...props} />
);

export const ButtonStory = ButtonTemplate.bind({});
ButtonStory.args = {
  children: "Click Me!",
};

export const OnlyIconStory = ButtonTemplate.bind({});
OnlyIconStory.args = {
  icon: "mdi mdi-check-circle",
};
export const WithIconStory = ButtonTemplate.bind({});
WithIconStory.args = {
  icon: "mdi mdi-check-circle",
  children: "Click Me!",
};

export const ButtonSizes: ComponentStory<AnyObject> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row align="center">
      <AxFlexBox.Col>
        <AxButton {...props} size="sm">
          Small Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} size={undefined}>
          Normal Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} size="md">
          Medium Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} size="lg">
          Large Button!
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonStyles: ComponentStory<AnyObject> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row align="center">
      <AxFlexBox.Col>
        <AxButton {...props} variant={undefined}>
          Normal Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} isRound>
          Rounded Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} variant="outline">
          Outline Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} variant="solid">
          Solid Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} variant="link">
          Link Button!
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonStates: ComponentStory<AnyObject> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row align="center">
      <AxFlexBox.Col>
        <AxButton {...props} isDisabled>
          Disabled State!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} isLoading>
          Busy State!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} isLoading useSpinner>
          Busy State!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} isActive>
          Active State!
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonColors: ComponentStory<AnyObject> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row align="center">
      <AxFlexBox.Col>
        <AxButton {...props} color="primary">
          Normal Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} color="accent">
          Accent Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} color="danger">
          Danger Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} color="success">
          Success Button!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton {...props} color="warning">
          Warning Button!
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonTooltip: ComponentStory<AnyObject> = (props) => (
  <AxApplicationProvider>
    <AxFlexBox>
      <AxFlexBox.Row>
        <AxFlexBox.Col>
          <AxButton {...props} color={undefined} tooltip="Normal tooltip">
            Normal Tooltip!
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton
            {...props}
            color="primary"
            tooltip={{
              content: "Information tooltip",
              color: "info",
              placement: "top",
            }}
          >
            Info Tooltip!
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton
            {...props}
            color="danger"
            tooltip={{
              content: "Danger tooltip",
              color: "danger",
              placement: "right",
            }}
          >
            Danger Tooltip!
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton.Group>
            <AxButton tooltip="First">First</AxButton>
            <AxButton tooltip="Second">Second</AxButton>
            <AxButton tooltip="Third">Third</AxButton>
          </AxButton.Group>
        </AxFlexBox.Col>
      </AxFlexBox.Row>
    </AxFlexBox>
  </AxApplicationProvider>
);

export const ButtonBadges: ComponentStory<AnyObject> = (props) => (
  <HotKeyWrapper>
    <AxFlexBox>
      <AxFlexBox.Row>
        <AxFlexBox.Col>
          <AxButton {...props} badge={9}>
            Value Badge!
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton {...props} badge={{ ping: true, color: "success" }}>
            Pinging Badge!
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton
            {...props}
            badge={{
              value: "new",
              color: "primary",
              placement: "top",
            }}
          >
            Color Badge
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton
            {...props}
            badge={{
              ping: true,
              icon: "mdi mdi-bell",
              color: "danger",
              placement: "top-end",
            }}
          >
            Pinging Badge w/ Icon
          </AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col>
          <AxButton {...props} hotKey="shift+?">
            Hot key
          </AxButton>
        </AxFlexBox.Col>
      </AxFlexBox.Row>
    </AxFlexBox>
  </HotKeyWrapper>
);

export const ButtonActions: ComponentStory<AnyObject> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      <AxFlexBox.Col>
        <AxButton.Action
          {...props}
          color="success"
          actionType="success"
          message="Action done!!!"
        >
          Success Action
        </AxButton.Action>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton.Action
          {...props}
          color="danger"
          actionType="danger"
          message="Action done!!!"
        >
          Danger Action
        </AxButton.Action>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton.Confirm
          {...props}
          tooltip={{ content: "Test confirmation", placement: "top" }}
          actionType="danger"
          message="Do you confirm?"
        >
          Confirm Action
        </AxButton.Confirm>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton.Dropdown
          {...props}
          label="Click Me"
          tooltip="Test me"
          onClick={action("menuClick")}
        >
          <AxMenu.Item id="menu1" label="Action 1" icon="mdi mdi-bell" />
          <AxMenu.Item id="menu2" label="Action 2" badge="new" />
          <AxMenu.Group label="Grouped" type="collapsable">
            <AxMenu.Item id="menu3" label="Action 3" />
            <AxMenu.Item id="menu4" label="Action 4" />
            <AxMenu.Item id="menu5" label="Action 5" />
          </AxMenu.Group>
        </AxButton.Dropdown>
      </AxFlexBox.Col>
      <AxFlexBox.Col>
        <AxButton.Dropdown
          {...props}
          label="Click Me"
          onClick={action("menuClick")}
        >
          <AxPanel.Stack>
            <AxPanel panelId="one">
              <AxContent padding="none">
                <AxMenu.Item id="menu1" label="Action 1" icon="mdi mdi-bell" />
                <AxMenu.Item id="menu2" label="Action 2" badge="new" />
                <AxMenu.Item
                  data-panel="two"
                  label="Action Next"
                  hotKey="shift+K"
                />
                <AxMenu.Group label="Grouped" type="floating">
                  <AxMenu.Item id="menu3" label="Action 3" />
                  <AxMenu.Item id="menu4" label="Action 4" />
                  <AxMenu.Item id="menu5" label="Action 5" />
                </AxMenu.Group>
              </AxContent>
            </AxPanel>
            <AxPanel panelId="two">
              <AxHeader>
                <AxTitle>Menu Next</AxTitle>
              </AxHeader>
              <AxContent padding="none">
                <AxMenu.Item id="next1" label="Action 1" icon="mdi mdi-bell" />
                <AxMenu.Item id="next2" label="Action 2" badge="new" />
                <AxMenu.Item id="next3" label="Action 3" hotKey="shift+K" />
              </AxContent>
            </AxPanel>
          </AxPanel.Stack>
        </AxButton.Dropdown>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const GroupStory: ComponentStory<AnyObject> = (props) => (
  <AxButton.Group>
    <AxButton {...props} icon="mdi mdi-plus-circle" />
    <AxButton {...props}>Open</AxButton>
    <AxButton {...props}>Again Paste</AxButton>
    <AxButton {...props} color="danger">
      Delete
    </AxButton>
  </AxButton.Group>
);

export const ButtonSamples: ComponentStory<AnyObject> = (props) => {
  return (
    <AxFlexBox>
      <AxFlexBox.Row>
        <AxFlexBox.Col width={200}>
          <AxButton {...props}>This button has a very long label</AxButton>
        </AxFlexBox.Col>
        <AxFlexBox.Col width={600}>
          <AxButton {...props} fullWidth icon="mdi mdi-bell">
            Full width button
          </AxButton>
        </AxFlexBox.Col>
      </AxFlexBox.Row>
    </AxFlexBox>
  );
};

export default { title: "AxButton", component: AxButton };
