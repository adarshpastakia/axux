/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxCard,
  AxFlexBox,
  AxIcon,
  AxPage,
  AxText,
  AxViewport,
} from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { ComponentStory } from "@storybook/react";
import { AxList } from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus.";

const ListTemplate: ComponentStory<typeof AxList> = (props) => {
  return (
    <AxViewport>
      <AxPage>
        <AxList<Country> {...props} items={Countries.list} className="p-4">
          {({ data, ...props }) => (
            <AxList.Item {...props}>
              <AxCard className="p-2 w-72 h-40">
                <AxFlexBox.Row className="text-lg font-semibold" align="middle">
                  <AxIcon icon={`flag ${data.iso3}`} className="ring-1" />
                  <AxText.Ellipsis className="flex-1 px-2">
                    {data.name}
                  </AxText.Ellipsis>
                  <AxText>&nbsp;{data.emoji}</AxText>
                </AxFlexBox.Row>
                <AxFlexBox.Row justify="spaced" align="middle">
                  <AxText>{data.fullname}</AxText>
                  <AxText className="text-sm text-muted">
                    {data.continent}
                  </AxText>
                </AxFlexBox.Row>
                <AxFlexBox.Row justify="spaced">
                  <AxText className="text-sm text-muted">{data.capital}</AxText>
                  <AxText className="text-sm text-muted">
                    {data.iso2}/{data.iso3}
                  </AxText>
                </AxFlexBox.Row>
                <AxFlexBox.Row justify="spaced">
                  <AxText className="text-sm text-muted">{data.phone}</AxText>
                  <AxText className="text-sm text-muted">
                    {data.currency}
                  </AxText>
                </AxFlexBox.Row>
              </AxCard>
            </AxList.Item>
          )}
        </AxList>
      </AxPage>
    </AxViewport>
  );
};

export const ListStory = ListTemplate.bind({});
ListStory.args = {
  stickies: 2,
};

export const ListHorizontalStory = ListTemplate.bind({});
ListHorizontalStory.args = {
  stickies: 1,
  layout: "horizontal",
};

export default { title: "AxList", component: AxList };
