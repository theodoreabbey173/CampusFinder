import React from 'react';

export interface InputProps {
  /** Field label rendered above the control. */
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** @default "text" */
  type?: string;
  /** Icon shown inside the field on the left. */
  leadingIcon?: React.ReactNode;
  /** Error message — turns the border red and shows the text below. */
  error?: string | null;
  /** Helper text shown below when there's no error. */
  helper?: string | null;
  /** Render a multi-line textarea. */
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Text / textarea field with label, focus ring, and error states. */
export function Input(props: InputProps): JSX.Element;
