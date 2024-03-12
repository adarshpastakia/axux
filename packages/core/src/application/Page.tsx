/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { Helmet } from "react-helmet-async";
import { Indicator } from "../animations";
import { AxSection } from "../components/Section";
import { AxTitle } from "../components/Title";
import { AxIcon } from "../icons/Icon";
import { type ChildrenProp, type ElementProps, type IconProp } from "../types";
import { AxErrorBoundary } from "./ErrorBoundary";

export interface PageProps extends ElementProps, IconProp, ChildrenProp {
  /**
   * page title
   */
  title?: string;
  /**
   * display title
   */
  showTitle?: boolean;
  /**
   * paper shadow
   */
  isPaper?: boolean;
  /**
   * loading state
   */
  isLoading?: boolean;
}

/**
 * A route page element providing a grid-based layout with sections such as header, footer, side panel, and content area,
 * using a grid system for organization and flexibility.
 * This layout provides responsive and visually appealing interfaces with consistent spacing and alignment.
 */
export const AxPage: FC<PageProps> = ({
  children,
  className,
  title,
  icon,
  rtlFlip,
  showTitle,
  isPaper = false,
  isLoading = false,
  ...rest
}) => {
  /** ***************** component *******************/
  return (
    <div
      {...rest}
      data-test-loading={isLoading}
      className={`ax-page ${isPaper ? "paper" : ""} ${className ?? ""}`}
    >
      <Helmet title={title} />
      {isLoading && <Indicator />}
      {showTitle && (
        <div className="ax-page__title">
          {icon && <AxIcon icon={icon} />}
          <AxTitle>{title}</AxTitle>
        </div>
      )}
      <AxSection>
        <AxErrorBoundary>{children}</AxErrorBoundary>
      </AxSection>
    </div>
  );
};
