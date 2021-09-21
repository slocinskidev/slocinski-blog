import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';
import Articles from 'containers/Articles';

import { IndexPageProps } from 'types';

const BlogIndex = ({ data: { allMarkdownRemark } }: IndexPageProps) => {
  const posts = allMarkdownRemark.nodes;

  if (!posts.length) {
    return (
      <Layout>
        <Seo title="All posts" />
        <Bio />
        <p>No blog posts found.</p>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
