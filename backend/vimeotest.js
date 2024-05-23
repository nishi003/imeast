
//dot env for vimeo secrets
const dotenv = require("dotenv");
dotenv.config();

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

let file_name = "C:\\Users\\San Basnet\\Downloads\\d793f97348274cbaa7892633b7376664.mov"
// client.upload(
//   file_name,
//   {
//     'name': 'test_video',
//     'description': 'The description goes here.'
//   },
//   function (uri) {
//     console.log('Your video URI is: ' + uri);
//   },
//   function (bytes_uploaded, bytes_total) {
//     var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
//     console.log(bytes_uploaded, bytes_total, percentage + '%')
//   },
//   function (error) {
//     console.log('Failed because: ' + error)
//   }
// )

let uri = '/videos/949383072';

client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
    if (error) {
      console.log('There was an error making the request.')
      console.log('Server reported: ' + error)
      return
    }
  
    console.log('Your video link is: ' + body.link)
  })