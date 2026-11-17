---
title: Learning card
description: A card component designed to present learning activities, courses, and catalogue items across different states of the user journey.
layout: layouts/component.njk
tags:
  - component
---

## Overview

The learning card component provides a consistent visual wrapper for educational content across NHS TEL platforms. It supports various states throughout a learner's workflow—from initial content discovery and active course progression through to completion, certification, and catalogue browsing.

## Examples

### Default (Listing)

Used as a baseline text listing within reading-width containers, suitable for simple content feeds or search results where full card framing is not required.

{% example "learning-card/default.njk" %}

### Card container variant

Used when the learning card is rendered inside a structured NHS card container with a hero image, community star ratings, completion metadata, and catalogue footer links.

{% example "learning-card/card.njk" %}

### Course discovering

Used when a learner is exploring new content. It highlights key discovery metadata such as community star ratings, activity counts, content types, and certificate availability.

{% example "learning-card/course-discovering.njk" %}

### Course progressing

Used to track active learning. It displays current completion status, progress bar visualization, and the last accessed date to help learners pick up where they left off.

{% example "learning-card/course-progressing.njk" %}

### Certificate card

Used when a course or learning activity has been completed. It highlights the completion status and displays the award date and download link alongside relevant course metadata.

{% example "learning-card/certificate-card.njk" %}

### Multiple certificates card

Used when a course or learning activity has multiple associated certificates awarded across different completion stages, displaying individual award names, dates, and download links.

{% example "learning-card/multiple-certificates-card.njk" %}

### Catalogue card

Used for promotional or high-visibility listings. It incorporates a hero banner image, optional publisher/catalogue branding, and dedicated metadata footers.

{% example "learning-card/catalogue-card.njk" %}

### Learning cards in a grid (Layout example)

Demonstrates three individual learning cards placed side-by-side in a typical 3-column responsive NHS grid layout. Note that the learning card component itself renders a single card—there is no macro parameter to generate a multi-card grid automatically. To achieve this layout, call `telLearningCard` separately within standard `nhsuk-grid-column-*` wrappers (optionally adding `nhsuk-grid-row--equal-heights` to align card heights across the row).

{% example "learning-card/grid.njk" %}