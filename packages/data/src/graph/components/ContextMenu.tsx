/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */
import ReactDOM from "react-dom/client";

const ContextMenuComponent = (e: AnyObject) => {
  return (
    <div className="ax-graph__menu">
      <div className="ax-graph__menu-item" data-id="delete">
        Delete
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
      <div className="ax-graph__menu-item" data-id="add">
        Add
      </div>
    </div>
  );
};

export const ContextMenu = (container: HTMLDivElement, item: AnyObject) => {
  const root = ReactDOM.createRoot(container);
  console.log(item);
  root.render(<ContextMenuComponent item={item} />);
};
