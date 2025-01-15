import { useMemo } from "react";
import { BaseChart } from "./BaseChart.tsx";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

export const COLOR_MAP = {
  CPU: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  RAM: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};

export function Chart(props: ChartProps) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  const currentPercentage = props.data[props.data.length - 1] * 100 || 0;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: color.stroke,
          fontSize: "18px",
          fontWeight: "medium",
          fontFamily: "sans-serif",
        }}
      >
        {`${currentPercentage.toFixed(1)}%`}
      </div>
    </div>
  );
}
