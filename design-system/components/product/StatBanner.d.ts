import React from 'react';

export interface StatBannerProps {
  total?: number;
  lost?: number;
  found?: number;
  style?: React.CSSProperties;
}

/** Summary banner showing Total / Lost / Found counts above the item list. */
export function StatBanner(props: StatBannerProps): JSX.Element;
