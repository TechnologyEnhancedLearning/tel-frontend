---
layout: layouts/get-started.njk
title: How to document components
tags: setup
order: 3
---

This guide explains how to update an existing component page to include UX guidance, research findings and accessibility notes.

## Where to find the files

All component documentation pages live in the `docs/components/` folder. They are written in standard Markdown (`.md`).

For example, to update the "Quick filters" component, you would open `docs/components/quick-filters.md`.

## Standard UX headings

To keep the TEL design system consistent, we use standard headings across all component pages. When you want to add UX guidance to a component, please use the following Markdown structure below the main component example:

```text
## When to use this component
Explain the specific user needs this component solves. What problem does it address?

## When not to use this component
Explain when a user or designer might mistakenly use this component and suggest the correct alternative (for example, "Do not use checkboxes if the user can only select 1 option. Use radios instead.").

## How it works
Provide any specific behavioural guidelines. Does it expand? Does it time out? How should the content inside it be written?

## Accessibility
List any specific screen reader considerations, focus states, or keyboard navigation rules that apply to this component.
