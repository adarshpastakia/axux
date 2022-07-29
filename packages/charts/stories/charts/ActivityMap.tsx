/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxHeader, AxPanel, AxTitle } from "@axux/core";
import { faker } from "@faker-js/faker";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxChart } from "../../src";

const Template: ComponentStory<typeof AxChart.ActivityMap> = () => {
  const [data, setData] = useState<AnyObject[]>([]);
  const loadData = useCallback(() => {
    const high = Array(7);
    const low = Array(24);
    setData(
      Array.from(high, (_, day) =>
        Array.from(low, (_, hour) => [
          hour,
          day,
          faker.datatype.number({ min: 0, max: 99 }),
        ])
      )
    );
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <AxPanel width={600} height={600}>
      <AxHeader>
        <AxTitle>Activity Map chart</AxTitle>
        <AxButton style="link" icon="mdi mdi-refresh" onClick={loadData} />
      </AxHeader>
      <AxChart.ActivityMap data={data} onClick={action("onClick")} />
    </AxPanel>
  );
};

export const ActivityMapStory = Template.bind({});
ActivityMapStory.args = {};
