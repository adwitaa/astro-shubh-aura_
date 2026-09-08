# Pooja Samagri Shop Archive & Restoration Guide

**Archive Location:** `src/archives/pooja-samagri-backup/`  
**Created:** September 8, 2026  

---

## 1. Overview & Archived Components

This archive contains the full, production-ready implementation of the Astro Shubh Aura **Pooja Samagri Shop**, including product data, multi-category navigation, interactive filter controls, sort functionality, mobile filter drawer, and detailed product modal views.

### Included Files in Archive:
- **`samagri-page.tsx`**: Full React component for the live shop page (`src/routes/samagri.tsx`), featuring category tabs, price/type/stock filters, sort options, product cards grid, and product details modal view.
- **`products.ts`**: Complete structured product catalogue (`src/data/products.ts`) containing 13 products with full metadata.
- **`samagri-translations-reference.json`**: Reference translation keys for English and Hindi text strings.
- **`README.md`**: Restoration guide.

---

## 2. Archived Product Data Summary

The product catalogue includes 13 items spanning 5 categories:

1. **Havan Samagri** (ID: 1 | Category: HAWAN SAMAGRI | ₹251 | 250g)
2. **Pure Guggal** (ID: 2 | Category: HERBS & NATURAL ITEMS | ₹151 | 100g)
3. **Premium Lobaan** (ID: 3 | Category: HERBS & NATURAL ITEMS | ₹181 | 100g)
4. **Bhimseni Kapoor** (ID: 4 | Category: DIYA & PUJA ESSENTIALS | ₹351 | 50g)
5. **Chandan Powder** (ID: 5 | Category: POOJA SAMAGRI | ₹211 | 50g)
6. **Organic Haldi** (ID: 6 | Category: POOJA SAMAGRI | ₹51 | 100g)
7. **Kumkum / Roli** (ID: 7 | Category: POOJA SAMAGRI | ₹51 | 50g)
8. **Akshat (Rice)** (ID: 8 | Category: POOJA SAMAGRI | ₹41 | 100g)
9. **Navadhanya** (ID: 9 | Category: POOJA SAMAGRI | ₹111 | 150g)
10. **Maha Lakshmi Puja Kit** (ID: 10 | Category: POOJA SAMAGRI | ₹1250 | 1.2 kg)
11. **Brass Panch Aarti Diya** (ID: 11 | Category: DIYA & PUJA ESSENTIALS | ₹899 | 450g)
12. **Grand Hawan Samagri Combo Pack** (ID: 12 | Category: HAWAN SAMAGRI | ₹2400 | 3.5 kg)
13. **Rudraksha Japa Mala (108+1)** (ID: 13 | Category: SPIRITUAL ITEMS | ₹651 | 80g)

Each product contains: `id`, `name`, `nameHi`, `category`, `price`, `weight`, `quantity`, `productType`, `availability`, `shortDescription`, `shortDescriptionHi`, `detailedDescription`, `detailedDescriptionHi`, and `ingredients` / `ingredientsHi`.

---

## 3. How to Restore the Shop

To restore the full Pooja Samagri shop experience to the live site at any time:

1. **Restore Product Data:**
   Copy `src/archives/pooja-samagri-backup/products.ts` to `src/data/products.ts`.

2. **Restore Route Component:**
   Copy `src/archives/pooja-samagri-backup/samagri-page.tsx` to `src/routes/samagri.tsx`.

3. **Verify Translations:**
   Ensure `src/i18n/translations.ts` includes the `samagri` translation block as defined in `samagri-translations-reference.json`.

4. **Verify Application:**
   Navigate to `/samagri` to confirm category filtering, price/type/stock filters, sorting, product card rendering, and product detail modals function seamlessly.
