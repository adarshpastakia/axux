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
  AxContent,
  AxDivider,
  AxViewport,
  AxTabPanel,
  AxText,
} from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

export const TabPanelStory: ComponentStory<typeof AxTabPanel> = (props) => (
  <AxViewport>
    <AxTabPanel {...props}>
      <AxTabPanel.Tab label="Tab #1">
        <AxContent>
          <AxText className="text-2xl">Simple Tab</AxText>
          <AxDivider />
          <AxText>{LIPSUM}</AxText>
        </AxContent>
      </AxTabPanel.Tab>
      <AxTabPanel.Tab label="Tab #2" isDisabled>
        <AxContent>
          <AxText>{LIPSUM}</AxText>
        </AxContent>
      </AxTabPanel.Tab>
      <AxTabPanel.Tab label="Tab #3" onClose={action("onClose")}>
        <AxContent>
          <AxText className="text-2xl">Closeable Tab</AxText>
          <AxDivider />
          <AxText>{LIPSUM}</AxText>
        </AxContent>
      </AxTabPanel.Tab>
    </AxTabPanel>
  </AxViewport>
);

export const TabPanelIconStory: ComponentStory<typeof AxTabPanel> = (props) => (
  <AxViewport>
    <AxTabPanel {...props}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <AxTabPanel.Tab
          key={i}
          tooltip={`Tab #${i}`}
          icon={`mdi mdi-numeric-${i}`}
        >
          <AxContent>
            <AxText className="text-2xl">Tab Content #{i}</AxText>
            <AxDivider />
            <AxText>{LIPSUM}</AxText>
          </AxContent>
        </AxTabPanel.Tab>
      ))}
    </AxTabPanel>
  </AxViewport>
);

export default { title: "AxTabPanel", component: AxTabPanel };
