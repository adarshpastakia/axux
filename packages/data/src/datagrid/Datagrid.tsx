/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxContent } from "@axux/core";
import { Indicator } from "@axux/core/dist/animations";
import { ElementProps } from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import { Fragment, memo, ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Body } from "./Body";
import { DatagridProvider } from "./Context";
import { Header } from "./Header";
import { DatagridColumn } from "./types";

export interface DatagridProps<T extends KeyValue> extends ElementProps {
  data: T[];
  columns: Array<DatagridColumn<T>>;
  isLoading?: boolean;

  emptyDisplay?: string | ReactElement;

  sort?: { name: string; order: "asc" | "desc" };
  onSort?: (column: string, dir: "asc" | "desc") => void;

  isSelectable?: boolean;
  onRowSelect?: (record: T) => void;

  children?: (record: T) => ReactNode;
}

export const AxDatagridComponent = <T extends KeyValue>({
  data = [],
  emptyDisplay,
  children,
  isLoading,
  ...props
}: DatagridProps<T>) => {
  const { t } = useTranslation("data");
  return (
    <DatagridProvider {...props} data={data} onRowExpand={children}>
      <Header />
      {data.length > 0 && <Body />}

      {isLoading && (
        <div className="ax-datagrid__loader">
          <Indicator />
        </div>
      )}

      {!isLoading && data.length === 0 && (
        <Fragment>
          {emptyDisplay && !isString(emptyDisplay) ? (
            emptyDisplay
          ) : (
            <AxContent.Empty
              size="sm"
              message={emptyDisplay ?? t("datagrid.empty")}
            />
          )}
        </Fragment>
      )}
    </DatagridProvider>
  );
};
AxDatagridComponent.displayName = "AxDatagrid";

const GenericMemo: <T>(c: T) => T = memo;

export const AxDatagrid = GenericMemo(AxDatagridComponent);
