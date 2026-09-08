import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CircleUserRound, Send, Check, Calendar, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../i18n/LanguageContext";
import { submitKundaliEnquiryFn } from "../server/functions/submitKundaliEnquiry";
import vedicSun from "@/assets/vedic-sun.png";
import vedicMoon from "@/assets/vedic-moon.png";
import vedicSaturn from "@/assets/vedic-saturn.png";
import vedicMars from "@/assets/vedic-mars.png";

export const Route = createFileRoute("/kundali")({
  component: Kundali,
});

const focusKeys = ["love", "career", "money", "life", "timing", "other"] as const;

// 1. LOVE Card Symbol (Sacred Radiant Heart & Venus)
function LoveSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="size-9 sm:size-11 stroke-saffron fill-none" strokeWidth="1.2">
      <circle cx="50" cy="50" r="42" strokeDasharray="2 3" strokeOpacity="0.35" />
      <circle cx="50" cy="50" r="34" strokeOpacity="0.5" />
      <line x1="50" y1="8" x2="50" y2="14" strokeOpacity="0.8" />
      <line x1="50" y1="86" x2="50" y2="92" strokeOpacity="0.8" />
      <line x1="8" y1="50" x2="14" y2="50" strokeOpacity="0.8" />
      <line x1="86" y1="50" x2="92" y2="50" strokeOpacity="0.8" />
      <path d="M50 68 C28 50, 24 34, 36 24 C44 17, 50 26, 50 26 C50 26, 56 17, 64 24 C76 34, 72 50, 50 68 Z" strokeWidth="1.5" />
      <path d="M50 32 C45 42, 45 52, 50 58 C55 52, 55 42, 50 32 Z" strokeOpacity="0.7" />
      <circle cx="50" cy="45" r="2.5" className="fill-saffron" />
    </svg>
  );
}

// 2. CAREER Card Symbol (Surya Sunburst & Orbit)
function CareerSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="size-9 sm:size-11 stroke-saffron fill-none" strokeWidth="1.2">
      <circle cx="50" cy="50" r="42" strokeDasharray="3 4" strokeOpacity="0.35" />
      <circle cx="50" cy="50" r="28" strokeOpacity="0.75" />
      <circle cx="50" cy="50" r="16" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" className="fill-saffron/20" strokeWidth="1" />
      <circle cx="50" cy="50" r="2.5" className="fill-saffron" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={50 + 20 * Math.cos((i * Math.PI) / 6)}
          y1={50 + 20 * Math.sin((i * Math.PI) / 6)}
          x2={50 + 38 * Math.cos((i * Math.PI) / 6)}
          y2={50 + 38 * Math.sin((i * Math.PI) / 6)}
          strokeWidth={i % 2 === 0 ? "1.5" : "0.75"}
          strokeOpacity={i % 2 === 0 ? "0.9" : "0.5"}
        />
      ))}
      <circle cx="76" cy="35" r="3" className="fill-saffron" />
    </svg>
  );
}

// 3. LIFE Card Symbol (Central Vedic Yantra Star Compass)
function LifeSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="size-12 sm:size-14 stroke-saffron fill-none" strokeWidth="1.2">
      <circle cx="50" cy="50" r="45" strokeDasharray="2 4" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="38" strokeOpacity="0.7" />
      <circle cx="50" cy="50" r="26" strokeOpacity="0.5" strokeDasharray="4 4" />
      <polygon
        points="50,10 54,42 86,30 58,46 90,50 58,54 86,70 54,58 50,90 46,58 14,70 42,54 10,50 42,46 14,30 46,42"
        strokeWidth="1.4"
        strokeOpacity="0.95"
      />
      <circle cx="50" cy="50" r="8" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="3" className="fill-saffron" />
      <circle cx="50" cy="10" r="2" className="fill-saffron" />
      <circle cx="50" cy="90" r="2" className="fill-saffron" />
      <circle cx="10" cy="50" r="2" className="fill-saffron" />
      <circle cx="90" cy="50" r="2" className="fill-saffron" />
    </svg>
  );
}

