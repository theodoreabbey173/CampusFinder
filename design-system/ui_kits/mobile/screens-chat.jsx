/* global React, AppBar */
// Chat, Inbox, and Confirmation screens for the CampusFinder UI kit.

const CFc = window.CampusFinderDesignSystem_84dfef;

// ── Chat ────────────────────────────────────────────────────────────────────
function ChatScreen({ item, onBack, onEnd }) {
  const { ChatBubble, Avatar } = CFc;
  const [msgs, setMsgs] = React.useState([
    { mine: true, text: `Hi! I'm interested in the ${item.name}. Is it still available?`, time: '10:30 AM' },
    { mine: false, text: "Yes, it is! Can you describe a detail to verify it's yours?", time: '10:32 AM' },
  ]);
  const [draft, setDraft] = React.useState('');
  const send = () => { if (!draft.trim()) return; setMsgs([...msgs, { mine: true, text: draft, time: 'now' }]); setDraft(''); };

  return (
    <>
      <AppBar title={item.reporterName || 'Chat'} onBack={onBack} right={<Avatar name={item.reporterName || 'U'} size={34} />} />
      <div style={{ background: 'var(--ink)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, flexShrink: 0 }}>
        <span style={{ fontSize: 12 }}>🔒</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-300)' }}>Secure conversation about “{item.name}”</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--surface-page)' }}>
        {msgs.map((m, i) => <ChatBubble key={i} {...m} />)}
      </div>
      <div style={{ flexShrink: 0, borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px' }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your message…"
            onKeyDown={(e) => e.key === 'Enter' && send()}
            style={{ flex: 1, border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)', padding: '11px 16px', fontFamily: 'var(--font-sans)', fontSize: 14.5, outline: 'none', background: 'var(--surface-page)' }} />
          <button onClick={send} style={{ border: 'none', background: 'var(--color-primary)', color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', fontSize: 17, flexShrink: 0, boxShadow: 'var(--shadow-primary)' }}>➤</button>
        </div>
        <div style={{ padding: '0 14px 20px' }}>
          <CFc.Button variant="outline" size="sm" fullWidth onClick={onEnd} style={{ color: 'var(--color-danger)', borderColor: 'var(--red-500)' }}>End Chat &amp; Mark Resolved</CFc.Button>
        </div>
      </div>
    </>
  );
}

// ── Inbox ─────────────────────────────────────────────────────────────────────
function InboxScreen({ onBack, onOpen, chats }) {
  const { Avatar } = CFc;
  return (
    <>
      <AppBar title="My Chats" onBack={onBack} />
      <div style={{ background: 'var(--ink)', padding: '8px 16px', textAlign: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-300)' }}>🔒 All conversations are end-to-end encrypted</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--surface-card)' }}>
        {chats.map((c, i) => (
          <div key={i} onClick={() => onOpen(c)} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--neutral-100)', cursor: 'pointer' }}>
            <Avatar name={c.reporterName} size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{c.reporterName}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>{c.last}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-link)', fontWeight: 600, margin: '2px 0' }}>📦 {c.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🔒 {c.preview}</div>
            </div>
            <span style={{ fontSize: 22, color: 'var(--neutral-300)' }}>›</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function ConfirmationScreen({ onDone, title = 'Report Submitted!', message = 'Your item is now live. We\'ll notify you when someone reaches out.' }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', textAlign: 'center', gap: 8 }}>
      <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, marginBottom: 10 }}>✅</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text-strong)' }}>{title}</div>
      <div style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 300 }}>{message}</div>
      <div style={{ background: 'var(--surface-brand-tint)', borderRadius: 'var(--radius-md)', padding: 16, marginTop: 14, textAlign: 'left', width: '100%' }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--blue-800)', marginBottom: 6 }}>🛡️ Safety tips</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--blue-800)', lineHeight: 1.7 }}>
          <li>Meet in busy, public campus spots.</li>
          <li>Verify ownership before handing items over.</li>
          <li>Keep all chat inside CampusFinder.</li>
        </ul>
      </div>
      <div style={{ width: '100%', marginTop: 18 }}>
        <CFc.Button variant="primary" size="lg" fullWidth onClick={onDone}>Back to Items</CFc.Button>
      </div>
    </div>
  );
}

Object.assign(window, { ChatScreen, InboxScreen, ConfirmationScreen });
