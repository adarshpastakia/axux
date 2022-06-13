// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { createContext, FC, useCallback, useContext, useReducer } from "react";
import { Breadcrumb } from "../appbars/Breadcrumbs";

/** @internal */
export interface BreadcrumbContextProps {
  items: Breadcrumb[];
  addItem: (breadcrumb: Breadcrumb) => void;
  clear: () => void;
  actions: JSX.Element[];
  setActions: (...actions: JSX.Element[]) => void;
  clearActions: () => void;
}

/** @internal */
export const BreadcrumbContext = createContext<BreadcrumbContextProps>(
  {} as BreadcrumbContextProps
);

type State = Pick<BreadcrumbContextProps, "items" | "actions">;
type Action =
  | { type: "addItem"; item: Breadcrumb }
  | { type: "clear" }
  | { type: "setActions"; actions: JSX.Element[] }
  | { type: "clearActions" };

const getNewItemList = (items: Breadcrumb[], newItem: Breadcrumb) => {
  const find = items.find(({ to }) => to === newItem.to);
  if (find) {
    return items.slice(0, items.indexOf(find) + 1);
  } else {
    return [...items, newItem];
  }
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        items: getNewItemList(state.items, action.item)
      };
    case "setActions":
      return {
        ...state,
        actions: action.actions
      };
    case "clear":
      return {
        ...state,
        items: []
      };
    case "clearActions":
      return {
        ...state,
        actions: []
      };
    default:
      throw new Error();
  }
};

/** @internal */
export const BreadcrumbProvider: FC = ({ children }) => {
  const [{ items, actions }, dispatch] = useReducer(reducer, { items: [], actions: [] });

  const addItem = useCallback((item: Breadcrumb) => dispatch({ type: "addItem", item }), []);
  const setActions = useCallback(
    (...actions: JSX.Element[]) => dispatch({ type: "setActions", actions }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const clearActions = useCallback(() => dispatch({ type: "clearActions" }), []);

  return (
    <BreadcrumbContext.Provider
      value={{
        items,
        actions,
        setActions,
        clearActions,
        addItem,
        clear
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

/**
 * Breadcrumb service
 * @internal
 */
export const useAxBreadcrumbService = () => useContext(BreadcrumbContext);
