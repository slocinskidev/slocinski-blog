import React, { useState, useEffect } from 'react';
import { ArticlesProps, IPost, TLocation } from 'types';
import Link from 'common/Link';
import Tags from 'common/Tags';
import Typography from 'common/Typography';
import { isBrowser } from 'utils/isBrowser';
//@ts-ignore
import { CommentCount } from 'gatsby-plugin-disqus';
import { disqusConfigCreator } from 'utils/config';

import './Articles.scss';

const Articles = ({ posts }: ArticlesProps) => {
  const [pathname, setPathname] = useState<string>('');
  const renderArticles = posts
    ? posts.map((post: IPost) => {
        const {
          excerpt,
          frontmatter: { title: frontmatterTitle, date, description, tags },
          fields: { slug },
          timeToRead,
          id,
        } = post;

        useEffect(() => {
          if (isBrowser()) {
            setPathname(window.location.pathname);
          }
        }, [pathname]);

        const title = frontmatterTitle || slug;

        const disqusConfig = disqusConfigCreator(pathname, id, title);

        return (
          <li key={slug}>
            <article
              className="articles__post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header className="post__header">
                <Typography variant="h2">
                  <Link url={slug} customClass="post__title">
                    {title}
                  </Link>
                </Typography>
                <section className="post__info">
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
                </section>
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
