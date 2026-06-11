import React from 'react';

/** Generic surface container with the house elevation + radius scale. */
export function Card({ children, elevation = 'md', padded = true, accent = null, style = {}, ...rest }) {
  const shadows = {
    none: 'none', xs: 'var(--shadow-xs)', sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)', lg: 'var(--shadow-lg)',
  };
  const accentColors = {
    lost: 'var(--status-lost-solid)', found: 'var(--status-found-solid)',
    primary: 'var(--color-primary)', teal: 'var(--color-secondary)',
  };
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: shadows[elevation] ?? shadows.md,
        border: '1px solid var(--border-subtle)',
        padding: padded ? 'var(--pad-card)' : 0,
        borderLeft: accent ? `4px solid ${accentColors[accent] || accent}` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
