/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "../types/icons";
import { Text, type TextProps } from "./Text";

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

// eslint-disable-next-line react/display-name
export const Password: FC<PasswordProps> = memo(
  ({ children, strength, showToggle, ...props }: PasswordProps) => {
    const { t } = useTranslation("form");
    const [show, setShow] = useState(false);
    return (
      <Text {...props} type={show ? "text" : "password"}>
        {children}
        {showToggle && (
          <div className="ax-field__addon" data-align="end">
            <AxButton
              color="warning"
              variant="link"
              noTabFocus
              tooltip={t(show ? "password.hide" : "password.show")}
              aria-label={t(show ? "password.hide" : "password.show")}
              icon={show ? Icons.iconEyeOff : Icons.iconEyeOn}
              onClick={() => setShow(!show)}
            />
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
