var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {OAuth2Client} = require('google-auth-library');
var google = require('googleapis').google;
const jwt = require("jsonwebtoken")

//setup mongoose
const mongoose = require('mongoose');
const mongoosekey = process.env.MONGOOSE_CONNECT
mongoose.connect(mongoosekey);

//users schema
const Users = require('../models/Users.js');

console.log(Users)
async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('data', data);

}
// GET home page:
router.get('/', async(req, res)=>{
    const code = req.query.code;
    try{
        const redirectUrl = 'http://127.0.0.1:4000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        //console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        //console.log('credentials', user);
        await getUserData(user.access_token);
        typedata = typeof data
        //save userdate to users model
        console.log("data", typedata )

        var oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: 'v2'
          });

        oauth2.userinfo.get(
            function(err, res) {
              if (err) {
                 console.log(err);
              } else {
                var googleuserid = res.data.id
                var googlename = res.data.name
                var given_name = res.data.given_name

                //either sign up or login with google
                let googleuser = Users.find({googleid: googleuserid})
                if (googleuser.length !== 0){
                
                    //login
                    if (googleuser){
                            const data = {user:{id:user.id}}
                            var token = jwt.sign(data, 'imEast_tokenEncryptionKey');
                            var loginsuccess = true
                            
                    }
                    else{
                        var loginsuccess = false
                    }

                }
                else{
                    
                    //owned objects are just arrays of product ids.
                    let owned = [];
                    //cart is the same thing, arrays of product ids.
                    let cart = [];

                    //signup
                    const user = new Users({
                        name: given_name,
                        googleid: googleuserid,
                        modulesBought: owned,
                        cart: cart,
                    })
                
                    user.save();
                }

              }
          });
    }
    catch (err){
        console.log('Error signing in with Google')
        console.log(err)
    }

    //sending json doesn't work for some reason. 
    if (loginsuccess){
        await res.json({success: true, token})
    } 
    else{
        await res.json({success: false, errors: "googleuser does not exist"})
    }
    res.redirect(303, 'http://localhost:5173/')

});

module.exports = router