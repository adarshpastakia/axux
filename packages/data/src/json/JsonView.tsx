/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxButton,
  AxCollapsable,
  AxContent,
  AxMeter,
  AxText,
} from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay } from "@axux/date";
import {
  compareValues,
  Format,
  isArray,
  isBoolean,
  isEmpty,
  isNil,
  isNumber,
  isObject,
  isTrue,
} from "@axux/utilities";
import { FC, Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface JsonViewProps extends ElementProps {
  /**
   * json value
   */
  json: AnyObject;
  /**
   * properties to format as dates
   * (default format applied to property name containing `date` | `time`)
   */
  dateProperties?: string[];
  /**
   * enable value copy
   */
  copy?: true | string[];
  /**
   * enable filter callbacks
   */
  filters?: true | string[];
  /**
   * message for empty json
   */
  emptyMessage?: string;
  /**
   * on filter callback
   */
  onFilter?: (key: string, value: AnyObject, negate: boolean) => void;
  /**
   * render function for custom label display
   */
  labeler?: (key: string) => string | undefined;
  /**
   * render function for custom value display
   */
  formatter?: (
    key?: string,
    value?: AnyObject
  ) => string | JSX.Element | undefined;
}

const JsonValue = ({
  prop = "",
  value,
  fullProp,
  copy,
  filters,
  labeler,
  formatter,
  dateProperties,
  onFilter,
}: KeyValue) => {
  const { t } = useTranslation("data");

  const canCopy = useMemo(
    () => isTrue(copy) || copy?.includes?.(fullProp),
    [copy, fullProp]
  );
  const canFilter = useMemo(
    () => isTrue(filters) || filters?.includes?.(fullProp),
    [filters, fullProp]
  );

  const label = useMemo(
    () => labeler?.(fullProp) ?? prop,
    [labeler, fullProp, prop]
  );

  const display = useMemo(() => {
    if (isEmpty(value)) return <label className="ax-json__empty">null</label>;
    const actualValue = value._label_ ?? value;
    if (formatter) {
      let ret = formatter?.(fullProp, value);
      if (!isNil(ret)) return ret;
      return ret;
    }

    let ret = actualValue;
    if (isNumber(actualValue) || /^[+-]?\d+(\.\d+)?$/.test(`${actualValue}`))
      ret = Format.number(actualValue);
    if (isBoolean(actualValue))
      ret = !!actualValue ? t("json.true") : t("json.false");

    if (
      fullProp.toLowerCase().includes("date") ||
      dateProperties?.includes(fullProp)
    ) {
      const dt = Date.parse(value);
      return <AxDateDisplay date={value} />;
    }

    if (actualValue.toString().length > 128) {
      ret = <AxText clip={3}>{actualValue}</AxText>;
    }

    return (
      <Fragment>
        {ret}
        {isObject(value) && <AxMeter size="xs" value={value._score_} />}
      </Fragment>
    );
  }, [value, formatter, dateProperties, prop, fullProp]);

  const filterValue = useMemo(
    () => (isObject(value) ? value._label_ : value),
    [value]
  );

  return (
    <AxCollapsable className="ax-json__value" isCollapsed={false}>
      <label className="ax-json__property--label">
        <span>{label}</span>
        {canCopy && <AxText.Copy text={value} tooltip={t("action.copy")} />}
        {canFilter && (
          <Fragment>
            <AxButton
              style="link"
              color="success"
              icon={AppIcons.iconMagnifyPlus}
              tooltip={t("action.addFilter")}
              onClick={() => onFilter(fullProp, filterValue)}
            />
            <AxButton
              style="link"
              color="danger"
              icon={AppIcons.iconMagnifyMinus}
              tooltip={t("action.addFilterNot")}
              onClick={() => onFilter(fullProp, filterValue, true)}
            />
          </Fragment>
        )}
      </label>
      <div>{display}</div>
    </AxCollapsable>
  );
};

const JsonEmptyObject = ({ type = "object" }) => {
  return (
    <label className="ax-json__empty">
      {type === "object" ? "{empty object}" : "[empty list]"}
    </label>
  );
};

const JsonProperty = ({ prop = "", value, keys = [], ...props }: KeyValue) => {
  const type = useMemo(() => {
    if (isObject(value) && "_label_" in value && "_score_" in value) {
      return "value";
    }
    if (isArray(value)) {
      return "object";
    }
    if (isObject(value)) {
      return "object";
    }
    return "value";
  }, [value]);

  return (
    <div className="ax-json__property">
      {type === "value" && (
        <JsonValue
          prop={prop}
          value={value}
          fullProp={[...keys, prop].join(".")}
          {...props}
        />
      )}
      {type === "object" && (
        <AxCollapsable isCollapsed={false}>
          <label className="ax-json__property--label">
            {props.labeler?.([...keys, prop].join(".")) ?? prop}
          </label>
          <JsonObject json={value} keys={[...keys, prop]} {...props} />
        </AxCollapsable>
      )}
    </div>
  );
};

const JsonObject = ({ json = {}, keys = [], ...props }: KeyValue) => {
  const properties = useMemo(
    () => Object.entries(json).sort(([a], [b]) => compareValues(a, b)),
    [json]
  );

  return (
    <Fragment>
      {properties.map(([key, value]) => (
        <JsonProperty
          key={key}
          prop={key}
          value={value}
          keys={keys}
          {...props}
        />
      ))}
      {properties.length === 0 && (
        <JsonEmptyObject type={isObject(json) ? "object" : "array"} />
      )}
    </Fragment>
  );
};

export const AxJsonView: FC<JsonViewProps> = ({
  className,
  json,
  copy,
  dateProperties,
  filters,
  formatter,
  labeler,
  onFilter,
  emptyMessage,
  ...rest
}) => {
  const { t } = useTranslation("data");
  return (
    <div {...rest} className={`ax-json ${className ?? ""}`}>
      {!isEmpty(json) ? (
        <JsonObject
          json={json}
          {...{ copy, dateProperties, filters, formatter, labeler, onFilter }}
        />
      ) : (
        <AxContent.Empty
          className="text-sm"
          message={emptyMessage ?? t("json.empty")}
        />
      )}
    </div>
  );
};
