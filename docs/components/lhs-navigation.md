---
title: Left Hand Side Navigation
description: A vertical navigation component used to display hierarchical menu items in a sidebar.
layout: layouts/component.njk
tags:
  - component
---

## When to use this component

Use the Left Hand Side Navigation component when you need to display a vertical list of navigation links, typically in a sidebar or left panel. It works well for hierarchical navigation structures and section menus. The component supports collapsible sections, status indicators, and lock states to provide users with clear information about navigation items and their availability.

## Variations

### Single level

{% example "lhs-navigation/single-level.njk" %}

Use this variation for simple, flat navigation structures where all items are at the same level. This is ideal for straightforward site navigation or section menus without nested categories.

### Status indicators

{% example "lhs-navigation/single-level-status.njk" %}

Use this variation to display the completion status of navigation items. Status indicators help users understand progress through a multi-step process or workflow. The accepted status values are:

- `"complete"` - Shows a checkmark icon indicating the item is complete
- `"unstarted"` - Shows an empty circle icon indicating the item has not been started
- `"false"` - No status icon is displayed

### Lock indicators

{% example "lhs-navigation/single-level-locks.njk" %}

Use this variation to display the lock status of navigation items. The accepted lock values are:

- `true` - Shows a lock icon indicating the item is locked
- `false` - No lock icon is displayed (default)

### Status and lock indicators

{% example "lhs-navigation/single-level-status-locks.njk" %}

Use this variation when you need to display both status and lock indicators together. 
Combine status and lock states to give users complete information about item availability and progress.

### Multi level (Tree structure)

{% example "lhs-navigation/tree.njk" %}

Use this variation for complex hierarchical navigation structures. The tree structure supports up to three levels of depth in a parent-child-grandchild relationship:

- **Level 1 (Parent):** Top-level sections that can contain child items
- **Level 2 (Child):** Subsections or navigation items nested within parents
- **Level 3 (Grandchild):** Navigation items nested within child sections

The structure does not support further descendants beyond the grandchild level. Expandable sections can be displayed open by setting `expanded: true`, or they will be collapsed by default. Use the tree structure when organizing complex navigation hierarchies such as course modules, document structures, or multi-level site maps.

### Multi level tree with status and locks

{% example "lhs-navigation/tree-with-states.njk" %}

Use this variation to combine the hierarchical tree structure with status and lock indicators at any level. This is useful for complex workflows where you need to show progress and availability across multiple nested levels, such as step-by-step course modules or gated document sections.

## Configuration

### Expanded sections

Collapsible sections are closed by default. To display a section in its expanded state, add `expanded: true` to the parent item:

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
- `children` (array) - Array of child navigation items (up to two levels of nesting)