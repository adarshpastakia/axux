// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { cloneElement, FC, forwardRef, ReactNodeArray, Suspense } from "react";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { AxIcon } from "../icons/Icon";
import { AxLoader } from "../loader/Loader";
import { ElementProps, IconProps, RefProp } from "../types";

/** @internal */
export interface PageProps extends IconProps, ElementProps, RefProp<HTMLDivElement> {
  /**
   * Page title
   */
  title?: string;
  /**
   * Header actions
   */
  actions?: ReactNodeArray;
  /**
   * Show loading indicator
   */
  isLoading?: boolean;
}

/**
 * Application page wrapper
 * @internal
 */
export const AxPage: FC<PageProps> = forwardRef<HTMLDivElement, PageProps>(
  ({ children, className, isLoading, icon, title, actions }, ref) => {
    return (
      <div className={`ax-page ${className ?? ""}`}>
        <Helmet title={title} />
        <div className="ax-page__header">
          {icon && (
            <div className="ax-page__icon">
              <AxIcon icon={icon} />
            </div>
          )}
          {title && <div className="ax-page__title">{title}</div>}
          {actions && (
            <div className="ax-page__actions">
              {actions.map((child: AnyObject) =>
                cloneElement(child, { type: "link", color: "primary" })
              )}
            </div>
          )}
        </div>
        <Suspense fallback={<AxLoader size="lg" color="primary" />}>
          <ErrorBoundary>
            <div className="ax-page__body" ref={ref}>
              {children}
            </div>
          </ErrorBoundary>
        </Suspense>
        {isLoading && <AxLoader size="lg" color="primary" />}
      </div>
    );
  }
);
AxPage.displayName = "AxPage";
