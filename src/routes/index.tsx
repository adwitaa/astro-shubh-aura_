import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import mandala from "@/assets/astro-mandala.jpg";
import { useLanguage } from "../i18n/LanguageContext";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Astro Shubh Aura | Vedic Astrology & Kundali" },
      { name: "description", content: "Discover clarity through Vedic astrology, personalised Kundali readings, and sacred Pooja Samagri from Astro Shubh Aura." },
    ],
  }),
});

function Index() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative isolate border-b-2 border-vermilion bg-saffron px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="absolute inset-0 -z-10 opacity-15 mandala-lines" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="relative z-10 max-w-2xl">
            <div className="animate-fade-in mb-4">
              <span className="font-desi text-5xl sm:text-7xl lg:text-8xl font-black tracking-normal text-vermilion drop-shadow-[4px_4px_0_var(--color-ink)] inline-block leading-[0.95] border-b-4 border-vermilion/50 pb-2">
                एस्ट्रो शुभ ऑरा
              </span>
            </div>
            <p className="eyebrow animate-fade-in mt-2 text-[10px] sm:text-xs tracking-[0.25em] text-ink/70 font-extrabold uppercase">{t("hero.eyebrow")}</p>
            <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-[0.92] tracking-[-0.04em] animate-fade-in [animation-delay:120ms]">{t("hero.title1")}<br /><span className="text-green-800">{t("hero.title2")}</span></h1>
            <p className="mt-5 max-w-md text-sm font-medium leading-6 text-ink/75 sm:text-base animate-fade-in [animation-delay:220ms]">{t("hero.desc")}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-in [animation-delay:320ms]">
              <Button asChild className="h-12 rounded-full border-2 border-vermilion bg-vermilion px-6 text-sm font-bold text-saffron shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-1 hover:bg-vermilion/90">
                <Link to="/kundali">{t("hero.createKundali")} <ArrowRight /></Link>
              </Button>
              <Link to="/consultancy" className="group inline-flex items-center gap-2 px-2 text-sm font-bold">{t("hero.exploreConsultancy")} <span className="transition-transform group-hover:translate-x-1">→</span></Link>
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-vermilion/25 pt-5 text-xs font-bold text-ink/70 sm:gap-8">
              <span className="inline-flex items-center gap-2"><Check className="size-4" /> {t("hero.badge1")}</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4" /> {t("hero.badge2")}</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4" /> {t("hero.badge3")}</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[530px] animate-float lg:justify-self-end">
            <div className="relative aspect-square overflow-hidden rounded-[50%] border-[10px] border-vermilion bg-vermilion shadow-[10px_10px_0_var(--color-ink)]"><img src={mandala} alt="Red and gold yantra mandala with sun and moon symbols" width={1200} height={1200} className="size-full object-cover" /><div className="absolute inset-0 rounded-[50%] border border-saffron/70" /></div>
            <div className="absolute -bottom-5 -right-2 flex items-center gap-2 rounded-full border-2 border-vermilion bg-ink px-4 py-3 text-xs font-bold text-saffron shadow-[4px_4px_0_var(--color-vermilion)] sm:-right-7"><Moon className="size-4" /> {t("hero.listenInnerSky")}</div>
          </div>
        </div>
      </section>
    </>
  );
}
