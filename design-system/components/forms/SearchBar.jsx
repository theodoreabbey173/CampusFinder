import React, { useState } from 'react';

/** Rounded search field with leading magnifier and a clear (✕) affordance. */
export function SearchBar({ value, onChange, onClear, placeholder = 'Search…', style = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'var(--surface-card)',
      border: `1.5px solid ${focused ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)', padding: '0 14px', minHeight: 46,
      boxShadow: focused ? '0 0 0 3px var(--ring-focus)' : 'var(--shadow-xs)',
      transition: 'border-color var(--dur-base), box-shadow var(--dur-base)', ...style,
    }}>
      <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>🔍</span>
      <input
        value={value} placeholder={placeholder} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
          color: 'var(--text-strong)', padding: '12px 0',
        }}
      />
      {value ? (
        <button
          onClick={onClear}
          style={{
            border: 'none', background: 'var(--neutral-200)', color: 'var(--neutral-600)',
            width: 22, height: 22, borderRadius: '50%', cursor: 'pointer',
            fontSize: 12, fontWeight: 700, lineHeight: 1, flexShrink: 0,
          }}
        >✕</button>
      ) : null}
    </div>
  );
}
