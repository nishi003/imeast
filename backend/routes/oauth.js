var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/outh2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data', data);

}
// GET home page:
router.get('/', async function(req, res, next){
    const code = req.query.code;
    try{
        const redirectUrl = 'http://127.0.0.1:3000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getRoken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired');
        console.log('credentials', user);
        await getUserData(user.access_token);
    }
    catch (err){
        console.log('Error signing in with Google')
    }
});

module.exports = router