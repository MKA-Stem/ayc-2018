export async function repInfo(latitude, longitude) {
  const response = await fetch(
    'https://openstates.org/api/v1/legislators/geo/?lat=' +
      latitude +
      '&long=' +
      longitude +
      '&apikey=cf0a3c81-4d18-4a7b-a8b7-db9d2a299094'
  );
  const reps = await response.json();
  const result = {};
  for (let rep of reps) {
    result[rep.chamber] = {
      lastName: rep.last_name,
      firstName: rep.first_name,
      contact: rep.offices[0].phone ? rep.offices[0].phone : rep.offices[0].email
    };
  }
  return result;
}
