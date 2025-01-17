'use strict'
const path = require('path')

require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.createPages = require('./gatsby-create-pages').createPages
exports.onCreateWebpackConfig = ({ actions }) => {
  // lets us import components into mdx files
  // https://github.com/ChristopherBiscardi/gatsby-mdx/issues/176#issuecomment-429569578
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    'type Mdx implements Node { frontmatter: Frontmatter }',
    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        author: {
          type: 'AuthorJson',
          resolve: (source, args, context, info) => {
            // If you were linking by ID, you could use `getNodeById` to
            // find the correct author:
            return context.nodeModel.getNodeById({
              id: source.author,
              type: 'AuthorJson',
            })
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}
