/* @ds-bundle: {"format":3,"namespace":"CampusFinderDesignSystem_84dfef","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchBar","sourcePath":"components/forms/SearchBar.jsx"},{"name":"SegmentedTabs","sourcePath":"components/navigation/SegmentedTabs.jsx"},{"name":"ChatBubble","sourcePath":"components/product/ChatBubble.jsx"},{"name":"EmptyState","sourcePath":"components/product/EmptyState.jsx"},{"name":"ItemCard","sourcePath":"components/product/ItemCard.jsx"},{"name":"StatBanner","sourcePath":"components/product/StatBanner.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"ef18010c44e1","components/core/Badge.jsx":"3b1e8d05e0d1","components/core/Button.jsx":"7c7d2a0729c4","components/core/Card.jsx":"4c471d56f78c","components/forms/Input.jsx":"73a8a1576ede","components/forms/SearchBar.jsx":"7db21b9b65e7","components/navigation/SegmentedTabs.jsx":"eda0f7c79e5d","components/product/ChatBubble.jsx":"34485aba5e59","components/product/EmptyState.jsx":"d8ee8a823e88","components/product/ItemCard.jsx":"6f3aaa01627a","components/product/StatBanner.jsx":"48add4d26d3f","ui_kits/mobile/app.jsx":"eb59dedd1a69","ui_kits/mobile/frame.jsx":"96494a35c152","ui_kits/mobile/screens-auth.jsx":"152623aa5a7c","ui_kits/mobile/screens-browse.jsx":"3f6ecbf8043a","ui_kits/mobile/screens-chat.jsx":"89248c2bcb6a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CampusFinderDesignSystem_84dfef = window.CampusFinderDesignSystem_84dfef || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const AVATAR_COLORS = ['var(--blue-600)', 'var(--teal-500)', 'var(--orange-400)', 'var(--indigo-600)', 'var(--blue-500)', 'var(--teal-600)'];

/** Circular initial avatar; color is derived deterministically from the name. */
function Avatar({
  name = '?',
  src = null,
  size = 44,
  style = {}
}) {
  const initial = (name?.trim()?.[0] || '?').toUpperCase();
  const color = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'var(--neutral-200)' : color,
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.42,
      overflow: 'hidden',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initial);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Status / category badge. Defaults map Lost→orange and Found→teal,
 * matching CampusFinder's item taxonomy. Other tones for generic use.
 */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  solid = false,
  size = 'md',
  style = {}
}) {
  const tones = {
    lost: {
      fg: 'var(--status-lost-fg)',
      bg: 'var(--status-lost-bg)',
      solid: 'var(--status-lost-solid)'
    },
    found: {
      fg: 'var(--status-found-fg)',
      bg: 'var(--status-found-bg)',
      solid: 'var(--status-found-solid)'
    },
    success: {
      fg: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      solid: 'var(--color-success)'
    },
    warning: {
      fg: 'var(--amber-600)',
      bg: 'var(--color-warning-bg)',
      solid: 'var(--color-warning)'
    },
    danger: {
      fg: 'var(--color-danger)',
      bg: 'var(--color-danger-bg)',
      solid: 'var(--color-danger)'
    },
    info: {
      fg: 'var(--blue-700)',
      bg: 'var(--color-info-bg)',
      solid: 'var(--blue-600)'
    },
    neutral: {
      fg: 'var(--neutral-600)',
      bg: 'var(--neutral-100)',
      solid: 'var(--neutral-400)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const dims = size === 'sm' ? {
    padding: '2px 9px',
    fontSize: 11
  } : {
    padding: '4px 12px',
    fontSize: 12
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      letterSpacing: '0.02em',
      borderRadius: 'var(--radius-pill)',
      color: solid ? '#fff' : t.fg,
      background: solid ? t.solid : t.bg,
      ...dims,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: solid ? '#fff' : t.solid
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CampusFinder primary action button.
 * Variants map to the brand: primary (Deep Blue), secondary (Teal),
 * accent (Orange), plus outline / ghost / danger.
 */
function Button({
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
    sm: {
      padding: '8px 14px',
      fontSize: 13,
      borderRadius: 'var(--radius-sm)',
      gap: 6,
      minHeight: 36
    },
    md: {
      padding: '11px 20px',
      fontSize: 15,
      borderRadius: 'var(--radius-md)',
      gap: 8,
      minHeight: 44
    },
    lg: {
      padding: '15px 26px',
      fontSize: 16,
      borderRadius: 'var(--radius-lg)',
      gap: 10,
      minHeight: 52
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-primary)'
    },
    secondary: {
      background: 'var(--color-secondary)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: '0 6px 16px rgba(20,184,166,0.28)'
    },
    accent: {
      background: 'var(--color-accent)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-accent)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--border-default)',
      boxShadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    danger: {
      background: 'var(--color-danger)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'none'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled || loading,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: s.fontSize,
      letterSpacing: '0.01em',
      lineHeight: 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      padding: s.padding,
      minHeight: s.minHeight,
      borderRadius: s.borderRadius,
      transition: 'transform var(--dur-fast) var(--ease-standard), filter var(--dur-base) var(--ease-standard), background var(--dur-base)',
      opacity: disabled ? 0.5 : 1,
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.filter = 'none';
    },
    onMouseEnter: e => {
      if (!disabled && !loading) e.currentTarget.style.filter = 'brightness(1.06)';
    }
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.5)',
      borderTopColor: '#fff',
      display: 'inline-block',
      animation: 'cf-spin 0.7s linear infinite'
    }
  }) : leadingIcon, !loading && /*#__PURE__*/React.createElement("span", null, children), loading && /*#__PURE__*/React.createElement("span", null, "Please wait\u2026"), !loading && trailingIcon, /*#__PURE__*/React.createElement("style", null, `@keyframes cf-spin { to { transform: rotate(360deg); } }`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Generic surface container with the house elevation + radius scale. */
function Card({
  children,
  elevation = 'md',
  padded = true,
  accent = null,
  style = {},
  ...rest
}) {
  const shadows = {
    none: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  const accentColors = {
    lost: 'var(--status-lost-solid)',
    found: 'var(--status-found-solid)',
    primary: 'var(--color-primary)',
    teal: 'var(--color-secondary)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: shadows[elevation] ?? shadows.md,
      border: '1px solid var(--border-subtle)',
      padding: padded ? 'var(--pad-card)' : 0,
      borderLeft: accent ? `4px solid ${accentColors[accent] || accent}` : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Labeled text field with optional leading icon, helper text, and error state. */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  leadingIcon = null,
  error = null,
  helper = null,
  multiline = false,
  required = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? 'var(--color-danger)' : focused ? 'var(--color-primary)' : 'var(--border-default)';
  const fieldStyle = {
    display: 'flex',
    alignItems: multiline ? 'flex-start' : 'center',
    gap: 10,
    background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
    border: `1.5px solid ${borderColor}`,
    borderRadius: 'var(--radius-md)',
    padding: multiline ? '12px 14px' : '0 14px',
    minHeight: multiline ? 96 : 48,
    boxShadow: focused && !error ? '0 0 0 3px var(--ring-focus)' : 'none',
    transition: 'border-color var(--dur-base), box-shadow var(--dur-base)'
  };
  const controlStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--text-strong)',
    padding: multiline ? 0 : '13px 0',
    resize: 'none',
    width: '100%',
    fontWeight: 500
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-accent)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: fieldStyle
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-muted)',
      marginTop: multiline ? 2 : 0
    }
  }, leadingIcon), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    style: controlStyle,
    rows: 4,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    style: controlStyle,
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, rest))), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: error ? 'var(--color-danger)' : 'var(--text-muted)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchBar.jsx
try { (() => {
const {
  useState
} = React;
/** Rounded search field with leading magnifier and a clear (✕) affordance. */
function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
  style = {}
}) {
  const [focused, setFocused] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-card)',
      border: `1.5px solid ${focused ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '0 14px',
      minHeight: 46,
      boxShadow: focused ? '0 0 0 3px var(--ring-focus)' : 'var(--shadow-xs)',
      transition: 'border-color var(--dur-base), box-shadow var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-muted)'
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-strong)',
      padding: '12px 0'
    }
  }), value ? /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      border: 'none',
      background: 'var(--neutral-200)',
      color: 'var(--neutral-600)',
      width: 22,
      height: 22,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1,
      flexShrink: 0
    }
  }, "\u2715") : null);
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedTabs.jsx
try { (() => {
/**
 * Segmented filter control (the All / Lost / Found switcher).
 * Each option may carry its own active color so Lost reads orange and
 * Found reads teal.
 */
function SegmentedTabs({
  options,
  value,
  onChange,
  style = {}
}) {
  const colorFor = opt => opt.color || (opt.value === 'Lost' ? 'var(--status-lost-solid)' : opt.value === 'Found' ? 'var(--status-found-solid)' : 'var(--color-primary)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      ...style
    }
  }, options.map(opt => {
    const active = value === opt.value;
    const c = colorFor(opt);
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      onClick: () => onChange?.(opt.value),
      style: {
        flex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '9px 12px',
        borderRadius: 'var(--radius-pill)',
        border: `1.5px solid ${active ? c : 'var(--border-default)'}`,
        background: active ? c : 'var(--surface-card)',
        color: active ? '#fff' : 'var(--text-body)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 13.5,
        cursor: 'pointer',
        transition: 'all var(--dur-base) var(--ease-standard)'
      }
    }, opt.icon && /*#__PURE__*/React.createElement("span", null, opt.icon), opt.label ?? opt.value, opt.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: '1px 7px',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'rgba(255,255,255,0.25)' : 'var(--neutral-100)',
        color: active ? '#fff' : 'var(--text-muted)'
      }
    }, opt.count));
  }));
}
Object.assign(__ds_scope, { SegmentedTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedTabs.jsx", error: String((e && e.message) || e) }); }

// components/product/ChatBubble.jsx
try { (() => {
/** Single chat message bubble. `mine` aligns right in brand blue. */
function ChatBubble({
  text,
  time,
  mine = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: mine ? 'flex-end' : 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '76%',
      padding: '10px 14px',
      borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      background: mine ? 'var(--color-primary)' : 'var(--neutral-100)',
      color: mine ? '#fff' : 'var(--text-strong)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.4,
      fontWeight: 500
    }
  }, text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      marginTop: 4,
      textAlign: 'right',
      color: mine ? 'rgba(255,255,255,0.7)' : 'var(--text-subtle)'
    }
  }, time)));
}
Object.assign(__ds_scope, { ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/product/EmptyState.jsx
try { (() => {
/** Centered empty / zero-result state with an icon, message, and optional action. */
function EmptyState({
  icon = '📭',
  title,
  message,
  actionLabel,
  onAction,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 32px',
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: '50%',
      background: 'var(--surface-brand-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 34,
      marginBottom: 8
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-strong)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      lineHeight: 1.5,
      maxWidth: 320
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onAction
  }, actionLabel)));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/product/ItemCard.jsx
try { (() => {
/**
 * The lost & found list row: thumbnail, title + status badge, description,
 * location and time meta. Left accent stripe matches the item type.
 */
function ItemCard({
  item,
  onPress,
  style = {}
}) {
  const isLost = item.type === 'Lost';
  const accent = isLost ? 'var(--status-lost-solid)' : 'var(--status-found-solid)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onPress,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `4px solid ${accent}`,
      padding: 14,
      boxShadow: 'var(--shadow-sm)',
      cursor: onPress ? 'pointer' : 'default',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
      ...style
    },
    onMouseEnter: e => {
      if (onPress) {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, item.isNew && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -8,
      right: 12,
      background: 'var(--color-accent)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '0.06em',
      padding: '3px 8px',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, "NEW"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: 'var(--radius-md)',
      flexShrink: 0,
      background: item.imageUrl ? `center/cover url(${item.imageUrl})` : 'var(--neutral-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--neutral-400)',
      fontSize: 26,
      border: '1px solid var(--border-subtle)'
    }
  }, !item.imageUrl && '🔍'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.name), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: isLost ? 'lost' : 'found',
    size: "sm",
    dot: true
  }, item.type)), item.description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginBottom: 5,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.description), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-body)',
      fontWeight: 600,
      marginBottom: 2
    }
  }, "\uD83D\uDCCD ", item.location), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "\uD83D\uDD52 ", item.time, item.reporterName ? `  ·  👤 ${item.reporterName}` : '')));
}
Object.assign(__ds_scope, { ItemCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ItemCard.jsx", error: String((e && e.message) || e) }); }

// components/product/StatBanner.jsx
try { (() => {
/** Three-up summary banner: Total / Lost / Found counts. */
function StatBanner({
  total = 0,
  lost = 0,
  found = 0,
  style = {}
}) {
  const Item = ({
    value,
    label,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, label));
  const Divider = () => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border-subtle)',
      margin: '4px 0'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      padding: '14px 8px',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Item, {
    value: total,
    label: "Total",
    color: "var(--text-strong)"
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Item, {
    value: lost,
    label: "Lost",
    color: "var(--status-lost-fg)"
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Item, {
    value: found,
    label: "Found",
    color: "var(--status-found-fg)"
  }));
}
Object.assign(__ds_scope, { StatBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/StatBanner.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/app.jsx
try { (() => {
/* global React, ReactDOM, PhoneFrame, AuthScreen, VerificationScreen, WelcomeScreen, ListScreen, DetailsScreen, ReportScreen, ChatScreen, InboxScreen, ConfirmationScreen, CF_ITEMS */
// CampusFinder UI kit — navigation shell.

function CampusFinderApp({
  start = 'list'
}) {
  const [screen, setScreen] = React.useState(start);
  const [mode, setMode] = React.useState('signup');
  const [item, setItem] = React.useState(CF_ITEMS[1]);
  const [confirm, setConfirm] = React.useState({
    title: 'Report Submitted!',
    message: "Your item is now live. We'll notify you when someone reaches out."
  });
  const chats = [{
    ...CF_ITEMS[1],
    reporterName: 'Kwame Mensah',
    last: '10:32 AM',
    preview: "Yes! Can you describe a detail?"
  }, {
    ...CF_ITEMS[0],
    reporterName: 'Sarah Johnson',
    last: 'Yesterday',
    preview: 'Great, see you at the library!'
  }];
  const go = setScreen;
  const statusDark = screen === 'auth' || screen === 'welcome';
  const statusBg = screen === 'auth' || screen === 'welcome' ? 'transparent' : 'var(--surface-card)';
  let view;
  switch (screen) {
    case 'auth':
      view = /*#__PURE__*/React.createElement(AuthScreen, {
        mode: mode,
        setMode: setMode,
        onAuthed: () => go('verify')
      });
      break;
    case 'verify':
      view = /*#__PURE__*/React.createElement(VerificationScreen, {
        onVerified: () => go('welcome'),
        onBack: () => go('auth')
      });
      break;
    case 'welcome':
      view = /*#__PURE__*/React.createElement(WelcomeScreen, {
        onStart: () => go('list')
      });
      break;
    case 'list':
      view = /*#__PURE__*/React.createElement(ListScreen, {
        onOpenItem: it => {
          setItem(it);
          go('details');
        },
        onReport: () => go('report'),
        onInbox: () => go('inbox'),
        chatCount: chats.length
      });
      break;
    case 'details':
      view = /*#__PURE__*/React.createElement(DetailsScreen, {
        item: item,
        onBack: () => go('list'),
        onChat: () => go('chat')
      });
      break;
    case 'report':
      view = /*#__PURE__*/React.createElement(ReportScreen, {
        onBack: () => go('list'),
        onSubmit: () => {
          setConfirm({
            title: 'Report Submitted!',
            message: "Your item is now live. We'll notify you when someone reaches out."
          });
          go('confirmation');
        }
      });
      break;
    case 'chat':
      view = /*#__PURE__*/React.createElement(ChatScreen, {
        item: item,
        onBack: () => go('details'),
        onEnd: () => {
          setConfirm({
            title: 'Chat Closed',
            message: 'Thanks for keeping campus connected. We hope the item finds its owner!'
          });
          go('confirmation');
        }
      });
      break;
    case 'inbox':
      view = /*#__PURE__*/React.createElement(InboxScreen, {
        chats: chats,
        onBack: () => go('list'),
        onOpen: c => {
          setItem(c);
          go('chat');
        }
      });
      break;
    case 'confirmation':
      view = /*#__PURE__*/React.createElement(ConfirmationScreen, {
        title: confirm.title,
        message: confirm.message,
        onDone: () => go('list')
      });
      break;
    default:
      view = null;
  }
  return /*#__PURE__*/React.createElement(PhoneFrame, {
    statusDark: statusDark,
    statusBg: statusBg
  }, view);
}

// index.html owns mounting (so the jump control can re-render at any screen).
window.CampusFinderApp = CampusFinderApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/frame.jsx
try { (() => {
/* global React */
// Shared mock data, phone frame, status bar, and app header for the
// CampusFinder mobile UI kit. Exposed on window for sibling scripts.

const CF_ITEMS = [{
  id: '1',
  name: 'Blue Backpack',
  type: 'Found',
  location: 'Library, 3rd Floor',
  time: '2 hours ago',
  reporterName: 'Sarah Johnson',
  reporterClass: 'Class of 2026',
  isNew: true,
  description: 'Blue Jansport backpack with a padded laptop sleeve and a UG keychain.',
  imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80'
}, {
  id: '2',
  name: 'iPhone 14 Pro',
  type: 'Lost',
  location: 'Student Center',
  time: '5 hours ago',
  reporterName: 'Kwame Mensah',
  reporterClass: 'Class of 2025',
  description: 'Gold iPhone 14 Pro, small crack on the bottom-left corner. Sentimental value.',
  imageUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80'
}, {
  id: '3',
  name: 'Chemistry 101 Textbook',
  type: 'Found',
  location: 'Science Building',
  time: '1 day ago',
  reporterName: 'Ama Owusu',
  reporterClass: 'Class of 2027',
  description: 'Hardcover Chemistry 101 textbook with handwritten notes inside the cover.',
  imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
}, {
  id: '4',
  name: 'Black Leather Wallet',
  type: 'Lost',
  location: 'Gym Locker Room',
  time: '2 days ago',
  reporterName: 'Daniel Osei',
  reporterClass: 'Class of 2026',
  description: 'Black bifold wallet containing a student ID and bus card.',
  imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80'
}, {
  id: '5',
  name: 'Red Water Bottle',
  type: 'Found',
  location: 'Cafeteria',
  time: '3 days ago',
  reporterName: 'Efua Asante',
  reporterClass: 'Class of 2028',
  description: 'Insulated red water bottle with assorted stickers.',
  imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80'
}, {
  id: '6',
  name: 'Dark Blue Cap',
  type: 'Lost',
  location: 'Computer Science Lab',
  time: '8 days ago',
  reporterName: 'Yaw Boateng',
  reporterClass: 'Class of 2025',
  description: 'Navy blue baseball cap with an embroidered logo.',
  imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80'
}];

// ── iOS status bar ──────────────────────────────────────────────────────────
function StatusBar({
  dark = false
}) {
  const color = dark ? '#fff' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px 0 30px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      color
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "\u25CF\u25CF\u25CF"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700
    }
  }, "LTE"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 11,
      border: `1.5px solid ${dark ? '#fff' : 'var(--ink)'}`,
      borderRadius: 3,
      position: 'relative',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 1.5,
      right: 6,
      background: dark ? '#fff' : 'var(--ink)',
      borderRadius: 1
    }
  }))));
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({
  children,
  statusDark = false,
  statusBg = 'transparent'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      background: 'var(--surface-page)',
      borderRadius: 46,
      border: '11px solid #0b0f16',
      boxShadow: 'var(--shadow-xl), 0 0 0 1.5px rgba(0,0,0,0.4)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 50,
      background: statusBg,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: statusDark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 118,
      height: 33,
      background: '#0b0f16',
      borderRadius: 20,
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      paddingTop: 50
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 8,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 134,
      height: 5,
      background: 'var(--ink)',
      borderRadius: 3,
      zIndex: 40,
      opacity: 0.85
    }
  }));
}

// ── Branded app bar ─────────────────────────────────────────────────────────
function AppBar({
  title,
  onBack,
  right = null,
  brand = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px 12px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
      flexShrink: 0,
      minHeight: 56
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      border: 'none',
      background: 'var(--neutral-100)',
      width: 34,
      height: 34,
      borderRadius: '50%',
      cursor: 'pointer',
      color: 'var(--text-body)',
      fontSize: 17,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, "\u2039"), brand ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "",
    style: {
      width: 30,
      height: 30,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 19,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--blue-600)'
    }
  }, "Campus"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-500)'
    }
  }, "Finder"))) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, right));
}
Object.assign(window, {
  CF_ITEMS,
  StatusBar,
  PhoneFrame,
  AppBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/screens-auth.jsx
try { (() => {
/* global React, AppBar */
// Auth, Verification, and Welcome screens for the CampusFinder UI kit.

const {
  Button: CFButton,
  Input: CFInput
} = window.CampusFinderDesignSystem_84dfef;

// ── Sign Up / Login ───────────────────────────────────────────────────────────
function AuthScreen({
  mode,
  setMode,
  onAuthed
}) {
  const isSignup = mode === 'signup';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-brand)',
      padding: '30px 26px 34px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      borderRadius: 22,
      background: 'rgba(255,255,255,0.16)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "CampusFinder",
    style: {
      width: 58,
      height: 58,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color: '#fff',
      letterSpacing: '-0.02em'
    }
  }, "CampusFinder"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      lineHeight: 1.4
    }
  }, "University of Ghana \xB7 Lost & Found")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color: 'var(--text-strong)'
    }
  }, isSignup ? 'Create account' : 'Welcome back'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, isSignup ? 'Join CampusFinder to report and find lost items.' : 'Sign in to pick up where you left off.')), isSignup && /*#__PURE__*/React.createElement(CFInput, {
    label: "Full Name",
    placeholder: "e.g. Sarah Johnson",
    leadingIcon: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC64")
  }), /*#__PURE__*/React.createElement(CFInput, {
    label: "Email Address",
    placeholder: "you@ug.edu.gh",
    type: "email",
    leadingIcon: /*#__PURE__*/React.createElement("span", null, "\u2709\uFE0F")
  }), /*#__PURE__*/React.createElement(CFInput, {
    label: "Password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    type: "password",
    leadingIcon: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD12")
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onAuthed,
    style: {
      marginTop: 4
    }
  }, isSignup ? 'Create Account' : 'Sign In'), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 13.5,
      color: 'var(--text-muted)'
    }
  }, isSignup ? 'Already have an account? ' : "Don't have an account? ", /*#__PURE__*/React.createElement("span", {
    onClick: () => setMode(isSignup ? 'login' : 'signup'),
    style: {
      color: 'var(--text-link)',
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, isSignup ? 'Sign in' : 'Sign up'))));
}
const Button = CFButton;

// ── Verification ──────────────────────────────────────────────────────────────
function VerificationScreen({
  onVerified,
  onBack
}) {
  const [code, setCode] = React.useState(['', '', '', '']);
  const filled = code.filter(Boolean).length;
  const set = (i, v) => {
    const n = [...code];
    n[i] = v.slice(-1);
    setCode(n);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Verify Email",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      height: 70,
      borderRadius: '50%',
      background: 'var(--surface-brand-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 32,
      alignSelf: 'center'
    }
  }, "\uD83D\uDCE7"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--text-strong)'
    }
  }, "Check your inbox"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "We sent a 4-digit code to your university email. Enter it below to verify your account.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      marginTop: 4
    }
  }, code.map((c, i) => /*#__PURE__*/React.createElement("input", {
    key: i,
    value: c,
    onChange: e => set(i, e.target.value),
    inputMode: "numeric",
    maxLength: 1,
    style: {
      width: 58,
      height: 66,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 26,
      border: `2px solid ${c ? 'var(--color-primary)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-strong)',
      outline: 'none',
      background: 'var(--surface-card)'
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: filled < 4,
    onClick: onVerified
  }, "Verify & Continue"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 13.5,
      color: 'var(--text-muted)'
    }
  }, "Didn't get it? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-link)',
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "Resend code"))));
}

