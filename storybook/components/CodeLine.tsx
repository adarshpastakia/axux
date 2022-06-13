// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";

export const CodeLine: FC<{ code: string }> = ({ children, code }) => (
  <div className="ax-container ax-margin--b--lg">
    <div className="ax-row ax-row--middle">
      <div className="ax-col--fill">{children}</div>
      {code && (
        <small>
          &nbsp;<code>{code}</code>
        </small>
      )}
    </div>
  </div>
);
