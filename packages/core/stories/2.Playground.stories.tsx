/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  AxAnimation,
  AxAside,
  AxAvatar,
  AxBreadcrumb,
  AxButton,
  AxCallout,
  AxCard,
  AxCollapsable,
  AxContent,
  AxDivider,
  AxErrorBoundary,
  AxFlexBox,
  AxFlyout,
  AxFooter,
  AxHeader,
  AxIcon,
  AxLoader,
  AxMenu,
  AxMeter,
  AxModal,
  AxNavigator,
  AxPage,
  AxPanel,
  AxProgress,
  AxTabPanel,
  AxTag,
  AxText,
  AxTheme,
  AxTitle,
  AxViewport,
  useApplicationContext,
  useNotificationService,
  useOverlayService,
} from "../src";

const meta: Meta = {
  title: "@core/Playground",
  parameters: {
    layout: "fullscreen",
    jest: ["Playground.test.tsx"],
  },
};

export default meta;
type PlaygroundStory = StoryObj;

export const Playground: PlaygroundStory = {
  render: () => {
    const { currentColorScheme, portalRoot } = useApplicationContext();
    const [scheme, setScheme] = useState("");
    const [primary, setPrimary] = useState("");
    const [accent, setAccent] = useState("");
    const [grayscale, setGrayscale] = useState<AnyObject>("");
    const [rounded, setRounded] = useState<AnyObject>("default");

    useEffect(() => {
      const pr = portalRoot.current;
      pr &&
        ((pr.dataset.colorScheme = scheme),
        (pr.dataset.primaryScheme = primary),
        (pr.dataset.accentScheme = accent),
        (pr.dataset.grayScheme = grayscale),
        (pr.dataset.rounded = rounded));
    }, [accent, primary, scheme, rounded, grayscale]);

    useEffect(() => {
      setScheme(currentColorScheme);
    }, [currentColorScheme]);

    return (
      <AxViewport data-testid="playground">
        <AxPage isPaper className="playground">
          <Header
            onPrimary={setPrimary}
            onAccent={setAccent}
            onRounded={setRounded}
            onGrayscale={setGrayscale}
            onScheme={() => setScheme(scheme === "light" ? "dark" : "light")}
          />
          <AxContent>
            <div className="container mx-auto">
              <Palette />
              <ColorSchemes />

              <p className="section">Error Boundary</p>
              <AxErrorBoundary>
                {/** @ts-expect-error ignore */}
                <div ref={(el) => badcall()}>Bad state</div>
              </AxErrorBoundary>

              <Layout />
              <TabPanel />
              <Panels />
              <Overlays />
              <Flexbox />
              <Contents />
              <Callouts />
              <Typography />
              <Avatars />
              <Dividers />
              <Animations />
              <Progress />
              <Buttons />
              <Tags />
              <Breadcrumbs />
              <Cards />
              <Menus />
            </div>
          </AxContent>
          <AxFooter className="bg-dimmed text-xs" justify="between">
            <span>AX/UX React UI Framework</span>
            <span>© 2024</span>
          </AxFooter>
        </AxPage>
      </AxViewport>
    );
  },
  args: {},
};

const Avatars = () => (
  <>
    <p className="section">Icons and Avatars</p>
    <div className="text-5xl flex gap-4 flex-wrap">
      <AxIcon icon="mdi mdi-bell" />
      <AxIcon icon={faker.image.url()} />
      <AxIcon className="text-success" icon="mdi mdi-alien" />
      <AxDivider vertical />
      <AxAvatar />
      <AxAvatar img={faker.image.url()} />
      <AxAvatar img={faker.image.avatar()} />
      <AxAvatar
        className="bg-primary text-yellow-500"
        img={faker.person.firstName()}
      />
      <AxAvatar img={"/badimage"} icon="JD" />
      <AxAvatar
        img={"/badimage"}
        className="bg-accent text-primary"
        icon="mdi mdi-alien"
      />
    </div>
  </>
);

