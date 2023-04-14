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
import { type ElementProps } from "@axux/core/dist/types";
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
import { type FC, Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface JsonViewProps extends ElementProps {
  /**
   * json value
   */
  json: AnyObject;
  /**
   * display inline
   */
  isInline?: boolean;
  /**
   * label fixed width when using inline
   */
  labelWidth?: number | string;
  /**
   * display object properties as tree
   * @default true
   */
  showPropertyTree?: boolean;
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
  isInline,
  labelWidth,
  showPropertyTree,
}: KeyValue) => {
  const { t } = useTranslation("data");

  const propWithoutOrdinal = useMemo(
    () => fullProp.replace(/\.\d*\./, "."),
    [fullProp]
  );

  const canCopy = useMemo(
    () =>
      isTrue(copy) ||
      copy?.includes?.(prop) ||
      copy?.includes?.(propWithoutOrdinal),
    [copy, prop, propWithoutOrdinal]
  );
  const canFilter = useMemo(
    () =>
      isTrue(filters) ||
      filters?.includes?.(prop) ||
      filters?.includes?.(propWithoutOrdinal),
    [filters, prop, propWithoutOrdinal]
  );

  const label = useMemo(
    () => (labeler?.(propWithoutOrdinal) ?? showPropertyTree ? prop : fullProp),
    [labeler, fullProp, prop, propWithoutOrdinal, showPropertyTree]
  );

  const display = useMemo(() => {
    if (isEmpty(value)) return <label className="ax-json__empty">null</label>;
    const actualValue = value._label_ ?? value;
    if (formatter) {
      const ret = formatter?.(fullProp, value);
      if (!isNil(ret)) return ret;
      return ret;
    }

    let ret = actualValue;
    if (isNumber(actualValue)) ret = Format.number(actualValue);
    if (isBoolean(actualValue))
      ret = actualValue ? t("json.true") : t("json.false");

    if (
      fullProp.toLowerCase().includes("date") ||
      dateProperties?.includes(fullProp)
    ) {
      return <AxDateDisplay date={value} />;
    }

    if (isArray(actualValue)) {
      ret = `[${actualValue.join(", ")}]`;
    }

    if (ret.length > 128) {
      ret = <AxText clip={3}>{ret}</AxText>;
    }

    return (
      <Fragment>
        {ret}
        {isObject(value) && value._score_ > 0 && (
          <AxMeter size="xs" value={value._score_} />
        )}
      </Fragment>
    );
  }, [value, formatter, dateProperties, prop, fullProp]);

  const filterValue = useMemo(
    () => (isObject(value) ? value._label_ : value),
    [value]
  );

  return (
    <AxCollapsable
      className="ax-json__value"
      isCollapsed={false}
      isDisabled={isInline}
      data-inline={isInline}
    >
      <label className="ax-json__property--label" style={{ width: labelWidth }}>
        <span>{label}</span>
        {canCopy && <AxText.Copy text={value} tooltip={t("action.copy")} />}
        {canFilter && (
          <Fragment>
            <AxButton
              variant="link"
              color="success"
              icon={AppIcons.iconMagnifyPlus}
              tooltip={t("action.addFilter")}
              onClick={() => onFilter(fullProp, filterValue)}
            />
            <AxButton
              variant="link"
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

const JsonEmptyObject = ({ type = "object" }: { type?: string }) => {
  return (
    <label className="ax-json__empty">
      {type === "object" ? "{empty object}" : "[empty list]"}
    </label>
  );
};

const JsonProperty = ({
  prop = "",
  value,
  keys = [],
  showPropertyTree,
  ...props
}: KeyValue) => {
  const type = useMemo(() => {
    if (isObject(value) && "_label_" in value && "_score_" in value) {
      return "value";
    }
    if (isArray(value)) {
      return isObject(value[0]) ? "object" : "value";
    }
    if (isObject(value)) {
      return "object";
    }
    return "value";
  }, [value]);

  const empty = useMemo(() => isEmpty(value), [value]);

  return (
    <div className="ax-json__property">
      {type === "value" && (
        <JsonValue
          {...props}
          prop={prop}
          value={value}
          fullProp={[...keys, prop].join(".")}
          showPropertyTree={showPropertyTree}
        />
      )}
      {(showPropertyTree || empty) && type === "object" && (
        <AxCollapsable isCollapsed={false}>
          <label className="ax-json__property--label">
            {props.labeler?.([...keys, prop].join(".")) ?? prop}
          </label>
          <JsonObject
            {...props}
            json={value}
            keys={[...keys, prop]}
            showPropertyTree={showPropertyTree}
          />
        </AxCollapsable>
      )}
      {!showPropertyTree && !empty && type === "object" && (
        <JsonObject
          {...props}
          json={value}
          keys={[...keys, prop]}
          showPropertyTree={showPropertyTree}
        />
      )}
    </div>
  );
};

const JsonObject = ({ json = {}, keys = [], ...props }: KeyValue) => {
  const properties = useMemo(
    () => Object.entries(json).sort(([a], [b]) => compareValues()(a, b)),
    [json]
  );

  return (
    <Fragment>
      {properties.map(([key, value]) => (
        <JsonProperty
          {...props}
          key={key}
          prop={isObject(json) ? key : `[${key}]`}
          value={value}
          keys={keys}
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
  isInline,
  labelWidth,
  formatter,
  labeler,
  onFilter,
  emptyMessage,
  showPropertyTree = true,
  ...rest
}) => {
  const { t } = useTranslation("data");
  return (
    <div {...rest} className={`ax-json ${className ?? ""}`}>
      {!isEmpty(json) ? (
        <JsonObject
          json={json}
          {...{
            copy,
            dateProperties,
            filters,
            formatter,
            labeler,
            onFilter,
            isInline,
            labelWidth,
            showPropertyTree,
          }}
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
