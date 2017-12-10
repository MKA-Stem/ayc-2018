import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers.js';

const typeDefs = `

type Query {
  # Gets a specific set of tests
  test(url:String): [Test]
}

type Mutation {
  # Sets the current user's message.
  addTest(url: String!, isp: String, latencyAvg: Float): Test!
}

type Test{
  id ID!,
  url: String!
  isp: String
  latencyAvg: Float!
}

`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
