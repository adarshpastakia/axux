/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { cloneElement, FC, ReactElement, useMemo } from "react";
import { AxIcon } from "../icons/Icon";
import { ElementProps, IconProp } from "../types";

const DefaultInbox = () => (
  <svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.5"
      fill="currentColor"
      d="M479.66,268.7l-32-151.81C441.48,83.77,417.68,64,384,64H128c-16.8,0-31,4.69-42.1,13.94s-18.37,22.31-21.58,38.89l-32,151.87A16.65,16.65,0,0,0,32,272V384a64,64,0,0,0,64,64H416a64,64,0,0,0,64-64V272A16.65,16.65,0,0,0,479.66,268.7Zm-384-145.4c0-.1,0-.19,0-.28,3.55-18.43,13.81-27,32.29-27H384c18.61,0,28.87,8.55,32.27,26.91,0,.13.05.26.07.39l26.93,127.88a4,4,0,0,1-3.92,4.82H320a15.92,15.92,0,0,0-16,15.82,48,48,0,1,1-96,0A15.92,15.92,0,0,0,192,256H72.65a4,4,0,0,1-3.92-4.82Z"
    />
    <path
      fill="currentColor"
      d="M368,160H144a16,16,0,0,1,0-32H368a16,16,0,0,1,0,32Z"
    />
    <path
      fill="currentColor"
      d="M384,224H128a16,16,0,0,1,0-32H384a16,16,0,0,1,0,32Z"
    />
  </svg>
);

const DefaultFolder = () => (
  <svg version="1.1" viewBox="0 0 502 502" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.1"
      fill="currentColor"
      d="M419.079,182.068v-56.83H197.328c-13.949,0-25.258-11.308-25.258-25.258
		s-11.308-25.258-25.258-25.258H10v352.555l72.921-245.21h336.158V182.068z"
    />
    <polygon
      opacity="0.5"
      fill="currentColor"
      className="text-invert"
      points="82.921,182.068 10,427.277 419.079,427.277 492,182.068"
    />
    <path
      opacity="0.5"
      stroke="currentColor"
      d="M419.079,437.277c4.425,0,8.324-2.908,9.585-7.149l72.921-245.209c0.9-3.026,0.318-6.299-1.569-8.83
			s-4.858-4.021-8.016-4.021h-62.921v-46.83c0-5.523-4.478-10-10-10H197.328c-8.413,0-15.258-6.844-15.258-15.257
			c0-19.441-15.816-35.258-35.257-35.258H10c-5.523,0-10,4.477-10,10v352.555c0,4.966,3.645,9.181,8.56,9.896L419.079,437.277z
			 M20,84.723h126.812c8.413,0,15.257,6.845,15.257,15.258c0,19.441,15.816,35.257,35.258,35.257h211.751v36.83H82.921
			c-4.425,0-8.324,2.908-9.585,7.149L20,358.569V84.723z M478.594,192.068L411.62,417.277H23.407L90.38,192.068H478.594z"
    />
    <path
      stroke="currentColor"
      d="M290.991,211.006H113.135c-5.523,0-10,4.477-10,10s4.477,10,10,10h177.856c5.522,0,10-4.477,10-10
			S296.514,211.006,290.991,211.006z"
    />
    <path
      stroke="currentColor"
      d="M362.555,211.006h-23.153c-5.522,0-10,4.477-10,10s4.478,10,10,10h23.153c5.522,0,10-4.477,10-10
			S368.077,211.006,362.555,211.006z"
    />
  </svg>
);

