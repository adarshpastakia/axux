// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isColor, isEmpty, isString, tokenize } from "@axux/utilities";
import { FC, forwardRef, Fragment, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { ElementProps } from "../types";

export interface AbbrProps {
  tooltip: string;
  color?: string;
}

const Abbr: FC<AbbrProps> = ({ tooltip, color, children }) => (
  <AxTooltip content={tooltip}>
    <abbr className={`ax-abbr ax-color--${color}`} style={color && isColor(color) ? { color } : {}}>
      {children}
    </abbr>
  </AxTooltip>
);

/** @internal */
export interface AbbrTextProps extends ElementProps {
  /**
   * Tooltip for text
   */
  abbr?: [textPart: string, tooltip: string, color?: string][];

  abbrRenderer?: (part: string[]) => JSX.Element;
}

/**
 * Text block for applying various stylings to textual content
 * @param children
 * @param className
 * @param abbr
 * @param aria-*
 * @constructor
 * @internal
 */
export const AbbrText: FC<AbbrTextProps> = forwardRef<HTMLSpanElement, AbbrTextProps>(
  ({ children, className, abbr, abbrRenderer, ...aria }, ref) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => textRef.current as HTMLSpanElement);

    const abbrRender = useCallback(
      (text: string, tooltip: string, color = "") => {
        if (abbrRenderer) {
          return abbrRenderer([text, tooltip, color]);
        }
        return (
          <Abbr tooltip={tooltip} color={color}>
            {text}
          </Abbr>
        );
      },
      [abbrRenderer]
    );

    const inner = useMemo(() => {
      if (isString(children)) {
        if (!isEmpty(abbr)) {
          const tokens = tokenize(
            children,
            abbr.map(([keyword]) => keyword)
          );
          const titles: KeyValue = abbr.reduce(
            (t, [a, tooltip = "", color = ""]) => ({ ...t, [a.toLowerCase()]: { tooltip, color } }),
            {}
          );
          return (
            <Fragment>
              {tokens.map(([start, text], i) => {
                const { tooltip = "", color = "" } = titles[text.toLowerCase()] ?? {};
                return (
                  <Fragment key={i}>
                    {start ? (
                      <span
                        dangerouslySetInnerHTML={{ __html: start.split("\n").join("<br />") }}
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

    return (
      <Fragment>
        <span className={`ax-text ${className ?? ""}`} {...aria} ref={textRef}>
          {inner}
        </span>
      </Fragment>
    );
  }
);
