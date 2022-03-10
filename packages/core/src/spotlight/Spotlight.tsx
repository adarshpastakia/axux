// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { debounce } from "@axux/utilities";
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Globals } from "../context/Globals";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import { BadgeType } from "../internals/useBadge";
import { AxBox } from "../layout/Box";
import { AxSpinner } from "../loader/Spinner";
import { AxMenu } from "../menu/Menu";
import { AnchorProps, Color, IconProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxText } from "../typography/Text";

/** @internal */
export interface SpotlightRecord extends AnchorProps, IconProps {
  id: string;
  label: string;
  info?: string;
  group?: string;
  badge?: BadgeType;
  color?: Color;
  appendLabel?: string | JSX.Element;
}

/** @internal */
export interface SpotlightProps {
  defaultItems?: SpotlightRecord[];
  placeholder?: string;
  onSelect?: (id: string) => void;
  onQuery: (query: string) => Promise<SpotlightRecord[]>;
}

/**
 * Spotlight search
 * @constructor
 * @internal
 */
export const AxSpotlight: VFC<SpotlightProps> = ({ defaultItems = [], onQuery, onSelect }) => {
  const { showSpotlight: isOpen, setShowSpotlight: setOpen } = useContext(Globals);
  const refInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<SpotlightRecord[]>();
  const runQuery = useCallback(
    (q: string) => {
      setLoading(true);
      onQuery(q)
        .then(setOptions)
        .then(() => setLoading(false));
    },
    [onQuery]
  );
  const changeQuery = useCallback(
    (str: string) => {
      debounce(() => runQuery(str));
      setQuery(str);
    },
    [runQuery]
  );
  const menuItems = useMemo(() => {
    return (options ?? defaultItems)
      .sort((a, b) => (a.group && b.group ? a.group.localeCompare(b.group) : 1))
      .reduce<KeyValue>(
        (list, { group, ...item }) => ({
          ...list,
          [group ?? ""]: [...(list[group ?? ""] ?? []), item]
        }),
        {}
      );
  }, [defaultItems, options]);
  useEffect(() => {
    setOptions(undefined);
    setQuery("");
  }, [isOpen]);
  return (
    <Fragment>
      <AxHotKey global keyCombo="ctrl+space" handler={() => setOpen(true)} />
      {isOpen && (
        <div className="ax-spotlight" onClick={() => setOpen(false)}>
          <AxHotKey keyCombo="escape" handler={() => setOpen(false)} />
          <div className="ax-spotlight__wrapper">
            <div className="ax-spotlight__search" onClick={(e) => e.stopPropagation()}>
              <AxIcon icon={AppIcons.iconSearch} color="medium" />
              <input
                autoFocus
                ref={refInput}
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
              />
              {!!query && (
                <AxIcon
                  icon={AppIcons.iconClose}
                  onClick={() => [1 && setQuery(""), refInput.current && refInput.current.focus()]}
                />
              )}
              {isLoading && <AxSpinner color="primary" />}
            </div>
            <AxMenu onClick={onSelect}>
              {Object.entries(menuItems).map(([group, items]) => (
                <Fragment key={group}>
                  {group && <AxMenu.Text>{group}</AxMenu.Text>}
                  {items.map((item: AnyObject) => (
                    <AxMenu.Item key={item.id} {...item} mark={query} />
                  ))}
                </Fragment>
              ))}
              {Object.keys(menuItems).length === 0 && (
                <AxBox padding>
                  <AxText color="muted" size="md">
                    No options...
                  </AxText>
                </AxBox>
              )}
            </AxMenu>
          </div>
        </div>
      )}
    </Fragment>
  );
};
AxSpotlight.displayName = "AxSpotlight";
