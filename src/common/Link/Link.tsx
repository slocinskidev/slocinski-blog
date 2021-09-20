import React, { FC } from 'react';
import { Link as InternalLink } from 'gatsby';
import classNames from 'classnames';

import { LinkProps } from './models';

import './Link.scss';

const Link: FC<LinkProps> = ({
  children,
  url,
  variant = 'regular',
  ariaLabel,
  customClass,
  activeClass,
  ...rest
}) => {
  const linkClassnames = classNames('link', customClass, {
    [`link--${variant}`]: variant,
  });

  const isInternal = /^\/(?!\/)/.test(url);

  const renderLink = isInternal ? (
    <InternalLink
      className={linkClassnames}
      activeClassName={activeClass}
      aria-label={ariaLabel}
      to={url}
      {...rest}
    >
      {children}
    </InternalLink>
  ) : (
    <a className={linkClassnames} aria-label={ariaLabel} href={url} {...rest}>
      {children}
    </a>
  );

  return renderLink;
};

export default Link;
