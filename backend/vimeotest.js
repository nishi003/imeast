
//dot env for vimeo secrets
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.VIMEO_CLIENTID)
console.log(process.env.VIMEO_CLIENTSECRET)
console.log(process.env.VIMEO_ACCESS_TOKEN)

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);


client.request({
    method: 'GET',
    path: '/tutorial'
  }, function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }

    console.log(body);
  })