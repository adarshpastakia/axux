/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxAnimation,
  AxIcon,
  useDebounce,
  useResizeObserver,
} from "@axux/core";
import { HotKeyWrapper } from "@axux/core/dist/hotkeys/HotKeyWrapper";
import { getImageColorset } from "@axux/utilities/dist/getImageColorset";
import {
  forwardRef,
  ReactEventHandler,
  RefObject,
  SyntheticEvent,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
} from "react";
import { CanvasRef } from "../canvas/Canvas";
import { Image } from "./Image";
import { Tools } from "./Tools";

import { NsfwOverlay } from "../nsfw/NsfwOverlay";
import { Icons } from "../types/icons";
import { ImageOverlay } from "./ImageOverlay";

type Rotation = 0 | 90 | 180 | 270;

interface ViewerState {
  zoom: number;
  rotate: Rotation;
  isLoading: boolean;
  isLoaded: boolean;
  isErrored: boolean;
  width: number;
  height: number;
}

interface ViewerActions {
  type: "init" | "zoom" | "rotate" | "resize" | "loaded" | "errored";
  payload?: AnyObject;
}

export interface ImageViewerRef extends CanvasRef {
  rotate: (rotation: Rotation) => void;
  zoom: (level: number) => void;
}

export interface ImageViewerProps {
  ref?: RefObject<ImageViewerRef | null>;
  /**
   * image src url
   */
  src: string;
  /**
   * overlay image
   */
  overlaySrc?: string;
  /**
   * show overlay for NSFW content
   */
  isNsfw?: boolean;
  /**
   * onChange layout (zoom/rotate)
   */
  onChange?: (change: "zoom" | "rotate" | "resize") => void;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}

export const AxImageViewer = forwardRef<
  ImageViewerRef | null,
  ImageViewerProps
