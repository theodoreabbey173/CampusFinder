import React from 'react';

/**
 * Button props.
 * @startingPoint section="Core" subtitle="Button variants & sizes" viewport="700x440"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  /** Control height & padding. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Show a spinner and lock the button. */
  loading?: boolean;
  /** Element rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Element rendered after the label. */
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action control for CampusFinder. Brand-blue by default; teal/orange
 * variants tie into the secondary & accent palette.
 *
 * @startingPoint section="Core" subtitle="Button variants & sizes" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
