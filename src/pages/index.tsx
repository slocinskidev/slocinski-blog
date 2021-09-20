import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';

import { IndexPageProps, IPost } from 'types';

const BlogIndex = ({ data: { site, allMarkdownRemark } }: IndexPageProps) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
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
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: IPost) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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
