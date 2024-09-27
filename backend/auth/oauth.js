var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');
const {signUp, login} = require("./auth");
const User = require("../Models/UserModel");

async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  return data;
}


/* GET users listing. */
router.post('/request', async function(req, res, next) {

  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");
  const redirectURL = 'http://127.0.0.1:3000/oauth/google/callback';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.email  openid ',
      prompt: 'consent'
    });

    res.json({url:authorizeUrl})

});


/* GET home page. */
router.get('/google/callback', async function(req, res, next) {

    let token = "";
    const code = req.query.code;

    console.log(code);
    try {
        const redirectURL = "http://127.0.0.1:3000/oauth/google/callback"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');

        // getting users details
        const user = await getUserData(oAuth2Client.credentials.access_token);
        console.log(user)

        
        // making a new user if already not exists
        if(!await User.findOne({email : user.email})){
          console.log("signup");
          token = await signUp(user);
        }
        else{
          console.log("login");
          token = await login(user);
        }

        
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    res.redirect(303, `http://localhost:5173/auth?token=${token}`);
  


});

module.exports = router;