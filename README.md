# GeTech Solutions — Flagship Website

**Engineering High-Impact Digital Futures.**

The official website for GeTech Solutions, a futuristic technology venture building high-impact digital solutions for startups, companies, visionaries, and communities.

## Stack

- **Next.js 15** (App Router, TypeScript, React Server Components)
- **Tailwind CSS v4** (CSS-variable theme tokens)
- **Framer Motion** (scroll reveals, magnetic buttons, page micro-interactions)
- **React Three Fiber + Three.js** (the revolving 3D "Core" in the hero)
- **Lucide React** (iconography)

## Brand — "The Alignment"

A single open crescent arc cradling a floating focal dot: focus, precision, and a singular perfect solution entering an ecosystem.

| Token | Value |
| --- | --- |
| Deep Obsidian Black | `#020406` |
| Midnight Slate | `#0B0E14` |
| Deep Nordic Blue | `#2B4162` |
| Meteorite Gray | `#9BA4B2` |
| Brushed Platinum | `#D1D5DB` |
| Focal Dot | `#FFFFFF` |

Headings: **Space Grotesk** · Body: **Plus Jakarta Sans**

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, zero config needed.
3. Add your custom domain under **Project → Settings → Domains**.

The contact form currently simulates a secure transmission client-side; wire `components/contact.tsx` to an API route or a form service (Resend, Formspree, etc.) for production submissions.

## Structure

```
app/
  layout.tsx        # fonts, SEO metadata, theme shell
  page.tsx          # one-page landing composition
  globals.css       # Tailwind v4 theme tokens + utilities
components/
  navbar.tsx        # glassmorphic sticky header
  hero.tsx          # hero copy, rotating audiences, CTAs
  hero-canvas.tsx   # R3F revolving 3D core
  bento-services.tsx# interactive bento grid + metrics
  labs.tsx          # GeTech Labs vertical switcher
  about.tsx         # The Alignment story
  contact.tsx       # floating-label proposal form
  footer.tsx        # status bar, links, copyright
  logo.tsx          # "The Alignment" mark
  magnetic-button.tsx / spotlight-card.tsx / reveal.tsx / counter.tsx / section-heading.tsx
```
