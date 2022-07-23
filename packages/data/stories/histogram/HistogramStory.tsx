/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxApplicationProvider, AxContent } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxHistogram } from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

export const Template: ComponentStory<typeof AxHistogram> = (props) => {
  return (
    <div style={{ width: 400 }}>
      <AxApplicationProvider>
        <AxContent>
          <AxHistogram {...props} />
        </AxContent>
      </AxApplicationProvider>
    </div>
  );
};
export const HistogramStory = Template.bind({});
HistogramStory.args = {
  items: [
    { id: "key1", label: "Item 1", count: Math.ceil(Math.random() * 99) },
    { id: "key2", label: "Item 2", count: Math.ceil(Math.random() * 99) },
    { id: "key3", label: "Item 3", count: Math.ceil(Math.random() * 99) },
    { id: "key4", label: "Item 4", count: Math.ceil(Math.random() * 99) },
    { id: "key5", label: "Item 5", count: Math.ceil(Math.random() * 99) },
    { id: "key6", label: "Item 6", count: Math.ceil(Math.random() * 99) },
    { id: "key7", label: "Item 7", count: Math.ceil(Math.random() * 99) },
  ],
};

export default { title: "AxCheckList", component: AxHistogram };
