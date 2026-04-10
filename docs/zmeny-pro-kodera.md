# Poznámka

Designové úpravy (HTML/CSS) jsme připravili v naší lokální verzi a pushnuli na git. Soubory `homepage.html` a `index.html` (produktová stránka) slouží jako **vizuální mockup** — otevři si je v prohlížeči, abys viděl, jak má výsledek vypadat. Nejsou to 1:1 kopie WordPress šablon, takže prosím nekopíruj kód přímo, ale implementuj změny v rámci existujících PHP šablon tématu.

---

# 1. CSS úpravy

Drobné úpravy stylů napříč webem.

## Co je potřeba

1. **Sjednotit horní mezery na homepage** — dvě sekce mají vlastní hardcoded `padding-top` místo společné třídy `.section-spacing`. Prosím přidej třídu `.section-spacing` a odstraň hardcoded `padding-top` z CSS:
   - `.slideshow .container h2` (v CSS má vlastní `padding-top: 90px` s breakpointem @1440px)
   - `.how-to .inner-container` (v CSS má vlastní `padding-top: 90px` s breakpointem @768px)

2. **Line-height u h3.secondary** — `h3.secondary` má aktuálně `line-height: var(--line-height-30)`, prosím změň na `line-height: var(--line-height-33)`.

3. **Zvýšit breakpoint pro mobilní menu** — aktuálně se desktop menu schová pod hamburger na 840px (`header.scss`). S novou položkou "Návod" se menu nevejde a naráží do loga. Prosím zvyš breakpoint na 950px (všechna místa kde je `max-width: 840px` v header stylu).

---

# 2. Výměna textů na webu

Na webu je potřeba vyměnit hardcoded texty v šablonách podle připravené tabulky. Tabulka obsahuje pro každou stránku aktuální text a vedle něj nový text, kterým ho nahradíš.

Poznámka: v tabulce jsou **pouze texty, které vyžadují zásah do kódu** (hardcoded v PHP šablonách). Texty editovatelné přes WP admin (název produktu, popis, klíčové složky, výsledky, návod k použití) si upravíme sami.

## Co je potřeba

### Homepage — hardcoded texty v šablonách:
- **Hero nadpis + podnadpis** — soubor `partials/components/cta_section/index.php`
- **Intro text** — soubor `partials/components/slideshow/index.php`
- **Benefity (4 položky)** — nadpisy i texty v `partials/components/slideshow/index.php`
- **Sekce "Jak aplikovat" (4 kroky)** — celá sekce v `partials/components/how_to/index.php` — obsah se mění na info o produktu
- **Testimonialy** — na homepage jsou dva existující slidery (pro muže a pro ženy). K nim je potřeba přidat texty (jméno, doba používání, citát). Obsah bude doplněn.
- **Produktové karty** — v `partials/components/ours_products/index.php` karty aktuálně zobrazují jen obrázek, nadpis a odkaz. Prosím přidej textový popisek pod každou kartu (texty najdeš v tabulce).

### Produktová stránka — textové změny:
- **Přejmenovat nadpis v accordionu** — v `partials/product/info/accordion.php` prosím změň "Jak přípravek užívat?" na "Jak tonikum používat?"

