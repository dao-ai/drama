import { estimate, toCsv, type EstimateInput } from "./estimate";

export function todayParts() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    iso: get("year") + get("month") + get("day"),
    cn: `${get("year")} 年 ${get("month")} 月 ${get("day")} 日`,
  };
}

export function downloadEstimateCsv(input: EstimateInput) {
  const r = estimate(input);
  const blob = new Blob([toCsv(input, r)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "manju-estimate.csv";
  a.click();
  URL.revokeObjectURL(url);
}
