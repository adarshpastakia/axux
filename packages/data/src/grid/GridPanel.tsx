// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxContent, AxLoader } from "@axux/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { GridProps } from "./Grid";
import { GridBody } from "./GridBody";
import { GridContextProvider } from "./GridContext";
import { GridHeader } from "./GridHeader";

/**
 * Datagrid panel
 * @param isLoading
 * @param columns
 * @param data
 * @constructor
 * @internal
 * TODO: implement locked columns
 * TODO: implement footer, dynamic / footer record
 */
export const AxGridPanel: FC<GridProps> = ({ isLoading, data, columns }) => {
  const { t } = useTranslation("data");
  return (
    <GridContextProvider data={data} columns={columns}>
      <div className="ax-grid__panel">
        <GridHeader />
        {data.length > 0 && <GridBody />}
        {!isLoading && data.length === 0 && <AxContent.Empty message={t("grid.empty")} />}
        {isLoading && <AxLoader size="md" />}
      </div>
    </GridContextProvider>
  );
};
