import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, MessageCircle, Heart, Sun, Compass, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export const Route = createFileRoute("/samagri")({
  component: SamagriComingSoon,
});

/**
 * CONFIGURATION VALUE:
 * Replace this with your actual WhatsApp Community Invite URL when live.
 */
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/LfU3HGsQ8GTAVkHUXgc3vQ";

function SamagriComingSoon() {
  const { t, language } = useLanguage();
  const isHi = language === "hi";

  const previewCategories = [
    {
      title: t("samagri.c1"),
      desc: t("samagri.c1Desc"),
      icon: <Heart className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
    {
      title: t("samagri.c2"),
      desc: t("samagri.c2Desc"),
      icon: <Flame className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
    {
      title: t("samagri.c3"),
      desc: t("samagri.c3Desc"),
      icon: <Sparkles className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
    {
      title: t("samagri.c4"),
      desc: t("samagri.c4Desc"),
      icon: <Sun className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
    {
      title: t("samagri.c5"),
      desc: t("samagri.c5Desc"),
      icon: <Compass className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
    {
      title: t("samagri.c6"),
      desc: t("samagri.c6Desc"),
      icon: <ShieldCheck className="size-6 text-saffron/80" strokeWidth={1.5} />,
    },
  ];

  return (
    <main id="samagri-coming-soon" className="relative min-h-screen bg-ink text-saffron px-5 py-12 sm:px-8 lg:px-12 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        
        {/* ================= HERO COMING SOON SECTION ================= */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-saffron/20 pb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="eyebrow text-saffron/80 tracking-[0.25em]">
              {t("samagri.comingSoonTag")}
            </p>

            {/* Main Editorial Heading */}
            <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-[-0.04em] text-saffron whitespace-pre-line">
              {t("samagri.comingSoonTitle")}
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg font-medium leading-relaxed text-saffron/85 max-w-xl">
              {t("samagri.comingSoonDesc")}
            </p>

            {/* Secondary Line */}
            <p className="mt-3 text-xs sm:text-sm font-semibold text-saffron/65 uppercase tracking-wider">
              {t("samagri.comingSoonSub")}
            </p>
          </div>

          {/* Need Guidance Link */}
          <Link 
            to="/kundali" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-saffron underline decoration-saffron/40 underline-offset-8 transition-colors hover:decoration-saffron shrink-0"
          >
            {t("samagri.needGuidance")} <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* ================= WHATSAPP COMMUNITY CTA CARD ================= */}
        <div className="my-14 rounded-2xl border-2 border-saffron bg-[#180405] p-8 sm:p-12 shadow-[10px_10px_0_var(--color-vermilion)] relative overflow-hidden">
          
          {/* Subtle Decorative Yantra Background */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-64 opacity-10 select-none">
            <svg viewBox="0 0 200 200" className="size-full stroke-saffron fill-none" strokeWidth="1">
              <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="70" />
              <polygon points="100,10 180,150 20,150" />
              <polygon points="100,190 180,50 20,50" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-saffron/80 mb-3">
              <MessageCircle className="size-4 text-saffron" />
              <span>{t("samagri.beFirstToKnow")}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-saffron leading-tight">
              {isHi ? "हमारी व्हाट्सएप कम्युनिटी से जुड़ें" : "Join our WhatsApp Community"}
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-saffron/85">
              {t("samagri.whatsAppSub")}
            </p>

            {/* Primary CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 px-8 rounded-full border-2 border-saffron bg-saffron font-bold text-ink shadow-[4px_4px_0_var(--color-vermilion)] hover:-translate-y-0.5 hover:bg-saffron/90 items-center justify-center gap-3 text-sm sm:text-base transition-all"
              >
                <MessageCircle className="size-5 fill-ink text-saffron" />
                <span>{t("samagri.joinWhatsApp")}</span>
                <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Understated Notification Strip */}
            <div className="mt-8 pt-6 border-t border-saffron/20">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-saffron/60">
                {t("samagri.notificationStrip")}
              </p>
            </div>

          </div>
        </div>

        {/* ================= PRODUCT PREVIEW: THE COLLECTION WILL INCLUDE ================= */}
        <div className="mt-16">
          <div className="mb-8 border-b border-saffron/20 pb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-saffron uppercase tracking-tight">
              {t("samagri.collectionIncludeTitle")}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron/50">
              {isHi ? "आगामी संग्रह" : "UPCOMING"}
            </span>
          </div>

          {/* Editorial 6-Category Preview Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewCategories.map((cat, idx) => (
              <div 
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-saffron/30 bg-[#160405]/80 p-6 transition-colors hover:border-saffron/60"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-full border border-saffron/30 bg-saffron/10">
                      {cat.icon}
                    </div>
                    <span className="font-display text-xs font-black text-saffron/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-black text-saffron">
                    {cat.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-saffron/75">
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
