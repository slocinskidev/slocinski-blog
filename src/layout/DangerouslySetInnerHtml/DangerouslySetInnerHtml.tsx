import React, { FC } from 'react';

import { Element } from 'layout';

import { DangerouslySetInnerHtmlProps } from './models';

const DangerouslySetInnerHtml: FC<DangerouslySetInnerHtmlProps> = ({ html, element, ...rest }) =>
  html ? (
    <Element element={element || 'div'} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
  ) : null;

export default DangerouslySetInnerHtml;
