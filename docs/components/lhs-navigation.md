---
title: Left-hand side navigation
description: A vertical navigation component used to display hierarchical menu items in a sidebar.
layout: layouts/component.njk
tags:
  - component
---
## Summary

Left-hand navigation lets users move around a defined area of a site using a multi-level menu.

It can support up to 3 levels, inclusive of the parent page and up to 2 levels within the navigation itself. This allows users to see where they are, understand related pages within the section, and move between deeper levels of content without leaving the wider area they are in.

Left-hand navigation is intended to support sections where pages have a clear relationship to each other. For example, course-based information, account areas, learning areas, and other structured sections where related pages would benefit from being shown together.

## Examples

### Single level

{% example "lhs-navigation/single-level.njk" %}

Use this variation for simple, flat navigation structures where all items are at the same level. This is ideal for straightforward site navigation or section menus without nested categories.

### Icon indicators

Icons must match the content on the page and be explained clearly. For example, if a page shows a lock icon, it should also include text to explain why the page is locked, if needed.

#### Status indicators

{% example "lhs-navigation/single-level-status.njk" %}

Use this variation to display the completion status of navigation items. Status indicators help users understand progress through a multi-step process or workflow. The accepted status values are:

- `"complete"` - shows a checkmark icon indicating the item is complete
- `"unstarted"` - shows an empty circle icon indicating the item has not been started
- `"false"` - no status icon is displayed

#### Lock indicators

{% example "lhs-navigation/single-level-locks.njk" %}

Use this variation to display the lock status of navigation items. The accepted lock values are:

- `true` - shows a lock icon indicating the item is locked
- `false` - no lock icon is displayed (default)

#### Status and lock indicators

{% example "lhs-navigation/single-level-status-locks.njk" %}

Use this variation when you need to display both status and lock indicators together. 
Combine status and lock states to give users complete information about item availability and progress.



### Multi-level (tree structure)

{% example "lhs-navigation/tree.njk" %}

Use this variation for complex hierarchical navigation structures. The tree structure supports up to three levels of depth in a parent-child-grandchild relationship:

- **level 1 (parent):** top-level sections that can contain child items
- **level 2 (child):** subsections or navigation items nested within parents
- **level 3 (grandchild):** navigation items nested within child sections

The structure does not support further descendants beyond the grandchild level. Expandable sections can be displayed open by setting `expanded: true`, or they will be collapsed by default. Use the tree structure when organising complex navigation hierarchies such as course modules, document structures, or multi-level site maps.

### Multi-level tree with status and locks

{% example "lhs-navigation/tree-with-states.njk" %}

Use this variation to combine the hierarchical tree structure with status and lock indicators at any level. This is useful for complex workflows where you need to show progress and availability across multiple nested levels, such as step-by-step course modules or gated document sections.

## Configuration

### Expanded sections

Collapsible sections are closed by default. To display a section in its expanded state, add `expanded: true` to the parent item:

```JavaScript
{
  text: "Section title",
  href: "#",
  expanded: true,
  children: [...]
}
```

### Properties

- `text` (string) - the display text for the navigation item
- `href` (string) - the URL the item links to
- `locked` (boolean) - whether the item is locked; defaults to `false`
- `status` (string) - the status of the item (`"complete"`, `"unstarted"`, or `"false"`); defaults to `"false"`
- `expanded` (boolean) - whether expandable sections are initially open; defaults to `false`
- `children` (array) - array of child navigation items (up to 2 levels of nesting)


## When to use

Use left-hand navigation for self-contained areas of a site that need a distinct navigation structure.

It is useful when:
- there is a clear relationship between pages in a section
- users need to move between related pages without leaving the section
- users need to understand where they are within a hierarchy
- a section has multiple levels of related content
- course-based information or learning progress needs to be shown in context
- the navigation helps users understand the structure of the section they are in

Left-hand navigation should help users see related items alongside the content they are viewing.

## When not to use

Do not use left-hand navigation when there is no direct relationship between the levels or pages.

It should not be used:
- as a way to show unrelated links together
- as a way to move the user away from the section that is being grouped by the left-hand navigation
- as an anchor navigation pattern for headings on a single page
- during a transactional process
- when the page structure does not need multiple levels
- when a simpler navigation pattern would be easier to understand
- when the navigation would add unnecessary complexity to the page

Left-hand navigation should not be used to expose more links. It should be used where the structure helps users understand and move through a related area of content.

## How it works

Left-hand navigation sits on the left-hand side of the page on desktop.

The current page is highlighted so users can understand where they are in the section. Navigation can contain up to 3 levels within the component, with each level opening into its own nested container.

The component should support:
- a parent page or section
- nested navigation items
- highlighting the current page
- showing related pages within the same section
- deep linking to pages within the section

On smaller screens, the navigation collapses into a button. When selected, the button opens a fly-out menu from the left-hand side of the screen.

The navigation should be positioned near the top of the page and sit below any headings that introduce the section and above the content that the navigation controls. The mobile button is part of the left-hand navigation component, and when visible, it will appear in the same space the left-hand navigation occupies within the browser.

## Content guidance
Navigation labels should be short, clear and easy to scan.

Page titles should work within the available space on desktop. Ideally, labels should not wrap across multiple lines or break words.

Use labels that:
- match the page title where possible
- describe the destination clearly
- are short enough to scan quickly
- use plain English
- avoid internal terminology
- make sense out of context

For pages with long titles, consider whether a shorter navigation label is needed. This should only be used where the shorter label remains clear and accurately describes the page.

Avoid using multiple labels that are too similar, as this can make it harder for users to understand the difference between pages.

## Research evidence

Initial research has been carried out on a previous implementation of the left-hand navigation. The previous implementation included mobile-responsive behaviour but was limited to 1 level.

Users responded well to this navigation pattern. They understood how to interact with it and found navigation links.

Research methods included:
- click testing
- survey questions

### Confidence level: low to medium

We have some evidence that users understand and can use left-hand navigation, including its mobile state.

More research is needed before this component can be considered stable. Further testing should explore:
- how users understand deeper navigation levels
- whether users notice and understand the current page highlight
- how well the component works for course-based information
- how well it supports learning progress
- whether the mobile fly-out works across different page types
- whether users understand the relationship between the parent page and nested navigation items