const Flexbox = memo(() => {
  return (
    <>
      <p className="section">Flexbox Layout</p>
      <AxFlexBox>
        <AxFlexBox.Row>
          <AxFlexBox.Col className="bg-dimmed p-2" flex="auto">
            Auto sized to content
          </AxFlexBox.Col>
          <AxFlexBox.Col className="bg-dimmed p-2" width={182}>
            Fixed with
          </AxFlexBox.Col>
          <AxFlexBox.Col className="bg-dimmed p-2" flex="fill" minWidth={128}>
            Fill remaining width (with min width)
          </AxFlexBox.Col>
          <AxFlexBox.Col className="bg-dimmed p-2" flex="full">
            Wrap and use full width
          </AxFlexBox.Col>
        </AxFlexBox.Row>
        <AxFlexBox.Row>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            <span className="show-xl-only">ColXL 2/12</span>
            <span className="show-lg-only">ColLG 3/12</span>
            <span className="show-md-only">ColMD 4/12</span>
            <span className="show-sm-only">ColSM 6/12</span>
            <span className="show-xs-only">ColXS 12/12</span>
          </AxFlexBox.Col>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            Test
          </AxFlexBox.Col>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            Test
          </AxFlexBox.Col>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            Test
          </AxFlexBox.Col>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            Test
          </AxFlexBox.Col>
          <AxFlexBox.Col
            className="bg-dimmed p-2"
            span="12 xl:2 lg:3 md:4 sm:6"
          >
            Test
          </AxFlexBox.Col>
        </AxFlexBox.Row>
      </AxFlexBox>
    </>
  );
});

const Header = memo(
  ({ onPrimary, onAccent, onScheme, onRounded, onGrayscale }: KeyValue) => {
    return (
      <AxHeader className="flex flex-wrap gap-2 items-center max-xl:pb-2">
        <img src="logo.png" className="size-12 rounded-full" />
        <h1 className="m-0 flex-1 max-md:text-md max-xl:text-2xl text-3xl">
          AX/UX - A React based UI Framework
        </h1>
        <div className="theme-selector">
          <div>
            <div className="color-scheme" onClick={onScheme} />
            <div
              className="blue-pink"
              onClick={() => {
                onAccent("coral");
                onPrimary("denim");
              }}
            />
            <div
              className="green-brown"
              onClick={() => {
                onAccent("wood");
                onPrimary("jade");
              }}
            />
            <div
              className="orange-violet"
              onClick={() => {
                onAccent("lilac");
                onPrimary("pumpkin");
              }}
            />
            <div
              className="red-indigo"
              onClick={() => {
                onAccent("iris");
                onPrimary("scarlet");
              }}
            />
          </div>
          <hr />
          <div>
            <div className="silver" onClick={() => onGrayscale("silver")} />
            <div className="steel" onClick={() => onGrayscale("steel")} />
            <div className="olive" onClick={() => onGrayscale("olive")} />
            <div className="sand" onClick={() => onGrayscale("sand")} />
            <hr />
            <div className="round-none" onClick={() => onRounded("none")} />
            <div
              className="round-normal"
              onClick={() => onRounded("default")}
            />
            <div className="round-full" onClick={() => onRounded("full")} />
          </div>
        </div>
      </AxHeader>
    );
  },
);

const Palette = memo(() => (
  <>
    <p className="section">Palette</p>
    <div className="palette-grid text-white">
      {[
        "silver",
        "steel",
        "olive",
        "sand",
        "info",
        "danger",
        "success",
        "warning",
      ].map((c) => (
        <span key={c} className={`swatch-${c}`}>
          {c}
        </span>
      ))}
    </div>
    <div className="palette-grid text-white">
      {[
        "scarlet",
        "pumpkin",
        "jade",
        "denim",
        "iris",
        "lilac",
        "coral",
        "wood",
      ].map((c) => (
        <span key={c} className={`swatch-${c}`}>
          {c}
        </span>
      ))}
    </div>
    <p className="section">Theme</p>
    <div className="palette-grid double">
      <span className="bg-primary">Primary</span>
      <span className="bg-accent">Accent</span>
      <span className="bg-info">Info</span>
      <span className="bg-danger">Danger</span>
      <span className="bg-success">Success</span>
      <span className="bg-warning">Warning</span>
      <span className="text-primary">Primary</span>
      <span className="text-accent">Accent</span>
      <span className="text-info">Info</span>
      <span className="text-danger">Danger</span>
      <span className="text-success">Success</span>
      <span className="text-warning">Warning</span>
    </div>
    <p className="section">Backgrounds/Text</p>
    <div className="palette-grid double">
      <span className="bg-invert text-invert">Invert</span>
      <span className="bg-muted">Muted</span>
      <span className="bg-dimmed">Dimmed</span>
      <span className="bg-base">Base</span>
      <div className="contents bg-alternate">
        <span className="text-base">Odd</span>
        <span className="text-base">Even</span>
      </div>
      <span className="bg-silver text-invert">Invert</span>
      <span className="text-muted">Muted</span>
      <span className="text-dimmed">Dimmed</span>
      <span className="text-base">Base</span>
    </div>
  </>
));

