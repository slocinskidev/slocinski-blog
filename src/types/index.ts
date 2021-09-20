import { ReactNode } from 'react';
import { SeoProps } from 'common/Seo/models.d'

export interface BaseComponentProps {}

type InputSearchType = 'text';

export interface InputSearchProps {
  placeholder?: string;
  ref?: HTMLInputElement;
  type: InputSearchType;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  handler?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export interface IndexPageProps  {
  siteMetadata: 
}