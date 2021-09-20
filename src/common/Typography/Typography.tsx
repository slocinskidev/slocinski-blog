import React, { FC } from 'react';
import classNames from 'classnames';

import { DangerouslySetInnerHtml } from 'layout';

import { TypographyProps } from './models';
import { variantToComponentMapping } from './utils';

import './Typography.scss';

const Typography: FC<TypographyProps> = ({
  component,
  customClass,
  variant,
  align,
  gutterBottom,
  gutterTop,
  gutterLeft,
  gutterRight,
  lineHeight,
  bold,
  black,
  italic,
  dangerouslySetInnerHTML,
  children,
}) => {
  const Component = component || variantToComponentMapping[variant];

  const componentClasses = classNames('typography', customClass, {
    [`typography--${variant}`]: variant,
    [`typography--gutter-bottom-${gutterBottom}`]: gutterBottom,
    [`typography--gutter-top-${gutterTop}`]: gutterTop,
    [`typography--gutter-left-${gutterLeft}`]: gutterLeft,
    [`typography--gutter-right-${gutterRight}`]: gutterRight,
    [`typography--line-height-${lineHeight}`]: lineHeight,
    [`typography--${align}`]: align,
    'typography--bold': bold,
    'typography--black': black,
    'typography--italic': italic,
  });

  const render = dangerouslySetInnerHTML ? (
    <DangerouslySetInnerHtml
      element={component}
      data-testid="typography"
      className={componentClasses}
      html={dangerouslySetInnerHTML}
    />
  ) : (
    <Component data-testid="typography" className={componentClasses}>
      {children}
    </Component>
  );

  return render;
};

export default Typography;
