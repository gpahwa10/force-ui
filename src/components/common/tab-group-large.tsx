"use client";

import { useState } from "react";

export interface TabItem {
  id: string;
  name: string;
  content: React.ReactNode;
}

interface TabGroupLargeProps {
  tabs: TabItem[];
  defaultTabId?: string;
  id?: string;
  className?: string;
  tabButtonClassName?: string;
  activeTabButtonClassName?: string;
  inactiveTabButtonClassName?: string;
}

export default function TabGroupLarge({
  tabs,
  defaultTabId,
  id,
  className = "",
  tabButtonClassName = "",
  activeTabButtonClassName = "",
  inactiveTabButtonClassName = "",
}: TabGroupLargeProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || tabs[0]?.id || "",
  );

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div
      id={id}
      className={`bg-elevation-card flex w-full flex-col rounded-[8px] backdrop-blur-[22px] md:rounded-[10px] ${className}`}
    >
      {/* Tabs Header */}
      <div
        style={{ scrollbarWidth: "none" }}
        className="border-elevation-bg flex max-w-full items-start self-stretch overflow-x-auto whitespace-nowrap"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2.5 border-b-2 px-8 py-3 sm:py-5 ${activeTab === tab.id
                ? `border-border-secondary ${activeTabButtonClassName}`
                : `border-elevation-bg ${inactiveTabButtonClassName}`
              } ${tabButtonClassName}`}
          >
            <span
              className={`text-[13px] leading-[13px] font-medium tracking-[-0.1px] ${activeTab === tab.id
                  ? "text-text-primary"
                  : "text-text-secondary"
                }`}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTabContent}
      </div>
    </div>
  );
}
