
//dot env for vimeo secrets
const dotenv = require("dotenv");
dotenv.config();

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(process.env.VIMEO_CLIENTID, process.env.VIMEO_CLIENTSECRET, process.env.VIMEO_ACCESS_TOKEN);

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

client.request({
  method: 'PATCH',
  path: uri,
  query: {
      'privacy': {
          'view': 'password'
      },
      'password': 'helloworld'
  }
}, function (error, body, status_code, headers) {
  console.log(uri);
  console.log("the errors are", error);
  console.log("other info", body, status_code, headers)

})


// client.request({
//   method: 'PUT',
//   path: uri + '/privacy/domains/example.com'
// }, function (error, body, status_code, headers) {
//   //console.log(uri + ' will only be embeddable on "http://example.com".')
//   client.request({
//     method: 'PATCH',
//     path: uri,
//     query: {
//       'privacy': {
//         'embed': 'whitelist'
//       }
//     }
//   }, function (error, body, status_code, headers) {
//     //console.log(uri + error + body + status_code + headers)
//   })
// })