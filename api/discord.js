const express = require('express');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const router = express.Router();
const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/LOGIN', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}scope=identify&response_type=code&redirect_uri=${redirect}`);
});

module.exports = router;