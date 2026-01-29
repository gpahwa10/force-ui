export default function IndexHeader() {
  return (
    <div className="flex w-full min-w-[370px] flex-row">
      <div className="flex w-[30%] flex-1 flex-row gap-6 px-4 py-3 md:w-[28%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Index
        </p>
      </div>
      <div className="flex w-[25%] flex-row gap-6 px-4 py-3 md:w-[18%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Long %
        </p>
      </div>
      <div className="hidden flex-row gap-6 px-4 py-3 md:flex md:w-[18%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Short %
        </p>
      </div>
      <div className="hidden flex-row gap-6 px-4 py-3 md:flex md:w-[18%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Open Interest
        </p>
      </div>
      <div className="flex w-[25%] flex-row gap-6 px-4 py-3 md:w-[18%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          24H Fun Rate
        </p>
      </div>
    </div>
  );
}
