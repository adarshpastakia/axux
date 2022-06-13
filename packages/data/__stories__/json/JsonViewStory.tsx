// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxContent, AxPage, AxViewport, useAxGlobals } from "@axux/core";
import { Countries } from "@axux/utilities";
import { Story } from "@storybook/react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxJsonView } from "../../src";
import { JsonViewProps } from "../../src/json/JsonView";

const Template: Story<JsonViewProps> = (props) => {
  const { dateLocale } = useAxGlobals();
  return (
    <AxViewport dateLocale={dateLocale}>
      <AxPage paper>
        <AxContent>
          <AxJsonView
            {...props}
            json={{
              emptyNode: "",
              boolean: {
                _label_: true,
                _score_: 75.69
              },
              number: 99.18,
              integer: 123456789,
              string: LIPSUM.line,
              date: "2020-03-04T12:48:00.000",
              relative: "$year|$now",
              innerObject: {
                prop1: LIPSUM.line,
                prop2: LIPSUM.line
              },
              stringArray: Countries.list
                .slice(0, 4)
                .map((c) => ({ _label_: c.name, _score_: 24.18 })),
              objectArray: Countries.list.slice(0, 4),
              singleChild: {
                innerChild: {
                  firstChild: {
                    string: LIPSUM.line
                  },
                  secondChild: {
                    string: LIPSUM.line
                  }
                },
                innerSecond: {
                  string: LIPSUM.line,
                  number: 1248.9
                }
              }
            }}
          />
        </AxContent>
      </AxPage>
    </AxViewport>
  );
};

export const JsonViewStory = Template.bind({});
JsonViewStory.args = {
  filters: []
};

export default { title: "Example/JsonView", component: AxJsonView };
