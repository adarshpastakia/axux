// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import {
  AxBox,
  AxButton,
  AxDivider,
  AxLocalePicker,
  AxMenu,
  AxSpacer,
  AxTag,
  AxText,
  AxThemeToggle,
  AxToolbar,
  useAxNotificationService
} from "@axux/core";
import { Page, Section } from "../../components";
import { AxField } from "@axux/form";

export const Buttons = () => {
  const { message } = useAxNotificationService();
  const handleConfirmation = (b: boolean) => {
    message({
      text: b ? "Action will be done" : "Action has been rejected",
      color: b ? "success" : "danger"
    }).then();
  };
  return (
    <Page>
      <Section title="Buttons">
        <AxBox className="ax-spacing">
          <AxButton size="lg">Basic Button</AxButton>
          <AxButton.Positive size="lg">Positive Button</AxButton.Positive>
          <AxButton.Negative size="lg">Negative Button</AxButton.Negative>
          <AxButton.Neutral size="lg">Neutral Button</AxButton.Neutral>
        </AxBox>
        <AxSpacer size="md" />
        <AxBox className="ax-spacing">
          <AxButton.Action message="Action is done!" size="lg">
            Indicate Action
          </AxButton.Action>
          <AxButton.Confirm message="Perform this action?" onClick={handleConfirmation} size="lg">
            Action Confirm
          </AxButton.Confirm>
          <AxButton.Dropdown label="Dropdown" size="lg">
            <AxMenu>
              <AxMenu.Item label="First" />
              <AxMenu.Item label="Second" />
              <AxMenu.Item label="Third" />
            </AxMenu>
          </AxButton.Dropdown>
          <AxButton.Dropdown
            split
            size="lg"
            label="Split Dropdown"
            onClick={() => message("Split button clicked")}
            onOpen={() => message("Split dropdown opened")}
          >
            <AxMenu>
              <AxMenu.Item label="First" />
              <AxMenu.Item label="Second" />
              <AxMenu.Item label="Third" />
            </AxMenu>
          </AxButton.Dropdown>
        </AxBox>
        <AxSpacer size="md" />
        <AxBox className="ax-spacing">
          <AxButton.Group>
            <AxButton size="lg" type="solid" icon="mdi mdi-rewind" tooltip="Backward" rtlFlip />
            <AxButton
              size="lg"
              type="solid"
              color="danger"
              icon="mdi mdi-record"
              tooltip="Record"
            />
            <AxButton size="lg" color="success" icon="mdi mdi-play" tooltip="Play" rtlFlip />
            <AxButton size="lg" color="info" icon="mdi mdi-pause" tooltip="Pause" />
            <AxButton size="lg" color="danger" icon="mdi mdi-stop" tooltip="Stop" />
            <AxButton
              size="lg"
              type="solid"
              icon="mdi mdi-fast-forward"
              tooltip="Forward"
              rtlFlip
            />
          </AxButton.Group>
          <AxButton.Group>
            <AxButton size="lg">First</AxButton>
            <AxButton size="lg">Second</AxButton>
            <AxButton size="lg">Third</AxButton>
          </AxButton.Group>
        </AxBox>
      </Section>

      <Section title="Tags">
        <AxBox className="ax-spacing">
          <AxTag size="lg">Simple tag</AxTag>
          <AxTag size="lg" color="primary" onClick={() => message("Tag was clicked")}>
            Color tag
          </AxTag>
          <AxTag size="lg" color="primary" fillColor onClick={() => message("Tag was clicked")}>
            Filled tag
          </AxTag>
          <AxTag size="lg" onClick={() => message("Tag was clicked")}>
            Clickable tag
          </AxTag>
          <AxTag size="lg" onRemove={() => message("Tag was removed")}>
            Removable tag
          </AxTag>
        </AxBox>
      </Section>

      <Section title="Toolbar">
        <AxBox className="ax-border ax-font--md">
          <AxToolbar>
            <AxText>Simple Text</AxText>
            <AxField.Text width="18em" />
            <AxSpacer />
            <AxTag color="blue" size="sm">
              Tag Label
            </AxTag>
            <AxSpacer.Flex />
            <AxButton icon="mdi mdi-bell" badge={{ value: 9, color: "red" }} />
            <AxDivider />
            <AxLocalePicker />
            <AxThemeToggle />
          </AxToolbar>
        </AxBox>
      </Section>
    </Page>
  );
};
