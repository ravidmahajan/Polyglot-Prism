# Polyglot Prism

A language-learning web app that lets you explore translations, alphabets, and pronunciation across 10 languages with audio playback and cultural imagery.

## Supported Languages

| Language | Script | Flag |
|----------|--------|------|
| English | Latin | 🇬🇧 |
| French | Latin | 🇫🇷 |
| Mandarin | Hanzi | 🇨🇳 |
| Arabic | Arabic | 🇸🇦 |
| Russian | Cyrillic | 🇷🇺 |
| Japanese | Kanji/Kana | 🇯🇵 |
| Sanskrit | Devanagari | 🇮🇳 |
| Spanish | Latin | 🇪🇸 |
| Turkish | Latin | 🇹🇷 |
| Bangla | Bengali | 🇧🇩 |

## Features

- **Instant Translation** — Type a word or phrase and see it translated across all 10 languages simultaneously
- **Text-to-Speech** — Hear native pronunciation via browser speech synthesis or Google Translate TTS
- **Alphabet Explorer** — Browse characters, romanizations, and example words for each language's writing system
- **Difficulty Levels** — Quick picks organized by Basic, Intermediate, and Advanced
- **Category Browsing** — Explore words by topic (Greetings, Food, Nature, Emotions, Numbers, Family, Travel, Colors)
- **Cultural Imagery** — 90+ curated Unsplash photographs showcasing monuments, culture, cuisine, and scenery from each language's homeland
- **Ambient Background** — Animated gradient with scroll-driven cultural images that change per language
- **Day & Night Theme** — Toggle between light and dark modes with full theme adaptation

## Tech Stack

**Frontend:** React 18, Vite 5, Tailwind CSS, GSAP (ScrollTrigger), React Router  
**Backend:** Express.js (local dev) / Netlify Functions (production)  
**APIs:** Google Translate (via `google-translate-api-x`), Web Speech API

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/polyglot-prism.git
cd polyglot-prism
npm install
npm run dev
```

This starts both the Vite dev server (`http://localhost:3000`) and the Express backend (`http://localhost:5000`) concurrently.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`.

## Deploy to Netlify

The project is preconfigured for Netlify with serverless functions.

1. Push the repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
3. Connect your GitHub repo — Netlify auto-detects settings from `netlify.toml`
4. Click **Deploy**

The Express API routes are replaced by three Netlify Functions in `netlify/functions/`:

| Function | Route | Description |
|----------|-------|-------------|
| `translate.js` | `POST /api/translate` | Translate text to all 10 languages |
| `tts.js` | `GET /api/tts` | Text-to-speech audio proxy |
| `detect.js` | `POST /api/detect` | Detect input language |

## Project Structure

```
polyglot-prism/
├── index.html
├── netlify.toml              # Netlify build & redirect config
├── package.json
├── vite.config.js
├── tailwind.config.js
├── CREDITS.md                # Per-image Unsplash attribution
├── server/
│   └── index.js              # Express backend (local dev)
├── netlify/functions/         # Serverless functions (production)
│   ├── translate.js
│   ├── tts.js
│   └── detect.js
├── public/
│   └── _redirects
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── HomePage.jsx
    │   ├── LanguagePage.jsx
    │   ├── ImageCarousel.jsx
    │   ├── SearchBar.jsx
    │   ├── ConceptView.jsx
    │   ├── CharacterCard.jsx
    │   ├── QuickWords.jsx
    │   ├── CategoryPicker.jsx
    │   ├── LevelTabs.jsx
    │   ├── Footer.jsx
    │   └── ThreeBackground.jsx
    ├── data/alphabets/        # Character sets for each language
    └── utils/
        ├── api.js
        ├── languages.js
        ├── culturalImages.js
        ├── ambientThemes.js
        ├── ThemeContext.jsx
        ├── categories.js
        └── speech.js
```

## Image Credits

All cultural photographs are sourced from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license). The project uses **96 curated images** across 10 languages and the homepage, featuring:

- **Monuments** — Big Ben, Eiffel Tower, Great Wall, Taj Mahal, Alhambra, Hagia Sophia, and more
- **Culture** — Tea ceremonies, flamenco dancing, Holi festival, Whirling Dervishes, Durga Puja
- **Cuisine** — English afternoon tea, French patisserie, Japanese sushi, Spanish paella, Turkish delights
- **Scenery** — Cotswolds, Provence lavender fields, Li River, Lake Baikal, Sundarbans, Cappadocia

For a complete per-image attribution list with direct links to each photo on Unsplash, see **[CREDITS.md](CREDITS.md)**.

## License

MIT
