"use client";

interface LiveStatsSectionProps {
  volume: string;
  spreadText: string;
  projectedFinal: string;
}

export default function LiveStatsSection({
  volume,
  spreadText,
  projectedFinal,
}: LiveStatsSectionProps) {
  return (
    <section id="live-stats">
      <div className="max-w-global border-border-secondary mx-auto w-full border-x">
        <div className="">
          <div className="grid w-full grid-cols-1 sm:grid-cols-3">
            <div className="py-section-md flex w-full flex-col items-center justify-center">
              <h1 className="text-text-secondary text-[12px] font-medium">
                Total Volume
              </h1>
              <p className="text-text-primary text-[14px] font-semibold">
                {volume.replace(" Vol.", "")}
              </p>
            </div>
            <div className="border-border-secondary py-section-md flex w-full flex-col items-center justify-center border-y sm:border-x sm:border-y-0">
              <h1 className="text-text-secondary text-[12px] font-medium">
                Spread
              </h1>
              <p className="text-text-primary text-[14px] font-semibold">
                {spreadText}
              </p>
            </div>
            <div className="py-section-md flex w-full flex-col items-center justify-center">
              <h1 className="text-text-secondary text-[12px] font-medium">
                Performance Value
              </h1>
              <p className="text-text-primary text-[14px] font-semibold">
                {projectedFinal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

