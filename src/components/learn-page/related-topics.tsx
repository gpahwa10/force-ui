"use client";

interface RelatedTopic {
  id: string;
  title: string;
  category: string;
  svgUrl: string;
}

const relatedTopicsData: RelatedTopic[] = [
  {
    id: "how-prices-move",
    title: "How Index Prices Move",
    category: "PERFORMANCE INDEXES",
    svgUrl: "/images/learn/how-index-moves.svg",
  },
  {
    id: "long-vs-short",
    title: "Long vs. Short Positions",
    category: "TRADING MECHANICS",
    svgUrl: "/images/learn/long-vs-short.svg",
  },
];

interface RelatedTopicsProps {
  topics?: RelatedTopic[];
  onTopicClick?: (topicId: string) => void;
}

export default function RelatedTopics({
  topics = relatedTopicsData,
  onTopicClick,
}: RelatedTopicsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="font-nohemi text-text-primary text-[16px] leading-5 font-medium tracking-[0.4px]">
        Related Topics
      </h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {topics.map((topic) => {
          return (
            <button
              key={topic.id}
              onClick={() => onTopicClick?.(topic.id)}
              className="hover:border-base-purple flex flex-col overflow-hidden rounded-[10px] border border-black/7 bg-white p-1 text-left transition-all hover:shadow-sm"
            >
              {/* Content area */}
              <div
                className="h-[120px] w-full rounded-[10px] bg-contain bg-center bg-no-repeat md:h-[150px]"
                style={{ backgroundImage: `url(${topic.svgUrl})` }}
              />

              {/* Footer */}
              <div className="flex flex-col gap-2 bg-white px-4 py-3 md:gap-3 md:px-6 md:py-4">
                <span className="font-inter text-disabled-300 text-[11px] leading-[11px] font-semibold tracking-[0.66px] uppercase">
                  {topic.category}
                </span>
                <span className="font-inter text-text-primary text-[13px] leading-[14px] font-medium md:text-[14px]">
                  {topic.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
