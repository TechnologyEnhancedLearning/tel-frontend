---
title: Left-hand side navigation
description: A vertical navigation component used to display hierarchical menu items in a sidebar.
layout: layouts/component.njk
tags:
  - component
---

## When to use this component

Use the left-hand side navigation component when you need to show a vertical list of navigation links in a sidebar or side panel. It works well for navigation structures with sections and sub-sections. The component supports collapsible sections, status indicators and lock indicators to help users understand what is available and where they are in the navigation.  

## Variations

### Single level

{% example "lhs-navigation/single-level.njk" %}

Use this variation for simple navigation structures where all items are on the same level. It is suitable for straightforward navigation and section menus without nested categories. 

### Status indicators

{% example "lhs-navigation/single-level-status.njk" %}

Use this variation to display the completion status of navigation items. Status indicators help users understand progress through a multi-step process or workflow.  

The accepted status values are:

- `"complete"` - shows a checkmark icon indicating the item is complete 
- `"unstarted"` - shows an empty circle icon indicating the item has not been started 
- `"false"` - no status icon is displayed 

### Lock indicators

{% example "lhs-navigation/single-level-locks.njk" %}

Use this variation to show whether navigation items are locked. 

The accepted lock values are:

- `true` - shows a lock icon indicating the item is locked
- `false` - no lock icon is displayed (default)

### Status and lock indicators

{% example "lhs-navigation/single-level-status-locks.njk" %}

Use this variation when you need to show both status and lock indicators. Combine status and lock states to give users complete information about item availability and progress.

### Multi-level (tree structure)

{% example "lhs-navigation/tree.njk" %}

Use this variation for more complex navigation structures. The tree structure supports up to 3 levels of depth in a parent-child-grandchild relationship:

- **Level 1 (parent):** Navigation items or top-level sections that can contain child items 
- **Level 2 (child):** Subsections or navigation items nested within parents 
- **Level 3 (grandchild):** Navigation items nested within child sections 

The structure does not support further descendants beyond the grandchild's level. To show an expandable section as open, set `expanded: true`. Sections are collapsed by default. Use this variation for complex navigation structures such as course modules, document structures or multi-level site maps. 

### Multi-level tree with status and locks

{% example "lhs-navigation/tree-with-states.njk" %}

Use this variation to combine the hierarchical tree structure with status and lock indicators at any level. This is useful for complex workflows where you need to show progress and availability across multiple nested levels, such as step-by-step course modules or gated document sections.

### Single level with active status

{% example "lhs-navigation/single-level-active-link.njk" %}

Use this variation to highlight the current active link within a flat navigation menu. This helps users understand where they are within the navigation.  

### Multi-level tree with active status

{% example "lhs-navigation/tree-with-states-active-link.njk" %}

Use this variation to show the active link within a multi-level navigation structure. When an active link is set, parent sections open automatically so users can see their current location in the navigation.  

## Configuration

### Expanded sections

Collapsible sections are closed by default. To display a section in its expanded state, add expanded: true to the parent item: 

```javascript
{
  text: "Section title",
  href: "#",
  expanded: true,
  children: [...]
}
```

### Properties

- `text` (string) - The display text for the navigation item 
- `href` (string) - The URL the item links to 
- `locked` (boolean) - Whether the item is locked; defaults to `false`
- `status` (string) - The status of the item (`"complete"`, `"unstarted"`, or `"false"`); defaults to `"false"`
- `expanded` (boolean) - Whether expandable sections are initially open; defaults to `false`
- `children` (array) - Array of child navigation items (up to 2 levels of nesting)
- `activeHref` (string) - The URL path of the active item used to determine selection status and path expansion context across the menu tree