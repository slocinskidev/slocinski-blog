import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from 'layout';
import Seo from 'common/Seo';
import Articles from 'containers/Articles';
import Typography from 'common/Typography';
import { resultsToArticles } from 'utils/resultsToArticles';
// @ts-ignore
import { useFlexSearch } from 'react-use-flexsearch';

import { IFlatSearchResults, SearchPageProps } from 'types';

import './search.scss';

const SearchPage = ({
  data: {
    localSearchPages: { index, store },
  },
  location: { search },
}: SearchPageProps) => {
  const params = new URLSearchParams(search.slice(1));
  const searchTerm = params.get('q') || '';

  const results: IFlatSearchResults[] = useFlexSearch(searchTerm, index, store);
  const posts = resultsToArticles(results);

  const renderSearchResults = searchTerm ? (
    <Typography customClass="search-results" gutterTop={4} variant="h2">
      Search results: <cite>"{searchTerm}"</cite>
    </Typography>
  ) : (
    <Typography gutterTop={4} variant="h1">
      What are you looking for?
    </Typography>
  );

  const renderArticles = posts.length ? (
    <Articles posts={posts} />
  ) : (
    <Typography variant="body1">There are no results 😥</Typography>
  );

  return (
    <Layout>
      <Seo title="Search results" />
      {renderSearchResults}
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
