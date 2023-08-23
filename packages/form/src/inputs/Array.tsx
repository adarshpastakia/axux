/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { type ElementProps } from "@axux/core/dist/types";
import {
  Children,
  cloneElement,
  useCallback,
  type FC,
  type ReactElement,
} from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { type ControllerProps } from "../form/Form";
import { Icons } from "../types/icons";
import { Container, type ContainerProps } from "./Container";

export interface Props
  extends ElementProps,
    Omit<ContainerProps, "children" | "isVertical"> {
  /**
   * field name
   */
  name: string;
  focusName?: string;
  children:
    | ReactElement<ControllerProps>
    | Array<ReactElement<ControllerProps>>;
  addLabel?: string;
  fixedList?: boolean;

  onAdd?: () => AnyObject;
}

export const Array: FC<Props> = ({
  name,
  children,
  addLabel,
  fixedList,
  focusName = "",
  onAdd,
  ...rest
}) => {
  const { t } = useTranslation("form");
  const form = useFormContext();

  if (!form?.control)
    throw new Error("AxField.Array must be contained within a AxForm element");

  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
  });

  const handleAdd = useCallback(() => {
    append(onAdd?.());
    setTimeout(() => {
      form.setFocus(
        `${name}.${fields.length}${focusName ? "." + focusName : ""}`
      );
    }, 50);
  }, [name, fields, focusName, onAdd]);

  return (
    <div>
      <Container {...rest} isVertical>
        {fields.map((item, index) => (
          <Container key={item.id}>
            {Children.toArray(children).map((child: AnyObject) =>
              cloneElement(child, {
                name: `${name}.${index}${
                  child.props.name ? "." + (child.props.name as string) : ""
                }`,
              })
            )}
            {!fixedList && (
              <AxButton
                icon={Icons.iconDelete}
                color="danger"
                variant="link"
                onClick={() => remove(index)}
              />
            )}
          </Container>
        ))}
      </Container>
      {!fixedList && onAdd && (
        <div className="flex justify-end">
          <AxButton icon={Icons.iconAdd} onClick={handleAdd} variant="outline">
            {addLabel ?? t("addArray")}
          </AxButton>
        </div>
      )}
    </div>
  );
};
