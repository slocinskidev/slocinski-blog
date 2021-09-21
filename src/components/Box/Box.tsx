import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Typography from 'common/Typography';
import Link from 'common/Link';

import './Box.scss';

const Box = ({ children }: { children: ReactNode }) => {
  return <section className="box">{children}</section>;
};

export default Box;
