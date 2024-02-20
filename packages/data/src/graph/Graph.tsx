/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { ActionBrush } from "./components/ActionBrush";
import { ActionClear } from "./components/ActionClear";
import { ActionDelete } from "./components/ActionDelete";
import { ActionExpand } from "./components/ActionExpand";
import { ActionGroup } from "./components/ActionGroup";
import { ActionHilight } from "./components/ActionHilight";
import { ActionLayout } from "./components/ActionLayout";
import { ActionZoom } from "./components/ActionZoom";
import { Legend } from "./components/Legend";
import { Toolbar } from "./components/Toolbar";
import { GraphProvider } from "./context/GraphContext";
import { type GraphProps } from "./types";

const EmptyIcon = () => (
  <svg
    version="1.1"
    className="text-8xl"
    viewBox="0 0 504.32 504.32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(1 3)">
      <path
        className="fill-primary-500/50"
        d="M472.6,172.36c14.507,0,25.6,11.093,25.6,25.6c0,14.507-11.093,25.6-25.6,25.6
		c-14.507,0-25.6-11.093-25.6-25.6C447,183.453,458.093,172.36,472.6,172.36z M250.733,18.76c14.507,0,25.6,11.093,25.6,25.6
		s-11.093,25.6-25.6,25.6c-14.507,0-25.6-11.093-25.6-25.6S236.227,18.76,250.733,18.76z M387.267,428.36
		c14.507,0,25.6,11.093,25.6,25.6s-11.093,25.6-25.6,25.6c-14.507,0-25.6-11.093-25.6-25.6c0-8.533,4.267-16.213,10.24-20.48
		C376.173,430.067,381.293,428.36,387.267,428.36z M28.867,172.36c14.507,0,25.6,11.093,25.6,25.6c0,14.507-11.093,25.6-25.6,25.6
		s-25.6-11.093-25.6-25.6C3.267,183.453,14.36,172.36,28.867,172.36z M114.2,428.36c14.507,0,25.6,11.093,25.6,25.6
		s-11.093,25.6-25.6,25.6s-25.6-11.093-25.6-25.6S99.693,428.36,114.2,428.36z"
      />
      <circle
        className="fill-primary-500/20"
        cx="250.733"
        cy="266.227"
        r="119.067"
      />
    </g>
    <path
      className="fill-bw-500/50"
      d="M388.267,486.827c-16.213,0-29.867-13.653-29.867-29.867c0-8.533,3.413-15.36,8.533-20.48
	l-16.213-18.773c-0.853-0.853-0.853-1.707-0.853-2.56c0-0.853,0.853-2.56,1.707-3.413c1.707-1.707,4.267-1.707,5.973,0.853
	l16.213,19.627c4.267-2.56,9.387-3.413,14.507-3.413c16.213,0,29.867,13.653,29.867,29.867S404.48,486.827,388.267,486.827z
	 M375.467,439.893c-5.12,4.267-8.533,10.24-8.533,17.067c0,11.947,9.387,21.333,21.333,21.333c11.947,0,21.333-9.387,21.333-21.333
	c0-11.947-9.387-21.333-21.333-21.333C383.147,435.627,378.88,437.333,375.467,439.893L375.467,439.893z M115.2,486.827
	c-16.213,0-29.867-13.653-29.867-29.867s13.653-29.867,29.867-29.867c5.12,0,9.387,0.853,13.653,3.413l17.067-19.627
	c1.707-1.707,4.267-1.707,5.973,0c0.853,0.853,1.707,1.707,1.707,3.413c0,0.853,0,1.707-0.853,2.56L135.68,436.48
	c5.973,5.12,9.387,12.8,9.387,21.333C145.067,473.173,131.413,486.827,115.2,486.827z M115.2,435.627
	c-11.947,0-21.333,9.387-21.333,21.333c0,11.947,9.387,21.333,21.333,21.333s21.333-9.387,21.333-21.333
	C136.533,445.013,127.147,435.627,115.2,435.627z M251.733,418.56L251.733,418.56L251.733,418.56L251.733,418.56L251.733,418.56
	L251.733,418.56c-82.773,0-149.333-67.413-149.333-149.333c0-2.56,0-5.973,0-8.533c0-2.56,2.56-4.267,4.267-4.267
	c2.56,0,4.267,2.56,4.267,4.267c0,2.56,0,5.12,0,8.533c0,73.387,56.32,133.973,128,139.947
	c-16.213-14.507-47.787-46.08-61.44-93.013h-29.867c-2.56,0-4.267-1.707-4.267-4.267s1.707-4.267,4.267-4.267h28.16
	c-2.56-11.947-4.267-24.747-4.267-38.4c0-13.653,1.707-26.453,4.267-38.4h-62.293h-0.853c-0.853,0-0.853,0-1.707-0.853
	c-0.853,0-0.853-0.853-1.707-0.853c0-0.853-0.853-0.853-0.853-1.707c0-0.853,0-0.853,0-1.707v-0.853
	c18.773-63.147,76.8-104.96,142.507-104.96l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0c81.92,0,149.333,67.413,149.333,149.333
	c0,2.56,0,5.973,0,8.533c0,2.56-2.56,4.267-4.267,4.267c-2.56,0-4.267-2.56-4.267-4.267c0-2.56,0-5.12,0-8.533
	c0-73.387-56.32-133.973-128-139.947c16.213,14.507,47.787,46.08,61.44,93.013h29.867c2.56,0,4.267,1.707,4.267,4.267
	c0,2.56-1.707,4.267-4.267,4.267h-28.16c2.56,11.947,4.267,24.747,4.267,38.4s-1.707,26.453-4.267,38.4h62.293h0.853
	c0.853,0,0.853,0,1.707,0.853c0.853,0,0.853,0.853,1.707,0.853c0,0.853,0.853,0.853,0.853,1.707c0,0.853,0,0.853,0,1.707v0.853
	C375.467,375.893,318.293,418.56,251.733,418.56L251.733,418.56L251.733,418.56L251.733,418.56z M325.973,316.16
	c-13.653,46.933-45.227,79.36-61.44,93.013C320,404.053,366.08,368.213,384,316.16H325.973z M256,316.16v89.6
	c14.507-11.093,46.933-41.813,61.44-89.6H256z M186.027,316.16c14.507,46.933,46.933,77.653,61.44,89.6v-89.6H186.027z M256,307.627
	h64c2.56-11.947,4.267-24.747,4.267-38.4c0-13.653-1.707-26.453-4.267-38.4h-64V307.627z M183.467,307.627h64v-76.8h-64
	c-2.56,11.947-4.267,24.747-4.267,38.4C179.2,282.88,180.907,295.68,183.467,307.627z M256,222.293h61.44
	c-14.507-46.933-46.933-77.653-61.44-89.6V222.293z M186.027,222.293h61.44v-89.6C232.96,144.64,200.533,175.36,186.027,222.293z
	 M118.613,222.293h58.027c13.653-46.933,45.227-79.36,61.44-93.013C183.467,133.547,137.387,170.24,118.613,222.293z M473.6,230.827
	c-11.093,0-21.333-6.827-26.453-16.213l-18.773,7.68c-2.56,0.853-4.267,0-5.12-2.56c0-0.853,0-0.853,0-1.707
	c0-1.707,0.853-3.413,2.56-4.267l19.627-7.68c0-1.707-0.853-4.267-0.853-5.973c0-16.213,13.653-29.867,29.867-29.867
	s29.867,13.653,29.867,29.867S489.813,230.827,473.6,230.827z M453.12,208.64c2.56,8.533,11.093,13.653,20.48,13.653
	c11.947,0,21.333-9.387,21.333-21.333c0-11.947-9.387-21.333-21.333-21.333c-11.947,0-21.333,9.387-21.333,21.333
	C452.267,203.52,452.267,206.08,453.12,208.64C453.12,207.787,453.12,207.787,453.12,208.64
	C453.12,207.787,453.12,207.787,453.12,208.64z M29.867,230.827C13.653,230.827,0,217.173,0,200.96s13.653-29.867,29.867-29.867
	s29.867,13.653,29.867,29.867c0,1.707,0,4.267-0.853,5.973l19.627,7.68c1.707,0.853,2.56,2.56,2.56,4.267c0,0.853,0,0.853,0,1.707
	c-0.853,2.56-3.413,3.413-5.12,2.56l-19.627-7.68C51.2,224,40.96,230.827,29.867,230.827z M29.867,179.627
	c-11.947,0-21.333,9.387-21.333,21.333c0,11.947,9.387,21.333,21.333,21.333c9.387,0,17.067-5.973,20.48-13.653l0,0l0,0
	c0.853-2.56,0.853-4.267,0.853-6.827C51.2,189.013,41.813,179.627,29.867,179.627z M251.733,98.56c-2.56,0-4.267-1.707-4.267-4.267
	V77.227c-14.507-1.707-25.6-14.507-25.6-29.867c0-16.213,13.653-29.867,29.867-29.867S281.6,31.147,281.6,47.36
	c0,15.36-11.093,27.307-25.6,29.867v17.067C256,96.853,254.293,98.56,251.733,98.56z M251.733,26.027
	c-11.947,0-21.333,9.387-21.333,21.333s9.387,21.333,21.333,21.333c11.947,0,21.333-9.387,21.333-21.333
	S263.68,26.027,251.733,26.027z"
    />
  </svg>
);

export const AxGraph: FC<GraphProps> & {
  Toolbar: typeof Toolbar;
  Legend: typeof Legend;
  ActionGroup: typeof ActionGroup;
  ActionBrush: typeof ActionBrush;
  ActionClear: typeof ActionClear;
  ActionDelete: typeof ActionDelete;
  ActionExpand: typeof ActionExpand;
  ActionHilight: typeof ActionHilight;
  ActionLayout: typeof ActionLayout;
  ActionZoom: typeof ActionZoom;
  EmptyIcon: typeof EmptyIcon;
} = (props) => {
  return <GraphProvider {...props} />;
};

AxGraph.Toolbar = Toolbar;
AxGraph.Legend = Legend;
AxGraph.ActionGroup = ActionGroup;
AxGraph.ActionBrush = ActionBrush;
AxGraph.ActionClear = ActionClear;
AxGraph.ActionHilight = ActionHilight;
AxGraph.ActionDelete = ActionDelete;
AxGraph.ActionExpand = ActionExpand;
AxGraph.ActionLayout = ActionLayout;
AxGraph.ActionZoom = ActionZoom;
AxGraph.EmptyIcon = EmptyIcon;
