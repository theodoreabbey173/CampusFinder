/* global React, AppBar, CF_ITEMS */
// List, Details, and Report screens for the CampusFinder UI kit.

const CF = window.CampusFinderDesignSystem_84dfef;

// ── Item list ─────────────────────────────────────────────────────────────────
function ListScreen({ onOpenItem, onReport, onInbox, chatCount = 2 }) {
  const { ItemCard, StatBanner, SearchBar, SegmentedTabs, EmptyState } = CF;
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('All');

  const stats = {
    total: CF_ITEMS.length,
    lost: CF_ITEMS.filter((i) => i.type === 'Lost').length,
    found: CF_ITEMS.filter((i) => i.type === 'Found').length,
  };
  const items = CF_ITEMS.filter((i) => {
    const mf = filter === 'All' || i.type === filter;
    const t = q.toLowerCase().trim();
    const ms = !t || i.name.toLowerCase().includes(t) || i.location.toLowerCase().includes(t);
    return mf && ms;
  });

  const inboxBtn = (
    <button onClick={onInbox} style={{ position: 'relative', border: 'none', background: 'var(--neutral-100)', width: 38, height: 38, borderRadius: '50%', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      💬
      {chatCount > 0 && <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--color-danger)', color: '#fff', fontSize: 10, fontWeight: 800, minWidth: 17, height: 17, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: '2px solid var(--surface-card)' }}>{chatCount}</span>}
    </button>
  );

  return (
    <>
      <AppBar brand right={inboxBtn} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>Lost &amp; Found</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Tap any item to see full details and chat.</div>
        </div>
        <StatBanner total={stats.total} lost={stats.lost} found={stats.found} />
        <SearchBar value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="Search by name or location…" />
        <SegmentedTabs value={filter} onChange={setFilter} options={[
          { value: 'All', icon: '📦', count: stats.total },
          { value: 'Lost', count: stats.lost },
          { value: 'Found', count: stats.found },
        ]} />
        {items.length === 0 ? (
          <EmptyState icon="🔎" title="No results" message={`Nothing matched "${q}". Try a different keyword.`} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 2 }}>
            {items.map((it) => <ItemCard key={it.id} item={it} onPress={() => onOpenItem(it)} />)}
          </div>
        )}
      </div>
      {/* Floating report button */}
      <button onClick={onReport} style={{ position: 'absolute', right: 18, bottom: 28, zIndex: 20, display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--color-primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: 'var(--shadow-primary)' }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>＋</span> Report
      </button>
    </>
  );
}

// ── Item details ──────────────────────────────────────────────────────────────
function DetailsScreen({ item, onBack, onChat }) {
  const { Badge } = CF;
  const isLost = item.type === 'Lost';
  const Row = ({ label, children }) => (
    <div style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--neutral-100)' }}>
      <span style={{ width: 96, fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 14, color: 'var(--text-strong)', fontWeight: 500 }}>{children}</span>
    </div>
  );
  return (
    <>
      <AppBar title="Item Details" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ position: 'relative', height: 250, background: `center/cover url(${item.imageUrl})`, }}>
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <Badge tone={isLost ? 'lost' : 'found'} solid dot>{item.type}</Badge>
          </div>
        </div>
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{item.name}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-strong)', marginBottom: 4 }}>Details</div>
            <Row label="Location">📍 {item.location}</Row>
            <Row label="Time">🕒 {item.time}</Row>
            <Row label="Reported by">👤 {item.reporterName}</Row>
            <Row label="Student">🎓 {item.reporterClass}</Row>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-strong)', marginBottom: 6 }}>Description</div>
            <div style={{ fontSize: 14.5, color: 'var(--text-body)', lineHeight: 1.6 }}>{item.description}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--surface-brand-tint)', border: '1px solid var(--blue-100)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <div style={{ fontSize: 13, color: 'var(--blue-800)', lineHeight: 1.5 }}>For privacy and safety, all contact happens through CampusFinder's secure chat.</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 22px 26px', background: 'var(--surface-card)', borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
        <CF.Button variant="secondary" size="lg" fullWidth leadingIcon={<span>💬</span>} onClick={onChat}>Start Secure Chat</CF.Button>
      </div>
    </>
  );
}

// ── Report an item ──────────────────────────────────────────────────────────
function ReportScreen({ onBack, onSubmit }) {
  const { Input, SegmentedTabs } = CF;
  const [type, setType] = React.useState('Found');
  return (
    <>
      <AppBar title="Report an Item" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>Help others by reporting lost or found items around campus.</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)', marginBottom: 8 }}>Report Type</div>
          <SegmentedTabs value={type} onChange={setType} options={[{ value: 'Lost' }, { value: 'Found' }]} />
        </div>
        <Input label="Item Name" required placeholder="e.g. Blue Backpack, iPhone, Textbook" />
        <Input label="Description" required multiline placeholder="Color, brand, distinguishing features…" />
        <Input label="Location" required leadingIcon={<span>📍</span>} placeholder="Where was it lost / found?" />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)', marginBottom: 8 }}>Add a Photo <span style={{ color: 'var(--text-subtle)', fontWeight: 500 }}>(optional)</span></div>
          <div style={{ border: '2px dashed var(--blue-300)', borderRadius: 'var(--radius-md)', padding: '22px', textAlign: 'center', background: 'var(--surface-brand-tint)', color: 'var(--blue-700)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>📷 Select from Photos</div>
        </div>
        <div style={{ background: 'var(--amber-50)', border: '1px solid #F6E2B8', borderRadius: 'var(--radius-md)', padding: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--amber-600)', marginBottom: 6 }}>📝 Before you post</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--neutral-600)', lineHeight: 1.7 }}>
            <li>Be as specific as possible.</li>
            <li>Include unique identifying features.</li>
            <li>All contact is handled securely in-app.</li>
          </ul>
        </div>
        <CF.Button variant="primary" size="lg" fullWidth onClick={onSubmit}>Submit Report</CF.Button>
      </div>
    </>
  );
}

Object.assign(window, { ListScreen, DetailsScreen, ReportScreen });
