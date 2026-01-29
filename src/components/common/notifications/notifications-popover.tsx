"use client";

import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from "react";

type NotificationTab = "trade" | "leaderboard" | "system";

interface Notification {
  id: string;
  status: "success" | "info" | "warning" | "error";
  title: string;
  message: React.ReactNode;
  time: string;
  unread?: boolean;
  tab: NotificationTab;
}

export default function NotificationsPopover() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("trade");

  const notifications: Notification[] = [
    {
      id: "1",
      status: "success",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="text-text-primary font-medium">
            LeBron James ($50)
          </span>{" "}
          was successfully opened at{" "}
          <span className="text-text-primary font-medium">$12.45.</span>
        </>
      ),
      time: "Just now",
      unread: true,
      tab: "trade",
    },
    {
      id: "2",
      status: "success",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="text-text-primary font-medium">
            LeBron James ($50)
          </span>{" "}
          was successfully opened at{" "}
          <span className="text-text-primary font-medium">$12.45.</span>
        </>
      ),
      time: "1 day ago",
      tab: "trade",
    },
    {
      id: "3",
      status: "info",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="text-text-primary font-medium">
            LeBron James ($50)
          </span>{" "}
          was successfully opened at{" "}
          <span className="text-text-primary font-medium">$12.45.</span>
        </>
      ),
      time: "1 day ago",
      tab: "trade",
    },
    {
      id: "4",
      status: "info",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="text-text-primary font-medium">
            LeBron James ($50)
          </span>{" "}
          was successfully opened at{" "}
          <span className="text-text-primary font-medium">$12.45.</span>
        </>
      ),
      time: "2 days ago",
      tab: "trade",
    },
  ];

  const filteredNotifications = notifications.filter(
    (n) => n.tab === activeTab,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="notification-trigger bg-elevation-button hover:bg-elevation-container cursor-pointer items-center justify-center rounded-lg p-2 transition-colors md:flex"
          aria-label="Notifications"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-secondary"
          >
            <path
              d="M5.625 10.625V11.25C5.625 11.7473 5.82254 12.2242 6.17417 12.5758C6.52581 12.9275 7.00272 13.125 7.5 13.125C7.99728 13.125 8.47419 12.9275 8.82583 12.5758C9.17746 12.2242 9.375 11.7473 9.375 11.25V10.625M6.25 3.125C6.25 2.79348 6.3817 2.47554 6.61612 2.24112C6.85054 2.0067 7.16848 1.875 7.5 1.875C7.83152 1.875 8.14946 2.0067 8.38388 2.24112C8.6183 2.47554 8.75 2.79348 8.75 3.125C9.46776 3.46439 10.0796 3.9927 10.52 4.65331C10.9604 5.31392 11.2128 6.08192 11.25 6.875V8.75C11.297 9.13857 11.4346 9.51066 11.6518 9.83633C11.8689 10.162 12.1594 10.4321 12.5 10.625H2.5C2.84059 10.4321 3.13113 10.162 3.34824 9.83633C3.56535 9.51066 3.70297 9.13857 3.75 8.75V6.875C3.78723 6.08192 4.03956 5.31392 4.97997 4.65331C4.92037 3.9927 5.53224 3.46439 6.25 3.125Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="notifications-popover z-[200] !w-full max-w-[calc(100vw)] overflow-hidden rounded-2xl rounded-none border border-0 bg-transparent p-0 px-[0.875rem]  shadow-none sm:px-5 md:!max-w-[401px] md:px-0"
      >
        <div className="border-border-secondary bg-elevation-container w-full rounded-[12px] border shadow-[0_14px_34px_-10px_rgba(11,11,13,0.05)]">
          {/* Header */}
          <header className="notifications-header flex h-[44px] items-center justify-between gap-1.5 overflow-hidden px-4 py-3">
            <h2 className="text-text-primary flex-1 text-sm leading-[18px] font-normal tracking-[-0.1px]">
              Notifications
            </h2>
            <button
              className="arrow-button bg-elevation-card hover:bg-elevation-container flex h-6 w-6 items-center justify-center rounded transition-colors"
              aria-label="View all notifications"
            >
              <ChevronRight
                className="text-text-secondary"
                width={15}
                height={15}
                strokeWidth={1.25}
              />
            </button>
          </header>

          {/* Tabs */}
          <div className="tabs-container flex items-center gap-1.5 overflow-hidden px-4 pt-1 pb-3">
            <button
              onClick={() => setActiveTab("trade")}
              className={`tab-button flex flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg px-2 py-2 text-xs leading-3 font-medium tracking-[-0.1px] transition-colors ${activeTab === "trade"
                ? "bg-elevation-card text-text-primary"
                : "text-text-secondary hover:bg-elevation-card/50 bg-transparent"
                }`}
            >
              Trade
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`tab-button flex flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg px-2 py-2 text-xs leading-3 font-medium tracking-[-0.1px] transition-colors ${activeTab === "leaderboard"
                ? "bg-elevation-card text-text-primary"
                : "text-text-secondary hover:bg-elevation-card/50 bg-transparent"
                }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`tab-button flex flex-1 items-center justify-center gap-1 overflow-hidden rounded-lg px-2 py-2 text-xs leading-3 font-medium tracking-[-0.1px] transition-colors ${activeTab === "system"
                ? "bg-elevation-card text-text-primary"
                : "text-text-secondary hover:bg-elevation-card/50 bg-transparent"
                }`}
            >
              System
            </button>
          </div>

          {/* Notifications List */}
          <div className="notifications-list flex flex-col gap-1 px-3 pt-1 pb-3">
            {filteredNotifications.map((notification, index) => (
              <article
                key={notification.id}
                className={`notification-card flex items-start justify-between gap-3 rounded-[14px] px-3 py-3.5 ${index === 0 && notification.unread
                  ? "bg-elevation-card"
                  : "bg-transparent"
                  }`}
              >
                <div className="notification-content flex flex-1 items-center gap-3">
                  {/* Alert Icon */}
                  <div
                    className={`alert-icon flex h-6 w-6 flex-shrink-0 items-center justify-center rounded ${notification.status === "success"
                      ? "bg-success/10"
                      : "bg-elevation-card"
                      }`}
                  >
                    {notification.status === "success" && (
                      <Check
                        className="text-success"
                        width={15}
                        height={15}
                        strokeWidth={1.25}
                      />
                    )}
                    {notification.status === "info" && (
                      <AlertCircle
                        className="text-text-secondary"
                        width={15}
                        height={15}
                        strokeWidth={1.25}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="notification-text flex flex-1 flex-col justify-center gap-1.5">
                    <h3 className="notification-title text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
                      {notification.title}
                    </h3>
                    <p className="notification-message text-text-secondary text-xs leading-[1.3] font-normal tracking-[-0.1px]">
                      {notification.message}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <time className="notification-time text-soft-400 w-[60px] flex-shrink-0 text-[11px] leading-[13px] font-normal tracking-[-0.1px]">
                  {notification.time}
                </time>
              </article>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
