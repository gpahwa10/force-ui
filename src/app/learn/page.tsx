"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import LearnSidebar from "@/components/learn-page/learn-sidebar";
import ArticleContent, {
  ArticleSection,
  ArticleParagraph,
  ArticleExample,
} from "@/components/learn-page/article-content";
import AthleteUpdateCard from "@/components/learn-page/athlete-update-card";
import IndexComponentsTable from "@/components/learn-page/index-components-table";
import RelatedTopics from "@/components/learn-page/related-topics";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LearnPage() {
  const [activeArticle, setActiveArticle] = useState("what-is-athlete-index");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleArticleSelect = (slug: string) => {
    setActiveArticle(slug);
    setMobileMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="learn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-page-background flex w-full flex-col justify-center gap-[24px] px-[16px] pt-[117px] md:px-[40px] lg:flex-row lg:gap-[40px]">
          {/* Left sidebar: fixed width on desktop, hidden on mobile */}
          <div className="hidden min-h-0 w-[280px] flex-col overflow-y-hidden overscroll-contain pb-[24px] [-ms-overflow-style:none] [scrollbar-width:none] hover:overflow-y-auto lg:flex [&::-webkit-scrollbar]:hidden">
            <LearnSidebar
              activeArticle={activeArticle}
              onArticleSelect={setActiveArticle}
            />
          </div>

          {/* Main content: scrollable */}
          <div className="mt-0 mb-[24px] flex min-h-0 w-full flex-col gap-6 overflow-y-auto overscroll-contain rounded-[12px] bg-white p-[20px] [-ms-overflow-style:none] [scrollbar-width:none] md:mt-6 md:gap-8 md:rounded-[20px] md:p-[40px] lg:w-[1089px] [&::-webkit-scrollbar]:hidden">
            {/* Mobile menu button */}
            <div className="mb-2 flex justify-start lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="text-text-primary bg-learn-gray hover:bg-learn-gray/80 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    <Menu className="h-5 w-5" />
                    Browse Topics
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[280px] overflow-y-auto bg-white p-0"
                >
                  <div className="p-4">
                    <LearnSidebar
                      activeArticle={activeArticle}
                      onArticleSelect={handleArticleSelect}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <ArticleContent
              category="PERFORMANCE INDEXES"
              title="What Is an Athlete Index?"
            >
              {/* Athlete Update Card */}
              <AthleteUpdateCard />

              {/* Article text */}
              <ArticleSection>
                <ArticleParagraph>
                  An Athlete Index tracks the real-time performance of a player
                  based on measurable stats — points, assists, rebounds, and
                  more. Instead of predicting a single outcome like a win, you
                  trade based on ongoing performance trends.
                </ArticleParagraph>

                <ArticleExample>
                  LeBron James&apos; Index moves when his performance metrics
                  like PPG or FG% change — not just the team&apos;s win/loss.
                </ArticleExample>
              </ArticleSection>

              {/* Index Components Table */}
              <ArticleSection title="Index Components:">
                <IndexComponentsTable />
              </ArticleSection>

              <div className="border-main/5 h-0 w-full border"></div>

              {/* Related Topics */}
              <RelatedTopics onTopicClick={setActiveArticle} />
            </ArticleContent>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
