---
layout: layouts/get-started.njk
title: Installation
tags: setup
order: 1
---

This library provides extended components built on top of the **NHS.UK Frontend (v10)** framework. Follow these steps to integrate these components into your project pipeline.

### 1. Install packages

This package requires **NHS.UK Frontend v10** as a peer dependency.

Install the packages using npm:

```bash
npm install nhsuk-frontend@10
npm install tel-frontend
```

### 2. Build tool configuration (Sass load paths)

Because this package references core NHS styles via bare import paths (for example, @import "nhsuk/index";), you must configure your build tool's Sass preprocessor to include the proper node_modules paths.

If you use Vite (vite.config.js)
```javascript
export default {
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          'node_modules',
          'node_modules/nhsuk-frontend/dist'
        ],
      },
    },
  },
};
```

If you use Webpack (webpack.config.js or next.config.js)

Configure your sass-loader options to include the paths:
```javascript
{
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: [
        'node_modules',
        'node_modules/nhsuk-frontend/dist'
      ]
    }
  }
}
```

### 3. Importing styles
In your application's main Sass stylesheet (for example, styles.scss or app.scss), import the NHS core layout followed by the extension components.
```
// 1. Import core NHS.UK Frontend styles
@use "nhsuk-frontend/dist/nhsuk" as *;

// 2. Import your extension styles
@use "tel-frontend" as *;
```

### 4. Initialising JavaScript
If you are using interactive components that require JavaScript functionality, initialise both packages in your primary JavaScript entry point (for example, main.js or index.js):

```
import { initAll } from 'nhsuk-frontend';
import { initAll as initTelExtensions } from 'tel-frontend';

// Boot them up
initAll();
initTelExtensions();


```

