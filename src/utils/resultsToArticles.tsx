import { IPost, IFlatSearchResults } from 'types';

type TArticleMutation = (results: IFlatSearchResults[]) => IPost[];

export const resultsToArticles: TArticleMutation = (
  results: IFlatSearchResults[],
) =>
  results.map(({ excerpt, slug, date, title }): IPost => {
    return {
      excerpt: excerpt,
      fields: {
        slug: slug,
      },
      frontmatter: {
        date: date,
        title: title,
      },
    };
  });
