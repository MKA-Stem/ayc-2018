import Datetime from './Datetime.js';
import db from './db.js';

let lastId = 6;
const fakes = [
  {id: 0, url: 'fake1.com', isp: 'fakecast', latencyAvg: 5.21},
  {id: 1, url: 'fake2.com', isp: 'fakecast', latencyAvg: 5.71},
  {id: 2, url: 'fake3.com', isp: 'fakecast', latencyAvg: 2.91},
  {id: 3, url: 'fake4.com', isp: 'fakecast', latencyAvg: 9.11},
  {id: 4, url: 'fake5.com', isp: 'faket&t', latencyAvg: 4.21},
  {id: 5, url: 'fake6.com', isp: 'fakecast', latencyAvg: 5.29},
  {id: 6, url: 'fake7.com', isp: 'faket&t', latencyAvg: 1.01}
];

const resolvers = {
  Query: {
    async tests(root, args, ctx) {
      // args: {id, url, isp}
      return fakes
        .filter(e => !args.id || args.id == e.id)
        .filter(e => !args.url || args.url == e.url)
        .filter(e => !args.isp || args.isp == e.isp);
    }
  },

  Mutation: {
    async addTest(root, args, ctx) {
      const record = {
        id: lastId++,
        url: args.url,
        isp: args.isp,
        latencyAvg: args.latencyAvg
      };

      fakes.push(record);
      return record;
    }
  }
};

export default resolvers;