const DefaultExclamation = () => (
  <svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.5"
      fill="currentColor"
      d="M106.1,296.01c-0.46,0-0.92-0.05-1.37-0.14c-0.45-0.09-0.89-0.22-1.31-0.4c-0.42-0.17-0.83-0.39-1.21-0.64c-0.38-0.26-0.74-0.55-1.06-0.87c-0.33-0.33-0.62-0.68-0.87-1.07c-0.26-0.38-0.47-0.78-0.65-1.21c-0.17-0.42-0.31-0.86-0.4-1.31c-0.09-0.45-0.13-0.91-0.13-1.36c0-0.46,0.04-0.92,0.13-1.37s0.23-0.89,0.4-1.31c0.18-0.42,0.39-0.83,0.65-1.21c0.25-0.38,0.54-0.74,0.87-1.06c0.32-0.33,0.68-0.62,1.06-0.87s0.79-0.47,1.21-0.65c0.42-0.17,0.86-0.31,1.31-0.4c0.9-0.18,1.83-0.18,2.73,0c0.45,0.09,0.89,0.23,1.31,0.4c0.43,0.18,0.83,0.4,1.21,0.65s0.74,0.54,1.07,0.87c0.32,0.32,0.61,0.68,0.87,1.06c0.25,0.38,0.47,0.79,0.64,1.21s0.31,0.86,0.4,1.31s0.14,0.91,0.14,1.37c0,0.45-0.05,0.91-0.14,1.36c-0.09,0.45-0.23,0.89-0.4,1.31c-0.17,0.43-0.39,0.83-0.64,1.21c-0.26,0.39-0.55,0.74-0.87,1.07c-0.33,0.32-0.69,0.61-1.07,0.87c-0.38,0.25-0.78,0.47-1.21,0.64c-0.42,0.18-0.86,0.31-1.31,0.4S106.55,296.01,106.1,296.01z"
    />
    <path
      opacity="0.5"
      fill="currentColor"
      d="M475.5,458.25H36.5c-8.78,0-16.58-4.58-20.86-12.24c-4.28-7.67-4.09-16.71,0.51-24.19l70.18-114.04c2.03-3.29,6.34-4.32,9.63-2.29c3.29,2.03,4.32,6.34,2.29,9.63L28.07,429.16c-1.91,3.1-1.99,6.84-0.21,10.02s5.01,5.07,8.64,5.07H475.5c3.64,0,6.87-1.9,8.64-5.07s1.7-6.92-0.21-10.02l-219.5-356.7c-1.84-3-4.92-4.71-8.43-4.71s-6.59,1.72-8.43,4.71L124.24,272.88c-2.03,3.29-6.34,4.32-9.63,2.29c-3.29-2.03-4.32-6.34-2.29-9.63L235.64,65.13C240.03,58,247.64,53.75,256,53.75s15.97,4.25,20.36,11.38l219.5,356.7c4.6,7.48,4.79,16.52,0.51,24.19C492.08,453.67,484.28,458.25,475.5,458.25z"
    />
    <path
      opacity="0.5"
      fill="currentColor"
      d="M354.79,279.28c-1.85,0-3.65-0.75-4.95-2.05c-0.33-0.32-0.62-0.68-0.87-1.07c-0.26-0.37-0.47-0.78-0.65-1.2c-0.17-0.43-0.31-0.87-0.4-1.31c-0.09-0.45-0.13-0.91-0.13-1.37c0-0.46,0.04-0.92,0.13-1.37c0.09-0.44,0.23-0.89,0.4-1.31c0.18-0.42,0.39-0.83,0.65-1.21c0.25-0.38,0.54-0.74,0.87-1.06c1.62-1.63,4.04-2.37,6.31-1.91c0.45,0.09,0.89,0.22,1.31,0.4c0.43,0.17,0.83,0.39,1.21,0.64c0.39,0.25,0.74,0.55,1.06,0.87c0.33,0.32,0.62,0.68,0.88,1.06c0.25,0.38,0.46,0.79,0.64,1.21c0.18,0.42,0.31,0.87,0.4,1.31c0.09,0.45,0.14,0.91,0.14,1.37c0,0.46-0.05,0.92-0.14,1.37c-0.09,0.44-0.22,0.88-0.4,1.31c-0.18,0.42-0.39,0.83-0.64,1.2c-0.26,0.39-0.55,0.75-0.88,1.07c-0.32,0.32-0.67,0.61-1.06,0.87c-0.38,0.25-0.78,0.47-1.21,0.64c-0.42,0.18-0.86,0.31-1.31,0.4C355.7,279.23,355.24,279.28,354.79,279.28z"
    />
    <path
      opacity="0.5"
      fill="currentColor"
      d="M403.86,423.48H108.14c-10.56,0-20.31-5.72-25.46-14.94c-5.15-9.21-4.91-20.52,0.62-29.51l147.86-240.29c5.35-8.69,14.63-13.88,24.84-13.88s19.49,5.19,24.84,13.88l68.87,111.91c2.03,3.29,1,7.6-2.29,9.63c-3.29,2.02-7.6,1-9.63-2.29l-68.87-111.91c-2.78-4.52-7.61-7.22-12.91-7.22s-10.13,2.7-12.91,7.22L95.22,386.37c-2.88,4.67-3,10.55-0.32,15.34c2.68,4.79,7.75,7.77,13.24,7.77h295.72c5.49,0,10.56-2.98,13.24-7.77c2.68-4.79,2.55-10.67-0.32-15.34l-54.14-87.97c-2.03-3.29-1-7.6,2.29-9.63c3.29-2.02,7.61-1,9.63,2.29l54.14,87.97c5.53,8.99,5.77,20.3,0.62,29.51C424.17,417.76,414.42,423.48,403.86,423.48z"
    />
    <path
      fill="currentColor"
      d="M270.12,335.13h-28.24c-6.17,0-11.22-4.83-11.5-10.99l-0.5-11.01c-0.18-3.86,2.81-7.14,6.67-7.31 c3.85-0.21,7.14,2.81,7.31,6.67l0.4,8.64h23.49l5.23-114.15h-33.96l3.79,82.55c0.18,3.86-2.81,7.14-6.67,7.31 c-0.11,0.01-0.22,0.01-0.33,0.01c-3.72,0-6.81-2.93-6.99-6.68l-3.91-85.15c-0.14-3.13,1.01-6.22,3.17-8.48 c2.16-2.26,5.2-3.56,8.33-3.56h39.17c3.13,0,6.16,1.3,8.33,3.56c2.16,2.26,3.32,5.35,3.17,8.48l-5.46,119.12 C281.34,330.3,276.29,335.13,270.12,335.13z"
    />
    <path
      fill="currentColor"
      d="M268.47,394.55h-24.94c-4.83,0-9.39-2.12-12.5-5.81s-4.44-8.54-3.63-13.3l2.69-15.79 c1.34-7.89,8.13-13.61,16.13-13.61h19.56c8,0,14.78,5.73,16.13,13.61l2.69,15.79c0.81,4.76-0.51,9.61-3.63,13.3 S273.3,394.55,268.47,394.55z M246.22,360.04c-1.15,0-2.13,0.83-2.33,1.96l-2.69,15.79c-0.16,0.94,0.26,1.61,0.52,1.92 c0.26,0.31,0.85,0.84,1.8,0.84h24.94c0.95,0,1.54-0.53,1.8-0.84c0.26-0.31,0.68-0.98,0.52-1.92L268.11,362 c-0.19-1.14-1.17-1.96-2.33-1.96H246.22z"
    />
  </svg>
);

