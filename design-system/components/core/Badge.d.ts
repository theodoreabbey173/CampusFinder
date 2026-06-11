import React from 'react';

export interface BadgeProps {
  /** Semantic tone. Lost→orange, Found→teal. @default "neutral" */
  tone?: 'lost' | 'found' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  /** Show a leading status dot. */
  dot?: boolean;
  /** Filled style (white text on solid color) vs. soft tint. */
  solid?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}

/** Compact status / category label used on item cards and detail screens. */
export function Badge(props: BadgeProps): JSX.Element;