// 4. WEALTH Card Symbol (Ashtalakshmi Lotus & Abundance)
function WealthSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="size-9 sm:size-11 stroke-saffron fill-none" strokeWidth="1.2">
      <circle cx="50" cy="50" r="42" strokeDasharray="2 3" strokeOpacity="0.35" />
      <rect x="26" y="26" width="48" height="48" strokeOpacity="0.8" />
      <rect x="26" y="26" width="48" height="48" transform="rotate(45 50 50)" strokeOpacity="0.8" />
      <circle cx="50" cy="50" r="14" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="6" className="fill-saffron/30" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="2.5" className="fill-saffron" />
      <circle cx="28" cy="28" r="2" className="fill-saffron" />
      <circle cx="72" cy="28" r="2" className="fill-saffron" />
      <circle cx="28" cy="72" r="2" className="fill-saffron" />
      <circle cx="72" cy="72" r="2" className="fill-saffron" />
    </svg>
  );
}

// 5. HEALTH Card Symbol (Crescent Moon & Blooming Lotus)
function HealthSymbol() {
  return (
    <svg viewBox="0 0 100 100" className="size-9 sm:size-11 stroke-saffron fill-none" strokeWidth="1.2">
      <circle cx="50" cy="50" r="42" strokeDasharray="3 5" strokeOpacity="0.35" />
      <path d="M42 22 A 28 28 0 1 0 74 64 A 22 22 0 1 1 42 22 Z" strokeWidth="1.4" strokeOpacity="0.9" />
      <path d="M50 48 C42 40, 36 54, 50 68 C64 54, 58 40, 50 48 Z" strokeWidth="1.2" strokeOpacity="0.85" />
      <path d="M50 48 C47 38, 40 46, 45 56" strokeOpacity="0.6" />
      <path d="M50 48 C53 38, 60 46, 55 56" strokeOpacity="0.6" />
      <circle cx="50" cy="38" r="2" className="fill-saffron" />
      <circle cx="50" cy="68" r="1.5" className="fill-saffron" />
    </svg>
  );
}

// Celestial Backdrop with Sun, Moon, Saturn, and Mars visual hierarchy
function CelestialBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0">
      {/* 1. SUN - Largest celestial element (Upper-Left, Continuous 75s Rotation) */}
      <img
        src={vedicSun}
        alt=""
        width={800}
        height={800}
        className="absolute -left-44 -top-44 size-[520px] sm:-left-56 sm:-top-56 sm:size-[680px] lg:-left-64 lg:-top-64 lg:size-[780px] origin-center object-contain opacity-20 motion-safe:animate-[turn-slowly_75s_linear_infinite]"
      />

      {/* 2. MOON - Second largest (Lower-Right, Continuous 95s Reverse Rotation) */}
      <img
        src={vedicMoon}
        alt=""
        width={500}
        height={500}
        className="absolute -right-24 -bottom-24 size-[350px] sm:-right-32 sm:-bottom-32 sm:size-[420px] lg:-right-40 lg:-bottom-40 lg:size-[500px] origin-center object-contain opacity-15 motion-safe:animate-[turn-slowly_95s_linear_infinite_reverse]"
      />

      {/* 4. MARS - Smallest detail (Lower-Left, Static background element) */}
      <img
        src={vedicMars}
        alt=""
        width={200}
        height={200}
        className="absolute left-[5%] bottom-[12%] size-[140px] sm:left-[8%] sm:bottom-[15%] sm:size-[170px] lg:left-[10%] lg:bottom-[18%] lg:size-[200px] origin-center object-contain opacity-10"
      />

      {/* Delicate ambient stars */}
      <div className="absolute left-1/4 top-1/4 size-1 rounded-full bg-saffron opacity-40 motion-safe:animate-pulse" />
      <div className="absolute left-1/3 top-2/3 size-1.5 rounded-full bg-saffron opacity-45 motion-safe:animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute left-16 top-1/2 size-1 rounded-full bg-saffron opacity-35 motion-safe:animate-pulse" style={{ animationDelay: "1.5s" }} />
    </div>
  );
}

