<!-- prettier-ignore-file -->
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `heading` | string | No | Text to display before the filter buttons, such as "Filter by level:". |
| `showAll` | boolean | No | Set to `false` to hide the default "All" button. Defaults to `true`. |
| `allLabel` | string | No | Custom text for the default "All" button. Defaults to `"All"`. |
| `allHref` | string | No | The URL the "All" button links to if JavaScript is disabled. Defaults to `"#"`. |
| `activeTags` | array | No | An array of values representing the buttons that should be styled as active on page load (e.g., `['beginner']`). If omitted or empty, the "All" button is styled as active by default. |
| `tags` | array | Yes | An array of tag objects to render as the filter buttons. |
| `tags[].label` | string | Yes | The text displayed on the individual filter button. |
| `tags[].value` | string | Yes | The internal value used for filtering (outputs to the `data-filter-value` attribute). |
| `tags[].href` | string | No | The URL the individual filter button links to if JavaScript is disabled. Defaults to `"#"`. |
