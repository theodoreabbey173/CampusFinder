import React from 'react';

export interface EmptyStateProps {
  /** Emoji or node shown in the brand-tint circle. @default "📭" */
  icon?: React.ReactNode;
  title: string;
  message?: string;
  /** Optional CTA label; renders a primary button. */
  actionLabel?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

/** Friendly empty / no-results state with optional call to action. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
