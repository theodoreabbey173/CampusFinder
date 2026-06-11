import React from 'react';

/** Three-up summary banner: Total / Lost / Found counts. */
export function StatBanner({ total = 0, lost = 0, found = 0, style = {} }) {
  const Item = ({ value, label, color }) => (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
    </div>
  );
  const Divider = () => <div style={{ width: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)', padding: '14px 8px', ...style,
    }}>
      <Item value={total} label="Total" color="var(--text-strong)" />
      <Divider />
      <Item value={lost} label="Lost" color="var(--status-lost-fg)" />
      <Divider />
      <Item value={found} label="Found" color="var(--status-found-fg)" />
    </div>
  );
}
