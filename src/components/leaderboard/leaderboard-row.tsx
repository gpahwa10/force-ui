import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";

type LeaderboardRowProps = {
  rank: number;
  rankType: "gold" | "silver" | "bronze" | "default";
  username: string;
  pnl24h: string;
  pnl24hPercent: string;
  pnl24hPositive: boolean;
  totalPnl: string;
  openPositions: string;
  winRate: string;
  experience: string;
  teamLogo: string;
  teamName: string;
  athleteImage?: string;
};

export default function LeaderboardRow({
  rank,
  rankType,
  username,
  pnl24h,
  pnl24hPercent,
  pnl24hPositive,
  totalPnl,
  openPositions,
  winRate,
  experience,
  teamLogo,
  teamName,
  athleteImage,
}: LeaderboardRowProps) {
  const getRankBadge = () => {
    const commonClasses =
      "flex h-5 w-5 aspect-square shrink-0 items-center justify-center rounded-full ";

    if (rankType === "gold") {
      return (
        <div className={`${commonClasses}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              fill="url(#paint0_linear_5004_21577)"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              stroke="url(#paint1_linear_5004_21577)"
              strokeWidth="1.25"
            />
            <path
              d="M9.59 13.9V8.54302H7.918V7.45402H8.589C8.90433 7.45402 9.15733 7.41369 9.348 7.33302C9.53867 7.25236 9.67433 7.11302 9.755 6.91502C9.843 6.70969 9.887 6.43469 9.887 6.09002H11.02V13.9H9.59Z"
              fill="url(#paint2_linear_5004_21577)"
            />
            <path
              d="M9.59 13.9V8.54302H7.918V7.45402H8.589C8.90433 7.45402 9.15733 7.41369 9.348 7.33302C9.53867 7.25236 9.67433 7.11302 9.755 6.91502C9.843 6.70969 9.887 6.43469 9.887 6.09002H11.02V13.9H9.59Z"
              fill="black"
              fillOpacity="0.05"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5004_21577"
                x1="-23.441"
                y1="31.3357"
                x2="29.441"
                y2="-7.33574"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFEFB8" />
                <stop offset="0.25" stopColor="#E0C66B" />
                <stop offset="0.5" stopColor="#F7D155" />
                <stop offset="0.75" stopColor="#FFEB9A" />
                <stop offset="1" stopColor="#FFEEAB" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5004_21577"
                x1="10"
                y1="0"
                x2="10"
                y2="20"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CBB359" />
                <stop offset="1" stopColor="#927D2F" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_5004_21577"
                x1="8.75"
                y1="-3.45521"
                x2="15.5262"
                y2="14.3944"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CBB359" />
                <stop offset="1" stopColor="#927D2F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    if (rankType === "silver") {
      return (
        <div className={`${commonClasses} `}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              fill="url(#paint0_linear_5004_21619)"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              fill="url(#paint1_linear_5004_21619)"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              fill="black"
              fillOpacity="0.05"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              stroke="url(#paint2_linear_5004_21619)"
              strokeWidth="1.25"
            />
            <path
              d="M7.12019 13.9C7.12019 13.2694 7.20819 12.7194 7.38419 12.25C7.56019 11.7734 7.85719 11.3407 8.27519 10.952C8.69319 10.556 9.25786 10.171 9.96919 9.79702C10.3212 9.60636 10.6035 9.43769 10.8162 9.29102C11.0289 9.14436 11.1829 8.99402 11.2782 8.84002C11.3735 8.67869 11.4212 8.48802 11.4212 8.26802C11.4212 8.04802 11.3735 7.85736 11.2782 7.69602C11.1829 7.52736 11.0399 7.39536 10.8492 7.30002C10.6659 7.20469 10.4349 7.15702 10.1562 7.15702C9.70886 7.15702 9.35319 7.28536 9.08919 7.54202C8.83252 7.79136 8.67486 8.15069 8.61619 8.62002L7.14219 8.53202C7.21552 7.71802 7.51252 7.08002 8.03319 6.61802C8.56119 6.14869 9.26886 5.91402 10.1562 5.91402C10.7282 5.91402 11.2195 6.01302 11.6302 6.21102C12.0409 6.40169 12.3525 6.67302 12.5652 7.02502C12.7852 7.37702 12.8952 7.78402 12.8952 8.24602C12.8952 8.64202 12.8255 8.98302 12.6862 9.26902C12.5542 9.55502 12.3342 9.81902 12.0262 10.061C11.7255 10.2957 11.3185 10.5487 10.8052 10.82C10.1599 11.1647 9.67586 11.4984 9.35319 11.821C9.03052 12.1364 8.85819 12.415 8.83619 12.657H12.8952V13.9H7.12019Z"
              fill="url(#paint3_linear_5004_21619)"
            />
            <path
              d="M7.12019 13.9C7.12019 13.2694 7.20819 12.7194 7.38419 12.25C7.56019 11.7734 7.85719 11.3407 8.27519 10.952C8.69319 10.556 9.25786 10.171 9.96919 9.79702C10.3212 9.60636 10.6035 9.43769 10.8162 9.29102C11.0289 9.14436 11.1829 8.99402 11.2782 8.84002C11.3735 8.67869 11.4212 8.48802 11.4212 8.26802C11.4212 8.04802 11.3735 7.85736 11.2782 7.69602C11.1829 7.52736 11.0399 7.39536 10.8492 7.30002C10.6659 7.20469 10.4349 7.15702 10.1562 7.15702C9.70886 7.15702 9.35319 7.28536 9.08919 7.54202C8.83252 7.79136 8.67486 8.15069 8.61619 8.62002L7.14219 8.53202C7.21552 7.71802 7.51252 7.08002 8.03319 6.61802C8.56119 6.14869 9.26886 5.91402 10.1562 5.91402C10.7282 5.91402 11.2195 6.01302 11.6302 6.21102C12.0409 6.40169 12.3525 6.67302 12.5652 7.02502C12.7852 7.37702 12.8952 7.78402 12.8952 8.24602C12.8952 8.64202 12.8255 8.98302 12.6862 9.26902C12.5542 9.55502 12.3342 9.81902 12.0262 10.061C11.7255 10.2957 11.3185 10.5487 10.8052 10.82C10.1599 11.1647 9.67586 11.4984 9.35319 11.821C9.03052 12.1364 8.85819 12.415 8.83619 12.657H12.8952V13.9H7.12019Z"
              fill="black"
              fillOpacity="0.05"
            />
            <path
              d="M7.12019 13.9C7.12019 13.2694 7.20819 12.7194 7.38419 12.25C7.56019 11.7734 7.85719 11.3407 8.27519 10.952C8.69319 10.556 9.25786 10.171 9.96919 9.79702C10.3212 9.60636 10.6035 9.43769 10.8162 9.29102C11.0289 9.14436 11.1829 8.99402 11.2782 8.84002C11.3735 8.67869 11.4212 8.48802 11.4212 8.26802C11.4212 8.04802 11.3735 7.85736 11.2782 7.69602C11.1829 7.52736 11.0399 7.39536 10.8492 7.30002C10.6659 7.20469 10.4349 7.15702 10.1562 7.15702C9.70886 7.15702 9.35319 7.28536 9.08919 7.54202C8.83252 7.79136 8.67486 8.15069 8.61619 8.62002L7.14219 8.53202C7.21552 7.71802 7.51252 7.08002 8.03319 6.61802C8.56119 6.14869 9.26886 5.91402 10.1562 5.91402C10.7282 5.91402 11.2195 6.01302 11.6302 6.21102C12.0409 6.40169 12.3525 6.67302 12.5652 7.02502C12.7852 7.37702 12.8952 7.78402 12.8952 8.24602C12.8952 8.64202 12.8255 8.98302 12.6862 9.26902C12.5542 9.55502 12.3342 9.81902 12.0262 10.061C11.7255 10.2957 11.3185 10.5487 10.8052 10.82C10.1599 11.1647 9.67586 11.4984 9.35319 11.821C9.03052 12.1364 8.85819 12.415 8.83619 12.657H12.8952V13.9H7.12019Z"
              fill="black"
              fillOpacity="0.05"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5004_21619"
                x1="-2"
                y1="4.66965e-07"
                x2="39.375"
                y2="23.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.25" stopColor="#B69C40" />
                <stop offset="0.5" stopColor="#A67C34" />
                <stop offset="0.75" stopColor="#BA954F" />
                <stop offset="0.873153" stopColor="#9F772C" />
                <stop offset="1" stopColor="#AB8253" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5004_21619"
                x1="-2.22222"
                y1="2.22222"
                x2="20"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.15" stopColor="#EAEEE2" />
                <stop offset="0.3" stopColor="#FAFCFE" />
                <stop offset="0.45" stopColor="#AEADAD" />
                <stop offset="0.618064" stopColor="#C0C0C0" />
                <stop offset="0.75" stopColor="#FAFCFE" />
                <stop offset="0.85" stopColor="#EAF0F0" />
                <stop offset="0.968891" stopColor="#DCE0E7" />
                <stop offset="1" stopColor="#EBEEF2" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_5004_21619"
                x1="5"
                y1="-15"
                x2="20"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.15" stopColor="#EAEEE2" />
                <stop offset="0.3" stopColor="#FAFCFE" />
                <stop offset="0.45" stopColor="#AEADAD" />
                <stop offset="0.618064" stopColor="#C0C0C0" />
                <stop offset="0.75" stopColor="#FAFCFE" />
                <stop offset="0.85" stopColor="#EAF0F0" />
                <stop offset="0.968891" stopColor="#DCE0E7" />
                <stop offset="1" stopColor="#EBEEF2" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_5004_21619"
                x1="2"
                y1="-20.7419"
                x2="21.8247"
                y2="20.3776"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.15" stopColor="#EAEEE2" />
                <stop offset="1" stopColor="#656565" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    if (rankType === "bronze") {
      return (
        <div className={`${commonClasses} `}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="20"
              height="20"
              rx="10"
              fill="url(#paint0_linear_5004_21661)"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              stroke="url(#paint1_linear_5004_21661)"
              strokeOpacity="0.9"
              strokeWidth="1.25"
            />
            <rect
              x="0.625"
              y="0.625"
              width="18.75"
              height="18.75"
              rx="9.375"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="1.25"
            />
            <path
              d="M9.97405 14.076C9.04271 14.076 8.32405 13.8634 7.81805 13.438C7.31205 13.0054 7.04071 12.426 7.00405 11.7L8.46705 11.634C8.51105 12.052 8.66505 12.3564 8.92905 12.547C9.20038 12.7377 9.54871 12.833 9.97405 12.833C10.26 12.833 10.5204 12.7927 10.755 12.712C10.9897 12.624 11.1767 12.492 11.316 12.316C11.4554 12.14 11.525 11.9127 11.525 11.634C11.525 11.2087 11.382 10.8934 11.096 10.688C10.81 10.4827 10.4287 10.38 9.95205 10.38H9.27005V9.24702H9.95205C10.326 9.24702 10.6377 9.17002 10.887 9.01602C11.1437 8.85469 11.272 8.58702 11.272 8.21302C11.272 7.87569 11.1657 7.61536 10.953 7.43202C10.7477 7.24869 10.425 7.15702 9.98505 7.15702C9.55238 7.15702 9.22605 7.24502 9.00605 7.42102C8.78605 7.59702 8.65405 7.82802 8.61005 8.11402L7.14705 8.03702C7.22771 7.39169 7.51005 6.87836 7.99405 6.49702C8.48538 6.10836 9.14905 5.91402 9.98505 5.91402C10.5717 5.91402 11.0704 6.00202 11.481 6.17802C11.8917 6.35402 12.2034 6.60336 12.416 6.92602C12.636 7.24869 12.746 7.63369 12.746 8.08102C12.746 8.55036 12.592 8.93536 12.284 9.23602C11.976 9.53669 11.536 9.73836 10.964 9.84102V9.65402C11.602 9.74202 12.1007 9.96936 12.46 10.336C12.8194 10.6954 12.999 11.1537 12.999 11.711C12.999 12.2097 12.8744 12.635 12.625 12.987C12.3757 13.339 12.0237 13.6104 11.569 13.801C11.1144 13.9844 10.5827 14.076 9.97405 14.076Z"
              fill="white"
            />
            <path
              d="M9.97405 14.076C9.04271 14.076 8.32405 13.8634 7.81805 13.438C7.31205 13.0054 7.04071 12.426 7.00405 11.7L8.46705 11.634C8.51105 12.052 8.66505 12.3564 8.92905 12.547C9.20038 12.7377 9.54871 12.833 9.97405 12.833C10.26 12.833 10.5204 12.7927 10.755 12.712C10.9897 12.624 11.1767 12.492 11.316 12.316C11.4554 12.14 11.525 11.9127 11.525 11.634C11.525 11.2087 11.382 10.8934 11.096 10.688C10.81 10.4827 10.4287 10.38 9.95205 10.38H9.27005V9.24702H9.95205C10.326 9.24702 10.6377 9.17002 10.887 9.01602C11.1437 8.85469 11.272 8.58702 11.272 8.21302C11.272 7.87569 11.1657 7.61536 10.953 7.43202C10.7477 7.24869 10.425 7.15702 9.98505 7.15702C9.55238 7.15702 9.22605 7.24502 9.00605 7.42102C8.78605 7.59702 8.65405 7.82802 8.61005 8.11402L7.14705 8.03702C7.22771 7.39169 7.51005 6.87836 7.99405 6.49702C8.48538 6.10836 9.14905 5.91402 9.98505 5.91402C10.5717 5.91402 11.0704 6.00202 11.481 6.17802C11.8917 6.35402 12.2034 6.60336 12.416 6.92602C12.636 7.24869 12.746 7.63369 12.746 8.08102C12.746 8.55036 12.592 8.93536 12.284 9.23602C11.976 9.53669 11.536 9.73836 10.964 9.84102V9.65402C11.602 9.74202 12.1007 9.96936 12.46 10.336C12.8194 10.6954 12.999 11.1537 12.999 11.711C12.999 12.2097 12.8744 12.635 12.625 12.987C12.3757 13.339 12.0237 13.6104 11.569 13.801C11.1144 13.9844 10.5827 14.076 9.97405 14.076Z"
              fill="url(#paint2_linear_5004_21661)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5004_21661"
                x1="-2"
                y1="4.66965e-07"
                x2="39.375"
                y2="23.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.25" stopColor="#B69C40" />
                <stop offset="0.5" stopColor="#A67C34" />
                <stop offset="0.75" stopColor="#BA954F" />
                <stop offset="0.873153" stopColor="#9F772C" />
                <stop offset="1" stopColor="#AB8253" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_5004_21661"
                x1="5"
                y1="22.5251"
                x2="16.8428"
                y2="-39.1513"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.025" stopColor="#694B11" />
                <stop offset="0.915" stopColor="#E0AE50" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_5004_21661"
                x1="8"
                y1="17.2888"
                x2="16.6812"
                y2="-15.5919"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.025" stopColor="#694B11" />
                <stop offset="0.915" stopColor="#E0AE50" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    // Default
    return (
      <div className={`${commonClasses} bg-elevation-bg`}>
        <span className="text-text-secondary text-center text-[11px] leading-[11px] font-semibold tracking-[-0.1px]">
          {rank}
        </span>
      </div>
    );
  };

  return (
    <TableRow className="bg-elevation-card mb-2 overflow-hidden rounded-[14px] border-0 transition-colors duration-200 ease-out">
      {/* Rank Badge */}
      <TableCell className="w-10 rounded-tl-[14px] rounded-bl-[14px] px-3 py-3">
        <div className="flex items-center gap-2">{getRankBadge()}</div>
      </TableCell>

      {/* Player */}
      <TableCell className="w-[200px] px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="border-border-secondary relative aspect-square h-8 w-8 overflow-hidden rounded-[29.463px] border bg-gray-200">
            <Image
              src={athleteImage || "/images/players/lebron-james.png"}
              alt={username}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="text-text-primary text-[13px] leading-[13px] font-medium tracking-[-0.1px]">
              {username}
            </span>
          </div>
        </div>
      </TableCell>

      {/* 24H PnL */}
      <TableCell className="px-3 py-3">
        <div className="flex items-start gap-1">
          <span
            className={`text-xs leading-3 font-medium tracking-[-0.1px] ${pnl24hPositive ? "text-text-primary" : "text-neon-pink"
              }`}
          >
            {pnl24h}
          </span>
          <span
            className={`text-xs leading-3 font-medium tracking-[-0.1px] ${pnl24hPositive ? "text-light-green" : "text-neon-pink"
              }`}
          >
            ({pnl24hPercent})
          </span>
        </div>
      </TableCell>

      {/* Total PnL */}
      <TableCell className="px-3 py-3">
        <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
          {totalPnl}
        </span>
      </TableCell>

      {/* Open Positions */}
      <TableCell className="w-[14%] px-3 py-3">
        <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
          {openPositions}
        </span>
      </TableCell>

      {/* Win Rate */}
      <TableCell className="px-3 py-3">
        <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
          {winRate}
        </span>
      </TableCell>

      {/* Experience Badge */}
      <TableCell className="px-3 py-3">
        <div className="border-border-secondary bg-elevation-card flex w-fit items-center gap-1 overflow-hidden rounded-lg border px-[7px] py-1">
          <div className="relative flex h-4 items-center justify-center overflow-hidden px-0.5 py-[1px]">
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-[0.8px] border-[#694B11] bg-gradient-to-r from-[#B69C40] via-[#A67C34] to-[#BA954F] pt-[0.8px]">
              <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                <path
                  d="M2.91895 1.26367L2.18945 2.52832H2.1875L2.91211 3.7832L2.91406 3.78125H4.37402L5.10352 5.0459L4.37402 6.30957H2.91406L2.18359 5.04492L0.729492 2.52832L0 1.26367L0.729492 0H2.18945L2.91895 1.26367ZM7.29297 1.26367L6.56348 2.52832H5.10352L4.37402 1.26367L5.10352 0H6.56348L7.29297 1.26367Z"
                  fill="url(#paint0_linear_exp)"
                />
                <path
                  d="M2.91895 1.26367L2.18945 2.52832H2.1875L2.91211 3.7832L2.91406 3.78125H4.37402L5.10352 5.0459L4.37402 6.30957H2.91406L2.18359 5.04492L0.729492 2.52832L0 1.26367L0.729492 0H2.18945L2.91895 1.26367ZM7.29297 1.26367L6.56348 2.52832H5.10352L4.37402 1.26367L5.10352 0H6.56348L7.29297 1.26367Z"
                  fill="black"
                  fillOpacity="0.05"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_exp"
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
            {experience}
          </span>
        </div>
      </TableCell>

      {/* Mark (Team) */}
      <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-3 py-3">
        <div className="flex items-center gap-1.5">
          <div className="flex aspect-square h-[22px] w-[22px] items-center justify-center">
            <Image
              src={teamLogo}
              alt={teamName}
              width={22}
              height={22}
              className="aspect-square shrink-0"
            />
          </div>
          <span className="text-text-primary text-xs leading-3 font-medium tracking-[-0.1px]">
            {teamName}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