**Kompletní tabulka s texty:** [Google Sheets](https://docs.google.com/spreadsheets/d/1x1CBxvh0zLiE4-sI7ABJWMZ3kmI3iUov0Y40gBqoPzs/edit?usp=sharing)

---

# 3. Produktová stránka — strukturální změny

Změny layoutu a nové sekce na stránce produktu.

## Co je potřeba

### Layout:
- **Předělat galerii produktu** — aktuálně jsou thumby pod hlavním obrázkem na plnou šířku (588px pod sebou). Prosím předělej na kompaktní layout: velký čtvercový obrázek nahoře + malé čtverečky (80px, border-radius 15px) v řadě pod ním. Klik na thumb změní hlavní obrázek — v `product.js` zatím žádný klik handler na thumby není. Sticky přehoď z `.product-info` na `.product-gallery` (text vpravo je teď delší než galerie). Mobilní Swiper galerie zůstává beze změny.
- **Gap a šířka** — prosím nastav gap mezi galerií a pravou částí na 80px a max-width pravé části (`.product-info`) na 650px.
- **Doprava — vytáhnout z accordionu** — info o dopravě prosím přesuň z accordionu ven, aby bylo viditelné přímo bez kliknutí. Text "ℹ️ Při nákupu 2 a více kusů doprava zdarma." je aktuálně řešený CSS snippetem přes `::after` pseudo-element na `.add-to-cart-section`. Prosím přesuň ho přímo do PHP šablony a ten CSS snippet pak zrušíme.

### Nové sekce:
- **Porovnání** — nadpis "Věříme, že nejlepší je přirozenost", textový blok a fotka (bude doplněna)
- **Testimonialy** — na produktové stránce jsou existující slidery, ke kterým je potřeba přidat texty (jméno, doba používání, citát). Obsah bude doplněn.

---

# 4. Zjednodušit hlavičku na stránce Pokladna

Na stránce pokladna je potřeba odstranit horní navigační menu, aby uživatelé nepřeklikávali jinam a měli focus pouze na platbu a dokončení objednávky.

## Co je potřeba

1. **Odstranit navigační menu** — na stránce pokladna prosím skryj kompletní horní menu (odkazy, hamburger menu apod.)
2. **Ponechat pouze logo** — logo zůstane vlevo nahoře s proklikem na homepage

---

# 5. Nová stránka: Katalog produktů (/produkty/)

Potřebujeme novou stránku se seznamem všech produktů. Aktuálně je shop stránka ve WooCommerce vypnutá (vrací 404). Cílem je zobrazit produkty v mřížce s možností filtrování podle pohlaví. Díky za pomoc!

## Struktura produktů

Místo jednoho produktu s variantami budeme mít **6 samostatných simple produktů** ve WooCommerce, rozdělených do dvou kategorií:

**Kategorie "Pro muže":**
- GR-7 Pro muže — 1 balení
- GR-7 Pro muže — 2 balení (se slevou)
- GR-7 Pro muže — 3 balení (se slevou)

**Kategorie "Pro ženy":**
- GR-7 Pro ženy — 1 balení
- GR-7 Pro ženy — 2 balení (se slevou)
- GR-7 Pro ženy — 3 balení (se slevou)

Důvod: každý produkt musí mít vlastní URL pro marketing a reklamu.

## Co je potřeba — Fáze 1

1. **Odblokovat shop/katalog stránku** — v `inc/woocommerce.php` je shop stránka vypnutá (přesměrovává na 404). Prosím odblokuj ji a nastav stránku `/produkty/` jako katalog.
2. **Přidat filtr podle pohlaví** — na stránce katalogu prosím přidej taby nebo tlačítka: Vše / Pro muže / Pro ženy. Filtr pracuje s WooCommerce kategoriemi produktů.
3. **Přidat stránku do navigace** — odkaz "Produkty" do hlavního menu.

Po dokončení Fáze 1 my založíme 6 produktů v adminu a vyplníme obsah. Pak společně vyhodnotíme, jak katalog vypadá s výchozím WooCommerce designem.

## Co je potřeba — Fáze 2 (až po vyhodnocení Fáze 1)

Podle potřeby doladit vizuál produktových karet (obrázek, název, cena, tlačítko do košíku) tak, aby odpovídal designu webu. Rozsah úprav závisí na tom, jak bude vypadat výchozí WooCommerce šablona.

---

# 6. Nová stránka: Návod (/navod/)

Potřebujeme novou stránku "Návod", která slouží jako rozcestník na dvě podstránky — návod pro muže a návod pro ženy.

## Struktura

- `/navod/` — rozcestníková stránka se dvěma kartami/tlačítky: "Pro muže" a "Pro ženy"
- `/navod/pro-muze/` — podstránka s návodem pro muže
- `/navod/pro-zeny/` — podstránka s návodem pro ženy

## Co je potřeba

1. **Vytvořit šablonu rozcestníku** — stránka `/navod/` s dvěma kartami odkazujícími na podstránky. Design podobný sekci "Naše produkty" na homepage (dvě karty vedle sebe).
2. **Vytvořit šablonu podstránky** — šablona pro návod, kde bude obsah editovatelný přes WP admin. Obsah dodáme.
3. **Přidat do navigace** — odkaz "Návod" do hlavního menu.
