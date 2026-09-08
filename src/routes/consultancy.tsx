import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, Flame, ArrowRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../i18n/LanguageContext";
import vedicSun from "@/assets/vedic-sun.png";
import vedicMoon from "@/assets/vedic-moon.png";

export const Route = createFileRoute("/consultancy")({
  component: Consultancy,
});

// Large Decorative Sun PNG (Framing the Left Margin)
function SuryaSunDecorative() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-36 -top-12 size-[360px] select-none opacity-20 transition-transform duration-1000 sm:-left-48 sm:top-10 sm:size-[480px] lg:-left-64 lg:top-12 lg:size-[620px] z-0"
    >
      <img
        src={vedicSun}
        alt=""
        width={620}
        height={620}
        className="size-full origin-center object-contain motion-safe:animate-[turn-slowly_75s_linear_infinite]"
      />
    </div>
  );
}

// Large Decorative Moon PNG (Framing the Right Margin)
function ChandraMoonDecorative() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-36 top-[540px] size-[340px] select-none opacity-20 transition-transform duration-1000 sm:-right-48 sm:top-[500px] sm:size-[460px] lg:-right-64 lg:top-[440px] lg:size-[600px] z-0"
    >
      <img
        src={vedicMoon}
        alt=""
        width={600}
        height={600}
        className="size-full origin-center object-contain motion-safe:animate-[turn-slowly_95s_linear_infinite_reverse]"
      />
    </div>
  );
}

