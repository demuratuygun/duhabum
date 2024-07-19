import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req) {
  try {

    const docs = google.docs({ version: 'v1', auth: oAuth2Client });

    const createResponse = await docs.documents.create({
      requestBody: {
        title: 'Sample Document',
      },
    });

    const documentId = createResponse.data.documentId;

    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: 'Hello, this is a sample document.',
            },
          },
        ],
      },
    });

    return NextResponse.json({ message: 'Document created and updated successfully', documentId });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to create and fill the document' }, { status: 500 });
  }
}


/*

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req) {
  try {
    const { email } = await req.json(); // Assuming the request body contains the email address

    const docs = google.docs({ version: 'v1', auth: oAuth2Client });
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Create a new document
    const createResponse = await docs.documents.create({
      requestBody: {
        title: 'Sample Document',
      },
    });

    const documentId = createResponse.data.documentId;

    // Update the document with some text
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: 'Hello, this is a sample document.',
            },
          },
        ],
      },
    });

    // Share the document with the specified user
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        role: 'writer', // or 'reader' based on the access level you want to grant
        type: 'user',
        emailAddress: email,
      },
    });

    return NextResponse.json({ message: 'Document created, updated, and shared successfully', documentId });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to create, fill, or share the document' }, { status: 500 });
  }
}


 */