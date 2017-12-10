import React from 'react';

export default async function callApi(latitude, longitude) {
  const resp = await fetch(
    'https://openstates.org/api/v1/legislators/geo/?lat=' + latitude + '&long=' + longitude
  );
  const json = await result.json();
  const fistName = json.first_name;
  const lastName = json.last_name;
  const email = json.email;
  console.log(fistName + " " + lastName + ": " + email);
  return null;
}