// ── Welcome / onboarding ────────────────────────────────────────────────────
function WelcomeScreen({
  onStart
}) {
  const features = [{
    icon: '🔍',
    t: 'Browse lost & found',
    d: 'See everything reported across campus.'
  }, {
    icon: '📣',
    t: 'Report in seconds',
    d: 'Post a lost or found item with a photo.'
  }, {
    icon: '🔒',
    t: 'Chat securely',
    d: 'Private, encrypted messaging with finders.'
  }, {
    icon: '🤝',
    t: 'Reunite items',
    d: 'Help classmates get their things back.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-brand)',
      padding: '40px 26px 36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "",
    style: {
      width: 76,
      height: 76,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 26,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 1.15
    }
  }, "Welcome to CampusFinder!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.88)',
      textAlign: 'center',
      lineHeight: 1.5,
      maxWidth: 280
    }
  }, "You're all set. Let's help you find and report lost items around campus.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 22px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.t,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      flexShrink: 0
    }
  }, f.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, f.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 1
    }
  }, f.d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 22px 24px',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onStart
  }, "Get Started")));
}
Object.assign(window, {
  AuthScreen,
  VerificationScreen,
  WelcomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/screens-auth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/screens-browse.jsx
try { (() => {
/* global React, AppBar, CF_ITEMS */
// List, Details, and Report screens for the CampusFinder UI kit.

const CF = window.CampusFinderDesignSystem_84dfef;

// ── Item list ─────────────────────────────────────────────────────────────────
function ListScreen({
  onOpenItem,
  onReport,
  onInbox,
  chatCount = 2
}) {
  const {
    ItemCard,
    StatBanner,
    SearchBar,
    SegmentedTabs,
    EmptyState
  } = CF;
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('All');
  const stats = {
    total: CF_ITEMS.length,
    lost: CF_ITEMS.filter(i => i.type === 'Lost').length,
    found: CF_ITEMS.filter(i => i.type === 'Found').length
  };
  const items = CF_ITEMS.filter(i => {
    const mf = filter === 'All' || i.type === filter;
    const t = q.toLowerCase().trim();
    const ms = !t || i.name.toLowerCase().includes(t) || i.location.toLowerCase().includes(t);
    return mf && ms;
  });
  const inboxBtn = /*#__PURE__*/React.createElement("button", {
    onClick: onInbox,
    style: {
      position: 'relative',
      border: 'none',
      background: 'var(--neutral-100)',
      width: 38,
      height: 38,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\uD83D\uDCAC", chatCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      right: -2,
      background: 'var(--color-danger)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 800,
      minWidth: 17,
      height: 17,
      borderRadius: 9,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px',
      border: '2px solid var(--surface-card)'
    }
  }, chatCount));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    brand: true,
    right: inboxBtn
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, "Lost & Found"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "Tap any item to see full details and chat.")), /*#__PURE__*/React.createElement(StatBanner, {
    total: stats.total,
    lost: stats.lost,
    found: stats.found
  }), /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search by name or location\u2026"
  }), /*#__PURE__*/React.createElement(SegmentedTabs, {
    value: filter,
    onChange: setFilter,
    options: [{
      value: 'All',
      icon: '📦',
      count: stats.total
    }, {
      value: 'Lost',
      count: stats.lost
    }, {
      value: 'Found',
      count: stats.found
    }]
  }), items.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "\uD83D\uDD0E",
    title: "No results",
    message: `Nothing matched "${q}". Try a different keyword.`
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 2
    }
  }, items.map(it => /*#__PURE__*/React.createElement(ItemCard, {
    key: it.id,
    item: it,
    onPress: () => onOpenItem(it)
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onReport,
    style: {
      position: 'absolute',
      right: 18,
      bottom: 28,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 20px',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: 'var(--color-primary)',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      boxShadow: 'var(--shadow-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      lineHeight: 1
    }
  }, "\uFF0B"), " Report"));
}

