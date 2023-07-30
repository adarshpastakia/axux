import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { AxPagination, usePagination } from "../src";
import { PaginationOptions } from "../src/hooks/usePagination";

const meta: Meta<typeof AxPagination> = {
  title: "@data/Pagination",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<PaginationOptions & { isMinimal?: boolean }>;

export const Example: Story = {
  render: (args) => {
    const paging = usePagination(args);
    return (
      <div className="w-[600px]">
        <AxPagination {...paging} isMinimal={args.isMinimal} />
      </div>
    );
  },
  args: {
    isMinimal: false,
    currentPage: 0,
    perPage: 25,
    totalRecords: 249,
    onChange: action("onChange"),
  },
};
