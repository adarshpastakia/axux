/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { Fragment } from "react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  AxApplicationProvider,
  AxAside,
  AxBreadcrumb,
  AxButton,
  AxCollapsable,
  AxContent,
  AxDivider,
  AxFlexBox,
  AxFlyout,
  AxFooter,
  AxHeader,
  AxMenu,
  AxMeter,
  AxPage,
  AxText,
  AxTitle,
  AxViewport,
  useOverlayService,
} from "../../src";
import { LIPSUM } from "../overlays/Overlay";

const toolAction = [
  <AxButton
    key="action"
    color="invert"
    variant="link"
    icon="mdi mdi-backspace"
  />,
];

const Menu = () => {
  return (
    <Fragment>
      <AxMenu onClick={action("sideMenu")}>
        <AxMenu.Mini nav={{ to: "/" }} label="Home" icon="mdi mdi-home" />
        <AxMenu.Mini
          nav={{ to: "/404" }}
          label="Empty"
          icon="mdi mdi-minus-circle-outline"
        />
        <AxMenu.Mini
          nav={{ to: "/next" }}
          label="Next"
          icon="mdi mdi-arrow-right-bold-outline"
        />
        <AxMenu.Mini
          id="side1"
          className="text-accent"
          label="Action 1"
          icon="mdi mdi-bell"
        />
        <AxMenu.Mini id="side2" label="Action 2" badge={{ ping: true }} />
        <AxMenu.Mini id="side3" label="Action 3" hotKey="shift+K" />
        <AxMenu.Group label="Floating" type="mini">
          <AxMenu.Item id="side3.1" label="Action 1" />
          <AxMenu.Item id="side3.2" label="Action 2" />
          <AxMenu.Item id="side3.3" label="Action 3" />
        </AxMenu.Group>
      </AxMenu>
      <AxFooter>
        <AxMenu>
          <AxMenu.Mini icon="mdi mdi-cog" label="Settings" />
          <AxMenu.Group
            label="User Account"
            type="mini"
            icon="mdi mdi-account-circle"
          >
            <AxMenu.Group label="User account">
              <AxMenu.Item id="1" label="Action 1" />
              <AxMenu.Item label="Action 2" />
              <AxMenu.Item label="Action 3" />
            </AxMenu.Group>
          </AxMenu.Group>
        </AxMenu>
      </AxFooter>
    </Fragment>
  );
};

const MyFlyout = ({ onClose }: KeyValue) => {
  return (
    <AxFlyout size="sm" onClose={onClose} closeOnClick>
      <AxContent padding="none">
        <AxMenu onClick={(e) => (onClose?.(), action("menuClick")(e))}>
          <AxMenu.Item nav={{ to: "/" }} label="Home" icon="mdi mdi-home" />
          <AxMenu.Item
            nav={{ to: "/404" }}
            label="Empty"
            icon="mdi mdi-minus-circle-outline"
          />
          <AxMenu.Item label="Action 2" badge="new" />
          <AxMenu.Item label="Action 3" hotKey="shift+K" />
          <AxMenu.Group label="Grouped">
            <AxMenu.Item id="1" label="Action 1" />
            <AxMenu.Item id="1" label="Action 2" />
            <AxMenu.Item id="1" label="Action 3" />
          </AxMenu.Group>
          <AxDivider size="xs" />
          <AxMenu.Group label="Collapsing" type="collapsable">
            <AxMenu.Item id="c1" label="Action 1" />
            <AxMenu.Item id="c1" label="Action 2" />
            <AxMenu.Item id="c1" label="Action 3" />
          </AxMenu.Group>
          <AxDivider size="xs" />
          <AxMenu.Group label="Floating" type="floating">
            <AxMenu.Item id="f1" label="Action 1" />
            <AxMenu.Item id="f1" label="Action 2" />
            <AxMenu.Item id="f1" label="Action 3" />
          </AxMenu.Group>
        </AxMenu>
      </AxContent>
    </AxFlyout>
  );
};

const Home = () => {
  return (
    <AxContent>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
      <AxText>{LIPSUM}</AxText>
    </AxContent>
  );
};

const Empty = () => {
  return (
    <AxContent>
      <AxContent.Empty
        type="exclaim"
        title="Empty Message"
        message="Some message goes here"
      />
    </AxContent>
  );
};

