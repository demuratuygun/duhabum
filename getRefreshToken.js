const { google } = require('googleapis');

const CLIENT_ID = "970563423596-70cimrk4cpua74jufm11c03ej7vac51d.apps.googleusercontent.com";
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://duhabum.com/api/record";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive'],
});

console.log('Authorize this app by visiting this url:', authUrl);

// After visiting the URL, you will receive a code as a query parameter
// Input the code here
const getToken = async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);
};

// Call the getToken function with the code obtained from the URL
// Uncomment the line below after replacing 'YOUR_AUTHORIZATION_CODE'
// getToken('YOUR_AUTHORIZATION_CODE');
