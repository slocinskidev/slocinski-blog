import React from 'react';
import { graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';
import Articles from 'containers/Articles';
import Typography from 'common/Typography';

import { IndexPageProps } from 'types';

const BlogIndex = ({ data: { allMdx } }: IndexPageProps) => {
  const posts = allMdx.nodes;

  if (!posts.length) {
    return (
      <Layout>
        <Seo title="No blog posts found" />
        <Bio />
        <Typography variant="body2">No blog posts found.</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title="All posts" />
      <Bio />
      <Articles posts={posts} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query Articles {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
