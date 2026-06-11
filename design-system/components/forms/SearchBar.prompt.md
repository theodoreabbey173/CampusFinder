Rounded search field with a leading magnifier; a clear (✕) chip appears once there's text.

```jsx
<SearchBar value={q} onChange={e => setQ(e.target.value)} onClear={() => setQ('')}
  placeholder="Search by name, location…" />
```
