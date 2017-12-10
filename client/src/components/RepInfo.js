export class RepInfo extends React.Component {
  callApi(){
    fetch('https://openstates.org/api/v1/legislators/?state=ny')
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
      console.log(jsonResult);
    })
  }
}

export default RepInfo
