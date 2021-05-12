import { VercelRequest, VercelResponse } from "@vercel/node";

import * as firebaseAdmin from "firebase-admin";

const credential = firebaseAdmin.credential.cert(
  require("../../service-account.json")
);

firebaseAdmin.initializeApp({
  credential,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

async function get(req: VercelRequest, res: VercelResponse) {
  const {
    query: { id },
  } = req;

  const firestore = firebaseAdmin.firestore().collection("documents");

  const file = firebaseAdmin.storage().bucket().file(`${id}.slb`);
  if (!(await file.exists())) {
    return res.status(404).send("Not Found");
  }

  try {
    // Fetch document metadata; styling, etc. from Firestore
    const query = await firestore.where("id", "==", id).get();

    if (query.empty) return res.status(404).send("Not Found");
    const document = query.docs[0].data();

    // Fetch document content from Storage
    const downloadedFile = await file.download();
    const fileContent = downloadedFile[0].toString();

    // Put it together and return
    document.content.body = fileContent;
    res.status(200).send(document);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

export default async function (req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "GET":
      await get(req, res);
      break;
    default:
      res.status(405).send("Method Not Allowed");
  }
}
