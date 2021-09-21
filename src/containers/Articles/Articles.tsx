import React from 'react';
import { IPost } from 'types';
import Link from 'common/Link';
import Typography from 'common/Typography';

import './Articles.scss';

const Articles = ({ posts }: { posts: IPost[] }) => {
  const renderArticles = posts
    ? posts.map((post: IPost) => {
        const title = post.frontmatter.title || post.fields.slug;

        return (
          <li key={post.fields.slug}>
            <article
              className="articles__post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <Typography variant="h2">
                  <Link url={post.fields.slug} customClass="post__title">
                    {title}
                  </Link>
                </Typography>
                <Typography variant="body3">{post.frontmatter.date}</Typography>
              </header>
              <section>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={
                    post.frontmatter.description || post.excerpt
                  }
                />
              </section>
            </article>
          </li>
        );
      })
    : null;

  return <ol className="articles">{renderArticles}</ol>;
};

export default Articles;
