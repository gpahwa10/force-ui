import Image from "next/image";

export default function IndexRow({
  team,
  teamSrc,
  long,
  short,
  openInterest,
  funRate,
}: {
  team: string;
  teamSrc: string;
  long: string;
  short: string;
  openInterest: string;
  funRate: string;
}) {
  return (
    <div className="flex w-full min-w-[370px] flex-row">
      <div className="flex h-14 w-[30%] flex-1 flex-row items-center gap-2.5 px-4 py-3 md:w-[28%]">
        <div className="flex h-8 w-8 flex-row items-center justify-center rounded-md bg-black/3">
          <Image
            src={teamSrc}
            alt={team}
            width={21}
            height={21}
            className="w-fit"
          />
        </div>
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {team}
        </p>
      </div>

      <div className="flex h-14 w-[25%] flex-row items-center gap-6 px-4 py-3 md:w-[18%]">
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {long}
        </p>
      </div>

      <div className="hidden h-14 flex-row items-center gap-6 px-4 py-3 md:flex md:w-[18%]">
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {short}
        </p>
      </div>

      <div className="hidden h-14 flex-row items-center gap-6 px-4 py-3 md:flex md:w-[18%]">
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {openInterest}
        </p>
      </div>

      <div className="flex h-14 w-[25%] flex-row items-center gap-6 px-4 py-3 md:w-[18%]">
        <p
          className={`text-[14px] leading-[100%] font-medium tracking-[-1%] ${
            funRate[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {funRate}
        </p>
      </div>
    </div>
  );
}
