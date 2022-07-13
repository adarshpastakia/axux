/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ComponentStory } from "@storybook/react";
import { AxFlexBox, AxIcon, AxText } from "../../src";
import { AppIcons } from "../../src/types/appIcons";

export const IconsStory: ComponentStory<AnyObject> = () => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {Object.entries(AppIcons).map(([key, icon]) => (
        <AxFlexBox.Col width={128} key={key} className="text-center">
          <AxIcon className="text-2xl" icon={icon} />
          <AxText>{key}</AxText>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);
