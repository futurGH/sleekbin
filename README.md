# sleekbin
A good-looking, open-source, serverless pastebin platform.

Will get around to properly documenting this at some point. Login system currently not working, I'll also get to that at some point.
## Project setup
```
npm install
```

### Environment Variables
- Get a [Google Fonts API key](https://developers.google.com/fonts/docs/developer_api#details), set environment variable `VUE_APP_GOOGLE_FONTS_API_KEY` to it
- Create a Firebase project with Cloud Storage and Firestore, set environment variable `FIREBASE_STORAGE_BUCKET` to the storage bucket ID
- Create a service account for the Firebase project, set environment variable `FIREBASE_CREDENTIALS` to the entire service account key object

**DEPLOY TO VERCEL!**
*Also swap out the instances of "Sleekbin" in the code if you want to. Not too difficult, it's in like 3 places.*

## Development
```shell
npm install vercel -g
```

### Run locally with hot-reload
```shell
vercel dev
```

### Compile and minify for production
```shell
npm run build
```

### Deploy to Vercel
```shell
vercel --prod
```

### Lint and fix files
```shell
npm run lint
```