const ColorSchemes = memo(() => (
  <>
    <p className="section">Light/Dark mode</p>
    <div className="grid gap-1 grid-cols-2 max-md:grid-cols-1">
      <AxTheme colorScheme="light">
        <div
          style={{
            backgroundColor: "var(--ax-bg-viewport)",
            padding: "2rem",
          }}
        >
          <h3>Viewport</h3>
          <div
            className="paper"
            style={{
              backgroundColor: "var(--ax-bg-page)",
              padding: "2rem",
            }}
          >
            <h3>Page</h3>
            <div
              className="border"
              style={{
                backgroundColor: "var(--ax-bg-base)",
                padding: "2rem",
              }}
            >
              <h3>Content</h3>
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <div className="sample-input">
                  <span>Placeholder</span>
                  <span className="text-base px-8">Input</span>
                </div>
                <div className="sample-input disabled">Input</div>
                <div className="sample-input focus">Focused</div>
                <div className="sample-input invalid">Invalid</div>
              </div>
            </div>
          </div>
        </div>
      </AxTheme>
      <AxTheme colorScheme="dark">
        <div
          style={{
            backgroundColor: "var(--ax-bg-viewport)",
            padding: "2rem",
          }}
        >
          <h3>Viewport</h3>
          <div
            className="paper"
            style={{
              backgroundColor: "var(--ax-bg-page)",
              padding: "2rem",
            }}
          >
            <h3>Page</h3>
            <div
              className="border"
              style={{
                backgroundColor: "var(--ax-bg-base)",
                padding: "2rem",
              }}
            >
              <h3>Content</h3>
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <div className="sample-input">
                  <span>Placeholder</span>
                  <span className="text-base px-8">Input</span>
                </div>
                <div className="sample-input disabled">Input</div>
                <div className="sample-input focus">Focused</div>
                <div className="sample-input invalid">Invalid</div>
              </div>
            </div>
          </div>
        </div>
      </AxTheme>
    </div>
  </>
));

const Contents = memo(() => (
  <>
    <p className="section">Empty Content</p>
    <div className="grid-layout-sm">
      <AxContent.Empty message="Empty content message" title="Empty Content">
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
  </>
));

const Layout = memo(() => (
  <>
    <p className="section">Content Layout</p>
    <div className="ax-section h-[70vh]">
      <AxPage isPaper title="Page title" icon="mdi mdi-alien" showTitle>
        <AxHeader className="text-lg">
          <AxIcon icon="mdi mdi-bell" className="bg-accent" />
          <AxTitle className="flex-auto text-primary font-medium">
            Header
          </AxTitle>
          <AxButton.Dropdown hideCaret icon="mdi mdi-alien">
            <AxMenu.Item label="Option 1" />
            <AxMenu.Item label="Option 2" />
            <AxMenu.Item label="Option 3" />
            <AxDivider />
            <AxMenu.Item className="text-danger" label="Danger options" />
          </AxButton.Dropdown>
        </AxHeader>
        <AxFooter className="text-sm bg-dimmed">
          <span>Footer</span>
          <span>Copyright © 2024</span>
        </AxFooter>
        <AxContent>
          <h4 className="sticky top-0 text-center">
            Sectioned layout with header, footer, side panels and scrollable
            content
          </h4>
          <div className="h-screen" />
        </AxContent>
        <AxAside
          className="show-md"
          title="Side panel"
          icon="mdi mdi-alien"
          width="20rem"
          maxWidth="44rem"
          isCollapsable
          isResizeable
          isFlyout
        >
          <AxContent>
            <h6 className="sticky top-0 text-center">
              Side scrollable content
            </h6>
            <div className="h-screen" />
          </AxContent>
        </AxAside>
        <AxAside
          className="show-lg"
          title="Side panel"
          icon="mdi mdi-alien"
          width="20rem"
          maxWidth="44rem"
          align="end"
          isCollapsable
          isResizeable
        >
          <AxContent>
            <h6 className="sticky top-0 text-center">
              Side scrollable content
            </h6>
            <div className="h-screen" />
          </AxContent>
        </AxAside>
      </AxPage>
    </div>
  </>
));

