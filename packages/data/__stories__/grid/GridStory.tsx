// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  AxContent,
  AxFlexBox,
  AxIcon,
  AxMeter,
  AxModal,
  AxPage,
  AxText,
  AxViewport
} from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { Story } from "@storybook/react";
import { useCallback, useMemo } from "react";
import { AxGridPanel, GridColumn, useAxNavigator } from "../../src";
import { GridProps } from "../../src/grid/Grid";

const RecordModal = ({
  record,
  onClose,
  onNavigate,
  headLabel
}: { record: Country } & KeyValue) => {
  return (
    <AxModal onClose={onClose} title={record.name} size="md" onNavigate={onNavigate}>
      <AxModal.Header title={record.name}>{headLabel}</AxModal.Header>
      <AxContent>
        <AxFlexBox>
          <AxFlexBox.Row>
            <AxFlexBox.Col flex="auto">
              <AxIcon size={5} icon={<span>{record.emoji}</span>} />
            </AxFlexBox.Col>
            <AxFlexBox.Col flex="fill">
              <AxText block size="lg">{record.fullname}</AxText>
              <AxText block size="md">{record.capital}</AxText>
            </AxFlexBox.Col>
          </AxFlexBox.Row>
        </AxFlexBox>
      </AxContent>
    </AxModal>
  );
};

const Template: Story<GridProps<Country>> = (props) => {
  const columns = useMemo<GridColumn[]>(
    () => [
      {
        type: "string",
        name: "emoji",
        label: "Flag",
        align: "center",
        icon: <span>{Countries.emoji("")}</span>,
        tooltip: true,
        width: "3rem"
      },
      {
        type: "string",
        name: "iso2",
        label: "ISO",
        width: "3rem",
        align: "center",
        tooltip: true,
        isPrimary: true
      },
      {
        type: "string",
        name: "continent",
        label: "Continent",
        width: "8rem",
        isSortable: true,
        isFilterable: true,
        isResizeable: true,
        filterOptions: ["Africa", "Asia", "Europe", "Oceania", "North America", "South America"]
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        isSortable: true,
        isResizeable: true
      },
      {
        type: "string",
        name: "capital",
        label: "Capital",
        isSortable: true,
        isResizeable: true
      },
      {
        type: "number",
        name: "strength",
        label: "Idx",
        width: "12rem",
        align: "center",
        isSortable: true,
        render: (value) => <AxMeter value={value} showLabel />
      }
    ],
    []
  );
  const { record, onNavigate, setCurrentIndex, headLabel } = useAxNavigator<Country>(props.data);

  const openDetail = useCallback(
    (_, index) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  return (
    <AxViewport>
      <AxPage>
        <AxGridPanel<Country> {...props} columns={columns} onRowSelect={openDetail} />
      </AxPage>
      {record && (
        <RecordModal
          record={record}
          onClose={() => setCurrentIndex(-1)}
          headLabel={headLabel}
          onNavigate={onNavigate}
        />
      )}
    </AxViewport>
  );
};

export const GridStory = Template.bind({});
GridStory.args = {
  isSelectable: true,
  data: Countries.list.map((c) => ({ ...c, strength: Math.random() * 100 }))
};

export default { title: "Example/Grid", component: AxGridPanel };
