import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayEvent {
  time: string;
  teamLogo: string;
  teamAlt: string;
  description: string;
  detScore: number;
  cleScore: number;
}

interface QuarterBreakdownProps {
  events?: PlayEvent[];
}

export default function QuarterBreakdown({
  events = [
    {
      time: "12:00",
      teamLogo: "/icons/events/lal.png",
      teamAlt: "LAL",
      description:
        "Jalen Duren vs. Jarrett Allen (Evan Mobley gains possession)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/lal.png",
      teamAlt: "LAL",
      description:
        "Jalen Duren vs. Jarrett Allen (Evan Mobley gains possession)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
    {
      time: "12:00",
      teamLogo: "/icons/events/gsw.png",
      teamAlt: "GSW",
      description: "Sam Merrill bad pass (Ausar Thompson steals)",
      detScore: 0,
      cleScore: 0,
    },
  ],
}: QuarterBreakdownProps) {
  return (
    <div className="border-border-secondary bg-elevation-container w-full rounded-[14px] border p-4 pt-1">
      <Table className="w-full min-w-0 table-auto border-separate border-spacing-y-0.5 !px-0">
        <TableHeader>
          <TableRow className="border-0">
            <TableHead className="text-text-secondary w-12 border-0 px-2 py-2 text-[11px] leading-[100%] font-medium tracking-[-0.11px] sm:w-16">
              Time
            </TableHead>
            <TableHead className="text-text-secondary flex-1 border-0 px-2 py-2 text-[11px] leading-[100%] font-medium tracking-[-0.11px]">
              Play
            </TableHead>
            <TableHead className="text-text-secondary w-10 border-0 px-2 py-2 text-[11px] leading-[100%] font-medium tracking-[-0.11px] sm:w-16">
              DET
            </TableHead>
            <TableHead className="text-text-secondary w-10 border-0 px-2 py-2 text-[11px] leading-[100%] font-medium tracking-[-0.11px] sm:w-16">
              CLE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow
              key={index}
              className="bg-elevation-card-raise overflow-hidden rounded-[10px] border-0 transition-colors"
            >
              <TableCell className="text-text-primary w-12 rounded-tl-[10px] rounded-bl-[10px] px-2 py-2 text-xs leading-[100%] font-medium tracking-[-0.12px] sm:w-16 sm:px-3 sm:py-3">
                {event.time}
              </TableCell>
              <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
                    <Image
                      src={event.teamLogo}
                      alt={event.teamAlt}
                      width={24}
                      height={24}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-text-primary min-w-0 flex-1 text-[11px] leading-[120%] font-medium tracking-[-0.12px] sm:truncate sm:text-xs sm:leading-[100%]">
                    {event.description}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-text-primary w-10 px-2 py-2 text-xs leading-[100%] font-medium tracking-[-0.12px] sm:w-16 sm:px-3 sm:py-3">
                {event.detScore}
              </TableCell>
              <TableCell className="text-text-primary w-10 rounded-tr-[10px] rounded-br-[10px] px-2 py-2 text-xs leading-[100%] font-medium tracking-[-0.12px] sm:w-16 sm:px-3 sm:py-3">
                {event.cleScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
