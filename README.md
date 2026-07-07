# NHS TEL frontend

NHS TEL frontend is a design system extension built on top of [nhsuk-frontend](https://github.com/nhsuk/nhsuk-frontend). It provides specialised components, patterns, and styles tailored for NHS TEL applications.

See live examples of NHS TEL Frontend components, and guidance on when to use them in your service, in the [NHS TEL Frontend components documentation](https://technologyenhancedlearning.github.io/tel-frontend/components/).

## Contact the team

NHS TEL frontend is maintained by staff at NHS England. If you have a question, you can use [GitHub issues](https://github.com/TechnologyEnhancedLearning/tel-frontend/issues).

## Building on the NHS digital service manual

NHS TEL builds directly upon the foundational rules of the [NHS design system](https://service-manual.nhs.uk/design-system). However, because TEL applications require specific user journeys, this repository serves to document and deliver our specialised design components and patterns alongside clear usage guidance.

## Technical installation and setup guide

This library provides extended components built on top of the **NHS.UK Frontend (v10)** framework. Follow these steps to integrate these components into your project pipeline.

### 1. Installation

This package requires **NHS.UK Frontend v10** as a peer dependency.

Install both using npm:

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
        loadPaths: ['node_modules', 'node_modules/nhsuk-frontend/dist'],
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
      includePaths: ['node_modules', 'node_modules/nhsuk-frontend/dist']
    }
  }
}
```

### 3. Importing styles
In your application's main Sass stylesheet (for example, styles.scss or app.scss), import the NHS core layout followed by the extension components.
```
// 1. Import core NHS.UK Frontend styles
@import "nhsuk-frontend/dist/nhsuk";

// 2. Import your extension styles
@import "tel-frontend/dist/tel-frontend/all";
```

### 4. Initialising JavaScript
If you are using interactive components that require JavaScript functionality, initialise both packages in your primary JavaScript entry point (for example, main.js or index.js):
In your application's main Sass stylesheet (for example, styles.scss or app.scss), import the NHS core layout followed by the extension components.
```
import { initAll } from 'nhsuk-frontend';
import { initAll as initTelExtensions } from 'tel-frontend/dist/tel-frontend/all.js';

// Boot them up
initAll();
initTelExtensions();


```
