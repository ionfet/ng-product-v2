# Sjednocení padding-top sekcí

Sekce na webu mají stejný spacing (90px → 60px), ale přechod nastává na různých breakpointech:

| Sekce | Stránka | Breakpoint změny |
|---|---|---|
| `.section-spacing` (většina sekcí) | všechny | @1024px |
| `.slideshow .container h2` | homepage | @1440px |
| `.how-to .inner-container` | homepage | @768px |

Slideshow a How-to na homepage používají vlastní hardcoded `padding-top` místo společné třídy `.section-spacing`.

## Doporučení

Sjednotit na **@1024px** přes `.section-spacing` — buď přidat třídu, nebo sladit breakpointy v CSS.

Stránka O nás je OK — všechny sekce už používají `.section-spacing`.

`.product-info` má záměrně 60px vždy (sticky sidebar) — neměnit.
