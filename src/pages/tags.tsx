import React from 'react';
import { Layout } from 'layout';
import Typography from 'common/Typography';
import Seo from 'common/Seo';
import Link from 'common/Link';

import { TagsPageProps, ITagsGroup } from 'types';

import _ from 'lodash';

import { graphql } from 'gatsby';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}: TagsPageProps) => {
  const renderTags = group.map(({ fieldValue, totalCount }: ITagsGroup) => (
    <li key={fieldValue}>
      <Link url={`/tags/${_.kebabCase(fieldValue)}/`}>
        {fieldValue} ({totalCount})
      </Link>
    </li>
  ));
  console.log(group);

  return (
    <Layout>
      <Seo title={title} />
      <Typography variant="h2" gutterTop={4}>
        Tags
      </Typography>
      <ul>{renderTags}</ul>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
