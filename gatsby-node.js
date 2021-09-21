const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const striptags = require(`striptags`);
const lunr = require(`lunr`);
const { GraphQLJSONObject } = require('graphql-type-json');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/PostTemplate.tsx`);

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          slug: post.fields.slug,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};

exports.createResolvers = ({ cache, createResolvers }) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: (source, args, context, info) => {
          const blogNodes = context.nodeModel.getAllNodes({
            type: `MarkdownRemark`,
          });
          const type = info.schema.getType(`MarkdownRemark`);
          return createIndex(blogNodes, type, cache);
        },
      },
    },
  });
};

const createIndex = async (blogNodes, type, cache) => {
  const cacheKey = `IndexLunr`;
  const cached = await cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const documents = [];
  const store = {};
  for (const node of blogNodes) {
    const { slug } = node.fields;
    const title = node.frontmatter.title;
    const [html, excerpt] = await Promise.all([
      type.getFields().html.resolve(node),
      type.getFields().excerpt.resolve(node, { pruneLength: 40 }),
    ]);
    documents.push({
      slug,
      title: node.frontmatter.title,
      content: striptags(html),
    });

    store[slug] = {
      title,
      excerpt,
    };
  }
  const index = lunr(function () {
    this.ref('slug');
    this.field('title');
    this.field('content');
    for (const doc of documents) {
      this.add(doc);
    }
  });

  const json = { index: index.toJSON(), store };
  await cache.set(cacheKey, json);
  return json;
};
