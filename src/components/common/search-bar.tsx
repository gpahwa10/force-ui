"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import TradeButton from "@/components/common/trade-button";
import { getAllAthletes, ExtendedAthleteData, getTeamById } from "@/lib/data/athletes-bank";

interface SearchBarProps {
  teamImageUrl: string;
  name: string;
  onClose?: () => void;
  onSelectAthlete?: (athlete: ExtendedAthleteData) => void;
}

export default function SearchBar({ teamImageUrl, name, onClose, onSelectAthlete }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const athletesData = getAllAthletes();
  const filteredAthletes = athletesData.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Focus input when component mounts (when dialog opens)
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0); // Reset selection when query changes
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose?.();
      return;
    }

    if (filteredAthletes.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredAthletes.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectAthlete(filteredAthletes[selectedIndex]);
    }
  };

  const handleSelectAthlete = (athlete: ExtendedAthleteData) => {
    onSelectAthlete?.(athlete);
    onClose?.();
    setSearchQuery("");
    router.push(`/athlete/${athlete.id}`);
  };

  const handleLongPosition = (e: React.MouseEvent, athlete: ExtendedAthleteData) => {
    e.stopPropagation();
    // Long position logic
  };

  const handleShortPosition = (e: React.MouseEvent, athlete: ExtendedAthleteData) => {
    e.stopPropagation();
    // Short position logic
  };

  return (
    <div className="flex w-full flex-col rounded-2xl border border-border-secondary bg-elevation-bg shadow-[0_14px_34px_-10px_rgba(11,11,13,0.05)]">
      {/* Search Header */}
      <div className="flex h-11 items-center justify-center gap-1.5 overflow-hidden px-4 py-3 ">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="flex-1 bg-transparent text-sm font-medium leading-4 tracking-[-0.2px] text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
        <div className="flex items-center justify-center gap-2.5 rounded bg-elevation-card px-1.5 py-1">
          <span className="text-[10px] font-medium leading-[10px] tracking-[-0.1px] text-text-secondary">
            ESC
          </span>
        </div>
      </div>

      {/* Results List */}
      <div className={`flex flex-col items-center justify-center gap-3 self-stretch px-3 pb-3 ${searchQuery ? '' : 'pt-32'} max-h-[300px] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
        {filteredAthletes.length > 0 ? (
          <div className="flex w-full flex-col items-start gap-1">
            {filteredAthletes.map((athlete, index) => (
              <div
                key={athlete.id}
                onClick={() => handleSelectAthlete(athlete)}
                className="flex w-full cursor-pointer items-start justify-between rounded-[14px] bg-elevation-card hover:bg-elevation-card-raise transition-colors p-2"
              >
                {/* Player Info */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-bg-primary">
                    <Image
                      src={athlete.image}
                      alt={athlete.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="text-[13px] font-medium leading-[13px] tracking-[-0.1px] text-text-primary">
                      {athlete.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium leading-3 tracking-[-0.1px] text-text-secondary">
                        {athlete.price}
                      </span>
                      <span
                        className={`text-xs font-medium leading-3 tracking-[-0.1px] ${athlete.change >= 0
                          ? "text-light-green"
                          : "text-neon-pink"
                          }`}
                      >
                        {athlete.change >= 0 ? "+" : ""}
                        {athlete.change}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex items-start gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TradeButton
                    type="long"
                    onClick={(e) => handleLongPosition(e, athlete)}
                  />
                  <TradeButton
                    type="short"
                    onClick={(e) => handleShortPosition(e, athlete)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-8 text-center text-sm text-text-secondary">
            No athletes found
          </div>
        )}
      </div>
    </div>
  );
}
