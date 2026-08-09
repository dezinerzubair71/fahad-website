# AGENTS.md — Apex Brand Works Project Guidelines

## Design System & Tokens
- **Color Palette**:
  - `--color-ink`: `#0F1428` (Primary text, dark backgrounds)
  - `--color-apex-blue`: `#4A5AF0` (Primary accent - CTAs, Links, Paid Media)
  - `--color-ignite-coral`: `#FF6B4D` (Secondary accent - Badges, Brand & Retention)
  - `--color-signal-teal`: `#17B8A6` (Data accent - Organic & Content)
  - `--color-violet-ascent`: `#8B5FF0` (Data accent - Web & Ecommerce)
  - `--color-cloud`: `#F6F7FB` (Light backgrounds)
  - `--color-mist`: `#E4E7F2` (Borders, inputs)
  - `--color-slate`: `#5B6178` (Muted body text)
  - `--color-paper`: `#FFFFFF` (Card background)
- **Typography**:
  - Headings (H1-H3): Bricolage Grotesque (700, 800)
  - Body / UI: Inter (400, 500, 600)
  - Data / Eyebrows: IBM Plex Mono (500, uppercase, letter-spacing 0.08em)
- **Radius & Elevation**:
  - `--radius-sm`: 8px, `--radius-md`: 16px, `--radius-lg`: 28px, `--radius-pill`: 999px
  - `--shadow-resting`: `0 4px 16px rgba(15,20,40,0.06)`, `--shadow-hover`: `0 16px 40px rgba(15,20,40,0.14)`
- **Signature Motif**: "The Ascent Line" - continuous SVG stroke starting as a low jittery line on the left and rising to a clean diagonal peak on the right.

## Strict Icon & Emoji Policy
- **NO EMOJIS ANYWHERE**: No emojis in code, HTML, CSS, JavaScript, comments, or copy.
- **Inline SVG Only**: Every icon must be a true inline SVG or `<use href="assets/icons/icons.svg#icon-name">` reference from Lucide/Phosphor style icon set (1.5-2px stroke).
- **Category Colors**: Icons in service cards and mega menu are tinted with their respective category accent colors.

## Content Integrity Policy (Section 7)
- **Placeholders**: All statistics, metrics, testimonials, badges, and client names MUST be clearly marked as sample/placeholder content (e.g., `[XX]% Average Lead Growth*` with footnote `*Sample metrics — replace with verified data before launch`). Never present unverified metrics as fact.
- **Photos/Team**: Use abstract avatar placeholders or initials/geometric blocks for team members or testimonials. Do NOT use AI-generated stock people passed off as real employees/clients.
- **Legal Stub Links**: Privacy Policy and Terms of Service links MUST be stub `#` links, not fabricated legal text.

## Tech Stack Rules
- Plain HTML5, CSS3 (with CSS Custom Properties in `tokens.css`), Vanilla JavaScript.
- Shared `header.html` and `footer.html` loaded dynamically via `partials.js`.
- Clean URLs and Semantic HTML5 tags.
