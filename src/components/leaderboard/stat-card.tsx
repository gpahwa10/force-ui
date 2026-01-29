export default function StatCard({
  title,
  value,
  percent,
  isPositive = true,
}: {
  title: string;
  value: string;
  percent: string;
  isPositive?: boolean;
}) {
  return (
    <div className="bg-elevation-card flex flex-1 flex-col items-start justify-between gap-6 self-stretch rounded-[14px] p-4 sm:gap-10 sm:p-5">
      <span className="text-text-secondary w-[128.847px] text-xs leading-3 font-medium tracking-[-0.1px]">
        {title}
      </span>
      <div className="flex items-start gap-2">
        <span className="text-text-primary text-[32px] leading-8 font-medium tracking-[-1px]">
          {value}
        </span>
        <div className="flex items-end gap-0.5 px-0 py-[3px]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="aspect-square overflow-hidden"
          >
            <path
              d="M5.00006 2.5V8.33348M5.00006 2.5L7.50012 5.00006M5.00006 2.5L2.5 5.00006"
              stroke="currentColor"
              className="text-dark-green"
              strokeWidth="1.25003"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-dark-green text-right text-[10px] leading-[10px] font-medium tracking-[-0.1px]">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
