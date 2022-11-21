/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isColor, isEmpty, isString, tokenize } from "@axux/utilities";
import { FC, forwardRef, Fragment, useCallback, useMemo } from "react";
import { ElementProps } from "../types";

interface AbbrTextProps {
  children: string;
  color?: string;
}

// eslint-disable-next-line react/display-name
const AbbrText = forwardRef<HTMLElement, AbbrTextProps>(
  ({ color, children, ...rest }, ref) => (
    <abbr
      {...rest}
      ref={ref}
      className={color}
      style={color && isColor(color) ? { color } : {}}
    >
      {children}
    </abbr>
  )
);

export interface AbbrProps extends ElementProps {
  children: string;
  /**
   * texts to match and abbreviate within
   *
   * [textPart, tooltip, color (class name or color string)]
   */
  abbr: Array<[textPart: string, tooltip: string, color?: string]>;
  /**
   * renderer callback
   */
  renderer?: (part: string[]) => JSX.Element;
}

/**
 * Tokenize text with abbriviation texts, apply tooltips to all abbrevaition texts
 */
export const Abbr: FC<AbbrProps> = ({
  children,
  className,
  abbr,
  renderer,
  ...rest
}) => {
  /** ***************** abbr text renderer *******************/
  const abbrRender = useCallback(
    (text: string, tooltip: string, color = "") => {
      if (renderer != null) {
        return (
          <span data-tooltip={tooltip} data-tooltip-placement="top">
            {renderer([text, color])}
          </span>
        );
      }
      return (
        <AbbrText
          color={color}
          data-tooltip={tooltip}
          data-tooltip-placement="top"
        >
          {text}
        </AbbrText>
      );
    },
    [renderer]
  );

  /** ***************** tokenize text with abbr list *******************/
  const inner = useMemo(() => {
    if (isString(children)) {
      if (!isEmpty(abbr)) {
        const tokens = tokenize(
          children,
          abbr.map(([keyword]) => keyword)
        );
        const titles: KeyValue = abbr.reduce(
          (t, [a, tooltip = "", color = ""]) => ({
            ...t,
            [a.toLowerCase()]: { tooltip, color },
          }),
          {}
        );
        return (
          <Fragment>
            {tokens.map(([start, text], i) => {
              const { tooltip = "", color = "" } =
                titles[text.toLowerCase()] ?? {};
              return (
                <Fragment key={i}>
                  {start ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: start.split("\n").join("<br />"),
                      }}
                    />
                  ) : null}
                  {text ? abbrRender(text, tooltip, color) : null}
                </Fragment>
              );
            })}
          </Fragment>
        );
      }
    }
    return children;
  }, [children, abbr, abbrRender]);

  /** ***************** component *******************/
  return (
    <span {...rest} className={`ax-abbr ${className ?? ""}`}>
      <bdi>{inner}</bdi>
    </span>
  );
};