const Viewport = ({ children, ...props }: KeyValue) => {
  const openOverlay = useOverlayService(MyFlyout);
  const openFlyout = () => {
    // Open overlay pass additional props
    openOverlay();
  };
  return (
    <AxViewport {...props}>
      <AxHeader className="bg-component text-2xl">
        <AxButton icon="logo.png" variant="link" onClick={openFlyout} />
        <AxTitle className="text-primary-700 dark:text-primary-400 font-light">
          Application Title
        </AxTitle>
        <div className="flex-1" />
        <AxButton.Dropdown
          showCaret={false}
          icon="mdi mdi-account-circle"
          variant="link"
          color="primary"
          onClick={action("profileMenu")}
        >
          <AxMenu.Item id="f1" label="Action 1" />
          <AxMenu.Item id="f2" label="Action 2" />
          <AxMenu.Item id="f3" label="Action 3" />
          <AxMenu.Group label="Grouped" type="floating">
            <AxMenu.Item label="Action 4" onClick={action("profileMenu")} />
            <AxMenu.Item id="f5" label="Action 5" />
            <AxMenu.Item id="f6" label="Action 6" />
          </AxMenu.Group>
        </AxButton.Dropdown>
      </AxHeader>
      <AxAside width="auto">
        <Menu />
      </AxAside>
      <AxPage isPaper>
        <AxHeader>
          <AxFlexBox gutter="sm" fluid>
            <AxFlexBox.Row align="center">
              <AxFlexBox.Col>Toolbar Head</AxFlexBox.Col>
              <AxDivider size="xs" vertical />
              <AxFlexBox.Col flex="fill">
                <AxBreadcrumb
                  theme="classic"
                  items={[
                    {
                      label: "crumbly crumb text that crumbles",
                      badge: "9",
                      icon: "mdi mdi-home",
                    },
                    { label: "crumb" },
                    {
                      label: "crumb",
                      badge: { value: "new", color: "danger" },
                    },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                    { label: "crumb" },
                  ]}
                />
              </AxFlexBox.Col>
              <AxFlexBox.Col>
                <AxButton icon="mdi mdi-folder-open">Open</AxButton>
              </AxFlexBox.Col>
              <AxFlexBox.Col>
                <AxButton icon="mdi mdi-plus-circle">Create</AxButton>
              </AxFlexBox.Col>
            </AxFlexBox.Row>
          </AxFlexBox>
        </AxHeader>
        <Outlet />
        <AxAside
          width="20rem"
          title="Start"
          icon="mdi mdi-bell"
          iconClass="bg-primary-500 text-white"
          isFlyout
          isResizeable
          isCollapsable
        >
          <AxContent>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
          </AxContent>
        </AxAside>
        <AxAside
          title="Ending"
          width="20rem"
          align="end"
          isFlyout
          isResizeable
          isCollapsable
          headerClass="text-primary-700 dark:text-primary-400 font-medium"
          actions={toolAction}
        >
          <AxContent>
            <div className="divide-y">
              <AxCollapsable>
                <div>
                  <AxTitle>Test collapse</AxTitle>
                  <AxButton
                    size="sm"
                    variant="link"
                    icon="mdi mdi-plus"
                    stopPropagation
                  />
                </div>
                <AxContent>
                  <AxText>Meter label</AxText>
                  <AxMeter size="sm" value={99} />
                </AxContent>
              </AxCollapsable>
              <AxCollapsable>
                <AxTitle>Test collapse</AxTitle>
                <AxContent>{LIPSUM}</AxContent>
              </AxCollapsable>
              <AxCollapsable>
                <AxTitle>Test collapse</AxTitle>
                <AxContent>{LIPSUM}</AxContent>
              </AxCollapsable>
            </div>
          </AxContent>
        </AxAside>
      </AxPage>
    </AxViewport>
  );
};

export const ViewportStory: ComponentStory<typeof AxViewport> = (props) => {
  return (
    <MemoryRouter>
      <AxApplicationProvider>
        <Routes>
          <Route path="/" element={<Viewport />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<Empty />} />
          </Route>
        </Routes>
      </AxApplicationProvider>
    </MemoryRouter>
  );
};

export default { title: "AxViewport", component: AxViewport };