>(({ src, overlaySrc, isNsfw, onLoad, onError, onChange }, ref) => {
  const canvasRef = useRef<CanvasRef>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [pending, startTransition] = useTransition();

  const changeCallback = useDebounce(onChange);

  const initState = useCallback(
    () =>
      ({
        zoom: 0,
        rotate: 0,
        isLoading: true,
        isLoaded: false,
        isErrored: false,
        width: "100%",
        height: "100%",
      } as AnyObject),
    []
  );

  const calculateSize = useCallback((rotate: number, zoom: number) => {
    const el = containerRef.current;
    const img = imageRef.current;
    if (el && img && img.naturalWidth) {
      const turn = rotate % 180 !== 0;
      let width = turn ? img.naturalHeight : img.naturalWidth;
      let height = turn ? img.naturalWidth : img.naturalHeight;
      if (zoom === 0) {
        const containerWidth = el.offsetWidth - 16;
        const containerHeight = el.offsetHeight - 16;
        // if container ratio is more than image ratio height set to container 100%
        if (containerWidth / containerHeight > width / height) {
          width = width * (containerHeight / height);
          height = containerHeight;
        } else {
          height = height * (containerWidth / width);
          width = containerWidth;
        }
      } else {
        width *= zoom;
        height *= zoom;
      }
      return { width, height };
    }
    return { width: "100%", height: "100%" } as AnyObject;
  }, []);

  const recenter = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({
        top: (el.scrollHeight - (el.offsetHeight - 16)) / 2,
        left: (el.scrollWidth - (el.offsetWidth - 16)) / 2,
      });
    }
  }, []);

  const reducer = useCallback(
    (state: ViewerState, action: ViewerActions) => {
      if (action.type === "init") {
        state = initState();
      }
      if (action.type === "zoom") {
        state.zoom = Math.min(5, Math.max(0, action.payload));
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
        startTransition(() => {
          setTimeout(recenter, 50);
        });
      }
      if (action.type === "rotate") {
        state.rotate =
          action.payload > 270 ? 0 : action.payload < 0 ? 270 : action.payload;
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "resize") {
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "loaded") {
        state.isLoading = false;
        state.isLoaded = true;
        state.isErrored = false;
        state.zoom = 0;
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "errored") {
        state.isErrored = true;
        state.isLoading = false;
      }
      return { ...state };
    },
    [initState]
  );

  const [state, dispatch] = useReducer(
    reducer,
    {
      zoom: 0,
      rotate: 0,
      isLoading: true,
      isLoaded: false,
      isErrored: false,
    },
    initState
  );

  const resizeHandler = useCallback(
    (size: KeyValue) => {
      dispatch({ type: "resize", payload: size });
      state.isLoaded &&
        startTransition(() => {
          changeCallback?.("resize");
        });
    },
    [changeCallback, state.isLoaded]
  );
  const containerRef = useResizeObserver(resizeHandler);

  useImperativeHandle(
    ref,
    () =>
      canvasRef.current
        ? {
            zoom: (zoom: number) =>
              !overlaySrc && dispatch({ type: "zoom", payload: zoom }),
            rotate: (rotation: Rotation) =>
              dispatch({ type: "rotate", payload: rotation }),
            ...canvasRef.current,
          }
        : (null as AnyObject),
    []
  );

  /******************* reset zoom and rotate on change of source *******************/
  useLayoutEffect(() => {
    dispatch({ type: "init" });
    canvasRef.current?.clear();
  }, [src]);
  useLayoutEffect(() => {
    !!overlaySrc && (dispatch({ type: "init" }), canvasRef.current?.clear());
  }, [overlaySrc]);

  const handleLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      dispatch({ type: "loaded" });
      startTransition(() => {
        const colorset = imageRef.current && getImageColorset(imageRef.current);
        colorset &&
          containerRef.current?.parentElement &&
          (containerRef.current.parentElement.dataset.colorset = colorset);
        onLoad?.(e);
      });
    },
    [onLoad]
  );
  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      dispatch({ type: "errored" });
      startTransition(() => onError?.(e));
    },
    [onError]
  );

  const disableTools = useMemo(
    () => state.isLoading || !!state.isErrored,
    [state, overlaySrc]
  );

  const handleZoom = useCallback(
    (zoom: number) => {
      dispatch({ type: "zoom", payload: zoom });
      state.isLoaded &&
        startTransition(() => {
          changeCallback("zoom");
        });
    },
    [changeCallback, state.isLoaded]
  );
  const handleRotate = useCallback(
    (rotate: number) => {
      dispatch({ type: "rotate", payload: rotate });
      state.isLoaded &&
        startTransition(() => {
          changeCallback("rotate");
        });
    },
    [changeCallback, state.isLoaded]
  );

  return (
    <HotKeyWrapper>
      <div
        className="ax-media"
        data-error={state.isErrored}
        onContextMenuCapture={(e) => e.preventDefault()}
      >
        <div
          className="ax-media__container ax-image__scroller"
          ref={containerRef}
        >
          <Image
            src={src}
            imageRef={imageRef}
            canvasRef={canvasRef}
            onLoad={handleLoad}
            onError={handleError}
            width={state.width}
            height={state.height}
            rotate={state.rotate}
          />
        </div>

        {overlaySrc && (
          <ImageOverlay
            src={overlaySrc}
            width={state.width}
            height={state.height}
            rotate={state.rotate}
            onLoad={handleLoad}
            onError={handleError}
            containerWidth={containerRef.current?.offsetWidth}
            containerHeight={containerRef.current?.offsetHeight}
          />
        )}

        <Tools
          disableZoom={!!overlaySrc}
          isDisabled={disableTools}
          zoom={state.zoom}
          rotate={state.rotate}
          onZoom={handleZoom}
          onRotate={handleRotate}
        />

        {state.isLoading && (
          <div className="ax-media__overlay">
            <AxAnimation.Bars />
          </div>
        )}
        {state.isErrored && (
          <div className="ax-media__overlay">
            <AxIcon size={48} icon={Icons.iconImage} />
          </div>
        )}
        {isNsfw && <NsfwOverlay isNsfw={isNsfw} />}
      </div>
    </HotKeyWrapper>
  );
});
