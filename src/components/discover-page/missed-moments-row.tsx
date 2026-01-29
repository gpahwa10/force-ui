import Image from "next/image";

export default function MissedMomentsRow({
  eventSrc,
  eventAlt,
  title,
  description,
  volume,
  percentage,
  timeAgo,
}: {
  eventSrc: string;
  eventAlt: string;
  title: string;
  description: string;
  volume: string;
  percentage: string;
  timeAgo: string;
}) {
  return (
    <div className="border-light-gray flex h-fit shrink-0 flex-row gap-5 border-b p-5">
      <Image
        src={eventSrc}
        alt={eventAlt}
        width={100}
        height={65}
        className="min-h-[65px] rounded-lg object-cover object-center"
      />
      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <p className="text-text-primary max-w-[220px] truncate text-[14px] leading-[140%] font-semibold tracking-[-2%] sm:max-w-[443px]">
            {title}
          </p>
          <p className="text-text-secondary max-w-[220px] truncate overflow-hidden text-[12px] leading-[140%] tracking-[-1%] whitespace-nowrap sm:max-w-[443px]">
            {description}
          </p>
        </div>
        <div className="flex min-w-0 flex-row items-center gap-2.5">
          <p className="text-text-primary max-w-[120px] truncate text-[12px] leading-[100%] font-medium tracking-[-1%] sm:max-w-[180px]">
            {volume}
          </p>
          <p className="text-text-secondary text-[12px] font-medium">•</p>
          <p className="text-text-primary max-w-[120px] truncate text-[12px] leading-[100%] font-medium tracking-[-1%] sm:max-w-[180px]">
            {percentage}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <p className="text-text-secondary max-w-[80px] truncate text-[11px] leading-[100%] tracking-[-1%] text-nowrap">
          {timeAgo}
        </p>
      </div>
    </div>
  );
}
