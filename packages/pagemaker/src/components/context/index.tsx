/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  type Context,
  createContext,
  type FC,
  type Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getNodeConfig } from "../../utils/dnd";
import { getRawHtml } from "../../utils/getRawHtml";
import {
  type ArtifactObject,
  EnumTypes,
  type IDragObject,
  type IProps,
  type IWidgetObject,
  type PageConfig,
  type PageItem,
} from "../../utils/types";

interface DropObject {
  item: PageItem;
  pos?: number;
  grid?: string;
  id?: string;
}

interface IContext<T = PageItem> {
  isEditing: boolean;
  config: PageConfig;
  widgets: IWidgetObject[];
  artifacts: ArtifactObject[];

  selected?: T;

  refPageEl: Ref<HTMLDivElement>;

  dragging?: AnyObject;
  setDragging: (d?: IDragObject) => void;

  editConfig: (id?: string) => void;
  removeConfig: (id: string) => void;
  addItem: (opt?: DropObject) => void;
  updateConfig: (id: string, key: keyof T, value: AnyObject) => void;

  addWidget: (colId: string) => void;
  editWidget: (widgetId: string) => void;
  findWidget: (widgetId: string) => IWidgetObject | undefined;
  renderWidget: (widgetId: string) => JSX.Element;
}

const findDeep = (
  obj: AnyObject[],
  id: string
): { list: PageItem[]; item: PageItem; index: number } | undefined => {
  const find = obj.find((o) => o.id === id);
  if (find != null) {
    return { list: obj, item: find, index: obj.indexOf(find) };
  } else {
    for (let i = 0; i < obj.length; i++) {
      if ("children" in obj[i] && Array.isArray(obj[i].children)) {
        const _inner = findDeep(obj[i].children, id);
        if (_inner != null) {
          return _inner;
        }
      }
    }
  }
  return undefined;
};

const removeDeep = (obj: AnyObject[], id: string): PageItem[] => {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id === id) {
      return obj.filter((o) => o.id !== id);
    }
    if ("children" in obj[i]) {
      if (Array.isArray(obj[i].children)) {
        obj[i] = {
          ...obj[i],
          children: removeDeep(obj[i].children, id),
        };
      }
    }
  }
  return [...obj];
};

export const PageContext: AnyObject = createContext<IContext>({} as IContext);

export const usePageContext = <T extends PageItem>() =>
  useContext(PageContext as Context<IContext<T>>);

export const ContextProvider: FC<IProps> = ({
  children,
  pageRef,
  onEdit,
  onAdd,
  renderWidget,
  onChange,
  widgets = [],
  artifacts = [],
  isEditing: _isEditing = false,
  config: _config,
}) => {
  const [dragging, setDragging] = useState<IDragObject | undefined>();
  const [selected, setSelected] = useState<PageItem | undefined>();

  const [isEditing, setIsEditing] = useState(_isEditing);
  const [config, setConfig] = useState(_config);

  const refPageEl = useRef<HTMLElement>(null);

  useImperativeHandle(
    pageRef,
    () => ({
      getRaw: async () => {
        if (refPageEl.current) {
          const el = refPageEl.current;
          const currentEditing = !!isEditing;
          return await new Promise((resolve) => {
            setIsEditing(false);
            setTimeout(() => {
              const ret = getRawHtml(el);
              setIsEditing(currentEditing);
              resolve(ret);
            }, 100);
          });
        }
        return await Promise.resolve("");
      },
    }),
    [isEditing]
  );

  useEffect(() => {
    setConfig(_config);
  }, [_config]);
  useEffect(() => {
    setIsEditing(_isEditing);
  }, [_isEditing]);

  const editConfig = (id?: string) => {
    setSelected(id ? findDeep(config, id)?.item : undefined);
  };

  const removeConfig = (id: string) => {
    const newConfig = [...(removeDeep(config, id) as AnyObject)];
    setConfig(newConfig);
    setSelected(undefined);
    onChange?.(newConfig);
  };

  const updateConfig = (id: string, key: keyof PageItem, value: AnyObject) => {
    const _o: AnyObject = findDeep(config, id)?.item;
    if (_o != null) {
      _o[key] = value;
      setSelected({ ..._o });
      setConfig([...config]);
      onChange?.([...config]);
    }
  };

  const addItem = (opt?: DropObject) => {
    if (opt != null) {
      const { id, grid, item, pos } = opt;
      let newConfig = [...config];
      if (item.id !== id) {
        if (item.id) {
          newConfig = removeDeep(newConfig, item.id) as AnyObject;
        }
        if (id) {
          const found = findDeep(newConfig, id);
          if (found) found.list.splice(found.index + (pos ?? 0), 0, item);
        } else if (grid) {
          const found = findDeep(newConfig, grid);
          // @ts-expect-error ignore
          if (found) found.item.children.push(item);
        } else {
          newConfig.push(item);
        }
        setConfig([...newConfig]);
        onChange?.(newConfig);
      }
      setDragging(undefined);
    }
  };

  const addWidget = (colId: string) => {
    onAdd?.((widget) => {
      const newTile = getNodeConfig({
        widgetId: widget.id,
        title: widget.title,
        type: EnumTypes.TILE,
      });
      // @ts-expect-error ignore
      updateConfig(colId, "children", [newTile]);
      setSelected(newTile);
    });
  };

  const editWidget = (widgetId: string) => {
    onEdit?.(widgetId);
  };

  const findWidget = (widgetId: string) => {
    return widgets.find(({ id }) => id === widgetId);
  };

  return (
    <PageContext.Provider
      value={{
        selected,
        isEditing,
        dragging,
        artifacts,
        setDragging,
        editConfig,
        removeConfig,
        updateConfig,
        addItem,
        renderWidget,
        addWidget,
        editWidget,
        findWidget,
        widgets,
        config,
        refPageEl,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
ContextProvider.displayName = "ContextProvider";
