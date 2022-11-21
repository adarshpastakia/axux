/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEmpty, isString, tokenize } from "@axux/utilities";
import { FC, Fragment, useMemo } from "react";
import { ElementProps } from "../types";

export interface MarkProps extends ElementProps {
  children: string;
  /**
   * texts to match and mark within
   */
  mark: string | string[];
}

/**
 * Tokenize text with marking texts
 */
export const Mark: FC<MarkProps> = ({ children, className, mark, ...rest }) => {
  /** ***************** tokenize text with mark list *******************/
  const inner = useMemo(() => {
    if (isString(children)) {
      if (!isEmpty(mark)) {
        const tokens = tokenize(children, mark);
        return (
          <Fragment>
            {tokens.map(([start, text], i) => (
              <Fragment key={i}>
                {start ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: start.split("\n").join("<br />"),
                    }}
                  />
                ) : null}
                {text ? <mark className="ax-mark">{text}</mark> : null}
              </Fragment>
            ))}
          </Fragment>
        );
      }
    }
    return children;
  }, [children, mark]);

  /** ***************** component *******************/
  return (
    <span {...rest} className={`ax-mark ${className ?? ""}`}>
      <bdi>{inner}</bdi>
    </span>
  );
};
