// google-auth.js
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

require('dotenv').config();

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

module.exports = {
  google,
  oauth2Client,
  SCOPES
};
