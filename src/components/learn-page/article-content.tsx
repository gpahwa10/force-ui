"use client";

interface ArticleContentProps {
  category: string;
  title: string;
  children: React.ReactNode;
}

export default function ArticleContent({
  category,
  title,
  children,
}: ArticleContentProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Category and Title */}
      <div className="flex flex-col gap-[16px] md:gap-[22px]">
        <span className="font-inter text-[11px] leading-[11px] font-semibold tracking-[0.66px] text-black/20 uppercase md:text-[13px] md:leading-[13px] md:tracking-[0.78px]">
          {category}
        </span>
        <h1 className="font-nohemi text-text-primary text-[24px] leading-[24px] font-normal tracking-[0.48px] md:text-[32px] md:leading-[32px] md:tracking-[0.64px]">
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 md:gap-8">{children}</div>
    </div>
  );
}

interface ArticleSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function ArticleSection({ title, children }: ArticleSectionProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {title && (
        <h2 className="font-nohemi text-text-primary text-[18px] leading-[18px] font-normal tracking-[0.36px] md:text-[20px] md:leading-5 md:tracking-[0.4px]">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3 md:gap-4">{children}</div>
    </div>
  );
}

interface ArticleParagraphProps {
  children: React.ReactNode;
}

export function ArticleParagraph({ children }: ArticleParagraphProps) {
  return (
    <p className="font-inter text-text-secondary text-[15px] leading-[150%] tracking-[-0.15px]">
      {children}
    </p>
  );
}

interface ArticleExampleProps {
  children: React.ReactNode;
}

export function ArticleExample({ children }: ArticleExampleProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-inter text-text-secondary text-[15px] leading-[150%] tracking-[-0.15px]">
        Example:
      </span>
      <p className="font-inter text-text-secondary text-[15px] leading-[150%] tracking-[-0.15px]">
        {children}
      </p>
    </div>
  );
}
