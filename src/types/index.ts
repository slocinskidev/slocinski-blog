import { ReactNode } from 'react';
import { SeoProps } from 'common/Seo/models.d';
import { WindowLocation } from '@reach/router';

export interface BaseComponentProps {}

type InputSearchType = 'text';

export interface InputSearchProps {
  placeholder?: string;
  ref?: HTMLInputElement;
  type: InputSearchType;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  handler?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export interface IPost {
  id?: string;
  html?: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    description?: string;
    title: string;
  };
}

type TLocation = WindowLocation;

export interface PostTemplateProps {
  data: {
    site: { siteMetadata: SeoProps };
    markdownRemark: IPost;
    previous: {
      fields: { slug: string };
      frontmatter: {
        title: string;
      };
    };
    next: {
      fields: { slug: string };
      frontmatter: {
        title: string;
      };
    };
  };
  location: TLocation;
}

export interface IndexPageProps {
  data: {
    site: { siteMetadata: SeoProps };
    allMarkdownRemark: {
      nodes: IPost[];
    };
  };
}

export interface IFlatSearchResults {
  excerpt: string;
  slug: string;
  date: string;
  title: string;
}
