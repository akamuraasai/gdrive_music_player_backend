const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

// If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(fromEnv = false) {
  try {
    let content;
    if (fromEnv) {
      content = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    } else {
      content = await fs.readFile(TOKEN_PATH);
    }
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  const fromEnv = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
  console.log({ fromEnv });
  let client = await loadSavedCredentialsIfExist(fromEnv);
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.list({
    pageSize: 10,
    q: "mimeType contains 'audio'",
    fields: 'nextPageToken, files(id, name, parents, webContentLink, appProperties)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }
  console.log(JSON.stringify({ files }, null, 2));

  return files;
}

async function updateFile(authClient) {
  const fileId = '1KFBXBZeseZ3jjZeaHetsVtMQoRK_chIC';
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.update({
    fileId,
    resource: {
      appProperties: {
        thumbnail: 'https://st.cdjapan.co.jp/pictures/l/08/00/UPCH-1516.jpg?v=1',
        artist: 'Miyabi',
      },
    },
  });
  const files = res;
  console.log({ res });
}

// authorize().then(updateFile).catch(console.error);
// authorize().then(listFiles).catch(console.error);

module.exports = async () => {
  const authClient = await authorize();
  const files = await listFiles(authClient);

  return files;
};
