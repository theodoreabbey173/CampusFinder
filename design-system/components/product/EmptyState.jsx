import React from 'react';
import { Button } from '../core/Button.jsx';

/** Centered empty / zero-result state with an icon, message, and optional action. */
export function EmptyState({ icon = '📭', title, message, actionLabel, onAction, style = {} }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '40px 32px', gap: 6, ...style,
    }}>
      <div style={{
        width: 76, height: 76, borderRadius: '50%', background: 'var(--surface-brand-tint)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, marginBottom: 8,
      }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: 'var(--text-strong)' }}>{title}</div>
      {message && <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 320 }}>{message}</div>}
      {actionLabel && (
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
