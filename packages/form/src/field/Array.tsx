// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { FC, Fragment, MutableRefObject, useImperativeHandle } from "react";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { UseFieldArrayReturn } from "react-hook-form/dist/types/fieldArray";

interface Props {
  name: string;
  arrayRef?: MutableRefObject<UseFieldArrayReturn | undefined>;
  children: (fields: FieldArrayWithId[]) => JSX.Element[];
}

export const AxFieldArray: FC<Props> = ({ name, arrayRef, children }) => {
  const { control } = useFormContext();
  const refReturn = useFieldArray({ name, control });

  useImperativeHandle(arrayRef, () => refReturn);

  return <Fragment>{children(refReturn.fields)}</Fragment>;
};
