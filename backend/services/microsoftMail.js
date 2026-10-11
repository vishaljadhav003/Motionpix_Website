require("dotenv").config();
require("isomorphic-fetch");

const { ConfidentialClientApplication } = require("@azure/msal-node");
const { Client } = require("@microsoft/microsoft-graph-client");

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

// ============================================================
// GET MICROSOFT GRAPH ACCESS TOKEN
// ============================================================

const getAccessToken = async () => {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("Unable to acquire Microsoft Graph access token");
  }

  return result.accessToken;
};

// ============================================================
// HTML ESCAPE
// ============================================================

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ============================================================
// SEND MICROSOFT 365 EMAIL
// ============================================================

const sendMicrosoftEmail = async ({ to, subject, html, replyTo }) => {
  const accessToken = await getAccessToken();

  const graphClient = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  const message = {
    subject,
    body: {
      contentType: "HTML",
      content: html,
    },
    toRecipients: [
      {
        emailAddress: {
          address: to,
        },
      },
    ],
  };

  if (replyTo) {
    message.replyTo = [
      {
        emailAddress: {
          address: replyTo,
        },
      },
    ];
  }

  await graphClient
    .api(`/users/${encodeURIComponent(process.env.EMAIL_FROM)}/sendMail`)
    .post({
      message,
      saveToSentItems: true,
    });
};

module.exports = {
  sendMicrosoftEmail,
  escapeHtml,
};