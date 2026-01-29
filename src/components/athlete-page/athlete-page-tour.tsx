"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Tour shows on every visit to athlete page

interface TourStep {
  id: string;
  title: string;
  description: string;
  anchorId?: string; // ID of the element to anchor to
  offsetY?: number; // Vertical offset from the anchor
  offsetX?: number; // Horizontal offset from the anchor
  position?: {
    // Fixed position (used when no anchor)
    top?: string;
    left?: string;
  };
  spotlightId?: string | string[]; // ID(s) of the element(s) to highlight/spotlight
  placement?: "top" | "bottom" | "left" | "right"; // Where to place popover relative to anchor
  alignment?: "top" | "center" | "bottom"; // Vertical alignment when placement is left/right
  arrowPosition?: "top-center" | "top-right" | "middle-right"; // Where to position the arrow
}

const tourSteps: TourStep[] = [
  {
    id: "index-vs-market",
    title: "Index vs Market",
    description:
      "This chart shows how the Athlete Index performs compared to the overall market.\n\nThe Index reflects the athlete's on-court performance, while the Market line shows how traders are valuing them in real time",
    position: {
      top: "120px",
      left: "50%",
    },
    spotlightId: "athlete-ticker-header",
  },
  {
    id: "athlete-overview",
    title: "Athlete Overview Card",
    description:
      "Here you can view the athlete's current market price, performance rating, and league ranking. These metrics update live based on in-game data and user trades.",
    anchorId: "athlete-stats-cards",
    offsetY: 20,
    spotlightId: [
      "stat-card-index-price",
      "stat-card-performance",
      "stat-card-league-rank",
      "stat-card-market-index",
    ],
  },
  {
    id: "funding",
    title: "Funding",
    description:
      "Funding adjusts the balance between long and short traders. If more users are long, they'll pay a small fee to short traders, keeping the market fair and stable",
    anchorId: "price-chart-tab-chart",
    offsetY: 60,
    spotlightId: "price-chart",
  },
  {
    id: "live-feed",
    title: "Live Feed",
    description:
      "Live feed is details if athlete makes a big play, a dunk, game-winner, or record stat. These create short bursts of trading activity and opportunity.",
    anchorId: "price-chart-tab-live-feed",
    offsetY: 60,
    spotlightId: "price-chart",
  },
  {
    id: "market-metrics",
    title: "Market Metrics",
    description:
      "The athlete's market price reflects community sentiment and performance metrics. League Rank shows their relative position in their league. VWR (Vibranum Weighted Rating) combines performance, momentum, and market activity",
    position: {
      top: "120px",
      left: "50%",
    },
    spotlightId: "athlete-ticker-header",
  },
  {
    id: "trade-panel",
    title: "Trade Panel",
    description:
      "Choose your position, Long if you believe the athlete's performance and price will increase,Short if you predict a decline.",
    anchorId: "trading-panel",
    offsetX: -20,
    placement: "left",
    alignment: "top",
    arrowPosition: "middle-right",
    spotlightId: "trading-panel",
  },
];

interface AthletePageTourProps {
  onComplete?: () => void;
}

