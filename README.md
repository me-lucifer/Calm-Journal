# Calm Journal — Interactive Ebook Prototype

A clean, pastel, mobile-first prototype for an interactive journal/planner. It mirrors the printed book’s reflective texts, guided exercises, planner pages, mood tracker, and vision board—adding light animations and a gentle, feel-good UI. This repository documents the prototype and provides a path to a production build.

> Status: Clickable prototype (no real backend). Local fake state and autosave are simulated for demo purposes.

---

## Table of Contents
- [What This Is](#what-this-is)
- [Core Features](#core-features)
- [Screens & Flows](#screens--flows)
- [Design Language](#design-language)
- [Technical Notes](#technical-notes)
- [Local Setup (if code is included)](#local-setup-if-code-is-included)
- [Planned Roadmap](#planned-roadmap)
- [Data & Privacy](#data--privacy)
- [Accessibility](#accessibility)
- [Project Structure (suggested)](#project-structure-suggested)
- [Contributing](#contributing)
- [License](#license)

---

## What This Is
- A mobile-emulated web app prototype that demonstrates the user experience of the interactive book.
- Built for quick stakeholder review: smooth navigation, editable areas, a mood selector with a short animation, handwriting/drawing zones, and a drag-and-drop vision board.
- Offline-first feel: autosave indicators and local state simulation, even after closing the page (demo only).

**Not in scope yet**
- Real authentication or cloud sync
- Real storage (files, images) beyond demo placeholders
- Production analytics/monitoring

---

## Core Features
- **Reader & Pages**: Page thumbnails open a “paper-like” reader with overlay editable zones for typing and checklists.
- **Guided Exercises**: Short templates (Reflection, Habits, Gratitude) with checkboxes, text inputs, and optional draw pads. Local progress indicator.
- **Planner**: Day agenda with quick notes. Mood Tracker tab shows calendar dots derived from the day’s mood selections.
- **Mood Picker with Micro-animation**: Six gray emoji placeholders (laugh, calm, focused, sad, angry, tired). On tap, the chosen emoji colorizes and briefly scales for two seconds, then settles. “Mood logged” confirmation.
- **Vision Board**: Drag-and-drop image tiles; add by mock file picker or pasted URL; positions persisted to local demo state; “Export” simulates a snapshot.
- **Handwriting/Sketch**: Draw canvas areas for freehand notes or signatures.
- **Autosave Feel**: Subtle “Saved” badge appears after edits pause; per-screen fake state retained for the session.
- **Settings (Light)**: Appearance preview, mock account fields, “Sync to cloud” shows a placeholder modal (not active).
- **Owner Review Mode**: Optional ribbon exposing screen name, key interactions, and a private “record note” text area for demos.

---

## Screens & Flows
- **Splash → Onboarding (3 cards) → Home Dashboard**
- **Home** cards: Quick Journal, Mood Today, Recent Pages, Continue Vision Board
- **Bottom Tabs**: Home, Pages, Exercises, Planner, Vision Board
- **Planner**: Agenda | Mood Tracker
- **Help**: Explains prototype limits and includes “Restart demo”

Empty states are intentional and include clear calls to action.

---

## Design Language
- **Palette**: Rose `#C07A84` (primary), Blush `#F6EBEF`, Cream `#FFF7F8`, Graphite `#2C2C2C`
- **Typography**: Playfair Display (H1/H2), Inter (body)
- **Style**: Soft shadows, rounded corners, generous spacing, 200ms transitions
- **Tap Targets**: Minimum 44×44
- **Iconography**: Always paired with labels

---

## Technical Notes
This repository can serve either as documentation for a no-code/low-code prototype (e.g., firebase.studio) or as the basis for a code implementation.

**Prototype**
- Built as a mobile-emulated web interface with local fake state; no external services required.
- Animations are CSS or lightweight keyframes (2 seconds, ease out).

**Recommended Production Stack (when implementing)**
- **App**: React + TypeScript (Vite)
- **UI**: Tailwind CSS + Headless UI
- **State**: Zustand or Redux Toolkit
- **Drawing**: Konva or Fabric.js for canvas/freehand
- **Animations**: Framer Motion or CSS keyframes; optional Lottie for small icon effects
- **Storage (offline)**: IndexedDB via localForage
- **Auth/Sync**: Firebase Authentication + Firestore or Supabase (email/magic-link)
- **Uploads**: Firebase Storage or Supabase Storage (with resize rules)
- **Build**: PWA (service worker, manifest) for installable, offline-capable experience
- **Deploy**: Vercel/Netlify/Cloudflare Pages

---

## Local Setup (if code is included)
If this repo contains the React implementation, use the following:

```bash
# 1) Clone
git clone https://github.com/<org>/<repo>.git
cd <repo>

# 2) Install
npm ci
# or
npm install

# 3) Run
npm run dev

# 4) Build
npm run build
npm run preview
