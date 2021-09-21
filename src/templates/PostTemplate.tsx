import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';

import { PostTemplateProps } from 'types';

const PostTemplate = ({ data }: PostTemplateProps) => {
  const PostTemplate = data.markdownRemark;
  const { previous, next } = data;

  return (
    <Layout>
      <Seo
        title={PostTemplate.frontmatter.title}
        description={
          PostTemplate.frontmatter.description || PostTemplate.excerpt
        }
      />
      <article
        className="post-template"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1>{PostTemplate.frontmatter.title}</h1>
          <p>{PostTemplate.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: PostTemplate.html }} />
        <hr />
        <footer>
          <Bio />
        </footer>

        <nav className="post-template__nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </article>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostTemplateBySlug(
    $id: String!
    $previousPostTemplateId: String
    $nextPostTemplateId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostTemplateId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostTemplateId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
