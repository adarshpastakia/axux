import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import {
  AxAside,
  AxBreadcrumb,
  AxButton,
  AxContent,
  AxDivider,
  AxFlyout,
  AxFooter,
  AxHeader,
  AxIcon,
  AxMenu,
  AxPage,
  AxSection,
  AxTitle,
  AxViewport,
  useOverlayService,
} from "../../src";
import logo from "/assets/logo.png";

const meta: Meta<typeof AxViewport> = {
  component: AxViewport,
  title: "@core/Application/Viewport",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxViewport>;

const MenuFlyout = ({ menu, onToggle }: KeyValue) => {
  const [Flyout, openOverlay] = useOverlayService((props) => (
    <AxFlyout width="18rem" {...props}>
      {menu}
      <AxFooter className="border-0 block">
        <AxButton
          fullWidth
          variant="link"
          onClick={() => (onToggle(), props.onClose())}
          icon="mdi mdi-pin-outline"
        />
      </AxFooter>
    </AxFlyout>
  ));

  return (
    <>
      <AxIcon
        className="text-lg cursor-pointer"
        icon="mdi mdi-menu"
        onClick={() => openOverlay()}
      />
      {Flyout}
    </>
  );
};

export const Example: Story = {
  render: ({ children, ...args }) => {
    const [miniMenu, setMiniMenu] = useState(true);

    const Menu = useMemo(() => {
      const Item = miniMenu ? AxMenu.Mini : AxMenu.Item;
      return (
        <AxMenu>
          <Item label="Home" isActive icon="mdi mdi-home" />
          <Item label="Record table" icon="mdi mdi-table" />
          <Item label="Data cards" icon="mdi mdi-card-text-outline" />
          <AxDivider size="xs" />
          <AxMenu.Group
            label="Components"
            icon="mdi mdi-package-variant"
            type={miniMenu ? "mini" : "collapsable"}
          >
            <AxMenu.Item label="Forms" />
            <AxMenu.Item label="Editor" />
          </AxMenu.Group>
        </AxMenu>
      );
    }, [miniMenu]);
    const [Flyout, openOverlay] = useOverlayService(MenuFlyout);

    return (
      <div className="min-h-[32rem] relative">
        <AxViewport {...args}>
          <AxHeader className="px-2">
            {!miniMenu && (
              <MenuFlyout menu={Menu} onToggle={() => setMiniMenu(true)} />
            )}
            <AxIcon icon={logo} className="text-2xl" />
            <AxTitle className="text-primary text-2xl flex-1">
              Application Title
            </AxTitle>
            <AxButton.Dropdown
              size="lg"
              icon="mdi mdi-account-circle"
              showCaret={false}
              variant="link"
              className="flush"
            >
              <AxMenu.Item label="Account" />
              <AxMenu.Item label="Preferences" />
              <AxDivider size="xs" />
              <AxMenu.Item label="Sign Out" />
            </AxButton.Dropdown>
          </AxHeader>
          {Flyout}
          {miniMenu && (
            <AxAside width="2.5rem">
              {Menu}
              <AxFooter className="border-0 block">
                <AxButton
                  fullWidth
                  variant="link"
                  onClick={() => setMiniMenu(false)}
                  icon="mdi mdi-pin"
                />
              </AxFooter>
            </AxAside>
          )}
          <AxFooter className="text-xs bg-bw-500/20 px-4">
            <span>Copyright © 2023</span>
          </AxFooter>
          <AxSection>
            <AxHeader className="!bg-transparent pt-1 px-2">
              <div className="flex-1">
                <AxBreadcrumb
                  items={[
                    {
                      label: "",
                      icon: "mdi mdi-home",
                    },
                    {
                      label: "Section",
                    },
                    {
                      label: "Page",
                    },
                  ]}
                />
              </div>
              <AxButton size="sm">Open something</AxButton>
            </AxHeader>
            {children}
          </AxSection>
        </AxViewport>
      </div>
    );
  },
  args: {
    children: (
      <AxPage isPaper>
        <AxContent>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
        </AxContent>
      </AxPage>
    ),
  },
};
