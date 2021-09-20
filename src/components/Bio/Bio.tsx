import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
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
        src="../images/avatar.png"
        width={100}
        height={100}
        quality={100}
        alt="Profile picture"
      />
      {author?.name && (
        <p className="bio__description">
          I am <strong>{author.name}</strong> - {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            Follow me on Twitter! 🚀
          </a>
        </p>
      )}
    </section>
  );
};

export default Bio;
