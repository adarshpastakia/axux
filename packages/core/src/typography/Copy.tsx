// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useEffect, useState } from "react";
import { AxActionButton } from "../buttons/ActionButton";
import { Size, VFC } from "../types";
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
    <AxActionButton
      size={size}
      onClick={doCopy}
      message="Copied!"
      type="link"
      color="default"
      icon={AppIcons.iconCopy}
    />
  );
};
