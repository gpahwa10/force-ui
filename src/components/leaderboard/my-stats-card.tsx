export default function MyStatsCard() {
  return (
    <div className="bg-elevation-card flex flex-1 flex-col items-start gap-6 self-stretch rounded-[20px] p-4 sm:gap-8 sm:p-5">
      {/* Header with Title and Badges */}
      <div className="dark:border-border-secondary flex w-full items-center justify-between self-stretch border-b">
        <div className="flex flex-1 items-center justify-between pb-5">
          <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
            My Stats
          </span>
          <div className="flex h-[13px] items-center gap-1.5">
            {/* Bronze Badge */}
            <div className="border-border-secondary bg-elevation-card flex h-[26px] items-center gap-1 overflow-hidden rounded-lg border px-2.5 py-2.5">
              <div className="relative flex h-4 items-center justify-center overflow-hidden px-0.5 py-[1px]">
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-[0.8px] border-[#694B11] bg-gradient-to-r from-[#B69C40] via-[#A67C34] to-[#BA954F]">
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <path
                      d="M2.91895 1.26367L2.18945 2.52832H2.1875L2.91211 3.7832L2.91406 3.78125H4.37402L5.10352 5.0459L4.37402 6.30957H2.91406L2.18359 5.04492L0.729492 2.52832L0 1.26367L0.729492 0H2.18945L2.91895 1.26367ZM7.29297 1.26367L6.56348 2.52832H5.10352L4.37402 1.26367L5.10352 0H6.56348L7.29297 1.26367Z"
                      fill="url(#paint0_linear_bronze)"
                    />
                    <path
                      d="M2.91895 1.26367L2.18945 2.52832H2.1875L2.91211 3.7832L2.91406 3.78125H4.37402L5.10352 5.0459L4.37402 6.30957H2.91406L2.18359 5.04492L0.729492 2.52832L0 1.26367L0.729492 0H2.18945L2.91895 1.26367ZM7.29297 1.26367L6.56348 2.52832H5.10352L4.37402 1.26367L5.10352 0H6.56348L7.29297 1.26367Z"
                      fill="black"
                      fillOpacity="0.05"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_bronze"
                        x1="1.82324"
                        y1="7.1063"
                        x2="5.08489"
                        y2="-12.5272"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.025" stopColor="#694B11" />
                        <stop offset="0.915" stopColor="#E0AE50" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
                Bronze
              </span>
            </div>
            {/* 248 Badge */}
            <div className="border-border-secondary bg-elevation-card flex h-[26px] items-center justify-center gap-1 rounded-lg border px-2.5 py-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.5 9.5V6.5C4.5 6.36739 4.44732 6.24021 4.35355 6.14645C4.25979 6.05268 4.13261 6 4 6H2C1.86739 6 1.74021 6.05268 1.64645 6.14645C1.55268 6.24021 1.5 6.36739 1.5 6.5V9.5C1.5 9.63261 1.55268 9.75979 1.64645 9.85355C1.74021 9.94732 1.86739 10 2 10M4.5 9.5C4.5 9.63261 4.44732 9.75979 4.35355 9.85355C4.25979 9.94732 4.13261 10 4 10H2M4.5 9.5C4.5 9.63261 4.55268 9.75979 4.64645 9.85355C4.74021 9.94732 4.86739 10 5 10H7C7.13261 10 7.25979 9.94732 7.35355 9.85355C7.44732 9.75979 7.5 9.63261 7.5 9.5M4.5 9.5V4.5C4.5 4.36739 4.55268 4.24021 4.64645 4.14645C4.74021 4.05268 4.86739 4 5 4H7C7.13261 4 7.25979 4.05268 7.35355 4.14645C7.44732 4.24021 7.5 4.36739 7.5 4.5V9.5M2 10H9M7.5 9.5C7.5 9.63261 7.55268 9.75979 7.64645 9.85355C7.74021 9.94732 7.86739 10 8 10H10C10.1326 10 10.2598 9.94732 10.3536 9.85355C10.4473 9.75979 10.5 9.63261 10.5 9.5V2.5C10.5 2.36739 10.4473 2.24021 10.3536 2.14645C10.2598 2.05268 10.1326 2 10 2H8C7.86739 2 7.74021 2.05268 7.64645 2.14645C7.55268 2.24021 7.5 2.36739 7.5 2.5V9.5Z"
                  stroke="currentColor"
                  className="text-text-secondary"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
                248
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-3">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <circle
            cx="21"
            cy="21"
            r="20.3"
            fill="url(#pattern_avatar)"
            stroke="#F6F6F6"
            strokeWidth="1.4"
          />
          <defs>
            <pattern
              id="pattern_avatar"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <rect width="1" height="1" fill="#D9D9D9" />
            </pattern>
          </defs>
        </svg>
        <div className="flex flex-1 flex-col items-start gap-2">
          <h2 className="text-text-primary self-stretch text-xl leading-[22px] font-medium tracking-[-0.4px]">
            marineboa#3271
          </h2>
          <div className="flex items-start self-stretch">
            <p className="text-text-secondary flex-1 text-xl leading-[22px] font-medium tracking-[-0.4px] opacity-65">
              Rep: 248
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="border-elevation-bg dark:border-border-secondary flex flex-col items-center gap-5 self-stretch border-b pb-5">
        <div className="flex flex-wrap items-start gap-2 self-stretch overflow-hidden whitespace-nowrap">
          {/* PnL Card */}
          <div className="bg-elevation-bg flex flex-1 shrink-0 flex-col items-start gap-5 rounded-[9px] p-3.5">
            <div className="flex items-center gap-1.5 self-stretch">
              <span className="text-text-secondary flex-1 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                PnL
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-text-primary text-xl leading-[22px] font-medium tracking-[-0.4px]">
                +$1,902
              </span>
              <div className="flex h-1.5 items-center gap-[3px]">
                <span className="text-dark-green text-right text-[10px] leading-[10px] font-medium tracking-[-0.1px]">
                  +2.84%
                </span>
              </div>
            </div>
          </div>

          {/* Open Positions Card */}
          <div className="bg-elevation-bg flex flex-1 shrink-0 flex-col items-start gap-5 rounded-[9px] p-3.5">
            <div className="flex items-center gap-1.5 self-stretch">
              <span className="text-text-secondary flex-1 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                Open Positions
              </span>
            </div>
            <span className="text-text-primary text-xl leading-[22px] font-medium tracking-[-0.4px]">
              120
            </span>
          </div>

          {/* Win Rate Card */}
          <div className="bg-elevation-bg flex flex-1 shrink-0 flex-col items-start gap-5 rounded-[9px] p-3.5">
            <div className="flex items-center gap-1.5 self-stretch">
              <span className="text-text-secondary flex-1 text-[11px] leading-[11px] font-medium tracking-[-0.1px]">
                Win Rate
              </span>
            </div>
            <span className="text-text-primary text-xl leading-[22px] font-medium tracking-[-0.4px]">
              66.4%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-start gap-2 self-stretch whitespace-nowrap">
        <button className="bg-text-primary flex flex-1 items-center justify-center gap-2.5 rounded-lg px-5 py-4">
          <span className="text-elevation-card text-xs leading-3 font-semibold tracking-[-0.1px]">
            More details
          </span>
        </button>
        <button className="bg-elevation-button flex flex-1 items-center justify-center gap-2.5 rounded-lg px-5 py-4">
          <span className="text-text-primary text-xs leading-3 font-semibold tracking-[-0.1px]">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}
