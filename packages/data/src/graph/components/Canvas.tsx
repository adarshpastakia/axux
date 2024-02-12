/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useGraphInternal } from "../context/GraphContext";

export const Canvas = () => {
  const { setContainer } = useGraphInternal();
  return <div className="ax-graph__container" ref={setContainer} />;
};