function ServiceCard({
  number,
  icon,
  title,
  copy,
  learnMoreText,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  copy: string;
  learnMoreText: string;
}) {
  return (
    <article className="group border-2 border-vermilion bg-saffron p-6 shadow-[5px_5px_0_var(--color-ink)] transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-black text-ink/50">{number}</span>
        <div className="flex size-11 items-center justify-center rounded-full bg-vermilion text-saffron transition-transform group-hover:rotate-12">
          {icon}
        </div>
      </div>
      <h3 className="mt-12 font-display text-3xl font-black leading-none">{title}</h3>
      <p className="mt-4 text-sm font-medium leading-6 text-ink/70">{copy}</p>
      <Link
        to="/kundali"
        className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
      >
        {learnMoreText} <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

function Consultancy() {
  const { t } = useLanguage();

  return (
    <main className="relative overflow-hidden bg-saffron text-vermilion min-h-screen">
      {/* Decorative Sun (Far Left Edge) & Moon (Far Right Edge) */}
      <SuryaSunDecorative />
      <ChandraMoonDecorative />

      <div className="relative z-10">
        {/* ================= SECTION 1: Existing Hero & Service Cards ================= */}
        <section id="consultancy" className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">{t("consultancy.eyebrow")}</p>
                <h1 className="mt-4 max-w-2xl font-display text-5xl font-black leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                  {t("consultancy.title1")}
                  <br />
                  <span className="text-ink">{t("consultancy.title2")}</span>
                </h1>
              </div>
              <p className="max-w-xs text-sm font-medium leading-6 text-ink/70">
                {t("consultancy.desc")}
              </p>
            </div>

            {/* 3 Existing Service Cards */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <ServiceCard
                number="01"
                icon={<Compass />}
                title={t("consultancy.card1Title")}
                copy={t("consultancy.card1Copy")}
                learnMoreText={t("common.learnMore")}
              />
              <ServiceCard
                number="02"
                icon={<HeartHandshake />}
                title={t("consultancy.card2Title")}
                copy={t("consultancy.card2Copy")}
                learnMoreText={t("common.learnMore")}
              />
              <ServiceCard
                number="03"
                icon={<Flame />}
                title={t("consultancy.card3Title")}
                copy={t("consultancy.card3Copy")}
                learnMoreText={t("common.learnMore")}
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: What Can We Talk About? ================= */}
        <section className="border-t-2 border-vermilion/30 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Sparkles className="size-3.5" />
                  {t("consultancy.talkTitle")}
                </p>
                <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
                  {t("consultancy.talkTitle")}
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium leading-relaxed text-ink/75">
                {t("consultancy.talkSubtitle")}
              </p>
            </div>

            {/* Editorial 6-Topic List Grid */}
            <div className="mt-14 grid gap-x-12 gap-y-10 border-t border-vermilion/25 pt-10 md:grid-cols-2 lg:grid-cols-3">
              {/* 1. Love */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  01
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t1Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t1Copy")}
                </p>
              </div>

              {/* 2. Career */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  02
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t2Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t2Copy")}
                </p>
              </div>

              {/* 3. Family */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  03
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t3Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t3Copy")}
                </p>
              </div>

              {/* 4. Money */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  04
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t4Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t4Copy")}
                </p>
              </div>

              {/* 5. Life Decisions */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  05
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t5Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t5Copy")}
                </p>
              </div>

              {/* 6. Timing */}
              <div className="border-t-2 border-vermilion pt-4">
                <span className="font-display text-xs font-black uppercase tracking-widest text-vermilion/60">
                  06
                </span>
                <h3 className="mt-2 font-display text-2xl font-black text-vermilion">
                  {t("consultancy.t6Title")}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {t("consultancy.t6Copy")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: Astrology Without Fear ================= */}
        <section className="border-t-2 border-vermilion/30 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="border-2 border-vermilion bg-saffron p-8 shadow-[8px_8px_0_var(--color-ink)] sm:p-12">
              <div className="max-w-3xl">
                <p className="eyebrow text-vermilion/80">{t("consultancy.noFearTitle")}</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-vermilion">
                  {t("consultancy.noFearTitle")}
                </h2>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80 font-medium">
                  {t("consultancy.noFearCopy")}
                </p>
              </div>

              {/* 3 Principles */}
              <div className="mt-10 grid gap-8 border-t border-vermilion/30 pt-8 sm:grid-cols-3">
                <div className="border-t-2 border-vermilion pt-3">
                  <h3 className="font-display text-xl font-black text-vermilion">
                    {t("consultancy.p1Title")}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-ink/75">
                    {t("consultancy.p1Copy")}
                  </p>
                </div>

                <div className="border-t-2 border-vermilion pt-3">
                  <h3 className="font-display text-xl font-black text-vermilion">
                    {t("consultancy.p2Title")}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-ink/75">
                    {t("consultancy.p2Copy")}
                  </p>
                </div>

                <div className="border-t-2 border-vermilion pt-3">
                  <h3 className="font-display text-xl font-black text-vermilion">
                    {t("consultancy.p3Title")}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-ink/75">
                    {t("consultancy.p3Copy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: How a Session Works ================= */}
        <section className="border-t-2 border-vermilion/30 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div>
              <p className="eyebrow">{t("consultancy.sessionTitle")}</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-black text-vermilion">
                {t("consultancy.sessionTitle")}
              </h2>
            </div>

            {/* Editorial 4-Step Journey */}
            <div className="mt-12 grid gap-8 border-t border-vermilion/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Step 01 */}
              <div className="space-y-3">
                <span className="font-display text-4xl font-black text-vermilion/40 block">
                  01
                </span>
                <h3 className="font-display text-xl font-black text-vermilion">
                  {t("consultancy.s1Title")}
                </h3>
                <p className="text-sm leading-relaxed text-ink/75">
                  {t("consultancy.s1Copy")}
                </p>
              </div>

              {/* Step 02 */}
              <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-vermilion/25 pt-6 sm:pt-0 sm:pl-6">
                <span className="font-display text-4xl font-black text-vermilion/40 block">
                  02
                </span>
                <h3 className="font-display text-xl font-black text-vermilion">
                  {t("consultancy.s2Title")}
                </h3>
                <p className="text-sm leading-relaxed text-ink/75">
                  {t("consultancy.s2Copy")}
                </p>
              </div>

              {/* Step 03 */}
              <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-vermilion/25 pt-6 lg:pt-0 lg:pl-6">
                <span className="font-display text-4xl font-black text-vermilion/40 block">
                  03
                </span>
                <h3 className="font-display text-xl font-black text-vermilion">
                  {t("consultancy.s3Title")}
                </h3>
                <p className="text-sm leading-relaxed text-ink/75">
                  {t("consultancy.s3Copy")}
                </p>
              </div>

              {/* Step 04 */}
              <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-vermilion/25 pt-6 lg:pt-0 lg:pl-6">
                <span className="font-display text-4xl font-black text-vermilion/40 block">
                  04
                </span>
                <h3 className="font-display text-xl font-black text-vermilion">
                  {t("consultancy.s4Title")}
                </h3>
                <p className="text-sm leading-relaxed text-ink/75">
                  {t("consultancy.s4Copy")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 7: Final CTA ================= */}
        <section className="border-t-2 border-vermilion/30 px-5 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-vermilion">
              {t("consultancy.ctaHeading")}
            </h2>
            <p className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-ink/80 max-w-xl mx-auto">
              {t("consultancy.ctaCopy")}
            </p>
            <div className="mt-9 flex justify-center">
              <Button
                asChild
                className="h-12 rounded-full border-2 border-vermilion bg-vermilion px-8 text-sm font-bold text-saffron shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-1 hover:bg-vermilion/90 transition-all"
              >
                <Link to="/kundali" className="flex items-center gap-2">
                  <span>{t("consultancy.ctaBtn")}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
