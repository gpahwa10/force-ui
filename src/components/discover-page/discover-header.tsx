import { ListFilter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
interface DiscoverHeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function DiscoverHeader({
  viewMode,
  setViewMode,
}: DiscoverHeaderProps) {
  const [activeTab, setActiveTab] = useState("athletes");
  const tabs = [
    {
      label: "Athletes",
      value: "athletes",
    },
    {
      label: "Teams",
      value: "teams",
    },
    {
      label: "Guards",
      value: "guards",
    },
    {
      label: "Forwards",
      value: "forwards",
    },
    {
      label: "Trending",
      value: "trending",
    },
    {
      label: "Volume",
      value: "volume",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-row items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto flex-row items-center gap-[8px] bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-text-primary py-0 text-[14px] leading-[100%] font-medium after:hidden data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-row items-center gap-2">
          <button className="rounded-lg bg-white p-2 transition-colors hover:cursor-pointer">
            <ListFilter width={18} height={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-primary-foreground"
                : "hover:bg-primary-foreground bg-transparent"
            }`}
          >
            <Image
              src="/icons/grid.svg"
              alt="Grid view"
              width={18}
              height={18}
            />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "list"
                ? "bg-primary-foreground"
                : "hover:bg-primary-foreground bg-transparent"
            }`}
          >
            <Image
              src="/icons/list.svg"
              alt="List view"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 px-2">
        <div className="flex flex-row items-center gap-2">
          {/* Positions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="data-[state=active]:text-text-primary flex flex-row items-center gap-2 rounded-[8px] bg-white text-[12px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none"
              >
                Positions <ChevronDown width={18} height={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Guards</DropdownMenuItem>
                <DropdownMenuItem>Forwards</DropdownMenuItem>
                <DropdownMenuItem>Centers</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Price Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="data-[state=active]:text-text-primary flex flex-row items-center gap-2 rounded-[8px] bg-white text-[12px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none"
              >
                Price Range <ChevronDown width={18} height={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-[12px]" align="start">
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <div>
                    From
                    <input
                      type="text"
                      placeholder="$"
                      className="bg-soft-500 w-full rounded-[8px] px-2 py-1"
                    />
                  </div>
                  <div>
                    To
                    <input
                      type="text"
                      placeholder="$"
                      className="bg-soft-500 w-full rounded-[8px] px-2 py-1"
                    />
                  </div>
                </div>
                <Button
                  variant="default"
                  className="bg-secondary text-text-primary hover:bg-primary/90 hover:text-primary-foreground w-full font-semibold"
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="data-[state=active]:text-text-primary flex flex-row items-center gap-2 rounded-[8px] bg-white px-2 py-1 text-[12px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none">
            Last 24 Hours
            <ChevronDown width={18} height={18} />
          </div>
          <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-lg bg-white px-2 py-1 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-medium">Sort by</span>
              <span className="font-semibold">Most Traded</span>
            </div>

            <ChevronDown width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
