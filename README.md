# imageMitra — On-Device, Client-Side Image Processing PWA

imageMitra is a premium, privacy-first Progressive Web App (PWA) that offers a suite of high-performance tools for image editing, compression, background removal, and format conversion—running **entirely inside the user's browser**. With absolute privacy (zero server uploads) and offline capabilities, imageMitra behaves like a native mobile app and features a stark, modern Vercel-inspired design.

## 🚀 Key Technical Highlights (For Interviewers)

This project showcases a range of advanced web engineering patterns:

*   **100% On-Device Execution**: Files never touch a network server. By leveraging modern client-side APIs (`HTML5 Canvas`, `PDF-Lib`) and compiling file buffers in memory, processing operates at lightning speeds with zero upload latency.
*   **Progressive Web App (PWA) with Offline Caching**: Built a custom service worker (`sw.js`) and web app manifest to enable installability on desktop and mobile. Pre-caches core routes and uses a dynamic *Cache-First* strategy for bundled static scripts, styles, and fonts, allowing the app to launch and run fully offline.
*   **Ask AI Assistant (Speech Synthesis & NLP)**: Integrated Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) to build an interactive modal assistant. Features friendly, human-sounding speech feedback parameters (natural speed and pitch rates) and parses user queries to automatically trigger client-side pipelines (e.g., auto-background removal, quality percentage compression).
*   **Dynamic, Accessible Design System**: Styled according to Vercel's stark black-and-ink visual guidelines. Built custom HSL color tokens supporting instant dark-mode transitions, micro-animations, and a responsive tabbed workspace designed to prevent scrolling bloat on mobile screens.
*   **IndexedDB File History Library**: Integrates local database adapters to maintain a secure offline library of recently processed files, allowing users to re-download, delete, or reload files back into workspace tools.

---

## 🛠️ Built-in Processing Suite

1.  **Background Remover & Passport Maker**: Auto-detects background colors and makes them transparent (chroma key) on local canvas. Supports custom backdrops, manual touch-up brushes, face guides, and custom passport crops.
2.  **Compress Image**: Executes binary-search compression algorithms on canvas exports to shrink image file sizes down to target kilobyte boundaries with minimal quality loss.
3.  **Edit & Resize Image**: Scale, crop, rotate, flip, and adjust visual filters.
4.  **Convert Format**: Transform files instantly between JPEG, PNG, and WebP formats.
5.  **Image to PDF**: Compile multiple image frames directly into standard PDF document streams.

---

## 💻 Tech Stack

*   **Framework**: Astro (Static Route Generator)
*   **Styling**: Tailwind CSS (Stark design tokens, responsive layout grid)
*   **Libraries**:
    *   `pdf-lib` (Client-side PDF compilation/manipulation)
    *   `lucide-astro` (SVG Icon sets)
*   **Database**: IndexedDB (Local file history management)
*   **APIs**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis` engines)

---

## ⚙️ How to Run Locally

### Prerequisites
*   Node.js (>=22.12.0)
*   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/imageMitra.git
cd imageMitra

# Install dependencies
npm install

# Run the dev server
npm run dev
```

### Building for Production

To compile static entrypoints and generate production assets:

```bash
npm run build
```
