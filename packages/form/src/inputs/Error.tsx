/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { isString } from "@axux/utilities";
import { useTranslation } from "react-i18next";
import { Icons } from "../types/icons";

export const Error = ({ error }: { error: KeyValue | string }) => {
  const { t } = useTranslation();

  return (
    <AxIcon
      className="ax-field__error"
      icon={Icons.iconError}
      data-tooltip={isString(error) ? error : t(error.key, error.values)}
      data-tooltip-color="danger"
      data-tooltip-placement="bottom"
    />
  );
};
