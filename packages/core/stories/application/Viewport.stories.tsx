import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AxContent,
  AxHeader,
  AxViewport,
  AxPage,
  AxTitle,
  AxAside,
  AxMenu,
  AxFooter,
  AxButton,
  AxDivider,
  AxSection,
  AxBreadcrumb,
  AxIcon,
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

export const Example: Story = {
  render: (args) => (
    <div className="min-h-[32rem] relative">
      <AxViewport {...args} />
    </div>
  ),
  args: {
    children: (
      <>
        <AxHeader className="px-2">
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
        <AxAside>
          <AxMenu>
            <AxMenu.Item label="Route nav" isActive />
            <AxMenu.Item label="Route nav" />
            <AxMenu.Item label="Route nav" />
          </AxMenu>
        </AxAside>
        <AxFooter className="text-xs bg-bw-500/50 px-4">
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
            <AxButton>Open something</AxButton>
          </AxHeader>
          <AxPage isPaper>
            <AxContent>
              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
              <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
            </AxContent>
          </AxPage>
        </AxSection>
      </>
    ),
  },
};
