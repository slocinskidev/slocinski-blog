const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const striptags = require(`striptags`);
const lunr = require(`lunr`);
const { GraphQLJSONObject } = require('graphql-type-json');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(
    `./src/templates/PostTemplate/PostTemplate.tsx`,
  );
  const tagTemplate = path.resolve(
    './src/templates/TagTemplate/TagTemplate.tsx',
  );

  const result = await graphql(`
    {
      postsRemark: allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.postsRemark.nodes;

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

  const tags = result.data.tagsGroup.group;

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
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

    type postsRemark implements Node {
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
            type: `Mdx`,
          });
          const type = info.schema.getType(`Mdx`);
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
    const [body, excerpt] = await Promise.all([
      type.getFields().body.resolve(node),
      type.getFields().excerpt.resolve(node, { pruneLength: 40 }),
    ]);
    documents.push({
      slug,
      title: node.frontmatter.title,
      content: striptags(body),
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
