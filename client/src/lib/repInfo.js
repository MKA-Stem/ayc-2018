export async function repInfo(state) {
  const response = await fetch(
    "https://api.propublica.org/congress/v1/members/senate/" +
      state +
      "/current.json",
    {
      mode: "cors",
      headers: { "X-API-Key": "HYJ3Bckf6gusHxa6eQAc7GPP875hlFALzRUeOsFs" }
    }
  );
  let reps = await response.json();
  reps = reps.results;
  const ids = [];
  for (let rep of reps) {
    ids.push(rep.id);
  }

  const results = [];
  for (let id of ids) {
    const senatorResponse = await fetch(
      "https://api.propublica.org/congress/v1/members/" + id + ".json",
      {
        mode: "cors",
        headers: { "X-API-Key": "HYJ3Bckf6gusHxa6eQAc7GPP875hlFALzRUeOsFs" }
      }
    );
    let senatorInfo = await senatorResponse.json();
    senatorInfo = senatorInfo.results[0];

    results.push({
      firstName: senatorInfo.first_name,
      lastName: senatorInfo.last_name,
      contact: senatorInfo.roles[0].phone
    });
  }
  return results;
}
