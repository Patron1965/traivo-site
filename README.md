# Traivo — Marketing Site

Pixel-perfect klon av traivo.se, byggd med React + Vite + TypeScript.

- Ren CSS (inga UI-ramverk krävs för sidans sektioner) med designtokens i `src/index.css`
- Typsnitt: Inter (brödtext) + Space Grotesk (rubriker) via Google Fonts
- Språkväxling SV/EN via `src/contexts/LanguageContext.tsx`
- Sektioner i `src/components/`

## Kom igång

```bash
npm install
npm run dev
```

## Obs

Hjärnan (AI-rådgivaren) och kontaktformuläret anropar `/api/hjarna` m.fl. — dessa endpoints ingår inte i detta repo och behöver kopplas mot en backend (t.ex. Lovable Cloud/Supabase edge function eller extern API-server).
