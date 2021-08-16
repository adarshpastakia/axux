// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTooltip } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxTextField, TextFieldProps } from "./Text";

/** @internal */
export interface PasswordFieldProps extends Omit<TextFieldProps, "type"> {
  /**
   * Strength meter value (0-100)
   */
  strength?: number;
  /**
   * Show view password toggle
   */
  showToggle?: boolean;
}

/**
 * Password input field
 * @internal
 */
export const AxPasswordField: FC<PasswordFieldProps> = memo(
  ({ children, strength, showToggle, ...props }) => {
    const { t } = useTranslation("form");
    const [show, setShow] = useState(false);
    return (
      <AxTextField {...props} type={show ? "text" : "password"}>
        {children}
        {showToggle && (
          <div className="ax-field__handle">
            <AxTooltip color="warning" content={t(show ? "password.hide" : "password.show")}>
              <AxButton
                color="warning"
                type="link"
                tabIndex={-1}
                icon={show ? AppIcons.iconEyeOff : AppIcons.iconEyeOn}
                onClick={() => setShow(!show)}
              />
            </AxTooltip>
          </div>
        )}
        {!!strength && (
          <div
            className="ax-field__strength"
            style={{ paddingInlineStart: `${strength > 100 ? 100 : strength}%` }}
          />
        )}
      </AxTextField>
    );
  }
);
