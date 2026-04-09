# Úprava pro kodéra: sjednotit horní mezery mezi sekcemi

## O co jde

Na webu mají všechny hlavní sekce (Key Ingredients, Before/After, How-to atd.) horní mezeru 90px na desktopu, která se zmenší na 60px na menších obrazovkách. To je správně.

Problém je, že ke zmenšení dochází na **různých šířkách obrazovky** podle toho, která sekce to je. Uživatel to vidí tak, že při zmenšování okna se mezery nemění všechny najednou — některé skočí dřív, jiné později.

## Co je špatně

Většina sekcí používá třídu `.section-spacing`, která se mění na šířce **1024px**. Ale dvě sekce na homepage mají vlastní CSS s jiným bodem přechodu:

- **Slideshow nadpis** (`.slideshow .container h2`) — zmenší se už na **1440px**, tedy dřív než ostatní
- **How-to sekce** (`.how-to .inner-container`) — zmenší se až na **768px**, tedy později než ostatní

## Co s tím

Obě sekce by se měly chovat stejně jako ostatní — zmenšit se na **1024px**. Buď:
- Přidat jim třídu `.section-spacing` a odstranit hardcoded `padding-top`
- Nebo upravit jejich media queries v CSS tak, aby breakpoint byl @1024px

## Kde to ověřit

- **Homepage** (https://nograys.cz/) — slideshow a how-to sekce
- **Stránka O nás** a **produkt** jsou v pořádku, ty se měnit nemusí
