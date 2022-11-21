/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import { Format } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputProps } from "../types";
import { Icons } from "../types/icons";
import { FieldWrapper } from "./Wrapper";

export interface FileProps
  extends ElementProps,
    Omit<InputProps<AnyObject>, "file">,
    ChildrenProp {
  /**
   * multiple files
   */
  multiple?: boolean;
  /**
   * show file list for multiple
   */
  showList?: boolean;
}

const FileItem = ({ file }: KeyValue) => {
  return (
    <div className="flex items-center">
      <AxIcon className="text-md" icon={Icons.iconFile} />
      <span>&nbsp;{file.name}&nbsp;</span>
      <span className="text-muted text-xs">({Format.bytes(file.size)})</span>
    </div>
  );
};

// eslint-disable-next-line react/display-name
export const File: FC<FileProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    value,
    placeholder,
    onChange,
    inputRef,
    isInvalid,
    className,
    info,
    error,
    width,
    multiple,
    showList,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    onEnterPressed,
    ...rest
  }: FileProps) => {
    const elRef = useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = useState<KeyValue[]>([]);

    const handleClear = useCallback(() => {
      // @ts-expect-error
      if (elRef.current != null) elRef.current.value = null;
      setFileSelected([]);
      onChange?.(undefined);
    }, [onChange]);
    const handleChange = useCallback(() => {
      // @ts-expect-error
      setFileSelected(Array.from(elRef.current?.files));
      onChange?.(elRef.current?.files);
    }, [onChange]);

    useImperativeHandle(inputRef, () => elRef.current);

    return (
      <Fragment>
        <FieldWrapper
          info={info}
          error={error}
          label={label}
          width={width}
          className={className}
          labelAppend={labelAppend}
          isInvalid={isInvalid}
          isRequired={isRequired}
          disabled={isDisabled}
          onClear={handleClear}
          canClear={allowClear && fileSelected.length > 0}
        >
          <input
            ref={elRef}
            aria-label={label}
            aria-disabled={isDisabled}
            aria-readonly={isReadOnly}
            aria-required={isRequired}
            aria-errormessage={error}
            size={1}
            type="file"
            multiple={multiple}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            data-invalid={isInvalid}
            className="ax-field__input"
            onChange={handleChange}
            autoComplete="off"
            onKeyDown={handleEnter(onEnterPressed)}
            {...rest}
          />
          {children}
        </FieldWrapper>
        {multiple && showList && fileSelected.length > 0 && (
          <div className="p-2 border-2 border-dashed border-primary-500/50 mt-1">
            {fileSelected.map((f, i) => (
              <FileItem key={i} file={f} />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
);
