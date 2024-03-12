/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { handleClick, handleEnter } from "@axux/utilities/src/handlers";
import {
  Component,
  Fragment,
  useMemo,
  type ComponentType,
  type FC,
} from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "../context/Global";
import { usePropToggle } from "../hooks/usePropToggle";
import { type ChildrenProp } from "../types";

const ErrorIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-10 h-10"
  >
    <path
      fill="#242424"
      d="M64 32c0 17.673-14.327 32-32 32s-32-14.327-32-32 14.327-32 32-32 32 14.327 32 32z"
    />
    <path
      fill="#ffffff"
      d="M63.5 32c0 17.397-14.103 31.5-31.5 31.5s-31.5-14.103-31.5-31.5 14.103-31.5 31.5-31.5 31.5 14.103 31.5 31.5z"
    />
    <path
      fill="#f44336"
      d="M60 32c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-15.464 12.536-28 28-28s28 12.536 28 28z"
    />
    <path
      fill="#fafafa"
      d="M50.667 35.733h-37.333c-1.031 0-1.867-0.835-1.867-1.867v-3.733c0-1.031 0.835-1.867 1.867-1.867h37.333c1.031 0 1.867 0.835 1.867 1.867v3.733c0 1.031-0.835 1.867-1.867 1.867z"
    />
  </svg>
);
const DefaultError: FC<{ error?: string }> = ({ error }) => {
  const { t } = useTranslation("core");
  return (
    <Fragment>
      <p className="font-2xl text-md font-medium">{t("error.title")}</p>
      <p>{error}</p>
    </Fragment>
  );
};

const ErrorMessage: FC<KeyValue> = ({ error, errorElement }) => {
  const { errorElement: globalError } = useGlobals();
  const EE = useMemo(() => errorElement ?? globalError ?? DefaultError, []);
  return (
    <div className="p-4">
      <div className="flex items-center">
        <ErrorIcon />
        <div className="px-2 self-start flex-auto">
          <EE error={error} />
        </div>
      </div>
    </div>
  );
};

const ErrorStack: FC<KeyValue> = ({ stack }) => {
  const [show, toggleShow] = usePropToggle(false);
  return (
    <Fragment>
      <div className="text-end px-4 -mt-4 text-sm pb-2">
        <span
          role="link"
          tabIndex={0}
          className="link"
          onClick={handleClick(toggleShow, {
            stopPropagation: true,
          })}
          onKeyDown={handleEnter(toggleShow)}
        >
          {show ? "Hide Detail" : "Show Detail"}
        </span>
      </div>
      {show && (
        <div className="p-4 overflow-auto border-t text-sm max-h-32">
          <pre>{stack}</pre>
        </div>
      )}
    </Fragment>
  );
};

/**
 * Error boundary wrapper
 */
export class AxErrorBoundary extends Component<
  {
    /**
     * custom error display
     */
    errorElement?: ComponentType<{ error?: string }>;
  } & ChildrenProp,
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
        <div className="ax-error-boundary">
          <div>
            <ErrorMessage error={this.state.error} errorElement={E} />
            {env === "development" && <ErrorStack stack={this.state.stack} />}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
