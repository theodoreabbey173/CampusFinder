import React from 'react';

export interface LostFoundItem {
  name: string;
  type: 'Lost' | 'Found';
  location: string;
  time: string;
  description?: string;
  imageUrl?: string;
  reporterName?: string;
  isNew?: boolean;
}

/**
 * Item card props.
 * @startingPoint section="Product" subtitle="Lost & found item row" viewport="700x520"
 */
export interface ItemCardProps {
  item: LostFoundItem;
  onPress?: () => void;
  style?: React.CSSProperties;
}

/** Lost & found list row — the signature CampusFinder component. */
export function ItemCard(props: ItemCardProps): JSX.Element;
