The branded action button — Deep Blue by default, with teal `secondary`, orange `accent`, plus `outline`, `ghost`, and `danger` variants.

```jsx
<Button variant="primary" size="lg" fullWidth>Get Started</Button>
<Button variant="secondary" leadingIcon={<span>💬</span>}>Start Chat</Button>
<Button variant="outline">Cancel</Button>
<Button variant="accent" loading>Submitting</Button>
```

Sizes: `sm` (36px) · `md` (44px) · `lg` (52px). Use `primary` for the main action on a screen, `secondary` (teal) for safe/positive actions like starting a chat, `accent` (orange) for "found" emphasis, `danger` for destructive actions. Hover brightens; press scales down slightly.
