import React from 'react';

/**
 * Status / category badge. Defaults map Lost→orange and Found→teal,
 * matching CampusFinder's item taxonomy. Other tones for generic use.
 */
export function Badge({ children, tone = 'neutral', dot = false, solid = false, size = 'md', style = {} }) {
  const tones = {
    lost:    { fg: 'var(--status-lost-fg)',  bg: 'var(--status-lost-bg)',  solid: 'var(--status-lost-solid)' },
    found:   { fg: 'var(--status-found-fg)', bg: 'var(--status-found-bg)', solid: 'var(--status-found-solid)' },
    success: { fg: 'var(--color-success)',   bg: 'var(--color-success-bg)',solid: 'var(--color-success)' },
    warning: { fg: 'var(--amber-600)',       bg: 'var(--color-warning-bg)',solid: 'var(--color-warning)' },
    danger:  { fg: 'var(--color-danger)',    bg: 'var(--color-danger-bg)', solid: 'var(--color-danger)' },
    info:    { fg: 'var(--blue-700)',        bg: 'var(--color-info-bg)',   solid: 'var(--blue-600)' },
    neutral: { fg: 'var(--neutral-600)',     bg: 'var(--neutral-100)',     solid: 'var(--neutral-400)' },
  };
  const t = tones[tone] || tones.neutral;
  const dims = size === 'sm'
    ? { padding: '2px 9px', fontSize: 11 }
    : { padding: '4px 12px', fontSize: 12 };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.02em',
      borderRadius: 'var(--radius-pill)',
      color: solid ? '#fff' : t.fg,
      background: solid ? t.solid : t.bg,
      ...dims, ...style,
    }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: solid ? '#fff' : t.solid }} />}
      {children}
    </span>
  );
}
