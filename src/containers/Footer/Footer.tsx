import React from 'react';
import Link from 'common/Link';
import { FOOTER_URL, FOOTER_TEXT } from 'utils/constants';
import Logo from 'common/Logo';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <Logo customClass="footer__logo" />
      <Link customClass="footer__link" url={FOOTER_URL}>
        {FOOTER_TEXT}
      </Link>
    </footer>
  );
};

export default Footer;
