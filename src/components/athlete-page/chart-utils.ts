import type {
  TimeRange,
  ChartDataPoint,
  ChartEvent,
} from "@/components/common/chart-types";

// Generate mock data based on time range
export const generateChartData = (timeRange: TimeRange): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  let totalDataPoints: number;
  let intervalMinutes: number;
  let startDate: Date;

  // Configure data points based on time range
  switch (timeRange) {
    case "1H":
      totalDataPoints = 60; // 1 hour = 60 minutes
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
      break;
    case "6H":
      totalDataPoints = 6; // 6 hours = 6 data points (hourly)
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
      break;
    case "1D":
      totalDataPoints = 24; // 1 day = 24 hours
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      break;
    case "1W":
      totalDataPoints = 7; // 1 week = 7 days
      intervalMinutes = 24 * 60; // Daily
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "1M":
      totalDataPoints = 30; // 1 month = 30 days
      intervalMinutes = 24 * 60; // Daily
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      break;
    case "ALL":
      totalDataPoints = 12; // 1 year = 12 months
      // Start from 12 months ago
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 12);
      startDate.setDate(1); // Start of month
      startDate.setHours(0, 0, 0, 0);
      intervalMinutes = 0; // Will be handled specially for monthly intervals
      break;
    default:
      totalDataPoints = 60;
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
  }

  // Determine label interval to avoid overlapping
  let labelInterval: number;
  if (totalDataPoints <= 7) {
    labelInterval = 1; // Show all labels for small datasets
  } else if (totalDataPoints <= 24) {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 8)); // Show ~8 labels
  } else if (totalDataPoints <= 30) {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 10)); // Show ~10 labels
  } else {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 12)); // Show ~12 labels
  }

  for (let i = 0; i < totalDataPoints; i++) {
    let currentDate: Date;
    if (timeRange === "ALL") {
      // For monthly data, add months instead of minutes
      currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
    } else {
      currentDate = new Date(
        startDate.getTime() + i * intervalMinutes * 60 * 1000,
      );
    }
    const progress = i / (totalDataPoints - 1);

    let timeString: string;
    let timeLabel: string = "";

    // Format time string based on time range
    if (timeRange === "1H") {
      // Minute-level: show HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      // Show label every N minutes
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "6H" || timeRange === "1D") {
      // Hour-level: show HH AM/PM
      const hours = currentDate.getHours();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour} ${ampm}`;
      // Show label every N hours
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1W") {
      // Day-level: show MM/DD (no time)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label every N days
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1M") {
      // Day-level: show MM/DD
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label every N days
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else {
      // Month-level: show MM/YYYY or MM/YY
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      timeString = `${month}/${year}`;
      // Show label every N months
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    }

    // Generate values with trend based on progress
    // Red line (#FC3970) - sharp edges, more volatile, higher range
    const redBase =
      32 + Math.sin(progress * Math.PI * 4) * 2.5 + (progress - 0.5) * 4;
    const redValue =
      redBase + Math.sin(i * 0.1) * 0.6 + (Math.random() - 0.5) * 0.3;

    // Blue line (#25B3FF) - smooth, gradual changes, middle range
    const blueBase =
      31 + Math.sin(progress * Math.PI * 2) * 1.5 + (progress - 0.5) * 1.5;
    const blueValue =
      blueBase + Math.sin(i * 0.08) * 0.3 + (Math.random() - 0.5) * 0.2;

    // Green line (#16A34A) - smooth, moderate changes, lower range
    const greenBase =
      29.5 + Math.sin(progress * Math.PI * 3) * 1.2 + (progress - 0.5) * 0.5;
    const greenValue =
      greenBase + Math.sin(i * 0.09) * 0.2 + (Math.random() - 0.5) * 0.15;

    // For live page: Create lines that intercross frequently but with moderate spacing
    // Lines are closer together but still have some separation
    
      // Base positions - moderate spread
      // Line 3 (#FDB927) - Lakers Index - Yellow
      // Line 4 (#3B87DD) - Warriors Index - Blue
      // Line 5 (#AD8D46) - Lakers Market - Muted gold
      // Line 6 (#21446C) - Warriors Market - Darker blue
      const baseLine3 = 32.0;  // Lakers Index - Top area
      const baseLine4 = 31.2;   // Warriors Index - Upper middle
      const baseLine5 = 30.4;   // Lakers Market - Lower middle
      const baseLine6 = 29.6;   // Warriors Market - Bottom area
    
    // Each line has different characteristics to create natural crossings
    // Line 3 (#FDB927) - Index - More volatile, oscillates around top
    const line3Base = baseLine3 + Math.sin(progress * Math.PI * 2.5) * 1.2;
    const line3Value =
      line3Base + 
      Math.sin(i * 0.2) * 1.0 +           // Fast oscillation - larger range
      Math.sin(i * 0.35) * 0.5 +         // Medium frequency
      Math.sin(i * 0.55) * 0.6 +         // Slow wave
      Math.cos(i * 0.15) * 1.0 +         // Cosine component
      Math.cos(i * 0.4) * 0.7 +          // Another cosine
      Math.sin(progress * Math.PI * 4) * 0.8 +  // Progress-based wave
      (Math.random() - 0.5) * 1.25;

    // Line 4 (#3B87DD) - Blue - Different frequency pattern
    const line4Base = baseLine4 + Math.sin(progress * Math.PI * 2.8) * 1.0;
    const line4Value =
      line4Base + 
      Math.sin(i * 0.22) * 1.3 +          // Slightly different frequency
      Math.sin(i * 0.38) * 0.6 +         // Different medium wave
      Math.sin(i * 0.6) * 0.55 +          // Different slow wave
      Math.cos(i * 0.18) * 0.95 +         // Different cosine
      Math.cos(i * 0.42) * 0.65 +         // Another cosine
      Math.sin(progress * Math.PI * 4.2) * 0.75 +
      (Math.random() - 0.5) * 0.23;

    // Line 5 (#AD8D46) - Market - Another unique pattern
    const line5Base = baseLine5 + Math.sin(progress * Math.PI * 2.3) * 1.1;
    const line5Value =
      line5Base + 
      Math.sin(i * 0.19) * 1.35 +         // Different frequency again
      Math.sin(i * 0.33) * 0.55 +         // Unique medium wave
      Math.sin(i * 0.52) * 0.58 +         // Unique slow wave
      Math.cos(i * 0.16) * 0.98 +         // Different cosine
      Math.cos(i * 0.38) * 0.68 +        // Another cosine
      Math.sin(progress * Math.PI * 3.8) * 0.82 +
      (Math.random() - 0.5) * 0.24;

    // Line 6 (#21446C) - Darker blue - Distinct pattern
    const line6Base = baseLine6 + Math.sin(progress * Math.PI * 2.6) * 0.9;
    const line6Value =
      line6Base + 
      Math.sin(i * 0.21) * 1.25 +         // Another unique frequency
      Math.sin(i * 0.36) * 0.58 +         // Different medium wave
      Math.sin(i * 0.58) * 0.52 +        // Different slow wave
      Math.cos(i * 0.17) * 0.92 +        // Different cosine
      Math.cos(i * 0.41) * 0.62 +        // Another cosine
      Math.sin(progress * Math.PI * 4.1) * 0.78 +
      (Math.random() - 0.5) * 0.26;

    // Ensure minimum spacing between lines (especially at the end)
    const minSpacing = 1.2; // Minimum spacing between lines for live page
    let finalRedValue = redValue;
    let finalBlueValue = blueValue;
    let finalGreenValue = greenValue;
    let finalLine3Value = line3Value;
    let finalLine4Value = line4Value;
    let finalLine5Value = line5Value;
    let finalLine6Value = line6Value;

    // Adjust values to maintain spacing, prioritizing order: Red > Blue > Green
    if (Math.abs(finalRedValue - finalBlueValue) < minSpacing) {
      if (finalRedValue > finalBlueValue) {
        finalRedValue = finalBlueValue + minSpacing;
      } else {
        finalBlueValue = finalRedValue + minSpacing;
      }
    }

    if (Math.abs(finalBlueValue - finalGreenValue) < minSpacing) {
      if (finalBlueValue > finalGreenValue) {
        finalBlueValue = finalGreenValue + minSpacing;
      } else {
        finalGreenValue = finalBlueValue + minSpacing;
      }
    }

    // Re-check red-blue spacing after blue-green adjustment
    if (Math.abs(finalRedValue - finalBlueValue) < minSpacing) {
      if (finalRedValue > finalBlueValue) {
        finalRedValue = finalBlueValue + minSpacing;
      } else {
        finalBlueValue = finalRedValue + minSpacing;
      }
    }

    // For live page lines: Allow lines to cross each other naturally
    // Only ensure they stay within bounds and have minimal spacing to avoid exact overlap
    const minOverlapSpacing = 0.3; // Small spacing to prevent exact overlap, but allow crossing
    
    // Ensure all lines stay within bounds
    finalLine3Value = Math.max(27, Math.min(36, finalLine3Value));
    finalLine4Value = Math.max(27, Math.min(36, finalLine4Value));
    finalLine5Value = Math.max(27, Math.min(36, finalLine5Value));
    finalLine6Value = Math.max(27, Math.min(36, finalLine6Value));
    
    // Only prevent exact overlap (when lines are too close), but allow crossing
    // Check all pairs and add small offset if they're too close
    const lines = [
      { val: finalLine3Value, key: "line3" },
      { val: finalLine4Value, key: "line4" },
      { val: finalLine5Value, key: "line5" },
      { val: finalLine6Value, key: "line6" },
    ];
    
    // Sort by value to check for overlaps
    lines.sort((a, b) => a.val - b.val);
    
    // If any two lines are too close (within minOverlapSpacing), add small offset
    for (let j = 0; j < lines.length - 1; j++) {
      if (Math.abs(lines[j].val - lines[j + 1].val) < minOverlapSpacing) {
        // Add small offset to prevent exact overlap
        lines[j + 1].val = lines[j].val + minOverlapSpacing;
      }
    }
    
    // Re-assign values back (maintaining their identity)
    lines.forEach((line) => {
      if (line.key === "line3") finalLine3Value = line.val;
      if (line.key === "line4") finalLine4Value = line.val;
      if (line.key === "line5") finalLine5Value = line.val;
      if (line.key === "line6") finalLine6Value = line.val;
    });
    
    // At the end (right side), guide lines to end positions but allow some flexibility
    if (i === totalDataPoints - 1) {
      // Soft constraints - guide towards end positions but allow variation
      const targetLine3 = 31.5;
      const targetLine4 = 30.5;
      const targetLine5 = 29.5;
      const targetLine6 = 28.2;
      
      // Blend current value with target (70% current, 30% target) for natural ending
      finalLine3Value = finalLine3Value * 0.7 + targetLine3 * 0.3;
      finalLine4Value = finalLine4Value * 0.7 + targetLine4 * 0.3;
      finalLine5Value = finalLine5Value * 0.7 + targetLine5 * 0.3;
      finalLine6Value = finalLine6Value * 0.7 + targetLine6 * 0.3;
      
      // Ensure bounds
      finalLine3Value = Math.max(27, Math.min(36, finalLine3Value));
      finalLine4Value = Math.max(27, Math.min(36, finalLine4Value));
      finalLine5Value = Math.max(27, Math.min(36, finalLine5Value));
      finalLine6Value = Math.max(27, Math.min(36, finalLine6Value));
    }

    data.push({
      time: timeString,
      timeLabel,
      date: currentDate,
      redLine: Number(Math.max(27, Math.min(36, finalRedValue)).toFixed(1)),
      blueLine: Number(Math.max(27, Math.min(36, finalBlueValue)).toFixed(1)),
      greenLine: Number(Math.max(27, Math.min(36, finalGreenValue)).toFixed(1)),
      line3: Number(Math.max(27, Math.min(36, finalLine3Value)).toFixed(1)),
      line4: Number(Math.max(27, Math.min(36, finalLine4Value)).toFixed(1)),
      line5: Number(Math.max(27, Math.min(36, finalLine5Value)).toFixed(1)),
      line6: Number(Math.max(27, Math.min(36, finalLine6Value)).toFixed(1)),
    });
  }

  return data;
};

// Format date for tooltip: "12 Aug, 8:00 PM"
export const formatTooltipDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHour = hours > 12 ? hours - 12 : hours || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");

  return `${day} ${month}, ${displayHour}:${minutesStr} ${ampm}`;
};

// Generate events based on time range
export const generateEvents = (
  timeRange: TimeRange,
  chartData: ChartDataPoint[],
): ChartEvent[] => {
  if (chartData.length === 0) return [];

  const events: ChartEvent[] = [];
  const eventTemplates = [
    {
      title: "First 3-pointer made!",
      description: "LeBron nails a deep three from the corner.",
      impact: "+1.8%",
    },
    {
      title: "Slam dunk!",
      description: "Anthony Davis throws down a powerful dunk.",
      impact: "+2.1%",
    },
    {
      title: "Steal and fast break!",
      description: "Quick transition leads to an easy basket.",
      impact: "+1.5%",
    },
    {
      title: "Clutch free throw!",
      description: "Perfect execution under pressure.",
      impact: "+0.9%",
    },
    {
      title: "Alley-oop connection!",
      description: "Perfect pass and finish at the rim.",
      impact: "+2.3%",
    },
    {
      title: "Block and outlet!",
      description: "Defensive stop turns into offense.",
      impact: "+1.2%",
    },
  ];

  // Select 2 random events
  const selectedEvents = [...eventTemplates]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Distribute events across the time range (avoid first and last 10%)
  const startIndex = Math.floor(chartData.length * 0.1);
  const endIndex = Math.floor(chartData.length * 0.9);
  const range = endIndex - startIndex;

  selectedEvents.forEach((template, i) => {
    const eventIndex =
      startIndex + Math.floor((range / (selectedEvents.length + 1)) * (i + 1));
    const dataPoint = chartData[eventIndex];

    if (dataPoint) {
      const hours = dataPoint.date.getHours();
      const minutes = dataPoint.date.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      const timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

      events.push({
        index: eventIndex,
        time: timeString,
        title: template.title,
        description: template.description,
        impact: template.impact,
      });
    }
  });

  return events;
};
