import React from 'react';

export default async function callApi(latitude, longitude) {
  const resp = await fetch(
    'https://openstates.org/api/v1/legislators/geo/?lat=' + latitude + '&long=' + longitude
  );
  const json = await result.json();
  console.log(json);
  return null;
}
