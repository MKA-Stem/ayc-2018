import db from './db.js';

const resolvers = {
  Query: {
    async average(root, args, ctx) {
      // args: {url}
      const query = await db.raw(
        `
        SELECT num, total, url, id 
        FROM averages 
        WHERE url=:url;
        `,
        {url: args.url}
      );
      const result = query.rows[0];
      console.log(result);

      if (typeof result === 'undefined') {
        return null;
      } else {
        return {
          id: result.id,
          url: result.url,
          isp: result.isp,
          latencyavg: result.total / result.num
        };
      }
    }
  },

  Mutation: {
    async addTest(root, args, ctx) {
      const result = await db.raw(
        `
        insert into averages as original ( url, num, total)
        values ( :url, 1, :latencyavg)
        on conflict (url) do update set
          total = original.total + excluded.total,
          num = original.num + excluded.num
        returning *;
        `,
        {url: args.url, isp: args.isp, latencyavg: args.latencyavg}
      );

      const record = result.rows[0];

      console.log(record);
      return {
        id: record.id,
        url: record.url,
        isp: record.isp,
        latencyavg: record.total / record.num
      };
    }
  }
};

export default resolvers;
