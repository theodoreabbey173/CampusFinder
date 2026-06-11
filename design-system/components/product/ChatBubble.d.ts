import React from 'react';

export interface ChatBubbleProps {
  text: string;
  time?: string;
  /** Right-aligned brand-blue bubble for the current user. */
  mine?: boolean;
  style?: React.CSSProperties;
}

/** One message bubble in the secure chat thread. */
export function ChatBubble(props: ChatBubbleProps): JSX.Element;
