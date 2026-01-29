export type TimeRange = "1H" | "6H" | "1D" | "1W" | "1M" | "ALL";
export type ChartTab = "Chart" | "Live Feed" | "Orderbook";
export type Quarter = "1st" | "2nd" | "3rd" | "4th";

export interface ChartEvent {
  index: number;
  time: string;
  title: string;
  description: string;
  impact: string;
}

export interface ChartDataPoint {
  time: string;
  timeLabel: string;
  date: Date;
  redLine: number; // #FC3970 - sharp edges
  blueLine: number; // #25B3FF - dotted, smooth
  greenLine: number; // #16A34A - smooth
  line3?: number; // For live page - #FDB927
  line4?: number; // For live page - #3B87DD
  line5?: number; // For live page - #AD8D46
  line6?: number; // For live page - #21446C
}

export interface PlayData {
  time: string;
  play: string;
  playUpdate: string;
  teamLogo: string;
  score1: number;
  score2: number;
  relevance?: number;
  isPositiveTrend?: boolean;
}

export interface OrderbookEntry {
  price: string;
  size: string;
  barWidth: number; // percentage
}
