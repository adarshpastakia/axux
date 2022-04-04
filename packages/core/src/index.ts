// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

// force-update
const update = "1";

export { COLOR, PALETTE } from "./types/enums";

export { addTranslationBundle } from "./i18n";

export { useAxGlobals } from "./context/Globals";
export { useAxBreadcrumbService } from "./context/BreadcrumbService";
export { useAxResizeObserver } from "./hooks/useResizeObserver";
export { useAxNotificationService } from "./hooks/useNotificationService";
export { useAxContextMenu } from "./hooks/useContextMenu";
export { useAxOverlays } from "./hooks/useOverlays";

// Hotkey
export { AxHotKey } from "./hotkeys/HotKey";
export { AxHotKeyLabel } from "./hotkeys/HotKeyLabel";
export { AxHotKeyWrapper } from "./hotkeys/HotKeyWrapper";
export { AxSpotlight } from "./spotlight/Spotlight";
export type { SpotlightRecord } from "./spotlight/Spotlight";

// Loaders
export { AxAppLoader } from "./loader/AppLoader";
export { AxTextLoader } from "./loader/TextLoader";
export { AxSpinner } from "./loader/Spinner";

// Iconography
export { AxIcon } from "./icons/Icon";
export { AxAvatar } from "./icons/Avatar";

// Typography
export { AxCopy } from "./typography/Copy";
export { AxText } from "./typography/Text";
export { AxLink } from "./typography/Link";
export { AxCallout } from "./panels/Callout";
export { AxHeading } from "./typography/Heading";

// Layout
export { AxBox } from "./layout/Box";
export { AxFlexBox } from "./layout/FlexBox";

// Space breaks
export { AxDivider } from "./divider/Divider";
export { AxSpacer } from "./divider/Spacer";

// Viewport
export { AxViewport } from "./viewport/Viewport";
export { ErrorBoundary as AxError } from "./errorBoundary/ErrorBoundary";

// Page Components
export { AxPage } from "./page/Page";
export { AxSection } from "./page/Section";
export { AxContent } from "./panels/Content";
export { AxPanel } from "./panels/Panel";
export { AxTabPanel } from "./panels/TabPanel";
export { AxModal } from "./overlays/Modal";
export { AxFlyout } from "./overlays/Flyout";
export { AxCollapsable } from "./panels/Collapsable";

// Buttons
export { AxButton } from "./buttons/Button";
export { AxTag } from "./buttons/Tag";
export { AxMenu } from "./menu/Menu";
export type { MenuItemType } from "./menu/MenuItem";

// Overlays
export { AxPopover } from "./overlays/Popover";
export { AxTooltip } from "./overlays/Tooltip";
export { AxContextMenu } from "./overlays/ContextMenu";

// App bars
export { AxMeter } from "./appbars/Meter";
export { AxToolbar } from "./appbars/Toolbar";
export { AxBreadcrumbBar } from "./appbars/Breadcrumbs";

// App controls
export { AxThemeToggle } from "./appControls/ThemeToggle";
export { AxLocalePicker } from "./appControls/LocalePicker";
