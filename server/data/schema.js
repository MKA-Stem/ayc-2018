import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers.js';

const typeDefs = `

type Query {
  # Get the average latency for a URL
  average(url:String): Test
}

type Mutation {
  # Adds a test to the database
  addTest(url: String!, isp: String, latencyavg: Float!): Test!
}

type Test{

  # Database ID of the test
  id: ID!

  # URL being tested.
  url: String!

  # Something representing the ISP of the tester
  isp: String

  # Average latency to website, in ms
  latencyavg: Float!
}

`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
