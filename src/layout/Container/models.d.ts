import { ElementType, ReactNode, RefObject } from 'react';

export interface ContainerProps {
  element?: ElementType;
  className?: string;
  fluid?: boolean;
  innerRef?: RefObject<any>;
  children?: ReactNode;
}
