import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers.js";

const typeDefs = `

type Query {
  # Gets a specific set of tests
  tests(id: String, url:String, isp: String, latencyavg: Float): [Test]

  average(url:String): Average
}

type Mutation {
  # Adds a test to the database
  addTest(url: String!, isp: String, latencyavg: Float): Test!
}

type Average{
  url: String!
  latencyavg: Float!
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

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
