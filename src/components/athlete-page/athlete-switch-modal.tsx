"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Athlete {
  id: string;
  name: string;
  team: string;
  imageUrl: string;
  backgroundColor: string;
  currentPrice: number;
  change24h: number;
  volume24h: number;
  funding8h: number;
  openInterest: number;
}

interface AthleteSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - In production, this would come from an API
const mockAthletes: Athlete[] = [
  {
    id: "1",
    name: "LeBron James",
    team: "Los Angeles Lakers",
    imageUrl: "/icons/players/lebron-james.png",
    backgroundColor: "#b47818",
    currentPrice: 102.3,
    change24h: 23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "2",
    name: "Stephen Curry",
    team: "Golden State Warriors",
    imageUrl: "/icons/players/stephen-curry.png",
    backgroundColor: "#253ea7",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "3",
    name: "Kevin Durant",
    team: "Phoenix Suns",
    imageUrl: "/icons/players/kevin-durrant.png",
    backgroundColor: "#6e3ff3",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "4",
    name: "LeBron James",
    team: "Los Angeles Lakers",
    imageUrl: "/icons/players/lebron-james.png",
    backgroundColor: "#b47818",
    currentPrice: 102.3,
    change24h: 23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "5",
    name: "Kevin Durant",
    team: "Phoenix Suns",
    imageUrl: "/icons/players/kevin-durrant.png",
    backgroundColor: "#6e3ff3",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
];

function AthleteRow({
  athlete,
  onClick,
}: {
  athlete: Athlete;
  onClick: () => void;
}) {
  const isPositive = athlete.change24h > 0;

  return (
    <div className="flex w-full items-start">
      {/* Athlete Name Column */}
      <button
        onClick={onClick}
        className="flex h-[64px] w-[280px] shrink-0 cursor-pointer items-center gap-[8px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] transition-all hover:from-[rgba(255,255,255,0.08)] hover:to-[rgba(255,255,255,0.04)] md:gap-[10px] md:px-[16px]"
      >
        <div
          className={`relative h-7 w-7 rounded-md md:h-8 md:w-8 ${athlete.backgroundColor} shrink-0 overflow-hidden`}
        >
          <Image
            src="/icons/athletes/logo.png"
            alt="Logo"
            fill
            className="object-cover object-top opacity-8 mix-blend-screen"
          />
          <Image
            src={athlete.imageUrl}
            alt={athlete.name}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[6px] text-left md:gap-[8px]">
          <p className="text-text-primary w-full truncate text-[13px] leading-none font-medium tracking-[-0.28px] md:text-[14px]">
            {athlete.name}
          </p>
          <p className="text-text-secondary w-full truncate text-[11px] leading-none font-normal tracking-[-0.12px] md:text-[12px]">
            {athlete.team}
          </p>
        </div>
      </button>

      {/* Current Price */}
      <div className="flex h-[64px] min-w-[140px] flex-1 items-center gap-[16px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] md:px-[16px]">
        <p className="text-text-primary text-[13px] leading-none font-medium tracking-[-0.28px] whitespace-nowrap md:text-[14px]">
          ${athlete.currentPrice}
        </p>
      </div>

      {/* 24h Change */}
      <div className="flex h-[64px] min-w-[120px] flex-1 items-center gap-[16px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] md:px-[16px]">
        <p
          className={cn(
            "text-[13px] leading-none font-medium tracking-[-0.28px] whitespace-nowrap md:text-[14px]",
            isPositive ? "text-green-dark" : "text-base-red",
          )}
        >
          {isPositive ? "+" : ""}
          {athlete.change24h}%
        </p>
      </div>

      {/* 24h Volume */}
      <div className="flex h-[64px] min-w-[120px] flex-1 items-center gap-[16px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] md:px-[16px]">
        <p
          className={cn(
            "text-[13px] leading-none font-medium tracking-[-0.28px] whitespace-nowrap md:text-[14px]",
            isPositive ? "text-green-dark" : "text-base-red",
          )}
        >
          ${(athlete.volume24h / 1000).toFixed(1)}k
        </p>
      </div>

      {/* 8hr Funding */}
      <div className="flex h-[64px] min-w-[120px] flex-1 items-center gap-[16px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] md:px-[16px]">
        <p className="text-text-primary flex-1 text-[13px] leading-none font-medium tracking-[-0.28px] md:text-[14px]">
          {athlete.funding8h}%
        </p>
      </div>

      {/* Open Interest */}
      <div className="flex h-[64px] min-w-[140px] flex-1 items-center gap-[16px] rounded-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] px-[12px] py-[12px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] md:px-[16px]">
        <p className="text-text-primary flex-1 text-[13px] leading-none font-medium tracking-[-0.28px] md:text-[14px]">
          ${athlete.openInterest.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function AthleteSwitchModal({
  isOpen,
  onClose,
}: AthleteSwitchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("nba");
  const router = useRouter();

  const handleAthleteClick = (athleteId: string) => {
    router.push(`/athlete/${athleteId}`);
    onClose();
  };

  const filteredAthletes = mockAthletes.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.team.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,13,20,0.32)] backdrop-blur-[1px] backdrop-filter"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-4 max-h-[90vh] w-full overflow-hidden rounded-[10px] border border-[#f2f2f2] bg-white md:mx-0 md:w-[956px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div className="flex flex-col items-start gap-[16px] px-[16px] pt-[16px] pb-[8px] md:px-[20px] md:pt-[20px]">
              <div className="flex w-full items-center gap-[16px]">
                <div className="h-[36px] flex-1 rounded-[8px] border border-[rgba(10,13,20,0.07)] bg-white">
                  <div className="flex h-[36px] items-center gap-[10px] px-[12px] py-[6px] md:px-[16px]">
                    <Search className="text-text-secondary h-[14px] w-[14px] shrink-0 md:h-[16px] md:w-[16px]" />
                    <input
                      type="text"
                      placeholder="Search player or team..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-disabled-300 placeholder:text-disabled-300 flex-1 text-[12px] leading-none font-normal tracking-[-0.13px] outline-none md:text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-weak-100 flex w-full items-center overflow-x-auto border-b [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="min-w-full flex-1"
              >
                <TabsList className="flex h-[48px] w-full min-w-fit gap-0 rounded-none bg-transparent p-0 px-[12px] md:px-[20px]">
                  <TabsTrigger
                    value="nba"
                    className="data-[state=active]:border-main data-[state=active]:text-text-primary text-text-secondary h-full flex-1 shrink-0 rounded-none border-b-[1px] border-transparent px-[12px] text-[12px] leading-none font-semibold tracking-[-0.14px] whitespace-nowrap after:hidden md:flex-1 md:px-[19px] md:text-[14px]"
                  >
                    NBA
                  </TabsTrigger>
                  <TabsTrigger
                    value="soccer"
                    className="data-[state=active]:border-main data-[state=active]:text-text-primary text-text-secondary h-full flex-1 shrink-0 rounded-none border-b-[1px] border-transparent px-[12px] text-[12px] leading-none font-medium tracking-[-0.14px] whitespace-nowrap after:hidden md:flex-1 md:px-[19px] md:text-[14px]"
                  >
                    Soccer
                  </TabsTrigger>
                  <TabsTrigger
                    value="esports"
                    className="data-[state=active]:border-main data-[state=active]:text-text-primary text-text-secondary h-full flex-1 shrink-0 rounded-none border-b-[1px] border-transparent px-[12px] text-[12px] leading-none font-medium tracking-[-0.14px] whitespace-nowrap after:hidden md:flex-1 md:px-[19px] md:text-[14px]"
                  >
                    Esports
                  </TabsTrigger>
                  <TabsTrigger
                    value="coming-soon"
                    className="data-[state=active]:border-main data-[state=active]:text-text-primary text-text-secondary h-full flex-1 shrink-0 rounded-none border-b-[1px] border-transparent px-[12px] text-[12px] leading-none font-medium tracking-[-0.14px] whitespace-nowrap after:hidden md:flex-1 md:px-[19px] md:text-[14px]"
                  >
                    Coming Soon
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="p-[4px]">
                  {/* Table Container with Horizontal Scroll */}
                  <div className="overflow-x-auto">
                    {/* Table Headers */}
                    <div className="flex w-full min-w-[1200px] items-start">
                      <div className="flex w-[280px] shrink-0 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          Athlete Name
                        </p>
                      </div>
                      <div className="flex min-w-[140px] flex-1 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          Current Price
                        </p>
                      </div>
                      <div className="flex min-w-[120px] flex-1 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          24h change
                        </p>
                      </div>
                      <div className="flex min-w-[120px] flex-1 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          24h Volume
                        </p>
                      </div>
                      <div className="flex min-w-[120px] flex-1 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          8hr Funding
                        </p>
                      </div>
                      <div className="flex min-w-[140px] flex-1 items-center gap-[24px] px-[12px] py-[12px] md:px-[16px]">
                        <p className="flex-1 text-[11px] leading-none font-medium tracking-[-0.12px] text-[#868c98] md:text-[12px]">
                          Open Interest
                        </p>
                      </div>
                    </div>

                    {/* Athlete Rows */}
                    <div className="flex max-h-[400px] min-w-[1200px] flex-col gap-0">
                      {filteredAthletes.map((athlete) => (
                        <AthleteRow
                          key={athlete.id}
                          athlete={athlete}
                          onClick={() => handleAthleteClick(athlete.id)}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
