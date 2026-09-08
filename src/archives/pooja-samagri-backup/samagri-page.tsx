import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, SlidersHorizontal, X, Check, Package, Sparkles, ChevronDown, RotateCcw, Flame, Sun, Heart, Compass } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../i18n/LanguageContext";
import { PRODUCTS, CATEGORIES, type CategoryType, type Product } from "@/data/products";

export const Route = createFileRoute("/samagri")({
  component: Samagri,
});

// Custom Icon graphic for each product type
function ProductIcon({ type }: { type: Product["iconType"] }) {
  switch (type) {
    case "hawan":
    case "hawanCombo":
      return <Flame className="size-10 text-saffron/70" strokeWidth={1.5} />;
    case "guggal":
    case "lobaan":
      return <Sparkles className="size-10 text-saffron/70" strokeWidth={1.5} />;
    case "kapoor":
      return <Sun className="size-10 text-saffron/70" strokeWidth={1.5} />;
    case "chandan":
    case "haldi":
    case "kumkum":
      return <Heart className="size-10 text-saffron/70" strokeWidth={1.5} />;
    case "diya":
      return <Sun className="size-10 text-saffron/70" strokeWidth={1.5} />;
    case "rudraksha":
      return <Compass className="size-10 text-saffron/70" strokeWidth={1.5} />;
    default:
      return <ShoppingBag className="size-10 text-saffron/70" strokeWidth={1.5} />;
  }
}

