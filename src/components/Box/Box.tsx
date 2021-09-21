import React, { ReactNode } from 'react';

import './Box.scss';

const Box = ({ children }: { children: ReactNode }) => {
  return <section className="box">{children}</section>;
};

export default Box;
