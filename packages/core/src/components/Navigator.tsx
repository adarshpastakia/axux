/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { Fragment } from "react/jsx-runtime";
import { AxButton } from "../buttons/Button";
import { AxHotKey } from "../hotkeys/HotKey";
import { type NavigationDirection } from "../types";
import { AppIcons } from "../types/appIcons";

interface Props {
  /**
   * navigation handler
   */
  onNavigate: (dir: NavigationDirection) => void;
}

export const AxNavigator: FC<Props> = ({ onNavigate }) => {
  return (
    <Fragment>
      <AxHotKey global keyCombo="left" handler={() => onNavigate("prev")} />
      <AxHotKey global keyCombo="right" handler={() => onNavigate("next")} />
      <AxButton.Group variant="plain" className="ax-navigator">
        <AxButton
          rtlFlip
          variant="link"
          icon={AppIcons.iconCaretLeft}
          onClick={() => onNavigate("prev")}
          aria-label={"previous"}
        />
        <AxButton
          rtlFlip
          variant="link"
          icon={AppIcons.iconCaretRight}
          onClick={() => onNavigate("next")}
          aria-label={"next"}
        />
      </AxButton.Group>
    </Fragment>
  );
};
