import { ElementType, RefObject } from 'react';

export interface DangerouslySetInnerHtmlProps {
  html?: string;
  element?: ElementType;
  className?: string;
  onClick?: (any) => any;
  innerRef?: RefObject<any>;
}
