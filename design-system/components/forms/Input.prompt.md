Labeled input with brand focus ring (blue), optional leading icon, helper text, and red error state. Pass `multiline` for a textarea.

```jsx
<Input label="Full Name" placeholder="e.g. Sarah Johnson" required />
<Input label="Email Address" type="email" leadingIcon={<span>✉️</span>} />
<Input label="Description" multiline placeholder="Color, brand, distinguishing features…" />
<Input label="Password" type="password" error="At least 8 characters" />
```
