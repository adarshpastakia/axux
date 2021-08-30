// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  mdiAccount,
  mdiBell,
  mdiCog,
  mdiFolderOpen,
  mdiLifebuoy,
  mdiMagnify,
  mdiPlus
} from "@mdi/js";
import { Story } from "@storybook/react";
import { useEffect } from "react";
import {
  AxAvatar,
  AxButton,
  AxContent,
  AxDivider,
  AxHeading,
  AxHotKeyLabel,
  AxLocalePicker,
  AxMenu,
  AxPage,
  AxPopover,
  AxSpotlight,
  AxText,
  AxThemeToggle,
  AxViewport,
  useAxBreadcrumbService,
  useAxGlobals
} from "../../src";
import { ViewportProps } from "../../src/viewport/Viewport";

const Spotlight = () => {
  return (
    <AxSpotlight
      onQuery={() => Promise.resolve([])}
      defaultItems={[
        {
          id: "summary",
          label: "Summary",
          info: "Basic summary"
        },
        {
          id: "fin",
          group: "Dashboards",
          label: "Financial Dashboard"
        },
        {
          id: "ord",
          group: "Dashboards",
          label: "Orders Dashboard"
        }
      ]}
    />
  );
};

const Header = () => {
  const { openSpotlight } = useAxGlobals();
  return (
    <AxViewport.Header icon="poster.png">
      <AxButton badge={{ color: "danger", value: 9 }} color="primary" icon={mdiBell} />
      <AxButton
        color="primary"
        icon={mdiMagnify}
        tooltip={{
          content: (
            <span>
              Spotlight search... <AxHotKeyLabel keyCombo="ctrl+space" />
            </span>
          )
        }}
        onClick={openSpotlight}
      />
      <AxPopover showArrow placement="bottom-end" closeOnClick>
        <AxAvatar image="https://picsum.photos/id/515/200" title="User Name" bg="indigo" />
        <AxMenu size="md">
          <AxMenu.Item
            label="Profile"
            icon={mdiAccount}
            appendLabel={<AxHotKeyLabel keyCombo="ctrl+shift+p" />}
          />
          <AxDivider />
          <AxThemeToggle isMenu />
          <AxLocalePicker isMenu />
          <AxDivider />
          <AxMenu.Item label="Logout" />
        </AxMenu>
      </AxPopover>
    </AxViewport.Header>
  );
};

const Menu = () => {
  return (
    <AxViewport.Menu
      options={[
        <AxMenu.Item key="settings" icon={mdiCog} label="Settings">
          <AxMenu.Item label="Keyboard..." />
          <AxMenu.Item label="Preferences..." appendLabel={<AxHotKeyLabel keyCombo="ctrl+," />} />
        </AxMenu.Item>,
        <AxMenu.Item key="help" color="info" icon={mdiLifebuoy} label="Help..." />
      ]}
    >
      <AxMenu.Item label="Summary" info="Basic summary" />
      <AxMenu.Item label="Dashboards" isCollapsable defaultCollapsed={false}>
        <AxMenu.Item label="Finance" />
        <AxMenu.Item label="Payroll" />
        <AxMenu.Item label="Orders" />
        <AxMenu.Item label="Production" />
      </AxMenu.Item>
      <AxMenu.Divider />
      <AxMenu.Item label="Form..." />
      <AxMenu.Item label="Table..." />
    </AxViewport.Menu>
  );
};

const Page = () => {
  const { addItem } = useAxBreadcrumbService();
  useEffect(() => {
    addItem({ icon: "mdi mdi-home", to: "#/1" });
    addItem({ label: "Page", to: "#/2" });
    addItem({ label: "Section", to: "#/3" });
    addItem({ label: "Here", to: "#/4" });
    addItem({ label: "Here", to: "#/5" });
    addItem({ label: "Here", to: "#/6" });
    addItem({ label: "Here", to: "#/7" });
    addItem({ label: "Here", to: "#/8" });
    addItem({ label: "Here", to: "#/9" });
    addItem({ label: "Here", to: "#/10" });
  }, [addItem]);
  return (
    <AxPage
      title="Page"
      actions={[
        <AxButton.Dropdown key="Options" icon={mdiPlus} hideCaret>
          <AxMenu>
            <AxMenu.Item label="New..." panelId="new" />
            <AxMenu.Item label="Save" />
            <AxMenu.Item label="Close" />
          </AxMenu>
          <AxMenu panelId="new" title="New...">
            <AxMenu.Item label="Order..." />
            <AxMenu.Item label="Invoice..." />
            <AxMenu.Item label="Payroll..." />
          </AxMenu>
        </AxButton.Dropdown>,
        <AxButton key="open" icon={mdiFolderOpen} />
      ]}
    >
      <AxContent>
        <AxHeading>Application viewport</AxHeading>
        <AxText>Basic page with content</AxText>
      </AxContent>
    </AxPage>
  );
};

const Template: Story<ViewportProps> = (props) => (
  <AxViewport {...props}>
    <AxViewport.Banner color="secondary">Test Banner</AxViewport.Banner>
    <AxViewport.Footer>© 2021</AxViewport.Footer>
    <Spotlight />
    <Header />
    <Menu />
    <Page />
  </AxViewport>
);

export const ViewportStory = Template.bind({});
ViewportStory.args = {};

export default { title: "Example/Viewport", component: AxViewport };
