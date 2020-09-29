const request = require('request');
function main(params) {
   const username = 'apikey'; // IoT Platfom Application username (from API Key) 
   const password = 'token'; // IoT Platfom Application password (from API Key)
   //Change the paths from this url 
   const url = 'https://org.internetofthings.ibmcloud.com/api/v0002/device/types/{typeId}/devices/{deviceId}/events/{event}'

   //This will build auth header for request
   const auth = {
       user: username,
       pass: password
   };
   let qs = null
    let options = {method: 'GET', url, qs, auth};
   return new Promise((resolve, reject) => {
       request(options, (error, response, body) => {
           if (!error && response.statusCode === 200) {
               let j = JSON.parse(body);
               //Iot platform return a base64 object that we have to decode (glad we have a Cloud Function to do that!)
               payload_string = Buffer.from(j.payload, 'base64').toString('ascii');
               console.log(payload_string)
               payload = JSON.parse(payload_string)
               resolve(payload);
           } else {
               reject({
                   error: error,
                   response: response,
                   body: body
               });
           }
       });
   });  
}