const Callouts = memo(() => (
  <>
    <p className="section">Callout</p>
    <div className="grid-layout-lg">
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
  </>
));

const Overlays = memo(() => {
  const { message, toast, alert } = useNotificationService();

  const Modal = useCallback((props: KeyValue) => {
    const size = useMemo<AnyObject>(
      () => faker.helpers.arrayElement(["sm", "md", "lg", "xl"]),
      [],
    );
    return (
      <AxModal
        {...props}
        title={faker.person.fullName()}
        icon={faker.image.avatar()}
        headerClass={
          Object.fromEntries([
            ["sm", "text-sm"],
            ["md", "text-md"],
            ["lg", "text-lg"],
            ["xl", "text-xl"],
          ])[size]
        }
        size={size}
        actions={[<AxNavigator onNavigate={() => undefined} />]}
      >
        <AxContent>{faker.lorem.paragraphs(9)}</AxContent>
      </AxModal>
    );
  }, []);
  const [ModalEl, openModal] = useOverlayService(Modal);

  const Flyout = useCallback((props: KeyValue) => {
    const size = useMemo<AnyObject>(
      () => faker.helpers.arrayElement(["sm", "md", "lg", "xl"]),
      [],
    );
    return (
      <AxFlyout
        {...props}
        placement={faker.helpers.arrayElement(["start", "end"])}
        title={faker.person.fullName()}
        icon={faker.image.avatar()}
        headerClass={
          Object.fromEntries([
            ["sm", "text-sm"],
            ["md", "text-md"],
            ["lg", "text-lg"],
            ["xl", "text-xl"],
          ])[size]
        }
        size={size}
        actions={[<AxNavigator onNavigate={() => undefined} />]}
      >
        <AxContent>{faker.lorem.paragraphs(9)}</AxContent>
      </AxFlyout>
    );
  }, []);
  const [FlyoutEl, openFlyout] = useOverlayService(Flyout);

  const openMessage = () => {
    message({
      color: faker.helpers.arrayElement([
        undefined,
        "primary",
        "accent",
        "info",
        "danger",
        "success",
        "warning",
      ]),
      message: faker.company.catchPhrase(),
    });
  };
  const openToast = () => {
    toast({
      color: faker.helpers.arrayElement([
        undefined,
        "primary",
        "accent",
        "info",
        "danger",
        "success",
        "warning",
      ]),
      type: faker.helpers.arrayElement(["alert", "confirm"]),
      title: faker.commerce.product(),
      message: faker.commerce.productDescription(),
    });
  };
  const openAlert = () => {
    alert({
      color: faker.helpers.arrayElement([
        "primary",
        "accent",
        "info",
        "danger",
        "success",
        "warning",
      ]),
      type: faker.helpers.arrayElement(["alert", "confirm", "prompt"]),
      title: faker.commerce.product(),
      message: faker.commerce.productDescription(),
    });
  };

  return (
    <>
      <p className="section">Overlays</p>
      <div>
        <AxButton onClick={openMessage}>Show Message</AxButton>
        <AxButton onClick={openToast}>Show Toast</AxButton>
        <AxButton onClick={openAlert}>Show Alert</AxButton>
        <AxButton onClick={openModal}>Show Modal</AxButton>
        <AxButton onClick={openFlyout}>Show Flyout</AxButton>

        {ModalEl}
        {FlyoutEl}
      </div>
    </>
  );
});

const Typography = memo(() => {
  const fakeParas = useMemo(() => faker.lorem.paragraphs(6, "\n"), []);
  const marks = useMemo(
    () => faker.helpers.arrayElements(fakeParas.split(" "), 5),
    [fakeParas],
  );
  return (
    <>
      <p className="section">Typography</p>
      <div className="bg-alternate">
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
      </div>
      <table>
        <caption>Table example</caption>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Column 1</td>
            <td>Column 2</td>
            <td>Column 3</td>
          </tr>
        </tfoot>
        <caption>Table foot caption</caption>
      </table>
      <br />
      <div>
        <div className="text-md leading-8">
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
        <AxText clip={4}>{fakeParas}</AxText>
        <br />
        <AxText>
          <AxText.Abbr
            abbr={marks.map((mk) => [mk, `${mk} tooltip`, faker.color.rgb()])}
          >
            {fakeParas}
          </AxText.Abbr>
        </AxText>
        <br />
        <AxText>
          <AxText.Mark mark={marks}>{fakeParas}</AxText.Mark>
        </AxText>
      </div>
    </>
  );
});

