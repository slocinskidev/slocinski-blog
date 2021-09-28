import React from 'react';
import { TagTemplateProps, IPost } from 'types';
import Link from 'common/Link';

import { graphql } from 'gatsby';

const TagTemplate = ({
  pageContext: { tag },
  data: {
    allMarkdownRemark: { nodes, totalCount },
  },
}: TagTemplateProps) => {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  const renderPosts = nodes?.map(
    ({ fields: { slug }, frontmatter: { title } }: IPost) => {
      return (
        <li key={slug}>
          <Link url={slug}>{title}</Link>
        </li>
      );
    },
  );

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>{renderPosts}</ul>
      <Link url="/tags">All tags</Link>
    </div>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
