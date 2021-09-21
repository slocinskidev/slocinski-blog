import React from 'react';
import { Link, graphql } from 'gatsby';
import { Index } from 'lunr';
import { Layout } from 'layout';
import SEO from 'common/Seo';
import { IndexPageProps } from 'types';

const SearchPage = ({ data, location }: any) => {
  const params = new URLSearchParams(location.search.slice(1));
  const q = params.get('q') || '';

  console.log(data);

  const { store } = data.LunrIndex;
  const index = Index.load(data.LunrIndex.index);
  let results = [];
  try {
    results = index.search(q).map(({ ref }) => {
      return {
        slug: ref,
        ...store[ref],
      };
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <Layout>
      <SEO title="Search results" />
      {q ? <h1>Search results</h1> : <h1>What are you looking for?</h1>}
      {results.length ? (
        results.map((result) => {
          return (
            <article key={result.slug}>
              <h2>
                <Link to={result.slug}>{result.title || result.slug}</Link>
              </h2>
              <p>{result.excerpt}</p>
            </article>
          );
        })
      ) : (
        <p>Nothing found.</p>
      )}
    </Layout>
  );
};
export default SearchPage;
export const pageQuery = graphql`
  query Search {
    LunrIndex
  }
`;
