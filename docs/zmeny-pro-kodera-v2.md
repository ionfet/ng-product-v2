# Změny pro implementaci

Připravil jsem statické HTML stránky — slouží jako vizuální reference. Pokud ti tenhle formát nevyhovuje a preferuješ Figmu, dej vědět a připravím to tam.

Prosím, všechny změny nejdřív implementuj na vývojové verzi webu, ať to můžeme společně projít a schválit před nasazením na produkci.

- [Homepage](https://ionfet.github.io/ng-product-v2/homepage.html)
- [Produktová stránka](https://ionfet.github.io/ng-product-v2/)
- [Návod](https://ionfet.github.io/ng-product-v2/navod.html)


---

# 1. CSS úpravy (celý web)

Drobné úpravy stylů, které se projeví napříč webem.

1. **Sjednotit `padding-top` na homepage** — sekce `.slideshow .container h2` se zmenšuje na @1440px a `.how-to .inner-container` na @768px, zatímco zbytek webu používá `.section-spacing` s breakpointem @1024px. Prosím sjednotit, aby se všechny sekce chovaly stejně.

2. **`h3.secondary` line-height** — prosím změnit z `var(--line-height-30)` na `var(--line-height-33)`.

3. **Breakpoint mobilního menu** — s novou položkou "Návod" se desktop menu nevejde a naráží do loga. Prosím zvýšit breakpoint z 840px na 950px.

---

# 2. Výměna textů

Na webu je potřeba vyměnit hardcoded texty v PHP šablonách podle připravené tabulky v Google Sheets. V tabulce jsou pouze texty vyžadující zásah do kódu — texty editovatelné přes WP admin (produkt, klíčové složky, výsledky, návod k použití) si upravíme sami.

Tabulka s novými texty: [Google Sheets](https://docs.google.com/spreadsheets/d/1x1CBxvh0zLiE4-sI7ABJWMZ3kmI3iUov0Y40gBqoPzs/edit?usp=sharing)

---

# 3. Produktová stránka

Vizuální reference: [ODKAZ](https://ionfet.github.io/ng-product-v2/)

### Hero sekce

Aktuálně jsou thumby pod hlavním obrázkem na plnou šířku (588px pod sebou). Prosím předělat layout: velký obrázek nahoře + malé thumbnaily (80px, border-radius 15px) v řadě pod ním. Klik na thumbnail by měl změnit hlavní obrázek.

Sticky pozici prosím přehodit z `.product-info` na `.product-gallery` (text vpravo je teď delší než galerie). Mobilní Swiper galerie zůstává beze změny.

![[produkt-01.jpeg]]


Prosím nastavit gap mezi  `.product-gallery` a `.product-info` na 80px. Max-width `.product-info` zvýšit z 580px na 650px.

### Volba varianty

Nadále budeme mít samostatné produkty pro muže a pro ženy (viz sekce Katalog produktů níže), takže volba varianty (`.variation-selection` s dropdownem "Pro muže / Pro ženy") na stránce produktu už nedává smysl. Prosím tento prvek **skrýt přes CSS** (`display: none`) — neodstraňovat ho z DOM, ať zůstává funkční jako fallback pro WooCommerce formulář.

### Doprava a platba

Info o dopravě je aktuálně schované v akordeónu. Prosím přesunout ven, aby bylo viditelné přímo pod tlačítkem "Přidat do košíku" — bez nutnosti klikání. Položku "Doprava" z akordeónu pak prosím smazat, aby se info nezobrazovalo dvakrát.

Banner **"ℹ️ Při nákupu 2+ kusů doprava zdarma"** je aktuálně řešený přes CSS `::after` pseudo-element na `.add-to-cart-section`. Prosím přesunout do skutečného HTML elementu (např. `<div class="free-shipping-banner">`) přímo v PHP šabloně, hned za `.add-to-cart-section`. CSS přesunout z `::after` na `.free-shipping-banner`.

Pod banner prosím přesunout ikony platebních metod (Apple Pay, Google Pay, Mastercard, Visa) s popiskem "Přijímáme". SVG ikon jsou v mockupu [Produktová stránka](https://ionfet.github.io/ng-product-v2/).

Pořadí v sekci `.product-info`:
1. Add to cart sekce (cena + tlačítko)
2. Banner "Při nákupu 2+ kusů doprava zdarma"
3. Platební ikony s popiskem "Přijímáme"
4. Shipping info (text o doručení + seznam Zásilkovna/DPD), oddělené border-top

![[produkt-02.jpeg]]

### Nové sekce

- **Testimonialy** — pod before/after slider přidat testimonial zákazníka (jméno, věk, doba používání). Obsah bude doplněn.![[produkt-03.jpeg]]

- **Porovnání** — nová sekce s nadpisem "Věříme, že nejlepší je přirozenost", textovým blokem a fotkou (fotka bude doplněna). [Produktová stránka](https://ionfet.github.io/ng-product-v2/)![[produkt-04.jpeg]]

---

# 4. Homepage

Vizuální reference: [ODKAZ](https://ionfet.github.io/ng-product-v2/homepage.html)

### Testimonialy (sekce Výsledky)

Pod každý before/after slider (pro muže a pro ženy) prosím přidat testimonial zákazníka — jméno, věk a doba používání. Obsah bude doplněn. Viz [Homepage](https://ionfet.github.io/ng-product-v2/homepage.html).

![[home-01.jpeg]]

### Produktové karty (sekce "Naše produkty")

Sekce se mění na horizontální layout — obrázek vlevo, text s popiskem vpravo. Na mobilu pod sebou viz [Homepage](https://ionfet.github.io/ng-product-v2/homepage.html) Textové popisky ke kartám najdeš v tabulce.

![[home-03.jpeg]]

---

# 5. Pokladna

Na stránce pokladny prosím skrýt navigační menu, aby uživatelé měli focus na dokončení objednávky. Ponechat pouze logo vlevo nahoře s proklikem na homepage.

![[pokladna.jpeg]]

---

# 6. Katalog produktů (/produkty/)

Potřebujeme novou stránku se seznamem produktů. Aktuálně je katalog ve WooCommerce vypnutý.

Budeme mít 6 samostatných produktů rozdělených do dvou kategorií (Pro muže / Pro ženy), každý v 1/2/3 baleních.

1. Prosím odblokovat katalog stránku a nastavit ho na `/produkty/`
2. Přidat filtr podle pohlaví: Vše / Pro muže / Pro ženy
3. Přidat odkaz "Produkty" do hlavního menu místo "Náš produkt"

Pak založíme produkty v adminu a vyhodnotíme, jak katalog vypadá s výchozím WooCommerce designem.

---

# 7. Návod (/navod/)

Vizuální reference: [ODKAZ](https://ionfet.github.io/ng-product-v2/navod.html)


Nová stránka rozcestník — "Pro muže" a "Pro ženy". 

Nadpis "Návod k použití" + krátký popis nahoře, pod tím dvě karty s fotky produktů a odkazy na podstránky. Podstránky `/navod/pro-muze/` a `/navod/pro-zeny/` si založíme sami ve WordPressu.

![[navod-01.jpeg]]

Prosím přidat odkaz "Návod" do navigace (za "Produkty").
