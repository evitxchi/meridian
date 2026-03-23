# Meridian — Customer Discovery Platform

Landing page for Meridian.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel (recommended, free)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub → Vercel
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. It auto-detects Vite and deploys in ~30 seconds
4. You get a free `.vercel.app` URL immediately

## Deploy to Netlify (also free)

```bash
npm run build
```
Then drag the `dist/` folder to netlify.com/drop

## Custom Domain

After deploying to Vercel or Netlify, add your domain in their dashboard settings.

## Font Swap (production)

The landing page uses Libre Baskerville and Outfit as stand-ins for Lyon Display and Suisse Int'l. To use the real fonts:

1. Purchase Lyon Display from commercialtype.com
2. Purchase Suisse Int'l from swisstypefaces.com  
3. Add the font files to `public/fonts/`
4. Add `@font-face` rules in `src/index.css`
5. Update the Google Fonts `<link>` in App.jsx to remove the stand-in fonts
6. Update font-family references from 'Libre Baskerville' → 'Lyon Display' and 'Outfit' → 'Suisse Intl'

## Email Capture

The form currently logs to state only. To collect emails for real:

- **Resend**: Add the Resend SDK and create an audience
- **Loops.so**: Connect via their API
- **Simple**: POST to a Google Apps Script that writes to a Google Sheet
- **Formspree**: Swap the form action to your Formspree endpoint
