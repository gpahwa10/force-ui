export default function TrendingNowHeader() {
  return (
    <div className="flex w-full flex-row">
      <div className="flex w-[60%] flex-row gap-6 px-4 py-3 md:w-[40%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Athlete Name
        </p>
      </div>
      <div className="flex w-[40%] flex-row gap-6 px-4 py-3 md:w-[20%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Current Price
        </p>
      </div>
      <div className="hidden w-[20%] flex-row gap-6 px-4 py-3 md:flex">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          24h Change
        </p>
      </div>
      <div className="hidden w-[20%] flex-row gap-6 px-4 py-3 md:flex">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Volume
        </p>
      </div>
    </div>
  );
}
