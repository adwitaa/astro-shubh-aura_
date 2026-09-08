import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Sparkles, Sun, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";

function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("common.pageNotFound")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("common.pageNotFoundDesc")}</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            {t("common.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("common.pageNotLoad")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("common.pageNotLoadDesc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            {t("common.tryAgain")}
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            {t("common.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Astro Shubh Aura" },
      { name: "description", content: "Vedic astrology, Kundali readings, and sacred essentials for a more intentional life." },
      { property: "og:title", content: "Astro Shubh Aura" },
      { property: "og:description", content: "Vedic astrology, Kundali readings, and sacred essentials for a more intentional life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#e8ad00" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&family=Rozha+One&family=Yatra+One&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: AppWrapper,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  );
}

function AppWrapper() {
  return <RootComponent />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen overflow-hidden bg-saffron text-vermilion">
        <div className="top-strip flex items-center justify-center gap-2 bg-vermilion px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-saffron sm:text-xs">
          <Sparkles className="size-3.5" /> {t("common.topStrip")} <Sparkles className="size-3.5" />
        </div>

        <header className="relative z-30 border-b border-vermilion/20 bg-saffron/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <Link to="/" className="group flex items-center gap-3" aria-label="एस्ट्रो शुभ Aura home">
              <div className="flex size-11 items-center justify-center rounded-full border-2 border-vermilion bg-vermilion text-saffron shadow-[3px_3px_0_var(--color-ink)] transition-transform group-hover:rotate-6"><Sun className="size-6" strokeWidth={1.7} /></div>
              <div>
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-desi text-xl font-bold tracking-tight text-vermilion sm:text-2xl">एस्ट्रो शुभ</span>
                  <span className="font-display text-lg font-black tracking-wider text-ink sm:text-xl">Aura</span>
                </div>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-ink/70">{t("common.vedicAstrology")}</p>
              </div>
            </Link>
            
            <nav className="hidden items-center gap-8 text-sm font-bold lg:flex" aria-label="Main navigation">
              <Link className="story-link" to="/">{t("nav.home")}</Link>
              <Link className="story-link" to="/kundali">{t("nav.kundali")}</Link>
              <Link className="story-link" to="/consultancy">{t("nav.consultancy")}</Link>
              <Link className="story-link" to="/samagri">{t("nav.samagri")}</Link>
              <Link className="story-link" to="/about">{t("nav.about")}</Link>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} 
                className="text-xs font-bold px-3 py-1.5 rounded-full border border-vermilion text-vermilion hover:bg-vermilion hover:text-saffron transition-colors"
                aria-label="Change language"
              >
                {language === 'en' ? 'हिन्दी' : 'English'}
              </button>
              <Button asChild className="rounded-full border-2 border-vermilion bg-vermilion px-5 font-bold text-saffron shadow-[3px_3px_0_var(--color-ink)] hover:-translate-y-0.5 hover:bg-vermilion/90">
                <Link to="/kundali">{t("nav.beginReading")} <ArrowRight /></Link>
              </Button>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} 
                className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-vermilion text-vermilion hover:bg-vermilion hover:text-saffron transition-colors"
                aria-label="Change language"
              >
                {language === 'en' ? 'हिन्दी' : 'EN'}
              </button>
              <Button type="button" variant="ghost" size="icon" className="text-vermilion hover:bg-vermilion/10" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          {menuOpen && (
            <nav className="border-t border-vermilion/20 px-5 py-4 lg:hidden" aria-label="Mobile navigation">
              <div className="flex flex-col gap-4 text-sm font-bold">
                <Link to="/" onClick={() => setMenuOpen(false)}>{t("nav.home")}</Link>
                <Link to="/kundali" onClick={() => setMenuOpen(false)}>{t("nav.kundali")}</Link>
                <Link to="/consultancy" onClick={() => setMenuOpen(false)}>{t("nav.consultancy")}</Link>
                <Link to="/samagri" onClick={() => setMenuOpen(false)}>{t("nav.samagri")}</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>{t("nav.about")}</Link>
              </div>
            </nav>
          )}
        </header>

        <Outlet />

        <footer className="bg-ink px-5 py-8 text-saffron sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs font-bold sm:flex-row sm:items-center">
            <p className="font-desi text-xl font-bold">{t("common.astroShubhAura")}</p>
            <p className="text-saffron/60">{t("common.footerText")}</p>
            <Link className="story-link" to="/kundali">{t("nav.beginReading")} ↑</Link>
          </div>
        </footer>
      </main>
    </QueryClientProvider>
  );
}
