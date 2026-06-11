Compact status pill. `lost` renders orange, `found` renders teal — the two core item states — plus generic `success`/`warning`/`danger`/`info`/`neutral` tones.

```jsx
<Badge tone="lost" dot>Lost</Badge>
<Badge tone="found" dot>Found</Badge>
<Badge tone="info" solid>NEW</Badge>
```

Use the soft (default) style on light cards; use `solid` for high-contrast overlays (e.g. on top of an item photo).
