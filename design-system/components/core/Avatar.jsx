import React from 'react';

const AVATAR_COLORS = [
  'var(--blue-600)', 'var(--teal-500)', 'var(--orange-400)',
  'var(--indigo-600)', 'var(--blue-500)', 'var(--teal-600)',
];

/** Circular initial avatar; color is derived deterministically from the name. */
export function Avatar({ name = '?', src = null, size = 44, style = {} }) {
  const initial = (name?.trim()?.[0] || '?').toUpperCase();
  const color = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: src ? 'var(--neutral-200)' : color,
      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: size * 0.42, overflow: 'hidden', ...style,
    }}>
      {src
        ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : initial}
    </div>
  );
}
