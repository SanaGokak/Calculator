# Modesty by SanaGKK | Luxury Modest Fashion Atelier

A modern, high-couture e-commerce experience designed for **Modesty by SanaGKK**, tailored around an editorial palette of **Midnight Navy Blue**, **Warm Sand Beige**, and **Refined Slate Gray**.

---

## 🎨 Color Palette Architecture

- **Midnight Navy Blue** (`#0B1B2B`, `#12283E`, `#1A3857`): Represents timeless authority, regal depth, and luxury evening wear.
- **Warm Sand Beige** (`#FAF7F2`, `#EFE8DE`, `#DFD3C2`, `#CDBEAA`): Delivers serene desert warmth, effortless layering, and organic textile aesthetics.
- **Refined Slate Gray** (`#5A6B7C`, `#748597`, `#E2E8F0`): Provides sharp contemporary neutrality, architectural tailoring, and subtle contrast.
- **Champagne Gold Accents** (`#C5A880`, `#B39366`): Subtle metallic highlights on monograms, badges, and trust indicators.

---

## 🌟 Key Features Built

1. **Sticky Glassmorphism Header & Announcement Ticker**:
   - Live ticker with promotional discount (`MODEST10` for 10% off) and shipping perks.
   - Dynamic Multi-Currency Converter (**USD, AED, GBP, EUR, CAD**) with instant store-wide price conversion.
   - Brand monogram emblem (`SG`) and typographic branding.
   - Live search trigger with keyboard shortcut (`Ctrl + K`).
   - Wishlist counter and shopping bag counter with reactive badges.

2. **Hero Capsule Showcase**:
   - Editorial layout with animated capsule badge.
   - Floating interactive product pill with quick view shortcut.
   - Trust metric indicators (4.9/5 Star Rating from 2,800+ reviews, 100% Opacity Guarantee, 50"-60" tailored lengths).

3. **Curated Collections Showcase**:
   - Visual category cards: Luxury Abayas, Medina Silks, Tailored Co-ords, and Festive Kaftans.

4. **Dynamic Product Catalog & Filters**:
   - Filter by category tab: *All Pieces, Luxury Abayas, Silks & Hijabs, Modest Co-ords, Festive & Kaftans, Innerwear*.
   - Live real-time search input with instant matching across garment name, fabric, and color.
   - Sorting options: *Featured, Price: Low to High, Price: High to Low, Highest Rated, Newest*.
   - Product cards with hover image effects, color swatches, opacity badges, and quick "Add to Bag".

5. **Slide-Out Shopping Bag (Cart Drawer)**:
   - Dynamic **Free Shipping Progress Tracker** calculating remaining balance for complimentary express delivery.
   - Quantity stepper (`+` / `-`) and item removal with undo feedback.
   - Promo coupon code verification with instant discount computation (`MODEST10`, `WELCOME10`, `SANAVIP`).
   - Subtotal, shipping, and order total calculation in selected currency.

6. **Interactive Quick View Modal**:
   - High-resolution garment visual gallery.
   - Interactive size / length selector (`52"`, `54"`, `56"`, `58"`, `60"`).
   - Color swatch picker.
   - Fabric specs and 100% Opacity Guarantee seal.
   - Instant direct addition to bag.

7. **Interactive Height-to-Abaya Size Calculator**:
   - Real-time height slider (5'0" to 6'0" / 152 to 183 cm) that dynamically recommends the exact abaya size and floor-grazing drape profile.
   - Measurement table with bust, sleeve length, and hip specifications.

8. **"Shop The Look" Editorial Lookbook**:
   - Curated complete modest ensembles (e.g. *The Desert Monolith Ensemble*, *The Midnight Royal Soirée*) with color palette swatches and bundle incentives.

9. **Multi-Step Simulated Checkout**:
   - **Step 1:** Customer shipping and delivery address details.
   - **Step 2:** Shipping method selection (SanaGKK Insured Standard Courier vs DHL VIP Priority Express).
   - **Step 3:** Secure payment simulation (Credit Card with card preview, Apple/Google Pay, Cash on Delivery).
   - **Step 4:** Order confirmation screen with generated order reference (e.g., `#SG-849201`), tracking timeline, and printable receipt.

10. **Client Reviews & Testimonials**:
    - Verified patron reviews from Dubai, London, Toronto, and Dallas with star ratings and product tags.

11. **Client Care & FAQ Accordion**:
    - Smooth interactive accordion answering sizing, opacity, fabric care, and custom tailoring inquiries.

12. **VIP Circle Newsletter**:
    - Newsletter sign-up with immediate feedback generating coupon code `WELCOME10`.

---

## 📁 Project Structure

```
├── index.html          # Semantic HTML5 markup with OpenGraph & Schema.org data
├── css/
│   └── style.css       # Custom design system with CSS custom properties & responsive media queries
├── js/
│   ├── data.js         # Product catalog, currencies, size chart, lookbook & reviews
│   └── app.js          # Cart, wishlist, filters, modals, checkout simulation & toasts
└── README.md           # Documentation and guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser, or launch a lightweight local server:

```powershell
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .
```

Then visit `http://localhost:8000` in your web browser.
