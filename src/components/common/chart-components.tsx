import type {
  ChartDataPoint,
  ChartEvent,
} from "@/components/common/chart-types";
import { formatTooltipDate } from "@/components/common/chart-utils";

// Custom tooltip component
type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    color?: string;
    payload?: ChartDataPoint;
  }>;
  label?: string;
  events?: ChartEvent[];
  chartData?: ChartDataPoint[];
};

export const CustomTooltip = ({
  active,
  payload,
  events = [],
  chartData = [],
}: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload as ChartDataPoint | undefined;
  if (!data) {
    return null;
  }

  const indexValue =
    payload.find((p) => p.dataKey === "greenLine")?.value ?? data.greenLine;
  const marketValue =
    payload.find((p) => p.dataKey === "redLine")?.value ?? data.redLine;

  // Check if this data point has an associated event
  // Find the event by matching the data point's date/time
  const dataPointIndex = chartData.findIndex(
    (d: ChartDataPoint) => d.date === data.date,
  );
  const event = events.find((e) => e.index === dataPointIndex);

  return (
    <div className="w-fit min-w-[133px] rounded-lg bg-white dark:bg-[#262626] px-3 py-2 text-xs shadow-lg">
      {event && (
        <div className="mb-2 space-y-1">
          <p className="text-black/60 dark:text-white/60">
            {formatTooltipDate(data.date)} — &ldquo;{event.title}&rdquo;
          </p>

          <p className="text-black dark:text-white">
            {event.description} Index jumps {event.impact} instantly.
          </p>
        </div>
      )}

      {!event && (
        <p className="mb-2 text-black dark:text-white">
          {formatTooltipDate(data.date)}
        </p>
      )}

      <div className="space-y-1">
        {indexValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#2d9f75]">
              <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-white" />
            </div>
            <p className="text-black dark:text-white">
              <span className="text-[#7E7E8C] dark:text-white/60">Index:</span> {indexValue.toFixed(1)}
            </p>
          </div>
        )}
        {marketValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#df1c41]">
              <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-white" />
            </div>
            <p className="text-black dark:text-white">
              <span className="text-[#7E7E8C] dark:text-white/60">Market:</span> {marketValue.toFixed(1)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom dot component for event markers - white outline with red center
type CustomDotProps = {
  cx?: number;
  cy?: number;
  index?: number;
  eventIndices?: Set<number>;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  id?: string;
};

export const CustomEventDot = ({
  cx,
  cy,
  index,
  eventIndices,
  onMouseEnter,
  onMouseLeave,
  id,
}: CustomDotProps) => {
  if (
    cx === undefined ||
    cy === undefined ||
    index === undefined ||
    !eventIndices?.has(index)
  ) {
    return null;
  }

  return (
    <g key={id}>
      {/* White outline circle */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={1}
        onMouseEnter={() => {
          // Show event tooltip
          onMouseEnter?.(index);
          // Don't prevent default - allow chart tooltip to also show
        }}
        onMouseLeave={() => {
          // Hide event tooltip
          onMouseLeave?.();
        }}
        style={{ cursor: "pointer" }}
        pointerEvents="all"
      />
      {/* Red center circle */}
      <circle cx={cx} cy={cy} r={3} fill="#FC3970" pointerEvents="none" />
    </g>
  );
};

// Custom cursor component for vertical line
type CursorProps = {
  points?: Array<{ x?: number; y?: number }>;
  coordinate?: { x?: number; y?: number };
  width?: number;
  height?: number;
  layout?: string;
  viewBox?: { x?: number; y?: number; width?: number; height?: number };
};

export const CustomCursor = (props: CursorProps) => {
  const { coordinate, viewBox } = props;

  const x = coordinate?.x;
  if (x === undefined || x === null || !viewBox?.height) {
    return null;
  }

  const { y = 0, height = 0 } = viewBox;

  return <line x1={x} y1={y} x2={x} y2={y + height} />;
};
