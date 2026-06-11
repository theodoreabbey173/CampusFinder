import React from 'react';

export interface AvatarProps {
  /** Display name — first letter becomes the fallback initial. */
  name?: string;
  /** Optional image URL; falls back to a colored initial. */
  src?: string | null;
  /** Diameter in px. @default 44 */
  size?: number;
  style?: React.CSSProperties;
}

/** Round user avatar with a deterministic brand color per initial. */
export function Avatar(props: AvatarProps): JSX.Element;
