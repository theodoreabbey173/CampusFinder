/* global React, AppBar */
// Auth, Verification, and Welcome screens for the CampusFinder UI kit.

const { Button: CFButton, Input: CFInput } = window.CampusFinderDesignSystem_84dfef;

// ── Sign Up / Login ───────────────────────────────────────────────────────────
function AuthScreen({ mode, setMode, onAuthed }) {
  const isSignup = mode === 'signup';
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Brand hero */}
      <div style={{ background: 'var(--gradient-brand)', padding: '30px 26px 34px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <div style={{ width: 84, height: 84, borderRadius: 22, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <img src="../../assets/logo-mark.png" alt="CampusFinder" style={{ width: 58, height: 58, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff', letterSpacing: '-0.02em' }}>CampusFinder</div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.4 }}>University of Ghana · Lost &amp; Found</div>
      </div>

      <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text-strong)' }}>{isSignup ? 'Create account' : 'Welcome back'}</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>{isSignup ? 'Join CampusFinder to report and find lost items.' : 'Sign in to pick up where you left off.'}</div>
        </div>

        {isSignup && <CFInput label="Full Name" placeholder="e.g. Sarah Johnson" leadingIcon={<span>👤</span>} />}
        <CFInput label="Email Address" placeholder="you@ug.edu.gh" type="email" leadingIcon={<span>✉️</span>} />
        <CFInput label="Password" placeholder="••••••••" type="password" leadingIcon={<span>🔒</span>} />

        <Button variant="primary" size="lg" fullWidth onClick={onAuthed} style={{ marginTop: 4 }}>
          {isSignup ? 'Create Account' : 'Sign In'}
        </Button>

        <div style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--text-muted)' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => setMode(isSignup ? 'login' : 'signup')} style={{ color: 'var(--text-link)', fontWeight: 700, cursor: 'pointer' }}>
            {isSignup ? 'Sign in' : 'Sign up'}
          </span>
        </div>
      </div>
    </div>
  );
}
const Button = CFButton;

// ── Verification ──────────────────────────────────────────────────────────────
function VerificationScreen({ onVerified, onBack }) {
  const [code, setCode] = React.useState(['', '', '', '']);
  const filled = code.filter(Boolean).length;
  const set = (i, v) => { const n = [...code]; n[i] = v.slice(-1); setCode(n); };
  return (
    <>
      <AppBar title="Verify Email" onBack={onBack} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--surface-brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, alignSelf: 'center' }}>📧</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--text-strong)' }}>Check your inbox</div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>We sent a 4-digit code to your university email. Enter it below to verify your account.</div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 4 }}>
          {code.map((c, i) => (
            <input key={i} value={c} onChange={(e) => set(i, e.target.value)} inputMode="numeric" maxLength={1}
              style={{ width: 58, height: 66, textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 26,
                border: `2px solid ${c ? 'var(--color-primary)' : 'var(--border-default)'}`, borderRadius: 'var(--radius-md)',
                color: 'var(--text-strong)', outline: 'none', background: 'var(--surface-card)' }} />
          ))}
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={filled < 4} onClick={onVerified}>Verify &amp; Continue</Button>
        <div style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--text-muted)' }}>
          Didn't get it? <span style={{ color: 'var(--text-link)', fontWeight: 700, cursor: 'pointer' }}>Resend code</span>
        </div>
      </div>
    </>
  );
}

// ── Welcome / onboarding ────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  const features = [
    { icon: '🔍', t: 'Browse lost & found', d: 'See everything reported across campus.' },
    { icon: '📣', t: 'Report in seconds', d: 'Post a lost or found item with a photo.' },
    { icon: '🔒', t: 'Chat securely', d: 'Private, encrypted messaging with finders.' },
    { icon: '🤝', t: 'Reunite items', d: 'Help classmates get their things back.' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--gradient-brand)', padding: '40px 26px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <img src="../../assets/logo-mark.png" alt="" style={{ width: 76, height: 76, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#fff', textAlign: 'center', lineHeight: 1.15 }}>Welcome to CampusFinder!</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', textAlign: 'center', lineHeight: 1.5, maxWidth: 280 }}>You're all set. Let's help you find and report lost items around campus.</div>
      </div>
      <div style={{ padding: '22px 22px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {features.map((f) => (
          <div key={f.t} style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 14, boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--surface-brand-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{f.t}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 1 }}>{f.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '6px 22px 24px', marginTop: 'auto' }}>
        <Button variant="primary" size="lg" fullWidth onClick={onStart}>Get Started</Button>
      </div>
    </div>
  );
}

Object.assign(window, { AuthScreen, VerificationScreen, WelcomeScreen });
