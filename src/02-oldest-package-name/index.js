/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

 const axios = require('axios');

module.exports = async function oldestPackageName() {
  // TODO
   const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      "url": "https://api.npms.io/v2/search/suggestions?q=react",
      "method": "GET",
      "return_payload": true
   })
      
   const { content } = res.data;
   let dates = [];

   content.forEach(obj => {

     let date = new Date(obj.package.date);

     // convert date to milisecond format
      const dateMS = date.getTime();

      // push formatted date to dates arr
      dates.push(dateMS);
   })

   // sort dates in ascending order & get last element in dates arr
   const oldDate = dates.sort((a, b) => b - a ).pop();

   // convert oldDate back to ISO format
   const oldDateISO = new Date(oldDate).toISOString();

   // find package with oldest date
   const matchingObj = content.find((obj) => obj.package.date === oldDateISO);

   // return package name
   return matchingObj.package.name;
};
