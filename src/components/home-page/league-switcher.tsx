"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown, Search } from "lucide-react";

type LeagueOption = { id: string; label: string; icon: string };

export default function LeagueSwitcher({
  selected,
  options,
  onChange,
  className,
}: {
  selected: LeagueOption;
  options: LeagueOption[];
  onChange: (opt: LeagueOption) => void;
  className?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`bg-elevation-button hover:bg-elevation-button! my-2 flex h-[28px] flex-row items-center justify-between rounded-lg !px-[8px] hover:cursor-pointer ${className ?? ""
            }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={selected.icon}
              alt={selected.label}
              width={15}
              height={15}
              className="rounded-1"
            />
            <span className="text-text-primary text-[12px] font-medium">
              {selected.label}
            </span>
          </div>
          <ChevronDown size={12} className="text-text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="bg-elevation-card w-[200px] p-2"
      >
        <div className="mb-2">
          <div className="relative flex items-center">
            <Search
              size={14}
              className="absolute left-2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search league..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border-secondary bg-elevation-button px-2 py-1.5 pl-7 text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex max-h-[300px] flex-col overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => {
              const active = opt.id === selected.id;
              return (
                <PopoverClose asChild key={opt.id}>
                  <button
                    onClick={() => {
                      onChange(opt);
                      setSearchQuery("");
                    }}
                    className={`hover:bg-elevation-button flex h-[28px] flex-row items-center justify-start gap-2 rounded-lg px-[8px]! hover:cursor-pointer ${active ? "bg-elevation-button" : ""
                      }`}
                  >
                    <Image
                      src={opt.icon}
                      alt={opt.label}
                      width={15}
                      height={15}
                      className="rounded-1"
                    />
                    <span className="text-text-primary text-[12px] font-medium">
                      {opt.label}
                    </span>
                  </button>
                </PopoverClose>
              );
            })
          ) : (
            <div className="flex h-[28px] items-center justify-center px-2">
              <span className="text-text-secondary text-[12px]">
                No leagues found
              </span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
