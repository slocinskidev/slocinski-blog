import React from 'react';
import Link from 'common/Link';
import classNames from 'classnames';
import { TAG_SEPARATOR } from 'utils/constants';

import { ITags } from './models';

import './Tags.scss';

const Tags = ({ tags, tagSeparator = TAG_SEPARATOR, customClass }: ITags) => {
  const tagsClassnames = classNames('tags', customClass);

  const renderTags = tags?.map((tag: string) => (
    <li key={tag}>
      <Link variant="tag" url={`${tagSeparator}${tag}`}>
        {tag}
      </Link>
    </li>
  ));

  return <ul className={tagsClassnames}>{renderTags}</ul>;
};

export default Tags;
