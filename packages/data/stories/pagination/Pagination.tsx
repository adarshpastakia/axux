import { Story } from "@storybook/react";
import { AxPagination } from "../../src";
import {
  PaginationOptions,
  usePagination,
} from "../../src/hooks/usePagination";

const PaginationTest: Story<PaginationOptions> = (props) => {
  const paging = usePagination(props);

  return (
    <div className="flex flex-nowrap w-[32rem] items-center">
      <div className="flex-auto">{paging.headLabel}</div>
      <div>
        <AxPagination {...paging} />
      </div>
    </div>
  );
};

export const PaginationStory = PaginationTest.bind({});
PaginationStory.args = {
  currentPage: 0,
  perPage: 25,
  totalRecords: 249,
};
