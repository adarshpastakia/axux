// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxContent, AxIcon, AxPage, AxViewport } from "@axux/core";
import {
  AxAvatar,
  AxDivider,
  AxHotKeyLabel,
  AxLocalePicker,
  AxMenu,
  AxPopover,
  AxThemeToggle
} from "@axux/core/src";
import { mdiAccount, mdiToggleSwitch, mdiToggleSwitchOffOutline } from "@mdi/js";
import { Fragment, useState } from "react";
import { Route, Routes, useLocation, useOutletContext } from "react-router-dom";
import { HomePage } from "./pages/Home";
import chrome from "../assets/chrome.svg";
import firefox from "../assets/firefox.svg";
import safari from "../assets/safari.svg";
import { Login } from "./login/Login";
import { Register } from "./login/Register";

const AppHeader = () => {
  const [state, setState] = useState(true);
  const { setIsAuthenticated } = useOutletContext<KeyValue>();
  return (
    <AxViewport.Header href="/app" icon="logo.png" title="AxUX" subTitle="Demo application">
      <AxPopover showArrow placement="bottom-end" closeOnClick>
        <AxAvatar
          image="https://picsum.photos/id/515/200"
          title="User Name"
          bg="cyan"
          aria-label="Profile"
        />
        <AxMenu size="md" withIcons>
          <AxMenu.Item
            label="Profile"
            icon={mdiAccount}
            appendLabel={<AxHotKeyLabel keyCombo="ctrl+shift+p" />}
          />
          <AxDivider />
          <AxMenu.Item
            label="Toggle something"
            onClick={() => setState(!state)}
            icon={state ? mdiToggleSwitch : mdiToggleSwitchOffOutline}
          />
          <AxDivider />
          <AxThemeToggle isMenu />
          <AxLocalePicker isMenu />
          <AxDivider />
          <AxMenu.Item label="Logout" onClick={() => setIsAuthenticated(false)} />
        </AxMenu>
      </AxPopover>
    </AxViewport.Header>
  );
};

export const AppViewport = () => {
  const { pathname } = useLocation();
  return (
    <Fragment>
      <AxViewport.Banner color="fuchsia">
        <span>Browser support&nbsp;&nbsp;</span>
        <AxIcon icon={chrome} />
        <span>&nbsp;≥87&nbsp;&nbsp;</span>
        <AxIcon icon={firefox} />
        <span>&nbsp;≥66&nbsp;&nbsp;</span>
        <AxIcon icon={safari} />
        <span>&nbsp;≥15&nbsp;&nbsp;</span>
      </AxViewport.Banner>
      <AppHeader />
      <AxViewport.Menu>
        <AxMenu.Item to="/app" label="Home" info="Framework overview" icon="mdi mdi-home" />
        <AxMenu.Item label="Components" isCollapsable defaultCollapsed={false}>
          <AxMenu.Item to="/app/buttons" label="Buttons" />
          <AxMenu.Item to="/app/menus" label="Menus" />
          <AxMenu.Item to="/app/overlays" label="Overlays" />
          <AxMenu.Item to="/app/notifications" label="Notifications" />
        </AxMenu.Item>
        <AxMenu.Item label="Forms" isCollapsable>
          <AxMenu.Item to="/app/login" label="Login" />
          <AxMenu.Item to="/app/register" label="Register" />
        </AxMenu.Item>
      </AxViewport.Menu>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <AxPage>
              <AxContent.Empty message="No implemented" title={pathname} />
            </AxPage>
          }
        />
      </Routes>
    </Fragment>
  );
};
