/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isColor, isEmpty, isString, tokenize } from "@axux/utilities";
import { Fragment, useCallback, useMemo, type FC } from "react";
import { type ChildrenProp, type ElementProps } from "../types";

interface AbbrTextProps {
  children: string;
  color?: string;
}

const AbbrText: FC<AbbrTextProps> = ({ color, children, ...rest }) => (
  <abbr
    {...rest}
    className={color}
    style={
      color && isColor(color) ? ({ "--abbr-color": color } as AnyObject) : {}
    }
  >
    {children}
  </abbr>
);

export interface AbbrProps extends ElementProps, ChildrenProp<string> {
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
    [renderer],
  );

  /** ***************** tokenize text with abbr list *******************/
  const inner = useMemo(() => {
    if (isString(children)) {
      if (!isEmpty(abbr)) {
        const tokens = tokenize(
          children,
          abbr.map(([keyword]) => keyword),
        );
        const titles: KeyValue = abbr.reduce(
          (t, [a, tooltip = "", color = ""]) => ({
            ...t,
            [a.toLowerCase()]: { tooltip, color },
          }),
          {},
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
