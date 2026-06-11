import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Drop shadow depth. @default "md" */
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Apply default inner padding. @default true */
  padded?: boolean;
  /** Optional left accent stripe: "lost" | "found" | "primary" | "teal" | any CSS color. */
  accent?: string | null;
  children?: React.ReactNode;
}

/** Base white surface — the container for items, stats, and content blocks. */
export function Card(props: CardProps): JSX.Element;
