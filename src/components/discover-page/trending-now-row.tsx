import Image from "next/image";

export default function TrendingNowRow({
  athleteSrc,
  athleteName,
  athleteTeam,
  athleteColor,
  currentPrice,
  change,
  volume,
  onClick,
}: {
  athleteSrc: string;
  athleteName: string;
  athleteTeam: string;
  athleteColor: string;
  currentPrice: string;
  change: string;
  volume: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="hover:bg-primary-foreground flex w-full flex-row transition-colors duration-200 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex w-[60%] flex-row items-center gap-2.5 px-4 py-3 md:w-[40%]">
        <div
          className={`relative h-8 w-8 rounded-md ${athleteColor} overflow-hidden`}
        >
          <Image
            src="/icons/athletes/logo.png"
            alt="Logo"
            fill
            className="object-cover object-top opacity-8 mix-blend-screen"
          />
          <Image
            src={athleteSrc}
            alt={athleteName}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex w-fit flex-col gap-2">
          <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%] text-nowrap">
            {athleteName}
          </p>
          <p className="text-text-secondary text-[12px] leading-[100%] tracking-[-1%] text-nowrap">
            {athleteTeam}
          </p>
        </div>
      </div>
      <div className="flex w-[40%] flex-row items-center gap-4 px-4 py-3 md:w-[20%]">
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
          {currentPrice}
        </p>
      </div>

      <div className="hidden w-[20%] flex-row items-center gap-4 px-4 py-3 md:flex">
        <p
          className={`text-[14px] leading-[100%] font-medium tracking-[-2%] ${
            change[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {change}
        </p>
      </div>

      <div className="hidden w-[20%] flex-row items-center gap-4 px-4 py-3 md:flex">
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
          {volume}
        </p>
      </div>
    </div>
  );
}
