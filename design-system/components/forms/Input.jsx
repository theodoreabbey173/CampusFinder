import React, { useState } from 'react';

/** Labeled text field with optional leading icon, helper text, and error state. */
export function Input({
  label, value, onChange, placeholder, type = 'text',
  leadingIcon = null, error = null, helper = null, multiline = false,
  required = false, disabled = false, style = {}, ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? 'var(--color-danger)'
    : focused ? 'var(--color-primary)' : 'var(--border-default)';

  const fieldStyle = {
    display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 10,
    background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
    border: `1.5px solid ${borderColor}`,
    borderRadius: 'var(--radius-md)',
    padding: multiline ? '12px 14px' : '0 14px',
    minHeight: multiline ? 96 : 48,
    boxShadow: focused && !error ? '0 0 0 3px var(--ring-focus)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
  };
  const controlStyle = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-strong)',
    padding: multiline ? 0 : '13px 0', resize: 'none', width: '100%',
    fontWeight: 500,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      {label && (
        <label style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>
          {label}{required && <span style={{ color: 'var(--color-accent)' }}> *</span>}
        </label>
      )}
      <div style={fieldStyle}>
        {leadingIcon && <span style={{ fontSize: 16, color: 'var(--text-muted)', marginTop: multiline ? 2 : 0 }}>{leadingIcon}</span>}
        {multiline ? (
          <textarea
            style={controlStyle} rows={4} value={value} placeholder={placeholder}
            disabled={disabled} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...rest}
          />
        ) : (
          <input
            style={controlStyle} type={type} value={value} placeholder={placeholder}
            disabled={disabled} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...rest}
          />
        )}
      </div>
      {(error || helper) && (
        <span style={{ fontSize: 12.5, fontWeight: 500, color: error ? 'var(--color-danger)' : 'var(--text-muted)' }}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
