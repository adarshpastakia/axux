/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Format } from "@axux/utilities";

interface Series {
  id: string;
  name: string;
  value: number;
  data: Array<{ value: number }>;
}
interface SubSeries {
  data: number[];
}
interface ListSeries {
  data: Array<{ value: number[] }>;
}
interface MultiSeries {
  data: Array<[string, number, number]>;
}

export const countRenderer = (opt: KeyValue) => {
  const axis =
    opt.xAxis?.[0].type !== "value" ? opt.xAxis?.[0] : opt.yAxis?.[0];
  const series = opt.series;
  const table = ['<div class="ax-chart__dataCards">'];
  if (axis) {
    table.push(
      ...series.map(
        (s: Series) =>
          `<div><label>${s.name ?? s.id}</label><span>${
            s.data[0]?.value
          }</span></div>`
      )
    );
  } else {
    table.push(
      ...series[0].data.map(
        (s: Series) =>
          `<div><label>${s.name ?? s.id}</label><span>${s.value}</span></div>`
      )
    );
  }
  table.push("</div>");
  return table.join("");
};

export const seriesRenderer = (opt: KeyValue) => {
  const radar = opt.radar?.[0];
  const axis =
    opt.xAxis?.[0].type !== "value" ? opt.xAxis?.[0] : opt.yAxis?.[0];
  const series = opt.series;
  const table = ['<table class="ax-chart__dataTable"><thead><tr><th></th>'];
  table.push(...series.map((s: Series) => `<th>${s.name ?? s.id}</th>`));
  table.push("</tr></thead><tbody>");
  if (axis?.data) {
    axis.data.forEach((ax: string) => {
      table.push(`<tr><th>${ax}</th>`);
      table.push(...series.map((s: SubSeries) => `<td>${s.data[0]}</td>`));
      table.push("</tr>");
    });
  }
  if (radar) {
    radar.indicator.forEach((ax: Series, i: number) => {
      table.push(`<tr><th>${ax.name}</th>`);
      table.push(
        ...series.map(
          (s: ListSeries) =>
            `<td>${(s.data[0] ?? { value: [] }).value[i] ?? 0}</td>`
        )
      );
      table.push("</tr>");
    });
  }
  table.push("</tbody></table>");
  return table.join("");
};

export const timeSeriesRenderer = (opt: KeyValue) => {
  const series = opt.series;
  const table = ['<table class="ax-chart__dataTable"><thead><tr><th></th>'];
  table.push(...series.map((s: Series) => `<th>${s.name ?? s.id}</th>`));
  table.push("</tr></thead><tbody>");
  series[0].data.forEach((ax: AnyObject, i: number) => {
    table.push(`<tr><th>${Format.date(ax[0])}</th>`);
    series.forEach((s: MultiSeries) =>
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      table.push(`<td>${s.data?.[i]?.[1] ?? 0}</td>`)
    );
    table.push("</tr>");
  });
  table.push("</tbody></table>");
  return table.join("");
};

export const activityRenderer = (opt: KeyValue) => {
  const axis = opt.xAxis[0];
  const series = opt.series;
  const table = ['<table class="ax-chart__dataTable"><thead><tr><th></th>'];
  table.push(...series.map((s: Series) => `<th>${s.name ?? s.id}</th>`));
  table.push("</tr></thead><tbody>");
  table.push(
    ...axis.data.map((s: string, i: number) => [
      `<tr><th>${s}</th>`,
      ...series.map(
        (s: MultiSeries) => `<td>${(s.data[i] ?? [])[2] ?? 0}</td>`
      ),
      "</tr>",
    ])
  );
  table.push("</tbody></table>");
  return table.flat(2).join("");
};
