'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const mercurius = require('mercurius')

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  const books = [
    {title: "book1"},
    {title: "book2"},
  ]

  const schema = `
      type Book {
        title: String
      }

      type Query {
        books: [Book]
      }
  `
  const resolvers = {
    Query:{
      books: ()=>books
    }
  }

  fastify.register(mercurius,{
    schema,
    resolvers,
    graphiql: true,
  })


  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