// Compact Vedic Landscape Silhouette
function VedicLandscape() {
  return (
    <div aria-hidden="true" className="pointer-events-none w-full select-none pt-2 opacity-25">
      <svg viewBox="0 0 700 75" className="w-full stroke-saffron fill-none" preserveAspectRatio="none">
        <line x1="0" y1="68" x2="700" y2="68" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="0" y1="72" x2="700" y2="72" strokeWidth="1.5" />
        <circle cx="350" cy="72" r="32" strokeWidth="0.75" strokeDasharray="3 4" />
        <circle cx="350" cy="72" r="18" strokeWidth="0.75" />
        <path d="M0 70 Q 130 52 250 66 T 470 58 T 700 70" strokeWidth="1.2" />
        <path d="M0 72 Q 190 58 320 68 T 590 64 T 700 72" strokeWidth="0.75" strokeDasharray="3 5" />
        <path d="M344 68 L344 54 L347 46 L349 36 L350 30 L351 36 L353 46 L356 54 L356 68 Z" strokeWidth="1" className="fill-saffron/15" />
        <line x1="350" y1="30" x2="350" y2="24" strokeWidth="1" />
        <circle cx="350" cy="25" r="1.5" className="fill-saffron" />
        <path d="M350 24 L354 26 L350 28 Z" className="fill-saffron" />
      </svg>
    </div>
  );
}

