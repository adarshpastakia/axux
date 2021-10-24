// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useEffect } from "react";
import { ElementProps, VFC } from "../types";
import { AxHeading } from "../typography/Heading";

/** @internal */
export interface AppLoaderProps extends ElementProps {
  /**
   * Icon element
   */
  icon: JSX.Element;
  /**
   * Title
   */
  title?: string;
  /**
   * Description
   */
  description?: string;
}

/**
 * Application main loader
 * @param className
 * @param icon
 * @param title
 * @param description
 * @constructor
 * @internal
 */
export const AxAppLoader: VFC<AppLoaderProps> = ({ className, icon, title, description }) => {
  useEffect(() => {
    const theme =
      localStorage.getItem("ax:theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.add(`ax-${theme}`);
  }, []);
  return (
    <div className={`ax-loader__app ${className ?? ""}`}>
      <div>{icon}</div>
      {title && (
        <AxHeading level={1}>
          <span>{title}</span>
          {description && <small>{description}</small>}
        </AxHeading>
      )}
      <div className="ax-loader__app--indicator" />
    </div>
  );
};
AxAppLoader.displayName = "AxAppLoader";
