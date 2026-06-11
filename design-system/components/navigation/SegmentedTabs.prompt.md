Pill-style segmented filter. The active segment fills with its own color — `Lost` turns orange, `Found` turns teal, everything else uses brand blue. Optional per-segment count chips.

```jsx
<SegmentedTabs
  value={filter}
  onChange={setFilter}
  options={[
    { value: 'All', icon: '📦', count: 24 },
    { value: 'Lost', count: 9 },
    { value: 'Found', count: 15 },
  ]}
/>
```