function Kundali() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<(typeof focusKeys)[number]>("life");
  const { t } = useLanguage();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string)?.trim() || "",
      phone: (formData.get("phone") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      birthDate: (formData.get("birthDate") as string) || "",
      birthTime: (formData.get("birthTime") as string) || "",
      birthPlace: (formData.get("birthPlace") as string)?.trim() || "",
      focus: (formData.get("focus") as string) || t(`kundali.focusOptions.${selectedFocus}`),
      website_hp: (formData.get("website_hp") as string) || "",
    };

    try {
      const res = await submitKundaliEnquiryFn({ data: payload });
      if (res.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          res.message || "Unable to send enquiry notification. Please verify that RESEND_API_KEY is configured."
        );
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setSubmitError("Unable to process your enquiry at this time. Please check that RESEND_API_KEY is configured.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink px-5 py-10 text-saffron sm:px-8 lg:px-12 lg:py-16">
      <CelestialBackdrop />

      <div className="relative mx-auto max-w-7xl">
        {/* Desktop Two-Column Composition: Left Editorial + Visuals (55%) & Right Form (45%) */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          
          {/* ================= LEFT SIDE: Editorial Content + Glowing Cards ================= */}
          <div className="flex flex-col">
            
            {/* Section A: Editorial Written Content */}
            <div>
              {/* Eyebrow */}
              <p className="eyebrow text-saffron/75 tracking-[0.25em]">
                {t("kundali.eyebrow")}
              </p>

              {/* Large Serif Dominant Heading */}
              <h1 className="mt-2.5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[0.94] tracking-[-0.04em] text-saffron whitespace-pre-line">
                {t("kundali.title")}
              </h1>

              {/* Supporting Narrative Paragraph */}
              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-saffron/75">
                {t("kundali.desc")}
              </p>

              {/* Thin Gold Horizontal Divider */}
              <div className="my-6 h-px w-full bg-saffron/25 sm:my-7" />

              {/* Three-Step Journey (Editorial Style with Thin Vertical Dividers) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-saffron/25">
                {/* 01 */}
                <div className="sm:pr-4">
                  <span className="font-display text-2xl sm:text-3xl font-black text-saffron block leading-none mb-1.5">
                    01
                  </span>
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-saffron">
                    {t("kundali.step1")}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-saffron/70 leading-relaxed">
                    {t("kundali.step1Desc")}
                  </p>
                </div>

                {/* 02 */}
                <div className="sm:px-4">
                  <span className="font-display text-2xl sm:text-3xl font-black text-saffron block leading-none mb-1.5">
                    02
                  </span>
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-saffron">
                    {t("kundali.step2")}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-saffron/70 leading-relaxed">
                    {t("kundali.step2Desc")}
                  </p>
                </div>

                {/* 03 */}
                <div className="sm:pl-4">
                  <span className="font-display text-2xl sm:text-3xl font-black text-saffron block leading-none mb-1.5">
                    03
                  </span>
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-saffron">
                    {t("kundali.step3")}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-saffron/70 leading-relaxed">
                    {t("kundali.step3Desc")}
                  </p>
                </div>
              </div>

              {/* Thin Gold Divider below steps */}
              <div className="my-6 h-px w-full bg-saffron/20 sm:my-7" />
            </div>

            {/* Section B: Compact Glowing Astrology Cards Visual Cluster */}
            <div className="relative w-full pt-1">
              <div className="relative mx-auto flex h-[260px] sm:h-[280px] w-full max-w-[480px] items-center justify-center">
                
                {/* 1. LOVE Card (Top-Left) */}
                <button
                  type="button"
                  onClick={() => setSelectedFocus("love")}
                  className={`group absolute left-2 sm:left-4 top-1 z-10 w-24 sm:w-28 rounded border border-saffron/40 bg-[#180405]/95 p-2 sm:p-2.5 backdrop-blur-sm shadow-[0_0_16px_-2px_rgba(232,173,0,0.2)] transition-all duration-300 hover:z-30 hover:scale-105 hover:border-saffron hover:shadow-[0_0_24px_rgba(232,173,0,0.35)] -rotate-6 ${
                    selectedFocus === "love" ? "ring-2 ring-saffron border-saffron shadow-[0_0_26px_rgba(232,173,0,0.4)] scale-105" : ""
                  }`}
                  style={{ animation: "float 7s ease-in-out infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-saffron/20 pb-1">
                    <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-saffron/85">
                      {t("kundali.cards.love")}
                    </span>
                    <span className="text-[8px] font-serif text-saffron/60">I</span>
                  </div>
                  <div className="my-1.5 flex justify-center">
                    <LoveSymbol />
                  </div>
                  <div className="border-t border-saffron/20 pt-1 text-center">
                    <span className="block text-[8px] font-bold uppercase tracking-tight text-saffron/80 line-clamp-1">
                      {t("kundali.cards.loveSub")}
                    </span>
                  </div>
                </button>

                {/* 2. CAREER Card (Top-Right) */}
                <button
                  type="button"
                  onClick={() => setSelectedFocus("career")}
                  className={`group absolute right-2 sm:right-4 top-1 z-10 w-24 sm:w-28 rounded border border-saffron/40 bg-[#180405]/95 p-2 sm:p-2.5 backdrop-blur-sm shadow-[0_0_16px_-2px_rgba(232,173,0,0.2)] transition-all duration-300 hover:z-30 hover:scale-105 hover:border-saffron hover:shadow-[0_0_24px_rgba(232,173,0,0.35)] rotate-6 ${
                    selectedFocus === "career" ? "ring-2 ring-saffron border-saffron shadow-[0_0_26px_rgba(232,173,0,0.4)] scale-105" : ""
                  }`}
                  style={{ animation: "float 8s ease-in-out 1.5s infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-saffron/20 pb-1">
                    <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-saffron/85">
                      {t("kundali.cards.career")}
                    </span>
                    <span className="text-[8px] font-serif text-saffron/60">II</span>
                  </div>
                  <div className="my-1.5 flex justify-center">
                    <CareerSymbol />
                  </div>
                  <div className="border-t border-saffron/20 pt-1 text-center">
                    <span className="block text-[8px] font-bold uppercase tracking-tight text-saffron/80 line-clamp-1">
                      {t("kundali.cards.careerSub")}
                    </span>
                  </div>
                </button>

                {/* 3. CENTRAL LIFE Card (Center, Focal Point, Slightly Larger) */}
                <button
                  type="button"
                  onClick={() => setSelectedFocus("life")}
                  className={`group relative z-20 w-32 sm:w-36 rounded-md border-2 border-saffron/60 bg-[#1c0507]/95 p-3 backdrop-blur-sm shadow-[0_0_30px_-1px_rgba(232,173,0,0.32),inset_0_0_12px_rgba(232,173,0,0.1)] transition-all duration-300 hover:scale-105 hover:border-saffron hover:shadow-[0_0_40px_rgba(232,173,0,0.45)] ${
                    selectedFocus === "life" ? "ring-2 ring-saffron border-saffron scale-105 shadow-[0_0_40px_rgba(232,173,0,0.5)]" : ""
                  }`}
                  style={{ animation: "float 6s ease-in-out 0.5s infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-saffron/30 pb-1.5">
                    <span className="font-display text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-saffron">
                      {t("kundali.cards.life")}
                    </span>
                    <span className="text-[9px] font-serif font-bold text-saffron">✦</span>
                  </div>
                  <div className="my-2 flex justify-center">
                    <LifeSymbol />
                  </div>
                  <div className="border-t border-saffron/30 pt-1.5 text-center">
                    <span className="block text-[8.5px] sm:text-[9px] font-black uppercase tracking-tight text-saffron">
                      {t("kundali.cards.lifeSub")}
                    </span>
                  </div>
                </button>

                {/* 4. WEALTH Card (Bottom-Left) */}
                <button
                  type="button"
                  onClick={() => setSelectedFocus("money")}
                  className={`group absolute bottom-1 left-4 sm:left-8 z-10 w-24 sm:w-28 rounded border border-saffron/40 bg-[#180405]/95 p-2 sm:p-2.5 backdrop-blur-sm shadow-[0_0_16px_-2px_rgba(232,173,0,0.2)] transition-all duration-300 hover:z-30 hover:scale-105 hover:border-saffron hover:shadow-[0_0_24px_rgba(232,173,0,0.35)] -rotate-3 ${
                    selectedFocus === "money" ? "ring-2 ring-saffron border-saffron shadow-[0_0_26px_rgba(232,173,0,0.4)] scale-105" : ""
                  }`}
                  style={{ animation: "float 7.5s ease-in-out 2s infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-saffron/20 pb-1">
                    <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-saffron/85">
                      {t("kundali.cards.wealth")}
                    </span>
                    <span className="text-[8px] font-serif text-saffron/60">III</span>
                  </div>
                  <div className="my-1.5 flex justify-center">
                    <WealthSymbol />
                  </div>
                  <div className="border-t border-saffron/20 pt-1 text-center">
                    <span className="block text-[8px] font-bold uppercase tracking-tight text-saffron/80 line-clamp-1">
                      {t("kundali.cards.wealthSub")}
                    </span>
                  </div>
                </button>

                {/* 5. HEALTH Card (Bottom-Right) */}
                <button
                  type="button"
                  onClick={() => setSelectedFocus("other")}
                  className={`group absolute bottom-1 right-4 sm:right-8 z-10 w-24 sm:w-28 rounded border border-saffron/40 bg-[#180405]/95 p-2 sm:p-2.5 backdrop-blur-sm shadow-[0_0_16px_-2px_rgba(232,173,0,0.2)] transition-all duration-300 hover:z-30 hover:scale-105 hover:border-saffron hover:shadow-[0_0_24px_rgba(232,173,0,0.35)] rotate-4 ${
                    selectedFocus === "other" ? "ring-2 ring-saffron border-saffron shadow-[0_0_26px_rgba(232,173,0,0.4)] scale-105" : ""
                  }`}
                  style={{ animation: "float 8.5s ease-in-out 2.5s infinite" }}
                >
                  <div className="flex items-center justify-between border-b border-saffron/20 pb-1">
                    <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-saffron/85">
                      {t("kundali.cards.health")}
                    </span>
                    <span className="text-[8px] font-serif text-saffron/60">IV</span>
                  </div>
                  <div className="my-1.5 flex justify-center">
                    <HealthSymbol />
                  </div>
                  <div className="border-t border-saffron/20 pt-1 text-center">
                    <span className="block text-[8px] font-bold uppercase tracking-tight text-saffron/80 line-clamp-1">
                      {t("kundali.cards.healthSub")}
                    </span>
                  </div>
                </button>
              </div>

              {/* Small Supporting Vedic Landscape Silhouette */}
              <VedicLandscape />
            </div>
          </div>

          {/* ================= RIGHT SIDE: Kundali Enquiry Form ================= */}
          <div className="w-full">
            <div className="relative">
              {/* Outer Form Container with Red Offset Layer/Shadow */}
              <form
                onSubmit={handleSubmit}
                className="relative z-10 border border-saffron/40 bg-ink p-6 sm:p-8 shadow-[10px_10px_0_var(--color-vermilion)]"
              >
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-saffron text-ink">
                      <Check className="size-8" />
                    </div>
                    <p className="mt-6 font-display text-3xl sm:text-4xl font-black text-saffron">
                      {t("kundali.detailsReceived")}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-saffron/75">
                      {t("kundali.detailsDesc")}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-7 border-saffron/50 bg-transparent text-saffron hover:bg-saffron hover:text-ink font-bold"
                      onClick={() => setSubmitted(false)}
                    >
                      {t("kundali.addAnother")}
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Form Top Header */}
                    <div className="flex items-end justify-between gap-4 border-b border-saffron/20 pb-4">
                      <div>
                        <p className="eyebrow text-saffron/65 tracking-[0.22em]">
                          {t("kundali.enquiry")}
                        </p>
                        <h2 className="mt-1 font-display text-2xl sm:text-3xl font-black text-saffron">
                          {t("kundali.tellUs")}
                        </h2>
                      </div>
                      <CircleUserRound
                        className="size-8 text-saffron/70"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Invisible honeypot field for bot protection */}
                    <div aria-hidden="true" className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none" tabIndex={-1}>
                      <label htmlFor="website_hp">Leave blank</label>
                      <input
                        type="text"
                        id="website_hp"
                        name="website_hp"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Inputs */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="field-label">
                        {t("kundali.fullName")}
                        <input
                          required
                          name="name"
                          placeholder={t("kundali.fullNamePlaceholder")}
                          className="field-input"
                        />
                      </label>

                      <label className="field-label">
                        {t("kundali.phone")}
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder={t("kundali.phonePlaceholder")}
                          className="field-input"
                        />
                      </label>

                      <label className="field-label">
                        {t("kundali.dob")}
                        <input required name="birthDate" type="date" className="field-input" />
                      </label>

                      <label className="field-label">
                        {t("kundali.tob")}
                        <input required name="birthTime" type="time" className="field-input" />
                      </label>

                      <label className="field-label sm:col-span-2">
                        {t("kundali.pob")}
                        <input
                          required
                          name="birthPlace"
                          placeholder={t("kundali.pobPlaceholder")}
                          className="field-input"
                        />
                      </label>

                      {/* Area of Focus Field (Synced with the illuminated cards) */}
                      <div className="sm:col-span-2">
                        <span className="field-label mb-2 block">
                          {t("kundali.clarityTitle")}
                        </span>
                        <input
                          type="hidden"
                          name="focus"
                          value={t(`kundali.focusOptions.${selectedFocus}`)}
                        />
                        <div
                          className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                          role="radiogroup"
                          aria-label={t("kundali.clarityTitle")}
                        >
                          {focusKeys.map((key) => {
                            const isSelected = selectedFocus === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setSelectedFocus(key)}
                                className={`flex items-center justify-between rounded px-3 py-2 text-left text-xs font-bold transition-all ${
                                  isSelected
                                    ? "border-2 border-saffron bg-saffron/15 text-saffron shadow-[2px_2px_0_var(--color-vermilion)]"
                                    : "border border-saffron/25 bg-saffron/5 text-saffron/75 hover:border-saffron/50 hover:text-saffron"
                                }`}
                              >
                                <span className="leading-snug truncate">
                                  {t(`kundali.focusOptions.${key}`)}
                                </span>
                                {isSelected && (
                                  <Check className="size-3 text-saffron shrink-0 ml-1" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Submission Error Alert */}
                    {submitError && (
                      <div className="mt-3 rounded border border-vermilion bg-vermilion/10 p-2.5 text-center text-xs font-bold text-saffron">
                        {submitError}
                      </div>
                    )}

                    {/* Primary CTA Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-7 h-12 w-full rounded-full border-2 border-saffron bg-saffron font-bold text-ink shadow-[4px_4px_0_var(--color-vermilion)] hover:-translate-y-0.5 hover:bg-saffron/90 flex items-center justify-center gap-2 text-sm sm:text-base transition-all disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Sending..." : t("kundali.sendDetails")}</span>
                      <Send className="size-4" />
                    </Button>

                    {/* Centered Privacy Message */}
                    <p className="mt-3.5 text-center text-[11px] leading-relaxed text-saffron/55">
                      {t("kundali.privacy")}
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ================= UPCOMING AI FEATURES ANNOUNCEMENT ================= */}
        <section className="relative mt-20 border-t border-saffron/20 pt-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-saffron/60 tracking-[0.25em]">
              COMING SOON
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-saffron tracking-tight">
              TWO NEW WAYS TO EXPLORE YOURSELF
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-saffron/75 leading-relaxed font-medium">
              We’re bringing AI-powered Kundli and Palm Reading experiences to Astro Shubh Aura.
            </p>
          </div>

          {/* Two Editorial Feature Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* 01. AI KUNDLI READER */}
            <div className="group relative rounded-lg border border-saffron/30 bg-[#1c0507]/90 p-6 sm:p-7 backdrop-blur-sm shadow-[0_0_30px_-5px_rgba(232,173,0,0.15)] transition-all duration-300 hover:border-saffron/60 hover:shadow-[0_0_40px_-5px_rgba(232,173,0,0.25)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-saffron/20 pb-3">
                  <span className="font-display text-xl sm:text-2xl font-black text-saffron/80">
                    01
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/40 bg-saffron/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-saffron">
                    <span className="size-1.5 rounded-full bg-saffron animate-pulse" />
                    COMING SOON
                  </span>
                </div>

                {/* Vedic Line-Art Icon (Kundli Chart Matrix) */}
                <div className="my-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded border border-saffron/30 bg-saffron/5">
                    <svg viewBox="0 0 40 40" className="size-6 stroke-saffron fill-none" strokeWidth="1.2">
                      <rect x="4" y="4" width="32" height="32" strokeOpacity="0.8" />
                      <line x1="4" y1="4" x2="36" y2="36" strokeOpacity="0.6" />
                      <line x1="36" y1="4" x2="4" y2="36" strokeOpacity="0.6" />
                      <polygon points="20,4 36,20 20,36 4,20" strokeOpacity="0.8" />
                      <circle cx="20" cy="20" r="2" className="fill-saffron" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-saffron tracking-tight">
                    AI KUNDLI READER
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-saffron/75 leading-relaxed">
                  Explore your birth chart through an intelligent, personalized reading built around your planetary placements, patterns, and timing.
                </p>
              </div>
            </div>

            {/* 02. AI PALM READER */}
            <div className="group relative rounded-lg border border-saffron/30 bg-[#1c0507]/90 p-6 sm:p-7 backdrop-blur-sm shadow-[0_0_30px_-5px_rgba(232,173,0,0.15)] transition-all duration-300 hover:border-saffron/60 hover:shadow-[0_0_40px_-5px_rgba(232,173,0,0.25)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-saffron/20 pb-3">
                  <span className="font-display text-xl sm:text-2xl font-black text-saffron/80">
                    02
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/40 bg-saffron/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-saffron">
                    <span className="size-1.5 rounded-full bg-saffron animate-pulse" />
                    COMING SOON
                  </span>
                </div>

                {/* Vedic Line-Art Icon (Sacred Palm Lines & Rays) */}
                <div className="my-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded border border-saffron/30 bg-saffron/5">
                    <svg viewBox="0 0 40 40" className="size-6 stroke-saffron fill-none" strokeWidth="1.2">
                      <path d="M12 28 C12 18, 16 12, 20 8 C24 12, 28 18, 28 28" strokeOpacity="0.8" />
                      <path d="M15 28 C16 22, 20 16, 24 22 C25 25, 25 28, 25 28" strokeOpacity="0.6" />
                      <path d="M10 24 Q 20 20 30 24" strokeOpacity="0.7" />
                      <circle cx="20" cy="8" r="1.5" className="fill-saffron" />
                      <circle cx="20" cy="28" r="2" className="fill-saffron" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-saffron tracking-tight">
                    AI PALM READER
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-saffron/75 leading-relaxed">
                  Upload a clear image of your palm and discover a traditional palmistry interpretation through an AI-powered reading experience.
                </p>
              </div>
            </div>
          </div>

          {/* Subtle Closing Line */}
          <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-saffron/50">
            COMING SOON TO ASTRO SHUBH AURA
          </p>
        </section>

        {/* ================= SUPPORTING SECTIONS BELOW MAIN COMPOSITION ================= */}

        {/* Section 1: WHY THESE DETAILS? */}
        <section className="relative mt-20 border-t border-saffron/20 pt-14">
          {/* Decorative Saturn Asset (Anchored to right side of Why These Details section) */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-10 sm:-right-28 sm:-top-16 lg:-right-36 lg:-top-20 select-none z-0">
            <img
              src={vedicSaturn}
              alt=""
              width={500}
              height={500}
              className="size-[280px] sm:size-[350px] lg:size-[420px] origin-center object-contain opacity-15 motion-safe:animate-[turn-slowly_150s_linear_infinite]"
            />
          </div>

          <div className="max-w-xl">
            <p className="eyebrow text-saffron/60 tracking-[0.2em]">{t("kundali.whyTitle")}</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black text-saffron">
              {t("kundali.whyTitle")}
            </h2>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-3 border-t border-saffron/15 pt-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron">
                <Calendar className="size-4 text-saffron/80" />
                {t("kundali.whyDobTitle")}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-saffron/70 leading-relaxed">
                {t("kundali.whyDobDesc")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron">
                <Clock3 className="size-4 text-saffron/80" />
                {t("kundali.whyTobTitle")}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-saffron/70 leading-relaxed">
                {t("kundali.whyTobDesc")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron">
                <MapPin className="size-4 text-saffron/80" />
                {t("kundali.whyPobTitle")}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-saffron/70 leading-relaxed">
                {t("kundali.whyPobDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: WHAT HAPPENS NEXT? */}
        <section className="mt-16 border-t border-saffron/20 pt-14">
          <div>
            <p className="eyebrow text-saffron/60 tracking-[0.2em]">{t("kundali.nextSubtitle")}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-saffron">
              {t("kundali.nextTitle")}
            </h2>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3 border-t border-saffron/20 pt-7">
            <div className="space-y-2.5">
              <p className="font-display text-3xl sm:text-4xl font-black text-saffron/35">
                01
              </p>
              <h3 className="font-display text-xl font-black text-saffron">
                {t("kundali.next1Title")}
              </h3>
              <p className="text-sm leading-relaxed text-saffron/70">
                {t("kundali.next1Desc")}
              </p>
            </div>

            <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-saffron/20 pt-5 md:pt-0 md:pl-8">
              <p className="font-display text-3xl sm:text-4xl font-black text-saffron/35">
                02
              </p>
              <h3 className="font-display text-xl font-black text-saffron">
                {t("kundali.next2Title")}
              </h3>
              <p className="text-sm leading-relaxed text-saffron/70">
                {t("kundali.next2Desc")}
              </p>
            </div>

            <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-saffron/20 pt-5 md:pt-0 md:pl-8">
              <p className="font-display text-3xl sm:text-4xl font-black text-saffron/35">
                03
              </p>
              <h3 className="font-display text-xl font-black text-saffron">
                {t("kundali.next3Title")}
              </h3>
              <p className="text-sm leading-relaxed text-saffron/70">
                {t("kundali.next3Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: BRAND PHILOSOPHY STATEMENT */}
        <section className="mt-16 border-t-2 border-saffron/30 pt-14 pb-4 text-center max-w-3xl mx-auto">
          <p className="eyebrow text-saffron/60 tracking-[0.25em]">
            {t("kundali.philosophyHeading")}
          </p>
          <blockquote className="mt-4 font-display text-2xl sm:text-3xl font-black leading-snug tracking-tight text-saffron">
            {t("kundali.philosophyQuote")}
          </blockquote>
          <p className="mt-3.5 text-sm sm:text-base text-saffron/75 leading-relaxed max-w-xl mx-auto">
            {t("kundali.philosophyDesc")}
          </p>
        </section>
      </div>
    </main>
  );
}
