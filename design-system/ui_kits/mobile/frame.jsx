/* global React */
// Shared mock data, phone frame, status bar, and app header for the
// CampusFinder mobile UI kit. Exposed on window for sibling scripts.

const CF_ITEMS = [
  { id: '1', name: 'Blue Backpack', type: 'Found', location: 'Library, 3rd Floor', time: '2 hours ago', reporterName: 'Sarah Johnson', reporterClass: 'Class of 2026', isNew: true, description: 'Blue Jansport backpack with a padded laptop sleeve and a UG keychain.', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: '2', name: 'iPhone 14 Pro', type: 'Lost', location: 'Student Center', time: '5 hours ago', reporterName: 'Kwame Mensah', reporterClass: 'Class of 2025', description: 'Gold iPhone 14 Pro, small crack on the bottom-left corner. Sentimental value.', imageUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80' },
  { id: '3', name: 'Chemistry 101 Textbook', type: 'Found', location: 'Science Building', time: '1 day ago', reporterName: 'Ama Owusu', reporterClass: 'Class of 2027', description: 'Hardcover Chemistry 101 textbook with handwritten notes inside the cover.', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80' },
  { id: '4', name: 'Black Leather Wallet', type: 'Lost', location: 'Gym Locker Room', time: '2 days ago', reporterName: 'Daniel Osei', reporterClass: 'Class of 2026', description: 'Black bifold wallet containing a student ID and bus card.', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80' },
  { id: '5', name: 'Red Water Bottle', type: 'Found', location: 'Cafeteria', time: '3 days ago', reporterName: 'Efua Asante', reporterClass: 'Class of 2028', description: 'Insulated red water bottle with assorted stickers.', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
  { id: '6', name: 'Dark Blue Cap', type: 'Lost', location: 'Computer Science Lab', time: '8 days ago', reporterName: 'Yaw Boateng', reporterClass: 'Class of 2025', description: 'Navy blue baseball cap with an embroidered logo.', imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
];

// ── iOS status bar ──────────────────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const color = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px 0 30px', flexShrink: 0 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color }}>
        <span style={{ fontSize: 12 }}>●●●</span>
        <span style={{ fontSize: 12, fontWeight: 700 }}>LTE</span>
        <span style={{ width: 22, height: 11, border: `1.5px solid ${dark ? '#fff' : 'var(--ink)'}`, borderRadius: 3, position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', inset: 1.5, right: 6, background: dark ? '#fff' : 'var(--ink)', borderRadius: 1 }} />
        </span>
      </div>
    </div>
  );
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, statusDark = false, statusBg = 'transparent' }) {
  return (
    <div style={{
      width: 390, height: 844, background: 'var(--surface-page)', borderRadius: 46,
      border: '11px solid #0b0f16', boxShadow: 'var(--shadow-xl), 0 0 0 1.5px rgba(0,0,0,0.4)',
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, background: statusBg, zIndex: 30 }}>
        <StatusBar dark={statusDark} />
      </div>
      {/* dynamic island */}
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 118, height: 33, background: '#0b0f16', borderRadius: 20, zIndex: 40 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 50 }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, background: 'var(--ink)', borderRadius: 3, zIndex: 40, opacity: 0.85 }} />
    </div>
  );
}

// ── Branded app bar ─────────────────────────────────────────────────────────
function AppBar({ title, onBack, right = null, brand = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px 12px',
      background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0, minHeight: 56,
    }}>
      {onBack && (
        <button onClick={onBack} style={{ border: 'none', background: 'var(--neutral-100)', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', color: 'var(--text-body)', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>‹</button>
      )}
      {brand ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img src="../../assets/logo-mark.png" alt="" style={{ width: 30, height: 30, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--blue-600)' }}>Campus</span><span style={{ color: 'var(--teal-500)' }}>Finder</span>
          </span>
        </div>
      ) : (
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{title}</span>
      )}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>{right}</div>
    </div>
  );
}

Object.assign(window, { CF_ITEMS, StatusBar, PhoneFrame, AppBar });