// ── Item details ──────────────────────────────────────────────────────────────
function DetailsScreen({
  item,
  onBack,
  onChat
}) {
  const {
    Badge
  } = CF;
  const isLost = item.type === 'Lost';
  const Row = ({
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: '9px 0',
      borderBottom: '1px solid var(--neutral-100)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)',
      fontWeight: 500
    }
  }, children));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Item Details",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 250,
      background: `center/cover url(${item.imageUrl})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      right: 14
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: isLost ? 'lost' : 'found',
    solid: true,
    dot: true
  }, item.type))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-strong)',
      marginBottom: 4
    }
  }, "Details"), /*#__PURE__*/React.createElement(Row, {
    label: "Location"
  }, "\uD83D\uDCCD ", item.location), /*#__PURE__*/React.createElement(Row, {
    label: "Time"
  }, "\uD83D\uDD52 ", item.time), /*#__PURE__*/React.createElement(Row, {
    label: "Reported by"
  }, "\uD83D\uDC64 ", item.reporterName), /*#__PURE__*/React.createElement(Row, {
    label: "Student"
  }, "\uD83C\uDF93 ", item.reporterClass)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-strong)',
      marginBottom: 6
    }
  }, "Description"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-body)',
      lineHeight: 1.6
    }
  }, item.description)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      background: 'var(--surface-brand-tint)',
      border: '1px solid var(--blue-100)',
      borderRadius: 'var(--radius-md)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--blue-800)',
      lineHeight: 1.5
    }
  }, "For privacy and safety, all contact happens through CampusFinder's secure chat.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 22px 26px',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-subtle)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(CF.Button, {
    variant: "secondary",
    size: "lg",
    fullWidth: true,
    leadingIcon: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCAC"),
    onClick: onChat
  }, "Start Secure Chat")));
}

// ── Report an item ──────────────────────────────────────────────────────────
function ReportScreen({
  onBack,
  onSubmit
}) {
  const {
    Input,
    SegmentedTabs
  } = CF;
  const [type, setType] = React.useState('Found');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Report an Item",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, "Help others by reporting lost or found items around campus."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)',
      marginBottom: 8
    }
  }, "Report Type"), /*#__PURE__*/React.createElement(SegmentedTabs, {
    value: type,
    onChange: setType,
    options: [{
      value: 'Lost'
    }, {
      value: 'Found'
    }]
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Item Name",
    required: true,
    placeholder: "e.g. Blue Backpack, iPhone, Textbook"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Description",
    required: true,
    multiline: true,
    placeholder: "Color, brand, distinguishing features\u2026"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Location",
    required: true,
    leadingIcon: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD"),
    placeholder: "Where was it lost / found?"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)',
      marginBottom: 8
    }
  }, "Add a Photo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      fontWeight: 500
    }
  }, "(optional)")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px dashed var(--blue-300)',
      borderRadius: 'var(--radius-md)',
      padding: '22px',
      textAlign: 'center',
      background: 'var(--surface-brand-tint)',
      color: 'var(--blue-700)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "\uD83D\uDCF7 Select from Photos")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--amber-50)',
      border: '1px solid #F6E2B8',
      borderRadius: 'var(--radius-md)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--amber-600)',
      marginBottom: 6
    }
  }, "\uD83D\uDCDD Before you post"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 12.5,
      color: 'var(--neutral-600)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("li", null, "Be as specific as possible."), /*#__PURE__*/React.createElement("li", null, "Include unique identifying features."), /*#__PURE__*/React.createElement("li", null, "All contact is handled securely in-app."))), /*#__PURE__*/React.createElement(CF.Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onSubmit
  }, "Submit Report")));
}
Object.assign(window, {
  ListScreen,
  DetailsScreen,
  ReportScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/screens-browse.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/screens-chat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, AppBar */
// Chat, Inbox, and Confirmation screens for the CampusFinder UI kit.

const CFc = window.CampusFinderDesignSystem_84dfef;

// ── Chat ────────────────────────────────────────────────────────────────────
function ChatScreen({
  item,
  onBack,
  onEnd
}) {
  const {
    ChatBubble,
    Avatar
  } = CFc;
  const [msgs, setMsgs] = React.useState([{
    mine: true,
    text: `Hi! I'm interested in the ${item.name}. Is it still available?`,
    time: '10:30 AM'
  }, {
    mine: false,
    text: "Yes, it is! Can you describe a detail to verify it's yours?",
    time: '10:32 AM'
  }]);
  const [draft, setDraft] = React.useState('');
  const send = () => {
    if (!draft.trim()) return;
    setMsgs([...msgs, {
      mine: true,
      text: draft,
      time: 'now'
    }]);
    setDraft('');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    title: item.reporterName || 'Chat',
    onBack: onBack,
    right: /*#__PURE__*/React.createElement(Avatar, {
      name: item.reporterName || 'U',
      size: 34
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--teal-300)'
    }
  }, "Secure conversation about \u201C", item.name, "\u201D")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      background: 'var(--surface-page)'
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(ChatBubble, _extends({
    key: i
  }, m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Type your message\u2026",
    onKeyDown: e => e.key === 'Enter' && send(),
    style: {
      flex: 1,
      border: '1.5px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      padding: '11px 16px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      outline: 'none',
      background: 'var(--surface-page)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    style: {
      border: 'none',
      background: 'var(--color-primary)',
      color: '#fff',
      width: 44,
      height: 44,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: 17,
      flexShrink: 0,
      boxShadow: 'var(--shadow-primary)'
    }
  }, "\u27A4")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 14px 20px'
    }
  }, /*#__PURE__*/React.createElement(CFc.Button, {
    variant: "outline",
    size: "sm",
    fullWidth: true,
    onClick: onEnd,
    style: {
      color: 'var(--color-danger)',
      borderColor: 'var(--red-500)'
    }
  }, "End Chat & Mark Resolved"))));
}

