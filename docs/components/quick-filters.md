---
title: Quick filters
description: A horizontal list of buttons used to filter content or results.
layout: layouts/component.njk
tags:
  - component

---

## Summary
Quick filters help users quickly identify and move between clear groups of content.

They are intended to either replace or work alongside existing filters where there is a meaningful split in content type. They raise important filtering options to a more visible layer of the page, making it easier for users to understand the main groups or themes available to them.

Quick filters should help users access content more quickly, especially when the main content groups are already clearly defined.

## Example
{% example "quick-filters/default.njk" %}

## Where this is currently used
This component is currently being explored or used in:
- pages where users are looking for learning
- pages where users are viewing their learning history
- pages where users may need to apply more than 1 filter
- current Learning Hub platform designs and prototypes

## When to use this component
Use the quick filters component when you have a list of items that can be categorised into clear and mutually exclusive groups.

Use quick filters when there is a clear and meaningful split in content.

They are useful when:
- content can be grouped into a small number of clearly defined types
- the main groups or themes are important enough to make visible on the page
- users are likely to benefit from filtering content quickly without opening a larger filter panel
- the filter options help users understand what kind of content is available
- the same page contains different types of content that users may want to move between quickly

For example, quick filters may be useful where users need to filter learning content by broad content type, activity type or completion state.

## When not to use
Do not use quick filters when there is no clear split in content type.

They should not be used when:
- the content does not have a small number of meaningful groups
- the filter options would work more like tags than clear content groups
- filtering may hide content that could still be meaningful to the user
- search or autosuggest would be a better way for users to find what they need
- the page only needs a standard search input or search autosuggest pattern

Quick filters should not be added to make a page feel more interactive. If the content split is not meaningful, the filter may make it harder for users to find relevant results.

## How it works
Quick filters work as an inclusive filtering component.

At the All level, no filter is applied. This means users can see all available content in the list or results area.

When a user selects a filter item, the page shows items that match that filter.

When a user selects a second filter item, the page includes results from both selected filters. This means the filters broaden the results across the selected groups rather than narrowing the results to only items that match every selected filter.

For example, if a user selects Courses and eLearning, they should see items that are courses, items that are eLearning, or items that match both.

## Content guidance
Quick filter labels should be short, clear and easy to scan.

Use labels that describe meaningful content groups. Avoid labels that are too broad, too technical or too similar to each other.

Labels should:
- use plain English
- match the language users expect to see on the page
- describe content types or groups, not internal categories
- be short enough to scan quickly
- avoid duplication with nearby headings or search labels

Do not use quick filters for long lists of tags or highly specific metadata.

## Research evidence
### What has been seen so far
Quick filters were tested using click tests across several pages. This helped us understand whether users recognised the filters and could use them in the current platform design.

Testing has included:
- users looking for learning
- users looking through their learning history
- users applying multiple filters to a page
- follow-up survey questions after users interacted with the filters

We have observed users interacting with this component in usability tests and click tests.

### Confidence level: medium

We have some evidence that users understand and can use quick filters in the contexts tested so far.

However, we need more research before this component can be considered stable. In particular, we need to explore additional use cases across transaction processes and single-page patterns.

Further testing should look at:
- whether users understand that quick filters are inclusive
- whether users expect multiple selected filters to broaden or narrow results
- whether quick filters work well alongside search and other filters
- whether quick filters are still helpful in more complex journeys
- whether quick filters risk hiding useful content in some contexts
