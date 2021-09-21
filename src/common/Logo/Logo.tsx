import React, { FC } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import { ROOT_PATH } from 'utils/constants';

import { ILogo } from './models';

const Logo: FC<ILogo> = ({
  customClass,
  secondary,
  alt = 'logo',
  to = ROOT_PATH,
}) => {
  const logoLinkClassnames = classNames('logo', customClass);

  const renderLogo = secondary ? (
    <StaticImage
      src="../../images/logo-secondary.png"
      alt={alt}
      placeholder="blurred"
    />
  ) : (
    <StaticImage src="../../images/logo.png" alt={alt} placeholder="blurred" />
  );

  return (
    <Link className={logoLinkClassnames} to={to}>
      {renderLogo}
    </Link>
  );
};

export default Logo;
