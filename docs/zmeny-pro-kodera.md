# Úprava: sjednotit horní mezery na homepage

Na homepage mají dvě sekce vlastní hardcoded `padding-top` místo společné třídy `.section-spacing`. Kvůli tomu se mezery nezmenšují na stejném breakpointu jako ostatní sekce na webu.

## Co udělat

U těchto dvou sekcí přidat třídu `.section-spacing` a odstranit hardcoded `padding-top` z CSS:

1. **Slideshow nadpis** — `.slideshow .container h2` (v CSS má vlastní `padding-top: 90px` s breakpointem @1440px)
2. **How-to sekce** — `.how-to .inner-container` (v CSS má vlastní `padding-top: 90px` s breakpointem @768px)

Ostatní stránky (produkt, o nás) jsou v pořádku.