const Dividers = memo(() => (
  <>
    <p className="section">Dividers</p>
    <AxDivider />
    <hr />
    <AxDivider width={4}>Divider text</AxDivider>
    <AxDivider applyBg className="text-accent">
      Divider text
    </AxDivider>
    <AxDivider rainbow />
    <AxDivider rainbow>Rainbow text</AxDivider>
    <AxDivider rainbow applyBg align="center" className="text-primary">
      Rainbow text
    </AxDivider>
  </>
));

const Animations = memo(() => {
  const [animationRunner, setRunner] = useState(false);
  useEffect(() => {
    setTimeout(
      () => {
        setRunner(!animationRunner);
      },
      animationRunner ? 2000 : 500,
    );
  }, [animationRunner]);
  const text = useMemo(() => faker.lorem.sentences(3), []);
  return (
    <>
      <p className="section">Animations</p>
      <div className="flex text-4xl gap-4 items-center flex-wrap">
        <div className="w-96 text-reset relative">
          <p>{text}</p>
          <AxLoader>
            <AxAnimation.Bars className="text-primary" />
          </AxLoader>
        </div>
        <AxAnimation.Bars />
        <AxAnimation.Spinner />
        <AxAnimation.Card showIcon className="w-96" />
        {animationRunner && (
          <>
            <AxAnimation.Check className="text-success" />
            <AxAnimation.Cross className="text-danger" />
            <AxAnimation.Info className="text-info" />
          </>
        )}
      </div>
    </>
  );
});

const Progress = memo(() => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRerender(!rerender);
    }, 2000);
  }, [rerender]);
  return (
    <>
      <p className="section">Count Meter</p>
      <div className="flex gap-2 items-center flex-wrap">
        <AxMeter
          className="w-64"
          value={faker.number.int({ min: 18, max: 99 })}
          size="xs"
        />
        <AxMeter
          className="w-64"
          value={faker.number.int({ min: 18, max: 99 })}
          size="sm"
          color="warning"
        />
        <AxMeter
          className="w-64"
          value={faker.number.int({ min: 18, max: 99 })}
          color="primary"
        />

        <AxProgress.Circle
          animate
          value={faker.number.int({ min: 18, max: 99 })}
          color="accent"
        />
        <AxProgress.Bar
          animate
          value={faker.number.int({ min: 18, max: 99 })}
          label="Loading"
        />
      </div>
    </>
  );
});

const Buttons = memo(() => (
  <>
    <p className="section">Buttons</p>
    <div>
      <AxButton icon="mdi mdi-bell" />
      <AxButton tooltip="Action button">Action Button</AxButton>
      <AxButton icon="mdi mdi-bell">Action Button</AxButton>
      <AxButton variant="outline" icon="mdi mdi-bell" />
      <AxButton variant="outline">Action Button</AxButton>
      <AxButton variant="outline" icon="mdi mdi-bell">
        Action Button
      </AxButton>
      <AxButton variant="solid" icon="mdi mdi-bell" />
      <AxButton variant="solid">Action Button</AxButton>
      <AxButton variant="solid" icon="mdi mdi-bell" isLoading useSpinner>
        Action Button
      </AxButton>
      <AxButton variant="link" icon="mdi mdi-bell" />
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
      <AxButton color="info" variant="solid" icon="mdi mdi-bell">
        Info Button
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
    <div>
      <AxButton isActive icon="mdi mdi-bell">
        Active Button
      </AxButton>
      <AxButton isActive variant="outline" icon="mdi mdi-bell">
        Active Button
      </AxButton>
      <AxButton isActive variant="solid" icon="mdi mdi-bell">
        Active Button
      </AxButton>
      <AxButton isActive variant="link" icon="mdi mdi-bell">
        Active Button
      </AxButton>
    </div>
    <p className="text-accent text-lg py-2">Button Groups</p>
    <div>
      <AxButton.Group variant="flat">
        <AxButton className="flush" icon="mdi mdi-rewind" />
        <AxButton
          className="flush"
          icon="mdi mdi-record"
          variant="outline"
          color="danger"
        />
        <AxButton className="flush" icon="mdi mdi-play" variant="solid" />
        <AxButton className="flush" icon="mdi mdi-pause" />
        <AxButton className="flush" icon="mdi mdi-stop" />
        <AxButton className="flush" icon="mdi mdi-fast-forward" />
      </AxButton.Group>
      <AxButton.Group>
        <AxButton icon="mdi mdi-bell">Plain Button</AxButton>
        <AxButton color="accent" icon="mdi mdi-bell">
          Accent Button
        </AxButton>
        <AxButton color="danger" icon="mdi mdi-bell">
          Danger Button
        </AxButton>
        <AxButton color="success" icon="mdi mdi-bell">
          Success Button
        </AxButton>
        <AxButton color="warning" icon="mdi mdi-bell">
          Warning Button
        </AxButton>
      </AxButton.Group>
    </div>
  </>
));

