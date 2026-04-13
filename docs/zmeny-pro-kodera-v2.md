# Změny pro implementaci

Designové úpravy jsme připravili jako vizuální mockupy a pushnuli na git: `homepage.html`, `index.html`, `navod.html`. Prosím otevři si je v prohlížeči — uvidíš, jak má výsledek vypadat. Nejsou to WordPress šablony, slouží jako vizuální reference.

Tabulka s novými texty: [Google Sheets](https://docs.google.com/spreadsheets/d/1x1CBxvh0zLiE4-sI7ABJWMZ3kmI3iUov0Y40gBqoPzs/edit?usp=sharing)

---

# 1. CSS úpravy (celý web)

Drobné úpravy stylů, které se projeví napříč webem.

1. **Sjednotit `padding-top` na homepage** — sekce `.slideshow .container h2` se zmenšuje na @1440px a `.how-to .inner-container` na @768px, zatímco zbytek webu používá `.section-spacing` s breakpointem @1024px. Prosím sjednotit, aby se všechny sekce chovaly stejně.

2. **`h3.secondary` line-height** — prosím změnit z `var(--line-height-30)` na `var(--line-height-33)`.

3. **Breakpoint mobilního menu** — s novou položkou "Návod" se desktop menu nevejde a naráží do loga. Prosím zvýšit breakpoint z 840px na 950px.

---

# 2. Výměna textů

Na webu je potřeba vyměnit hardcoded texty v PHP šablonách podle připravené tabulky v Google Sheets. V tabulce jsou pouze texty vyžadující zásah do kódu — texty editovatelné přes WP admin (produkt, klíčové složky, výsledky, návod k použití) si upravíme sami.

---

# 3. Produktová stránka

Vizuální reference: `index.html`

### Galerie

Aktuálně jsou thumby pod hlavním obrázkem na plnou šířku (588px pod sebou). Prosím předělat na kompaktní layout: velký obrázek nahoře + malé thumbnaily (80px, border-radius 15px) v řadě pod ním. Klik na thumbnail by měl změnit hlavní obrázek.

Sticky pozici prosím přehodit z `.product-info` na `.product-gallery` (text vpravo je teď delší než galerie). Mobilní Swiper galerie zůstává beze změny.

### Gap a šířka

Prosím nastavit gap mezi  `.product-gallery` a `.product-info` na 80px. Max-width `.product-info` zvýšit z 580px na 650px.

### Doprava a platba

Info o dopravě je aktuálně schované v akordeónu. Prosím přesunout ven, aby bylo viditelné přímo pod tlačítkem "Přidat do košíku" — bez nutnosti klikání. Položku "Doprava" z akordeónu pak prosím smazat, aby se info nezobrazovalo dvakrát.

Text "Při nákupu 2+ kusů doprava zdarma" je aktuálně řešený přes CSS `::after` pseudo-element na `.add-to-cart-section`. Prosím přesunout přímo do šablony — CSS snippet pak zrušíme sami.

Pod dopravu prosím přidat ikony platebních metod (Apple Pay, Google Pay, Mastercard, Visa) s popiskem "Přijímáme". SVG ikon jsou v mockupu `index.html` (hledej `<div class="payment-icons">`). Pořadí v sekci: nejdřív text o doručení se seznamem (Zásilkovna, DPD), pak platební ikony na konci. Vizuálně oddělené border-top od add-to-cart sekce výše.

### Nové sekce

- **Porovnání** — nová sekce s nadpisem "Věříme, že nejlepší je přirozenost", textovým blokem a fotkou (fotka bude doplněna). Viz mockup.
- **Testimonialy** — pod before/after slider přidat citát zákazníka (jméno, věk, doba používání). Obsah bude doplněn.

---

# 4. Homepage

Vizuální reference: `homepage.html`

### Testimonialy (sekce Výsledky)

Pod každý before/after slider (pro muže a pro ženy) prosím přidat citát zákazníka — jméno, věk a doba používání. Na desktopu by měl slider + citát pod ním tvořit jeden blok, dva bloky vedle sebe v poměru 50/50. Na mobilu pod sebou. Obsah citátů bude doplněn. Viz mockup.

### Produktové karty (sekce "Naše produkty")

Sekce se mění z vertikálních karet (velký obrázek + nadpis dole) na horizontální layout — obrázek vlevo, text s popiskem vpravo. Na mobilu pod sebou. Prosím podívej se na mockup `homepage.html` — nový vzhled je tam vidět. Textové popisky ke kartám najdeš v tabulce.

---

# 5. Pokladna

Na stránce pokladny prosím skrýt navigační menu, aby uživatelé měli focus na dokončení objednávky. Ponechat pouze logo vlevo nahoře s proklikem na homepage.

---

# 6. Katalog produktů (/produkty/)

Potřebujeme novou stránku se seznamem produktů. Aktuálně je shop ve WooCommerce vypnutý (přesměrovává na 404 v `inc/woocommerce.php`).

Budeme mít 6 samostatných simple produktů rozdělených do dvou kategorií (Pro muže / Pro ženy), každý v 1/2/3 baleních. Každý produkt musí mít vlastní URL pro marketing.

### Fáze 1

1. Prosím odblokovat shop stránku a nastavit `/produkty/` jako katalog.
2. Přidat filtr podle pohlaví: Vše / Pro muže / Pro ženy (pracuje s WooCommerce kategoriemi).
3. Přidat odkaz "Produkty" do hlavního menu.

Po fázi 1 založíme produkty v adminu a společně vyhodnotíme, jak katalog vypadá s výchozím WooCommerce designem.

### Fáze 2

Podle potřeby doladit vizuál produktových karet tak, aby odpovídal designu webu. Rozsah závisí na tom, jak bude vypadat výchozí šablona.

---

# 7. Návod (/navod/)

Nová rozcestníková stránka se dvěma kartami — "Pro muže" a "Pro ženy". Prosím použít podobný styl jako sekce "Naše produkty" na homepage. Vizuální mockup: `navod.html`.

Nadpis "Návod k použití" + krátký popis nahoře, pod tím dvě karty s obrázky produktů a odkazy na podstránky. Podstránky `/navod/pro-muze/` a `/navod/pro-zeny/` si založíme sami ve WordPressu.

Prosím přidat odkaz "Návod" do navigace (za "Náš produkt").
