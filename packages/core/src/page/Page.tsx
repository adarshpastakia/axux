// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { cloneElement, FC, forwardRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { useIcon } from "../hooks/useIcon";
import { AxLoader } from "../loader/Loader";
import { ElementProps, IconProps, RefProp } from "../types";

/** @internal */
export interface PageProps extends IconProps<JSX.Element>, ElementProps, RefProp<HTMLDivElement> {
  /**
   * Page title
   */
  title?: string;
  /**
   * Header actions
   */
  actions?: JSX.Element[];
  /**
   * Show loading indicator
   */
  isLoading?: boolean;

  paper?: boolean;
}

/**
 * Application page wrapper
 * @internal
 */
export const AxPage: FC<PageProps> = forwardRef<HTMLDivElement, PageProps>(
  ({ children, className, isLoading, paper, icon, title, actions }, ref) => {
    const iconEl = useIcon(icon);
    return (
      <div className={`ax-page ${paper ? "ax-paper" : ""} ${className ?? ""}`}>
        <Helmet title={title} />
        <div className="ax-page__header">
          {iconEl && <div className="ax-page__icon">{iconEl}</div>}
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
        {isLoading && <AxLoader />}
      </div>
    );
  }
);
AxPage.displayName = "AxPage";