const Tags = memo(() => (
  <>
    <p className="section">Tags</p>
    <AxTag color="#a855f7" size="sm">
      Custom pink
    </AxTag>
    <AxTag color="primary" onClick={() => undefined}>
      Tag Primary
    </AxTag>
    <AxTag color="danger" onRemove={() => undefined}>
      Tag Closeable
    </AxTag>
    <AxTag color="accent" fill onClick={() => undefined}>
      Tag Accent
    </AxTag>
    <AxTag color="#4338ca" fill size="md">
      Custom Purple
    </AxTag>
    <AxTag color="#db2777" className="!rounded-full">
      Rounded
    </AxTag>
  </>
));

const Breadcrumbs = memo(() => (
  <>
    <p className="section">Breadcrumbs</p>
    <div className="flex gap-4 max-lg:flex-wrap">
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
    </div>
    <br />
    <div className="flex gap-4 max-lg:flex-wrap">
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
    </div>
  </>
));

const Cards = memo(() => (
  <>
    <p className="section">Cards</p>
    <div className="grid gap-4 max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-4">
      <div>
        <AxCollapsable className="border border-dimmed">
          <AxHeader>
            <AxIcon icon="mdi mdi-alien" />
            <AxTitle>Collapsable</AxTitle>
          </AxHeader>
          <AxContent>{faker.lorem.sentences(4)}</AxContent>
        </AxCollapsable>
      </div>
      <div>
        <AxCard isPlain>
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
  </>
));

const Panels = memo(() => {
  const [tabStyle, setTabStyle] = useState<AnyObject>("");
  return (
    <>
      <p className="section">Panels</p>
      <div className="grid gap-4 max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-4">
        <div>
          <AxPanel>
            <AxHeader>
              <AxIcon icon="mdi mdi-alien" />
              <AxTitle>Panel</AxTitle>
            </AxHeader>
            <AxContent>{faker.lorem.sentences(4)}</AxContent>
            <AxFooter justify="end" className="border-none">
              <AxButton variant="solid">Open</AxButton>
            </AxFooter>
          </AxPanel>
        </div>
        <div>
          <AxPanel isCollapsable isExpandable onClose={() => undefined}>
            <AxHeader>
              <AxIcon icon="mdi mdi-alien" />
              <AxTitle>Panel</AxTitle>
            </AxHeader>
            <AxContent>{faker.lorem.sentences(4)}</AxContent>
            <AxFooter justify="end" className="border-none">
              <AxButton variant="solid">Open</AxButton>
            </AxFooter>
          </AxPanel>
        </div>
        <div>
          <AxPanel isActive>
            <AxHeader>
              <AxIcon icon="mdi mdi-alien" />
              <AxTitle>Active Panel</AxTitle>
            </AxHeader>
            <AxContent>{faker.lorem.sentences(4)}</AxContent>
          </AxPanel>
        </div>
        <div>
          <AxPanel.Group className="h-[420px]">
            <AxPanel panelId="panel1">
              <AxHeader>
                <AxIcon icon="mdi mdi-alien" />
                <AxTitle>Panel</AxTitle>
              </AxHeader>
              <AxContent>{faker.lorem.sentences(4)}</AxContent>
              <AxFooter justify="end" className="border-none">
                <AxButton variant="solid">Open</AxButton>
              </AxFooter>
            </AxPanel>
            <AxPanel panelId="panel2">
              <AxHeader>
                <AxIcon icon="mdi mdi-alien" />
                <AxTitle>Panel</AxTitle>
              </AxHeader>
              <AxContent>{faker.lorem.sentences(4)}</AxContent>
              <AxFooter justify="end" className="border-none">
                <AxButton variant="solid">Open</AxButton>
              </AxFooter>
            </AxPanel>
            <AxPanel panelId="panel3">
              <AxHeader>
                <AxIcon icon="mdi mdi-alien" />
                <AxTitle>Panel</AxTitle>
              </AxHeader>
              <AxContent>{faker.lorem.sentences(4)}</AxContent>
              <AxFooter justify="end" className="border-none">
                <AxButton variant="solid">Open</AxButton>
              </AxFooter>
            </AxPanel>
          </AxPanel.Group>
        </div>
      </div>
    </>
  );
});

