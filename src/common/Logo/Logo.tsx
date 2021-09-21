import React, { FC } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';
import { ROOT_PATH } from 'utils/constants';

import { ILogo } from './models';

const Logo: FC<ILogo> = ({ customClass }) => {
  const logoLinkClassnames = classNames('logo', customClass);

  return (
    <Link className={logoLinkClassnames} to={ROOT_PATH}>
      <StaticImage
        src="../../images/logo.png"
        alt="Logo"
        placeholder="blurred"
      />
    </Link>
  );
};

export default Logo;
