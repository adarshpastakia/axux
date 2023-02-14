/**
 * react-ranger
 * https://github.com/TanStack/ranger
 */

export const getBoundingClientRect = (element: any) => {
  const rect = element.getBoundingClientRect();
  return {
    top: Math.ceil(rect.top),
    left: Math.ceil(rect.left),
    right: Math.ceil(rect.right),
    width: Math.ceil(rect.width),
    bottom: Math.ceil(rect.bottom),
    height: Math.ceil(rect.height),
  };
};

export const sortNumList = (arr: ReadonlyArray<number | string>) =>
  [...arr].map(Number).sort((a, b) => a - b);

export const linearInterpolator = {
  getPercentageForValue: (val: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  },
  getValueForClientX: (
    clientX: number,
    trackDims: { width: number; left: number; right: number },
    min: number,
    max: number,
    isRtl: boolean
  ) => {
    const { left, right, width } = trackDims;
    const percentageValue = (isRtl ? right - clientX : clientX - left) / width;
    const value = (max - min) * percentageValue;
    return value + min;
  },
  getValueForClientY: (
    clientY: number,
    trackDims: { height: number; bottom: number },
    min: number,
    max: number
  ) => {
    const { height, bottom } = trackDims;
    const percentageValue = (bottom - clientY) / height;
    const value = (max - min) * percentageValue;
    return value + min;
  },
};
