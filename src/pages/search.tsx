import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from 'layout';
import Seo from 'common/Seo';
import Articles from 'containers/Articles';
import Typography from 'common/Typography';
// @ts-ignore
import { useFlexSearch } from 'react-use-flexsearch';

import { IPost } from 'types';

import './search.scss';

const SearchPage = ({
  data: {
    localSearchPages: { index, store },
  },
  location,
}: any) => {
  const params = new URLSearchParams(location.search.slice(1));
  const searchTerm = params.get('q') || '';

  const results: any[] = useFlexSearch(searchTerm, index, store);

  const resultsToPost: IPost[] = results.map((result) => ({
    excerpt: result.excerpt,
    fields: {
      slug: result.slug,
    },
    frontmatter: {
      date: result.date,
      title: result.title,
    },
  }));

  const renderArticles = resultsToPost.length ? (
    <Articles posts={resultsToPost} />
  ) : (
    <Typography variant="body1">There are no results 😥</Typography>
  );

  return (
    <Layout>
      <Seo title="Search results" />
      {searchTerm ? (
        <Typography customClass="search-results" gutterTop={4} variant="h2">
          Search results: <cite>"{searchTerm}"</cite>
        </Typography>
      ) : (
        <Typography gutterTop={4} variant="h1">
          What are you looking for?
        </Typography>
      )}

      {renderArticles}
    </Layout>
  );
};
export default SearchPage;

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
  }
`;
