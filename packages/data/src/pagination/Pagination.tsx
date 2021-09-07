// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { VFC } from "react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AxPagination: VFC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <AxButton.Group className="ax-col--middle">
      <AxButton
        type="link"
        color="primary"
        className="flippable"
        isDisabled={page <= 1}
        onClick={() => onPageChange(1)}
        icon={AppIcons.iconChevronLeft}
      />
      <AxButton
        type="link"
        color="primary"
        className="flippable"
        isDisabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        icon={AppIcons.iconCaretLeft}
      />
      <bdi className="ax-font--sm ax-padding--x--sm ax-col--middle">
        {page} / {totalPages}
      </bdi>
      <AxButton
        type="link"
        color="primary"
        className="flippable"
        isDisabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        icon={AppIcons.iconCaretRight}
      />
      <AxButton
        type="link"
        color="primary"
        className="flippable"
        isDisabled={page >= totalPages}
        onClick={() => onPageChange(totalPages)}
        icon={AppIcons.iconChevronRight}
      />
    </AxButton.Group>
  );
};
