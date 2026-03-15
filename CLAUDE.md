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

Since there is no build step, development is done by editing files directly and opening them in a browser. The site is deployed as a static site under the `/ECO304/` subdirectory path, which is hardcoded in `Scripts/navbar.js` as the base prefix for all navigation links.

To run locally, serve the repo root with any static file server (e.g., `npx serve .` or `python3 -m http.server`). There are no tests, no linting config, and no CI pipeline.

## Architecture

**Multi-page application** — each feature is a standalone `index.html` + `.js` pair in its own directory. Pages share two global scripts:

- `Scripts/navbar.js` — dynamically injects the navigation bar into every page; determines the active link via `window.location.pathname`
- `Scripts/StatisticalHelpers.js` — math utilities (normal CDF, t-distribution, chi-square distribution, random integers) used by Questions and Visualizations

**Data layer** — two JSON files in `Data/` are fetched asynchronously at page load:
- `Glossary_Data.json` — `{ "Sheet1": [{ "Term", "Interpretation", "Chapter" }] }`
- `Historical_Grades.json` — records with `Semester`, `Major`, `Grade` fields

## Feature Modules

| Directory | Description |
|---|---|
| `Grades/` | Grade calculator — weights: Assignments 5%, Labs 2%, Lab Project 9%, Low Midterm 10%, High Midterm 15%, Final 35%; drops lowest assignment |
| `Questions/` | Randomized practice problem generator (Q1–Q8 covering PDF, uniform, normal, sampling, CI, hypothesis tests) |
| `Visualizations/` | D3.js interactive visualizations: CLT, Law of Large Numbers, t-distribution DOF, Linear Regression |
| `Animations/` | Video selector for 6 concept videos stored in `Assets/` |
| `HistoricalGrades/` | Chart.js histogram of grade distributions; supports URL parameters for shareable filtered views |
| `Glossary/` | Fetches and renders term definitions from JSON, organized by chapter (4, 5, 6, 7, 9, 11) |
| `Resources/` | Static list of external learning links |
