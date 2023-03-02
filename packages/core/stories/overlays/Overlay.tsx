/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { createContext, Fragment, useContext } from "react";
import {
  AxApplicationProvider,
  AxButton,
  AxContent,
  AxFlyout,
  AxModal,
  AxText,
  useApplicationContext,
  useOverlayService,
} from "../../src";

const ModalContext = createContext({ test: 0 });

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

const MyModal = (modalProps: KeyValue) => {
  const { test } = useContext(ModalContext);
  const { closeOverlays } = useApplicationContext();
  return (
    <AxModal {...modalProps} onNavigate={action("onNavigate")}>
      <AxContent>
        <AxButton onClick={closeOverlays}>All</AxButton>
        <AxText>{test}</AxText>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxModal>
  );
};

export const ModalStoryRender: ComponentStory<typeof AxModal> = (props) => {
  const [Overlay, openOverlay] = useOverlayService(MyModal);
  const openModal = () => {
    // Open overlay pass additional props
    openOverlay(props);
  };
  return (
    <Fragment>
      <AxButton onClick={openModal}>Open Modal</AxButton>
      {Overlay}
    </Fragment>
  );
};
export const ModalStory: ComponentStory<typeof AxModal> = (props) => {
  return (
    <AxApplicationProvider>
      <ModalContext.Provider value={{ test: 99 }}>
        <ModalStoryRender />
      </ModalContext.Provider>
    </AxApplicationProvider>
  );
};
export const ModalSource = `
export const ModalStoryRender: ComponentStory<typeof AxModal> = (props) => {
  const MyModal = (modalProps: KeyValue) => (
    <AxModal {...modalProps} onNavigate={action("onNavigate")}>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxModal>
  );

  const [Overlay, openOverlay] = useOverlayService(MyModal);
  const openModal = () => {
    // Open overlay pass additional props
    openOverlay(props);
  };
  return <Fragment>
    <AxButton onClick={openModal}>Open Modal</AxButton>
    {Overlay}
  </Fragment>;
};
export const ModalStory: ComponentStory<typeof AxModal> = (props) => {
  return (
    <AxApplicationProvider>
      <ModalStoryRender />
    </AxApplicationProvider>
  );
};
`;

export const FlyoutStoryRender: ComponentStory<typeof AxFlyout> = (props) => {
  const MyFlyout = (flyoutProps: KeyValue) => (
    <AxFlyout size="md" {...flyoutProps} noMask closeOnClick>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxFlyout>
  );

  const [Overlay, openOverlay] = useOverlayService(MyFlyout);
  const openFlyout = () => {
    // Open overlay pass additional props
    openOverlay(props);
  };
  return (
    <Fragment>
      <AxButton onClick={openFlyout}>Open Flyout</AxButton>
      {Overlay}
    </Fragment>
  );
};
export const FlyoutStory: ComponentStory<typeof AxFlyout> = (props) => {
  return (
    <AxApplicationProvider>
      <FlyoutStoryRender />
    </AxApplicationProvider>
  );
};
export const FlyoutSource = `
export const FlyoutStoryRender: ComponentStory<typeof AxFlyout> = (props) => {
  const MyFlyout = (flyoutProps: KeyValue) => (
    <AxFlyout size="md" {...flyoutProps}>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxFlyout>
  );

  const [Overlay, openOverlay] = useOverlayService(MyFlyout);
  const openFlyout = () => {
    // Open overlay pass additional props
    openOverlay(props);
  };
  return <Fragment>
    <AxButton onClick={openFlyout}>Open Flyout</AxButton>
    {Overlay}
  </Fragment>;
};
export const FlyoutStory: ComponentStory<typeof AxFlyout> = (props) => {
  const MyFlyout = (flyoutProps: KeyValue) => (
    <AxFlyout size="md" {...flyoutProps}>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxFlyout>
  );

  const openOverlay = useOverlayService(MyFlyout);
  const openFlyout = () => {
    // Open overlay pass additional props
    openOverlay(props);
  };
  return (
    <AxApplicationProvider>
      <FlyoutStoryRender />
    </AxApplicationProvider>
  );
};
`;
