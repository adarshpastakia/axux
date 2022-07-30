/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon, AxPopover } from "@axux/core";
import { useTranslation } from "react-i18next";
import { Icons } from "../types/icons";
import { FilterForm } from "./FilterForm";

export const AddFilter = () => {
  const { t } = useTranslation("searchbar");

  return (
    <AxPopover placement="bottom-start">
      <div className="ax-filter__tag ax-filter__addButton">
        <AxIcon icon={Icons.iconAdd} />
        <div>{t("label.add")}</div>
      </div>
      <div style={{ width: "32rem" }}>
        <FilterForm index={-1} />
      </div>
    </AxPopover>
  );
};
