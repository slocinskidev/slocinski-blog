import React from 'react';
import { graphql } from 'gatsby';
import Link from 'common/Link';

import Bio from 'components/Bio';
import Layout from 'layout/Layout';
import Seo from 'common/Seo';
import Typography from 'common/Typography';
import Tags from 'common/Tags';
//@ts-ignore
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { disqusConfigCreator } from 'utils/config';

import { PostTemplateProps } from 'types';

import './PostTemplate.scss';

const PostTemplate = ({ data, location: { pathname } }: PostTemplateProps) => {
  const post = data.markdownRemark;
  const {
    excerpt,
    html,
    id,
    timeToRead,
    frontmatter: { date, description, title, tags },
  } = post;
  const { previous, next } = data;

  const disqusConfig = disqusConfigCreator(pathname, id, title);

  const renderPostNav =
    previous || next ? (
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
    ) : null;

  return (
    <Layout>
      <Seo title={title} description={description || excerpt} />
      <article
        className="post-template"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="post-template__info">
          <Typography variant="h2">{title}</Typography>
          <Typography italic variant="body4">
            {date}
          </Typography>
          <Typography italic variant="body4">
            Time to read: {timeToRead}min
          </Typography>
          <Typography italic variant="body4" gutterBottom={2}>
            <CommentCount config={disqusConfig} placeholder={'...'} />
          </Typography>
          <Tags tags={tags} />
        </header>
        <Typography
          customClass="post-template__text"
          variant="body3"
          dangerouslySetInnerHTML={html}
        />
        <footer>
          <Bio />
        </footer>
        {renderPostNav}
        <Disqus config={disqusConfig} />
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
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
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
