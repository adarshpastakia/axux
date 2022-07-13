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
  AxHeader,
  AxPanel,
  AxText,
  AxTitle,
} from "../../src";
import { PanelGroup } from "../../src/panels/PanelGroup";
import { PanelStack } from "../../src/panels/PanelStack";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

export const PanelStory: ComponentStory<typeof AxPanel> = (props) => (
  <AxPanel {...props}>
    <AxContent>{LIPSUM}</AxContent>
  </AxPanel>
);

export const PanelHeaderStory: ComponentStory<typeof AxPanel> = (props) => (
  <AxPanel {...props}>
    <AxHeader className="bg-primary-300 dark:bg-primary-700">
      <AxTitle>Panel with custom header</AxTitle>
    </AxHeader>
    <AxContent>{LIPSUM}</AxContent>
  </AxPanel>
);

export const PanelVariantStory: ComponentStory<typeof AxPanel> = (props) => (
  <AxPanel
    {...props}
    onClose={action("onClose")}
    isCollapsable
    isExpandable
    width={600}
    maxHeight="80vh"
  >
    <AxHeader>
      <AxTitle>Panel</AxTitle>
    </AxHeader>
    <AxContent>{LIPSUM}</AxContent>
  </AxPanel>
);

export const PanelGroupStory: ComponentStory<typeof PanelGroup> = (props) => (
  <AxPanel.Group onActiveChange={action("onActiveChange")}>
    <AxPanel>
      <AxHeader>
        <AxTitle>Panel 2</AxTitle>
      </AxHeader>
      <AxContent>{LIPSUM}</AxContent>
    </AxPanel>
    <AxPanel>
      <AxContent>
        This is a fixed panel in the group and cannot be collapsed
      </AxContent>
    </AxPanel>
    <AxPanel>
      <AxHeader>
        <AxTitle>Panel 3</AxTitle>
      </AxHeader>
      <AxContent>{LIPSUM}</AxContent>
    </AxPanel>
    <AxPanel>
      <AxHeader>
        <AxTitle>Panel 4</AxTitle>
      </AxHeader>
      <AxContent>{LIPSUM}</AxContent>
    </AxPanel>
  </AxPanel.Group>
);

export const PanelStackStory: ComponentStory<typeof PanelStack> = () => (
  <AxPanel.Stack
    onBack={action("onBack")}
    onPanelChange={action("onPanelChange")}
  >
    <AxPanel isCollapsable isExpandable>
      <AxHeader className="bg-primary-600 dark:bg-primary-600 text-white">
        <AxTitle>Root</AxTitle>
      </AxHeader>
      <AxContent>
        <AxButton data-panel="first">First Panel</AxButton>
        <AxButton data-panel="second">Second Panel</AxButton>
        <AxButton data-panel="third">Third Panel</AxButton>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxPanel>
    <AxPanel panelId="first" isCollapsable isExpandable>
      <AxHeader className="bg-accent-600 dark:bg-accent-400 text-white">
        <AxTitle>First</AxTitle>
      </AxHeader>
      <AxContent>
        <AxButton data-panel="second">Second Panel</AxButton>
        <AxButton data-panel="third">Third Panel</AxButton>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxPanel>
    <AxPanel panelId="second" isCollapsable isExpandable>
      <AxContent>
        <AxText className="underline decoration-2">Second Panel</AxText>
        <AxButton data-panel="back">Back</AxButton>
        <AxButton data-panel="root">Root</AxButton>
        <AxButton data-panel="third">Third Panel</AxButton>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxPanel>
    <AxPanel panelId="third" isCollapsable isExpandable>
      <AxContent>
        <AxText className="underline decoration-2">Third Panel</AxText>
        <AxButton data-panel="back">Back</AxButton>
        <AxButton data-panel="root">Root</AxButton>
        <AxText>{LIPSUM}</AxText>
      </AxContent>
    </AxPanel>
  </AxPanel.Stack>
);
export default { title: "AxPanel", component: AxPanel };
