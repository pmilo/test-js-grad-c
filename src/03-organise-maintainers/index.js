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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const axios = require('axios');

module.exports = async function organiseMaintainers() {
  // TODO
  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
   "url": "https://api.npms.io/v2/search/suggestions?q=react",
   "method": "GET",
   "return_payload": true
})

const { content } = res.data;
let users = [];
let maintainers = [];


// gather all maintainers/users from all packages
content.forEach(obj => {
   obj.package.maintainers.forEach(maintainer => {

      // push maintainer obj to users array if NOT already present
      if(!users.some(user => user.username === maintainer.username)) users.push(maintainer);
   });
});

// loop over users arr
users.forEach(user => {
   let packageNames = [];

   // gather packages maintained by the current user
   content.forEach(obj => {

      // find current user in package.maintainers arr - if user found, push package name to packageNames arr
      if(obj.package.maintainers.some(userObj => userObj.username === user.username)) packageNames.push(obj.package.name);  
   })

   // create new maintainer obj with current user/username & packageNames array
   maintainers.push({ username: user.username, packageNames: packageNames.sort() })
})

// sort maintainers array
maintainers = maintainers.sort((a, b) => {
   if (a.username < b.username) return -1;
   if (a.username > b.username) return 1;
   return 0;
})

// return maintainers
return maintainers
};
