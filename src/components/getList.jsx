import CustomizedHook from "./box"
export default function GetList(props) {

  return fetch('https://restcountries.eu/rest/v2/lang/es')
    .then(data => data.json())
}
