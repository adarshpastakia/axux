// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxFlexBox, AxMeter, AxModal, AxPage, AxSection, AxViewport } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { Story } from "@storybook/react";
import { useCallback, useEffect, useMemo } from "react";
import {
  AxCodeEditor,
  AxDatagrid,
  AxPagination,
  AxRecordCounter,
  GridColumn,
  useAxNavigator,
  useAxPagination
} from "../../src";
import { GridProps } from "../../src/datagrid/types";

const RecordModal = ({
  record,
  onClose,
  onNavigate,
  headLabel
}: { record: Country } & KeyValue) => {
  return (
    <AxModal onClose={onClose} size="lg" onNavigate={onNavigate} height="90vh">
      <AxModal.Header title={record.name} icon={record.emoji}>
        {headLabel}
      </AxModal.Header>
      <AxCodeEditor value={record} />
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
        icon: Countries.emoji(""),
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
        render: (value) => <AxMeter value={value} showLabel color="primary" />
      }
    ],
    []
  );

  const { pageEnd, pageStart, totalCount, pageRecords, setRecords, ...pager } =
    useAxPagination<Country>({
      perPage: 20
    });
  const { record, onNavigate, setCurrentIndex, headLabel } = useAxNavigator<Country>(
    pageRecords ?? []
  );

  const openDetail = useCallback(
    (_, index) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  useEffect(() => {
    setRecords(props.data, 2);
  }, [props.data, setRecords]);

  return (
    <AxViewport>
      <AxPage>
        <AxSection.Head className="ax-row ax-row--middle">
          <AxFlexBox.Col flex="fill">
            <AxRecordCounter start={pageStart} end={pageEnd} total={totalCount} />
          </AxFlexBox.Col>
          <AxFlexBox.Col flex="auto">
            <AxPagination {...pager} />
          </AxFlexBox.Col>
        </AxSection.Head>
        <AxDatagrid<Country>
          {...props}
          data={pageRecords}
          columns={columns}
          onRowSelect={openDetail}
        />
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

export const DatagridStory = Template.bind({});
DatagridStory.args = {
  isSelectable: true,
  data: Countries.list.map((c) => ({ ...c, strength: Math.random() * 100 }))
};

export default { title: "Example/Grid", component: AxDatagrid };
