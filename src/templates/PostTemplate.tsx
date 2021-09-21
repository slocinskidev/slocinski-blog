import * as React from 'react';
import { graphql } from 'gatsby';
import Link from 'common/Link';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';
import Typography from 'common/Typography';

import { PostTemplateProps } from 'types';

import './PostTemplate.scss';

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
          <Typography variant="h2">{PostTemplate.frontmatter.title}</Typography>
          <Typography variant="body3">
            {PostTemplate.frontmatter.date}
          </Typography>
        </header>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={PostTemplate.html}
        />
        <footer>
          <Bio />
        </footer>

        <nav className="post-template__nav">
          <Typography variant="h3" align="center">
            If you are interested, check it out 👇
          </Typography>
          <ul className="nav__list">
            <li>
              {previous && (
                <Link
                  customClass="nav__item"
                  url={previous.fields.slug}
                  ariaLabel="previous post"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  customClass="nav__item"
                  url={next.fields.slug}
                  ariaLabel="next post"
                >
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
    $previousPostId: String
    $nextPostId: String
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
