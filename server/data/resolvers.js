import db from './db.js';

const resolvers = {
  Query: {
    async tests(root, args, ctx) {
      // args: {id, url, isp}
      const tests = await db('tests')
        .where(args)
        .select('*')
      return tests;
    },
    async average(root, args, ctx) {
      // args: {url}
      const query = await db.raw(
        `SELECT AVG(latencyavg) as latencyavg, url FROM tests WHERE url=:url GROUP BY url;`,
        {url: args.url}
      );
      const result = query.rows[0];
      console.log(result);
      return result;
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
