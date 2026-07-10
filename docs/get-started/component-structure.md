---
layout: layouts/get-started.njk
title: Component structure
tags: setup
order: 3
---

When building a new component for the TEL design system (or editing an existing one), you will be working inside the `src/components/` directory.

Following the NHS and GOV.UK frontend patterns, each component is entirely self-contained within its own folder. This makes the codebase modular and easy to maintain.

## The basic building blocks

Let's look at a fully featured component, such as **Quick filters**, to understand which files are required. A standard component folder (`src/components/quick-filters/`) will typically contain the following 4 files:

### 1. `template.njk`
This is the core HTML structure of your component. It contains the raw markup and uses Nunjucks variables (like `{% raw %}{{ params.classes }}{% endraw %}` or `{% raw %}{{ params.text }}{% endraw %}`) to allow developers to inject custom data, styling and ARIA attributes when they consume the component.

### 2. `macro.njk`
This file acts as the reusable 'function' that developers actually call in their code. It wraps the `template.njk` file in a Nunjucks `{% raw %}{% macro %}{% endraw %}` block and passes the user's parameters into it.

Note: We separate the macro from the template to keep the interface clean and make it easier for developers to override the HTML structure if they strictly need to.

### 3. `_index.scss`
The Sass file containing all the styling for your component. By naming it '_index.scss, it can be seamlessly imported into our main global stylesheet. All CSS classes inside this file should be prefixed with `tel-` (for example,`.tel-quick-filters`) to prevent conflicts with base NHS styles.

### 4. `quick-filters.js` (Optional)
The client-side JavaScript file. If your component has interactive elements, such as a button that expands a section or a filter that clears data, the event listeners and logic belong here. If your component is purely visual (like a static warning callout), you do not need to create a JavaScript file.
