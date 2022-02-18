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
              boolean: true,
              number: 99.18,
              string: LIPSUM.line,
              date: "2020-03-04T12:48:00.000",
              relative: "$year|$now",
              innerObject: {
                prop1: LIPSUM.line,
                prop2: LIPSUM.line
              },
              stringArray: Countries.list.slice(0, 4).map((c) => c.name),
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
