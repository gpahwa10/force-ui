"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

interface IndexWeightMetric {
  metric: string;
  description: string;
  weight: string;
  current: number | string;
  trend: number;
}

interface IndexWeightsProps {
  metrics?: IndexWeightMetric[];
}

interface metricData {
  metric: string;
  description: string;
  metricValue: string;
}

const MetricInfoData: metricData[] = [
  {
    metric: "Baseline Value",
    description: "Average over last 30 days",
    metricValue: "25.1",
  },
  {
    metric: "Average (Period)",
    description: "Current selected time range",
    metricValue: "27.4",
  },
  {
    metric: "Standard Deviation (Period)",
    description: "Game-to-game scrolling volatility.",
    metricValue: "3.2",
  },
  {
    metric: "Relevance",
    description: "Strong impact on overall index score.",
    metricValue: "High(0.68)",
  },
];

const defaultMetrics: IndexWeightMetric[] = [
  {
    metric: "Points per Game (PPG)",
    description: "Average points scored per game this season.",
    weight: "45%",
    current: 27.4,
    trend: 3.2,
  },
  {
    metric: "Assists per Game (APG)",
    description: "Average assists per game — measures playmaking impact.",
    weight: "15%",
    current: 8.2,
    trend: -3.2,
  },
  {
    metric: "Rebounds per Game (RPG)",
    description: "Total rebounds per game (offensive + defensive).",
    weight: "15%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Steals per Game (SPG)",
    description: "Defensive pressure and possession gains.",
    weight: "10%",
    current: 7.6,
    trend: -3.2,
  },
  {
    metric: "Blocks per Game (BPG)",
    description: "Defensive pressure and possession gains.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Turnovers per Game (TOPG)",
    description: "Ball-handling control — lower is better.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Field Goal % (FG%)",
    description: "Overall shooting efficiency.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "3-Point % (3P%)",
    description: "Efficiency from beyond the arc.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Free Throw % (FT%)",
    description: "Reliability at the line.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
];

export default function IndexWeights({
  metrics = defaultMetrics,
}: IndexWeightsProps) {
  return (
    <>
      <div className="bg-elevation-card mb-[16px] flex flex-col gap-1 rounded-[20px] p-[10px] last:mb-0 sm:p-[14px] md:p-[16px]">
        <h1 className="text-text-primary px-2 pt-2 text-[13px] leading-none font-medium tracking-[-0.01em]">
          Index Weight
        </h1>
        <div className="bg-elevation-bg mt-4 w-full overflow-x-auto rounded-[14px] px-1">
          <Table className="w-full min-w-full table-auto border-separate border-spacing-y-1 !px-0">
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                  Time
                </TableHead>
                <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Play
                </TableHead>
                <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Weight
                </TableHead>
                <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Current
                </TableHead>
                <TableHead className="text-text-secondary border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Trend
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric, index) => {
                const isPositive = metric.trend >= 0;
                return (
                  <TableRow
                    key={index}
                    className="mb-0 overflow-hidden border-0 text-[12px] font-medium transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white"
                  >
                    <TableCell className="bg-elevation-card text-text-primary rounded-tl-[10px] rounded-bl-[10px] px-4 py-3">
                      {metric.metric}
                    </TableCell>
                    <TableCell className="text-text-secondary font-mediumxs bg-elevation-card px-4 py-3">
                      {metric.description}
                    </TableCell>
                    <TableCell className="bg-elevation-card text-text-primary px-4 py-3">
                      {metric.weight}
                    </TableCell>
                    <TableCell className="bg-elevation-card text-text-primary px-4 py-3">
                      {metric.current}
                    </TableCell>
                    <TableCell
                      className={`bg-elevation-card px-4 py-3 ${isPositive ? "text-light-green" : "text-neon-pink"} rounded-tr-[10px] rounded-br-[10px]`}
                    >
                      <div className="flex flex-row items-center gap-1">
                        {isPositive ? (
                          <Image
                            src="/icons/arrow_up.png"
                            alt="arrow-up"
                            width={12}
                            height={16}
                          />
                        ) : (
                          <Image
                            src="/icons/arrow_down.png"
                            alt="arrow-down"
                            width={12}
                            height={16}
                          />
                        )}
                        {isPositive ? "+" : ""}
                        {metric.trend}%
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="ml-2 flex h-[14px] w-[14px] shrink-0 cursor-pointer items-center justify-center rounded-full">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-[#AAAABD] dark:text-[#2C2C33]"
                              >
                                <path
                                  d="M6.66668 13.3386C2.98468 13.3386 9.51423e-06 10.354 9.19234e-06 6.67196C-0.00137558 4.92164 0.685645 3.24099 1.91274 1.99286C3.13984 0.744731 4.80857 0.0292502 6.55866 0.000891562C8.30875 -0.0274671 9.99978 0.633571 11.2667 1.84129C12.5336 3.04901 13.2747 4.70652 13.33 6.45596L13.3333 6.67196L13.3307 6.85862C13.232 10.454 10.2867 13.3386 6.66668 13.3386ZM6.66001 4.67196L6.74468 4.66729C6.90671 4.64802 7.05605 4.56999 7.1644 4.44798C7.27275 4.32597 7.3326 4.16847 7.3326 4.00529C7.3326 3.84211 7.27275 3.68461 7.1644 3.5626C7.05605 3.44059 6.90671 3.36256 6.74468 3.34329L6.66668 3.33862L6.58201 3.34329C6.41998 3.36256 6.27064 3.44059 6.16228 3.5626C6.05393 3.68461 5.99409 3.84211 5.99409 4.00529C5.99409 4.16847 6.05393 4.32597 6.16228 4.44798C6.27064 4.56999 6.41998 4.64802 6.58201 4.66729L6.66001 4.67196ZM6.66668 10.0053C6.82997 10.0053 6.98757 9.94532 7.10959 9.83681C7.23161 9.72831 7.30957 9.57879 7.32868 9.41662L7.33334 9.33862L7.33334 6.67196L7.32868 6.59396C7.3094 6.43192 7.23137 6.28259 7.10937 6.17423C6.98736 6.06588 6.82985 6.00603 6.66668 6.00603C6.5035 6.00603 6.34599 6.06588 6.22399 6.17423C6.10198 6.28259 6.02395 6.43192 6.00468 6.59396L6.00001 6.67196L6.00001 9.33862L6.00468 9.41662C6.02378 9.57879 6.10174 9.72831 6.22376 9.83681C6.34578 9.94532 6.50339 10.0053 6.66668 10.0053Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="border-border-secondary text-text-primary bg-elevation-card [&>*[data-side]]:bg-elevation-card rounded-[10px] border p-4 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                            <div className="flex flex-col gap-4">
                              <h4 className="text-text-primary">
                                {metric.metric}
                              </h4>
                              {MetricInfoData.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-1"
                                  >
                                    <span className="text-text-secondary flex flex-row text-[12px] leading-none font-medium tracking-[0.28px]">
                                      {item.metric}:{" "}
                                      <p className="text-text-primary">
                                        {item.metricValue}
                                      </p>
                                    </span>
                                    <span className="text-text-secondary text-[12px] leading-none font-medium tracking-[0.28px]">
                                      {item.description}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
    // <div className="backdrop-blur-[22px] bg-white rounded-[10px] flex flex-col w-full">
    //   {/* Header */}
    //   <button
    //     onClick={() => setIsExpanded(!isExpanded)}
    //     className="flex gap-[12px] sm:gap-[16px] h-[48px] sm:h-[52px] md:h-[56px] items-center px-[16px] sm:px-[20px] md:px-[24px] border-b border-light-gray w-full hover:bg-primary-foreground transition-colors cursor-pointer"
    //   >
    //     <div className="flex-1 flex flex-col justify-center">
    //       <p className="font-nohemi text-[14px] sm:text-[15px] md:text-[16px] text-text-primary font-medium tracking-[0.32px] leading-none text-left font-500">
    //         Index Weights
    //       </p>
    //     </div>
    //     <p className="font-medium text-[11px] sm:text-[12px] text-text-secondary tracking-[-0.12px] leading-none">
    //       {isExpanded ? "Hide" : "Show"}
    //     </p>
    //     {isExpanded ? (
    //       <ChevronUp className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-text-primary" />
    //     ) : (
    //       <ChevronDown className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-text-primary" />
    //     )}
    //   </button>

    //   {/* Content */}
    //   {isExpanded && (
    //     <div className="flex flex-col pb-[4px] sm:pb-[6px] md:pb-[8px] px-[4px] sm:px-[6px] md:px-[8px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    //       {/* Table Header */}
    //       <div className="flex gap-[16px] md:gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none min-w-[600px]">
    //         <p className="w-[150px] md:w-[180px]">Metric</p>
    //         <p className="flex-1 min-w-[200px]">Description</p>
    //         <p className="w-[60px] md:w-[72px]">Weight</p>
    //         <p className="w-[60px] md:w-[72px]">Current</p>
    //         <p className="w-[60px] md:w-[72px]">Trend</p>
    //       </div>

    //       {/* Table Rows */}
    //       {metrics.map((item, index) => {
    //         const isPositive = item.trend >= 0;
    //         return (
    //           <div
    //             key={index}
    //             className="flex gap-[16px] md:gap-[24px] items-center p-[12px] md:p-[16px] rounded-[10px] bg-linear-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] relative shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[600px]"
    //           >
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[150px] md:w-[180px]">
    //               {item.metric}
    //             </p>
    //             <p className="flex-1 min-w-[200px] font-medium text-[11px] md:text-[12px] text-text-secondary tracking-[-0.12px] leading-[1.1]">
    //               {item.description}
    //             </p>
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[60px] md:w-[72px]">
    //               {item.weight}
    //             </p>
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[60px] md:w-[72px]">
    //               {typeof item.current === "number"
    //                 ? item.current.toFixed(1)
    //                 : item.current}
    //             </p>
    //             <div className="flex gap-px items-center w-[60px] md:w-[72px]">
    //               {isPositive ? (
    //                 <ArrowUp className="w-[11px] h-[11px] md:w-[12px] md:h-[12px] text-light-green" />
    //               ) : (
    //                 <ArrowDown className="w-[11px] h-[11px] md:w-[12px] md:h-[12px] text-neon-pink" />
    //               )}
    //               <p
    //                 className={`font-medium text-[11px] md:text-[12px] tracking-[-0.12px] leading-none ${
    //                   isPositive ? "text-light-green" : "text-neon-pink"
    //                 }`}
    //               >
    //                 {Math.abs(item.trend).toFixed(1)}%
    //               </p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
  );
}