/** @internal */
export interface EmptyContentProps extends IconProp, ElementProps {
  iconClassName?: ElementProps["className"];
  /**
   * title text
   */
  title?: string | JSX.Element;
  /**
   * empty reason or message
   */
  message: string | JSX.Element;
  /**
   * actions
   */
  actions?: JSX.Element[];
  /**
   * size
   */
  size?: "sm" | "md";
  /**
   * default icon type
   */
  type?: "exclaim" | "folder" | "inbox";
}

export const EmptyContent: FC<EmptyContentProps> = ({
  icon,
  title,
  message,
  actions = [],
  iconClassName,
  type,
  size,
  rtlFlip,
  className,
}) => {
  const DefaultIcon = useMemo(() => {
    if (type === "inbox") return DefaultInbox;
    if (type === "folder") return DefaultFolder;
    return DefaultExclamation;
  }, [type]);
  return (
    <div className={`ax-empty ${className ?? ""}`} data-size={size}>
      {icon && (
        <AxIcon
          icon={icon}
          rtlFlip={rtlFlip}
          className={`ax-empty__icon ${iconClassName}`}
        />
      )}
      {!icon && (
        <span className="ax-empty__icon">
          <DefaultIcon />
        </span>
      )}
      {title && <div className="ax-empty__title">{title}</div>}
      {message && <p className="ax-empty__message">{message}</p>}
      <div className="ax-empty__actions">
        {actions.map((action) =>
          cloneElement(action as ReactElement, { type: "link" })
        )}
      </div>
    </div>
  );
};
