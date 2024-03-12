import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AxAnimation,
  AxBreadcrumb,
  AxButton,
  AxCallout,
  AxCard,
  AxCollapsable,
  AxContent,
  AxDivider,
  AxErrorBoundary,
  AxFooter,
  AxHeader,
  AxIcon,
  AxMenu,
  AxMeter,
  AxPage,
  AxProgress,
  AxTag,
  AxText,
  AxTitle,
  AxViewport,
  useApplicationContext,
} from "../src";

const meta: Meta = {
  title: "@core/Playground",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type PlaygroundStory = StoryObj;

export const Playground: PlaygroundStory = {
  render: () => {
    const { changeAccent, changeTheme, toggleMode } = useApplicationContext();
    return (
      <AxViewport>
        <AxPage isPaper>
          <AxHeader className="flex gap-2 items-center">
            <img src="logo.png" className="w-12 h-12 rounded-full" />
            <h1 className="m-0 flex-1 truncate max-md:text-lg max-lg:text-xl">
              AxUX - A React based UI Framework
            </h1>
            <div className="flex gap-4 max-md:text-sm max-lg:text-base text-xl">
              <div
                className="home-selector color-scheme"
                onClick={() => {
                  toggleMode();
                }}
              />
              <div
                className="home-selector blue-pink"
                onClick={() => {
                  changeAccent("pink");
                  changeTheme("blue");
                }}
              />
              <div
                className="home-selector green-brown"
                onClick={() => {
                  changeAccent("brown");
                  changeTheme("green");
                }}
              />
              <div
                className="home-selector orange-purple"
                onClick={() => {
                  changeAccent("purple");
                  changeTheme("orange");
                }}
              />
              <div
                className="home-selector red-violet"
                onClick={() => {
                  changeAccent("violet");
                  changeTheme("red");
                }}
              />

              <div
                className="w-[1em] h-[1em] cursor-pointer border-2 rounded"
                onClick={() => (document.documentElement.dataset.rounded = "")}
              />
              <div
                className="w-[1em] h-[1em] cursor-pointer border-2 rounded-md"
                onClick={() =>
                  (document.documentElement.dataset.rounded = "md")
                }
              />
              <div
                className="w-[1em] h-[1em] cursor-pointer border-2 rounded-full"
                onClick={() =>
                  (document.documentElement.dataset.rounded = "full")
                }
              />
            </div>
          </AxHeader>
          <AxContent>
            <div className="container mx-auto">
              <div className="grid grid-cols-12 max-md:grid-cols-3 max-lg:grid-cols-6 gap-2 font-bold">
                <div className="flex-1 p-2 round color-orange">Orange</div>
                <div className="flex-1 p-2 round color-red">Red</div>
                <div className="flex-1 p-2 round color-pink">Pink</div>
                <div className="flex-1 p-2 round color-violet">Violet</div>
                <div className="flex-1 p-2 round color-purple">Purple</div>
                <div className="flex-1 p-2 round color-blue">Blue</div>
                <div className="flex-1 p-2 round color-green">Green</div>
                <div className="flex-1 p-2 round color-brown">Brown</div>
              </div>
              <div className="grid grid-cols-12 max-md:grid-cols-3 max-lg:grid-cols-6 gap-2 font-bold">
                <div className="flex-1 p-2 round color-warning">Warning</div>
                <div className="flex-1 p-2 round color-danger">Danger</div>
                <div className="flex-1 p-2 round color-"></div>
                <div className="flex-1 p-2 round color-"></div>
                <div className="flex-1 p-2 round color-"></div>
                <div className="flex-1 p-2 round color-info">Info</div>
                <div className="flex-1 p-2 round color-success">Success</div>
                <div className="flex-1 p-2 round color-"></div>
              </div>
              <div className="grid grid-cols-12 max-md:grid-cols-3 max-lg:grid-cols-6 gap-2 font-bold">
                <div className="flex-1 p-2 round text-center bg-primary">
                  Primary
                </div>
                <div className="flex-1 p-2 round text-center bg-accent">
                  Accent
                </div>
                <div className="flex-1 p-2 round text-center bg-info">Info</div>
                <div className="flex-1 p-2 round text-center bg-danger">
                  Danger
                </div>
                <div className="flex-1 p-2 round text-center bg-success">
                  Success
                </div>
                <div className="flex-1 p-2 round text-center bg-warning">
                  Warning
                </div>
                <div className="flex-1 p-2 round text-center text-primary">
                  Primary
                </div>
                <div className="flex-1 p-2 round text-center text-accent">
                  Accent
                </div>
                <div className="flex-1 p-2 round text-center text-info">
                  Info
                </div>
                <div className="flex-1 p-2 round text-center text-danger">
                  Danger
                </div>
                <div className="flex-1 p-2 round text-center text-success">
                  Success
                </div>
                <div className="flex-1 p-2 round text-center text-warning">
                  Warning
                </div>
              </div>
              <hr />

              <AxErrorBoundary>
                {/** @ts-expect-error ignore */}
                <div ref={(el) => badcall()}>Bad state</div>
              </AxErrorBoundary>

              <div className="grid grid-cols-3 max-md:grid-cols-1">
                <AxContent.Empty
                  message="Empty content message"
                  title="Empty Content"
                >
                  <AxTag>Action</AxTag>
                  <AxDivider vertical />
                  <AxButton color="primary">Action</AxButton>
                </AxContent.Empty>
                <AxContent.Empty
                  size="md"
                  type="inbox"
                  message="Empty content message"
                  title="Empty Content"
                >
                  <AxTag>Action</AxTag>
                  <AxButton color="primary">Action</AxButton>
                </AxContent.Empty>
                <AxContent.Empty
                  size="sm"
                  type="folder"
                  message="Empty content message"
                  title="Empty Content"
                >
                  <AxTag>Action</AxTag>
                  <AxButton color="primary">Action</AxButton>
                </AxContent.Empty>
              </div>

              <hr />

              <div className="grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4">
                <AxCallout title="Callout" icon="mdi mdi-alien">
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout
                  title="Closeable"
                  icon="mdi mdi-alien"
                  onClose={() => undefined}
                >
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout
                  title="Callout"
                  color="primary"
                  icon="mdi mdi-alien"
                  onClose={() => undefined}
                >
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout
                  title="Callout"
                  color="accent"
                  icon="mdi mdi-alien"
                  onClose={() => undefined}
                >
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout title="Callout" color="info" icon="mdi mdi-alien">
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout title="Callout" color="danger" icon="mdi mdi-alien">
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout title="Callout" color="success" icon="mdi mdi-alien">
                  {faker.lorem.sentences(3)}
                </AxCallout>
                <AxCallout title="Callout" color="warning" icon="mdi mdi-alien">
                  {faker.lorem.sentences(3)}
                </AxCallout>
              </div>

              <hr />

              <AxHeader className="text-lg">
                <AxIcon icon="mdi mdi-bell" className="bg-accent" />
                <AxTitle className="flex-auto text-primary font-medium">
                  Header
                </AxTitle>
                <span className="text-sm">Options</span>
              </AxHeader>
              <br />
              <AxFooter className="text-sm">
                <span>Footer</span>
                <span>Copyright © 2024</span>
              </AxFooter>

              <hr />

              <AxText>
                <h1>Heading 1</h1>
              </AxText>
              <AxText>
                <h2>Heading 2</h2>
              </AxText>
              <AxText>
                <h3>Heading 3</h3>
              </AxText>
              <AxText>
                <h4>Heading 4</h4>
              </AxText>
              <AxText>
                <h5>Heading 5</h5>
              </AxText>
              <AxText>
                <h6>Heading 6</h6>
              </AxText>

              <div className="text-md">
                <AxText>Default text. {faker.lorem.sentence()}</AxText>
                <AxText className="font-serif">
                  Serif text. {faker.lorem.sentence()}
                </AxText>
                <AxText className="font-mono">
                  Mono text. {faker.lorem.sentence()}
                </AxText>
                <AxText className="flex gap-1">
                  <span>Styled text with </span>
                  <span className="italic">Italic text</span>
                  <span className="underline">Underline text</span>
                  <span className="line-through">Strikethrough text</span>
                  <span className="font-medium">Bold text</span>
                  <span className="font-bold">Dark text</span>
                </AxText>
              </div>
              <br />
              <AxText clip>{faker.lorem.sentence(50)}</AxText>
              <br />
              <AxText clip={4}>{faker.lorem.paragraphs(8, " ")}</AxText>
              <br />
              <AxText>
                <AxText.Abbr
                  abbr={[
                    ["super", "Super tooltip"],
                    ["turbo", "Turbo tooltip"],
                    ["corona", "Corona tooltip"],
                    ["dolores", "Dolores tooltip"],
                  ]}
                >
                  {faker.lorem.paragraphs(4)}
                </AxText.Abbr>
              </AxText>
              <br />
              <AxText>
                <AxText.Mark mark={["super", "turbo", "corona", "dolores"]}>
                  {faker.lorem.paragraphs(4)}
                </AxText.Mark>
              </AxText>

              <hr />

              <div className="flex text-4xl gap-4 items-center">
                <AxAnimation.Bars />
                <AxAnimation.Spinner />
                <AxAnimation.Card showIcon className="w-96" />
                <AxAnimation.Check className="text-success-500" />
                <AxAnimation.Cross className="text-danger-500" />
                <AxAnimation.Info className="text-info-500" />
              </div>

              <hr />

              <AxDivider />
              <AxDivider>Divider text</AxDivider>
              <AxDivider applyBg className="text-accent">
                Divider text
              </AxDivider>
              <AxDivider rainbow />
              <AxDivider rainbow>Rainbow text</AxDivider>
              <AxDivider
                rainbow
                applyBg
                align="center"
                className="text-primary"
              >
                Rainbow text
              </AxDivider>

              <hr />

              <div className="flex gap-2 items-center">
                <AxMeter className="w-64" value={94} size="xs" />
                <AxMeter
                  className="w-64"
                  value={72}
                  size="sm"
                  color="warning"
                />
                <AxMeter className="w-64" value={54} color="primary" />

                <AxProgress.Circle animate value={72} color="accent" />
                <AxProgress.Bar animate value={45} label="Loading" />
              </div>

              <hr />

              <div>
                <AxButton icon="mdi mdi-bell" />
                <AxButton>Action Button</AxButton>
                <AxButton icon="mdi mdi-bell">Action Button</AxButton>
                <AxButton variant="outline" icon="mdi mdi-bell" />
                <AxButton variant="outline">Action Button</AxButton>
                <AxButton variant="outline" icon="mdi mdi-bell">
                  Action Button
                </AxButton>
                <AxButton variant="solid" icon="mdi mdi-bell" />
                <AxButton variant="solid">Action Button</AxButton>
                <AxButton variant="solid" icon="mdi mdi-bell">
                  Action Button
                </AxButton>
                <AxButton
                  variant="link"
                  icon="mdi mdi-bell"
                  className="flush"
                />
                <AxButton variant="link">Action Button</AxButton>
                <AxButton variant="link" icon="mdi mdi-bell">
                  Action Button
                </AxButton>
              </div>
              <div>
                <AxButton size="sm" icon="mdi mdi-bell" badge={9}>
                  Action Button
                </AxButton>
                <AxButton
                  size="md"
                  icon="mdi mdi-bell"
                  badge={{ color: "danger", value: "new", placement: "bottom" }}
                >
                  Action Button
                </AxButton>
                <AxButton
                  size="lg"
                  icon="mdi mdi-bell"
                  badge={{ ping: true, color: "success", placement: "top-end" }}
                >
                  Action Button
                </AxButton>
                <AxButton color="accent" variant="solid" icon="mdi mdi-bell">
                  Accent Button
                </AxButton>
                <AxButton color="danger" variant="solid" icon="mdi mdi-bell">
                  Danger Button
                </AxButton>
                <AxButton color="success" variant="solid" icon="mdi mdi-bell">
                  Success Button
                </AxButton>
                <AxButton color="warning" variant="solid" icon="mdi mdi-bell">
                  Warning Button
                </AxButton>
              </div>
              <div>
                <AxButton isDisabled icon="mdi mdi-bell">
                  Disabled Button
                </AxButton>
                <AxButton isDisabled variant="solid" icon="mdi mdi-bell">
                  Disabled Button
                </AxButton>
                <AxButton isLoading useSpinner icon="mdi mdi-bell">
                  Busy Button
                </AxButton>
                <AxButton isLoading variant="solid" icon="mdi mdi-bell">
                  Busy Button
                </AxButton>
                <AxButton iconAlign="end" variant="solid" icon="mdi mdi-bell">
                  Icon Button
                </AxButton>
                <AxButton iconAlign="top" variant="solid" icon="mdi mdi-bell">
                  Icon Button
                </AxButton>
              </div>

              <hr />

              <AxTag color="#a855f7" size="sm">
                Small pink
              </AxTag>
              <AxTag color="primary">Tag Primary</AxTag>
              <AxTag color="accent" fill>
                Tag Accent
              </AxTag>
              <AxTag color="#4338ca" fill size="md">
                Medium Purple
              </AxTag>
              <AxTag color="#db2777" className="!rounded-full">
                Rounded
              </AxTag>

              <hr />

              <div className="flex gap-4">
                <AxBreadcrumb
                  items={[
                    { label: "Home" },
                    { label: "Item 1" },
                    { label: "Item 2" },
                    { label: "Item 3" },
                    { label: "Item 4" },
                    { label: "Item 5" },
                    { label: "Item 6" },
                    { label: "Item 7" },
                    { label: "Item 8" },
                    { label: "Item 9" },
                  ]}
                />

                <AxBreadcrumb
                  theme="modern"
                  items={[
                    { label: "Item 1" },
                    { label: "Item 2" },
                    { label: "Item 3" },
                    { label: "Item 4" },
                    { label: "Item 5" },
                    { label: "Item 6" },
                    { label: "Item 7" },
                    { label: "Item 8" },
                    { label: "Item 9" },
                  ]}
                />
              </div>
              <div className="flex gap-4">
                <AxBreadcrumb
                  color="accent"
                  items={[
                    { label: "Home" },
                    { label: "Item 1" },
                    { label: "Item 2" },
                    { label: "Item 3" },
                    { label: "Item 4" },
                    { label: "Item 5" },
                    { label: "Item 6" },
                    { label: "Item 7" },
                    { label: "Item 8" },
                    { label: "Item 9" },
                  ]}
                />

                <AxBreadcrumb
                  theme="modern"
                  color="accent"
                  items={[
                    { label: "Item 1" },
                    { label: "Item 2" },
                    { label: "Item 3" },
                    { label: "Item 4" },
                    { label: "Item 5" },
                    { label: "Item 6" },
                    { label: "Item 7" },
                    { label: "Item 8" },
                    { label: "Item 9" },
                  ]}
                />
              </div>

              <hr />

              <div className="grid gap-4 max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-4">
                <div>
                  <AxCollapsable className="border">
                    <AxHeader>
                      <AxIcon icon="mdi mdi-alien" />
                      <AxTitle>Collapsable</AxTitle>
                    </AxHeader>
                    <AxContent>{faker.lorem.sentences(4)}</AxContent>
                  </AxCollapsable>
                </div>
                <div>
                  <AxCard>
                    <AxHeader>
                      <AxIcon icon="mdi mdi-alien" />
                      <AxTitle>Card</AxTitle>
                    </AxHeader>
                    <AxContent>{faker.lorem.sentences(4)}</AxContent>
                    <AxFooter justify="end" className="border-none">
                      <AxButton variant="solid">Open</AxButton>
                    </AxFooter>
                  </AxCard>
                </div>
                <div>
                  <AxCard onClick={() => undefined}>
                    <AxHeader>
                      <AxIcon icon="mdi mdi-alien" />
                      <AxTitle>Clickable Card</AxTitle>
                    </AxHeader>
                    <AxContent>{faker.lorem.sentences(4)}</AxContent>
                  </AxCard>
                </div>
                <div>
                  <AxCard isActive>
                    <AxHeader>
                      <AxIcon icon="mdi mdi-alien" />
                      <AxTitle>Active Card</AxTitle>
                    </AxHeader>
                    <AxContent>{faker.lorem.sentences(4)}</AxContent>
                  </AxCard>
                </div>
              </div>

              <hr />

              <div className="inline-block w-64 me-4 border">
                <AxMenu>
                  <AxMenu.Item icon="mdi mdi-home" label="Home" />
                  <AxMenu.Group
                    type="floating"
                    icon="mdi mdi-window-maximize"
                    label="Inputs"
                  >
                    <AxMenu.Item icon="mdi mdi-form-textbox" label="Textbox" />
                    <AxMenu.Item icon="mdi mdi-form-select" label="Select" />
                    <AxMenu.Item
                      icon="mdi mdi-checkbox-marked"
                      label="Checkbox"
                    />
                    <AxMenu.Item icon="mdi mdi-radiobox-marked" label="Radio" />
                  </AxMenu.Group>
                  <AxMenu.Group
                    type="collapsable"
                    icon="mdi mdi-format-text-variant-outline"
                    label="Inputs"
                  >
                    <AxMenu.Item icon="mdi mdi-format-bold" label="Bold" />
                    <AxMenu.Item icon="mdi mdi-format-italic" label="Italic" />
                    <AxMenu.Item
                      icon="mdi mdi-format-underline"
                      label="Underline"
                    />
                  </AxMenu.Group>
                  <AxDivider />
                  <AxMenu.Item isDisabled label="Disabled" />
                  <AxMenu.Item isActive label="Active" />
                  <AxDivider />
                  <AxMenu.Item
                    icon="mdi mdi-key"
                    className="text-danger"
                    label="Logout"
                  />
                </AxMenu>
              </div>
              <div className="inline-block align-top border">
                <AxMenu>
                  <AxMenu.Mini icon="mdi mdi-home" label="Home" />
                  <AxMenu.Group
                    type="mini"
                    icon="mdi mdi-window-maximize"
                    label="Inputs"
                  >
                    <AxMenu.Item icon="mdi mdi-form-textbox" label="Textbox" />
                    <AxMenu.Item icon="mdi mdi-form-select" label="Select" />
                    <AxMenu.Item
                      icon="mdi mdi-checkbox-marked"
                      label="Checkbox"
                    />
                    <AxMenu.Item icon="mdi mdi-radiobox-marked" label="Radio" />
                  </AxMenu.Group>
                  <AxMenu.Group
                    type="mini"
                    icon="mdi mdi-format-text-variant-outline"
                    label="Inputs"
                  >
                    <AxMenu.Item icon="mdi mdi-format-bold" label="Bold" />
                    <AxMenu.Item icon="mdi mdi-format-italic" label="Italic" />
                    <AxMenu.Item
                      icon="mdi mdi-format-underline"
                      label="Underline"
                    />
                  </AxMenu.Group>
                  <AxDivider />
                  <AxMenu.Mini isDisabled label="Disabled" />
                  <AxMenu.Mini isActive label="Active" />
                  <AxDivider />
                  <AxMenu.Mini
                    icon="mdi mdi-key"
                    className="text-danger"
                    label="Logout"
                  />
                </AxMenu>
              </div>
            </div>
          </AxContent>
        </AxPage>
      </AxViewport>
    );
  },
  args: {},
};