// ── Inbox ─────────────────────────────────────────────────────────────────────
function InboxScreen({
  onBack,
  onOpen,
  chats
}) {
  const {
    Avatar
  } = CFc;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    title: "My Chats",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      padding: '8px 16px',
      textAlign: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--teal-300)'
    }
  }, "\uD83D\uDD12 All conversations are end-to-end encrypted")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--surface-card)'
    }
  }, chats.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => onOpen(c),
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: '14px 16px',
      borderBottom: '1px solid var(--neutral-100)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.reporterName,
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, c.reporterName), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-subtle)'
    }
  }, c.last)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-link)',
      fontWeight: 600,
      margin: '2px 0'
    }
  }, "\uD83D\uDCE6 ", c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "\uD83D\uDD12 ", c.preview)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: 'var(--neutral-300)'
    }
  }, "\u203A")))));
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function ConfirmationScreen({
  onDone,
  title = 'Report Submitted!',
  message = 'Your item is now live. We\'ll notify you when someone reaches out.'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 28px',
      textAlign: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: 'var(--color-success-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 46,
      marginBottom: 10
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-muted)',
      lineHeight: 1.5,
      maxWidth: 300
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-brand-tint)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      marginTop: 14,
      textAlign: 'left',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--blue-800)',
      marginBottom: 6
    }
  }, "\uD83D\uDEE1\uFE0F Safety tips"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--blue-800)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("li", null, "Meet in busy, public campus spots."), /*#__PURE__*/React.createElement("li", null, "Verify ownership before handing items over."), /*#__PURE__*/React.createElement("li", null, "Keep all chat inside CampusFinder."))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(CFc.Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onDone
  }, "Back to Items")));
}
Object.assign(window, {
  ChatScreen,
  InboxScreen,
  ConfirmationScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/screens-chat.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.SegmentedTabs = __ds_scope.SegmentedTabs;

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ItemCard = __ds_scope.ItemCard;

__ds_ns.StatBanner = __ds_scope.StatBanner;

})();
