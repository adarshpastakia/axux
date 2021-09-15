// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useEffect, useState, VFC } from "react";
import { AxButton } from "../buttons/Button";
import { AxTooltip } from "../overlays/Tooltip";
import { Size } from "../types";
import { AppIcons } from "../types/appIcons";

export interface CopyProps {
  text: string;
  size?: Size;
}

export const AxCopy: VFC<CopyProps> = ({ text, size = "sm" }) => {
  const [copied, setCopied] = useState(false);
  const doCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }, [text]);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  return (
    <AxTooltip content="Copied!" isDisabled={!copied} isOpen={copied} usePortal>
      <AxButton
        size={size}
        onClick={doCopy}
        type={copied ? "solid" : "link"}
        color={copied ? "success" : "default"}
        icon={copied ? AppIcons.iconCheckAll : AppIcons.iconCopy}
      />
    </AxTooltip>
  );
};
