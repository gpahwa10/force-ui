import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { DialogClose } from "@/components/ui/dialog";

export default function MarketModal({ type }: { type: string }) {
  const [orderSize, setOrderSize] = useState<string>("50");
  const [leverage, setLeverage] = useState<number>(6);

  const filters = ["Market", "Limit"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

  // Calculate dynamic values
  const orderSizeNum = parseFloat(orderSize) || 0;
  const entryPrice = 102.45; // Would come from props in real scenario
  const estimatedFees = orderSizeNum * 0.001; // 0.1% fee
  const liquidationPrice =
    type === "long"
      ? entryPrice * (1 - 1 / leverage)
      : entryPrice * (1 + 1 / leverage);

  const onFilterClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string,
  ) => {
    e.stopPropagation();
    setSelectedFilter(label);
  };
  return (
    <>
      <DialogClose asChild>
        <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
          <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
            {type === "long" ? "Long" : "Short"}
          </p>
          <X className="text-text-secondary" width={14} height={14} />
        </Button>
      </DialogClose>
      <div className="flex w-full flex-col gap-5 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex w-fit flex-row gap-2">
          {filters.map((label) => {
            const isSelected = selectedFilter === label;
            return (
              <Button
                key={label}
                onClick={(e) => onFilterClick(e, label)}
                className={`flex h-fit flex-row items-center justify-center gap-[4px] rounded-[100px] border px-[10px] py-[6px] transition-colors duration-200 ease-out hover:cursor-pointer ${
                  isSelected
                    ? "bg-main border-black/5"
                    : "border-main/7 hover:bg-primary-foreground bg-white"
                }`}
              >
                <p
                  className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
                    isSelected ? "text-white" : "text-sub-500"
                  }`}
                >
                  {label}
                </p>
              </Button>
            );
          })}
        </div>

        <div className="flex w-full flex-col">
          <div className="border-light-gray flex w-full flex-row justify-end gap-4 border-b py-4">
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex w-[87px] flex-row items-center gap-2">
                <p className="text-text-secondary text-[14px] leading-[100%] font-medium tracking-[-1%] text-nowrap">
                  Order size
                </p>
              </div>
              <div className="border-main/7 relative flex h-12 w-full items-center justify-end gap-1 rounded-[10px] border bg-white px-5">
                <span className="text-text-primary/20 text-[24px] font-medium">
                  $
                </span>
                <Input
                  type="text"
                  value={orderSize}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setOrderSize(value);
                  }}
                  placeholder="50"
                  size={Math.max(orderSize.length, 2)}
                  className="text-text-primary placeholder:text-text-primary/20 h-12 w-auto min-w-[2ch] shrink-0 border-0 bg-transparent p-0 text-right text-[24px]! font-medium placeholder:!text-[24px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
          <div className="border-light-gray flex w-full flex-col gap-4 border-b py-4">
            <div className="flex flex-row justify-between">
              <p className="text-text-primary text-[14px] leading-[100%] font-semibold tracking-[-1%]">
                Leverage
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
              <div className="flex w-full flex-col gap-3.5 sm:min-w-[286px]">
                <Slider
                  defaultValue={[6]}
                  min={1}
                  max={10}
                  step={1}
                  showLabels={true}
                  labels={[
                    "1x",
                    "2x",
                    "3x",
                    "4x",
                    "5x",
                    "6x",
                    "7x",
                    "8x",
                    "9x",
                    "10x",
                  ]}
                  onValueChange={(value) => setLeverage(value[0])}
                />
              </div>
              <div className="border-main/7 flex h-10 w-[50px] flex-row items-center justify-center gap-1 self-start rounded-[10px] border bg-white px-4 py-2.5 sm:self-auto">
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  {leverage}x
                </p>
              </div>
            </div>
          </div>
          <div className="border-light-gray flex w-full flex-col border-b">
            {" "}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="data-[state=open]:bg-main/2 data-[state=open]:my-5 data-[state=open]:px-5"
              >
                <AccordionTrigger>Advanced parameters</AccordionTrigger>
                <AccordionContent>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Side:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        {type === "long" ? "Long" : "Short"}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Entry Price:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${entryPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Order Size:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${orderSizeNum.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Leverage:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        {leverage}x
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Est. Fees:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${estimatedFees.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Liq. Price:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${liquidationPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="border-light-gray flex w-full flex-col border-b">
            {" "}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="data-[state=open]:bg-main/2 data-[state=open]:my-5 data-[state=open]:px-5"
              >
                <AccordionTrigger>Trade summary</AccordionTrigger>
                <AccordionContent>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Side:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        {type === "long" ? "Long" : "Short"}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Entry Price:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${entryPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Order Size:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${orderSizeNum.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Leverage:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        {leverage}x
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Est. Fees:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${estimatedFees.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between">
                      <p className="text-text-secondary text-[14px] leading-[100%] tracking-[-1%]">
                        Liq. Price:
                      </p>
                      <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                        ${liquidationPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="bg-lighter-yellow flex w-full flex-row gap-3 rounded-lg border border-[#e1c925]/8 px-3 py-2.5">
          <div className="bg-light-yellow flex flex-row items-center justify-center gap-1 rounded-[52px] p-2.5">
            <Image src="/icons/gift.svg" alt="gift" width={14} height={14} />
          </div>
          <p className="text-dark-yellow text-[12px] leading-[140%] font-medium tracking-[-1%]">
            Place your first $10 trade to unlock your starter position.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button className="bg-main flex h-10 w-full flex-row items-center justify-center gap-2 rounded-lg px-4 py-2.5 hover:cursor-pointer">
            <p>Confirm Market Order</p>
          </Button>
          <p className="text-text-secondary w-full text-center text-[11px] leading-[100%] tracking-[-1%]">
            Order will execute immediately at the best available price.
          </p>
        </div>
      </div>
    </>
  );
}
