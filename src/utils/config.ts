export const disqusConfigCreator = (
  pathname: string,
  id: string,
  title: string,
) => {
  return {
    url: `https://slocinski-blog.netlify.app${pathname}`,
    identifier: id,
    title: title,
  };
};
