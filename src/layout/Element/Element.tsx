import React, { FC } from 'react';

import { ElementProps } from './models';

const Element: FC<ElementProps> = ({
  element,
  children,
  className,
  dangerouslySetInnerHTML,
  innerRef,
  ...rest
}: ElementProps) => {
  const Component = element;

  return (
    <Component
      {...{
        dangerouslySetInnerHTML,
        className,
        ref: innerRef,
        ...rest,
      }}
    >
      {children}
    </Component>
  );
};

export default Element;
