import React from 'react';

/**
 * Segmented filter control (the All / Lost / Found switcher).
 * Each option may carry its own active color so Lost reads orange and
 * Found reads teal.
 */
export function SegmentedTabs({ options, value, onChange, style = {} }) {
  const colorFor = (opt) =>
    opt.color
    || (opt.value === 'Lost' ? 'var(--status-lost-solid)'
      : opt.value === 'Found' ? 'var(--status-found-solid)'
      : 'var(--color-primary)');

  return (
    <div style={{ display: 'flex', gap: 8, ...style }}>
      {options.map((opt) => {
        const active = value === opt.value;
        const c = colorFor(opt);
        return (
          <button
            key={opt.value}
            onClick={() => onChange?.(opt.value)}
            style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '9px 12px', borderRadius: 'var(--radius-pill)',
              border: `1.5px solid ${active ? c : 'var(--border-default)'}`,
              background: active ? c : 'var(--surface-card)',
              color: active ? '#fff' : 'var(--text-body)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13.5,
              cursor: 'pointer', transition: 'all var(--dur-base) var(--ease-standard)',
            }}
          >
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label ?? opt.value}
            {opt.count != null && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 'var(--radius-pill)',
                background: active ? 'rgba(255,255,255,0.25)' : 'var(--neutral-100)',
                color: active ? '#fff' : 'var(--text-muted)',
              }}>{opt.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
