// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { Fragment, useState } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxButton, AxContent, AxModal, AxToolbar } from "../../src";

const ModalTemplate: Story = (props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Fragment>
      <AxButton onClick={() => setOpen(true)}>Show Modal</AxButton>
      {isOpen && (
        <AxModal {...props} onClose={() => setOpen(false)}>
          <AxModal.Header title="Modal title" icon="mdi mdi-bell" iconBg="primary" />
          <AxContent>{LIPSUM.para}</AxContent>
          <AxModal.Footer>
            <AxToolbar align="end">
              <AxButton onClick={() => setOpen(false)}>Close</AxButton>
            </AxToolbar>
          </AxModal.Footer>
        </AxModal>
      )}
    </Fragment>
  );
};
export const ModalStory = ModalTemplate.bind({});
ModalStory.args = {
  //
};

export default { title: "Example/Modal", component: AxModal };
