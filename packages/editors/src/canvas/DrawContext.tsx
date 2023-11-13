/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { createContext, useContext } from "react";

interface Props {
  renderer?: (props: KeyValue) => AnyObject;
}

const DrawContext = createContext<Props>({});

export const DrawContextProvider = ({ children, ...props }: KeyValue) => {
  return <DrawContext.Provider value={props}>{children}</DrawContext.Provider>;
};

export const useDrawContext = () => useContext(DrawContext);
