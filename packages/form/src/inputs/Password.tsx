/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxTooltip } from "@axux/core";
import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "../types/icons";
import { Text, TextProps } from "./Text";

export interface PasswordProps extends Omit<TextProps, "type"> {
  /**
   * Strength meter value (0-100)
   */
  strength?: number;
  /**
   * Show view password toggle
   */
  showToggle?: boolean;
}

export const Password: FC<PasswordProps> = memo(
  ({ children, strength, showToggle, ...props }) => {
    const { t } = useTranslation("form");
    const [show, setShow] = useState(false);
    return (
      <Text {...props} type={show ? "text" : "password"}>
        {children}
        {showToggle && (
          <div className="ax-field__addon" data-align="end">
            <AxTooltip
              color="warning"
              content={t(show ? "password.hide" : "password.show")}
            >
              <AxButton
                color="warning"
                style="link"
                noTabFocus
                aria-label={t(show ? "password.hide" : "password.show")}
                icon={show ? Icons.iconEyeOff : Icons.iconEyeOn}
                onClick={() => setShow(!show)}
              />
            </AxTooltip>
          </div>
        )}
        {!!strength && (
          <div
            className="ax-field__strength"
            style={{
              paddingInlineStart: `${strength > 100 ? 100 : strength}%`,
            }}
          />
        )}
      </Text>
    );
  }
);
