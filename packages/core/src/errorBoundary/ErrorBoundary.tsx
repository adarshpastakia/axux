// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Component, ComponentType } from "react";
import { Globals } from "../context/Globals";

const ErrorIcon = () => (
  <svg version="1.1" x="0px" y="0px" viewBox="0 0 511.999 511.999" height={48} width={48}>
    <circle style={{ fill: "#E24C4B" }} cx="227.556" cy="227.556" r="227.556" />
    <path
      style={{ fill: "#D1403F" }}
      d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
	c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
	C422.4,91.022,455.111,155.022,455.111,227.556z"
    />
    <path
      style={{ fill: "#FFFFFF" }}
      d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
	c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
	c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
	c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
	C339.911,308.622,339.911,322.844,331.378,331.378z"
    />
  </svg>
);

/**
 * Error boundary wrapper
 * @internal
 */
export class ErrorBoundary extends Component<
  { errorElement?: ComponentType<{ error?: string }> },
  { hasError: boolean; error?: string; stack?: AnyObject }
> {
  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message, stack: error.stack };
  }

  constructor(props: AnyObject) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: Error) {
    this.setState({ hasError: true, error: error.message, stack: error.stack });
  }

  render() {
    const env = process.env.NODE_ENV;
    if (this.state.hasError) {
      const { errorElement: E } = this.props;
      // You can render any custom fallback UI
      return (
        <Globals.Consumer>
          {({ errorElement: DefaultMessage }) => (
            <div className="ax-errorBoundary">
              <div>
                <div style={{ padding: 16 }}>
                  <div className="ax-flex ax-row--middle">
                    <ErrorIcon />
                    <div className="ax-padding--x--md ax-align--start ax-col--fill">
                      {E ? (
                        <E error={this.state.error} />
                      ) : (
                        <DefaultMessage error={this.state.error} />
                      )}
                    </div>
                  </div>
                </div>
                {env === "development" && (
                  <>
                    <hr />
                    <div style={{ overflow: "auto", padding: 16 }}>
                      <pre>{this.state.stack}</pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Globals.Consumer>
      );
    }

    return this.props.children;
  }
}
