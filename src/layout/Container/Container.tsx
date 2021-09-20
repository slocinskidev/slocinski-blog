import React, { FC } from 'react';
import classnames from 'classnames';

import { Element } from 'layout';

import { ContainerProps } from './models';

const CONTAINER_CLASS_NAME = 'container';

const Container: FC<ContainerProps> = ({
  element,
  className,
  fluid,
  innerRef,
  children,
  ...rest
}) => (
  <Element
    element={element || 'div'}
    className={classnames(CONTAINER_CLASS_NAME, className, {
      [`${CONTAINER_CLASS_NAME}--fluid`]: fluid,
    })}
    innerRef={innerRef}
    {...rest}
  >
    {children}
  </Element>
);

export default Container;
