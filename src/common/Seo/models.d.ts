export interface SeoProps {
  description?: string;
  lang?: string;
  meta?: Meta;
  title: string;
}

type Meta = ConcatArray<PropertyMetaObj | NameMetaObj>;

type PropertyMetaObj = {
  property: string;
  content: string;
};

type NameMetaObj = {
  name: string;
  content: string;
};

export interface SeoQuery {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      social: {
        twitter: string;
      };
    };
  };
}
