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
  AxButton,
  AxContent,
  AxFlyout,
  AxModal,
  AxPanel,
  AxText,
  useOverlayService,
} from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

export const ModalStory: ComponentStory<typeof AxModal> = (props) => {
  const MyModal = (modalProps: KeyValue) => (
    <AxModal {...modalProps} onNavigate={action("onNavigate")}>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxModal>
  );

  const { openOverlay } = useOverlayService();
  const openModal = () => {
    // Open overlay pass additional props
    openOverlay(MyModal, props);
  };
  return <AxButton onClick={openModal}>Open Modal</AxButton>;
};
export const ModalSource = `
const MyModal = (modalProps: KeyValue) => (
  <AxModal {...modalProps}>
    <AxContent>
      <AxText>{LIPSUM}</AxText>
    </AxContent>
  </AxModal>
);

const { openOverlay } = useOverlayService();
const openModal = () => {
  // Open overlay pass additional props
  openOverlay(MyModal, { title: "My Modal" });
};
return <AxButton onClick={openModal}>Open Modal</AxButton>;
`;

export const FlyoutStory: ComponentStory<typeof AxFlyout> = (props) => {
  const MyFlyout = (flyoutProps: KeyValue) => (
    <AxFlyout size="md" {...flyoutProps}>
      <AxContent>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxFlyout>
  );

  const { openOverlay } = useOverlayService();
  const openFlyout = () => {
    // Open overlay pass additional props
    openOverlay(MyFlyout, props);
  };
  return <AxButton onClick={openFlyout}>Open Flyout</AxButton>;
};
export const FlyoutSource = `
const MyFlyout = (flyoutProps: KeyValue) => (
  <AxFlyout size="md" {...flyoutProps}>
    <AxContent>
      <AxText>{LIPSUM}</AxText>
    </AxContent>
  </AxFlyout>
);

const { openOverlay } = useOverlayService();
const openFlyout = () => {
  // Open overlay pass additional props
  openOverlay(MyFlyout, { title: "My Flyout" });
};
return <AxButton onClick={openFlyout}>Open Flyout</AxButton>;
`;
