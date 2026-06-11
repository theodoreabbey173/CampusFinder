import React from 'react';

/** Single chat message bubble. `mine` aligns right in brand blue. */
export function ChatBubble({ text, time, mine = false, style = {} }) {
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', ...style }}>
      <div style={{
        maxWidth: '76%', padding: '10px 14px',
        borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: mine ? 'var(--color-primary)' : 'var(--neutral-100)',
        color: mine ? '#fff' : 'var(--text-strong)',
        boxShadow: 'var(--shadow-xs)',
      }}>
        <div style={{ fontSize: 14.5, lineHeight: 1.4, fontWeight: 500 }}>{text}</div>
        <div style={{
          fontSize: 10.5, marginTop: 4, textAlign: 'right',
          color: mine ? 'rgba(255,255,255,0.7)' : 'var(--text-subtle)',
        }}>{time}</div>
      </div>
    </div>
  );
}
