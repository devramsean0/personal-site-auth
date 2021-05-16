const express = require('express');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const router = express.Router();
const redirect = encodeURIComponent('http://86.166.243.241:2008/api/discord/callback');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utis');
router.get('/LOGIN', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=843447266735161365&scope=identify&response_type=code&redirect_uri=${redirect}`);
});
router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  res.redirect(`https://sean-outram.xyz`);
}));
module.exports = router;