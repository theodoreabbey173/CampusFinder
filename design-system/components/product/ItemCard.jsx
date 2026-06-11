import React from 'react';
import { Badge } from '../core/Badge.jsx';

/**
 * The lost & found list row: thumbnail, title + status badge, description,
 * location and time meta. Left accent stripe matches the item type.
 */
export function ItemCard({ item, onPress, style = {} }) {
  const isLost = item.type === 'Lost';
  const accent = isLost ? 'var(--status-lost-solid)' : 'var(--status-found-solid)';

  return (
    <div
      onClick={onPress}
      style={{
        display: 'flex', gap: 14, alignItems: 'center', position: 'relative',
        background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)', borderLeft: `4px solid ${accent}`,
        padding: 14, boxShadow: 'var(--shadow-sm)', cursor: onPress ? 'pointer' : 'default',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
        ...style,
      }}
      onMouseEnter={(e) => { if (onPress) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      {item.isNew && (
        <span style={{
          position: 'absolute', top: -8, right: 12, background: 'var(--color-accent)',
          color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)',
        }}>NEW</span>
      )}

      <div style={{
        width: 76, height: 76, borderRadius: 'var(--radius-md)', flexShrink: 0,
        background: item.imageUrl ? `center/cover url(${item.imageUrl})` : 'var(--neutral-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--neutral-400)', fontSize: 26, border: '1px solid var(--border-subtle)',
      }}>{!item.imageUrl && '🔍'}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
            color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{item.name}</span>
          <Badge tone={isLost ? 'lost' : 'found'} size="sm" dot>{item.type}</Badge>
        </div>
        {item.description && (
          <div style={{
            fontSize: 13, color: 'var(--text-muted)', marginBottom: 5,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{item.description}</div>
        )}
        <div style={{ fontSize: 13, color: 'var(--text-body)', fontWeight: 600, marginBottom: 2 }}>📍 {item.location}</div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>
          🕒 {item.time}{item.reporterName ? `  ·  👤 ${item.reporterName}` : ''}
        </div>
      </div>
    </div>
  );
}
