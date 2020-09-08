This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. For this project first run 

```bash
npm run watch-semantic
```

this would create static named folder inside which would be the compiled semantic ui code

which is imported in _document.js file inside pages/ folder

After static folder is completely built, then

2. You need to create .env.local file in root directory of project, and fill these field respectively

- MONGODB_URI=mongodb uri 
- AWS_ACCESS_KEY_ID=aws access key
- AWS_SECRET_ACCESS_KEY=aws secret key
- AWS_BUCKET=name of the bucket(for simplicity you can name it as 'knpss')

Or, You can check .env.example for reference with a bit of explanation.

You need to create an aws account for storing files in your bucket

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

