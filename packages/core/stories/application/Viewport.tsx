/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ComponentStory } from "@storybook/react";
import {
  AxAside,
  AxButton,
  AxCollapsable,
  AxContent,
  AxDivider,
  AxFlexBox,
  AxHeader,
  AxMeter,
  AxPage,
  AxText,
  AxTitle,
  AxViewport,
} from "../../src";
import { LIPSUM } from "../overlays/Overlay";

const toolAction = [
  <AxButton key="action" color="invert" type="link" icon="mdi mdi-backspace" />,
];

export const ViewportStory: ComponentStory<typeof AxViewport> = (props) => {
  return (
    <AxViewport {...props}>
      <AxHeader className="text-primary-700 dark:text-primary-400 text-2xl font-light bg-component">
        <AxButton icon="logo.png" type="link" />
        <AxTitle>Application Title</AxTitle>
        <AxButton icon="mdi mdi-account-circle" type="link" />
      </AxHeader>
      <AxPage isPaper>
        <AxHeader>
          <AxFlexBox gutter="sm">
            <AxFlexBox.Row align="middle">
              <AxFlexBox.Col flex="fill">Toolbar Head</AxFlexBox.Col>
              <AxFlexBox.Col>
                <AxButton icon="mdi mdi-folder-open">Open</AxButton>
              </AxFlexBox.Col>
              <AxFlexBox.Col>
                <AxButton icon="mdi mdi-plus-circle">Create</AxButton>
              </AxFlexBox.Col>
            </AxFlexBox.Row>
          </AxFlexBox>
        </AxHeader>
        <AxContent>
          <AxContent.Empty
            title="Empty Message"
            message="Some message goes here"
          />
          <AxDivider />
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
          <AxText>{LIPSUM}</AxText>
        </AxContent>
        <AxAside
          width="20rem"
          title="Start"
          icon="mdi mdi-bell"
          iconClass="bg-primary-500 text-white"
          isFlyout
          isResizeable
          isCollapsable
        >
          <AxContent>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
            <AxText>{LIPSUM}</AxText>
          </AxContent>
        </AxAside>
        <AxAside
          title="Ending"
          width="20rem"
          align="end"
          isFlyout
          isResizeable
          isCollapsable
          headerClass="text-primary-700 dark:text-primary-400 font-medium"
          actions={toolAction}
        >
          <AxContent>
            <div className="divide-y">
              <AxCollapsable>
                <div>
                  <AxTitle>Test collapse</AxTitle>
                  <AxButton
                    size="sm"
                    type="link"
                    icon="mdi mdi-plus"
                    stopPropagation
                  />
                </div>
                <AxContent>
                  <AxText>Meter label</AxText>
                  <AxMeter size="sm" value={99} />
                </AxContent>
              </AxCollapsable>
              <AxCollapsable>
                <AxTitle>Test collapse</AxTitle>
                <AxContent>{LIPSUM}</AxContent>
              </AxCollapsable>
              <AxCollapsable>
                <AxTitle>Test collapse</AxTitle>
                <AxContent>{LIPSUM}</AxContent>
              </AxCollapsable>
            </div>
          </AxContent>
        </AxAside>
      </AxPage>
    </AxViewport>
  );
};

export default { title: "AxViewport", component: AxViewport };
