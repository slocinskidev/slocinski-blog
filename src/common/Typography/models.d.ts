import { ElementType } from 'react';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'sub-h1'
  | 'sub-h2'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'body6';

export type TypographyGutter = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | number;
export type TypographyAlign = 'inherit' | 'left' | 'center';
export type TypographyLineHeight = 'big' | 'regular' | 'small' | string;

export interface TypographyProps {
  variant: TypographyVariant;
  align?: TypographyAlign;
  component?: ElementType;
  customClass?: string;
  gutterBottom?: TypographyGutter;
  gutterTop?: TypographyGutter;
  gutterLeft?: TypographyGutter;
  gutterRight?: TypographyGutter;
  lineHeight?: TypographyLineHeight;
  bold?: boolean;
  black?: boolean;
  italic?: boolean;
  children?: React.ReactNode;
  dangerouslySetInnerHTML?: string;
}
