/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxApplicationProvider, AxContent } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxJsonView } from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus. Quisque scelerisque hendrerit ipsum, et lobortis diam venenatis at. Sed facilisis lectus vitae nisl vestibulum ultrices. Vivamus luctus neque ut dolor blandit sodales.\n\nDonec maximus, dui laoreet maximus hendrerit, mauris mi varius ex, a dapibus est ex eget tellus. Sed nisl purus, cursus sed dictum a, egestas et turpis. Praesent scelerisque placerat cursus. Phasellus et dui vel velit faucibus venenatis eu mattis ante. Maecenas eget vulputate dolor. Duis eu lobortis nisl. Vestibulum ullamcorper tristique rutrum. Mauris non est et neque cursus lobortis eu sed neque. Duis risus erat, malesuada eu nisi in, efficitur egestas eros.\n\nDonec scelerisque sit amet dolor in pulvinar. Integer id dolor lorem. Morbi dignissim lorem id tincidunt porttitor. Curabitur feugiat, dui et varius finibus, nisi ante rutrum elit, ac venenatis libero massa nec elit. Vivamus tincidunt libero quis nulla lobortis aliquet. Vestibulum felis nisl, ultricies ut lacus in, viverra elementum justo. Proin ut nisi enim.";

export const Template: ComponentStory<typeof AxJsonView> = (props) => {
  return (
    <div style={{ width: 400 }}>
      <AxApplicationProvider>
        <AxContent>
          <AxJsonView {...props} />
        </AxContent>
      </AxApplicationProvider>
    </div>
  );
};
export const JsonStory = Template.bind({});
JsonStory.args = {
  json: {
    a: 1,
    b: {},
    c: [],
    d: "test",
    e: { a: 2, b: 3 },
    f: [1, 2, 3],
    g: undefined,
    h: 33.45,
    i: "+99.18",
    boolean: {
      _label_: true,
      _score_: 75.69,
    },
    date: "2020-03-04T12:48:00.000",
    time: "12:48:00.000",
    temp: {
      _label_: "Any label",
      _score_: 45.69,
    },
    lipsum: LIPSUM,
  },
  labeler: (p) => (p === "f.0" ? "Test label" : undefined),
};

export default { title: "AxJsonView", component: AxJsonView };
