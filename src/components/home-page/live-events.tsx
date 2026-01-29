import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type EventRow = {
  time: string;
  iconSrc: string;
  play: string;
  det: string;
  cle: string;
};

export default function LiveEvents({ eventRows }: { eventRows: EventRow[] }) {
  return (
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Live Events
        </p>
        <ChevronRight className="text-text-secondary" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col items-center gap-[20px] p-[20px]">
        <div className="flex w-full flex-col gap-[16px] md:flex-row md:gap-[32px]">
          <div className="flex w-full flex-row items-center gap-[16px]">
            <div className="flex w-full flex-col justify-end gap-[6px]">
              <p className="text-text-primary text-end text-[14px] leading-[100%] font-semibold tracking-[-2%]">
                LAL
              </p>
              <p className="text-text-secondary text-end text-[11px] leading-[100%] tracking-[-1%]">
                Los Angeles Lakers (NBA)
              </p>
            </div>
            <div className="bg-light-gray flex h-[40px] w-[40px] min-w-[40px] shrink-0 flex-col items-center justify-center">
              <Image
                src="/icons/events/lal.png"
                alt="lal"
                width={33}
                height={21}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[4px]">
            <p className="text-text-primary text-center text-[12px] leading-[140%] font-medium tracking-[-2%]">
              Oct 23 - Now on the Match
            </p>
            <p className="text-text-secondary text-center text-[11px] leading-[100%] tracking-[-1%]">
              Crypt Arena
            </p>
          </div>
          <div className="flex w-full flex-row items-center gap-[16px]">
            <div className="bg-light-gray flex h-[40px] w-[40px] min-w-[40px] shrink-0 flex-col items-center justify-center">
              <Image
                src="/icons/events/gsw.png"
                alt="gsw"
                width={23}
                height={27}
                className="object-contain"
              />
            </div>
            <div className="flex w-full flex-col gap-[6px]">
              <p className="text-text-primary text-[14px] leading-[100%] font-semibold tracking-[-2%]">
                GSW
              </p>
              <p className="text-text-secondary text-[11px] leading-[100%] tracking-[-1%]">
                Golden State Warriors (NBA)
              </p>
            </div>
          </div>
        </div>

        <Image
          src="/icons/events/basket-photo.png"
          alt="basket-photo"
          width={640}
          height={255}
          className="h-auto w-full rounded-[8px] object-cover md:w-auto md:object-contain"
        />
        <div className="flex w-full flex-col px-[4px] pb-[4px]">
          <div className="hidden w-full flex-row gap-[16px] px-[16px] py-[12px] md:flex">
            <p className="text-text-secondary w-[17.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Time
            </p>
            <p className="text-text-secondary w-[49.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
              Play
            </p>
            <p className="text-text-secondary w-[16.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
              DET
            </p>
            <p className="text-text-secondary w-[16.5%] text-[12px] leading-[100%] font-medium tracking-[-1%]">
              CLE
            </p>
          </div>

          {eventRows.map((row, idx) => (
            <div
              key={idx}
              className="hover:bg-main/3 hover:border-main flex flex-row justify-between gap-[12px] border-t border-transparent p-[12px] transition-colors duration-200 ease-out hover:cursor-pointer md:h-[48px] md:gap-[16px] md:p-[16px]"
            >
              <div className="flex flex-1 flex-col gap-[8px] md:flex-row md:gap-[16px]">
                <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%] md:w-[17.5%]">
                  {row.time}
                </p>
                <div className="flex min-w-0 flex-row items-start gap-[8px] md:w-[49.5%] md:items-center">
                  <div className="w/[32px] h/[32px] flex flex-col items-center justify-center gap-[6px] rounded-[4px]">
                    <Image
                      src={row.iconSrc}
                      alt="event-icon"
                      width={27}
                      height={17}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-text-primary text-[12px] leading-[130%] font-medium tracking-[-1%] break-words">
                    {row.play}
                  </p>
                </div>
              </div>

              <div className="flex w-auto flex-col items-end gap-[6px] md:flex-row md:items-center md:gap-[16px]">
                <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%] md:w-[16.5%]">
                  {row.det}
                </p>
                <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%] md:w-[16.5%]">
                  {row.cle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
