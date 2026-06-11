import React from 'react';

/**
 * CampusFinder primary action button.
 * Variants map to the brand: primary (Deep Blue), secondary (Teal),
 * accent (Orange), plus outline / ghost / danger.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leadingIcon = null,
  trailingIcon = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, borderRadius: 'var(--radius-sm)', gap: 6, minHeight: 36 },
    md: { padding: '11px 20px', fontSize: 15, borderRadius: 'var(--radius-md)', gap: 8, minHeight: 44 },
    lg: { padding: '15px 26px', fontSize: 16, borderRadius: 'var(--radius-lg)', gap: 10, minHeight: 52 },
  };

  const variants = {
    primary: {
      background: 'var(--color-primary)', color: '#fff', border: '1px solid transparent',
      boxShadow: 'var(--shadow-primary)',
    },
    secondary: {
      background: 'var(--color-secondary)', color: '#fff', border: '1px solid transparent',
      boxShadow: '0 6px 16px rgba(20,184,166,0.28)',
    },
    accent: {
      background: 'var(--color-accent)', color: '#fff', border: '1px solid transparent',
      boxShadow: 'var(--shadow-accent)',
    },
    outline: {
      background: 'transparent', color: 'var(--color-primary)',
      border: '1.5px solid var(--border-default)', boxShadow: 'none',
    },
    ghost: {
      background: 'transparent', color: 'var(--color-primary)',
      border: '1px solid transparent', boxShadow: 'none',
    },
    danger: {
      background: 'var(--color-danger)', color: '#fff', border: '1px solid transparent',
      boxShadow: 'none',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: s.fontSize,
        letterSpacing: '0.01em', lineHeight: 1, cursor: disabled || loading ? 'not-allowed' : 'pointer',
        padding: s.padding, minHeight: s.minHeight, borderRadius: s.borderRadius,
        transition: 'transform var(--dur-fast) var(--ease-standard), filter var(--dur-base) var(--ease-standard), background var(--dur-base)',
        opacity: disabled ? 0.5 : 1,
        ...v, ...style,
      }}
      onMouseDown={(e) => { if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'none'; }}
      onMouseEnter={(e) => { if (!disabled && !loading) e.currentTarget.style.filter = 'brightness(1.06)'; }}
      {...rest}
    >
      {loading ? (
        <span style={{
          width: 16, height: 16, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff',
          display: 'inline-block', animation: 'cf-spin 0.7s linear infinite',
        }} />
      ) : leadingIcon}
      {!loading && <span>{children}</span>}
      {loading && <span>Please wait…</span>}
      {!loading && trailingIcon}
      <style>{`@keyframes cf-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