function Samagri() {
  const { t, language } = useLanguage();
  const isHi = language === "hi";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("ALL");
  const [priceFilter, setPriceFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Selected Product for Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle ESC key to close modal/drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedProduct(null);
        setIsMobileFilterOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Category Filter
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }

      // 2. Price Filter
      if (priceFilter === "under500" && p.price >= 500) return false;
      if (priceFilter === "500-1000" && (p.price < 500 || p.price > 1000)) return false;
      if (priceFilter === "1000-2000" && (p.price < 1000 || p.price > 2000)) return false;
      if (priceFilter === "above2000" && p.price <= 2000) return false;

      // 3. Product Type Filter
      if (typeFilter !== "ALL" && p.productType !== typeFilter) return false;

      // 4. Availability Filter
      if (availabilityFilter !== "ALL" && p.availability !== availabilityFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
      return 0; // featured / default
    });
  }, [selectedCategory, priceFilter, typeFilter, availabilityFilter, sortBy]);

  // Count active non-category filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (priceFilter !== "ALL") count++;
    if (typeFilter !== "ALL") count++;
    if (availabilityFilter !== "ALL") count++;
    if (sortBy !== "featured") count++;
    return count;
  }, [priceFilter, typeFilter, availabilityFilter, sortBy]);

  // Clear all filters
  function clearAllFilters() {
    setSelectedCategory("ALL");
    setPriceFilter("ALL");
    setTypeFilter("ALL");
    setAvailabilityFilter("ALL");
    setSortBy("featured");
  }

  return (
    <>
      <main id="samagri" className="relative min-h-screen bg-ink text-saffron px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          
          {/* ================= PAGE HEADER ================= */}
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end border-b border-saffron/20 pb-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-saffron/80">{t("samagri.eyebrow")}</p>
              <h1 className="mt-3 font-display text-4xl font-black leading-[0.92] tracking-[-0.04em] sm:text-5xl lg:text-6xl text-saffron">
                {t("samagri.title1")}<br />{t("samagri.title2")}
              </h1>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-saffron/75 max-w-lg">
                {t("samagri.desc")}
              </p>
            </div>
            <Link 
              to="/kundali" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-saffron underline decoration-saffron/40 underline-offset-8 transition-colors hover:decoration-saffron"
            >
              {t("samagri.needGuidance")} <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* ================= 1. CATEGORY NAVIGATION ================= */}
          <div className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const catLabel = cat === "ALL" 
                  ? (isHi ? "सभी" : "ALL")
                  : cat === "POOJA SAMAGRI" ? (isHi ? "पूजा सामग्री" : "POOJA SAMAGRI")
                  : cat === "HAWAN SAMAGRI" ? (isHi ? "हवन सामग्री" : "HAWAN SAMAGRI")
                  : cat === "DIYA & PUJA ESSENTIALS" ? (isHi ? "दीया व पूजा सामग्री" : "DIYA & PUJA ESSENTIALS")
                  : cat === "HERBS & NATURAL ITEMS" ? (isHi ? "जड़ी-बूटियाँ व प्राकृतिक" : "HERBS & NATURAL ITEMS")
                  : (isHi ? "आध्यात्मिक वस्तुएं" : "SPIRITUAL ITEMS");

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-saffron text-ink shadow-[2px_2px_0_var(--color-vermilion)] scale-105"
                        : "border border-saffron/30 bg-saffron/5 text-saffron/75 hover:border-saffron/60 hover:text-saffron hover:bg-saffron/10"
                    }`}
                  >
                    {catLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= 2. CONTROLS BAR (FILTERS, SORT, COUNT) ================= */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-saffron/25 bg-[#180405]/80 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            
            {/* Left: Product Count Badge */}
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-black uppercase tracking-widest text-saffron">
                {selectedCategory === "ALL" ? (isHi ? "सभी उत्पाद" : "ALL PRODUCTS") : selectedCategory}
              </span>
              <span className="rounded-full bg-saffron/20 px-2.5 py-0.5 text-xs font-bold text-saffron border border-saffron/30">
                {filteredProducts.length} {filteredProducts.length === 1 ? (isHi ? "उत्पाद" : "ITEMS") : (isHi ? "उत्पाद" : "ITEMS")}
              </span>
            </div>

            {/* Desktop Filters Area */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none rounded border border-saffron/30 bg-ink px-3 py-1.5 pr-8 text-xs font-bold text-saffron focus:border-saffron focus:outline-none cursor-pointer"
                >
                  <option value="ALL">{isHi ? "मूल्य: सभी" : "Price: All"}</option>
                  <option value="under500">{isHi ? "₹500 से कम" : "Under ₹500"}</option>
                  <option value="500-1000">₹500 – ₹1,000</option>
                  <option value="1000-2000">₹1,000 – ₹2,000</option>
                  <option value="above2000">₹2,000+</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3.5 text-saffron/70" />
              </div>

              {/* Product Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none rounded border border-saffron/30 bg-ink px-3 py-1.5 pr-8 text-xs font-bold text-saffron focus:border-saffron focus:outline-none cursor-pointer"
                >
                  <option value="ALL">{isHi ? "प्रकार: सभी" : "Type: All"}</option>
                  <option value="Individual Item">{isHi ? "एकल वस्तु (Individual)" : "Individual Item"}</option>
                  <option value="Combo / Set">{isHi ? "कॉम्बो / सेट" : "Combo / Set"}</option>
                  <option value="Kit">{isHi ? "पूजन किट" : "Kit"}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3.5 text-saffron/70" />
              </div>

              {/* Availability Filter */}
              <div className="relative">
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="appearance-none rounded border border-saffron/30 bg-ink px-3 py-1.5 pr-8 text-xs font-bold text-saffron focus:border-saffron focus:outline-none cursor-pointer"
                >
                  <option value="ALL">{isHi ? "उपलब्धता: सभी" : "Stock: All"}</option>
                  <option value="In Stock">{isHi ? "स्टॉक में है" : "In Stock"}</option>
                  <option value="Out of Stock">{isHi ? "स्टॉक समाप्त" : "Out of Stock"}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3.5 text-saffron/70" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded border border-saffron/30 bg-ink px-3 py-1.5 pr-8 text-xs font-bold text-saffron focus:border-saffron focus:outline-none cursor-pointer"
                >
                  <option value="featured">{isHi ? "क्रम: विशेष (Featured)" : "Sort: Featured"}</option>
                  <option value="priceAsc">{isHi ? "मूल्य: कम से अधिक" : "Price: Low to High"}</option>
                  <option value="priceDesc">{isHi ? "मूल्य: अधिक से कम" : "Price: High to Low"}</option>
                  <option value="nameAsc">{isHi ? "नाम: A से Z" : "Name: A–Z"}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-3.5 text-saffron/70" />
              </div>

              {/* Clear Filters Button */}
              {(activeFiltersCount > 0 || selectedCategory !== "ALL") && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 rounded border border-saffron/40 px-3 py-1.5 text-xs font-bold text-saffron/80 hover:border-saffron hover:text-saffron"
                >
                  <RotateCcw className="size-3" />
                  {isHi ? "फ़िल्टर हटाएं" : "Clear Filters"}
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded border-2 border-saffron bg-saffron/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-saffron hover:bg-saffron/20"
              >
                <SlidersHorizontal className="size-4" />
                {isHi ? "फ़िल्टर व क्रम" : "FILTERS & SORT"}
                {activeFiltersCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-saffron text-[10px] font-black text-ink">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {(activeFiltersCount > 0 || selectedCategory !== "ALL") && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 rounded border border-saffron/30 px-3 py-2 text-xs font-bold text-saffron/75 hover:text-saffron"
                >
                  <RotateCcw className="size-3.5" />
                  {isHi ? "साफ़ करें" : "Reset"}
                </button>
              )}
            </div>
          </div>

          {/* ================= 3. PRODUCT CARDS GRID ================= */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {filteredProducts.map((product) => {
                const name = isHi ? product.nameHi : product.name;
                const shortDesc = isHi ? product.shortDescriptionHi : product.shortDescription;
                const isOutOfStock = product.availability === "Out of Stock";

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-saffron bg-ink p-6 shadow-[6px_6px_0_var(--color-saffron)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-saffron)]"
                  >
                    <div>
                      {/* Product Visual Area */}
                      <div className="relative mb-5 flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-saffron/25 bg-saffron/10 text-saffron transition-all group-hover:bg-saffron/15">
                        <ProductIcon type={product.iconType} />
                        <span className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-saffron/60">
                          {product.category}
                        </span>

                        {/* Stock Badge */}
                        <span
                          className={`absolute top-3 right-3 rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                            isOutOfStock
                              ? "bg-vermilion text-saffron border border-saffron/40"
                              : "bg-saffron/20 text-saffron border border-saffron/40"
                          }`}
                        >
                          {isOutOfStock ? (isHi ? "स्टॉक समाप्त" : "Out of Stock") : (isHi ? "स्टॉक में है" : "In Stock")}
                        </span>

                        {/* Weight Badge */}
                        <span className="absolute bottom-3 left-3 rounded bg-ink/90 px-2 py-0.5 text-[10px] font-bold text-saffron border border-saffron/30">
                          {product.weight}
                        </span>
                      </div>

                      {/* Header & Price */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl font-black leading-tight text-saffron">
                            {name}
                          </h3>
                          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-saffron/60">
                            {product.quantity}
                          </p>
                        </div>
                        <span className="font-display text-2xl font-black text-saffron shrink-0">
                          ₹{product.price}
                        </span>
                      </div>

                      {/* Short Description */}
                      <p className="mt-3 line-clamp-2 text-xs sm:text-sm leading-relaxed text-saffron/75">
                        {shortDesc}
                      </p>
                    </div>

                    {/* View Product CTA Button */}
                    <div className="mt-6 pt-5 border-t border-saffron/20">
                      <Button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="h-12 w-full rounded-full border-2 border-saffron bg-saffron font-bold text-ink shadow-[4px_4px_0_var(--color-vermilion)] hover:-translate-y-0.5 hover:bg-saffron/90 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
                      >
                        <span>{isHi ? "उत्पाद देखें" : "VIEW PRODUCT"}</span>
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= 7. EMPTY STATE ================= */
            <div className="my-12 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-saffron/30 bg-[#180405]/60 p-8 text-center">
              <Package className="size-12 text-saffron/40 mb-4" strokeWidth={1.2} />
              <h3 className="font-display text-2xl sm:text-3xl font-black text-saffron">
                {isHi ? "कोई उत्पाद नहीं मिला" : "NO PRODUCTS FOUND"}
              </h3>
              <p className="mt-2 max-w-sm text-xs sm:text-sm text-saffron/70 leading-relaxed">
                {isHi ? "अपनी खोज के लिए फ़िल्टर बदलने का प्रयास करें।" : "Try adjusting your filters to find what you are looking for."}
              </p>
              <Button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 border-2 border-saffron bg-saffron font-bold text-ink hover:bg-saffron/90"
              >
                <RotateCcw className="size-4 mr-2" />
                {isHi ? "सभी फ़िल्टर हटाएं" : "CLEAR FILTERS"}
              </Button>
            </div>
          )}

        </div>
      </main>

      {/* ================= 4. PRODUCT DETAIL MODAL / OVERLAY ================= */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-3xl rounded-2xl border-2 border-saffron bg-ink p-6 sm:p-8 text-saffron shadow-[12px_12px_0_var(--color-vermilion)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-saffron/30 bg-saffron/10 text-saffron hover:bg-saffron hover:text-ink transition-all z-10"
              aria-label="Close details"
            >
              <X className="size-5" />
            </button>

            {/* Modal Grid: Left Image & Right Info */}
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8 items-start">
              
              {/* LEFT: Large Product Visual */}
              <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-saffron/40 bg-saffron/10 text-saffron p-6">
                <ProductIcon type={selectedProduct.iconType} />
                <span className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-saffron/70">
                  {selectedProduct.category}
                </span>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="rounded bg-ink/90 px-3 py-1 text-xs font-bold text-saffron border border-saffron/30">
                    {selectedProduct.weight}
                  </span>
                  <span
                    className={`rounded px-3 py-1 text-xs font-black uppercase tracking-wider ${
                      selectedProduct.availability === "Out of Stock"
                        ? "bg-vermilion text-saffron border border-saffron/40"
                        : "bg-saffron/20 text-saffron border border-saffron/40"
                    }`}
                  >
                    {selectedProduct.availability === "Out of Stock" 
                      ? (isHi ? "स्टॉक समाप्त" : "Out of Stock") 
                      : (isHi ? "स्टॉक में है" : "In Stock")}
                  </span>
                </div>
              </div>

              {/* RIGHT: Product Meta & Details */}
              <div className="flex flex-col">
                <p className="eyebrow text-saffron/70 tracking-[0.2em]">{selectedProduct.category}</p>
                <h2 className="mt-1 font-display text-3xl sm:text-4xl font-black text-saffron leading-tight">
                  {isHi ? selectedProduct.nameHi : selectedProduct.name}
                </h2>

                <div className="mt-4 flex items-baseline gap-3 border-y border-saffron/20 py-3">
                  <span className="font-display text-3xl font-black text-saffron">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-xs font-bold text-saffron/70">
                    ({selectedProduct.quantity})
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm font-medium leading-relaxed text-saffron/85">
                  {isHi ? selectedProduct.shortDescriptionHi : selectedProduct.shortDescription}
                </p>

                {/* Primary CTA / Purchase Action */}
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    type="button"
                    disabled={selectedProduct.availability === "Out of Stock"}
                    className="h-12 w-full rounded-full border-2 border-saffron bg-saffron font-bold text-ink shadow-[4px_4px_0_var(--color-vermilion)] hover:-translate-y-0.5 hover:bg-saffron/90 disabled:opacity-50"
                  >
                    <ShoppingBag className="size-4 mr-2" />
                    {selectedProduct.availability === "Out of Stock"
                      ? (isHi ? "स्टॉक समाप्त" : "OUT OF STOCK")
                      : (isHi ? "ऑर्डर / पूछताछ करें" : "ADD TO CART / ENQUIRE")}
                  </Button>
                </div>
              </div>
            </div>

            {/* LOWER SECTION: Detailed Description & Ingredients */}
            <div className="mt-8 border-t border-saffron/20 pt-6">
              <h3 className="font-display text-xl font-black text-saffron mb-2">
                {isHi ? "उत्पाद विवरण" : "Product Details"}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-saffron/80">
                {isHi ? selectedProduct.detailedDescriptionHi : selectedProduct.detailedDescription}
              </p>

              {/* Ingredients / Dravya list */}
              {(selectedProduct.ingredients || selectedProduct.ingredientsHi) && (
                <div className="mt-5 border-t border-saffron/15 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-saffron/70 mb-2">
                    {isHi ? "सामग्री सूची (Ingredients / Dravya)" : "Ingredients / Sacreddravya"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(isHi ? selectedProduct.ingredientsHi : selectedProduct.ingredients)?.map((ing, idx) => (
                      <span 
                        key={idx}
                        className="rounded border border-saffron/30 bg-saffron/10 px-2.5 py-1 text-xs font-medium text-saffron/90 flex items-center gap-1.5"
                      >
                        <Check className="size-3 text-saffron" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-ink/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="w-full max-w-xs h-full bg-ink border-l-2 border-saffron p-6 text-saffron flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-saffron/20 pb-4 mb-6">
                <span className="font-display text-xl font-black uppercase tracking-wider text-saffron">
                  {isHi ? "फ़िल्टर व क्रम" : "FILTERS & SORT"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded p-1 text-saffron/70 hover:text-saffron"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Mobile Price */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-saffron/70 mb-2">
                  {isHi ? "मूल्य सीमा" : "Price Range"}
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full rounded border border-saffron/30 bg-ink px-3 py-2 text-xs font-bold text-saffron focus:border-saffron focus:outline-none"
                >
                  <option value="ALL">{isHi ? "सभी मूल्य" : "All Prices"}</option>
                  <option value="under500">{isHi ? "₹500 से कम" : "Under ₹500"}</option>
                  <option value="500-1000">₹500 – ₹1,000</option>
                  <option value="1000-2000">₹1,000 – ₹2,000</option>
                  <option value="above2000">₹2,000+</option>
                </select>
              </div>

              {/* Mobile Type */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-saffron/70 mb-2">
                  {isHi ? "उत्पाद प्रकार" : "Product Type"}
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full rounded border border-saffron/30 bg-ink px-3 py-2 text-xs font-bold text-saffron focus:border-saffron focus:outline-none"
                >
                  <option value="ALL">{isHi ? "सभी प्रकार" : "All Types"}</option>
                  <option value="Individual Item">{isHi ? "एकल वस्तु (Individual)" : "Individual Item"}</option>
                  <option value="Combo / Set">{isHi ? "कॉम्बो / सेट" : "Combo / Set"}</option>
                  <option value="Kit">{isHi ? "पूजन किट" : "Kit"}</option>
                </select>
              </div>

              {/* Mobile Availability */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-saffron/70 mb-2">
                  {isHi ? "उपलब्धता" : "Availability"}
                </label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full rounded border border-saffron/30 bg-ink px-3 py-2 text-xs font-bold text-saffron focus:border-saffron focus:outline-none"
                >
                  <option value="ALL">{isHi ? "सभी स्थान" : "All Availability"}</option>
                  <option value="In Stock">{isHi ? "स्टॉक में है" : "In Stock"}</option>
                  <option value="Out of Stock">{isHi ? "स्टॉक समाप्त" : "Out of Stock"}</option>
                </select>
              </div>

              {/* Mobile Sort */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-saffron/70 mb-2">
                  {isHi ? "क्रमानुसार (Sort By)" : "Sort By"}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded border border-saffron/30 bg-ink px-3 py-2 text-xs font-bold text-saffron focus:border-saffron focus:outline-none"
                >
                  <option value="featured">{isHi ? "विशेष (Featured)" : "Featured"}</option>
                  <option value="priceAsc">{isHi ? "मूल्य: कम से अधिक" : "Price: Low to High"}</option>
                  <option value="priceDesc">{isHi ? "मूल्य: अधिक से कम" : "Price: High to Low"}</option>
                  <option value="nameAsc">{isHi ? "नाम: A से Z" : "Name: A–Z"}</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-saffron/20 flex flex-col gap-2">
              <Button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full border-2 border-saffron bg-saffron font-bold text-ink"
              >
                {isHi ? "लागू करें" : "APPLY FILTERS"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full border-saffron/30 bg-transparent text-saffron hover:bg-saffron/10"
              >
                {isHi ? "रीसेट करें" : "RESET ALL"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
