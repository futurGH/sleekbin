import { VercelRequest, VercelResponse } from "@vercel/node";

import { nanoid } from "nanoid";

import * as firebaseAdmin from "firebase-admin";

const credential = firebaseAdmin.credential.cert(
  require("../service-account.json")
);

firebaseAdmin.initializeApp({
  credential,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Filter the keys that aren't in the test object
// If there are 0 (falsy), return true
// Else (truthy), return false
const objectKeysMatch = (sampleObject, testObject) =>
  !Object.keys(sampleObject).filter(
    (key) => !Object.keys(testObject).find((k) => key === k)
  ).length;

async function post(req: VercelRequest, res: VercelResponse) {
  // TODO: Handle authentication logic

  const modelObject = {
    content: {
      title: null,
      body: null,
    },
    background_color: null,
    language: null,
    theme: null,
    font: null,
    font_size: null,
    line_height: null,
    show_line_numbers: null,
    first_line_number: null,
  };

  if (!req?.body?.content || !objectKeysMatch(modelObject, req?.body)) {
    return res.status(400).send("Bad Request");
  }

  const { content: document, ...documentData } = req.body;
  documentData.content = { title: document.title };

  const slug = nanoid(6);
  documentData.id = slug;

  try {
    const firestore = firebaseAdmin.firestore();

    await firestore.collection("documents").add(documentData);

    const file = firebaseAdmin.storage().bucket().file(`${slug}.slb`);
    await file.save(document.body, { contentType: "text/plain" });

    res.status(200).send(slug);
  } catch (e) {
    // Who needs error handling when you can offload it on the client?
    console.error(e);
    res.status(500).send(e);
  }
}

export default async function (req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "POST":
      await post(req, res);
      break;
    default:
      res.status(405).send("Method Not Allowed");
  }
}
