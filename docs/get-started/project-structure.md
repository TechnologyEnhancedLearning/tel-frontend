---
layout: layouts/get-started.njk
title: Project structure
tags: setup
order: 2
---

This guide provides a high-level overview of how the TEL frontend repository is organised. Understanding this structure will help you know exactly where to add new components, write documentation and configure the build process.

## High-level overview

Below is the general layout of the repository.

```text
tel-frontend/
├── .github/          # GitHub Actions deployment workflows
├── dist/             # Generated output files (do not edit directly)
├── docs/             # Eleventy documentation site source files
├── src/              # Core library source code (components, styles)
├── .eleventy.js      # Configuration for the 11ty static site generator
├── gulpfile.js       # Build tasks for compiling CSS and packaging
└── package.json      # Project dependencies and npm scripts
```

## Directory breakdown

### `src/`

This is the heart of the TEL design system. It contains the actual source code for the frontend library itself. When you are building a new UI component, this is where your core code belongs. Note: Eleventy pulls these files directly into the documentation site during the build process, so you can preview your components as you build them.

- **`src/components/`**: Where the Nunjucks macros (`.njk`) and Sass files (`.scss`) for individual components live.
- **`src/styles/`**: Global stylesheets, variables, and mixins that form the foundation of the design system.

### `docs/`

This folder contains everything related to our GitHub Pages documentation site, powered by Eleventy (11ty). If you are adding a new page or documenting a component, you will work in here.

- **`docs/components/`**: Where we write the Markdown (`.md`) and Nunjucks (`.njk`) files to document individual components.
- **`docs/assets/`**: Static assets specifically for the documentation site, such as images (like the Open Graph preview card), custom stylesheets, and scripts.
- **`docs/index.njk`**: The homepage of our documentation site.

### `dist/`

The distribution folder. **You should never edit files in this directory manually.** When you run the build command (`npm run docs:build`), our scripts compile the Sass files and run Eleventy to generate the finished, browser-ready HTML and CSS. The output is placed entirely in this folder. Our GitHub Actions workflow is configured to take the contents of `dist/docs/` and publish them to the live website.

### `.github/`

Contains GitHub-specific configurations. Most importantly, `.github/workflows/deploy.yml` lives here. This file contains the instructions that tell GitHub Actions how to automatically build and publish our documentation site whenever code is merged into the `main` branch.

## Key configuration files

- **`.eleventy.js`**: The configuration file for Eleventy (11ty). acts as the bridge between our core library and the documentation site. It tells 11ty how to pull the Nunjucks macros and styles from the `src/` folder and render them onto the pages you see in the `dist/` website. It also defines custom filters, collections and specifies which folders should be passed straight through.
- **`package.json`**: Manages our project dependencies (like `nhsuk-frontend` and Eleventy) and defines the `npm run` scripts we use for local development (for example, `npm run start`).
- **`gulpfile.js`**: Contains the automated tasks that compile our Sass into CSS, bundle our code and prepare the files for the documentation build.
