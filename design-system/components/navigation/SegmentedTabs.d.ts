import React from 'react';

export interface SegmentOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  /** Optional count chip. */
  count?: number;
  /** Override the active fill color. */
  color?: string;
}

export interface SegmentedTabsProps {
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Pill segmented control used to filter the item list (All / Lost / Found). */
export function SegmentedTabs(props: SegmentedTabsProps): JSX.Element;
