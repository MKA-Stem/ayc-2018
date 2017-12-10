import db from './db.js';

const resolvers = {
  Query: {
    async tests(root, args, ctx) {
      // args: {id, url, isp}
      console.log(args)
      const tests = await db('tests')
        .where(args)
        .select('*')
      return tests;
    }
  },

  Mutation: {
    async addTest(root, args, ctx) {
      const result = await db.raw(
        `
        insert into tests as original ( url, isp, latencyavg)
        values ( :url, :isp, :latencyavg)
        returning *;
        `
      ,
        {url: args.url, isp: args.isp, latencyavg: args.latencyavg }
      );

      const record = result.rows[0];
      return {id: record.id, url:record.url, isp:record.isp, latencyavg:record.latencyavg};
    }
  }
};

export default resolvers;
