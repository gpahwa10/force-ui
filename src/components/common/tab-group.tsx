import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface TabGroupProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: { label: string; value: string }[];
}

export default function TabGroup({
  activeTab,
  setActiveTab,
  tabs,
}: TabGroupProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList
        style={{ scrollbarWidth: "none" }}
        className="bg-elevation-container flex h-auto max-w-[70vw] flex-row items-center justify-start gap-[16px] gap-y-1 overflow-x-scroll rounded-lg p-2 md:bg-transparent md:p-0"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:text-text-primary cursor-pointer px-0 py-0 text-[14px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
