import { ElementType, ReactNode, RefObject } from 'react';

export interface ElementProps {
  element: ElementType;
  children?: ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  innerRef?: RefObject<any>;
}
