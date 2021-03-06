import db from './db.js';
import fetch from 'node-fetch';

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
    },

    async senatorsForRequestIP(root, args, ctx) {

      const ipResponse = await fetch('http://ip-api.com/json/' + ctx.ip);
      const ans = await ipResponse.json();

      const senResponse = await fetch(
        "https://api.propublica.org/congress/v1/members/senate/" +
          ans.region +
          "/current.json",
        {
          mode: "cors",
          headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY }
        }
      );
      let reps = await senResponse.json();
      reps = reps.results;
      const ids = [];
      for (let rep of reps) {
        ids.push(rep.id);
      }
    
      const results = [];
      for (let id of ids) {
        const specSenResponse = await fetch(
          "https://api.propublica.org/congress/v1/members/" + id + ".json",
          {
            mode: "cors",
            headers: { "X-API-Key": process.env.PROPUBLICA_API_KEY }
          }
        );
        let senatorInfo = await specSenResponse.json();
        senatorInfo = senatorInfo.results[0];
    
        results.push({
          firstname: senatorInfo.first_name,
          lastname: senatorInfo.last_name,
          contact: senatorInfo.roles[0].phone
        });
      }
      return results;
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
