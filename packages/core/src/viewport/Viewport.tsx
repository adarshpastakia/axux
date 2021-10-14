// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, Suspense } from "react";
import { GlobalProps, GlobalProvider } from "../context/Globals";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { AxHotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { RefProp } from "../types";
import { AxViewportBanner } from "./Banner";
import { ViewportBreadcrumbs } from "./Breadcrumbs";
import { AxViewportFooter } from "./Footer";
import { AxViewportHeader } from "./Header";
import { AxViewportMenu } from "./Menu";

/** @internal */
export type ViewportProps = Partial<GlobalProps> & RefProp<HTMLDivElement>;

interface ExtendedFC extends FC<ViewportProps> {
  Header: typeof AxViewportHeader;
  Footer: typeof AxViewportFooter;
  Banner: typeof AxViewportBanner;
  Menu: typeof AxViewportMenu;
}

/**
 * Application viewport
 * @internal
 */
export const AxViewport: ExtendedFC = forwardRef<HTMLDivElement, ViewportProps>(
  ({ children, ...props }, ref) => {
    return (
      <GlobalProvider {...props}>
        <AxHotKeyWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="ax-viewport ax-root" ref={ref}>
              <ViewportBreadcrumbs />
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </Suspense>
        </AxHotKeyWrapper>
      </GlobalProvider>
    );
  }
) as AnyObject;
AxViewport.Header = AxViewportHeader;
AxViewport.Footer = AxViewportFooter;
AxViewport.Banner = AxViewportBanner;
AxViewport.Menu = AxViewportMenu;

AxViewport.displayName = "AxViewport";
AxViewport.Header.displayName = "AxViewport.Header";
AxViewport.Footer.displayName = "AxViewport.Footer";
AxViewport.Banner.displayName = "AxViewport.Banner";
AxViewport.Menu.displayName = "AxViewport.Menu";
