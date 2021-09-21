import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Typography from 'common/Typography';

import './Bio.scss';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <section className="bio">
      <StaticImage
        className="bio__avatar"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../../images/avatar.png"
        width={100}
        height={100}
        quality={100}
        alt="Profile picture"
      />
      {author?.name && (
        // <Typography variant="h2" customClass="bio__description">
        <p className="bio__description">
          My name is <strong>{author.name}</strong> and I am{' '}
          {author?.summary || null}. {` `}You can also follow me on Twitter{' '}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            Follow me on Twitter! 🚀
          </a>
        </p>
        // </Typography>
      )}
    </section>
  );
};

export default Bio;
