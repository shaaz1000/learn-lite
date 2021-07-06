import axios from "axios"

const hostName = "https://www.learnlite.in/api/";
//const hostName = "https://edulite.com360degree.com/api/";

const APICaller = (endpoint,body,method,token) =>
{
  const header = { 
    Accept: 'application/json, text/plain,text/html */*',
    'Content-Type': 'application/json',
  }
if(token){
  header.Authorization = `Bearer ${JSON.parse(token)}`
}
 return axios({
    url: hostName + endpoint,
    method: method || 'GET',
    data: body,
    headers:header,

    responseType: 'json',
  })
    .then(response => {
      // console.log(`response from ${endpoint} >> ${response}`);
      return response;
    })
    .catch(error => {
      // console.log(`Error from ${endpoint} >> ${error}`);
      throw error.response;
    });

  }
export default APICaller;
