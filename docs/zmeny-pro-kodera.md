# CSS opravy pro live WordPress theme (nograys.cz)

Tento dokument popisuje 3 CSS opravy, které je potřeba aplikovat do `style.css` live WordPress šablony (nebo do custom CSS). Opravy vycházejí z prototypu na branch `new-text`.

---

## 1. Horizontální overflow (celý web)

### Problém

Několik elementů používá záporné marginy + `calc()` pro edge-to-edge layout, což způsobuje horizontální scroll. `<body>` je pak užší než viewport.

Příklady dotčených elementů:

| Selektor | Vlastnost |
|---|---|
| `.product-gallery-mobile` | `width: calc(100% + var(--spacing-50))` + `margin-right: calc(-1 * var(--spacing-50))` |
| `.home .hero` | `margin-left: -100px` + `width: calc(100% + 200px)` |
| `.slideshow-container` | záporné pravé marginy na více breakpointech |
| `.how-to .background`, `.our-values .background` | `width: calc(100% + 2 * var(--spacing-150))` |

### Řešení

Přidat do globálního CSS:

```css
html, body {
  overflow-x: clip;
}
```

### Důležité

Použít **`clip`**, NE `hidden`.

`overflow-x: hidden` rozbije `position: sticky` (header, product-info sidebar), protože vytváří nový scroll container. `overflow-x: clip` ořízne přetečení bez vytvoření nového scroll containeru.

**Podpora prohlížečů:** Chrome 90+, Firefox 81+, Safari 16+.

---

## 2. Responsive font-size pro `h2` (celý web)

### Problém

V `style.css` má `h1` responzivní font-size na všech breakpointech (60 → 45 → 32 → 25 px) a `h2.secondary` má také responzivní přepisy (32 → 25 → 20 px). Ale obyčejný `h2` (bez `.secondary`) zůstává na **45 px na všech velikostech obrazovky**.

Na mobilu (@640px) je `h2` (45 px) **větší než `h1`** (32 px):

```
h1         = 32px
h2         = 45px  ← VĚTŠÍ než h1!
h2.secondary = 20px
```

### Řešení

Přidat responzivní přepisy pro `h2`:

```css
@media (max-width: 1440px) {
  h2:not(.secondary):not(.wp-block-heading):not(.h1) { font-size: var(--font-size-32); line-height: 42px; }
}
```

Selektor `h2:not(.secondary):not(.wp-block-heading):not(.h1)` cílí pouze na běžné h2 nadpisy. Vylučuje:
- `.secondary` — už má vlastní responsive přepisy
- `.wp-block-heading` — WordPress bloky, vlastní responsive
- **`.h1`** — elementy jako `<h2 class="h1">` na homepage (slideshow headline), které záměrně používají h1 styling a nesmí se měnit

### Cílová hierarchie velikostí

| Breakpoint | h1 | h2 | h2.secondary | h3.secondary |
|---|---|---|---|---|
| Desktop | 60 px | 45 px | 32 px | 30 px |
| @1440px a mensi | 45 px | 32 px (line-height: 42px) | 25 px | 24 px |

> **Poznámka:** Ověřit, že změna neovlivní nadpisy na ostatních stránkách webu (homepage, blog apod.). Pokud ano, zúžit selektor na `.product h2` nebo použít `:not(.wp-block-heading)`.

---

## 3. Layout produktové stránky — shipping info sekce

### Problém

Sekce shipping info byla přesunuta z akordeonu do viditelné oblasti pod tlačítkem "Přidat do košíku". Chybělo vizuální oddělení a pořadí obsahu bylo nelogické (platební ikony byly mezi bannerem dopravy zdarma a detaily doručení).

### Provedené změny

1. **Přesunutí `.payment-methods`** z horní části `.shipping-info` na konec (za seznam doručení)
2. **Změna popisku platebních metod** z "Platební metody" na "Přijímáme"
3. **Změna CSS `.payment-methods`:** `margin-bottom: 20px` → `margin-top: var(--spacing-20)` (element je nyní poslední, ne první)
4. **Přidání vizuálního oddělení** na `.shipping-info`:

```css
.shipping-info {
  padding-top: var(--spacing-30);
  border-top: 1px solid var(--white-color-light);
}
```

### Výsledné vizuální pořadí

```
[Přidat do košíku]
[Banner: "Při nákupu 2+ kusů doprava zdarma"]
─── border-top ───
Doručení: Zásilkovna a DPD...
  • Cena přepravy: 79 Kč s DPH
  • Zásilkovna: výdejní místa + domů
  • DPD: adresa + DPD Pickup
Přijímáme: [Apple Pay] [GPay] [MC] [Visa]
─── accordion border ───
[O produktu / Jak používat]
```

### HTML struktura (reference)

```html
<div class="shipping-info">
  <p>Doručení: Zásilkovna a DPD...</p>
  <ul>
    <li>Cena přepravy: 79 Kč s DPH</li>
    <li>Zásilkovna: ...</li>
    <li>DPD: ...</li>
  </ul>
  <div class="payment-methods">
    <span>Přijímáme</span>
    <img ... />
  </div>
</div>
```

---

## 4. Nejednotný `padding-top` sekcí napříč breakpointy (celý web)

### Problém

Sekce na webu používají různé mechanismy pro horní spacing a mění se na různých breakpointech. Všechny začínají na 90px a končí na 60px, ale přechod nastává na jiném breakpointu:

| Sekce | Stránka | Mechanismus | Desktop | @1440px | @1024px | @768px |
|---|---|---|---|---|---|---|
| Většina sekcí | všechny | `.section-spacing` | 90px | 90px | **→ 60px** | 60px |
| Slideshow headline | homepage | `.slideshow .container h2` (hardcoded) | 90px | **→ 60px** | 60px | 60px |
| How-to | homepage | `.how-to .inner-container` (hardcoded) | 90px | 90px | 90px | **→ 60px** |
| Product Info | produkt | `.product-info` (hardcoded) | **60px** | 60px | 60px | 60px |

### Doporučení

Sjednotit na jeden breakpoint — ideálně **@1024px** přes třídu `.section-spacing`, protože ji už většina sekcí používá.

Sekce s vlastním hardcoded `padding-top` by měly přejít na `.section-spacing`:
- `.slideshow .container h2` — nahradit hardcoded 90px/60px za `.section-spacing` třídu (nebo sjednotit breakpoint na @1024px)
- `.how-to .inner-container` — totéž, breakpoint posunout z @768px na @1024px

Výjimka: `.product-info` s 60px je záměrně menší (je to sticky sidebar, ne plná sekce) — neměnit.

> **Poznámka:** Před úpravou ověřit vizuálně na všech stránkách. Změna breakpointu z @1440px na @1024px u slideshow znamená, že heading bude mít 90px padding déle (na tabletové šířce).
