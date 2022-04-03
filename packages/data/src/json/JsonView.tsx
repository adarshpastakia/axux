// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxContent, AxCopy, AxIcon, AxMeter } from "@axux/core";
import { ElementProps, VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay, DateUtils } from "@axux/date";
import { Format, isArray, isBoolean, isEmpty, isNil, isNumber, isObject } from "@axux/utilities";
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export interface JsonViewProps extends ElementProps {
  json: KeyValue;
  sorted?: boolean;
  collapseDefault?: boolean;
  emptyDisplay?: JSX.Element;
  labeler?: (key: string) => string;
  formatter?: (key?: string, value?: AnyObject) => string | JSX.Element;
  copy?: true | string[];
  filters?: true | string[];
  onFilter?: (key: string, value: AnyObject, negate: boolean) => void;
}

interface JsonObjectProps extends Omit<JsonViewProps, "json"> {
  value: AnyObject;
  score?: number;
  propName?: string[];
  label?: string;
}

const JsonValue: VFC<JsonObjectProps> = ({
  value,
  label,
  score,
  propName = [],
  labeler,
  formatter,
  onFilter,
  filters,
  copy
}) => {
  const valueDisplay = useMemo(() => {
    if (isEmpty(value)) return "-";
    if (formatter) {
      const ret = formatter(propName.join("."), value);
      if (!isNil(ret)) return ret;
    }

    if (isNumber(value)) return Format.number(value);
    if (isBoolean(value)) return !!value ? "Yes" : "No";
    if (DateUtils.isValid(value, true))
      return (
        <AxDateDisplay date={DateUtils.parse(value) as AnyObject} format="dd MMM yyyy HH:mm:ss" />
      );

    return value.toString();
  }, [formatter, propName, value]);
  const canFilter = useMemo(
    () =>
      !isEmpty(value) && propName && (filters === true || filters?.includes?.(propName.join("."))),
    [filters, propName, value]
  );
  const labelDisplay = useMemo(() => {
    if (labeler) {
      return labeler(propName.join(".")) ?? label;
    }
    return label;
  }, [label, labeler, propName]);
  const canCopy = useMemo(
    () => !isEmpty(value) && propName && (copy === true || copy?.includes?.(propName?.join("."))),
    [copy, propName, value]
  );
  return (
    <div className="ax-json__property">
      {labelDisplay && <label className="ax-json__label">{labelDisplay}</label>}
      <div className="ax-json__value">
        {onFilter && canFilter && (
          <AxButton.Group>
            <AxButton
              color="primary"
              size="sm"
              type="link"
              icon={AppIcons.iconMagnifyPlus}
              onClick={() => onFilter(propName.join("."), value, false)}
            />
            <AxButton
              color="danger"
              size="sm"
              type="link"
              icon={AppIcons.iconMagnifyMinus}
              onClick={() => onFilter(propName.join("."), value, true)}
            />
          </AxButton.Group>
        )}
        <span>
          <bdi>{valueDisplay}</bdi>
          {canCopy && <AxCopy text={value} />}
        </span>
      </div>
      {!!score && <AxMeter showLabel value={score} color="primary" border />}
    </div>
  );
};

const JsonObject: FC<Pick<JsonObjectProps, "label" | "collapseDefault">> = ({
  label,
  children,
  collapseDefault
}) => {
  const [isOpen, setOpen] = useState(!collapseDefault);
  useEffect(() => {
    setOpen(!collapseDefault);
  }, [collapseDefault]);

  return (
    <div className="ax-json__property">
      <div className="ax-json__label" onClick={() => setOpen(!isOpen)}>
        <AxIcon icon={isOpen ? AppIcons.iconCollapseMinus : AppIcons.iconExpandPlus} />
        <span>{label}</span>
      </div>
      {isOpen && children}
    </div>
  );
};

const JsonProperty: VFC<JsonObjectProps> = ({ value, propName = [], ...props }) => {
  const entries = useMemo(
    () => Object.entries(value).sort(([a], [b]) => (props.sorted ? a.localeCompare(b) : 0)),
    [props.sorted, value]
  );
  const type = useMemo(() => {
    if (isObject(value)) {
      if ("_label_" in value && "_score_" in value) {
        return "score";
      }
      return "object";
    } else if (isArray(value)) {
      return "array";
    } else {
      return "prop";
    }
  }, [value]);
  const getType = useCallback((obj: AnyObject) => {
    if (isObject(obj)) {
      if ("_label_" in obj && "_score_" in obj) {
        return "score";
      }
      return "object";
    } else if (isArray(obj)) {
      return "object";
    } else {
      return "prop";
    }
  }, []);
  const getObjectValue = useCallback((key: string, obj: AnyObject): KeyValue => {
    const entries = Object.entries(obj);
    if (!Array.isArray(obj) && entries.length === 1) {
      return getObjectValue(`${key}.${entries[0][0]}`, entries[0][1]);
    }
    return { label: key, innerObject: obj };
  }, []);

  return (
    <Fragment>
      {entries.map(([key, value]: [string, AnyObject], row) => {
        const innerType = getType(value);
        if (innerType === "object") {
          const { label, innerObject } = getObjectValue(key, value);
          return isObject(innerObject) || isArray(innerObject) ? (
            <JsonObject key={row} label={label} collapseDefault={props.collapseDefault}>
              <JsonProperty
                value={innerObject}
                propName={type === "array" ? propName : [...propName, label]}
                {...props}
              />
            </JsonObject>
          ) : (
            <JsonValue
              key={row}
              label={type === "array" ? "" : key}
              value={innerObject}
              propName={type === "array" ? propName : [...propName, label]}
              {...props}
            />
          );
        } else if (innerType === "prop" || innerType === "score")
          return (
            <JsonValue
              key={row}
              label={type === "array" ? "" : key}
              score={value?._score_}
              value={value._label_ ?? value}
              propName={type === "array" ? propName : [...propName, key]}
              {...props}
            />
          );
      })}
      {entries.length === 0 && <div className="ax-json__property">-</div>}
    </Fragment>
  );
};

export const AxJsonView: VFC<JsonViewProps> = ({ className, emptyDisplay, json, ...props }) => {
  const { t } = useTranslation("data");
  return (
    <div className={`ax-json__view ${className ?? ""}`}>
      {!isEmpty(json) ? (
        <JsonProperty value={json} {...props} />
      ) : (
        emptyDisplay ?? <AxContent.Empty message={t("json.empty")} />
      )}
    </div>
  );
};