const TabPanel = memo(() => {
  const [tabStyle, setTabStyle] = useState<AnyObject>("");
  const [pos, setPos] = useState<AnyObject>("top");
  return (
    <>
      <p className="section">Tabbed Panel</p>
      <div className="ax-section h-[70vh] border border-dimmed">
        <div className="ax-header justify-end">
          <AxButton
            size="sm"
            variant="link"
            onClick={() =>
              setPos(
                pos === "top"
                  ? "bottom"
                  : pos === "bottom"
                    ? "start"
                    : pos === "start"
                      ? "end"
                      : "top",
              )
            }
          >
            Toggle Pos
          </AxButton>
          <AxButton
            size="sm"
            variant="link"
            onClick={() =>
              setTabStyle(
                tabStyle === ""
                  ? "solid"
                  : tabStyle === "solid"
                    ? "outline"
                    : "",
              )
            }
          >
            Toggle style
          </AxButton>
        </div>
        <AxTabPanel
          align="start"
          placement={pos}
          activeStyle={tabStyle}
          prepend={<div className="size-4" />}
        >
          <AxTabPanel.Tab label="Tab 1">
            <AxContent>{faker.lorem.paragraphs(9)}</AxContent>
          </AxTabPanel.Tab>
          <AxTabPanel.Tab label="Tab 2">
            <AxContent>{faker.lorem.paragraphs(9)}</AxContent>
          </AxTabPanel.Tab>
        </AxTabPanel>
      </div>
    </>
  );
});

const Menus = memo(() => (
  <>
    <p className="Menu">Menu</p>
    <div className="inline-block w-64 me-4 border">
      <AxMenu>
        <AxMenu.Item icon="mdi mdi-home" label="Home" />
        <AxMenu.Group
          type="floating"
          icon="mdi mdi-window-maximize"
          label="Inputs"
        >
          <AxMenu.Item
            icon="mdi mdi-form-textbox"
            label="Textbox"
            badge="new"
          />
          <AxMenu.Item icon="mdi mdi-form-select" label="Select" />
          <AxMenu.Item icon="mdi mdi-checkbox-marked" label="Checkbox" />
          <AxMenu.Item icon="mdi mdi-radiobox-marked" label="Radio" />
        </AxMenu.Group>
        <AxMenu.Group
          type="collapsable"
          icon="mdi mdi-format-text-variant-outline"
          label="Inputs"
        >
          <AxMenu.Item
            icon="mdi mdi-format-bold"
            label="Bold"
            badge={{ value: 9, color: "danger" }}
          />
          <AxMenu.Item
            icon="mdi mdi-format-italic"
            label="Italic"
            badge={{ ping: true }}
          />
          <AxMenu.Item icon="mdi mdi-format-underline" label="Underline" />
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
        <AxMenu.Mini
          icon="mdi mdi-home"
          label="Home"
          badge={{ value: 9, color: "danger" }}
        />
        <AxMenu.Group type="mini" icon="mdi mdi-window-maximize" label="Inputs">
          <AxMenu.Item
            icon="mdi mdi-form-textbox"
            label="Textbox"
            badge="new"
          />
          <AxMenu.Item icon="mdi mdi-form-select" label="Select" />
          <AxMenu.Item icon="mdi mdi-checkbox-marked" label="Checkbox" />
          <AxMenu.Item icon="mdi mdi-radiobox-marked" label="Radio" />
        </AxMenu.Group>
        <AxMenu.Group
          type="mini"
          icon="mdi mdi-format-text-variant-outline"
          label="Inputs"
          badge={{ ping: true, color: "info" }}
        >
          <AxMenu.Item icon="mdi mdi-format-bold" label="Bold" />
          <AxMenu.Item icon="mdi mdi-format-italic" label="Italic" />
          <AxMenu.Item icon="mdi mdi-format-underline" label="Underline" />
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
  </>
));
