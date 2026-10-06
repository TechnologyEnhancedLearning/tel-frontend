---
title: Summary expander
description: A component used to present summarised and tagged user details in an expander box
layout: layouts/component.njk
tags:
  - component
---

## Summary

Summary expander combines existing components from the 
[Digital service manual design system](https://service-manual.nhs.uk/design-system) including
[tags](https://service-manual.nhs.uk/design-system/components/tag),
[summary list](https://service-manual.nhs.uk/design-system/components/summary-list),
[buttons](https://service-manual.nhs.uk/design-system/components/buttons) and 
[expander](https://service-manual.nhs.uk/design-system/components/expander). 

The expander is modified to allow placement of tags which are visible in both open and collapsed states but which are not part of the expander's toggle control.

The intention is to use when displaying a search result of multiple account details including admin status and other tags giving the user more than just a name to select by. Buttons can be set to perform any action required for the user displayed.

The key difference is a separate container for summary tags. These remain visible at all times and do not gain a focus state.

Expander padding has been reduced and we recommend use of small buttons by including small: true when calling them.

{% example "summary-expander/summary-tags-buttons.njk" %}



### Macro options

#### Summary expander properties

- `expander_title` (string, required) - The text displayed on the expander toggle header
- `is_admin` (boolean) - When set to `true`, displays a distinct "Admin" tag floated to the right of the expander header, independent of the `tags` array
- `tags` (array) - An array of tag objects displayed inside the header tag container. Each object accepts standard [NHS.UK Tag macro options](https://service-manual.nhs.uk/design-system/components/tag) (e.g., `text`, `colour`, `classes`)
- `buttons` (array) - An array of button objects rendered within the expander action area. Each object accepts standard [NHS.UK Button macro options](https://service-manual.nhs.uk/design-system/components/buttons) (e.g., `text`, `href`, `variant`). We recommend setting `small: true` for actions inside this component
- `summary_list` (object) - Configuration object passed directly to render the internal definition list. Accepts all standard [NHS.UK Summary list macro options](https://service-manual.nhs.uk/design-system/components/summary-list) (e.g., `rows`, `key`, `value`, `actions`)
- `open` (boolean) - Set to `true` if the expander should be expanded by default; defaults to `false`



<!-- 

## Research evidence

### What has been seen so far

to-do

### Confidence level
to-do 

-->