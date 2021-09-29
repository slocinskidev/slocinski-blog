import React from 'react';
import { TagTemplateProps } from 'types';
import Link from 'common/Link';
import Typography from 'common/Typography';
import Articles from 'containers/Articles';
import { Layout } from 'layout';
import { TAG_SEPARATOR } from 'utils/constants';

import { graphql } from 'gatsby';

import './TagTemplate.scss';

const TagTemplate = ({
  pageContext: { tag },
  data: {
    allMarkdownRemark: { nodes: posts, totalCount },
  },
}: TagTemplateProps) => {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <section className="tag-template">
        <Typography variant="h2" gutterBottom={4}>
          {tagHeader}
        </Typography>
        <Articles posts={posts} />

        <Link
          customClass="tag-template__link"
          variant="tag"
          url={TAG_SEPARATOR}
        >
          All tags
        </Link>
      </section>
    </Layout>
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
        excerpt
        fields {
          slug
        }
        id
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`;
