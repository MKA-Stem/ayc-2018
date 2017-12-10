import React from 'react';

export default function callApi(latitude, longitude){
    fetch('https://openstates.org/api/v1/legislators/geo/?lat='+latitude+'&long='+longitude)
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
      console.log(jsonResult);
    });
  return null;
}
