# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ECO304 is a static educational web application for "Introduction to Empirical Economics" at the University of Saskatchewan. It uses **vanilla JavaScript, HTML5, and CSS3** with no build process, no framework, and no package manager.

External dependencies are loaded via CDN only:
- **D3.js v4** — data visualizations
- **Chart.js** — histogram charts in HistoricalGrades
- **jQuery 3.6.4** — DOM interactions in HistoricalGrades
- **Google Analytics** (gtag.js, tracking ID: `G-C0CWMV96MD`) — on every page

## Development

Since there is no build step, development is done by editing files directly and opening them in a browser. The site is deployed as a static site under the `/ECO304/` subdirectory path.

To run locally, serve the repo root with any static file server (e.g., `npx serve .` or `python3 -m http.server`). There are no tests, no linting config, and no CI pipeline.

**Local vs. deployed path handling:** `Scripts/navbar.js` detects `localhost`/`127.0.0.1` and sets the base prefix to `''` locally or `/ECO304` in production. The landing page `index.html` has an inline script that does the same rewrite for feature card `href` attributes.

## Design System

All styles are in `styles.css`. The design language uses:
- **Colors:** dark green `#1a4a28` (primary/headers), `#27ae60` (accent/interactive), `#f0faf4` (light tint backgrounds)
- **Typography:** Inter font family
- **Cards:** white background, `1px solid #e4ede4` border, `border-radius: 12px`, subtle `box-shadow` — used across all inner pages
- **Dark header pattern:** inner-page cards have a dark green `.xxx-card-header` (e.g., `.grade-card-header`, `.hist-card-header`, `.gloss-chapter-header`) with white text
- **Navbar:** sticky flexbox bar with `.nav-wordmark` (ECO304 wordmark), `.nav-links`, and `.nav-hamburger` hamburger toggle for mobile (`@media (max-width: 768px)`)

## Architecture

**Multi-page application** — each feature is a standalone `index.html` + `.js` pair in its own directory. Pages share two global scripts:

- `Scripts/navbar.js` — dynamically injects the navigation bar into every page; determines the active link via `window.location.pathname`; handles local/production path prefix
- `Scripts/StatisticalHelpers.js` — math utilities (normal CDF, t-distribution, chi-square distribution, random integers) used by Questions and Visualizations

**Data layer** — two JSON files in `Data/` are fetched asynchronously at page load:
- `Glossary_Data.json` — `{ "Sheet1": [{ "Term", "Interpretation", "Chapter" }] }`
- `Historical_Grades.json` — records with `Semester`, `Major`, `Grade` fields

## Feature Modules

| Directory | Description |
|---|---|
| `Grades/` | Grade calculator — weights: Assignments 5%, Labs 2%, Lab Project 9%, Low Midterm 10%, High Midterm 15%, Final 35%; drops lowest assignment |
| `Questions/` | Randomized practice problem generator (Q1–Q8 covering PDF, uniform, normal, sampling, CI, hypothesis tests); each question rendered as a `.question-card` with header badge, prompt, table, action buttons, and `.answer-block` |
| `Visualizations/` | D3.js interactive visualizations: CLT, Law of Large Numbers, t-distribution DOF, Linear Regression; each in a numbered `.viz-card` |
| `Animations/` | 6 topic buttons (`.anim-card`) in `.anim-topic-grid`; clicking a card sets `videoElement.src` from `data-video` attribute and loads the video; videos stored in `Assets/` |
| `HistoricalGrades/` | Chart.js histogram of grade distributions; supports `?semester=` and `?major=` URL parameters for shareable filtered views; uses site green palette for chart colors |
| `Glossary/` | Fetches JSON and renders `.gloss-entry` divs (`.gloss-term` + `.gloss-def`) into chapter containers by `id`; chapters 4, 5, 6, 7, 9, 11 |
| `Resources/` | Static list of external learning links rendered as `.resource-card` elements |
