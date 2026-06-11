import React from 'react';

export interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when the clear (✕) button is pressed. */
  onClear?: () => void;
  /** @default "Search…" */
  placeholder?: string;
  style?: React.CSSProperties;
}

/** Search field used atop the item list; shows a clear button when filled. */
export function SearchBar(props: SearchBarProps): JSX.Element;
