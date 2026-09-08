import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Moon, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export const Route = createFileRoute("/about")({
  component: About,
});

function ValueItem({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return <div className="border-t-2 border-vermilion pt-4"><div className="text-vermilion">{icon}</div><h3 className="mt-5 font-display text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p></div>;
}

function About() {
  const { t } = useLanguage();
  return (
    <>
      <section id="about" className="bg-saffron px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative max-w-md">
            <div className="absolute -left-4 -top-4 size-20 border-l-2 border-t-2 border-vermilion" />
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <blockquote className="mt-5 font-display text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl">
              {t("about.quote1")}<br /><span className="text-ink">{t("about.quote2")}</span>
            </blockquote>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <ValueItem icon={<Clock3 />} title={t("about.val1Title")} copy={t("about.val1Copy")} />
            <ValueItem icon={<Moon />} title={t("about.val2Title")} copy={t("about.val2Copy")} />
            <ValueItem icon={<Sparkles />} title={t("about.val3Title")} copy={t("about.val3Copy")} />
          </div>
        </div>
      </section>
    </>
  );
}