export default function AthletePageTour({ onComplete }: AthletePageTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [spotlightRects, setSpotlightRects] = useState<DOMRect[]>([]);

  useEffect(() => {
    // Always show tour on page visit
    // Show tour after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    // Update position and spotlight when step changes
    if (!isVisible) return;

    const updatePosition = () => {
      const step = tourSteps[currentStep];

      // Update spotlight(s)
      if (step.spotlightId) {
        const spotlightIds = Array.isArray(step.spotlightId)
          ? step.spotlightId
          : [step.spotlightId];

        const rects: DOMRect[] = [];
        spotlightIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            // Elevate z-index so cards appear above backdrop
            el.style.position = 'relative';
            el.style.zIndex = '102';
            rects.push(el.getBoundingClientRect());
          }
        });
        setSpotlightRects(rects);
      } else {
        setSpotlightRects([]);
      }

      // Check if step has a fixed position (for top center positioning)
      if (step.position) {
        // Use fixed position for first step (top center)
        setPosition({
          top: parseInt(step.position.top || "0"),
          left: window.innerWidth / 2, // Center of screen
        });
      } else if (step.anchorId) {
        // Use anchor-based positioning for other steps
        const anchor = document.getElementById(step.anchorId);
        if (anchor) {
          const rect = anchor.getBoundingClientRect();

          let top = rect.bottom + (step.offsetY || 0);
          let left = rect.left + rect.width / 2; // default center

          // Handle placement (where popover appears relative to anchor)
          if (step.placement === "top") {
            top = rect.top + (step.offsetY || 0);
            // Horizontal alignment for top/bottom placement
            if (step.alignment === "top") {
              // When placement is top, alignment refers to horizontal position
              left = rect.left + (step.offsetX || 0);
            }
          } else if (step.placement === "left") {
            left = rect.left + (step.offsetX || 0);
            // Vertical alignment for left/right placement
            if (step.alignment === "top") {
              top = rect.top + (step.offsetY || 0);
            } else if (step.alignment === "center") {
              top = rect.top + rect.height / 2 + (step.offsetY || 0);
            } else if (step.alignment === "bottom") {
              top = rect.bottom + (step.offsetY || 0);
            }
          } else if (step.placement === "right") {
            left = rect.right + (step.offsetX || 0);
            // Vertical alignment for left/right placement
            if (step.alignment === "top") {
              top = rect.top + (step.offsetY || 0);
            } else if (step.alignment === "center") {
              top = rect.top + rect.height / 2 + (step.offsetY || 0);
            } else if (step.alignment === "bottom") {
              top = rect.bottom + (step.offsetY || 0);
            }
          }

          setPosition({
            top,
            left,
          });
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      // Cleanup z-index styles when unmounting or changing steps
      const step = tourSteps[currentStep];
      if (step.spotlightId) {
        const spotlightIds = Array.isArray(step.spotlightId)
          ? step.spotlightId
          : [step.spotlightId];
        spotlightIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.style.position = '';
            el.style.zIndex = '';
          }
        });
      }
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;

      // Auto-switch tabs based on the next step BEFORE changing the step
      const nextStepData = tourSteps[nextStep];
      if (nextStepData.anchorId) {
        const anchorId = nextStepData.anchorId;
        const tabButton = document.getElementById(anchorId);
        if (tabButton && tabButton instanceof HTMLButtonElement) {
          tabButton.click();
        }
      }

      // Small delay before changing step to allow tab switch animation
      setTimeout(() => {
        setCurrentStep(nextStep);
      }, 150);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    setShowCompletionModal(true);
  };

  const handleTryFirstTrade = () => {
    setShowCompletionModal(false);
    onComplete?.();
    // TODO: Implement demo trade logic
  };

  const handleMaybeLater = () => {
    setShowCompletionModal(false);
    onComplete?.();
  };

  if (!isVisible && !showCompletionModal) return null;

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Backdrop overlay with spotlight */}
      <AnimatePresence>
        {isVisible && (
          <>
            {spotlightRects.length > 0 ? (
              <>
                {/* Backdrop with click handler */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-[rgba(10,13,20,0.32)] z-100"
                  onClick={handleSkip}
                />

                {/* Multiple spotlight emphasis overlays */}
                {spotlightRects.map((rect, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed z-101 pointer-events-none rounded-[10px]"
                    style={{
                      left: `${rect.left}px`,
                      top: `${rect.top}px`,
                      width: `${rect.width}px`,
                      height: `${rect.height}px`,
                    }}
                  />
                ))}
              </>
            ) : (
              // No spotlight, just regular backdrop
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 backdrop-blur-[1px] bg-[rgba(10,13,20,0.32)] z-100"
                onClick={handleSkip}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Tour popover */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-103 ${
              step.placement === "left"
                ? "-translate-x-full"
                : step.placement === "right"
                ? ""
                : "-translate-x-1/2"
            }`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Arrow pointer */}
            {step.arrowPosition === "middle-right" ? (
              // Arrow on right side pointing right
              <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 flex items-center justify-center h-[8px] w-[16px] rotate-90">
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 8L8 0L16 8H0Z" fill="rgba(38, 38, 38, 0.8)" />
                </svg>
              </div>
            ) : (
              // Arrow at top (pointing down)
              <div
                className={`flex items-center h-[8px] w-[16px] rotate-180 -scale-y-100 ${
                  step.arrowPosition === "top-right"
                    ? "justify-end mr-[24px]"
                    : "justify-center mx-auto"
                }`}
              >
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 8L8 0L16 8H0Z" fill="rgba(38, 38, 38, 0.8)" />
                </svg>
              </div>
            )}

            <div className="relative backdrop-blur-[15.5px] bg-[rgba(38,38,38,0.8)] rounded-[8px] w-[323px] shadow-[0px_10px_14px_-6px_rgba(0,0,0,0.3)]">
              <div className="p-[14px] flex flex-col gap-[18px]">
                {/* Content */}
                <div className="flex flex-col gap-[15px]">
                  <p className="font-inter font-medium text-[14px] leading-none tracking-[-0.14px] text-white">
                    {step.title}
                  </p>
                  <div className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.14px] text-[rgba(255,255,255,0.7)] whitespace-pre-line">
                    {step.description}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="font-inter font-medium text-[14px] leading-none tracking-[-0.14px] text-white">
                    {currentStep + 1} of {tourSteps.length}
                  </p>
                  <button
                    onClick={handleNext}
                    className="bg-white flex items-center justify-center px-[16px] py-[8px] h-[32px] rounded-[7px] font-inter font-medium text-[14px] leading-none text-black tracking-[-0.14px] hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    {currentStep < tourSteps.length - 1 ? "Next" : "Got it"}
                  </button>
                </div>
              </div>

              {/* Inner shadow overlay */}
              <div className="absolute inset-0 pointer-events-none shadow-[0px_-14px_14px_0px_inset_rgba(255,255,255,0.06)] rounded-[8px]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 backdrop-blur-[1px] bg-[rgba(10,13,20,0.32)] z-200"
              onClick={handleMaybeLater}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-201"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="backdrop-blur-[15.5px] bg-[rgba(58,58,58,0.9)] rounded-[12px] w-[323px] shadow-[0px_10px_14px_-6px_rgba(0,0,0,0.3)]">
                <div className="pt-[24px] px-[24px] pb-[24px] flex flex-col gap-[24px] items-center">
                  {/* Icon */}
                  <div className="w-[48px] h-[48px] flex items-center justify-center">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.6668 14.8959C21.6668 14.6804 21.5812 14.4738 21.4289 14.3214C21.2765 14.169 21.0698 14.0834 20.8543 14.0834H17.6043C17.3888 14.0834 17.1822 14.169 17.0298 14.3214C16.8774 14.4738 16.7918 14.6804 16.7918 14.8959V22.2084H15.1668V4.60425C15.1668 3.81558 15.1647 3.30425 15.1148 2.92941C15.0672 2.57733 14.9902 2.46683 14.9285 2.40508C14.8667 2.34333 14.7562 2.26641 14.4042 2.21875C14.0282 2.16891 13.518 2.16675 12.7293 2.16675C11.9407 2.16675 11.4293 2.16891 11.0545 2.21875C10.7024 2.26641 10.5919 2.34333 10.5302 2.40508C10.4684 2.46683 10.3915 2.57733 10.3438 2.92941C10.294 3.30533 10.2918 3.81558 10.2918 4.60425V22.2084H8.66683V9.47925C8.66683 9.26376 8.58123 9.0571 8.42885 8.90472C8.27648 8.75235 8.06982 8.66675 7.85433 8.66675H4.60433C4.38884 8.66675 4.18218 8.75235 4.0298 8.90472C3.87743 9.0571 3.79183 9.26376 3.79183 9.47925V22.2084H1.896C1.68051 22.2084 1.47385 22.294 1.32147 22.4464C1.1691 22.5988 1.0835 22.8054 1.0835 23.0209C1.0835 23.2364 1.1691 23.4431 1.32147 23.5954C1.47385 23.7478 1.68051 23.8334 1.896 23.8334H23.5627C23.7781 23.8334 23.9848 23.7478 24.1372 23.5954C24.2896 23.4431 24.3752 23.2364 24.3752 23.0209C24.3752 22.8054 24.2896 22.5988 24.1372 22.4464C23.9848 22.294 23.7781 22.2084 23.5627 22.2084H21.6668V14.8959Z"
                        fill="url(#paint0_linear_17_2011)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_17_2011"
                          x1="12.7293"
                          y1="2.16675"
                          x2="12.7293"
                          y2="23.8334"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="1" stopColor="#999999" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[10px] items-center text-center">
                    <h3 className="font-inter font-semibold text-[17px] leading-none tracking-[-0.17px] text-white">
                      Let&apos;s Try your first $10 trade
                    </h3>
                    <p className="font-inter font-normal text-[14px] leading-[1.3] tracking-[-0.14px] text-[rgba(255,255,255,0.7)]">
                      This walkthrough uses a safe demo trade so you can learn
                      without risk.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <button
                      onClick={handleTryFirstTrade}
                      className="bg-white rounded-[8px] h-[32px] px-[16px] py-[9px] flex items-center justify-center relative shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.6)] hover:bg-white/90 transition-colors cursor-pointer"
                    >
                      <span className="font-inter font-medium text-[14px] leading-none text-black tracking-[-0.14px]">
                        Try My First Trade
                      </span>
                    </button>
                    <button
                      onClick={handleMaybeLater}
                      className="bg-[rgba(255,255,255,0.1)] rounded-[8px] h-[32px] px-[16px] py-[9px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-colors cursor-pointer"
                    >
                      <span className="font-inter font-medium text-[14px] leading-none text-[rgba(255,255,255,0.7)] tracking-[-0.14px]">
                        Maybe Later
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
