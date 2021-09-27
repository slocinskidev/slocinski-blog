import React from 'react';
import { ArticlesProps, IPost } from 'types';
import Link from 'common/Link';
import Typography from 'common/Typography';
//@ts-ignore
import { CommentCount } from 'gatsby-plugin-disqus';
import { disqusConfigCreator } from 'utils/config';

import './Articles.scss';

const Articles = ({ posts }: ArticlesProps) => {
  const renderArticles = posts
    ? posts.map((post: IPost) => {
        const {
          excerpt,
          frontmatter: { title: frontmatterTitle, date, description },
          fields: { slug },
          id,
        } = post;

        const title = frontmatterTitle || slug;
        const { pathname } = location;
        const disqusConfig = disqusConfigCreator(pathname, id, title);

        return (
          <li key={slug}>
            <article
              className="articles__post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <Typography variant="h2">
                  <Link url={slug} customClass="post__title">
                    {title}
                  </Link>
                </Typography>
                <CommentCount
                  config={disqusConfig}
                  placeholder={'No comments...'}
                />
                <Typography variant="body3">{date}</Typography>
              </header>
              <section>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={description || excerpt}
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
