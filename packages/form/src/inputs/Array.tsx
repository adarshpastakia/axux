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
  useImperativeHandle,
  type FC,
  type ReactElement,
  type RefObject,
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
    | Array<ReactElement<ControllerProps>>
    | ((props: { index: number; name: string }) => JSX.Element);
  addLabel?: string;
  fixedList?: boolean;
  arrayRef?: RefObject<{
    addItem: (item: AnyObject) => void;
    removeItem: (idx: number) => void;
  }>;

  onAdd?: () => AnyObject;
}

export const Array: FC<Props> = ({
  name,
  children,
  addLabel,
  fixedList,
  focusName = "",
  onAdd,
  arrayRef,
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

  const handleAdd = useCallback(
    (item: AnyObject) => {
      append(item);
      setTimeout(() => {
        form.setFocus(
          `${name}.${fields.length}${focusName ? "." + focusName : ""}`
        );
      }, 50);
    },
    [name, fields, focusName, onAdd]
  );

  useImperativeHandle(arrayRef, () => ({
    addItem: handleAdd,
    removeItem: remove,
  }));

  return (
    <div>
      <Container {...rest} isVertical>
        {fields.map((item, index) => (
          <Container key={item.id}>
            {typeof children === "function"
              ? children({ index, name: `${name}.${index}` })
              : Children.toArray(children).map((child: AnyObject) =>
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
          <AxButton
            icon={Icons.iconAdd}
            onClick={() => handleAdd(onAdd())}
            variant="outline"
          >
            {addLabel ?? t("addArray")}
          </AxButton>
        </div>
      )}
    </div>
  );
};
