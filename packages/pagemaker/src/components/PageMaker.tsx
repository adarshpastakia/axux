/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxSection } from "@axux/core";
import { FC, memo } from "react";
import { IProps } from "../utils/types";
import { ContextProvider } from "./context";
import { Aside } from "./widgets/Aside";
import { Page } from "./widgets/Page";

/**
 * Page maker
 */
export const AxPageMaker: FC<IProps> = memo((props) => {
  return (
    <ContextProvider {...props}>
      <AxSection className="page-maker__container">
        <Page />

        {props.isEditing && <Aside />}
      </AxSection>
    </ContextProvider>
  );
});
AxPageMaker.displayName = "AxPageMaker";
